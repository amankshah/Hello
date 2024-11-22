import { promises as fs } from "fs";

// Define the type for JSON objects as a generic record
type JSONObject = Record<string, any>;

export async function readJSON(filePath: string): Promise<JSONObject | null> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data); // Parse and return the JSON object
  } catch (error) {
    console.error("Error reading JSON:", error);
    return null; // Return null if an error occurs
  }
}

export function compareJSON(json1: JSONObject, json2: JSONObject): string[] {
  const discrepancies: string[] = [];

  function compare(
    obj1: JSONObject,
    obj2: JSONObject,
    path: string = ""
  ): void {
    for (const key in obj1) {
      if (Object.prototype.hasOwnProperty.call(obj1, key)) {
        const newPath = path ? `${path}.${key}` : key;
        if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
          discrepancies.push(`Missing key in JSON-2: ${newPath}`);
        } else if (typeof obj1[key] === "object" && obj1[key] !== null) {
          compare(obj1[key], obj2[key], newPath);
        } else if (obj1[key] !== obj2[key]) {
          discrepancies.push(
            `Value mismatch at ${newPath}: ${obj1[key]} !== ${obj2[key]}`
          );
        }
      }
    }

    for (const key in obj2) {
      if (Object.prototype.hasOwnProperty.call(obj2, key) && !Object.prototype.hasOwnProperty.call(obj1, key)) {
        const newPath = path ? `${path}.${key}` : key;
        discrepancies.push(`Missing key in JSON-1: ${newPath}`);
      }
    }
  }

  compare(json1, json2);
  return discrepancies;
}
