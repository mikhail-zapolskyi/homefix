"use client";
import { keyframes, styled } from "@mui/material";
import React, { useEffect, useState } from "react";

interface TextAnimationProps {
    text: string;
}

interface StyledSpanProps extends React.HTMLAttributes<HTMLSpanElement> {
    numLetters: number;
}

const generateChildDelay = (letters: number) => {
    let animationCss: { [key: string]: React.CSSProperties } = {};
    const period = 2 * Math.PI;
    for (let i = 1; i <= letters; i++) {
        const time = 0.5 + 0.5 * Math.sin((i / letters) * period);

        animationCss[`&:nth-of-type(${i})`] = {
            animationDelay: `${time}s`,
        };
    }

    return animationCss;
};

const animation = keyframes`
0% { opacity: 0; transform: translateY(2.1rem) skewY(10deg) skewX(10deg) rotate(30deg); filter: blur(1rem);}
25% { opacity: 1; transform: translateY(0) skewY(0) skewX(0) rotate(0); filter: blur(0rem);}
75% { opacity: 1; transform: translateY(0) skewY(0) skewX(0) rotate(0); filter: blur(0rem);}
100% { opacity: 0; transform: translateY(-2.1rem) skewY(10deg) skewX(10deg) rotate(30deg); filter: blur(1rem);}
`;

const TextAnimationWrapper = styled("span")<StyledSpanProps>(
    ({ numLetters }) => ({
        display: "inline-block",
        span: {
            display: "inline-block",
            opacity: 0,
            animationName: `${animation}`,
            animationDuration: `6s`,
            animationFillMode: "forwards",
            animationIterationCount: "infinite",
            animationTimingFunction: "cubic-bezier(0.075, 0.82, 0.165, 1)",
            ...generateChildDelay(numLetters),
        },
    })
);

const TextAnimation: React.FC<TextAnimationProps> = ({ text }) => {
    const letterArray = text.split("");
    const [lettersRendered, setLettersRendered] = useState<Array<JSX.Element>>(
        []
    );

    useEffect(() => {
        const renderedLetters = letterArray.map((item, index) => (
            <span key={index}>{item}</span>
        ));

        setLettersRendered(renderedLetters);
    }, [text]);

    return (
        <TextAnimationWrapper numLetters={letterArray.length}>
            {lettersRendered}
        </TextAnimationWrapper>
    );
};

export default TextAnimation;
