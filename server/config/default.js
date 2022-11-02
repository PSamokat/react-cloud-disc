export const config = {
    serverPort : process.env.API_PORT,
    mongoURI : `mongodb://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@${process.env.API_URL}:${process.env.MONGO_PORT}/cloud?authSource=admin`,
    secretKey : process.env.SECRET_KEY,
}