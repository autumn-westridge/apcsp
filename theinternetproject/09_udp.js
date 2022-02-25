// What percent of packets are dropped?
const drop_packet_percent = 0.05;

/************************************************
 * CLIENT
 ************************************************/
// The client's IP address
const client_ip = "49.81.27.109";
// IP address of the DNS server
const dns_server_ip = "8.8.8.8";
// Spoofing a DNS call for theinternet.com
var spoof_url = "theinternet.com";
var spoof_dns = {
    "source": client_ip,
    "destination": dns_server_ip,
    "url": spoof_url
}

//
function clientUDP(request) {
    var request_string = JSON.stringify(request);
    var payload_length = 8;
    var payloads = [];
    for (var i = 0; i < request_string.length; i += payload_length) {
        var request_substring = request_string.slice(i, i + payload_length);
        payloads.push(request_substring);
    }
    console.log(payloads);

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

function udpSendToServer(pack) {
    if (Math.random() < drop_packet_percent) {
        console.log("dropping packet " + pack.packet_num);
        return;
    }
    // How long to wait before sending this packet? Up to 2 seconds
    var delay = Math.random() * 2000;
    setTimeout(function() { udpReceiveFromClient(pack); }, delay)
}

clientUDP(spoof_dns);

/************************************************
 * SERVER
 ************************************************/
var packets = [];
var found_last_packet = false;
var total_packets = -1;


function udpReceiveFromClient(pack) {
    packets.push(pack);

    if (packets.length == pack.total_packets) {
        // Sort the packets
        packets.sort(function compare(a, b) {
            return a.packet_num - b.packet_num;
        });

        var request_string = '';
        for (var i = 0; i < packets.length; i++) {
            request_string += packets[i].payload;
        }

        var request = JSON.parse(request_string);

        console.log(request);
        // Now call serverDNS with the request
    }
}
