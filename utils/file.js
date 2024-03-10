const cloudinary = require("cloudinary").v2;

const configCloudinary = () => {
  return cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
};

const optionsCloudinary = () => {
  return {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
};

export { saveFile, configCloudinary, optionsCloudinary };
