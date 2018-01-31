const express = require('express')
const router = express.Router()
const multer = require('multer')
const bodyParser = require('body-parser')
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()
const PNF = require('google-libphonenumber').PhoneNumberFormat

const upload = multer({dest: ''})


router.use(bodyParser.urlencoded({ extended: true }))

function ParseNumberFromString(string){
    let numbers = []
    let number

    try{
        string.split(',').forEach( str=>{
            number = phoneUtil.parse(str, 'CA')
            if(phoneUtil.isValidNumber(number)){
                numbers.push(phoneUtil.format(number, PNF.NATIONAL))
            }
        
        })
        // Convert set(only distinct values) back to an array
        return Array.from(new Set(numbers))
    }catch (error){
        return numbers
    }
}

router.get('/', (req, res) => {
    res.status(200).send('Default: Please go to the correct end point for parsing');
})
router.get('/api/phonenumbers/parse/text/:strings', (req, res)=>{
    let parsedArr = []
    parsedArr = ParseNumberFromString( req.params.strings)
    if(req.params.strings == 'nothing' || req.params.strings == '' || parsedArr.length == 0){
        res.status(400).send([])
    }else{
        res.status(200).json(parsedArr)
    }
   
})
router.get('/api/phonenumbers/parse/text/', (req, res)=>{
    res.status(404).send([])
})
router.get('*', (req, res) => {
    res.status(404).send([])
  })
router.post('*', function (req, res) {
    res.status(404).send([])
})
router.post('/api/phonenumbers/parse/file', upload.single('file'), (req, res) =>{
    if (!req.file) {
        res.status(400).send('No file posted')
    }else {
        let fs = require('fs')
        let fileContent = fs.readFileSync(req.file.path)
        let texts = fileContent.toString('ascii')
        let buf = Buffer.from(texts, 'base64')
        let numbers = buf.toString('ascii')
        let numberArr = numbers.split('\n')
    
        let finalArr = ParseNumberFromString(numberArr)   
        res.status(200).send(finalArr)
    }

})



module.exports = router