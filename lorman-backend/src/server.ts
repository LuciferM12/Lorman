import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT ?? 8080);

app.listen(PORT, () => {
    console.log(`✅ Server is running at http://192.168.1.7:${PORT}`);
});