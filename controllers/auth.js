import jwt from 'jsonwebtoken'
import fs from 'fs'
import bcrypt from 'bcrypt'
import Auth from '../models/Auth.js'
import { statusHTTP } from '../config/index.js'
import { getDatas } from './index.js'

const saltRounds = 10

let privateKey = fs.readFileSync('./keys/private-key.pem')
let publicKey = fs.readFileSync('./keys/public-key.pem')
let privateKeyRefresh = fs.readFileSync('./keys/private-refresh.pem')
let publicKeyRefresh = fs.readFileSync('./keys/public-refresh.pem')

export const getAccount = getDatas(Auth)

export const validateRegister = (req, res, next) => {
    const { phoneNumber } = req.body
    if (phoneNumber.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)
    ) {
        req.user = { phoneNumber }
	
        next()
    } else {
        res.json({
            isValidate: false
        })
    }
}

export const register = async (req, res, next) => {
    try {
        const { phoneNumber } = req.user
	const { username, password } = req.body
        let encrytedPassword = ''
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            encrytedPassword = hash
            const dataUser = await Auth.findOne({ phoneNumber })
            if (dataUser) {
                return res.status(statusHTTP.SUCCESS).json({
                    existed: true
                })
            } else {
		if(password?.match(/^(?=.*?[a-z])(?=.*?[0-9]).{8,32}$/g)
        && username?.match(/^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/g)){
                const newUser = new Auth({
                    username,
                    hash: encrytedPassword,
                    phoneNumber
                })

                await newUser.save()
                return res.status(statusHTTP.SUCCESS).json({
                    createAccount: true,
                })
		}else {
        res.json({
            isValidate: false
        })
    }
            }

        })

    } catch (error) {
        return res.status(statusHTTP.FAIL).json({
            statusCode: statusHTTP.FAIL,
            message: error
        })
    }
}

export const login = async (req, res, next) => {
    try {
        const { phoneNumber, password } = req.body
        const user = await Auth.findOne({ phoneNumber })
        if (user) {
            bcrypt.compare(password, user.hash, function (err, result) {
                if (result) {
                    const accessToken = jwt.sign({ sub: user._id, type: 'access' }, privateKey, { algorithm: 'RS256', expiresIn: '2h' })
                    const refreshToken = jwt.sign({ sub: user._id, type: 'refresh' }, privateKeyRefresh, { algorithm: 'RS256', expiresIn: '1d' })
                    return res.status(statusHTTP.SUCCESS).json({
                        statusCode: statusHTTP.SUCCESS,
                        message: 'Success',
                        username: user.username,
                        _id: user._id,
                        accessToken,
                        refreshToken
                    })
                } else {
                    return res.status(statusHTTP.UNAUTHORIZED).json({
                        statusCode: statusHTTP.UNAUTHORIZED,
                        message: 'Oops!',
                        password: false
                    })
                }
            })
        } else {
            return res.status(statusHTTP.NOT_FOUND).json({
                statusCode: statusHTTP.NOT_FOUND,
                message: '404 Not Found',
                account: false
            })
        }
    } catch (error) {
        return res.status(statusHTTP.FAIL).json({
            statusCode: statusHTTP.FAIL,
            message: error
        })
    }
}