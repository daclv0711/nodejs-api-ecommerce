import express from "express";
import * as newEvent from "../controllers/newEvents.js";

const router = express.Router()

router.get('/', newEvent.getEvents)

router.post('/', newEvent.postNewEvent)

router.put('/:id', newEvent.updateNewEvent)

router.patch('/:id', newEvent.patchNewEvent)

router.delete('/:id', newEvent.deleteNewEvent)

export default router