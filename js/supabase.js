/*
 * =========================================================
 * TESO WARRIORS FC
 * SUPABASE CONNECTION
 * =========================================================
 */

const SUPABASE_URL = "https://ymonxycpbztcslwgarqn.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_lUL8z-bbw81U3dSUjVwKbQ_T1qB3PfT";

const twfSupabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
);

window.twfSupabase = twfSupabase;
