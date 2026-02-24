import { execSync } from "child_process";

console.log("[DEPLOY_PREVIEW]: START");

const command = "yarn deploy:staging";
const output = execSync(command, { encoding: "utf8" });

const match = output.match(/https:\/\/[^\s]+/);
const DEPLOY_URL = match ? match[0] : null;

console.log("[DEPLOY_PREVIEW]: END");

if (!DEPLOY_URL) {
  throw new Error("Deploy URL not found in output");
}

console.log(`Preview disponível em: ${DEPLOY_URL}`);

console.log("[GITHUB_COMMENT]: START");

const { GITHUB_TOKEN, GITHUB_REPOSITORY, GITHUB_REF } = process.env;

const PR_NUMBER = GITHUB_REF.split("/")[2];

const GH_COMMENT = `
🚀 Preview disponível:

👉 ${DEPLOY_URL}
`;

const response = await fetch(
  `https://api.github.com/repos/${GITHUB_REPOSITORY}/issues/${PR_NUMBER}/comments`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body: GH_COMMENT }),
  }
);

if (!response.ok) {
  const error = await response.text();
  console.log("[COMMENT_ON_GITHUB: ERROR]");
  throw new Error(error);
}

console.log("[COMMENT_ON_GITHUB: END]");