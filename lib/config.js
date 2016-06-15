var config = {
  user: process.env.DB_UN,
  password: process.env.DB_PW,
  host: process.env.DB_SERVER,
  database: process.env.DB_NAME
};

module.exports = config;