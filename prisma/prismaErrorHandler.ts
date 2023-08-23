import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

const handlePrismaError = (error: Error | unknown) => {
    if (error instanceof PrismaClientKnownRequestError) {
        const errorMessage = getPrismaErrorMessage(error);
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    } else {
        return NextResponse.json({ error: error }, { status: 500 });
    }
};

const getPrismaErrorMessage = (error: PrismaClientKnownRequestError) => {
    switch (error.code) {
        case "P1000":
            return "Authentication failed against the database server. Please check your credentials.";
        case "P1001":
            return "Cannot reach the database server. Ensure it is running at the specified host and port.";
        case "P1002":
            return "The database server was reached but timed out. Please try again.";
        // Add more error code cases as needed.

        case "P2000":
            return "The provided value for the column is too long for the column's type.";
        case "P2001":
            return "The record searched for in the where condition does not exist.";
        case "P2002":
            return "Unique constraint failed on the specified constraint.";
        // Add more error code cases as needed.
        case "P2023":
            return "Incorrect object ID";
        // Handle other Prisma Client error codes here...

        default:
            return "An error occurred with Prisma Client.";
    }
};

export default handlePrismaError;
