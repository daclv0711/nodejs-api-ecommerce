import express from 'express'
import * as chatProduct from '../controllers/chat.js'
import { checkToken, checkUser } from '../middlewares/auth.js'

const router = express.Router()

router.get('/', chatProduct.getListChat)

router.get('/:id', chatProduct.getChatProduct)

router.post('/', checkToken, checkUser, chatProduct.postChatProduct)

router.put('/:id', checkToken, checkUser, chatProduct.putChatProduct)

router.patch('/:id', checkToken, checkUser, chatProduct.patchChatProduct)

router.delete('/:id', checkToken, checkUser, chatProduct.deleteChatProduct)
export default router