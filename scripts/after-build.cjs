/**
 * 打包完之后将 src/assets 目录 复制到 lib 目录 下
 */

const fs = require("fs");
const path = require("path");

function copy ( from , to ) {
  const srcAssetsDir = path.join(__dirname, "../" + from);
  const libAssetsDir = path.join(__dirname, "../" + to);

  if (fs.existsSync(libAssetsDir)) {
    fs.rmSync(libAssetsDir, { recursive: true });
  }

  fs.mkdirSync(libAssetsDir);

  fs.readdirSync(srcAssetsDir).forEach((file) => {
    fs.copyFileSync(
      path.join(srcAssetsDir, file),
      path.join(libAssetsDir, file)
    );
  });
}

function toAssets() {
  copy("src/assets", "lib/assets");
}

function toLogs() {
  copy("src/logs", "lib/logs");
}

toAssets();
toLogs();
