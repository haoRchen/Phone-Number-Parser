const express = require('express')
const port = process.env.PORT || 3000;
const controller = require('./controller')

const app = express()

app.use('/', controller)

app.listen(port, (err)=>{
    if (err) {
        return console.log('Failed to connect to port: ', err)
      }
    console.log(`Server is listening on port ${port}`)
})