import NewEvent from "../models/NewEvent.js";
import * as newEvents from "./index.js";

export const getEvents = newEvents.getDatas(NewEvent)

export const postNewEvent = newEvents.postData(NewEvent)

export const updateNewEvent = newEvents.putData(NewEvent)

export const patchNewEvent = newEvents.patchData(NewEvent)

export const deleteNewEvent = newEvents.deleteData(NewEvent)