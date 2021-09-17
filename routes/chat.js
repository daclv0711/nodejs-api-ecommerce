import express from 'express'
import * as chatProduct from '../controllers/chat.js'
import { checkToken } from '../middlewares/auth.js'

const router = express.Router()

router.get('/', chatProduct.getListChat)

router.get('/:id', chatProduct.getChatProduct)

router.post('/', checkToken, chatProduct.postChatProduct)

router.put('/:id', checkToken, chatProduct.putChatProduct)

router.patch('/:id', checkToken, chatProduct.patchChatProduct)

router.delete('/:id', checkToken, chatProduct.deleteChatProduct)
export default router