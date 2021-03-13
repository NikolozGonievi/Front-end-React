import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/';
import SearchPanel from '../search-panel/';
import PostList from '../post-list/';
import AddForm from '../add-form';
import ChangeCar from '../edit-form';
import * as db from '../data/data';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './app.css';

const App = () => {

    const [data, setData] = useState([]);
    const [term, setTerm] = useState("");
    const [addForm, setAddForm] = useState(false);
    const [changeForm, setChangeForm] = useState(false);
    const [currentCar, setCurrentCar] = useState(null);
    const [carIndex, setCarIndex] = useState(null);



    useEffect(() => {
        const data = db.getCars()
        console.log("db data", data)
        setData(data)
    }, []);

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
        console.log('car', car);
        setData(newData);
    }

    const handleAddFormClose = () => {
        setAddForm(false)
    }

    const handleChangeCar = (updatedCar) => {
        let tempCarArr = data;
        console.log('updatedCar', updatedCar)
        console.log('stateDAta', data)
        tempCarArr[carIndex] = updatedCar;
        console.log('updated state', tempCarArr)
        setData([...tempCarArr]);
    }

    const handleChangeFormClose = () => {
        setChangeForm(false)
    }

    const getCar = (curId, car) => {
        setChangeForm(true);
        console.log('curID', curId)

        setCarIndex(curId);
        console.log('INDEEEX SUKAAAAA', carIndex)
        setCurrentCar(car);
        if (addForm) {
            setAddForm(false);
        }
    }

    const handleShowAddForm = () => {
        if (changeForm) {
            setChangeForm(false);
        }
        setAddForm(true);
    }

    const handleShowChangeForm = () => {
        if (addForm) {
            setAddForm(false);
        }
        setChangeForm(true);
    }

    /* const allPostsCounter = data.length; */
    const visiblePosts = searchPost(data, term);
    

    return (
        <Router>
            <div className="app">
                <Switch>
                    {addForm ? (<>
                        <Route path='/cars/new' render={(props) => (
                            <AddForm close={() => handleAddFormClose()}
                                handleAddCar={(car) => handleAddCar(car)}
                                addFormStatus={addForm} />
                        )} />
                    </>
                    ) : (!changeForm ? (<>
                        <AppHeader />
                        <div className="search-panel  ">
                            <SearchPanel onUpdateSearch={(term) => onUpdateSearch(term)}
                                showAddForm={handleShowAddForm}
                                disabled={addForm || changeForm ? true : false} />
                        </div>
                        <Route  exact path='/cars' render={(props) => (
                                                    
                            <PostList data={visiblePosts}
                                onDelete={deleteItem}
                                getCar={(id, car) => getCar(id, car)}
                                showChangeForm={handleShowChangeForm}
                            />
                        )} />
                    </>
                    ) : (<>
                        <Route path='/cars/edit/:id' render={(props) => (
                            <ChangeCar
                                carIndex={carIndex}
                                handleChangeCar={(updatedCar) => handleChangeCar(updatedCar)}
                                handleChangeFormClose={() => handleChangeFormClose()}
                                showChangeForm={handleShowChangeForm}
                                car={currentCar}
                            />
                        )} />
                        {console.log('carIndex', carIndex)}
                        {console.log('currentCar', currentCar)}
                    </>
                    ))
                    }
                </Switch>
            </div>

        </Router>

    );
}


export default App;