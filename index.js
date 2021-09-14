import express from 'express'
import env from 'dotenv'
import mongoose from 'mongoose'
import mobile from './routes/productMobiles.js'
import slides from './routes/slides.js'
import categoryMenus from './routes/categoryMenus.js'
import categorySpecials from './routes/categorySpecials.js'
import newEvents from './routes/newEvents.js'
import preferents from './routes/preferents.js'
import productLaptops from './routes/productLaptops.js'
import productSugges from './routes/productSugges.js'
import searchSpecials from './routes/searchSpecials.js'
import { statusHTTP } from './config/index.js'
import path from 'path'
import { fileURLToPath } from 'url'

env.config()
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const PORT = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE,PATCH')
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Headers', '*')
    next()
})

app.use('/api/v2/product_mobile', mobile)

app.use('/api/v2/preferent', preferents)

app.use('/api/v2/new_event', newEvents)

app.use('/api/v2/category_menu', categoryMenus)

app.use('/api/v2/product_laptop', productLaptops)

app.use('/api/v2/product_suggestion', productSugges)

app.use('/api/v2/category_special', categorySpecials)

app.use('/api/v2/slide', slides)

app.use('/api/v2/search_special', searchSpecials)

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/api.html'))
})

app.use('*', (req, res) => {
    res.status(statusHTTP.NOT_FOUND).json({
        statusCode: statusHTTP.NOT_FOUND,
        message: '404 Not Found'
    })
})



mongoose.connect(process.env.API_ACCOUNT, {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.listen(PORT, (req, res) => {
    console.log(`Server is running port ${PORT}`)
})