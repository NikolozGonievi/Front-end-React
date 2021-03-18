/*
   !!!!!!!!!! json-server აუცილებლად უნდა იყოს 3004-ე პორტზე 
        შესაბამისი ბრძანება : json-server --watch src/Components/data/db.json --port 3004
*/

import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/';
import SearchPanel from '../search-panel/';
import PostList from '../post-list/';
import AddForm from '../add-form';
import ChangeCar from '../edit-form';
import Spinner from '../spinner';

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import './app.css';

const App = () => {

    // კომპონენტის state : 
    const [data, setData] = useState([]);
    const [term, setTerm] = useState("");
    const [addForm, setAddForm] = useState(false);
    const [changeForm, setChangeForm] = useState(false);
    const [currentCar, setCurrentCar] = useState(null);
    const [carIndex, setCarIndex] = useState(null);
    const [serverData, setServerData] = useState([]);
    const [loading, setLoading] = useState(true);

    const request = new XMLHttpRequest();


    /*
    useEffect()-ში სრულდება მონაცემების წამოღება სერვერიდან 
    და მათი ჩაწერა კომპონენტის state-ში.
    მანამ სანამ state არ მიიღებს მონაცემებს გვერდძე იტრიალებს სპინერი 
    */
    useEffect(() => {
        request.open("GET", "http://localhost:3004/posts", false);
        request.setRequestHeader("Content-Type", "application/json");
        request.send();
        let json = JSON.parse(request.responseText);
        setServerData(json);
        responseLoad();
        const data = json;
        setData(data);
        setLoading(false);

    }, []);

    //კომპონენტში გამოყენებული ფუნქციები : 
    /*
        წაშლის ფუნქცია - მონაცემი იშლება როგორც ბაზიდან, ასევე state-დან
        ფუნქცია პარამეტრად იღებს წასაშლელი ელემენტის id-ს
     */
    const deleteItem = (id) => {
        
        request.open("DELETE", `http://localhost:3004/posts/${id}`);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send();
        const index = data.findIndex(elem => elem.id === id);
        const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

        return (setData([...newArr]))
    }
    /*
        ფუნქცია პარამეტრად იღებს PostList კომპონენტში არჩეულ მანქანას(ობიექტს)
        და მის id-ს
     */
    const getCar = (curId, car) => {
        setChangeForm(true);
        setCarIndex(curId);
        setCurrentCar(car);
        if (addForm) {
            setAddForm(false);
        }
    }
    /*
    ფუნქცია ამოწმებს სერვერის სტატუს და შესაბამის ინფორმაციას გვიწერს კონსოლში 
    */
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
    /*
    state-ში ახალი მანქანის დამატება
     */
    const handleAddCar = (car) => {
        const newData = [...data, car];
        setData(newData);
    }
    /*
        ფუნქცია "ხურავს" მანქანის დამატების ფორმას
    */
    const handleAddFormClose = () => {
        setAddForm(false);
    }
    /*
    ფუნქცია ცვლის state-ში არსებულ მანქანას 
    */
    const handleChangeCar = (updatedCar) => {
        let tempCarArr = data;
        tempCarArr[carIndex] = updatedCar;
        setData([...tempCarArr]);
    }
    /*
    ფუნქცია "ხურავს" მანქანის რედაქტირების ფორმას 
     */
    const handleChangeFormClose = () => {
        setChangeForm(false);
    }
    /*
     შემდეგი 2 ფუნქცია ფუნქცია ამოწმებენ რომელი ფორმა გვჭირდება 
     და ცვლიან შესაბამის პარამეტრს state-ში
     */
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
                                    />
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
                                <Route path="/cars/edit/:id" render={(props) => (
                                    <ChangeCar
                                        carIndex={carIndex}
                                        handleChangeCar={(updatedCar) => handleChangeCar(updatedCar)}
                                        handleChangeFormClose={() => handleChangeFormClose()}
                                        showChangeForm={handleShowChangeForm}
                                        car={currentCar}
                                    />
                                )} />
                               
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