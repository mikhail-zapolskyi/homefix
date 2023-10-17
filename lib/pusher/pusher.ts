import PusherServer from "pusher";
import PusherClient from "pusher-js";

const pusher = () => {
    if (
        !process.env.PUSHER_APP_ID ||
        !process.env.PUSHER_KEY ||
        !process.env.PUSHER_SECRET ||
        !process.env.PUSHER_CLUSTER
    ) {
        console.error(
            "Missing Pusher environment variables. Please ensure PUSHER_APP_ID, PUSHER_KEY, and PUSHER_SECRET, PUSHER_CLUSTER are set."
        );

        return null;
    }

    const Server = new PusherServer({
        appId: process.env.PUSHER_APP_ID,
        key: process.env.PUSHER_KEY,
        secret: process.env.PUSHER_KEY,
        cluster: process.env.PUSHER_CLUSTER,
        useTLS: true,
    });

    const Client = new PusherClient(process.env.PUSHER_KEY, {
        cluster: process.env.PUSHER_CLUSTER,
    });

    return { Server, Client };
};

export default pusher;
