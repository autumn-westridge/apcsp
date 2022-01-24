/*************************************************************************************************
 * BEGIN HTTP
 *************************************************************************************************/
// Server data: HTML mapped to the associated IP address (now that we have DNS)
const server_data = {
    "18.223.98.107": '<!DOCTYPE html><html><head><title>The Internet</title><link rel="stylesheet" href="theinternet.css"></head><body><div id="box1"><h1>Welcome to the Internet</h1><p>Can you use JavaScript to modify this page?</p><p class="invisible">Seeeeecret text</p></div><div class="invisible"><h1>This is also secret text</h1><h6>This is technically a header but it is very small</h6></div></body></html>'
}
// The client's IP address
const client_ip = "49.81.27.109";

/* HTTP is to get HTML from the server */
function clientHTTP(url) {
    // DNS request
    var dns_response = dns(url);
    // If the response is NXDOMAIN (URL does not exist), abort
    if (dns_response.response_code == "NXDOMAIN") {
        return "Specified URL does not exist";
    }

    // Build HTTP request
    var http_request = {
        "src": client_ip,                   // The source (the client)
        "dest": dns_response.ip_address,    // The destination (the server)
        "request_method": "GET"             // Request type (get content)
    }
    
    // Send this to the server (pass HTTP request as an argument)
    var response = serverHTTP(http_request);
    // If this is a good request, return the HTML
    if (response.response_code == 200) {
        return response.content;
    }
    // Otherwise, return the response code
    else {
        return response.response_code;
    }
}

/* Server receives the request and returns a response with the HTML */
function serverHTTP(http_request) {
    // Define this so we have it available at the end of the function
    // src and dest will be the same whether this is a valid request or not
    var http_response = {
        "src": http_request.dest,    // The source (this website)
        "dest": http_request.src,    // Where this is going (client)
    }

    /* We only support GET requests for defined URLs. 
       If this isn't GET, return 400
       If the URL isn't in the server data, return 400
     */
    if (http_request.request_method == "GET" && Object.keys(server_data).indexOf(http_request.dest) > -1) {
        // Get the HTML data
        var html = server_data[http_request.dest];
        // Add the HTML to the response
        http_response.content = html;
        http_response.response_code = 200;
    }
    else {
        // Bad request
        http_response.response_code = 400;
    }
    
    // Send back to the client
    return http_response;
}
/*************************************************************************************************
 * END HTTP
 *************************************************************************************************/
/*************************************************************************************************
 * BEGIN DNS
 *************************************************************************************************/
const dns_lookup = {
    "theinternet.com":      "18.223.98.107",
    "kittens.com":          "91.198.152.91",
    "google.com":           "8.8.8.8",
    "wikipedia.org":        "66.67.68.69",
    "thewaroncars.com":     "174.203.4.198"
}

function dns(url) {
    if (Object.keys(dns_lookup).indexOf(url) > -1) {
        var dns_response = {
            "ip_address": dns_lookup[url],
            "response_code": "NOERROR"
        }
        return dns_response;
    }
    else {
        var dns_response = {
            "response_code": "NXDOMAIN"
        }
        return dns_response;
    }
}
/*************************************************************************************************
 * END DNS
 *************************************************************************************************/

// User requests "theinternet.com"
var http_response_content = clientHTTP("theinternet.com");
console.log(http_response_content);
