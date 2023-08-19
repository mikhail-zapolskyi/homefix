import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    render,
} from "@react-email/components";
import * as React from "react";

interface Props {
    url?: string;
    urlText?: string;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

export const VerifyUser = ({ url, urlText }: Props) => (
    <Html>
        <Head />
        <Preview>Verify with this magic link.</Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src={`${baseUrl}/static/homefix-logo.png`}
                    width={48}
                    height={48}
                    alt="Homefix"
                />
                <Heading style={heading}>🪄 Your magic link</Heading>
                <Section style={body}>
                    <Text style={paragraph}>
                        <Link style={link} href={url}>
                            👉 {urlText} 👈
                        </Link>
                    </Text>
                    <Text style={paragraph}>
                        If you didn&apos;t request this, please ignore this
                        email.
                    </Text>
                </Section>
                <Text style={paragraph}>
                    Best,
                    <br />- HomeFix Team
                </Text>
                <Hr style={hr} />
                <Img
                    src={`${baseUrl}/static/homefix-logo.png`}
                    width={32}
                    height={32}
                    style={{
                        WebkitFilter: "grayscale(100%)",
                        filter: "grayscale(100%)",
                        margin: "20px 0",
                    }}
                />
                <Text style={footer}>HomeFix Inc.</Text>
                <Text style={footer}>
                    111 17 ave #2222, Calgary, AB A0A 0A0
                </Text>
            </Container>
        </Body>
    </Html>
);

export default VerifyUser;

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 25px 48px",
    backgroundImage: 'url("/assets/raycast-bg.png")',
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
    fontSize: "28px",
    fontWeight: "bold",
    marginTop: "48px",
};

const body = {
    margin: "24px 0",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

const link = {
    color: "#FF6363",
};

const hr = {
    borderColor: "#dddddd",
    marginTop: "48px",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
    marginLeft: "4px",
};

export const emailHtml = (url: string, urlText: string) => {
    return render(<VerifyUser url={url} urlText={urlText} />);
};
