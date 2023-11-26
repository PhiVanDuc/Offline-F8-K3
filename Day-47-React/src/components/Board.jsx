import React, { createContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTasks } from '../redux/slices/tasksSlice'
import ListColumn from './ListColumn';

export const BoardContext = createContext();

export default function Board() {
    const dispatch = useDispatch();
    const columns = useSelector((state) => state.tasks.columns);
    const tasks = useSelector((state) => state.tasks.tasks);

    useEffect(() => {
        dispatch(getTasks());
    }, []);

    const boardData = {
        columns: columns,
        tasks: tasks,
    }

    return (
        <BoardContext.Provider value={boardData}>
            <div className='board'>
                {
                    columns.length > 0 && <ListColumn />
                }
            </div>
        </BoardContext.Provider>
    )
}
