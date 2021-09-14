import Preferent from "../models/Preferent.js";
import * as preferents from "./index.js";

export const getPreferent = preferents.getDatas(Preferent)

export const postPreferent = preferents.postData(Preferent)

export const updatePreferent = preferents.putData(Preferent)

export const patchPreferent = preferents.patchData(Preferent)

export const deletePreferent = preferents.deleteData(Preferent)