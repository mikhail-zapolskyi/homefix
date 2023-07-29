import { GridLoader } from "react-spinners";

const Loader = () => {
    return (
        <GridLoader
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
