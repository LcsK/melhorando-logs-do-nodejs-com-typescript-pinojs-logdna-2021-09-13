import { makeLogger } from './Logger';

const logger = makeLogger();

logger.debug({
	type: 'LOG_TYPE_1',
	message: 'oi',
});
