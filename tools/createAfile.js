import fs from "fs";
import path from "path";
const filePath = path.join(path.resolve(), "root");
const createAfile = (fileName, fileData) => {
  try {
    if (fs.existsSync(path.join(filePath, fileName))) {
      return {
        success: false,
        message: "File already exists",
      };
    }
    fs.writeFileSync(path.join(filePath, fileName), JSON.stringify(fileData));
    return {
      success: true,
      message: "File created successfully",
      fileurl: `http://localhost:3000/file/${fileName}`,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message||"File Creation Failed",
    };
  }
};

export default createAfile;
