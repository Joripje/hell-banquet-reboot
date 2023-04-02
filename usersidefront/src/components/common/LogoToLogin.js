import { useState ,useEffect } from "react"
import { LinkDecoNone } from './'

import styled from "styled-components"
import staticJanban from "../../assets/images/janban.png"
import staticJenkins from "../../assets/images/angryJenkins.png"

function LogoToLogin() {
    const [image, setImage] = useState("");

    useEffect(() => {
        const images = [
            staticJanban,
            staticJenkins
        ];
        const selectRandomImage = () => {
            const randomIndex = Math.floor(Math.random() * images.length);
            setImage(images[randomIndex]);
        };
        selectRandomImage()
    }, [])
    return (
        <LogoSection>
            <LinkDecoNone background={image === staticJenkins ? '#990000' : '#B8DDFF'} to='/login' style={styleForLogo}>
                <img style={{width: 'auto', height: '100%'}} src={image} alt='잔반이 로고' />
            </LinkDecoNone>
        </LogoSection>
    )
}

const LogoSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 130px;

    background: ${props => props.children.props.background};
`

const styleForLogo = {
    display: 'flex',
    justifyContent: 'center',
    width: "60%",
    height: 130,  
}

export default LogoToLogin