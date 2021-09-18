import jwt from "jsonwebtoken"
import fs from 'fs'
import Auth from "../models/Auth.js"
import { statusHTTP } from "../config/index.js"

const publicKey = fs.readFileSync('./keys/public-key.pem')
const publicKeyRefresh = fs.readFileSync('./keys/public-refresh.pem')

export const checkToken = async (req, res, next) => {
    try {
        const { username } = req.body
        let accessToken = req.headers['authorization'].split(' ')[1]
        const result = jwt.verify(accessToken, publicKey, { algorithms: 'RS256' })
        const data = await Auth.findOne({
            _id: result.sub,
            name: username
        })
        if (data) {
            req.result = { result, username }
            next()
        } else {
            return res.status(statusHTTP.UNAUTHORIZED).json({
                statusCode: statusHTTP.UNAUTHORIZED,
                message: 'Not permiss'
            })
        }
    } catch (error) {
        return res.status(statusHTTP.FAIL).json({
            statusCode: statusHTTP.FAIL,
            message: error
        })
    }
}

export const validateRegister = (req, res, next) => {
    const { phoneNumber, password, username } = req.body
    if (phoneNumber?.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)
        && password?.match(/^(?=.*?[a-z])(?=.*?[0-9]).{8,32}$/g)
        && username?.match(/^[a-zA-Z_-| |]{3,16}$/igm)
    ) {
        req.user = { phoneNumber, password, username }
        next()
    } else {
        res.json({
            isValidate: false
        })
    }
}