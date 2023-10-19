"use client"
import { Stack, Typography, Avatar, Card, CardHeader, IconButton, CardMedia, CardContent } from "@mui/material";
import { MoreVert } from '@mui/icons-material';
import { useRouter } from "next/navigation";
import {FaLongArrowAltRight} from 'react-icons/fa'

interface Props {
    data: Record<string, any>;
}

const CarouselPostItem: React.FC<Props> = ({ data }) => {
    const router = useRouter()
    const handleOnClick = (id: string) => {
        router.push(`service/posts/${id}`)
    }
    return (
        <Card
            // onClick={() => handleOnClick(data.id)}
            sx={{ cursor: 'pointer'}}
        >
            {/* CardHeader for desktop/tablet view */}
            <CardHeader
                sx={{display: {xs: 'none', md: 'flex'}}}
                title={data.businessName}
                titleTypographyProps={{variant: 'body1'}}
                
                subheader={data.date}
                subheaderTypographyProps={{variant: 'body2'}}

                avatar={
                    <Avatar 
                        sx={{mx: '1rem'}}
                    />
                }

            />
            <CardMedia sx={{
                width: 'fill',
                borderRadius: "0.8rem",
            }}>
                <Avatar
                    // src={data.image}
                    alt={data.businessName}
                    sx={{
                        width: '100%',
                        height: 'auto',
                    }}
                    variant="square"
                />
            </CardMedia>
            <CardContent>
                <Typography variant="h6">Blog Post Title</Typography>
                <Typography variant="body1">
                    {
                        "Small snippet of post should be shown here"
                    }
                </Typography>
            </CardContent>
            <CardHeader
                sx={{display: {xs: 'flex', md: 'none'}}}
                title={data.businessName}
                titleTypographyProps={{variant: 'body1'}}
                
                subheader={data.date}
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
