var osc = require('osc');

var oscPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121,
    metadata: true
});

oscPort.open();

oscPort.on("ready", function () {
    oscPort.send({
        address: "/s_new",
        args: [
            {
                type: "s",
                value: "hello world"
            },
            {
                type: "i",
                value: 6969
            }
        ]
    }, "127.0.0.1", 6969);
});

setTimeout(() => {
    oscPort.close();
}, 100);
