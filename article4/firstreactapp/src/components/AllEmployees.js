import React, { useEffect, useState } from "react";

function AllEmployees() {
  //set Employees
  const [employees, setEmployees] = useState([]); 
  //Fetch Data from REST API
  const fetchData = async () => {
    let res = await fetch(
      "http://<public-ip>:8080/ords/freepdb1/docws/hr/employees"
    );
    let data = await res.json();
    console.log(data); 
    setEmployees(data.items);
  }; 
  console.log("No of employees --> "+employees.length);
  //useEffects Hooks to Fetch Data from
  useEffect(() => { 
    fetchData();
  }, []);
 
  return (
    <div>
      <table>
        <tr className="custom-header">
          <th>Emp Number</th>
          <th>Name</th>
          <th>Job</th>
          <th>Hiredate</th>
        </tr>
        {employees.map((item, i) => (
          <tr key={i} className="custom-row">
            <td className="custom-cell">{item.empno}</td>
            <td>{item.ename}</td>
            <td>{item.job} </td>
            <td>{item.hiredate} </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default AllEmployees;

