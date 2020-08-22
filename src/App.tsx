import React from "react";
import "./App.scss";
import FileDropzoneComponent from "./file-dropzone/File-Dropzone";

function App() {
  return (
    <div className="container">
      <div className="row mt-5 mb-4">
        <div className="col d-flex justify-content-center p-4">
          <h1>File dropzone</h1>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center">
          <FileDropzoneComponent
            className="w-50"
            onFilesAdded={(files: File[]) => {
              console.log("Added files are - ", files);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
