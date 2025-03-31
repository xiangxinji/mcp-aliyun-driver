import fs from "fs";
import path from "path";

export function readAssetStream(filename: string) {
  return fs.createReadStream(path.resolve("lib/assets/" + filename));
}



