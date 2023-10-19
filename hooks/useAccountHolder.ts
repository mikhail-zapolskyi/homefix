import { useEffect, useState, FC } from "react";

interface Props {
    currentUser: string | false | null | undefined;
    serviceProfileUser: string | false | null | undefined;
}

interface ReturnState {
    state: true | false;
}

const useAccountHolder = ({
    currentUser,
    serviceProfileUser,
}: Props): ReturnState => {
    const [accountHolder, setAccountHolder] = useState<ReturnState>({
        state: false,
    });

    useEffect(() => {
        if (currentUser && serviceProfileUser) {
            if (currentUser === serviceProfileUser) {
                setAccountHolder({ state: true });
            }
        }
    }, [currentUser, serviceProfileUser]);

    return accountHolder;
};

export default useAccountHolder;
