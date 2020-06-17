"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Triangle = /** @class */ (function () {
    function Triangle(_a) {
        var _this = this;
        var _b = _a.a, a = _b === void 0 ? null : _b, _c = _a.b, b = _c === void 0 ? null : _c, _d = _a.c, c = _d === void 0 ? null : _d, _e = _a.A, A = _e === void 0 ? null : _e, _f = _a.B, B = _f === void 0 ? null : _f, _g = _a.C, C = _g === void 0 ? null : _g;
        this.algorithmMap = {
            SSS: function () {
                var computeAngle = function (a, b, c) {
                    var result = Math.acos((Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b));
                    return _this.toDeg(result);
                };
                var a = _this.sides.a, b = _this.sides.b, c = _this.sides.c;
                var C = computeAngle(a, b, c), A = computeAngle(a, b, c), B = computeAngle(a, b, c);
                _this.angles = {
                    A: A,
                    B: B,
                    C: C
                };
            },
            SAS: function () {
                //remove null values, store index
                var side = Object.values(_this.sides).filter(function (x) { return !!x; });
                var angle = Object.entries(_this.angles).filter(function (x) { return !!x[1]; }).flat();
                //law of cosines to get missing side
                var missingSide = Math.sqrt(Math.pow(side[0], 2) + Math.pow(side[1], 2) - 2 * side[0] * side[1] * Math.cos(_this.toRad(angle[1])));
                _this.sides[angle[0].toLowerCase()] = missingSide;
                _this.algorithmMap['SSS']();
            },
            AAS: function () {
                //find missing angle
                var missingAngle = Object.entries(_this.angles).reduce(function (a, b) { return a - b[1]; }, 180);
                var side = Object.entries(_this.sides).filter(function (x) { return !!x[1]; }).flat();
                Object.entries(_this.sides).forEach(function (entry) {
                    var key = entry[0].toUpperCase();
                    if (!_this.angles[key])
                        _this.angles[key] = missingAngle;
                    if (!entry[1]) {
                        _this.sides[entry[0]] = (Math.sin(_this.toRad(_this.angles[entry[0].toUpperCase()])) * side[1]) / Math.sin(_this.toRad(_this.angles[side[0].toUpperCase()]));
                    }
                });
            },
            sSA: function () {
                //may produce two triangles
                var angle = Object.entries(_this.angles).filter(function (x) { return !!x[1]; });
                //sort => long side, short side, unknown side
                var sides = Object.entries(_this.sides).sort(function (a, b) { return b[1] - a[1]; });
                //long side / short side * angle adjacent to longer side
                var D = sides[0][1] / sides[1][1] * Math.sin(_this.toRad(angle[0][1]));
                if (D > 1) {
                    _this.status = 'Invalid input, sides do not connect';
                }
                else if (D === 1 || sides[0][1] === sides[1][1]) {
                    console.log('single solution');
                    _this.angles[sides[0][0].toUpperCase()] = _this.toDeg(Math.asin(D)); //opposite to long side
                    //find last angle
                    _this.angles[sides[2][0].toUpperCase()] = Object.entries(_this.angles).reduce(function (a, b) { return a - b[1]; }, 180);
                    //compute side using law of sines
                    _this.sides[sides[2][0]] =
                        _this.sides[angle[0][0].toLowerCase()]
                            *
                                Math.sin(_this.toRad(_this.angles[sides[2][0].toUpperCase()]))
                            /
                                Math.sin(_this.toRad(angle[0][1]));
                }
                else if (D < 1) {
                    _this.status = "Two solutions possible";
                    var X = _this.toDeg * Math.asin(D), Xalt = 180 - _this.toDeg * Math.asin(D);
                    _this.alt = {
                        sides: _this.sides,
                        angles: _this.angles
                    };
                    //main
                    _this.angles[sides[0][0].toUpperCase()] = X;
                    _this.angles[sides[2][0].toUpperCase()] = Object.entries(_this.angles).reduce(function (a, b) { return a - b[1]; }, 180);
                    _this.sides[sides[2][0]] =
                        _this.sides[angle[0][0].toLowerCase()]
                            *
                                Math.sin(_this.toRad(_this.angles[sides[2][0].toUpperCase()]))
                            /
                                Math.sin(_this.toRad(angle[0][1]));
                    //alt
                    _this.alt.angles[sides[0][0].toUpperCase()] = Xalt;
                    _this.alt.angles[sides[2][0].toUpperCase()] = Object.entries(_this.alt.angles).reduce(function (a, b) { return a - b[1]; }, 180);
                    _this.alt.sides[sides[2][0]] =
                        _this.alt.sides[angle[0][0].toLowerCase()]
                            *
                                Math.sin(_this.toRad(_this.alt.angles[sides[2][0].toUpperCase()]))
                            /
                                Math.sin(_this.toRad(angle[0][1]));
                }
            },
            SsA: function () {
                var angle = Object.entries(_this.angles).filter(function (x) { return !!x[1]; });
                //sort => long side, short side, unknown side
                var sides = Object.entries(_this.sides).sort(function (a, b) { return b[1] - a[1]; });
                //long side / short side * angle adjacent to longer side
                _this.angles[sides[1][0].toUpperCase()] = _this.toDeg(Math.asin(Math.sin(_this.toRad(angle[0][1])) * sides[1][1] / sides[0][1]));
                _this.angles[sides[2][0].toUpperCase()] = Object.entries(_this.angles).reduce(function (a, b) { return a - b[1]; }, 180);
                _this.sides[sides[2][0]] =
                    _this.sides[angle[0][0].toLowerCase()]
                        *
                            Math.sin(_this.toRad(_this.angles[sides[2][0].toUpperCase()]))
                        /
                            Math.sin(_this.toRad(angle[0][1]));
            },
            ASA: function () {
                var missingAngle = Object.entries(_this.angles).reduce(function (a, b) { return a - b[1]; }, 180);
                var side = Object.entries(_this.sides).filter(function (x) { return !!x[1]; }).flat();
                Object.entries(_this.sides).forEach(function (entry) {
                    var key = entry[0].toUpperCase();
                    if (!_this.angles[key])
                        _this.angles[key] = missingAngle;
                    if (!entry[1]) {
                        _this.sides[entry[0]] = (Math.sin(_this.toRad(_this.angles[key])) * side[1]) / Math.sin(_this.toRad(_this.angles[key]));
                    }
                });
            },
        };
        this.sides = {
            a: a,
            b: b,
            c: c
        };
        this.angles = {
            A: A,
            B: B,
            C: C
        };
        this.area = null;
        this.status = 'Three values need to be specified, including at least one side';
        this.alt = null;
    }
    Triangle.prototype.toRad = function (angle) {
        return angle * (Math.PI / 180);
    };
    Triangle.prototype.toDeg = function (angle) {
        return angle * (180 / Math.PI);
    };
    Triangle.prototype.validateInput = function () {
        //bool to int conversion
        var sides = (+!!this.sides.a) + (+!!this.sides.b) + (+!!this.sides.c);
        var angles = (+!!this.angles.A) + (+!!this.angles.B) + (+!!this.angles.C);
        this.s = sides;
        this.A = angles;
        if (sides === 0)
            this.status = 'You need to provide at least one side';
        if (sides + angles !== 3)
            this.status = 'You need to provide exactly three values';
        else
            this.status = 'Valid input';
    };
    Triangle.prototype.validateResults = function () {
        var valid = Math.abs(this.angles.A + this.angles.B + this.angles.C - 180) < 0.1, altValid = this.alt ? Math.abs(this.alt.angles.A + this.alt.angles.B + this.alt.angles.C - 180) < 0.1 : null;
        if (valid && altValid) {
            this.status = 'Two solutions possible';
        }
        else if (valid) {
            this.status = 'Solved';
        }
        else if (!valid && altValid) {
            this.angles = this.alt.angles;
            this.sides = this.alt.sides;
        }
        else {
            this.status = 'Provided values doesnt make up a triangle';
        }
    };
    Triangle.prototype.pickAlgorithm = function () {
        if (this.s === 3)
            return 'SSS';
        if (this.A === 2) {
            //pick AAS or ASA
            for (var key in this.sides) {
                //check if side has opposite angle
                if (this.sides[key] !== null && this.angles[key.toUpperCase()]) {
                    return 'AAS';
                }
            }
            return 'ASA';
        }
        if (this.s === 2) {
            //pick SAS, sSA or SsA, uppercase side longer side
            for (var key in this.angles) {
                if (this.angles[key] && this.sides[key.toLowerCase()]) {
                    //check if angle is opposite to longer side
                    var longer = Object.entries(this.sides)
                        .filter(function (entry) { return entry[1] != null; })
                        .sort(function (a, b) { return b[1] - a[1]; })[0][0];
                    return key.toLowerCase() === longer ? 'SsA' : 'sSA';
                }
            }
            return 'SAS';
        }
    };
    Triangle.prototype.update = function (_a) {
        var _b = _a.a, a = _b === void 0 ? null : _b, _c = _a.b, b = _c === void 0 ? null : _c, _d = _a.c, c = _d === void 0 ? null : _d, _e = _a.A, A = _e === void 0 ? null : _e, _f = _a.B, B = _f === void 0 ? null : _f, _g = _a.C, C = _g === void 0 ? null : _g;
        this.sides = {
            a: a,
            b: b,
            c: c
        };
        this.angles = {
            A: A,
            B: B,
            C: C
        };
        this.area = null;
        this.status = 'Three values need to be specified, including at least one side';
        this.alt = null;
    };
    Triangle.prototype.draw = function (canvas) {
        var _this = this;
        var ctx = canvas.getContext('2d');
        var height = canvas.height;
        var factor = height / this.sides[Object.keys(this.sides).sort(function (a, b) { return _this.sides[b] - _this.sides[a]; })[0]];
        var Ax = 0, Ay = height;
        var Cx = this.sides.b * factor, Cy = Ay;
        var primC = 90 - this.angles.C;
        var primB = 180 - 90 - primC;
        var ratio = this.sides.a / Math.sin(this.toRad(90));
        var h = Math.sin(this.toRad(primB)) * ratio * factor;
        var x = Math.sin(this.toRad(primC)) * ratio * factor;
        var Bx = Cx - x, By = Cy - h;
        ctx.beginPath();
        ctx.moveTo(Ax, Ay);
        ctx.lineTo(Cx, Cy);
        ctx.lineTo(Bx, By);
        ctx.closePath();
        ctx.fillStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
    };
    Triangle.prototype.solve = function () {
        this.validateInput();
        if (this.status === 'Valid input') {
            //pick algorithm
            var alg = this.pickAlgorithm();
            //use algorithm
            this.algorithmMap[alg]();
            //validateResult
            this.validateResults();
            if (this.status === 'Solved') {
                console.log('solved');
                return {
                    angles: this.angles,
                    sides: this.sides
                };
            }
            else if (this.status === 'Two solutions possible') {
                console.log('solved two');
                return [{
                        angles: this.angles,
                        sides: this.sides
                    }, {
                        angles: this.alt.angles,
                        sides: this.alt.sides
                    }];
            }
            else
                return "Error: " + this.status;
        }
        else
            return this.status;
    };
    return Triangle;
}());
exports.default = Triangle;
//# sourceMappingURL=index.js.map