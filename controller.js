let bodyParser = require('body-parser')
let phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()
let PNF = require('google-libphonenumber').PhoneNumberFormat
let express = require('express')
let router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))

function ParseNumberFromString(string, res){
    let numbers = []
    var number

    try{
        string.split(',').forEach( str=>{
            number = phoneUtil.parse(str, 'CA')
            if(phoneUtil.isValidNumber(number)){
                numbers.push(phoneUtil.format(number, PNF.NATIONAL))
            }
        
        });
        // Convert set(only distinct values) back to an array
        return Array.from(new Set(numbers))
    }catch (error){
        res.status(400).send(error)
    }
}
router.get('/api/phonenumbers/parse/text/:strings*', (req, res)=>{
    res.status(200).send(ParseNumberFromString( req.params.strings, res))
})
router.get('/api/phonenumbers/parse/text/', (req, res)=>{
    res.json([])
})
router.post('/,')

module.exports = router;