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

  //#region 'File upload - Browse click'

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

  //#endregion

  //#region 'File drag n drop'

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

  //#endregion

  return (
    <div
      className={`dropzone-wrapper ${props.className} ${
        props.disabled ? "disabled" : ""
      }`}
    >
      <div
        className={`w-100 dropzone p-2 rounded d-flex flex-column justify-content-center align-items-center ${
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
        <span className="pt-1">
          <i className="material-icons">cloud_upload</i>
        </span>
        <p className="mb-0 pb-0">Drag and drop</p>
        <p className="mb-1">or</p>
        <button
          type="button"
          className="btn btn-secondary w-25 mb-1"
          disabled={props.disabled}
          onClick={openFileDialog}
          style={{
            cursor: props.disabled ? "default" : "pointer",
          }}
        >
          Upload
        </button>
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
