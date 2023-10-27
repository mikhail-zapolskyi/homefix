import React from "react";

const Page = ({ params }: { params: { projectId: string } }) => {
    const { projectId } = params;
    return <div>page {projectId}</div>;
};

export default Page;
