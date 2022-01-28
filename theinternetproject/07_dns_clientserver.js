const dns_lookup = {
    "theinternet.com":      "18.223.98.107",
    "kittens.com":          "91.198.152.91",
    "google.com":           "8.8.8.9",
    "wikipedia.org":        "66.67.68.69",
    "thewaroncars.com":     "174.203.4.198"
}

// The client's IP address
const client_ip = "49.81.27.109";
// IP address of the DNS server
const dns_server_ip = "8.8.8.8";

function serverDNS(request) {
    // Pull the URL out
    var url = request.url;

    // We're gonna send back the source and destination in any case
    var dns_response = {
        "source": request.destination,
        "destination": request.source
    }

    // If this URL exists in our DNS database, return the IP address. Else return NXDOMAIN
    if (Object.keys(dns_lookup).indexOf(url) > -1) {
        dns_response.ip = dns_lookup[url];
        dns_response.code = "NOERROR";
    }
    else {
        dns_response.code = "NXDOMAIN";
    }

    return dns_response;
}

function clientDNS(url) {
    // Build the request object && send to server
    var dns_request = {
        "source": client_ip,
        "destination": dns_server_ip,
        "url": url
    }
    var response = serverDNS(dns_request);
    // If the request worked, return the IP address. Else return the error code
    if (response.code == "NOERROR" ) {
        return response.ip;
    }
    return response.code;
}

var request_url = "theinternet.com";
var request_ip = clientDNS(request_url);
console.log(request_ip);
