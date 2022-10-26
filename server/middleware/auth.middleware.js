import jsonWebToken from 'jsonwebtoken'
import {config} from "../config/default.js"


const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            res.status(401).json({message: 'Ошибка аутентификации'})
            return;
        }
        req.user = jsonWebToken.verify(token, config.secretKey)
        next()
    } catch (e) {
        res.status(401)

    }
}

export default authMiddleware