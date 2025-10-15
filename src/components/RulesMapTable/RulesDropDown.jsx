import React, { useState } from "react";
import "./RulesDropdown.css"; // Import CSS file
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrash} from "@fortawesome/free-solid-svg-icons"

const data = {
  "Branch A": {
    "Rule 1": ["Test Case 1", "Test Case 2"],
    "Rule 2": ["Test Case 3", "Test Case 4"],
  },
  "Branch B": {
    "Rule 3": ["Test Case 5", "Test Case 6"],
    "Rule 4": ["Test Case 7", "Test Case 8"],
  },
};
const RulesDropDown = () => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedRule, setSelectedRule] = useState("");
  const [selectedTestCase, setSelectedTestCase] = useState("");
  const [rows, setRows] = useState([]);
  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
    setSelectedRule("");
    setSelectedTestCase("");
  };
  const handleRuleChange = (e) => {
    setSelectedRule(e.target.value);
    setSelectedTestCase("");
  };
  const handleTestCaseChange = (e) => {
    setSelectedTestCase(e.target.value);
  };
  const handleAddRow = () => {
    if (selectedBranch && selectedRule && selectedTestCase) {
      setRows([
        ...rows,
        {
          branch: selectedBranch,
          rule: selectedRule,
          testCase: selectedTestCase,
        },
      ]);
    }
  };
  const handleDeleteRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };
  return (
    <div className="container-rule-mapping">
      <div className="dropdown-container">
        <div>
          <label>Available Branch Name: </label>
          <select onChange={handleBranchChange} value={selectedBranch}>
            <option value="">Select Branch</option>
            {Object.keys(data).map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Available Rule Name: </label>
          <select
            onChange={handleRuleChange}
            value={selectedRule}
            disabled={!selectedBranch}
          >
            <option value="">Select Rule</option>
            {selectedBranch &&
              Object.keys(data[selectedBranch]).map((rule) => (
                <option key={rule} value={rule}>
                  {rule}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Available Test Case Names: </label>
          <select
            onChange={handleTestCaseChange}
            value={selectedTestCase}
            disabled={!selectedRule}
          >
            <option value="">Select Test Case</option>
            {selectedRule &&
              data[selectedBranch][selectedRule].map((testCase) => (
                <option key={testCase} value={testCase}>
                  {testCase}
                </option>
              ))}
          </select>
        </div>
        <button
          className="add-btn"
          onClick={handleAddRow}
          disabled={!selectedTestCase}
        >
          OK
        </button>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Branch Name</th>
            <th>Rule Name</th>
            <th>Test Case Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, index) => (
              <tr key={index}>
                <td>{row.branch}</td>
                <td>{row.rule}</td>
                <td>{row.testCase}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="delete-icon"
                    onClick={() => handleDeleteRow(index)}
                  />
                   <button className="run-btn">Run</button>
                </td>
               
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">
                No data added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default RulesDropDown;
