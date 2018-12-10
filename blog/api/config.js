const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.MONGODB_URI || 'mongodb://tai_8:tai_8_zal@ds127704.mlab.com:27704/tai_8_kr',
  JwtSecret: process.env.JWT_SECRET || 'secret'
};

module.exports = config;
