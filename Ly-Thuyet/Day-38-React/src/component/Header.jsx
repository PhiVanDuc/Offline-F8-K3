import React, { Fragment } from 'react'

export default function () {
    const showMenu = false;
    const notifications = [
        {
            id: 1,
            name: "Noti 1",
            content: "Content Noti 1"
        },
        {
            id: 2,
            name: "Noti 2",
            content: "Content Noti 2"
        },
        {
            id: 3,
            name: "Noti 3",
            content: "Content Noti 3"
        },
    ];

    return (
        <>
            <h1>Header</h1>
            <h1>Header 2</h1>
            {
                showMenu && 
                <>
                    <h2>Menu Item</h2>
                    <h2>Menu Item</h2>
                </>
            }

            {
                notifications.map(({id, name, content}) => (
                    <Fragment key={id}>
                        <h4>{name}</h4>
                        <h4>{content}</h4>
                    </Fragment>
                ))
            }
        </>
    )
}
