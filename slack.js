const webhookURL = "https://hooks.slack.com/services/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";

const message = {
  text: "Hello from JavaScript!",
};

fetch(webhookURL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(message),
})
.then(response => {
  if (response.ok) {
    console.log("Message sent to Slack");
  } else {
    console.error("Error sending message to Slack", response.statusText);
  }
})
.catch(error => {
  console.error("Network error", error);
});
