import dynamic from "next/dynamic";

const GridLoaderClient = dynamic(() => import("react-spinners/GridLoader"), {
    ssr: false,
});

const Loader = () => {
    return (
        <GridLoaderClient
            size={10}
            cssOverride={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
        />
    );
};

export default Loader;
