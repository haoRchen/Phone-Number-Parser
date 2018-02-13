const express = require('express')
const port = process.env.PORT || 3000
const multer = require('multer')
const bodyParser = require('body-parser')
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()
const PNF = require('google-libphonenumber').PhoneNumberFormat
const fs = require('fs')

var app = express()

const upload = multer({ dest: 'uploads/' })

app.use(bodyParser.urlencoded({ extended: true }))

function ParseNumberFromString (string) {
    let numbers = []
    try {
        string.toString().split(',').forEach(str => {
            var number = phoneUtil.parse(str, 'CA')
            if (phoneUtil.isValidNumber(number)) {
                numbers.push(phoneUtil.format(number, PNF.NATIONAL))
            }
            return Array.from(new Set(numbers))
        })
    } catch (error) {
    }
    return Array.from(new Set(numbers))
}

app.get('/', (req, res) => {
    res.status(200).send('Default: Please go to the correct end point for parsing')
})
app.get('/api/phonenumbers/parse/text/:strings', (req, res) => {
    let parsedArr = []
    parsedArr = ParseNumberFromString(req.params.strings)
    if (req.params.strings === 'nothing' || req.params.strings === '' || parsedArr.length === 0) {
        res.status(400).send([])
    } else {
        res.status(200).json(parsedArr)
    }
})
app.get('/api/phonenumbers/parse/text/', (req, res) => {
    res.status(404).send([])
})
app.get('*', (req, res) => {
    res.status(404).send('invalid get request')
})

app.post('/api/phonenumbers/parse/file', upload.single('file'), (req, res) => {
    console.log('Post: file')
    if (!req.file) {
        res.status(400).send('No file posted')
    } else {
        var content = Buffer.from(fs.readFileSync(req.file.path), 'base64')
        var numbers = content.toString().split('\n')
        var finalArr = ParseNumberFromString(numbers)
        res.setHeader('Content-Type', 'text/plain')
        res.status(200).send(finalArr)
    }
})
app.post('*', (req, res) => {
    res.status(404).send('invalid post request')
})

app.listen(port, (err) => {
    if (err) {
        return console.log('Failed to connect to port: ', err)
    }
    console.log(`Server is listening on port ${port}`)
})
