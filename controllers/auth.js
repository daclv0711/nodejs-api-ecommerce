import jwt from 'jsonwebtoken'
import fs from 'fs'
import bcrypt from 'bcrypt'
import Auth from '../models/Auth.js'
import { statusHTTP } from '../config/index.js'
import { getDatas } from './index.js'

const saltRounds = 10

const privateKey = fs.readFileSync('./keys/private-key.pem')
const privateKeyRefresh = fs.readFileSync('./keys/private-refresh.pem')
const publicKeyRefresh = fs.readFileSync('./keys/public-refresh.pem')

let refreshTokens = []

export const getAccount = getDatas(Auth)

export const existed = async (req, res) => {
    try {
        const { phoneNumber } = req.body
        const dataUser = await Auth.findOne({ phoneNumber })
        if (dataUser) {
            return res.status(statusHTTP.SUCCESS).json({
                existed: true
            })
        } else {
            return res.status(statusHTTP.SUCCESS).json({
                existed: false,
            })
        }

    } catch (error) {
        return res.status(statusHTTP.FAIL).json({
            statusCode: statusHTTP.FAIL,
            message: error
        })
    }
}

export const register = async (req, res) => {
    try {
        const { username, password, phoneNumber } = req.user
        let encrytedPassword = ''
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            encrytedPassword = hash
            const dataUser = await Auth.findOne({ phoneNumber })
            if (dataUser) {
                return res.status(statusHTTP.SUCCESS).json({
                    existed: true
                })
            } else {
                const newUser = new Auth({
                    username,
                    hash: encrytedPassword,
                    phoneNumber
                })

                await newUser.save()
                return res.status(statusHTTP.SUCCESS).json({
                    createAccount: true,
                })
            }

        })

    } catch (error) {
        return res.status(statusHTTP.FAIL).json({
            statusCode: statusHTTP.FAIL,
            message: error
        })
    }
}

export const login = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body
        const user = await Auth.findOne({ phoneNumber })
        if (user) {
            bcrypt.compare(password, user.hash, function (err, result) {
                if (result) {
                    const accessToken = jwt.sign({ sub: user._id, type: 'access' }, privateKey, { algorithm: 'RS256', expiresIn: '20s' })
                    const refreshToken = jwt.sign({ sub: user._id, type: 'refresh' }, privateKeyRefresh, { algorithm: 'RS256', expiresIn: '1d' })

                    const response = {
                        statusCode: statusHTTP.SUCCESS,
                        message: 'Success',
                        username: user.username,
                        _id: user._id,
                        accessToken,
                        refreshToken
                    }
                    refreshTokens.push(refreshToken)

                    return res.status(statusHTTP.SUCCESS).json(response)
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

export const refreshToken = (req, res) => {
    const { refreshToken } = req.body
    if (!refreshToken) return res.status(statusHTTP.NOT_FOUND).json({ statusCode: statusHTTP.NOT_FOUND })
    if (!refreshTokens.includes(refreshToken)) return res.status(statusHTTP.FORBIDDEN).json({ statusCode: statusHTTP.FORBIDDEN })

    jwt.verify(refreshToken, publicKeyRefresh, { algorithms: 'RS256' }, (err, data) => {
        if (err) res.status(statusHTTP.FORBIDDEN).json({ statusCode: statusHTTP.FORBIDDEN, err })
        const accessToken = jwt.sign({ sub: data.sub, type: 'access' }, privateKey, { algorithm: 'RS256', expiresIn: '2m' })
        return res.json({ accessToken })

    })
}

export const logOut = (req, res) => {
    const { refreshToken } = req.body
    refreshTokens = refreshTokens.filter(refToken => refToken !== refreshToken)
    return res.sendStatus(200)
}