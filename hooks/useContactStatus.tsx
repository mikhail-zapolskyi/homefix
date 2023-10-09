import { useEffect, useState } from "react";

interface Props {
    activeUserId: string | false | null | undefined;
    data: Record<string, any> | undefined;
}

interface ContactStatus {
    inContact: boolean;
    inContactRequest: boolean;
}

const useContactStatus = ({ activeUserId, data }: Props): ContactStatus => {
    const [contactStatus, setContactStatus] = useState<ContactStatus>({
        inContact: false,
        inContactRequest: false,
    });

    useEffect(() => {
        if (data && data.contacts && data.contact_requests) {
            const inContact = data.contacts.some(
                (contact: Record<string, any>) =>
                    contact.userId === activeUserId
            );
            console.log(data.contact_requests);
            const inContactRequest = data.contact_requests.some(
                (contactRequest: Record<string, any>) =>
                    contactRequest.userId === activeUserId
            );

            setContactStatus({ inContact, inContactRequest });
        }
    }, [data, activeUserId]);

    return contactStatus;
};
export default useContactStatus;
