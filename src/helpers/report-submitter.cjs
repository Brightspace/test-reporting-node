import { MeasureValueType, TimestreamWriteClient, TimeUnit, WriteRecordsCommand } from '@aws-sdk/client-timestream-write';

const { BIGINT, VARCHAR, MULTI } = MeasureValueType;
const { MILLISECONDS } = TimeUnit;
const repoSettingsDocUrl = 'https://github.com/Brightspace/repo-settings/blob/main/docs/test-reporting.md#analytics';

// TODO 
// - Figure out how to get credentials, region? From ENV? -> What does th sdk allow
// - Figure out how to use the Report class to provide the data
//      - Review finalizer method https://github.com/Brightspace/test-reporting-action/blob/main/src/report.js#L331
// Concerns: duplicates code from https://github.com/Brightspace/test-reporting-action/blob/main/src/report.js#L8
//      - Could this class be used for the gha? 

class ReportSubmitter {
    #logger;

    constructor (logger) {
        this.debug = false;
        this.dryRun = false;
        this.#logger = logger;
        this.region = 'us-east-1';
        this.databaseName = 'test_reporting';

        /*
            const logger = {
                info: (msg) => console.log(msg),
                warning: (msg) => console.warn(msg),
                error: (msg) => console.error(msg),
                location: (msg, loc) => console.log(`${msg}: ${loc}`)
            };
        */
    }

    async submit(report) { // TODO can this use the Report object? to build the data for the timestream writes?
        this.#logger.info('Submit report');
        this.#logger.info('Generate summary write request');

        let reportJson = report.toJSON();
        const summaryWriteRequest = this.#makeSummaryWriteRequest(reportJson);

        this.#logger.info('Generate detail write requests');

        const detailWriteRequests = this.#makeDetailWriteRequests(reportJson);

        reportJson = null;

        if (experienceMaps.has(report)) {
            this.#logger.info('Restoring experience dimension onto detail records');
        }

        this.#applyExperienceDimensions(report, detailWriteRequests);

        this.#logger.info('Merge write requests');

        const writeRequests = [
            summaryWriteRequest,
            ...detailWriteRequests
        ];

        const { dryRun } = inputs;

        if (dryRun) {
            this.#logger.info('Dry run, skipping records submit');

            return;
        }

        this.#logger.info('Executing write requests');

        await this.#writeTimestream(writeRequests);
    }

    #applyExperienceDimensions(report, detailWriteRequests) {
        const map = experienceMaps.get(report);

        if (!map) {
            return;
        }

        experienceMaps.delete(report);

