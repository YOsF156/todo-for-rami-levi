import React, { useState } from 'react';
import './Checklist.css';

const ChecklistApp = () => {
    const [text, setText] = useState('');
    const [items, setItems] = useState(localStorage.items ? JSON.parse(localStorage.items) : []);

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = () => {
        const lines = text.split('\n');
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
        localStorage.items = JSON.stringify(extractedItems)
        setItems(extractedItems);
    };

    const handleCheckboxChange = (index) => {
        setItems((prevItems) => {
            // const updatedItems = prevItems.map((v, i) => {
            //     if (i == index) {
            //         v.checked = !v.checked
            //     }
            //     return v
            // }).sort(v => v.checked ? 1 : 0)
            const updatedItems = [...prevItems]
            updatedItems[index].checked = !updatedItems[index].checked
            return updatedItems;
        });
    };

    return (
        <div className="container">
            <h1 className="heading">רשימת קניות</h1>
            {!items.length ? <div className="input-container">
                <textarea
                    className="input-field"
                    value={text}
                    onChange={handleInputChange}
                    placeholder="הדבק את הרשימה שלך"
                ></textarea>
                <button className="submit-button" onClick={handleSubmit}>
                    סדר לי את הרשימה
                </button>
            </div> :
                <button className="clear-button" onClick={() => setItems([])}>
                    clear
                </button>
            }
            <ul className="checklist">
                {items.map((item, index) => (
                    <li onClick={() => handleCheckboxChange(index)} key={index} className={`checklist-item ${item.checked ? 'checked' : ''}`}>
                        <label className="checkbox-container">
                            <input

                                type="checkbox"
                                className="checkbox"
                                checked={item.checked}
                            // onChange={() => handleCheckboxChange(index)}
                            />
                            <span className="checkmark" ></span>
                        </label>
                        <span className="item-text">{item.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChecklistApp;
