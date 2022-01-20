// Server data: HTML mapped to the associated URL
const server_data = {
    "theinternet.com": '<!DOCTYPE html><html><head><title>The Internet</title><link rel="stylesheet" href="theinternet.css"></head><body><div id="box1"><h1>Welcome to the Internet</h1><p>Can you use JavaScript to modify this page?</p><p class="invisible">Seeeeecret text</p></div><div class="invisible"><h1>This is also secret text</h1><h6>This is technically a header but it is very small</h6></div></body></html>'
}

/* HTTP is to get HTML from the server */
function clientHTTP(url) {
    // Build HTTP request
    let http_request = {
        "url": url,
        "request_method": "GET"
    }
    
    // Send this to the server (pass HTTP request as an argument)
    let response = serverHTTP(http_request);
    // Return the HTML
    return response.content;
}

function serverHTTP(http_request) {
    // Get the HTML data
    let html = server_data[http_request.url];

    // Build the response with the HTML
    let http_response = {
        "dest_ip": http_request.src_ip, // Where this is going -- client IP
        "content": html,                // The HTML for this site
    }
    
    // Send back to the client
    return http_response;
}

// Browser display function shows the returned HTML
function browserDisplay(html) {
    console.log(html);
}

// User navigates to a URL. HTTP gets the HTML, then the browser displays the HTML
function webRequest(url) {
    let html = clientHTTP(url);
    browserDisplay(html);
}

// User requests "theinternet.com"
webRequest("theinternet.com");
