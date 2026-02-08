import { Browser, BrowserContext, Page, chromium, firefox, webkit } from "playwright";
import { GLOBALS } from '../../../playwright.config';
import { logMessage } from "../utils/utils";


export interface BrowserInstance {
    browser: Browser;
    context: BrowserContext
    page: Page;
}

export async function launchBrowser(browserType: string = "chromium"): Promise<BrowserInstance> {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page
    try {
        switch (browserType.toLowerCase()) {
            case 'firefox':
                browser = await firefox.launch({ headless: GLOBALS.isHeadless });
                break;
            case 'webkit':
                browser = await webkit.launch({ headless: GLOBALS.isHeadless });
                break
            case 'chromium':
                browser = await chromium.launch({ headless: GLOBALS.isHeadless });
                break;
            default:
                throw new Error(`${browserType} browser not found. Supported Browser: chromium, firefox, webkit`)
                break;
        }
        context = await browser.newContext();
        page = await context.newPage();
        await context.clearCookies();
        await page.setViewportSize({ width: 1280, height: 720 });
        await context.tracing.start({ screenshots: true, snapshots: true, sources: true, })
        logMessage(`Launched ${GLOBALS.browserType} browser in ${GLOBALS.isHeadless ? 'headless' : 'headed'} mode`)
        return { browser, context, page }
    } catch (error) {
        logMessage(`Error Launching ${GLOBALS.browserType} browser in ${GLOBALS.isHeadless ? 'headless' : 'headed'} mode`, "error")
        throw error;
    }
}

export async function closeBowser(instance: BrowserInstance): Promise<void> {
   try {
     instance.page.close();
     instance.context.close();
     instance.browser.close();
   } catch (error) {
    logMessage(`Failed to close the browser`, "error")
    throw new Error(`Failed to close the browser`)
   }
}