/**
 * Join an array of specialties into a comma-separated string.
 *
 * @param {string[]} specialties - An array of specialties to be joined.
 * @returns {string} - A comma-separated string of specialties.
 */
const joinArrayWithDelimiter = (specialties: string[]) =>
    specialties.join(", ");
export default joinArrayWithDelimiter;
