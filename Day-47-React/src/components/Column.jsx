import React, { useContext } from 'react'
import Task from './Task'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities';
import { useDispatch } from 'react-redux'
import { BoardContext } from './Board'
import { fetchDeleteColumn, fetchAddTask } from '../redux/slices/tasksSlice';

export default function Column({ column, tasks }) {
    const dispatch = useDispatch();
    const { columns } = useContext(BoardContext);
    const { tasks: globalTasks } = useContext(BoardContext);
    const {_id, column: columnOrder, columnName } = column;

    // Xử lý drag and drop
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: _id,
        data: {
            type: "Column",
            column,
        }
    });
      
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if (isDragging) {
        const styleOverlay = {
            ...style,
            backgroundColor: "transparent",
            border: "2px solid #872341",
            height: "501px",
            width: "400px",
            marginRight: "20px",
            borderRadius: "5px",
        }

        return (
            <div style={styleOverlay} ref={setNodeRef}></div>
        )
    }

    // Xử lý Api
    const handleClickDeleteColumn = () => {
        const deleteCol = {
            column: column.column,
        }

        const res = [];
        columns.forEach((column) => {
            globalTasks.forEach((task) => {
                if (task.column === column.column) {
                    res.push({
                        column: column.column,
                        content: task.content,
                        columnName: column.columnName,
                    });
                }
            });
        });

        for (let i = res.length - 1; i >= 0; i--) {
            if (res[i].column === column.column)
                res.splice(i, 1);
        }

        const payload = { res, deleteCol }
        dispatch(fetchDeleteColumn(payload));
    }

    const handleCickAddTask = () => {
        const newTask = {
            idTask: `${JSON.parse(localStorage.getItem("tempTask"))}`,
            column: column.column,
            content: `Task ${JSON.parse(localStorage.getItem("orderTask"))}`,
            columnName: column.columnName,
            order: JSON.parse(localStorage.getItem("orderTask")),
        };
        localStorage.setItem("tempTask", JSON.parse(localStorage.getItem("tempTask")) + 1);
        localStorage.setItem("orderTask", JSON.parse(localStorage.getItem("orderTask")) + 1);

        const res = [];
        columns.forEach((column) => {
            globalTasks.forEach((task) => {
                if (task.column === column.column) {
                    res.push({
                        column: column.column,
                        content: task.content,
                        columnName: column.columnName,
                    });
                }
            });
        });

        const payload = {
            res,
            newTask,
        }
        dispatch(fetchAddTask(payload));
    }

    // Render giao diện
    return (
        <div className='column' ref={setNodeRef} style={style} >
            <div className="column-header" {...attributes} {...listeners}>
                <div className="heading">
                    <div className="quantity">
                        {
                            tasks.reduce((prev, curr) => {
                                if (curr.column === columnOrder) return prev += 1;
                                return prev;
                            }, 0)
                        }
                    </div>
                    <h2>{ columnName }</h2>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 icon-delete" onClick={handleClickDeleteColumn}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </div>

            <div className="tasks">
                <SortableContext items={tasks.map(({ _id }) => _id) } strategy={verticalListSortingStrategy} >
                    {
                        tasks.map((task) => {
                            return <Task key={task._id} task={task} column={column} />
                        })
                    }
                </SortableContext>
            </div>

            <button className='btn-add-task' onClick={handleCickAddTask}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 icon-add" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Add Task
            </button>
        </div>
    )
}