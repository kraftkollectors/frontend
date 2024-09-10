import { debugLog } from "./helpers";
// import {File} from '@web-std/file'


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
    // debugLog(fileObject);
    
    const parts = fileObject.content.split(',');
    const blob = base64ToBlob(parts[1]); // Remove the 'data:image/jpeg;base64,' part
    const fileType = parts[0].replace('data:', '').trim().split(';')[0];
    return new File([blob], fileObject.name, { lastModified: fileObject.lastModified, type: fileType });
}

export function splitLongString(str: string) {
    const chunkSize = 1000000; // 1 million characters per chunk
    const result = [];
    
    for (let i = 0; i < str.length; i += chunkSize) {
        result.push(str.slice(i, i + chunkSize));
    }
    
    return JSON.stringify(result);
}

export function chunkifyString(str: string, chunkSize: number = 1000000): string[] {
    const chunks: string[] = [];
    let start = 0;
    let end = chunkSize;

    while (start < str.length) {
        chunks.push(str.substring(start, end));
        start = end;
        end = start + chunkSize;
    }

    return chunks;
}

export function deChunkifyString(chunks: string[]): string {
    return chunks.join('');
}

export function loadFileFromFormData(formData: FormData, key: string, c: any) {
    const count = Number(c);
    if(Number.isNaN(count) || count < 0) throw new Error("Invalid count");
    let res = '';
    for (let i = 0; i < count; i++) {
        res += formData.get(`${key}${i}`) as string;
    }
    debugLog(count);
    debugLog(res.length);
    return res;
}

export function removeFilesFromFormData(formData: FormData, key: string, c: any) {
    const count = Number(c);
    if(Number.isNaN(count) || count < 0) throw new Error("Invalid count");
    let newFormData = formData;
    newFormData.delete(key);
    for (let i = 0; i < count; i++) {
        formData.delete(`${key}${i}`);
    }
    return newFormData;
}

export function base64ToFile(base64String: string, filename: string) {
    // Split the base64 string to get the mime type and data
    const [header, data] = base64String.split(",");
    const mimeMatch = header.match(/data:(.*);base64/);
    if (!mimeMatch) {
      throw new Error("Invalid base64 format");
    }
  
    const mimeType = mimeMatch[1];
  
    // Decode the base64 string to binary data
    const binaryString = window.atob(data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
  
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
  
    // Create a Blob from the binary data
    const blob = new Blob([bytes], { type: mimeType });
  
    // Create a File object from the Blob
    return new File([blob], filename, { type: mimeType });
  }