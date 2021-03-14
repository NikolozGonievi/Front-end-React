import React from 'react'
import { Link } from 'react-router-dom';
import propTypes from 'prop-types'
import './search-panel.css'

const SearchPanel = (props) => {
    
    SearchPanel.propTypes = {
        showAddForm: propTypes.func.isRequired
    }
    
    return (
        <div className="d-flex">
            <Link to='/cars/new'>
                <button type="button"
                    onClick={props.showAddForm}
                    className="btn btn-outline-secondary">
                    მანქანის დამატება
                </button>
            </Link>            
        </div>
    );
}
export default SearchPanel;