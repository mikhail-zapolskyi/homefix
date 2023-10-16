import prisma from "@/prisma/client";
import { Password } from "@/utils";
import { UserType } from "@prisma/client";
import { NextResponse } from "next/server";

const seedData = [
    {
        name: "John Doe",
        password: "123",
        type: "PRO",
        email: "john.doe@example.com",
    },
    {
        name: "Jane Smith",
        password: "123",
        type: "USER",
        email: "jane.smith@example.com",
    },
    {
        name: "Alice Johnson",
        password: "123",
        type: "PRO",
        email: "alice.johnson@example.com",
    },
    {
        name: "Bob Brown",
        password: "123",
        type: "USER",
        email: "bob.brown@example.com",
    },
    {
        name: "Emily Davis",
        password: "123",
        type: "PRO",
        email: "emily.davis@example.com",
    },
    {
        name: "David Wilson",
        password: "123",
        type: "USER",
        email: "david.wilson@example.com",
    },
    {
        name: "Sarah Lee",
        password: "123",
        type: "PRO",
        email: "sarah.lee@example.com",
    },
    {
        name: "Michael Taylor",
        password: "123",
        type: "USER",
        email: "michael.taylor@example.com",
    },
    {
        name: "Olivia Clark",
        password: "123",
        type: "PRO",
        email: "olivia.clark@example.com",
    },
    {
        name: "James White",
        password: "123",
        type: "USER",
        email: "james.white@example.com",
    },
];

export async function POST() {
    for (const data of seedData) {
        const hashedPassword = Password.hash(data.password);
        data.password = hashedPassword;

        let serviceQuery = {};

        if (data.type === "PRO") {
            serviceQuery = {
                create: {},
            };
        }

        await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                type: data.type as UserType,
                password: data.password,
                serviceProfile: serviceQuery,
            },
        });
    }

    return NextResponse.json("seeded");
}
