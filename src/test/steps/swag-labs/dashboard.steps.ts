import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../../main/fixture/fixture.index";
import { getElementTextByLocator, waitForLocator } from "../../../main/utils/actions.index";
import swagLabsDashboardPage from '../../pages/swag-labs/dashboard.page'

Then("user should see the products dashboard page", async function (this: CustomWorld) {
    await waitForLocator(this.page, swagLabsDashboardPage.bodySection.productHeading);
    const headerTitle = await getElementTextByLocator(this.page, swagLabsDashboardPage.bodySection.productHeading);
    expect.soft(headerTitle, `Expected header title to be "Products" but found "${headerTitle}"`).toBe("Products");
})  