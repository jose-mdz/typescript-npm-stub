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
exports.App = void 0;
const layer_logging_1 = require("layer-logging");
const logger = new layer_logging_1.Logger('App');
class App {
    constructor() {
        this.config = null;
    }
    static get instance() { return App._instance; }
    static initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (App.instance) {
                throw `Already Initialized`;
            }
            logger.info("Initializing");
            const app = new App();
            logger.info(`Loading config`);
            yield app.initializeConfig();
            App._instance = app;
            return app;
        });
    }
    initializeConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            this.config = yield App.configProvider();
        });
    }
    run() {
        logger.info("Running!");
    }
    terminate() {
        return __awaiter(this, void 0, void 0, function* () {
            App._instance = null;
        });
    }
}
exports.App = App;
App._instance = null;
App.configProvider = () => __awaiter(void 0, void 0, void 0, function* () {
    return ({
        port: 9090
    });
});
//# sourceMappingURL=App.js.map