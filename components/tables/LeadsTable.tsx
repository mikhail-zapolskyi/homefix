import React, { FC, useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
    Checkbox,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import {
    CheckCircle,
    CircleSlash,
    ClipboardCheck,
    DraftingCompass,
    Hand,
    Hourglass,
    Trash2,
    User2,
} from "lucide-react";
import { Project } from "@prisma/client";
import { FullProjectType, StatusCount, StatusCountsArray } from "@/app/types";
import moment from "moment";
import _ from "lodash";
import {
    CustomDashboardCard,
    IconButtonWithMenu,
    ThemeMenuItem,
    TotalButton,
} from "@/components";
import defineColorByStatus from "@/utils/helpers/defineColorByStatus";

// Define the prop types for ProjectsTable
type Props = {
    count: StatusCountsArray;
    projects: FullProjectType[];
    onProceedToProject?: (projectId: string) => void;
    onProceedToUserProfile?: () => void;
    onDelete?: (projectId: string) => void;
    onBundleDelete?: (projectIds: string[]) => void;
    onExpressInterest?: (porjectId: string) => void;
    onInprogress?: (porjectId: string) => void;
    onComplete?: (porjectId: string) => void;
};

const LeadsTable: FC<Props> = ({
    count,
    projects,
    onProceedToProject,
    onDelete,
    onBundleDelete,
    onExpressInterest,
    onInprogress,
    onComplete,
    onProceedToUserProfile,
}) => {
    // Theme Defaults
    const theme = useTheme();
    // This state need to filter projects
    const [projectsArr, setProjectsArr] = useState<Project[]>(projects);
    // Track Active Check Boxes
    const [projectIds, setProjectIds] = useState<string[]>([]);
    // Track Active Total Buttons
    const [activeButton, setActiveButton] = useState<string | null>(null);
    // Pages Count
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    // Default Icon Sizes
    const iconSize = 18;

    useEffect(() => {
        setProjectsArr(projects);
    }, [projects, setProjectsArr]);

    // Handle page change in pagination
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    // Handle rows per page change in pagination
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Filter projects by status
    const filterByStatus = (status: string) => {
        if (status === "ALL") {
            return setProjectsArr(projects);
        }

        return setProjectsArr(() =>
            projects.filter((obj: Project) => obj.status === status)
        );
    };

    // Handle Filter Buttons
    const handleButtonClick = (title: string) => {
        setActiveButton((prev) => (prev === title ? null : title));
    };

    // Handle select/deselect all projects
    const handleSelectAll = () => {
        if (_.size(projectIds) === _.size(projects)) {
            setProjectIds([]);
        } else {
            setProjectIds(_.map(projects, "id"));
        }
    };

    return (
        <CustomDashboardCard padding="none">
            {/* Total Buttons Section */}
            <Stack
                direction="row"
                spacing={3}
                minWidth={320}
                padding="1rem"
                alignItems="center"
                sx={{
                    overflowX: "scroll",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                {count.map((obj: StatusCount, index) => {
                    let [value] = Object.values(obj);
                    const [key] = Object.keys(obj);

                    return (
                        <TotalButton
                            key={index}
                            isActive={activeButton === key}
                            title={_.capitalize(key).replace("_", " ")}
                            number={value}
                            color={defineColorByStatus(key)}
                            onClick={() => {
                                filterByStatus(key);
                                handleButtonClick(key);
                            }}
                        />
                    );
                })}
            </Stack>

            {/* Projects Table Section */}
            <TableContainer
                sx={{
                    overflowX: "scroll",
                    "&::-webkit-scrollbar": {
                        md: {
                            display: "none",
                        },
                    },
                }}
            >
                <Table size="small" padding="none" sx={{ minWidth: 900 }}>
                    {/* Table Head */}
                    <TableHead>
                        {/* Table Header Row */}
                        <TableRow
                            sx={{
                                bgcolor: `${
                                    !_.isEmpty(projectIds)
                                        ? theme.palette.primary.lighter
                                        : theme.palette.grey[200]
                                }`,
                            }}
                        >
                            {/* Select/Deselect All Checkbox */}
                            <TableCell>
                                <Checkbox
                                    checked={
                                        !_.isEmpty(projectIds) &&
                                        _.size(projectIds) === _.size(projects)
                                    }
                                    indeterminate={
                                        !_.isEmpty(projectIds) &&
                                        _.size(projectIds) !== _.size(projects)
                                    }
                                    onChange={handleSelectAll}
                                />
                            </TableCell>

                            {/* Project ID Column */}
                            <TableCell>
                                <Typography variant="body2">
                                    {!_.isEmpty(projectIds)
                                        ? `${`${_.size(projectIds)} selected`}`
                                        : "ID"}
                                </Typography>
                            </TableCell>

                            {/* Project Title Column */}
                            <TableCell>
                                <Typography variant="body2">
                                    {_.isEmpty(projectIds) && "Title"}
                                </Typography>
                            </TableCell>

                            {/* Project Date Column */}
                            <TableCell>
                                <Typography variant="body2">
                                    {_.isEmpty(projectIds) && "Date"}
                                </Typography>
                            </TableCell>

                            {/* Interested Column */}
                            <TableCell>
                                <Typography variant="body2">
                                    {_.isEmpty(projectIds) && "Interested"}
                                </Typography>
                            </TableCell>

                            {/* Approved Column */}
                            <TableCell>
                                <Typography variant="body2">
                                    {_.isEmpty(projectIds) && "Approved"}
                                </Typography>
                            </TableCell>

                            {/* Budget Column */}
                            <TableCell>
                                <Typography variant="body2">
                                    {_.isEmpty(projectIds) && "Budget"}
                                </Typography>
                            </TableCell>

                            {/* Status Column */}
                            <TableCell>
                                <Typography variant="body2">
                                    {_.isEmpty(projectIds) && "Status"}
                                </Typography>
                            </TableCell>

                            {/* Action Column */}

                            <TableCell align="center">
                                <Typography variant="body2">
                                    {/* Verify projectIds not empty and onBundleDelete function present */}
                                    {!_.isEmpty(projectIds) &&
                                    onBundleDelete ? (
                                        <Tooltip title="Delete Selected">
                                            <IconButton
                                                onClick={() => {
                                                    onBundleDelete(projectIds);
                                                    setProjectIds([]);
                                                }}
                                            >
                                                <Trash2
                                                    color={`${theme.palette.primary.dark}`}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    ) : (
                                        "Action"
                                    )}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    {/* Table Body */}
                    <TableBody sx={{ padding: ".4rem" }}>
                        {projectsArr
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((obj: FullProjectType) => {
                                return (
                                    <TableRow
                                        key={obj.id}
                                        sx={{
                                            "&:hover": {
                                                bgcolor: `${theme.palette.grey[200]}`,
                                            },
                                        }}
                                    >
                                        {/* Checkbox for individual project */}
                                        <TableCell>
                                            <Checkbox
                                                checked={_.includes(
                                                    projectIds,
                                                    obj.id
                                                )}
                                                onChange={() =>
                                                    setProjectIds(
                                                        _.includes(
                                                            projectIds,
                                                            obj.id
                                                        )
                                                            ? _.remove(
                                                                  [
                                                                      ...projectIds,
                                                                  ],
                                                                  (id) =>
                                                                      id !==
                                                                      obj.id
                                                              )
                                                            : [
                                                                  ...projectIds,
                                                                  obj.id,
                                                              ]
                                                    )
                                                }
                                            />
                                        </TableCell>

                                        {/* Project ID */}
                                        <TableCell>
                                            #{obj.id.slice(-4)}
                                        </TableCell>

                                        {/* Project Title */}
                                        {/* Handle individual project proceed action */}
                                        {onProceedToProject && (
                                            <TableCell
                                                onClick={() =>
                                                    onProceedToProject(obj.id)
                                                }
                                                sx={{
                                                    "&:hover": {
                                                        cursor: "pointer",
                                                    },
                                                }}
                                            >
                                                <Tooltip title="Proceed to project">
                                                    <Typography variant="body2">
                                                        {obj.title}
                                                    </Typography>
                                                </Tooltip>
                                            </TableCell>
                                        )}

                                        {/* Project Date */}
                                        <TableCell padding="none">
                                            {moment(obj.createdAt).format("ll")}
                                        </TableCell>

                                        {/* Interested */}
                                        <TableCell padding="none">
                                            {obj.interested?.length}
                                        </TableCell>

                                        {/* Approved */}
                                        <TableCell padding="none">
                                            {obj.approved?.length ? (
                                                <CheckCircle
                                                    color={`${theme.palette.primary.main}`}
                                                />
                                            ) : (
                                                <CircleSlash />
                                            )}
                                        </TableCell>

                                        {/* Budget */}
                                        <TableCell padding="none">
                                            ${obj.budget}
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell padding="none">
                                            <Typography
                                                variant="body2"
                                                color={defineColorByStatus(
                                                    obj.status
                                                )}
                                            >
                                                {_.capitalize(
                                                    obj.status
                                                ).replace("_", " ")}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButtonWithMenu>
                                                {/* Handle individual project proceed action to Project dashboard page*/}
                                                {onProceedToProject && (
                                                    <ThemeMenuItem
                                                        title="Project"
                                                        color={`${theme.palette.info.dark}`}
                                                        icon={
                                                            <DraftingCompass
                                                                size={iconSize}
                                                                color={`${theme.palette.info.dark}`}
                                                            />
                                                        }
                                                        onClick={() => {
                                                            onProceedToProject(
                                                                obj.id
                                                            );
                                                        }}
                                                    />
                                                )}
                                                {/* Handle individual project proceed action to User profile page*/}
                                                {onProceedToUserProfile && (
                                                    <ThemeMenuItem
                                                        title="User Profile"
                                                        color={`${theme.palette.info.main}`}
                                                        icon={
                                                            <User2
                                                                size={iconSize}
                                                                color={`${theme.palette.info.main}`}
                                                            />
                                                        }
                                                        onClick={() => {
                                                            onProceedToUserProfile();
                                                        }}
                                                    />
                                                )}
                                                {/* Handle individual project action to Express Interest in Project*/}
                                                {onExpressInterest &&
                                                    obj.status ===
                                                        "INITIATED" && (
                                                        <ThemeMenuItem
                                                            title="Express Interest"
                                                            color={`${theme.palette.primary.main}`}
                                                            icon={
                                                                <Hand
                                                                    size={
                                                                        iconSize
                                                                    }
                                                                    color={`${theme.palette.primary.main}`}
                                                                />
                                                            }
                                                            onClick={() => {
                                                                onExpressInterest(
                                                                    obj.id
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                {/* Handle individual project action to Set Project to in progress */}
                                                {onInprogress &&
                                                    obj.status ===
                                                        "APPROVED" && (
                                                        <ThemeMenuItem
                                                            title="Set In progress"
                                                            color={`${theme.palette.warning.main}`}
                                                            icon={
                                                                <Hourglass
                                                                    size={
                                                                        iconSize
                                                                    }
                                                                    color={`${theme.palette.warning.main}`}
                                                                />
                                                            }
                                                            onClick={() => {
                                                                onInprogress(
                                                                    obj.id
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                {/* Handle individual project action to Complete Project */}
                                                {onComplete &&
                                                    obj.status ===
                                                        "IN_PROGRESS" && (
                                                        <ThemeMenuItem
                                                            title="Complete"
                                                            color={`${theme.palette.primary.light}`}
                                                            icon={
                                                                <ClipboardCheck
                                                                    size={
                                                                        iconSize
                                                                    }
                                                                    color={`${theme.palette.primary.light}`}
                                                                />
                                                            }
                                                            onClick={() => {
                                                                onComplete(
                                                                    obj.id
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                {/* Handle individual project action to disconnect an account from project */}
                                                {onDelete && (
                                                    <ThemeMenuItem
                                                        title="Delete Lead"
                                                        icon={
                                                            <Trash2
                                                                size={iconSize}
                                                                color={`${theme.palette.error.main}`}
                                                            />
                                                        }
                                                        color={`${theme.palette.error.main}`}
                                                        onClick={() => {
                                                            onDelete(obj.id);
                                                        }}
                                                    />
                                                )}
                                            </IconButtonWithMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Table Pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={projectsArr.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </CustomDashboardCard>
    );
};

export default LeadsTable;
