import { ReviewCriteria } from "@/app/types";
import { Review } from "@prisma/client";
import { useMemo, useState } from "react";
import _ from "lodash";

const useReviewCreteriaAverages = (props: Review[]) => {
    const initialAverages: ReviewCriteria = {
        service_quality: 0,
        punctuality: 0,
        communication: 0,
        consultations: 0,
        professionalism: 0,
        expertise: 0,
        efficiency: 0,
        accuracy: 0,
        friendliness: 0,
        problem_solving: 0,
        emergency: 0,
        value_for_money: 0,
        reliability: 0,
        transparency: 0,
        discounts: 0,
        innovation: 0,
        accountability: 0,
    };

    const [averages, setAverages] = useState<ReviewCriteria>(initialAverages);

    useMemo(() => {
        if (props.length === 0) {
            // If there are no reviews, reset the averages to 0.
            setAverages(initialAverages);
        } else {
            // Calculate the sum of each review criteria.
            const criteriaSums = _.reduce(
                props,
                function (sum, value) {
                    for (const key in value) {
                        if (key in sum) {
                            if (key !== undefined && key !== null) {
                                sum[key as keyof ReviewCriteria]! +=
                                    value[key as keyof ReviewCriteria]!;
                            }
                        }
                    }
                    return sum;
                },
                { ...initialAverages }
            );

            // Calculate the averages by dividing the sums by the number of reviews.
            const reviewCount = props.length;
            const criteriaAverages: ReviewCriteria = {} as ReviewCriteria;
            for (const key in criteriaSums) {
                criteriaAverages[key as keyof ReviewCriteria] = _.round(
                    criteriaSums[key as keyof ReviewCriteria]! / reviewCount
                );
            }

            setAverages(criteriaAverages); // Update the state with the averages
        }
    }, [props]);

    return averages;
};

export default useReviewCreteriaAverages;
