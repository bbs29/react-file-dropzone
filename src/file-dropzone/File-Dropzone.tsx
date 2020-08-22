import * as React from "react";
import "./File-Dropzone.scss";

type IProps = {
  disabled?: boolean;
  onFilesAdded: (files: File[]) => void;
  validationMessages?: string[];
  multiple?: boolean;
  accept?: string;
  className?: string;
};

const FileDropzoneComponent = (props: IProps) => {
  let fileInputRef: any = React.useRef<HTMLInputElement>();

  const [highlight, setHighlight] = React.useState<boolean>(false);

  const onFilesAdded = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (props.disabled) return;

    if (e.target && e.target.files) {
      props.onFilesAdded(Array.from(e.target.files));
      return;
    }
    props.onFilesAdded([]);
  };

  const openFileDialog = () => {
    if (props.disabled) {
      return;
    }
    fileInputRef && fileInputRef.click();
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (props.disabled) return;

    setHighlight(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHighlight(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (props.disabled) return;

    if (e.dataTransfer && e.dataTransfer.files) {
      props.onFilesAdded(Array.from(e.dataTransfer.files));
      setHighlight(false);
      return;
    }

    props.onFilesAdded([]);
    setHighlight(false);
  };

  return (
    <div
      className={`dropzone-wrapper ${props.className} ${
        props.disabled ? "disabled" : ""
      }`}
    >
      <div
        className={`w-100 dropzone rounded d-flex flex-column justify-content-center align-items-center ${
          highlight ? "highlight" : ""
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          ref={(el) => (fileInputRef = el)}
          className="d-none"
          type="file"
          accept={props.accept ? props.accept : ""}
          multiple={props.multiple ? true : false}
          onChange={onFilesAdded}
        />
        <p style={{ fontSize: "large" }}>
          Drag and drop or{" "}
          <span
            className="browse"
            onClick={openFileDialog}
            style={{
              cursor: props.disabled ? "default" : "pointer",
              color: props.disabled ? "inherit" : "#0a9bcd",
            }}
          >
            browse
          </span>
        </p>
        {props.validationMessages && props.validationMessages.length
          ? props.validationMessages.map((message: string, index: number) => {
              return (
                <small className="pb-1" key={index}>
                  {message}
                </small>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default FileDropzoneComponent;
