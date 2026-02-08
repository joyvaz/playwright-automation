import { Page, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { ensureDir } from '../utils/utils';

export async function visualCompare(page: Page, featureName: string) {
    const dirPath = path.resolve(`src/test/resources/goldeenImages/${featureName}`);
    const golderImagePath = path.resolve(dirPath, `${featureName}_golden.png`);
    const diffImagePath = path.join(dirPath, `${featureName}_diff.png`);
    ensureDir(dirPath);
    const screenshotBuffer = await page.screenshot();
    if(!fs.existsSync(golderImagePath)) {
        fs.writeFileSync(golderImagePath, screenshotBuffer);
        console.log(`Golden image created at ${golderImagePath}`);
        return;
    }
    const goldenImage = PNG.sync.read(fs.readFileSync(golderImagePath));
    const newImage = PNG.sync.read(screenshotBuffer);
    if (goldenImage.width !== newImage.width || goldenImage.height !== newImage.height) {
        fs.writeFileSync(diffImagePath, screenshotBuffer);
        throw new Error(`Image dimensions do not match. Golden image is ${goldenImage.width}x${goldenImage.height}, new image is ${newImage.width}x${newImage.height}. Diff image saved at ${diffImagePath}`);
        return;
    }
    const {width, height} = goldenImage;
    const diff = new PNG({width, height});
    const numDiffPixels = pixelmatch(goldenImage.data, newImage.data, diff.data, width, height, {threshold: 0.1});
    if (numDiffPixels > 0) {
        fs.writeFileSync(diffImagePath, PNG.sync.write(diff));
        throw new Error(`Images are different. Found ${numDiffPixels} different pixels. Diff image saved at ${diffImagePath}`);
    } else {
        console.log('Images match perfectly.');
    }
    expect.soft(numDiffPixels, `Expected 0 different pixels, but found ${numDiffPixels}`).toBe(0);
}