import { ParamsObject } from "./getSearchParams";
import { promises as fs } from "fs";

interface LocationData {
    countries?: String | [];
    states?: String | [];
    cities?: String | [];
}

const getLocations = async (locationDir: string, params: ParamsObject) => {
    const locations: LocationData = {};

    try {
        const countries = JSON.parse(
            await fs.readFile(`${locationDir}/countries.json`, "utf-8")
        );

        locations.countries = countries.map((i: { name: string }) => i.name);

        if (params.country) {
            const states = JSON.parse(
                await fs.readFile(`${locationDir}/states.json`, "utf-8")
            );

            locations.states = states
                .filter(
                    (i: { country_name: string }) =>
                        i.country_name === params.country
                )
                .map((i: { name: string }) => i.name);

            if (params.state) {
                const cities = JSON.parse(
                    await fs.readFile(`${locationDir}/cities.json`, "utf-8")
                );

                locations.cities = cities
                    .filter(
                        (i: { state_name: string }) =>
                            i.state_name === params.state
                    )
                    .map((i: { name: string }) => i.name);
            } else {
                locations.cities = [];
            }
        }
    } catch (error) {
        console.error(error);
    }

    return locations;
};

export default getLocations;
