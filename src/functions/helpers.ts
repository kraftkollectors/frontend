

/**
 * function that takes a social media link and returns the expected username
 * @param link String
 * @returns String
 */
export function getUsernameFromLink(link: string){
    return link.split("/").at(-1)
}

export function formDataToObject<T>(formData: FormData){
    return Object.fromEntries(formData.entries()) as T
}

export function debugLog(message: any) {
    const env:'debug'|'production' = "debug";
    if (env === "debug") {
        console.log(message);
    }
}

