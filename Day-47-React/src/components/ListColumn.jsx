import React, { useContext, useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom';
import { BoardContext } from './Board'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import Column from './Column'
import { useDispatch } from 'react-redux';
import { tasksSlice } from '../redux/slices/tasksSlice';
import Task from './Task';
import { fetchAddColumn } from '../redux/slices/tasksSlice';

const { updateColumns, updateTasks } = tasksSlice.actions;

export default function ListColumn() {
    const dispatch = useDispatch();
    const { columns } = useContext(BoardContext);
    const { tasks } = useContext(BoardContext);
    const [activeColumn, setActiveColumn] = useState(null);
    const [activeTask, setActiveTask] = useState(null);

    // Xử lý Api
    const handleClickAddColumn = () => {
        const newCol = {
            idColumn: JSON.parse(localStorage.getItem("tempColumn")),
            column: JSON.parse(localStorage.getItem("tempColumn")),
            columnName: `Column ${JSON.parse(localStorage.getItem("orderColumn"))}`,
            orderColumn: JSON.parse(localStorage.getItem("orderColumn")),

            idTask: JSON.parse(localStorage.getItem("tempTask")),
            content: `Task ${JSON.parse(localStorage.getItem("orderTask"))}`,
            orderTask: JSON.parse(localStorage.getItem("orderTask")),
        }
        localStorage.setItem("tempColumn", JSON.parse(localStorage.getItem("tempColumn")) + 1);
        localStorage.setItem("orderColumn", JSON.parse(localStorage.getItem("orderColumn")) + 1);
        localStorage.setItem("tempTask", JSON.parse(localStorage.getItem("tempTask")) + 1);
        localStorage.setItem("orderTask", JSON.parse(localStorage.getItem("orderTask")) + 1);

        const res = [];
        columns.forEach((column) => {
            tasks.forEach((task) => {
                if (task.column === column.column) {
                    res.push({
                        column: column.column,
                        content: task.content,
                        columnName: column.columnName,
                    });
                }
            });
        });

        const payload = { res, newCol };
        dispatch(fetchAddColumn(payload));
    }

    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        
        if(columns.length === 0) {
            localStorage.setItem("tempColumn", 9999999);
            localStorage.setItem("tempTask", 999999999);
            localStorage.setItem("orderColumn", 1);
            localStorage.setItem("orderTask", 1);
        }
    }, [columns]);

    // Xử lý drag and drop
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
        const { active, over } = event;
        setActiveColumn(null);
        setActiveTask(null);

        if (!over) return;
        if (active.id === over.id) return;

        // Xử lý swap vị trí của hai cột cho nhau trong mảng columns (arrayMove)
        if (active.data.current.type === "Column" && over.data.current.type === "Column") {
            const activeColumnIndex = columns.findIndex((column) => active.id === column._id );
            const overColumnIndex = columns.findIndex((column) => over.id === column._id );
            dispatch(updateColumns(arrayMove(columns, activeColumnIndex, overColumnIndex)));
        }

        // Xử lý swap vị trí của hai task với nhau trong mảng tasks (arrayMove)
        if (active.data.current.type === "Task" && over.data.current.type === "Task") {
            const activeTaskIndex = tasks.findIndex((task) => task._id === active.id);
            const overTaskIndex = tasks.findIndex((task) => task._id === over.id);
            dispatch(updateTasks(arrayMove(tasks, activeTaskIndex, overTaskIndex)));
        }
    }

    const handleDragOver = (event) => {
        const { active, over } = event;

        if (!over) return;
        if (active.id === over.id) return;

        if ((active.data.current.type === "Task" && over.data.current.type === "Column") && (active.data.current.task.column !== over.data.current.column.column)) {
            const { delta } = event;
            const activeTaskIndex = tasks.findIndex((task) => task._id === active.id);

            const newTasks = [...tasks];
            const changeActiveTask = {
                ...newTasks[activeTaskIndex],
                column: over.data.current.column.column,
            }
            newTasks[activeTaskIndex] = changeActiveTask;

            // Xử lý vị trí drop là ở cuối column hay ở đầu column khi kéo task không chạm vào task của column khác
            if (delta.y < 0) {
                const firstIndex = newTasks.findIndex((task) => task.column === over.data.current.column.column);
                if (firstIndex === -1) return;

                newTasks.splice(firstIndex, 0, changeActiveTask);
                newTasks.splice(newTasks.findLastIndex((task) => task._id === changeActiveTask._id), 1);
            }
            else if (delta.y > 0) {
                const lastIndex = newTasks.findLastIndex((task) => task.column === over.data.current.column.column);
                if (lastIndex === -1) return;

                newTasks.splice(lastIndex + 1, 0, changeActiveTask);
                newTasks.splice(newTasks.findIndex((task) => task._id === changeActiveTask._id), 1);
            }
            dispatch(updateTasks(newTasks));
        }
    
        if (!over.data.current.task) return;
        if (active.data.current.task.column !== over.data.current.task.column) {
            const activeTaskIndex = tasks.findIndex((task) => task._id === active.id);

            const newTasks = [...tasks];
            const changeActiveTask = {
                ...newTasks[activeTaskIndex],
                column: over.data.current.task.column,
            }
            newTasks[activeTaskIndex] = changeActiveTask;
            dispatch(updateTasks(newTasks));
        }
    }

    // Render giao diện
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

            <button className='btn-add-column' onClick={handleClickAddColumn}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 icon-add">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Add Column
            </button> 
        </div>
    )
}