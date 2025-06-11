require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://lffcdncaammrsmotyowp.supabase.co",
  process.env.SUPABASE_API_KEY,
);

module.exports = supabase;
