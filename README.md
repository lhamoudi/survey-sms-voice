<a  href="https://www.twilio.com">
<img  src="https://static0.twilio.com/marketing/bundles/marketing/img/logos/wordmark-red.svg"  alt="Twilio"  width="250"  />
</a>
<br>
<br>

---

# Studio SMS and Voice Survey

This repo is a starting point for survey Studio Flows (SMS & Voice), with associated Serverless Functions and Assets.

# Setup

## Prerequisites

- you are running node v16 or above
- twilio cli 5.2.0 or above is [installed](https://www.twilio.com/docs/twilio-cli/getting-started/install) (`twilio --version`)
- twilio serverless plugin 3.0.4 or above is [installed](https://www.twilio.com/docs/labs/serverless-toolkit/getting-started#install-the-twilio-serverless-toolkit) (`twilio plugins` `twilio plugins:install @twilio-labs/plugin-serverless@latest`)
- `twilio profiles:list` has an active account set.
- have the twilio auth token for your account ready (you can find this in the [Twilio Console](https://console.twilio.com/))

## Serverless Setup

For the Functions and Assets, you can either manually create a Service via the Twilio Console, and add these individual files there (yucky), or...

You can work on these in your own IDE with source control etc, and deliver them via CLI (recommended). This is what we'll guide you through here.

To deploy the Serverless Functions and Assets:

1. Clone this repo
2. Make sure the twilio cli has the correct account set to active

```bash
twilio profiles:list
```

3. cd into the repository's `serverless` folder and execute the following (this installs all package dependencies)

```bash
cd serverless
npm install
```

4. Copy the `.env.example` file to `.env`

```bash
cp .env.example .env
```

5. Enter your account SID and auth token values in `.env`
6. Deploy to your Twilio account

```bash
npm run deploy -- --override-existing-project
```

For future changes, just the deploy step will be needed.

## Studio Setup

We've included our example flows as JSON files under the `studio` directory. NOTE: Since these flows were lifted from my account, there are some references that need updated. The following steps will guide you through this.

1. Navigate to Studio Flows in Console
2. Create new Flow called "Survey - Voice" (or anything you like), and select "Import from JSON" option from the list of templates
3. Paste in the JSON from our `flow-survey-voice.json` file and create the new flow
4. Navigate to all Run Function widgets and amend the Service, Environment and Function values to reflect your Serverless deployment from earlier.
5. Change the URL of the "send_results_to_server" widget at the end (if you have a webhook for this)
6. Click Publish
7. Go back to the list of Flows
8. Take note of your Flow SID (`FW...`) for the voice flow you just created - as we'll need it in the next flow...
9. Create new Flow called "Survey - SMS" (or anything you like), and select "Import from JSON" option from the list of templates
10. Paste in the JSON from our `flow-survey-sms.json` file and create the new flow
11. Navigate to all Run Function widgets and amend the Service, Environment and Function values to reflect your Serverless deployment from earlier.
12. For the "to_voice_flow" widget, set the `flowSid` to be the SID of the voice flow you captured above
13. Change the URL of the "send_results_to_server" widget at the end (if you have a webhook for this)
14. Click Publish

## Execute the Flow

To initiate the flow via CLI:

```bash
twilio api:studio:v2:flows:executions:create --flow-sid=<YOUR-SMS-SURVEY-FLOW-SID> --from=<YOUR-TWILIO-NUMBER> --to=<YOUR-CELLPHONE>
```

e.g.

```bash
twilio api:studio:v2:flows:executions:create --flow-sid=FWa6a02f4e7f430c8acc76839e6e7ffc83 --from=+18001234567 --to=+14445556666
```
