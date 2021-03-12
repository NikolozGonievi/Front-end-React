import React, { useState } from 'react'

import './search-panel.css'

const SearchPanel = (props) => {
    const [term, setTerm] = useState("");

    const onUpdateSearch=(e)=>{
        const term =e.target.value;
        setTerm({term})
        props.onUpdateSearch(term);
    }
    return (
        <div className="d-flex">
            <button type="button"
                    onClick={props.showAddForm}
                    className="btn btn-outline-secondary">
                    მანქანის დამატება
                </button>
        <input className="form-control   search-input"
            type="text"
            placeholder="სახელით ძებნა"
            onChange={onUpdateSearch}
            disabled ={props.disabled}
        />
        </div>
        
    );
}
export default SearchPanel;