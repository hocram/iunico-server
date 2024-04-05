export default () => ({
    environment: process.env.NODE_ENV || 'development',
    app: {
      port: parseInt(process.env.APP_PORT, 10) || 3000,
    },
    database: {
      //uri: `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
      //testUri: `mongodb://${process.env.DATABASE_TEST_HOST}:${process.env.DATABASE_TEST_PORT}/${process.env.DATABASE_TEST_NAME}`
    },
    api: {
      key: process.env.API_KEY || 'api-key',
    },
});