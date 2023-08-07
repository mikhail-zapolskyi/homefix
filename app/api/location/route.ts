import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

interface IData {
    countries?: String;
    states?: String;
    cities?: String;
}

interface ParamsObject {
    [key: string]: string;
}

const getLocation = async (req: NextRequest) => {
    const locations: IData = {};
    const { searchParams } = new URL(req.url);
    const paramsObject: ParamsObject = {};

    for (const [key, value] of Array.from(searchParams.entries())) {
        paramsObject[key] = value;
    }
    console.log(paramsObject);
    const locationDir = path.join(process.cwd(), "assets/locations");

    try {
        const countries = JSON.parse(
            await fs.readFile(`${locationDir}/countries.json`, "utf-8")
        );
        locations.countries = countries.map(
            (country: { name: string }) => country.name
        );

        if (paramsObject.country) {
            const states = JSON.parse(
                await fs.readFile(`${locationDir}/states.json`, "utf-8")
            );

            const filterStates = states.filter(
                (state: { country_name: string }) =>
                    state.country_name === paramsObject.country
            );
            locations.states = filterStates.map(
                (i: { name: string }) => i.name
            );

            if (paramsObject.state) {
                const cities = JSON.parse(
                    await fs.readFile(`${locationDir}/cities.json`, "utf-8")
                );
                const filterCities = cities.filter(
                    (city: { state_name: string }) =>
                        city.state_name === paramsObject.state
                );
                locations.cities = filterCities.map(
                    (i: { name: string }) => i.name
                );
            }
        }
    } catch (error) {
        console.error(error);
    }

    return NextResponse.json(locations);
};

export { getLocation as GET };
