import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useState } from "react";
import "./UpdateUser.css";

function UpdateUser() {
  const [inputs, setInputs] = useState();
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://Localhost:5000/users/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.user));
    };
    fetchHandler();
  }, [id]);

  const sendRequeset = async () => {
    await axios
      .put(`http://Localhost:5000/users/${id}`, {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        age: Number(inputs.age),
        address: String(inputs.address),
      })
      .then((res) => res.data);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequeset().then(() => history("/userdetails"));
  };

  return (
    <div>
      <h1>Update User</h1>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={inputs.name}
              required
            />
          </label>
          <br />
          <label>
            Age:
            <input
              type="number"
              name="age"
              onChange={handleChange}
              value={inputs.age}
              required
            />
          </label>
          <br />
          <label>
            Gmail:
            <input
              type="email"
              name="gmail"
              onChange={handleChange}
              value={inputs.gmail}
              required
            />
          </label>
          <br />
          <label>
            Address:
            <textarea
              name="address"
              onChange={handleChange}
              value={inputs.address}
              required
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default UpdateUser;
