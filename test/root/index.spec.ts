import {assert} from 'chai';
import {main} from "../../src";
import {LifeCycle} from "../../src/LifeCycle";
import {Logger} from "layer-logging";
import {randomInt, randomWord} from "../TestUtils";
import { DefaultConfig } from '../../src/Config';

describe('index', function () {

    beforeEach(async function () {
        if(LifeCycle.app) {
            await LifeCycle.app.terminate();
        }
    });

    before(function () {
        Logger.voidAllConsumers();
    });

    after(function () {
        Logger.restoreConsumersToDefaults();
    });

    it('should launch the app with config', async function () {

        const port = randomInt(1000, 9000);
        DefaultConfig.port = port;

        await main();

        assert.isNotNull(LifeCycle.app);
        assert.isNotNull(LifeCycle.app.config);
        assert.strictEqual(LifeCycle.app.config!.port, port);
    });


});