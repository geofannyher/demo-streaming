import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUP_URL,
  import.meta.env.VITE_SUP_TOKEN
);
