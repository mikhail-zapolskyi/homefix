import React from "react";

interface Props {
    data?: Record<string, any>;
}

const ViewProUserDashboard: React.FC<Props> = ({ data }) => {
    return <div>{data && JSON.stringify(data)}</div>;
};

export default ViewProUserDashboard;
