"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.times = exports.randomWords = exports.randomWord = exports.randomInt = void 0;
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.randomInt = randomInt;
function randomChar() {
    return Math.random() > 0.5 ? String.fromCharCode(randomInt(65, 90)) : String.fromCharCode(randomInt(97, 122));
}
function randomWord(length) {
    if (length === void 0) { length = 10; }
    return new Array(length).fill('').map(function (c) { return randomChar(); }).join('');
}
exports.randomWord = randomWord;
function randomWords(count, length_min, length_max) {
    if (count === void 0) { count = 5; }
    if (length_min === void 0) { length_min = 10; }
    return times(count, function () { return randomWord(randomInt(length_min, length_max || length_min)); }).join(' ');
}
exports.randomWords = randomWords;
function times(n, callback) {
    if (isNaN(n) || !isFinite(n) || n <= 0) {
        return [];
    }
    var result = [];
    for (var i = 0; i < n; i++) {
        result.push(callback(i));
    }
    return result;
}
exports.times = times;
