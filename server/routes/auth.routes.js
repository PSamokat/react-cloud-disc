import {Router} from 'express';
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import {check, validationResult} from "express-validator";
import jsonWebToken from "jsonwebtoken";
import {config} from "../config/default.js";
import authMiddleware from "../middleware/auth.middleware.js";
import {fileService} from "../services/fileService.js";
import File from "../models/File.js";


const router = new Router()

router.post('/registration',
    [
        check('email', 'Неправильно указана почта').isEmail(),
        check('password', 'Пароль должен содержать не менее 6 символов и хотябы одну цифру').matches(/(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{6,}/g)
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(400).json({message: 'Ошибка при регистрации', errors})
                return
            }
            const {email, password} = req.body
            const guest = await User.findOne({email})

            if(guest) {
                res.status(400).json({message: `Пользователь с адрессом ${email} уже существует`})
                return;
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, password: hashPassword})
            await fileService.createDir(new File({user: user.id, name: ''}))
            res.json({message: 'Пользователь создан'})
        } catch (e) {
            console.log(e)
            res.send({message: 'Ошибка сервера (регистрация)'})
        }
})

router.post('/login',

    async (req, res) => {
        try {
            const { email, password} = req.body
            const guest = await User.findOne({email})
            if(!guest) {
                res.status(404).json({message: `Пользователь с адрессом ${email} не найден`})
                return;
            }

            const isPasswordValid = bcrypt.compareSync(password, guest.password)
            if (!isPasswordValid) {
                res.status(400).json({message: 'Неверный пароль'})
                return;
            }

            const token = jsonWebToken.sign({id: guest.id}, config.secretKey, {expiresIn: '1h'})
            res.json({
                token,
                user: {
                    id: guest.id,
                    email: guest.email,
                    diskSpace: guest.diskSpace,
                    usedSpace: guest.usedSpace,
                    avatar: guest.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: 'Ошибка сервера (логин)'})
        }
    })

router.get('/auth', authMiddleware,

    async (req, res) => {
        try {
            const guest = await User.findOne({_id: req.user.id})
            const token = jsonWebToken.sign({id: guest.id}, config.secretKey, {expiresIn: '1h'})
            res.json({
                token,
                user: {
                    id: guest.id,
                    email: guest.email,
                    diskSpace: guest.diskSpace,
                    usedSpace: guest.usedSpace,
                    avatar: guest.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: 'Ошибка сервера (аутенификация)'})
        }
    })

export default router