import fs from "fs";
import path from "path";

const filePath = path.join(path.resolve(), "root");

const deleteAFile = (fileName) => {
  try {
    if (fs.existsSync(path.join(filePath, fileName))) {
      fs.unlinkSync(path.join(filePath, fileName));
      return {
        success: true,
        message: "File deleted successfully",
      };
    } else {
      return {
        success: false,
        message: "File not found",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message||"File Deletion Failed",
    };
  }
};

export default deleteAFile;
