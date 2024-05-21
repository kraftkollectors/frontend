

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

export function getStarSize(total: number, current: number): "full" | 'half' | 'empty' {
    const b = total.toString().split('.');
    if(b.length > 1) {
        const whole = Number(b[0]);
        const fraction = Number(b[1]);
        if(whole > current) return 'full'
        if(fraction > 0 && whole === current) return 'half'
    }
    if (current <= total) return 'full'
    return 'empty';
}

