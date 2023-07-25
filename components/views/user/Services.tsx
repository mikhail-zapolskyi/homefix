import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import "./styles.css";
import Image from "next/image";
import ProfilePic from "@/public/test.jpg";

const Services = () => {
    return (
        <section className="flex">
            <div>
                <Card sx={{ width: 400 }} className="card">
                    <CardContent>
                        <div className="flex-start gap">
                            <div>
                                <Image
                                    className="rounded image-center"
                                    src={ProfilePic}
                                    width={55}
                                    height={55}
                                    alt="profile picture"
                                />
                            </div>
                            <div>
                                <p>name</p>
                                <p>email@email.com</p>
                            </div>
                        </div>
                        <div className="flex-start gap">
                            <div>
                                <Image
                                    className="rounded image-center"
                                    src={ProfilePic}
                                    width={55}
                                    height={55}
                                    alt="profile picture"
                                />
                            </div>
                            <div>
                                <p>name</p>
                                <p>email@email.com</p>
                            </div>
                        </div>
                        <div className="flex-start gap">
                            <div>
                                <Image
                                    className="rounded image-center"
                                    src={ProfilePic}
                                    width={55}
                                    height={55}
                                    alt="profile picture"
                                />
                            </div>
                            <div>
                                <p>name</p>
                                <p>email@email.com</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div>
                <Card sx={{ width: 1090 }} className="card">
                    <CardContent>
                        <div className="flex-start gap">
                            <div>
                                <Image
                                    className="rounded image-center"
                                    src={ProfilePic}
                                    width={55}
                                    height={55}
                                    alt="profile picture"
                                />
                            </div>
                            <div>
                                <p>name</p>
                                <p>email@email.com</p>
                            </div>
                        </div>

                        <div>
                            <p>Service id</p>
                            <p>Service category</p>
                            <p>Service name</p>
                            <p>Service description</p>
                            <p>Service price</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default Services;
