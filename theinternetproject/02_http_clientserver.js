// Server data: HTML mapped to the associated URL
const server_data = {
    "theinternet.com": '<!DOCTYPE html><html><head><title>The Internet</title><link rel="stylesheet" href="theinternet.css"></head><body><div id="box1"><h1>Welcome to the Internet</h1><p>Can you use JavaScript to modify this page?</p><p class="invisible">Seeeeecret text</p></div><div class="invisible"><h1>This is also secret text</h1><h6>This is technically a header but it is very small</h6></div></body></html>'
}

/* HTTP is to get HTML from the server */
function clientHTTP(url) {
    // Send this to the server (pass URL as an argument)
    var response = serverHTTP(url);
    // Return the HTML
    return response;
}

/* Server receives the request and returns a response with the HTML */
function serverHTTP(url) {
    // Get the HTML data
    var html = server_data[url];
    // Send back to the client
    return html;
}

// User requests "theinternet.com"
var http_response_content = clientHTTP("theinternet.com");
console.log(http_response_content);