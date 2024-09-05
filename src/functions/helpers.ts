/**
 * function that takes a social media link and returns the expected username
 * @param link String
 * @returns String
 */
export function getUsernameFromLink(link: string) {
  return link.split("/").at(-1);
}

export function formDataToObject<T>(formData: FormData) {
  return Object.fromEntries(formData.entries()) as T;
}

export function objectToFormData(
  obj: any,
  formData: FormData = new FormData(),
  namespace = "",
): FormData {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key) || obj[key] === undefined) continue;

    const formKey = namespace ? `${namespace}[${key}]` : key;
    formData.append(formKey, obj[key]);
  }

  return formData;
}

export function debugLog(message: any) {
  const env: "debug" | "production" = "debug";
  if (env === "debug") {
    return console.log(message);
  }
}

export function getStarSize(
  total: number,
  current: number,
): "full" | "half" | "empty" {
  const b = total.toString().split(".");
  if (b.length > 1) {
    const whole = Number(b[0]);
    const fraction = Number(b[1]);
    if (whole > current) return "full";
    if (fraction > 0 && whole === current) return "half";
  }
  if (current <= total) return "full";
  return "empty";
}

export function fallbackImage(src?: string) {
  if (!src || !src.toLowerCase().startsWith("http"))
    return "/images/user-avatar.png";
  return src;
}

export function joinFormData(formData1: FormData, formData2: FormData) {
  for (let pair of formData2.entries()) {
    formData1.append(pair[0], pair[1]);
  }
  return formData1;
}

export function capitalizeFirst(s: string) {
  return s
    .split("")
    .map((v, i) => (i == 0 ? v.toUpperCase() : v))
    .join("");
}

export function fullName(...props: (string | undefined)[]) {
  return props.map((v) => capitalizeFirst(v ?? "")).join(" ");
}

export function formatNumber(num: number, asMoney = false): string {
  const _num = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  if (asMoney) return `₦${_num}`;
  return _num;
}

export function sanitizeSearch(q: string) {
  // remove all special or url breaking characters
  return decodeURIComponent(q).replace(/[^a-zA-Z0-9 ]/g, "");
}

export function buildUrlQuery(obj: { [key: string]: any } | undefined) {
  if (!obj) return "";
  return (
    "?" +
    Object.entries(obj)
      .map((v) => `${v[0]}=${v[1] ?? ""}`)
      .join("&")
  );
}

export function generateRoomId(str1: string, str2: string) {
  return [str1, str2].sort().join("_");
}

export function getParentIds(element: any): string[] {
  const parentIds = [];
  let currentElement = element;
  while (currentElement && currentElement.parentNode) {
    if (currentElement.id) {
      parentIds.push(currentElement.id);
    }
    currentElement = currentElement.parentNode;
  }
  return parentIds;
}

export function tryCatch(tryFn: () => any, catchFn: (e: any) => any) {
  try {
      return tryFn()
  } catch (e) {
      return catchFn(e)
  }
}