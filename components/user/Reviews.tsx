import { Card, CardContent } from "@mui/material";
import Image from "next/image";
import ProfilePic from "@/public/test.jpg";

const Reviews = () => {
    return (
        <section className="flex-center margin-bottom">
            <Card sx={{ width: 700 }} className="card">
                <CardContent>
                    <div className="flex-start gap">
                        <div>
                            <Image
                                className="rounded-box image-center"
                                src={ProfilePic}
                                width={55}
                                height={55}
                                alt="service picture"
                            />
                        </div>
                        <div>
                            <p>serviceCategory</p>
                            <p>rating</p>
                        </div>
                        <div>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Sunt corrupti soluta nulla
                                voluptatibus labore accusamus magni eos incidunt
                                assumenda id quisquam aliquam animi minima
                            </p>
                        </div>
                    </div>
                    <div className="flex-start gap">
                        <div>
                            <Image
                                className="rounded-box image-center"
                                src={ProfilePic}
                                width={55}
                                height={55}
                                alt="profile picture"
                            />
                        </div>
                        <div>
                            <p>serviceCategory</p>
                            <p>rating</p>
                        </div>
                        <div>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Sunt corrupti soluta nulla
                                voluptatibus labore accusamus magni eos incidunt
                                assumenda id quisquam aliquam animi minima
                            </p>
                        </div>
                    </div>
                    <div className="flex-start gap">
                        <div>
                            <Image
                                className="rounded-box image-center"
                                src={ProfilePic}
                                width={55}
                                height={55}
                                alt="profile picture"
                            />
                        </div>
                        <div>
                            <p>serviceCategory</p>
                            <p>rating</p>
                        </div>
                        <div>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Sunt corrupti soluta nulla
                                voluptatibus labore accusamus magni eos incidunt
                                assumenda id quisquam aliquam animi minima
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

export default Reviews;
