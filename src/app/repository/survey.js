const surveys = require("../data/survey.json");
const results = require("../data/surveyResults.json");

exports.checkIfSurveyNameExist = async surveyName => {
  if (Object.hasOwnProperty.call(surveys, surveyName)) {
    return true;
  }
  return false;
};

exports.checkIfValidQuestionIdForSurvey = async ({
  surveyName,
  questionIds
}) => {
  const { questions } = surveys[surveyName];
  if (questionIds.length !== questions.length) {
    return {
      valid: false,
      reason:
        "Insufficient Responses: Please add responses for all questions for given Survey"
    };
  }
  const validQuestionIds = questions.map(val => val.questionId);

  const invalidId = questionIds.find(
    questionId => !validQuestionIds.includes(questionId)
  );

  if (invalidId) {
    return {
      valid: false,
      reason: `'questionId': ${invalidId} not exist for survey ${surveyName}, Please use correct questionId`
    };
  }

  return { valid: true };
};

exports.createNewSurvey = async ({ surveyName, questions }) => {
  surveys[surveyName] = {
    surveyName,
    questions: questions.map((value, index) => {
      return { ...value, questionId: index + 1 };
    })
  };
  return surveys[surveyName];
};

exports.saveSurveyInputs = async ({ surveyName, responses }) => {
  const { questions } = surveys[surveyName];
  if (!results[surveyName]) {
    results[surveyName] = {
      overAll: {
        numberOfSurveyTaken: 0,
        positiveResponses: 0,
        negativeResponses: 0
      },
      breakUp: questions.map(({ id, description }) => {
        return { id, description, positiveResponses: 0, negativeResponses: 0 };
      })
    };
  }
  results[surveyName].overAll.numberOfSurveyTaken += 1;
  const questionIndexes = questions.reduce((acc, value, index) => {
    acc[value.questionId] = index;
    return acc;
  }, {});

  responses.forEach(({ questionId, answer }) => {
    const index = questionIndexes[questionId];
    if (answer) {
      results[surveyName].overAll.positiveResponses += 1;
      results[surveyName].breakUp[index].positiveResponses += 1;
    } else {
      results[surveyName].overAll.negativeResponses += 1;
      results[surveyName].breakUp[index].negativeResponses += 1;
    }
  });
  return true;
};

exports.getSurveyResults = async surveyName => {
  return results[surveyName];
};
