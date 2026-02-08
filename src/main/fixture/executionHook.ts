import { After, Before, BeforeAll } from "@cucumber/cucumber";
import { GLOBALS } from '../../../playwright.config';
import { launchBrowser, closeBowser, BrowserInstance } from "./launchBrowser";
import { CustomWorld } from "./cucumberWorld";
import { logMessage } from "../utils/utils";



BeforeAll(async function () {
    logMessage(`Starting test execution in '${GLOBALS.env}' environment`);
    await Promise.resolve();
})

Before(async function (this: CustomWorld, scenario) {
    logMessage(`Scenario: ${scenario.pickle.name}`);
    const {browser, context, page} = await launchBrowser(GLOBALS.browserType);
    this.browser = browser;
    this.context = context;
    this.page = page;
    if (process.env.PWDEBUG as string && process.env.PWDEBUG === '1') {
        await this.page.pause();
    }
})

After(async function(this: CustomWorld, scenario) {
    logMessage(`Finished Scenario: ${scenario.pickle.name} with status: ${scenario.result?.status}`)
    await closeBowser(this as BrowserInstance);
})