/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SummaryUpdateFormInputValues = {
    title?: string;
    description?: string;
    firstSummary?: string;
    secondSummary?: string;
};
export declare type SummaryUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    firstSummary?: ValidationFunction<string>;
    secondSummary?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SummaryUpdateFormOverridesProps = {
    SummaryUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    firstSummary?: PrimitiveOverrideProps<TextFieldProps>;
    secondSummary?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SummaryUpdateFormProps = React.PropsWithChildren<{
    overrides?: SummaryUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    summary?: any;
    onSubmit?: (fields: SummaryUpdateFormInputValues) => SummaryUpdateFormInputValues;
    onSuccess?: (fields: SummaryUpdateFormInputValues) => void;
    onError?: (fields: SummaryUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SummaryUpdateFormInputValues) => SummaryUpdateFormInputValues;
    onValidate?: SummaryUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SummaryUpdateForm(props: SummaryUpdateFormProps): React.ReactElement;
