import React from 'react';
import PostListItem from '../post-list-item/';

import './post-list.css';

const PostList = ({ data, onDelete }) => {

    /* const elements =  */
    

    return (
        <ul className="app-list list-group">
            {
                 data && data.map((item) => {
                    const { id, ...itemProps } = item;
                    if(item !== null && item !==undefined){
                         return (
                        <li key={id} className="list-group-item">
                            <PostListItem {...itemProps} onDelete={() => onDelete(id)} />
                        </li>
                    )
                    }
                    else return
                   
                })

            }

        </ul>


    )
}

export default PostList;