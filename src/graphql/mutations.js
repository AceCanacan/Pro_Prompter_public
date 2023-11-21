/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const saveSummary = /* GraphQL */ `
  mutation SaveSummary($input: SaveSummaryInput!) {
    saveSummary(input: $input) {
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
export const createSummary = /* GraphQL */ `
  mutation CreateSummary(
    $input: CreateSummaryInput!
    $condition: ModelSummaryConditionInput
  ) {
    createSummary(input: $input, condition: $condition) {
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
export const updateSummary = /* GraphQL */ `
  mutation UpdateSummary(
    $input: UpdateSummaryInput!
    $condition: ModelSummaryConditionInput
  ) {
    updateSummary(input: $input, condition: $condition) {
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
export const deleteSummary = /* GraphQL */ `
  mutation DeleteSummary(
    $input: DeleteSummaryInput!
    $condition: ModelSummaryConditionInput
  ) {
    deleteSummary(input: $input, condition: $condition) {
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
