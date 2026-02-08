import { Page, APIRequestContext, APIResponse, request } from "@playwright/test";

type mockResponseType = JSON | string | { [key: string]: mockResponseType } | mockResponseType[];
export const apiMocking = async (page: Page, url: string | RegExp, mockResponse: mockResponseType, status: number = 200) => {
    await page.route(url, async (route) => {
        await route.fulfill({
            status: status,
            body: JSON.stringify(mockResponse),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    });
};

export async function createApiContext() {
    return await request.newContext();
}

// Execute GET API request
export async function getApiResponse(
    request: APIRequestContext,
    url: string,
    headers: Record<string, string> = {}
): Promise<APIResponse> {
    return await request.get(url, { headers });
}

// Execute POST API request
export async function postApiResponse(
    request: APIRequestContext,
    url: string,
    data: Record<string, unknown> = {},
    headers: Record<string, string> = {}
): Promise<APIResponse> {
    return await request.post(url, {
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    });
}

// Execute PUT API request
export async function putApiResponse(
    request: APIRequestContext,
    url: string,
    data: Record<string, unknown> = {},
    headers: Record<string, string> = {}
): Promise<APIResponse> {
    return await request.put(url, {
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    });
}

// Execute DELETE API request
export async function deleteApiResponse(
    request: APIRequestContext,
    url: string,
    headers: Record<string, string> = {}
): Promise<APIResponse> {
    return await request.delete(url, { headers });
}   

// Verify API response status code
export function verifyStatusCode(response: APIResponse, expectedStatus: number) {
    if (response.status() !== expectedStatus) {
        throw new Error(`Expected status code ${expectedStatus}, but got ${response.status()}`);
    }
}