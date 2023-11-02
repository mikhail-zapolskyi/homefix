import React, { useState } from "react";
import _ from "lodash";

//  Define fields for error content
export type Fields = {
    service_quality: number | null | undefined;
    punctuality: number | null | undefined;
    communication: number | null | undefined;
    consultations: number | null | undefined;
    professionalism: number | null | undefined;
    expertise: number | null | undefined;
    efficiency: number | null | undefined;
    accuracy: number | null | undefined;
    friendliness: number | null | undefined;
    problem_solving: number | null | undefined;
    emergency: number | null | undefined;
    value_for_money: number | null | undefined;
    reliability: number | null | undefined;
    transparency: number | null | undefined;
    discounts: number | null | undefined;
    innovation: number | null | undefined;
    accountability: number | null | undefined;
};

const useValidateReviewFields = () => {
    const [errorContent, setErrorContent] = useState<Record<string, any>>({});

    const validateForm = (data: Fields) => {
        const newErrorContent: Record<string, any> = {};

        _.map(data, (value, key) => {
            if (value === null || value === undefined) {
                newErrorContent[key] = `${_.startCase(key)} is required`;
            }
        });

        const hasError = Object.keys(newErrorContent).length > 0;

        setErrorContent(newErrorContent);

        return !hasError;
    };

    return { errorContent, validateForm };
};

export default useValidateReviewFields;
