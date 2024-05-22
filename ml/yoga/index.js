const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage, getDownloadURL } = require("firebase-admin/storage");

const serviceAccount = require("./private.json");
var fs = require("fs");

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "carex-b31f9.appspot.com",
});

const bucket = getStorage().bucket();

const getGlobalDownloadURL = async (filePath) => {
  const file = bucket.file(filePath);
  const url = await getDownloadURL(file);
  return url;
};

const formatter = (path, index, format) => `${path}/${index}.${format}`;

(async () => {
  let data = [];

  for (let i = 0; i <= 7; i++) {
    const imageUrl = await getGlobalDownloadURL(formatter("images", i, "jpg"));
    const videoUrl = await getGlobalDownloadURL(formatter("videos", i, "mp4"));
    data.push({ videoUrl, imageUrl });
  }

  exportToCSV(
    data,
    [
      { id: "videoUrl", title: "videoUrl" },
      { id: "imageUrl", title: "imageUrl" },
    ],
    "data.csv"
  );
})();
// 'bucket' is an object defined in the @google-cloud/storage library.
// See https://googlecloudplatform.github.io/google-cloud-node/#/docs/storage/latest/storage/bucket
// for more details.
const csvWriter = require("csv-writer");
const exportToCSV = (data, header, path) => {
  const writer = csvWriter.createObjectCsvWriter({
    path: path,
    header: header,
  });

  writer.writeRecords(data).then(() => {
    console.log("Done!");
  });
};
