import React from "react";
import "./Progress.scss";

type IProps = {
  progress: number;
};

const ProgressComponent = (props: IProps) => {
  return (
    <div className="progress-bar-container w-100 rounded">
      <div
        className="progress h-100 m-0 rounded"
        style={{ width: `${props.progress}%` }}
      />
    </div>
  );
};

export default ProgressComponent;
