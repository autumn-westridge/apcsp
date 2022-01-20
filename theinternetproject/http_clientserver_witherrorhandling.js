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
    // Define this so we have it available at the end of the function
    let http_response;

    /* We only support GET requests for defined URLs. 
       If this isn't GET, return 400
       If the URL isn't in the server data, return 400
     */
    if (http_request.request_method == "GET" && Object.keys(server_data).indexOf(http_request.url) > -1) {
        // Get the HTML for the requested URL
        let html = server_data[http_request.url];

        // Build the response with the HTML
        http_response = {
            "dest_ip": http_request.src_ip, // Where this is going -- client IP
            "content": html,                // The HTML for this site
        }
    }
    else {
        http_response = {
            "dest_ip": http_request.src_ip, // Where this is going -- client IP
            "content": "400",               // Bad request -- 400
        }
    }
    
    // Send back to the client
    return http_response;
}

// User requests "theinternet.com"
var http_response_content = clientHTTP("theinternet.com");
console.log(http_response_content);
