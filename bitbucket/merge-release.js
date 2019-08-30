const Bitbucket = require("bitbucket");

module.exports = async (team, repo, releaseBranch) => {
  const bitbucket = new Bitbucket();
  const username = process.env.BITBUCKET_USERNAME;

  bitbucket.authenticate({
    type: "basic",
    username: username,
    password: process.env.BITBUCKET_PASSWORD
  });

  // create a pull request
  const prBody = {
    title: `Merge ${releaseBranch}`,
    description: "Auto generated Merge PR for releases",
    source: {
      branch: {
        name: releaseBranch
      }
    }
  };
  const {
    data: createdPullRequest
  } = await bitbucket.repositories.createPullRequest({
    _body: prBody,
    repo_slug: repo,
    username: team
  });

  console.log("Created PR: ", createdPullRequest.id);

  const mergeBody = {
    mergeStrategy: "squash"
  };
  const { data: mergeResult } = await bitbucket.repositories.mergePullRequest({
    _body: mergeBody,
    pull_request_id: createdPullRequest.id,
    repo_slug: repo,
    username: team
  });

  console.log("Merged:", mergeResult.title);
};
