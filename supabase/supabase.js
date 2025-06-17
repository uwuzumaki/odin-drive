require("dotenv").config();
const { decode } = require("base64-arraybuffer");

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://lffcdncaammrsmotyowp.supabase.co",
  process.env.SUPABASE_API_KEY,
);

const uploadFile = async (dbFile, reqFile) => {
  const fileBase64 = decode(reqFile.buffer.toString("base64"));
  await supabase.storage.from("files").upload(dbFile.id, fileBase64, {
    contentType: reqFile.mimetype,
    upsert: true,
  });
};

const deleteFile = async (fileID) => {
  const { data, error } = await supabase.storage
    .from("files")
    .remove([`${fileID}`]);
};

const downloadFile = async (fileID) => {
  const { data, error } = await supabase.storage
    .from("files")
    .download(`${fileID}`);
};

module.exports = { uploadFile, deleteFile, downloadFile };
