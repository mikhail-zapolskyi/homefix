const specialtiesOfFixers = (specialties: any[]) => {
    // Map the specialties array to a string representation
    const specialtiesString = specialties.map((i) => {
        return i;
    }).join(', '); // Join the specialties with a comma (you can customize this delimiter)

    return specialtiesString;
}

export default specialtiesOfFixers