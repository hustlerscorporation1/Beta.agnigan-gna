import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.REACT_APP_SUPABASE_URL || "https://xywauwyayfcewlxkgdwe.supabase.co";
const supabaseAnonKey =
  process.env.REACT_APP_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5d2F1d3lheWZjZXdseGtnZHdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1ODEyMDcsImV4cCI6MjA3MzE1NzIwN30.q9eEPu4mi_P2RANprXdmE1RZKcYWno4veeFzRx8cxKA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
