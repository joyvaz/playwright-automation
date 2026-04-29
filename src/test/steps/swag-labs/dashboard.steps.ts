import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import axeBuilder from "@axe-core/playwright";
import { CustomWorld } from "../../../main/fixture/fixture.index";
import { getElementTextByLocator, waitForLocator } from "../../../main/utils/actions.index";
import swagLabsDashboardPage from '../../pages/swag-labs/dashboard.page'

Then("user should see the products dashboard page", async function (this: CustomWorld) {
    await waitForLocator(this.page, swagLabsDashboardPage.bodySection.productHeading);
    const headerTitle = await getElementTextByLocator(this.page, swagLabsDashboardPage.bodySection.productHeading);
    expect.soft(headerTitle, `Expected header title to be "Products" but found "${headerTitle}"`).toBe("Products");
})

Then("user perform the accessibility check", async function (this: CustomWorld) {
    const accessibilityScanResults = await new axeBuilder({ page: this.page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
})

Then("user perform the accessibility check wit specific tags", async function (this: CustomWorld) {
    const accessibilityScanResults = await new axeBuilder({ page: this.page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
})