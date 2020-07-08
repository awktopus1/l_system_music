

let rules = {
        "A": "C|A",
        "B": "DB|F",
        "C": "EG|C",
        "D": "FA|",
        "E": "GEB|D",
        "F": "AC|",
        "G": "B|GD"
};

let freqs = {
    C: 261.6256,
    D: 293.6648,
    E: 293.6648,
    F: 349.2282,
    G: 391.9954,
    A: 440.0000,
    B: 493.8833,
}

const axiom = "A";
let sentence = axiom;

function generate() {
    let nextSentence = "";

    for (let i = 0; i < sentence.length; i++) {
        let current = sentence.charAt(i);

        if (current in rules){
            nextSentence += rules[current]
        } else {
            nextSentence += current;
        }
    }

    sentence = nextSentence;
    createP(sentence);

}

class Player {
    constructor() {
        this.waves = [
            new p5.Oscillator('sine'),
            new p5.Oscillator('sine'),
            new p5.Oscillator('triangle')
        ];

        this.env1 = new p5.Envelope();
        this.env2 = new p5.Envelope();

        this.env1.setADSR(0.03, 0.1, 0.25, 1);
        this.env2.setADSR(0.02, 0.05, 0.075, 1);
        this.env1.setRange(0.4, 0);
        this.env2.setRange(0.15, 0);

        this.waves[0].start();
        this.waves[1].start();
        this.waves[2].start();

        this.waves[0].amp(this.env1);
        this.waves[1].amp(this.env2);
        this.waves[2].amp(this.env2);
    }

    play(freq) {
        this.waves[0].freq(freq);
        this.waves[1].freq(freq*2);
        this.waves[2].freq(freq);
        this.env1.play();
        this.env2.play();
    }
}

function play() {
    let i = 0;

    let timer_ = setInterval(function () {
        let current = "";
        while (sentence.charAt(i) !== "|") {
            current += sentence.charAt(i);
            i++;
            if (i > sentence.length) {
                break;
            }
        }

        for (let j = 0; j < current.length; j++) {
            let fs = freqs[current.charAt(j)];
            let p = new Player();
            p.play(fs);
        }
        i++
        if (i >= sentence.length) {
            clearInterval(timer_);
        }
    }, 500)
}

function setup() {
    createCanvas(0, 0);
    createP(axiom);

    let generate_button = createButton("generate");
    generate_button.mousePressed(generate);
    let play_button = createButton("play");
    play_button.mousePressed(play);

}

function draw() {
    background(220);
}