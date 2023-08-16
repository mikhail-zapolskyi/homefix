"use client";

import Link from "next/link";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
    return (
        <div>
            <h2>{error.message || "Something went wrong!"}</h2>
            <button onClick={() => reset()}>Try again</button>
            <Link href="/">Go back home</Link>
        </div>
    );
};

export default Error;
