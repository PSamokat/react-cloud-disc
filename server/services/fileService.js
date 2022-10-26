import fs from 'fs'
import {config} from "../config/default.js";

class FileService {


    createDir(file) {
        const filePath = `${config.filePath}\\${file.user}\\${file.path}`
        return new Promise(((resolve, reject) => {
            try {
                if(!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    resolve({message: 'Файл создан'})
                } else {
                    reject({message: 'Файл уже существует'})
                }

            } catch (e) {
                reject({message: 'Ошибка файла'})
            }
        }))
    }

    deleteFile (file) {
        const path = this.getPath(file)
        if (file.type === 'dir') {
            fs.rmdirSync(path)
        } else {
            fs.unlinkSync(path)
        }
    }

    getPath(file) {
        return config.filePath + '\\' + file.user + '\\' + file.path;
    }
}

export const fileService = new FileService()