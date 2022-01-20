const ip_payload_length = 4;

// segment: a single TCP or UDP segment (string)
function clientIPSend(segment) {
    // Break down into packets
    let packets = [];
    let packet_num = 0;
    // Turn the Object into a string
    let seg_str = JSON.stringify(segment);
    for (let i = 0; i < segment.length; i += ip_payload_length) {
        // A packet can be 4 characters long. The last packet might not be all 4 characters
        let packet_length = Math.min(ip_payload_length, segment.length - i);
        // Use the length to break off that piece of the segment string
        let packet_payload = segment.substr(i, packet_length);
        // Define the packet object
        let packet = {
            dest_ip: segment.dest_ip,
            send_ip: segment.send_ip,
            packet_num: packet_num,
            payload: packet_payload
        }
        routePacket(packet);
        // Increment the packet number
        packet_num++;
    }
}

function routePacket(packet) {
    let rand_timeout = Math.random() * 100;

}

var serverPackets = [];
function serverIPReceive(packet) {
    
}