"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
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
                var C = computeAngle(a, b, c), A = computeAngle(c, b, a), B = computeAngle(a, c, b);
                _this.angles = {
                    A: A,
                    B: B,
                    C: C
                };
            },
            SAS: function () {
                //remove null values, store index
                var side = Object.values(_this.sides).filter(function (x) { return !!x; });
                var angle = Object.entries(_this.angles).filter(function (x) { return !!x[1]; })[0];
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
                    var degD = _this.toDeg(Math.asin(D));
                    var X = degD, Xalt = 180 - degD;
                    _this.alt = JSON.parse(JSON.stringify({ sides: _this.sides, angles: _this.angles }));
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
                //known side and its key
                var _a = __read(Object.entries(_this.sides).filter(function (x) { return !!x[1]; })[0], 2), fixKey = _a[0], fixSide = _a[1];
                fixKey = fixKey.toString().toUpperCase();
                _this.angles[fixKey] = missingAngle;
                Object.entries(_this.sides).forEach(function (entry) {
                    var key = entry[0].toUpperCase();
                    if (!_this.angles[key])
                        _this.angles[key] = missingAngle;
                    if (!entry[1]) {
                        _this.sides[entry[0]] = (Math.sin(_this.toRad(_this.angles[key])) * fixSide) / Math.sin(_this.toRad(_this.angles[fixKey]));
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
        this.validator = {
            sides: (+!!a) + (+!!b) + (+!!c),
            angles: (+!!A) + (+!!B) + (+!!C)
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
        this.validator = {
            sides: (+!!this.sides.a) + (+!!this.sides.b) + (+!!this.sides.c),
            angles: (+!!this.angles.A) + (+!!this.angles.B) + (+!!this.angles.C)
        };
        if (this.validator.sides === 0)
            this.status = 'You need to provide at least one side';
        else if (this.validator.sides + this.validator.angles !== 3)
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
    Triangle.prototype.roundResults = function () {
        var _this = this;
        Object.keys(this.sides).forEach(function (key) {
            _this.sides[key] = Math.round((_this.sides[key] + Number.EPSILON) * 100) / 100;
        });
        Object.keys(this.angles).forEach(function (key) {
            _this.angles[key] = Math.round((_this.angles[key] + Number.EPSILON) * 100) / 100;
        });
    };
    Triangle.prototype.pickAlgorithm = function () {
        if (this.validator.sides === 3)
            return 'SSS';
        if (this.validator.angles === 2) {
            //pick AAS or ASA
            for (var key in this.sides) {
                //check if side has opposite angle
                if (this.sides[key] !== null && this.angles[key.toUpperCase()]) {
                    return 'AAS';
                }
            }
            return 'ASA';
        }
        if (this.validator.sides === 2) {
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
    Triangle.prototype.update = function (idx, value) {
        if (idx.toUpperCase() === idx) {
            this.angles[idx] = value ? parseInt(value) : null;
        }
        else {
            this.sides[idx] = value ? parseInt(value) : null;
        }
        this.validateInput();
    };
    //inverted scale adheres to canvas coordinate system
    Triangle.prototype.getCoordinates = function (size, inverted) {
        var Ax, Ay, Bx, By, Cx, Cy;
        //start from 0,0
        Ax = 0;
        Ay = 0;
        //A-C pararell to x-axis
        Cx = Ax + this.sides.b;
        Cy = Ay;
        //constructs right triangle adjacent to side a, which serves as vector components
        var primC = 90 - this.angles.C;
        var primB = 180 - 90 - primC;
        var ratio = this.sides.a / Math.sin(this.toRad(90));
        var h = Math.sin(this.toRad(primB)) * ratio;
        var x = Math.sin(this.toRad(primC)) * ratio;
        Bx = Cx - x, By = Cy + h;
        var coords = { Ax: Ax, Ay: Ay, Bx: Bx, By: By, Cx: Cx, Cy: Cy };
        var min = Math.min.apply(Math, Object.values(coords)), max = Math.max.apply(Math, Object.values(coords));
        var rescaled = Object.entries(coords).map(function (x) {
            return [x[0], size * 0.95 * (x[1] - min) / (max - min)];
        });
        return {
            Ax: rescaled[0][1],
            Ay: inverted ? size - rescaled[1][1] : rescaled[1][1],
            Bx: rescaled[2][1],
            By: inverted ? size - rescaled[3][1] : rescaled[3][1],
            Cx: rescaled[4][1],
            Cy: inverted ? size - rescaled[5][1] : rescaled[5][1]
        };
    };
    Triangle.prototype.draw = function (canvas) {
        var size = canvas.height;
        var _a = this.getCoordinates(size, true), Ax = _a.Ax, Ay = _a.Ay, Bx = _a.Bx, By = _a.By, Cx = _a.Cx, Cy = _a.Cy;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(Ax, Ay);
        ctx.lineTo(Cx, Cy);
        ctx.lineTo(Bx, By);
        ctx.closePath();
        ctx.fillStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
        //ADD LABELS
        //angles
        ctx.font = "16px Arial black";
        ctx.fillStyle = "black";
        ctx.fillText("A:" + this.angles.A, Ax + 20, Ay - 15);
        ctx.fillText("B:" + this.angles.B, Bx - 20, By + 50);
        ctx.fillText("C:" + this.angles.C, Cx - 60, Cy - 15);
        //sides
        ctx.fillText("a:" + this.sides.a, (Bx + Cx) / 2 + 15, (By + Ay) / 2);
        ctx.fillText("b:" + this.sides.b, (Cx - Ax) / 2, Ay - 15);
        ctx.fillText("c:" + this.sides.c, (Bx + Ax) / 2 - 40, (By + Ay) / 2);
        //arcs
        ctx.beginPath();
        ctx.strokeStyle = '#ff0000';
        ctx.arc(Ax, Ay, 75, this.toRad(360 - this.angles.A), 0);
        ctx.moveTo(Bx, By);
        ctx.arc(Bx, By, 75, this.toRad(this.angles.B + this.angles.C), this.toRad(this.angles.C), true);
        ctx.moveTo(Cx, Cy);
        ctx.arc(Cx, Cy, 75, this.toRad(180), this.toRad(this.angles.C - 180), false);
        ctx.stroke();
    };
    Triangle.prototype.solve = function () {
        var _this = this;
        this.validateInput();
        return new Promise(function (resolve, reject) {
            //pick algorithm
            var alg = _this.pickAlgorithm();
            //use algorithm
            _this.algorithmMap[alg]();
            //validateResult
            _this.validateResults();
            _this.roundResults();
            if (_this.status === "Solved") {
                resolve("Solved");
            }
            else if (_this.status === "Two solutions possible") {
                resolve("Two solutions possible");
            }
            else
                reject(_this.status);
        });
    };
    return Triangle;
}());
exports.default = Triangle;
//# sourceMappingURL=index.js.map