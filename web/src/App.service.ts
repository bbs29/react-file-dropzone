import axios, { AxiosInstance } from "axios";

const POST_FILE_UPLOAD = "upload";

const ApiService: AxiosInstance = axios.create({
  baseURL: `${
    process.env.NODE_ENV === "development"
      ? "http://localhost:7000/"
      : "https://react-file-upload-service.herokuapp.com/"
  }`,
});

const uploadFile = async (file: File, fileIndex: number, progressCb: any) => {
  const config = {
    onUploadProgress: function (progressEvent: any) {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );

      progressCb(percentCompleted, fileIndex);
    },
  };
  let formData = new FormData();
  formData.append("file", file, file.name);

  return ApiService.post(POST_FILE_UPLOAD, formData, config);
};

export { uploadFile };
export default ApiService;
