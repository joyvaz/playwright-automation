import { SWAG_LABS_LOGIN_INFO } from "./swagLabs.login.info";   
import { PLACEHOLDER_LOGIN_INFO } from "./placeHolder.login.info";   
import { DEMO_APP_LOGIN_INFO } from "./demoApp.login.info";
import { CONSTANTS } from "./constants";

type AppLoginInfo = {
    [key: string]: {
        username: string;
        password: string;
    };
};

type UsersMap = Record<string, AppLoginInfo>;

export const getUserCreds = (appName: string, userType: string) => {
    if (!appName || !CONSTANTS.APP_NAMES.includes(appName)) {
        throw new Error(`Invalid application name: ${appName}. Supported applications are: ${CONSTANTS.APP_NAMES.join(', ')}`);
    }
    const usersMap: UsersMap = {
        SWAG_LABS: SWAG_LABS_LOGIN_INFO,
        PLACEHOLDER_APP: PLACEHOLDER_LOGIN_INFO,
        DEMO_APP: DEMO_APP_LOGIN_INFO
    };
    const users: UsersMap[string] = usersMap[appName];
    if(!users) {
        throw new Error(`No login info found for application: ${appName}`);
    }
    if (!users[userType]) {
        throw new Error(`Invalid user type: ${userType} for application: ${appName}`);
    }
    const userCreds = users[userType];
    if (!userCreds.username || !userCreds.password) {
        throw new Error(`Missing username or password for user type: ${userType} in application: ${appName}`);
    }
    return {
        username: userCreds.username,
        password: userCreds.password
    };
}