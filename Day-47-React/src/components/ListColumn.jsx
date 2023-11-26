import React, { useContext } from 'react'
import { BoardContext } from './Board'
import { SortableContext } from '@dnd-kit/sortable'
import { DndContext } from '@dnd-kit/core';
import Column from './Column'

export default function ListColumn() {
    const { columns } = useContext(BoardContext);
    const items = columns.map(({ _id }) => _id);

    const handleDragStart = (event) => {
        console.log(event);
    }

    return (
        <DndContext onDragStart={handleDragStart}>
            <div className='list-column'>
                <SortableContext items={items}>
                    {
                        columns.map((column) => {
                            return <Column key={column._id} column={column}/>
                        })
                    }
                </SortableContext>

                <button className='btn-add-column'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 icon-add">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Add Column
                </button>
                
            </div>
        </DndContext>
    )
}
