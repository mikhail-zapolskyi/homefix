const defineColorByRating = (status: string) => {
    const statuses = {
        ALL: "black",
        INITIATED: "info.dark",
        APPROVED: "primary.dark",
        IN_PROGRESS: "warning.main",
        INCOMPLETED: "error.main",
        COMPLETED: "primary.light",
        ACCEPTED: "primary.main",
        REVIEWED: "secondary.main",
    };

    return statuses[status as keyof typeof statuses];
};

export default defineColorByRating;
