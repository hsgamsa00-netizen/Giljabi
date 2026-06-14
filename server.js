"use strict";
/* 감사 길잡이 비설치판 — 로컬 정적 서버 (Node 내장 모듈만 사용, 외부 통신 없음)
   실행: node server.js  (또는 시작.bat 더블클릭)  →  http://127.0.0.1:8787 */
const http = require("http"), fs = require("fs"), path = require("path"), url = require("url");
const ROOT = __dirname, PORT = process.env.PORT || 8787;
const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
  ".svg": "image/svg+xml", ".gif": "image/gif", ".ico": "image/x-icon",
};
http.createServer(function (req, res) {
  let p = decodeURIComponent(url.parse(req.url).pathname || "/");
  if (p === "/") p = "/index.html";
  const fp = path.join(ROOT, path.normalize(p).replace(/^(\.\.[\/\\])+/, ""));
  if (fp.indexOf(ROOT) !== 0) { res.writeHead(403); res.end("403"); return; }   // 디렉터리 탈출 차단
  fs.readFile(fp, function (err, data) {
    if (err) { res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }); res.end("404 Not Found"); return; }
    res.writeHead(200, { "Content-Type": MIME[path.extname(fp).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  });
}).listen(PORT, "127.0.0.1", function () {
  console.log("감사 길잡이 비설치판이 실행 중입니다 →  http://127.0.0.1:" + PORT);
  console.log("종료하려면 이 창을 닫으세요.");
});
