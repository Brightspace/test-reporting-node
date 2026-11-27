const fs = require('fs');
const glob = require('glob');
const path = require('node:path');

/**
 * Merge multiple test reports into a single consolidated report
 * @param {string} pattern - Glob pattern to match report files (e.g., 'd2l-test-report-*.json')
 * @param {string} outputPath - Path where the merged report will be saved
 * @returns {object} - The merged report object
 */
function mergeReports(pattern, outputPath) {
	const files = glob.sync(pattern);

	if (files.length === 0) {
		console.warn('[Merge Reports] No report files found matching pattern:', pattern);
		return null;
	}

	console.log(`[Merge Reports] Found ${files.length} report file(s) to merge`);

	const reports = files.map(file => {
		try {
			const content = fs.readFileSync(file, 'utf8');
			const report = JSON.parse(content);
			return report === null ? null : { file, report };
		} catch (error) {
			console.error(`[Merge Reports] Failed to read ${file}:`, error.message);
			return null;
		}
	}).filter(report => report !== null);

	if (reports.length === 0) {
		console.error('[Merge Reports] No valid reports to merge');
		return null;
	}

	const mergedReport = {
		...reports[0].report,
		details: [],
		summary: {
			...reports[0].report.summary,
			count: {
				passed: 0,
				failed: 0,
				skipped: 0,
				flaky: 0
			},
			duration: {
				total: 0
			}
		}
	};

	const outputDirectory = path.dirname(path.resolve(outputPath));
	for (const { file, report } of reports) {
		if (Array.isArray(report.details)) {
			const reportDirectory = path.dirname(path.resolve(file));
			for (const detail of report.details) {
				const location = detail.location;
				const locationFile = typeof location === 'string' ? location : location?.file;
				if (typeof locationFile === 'string' && locationFile && !path.isAbsolute(locationFile)) {
					const rebased = path.relative(outputDirectory, path.resolve(reportDirectory, locationFile))
						.split(path.sep).join('/') || '.';
					if (typeof location === 'string') {
						detail.location = rebased;
					} else {
						location.file = rebased;
					}
				}
				mergedReport.details.push(detail);
			}
		}

		if (report.summary?.count) {
			mergedReport.summary.count.passed += report.summary.count.passed || 0;
			mergedReport.summary.count.failed += report.summary.count.failed || 0;
			mergedReport.summary.count.skipped += report.summary.count.skipped || 0;
			mergedReport.summary.count.flaky += report.summary.count.flaky || 0;
		}

		if (report.summary?.duration?.total) {
			mergedReport.summary.duration.total += report.summary.duration.total;
		}

		if (report.summary?.started) {
			if (!mergedReport.summary.started || report.summary.started < mergedReport.summary.started) {
				mergedReport.summary.started = report.summary.started;
			}
		}
	}

	if (mergedReport.summary.count.failed > 0) {
		mergedReport.summary.status = 'failed';
	} else if (mergedReport.summary.count.passed > 0 || mergedReport.summary.count.flaky > 0) {
		mergedReport.summary.status = 'passed';
	} else {
		mergedReport.summary.status = 'skipped';
	}

	try {
		fs.writeFileSync(outputPath, JSON.stringify(mergedReport));
		console.log(`[Merge Reports] Merged report saved to: ${outputPath}`);
	} catch (error) {
		console.error('[Merge Reports] Failed to save merged report:', error.message);
		return null;
	}

	files.forEach(file => {
		try {
			fs.unlinkSync(file);
			console.log(`[Merge Reports] Removed worker report: ${file}`);
		} catch (error) {
			console.warn(`[Merge Reports] Failed to remove ${file}:`, error.message);
		}
	});

	return mergedReport;
}

module.exports = { mergeReports };
