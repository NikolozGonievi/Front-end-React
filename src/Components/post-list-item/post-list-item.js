import React from 'react';

import './post-list-item.css';

const PostListItem = (props) => {

    return (
        <div className='app-list-item d-flex justify-content-between'>
            <span className="app-list-item-label">
                
            </span>
            <div className="d-flex justify-content-center align-items-center">
                <button type="button" className="btn btn-primary ">
                    რედაქტირება
                </button>
                <button onClick={props.onDelete} type="button" className="btn-trash btn-sm">
                    <i className="fa fa-trash-o"></i>
                </button>
                <i className="fa fa-heart"></i>
            </div>
        </div>
    );
}

export default PostListItem;