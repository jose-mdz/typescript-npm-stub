import { Logger } from "layer-logging";
import { Config } from "./Config";

const logger = new Logger('App');

export async function run(config: Config): Promise<void> {
  logger.debug('Hello')
}