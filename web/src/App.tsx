import React, { useState } from "react";
import "./App.scss";
import FileDropzoneComponent from "./file-dropzone/File-Dropzone";
import ProgressComponent from "./progress/Progress";
import { uploadFile } from "./App.service";

type IFileModel = {
  file: File;
  status: "Complete" | "None" | "Progress" | "Fail";
  uploadProgress: number;
};

function App() {
  const [files, setFiles] = useState<IFileModel[]>([]);
  const [uploadProgress, setUploadProgress] = useState<boolean>(false);

  const onFileRemoveClick = (index: number) => {
    const _files: IFileModel[] = [...files];
    _files.splice(index, 1);
    setFiles(_files);
  };

  const onFileUploadProgress = (progress: number, fileIndex: number) => {
    const _files: IFileModel[] = [...files];
    _files[fileIndex].status = "Progress";
    _files[fileIndex].uploadProgress = progress;
    setFiles(_files);
  };

  const renderFileUploadStatus = (file: IFileModel, index: number) => {
    switch (file.status) {
      case "Complete":
        return (
          <span>
            <i style={{ color: "#28a745" }} className="material-icons">
              check_circle
            </i>
          </span>
        );
      case "Fail":
        return (
          <span>
            <i style={{ color: "#ff0000bf" }} className="material-icons">
              error
            </i>
          </span>
        );
      case "Progress":
        return (
          <div className="w-25">
            <ProgressComponent progress={file.uploadProgress} />
          </div>
        );
      case "None":
        return (
          <span
            style={{
              cursor: uploadProgress ? "not-allowed" : "pointer",
            }}
            onClick={() => onFileRemoveClick(index)}
          >
            <i className="material-icons">delete</i>
          </span>
        );
    }
  };

  const onFileUploadSubmitClick = () => {
    try {
      setUploadProgress(true);

      Promise.allSettled(
        files.map(async (file: IFileModel, index: number) => {
          const response: any = await uploadFile(
            file.file,
            index,
            onFileUploadProgress
          );
          return {
            response,
            index,
          };
        })
      ).then((results: any[]) => {
        let _files: IFileModel[] = [...files];
        results.map((result: any) => {
          if (result.status === "fulfilled") {
            _files[result.value.index].uploadProgress = 100;
            _files[result.value.index].status = "Complete";
          }
          return null;
        });

        _files = [..._files].map((f: IFileModel) => {
          if (f.status === "Progress") {
            f.status = "Fail";
            f.uploadProgress = 0;
          }
          return f;
        });

        setFiles(_files);
      });

      setUploadProgress(false);
    } catch (error) {}
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col d-flex flex-column align-items-center">
          <h1 className="mt-4 mb-4 p-2">File upload and dropzone</h1>
          <section className="w-50 mt-2 mb-4">
            <FileDropzoneComponent
              disabled={uploadProgress}
              multiple={true}
              onFilesAdded={(_files: File[]) => {
                const newFiles: IFileModel[] = _files.map((f: File) => {
                  return {
                    file: f,
                    status: "None",
                    uploadProgress: 0,
                  };
                });
                setFiles([...files, ...newFiles]);
              }}
            />
          </section>
          <section className="w-50 d-flex flex-column ">
            {files.length ? (
              <>
                <div
                  className="pt-2 pb-2 mb-3 border"
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  {files.map((file: IFileModel, index: number) => {
                    return (
                      <div
                        className="p-1 pl-2 pr-2 d-flex justify-content-between align-items-center"
                        key={index}
                      >
                        <span
                          className="d-inline-block text-truncate"
                          style={{ maxWidth: "300px" }}
                        >
                          {file.file.name}
                        </span>
                        {renderFileUploadStatus(file, index)}
                      </div>
                    );
                  })}
                </div>
                <div className="d-flex justify-content-around">
                  <button
                    type="button"
                    disabled={uploadProgress}
                    className="btn btn-danger w-25"
                    onClick={() => {
                      setFiles([]);
                    }}
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    disabled={uploadProgress}
                    className="btn btn-success w-25"
                    onClick={onFileUploadSubmitClick}
                  >
                    Submit
                  </button>
                </div>
              </>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
