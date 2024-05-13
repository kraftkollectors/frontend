import { debugLog } from "@/functions/helpers"

export const ApiRequest = {
    postJson(url: string, body: any) {
        debugLog(body);
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }
}