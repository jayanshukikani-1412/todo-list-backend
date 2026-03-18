const ENV_CONFIG = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/todo-list",
    JWT_SECRET: process.env.JWT_SECRET || "jwt-secret-key",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "10m",
} as const

export default ENV_CONFIG;