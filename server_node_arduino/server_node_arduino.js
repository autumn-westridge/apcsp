var osc = require('osc');

var oscPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121,
    metadata: true
});

oscPort.open();

var freq = 0;

oscPort.on("ready", function () {
    oscPort.send({
        address: "/bus",
        args: [
            {
                type: "i",
                value: "0"
            },
            {
                type: "i",
                value: "1"
            }
        ]
    }, "127.0.0.1", 6969);

    var inter = setInterval(() => {
        oscPort.send({
            address: "/bus",
            args: [
                {
                    type: "i",
                    value: "1"
                },
                {
                    type: "f",
                    value: freq
                }
            ]
        }, "127.0.0.1", 6969);
        freq += 0.1;
        console.log(freq);

        if (freq >= 1) {
            oscPort.send({
                address: "/bus",
                args: [
                    {
                        type: "i",
                        value: "0"
                    },
                    {
                        type: "i",
                        value: "0"
                    }
                ]
            }, "127.0.0.1", 6969);
            setTimeout(() => {
                oscPort.close();
            }, 200);
            clearInterval(inter);       
        }
    }, 200)
});
