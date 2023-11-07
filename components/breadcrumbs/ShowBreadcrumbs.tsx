import { Breadcrumbs, Link, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import _ from "lodash";

const ShowBreadcrumbs = () => {
    const breadcrumbs = usePathname().split("/");

    return (
        <Breadcrumbs>
            {breadcrumbs.map((obj, index, arr) => {
                const lastItem = _.findLastIndex(arr);
                return (
                    <Link
                        key={obj}
                        color="primary.dark"
                        href={`${lastItem && "/" + obj}`}
                    >
                        <Typography variant="body2">
                            {_.capitalize(obj.replace("-", " "))}
                        </Typography>
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default ShowBreadcrumbs;
