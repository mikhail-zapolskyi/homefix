import React, { useState } from "react";
import _ from "lodash";
import { ReviewCriteria } from "@/app/types";

const useValidateReviewFields = () => {
    const [errorContent, setErrorContent] = useState<Record<string, any>>({});

    const validateForm = (data: ReviewCriteria) => {
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
