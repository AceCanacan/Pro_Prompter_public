/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { getSummary } from "../graphql/queries";
import { updateSummary } from "../graphql/mutations";
export default function SummaryUpdateForm(props) {
  const {
    id: idProp,
    summary: summaryModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    description: "",
    firstSummary: "",
    secondSummary: "",
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [firstSummary, setFirstSummary] = React.useState(
    initialValues.firstSummary
  );
  const [secondSummary, setSecondSummary] = React.useState(
    initialValues.secondSummary
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = summaryRecord
      ? { ...initialValues, ...summaryRecord }
      : initialValues;
    setTitle(cleanValues.title);
    setDescription(cleanValues.description);
    setFirstSummary(cleanValues.firstSummary);
    setSecondSummary(cleanValues.secondSummary);
    setErrors({});
  };
  const [summaryRecord, setSummaryRecord] = React.useState(summaryModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getSummary.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getSummary
        : summaryModelProp;
      setSummaryRecord(record);
    };
    queryData();
  }, [idProp, summaryModelProp]);
  React.useEffect(resetStateValues, [summaryRecord]);
  const validations = {
    title: [{ type: "Required" }],
    description: [],
    firstSummary: [],
    secondSummary: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          title,
          description: description ?? null,
          firstSummary: firstSummary ?? null,
          secondSummary: secondSummary ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: updateSummary.replaceAll("__typename", ""),
            variables: {
              input: {
                id: summaryRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "SummaryUpdateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              description,
              firstSummary,
              secondSummary,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description: value,
              firstSummary,
              secondSummary,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="First summary"
        isRequired={false}
        isReadOnly={false}
        value={firstSummary}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              firstSummary: value,
              secondSummary,
            };
            const result = onChange(modelFields);
            value = result?.firstSummary ?? value;
          }
          if (errors.firstSummary?.hasError) {
            runValidationTasks("firstSummary", value);
          }
          setFirstSummary(value);
        }}
        onBlur={() => runValidationTasks("firstSummary", firstSummary)}
        errorMessage={errors.firstSummary?.errorMessage}
        hasError={errors.firstSummary?.hasError}
        {...getOverrideProps(overrides, "firstSummary")}
      ></TextField>
      <TextField
        label="Second summary"
        isRequired={false}
        isReadOnly={false}
        value={secondSummary}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              firstSummary,
              secondSummary: value,
            };
            const result = onChange(modelFields);
            value = result?.secondSummary ?? value;
          }
          if (errors.secondSummary?.hasError) {
            runValidationTasks("secondSummary", value);
          }
          setSecondSummary(value);
        }}
        onBlur={() => runValidationTasks("secondSummary", secondSummary)}
        errorMessage={errors.secondSummary?.errorMessage}
        hasError={errors.secondSummary?.hasError}
        {...getOverrideProps(overrides, "secondSummary")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || summaryModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || summaryModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
