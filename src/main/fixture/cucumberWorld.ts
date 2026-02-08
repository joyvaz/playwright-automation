import { setWorldConstructor, IWorldOptions, World } from "@cucumber/cucumber";
import { APIRequestContext, APIResponse, Browser, BrowserContext, Page } from "playwright";

export class CustomWorld extends World {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    browserRunId!: string;
    apiRequestContext!: APIRequestContext;
    apiResponse!: APIResponse;
    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld)