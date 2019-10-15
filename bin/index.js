#!/usr/bin/env node
require("dotenv").config();

const argv = require("yargs").command(
  "merge <team> <repo> <branch>",
  "Create and merge a PR for a release",
  yargs => {
    yargs.positional("team", {
      describe: "the Bitbucket team",
      type: "string",
      demandOption: true
    });
    yargs.positional("repo", {
      describe: "the repo to merge",
      type: "string",
      demandOption: true
    });
    yargs.positional("branch", {
      describe: "the branch to merge",
      type: "string",
      demandOption: true
    });
  }
).command("download <bucketName>", "Download files in a bucket", yargs =>{
  yargs.positional("bucketName", {
    describe: "the bucket name",
    type: "string",
    demandOption: true
  })
}).argv;

const mergeRelease = require("../bitbucket/merge-release");
const gcloudStorage = require('../gcloud/download-gstorage');

if (argv._[0] === "merge") {
  mergeRelease(argv.team, argv.repo, argv.branch)
    .then(() => {
      console.log("Done");
    })
    .catch(err => {
      console.error(err);
    });
} else if(argv._[0] === "download") {
  gcloudStorage(argv.bucketName)
    .catch(err => {
      console.error(err);
    });
} else {
  console.log("Command error");
}
