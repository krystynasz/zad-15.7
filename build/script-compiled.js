"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch() {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

        _this.state = {
            running: false,
            text: React.createElement(
                "div",
                null,
                React.createElement(
                    "span",
                    null,
                    "00"
                ),
                ":",
                React.createElement(
                    "span",
                    null,
                    "00"
                ),
                ":",
                React.createElement(
                    "span",
                    null,
                    "00"
                )
            )
        };
        _this.reset();
        _this.start = _this.start.bind(_this);
        _this.step = _this.step.bind(_this);
        _this.calculate = _this.calculate.bind(_this);
        _this.stop = _this.stop.bind(_this);
        _this.print = _this.print.bind(_this);
        _this.format = _this.format.bind(_this);
        _this.print(_this.times);
        return _this;
    }

    _createClass(Stopwatch, [{
        key: "reset",
        value: function reset() {
            this.times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
        }
    }, {
        key: "start",
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                this.setState({ running: true });
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }
            console.log("The timer has been started");
        }
    }, {
        key: "step",
        value: function step() {
            if (!this.state.running) return;
            this.calculate();
            console.log("Timer is ticking");
            this.print();
        }
    }, {
        key: "calculate",
        value: function calculate() {
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
    }, {
        key: "format",
        value: function format(times) {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "span",
                    null,
                    " ",
                    pad0(times.minutes),
                    " "
                ),
                ":",
                React.createElement(
                    "span",
                    null,
                    " ",
                    pad0(times.seconds),
                    " "
                ),
                ":",
                React.createElement(
                    "span",
                    null,
                    " ",
                    pad0(Math.floor(times.miliseconds))
                )
            );
        }
    }, {
        key: "print",
        value: function print() {
            this.setState({ text: this.format(this.times) });
        }
    }, {
        key: "stop",
        value: function stop() {
            this.setState({ running: false });
            clearInterval(this.watch);
            console.log("The timer has been stopped");
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "button",
                    { onClick: this.start },
                    "Start timer"
                ),
                React.createElement(
                    "button",
                    { onClick: this.stop },
                    "Stop timer"
                ),
                React.createElement(
                    "div",
                    null,
                    this.state.text
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

ReactDOM.render(React.createElement(Stopwatch, null), document.querySelector('.stopwatch'));
