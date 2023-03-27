import { Icon } from "@mui/material"

function ArticleOption(params) {
    const {iconName, num, onClick, } = params

    return (
        <span onClick={onClick}>
            <Icon component={iconName} />
            {num}
        </span>
    )
}

export default ArticleOption