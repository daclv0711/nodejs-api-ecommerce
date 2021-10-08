import jwt from "jsonwebtoken"
import fs from 'fs'
import Auth from "../models/Auth.js"
import { statusHTTP } from "../config/index.js"

const publicKey = fs.readFileSync('./keys/public-key.pem')

export const checkToken = (req, res, next) => {
    let accessToken = req.headers['authorization'].split(' ')[1]
    jwt.verify(accessToken, publicKey, { algorithms: 'RS256' }, async function (err, decode) {
        if (err) {
            return res.status(statusHTTP.UNAUTHORIZED).json({
                statusCode: statusHTTP.UNAUTHORIZED,
                message: '401'
            })
        } else {
            req.decode = decode
            next()
        }
    })
}

export const checkUser = async (req, res, next) => {
    try {
        const { username } = req.body
        const { decode } = req
        const data = await Auth.findOne({
            _id: decode.sub,
            username
        })
        if (data) {
            req.result = { result: decode, username }
            next()
        } else {
            return res.status(statusHTTP.FORBIDDEN).json({
                statusCode: statusHTTP.FORBIDDEN,
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
        && username?.match(/(^[^0-9!@#$%^&*()_+\-=\[\]{};':"\\|,~`.<>\/?]{3,16}$)/g)
    ) {
        req.user = { phoneNumber, password, username }
        next()
    } else {
        res.json({
            isValidate: false
        })
    }
}