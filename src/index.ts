import http, { IncomingMessage, ServerResponse } from 'http'

const handler = (request: IncomingMessage, response: ServerResponse) => {
  const url = request.url
  if (url === '/') {
    sendWelcomeMessage(response)
  }
  if (url === '/users') {
    sendUserList(response)
  }
  response.end()
}

http.createServer(handler).listen(3000, () => console.log('started'))
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
  response.end
}

function sendWelcomeMessage(response: http.ServerResponse) {
  response.end('Welcome to the Node.js Basics')
}
