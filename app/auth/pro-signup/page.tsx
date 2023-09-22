"use client";

import { ViewProSignUp } from "@/components";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function SignUp() {
    const { data: session, status } = useSession();

    const [formData, setFormData] = useState<Form>({ type: "PRO" });
    const [locationParams, setLocationParams] = useState("");
    const {
        data: location,
        error,
        isLoading,
    } = useSWR(`/api/location${locationParams}`, fetcher);

    if (session && status === "authenticated") {
        redirect("/");
    }

    if (error) {
        redirect("/auth/pro-signup");
    }

    useEffect(() => {
        setLocationParams(
            `?country=${formData?.country}&state=${formData?.state}`
        );
    }, [formData?.country, formData?.state]);

    return <ViewProSignUp />;
}
