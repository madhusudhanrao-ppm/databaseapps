import React, { useState, useEffect } from "react";
import axios from "axios";

function Employee() {
  const [post, setPost] = useState({});
  //Initialize the first employee id (in our case employee number)
  const [id, setId] = useState(7369);
  const [idFromButtonClick, setIdOnClick] = useState(7369);
  //set employee id based on button click
  const handleButtonClick = () => {
    setIdOnClick(id);
  };

  useEffect(() => {
    axios
      .get(
        `http://<public-ip>:8080/ords/freepdb1/docws/hr/employees/${idFromButtonClick}`
      )
      .then((res) => {
        console.log(res);
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idFromButtonClick]);

  return (
    <div>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <button type="button" onClick={handleButtonClick}>
        {" "}
        Get Data{" "}
      </button>
      <div>
        Name: {post.ename} <br />
        Hire Date: {post.hiredate} <br /> Job {post.job} <br /> Salary{" "}
        {post.sal}
      </div>
    </div>
  );
}
export default Employee;
