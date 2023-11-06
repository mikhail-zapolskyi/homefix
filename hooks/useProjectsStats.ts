import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
    data: Record<string, any>[];
}

type ProjectsOverYearType = {
    name: string;
    value: number;
};

export type ProjectsStatsType = {
    initiated: number;
    in_progress: number;
    completed: number;
    reviewed: number;
    totalProjects: number;
    projectsOverYear: ProjectsOverYearType[];
    yearProjectComparison: number;
};

const useProjectsStats = ({ data }: Props): ProjectsStatsType => {
    const initialStats: ProjectsStatsType = {
        initiated: 0,
        in_progress: 0,
        completed: 0,
        reviewed: 0,
        totalProjects: 0,
        projectsOverYear: [],
        yearProjectComparison: 0,
    };

    const [projectsStats, setProjectStats] =
        useState<ProjectsStatsType>(initialStats);

    const date = new Date(); // Current date
    const currentMonth = date.getMonth(); // Get current month
    const currentYear = date.getFullYear(); // Get current year
    const months = 12; // Calculate data for the past 12 months

    // Create an array of month names and project counts
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

    // Create an array to store project counts for each month
    const currentYearMonthCounts = new Array(12).fill(0);
    const lastYearMonthCounts = new Array(12).fill(0);
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;

            const updatedStats: ProjectsStatsType = { ...initialStats };
            data.forEach((obj: Record<string, any>) => {
                const projectDate = new Date(obj.createdAt);
                const projectYear = projectDate.getFullYear();
                const projectMonth = projectDate.getMonth();
                const monthsAgo =
                    (currentYear - projectYear) * months +
                    (currentMonth - projectMonth);

                // IF monthAgo NUMBER FROM 0 - 11 IT IS CURRENT YEAR 12-23 IT IS LAST YEAR
                if (monthsAgo >= 0 && monthsAgo < 12) {
                    currentYearMonthCounts[11 - monthsAgo] += 1;
                } else if (monthsAgo >= 12 && monthsAgo < 24) {
                    lastYearMonthCounts[23 - monthsAgo] += 1;
                }

                // UPDATE SINGLE TOTAL PROJECTS
                switch (obj.status) {
                    case "INITIATED":
                        updatedStats.initiated += 1;
                        break;
                    case "IN_PROGRESS":
                        updatedStats.in_progress += 1;
                        break;
                    case "COMPLETED":
                        updatedStats.completed += 1;
                        break;
                    case "REVIEWED":
                        updatedStats.reviewed += 1;
                        break;
                    default:
                        break;
                }
            });

            // UPDATE TOTAL PROJECTS
            updatedStats.totalProjects = data.length;

            // UPDATE PROJECTS OVER YEAR EVERY MONTH
            updatedStats.projectsOverYear = currentYearMonthCounts.map(
                (count, index) => ({
                    name: monthNames[index],
                    value: count,
                })
            );

            // GET TOTAL NUMBER OF PROJECTS CURRENT YEAR
            const currentYearSum = currentYearMonthCounts.reduce(
                (sum, count) => sum + count,
                0
            );

            // GET TOTAL NUMBER OF PROJECTS LAST YEAR
            const lastYearSum = lastYearMonthCounts.reduce(
                (sum, count) => sum + count,
                0
            );

            // CALCULATE PERCENTAGE BETWEEN CURRENT AND LAST YEARS
            updatedStats.yearProjectComparison = parseFloat(
                (
                    ((currentYearSum - lastYearSum) /
                        Math.max(Math.abs(lastYearSum), 1)) *
                    100
                ).toFixed(1)
            );
            console.log("i fire once");
            // SET ALL UPDATED VALUES
            setProjectStats({ ...updatedStats });
        }
    }, [data]);
    return projectsStats;
};

export default useProjectsStats;
