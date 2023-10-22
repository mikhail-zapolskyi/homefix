/**
 * Converts a File or Blob object within a FormData object to a base64-encoded string.
 *
 * @param {FormData} data - The FormData object containing the file to be converted.
 * @returns {Promise<string|null>} - A promise that resolves to a data URI string in the format "data:[MIME_TYPE];base64,[BASE64_DATA]" or null if the file is not found in the FormData.
 */
export const to_base_sixty_four = async (data: FormData) => {
    if (data.has("file")) {
        const file = data.get("file") as Blob;

        // Read the file data as a Buffer
        const fileBuffer = await file.arrayBuffer();

        // Convert the Buffer to a base64-encoded string
        const base64String = Buffer.from(fileBuffer).toString("base64");

        return `data:${file.type};base64,${base64String}`;
    } else {
        return null;
    }
};
