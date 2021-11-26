
const express = require('express')
const app = express()
const port = 3000

const axios = require('axios');
app.use(
    express.urlencoded({
      extended: true
    })
  )
  
app.use(express.json())

app.post('/', (req, res) => {
    axios.post(req.body.url, req.body.param).then(res1 => {
        let callbackData = {
            param: req.body.param,
            result: res1.data.data,
            id: req.body.id,
            startTime: req.body.startTime,
            errorCode: res1.data.code,
            errorMsg: res1.data.msg
        }
        return axios.post(req.body.callback, callbackData)
    }).catch(error => {
        let callbackData = {
            param: req.body.param,
            id: req.body.id,
            startTime: req.body.startTime,
            errorCode: -1,
            errorMsg: "请求错误：" + JSON.stringify(error)
        }
        return axios.post(req.body.callback, callbackData)
    })
    res.send('Success')
})

app.post('/callback', (req, res) => {
    res.send(JSON.stringify({curKey: "hahah1"}));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
