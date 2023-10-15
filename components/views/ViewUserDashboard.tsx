import React from "react";

interface Props {
    data?: Record<string, any>;
}

const ViewUserDashboard: React.FC<Props> = ({ data }) => {
    return <div>{data && JSON.stringify(data)}</div>;
};

export default ViewUserDashboard;
