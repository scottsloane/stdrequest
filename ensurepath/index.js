import fs from "fs";
import path from "path";

export default function ensurePath(p) {
  let dir = path.dirname(p);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}
