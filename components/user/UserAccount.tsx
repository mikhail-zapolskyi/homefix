import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import "./styles.css";
import Image from "next/image";
import ProfilePic from "../../public/test.jpg";

const UserAccount = () => {
    return (
        <Card sx={{ minWidth: 275, maxWidth: 1600 }} className="wrapper">
            <CardContent>
                <section className="flex-between margin-bottom">
                    <div className="flex-between gap">
                        <div>
                            <Image
                                className="rounded"
                                src={ProfilePic}
                                width={90}
                                height={90}
                                alt="profile picture"
                            />
                        </div>
                        <div>
                            <p>name</p>
                            <Button size="small">Upload Photo</Button>
                        </div>
                    </div>
                    <div>
                        <Button size="small">Message</Button>
                        <Button size="small">Save</Button>
                    </div>
                </section>

                <section>
                    <div className="flex-start gap">
                        <input type="tel" placeholder="your phone number" />
                        <input type="email" placeholder="Your email" />
                    </div>
                    <div className="flex-start gap">
                        <input type="text" placeholder="Address" />
                        <input type="text" placeholder="City" />
                    </div>
                    <div className="flex-start gap">
                        <input type="text" placeholder="Postal code" />
                        <input type="text" placeholder="Country" />
                    </div>
                    <div>
                        <input type="password" placeholder="password" />
                    </div>
                </section>
            </CardContent>
        </Card>
    );
};

export default UserAccount;
