import path from 'path';
import { Page } from '@playwright/test';
import { logMessage } from './utils';
import { waitForLocator } from './core.component.actions';

export async function uploadFile(page: Page, uploadBtnLocator: string, filePath: string) {
    const absoluteFilePath = path.resolve(filePath);
    logMessage(`Uploading file from path: ${absoluteFilePath} using locator: ${uploadBtnLocator}`);
    await page.setInputFiles(uploadBtnLocator, absoluteFilePath);
    await page.click(uploadBtnLocator);
}

export async function fileUploadWithDialog(page: Page, uploadBtnLocator: string, filePath: string) {
    await waitForLocator(page, uploadBtnLocator);
    const absoluteFilePath = path.resolve(filePath);
    logMessage(`Handling file upload dialog for file: ${absoluteFilePath} using locator: ${uploadBtnLocator}`);
    page.on('filechooser', async (fileChooser) => {
        await fileChooser.setFiles(absoluteFilePath);
    });
    await page.click(uploadBtnLocator);
}

export async function downloadFile(page: Page, downloadBtnLocator: string, downloadPath: string) {
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.click(downloadBtnLocator)
    ]);
    const absoluteDownloadPath = path.resolve(downloadPath);
    logMessage(`Downloading file to path: ${absoluteDownloadPath} using locator: ${downloadBtnLocator}`);
    await download.saveAs(absoluteDownloadPath);
}

