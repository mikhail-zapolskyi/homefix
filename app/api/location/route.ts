import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { getLocations, getSearchParams } from "@/utils";

const getLocation = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const params = getSearchParams(searchParams);

    console.log(params);
    const locationDir = path.join(process.cwd(), "assets/locations");
    const locations = await getLocations(locationDir, params);

    return NextResponse.json(locations);
};

export { getLocation as GET };
