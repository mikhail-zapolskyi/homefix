"use client"
// Carousel Post Item component. Made for the CustomCarousel component. 
// Takes in styling probs from the viewPage file. 
// Specifically made for a carousel item for blog posts. 
// It takes in data and populates the fields of the card according.

import { Stack, Typography, Avatar, Card, CardHeader, IconButton, CardMedia, CardContent } from "@mui/material";
import { MoreVert } from '@mui/icons-material';
import { useRouter } from "next/navigation";
import {FaLongArrowAltRight} from 'react-icons/fa'
import { FullPost } from "@/app/types";
import moment from "moment";

interface Props {
    data: FullPost;
}

const CarouselPostItem: React.FC<Props> = ({ data }) => {
    const router = useRouter()
    const handleOnClick = (id: string) => {
        router.push(`service/posts/${id}`)
    }
    return (
        <Card
            onClick={() => handleOnClick(data.id)}
            sx={{ cursor: 'pointer'}}
        >
            {/* CardHeader for desktop/tablet view */}
            <CardHeader
                sx={{display: {xs: 'none', md: 'flex'}}}
                title={data.title}
                titleTypographyProps={{variant: 'body1'}}
                
                subheader={moment(data.createdAt).format("LLL")}
                subheaderTypographyProps={{variant: 'body2'}}

                avatar={
                    <Avatar 
                        alt="user avatar"
                        src={data.serviceProfile.image || ''}
                        sx={{mx: '1rem'}}
                    />
                }

            />
            <CardMedia sx={{
                width: 'fill',
                borderRadius: "0.8rem",
            }}>
                <Avatar
                    src={data.image || ''}
                    sx={{
                        width: '100%',
                        height: 'auto',
                    }}
                    variant="square"
                />
            </CardMedia>
            <CardContent>
                <Typography variant="h6">{data.title}</Typography>
            </CardContent>
            <CardHeader
                sx={{display: {xs: 'flex', md: 'none'}}}
                title={data.serviceProfile.name}
                titleTypographyProps={{variant: 'body1'}}
                
                subheader={moment(data.createdAt).format("LLL")}
                subheaderTypographyProps={{variant: 'body2'}}
                avatar={
                    <Avatar 
                    />
                }

            />

        </Card>

    )
}

export default CarouselPostItem;
