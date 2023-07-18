import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "../../../lib/prisma/prisma";

const getServiceProfile = async (req: NextRequest) => {
  const searchParams = new URLSearchParams(req.nextUrl.searchParams);
  const name = searchParams.get("name");
  const city = searchParams.get("city");
  const country = searchParams.get("country");
  const postalCode = searchParams.get("postalCode");
  const rating = searchParams.get("rating");
  const address = searchParams.get("address");
  const phone = searchParams.get("phone");

  // Check if any search parameter is provided
  if (!searchParams.entries().next().value) {
    return NextResponse.json(
      { errorMessage: "invalid input provided" },
      { status: 400 }
    );
  }

  let query = {};
  if (city || country || rating || postalCode || address || phone || name) {
    query = {
      OR: [
        {
          name: {
            contains: name || undefined,
            mode: "insensitive",
          },
        },
        {
          city: {
            contains: city || undefined,
            mode: "insensitive",
          },
        },
        {
          postalCode: {
            contains: postalCode || undefined,
            mode: "insensitive",
          },
        },
        {
          address: {
            contains: address || undefined,
            mode: "insensitive",
          },
        },
        {
          country: {
            contains: country || undefined,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: phone || undefined,
            mode: "insensitive",
          },
        },
        { rating: Number(rating) || undefined },
      ],
    };
  }

  const serviceProfiles = await prisma?.serviceProfile.findMany({
    where: query,
  });
  console.log(query);

  return NextResponse.json(serviceProfiles);
};

const createServiceProfile = async (req: NextRequest) => {
  const data = await req.json();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  data.userId = session?.user.id;

  try {
    const serviceProfiles = await prisma.serviceProfile.create({
      data,
    });
    return NextResponse.json(serviceProfiles);
  } catch (error) {
    console.error(error);
  }
};

export { getServiceProfile as GET, createServiceProfile as POST };
