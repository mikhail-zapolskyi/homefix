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
            onClick={() => handleOnClick(data.id)}
            sx={{ cursor: 'pointer'}}
            elevation={4}
        >
            <CardHeader
                sx={{display: {xs: 'none', md: 'flex'}}}
                avatar={
                    <Avatar 
                        sx={{mx: '1rem'}}
                    />
                }
                subheaderTypographyProps={{variant: 'body2'}}
                titleTypographyProps={{variant: 'body1'}}
                title={data.businessName}
                subheader={data.date}
                action={
                    <IconButton>
                        <FaLongArrowAltRight />
                    </IconButton>
                }
            />
            <CardMedia>
                <Avatar
                    src={data.image}
                    alt={data.businessName}
                    sx={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '30rem',
                        borderRadius: "0.8rem",
                    }}
                    variant="square"
                />
            </CardMedia>
            <CardContent>
                <Typography variant="body1">
                    {
                        "Small snippet of post should be shown here"
                    }
                </Typography>
            </CardContent>


        </Card>

    )
}

export default CarouselPostItem;
