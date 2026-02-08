import fs from 'fs';
import path from 'path';
import { CONSTANTS } from '../config/constants';

export async function delay(timeinMs: number) {
    return new Promise(resolve => setTimeout(resolve, timeinMs));
}

export function logMessage(message: string, level: "info" | "warn" | "error" = "info"): void {
    const logMessage = `[${getCurrentTimeStamp()}] [${level}] ${message}`
    const logFilePath = path.resolve(__dirname, '../../..', CONSTANTS.LOGS_DIR, `${CONSTANTS.REPORT_BASE_NAME}.log`);
    console.log(logMessage);
    fs.appendFile(logFilePath, `${logMessage}\n`, (err) => {
        if (err) {
            console.error(`Error writing the log file: ${JSON.stringify(err)}`);
        }
    })
}

export function getCurrentTimeStamp(): string {
    return new Date().toISOString().replace(/T | Z/g, "").replace(/[:.]/g, "-") as string;
}

export function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x8);
        return v.toString(16);
    });
}

export function readJSONFile(filePath: string): JSON {
    const fs = require('fs');
    return JSON.parse(fs.readFileSync(filePath));
}

export function ensureDir(dirPath: string): boolean {
    if (!fs.existsSync(path.dirname(dirPath))) {
        fs.mkdirSync(path.dirname(dirPath), { recursive: true });
        return true;
    }
    return false;
}

export function replaceWhiteSpace(text: string, repalceText: string = "_"): string {
    return text.replace(/\s+/g, repalceText)
}

export async function moveFile(sourcePath: string, desinationPath: string) {
    if (ensureDir(sourcePath)) {
        ensureDir(desinationPath);
        fs.renameSync(sourcePath, desinationPath);
    } else {
        logMessage(`Source file does not exist: ${sourcePath}`, "error");
        throw new Error(`Source file does not exist: ${sourcePath}`);
    }
    Promise.resolve();
}