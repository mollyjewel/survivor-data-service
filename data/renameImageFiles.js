/*
Make sure the server is running, then from SurvivorStataBackend,
run "node data/renameImageFiles.js x" where x is the season number.
Can run "find . -type f -name "*_*" -exec bash -c 'f="$1"; g="${f/*_/_}";
mv -- "$f" "$g"' _ '{}' \;" in bash to help fix file names.
*/

const { readdirSync, rename } = require('fs');
const { resolve } = require('path');
const axios = require("axios");

const http = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});

const seasonId = process.argv.slice(2)[0];
console.log(seasonId);

const imageDirPath = resolve(
  "/Users/mollysoliday/Desktop/WebDevelopment/SurvivorStatsFrontend/public/imgs/contestants",
  seasonId);
console.log(imageDirPath);

// Get an array of the files inside the folder
var files = readdirSync(imageDirPath);
console.log(files);

http.get(`/contestants/season/${seasonId}`).then(response => {
  const contestants = response.data;
  console.log(contestants);
  files.forEach(file => {
    renameFile(file, contestants);
  });
}).catch(function (error) {
  console.log("Error while fetching contestants: " + error);
});

function renameFile(file, contestants) {
  contestants.forEach(contestant => {
    let matchName = "surv" + seasonId + "_cast_" + contestant.firstName.toLowerCase() + ".jpg";
    let matchNameL = "surv" + seasonId + "_cast_" + contestant.lastName.toLowerCase() + ".jpg";
    let matchNameFL = "surv" + seasonId + "_cast_" + contestant.firstName.toLowerCase() + contestant.lastName.toLowerCase() + ".jpg";
    let matchNameFl = "surv" + seasonId + "_cast_" + contestant.firstName.toLowerCase() + contestant.lastName.charAt(0).toLowerCase() + ".jpg";
    let matchNamefL = "surv" + seasonId + "_cast_" + contestant.firstName.charAt(0).toLowerCase() + contestant.lastName.toLowerCase() + ".jpg";
    let newName = contestant._id + ".jpg";
    if (file == matchName || file == matchNameFL || file == matchNameL || file == matchNameFl || file == matchNamefL) {
      rename(
        imageDirPath + `/${file}`,
        imageDirPath + `/${newName}`,
        err => console.log(err)
      );
      return;
    }
    if (contestant.nickname) {
      let matchNameN = "surv" + seasonId + "_cast_" + contestant.nickname.toLowerCase() + ".jpg";
      if (file == matchNameN) {
        rename(
          imageDirPath + `/${file}`,
          imageDirPath + `/${newName}`,
          err => console.log(err)
        );
        return;
      }
    }
  });
};
