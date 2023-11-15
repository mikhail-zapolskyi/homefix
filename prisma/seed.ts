import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import bcrypt from "bcrypt";

interface IPassword {
    hash(password: string): string;
    validate(password: string, comparePassword: string): Promise<boolean>;
}

const Password: IPassword = {
    hash: (password: string) => {
        const salt = bcrypt.genSaltSync(10);

        const hash = bcrypt.hashSync(password, salt);
        return hash;
    },
    validate: async (password: string, comparePassword: string) => {
        const isValid = await bcrypt.compare(password, comparePassword);

        if (!isValid) {
            return false;
        }

        return true;
    },
};

import { UserType } from "@prisma/client";

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
    {
        name: "Random User1",
        password: "123",
        type: "USER",
        email: "user1@example.com",
    },
    {
        name: "Random Pro1",
        password: "123",
        type: "PRO",
        email: "pro1@example.com",
    },
    {
        name: "Random User2",
        password: "123",
        type: "USER",
        email: "user2@example.com",
    },
    {
        name: "Random Pro2",
        password: "123",
        type: "PRO",
        email: "pro2@example.com",
    },
    {
        name: "Random User3",
        password: "123",
        type: "USER",
        email: "user3@example.com",
    },
    {
        name: "Random Pro3",
        password: "123",
        type: "PRO",
        email: "pro3@example.com",
    },
    {
        name: "Random User4",
        password: "123",
        type: "USER",
        email: "user4@example.com",
    },
    {
        name: "Random Pro4",
        password: "123",
        type: "PRO",
        email: "pro4@example.com",
    },
    {
        name: "Random User5",
        password: "123",
        type: "USER",
        email: "user5@example.com",
    },
    {
        name: "Random Pro5",
        password: "123",
        type: "PRO",
        email: "pro5@example.com",
    },
];

async function main() {
    for (const data of seedData) {
        const hashedPassword = Password.hash(data.password);
        data.password = hashedPassword;

        let serviceQuery = {};

        if (data.type === "PRO") {
            serviceQuery = {
                create: {},
            };
        }

        await prisma?.user.create({
            data: {
                name: data.name,
                email: data.email,
                type: data.type as UserType,
                password: data.password,
                serviceProfile: serviceQuery,
            },
        });
    }
}

main()
    .then(async () => {
        await prisma?.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma?.$disconnect();
        process.exit(1);
    });
