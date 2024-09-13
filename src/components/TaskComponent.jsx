import React, { useRef, useEffect } from 'react';

export default function TaskComponent({ task, section, onDragStart, onUpdateTask }) {
  const textRef = useRef(null);

  // Manejador de cambio de texto
  const handleTextChange = (e) => {
    onUpdateTask(task.id, e.target.innerText.trim(), section);
  };

  // Mantener el cursor en la posición correcta después del re-renderizado
  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus(); // Asegúrate de que el elemento tenga el foco

      // Mueve el cursor al final
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(textRef.current);
      range.collapse(false); // Coloca el cursor al final
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, [task.text]); // Solo se actualiza cuando el texto de la tarea cambie

  return (
    <div
      ref={textRef}
      className="bg-yellow-500 p-2 m-2 border border-black"
      contentEditable="true"
      draggable="true"
      onDragStart={onDragStart}
      onInput={handleTextChange}
      suppressContentEditableWarning={true}
    >
      {/* Si task.text está vacío, muestra un espacio para permitir la edición */}
      {task.text === "" ? "\u200B" : task.text}
      {console.log("Tarea: ", task.id, ", Estado: ", section)}
    </div>
  );
}
