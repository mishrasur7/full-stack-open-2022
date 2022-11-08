import http from 'http'

const message = 'Hello backend'

const app = http.createServer((request, response) => {
    response.writeHead(200, {'Content_Type': 'text/plain'})
    response.end(message)
})

const PORT = 3001

app.listen(PORT)

console.log(`Server is running at port ${PORT}`)
