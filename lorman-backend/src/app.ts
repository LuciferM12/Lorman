import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import { supabaseClient } from "./config/supabaseClient";
import userRoutes from "./routes/users.routes";
import cors from "cors";

const app = express();

// Make CORS origin configurable via environment variable (CORS_ORIGIN), support comma-separated list
const corsOriginEnv = process.env.CORS_ORIGIN || 'http://localhost:8081';
const corsOrigin = corsOriginEnv.includes(',')
  ? corsOriginEnv.split(',').map(origin => origin.trim())
  : corsOriginEnv;
app.use(cors({
  origin: corsOrigin,
  credentials: true, // si envías cookies o headers personalizados
}));

app.use(express.json());

// TODO: Routes must be defined here 
app.get("/ping", async (req, res) => {
    const { data, error } = await supabaseClient.from("usuarios").select("*").limit(1);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    return res.json({ message: "Conexión exitosa", data });
})

app.use("/users", userRoutes)

app.use(errorHandler);

export default app;