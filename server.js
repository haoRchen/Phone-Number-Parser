let express = require('express')
let port = process.env.PORT || 3000;
let controller = require('./controller')

let app = express()

app.use('/', controller)

app.listen(port, (err)=>{
    if (err) {
        return console.log('Failed to connect to port: ', err)
      }
    console.log(`Server is listening on port ${port}`)
})