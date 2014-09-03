var config = {};

config.options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

config.dbUser = "admin";
config.dbPassword = "admin";

module.exports = config;    

