const ENV_CONFIG = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/todo-list",
} as const

export default ENV_CONFIG;