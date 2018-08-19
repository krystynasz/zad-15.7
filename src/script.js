function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result ='0' + result;
    }
    return result;
}

class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            running: false,
            text: <div><span>00</span>:<span>00</span>:<span>00</span></div>
        };
        this.reset();
        this.start = this.start.bind(this);
        this.step = this.step.bind(this);
        this.calculate = this.calculate.bind(this);
        this.stop = this.stop.bind(this);
        this.print = this.print.bind(this);
        this.format = this.format.bind(this);
        this.print(this.times);
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }
    start() {
        if (!this.state.running) {
            this.setState({ running: true });
            this.watch = setInterval(() => this.step(), 10);
        }
        console.log("The timer has been started");
    }
    step() {
        if (!this.state.running) return;
        this.calculate();
        console.log("Timer is ticking")
        this.print();
    }
    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
        console.log("The time is being calculated");
    }
    format(times) {
       return <div><span> {pad0(times.minutes)} </span>:<span> {pad0(times.seconds)} </span>:<span> {pad0(Math.floor(times.miliseconds))}</span></div>
    }
    print() {
        this.setState({ text: this.format(this.times) });
    }
    stop() {
        this.setState({ running: false });
        clearInterval(this.watch);
        console.log("The timer has been stopped");
    }
    render() {
        return (
            <div>
                <button onClick={this.start}>
                    Start timer
          </button>
                <button onClick={this.stop}>
                    Stop timer
          </button>
                <div>{this.state.text}
                </div>
            </div>
        );
    }
}
ReactDOM.render(
    <Stopwatch />,
    document.querySelector('.stopwatch')
);
