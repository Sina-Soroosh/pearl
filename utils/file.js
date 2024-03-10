import fs from "fs";
const cloudinary = require("cloudinary").v2;

const saveFile = async (file) => {
  const data = fs.readFileSync(file[0]._writeStream.path);
  fs.writeFileSync(`./public/images/products/${file[0].newFilename}.png`, data);
  await fs.unlinkSync(file[0]._writeStream.path);
  return `/images/products/${file[0].newFilename}.png`;
};

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
