const calculateAverage = (total: number, sum: number) => {
    const average = total > 0 ? sum / total : sum;
    return parseFloat(average.toFixed(1));
};

export default calculateAverage;
