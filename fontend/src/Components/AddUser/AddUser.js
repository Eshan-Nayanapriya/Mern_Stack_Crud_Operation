import "./AddUser.css";
import React, { useState } from "react";
import NAV from "../nav/nav";
import { useNavigate } from "react-router";
import axios from "axios";

function AddUser() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    age: "",
    address: "",
  });

  const handleChange =(e) =>{
    setInputs((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  };

  const handleSubmit =(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequeset().then(()=>history('/userdetails'))
  }

  const sendRequeset = async()=>{
    await axios.post("http://Localhost:5000/users",{
        name: String (inputs.name),
        gmail: String (inputs.gmail),
        age: Number (inputs.age),
        address: String (inputs.address),
    }).then(res => res.data);
  }

  return (
    <div>
      <NAV />
      <h1>Add user page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" onChange={handleChange} value = {inputs.name} required />
        </label>
        <br />
        <label>
          Age:
          <input type="number" name="age" onChange={handleChange} value = {inputs.age} required />
        </label>
        <br />
        <label>
          Gmail:
          <input type="email" name="gmail" onChange={handleChange} value = {inputs.gmail} required />
        </label>
        <br />
        <label>
          Address:
          <textarea name="address" onChange={handleChange} value = {inputs.address} required />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddUser;
