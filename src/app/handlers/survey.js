const {
  createSurvey,
  takeSurvey,
  surveyResults
} = require("../services/survey");

exports.createSurvey = async function createSurveyHandler(request, reply) {
  const { statusCode, response } = await createSurvey(request);
  return reply.code(statusCode).send(response);
};

exports.takeSurvey = async function takeSurveyHandler(request, reply) {
  const { statusCode, response } = await takeSurvey(request);
  return reply.code(statusCode).send(response);
};

exports.surveyResults = async function surveyResultsHandler(request, reply) {
  const { statusCode, response } = await surveyResults(request);
  return reply.code(statusCode).send(response);
};
