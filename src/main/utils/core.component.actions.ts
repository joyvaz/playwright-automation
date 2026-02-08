import { Page } from "@playwright/test";
import { logMessage } from "./utils";
import { GLOBALS } from "../../../playwright.config";
import { waitForPageLoad } from "./navigation.actions";

export async function waitForLocator(page: Page, locator: string): Promise<void> {
    try {
        await page.waitForSelector(locator, { state: 'visible', timeout: GLOBALS.testTimeout.default });
    } catch (error) {
        logMessage(`Error waiting for locator: ${locator} on page ${await page.title()}`, "error");
        throw new Error(`Error waiting for locator: ${locator} on page ${await page.title()}`);
    }
};

export async function waitByRole(page: Page, role: Parameters<Page['getByRole']>[0], name: string): Promise<void> {
    try {
        await page.getByRole(role, { name }).waitFor({ state: 'visible', timeout: GLOBALS.testTimeout.default });
    } catch(error) {
        logMessage(`Error waiting for element with role: ${role} and name: ${name} on page ${await page.title()}`, "error");
        throw new Error(`Error waiting for element with role: ${role} and name: ${name} on page ${await page.title()}`);
    }
}

export async function fillTextBoxByLocator(page: Page, locator: string, value: string) {
    await waitForLocator(page, locator);
    await page.fill(locator, value);
}

export async function fillTextBoxByRole(page: Page, name: string, value: string) {
    await waitByRole(page, 'textbox', name);
    await page.getByRole('textbox', { name }).fill(value);
}

export async function validateTextBoxValueByLocator(page: Page, locator: string, expectedValue: string) {
    await waitForLocator(page, locator);
    const actualValue = await page.inputValue(locator);
    if (actualValue !== expectedValue) {
        logMessage(`Validation failed for locator: ${locator}. Expected: ${expectedValue}, Actual: ${actualValue}`, "error");
        throw new Error(`Validation failed for locator: ${locator}. Expected: ${expectedValue}, Actual: ${actualValue}`);
    }
}

export async function getElementTextByLocator(page: Page, locator: string): Promise<string> {
    await waitForLocator(page, locator);
    return await page.textContent(locator) || '';
}

export async function verifyElementTextByLocator(page: Page, locator: string, expectedText: string) {
    const actualText = await getElementTextByLocator(page, locator);    
    if (actualText.trim() !== expectedText.trim()) {
        logMessage(`Text verification failed for locator: ${locator}. Expected: ${expectedText}, Actual: ${actualText}`, "error");
        throw new Error(`Text verification failed for locator: ${locator}. Expected: ${expectedText}, Actual: ${actualText}`);
    }
}

export async function clickElementByLocator(page: Page, locator: string) {
    await waitForLocator(page, locator);
    await page.click(locator);
    await waitForPageLoad(page);
}
