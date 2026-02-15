import { Given, When, Then } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { CustomWorld } from "../../../main/fixture/fixture.index"
import { envConfig } from "../../../main/config/config.index"
import { clickElementByLocator, navigateToUrl, apiMocking } from '../../../main/utils/actions.index'
import jsonPlaceholderHomePage from '../../pages/jsonPlaceholder/home.page'

Given("User navigates on JSON Placeholder home page", async function (this: CustomWorld) {
    const appUrl = envConfig.getUrl("JSONPLACEHOLDER")
    await navigateToUrl(this.page, appUrl)
})

When("user click on Run script button", async function (this: CustomWorld) {
    await clickElementByLocator(this.page, jsonPlaceholderHomePage.bodySection.btnRunScript)
    await this.page.waitForTimeout(2000);
})

Then("user validates the JSON response is displayed in output section", async function (this: CustomWorld) {
    const outputText = await this.page.locator(jsonPlaceholderHomePage.bodySection.txtOutput).textContent()
    console.log("Output text:", outputText)
    JSON.parse(outputText || "").title === "delectus aut autem" ? console.log("API response is correct") : console.log("API response is incorrect")
    expect(JSON.parse(outputText || "").title).toBe("delectus aut autem")

})

Then("user validates the mocked JSON response is displayed in output section", async function (this: CustomWorld) {
    const outputText = await this.page.locator(jsonPlaceholderHomePage.bodySection.txtOutput).textContent()
    console.log("Output text:", outputText)
    outputText?.includes("Mocked Title") ? console.log("API response is correctly mocked") : console.log("API response is incorrectly mocked")
    expect(JSON.parse(outputText || "").includes("Mocked Title")).toBeTruthy()
})

Then("API return mocked JSON response", async function (this: CustomWorld) {
    const mockResponse = "{userId: 1, id: 2, title: 'Mocked Title', completed: true}";
    await apiMocking(this.page, "**/todos/1", mockResponse, 200)
})