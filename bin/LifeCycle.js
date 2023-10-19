"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifeCycle = void 0;
const Config_1 = require("./Config");
const layer_logging_1 = require("layer-logging");
const App_1 = require("./App");
const logger = new layer_logging_1.Logger('Run');
class LifeCycle {
    constructor() {
        this.config = Config_1.DefaultConfig;
    }
    static get app() { return LifeCycle._instance; }
    static initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info("Initializing");
            const app = new LifeCycle();
            logger.info(`Loading config`);
            yield app.initializeConfig();
            LifeCycle._instance = app;
            process.on('SIGINT', () => __awaiter(this, void 0, void 0, function* () {
                return app.interrupt()
                    .then(app => app.terminate())
                    .then(() => process.exit(0))
                    .catch(e => {
                    logger.error(`App failed: ${e}`);
                    process.exit(1);
                });
            }));
            return app;
        });
    }
    initializeConfig() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info("Running");
            yield App_1.run(this.config);
            return this;
        });
    }
    interrupt() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info("Interrupting");
            return this;
        });
    }
    terminate() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info("Terminating");
            return this;
        });
    }
}
exports.LifeCycle = LifeCycle;
LifeCycle._instance = new LifeCycle();
//# sourceMappingURL=LifeCycle.js.map