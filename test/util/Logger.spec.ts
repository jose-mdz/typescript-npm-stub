import {assert} from 'chai';
import {Logger} from "../../src/util/Logger";
import {randomWord} from "../../src/util/TestUtils";

describe(`Logger`, function () {

    let out_ERROR:  string[] = [];
    let out_WARN:   string[] = [];
    let out_INFO:   string[] = [];
    let out_DEBUG:  string[] = [];
    let out_TRACE:  string[] = [];
    let out_SILENT: string[] = [];

    before(function () {
        Logger.consumers.ERROR = (m, t) => out_ERROR .push(m);
        Logger.consumers.WARN = (m, t) => out_WARN .push(m);
        Logger.consumers.INFO = (m, t) => out_INFO .push(m);
        Logger.consumers.DEBUG = (m, t) => out_DEBUG .push(m);
        Logger.consumers.TRACE = (m, t) => out_TRACE .push(m);
        Logger.consumers.SILENT = (m, t) => out_SILENT .push(m);
    });

    beforeEach(function () {
        out_ERROR  = [];
        out_WARN   = [];
        out_INFO   = [];
        out_DEBUG  = [];
        out_TRACE  = [];
        out_SILENT = [];

        Logger.filterOut = [];
        Logger.filterIn = [];
        Logger.level = 'TRACE';
    });

    after(function () {
        Logger.restoreConsumersToDefaults();
    });

    it('should log a simple error', function () {

        Logger.level = 'TRACE';
        const a = new Logger();
        const word = randomWord();

        a.error(word);

        assert.strictEqual(out_ERROR.length, 1);
        assert.isTrue(out_ERROR[0].endsWith(word));

    });

    it('should log a simple warn', function () {

        Logger.level = 'TRACE';
        const a = new Logger();
        const word = randomWord();

        a.warn(word);

        assert.strictEqual(out_WARN.length, 1);
        assert.isTrue(out_WARN[0].endsWith(word));

    });

    it('should log a simple info', function () {

        Logger.level = 'TRACE';
        const a = new Logger();
        const word = randomWord();

        a.info(word);

        assert.strictEqual(out_INFO.length, 1);
        assert.isTrue(out_INFO[0].endsWith(word));

    });

    it('should log a simple debug', function () {

        Logger.level = 'TRACE';
        const a = new Logger();
        const word = randomWord();

        a.debug(word);

        assert.strictEqual(out_DEBUG.length, 1);
        assert.isTrue(out_DEBUG[0].endsWith(word));

    });

    it('should log a simple trace', function () {

        Logger.level = 'TRACE';
        const a = new Logger();
        const word = randomWord();

        a.trace(word);

        assert.strictEqual(out_TRACE.length, 1);
        assert.isTrue(out_TRACE[0].endsWith(word));

    });

    it('should NOT log a simple silent', function () {

        Logger.level = 'TRACE';
        const a = new Logger();
        const word = randomWord();

        a.silent(word);

        assert.strictEqual(out_SILENT.length, 0);

    });

    it('should not allow the level to be set to SILENT', function () {

        assert.throws(() => {
            Logger.level = 'SILENT';
        });

    });

    it('should correctly print at level DEBUG', function () {
        Logger.level = 'DEBUG';
        const a = new Logger();
        const word = randomWord();

        a.error(word);
        a.warn(word);
        a.info(word);
        a.debug(word);
        a.trace(word);
        a.silent(word);

        assert.strictEqual(out_ERROR.length, 1);
        assert.strictEqual(out_WARN.length, 1);
        assert.strictEqual(out_INFO.length, 1);
        assert.strictEqual(out_DEBUG.length, 1);
        assert.strictEqual(out_TRACE.length, 0);
        assert.strictEqual(out_SILENT.length, 0);
    });

    it('should correctly print at level INFO', function () {
        Logger.level = 'INFO';
        const a = new Logger();
        const word = randomWord();

        a.error(word);
        a.warn(word);
        a.info(word);
        a.debug(word);
        a.trace(word);
        a.silent(word);

        assert.strictEqual(out_ERROR.length, 1);
        assert.strictEqual(out_WARN.length, 1);
        assert.strictEqual(out_INFO.length, 1);
        assert.strictEqual(out_DEBUG.length, 0);
        assert.strictEqual(out_TRACE.length, 0);
        assert.strictEqual(out_SILENT.length, 0);
    });

    it('should correctly print at level WARN', function () {
        Logger.level = 'WARN';
        const a = new Logger();
        const word = randomWord();

        a.error(word);
        a.warn(word);
        a.info(word);
        a.debug(word);
        a.trace(word);
        a.silent(word);

        assert.strictEqual(out_ERROR.length, 1);
        assert.strictEqual(out_WARN.length, 1);
        assert.strictEqual(out_INFO.length, 0);
        assert.strictEqual(out_DEBUG.length, 0);
        assert.strictEqual(out_TRACE.length, 0);
        assert.strictEqual(out_SILENT.length, 0);
    });

    it('should correctly print at level ERROR', function () {
        Logger.level = 'ERROR';
        const a = new Logger();
        const word = randomWord();

        a.error(word);
        a.warn(word);
        a.info(word);
        a.debug(word);
        a.trace(word);
        a.silent(word);

        assert.strictEqual(out_ERROR.length, 1);
        assert.strictEqual(out_WARN.length, 0);
        assert.strictEqual(out_INFO.length, 0);
        assert.strictEqual(out_DEBUG.length, 0);
        assert.strictEqual(out_TRACE.length, 0);
        assert.strictEqual(out_SILENT.length, 0);
    });

    it('should correctly print at level TRACE', function () {
        Logger.level = 'TRACE';
        const a = new Logger();
        const word = randomWord();

        a.error(word);
        a.warn(word);
        a.info(word);
        a.debug(word);
        a.trace(word);
        a.silent(word);

        assert.strictEqual(out_ERROR.length, 1);
        assert.strictEqual(out_WARN.length, 1);
        assert.strictEqual(out_INFO.length, 1);
        assert.strictEqual(out_DEBUG.length, 1);
        assert.strictEqual(out_TRACE.length, 1);
        assert.strictEqual(out_SILENT.length, 0);
    });

    it('should filter out keywords', function () {

        const outWord = randomWord();

        Logger.filterOut = [outWord];

        const a = new Logger(randomWord());
        const b = new Logger(outWord);

        const aWord = randomWord();
        const bWord = randomWord();

        a.trace(aWord);
        b.trace(bWord);

        assert.strictEqual(out_TRACE.length, 1);
        assert.isTrue(out_TRACE[0].endsWith(aWord));

    });

    it('should filter in keywords', function () {

        const inWord = randomWord();
        const a = new Logger(inWord);
        const word = randomWord();

        Logger.level = 'ERROR';
        a.trace(word);

        assert.strictEqual(out_TRACE.length, 0);

        Logger.filterIn = [inWord];

        a.trace(word);

        assert.strictEqual(out_TRACE.length, 1);
        assert.isTrue(out_TRACE[0].endsWith(word));

    });

    it('should not filter in a word not matching filterIn', function () {
        const inWord = randomWord();
        const a = new Logger(randomWord());
        const word = randomWord();

        Logger.level = 'ERROR';
        a.trace(word);

        assert.strictEqual(out_TRACE.length, 0);

        Logger.filterIn = [inWord];

        a.trace(word);

        assert.strictEqual(out_TRACE.length, 0);
    });

    it('should filter out if key is present in both filterIn and filterOut', function () {

        const inWord = randomWord();
        const a = new Logger(inWord);
        const word = randomWord();

        Logger.level = 'ERROR';
        a.trace(word);

        assert.strictEqual(out_TRACE.length, 0);

        Logger.filterIn = [inWord];
        Logger.filterOut = [inWord];

        a.trace(word);

        assert.strictEqual(out_TRACE.length, 0);

    });

    it('should restore the defaults of log consumers', function () {
        Logger.restoreConsumersToDefaults();

        assert.strictEqual(Logger.consumers.ERROR, console.error);
        assert.strictEqual(Logger.consumers.WARN, console.warn);
        assert.strictEqual(Logger.consumers.INFO, console.info);
        assert.strictEqual(Logger.consumers.DEBUG, console.debug);
        assert.strictEqual(Logger.consumers.TRACE, console.log);
        assert.strictEqual(Logger.consumers.SILENT, console.log);
    });

    it('should void all consumers', function () {

        Logger.voidAllConsumers();

        Logger.level = 'TRACE';
        const a = new Logger();
        const word = randomWord();

        a.error(word);
        a.warn(word);
        a.info(word);
        a.debug(word);
        a.trace(word);
        a.silent(word);

        assert.strictEqual(out_ERROR.length, 0);
        assert.strictEqual(out_WARN.length, 0);
        assert.strictEqual(out_INFO.length, 0);
        assert.strictEqual(out_DEBUG.length, 0);
        assert.strictEqual(out_TRACE.length, 0);
        assert.strictEqual(out_SILENT.length, 0);

    });

});