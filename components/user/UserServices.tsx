import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import "./styles.css";
import Image from "next/image";
import ProfilePic from "../../public/test.jpg";

const UserServices = () => {
    return (
        <section className="flex">
            <div>
                <Card sx={{ width: 400 }} className="serviceCard">
                    <CardContent>
                        <section className=" margin-bottom">
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
                        </section>
                    </CardContent>
                </Card>
            </div>

            <div>
                <Card sx={{ width: 1090 }} className="serviceCard">
                    <CardContent>
                        <section className=" margin-bottom">
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

                            <div>Service id</div>
                        </section>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default UserServices;
