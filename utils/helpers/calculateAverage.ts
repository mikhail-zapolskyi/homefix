/**
 * Calculates the average of a set of values.
 *
 * @param {number} total - The total number of values in the set.
 * @param {number} sum - The sum of all the values in the set.
 * @returns {number} - The calculated average, rounded to one decimal place.
 *
 * @example
 * const total = 5;
 * const sum = 25;
 * const average = calculateAverage(total, sum); // Returns 5.0
 */

const calculateAverage = (total: number, sum: number) => {
    const average = total > 0 ? sum / total : sum;
    return parseFloat(average.toFixed(1));
};

export default calculateAverage;
