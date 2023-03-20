import { LinkDecoNone } from "../common"

import styled from "styled-components"
import { Card, Grid, Icon } from "@mui/material"
import { ThumbDown, ThumbUp, Comment } from "@mui/icons-material"
import angryJenkins from "../../assets/images/angryJenkins.png"

function BoardList() {

    const lorem = "Lorem ipsuetur adipiscing elit. Vestibulum porta odio eros, eget dignissim felis egestas vitae. Mauris sit amet est nec eros accumsan eleifend. Etia".slice(0, 100)

    const articles = [
        {content: lorem, src: angryJenkins},
        {content: lorem, src: angryJenkins},
        {content: lorem, src: angryJenkins},
        {content: lorem, src: angryJenkins},
        {content: lorem, src: angryJenkins},
        {content: lorem, src: angryJenkins},
        {content: lorem, src: angryJenkins},
        {content: lorem, src: angryJenkins},
        {content: lorem, src: angryJenkins},
    ]

    return (
            articles.map((article, index) => {
                return (
                    <Card style={{margin: "10px 0px 10px 0px", height: 160}} key={index} >
                        <LinkDecoNone to={`${index}`}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <JanvanFace src={article.src} alt={article?.id} />
                                </Grid>
                                <Grid item xs={8}>
                                    <div>
                                        {article.content}
                                    </div>
                                    <Icon component={ThumbUp} />
                                    <Icon component={ThumbDown} />
                                    <Icon component={Comment} />
                                </Grid>
                            </Grid>
                        </LinkDecoNone>
                    </Card>
                )
            })
    )
}

const JanvanFace = styled.img`
    width: 140px;
    height: 140px;

    margin-left: 0px 10px 0px 10px;
`

export default BoardList