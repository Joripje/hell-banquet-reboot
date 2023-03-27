import { ArticleDetail } from "../components/board"
import BoardOption from "../components/board/BoardOption"
import { LogedPageTemplate } from "../components/common"

function BoardDetailPage() {
    return (
        <>
            <LogedPageTemplate />
            <ArticleDetail />
            <BoardOption />
        </>
    )
}

export default BoardDetailPage