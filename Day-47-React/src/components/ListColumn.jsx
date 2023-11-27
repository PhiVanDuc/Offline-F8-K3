import React, { useContext, useState } from 'react'
import { createPortal } from 'react-dom';
import { BoardContext } from './Board'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import Column from './Column'
import { useDispatch } from 'react-redux';
import { tasksSlice } from '../redux/slices/tasksSlice';
import Task from './Task';

const { updateColumns, updateTasks } = tasksSlice.actions;

export default function ListColumn() {
    const dispatch = useDispatch();
    const { columns } = useContext(BoardContext);
    const { tasks } = useContext(BoardContext);
    const [activeColumn, setActiveColumn] = useState(null);
    const [activeTask, setActiveTask] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            }
        })
    )

    const handleDragStart = (event) => {
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
        setActiveColumn(null);
        setActiveTask(null);
        const { active, over } = event;
        if (!over) return;
        const activeId = active.id;
        const overId = over.id;

        const isActiveColumn = active.data.current.type === "Column";
        const isOverColumn = active.data.current.type === "Column";
        if (activeId === overId) return;
        if (isActiveColumn && isOverColumn) {
            const activeColumnIndex = columns.findIndex((column) => column._id === activeId);
            const overColumnIndex = columns.findIndex((column) => column._id === overId);
            dispatch(updateColumns(arrayMove(columns, activeColumnIndex, overColumnIndex)));
        }
    }

    const handleDragOver = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeTaskId = active.id;
        const overTaskId = over.id;
        if (activeTaskId === overTaskId) return;

        const isActiveTask = active.data.current.type === "Task";
        const isOverTask = over.data.current.type === "Task";

        if (!isActiveTask) return;

        // Drag a task over another task
        if (isActiveTask && isOverTask) {
            const activeIndex = tasks.findIndex((task) => task._id === activeTaskId);
            const overIndex = tasks.findIndex((task) => task._id === overTaskId);

            const newTasks = [];
            tasks.forEach((task) => {
                if (task._id === tasks[activeIndex]._id) newTasks.push({ ...task, column: tasks[overIndex].column });
                else newTasks.push({ ...task });
            })
            dispatch(updateTasks(newTasks));

            dispatch(updateTasks(arrayMove(newTasks, activeIndex, overIndex)));
        }

        // Drag a task over a column
        const isOverAColumn = over.data.current.type === "Column";
        if (isActiveTask && isOverAColumn) {
            const overColumn = over.data.current.column.column;
            const activeIndex = tasks.findIndex((task) => task._id === activeTaskId);

            const newTasks = [...tasks];
            const wantChange = {
                ...newTasks[activeIndex],
                column: overColumn,
            }
            newTasks[activeIndex] = wantChange;

            dispatch(updateTasks(newTasks));
        }
    }

    return (
        <div className='list-column'>
            <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
                <SortableContext items={columns.map(({ _id }) => _id)} strategy={horizontalListSortingStrategy}>
                    {
                        columns.map((column) => {
                            return <Column key={column._id} column={column} tasks={
                                tasks.filter((task) => {
                                    return task.column === column.column;
                                })
                            }/>
                        })
                    }
                </SortableContext>

                {
                    createPortal(
                        <DragOverlay>
                            {
                                activeColumn && <Column column={activeColumn} tasks={
                                tasks.filter((task) => {
                                        return task.column === activeColumn.column;
                                    })
                                } /> 
                            }
                            {
                                activeTask && <Task task={activeTask} />
                            }
                        </DragOverlay>,
                        document.body
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