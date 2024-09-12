import React, { useCallback, useRef, useReducer } from 'react';
import SecToDoComponent from './SecToDoComponent';
import SecDoingComponent from './SecDoingComponent';
import SecDoneComponent from './SecDoneComponent';
import NewTaskComponent from './NewTaskComponent';

const initialState = {
  todo: [],
  doing: [],
  done: []
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        todo: [...state.todo, action.payload]
      };
    case 'MOVE_TASK':
      const { task, from, to } = action.payload;
      return {
        ...state,
        [from]: state[from].filter(t => t.id !== task.id),
        [to]: [...state[to], task]
      };
    case 'UPDATE_TASK_TEXT':
      return {
        ...state,
        [action.payload.section]: state[action.payload.section].map(task => 
          task.id === action.payload.id 
          ? { ...task, text: action.payload.text }
          : task
        )
      };
    default:
      return state;
  }
}

export default function BoardComponent() {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const taskIdRef = useRef(0);

  const addTask = useCallback(() => {
    const newTask = {
      id: taskIdRef.current++,
      text: 'New Task'
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  }, []);

  const moveTask = useCallback((task, from, to) => {
    dispatch({ type: 'MOVE_TASK', payload: { task, from, to } });
  }, []);

  const updateTaskText = useCallback((id, text, section) => {
    dispatch({
      type: 'UPDATE_TASK_TEXT',
      payload: { id, text, section }
    });
  }, []);

  return (
    <div className="grid grid-cols-3 mt-12 w-11/12 min-h-[550px] bg-gray-200 border border-black text-center place-items-center mx-auto">
      <SecToDoComponent tasks={state.todo} onMoveTask={moveTask} onUpdateTask={updateTaskText} />
      <SecDoingComponent tasks={state.doing} onMoveTask={moveTask} onUpdateTask={updateTaskText} />
      <SecDoneComponent tasks={state.done} onMoveTask={moveTask} onUpdateTask={updateTaskText} />

      <NewTaskComponent onAddTask={addTask} />
    </div>
  );
}
