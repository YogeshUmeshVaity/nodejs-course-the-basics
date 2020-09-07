import * as http from "http"
import { IncomingMessage, ServerResponse } from "http"

const handler = (request: IncomingMessage, response: ServerResponse) => {
    http.request("http://jsonplaceholder.typicode.com/posts/1", function (
        externalResponse
    ) {
        externalResponse.pipe(response)
    })
        .on("error", function (e) {
            response.statusCode = 500
        })
        .end()
}

http.createServer(handler).listen(8080, () => console.log("started"))
