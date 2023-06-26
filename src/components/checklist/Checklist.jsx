import React, { useState } from 'react';
import './Checklist.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ChecklistApp = () => {
    const [text, setText] = useState('');
    const [items, setItems] = useState(localStorage.items ? JSON.parse(localStorage.items) : []);

    const handleInputChange = (event) => {
        const inputText = event.target.value;
        setText(inputText);
    };

    const handleSubmit = () => {
        const lines = text.split('\n').filter((line) => line.trim() !== '');
        const pattern = /^\[\d{1,2}\.\d{1,2}, \d{1,2}:\d{2}\] .+: (.+)$/;

        const extractedItems = lines.reduce((acc, line) => {
            const match = line.match(pattern);
            if (!match) {
                acc.push({ checked: false, text: line });
            } else if (match[1]) {
                acc.push({ checked: false, text: match[1] });
            }
            return acc;
        }, []).filter(Boolean);
        localStorage.items = JSON.stringify(extractedItems);
        setItems(extractedItems);
    };

    const handleCheckboxChange = (index) => {
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index].checked = !updatedItems[index].checked;
            return updatedItems;
        });
    };

    const handleItemClick = (index) => {
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index].checked = !updatedItems[index].checked;
            return updatedItems;
        });
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const itemsCopy = [...items];
        const [draggedItem] = itemsCopy.splice(result.source.index, 1);
        itemsCopy.splice(result.destination.index, 0, draggedItem);

        setItems(itemsCopy);
    };

    return (
        <div className="container">
            <h1 className="heading">רשימת קניות</h1>
            {!items.length ? (
                <div className="input-container">
                    <textarea
                        className="input-field"
                        value={text}
                        onChange={handleInputChange}
                        placeholder="הדבק את הרשימה שלך או רענן לרשימה הקודמת..."
                    ></textarea>
                    <button className="submit-button" onClick={handleSubmit}>
                        סדר לי את הרשימה
                    </button>
                </div>
            ) : (
                <button className="clear-button" onClick={() => setItems([])}>
                    נקה רשימה
                </button>
            )}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="checklist">
                    {(provided) => (
                        <ul className="checklist" {...provided.droppableProps} ref={provided.innerRef}>
                            {items.map((item, index) => (
                                <Draggable key={index} draggableId={`item-${index}`} index={index}>
                                    {(provided) => (
                                        <li
                                            {...provided.draggableProps}
                                            ref={provided.innerRef}
                                            onClick={() => handleItemClick(index)}
                                            className={`checklist-item ${item.checked ? 'checked' : ''}`}
                                        >
                                            <div className="contenet-line-container" >
                                                <label className="checkbox-container">
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox"
                                                        checked={item.checked}
                                                        readOnly
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>
                                                <span className="item-text">{item.text}</span>
                                            </div>
                                            <div className="drag-handle" {...provided.dragHandleProps} >
                                                <span className="drag-icon">&#8801;</span>
                                            </div>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default ChecklistApp;
