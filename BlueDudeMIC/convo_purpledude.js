var convo_purpledude = {
    "result": -1,
    "intro": {
        "words": "Hi!",
        "responses": [
            ["Hi!", "who"],
            ["Uh...", "who"],
            ["$@#% off.", "rude"],
            ["Where am I?", "where"]
        ]
    },
    "who": {
        "words": "Who are you?",
        "responses": [
            ["I'm not really sure...", "purple"],
            ["I think I'm some kind of a blue dude?", "purple"],
            ["I am vengance. I am the night. I am... the Batman.", "okay"]
        ]
    },
    "purple": {
        "words": "Wow! I'm some kind of a purple dude!",
        "responses": [
            ["That's stupid. Purple is a stupid color.", "rude"],
            ["Nice to meet you!", "polite"],
            ["Where am I?", "where"]
        ]
    },
    "where": {
        "words": "You're in a room! But you, uh... might not want to stay here that long.",
        "responses": [
            ["Don't tell me what to do!", "rude"],
            ["Why not?", "why"],
            [""]
        ]
    },
    "why": {
        "words": "Well... the manager really doesn't like when unauthorized people come here.",
        "responses": [

        ]
    },
    "polite": {
        "words": "You seem like a nice person, so I'll tell you a secret. That box in the other room... it's the real door.",
        "responses": [
            ["Thank you!", "bye"],
            ["Thanks, sucker. By the way, purple is a stupid color.", "rude2"]
        ]
    },
    "bye": {
        "words": "Yeah bye!!",
        "result": 0
    },
    "rude": {
        "words": "Wow, that was uncalled for. Good luck getting out of here on your own!",
        "result": 1
    },
    "rude2": {
        "words": "I tell you the secret and you go and talk to me like that? That's it, I'm calling the manager.",
        "result": 2
    },
    "okay": {
        "words": "Oh... okay. Um, maybe you should leave.",
        "result": 1
    }
};

var convo_purpledude_over = {
    "intro": {
        "words": "I think we're done talking!"
    }
}
