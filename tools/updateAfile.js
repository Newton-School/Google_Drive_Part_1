import fs from "fs";
import path from "path";

const filePath = path.join(path.resolve(), "root");

const updateAfile = (fileName, fileData) => {
    try {
        if (fs.existsSync(path.join(filePath, fileName))) {
            fs.writeFileSync(path.join(filePath, fileName), JSON.stringify(fileData));
            return {
                success: true,
                message: "File updated successfully",
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
            message: error.message||"File Updation Failed",
        };
    }
};

export default updateAfile