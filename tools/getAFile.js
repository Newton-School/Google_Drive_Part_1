import fs from 'fs';
import path from 'path';

const filePath = path.join(path.resolve(), 'root');

const getAFile = (fileName) => {
    if (fs.existsSync(path.join(filePath, fileName))) {
        const file = JSON.parse(fs.readFileSync(path.join(filePath, fileName),"utf-8"));
        return {
            success: true,
            fileContent: file,
        };
    }else{
        return {
            success: false,
            message: 'File not found'
        };
    }
}

export default getAFile;