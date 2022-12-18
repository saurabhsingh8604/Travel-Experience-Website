/*Cloudinary documentation for media upload via api: https://cloudinary.com/documentation/upload_images#uploading_with_a_direct_call_to_the_rest_api
Check "Required parameters for unauthenticated requests" session
You will need to enable upload_preset inside the Management Console (Settings) -> Upload tab -> Upload presets*/
// require("dotenv").config({
//   path: "../../../backend/config/config.env",
// });

export const FileUpload = async (file) => {
    let result = null;

    let formData = new FormData();
    formData.append('file', file);
formData.append("upload_preset", "pahhsmut");

    const config = {
      "content-type":"multipart/form-data",
      "Access-Control-Allow-Origin":"true",
    }

    await fetch(
      `https://api.cloudinary.com/dpxvvt4u3/image/upload `,
      {
        method: "POST",
        body: formData,
        config,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        result = data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    return result;
}


