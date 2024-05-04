

/**
 * function that takes a social media link and returns the expected username
 * @param link String
 * @returns String
 */
export function getUsernameFromLink(link: string){
    return link.split("/").at(-1)
}