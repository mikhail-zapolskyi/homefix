const to_base_sixty_four = async (data: FormData) => {
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

export default to_base_sixty_four;
