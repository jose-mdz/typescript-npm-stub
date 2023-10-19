import {assert} from 'chai';
import {LifeCycle} from "../../src/LifeCycle";
import {Logger} from "layer-logging";

describe(`App`, function () {

    before(function () {
        Logger.voidAllConsumers()
    });

    after(function () {
        Logger.restoreConsumersToDefaults();
    });

    it('should gracefully initialize and terminate App', async function () {

        await LifeCycle.initialize();

        assert.isTrue(LifeCycle.app instanceof LifeCycle);

        await LifeCycle.app.terminate();

    });

});