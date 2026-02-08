import * as dotenv from 'dotenv';
import path from 'path';
import { GLOBALS } from '../../../playwright.config';


class EnvConfig {
    private static instance: EnvConfig;
    private executionEnv: string;
    private constructor() {
        dotenv.config({
            path: path.resolve(process.cwd(), "src/main/config/.env.test"),
        });
        this.executionEnv = GLOBALS.env;
    }

    public static getInstance(): EnvConfig {
        if (!EnvConfig.instance) {
            EnvConfig.instance = new EnvConfig();
        }
        EnvConfig.instance = new EnvConfig();
        return EnvConfig.instance;
    }

    public getUrl(appName: string, defaultValue: string = ''): string {
        const envKey = `${this.executionEnv.toUpperCase()}_${appName}_URL`;
        const url = process.env[envKey] as string || process.env[appName] as string || defaultValue;
        if (!url) {
            throw new Error(`url not found for key: ${envKey}`);
        }
        return url;
    }
    public getExecutionEnv(): string {
        return this.executionEnv;
    }
}

export const envConfig = EnvConfig.getInstance();