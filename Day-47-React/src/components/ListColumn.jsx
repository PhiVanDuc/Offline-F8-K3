import React, { useContext, useState } from 'react'
import { createPortal } from 'react-dom';
import { BoardContext } from './Board'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import Column from './Column'
import { useDispatch } from 'react-redux';
import { tasksSlice } from '../redux/slices/tasksSlice';
import Task from './Task';

const { updateColumns } = tasksSlice.actions;

export default function ListColumn() {
    const dispatch = useDispatch();
    const { columns } = useContext(BoardContext);
    const [activeColumn, setActiveColumn] = useState(null);
    const [activeTask, setActiveTask] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            }
        })
    )

    const handleDragStart = (event) => {
        console.log(event);
        if (event.active.data.current.type === "Column") {
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if (event.active.data.current.type === "Task") {
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;
        const activeColumnId = active.id;
        const overColumnId = over.id;

        if (activeColumnId === overColumnId) return;
        const activeColumnIndex = columns.findIndex((column) => column._id === activeColumnId);
        const overColumnIndex = columns.findIndex((column) => column._id === overColumnId);
        dispatch(updateColumns(arrayMove(columns, activeColumnIndex, overColumnIndex)));
    }

    return (
        <div className='list-column'>
            <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <SortableContext items={columns.map(({ _id }) => _id)} strategy={horizontalListSortingStrategy}>
                    {
                        columns.map((column) => {
                            return <Column key={column._id} column={column}/>
                        })
                    }
                </SortableContext>

                {
                    createPortal(
                        <DragOverlay>
                            { activeColumn && <Column column={activeColumn} /> }
                            { activeTask && <Task task={activeTask} /> }
                        </DragOverlay>, document.body
                    )
                }
            </DndContext>

            <button className='btn-add-column'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 icon-add">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Add Column
            </button> 
        </div>
    )
}