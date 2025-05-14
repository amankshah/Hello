const fs = require('fs');
const fetch = require('node-fetch');

// Read and parse the Cucumber JSON report
const reportData = JSON.parse(fs.readFileSync('report.json', 'utf-8'));

let passed = 0;
let failed = 0;
let skipped = 0;

reportData.forEach(feature => {
  feature.elements.forEach(scenario => {
    const statuses = scenario.steps.map(step => step.result.status);
    if (statuses.includes('failed')) {
      failed++;
    } else if (statuses.every(status => status === 'skipped')) {
      skipped++;
    } else {
      passed++;
    }
  });
});

const total = passed + failed + skipped;

const jobId = process.env.CI_JOB_ID;
const projectUrl = process.env.CI_PROJECT_URL;
const artifactUrl = `${projectUrl}/-/jobs/${jobId}/artifacts/download`;

const webhookURL = 'https://hooks.slack.com/services/XXX/YYY/ZZZ';

const message = {
  text: `*Playwright Cucumber Test Report*`,
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Playwright Cucumber Test Report* for <${projectUrl}|Project Link>`
      }
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Total Executed:*\n${total}`
        },
        {
          type: "mrkdwn",
          text: `*Passed:*\n:large_green_circle: ${passed}`
        },
        {
          type: "mrkdwn",
          text: `*Failed:*\n:red_circle: ${failed}`
        },
        {
          type: "mrkdwn",
          text: `*Skipped:*\n:warning: ${skipped}`
        }
      ]
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `<${artifactUrl}|Download Test Report Artifacts>`
      }
    }
  ]
};

fetch(webhookURL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(message),
})
  .then(res => {
    if (res.ok) {
      console.log('Slack message sent.');
    } else {
      console.error('Failed to send Slack message');
    }
  });
