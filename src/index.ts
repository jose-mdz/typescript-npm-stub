import {LifeCycle} from "./LifeCycle";
import {Logger} from "layer-logging";

const logger = new Logger('main-index');

export async function main() {

    return LifeCycle.initialize()
        .then(app => app.run())
        .finally(() => LifeCycle.app.terminate())
        .catch(e => {
            logger.error(`App failed: ${e}`);
            process.exit(1);
        });
}

main();