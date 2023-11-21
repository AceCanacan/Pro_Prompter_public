/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSummary = /* GraphQL */ `
  query GetSummary($id: ID!) {
    getSummary(id: $id) {
      id
      title
      description
      firstSummary
      secondSummary
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const listSummaries = /* GraphQL */ `
  query ListSummaries(
    $filter: ModelSummaryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSummaries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        firstSummary
        secondSummary
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const updateSummary = /* GraphQL */ `
  mutation UpdateSummary($input: UpdateSummaryInput!) {
    updateSummary(input: $input) {
      id
      title
      description
      firstSummary
      secondSummary
      createdAt
      updatedAt
      __typename
    }
  }
`;
