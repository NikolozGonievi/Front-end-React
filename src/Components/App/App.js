import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/';
import SearchPanel from '../search-panel/';
import PostList from '../post-list/';
import AddForm from '../add-form';
import ChangeCar from '../edit-form';
import Spinner from '../spinner';

import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from 'react-router-dom';

import './app.css';

const App = () => {

    const [data, setData] = useState([]);
    const [term, setTerm] = useState("");
    const [addForm, setAddForm] = useState(false);
    const [changeForm, setChangeForm] = useState(false);
    const [currentCar, setCurrentCar] = useState(null);
    const [carIndex, setCarIndex] = useState(null);
    const [serverData, setServerData] = useState([]);
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const request = new XMLHttpRequest();
    const status = request.status;


    useEffect(() => {
        request.open("GET", "http://localhost:3004/posts", false);
        request.setRequestHeader("Content-Type", "application/json");
        request.send();
        /* request.onload() */
        let json = JSON.parse(request.responseText);
        setServerData(json);
        responseLoad();
        const data = json;
        setData(data);
        setLoading(false);

    }, []);

    const searchPost = (items, term) => {
        if (term.length === 0) {
            return items
        }
        return items.filter((item) => {
            return item.label.indexOf(term) > -1
        });
    };
    const visiblePosts = searchPost(data, term);

    const onUpdateSearch = (term) => {
        setTerm(term)
    }
    const deleteItem = (id) => {
        console.log("DELETE ID", id);
        request.open("DELETE", `http://localhost:3004/posts/${id}`);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send();
        const status = request.status;
        const index = data.findIndex(elem => elem.id === id);
        const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

        return (setData([...newArr]))
    }

    const handleAddCar = (car) => {
        const newData = [...data, car];
        setData(newData);
    }

    const handleAddFormClose = () => {
        setAddForm(false);
    }

    const handleChangeCar = (updatedCar) => {
        let tempCarArr = data;
        tempCarArr[carIndex] = updatedCar;

        setData([...tempCarArr]);
    }

    const handleChangeFormClose = () => {
        setChangeForm(false);
    }

    const getCar = (curId, car) => {
        setChangeForm(true);
        setCarIndex(curId);
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

    const responseLoad = () => {
        if (request.readyState === 4) {
            var status = request.status;
            if (status === 200) {
                console.log("response text : ", request.responseText);
            } else {
                document.write("server response " + request.statusText);
            }
        }
    }

    return (
        <Router>
            <div className="app">
                {
                    loading ? (
                        <Spinner />
                    ) : (
                        <Switch>

                            {addForm ? (<>
                                <Route path='/cars/new' render={(props) => (
                                    <AddForm close={() => handleAddFormClose()}
                                        handleAddCar={(car) => handleAddCar(car)}
                                        addFormStatus={addForm} />
                                )} />
                            </>
                            ) : (!changeForm ? (<>
                                <Route path='/'>
                                    <Redirect to='/cars' />
                                </Route>
                                <AppHeader />
                                <div className="search-panel  ">
                                    <SearchPanel onUpdateSearch={(term) => onUpdateSearch(term)}
                                        showAddForm={handleShowAddForm}
                                        disabled={addForm || changeForm ? true : false} />
                                </div>
                                <Route exact path='/cars' render={(props) => (
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
                    )
                }

            </div>

        </Router>

    );
}

export default App;