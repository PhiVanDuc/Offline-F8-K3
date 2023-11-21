import React, { memo } from 'react'

function Content() {
    console.log("Content Render");

    return (
        <div>
            <h2>This is Content</h2>
        </div>
    )
}

export default memo(Content);

/*
    Higher order component
    Có nghĩa là component cấp cao hơn component hiện tại
    React.memo()
    -> HOC
    -> Dựa vào props để quyết định render component con
    -> Props truyền vào component con thay đổi thì re-render component con
*/