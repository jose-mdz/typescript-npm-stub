import {Config, DefaultConfig} from "./Config";
import {Logger} from "layer-logging";
import {run as runner} from "./App";

const logger = new Logger('Run');

export class LifeCycle{

    private static _instance: LifeCycle  = new LifeCycle();

    static get app(): LifeCycle { return LifeCycle._instance; }

    static async initialize(): Promise<LifeCycle>{

        logger.info("Initializing");

        const app = new LifeCycle();

        logger.info(`Loading config`);

        /**
         * TODO: Add more initialization methods here.
         *       Keep it simple and as stateless as possible.
         */

        await app.initializeConfig();

        LifeCycle._instance = app;

        /**
         * Handle interruptions
         */
        process.on(
            'SIGINT',
            async () => app.interrupt()
                .then(app => app.terminate())
                .then(() => process.exit(0))
                .catch(e => {
                    logger.error(`App failed: ${e}`);
                    process.exit(1);
                })
        );

        return app;
    }

    config: Config = DefaultConfig;

    private constructor(){}

    private async initializeConfig(){
        /**
         * Implement config initialization here
         */
    }

    async run(): Promise<this>{
        logger.info("Running");
        await runner(this.config);
        return this;
    }

    async interrupt(): Promise<this>{
        logger.info("Interrupting");
        /**
         * TODO: Add interruption handling here
         **/
        return this;
    }

    async terminate(): Promise<this>{

        logger.info("Terminating");

        /**
         * TODO: Add finalization methods here, e.g.
         *       Close network connections
         *       Wait pending work to finish
         *       Consider tests will terminate app to test it
         */


        return this;
    }

}