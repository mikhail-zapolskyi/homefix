import { useMemo } from "react";
import { useTheme } from "@mui/material/styles";

interface Value {
    number: number | null | undefined;
}

const useDefineColorByRating = ({ number }: Value) => {
    const theme = useTheme();
    return useMemo(() => {
        if (number) {
            if (number > 90) {
                return "exellent";
            } else if (number > 70) {
                return "very_good";
            } else if (number > 50) {
                return "good";
            } else if (number > 30) {
                return "fair";
            } else if (number > 15) {
                return "poor";
            } else if (number > 0) {
                return "bad";
            }
        } else {
            return "primary";
        }
    }, [number]);
};

export default useDefineColorByRating;
