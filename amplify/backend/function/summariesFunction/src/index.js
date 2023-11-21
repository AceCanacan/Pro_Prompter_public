const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

exports.handler = async (event) => {
  try {
    let data = JSON.parse(event.body);
    let item = {
      // Assuming 'summaryId' is the primary key and is required:
      summaryId: data.summaryId || 'generate-unique-id-here', // Generate a unique ID if not provided
      // Other attributes:
      title: data.title,
      description: data.description,
      firstSummary: data.firstSummary,
      secondSummary: data.secondSummary,
      date: data.date,
    };
    
    let params = {
      TableName: tableName,
      Item: item
    };
    
    await dynamoDb.put(params).promise();

    return { statusCode: 200, body: JSON.stringify(item) };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
