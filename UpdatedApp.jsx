import React, { useState } from "react";

const FileUpload = ({ name, onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/json",
      ].includes(file.type)
    ) {
      setSelectedFile(file);
      onFileSelect(name, file);
    } else {
      alert("Only PDF, XLSX, and JSON files are allowed.");
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    onFileSelect(name, null);
  };

  return (
    <div className="file-upload">
      <label htmlFor={`file-input-${name}`} className="file-label">
        <h3>{name}</h3>
        <div className="file-input-container">
          <span className="file-input-overlay">
            Drag & Drop or <span className="browse">Browse</span>
          </span>
          <input
            type="file"
            id={`file-input-${name}`}
            className="file-input"
            accept=".pdf,.xlsx,.json"
            onChange={handleFileChange}
          />
          <p className="file-support">Supports: PDF, XLSX, JSON</p>
        </div>
      </label>
      {selectedFile && (
        <div className="selected-file">
          <h4>Selected File:</h4>
          <ul>
            <li>
              {selectedFile.name}
              <button className="remove-button" onClick={removeFile}>
                X
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
