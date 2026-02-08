import { Given, When } from "@cucumber/cucumber"
import { CustomWorld } from "../../../main/fixture/fixture.index"
import { envConfig, getUserCreds } from "../../../main/config/config.index"
import { fillTextBoxByLocator, clickElementByLocator, navigateToUrl } from '../../../main/utils/actions.index'
import  swagLabsLoginPage  from '../../pages/swag-labs/login.page'


Given("User is on Swag Labs login page", async function (this: CustomWorld) {
    const appUrl = envConfig.getUrl("SWAG_LABS")
    await navigateToUrl(this.page, appUrl)
})

When("user login to swag labs as {string}", async function (this: CustomWorld, userType: string) {
    const creds = getUserCreds('SWAG_LABS', userType)
    await fillTextBoxByLocator(this.page, swagLabsLoginPage.bodySection.usernameInput, creds.username)
    await fillTextBoxByLocator(this.page, swagLabsLoginPage.bodySection.passwordInput, creds.password)
    await clickElementByLocator(this.page, swagLabsLoginPage.bodySection.loginButton)
})