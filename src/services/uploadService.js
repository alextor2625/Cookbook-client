import { post } from "./authService";


export const uploadImg = (image) => {
  const uploadData = new FormData();
  uploadData.append("image", image);
  return post("/upload/image", uploadData)
};


