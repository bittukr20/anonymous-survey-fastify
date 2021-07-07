const {
  createSurvey,
  takeSurvey,
  surveyResults
} = require("../handlers/survey");
const {
  createSurveySchema,
  takeSurveySchema,
  surveyResultsSchema
} = require("../schemas/survey");

module.exports = async fastify => {
  fastify.route({
    method: "POST",
    url: "/survey",
    schema: createSurveySchema,
    handler: createSurvey
  });

  fastify.route({
    method: "POST",
    url: "/survey/:surveyName",
    schema: takeSurveySchema,
    handler: takeSurvey
  });

  fastify.route({
    method: "GET",
    url: "/survey/:surveyName/results",
    schema: surveyResultsSchema,
    handler: surveyResults
  });
};
