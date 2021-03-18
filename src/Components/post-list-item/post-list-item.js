import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import './post-list-item.css';

const PostListItem = ({ CarModel, Description, PictureLink, ABS, Bluetooth, alarm, buttonWheel,
    carComp, el_window, manhole, navi, parkSensor, onDelete, getCar, index, car }) => {

        PostListItem.propTypes={
            onDelete:propTypes.func.isRequired,
            car : propTypes.object.isRequired,
            getCar : propTypes.func.isRequired,
            showChangeForm :propTypes.func.isRequired,
            index : propTypes.number.isRequired            
        }
        
    return (

        <div className='app-list-item d-flex justify-content-between text-wrap '>

            <div className='p-4'>
                <span className='font-weight-bold'>მოდელი: </span> {CarModel} <br />
                <span className='font-weight-bold'>აღწერა: </span><span> {Description} </span>  <br />
                <span className='font-weight-bold'>სურათის ლინკი: </span><span className="w-3"> {PictureLink} </span>   <br />
                <span className='font-weight-bold'>დამატებითი ოპციები:</span><br />
                {
                    ABS && <span>ABS <br /></span>
                }
                {
                    Bluetooth && <span >Bluetooth  <br /></span>
                }
                {
                    alarm && <span >სიგნალიზაცია <br /></span>
                }
                {
                    buttonWheel && <span >მულტი საჭე  <br /></span>
                }
                {
                    carComp && <span >ბორტ კომპიუტერი <br /></span>
                }
                {
                    el_window && <span >შუშების ელექტრო ამწევი <br /></span>
                }
                {
                    manhole && <span >ლუქი <br /></span>
                }
                {
                    navi && <span >ნავიგაცია <br /></span>
                }
                {
                    parkSensor && <span >პარკინგკონტროლი  <br /></span>
                }

            </div>

            <div className="d-flex justify-content-center align-items-center">
                <Link to='/cars/edit/:id'>
                    <button type="button"
                        className="btn btn-primary "
                        onClick={() => getCar(index, car)}                        
                        >
                        რედაქტირება
                    </button>
                </Link>
                

                <button onClick={onDelete} type="button" className="btn-trash btn-sm">
                    <i className="fa fa-trash-o"></i>
                </button>

            </div>
        </div>
    );
}

export default PostListItem;