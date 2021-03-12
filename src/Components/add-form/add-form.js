import React, {useState}from 'react';
import * as db from '../data/data';
import { useForm } from 'react-hook-form'


import './post-add-form.css';

const AddForm = (props) => {

    const [myValue, setVal] = useState([]);

    const { register, handleSubmit, setValue, errors } = useForm();


    const onSubmit = data => {
        //  db.addCar({ id: Date.now(), ...data })
        //  props.handleAddCar({ id: Date.now(), ...data })
        console.log(data);
        props.close();
    }

    const handleCheckBoxChange = (e)=>{
        const target = e.target;
        const value = target.type ==='checkbox' ? target.checked :target.value;
        const name = target.name;
        setVal(name);
    }

    return (

        <div className='container filter-form'>
            <h4>კონტაქტის დამატება</h4>
            <hr />
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-group'>
                    <label htmlFor='SelectCarModel'>ავტომობილის მოდელი:</label>
                    <select 
                        size='1' 
                        className='ml-2'
                        onChange={e=>setValue('CarModel', e.target.value) }>
                        <option value="Audi" >Audi</option>
                        <option value="BMW">BMW</option>
                        <option value="Mersedes">Mersedes Benz</option>
                        <option value="Toyota">Toyota</option>
                        <option value="Mitsubishi">Mitsubishi</option>
                    </select>
                </div>

                <div className='form-group'>
                    <label htmlFor='InputDescription'>ავტომობილის აღწერა:</label>
                    <textarea
                        name = 'Description'
                        onChange={e => setValue("Description", e.target.value)}                        
                        id='description'
                        className='ml-2'                        
                        rown='5'
                        cols='80'></textarea>
                </div>

                <div className='form-group'>
                    <label htmlFor='InputPictureLink'>დაამატეთ სურათის ლინკი:</label>
                    <input
                        onChange={e => setValue("PictureLink", e.target.value)}
                        type='text'
                        className='form-control'
                        id='InputPictureLink'
                        placeholder='https://'
                        name='PictureLink'
                        
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='CheckBoxoptions'
                        className='d-block'>აირჩიეთ მანქანის მახასიათებლები:</label>
                    <input type="checkbox" id="ABS" name="ABS" onChange={event=>setValue('ABS', event.target.checked)} />
                    <label htmlFor="ABS" className='ml-2'>ABS</label>
                    <br />
                    <input type="checkbox" id="el_window" name="el_window"  onChange={event=>setValue('el_window', event.target.checked)} />
                    <label htmlFor="el_window" className='ml-2'>ელექტრო შუშების ამწევი</label>
                    <br />
                    <input type="checkbox" id="manhole" name="manhole"  onChange={event=>setValue('manhole', event.target.checked)} />
                    <label htmlFor="manhole" className='ml-2'>ლუქი</label>
                    <br />
                    <input type="checkbox" id="Bluetooth" name="Bluetooth" onChange={event=>setValue('Bluetooth', event.target.checked)} />
                    <label htmlFor="Bluetooth" className='ml-2'>Bluetooth</label>
                    <br />
                    <input type="checkbox" id="alarm" name="alarm" onChange={event=>setValue('alarm', event.target.checked)} />
                    <label htmlFor="alarm" className='ml-2'>სიგნალიზაცია</label>
                    <br />
                    <input type="checkbox" id="parkSensor" name="parkSensor" onChange={event=>setValue('parkSensor', event.target.checked)} />
                    <label htmlFor="parkSensor" className='ml-2'>პარკინგკონტროლი</label>
                    <br />
                    <input type="checkbox" id="navi" name="navi" onChange={event=>setValue('navi', event.target.checked)} />
                    <label htmlFor="navi" className='ml-2'>ნავიგაცია</label>
                    <br />
                    <input type="checkbox" id="carComp" name="carComp" onChange={event=>setValue('carComp', event.target.checked)} />
                    <label htmlFor="carComp" className='ml-2'>ბორტკომპიუტერი</label>
                    <br />
                    <input type="checkbox" id="buttonWheel" name="buttonWheel" onChange={event=>setValue('buttonWheel', event.target.checked)} />
                    <label htmlFor="buttonWheel" className='ml-2'>მულტი საჭე</label>
                    <br />

                </div>

                <button
                    id="addButton"
                    type='submit'
                    className='btn btn-primary mr-1 '
                >
                    დამატება
                        </button>
                <button
                    type='button'
                    className='btn btn-secondary '
                    onClick={() => props.close()}
                >
                    დახურვა
                </button>
            </form>
        </div>

    );
}

export default AddForm;