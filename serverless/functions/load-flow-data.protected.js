const DataUtils = require(Runtime.getFunctions()["common/helpers/data-utils"]
  .path);

exports.handler = function loadFlowData(context, event, callback) {
  const response = new Twilio.Response();
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST GET");
  response.appendHeader("Content-Type", "application/json");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");

  const { surveyType, channel } = event;

  try {
    const returnData = DataUtils.lookupFlowData(surveyType, channel);

    if (returnData.error) {
      const { error, status } = returnData;
      response.setStatusCode(status);
      response.setBody({ error });
      callback(null, response);
      return;
    }

    console.log(`Lookup Flow Data result`, returnData);
    response.setBody(returnData);
    callback(null, response);
  } catch (error) {
    console.log("Error executing function", error);
    response.setStatusCode(500);
    response.setBody({ error });
    callback(null, response);
  }
};
