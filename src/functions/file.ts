import { debugLog } from "./helpers";
import {File} from '@web-std/file'


export type JsonFile =  {
    "path": string;
    "content": string;
    "name": string;
    "lastModified": number;
  }

// /**
//  * Converts a JSON file object to a Blob object.
//  * 
//  * @example formData.append('image', blob, jsonData.path);
//  *
//  * @param {Object} jsonData - The JSON file object containing the path, content, name, and lastModified properties.
//  * @param {string} jsonData.path - The path of the JSON file.
//  * @param {string} jsonData.content - The content of the JSON file, encoded as a base64 string.
//  * @param {string} jsonData.name - The name of the JSON file.
//  * @param {number} jsonData.lastModified - The last modified timestamp of the JSON file.
//  * @return {[Blob, string]} - An array containing the Blob object and the path of the JSON file.
//  */
// export function jsonFileToBlob(jsonData:JsonFile){   
//       const base64Data = jsonData.content.split(',')[1];
      
//       // Decode the base64 data
//       const decodedData = atob(base64Data);
      
//       // Create a Blob object representing the image data
//       const contentType = jsonData.content.split(',')[0].replace('data:', '').trim().split(';')[0];
//       const blob = new Blob([decodedData], { type: contentType });
//       debugLog({contentType})
      
//       return [blob, jsonData.path] as const;
// }

function base64ToBlob(base64: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray]);
}

export function createFileFromObject(fileObject: JsonFile) {
    const blob = base64ToBlob(fileObject.content.split(',')[1]); // Remove the 'data:image/jpeg;base64,' part
    return new File([blob], fileObject.name, { lastModified: fileObject.lastModified });
}