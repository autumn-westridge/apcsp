// Server data: HTML mapped to the associated URL
const server_data = {
    "theinternet.com": '<!DOCTYPE html><html><head><title>The Internet</title><link rel="stylesheet" href="theinternet.css"></head><body><div id="box1"><h1>Welcome to the Internet</h1><p>Can you use JavaScript to modify this page?</p><p class="invisible">Seeeeecret text</p></div><div class="invisible"><h1>This is also secret text</h1><h6>This is technically a header but it is very small</h6></div></body></html>'
}
// The client's IP address
const client_ip = "49.81.27.109";

/* HTTP is to get HTML from the server */
function clientHTTP(url) {
    // Build HTTP request
    let http_request = {
        "src": client_ip,           // The source (the client)
        "dest": url,                // The destination (the server)
        "request_method": "GET"     // Request type (get content)
    }
    
    // Send this to the server (pass HTTP request as an argument)
    let response = serverHTTP(http_request);
    // Return the HTML
    return response.content;
}

/* Server receives the request and returns a response with the HTML */
function serverHTTP(http_request) {
    // Get the HTML data
    let html = server_data[http_request.dest];

    // Build the response with the HTML
    let http_response = {
        "src": http_request.dest,    // The source (this website)
        "dest": http_request.src,    // Where this is going (client)
        "content": html,             // The HTML for this site
    }
    
    // Send back to the client
    return http_response;
}

// User requests "theinternet.com"
var http_response_content = clientHTTP("theinternet.com");
console.log(http_response_content);
