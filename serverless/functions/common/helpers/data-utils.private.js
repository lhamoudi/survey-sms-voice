const fs = require("fs");
const assetPath = "/flowData.json";

exports.lookupFlowData = (surveyType, channel) => {
  console.log(`Asset path`, assetPath);

  // load all flow data from asset
  const flowDataFile = Runtime.getAssets()[assetPath].path;

  console.log(`Flow data file`, flowDataFile);
  const allFlowDataText = fs.readFileSync(flowDataFile).toString("utf-8");
  console.log(`Flow data text`, allFlowDataText);

  const allFlowData = JSON.parse(allFlowDataText);

  // find flow config data by survey type and channel
  const flowData = allFlowData.find(
    (tmpFlowData) =>
      tmpFlowData.surveyType == surveyType && tmpFlowData.channel == channel
  );

  if (!flowData) {
    return {
      error: `Flow data not found for surveyType '${surveyType}' and channel '${channel}'`,
      status: 404,
    };
  }

  return flowData;
};
