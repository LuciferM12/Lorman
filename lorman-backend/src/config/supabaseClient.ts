import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv"
import { Database } from "../types/database.types";

dotenv.config();

const url: string = process.env.SUPABASE_URL!
const key: string = process.env.SUPABASE_KEY!

if (!url || !key) {
    throw new Error("Supabase URL or Key is not defined in environment variables");
}

export const supabaseClient: SupabaseClient = createClient<Database>(url, key);