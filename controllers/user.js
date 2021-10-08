import { statusHTTP } from "../config/index.js"
import Auth from "../models/Auth.js"

export const getUser = async (req, res) => {
    try {
        const { decode } = req
        const user = await Auth.findOne({ _id: decode.sub })
        if (user) {
            return res.status(statusHTTP.SUCCESS).json({
                username: user.username,
                imgUser: user.imgUser
            })
        } else {
            return res.status(statusHTTP.FORBIDDEN).json({
                statusCode: statusHTTP.FORBIDDEN,
                message: 'not permission'
            })
        }
    } catch (error) {
        return res.status(statusHTTP.FAIL).json({
            statusCode: statusHTTP.FAIL,
            message: error
        })
    }
}