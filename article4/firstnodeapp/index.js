const oracledb = require("oracledb");

async function runApp() {
  let connection;
  try {
    //Create connection
    connection = await oracledb.getConnection({
      user: "<username>",
      password: "<password>",
      connectString: "<public-ip>:1521/FREEPDB1",
    });
    console.log("Connected to Oracle Database 23ai");   
    //get resultset
    result = await connection.execute("select ename, empno from emp", [], {
      resultSet: true,
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    const rs = result.resultSet; 
    let row;
    while ((row = await rs.getRow())) {
      console.log(row);
    }
    await rs.close(); 
     
  } catch (err) {
    console.error(err);
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
runApp();
