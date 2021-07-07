const {
  checkIfSurveyNameExist,
  createNewSurvey,
  checkIfValidQuestionIdForSurvey,
  getSurveyResults,
  saveSurveyInputs
} = require("../repository/survey");

exports.createSurvey = async request => {
  const { surveyName, questions } = request.body;
  const exist = await checkIfSurveyNameExist(surveyName);
  if (exist) {
    return {
      statusCode: 400,
      response: {
        message: "'surveyName' already exist, Please use different survey name"
      }
    };
  }

  const response = await createNewSurvey({ surveyName, questions });
  return { statusCode: 201, response };
};

exports.takeSurvey = async request => {
  const { surveyName } = request.params;
  const exist = await checkIfSurveyNameExist(surveyName);
  if (!exist) {
    return {
      statusCode: 404,
      response: {
        message: "'surveyName' not exist, Please use correct survey name"
      }
    };
  }

  const questionIds = request.body.map(value => value.questionId);
  const { valid, reason } = await checkIfValidQuestionIdForSurvey({
    surveyName,
    questionIds
  });
  if (!valid) {
    return {
      statusCode: 400,
      response: {
        message: reason
      }
    };
  }
  await saveSurveyInputs({ surveyName, responses: request.body });

  return { statusCode: 200, response: { success: true } };
};

exports.surveyResults = async request => {
  const { surveyName } = request.params;
  const response = await getSurveyResults(surveyName);
  return { statusCode: 200, response };
};
