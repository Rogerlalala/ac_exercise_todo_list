//引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

//引用 Todo model
const Todo = require('../../models/todo')

//定義首頁路由
router.get('/', (req, res) => {
  Todo.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' }) //將資料依 id 做升冪排序
    .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) //處理錯誤
})

//會出路由模組
module.exports = router