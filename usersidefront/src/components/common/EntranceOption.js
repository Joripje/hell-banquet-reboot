import { LinkDecoNone } from "./"

function EntranceOption(params) {
    return (
        <>
            {params.map(item => {
                return (
                    <div key={item.name}>
                        <br />
                        <LinkDecoNone to={item.url}>
                            {item.name}
                        </LinkDecoNone>
                    </div>
                )
            })}
        </>
    )
}

export default EntranceOption