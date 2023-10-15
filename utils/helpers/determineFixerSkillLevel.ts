/**
 * Determine the skill level of a fixer based on their years of experience.
 *
 * @param {number} experience - The years of experience of the fixer (0 to 40).
 * @returns {string} - The skill level of the fixer.
 */
const determineFixerSkillLevel = (experience: number) => {
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
};

export default determineFixerSkillLevel;
