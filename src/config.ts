const config = {
	logLevel: process.env.LOG_LEVEL,
	logdnaUrl: process.env.LOGDNA_URL,
	logdnaKey: process.env.LOGDNA_KEY,
};

export default () => config;