        for (const request of detailWriteRequests) {
            for (const record of request.Records) {
                const name = record.Dimensions.find(d => d.Name === 'name')?.Value;
                const locationFile = record.Dimensions.find(d => d.Name === 'location_file')?.Value;
                const experience = map.get(`${name}|${locationFile}`);

                if (experience) {
                    record.Dimensions.push({ Name: 'experience', Value: experience });
                }
            }
        }
    };

    #makeSummaryWriteRequest(report) {
        const { id, version, summary } = report;
        const {
            github: {
                organization,
                repository,
                workflow,
                runId,
                runAttempt
            },
            git: {
                branch,
                sha
            },
            operatingSystem,
            framework,
            started,
            duration: {
                total
            },
            status,
            count: {
                passed,
                failed,
                skipped,
                flaky
            },
            lms
        } = summary;

        const dimensions = [
            { Name: 'report_id', Value: id },
            { Name: 'github_organization', Value: organization },
            { Name: 'github_repository', Value: repository },
            { Name: 'github_workflow', Value: workflow },
            { Name: 'github_run_id', Value: runId.toString() },
            { Name: 'github_run_attempt', Value: runAttempt.toString() },
            { Name: 'git_branch', Value: branch },
            { Name: 'git_sha', Value: sha },
            { Name: 'operating_system', Value: operatingSystem },
            { Name: 'framework', Value: framework }
        ];

        if (lms) {
            const { buildNumber, instanceUrl } = lms;

            if (buildNumber) {
                dimensions.push({ Name: 'lms_build_number', Value: buildNumber });
            }

            if (instanceUrl) {
                dimensions.push({ Name: 'lms_instance_url', Value: instanceUrl });
            }
        }

        return {
            DatabaseName: databaseName,
            TableName: 'summary',
            Records: [{
                Version: 1,
                Time: (Date.parse(started)).toString(),
                TimeUnit: MILLISECONDS,
                // `_bc` suffix matches the `details` table and signals that the
                // records are emitted alongside deprecated detail dimensions. Drop the
                // suffix once the deprecated dimensions are removed.
                MeasureName: `report_v${version}_bc`,
                MeasureValueType: MULTI,
                MeasureValues: [
                    { Name: 'duration_total', Value: total.toString(), Type: BIGINT },
                    { Name: 'status', Value: status, Type: VARCHAR },
                    { Name: 'count_passed', Value: passed.toString(), Type: BIGINT },
                    { Name: 'count_failed', Value: failed.toString(), Type: BIGINT },
                    { Name: 'count_skipped', Value: skipped.toString(), Type: BIGINT },
                    { Name: 'count_flaky', Value: flaky.toString(), Type: BIGINT }
                ],
                Dimensions: dimensions
            }]
        };
    };

    #makeDetailRecord(detail) {
        const {
            name,
            started,
            location,
            retries,
            config,
            configuration,
            github,
            duration: {
                total,
                final
            },
            status,
            browser,
            taxonomy
        } = detail;
        const { file, line, column } = location ?? {};
        const { timeout } = configuration ?? config ?? {};
        const { codeowners } = github ?? {};
        const { type, tool } = taxonomy ?? {};
        const measures = [
            { Name: 'duration_final', Value: final.toString(), Type: BIGINT },
            { Name: 'duration_total', Value: total.toString(), Type: BIGINT },
            { Name: 'retries', Value: retries.toString(), Type: BIGINT },
            { Name: 'status', Value: status, Type: VARCHAR }
        ];
        const dimensions = [
            { Name: 'name', Value: name }
        ];

        if (file) {
            dimensions.push({ Name: 'location_file', Value: file });
        }

        if (timeout) {
            // kept for backwards compat. Once all dashboards are updated will be removed
            dimensions.push({ Name: 'timeout', Value: timeout.toString() });
            /////////////////////////////////////////////////////////////////////////////
            measures.push({ Name: 'configuration_timeout', Value: timeout.toString(), Type: BIGINT });
        }

        if (line) {
            dimensions.push({ Name: 'location_line', Value: line.toString() });
        }

        if (column) {
            dimensions.push({ Name: 'location_column', Value: column.toString() });
        }

        if (browser) {
            dimensions.push({ Name: 'browser', Value: browser });
        }

        if (type) {
            // kept for backwards compat. Once all dashboards are updated will be removed
            dimensions.push({ Name: 'type', Value: type });
            /////////////////////////////////////////////////////////////////////////////
            dimensions.push({ Name: 'taxonomy_type', Value: type });
        }

        if (tool) {
            // kept for backwards compat. Once all dashboards are updated will be removed
            dimensions.push({ Name: 'tool', Value: tool });
            /////////////////////////////////////////////////////////////////////////////
            dimensions.push({ Name: 'taxonomy_tool', Value: tool });
        }

        if (codeowners) {
            dimensions.push({ Name: 'github_codeowners', Value: codeowners.join(',') });
        }

        return {
            Time: (Date.parse(started)).toString(),
            TimeUnit: MILLISECONDS,
            MeasureValues: measures,
            Dimensions: dimensions
        };
    };

    #makeDetailWriteRequests(report) {
        const { id, version, details } = report;
        const batchSize = 100;
        const writeRequests = Array.from(
            { length: Math.ceil(details.length / batchSize) },
            (v, i) => {
                const detailRecordBatch = details
                    .slice(i * batchSize, i * batchSize + batchSize)
                    .map(this.#makeDetailRecord);

                return {
                    DatabaseName: databaseName,
                    TableName: 'details',
                    Records: detailRecordBatch,
                    CommonAttributes: {
                        Version: 1,
                        // `_bc` suffix signals that records still carry deprecated
                        // dimensions (`experience`, `type`, `tool`) for backwards
                        // compatibility. Drop the suffix once those are removed.
                        MeasureName: `report_v${version}_bc`,
                        MeasureValueType: MULTI,
                        Dimensions: [
                            { Name: 'report_id', Value: id, Type: VARCHAR }
                        ]
                    }
                };
            }
        );

        return writeRequests;
    };


    async #writeTimestream(requests) {
        const client = new TimestreamWriteClient({}); // TODO: how to get credentials, region? From ENV?

        for(const [index, request] of requests.entires()) {
            try {
                this.#logger.info(`Sending batch ${index + 1} of ${requests.length} (${request.Records.length} records)`);

			if (this.debug) {
				this.#logger.info(`${JSON.stringify(request, null, 2)}\n`);
			}
                const command = new WriteRecordsCommand(request);
                await client.send(command);

            } catch (err) {
                const { name, message, $metadata = {}, RejectedRecords } = err;
                const { httpStatusCode = '[unknown]', requestId = '[unknown]' } = $metadata;

                this.#logger.error(`AWS ${name} on batch ${index + 1}/${requests.length} (HTTP ${httpStatusCode}, request ${requestId}): ${message}`);

                if (Array.isArray(RejectedRecords)) {
                    for (const rejected of RejectedRecords) {
                        const record = JSON.stringify(request.Records[rejected.RecordIndex]);

                        this.#logger.error(`Rejected record ${rejected.RecordIndex} (${rejected.Reason}): ${record}`);
                    }
                }

                throw new Error('Unable to submit write requests');
			}
        }
    }
}

module.exports = { ReportSubmitter };