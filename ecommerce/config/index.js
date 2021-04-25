require("dotenv").config()  // Mueve a las variables de entorno la configuración del archivo .env

const config = {
    dev: process.env.NODE_ENV !== 'production',
    dbUrl: process.env.DB_URL,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
}

module.exports = { config }
