var config = {};

config.options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

config.dbUser = "<DB_USER_HERE>";
config.dbPassword = "<DB_PASSWORD_HERE>";

module.exports = config;    

