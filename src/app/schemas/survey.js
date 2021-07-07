exports.createSurveySchema = {
  tags: ["Survey"],
  summary: "This API is used to create Survey",
  description: "This API is used to create Survey",
  body: {
    type: "object",
    required: ["surveyName", "questions"],
    additionalProperties: false,
    properties: {
      surveyName: {
        type: "string",
        description: "Unique Name of the Survey",
        minLength: 10
      },
      questions: {
        type: "array",
        minItems: 1,
        maxItems: 3,
        items: {
          type: "object",
          required: ["description"],
          properties: {
            description: { type: "string", minLength: 10 }
          }
        }
      }
    }
  },
  response: {
    201: {
      type: "object",
      properties: {
        surveyName: {
          type: "string"
        },
        questions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              questionId: { type: "integer" },
              description: { type: "string" }
            }
          }
        }
      }
    }
  }
};

exports.takeSurveySchema = {
  tags: ["Survey"],
  summary: "This API is used to take Survey",
  description: "This API is used to take Survey",
  params: {
    type: "object",
    properties: {
      surveyName: { type: "string" }
    }
  },
  body: {
    type: "array",
    items: {
      type: "object",
      required: ["questionId", "answer"],
      properties: {
        questionId: { type: "integer" },
        answer: { type: "boolean", default: true }
      }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        success: {
          type: "boolean"
        }
      }
    }
  }
};

exports.surveyResultsSchema = {
  tags: ["Survey"],
  summary: "This API is used to get Survey result",
  description: "This API is used get Survey result for a Survey",
  params: {
    type: "object",
    properties: {
      surveyName: { type: "string" }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        overAll: {
          type: "object",
          properties: {
            numberOfSurveyTaken: { type: "integer" },
            positiveResponses: { type: "integer" },
            negativeResponses: { type: "integer" }
          }
        },
        breakUp: {
          type: "array",
          items: {
            type: "object",
            properties: {
              questionId: { type: "integer" },
              description: { type: "string" },
              positiveResponses: { type: "integer" },
              negativeResponses: { type: "integer" }
            }
          }
        }
      }
    }
  }
};
