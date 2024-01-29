import fs from "fs";

const saveFile = async (file) => {
  const data = fs.readFileSync(file[0]._writeStream.path);
  fs.writeFileSync(`./public/images/products/${file[0].newFilename}.png`, data);
  await fs.unlinkSync(file[0]._writeStream.path);
  return `/images/products/${file[0].newFilename}.png`;
};

export { saveFile };
