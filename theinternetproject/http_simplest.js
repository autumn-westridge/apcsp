// Server data: HTML mapped to the associated URL
const server_data = {
    "theinternet.com": '<!DOCTYPE html><html><head><title>The Internet</title><link rel="stylesheet" href="theinternet.css"></head><body><div id="box1"><h1>Welcome to the Internet</h1><p>Can you use JavaScript to modify this page?</p><p class="invisible">Seeeeecret text</p></div><div class="invisible"><h1>This is also secret text</h1><h6>This is technically a header but it is very small</h6></div></body></html>'
}

// HTTP function is to get HTML from the server
function http(url) {
    var content = server_data[url];
    return content;
}

// User requests "theinternet.com"
var http_response_content = http("theinternet.com");
console.log(http_response_content);
