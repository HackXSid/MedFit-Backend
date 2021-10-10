const { app } = require('./app');
const { logger } = require('./logger');
const { assertDatabaseConnectionOk } = require('./models/validateDB');

const dotenvfile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
require('dotenv').config({ path: dotenvfile });

const PORT = process.env.PORT || 8000;

assertDatabaseConnectionOk();

app.listen(PORT, '0.0.0.0', () =>
    logger.info(`MedFit Server listening on Port ${PORT}`),
);
