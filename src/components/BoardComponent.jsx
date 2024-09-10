import React, { useCallback, useRef } from 'react';
import SecToDoComponent from './SecToDoComponent';
import SecDoingComponent from './SecDoingComponent';
import SecDoneComponent from './SecDoneComponent';
import NewTaskComponent from './NewTaskComponent';

export default function BoardComponent() {
  // useRef para referenciar el contenedor de tareas
  const tasksRef = useRef(null);

  // Función para manejar los cambios en el párrafo editable
  const handleTextChange = useCallback((e) => {
    console.log("Texto modificado: ", e.target.innerText);
  }, []);

  // Función memorizada para añadir una tarea
  const addTask = useCallback(() => {
    const newTask = document.createElement('div');
    newTask.className = 'bg-yellow-500 p-2 m-2 border border-black';
    newTask.innerHTML = `<p contentEditable="true">New Task</p>`;

    // Función para manejar el inicio del arrastre
    const handleMouseDown = (e) => {
      const element = e.currentTarget;
      const startX = e.clientX;
      const startY = e.clientY;
      const { offsetLeft, offsetTop } = element;

      const handleMouseMove = (event) => {
        const x = event.clientX - startX;
        const y = event.clientY - startY;
        element.style.position = 'absolute';
        element.style.left = `${offsetLeft + x}px`;
        element.style.top = `${offsetTop + y}px`;
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    // Adjuntar el evento de arrastre al nuevo div
    newTask.addEventListener('mousedown', handleMouseDown);

    // Añadir el nuevo elemento al contenedor
    if (tasksRef.current) {
      tasksRef.current.appendChild(newTask);

      // Adjuntar el evento de cambio de texto al párrafo
      const paragraph = newTask.querySelector('p');
      paragraph.addEventListener('input', handleTextChange);
    }
  }, [handleTextChange]);

  return (
    <div className="grid grid-cols-3 mt-12 w-11/12 min-h-[550px] bg-gray-200 border border-black text-center place-items-center mx-auto">
      {/* Pasamos el ref de tareas a SecToDoComponent */}
      <SecToDoComponent tasksRef={tasksRef} />
      <SecDoingComponent />
      <SecDoneComponent />

      {/* Botón para añadir tareas */}
      <NewTaskComponent onAddTask={addTask} />
    </div>
  );
}
