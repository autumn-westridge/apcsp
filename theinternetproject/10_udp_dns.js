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

// What percent of packets are dropped?
const drop_packet_percent = 0.0;

/************************************************
 * CLIENT
 ************************************************/
var client_packets = [];

function clientUDPSend(request) {
    var request_string = JSON.stringify(request);
    var payload_length = 8;
    var payloads = [];
    for (var i = 0; i < request_string.length; i += payload_length) {
        var request_substring = request_string.slice(i, i + payload_length);
        payloads.push(request_substring);
    }

    for (var i = 0; i < payloads.length; i++) {
        var packet = {
            "source": request.source,
            "destination": request.destination,
            "payload": payloads[i],
            "packet_num": i,
            "total_packets": payloads.length
        }
        udpSendToServer(packet);
    }
}

function clientUDPReceive(pack) {
    client_packets.push(pack);

    if (client_packets.length == pack.total_packets) {
        // Sort the packets
        client_packets.sort(function compare(a, b) {
            return a.packet_num - b.packet_num;
        });

        var response_string = '';
        for (var i = 0; i < client_packets.length; i++) {
            response_string += client_packets[i].payload;
        }
        var response = JSON.parse(response_string);
        console.log("response obj received by client:");
        console.log(response);

        // Now resolve our promise
        var responseToClient;
        if (response.code == "NOERROR") {
            responseToClient = response.ip;
        }
        else {
            responseToClient = response.code;
        }
        that.dnsQuery.resolve(responseToClient);
    }
}

/************************************************
 * THE INTERNET
 ************************************************/

function udpSendToServer(pack) {
    if (Math.random() < drop_packet_percent) {
        console.log("dropping packet " + pack.packet_num);
        return;
    }
    // How long to wait before sending this packet? Up to 2 seconds
    var delay = Math.random() * 2000;
    setTimeout(function() { serverUDPReceive(pack); }, delay)
}

function udpSendToClient(pack) {
    if (Math.random() < drop_packet_percent) {
        console.log("dropping packet " + pack.packet_num);
        return;
    }
    // How long to wait before sending this packet? Up to 2 seconds
    var delay = Math.random() * 2000;
    setTimeout(function() { clientUDPReceive(pack); }, delay)
}

/************************************************
 * SERVER
 ************************************************/
var server_packets = [];

function serverUDPReceive(pack) {
    server_packets.push(pack);

    if (server_packets.length == pack.total_packets) {
        // Sort the packets
        server_packets.sort(function compare(a, b) {
            return a.packet_num - b.packet_num;
        });

        var request_string = '';
        for (var i = 0; i < server_packets.length; i++) {
            request_string += server_packets[i].payload;
        }
        var request = JSON.parse(request_string);
        console.log("request obj received by server:");
        console.log(request);

        // Now call serverDNS with the request
        var response = serverDNS(request);
        serverUDPSend(response);
    }
}

function serverUDPSend(response) {
    var response_string = JSON.stringify(response);
    var payload_length = 8;
    var payloads = [];
    for (var i = 0; i < response_string.length; i += payload_length) {
        var response_substring = response_string.slice(i, i + payload_length);
        payloads.push(response_substring);
    }
    //console.log(payloads);

    for (var i = 0; i < payloads.length; i++) {
        var packet = {
            "source": response.source,
            "destination": response.destination,
            "payload": payloads[i],
            "packet_num": i,
            "total_packets": payloads.length
        }
        udpSendToClient(packet);
    }
}

/************************************************
 * DNS
 ************************************************/
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
    
    clientUDPSend(dns_request);
}

/************************************************
 * PROMISE CRAP THIS STUFF IS COMPLICATED
 ************************************************/
function defer(url) {
    var res, rej;
    var promise = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
    });
    promise.resolve = res;
    promise.reject = rej;

    // This actually kicks off the client DNS call
    clientDNS(url);

    // This is what we use to know when the call is complete
    return promise;
}

var that = this;
this.dnsQuery = defer("theinternet.com");
this.dnsQuery.then((value) => {
    console.log("YES FINISHE")
    console.log(value);
});
