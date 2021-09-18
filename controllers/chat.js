import { statusHTTP } from "../config/index.js"
import Chat from "../models/Chat.js"
import { deleteData, getDatas, patchData, putData } from "./index.js"

export const getListChat = getDatas(Chat)

export const getChatProduct = async (req, res) => {
    try {
        const id = req.params.id
        const dataChat = await Chat.find({ productId: id })
        return res.status(statusHTTP.SUCCESS).json(dataChat.reverse())
    } catch (error) {
        return res.status(statusHTTP.FAIL).json({
            statusCode: statusHTTP.FAIL,
            message: error
        })
    }
}

export const postChatProduct = async (req, res) => {
    try {
        const { comment, productId } = req.body
        const { result, username } = req.result
        const dataChat = new Chat({
            comment,
            productId,
            name: username,
            userId: result.sub
        })
        await dataChat.save()
        return res.status(statusHTTP.SUCCESS).json(dataChat)
    } catch (error) {
        return res.status(statusHTTP.FAIL).json({
            statusCode: statusHTTP.FAIL,
            message: error
        })
    }
}

export const patchChatProduct = patchData(Chat)

export const putChatProduct = putData(Chat)

export const deleteChatProduct = deleteData(Chat)