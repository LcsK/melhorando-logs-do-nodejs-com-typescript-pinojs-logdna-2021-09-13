import pino from 'pino';
import { Logger, LogData } from './types';
import makePinoLogdna from 'pino-logdna';
import makeConfig from '../config';

const config = makeConfig();
const pinoLogdna = makePinoLogdna({
	key: config.logdnaKey,
	url: config.logdnaUrl,
	onError: console.error,
});

pinoLogdna.on('error', (err) => {
	console.error(err)
});

const pinoLogger = pino({
	level: config.logLevel,
}, pinoLogdna);

const parseLoggerInputToPinoFormat = <T> ({ message, error, ...data }: LogData<T>) => ({
	msg: message,
	err: error,
	...data,
})

const AppLogger: Logger = {
	debug: <T> (logData: LogData<T>) => pinoLogger.debug(parseLoggerInputToPinoFormat(logData)),
	info: <T> (logData: LogData<T>) => pinoLogger.info(parseLoggerInputToPinoFormat(logData)),
	warn: <T> (logData: LogData<T>) => pinoLogger.warn(parseLoggerInputToPinoFormat(logData)),
	error: <T> (logData: LogData<T>) => pinoLogger.error(parseLoggerInputToPinoFormat(logData)),
};

export default (): Logger => AppLogger;
