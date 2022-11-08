import fs from 'fs'
import {sep} from "path";

class FileService {


    createDir(req, file) {
        const filePath = this.getPath(req, file)
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

    deleteFile (req, file) {
        const path = this.getPath(req, file)
        if (file.type === 'dir') {
            fs.rmdirSync(path)
        } else {
            fs.unlinkSync(path)
        }
    }

    getPath(req, file) {
        return req.filePath + sep + file.user + sep + file.path;
    }
}

export const fileService = new FileService()