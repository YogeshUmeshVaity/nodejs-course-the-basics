import http, { IncomingMessage, ServerResponse } from 'http'

const handler = (request: IncomingMessage, response: ServerResponse) => {
  const url = request.url
  const method = request.method
  if (url === '/') {
    sendRegistrationForm(response)
    return response.end()
  }
  if (url === '/users') {
    sendUserList(response)
    return response.end()
  }
  if (url === '/create-user' && method === 'POST') {
    parseUserName(request)
    response.statusCode = 302
    response.setHeader('Location', '/')
    return response.end()
  }
}

http.createServer(handler).listen(3000, () => console.log('started'))

function parseUserName(request: http.IncomingMessage) {
  const body: Uint8Array[] = []
  request.on('data', (chunk) => {
    body.push(chunk)
  })
  request.on('end', () => {
    // We get the string "userName=..." here. Split to get the only what is after the "=" sign.
    const parsedBody = Buffer.concat(body).toString()
    const userName = parsedBody.split('=')[1]
    console.log(`User name to be created: ${userName}`)
  })
}

function sendUserList(response: http.ServerResponse) {
  response.writeHead(200, { 'Content-Type': 'text/html' })
  response.write('<html')
  response.write('<head><title>User List</title></head>')
  response.write('<body>')
  response.write('<h1> List of Users </h1>')
  response.write('<ul>')
  response.write('<li> Sandy </li>')
  response.write('<li> Vighu </li>')
  response.write('<li> Jane </li>')
  response.write('<li> Komaru </li>')
  response.write('</ul>')
  response.write('</body>')
  response.write('</html>')
}

function sendRegistrationForm(response: http.ServerResponse) {
  response.writeHead(200, { 'Content-Type': 'text/html' })
  response.write('<html')
  response.write('<head><title>Register</title></head>')
  response.write('<body>')
  response.write('<h1> Create a new user </h1>')
  response.write('<form action="/create-user" method="POST">')
  response.write('<input type="text" name="userName"> <button type="submit">Send</button>')
  response.write('</form>')
  response.write('</body>')
  response.write('</html>')
}
