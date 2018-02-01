const server = require('./server')
const fs = require('fs')
const request = require('supertest')

const URL = 'http://localhost:3000'
const postURL = '/api/phonenumbers/parse/file'
const getValidUrl = '/api/phonenumbers/parse/text/Seneca%20Phone%20Number%3A%20416-491-5050%2C6478603041%2Csometexts%2C6478603041'
const getInvalidUrl = '/api/phonenumbers/parse/text/'

test('GET for empty URL should be: 404 and []', async () => {
    const response = await request(URL).get(getInvalidUrl)
    expect(response.statusCode).toBe(404)
    expect(response.text).toBe('[]')
})

test('GET for URL with numbers should be 200 and [\"(416) 491-5050\",\"(647) 860-3041\"]', async () => {
    const response = await request(URL).get(getValidUrl)
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('[\"(416) 491-5050\",\"(647) 860-3041\"]')
})

test("POST request for file containing number should be  [\'(416) 491-5050\',\'(647) 860-3041\']", async () => {
    const response = 
        await request(URL)
            .post(postURL)
            .set('Content-Type', 'text/plain')
            .attach('file', fs.readFileSync('./validTest.txt'), 'validTest.txt')
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('[\"(416) 491-5050\",\"(647) 860-3041\"]')
})

test('POST request for file without numbers should be 400 and \"[]\"', async () => {
    const response = 
        await request(URL)
            .post(postURL)
            .set('Content-Type', 'text/plain')
            .attach('file', fs.readFileSync('./invalidTest.txt'), 'invalidTest.txt')
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('[]')
})