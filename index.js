import http from "http";
import fs from "fs";
import url from "url";
import getAFile from "./tools/getAFile.js";
import getAllFiles from "./tools/getAllFilename.js";
import createAfile from "./tools/createAfile.js";
import deleteAFile from "./tools/deleteAFile.js";
import updateAfile from "./tools/updateAfile.js";

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  // Get All Files
  if (parsedUrl.pathname === "/file" && req.method === "GET") {
    const response = getAllFiles();
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(response));
  }

  // Get A File
  if (parsedUrl.pathname.includes("file") && req.method === "GET") {
    const requestedFilename = parsedUrl.pathname.split("/")[2];
    const response = getAFile(requestedFilename);
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(response));
  }

  // Creating A File
  if (parsedUrl.pathname.includes("file") && req.method === "POST") {
    const requestedFilename = parsedUrl.pathname.split("/")[2];
    let chunk = "";

    req.on("data", (data) => {
      chunk += data;
    });
    req.on("end", () => {
      const fileData = JSON.parse(chunk);
      const response = createAfile(requestedFilename, fileData);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(response));
    });
  }

  // Updating A File
  if (parsedUrl.pathname.includes("file") && req.method === "PUT") {
    const requestedFilename = parsedUrl.pathname.split("/")[2];
    let chunk = "";
    req.on("data", (data) => {
      chunk += data;
    });
    req.on("end", () => {
      const fileData = JSON.parse(chunk);
      const response = updateAfile(requestedFilename, fileData);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(response));
    });
  }

  // Deleting A File
  if (parsedUrl.pathname.includes("file") && req.method === "DELETE") {
    const requestedFilename = parsedUrl.pathname.split("/")[2];
    const response = deleteAFile(requestedFilename);
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(response));
  }

  // A error page
  if (req.method === "GET") {
    res.writeHead(404, { "Content-Type": "text/html" });
    return res.end("<h1>No Content</h1>");
  }
});

server.listen(3000, () => {
  console.log("server started");
});
