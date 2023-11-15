import { useMemo } from "react";

const useFixerSkillLevel = (experience: number): string => {
    const skillLevel: string = useMemo(() => {
        switch (true) {
            case experience <= 2:
                return "Beginner";
            case experience <= 5:
                return "Novice";
            case experience <= 10:
                return "Intermediate";
            case experience <= 15:
                return "Skilled";
            case experience <= 20:
                return "Seasoned";
            case experience <= 25:
                return "Experienced";
            case experience <= 30:
                return "Advanced";
            case experience <= 35:
                return "Expert";
            case experience <= 40:
                return "Master";
            default:
                return "Legendary"; // Handle values greater than 40.
        }
    }, [experience]);

    return skillLevel;
};

export default useFixerSkillLevel;
