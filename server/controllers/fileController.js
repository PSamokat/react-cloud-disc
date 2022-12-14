import {fileService} from "../services/fileService.js";
import User from "../models/User.js";
import File from "../models/File.js";
import fs from 'fs';
import {sep} from "path";


class FileController {
    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body
            const file = new File ({
                name,
                type,
                parent,
                user: req.user.id
            })
            const parentFile = await File.findOne({_id: parent})
            if (!parentFile) {
                file.path = name
                await fileService.createDir(req, file)
            } else {
                file.path = `${parentFile.path}${sep}${file.name}`
                await fileService.createDir(req, file)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }
            await file.save()
            res.json(file)
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    async getFiles(req,res) {
        try{
            const files = await File.find({user: req.user.id, parent: req.query.parent})
            const parentDir = await File.findOne({user: req.user.id, _id: req.query.parent})
            res.json({parent: parentDir?.parent ?? null, files})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Невозможно получить файл"})
        }
    }

    async uploadFile(req,res) {
        try {
            const file = req.files.file
            const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
            const user = await User.findOne({_id: req.user.id})
            let path

            if (user.usedSpace + file.size > user.diskSpace){
                res.status(400).json({message: 'Недостаточно места'})
                return
            }
            user.usedSpace += file.size

            function checkFileName (parentPath, name) {
                if (fs.existsSync(parentPath + name)) {
                    name = '(copy)' + name
                    return checkFileName(parentPath , name)
                } else {
                    return name
                }
            }
            if(parent){
                path = `${req.filePath}${sep}${user._id}${sep}${parent.path}${sep}`
                file.name = checkFileName(path,file.name)
            } else {
                path = `${req.filePath}${sep}${user._id}${sep}`
                file.name = checkFileName(path, file.name)
            }
            await file.mv(path + file.name)
            const type = file.name.split('.').pop()
            let filePath = file.name
            if (parent) {
                filePath = `${parent.path}${sep}${file.name}`
            }
            const dbFile = new File ({
                name: file.name,
                type,
                size: file.size,
                path: filePath,
                parent: parent ? parent?._id : null,
                user: user._id
            })
            await dbFile.save()
            await user.save()
            res.json(dbFile)
        } catch (e) {
            return res.status(400).json({message: "Ошибка загрузки файла"})
        }
    }

    async downloadFile (req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            const path = fileService.getPath(req, file)
            if (fs.existsSync(path)) {
                res.download(path, file.name)
                return
            }
            res.status(400).json({message: "Такого файла не существует"})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Ошибка скачивания"})
        }
    }

    async deleteFile (req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            if (!file) {
                res.status(400).json({message: 'Файл не найден'})
            }
            fileService.deleteFile(req, file)
            await file.remove()
            res.json({message: 'Файл удален'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Диркетория не пустая'})
        }
    }
}



export const fileController = new FileController();