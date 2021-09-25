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
import auth from './routes/auth.js'
import chat from './routes/chat.js'
import { statusHTTP } from './config/index.js'
import path from 'path'
import { fileURLToPath } from 'url'
import http from 'http'
import { Server } from 'socket.io'
import { postChatProduct } from './controllers/chat.js'

env.config()
const app = express()

const server = http.createServer(app)

export const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: "*",
        credentials: true
    }
})
//get body object
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//port
const PORT = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//public
app.use('/public', express.static(path.join(__dirname, 'public')))

//cors
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//socket io
io.on('connection', (client) => {
    console.log("client connected id: " + client.id)
    client.on('join', (data) => {
        console.log(data)
    })
    client.on('disconnect', () => {
        console.log(client.id + ": disconnected")
    })
})

//api
app.use('/api/v2/product_mobile', mobile)

app.use('/api/v2/preferent', preferents)

app.use('/api/v2/new_event', newEvents)

app.use('/api/v2/category_menu', categoryMenus)

app.use('/api/v2/product_laptop', productLaptops)

app.use('/api/v2/product_suggestion', productSugges)

app.use('/api/v2/category_special', categorySpecials)

app.use('/api/v2/slide', slides)

app.use('/api/v2/search_special', searchSpecials)

app.use('/api/v2/auth', auth)

app.use('/api/v2/chat', chat)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/api.html'))
})

app.use('*', (req, res) => {
    res.status(statusHTTP.NOT_FOUND).json({
        statusCode: statusHTTP.NOT_FOUND,
        message: '404 Not Found'
    })
})

//connect mongoDB
mongoose.connect(process.env.API_ACCOUNT, {
    useNewUrlParser: true, useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log("Database created!");
})

server.listen(PORT, (req, res) => {
    console.log(`Server is running port ${PORT}`)
})