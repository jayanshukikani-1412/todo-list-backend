import "dotenv/config";
import createApp from "./app.ts";
import connectToDatabase from "./config/db.ts";
import ENV_CONFIG from "./config/env-config.ts";

const startServer = async () => {
    await connectToDatabase();

    const app = createApp();

    const PORT = ENV_CONFIG.PORT;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer();