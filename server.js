let express = require('express')
let bodyParser = require('body-parser')
let phoneUtil = require('google-libphonenumber').phoneUtil
    , PNF = require('google-libphonenumber').PhoneNumberFormat
let app = express()

app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.get('/api/phonenumbers/parse/text/:string', (req, res)=>{
    let number = phoneUtil.parse(req.query)
    res.json({"Phone number": `${phoneUtil.format(tel, PNF.NATIONAL)}`});
});
app.get('/api/phonenumbers/parse/text/', (req, res)=>{
    res.json({"Phone number": `none given`});
});
app.post('/,')

app.listen(3000, (err)=>{
    if (err) {
        return console.log('Failed to connect to port: ', err)
      }
    console.log("Server is listening on port 3000");
});