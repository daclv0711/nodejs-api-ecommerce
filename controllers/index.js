import { PAGE_SIZE, statusHTTP } from "../config/index.js"


export const getDatas = (data) => {
    return async (req, res) => {
        try {
            const { id, search, page, limit } = req.query
            let result
            if (Object.keys(req.query).length !== 0) {
                if (id) {
                    result = await data.find({ _id: id })
                } else if (search) {
                    let datas = await data.find({})
                    result = datas.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
                } else if (page) {
                    let current = parseInt(page)
                    current < 1 && (current = 1)
                    let skip = (current - 1) * PAGE_SIZE
                    result = await data.find({}).skip(skip).limit(PAGE_SIZE)
                } else if (limit) {
                    let count = parseInt(limit)
                    result = await data.find({}).limit(count)
                } else {
                    res.status(statusHTTP.NOT_FOUND).json({
                        statusCode: statusHTTP.NOT_FOUND,
                        message: '404 Not Found'
                    })
                }
            } else {
                result = await data.find({})
            }
            return res.status(statusHTTP.SUCCESS).json(result)

        } catch (error) {
            return res.status(statusHTTP.FAIL).json({
                statusCode: statusHTTP.FAIL,
                message: error
            })
        }
    }
}

export const postData = (data) => {
    return async (req, res) => {
        try {
            const newData = req.body

            const item = new data(newData)
            await item.save()
            return res.status(statusHTTP.SUCCESS).json(item)
        } catch (error) {
            return res.status(statusHTTP.FAIL).json({
                statusCode: statusHTTP.FAIL,
                message: error
            })
        }
    }
}

export const putData = (data) => {
    return async (req, res) => {
        try {
            const { id } = req.params
            const updateItem = req.body
            const item = await data.findOneAndUpdate({ _id: id }, updateItem)
            return res.status(statusHTTP.SUCCESS).json(item)
        } catch (error) {
            return res.status(statusHTTP.FAIL).json({
                statusCode: statusHTTP.FAIL,
                message: error
            })
        }
    }
}

export const patchData = (data) => {
    return async (req, res) => {
        try {
            const { id } = req.params
            const updateItem = req.body
            const item = await data.findOneAndUpdate({ _id: id }, updateItem)
            return res.status(statusHTTP.SUCCESS).json(item)
        } catch (error) {
            return res.status(statusHTTP.FAIL).json({
                statusCode: statusHTTP.FAIL,
                message: error
            })
        }
    }
}

export const deleteData = (data) => {
    return async (req, res) => {
        try {
            const { id } = req.params
            const item = await data.findOneAndRemove({ _id: id })
            return res.status(statusHTTP.SUCCESS).json(item)
        } catch (error) {
            return res.status(statusHTTP.FAIL).json({
                statusCode: statusHTTP.FAIL,
                message: error
            })
        }
    }
}