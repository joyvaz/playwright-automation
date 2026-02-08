import { BrowserContext, Page } from '@playwright/test';
import { waitForLocator } from './core.component.actions';
import { logMessage } from './utils';
import { GLOBALS } from '../../../playwright.config';

export async function waitForPageLoad(page: Page): Promise<void> {
    try {
        await page.waitForLoadState('load', { timeout: GLOBALS.testTimeout.default });  
    } catch (error) {
        logMessage(`Error waiting for page load on page ${await page.title()}`, "error");
        throw new Error(`Error waiting for page load on page ${await page.title()}`);
    }
}

export async function navigateToUrl(page: Page, url: string) {
    try {
        await page.goto(url, { timeout: GLOBALS.testTimeout.default });
        await waitForPageLoad(page);
    } catch (error) {
        logMessage(`Error navigating to URL: ${url} on page ${await page.title()}`, "error");
        throw new Error(`Error navigating to URL: ${url} on page ${await page.title()}`);
    }
}

export async function goBack(page: Page) {
    await page.goBack({ timeout: GLOBALS.testTimeout.default });
    await waitForPageLoad(page);
}

export async function goForward(page: Page) {
    await page.goForward({ timeout: GLOBALS.testTimeout.default });
    await waitForPageLoad(page);
}

export async function refreshPage(page: Page) {
    await page.reload({ timeout: GLOBALS.testTimeout.default });
    await waitForPageLoad(page);
}   

export async function openLinkInNewTab(page: Page, locator: string) {
    await waitForLocator(page, locator);
    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.click(locator, { button: 'middle' }) // Simulate middle-click to open in new tab
    ]);
    await newPage.waitForLoadState('load', { timeout: GLOBALS.testTimeout.default });
    return newPage;
}

export async function switchToPageByTitle(context: BrowserContext, title: string): Promise<Page | null> {
    for (const page of context.pages()) {
        if (await page.title() === title) {
            return page;
        }
    }
    logMessage(`No page found with title: ${title}`, "error");
    return null;
}

export async function openUrlInNewTabAndSwitch(context: BrowserContext, url: string): Promise<Page> {
    const newPage = await context.newPage();
    await navigateToUrl(newPage, url);
    await waitForPageLoad(newPage);
    return newPage;
}