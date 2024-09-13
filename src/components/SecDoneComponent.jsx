import React, { useRef } from 'react';
import TaskComponent from './TaskComponent';

export default function SecDoneComponent({ tasks, onMoveTask, onUpdateTask }) {
  const tasksRef = useRef(null);

  const handleDragStart = (task) => (e) => {
    e.dataTransfer.setData('task', JSON.stringify(task));
    e.dataTransfer.setData('from', 'done');
  };

  const handleDrop = (section) => (e) => {
    const task = JSON.parse(e.dataTransfer.getData('task'));
    const from = e.dataTransfer.getData('from');
    onMoveTask(task, from, section);
  };

  return (
    <div 
      className="bg-green-600/50 border border-black w-full h-full p-4"
      onDrop={handleDrop('done')}
      onDragOver={(e) => e.preventDefault()}
    >
      <h2 className="text-xl font-bold mb-4">Done List</h2>
      
      <div ref={tasksRef} className="p-4 min-h-[200px]">
        {tasks.map(task => (
          <TaskComponent 
            key={task.id} 
            task={task} 
            section='done' 
            onDragStart={handleDragStart(task)} 
            onUpdateTask={onUpdateTask}
          />
        ))}
      </div>
    </div>
  );
}
