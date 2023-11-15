type ProjectsOverYearType = {
    name: string;
    value: number;
};

export type ProjectsStatsType = {
    overYear: ProjectsOverYearType[];
    yearToDate: number;
};

const calculateYearToDataStats = (
    dateArray: Record<string, any>[]
): ProjectsStatsType => {
    const initialStats: ProjectsStatsType = {
        overYear: [],
        yearToDate: 0,
    };

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentYearMonthCounts = new Array(12).fill(0);
    const lastYearMonthCounts = new Array(12).fill(0);

    dateArray.forEach((dateObj) => {
        const projectDate = new Date(dateObj.createdAt);
        const projectYear = projectDate.getFullYear();
        const projectMonth = projectDate.getMonth();
        const monthsAgoProject =
            (currentYear - projectYear) * 12 + (currentMonth - projectMonth);

        if (monthsAgoProject >= 0 && monthsAgoProject < 12) {
            currentYearMonthCounts[11 - monthsAgoProject] += 1;
        } else if (monthsAgoProject >= 12 && monthsAgoProject < 24) {
            lastYearMonthCounts[23 - monthsAgoProject] += 1;
        }
    });

    const updatedStats = { ...initialStats };
    updatedStats.overYear = currentYearMonthCounts.map((count, index) => ({
        name: monthNames[index],
        value: count,
    }));

    const currentYearSum = currentYearMonthCounts.reduce(
        (sum, count) => sum + count,
        0
    );
    const lastYearSum = lastYearMonthCounts.reduce(
        (sum, count) => sum + count,
        0
    );

    updatedStats.yearToDate = parseFloat(
        (
            ((currentYearSum - lastYearSum) /
                Math.max(Math.abs(lastYearSum), 1)) *
            100
        ).toFixed(1)
    );

    return updatedStats;
};

export default calculateYearToDataStats;
