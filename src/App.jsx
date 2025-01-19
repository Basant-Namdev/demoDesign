import React, { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCopy, faSave, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [variables, setVariables] = useState([
    { key: "API_BASE_URL", value: "https://api.qa.example.com", type: "Text" },
    { key: "API_KEY", value: "********", type: "Text", hidden: true },
    { key: "TIMEOUT", value: "30000", type: "Text" },
  ]);

  // State to manage visibility of the password
  const [passwordVisible, setPasswordVisible] = useState({});

  // Function to toggle password visibility
  const togglePasswordVisibility = (index) => {
    setPasswordVisible(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // Function to handle value change
  const handleValueChange = (index, event) => {
    const newVariables = [...variables];
    newVariables[index].value = event.target.value;
    setVariables(newVariables);
  };

  // Function to handle variable type change
  const handleTypeChange = (index, event) => {
    const newVariables = [...variables];
    newVariables[index].type = event.target.value;
    setVariables(newVariables);
  };

  // Function to add a new variable
  const addNewVariable = () => {
    setVariables([...variables, { key: "", value: "", type: "Text" }]);
  };

  // Function to delete a variable
  const deleteVariable = (index) => {
    const newVariables = variables.filter((_, i) => i !== index);
    setVariables(newVariables);
  };

  // Function to handle save changes (simulate saving)
  const handleSaveChanges = () => {
    alert("Changes Saved!");
    // You can implement saving logic here, e.g., send data to a server
  };

  return (
    <div className="container">
      <h2 className="mt-4" style={{ marginBottom: "1rem" }}>Environment Variables</h2>
      <div id="nav">
        <div>Variables</div>
        <div>Variable Sets</div>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <b>Active Set: default</b>
        <p style={{ color: "blue", cursor: "pointer" }} onClick={addNewVariable}>Create New Set</p>
      </div>
      <table className="table custom-bordered">
        <thead >
          <tr >
            <th style={{ backgroundColor: "#8080801c" }}>Key</th>
            <th style={{ backgroundColor: "#8080801c" }}>Value</th>
            <th style={{ backgroundColor: "#8080801c" }}>Type</th>
            <th style={{ backgroundColor: "#8080801c" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {variables.map((variable, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={variable.key}
                  onChange={(e) => {
                    const newVariables = [...variables];
                    newVariables[index].key = e.target.value;
                    setVariables(newVariables);
                  }}
                />
              </td>
              <td>
                <div className="position-relative">
                  <input
                    type={passwordVisible[index] ? "text" : "password"}
                    className="form-control"
                    value={variable.value}
                    onChange={(e) => handleValueChange(index, e)}
                  />
                  <FontAwesomeIcon
                    icon={passwordVisible[index] ? faEyeSlash : faEye}
                    size="1.5x"
                    className="position-absolute top-50 end-0 translate-middle-y me-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => togglePasswordVisibility(index)}
                  />
                </div>
              </td>
              <td>
                <select
                  className="form-select"
                  value={variable.type}
                  onChange={(e) => handleTypeChange(index, e)}
                >
                  <option value="Text">Text</option>
                  <option value="Number">Number</option>
                </select>
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faCopy}
                  size="1.5x"
                  style={{ marginLeft: ".3rem" }}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  size="1.5x"
                  style={{ color: "#a92d39", marginLeft: "1rem", cursor: "pointer" }}
                  onClick={() => deleteVariable(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div >
        <button className="addNew" onClick={addNewVariable}>+ Add New Variable</button>
      </div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button
          className="btn"
          style={{ boxShadow: "0 0px 1px black", marginRight: "1rem" }}
        >
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSaveChanges}>
          <FontAwesomeIcon icon={faSave} className="me-2" size="1.5x" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default App;
