import { Breadcrumbs, Link, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import _ from "lodash";

const ShowBreadcrumbs = () => {
    const breadcrumbs = usePathname()
        .split("/")
        .filter((el) => el !== "");

    return (
        <Breadcrumbs>
            {breadcrumbs.map((obj, index, arr) => {
                const path = `/${arr.slice(0, index + 1).join("/")}`;

                return index !== arr.length - 1 ? (
                    <Link
                        key={obj}
                        href={path}
                        underline="none"
                        variant="body2"
                        color="primary.darker"
                        sx={{ "&:hover": { color: "primary.main" } }}
                    >
                        {_.capitalize(obj.replace(/-/g, " "))}
                    </Link>
                ) : (
                    <Typography key={obj} variant="body2" color="grey">
                        {_.capitalize(obj.replace(/-/g, " "))}
                    </Typography>
                );
            })}
        </Breadcrumbs>
    );
};

export default ShowBreadcrumbs;
