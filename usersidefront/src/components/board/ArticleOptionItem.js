import { Icon } from "@mui/material"

function ArticleOptionItem(params) {
    const { iconName, num } = params

    return (
        <span >
            <Icon component={iconName} />
            {num}
        </span>
    )
}

export default ArticleOptionItem