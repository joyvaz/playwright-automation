import { defineConfig } from "playwright/test";

export const GLOBALS = {
    env: (process.env.TEST_ENV)?.trim().toLowerCase() || 'stage',
    browserType: (process.env.BROWSERNAME)?.trim().toLowerCase() || 'chromium',
    bddTags: (process.env.TAGS)?.trim() || '',
    isMocked: (process.env.MOCKED)?.trim().toLowerCase() === 'true' || false,
    isHeadless: (process.env.HEADLESS)?.trim().toLowerCase() === 'true' || false,
    runId: new Date().toISOString().replace(/T|Z/g, '').replace(/[:.]/g, '-'),
    testTimeout: {
        default: 60000,
        short: 10000,
        medium: 30000,
        long: 120000
    }
};

export default defineConfig({
    retries: 0,
    fullyParallel: true,
    testDir: './src/test/',
    // Run all tests in parallel.
    workers: 1,
    // Global setting for all the test
    use: {
        ignoreHTTPSErrors: true,
        video:'off',
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
        launchOptions: {
            args: ['--start-maximized'],
        },
        viewport: null
    },
    reporter: [
        ["list"],
        // ['json', { outputFile: 'test-results.json' }],
        // ['html', { open: 'always', outputFolder: 'my-report' }]
    ],
    timeout: GLOBALS.testTimeout.default,
    expect: {
        timeout: GLOBALS.testTimeout.default
    }
})