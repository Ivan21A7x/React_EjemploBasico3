import React from 'react';

export default function SecDoingComponent({ tasksRef }) {
  return (
    <div className="bg-yellow-300/60 border border-black w-full h-full p-4">
      <h2 className="text-xl font-bold mb-4">Doing List</h2>
      
      {/* Contenedor de tareas referenciado por tasksRef */}
      <div ref={tasksRef} className="border border-black p-4 min-h-[200px]">
        {/* Las tareas se añaden aquí */}
      </div>
    </div>
  );
}
