import { useEffect, useState } from "react";

interface Props {
    activeUserId: string | false | null | undefined;
    data: Record<string, any> | undefined;
}

interface ContactStatus {
    inContact: boolean;
    inContactRequest: boolean;
    connected: string;
    sent: string;
    default: string;
}

const useContactStatus = ({ activeUserId, data }: Props): ContactStatus => {
    const [contactStatus, setContactStatus] = useState<ContactStatus>({
        inContact: false,
        inContactRequest: false,
        connected: "Connected",
        sent: "Request Sent",
        default: "Send Request",
    });

    useEffect(() => {
        if (data && data.contacts && data.contact_requests) {
            const inContact = data.contacts.some(
                (contact: Record<string, any>) =>
                    contact.userId === activeUserId
            );

            const inContactRequest = data.contact_requests.some(
                (contactRequest: Record<string, any>) =>
                    contactRequest.userId === activeUserId
            );

            setContactStatus({ ...contactStatus, inContact, inContactRequest });
        }
    }, [data, activeUserId]);

    return contactStatus;
};
export default useContactStatus;
