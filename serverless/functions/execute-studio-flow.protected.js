/**
 * Executes the Studio Flow SID provided in the request, via REST API
 */
exports.handler = function (context, event, callback) {
  const client = context.getTwilioClient();

  const { flowSid, to, from } = event;

  executeStudioFlow(client, flowSid, to, from).then(([execution, error]) => {
    return callback(null);
  });
};

function executeStudioFlow(client, flowSid, to, from) {
  // TODO: Exponential backoff against rate limits
  console.log(`Starting execution of ${flowSid} from ${from} to ${to}`);

  return client.studio.v2
    .flows(flowSid)
    .executions.create({ to, from })
    .then((execution) => {
      console.log(
        `Successfully started execution of ${flowSid} from ${from} to ${to}`
      );
      return [execution, null];
    })
    .catch((e) => {
      console.log(
        `Error starting execution of ${flowSid} from ${from} to ${to}`,
        e
      );
      return [null, e];
    });
}
