import React, { useRef, useEffect } from 'react';

export default function TaskComponent({ task, section, onDragStart, onUpdateTask }) {
  const textRef = useRef(null);

  // Manejador de cambio de texto
  const handleTextChange = (e) => {
    onUpdateTask(task.id, e.target.value, section); // Captura el valor tal cual, incluyendo los saltos de línea
  };

  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus();
      // Coloca el cursor al final del texto
      textRef.current.setSelectionRange(textRef.current.value.length, textRef.current.value.length);
    }
  }, [task.text]);

  return (
    <textarea
      ref={textRef}
      className="bg-yellow-500 p-2 m-1 border border-black"
      draggable="true"
      onDragStart={onDragStart}
      value={task.text}
      onChange={handleTextChange}
      rows="4" // Ajusta el tamaño inicial del textarea
      style={{ whiteSpace: 'pre-wrap' }} // Mantiene los saltos de línea y espacios en blanco
    />
  );
}
