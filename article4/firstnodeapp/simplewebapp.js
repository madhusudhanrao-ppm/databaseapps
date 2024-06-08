"use strict";
Error.stackTraceLimit = 50;
const http = require("http");
const oracledb = require("oracledb");

if (process.env.NODE_ORACLEDB_DRIVER_MODE === "thick") {
  let clientOpts = {}; 
  if (
    process.platform === "win32" ||
    (process.platform === "darwin" && process.arch === "x64")
  ) {
    clientOpts = { libDir: process.env.NODE_ORACLEDB_CLIENT_LIB_DIR };
  }
  oracledb.initOracleClient(clientOpts);  
} 
console.log(oracledb.thin ? "Running in thin mode" : "Running in thick mode"); 
const httpPort = 8080;


 
async function init() {
  try {
    await oracledb.createPool({
      user: "<username>",
      password: "<password>",
      connectString: "<public-ip>:1521/FREEPDB1", 
    }); 
    const connection = await oracledb.getConnection(); 
    // Create HTTP server and listen on port httpPort
    const server = http.createServer();
    server.on("error", (err) => {
      console.log("HTTP server problem: " + err);
    });
    server.on("request", (request, response) => {
      handleRequest(request, response);
    });
    await server.listen(httpPort);
    console.log("Server is running at http://localhost:" + httpPort); 
  } catch (err) {
    console.error("init() error: " + err.message);
  }
}
 

async function handleRequest(request, response) {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute( `select ename, empno, sal, hiredate from emp`  ); 
    displayResults( response,  result );
  } catch (err) {
    handleError(response, "handleRequest() error", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

// Display query results
function displayResults(response, result ) {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write("<!DOCTYPE html>");
  response.write("<html>");
  response.write("<head>");
  response.write(
    "<style> table {border-collapse: collapse; margin-left:auto; margin-right:auto;} td, th {padding:8px;border-style:solid} </style>\n"
  ); 
  response.write("</head><body><table>"); 
  // Column Titles
  response.write("<tr>");
  for (let col = 0; col < result.metaData.length; col++) {
    response.write("<th>" + result.metaData[col].name + "</th>");
  }
  response.write("</tr>");
  // Rows
  for (let row = 0; row < result.rows.length; row++) {
    response.write("<tr>");
    for (let col = 0; col < result.rows[row].length; col++) {
      response.write("<td>" + result.rows[row][col] + "</td>");
    }
    response.write("</tr>");
  }
  response.write("</table></body>\n</html>");
  response.end();
}

// Report an error
function handleError(response, text, err) {
  if (err) {
    text += ": " + err.message;
  }
  console.error(text);
  response.writeHead(500, { "Content-Type": "text/html" });
  response.write(text);
  response.end();  
async function closePoolAndExit() {
  console.log("\nTerminating");
  try { 
    await oracledb.getPool().close(10);
    console.log("Pool closed");
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
} 
process.once("SIGTERM", closePoolAndExit).once("SIGINT", closePoolAndExit); 
init();