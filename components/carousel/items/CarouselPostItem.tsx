"use client"
import { Stack, Typography, Avatar, Card, CardHeader, IconButton, CardMedia, CardContent } from "@mui/material";
import { MoreVert } from '@mui/icons-material';
import { useRouter } from "next/navigation";

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
            sx={{ cursor: 'pointer', alignContent: 'start'}}
            elevation={4}
        >
            <CardHeader
                avatar={
                    <Avatar src={data.image}/>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                }
                title={data.businessName}
                subheader={data.date}
            />
            <CardMedia 
                component='img'
                src={data.image}
                sx={{maxHeight: '25rem'}}

            />
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
