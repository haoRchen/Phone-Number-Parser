let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')
let phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()
let PNF = require('google-libphonenumber').PhoneNumberFormat
let app = express()

app.use(bodyParser.urlencoded({ extended: false }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(cors())

app.get('/api/phonenumbers/parse/text/:string', (req, res)=>{
    // console.log(req.param('string'))
    let string = req.param('string')
    console.log(string)
    let number = phoneUtil.parse(string,'US')    
    // console.log(phoneUtil.format(number, PNF.NATIONAL))
    res.json({"Phone number": phoneUtil.format(number, PNF.NATIONAL)})
})
app.get('/api/phonenumbers/parse/text/', (req, res)=>{
    res.json({"Phone number": `none given`})
})
app.post('/,')

app.listen(3000, (err)=>{
    if (err) {
        return console.log('Failed to connect to port: ', err)
      }
    console.log("Server is listening on port 3000")
})