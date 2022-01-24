const dns_lookup = {
    "theinternet.com":      "18.223.98.107",
    "kittens.com":          "91.198.152.91",
    "google.com":           "8.8.8.8",
    "wikipedia.org":        "66.67.68.69",
    "thewaroncars.com":     "174.203.4.198"
}

function dns(url) {
    return dns_lookup[url];
}

var request_url = "theinternet.com";
var request_ip = dns(request_url);
console.log(request_ip);
