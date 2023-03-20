import BoardList from "../components/board/BoardList"
import { LogedPageTemplate } from "../components/common"

function BoardPage() {
    return (
        <>
            <LogedPageTemplate />
            <BoardList />
        </>
    )
}

export default BoardPage