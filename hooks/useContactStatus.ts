import { useEffect, useState } from "react";

interface Props {
    currentUser: string | false | null | undefined;
    serviceProfileUser: Record<string, any> | undefined;
}

interface ContactStatus {
    status: string;
    default: string;
}

const useContactStatus = ({
    currentUser,
    serviceProfileUser,
}: Props): ContactStatus => {
    const [contactStatus, setContactStatus] = useState<ContactStatus>({
        status: "",
        default: "Send Request",
    });

    useEffect(() => {
        if (serviceProfileUser && serviceProfileUser.contact) {
            const requestStatusObject = serviceProfileUser.contact.find(
                (obj: Record<string, any>) => obj.userId.includes(currentUser)
            );

            if (requestStatusObject) {
                setContactStatus({
                    ...contactStatus,
                    status: requestStatusObject.contactRequest[0]
                        .request_status,
                });
            }
        }
    }, [serviceProfileUser, currentUser]);

    return contactStatus;
};
export default useContactStatus;
