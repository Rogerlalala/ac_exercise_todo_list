const express = require('express')
const session = require('express-session')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const port = 3000
require('./config/mongoose')

// 啟動引擎 express-handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 設定 session 密鑰
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// RESTFUL 路由重構使用 method-override
app.use(methodOverride('_method'))

// 資料庫 mongoDB
// 設定連線到 mongoDB
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

//將 request 導入路由器
app.use(routes)

// 啟動並監聽 Server
app.listen(port, () => {
  console.log(`Express is running on localhost${port}`)
})