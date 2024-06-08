import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Scanner; 
import oracle.jdbc.OracleConnection; 
import oracle.jdbc.pool.OracleDataSource;

public class StatementSample { 
 
  private static final String SQL_SELECT_ALL = "SELECT * FROM EMP";   
  private static final String DEFAULT_USER = "<username>";
  private static final String DEFAULT_URL = "jdbc:oracle:thin:@<public-ip>:1521/FREEPDB1"; 
  private final String user;
  private final String password;
  private final String url;
 
  private StatementSample(String user, String pwd, String url) {
    this.user = user;
    this.password = pwd;
    this.url = url;
  }

   public static void main(String args[]) throws SQLException, IOException { 
    String url = "jdbc:oracle:thin:@<public-ip>:1521/FREEPDB1";
    String user = "<username>";  
    String pwd = "<password>"; 
    StatementSample demo = new StatementSample(user, pwd, url);
    demo.startDemo();
  }
     
 
  private OracleConnection getConnection() throws SQLException {
    OracleDataSource ods = new OracleDataSource();
    ods.setUser(user);
    ods.setPassword(password);
    ods.setURL(url);
    return (OracleConnection)ods.getConnection();
  } 
  private void startDemo() throws SQLException {
    OracleConnection connection = getConnection();
    try { 
          selectAll(connection); 
    }
    finally {
      connection.close();
    } 
  } 
 
  
    
  private void selectAll(OracleConnection connection) {
    try(Statement stmt = connection.createStatement()) {
      ResultSet rs = stmt.executeQuery(SQL_SELECT_ALL);
      while(rs.next()) {
        Employee emp = new Employee(rs.getInt("EMPNO"),
            rs.getString("ENAME"), rs.getString("JOB"),
            rs.getString("HIREDATE"), rs.getDouble("SAL"));
        emp.print();
      }
    }
    catch(SQLException sqle) {
      showError(sqle.getMessage());
    }
  } 

  private static void show(String msg) {
    System.out.println(msg);
  }

  private static void showError(String msg) {
    System.out.println("Error : " + msg);
  }
 
  private static class Employee {
    private int id;
    private String name;
    private String designation;
    private String joiningDate;
    private double salary;

    Employee(int id, String name, String designation, String joiningDate,
        double salary) {
      super();
      this.id = id;
      this.name = name;
      this.designation = designation;
      this.joiningDate = joiningDate;
      this.salary = salary;
    } 
    int getId() {
      return id;
    } 
    String getName() {
      return name;
    } 
    String getDesignation() {
      return designation;
    } 
    String getJoiningDate() {
      return joiningDate;
    } 
    double getSalary() {
      return salary;
    } 
    void print() {
      show(
          "/----------------------------------------------------------------/");
      show("ID          : " + id);
      show("NAME        : " + name);
      show("Designation : " + designation);
      show("Joining Date: " + joiningDate);
      show("Salary      : " + salary);
      show(
          "/----------------------------------------------------------------/");
    }

  }

}