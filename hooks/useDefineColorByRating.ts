import { useMemo } from "react";

interface Value {
    number: number | null | undefined;
}

const useDefineColorByRating = ({ number }: Value) => {
    return useMemo(() => {
        if (number) {
            if (number > 85) {
                return "success";
            } else if (number > 65) {
                return "info";
            } else if (number > 35) {
                return "warning";
            } else if (number > 0) {
                return "error";
            } else {
                return "primary";
            }
        } else {
            return "primary";
        }
    }, [number]);
};

export default useDefineColorByRating;
