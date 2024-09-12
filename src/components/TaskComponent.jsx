import React, { useRef, useEffect } from 'react';

export default function TaskComponent({ task, section, onDragStart, onUpdateTask }) {
    const textRef = useRef(null);
    const handleTextChange = (e) => {
        onUpdateTask(task.id, e.target.innerText, section);
    };

    // Mantener el cursor en la posición correcta después del re-renderizado
    useEffect(() => {
        if (textRef.current) {
            textRef.current.focus();  // Asegúrate de que el elemento tenga el foco
            const range = document.createRange();
            const sel = window.getSelection();
            range.selectNodeContents(textRef.current);
            range.collapse(false); // Coloca el cursor al final
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }, [task.text]); // Solo actualiza cuando el texto de la tarea cambie

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
            {task.text}
            {console.log("Tarea: ", task.id, ", Estado: ", section)}
        </div>
  );
}
