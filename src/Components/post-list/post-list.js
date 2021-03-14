import React from 'react';
import PostListItem from '../post-list-item/';
import propTypes from 'prop-types'
import './post-list.css';

const PostList = ({ data, onDelete, getCar,showChangeForm }) => {  
    
    PostList.propTypes={
        onDelete: propTypes.func.isRequired,
        getCar : propTypes.func.isRequired,
        showChangeForm : propTypes.func.isRequired
    }
    /*
        ხდება props-ის მიღებული ინფორმაციის გადარჩევა, "განაწილება". 
        PostListItem კომპონენტის დაგენერირება და ინფორმაციის მიწოდება.
    */

    return (
        <ul className="app-list list-group">            
            {                
                 data && data.map((item, index) => {
                    const { id, ...itemProps } = item;
                    if(item !== null && item !==undefined){
                         return (
                        <li  key={index} className="list-group-item">                             
                            <PostListItem {...itemProps}
                            car={item}                                                        
                            onDelete={() => onDelete(id)} 
                            getCar={(id, car) => getCar(id, car)}
                            showChangeForm = {showChangeForm}
                            index ={index}
                            />
                            
                        </li>
                    )
                    }
                    else return {}
                   
                })

            }

        </ul>


    )
}

export default PostList;