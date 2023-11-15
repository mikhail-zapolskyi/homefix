"use client";

import { Grid, ListItem, ListItemText } from "@mui/material";
import { FC } from "react";
import ReviewListCard from "../cards/ReviewListCard";
import { ReviewWithUserAndServiceProfile } from "@/app/types";
import SectionWithTitle from "../container/SectionWithTitle";

type Props = {
    review: ReviewWithUserAndServiceProfile[];
};

const UserReviewsView: FC<Props> = ({ ...props }) => {
    const renderEmptyListItem = (
        <ListItem alignItems="flex-start">
            <ListItemText primary={`Reviewers list empty`} />
        </ListItem>
    );

    const renderConversationList =
        props.review.length > 0
            ? props.review.map((obj: ReviewWithUserAndServiceProfile) => (
                  <ReviewListCard key={obj.id} {...obj} />
              ))
            : renderEmptyListItem;

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} xl={6} justifyContent="center">
                <SectionWithTitle title={`Reviews`}>
                    <Grid container spacing={1}>
                        {renderConversationList}
                    </Grid>
                </SectionWithTitle>
            </Grid>
        </Grid>
    );
};

export default UserReviewsView;
