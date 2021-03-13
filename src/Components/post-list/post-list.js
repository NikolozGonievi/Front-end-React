import React from 'react';
import PostListItem from '../post-list-item/';

import './post-list.css';

const PostList = ({ data, onDelete, getCar,showChangeForm }) => {  
    

    return (
        <ul className="app-list list-group">            
            {                
                 data && data.map((item, index) => {
                    const { id, ...itemProps } = item;
                    if(item !== null && item !==undefined){
                         return (
                        <li  key={index} className="list-group-item">                             
                            <PostListItem  {...itemProps}
                            car={item}                                                        
                            onDelete={() => onDelete(id)} 
                            getCar={(id, car) => getCar(id, car)}
                            showChangeForm = {showChangeForm}
                            index ={index}
                            />
                            {console.log('id',id)}
                        </li>
                    )
                    }
                    else return console.log('post-list', item)
                   
                })

            }

        </ul>


    )
}

export default PostList;