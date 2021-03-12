import React, { useState, useEffect} from 'react';
import AppHeader from '../app-header/';
import SearchPanel from '../search-panel/';
import PostStatusFilter from '../post-status-filter/';
import PostList from '../post-list/';
import AddForm from '../add-form';
import ChangeCar from '../edit-form';
import * as db from '../data/data';

import './app.css';

const App = () => {

    const [data, setData] = useState([]);
    const [term, setTerm] = useState("");
    const [addForm, setAddForm] = useState(false);
    const [changeForm, setChangeForm] = useState(false);
    const [currentCar, setCurrentCar] = useState(null);
    const [carIndex, setCarIndex] = useState(null);

    useEffect(()=> {
        const data = db.getCars()
        setData(data)
      },[]);

    const searchPost = (items, term) => {
        if (term.length === 0) {
            return items
        }
        return items.filter((item) => {
            return item.label.indexOf(term) > -1
        });
    };
    const onUpdateSearch = (term) => {
        setTerm(term)

    }
    const deleteItem = (id) => {
        const index = data.findIndex(elem => elem.id === id);

        const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

        return (setData(newArr))
    }

    const handleAddCar = (car) => {
        const newData = [...data, car];
        console.log(car);
        setData(newData);
    }

    const handleAddFormClose = () => {
        setAddForm(false)
    }

    const handleChangeCar = (id, car) => {
        let tempCarArr = data;
        tempCarArr[id] = car;
        setData(tempCarArr);
    }

    const handleChangeFormColse = () => {
        setChangeForm(false)
    }

    const getCar = (id, car) => {
        setChangeForm(true);
        setCarIndex(id);
        setCurrentCar(car);
        if (addForm) {
            setAddForm(false);
        }
    }

    const handleShowAddForm = () => {
        if (changeForm) {
            setChangeForm(false)
        }
        setAddForm(true)
    }

    /* const allPostsCounter = data.length; */
    const visiblePosts = searchPost(data, term);

    return (
        <div className="app">
            {addForm ? (
                <AddForm close={() => handleAddFormClose}
                    handleAddCar={(car) => handleAddCar}
                    addFormStatus={addForm} />
            ) : (!changeForm ? (<>
            <AppHeader /* postCounter={ allPostsCounter } */ />
            <div className="search-panel  ">
                <SearchPanel onUpdateSearch={(term) => onUpdateSearch(term)} 
                             showAddForm={handleShowAddForm}
                             disabled = {addForm || changeForm ? true : false}/>

            </div>
                <PostList posts={visiblePosts}
                    onDelete={deleteItem}
                    getCar={(id, car) => getCar(id, car)}
                />
                </>
            ) : (
                <ChangeCar
                    carIndex={carIndex}
                    changeCar={() => handleChangeCar}
                    closeChanger={() => handleChangeFormColse}
                    car={currentCar}
                />
            ))

            }


        </div>

    );
}


export default App;