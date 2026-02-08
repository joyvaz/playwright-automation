import { setDefaultTimeout, After, AfterAll } from "@cucumber/cucumber";
import fs from 'fs';
import path from 'path';
import { GLOBALS } from '../../../playwright.config';
import { CONSTANTS } from '../config/constants'
import { ensureDir, getCurrentTimeStamp, logMessage, replaceWhiteSpace } from '../utils/utils'
import { CustomWorld } from "./cucumberWorld";

setDefaultTimeout(GLOBALS.testTimeout.default);

let featureName = `default-feature`;
const reportsDir = path.resolve(__dirname, "../../..", CONSTANTS.REPORT_DIR, `Playwright_${GLOBALS.runId}`)
ensureDir(reportsDir);
logMessage(`Reports will be saved to ${reportsDir}`)

After(async function (this: CustomWorld, scenario) {
    // logMessage(`Finished Scenario: ${scenario.pickle.name} with status: ${scenario.result?.status}`)
    const uri = scenario.pickle.uri || "";
    featureName = replaceWhiteSpace(path.basename(uri, path.extname(uri)), "-");
    if (scenario.result?.status.toUpperCase() as string === 'FAILED') {
        const currentTime = getCurrentTimeStamp();
        const screenshotPath = path.resolve(
            reportsDir,
            CONSTANTS.SCREENSHOTS_DIR,
            `${featureName}_${replaceWhiteSpace(scenario.pickle.name)}_${currentTime}.png`
        );
        const tracePath = path.resolve(
            reportsDir,
            CONSTANTS.TRACES_DIR,
            `${featureName}_${replaceWhiteSpace(scenario.pickle.name)}_${currentTime}`
        )
        ensureDir(screenshotPath);
        ensureDir(tracePath);
        await this.page?.screenshot({ path: screenshotPath, fullPage: true });
        await this.page?.context().tracing.stop({ path: `${tracePath}/trace.zip` });
        this.attach(fs.readFileSync(screenshotPath), "image/png");
    }
})

AfterAll(async function () {
    console.log(`All scenarios completed. Moving reports to ${reportsDir}`);
    try {
        const htmlReportSource = path.resolve(__dirname, '../../..', CONSTANTS.REPORT_DIR, `${CONSTANTS.REPORT_BASE_NAME}.html`);
        const htmlReportDestination = path.resolve(reportsDir, `${CONSTANTS.REPORT_BASE_NAME}_${GLOBALS.runId}.html`);
        const jsonReportSource = path.resolve(__dirname, '../../..', CONSTANTS.REPORT_DIR, `${CONSTANTS.REPORT_BASE_NAME}.json`);
        const jsonReportDestination = path.resolve(reportsDir, `${CONSTANTS.REPORT_BASE_NAME}_${GLOBALS.runId}.json`);
        const logFileSource = path.resolve(__dirname, '../../..', CONSTANTS.REPORT_DIR, `${CONSTANTS.REPORT_BASE_NAME}.log`);
        const logFileDestination = path.resolve(reportsDir, `${CONSTANTS.REPORT_BASE_NAME}_${GLOBALS.runId}.log`);
        ensureDir(htmlReportDestination);
        ensureDir(jsonReportDestination);
        ensureDir(logFileDestination);
        fs.renameSync(htmlReportSource, htmlReportDestination);
        fs.renameSync(jsonReportSource, jsonReportDestination);
        fs.renameSync(logFileSource, logFileDestination);
        logMessage(`Reports moved successfully to ${reportsDir}`);
        await Promise.resolve();
    } catch (err) {
        logMessage(`Failed to move reports: ${(err as Error).message}`, "error")
        throw new Error(`Failed to move reports: ${(err as Error).message}`);
    }
})