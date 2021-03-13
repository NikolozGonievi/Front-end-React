import React from 'react';
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom';



const ChangeCar = (props) => {

    const { register, handleSubmit, setValue } = useForm();
    const history = useHistory();
    const request = new XMLHttpRequest();
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
    console.log('opiat suka index ', props.car.id)
        const onSubmit = data => {
            const updatedData = data
            console.log('editFormCarInde', props.carIndex)
            
            props.handleChangeCar(updatedData)
            console.log('data from editForm', data);
            responseLoad();
            console.log('opiat suka index 2', props.carIndex)
            request.open("PUT", `http://localhost:3004/posts/${props.car.id}`);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
            const json = JSON.stringify(updatedData);
            request.send(json);
            const status = request.status
            console.log("serverStatusEditForm", status)
            props.handleChangeFormClose();
            history.push('/cars')
        }

        return (
            <div className='container filter-form' >

                <h4>მანქანის რედაქტირება</h4>
                <hr />
                <br />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-group'>
                        <label htmlFor='SelectCarModel'>ავტომობილის მოდელი:</label>
                        <select
                            size='1'
                            className='ml-2'
                            name='CarModel'
                            onChange={e => setValue('CarModel', e.target.value)}
                            ref={register}
                            defaultValue={props.car.CarModel}>
                            <option ref={register} value="Audi" >Audi</option>
                            <option ref={register} value="BMW">BMW</option>
                            <option ref={register} value="Mersedes">Mersedes Benz</option>
                            <option ref={register} value="Toyota">Toyota</option>
                            <option ref={register} value="Mitsubishi">Mitsubishi</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='InputDescription'>ავტომობილის აღწერა:</label>
                        <textarea
                            ref={register}
                            name='Description'
                            onChange={e => setValue("Description", e.target.value)}
                            defaultValue={props.car.Description}
                            id='description'
                            className='ml-2'
                            rown='5'
                            cols='80'></textarea>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='InputPictureLink'>დაამატეთ სურათის ლინკი:</label>
                        <input
                            ref={register}
                            onChange={e => setValue("PictureLink", e.target.value)}
                            defaultValue={props.car.PictureLink}
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
                        <input ref={register}
                            type="checkbox"
                            id="ABS"
                            name="ABS"
                            defaultChecked={props.car.ABS}
                            onChange={event => setValue('ABS', event.target.checked)} />
                        <label htmlFor="ABS" className='ml-2'>ABS</label>
                        <br />
                        <input
                            ref={register}
                            type="checkbox"
                            id="el_window"
                            name="el_window"
                            defaultChecked={props.car.el_window}
                            onChange={event => setValue('el_window', event.target.checked)} />
                        <label htmlFor="el_window" className='ml-2'>ელექტრო შუშების ამწევი</label>
                        <br />
                        <input
                            ref={register}
                            type="checkbox"
                            id="manhole"
                            name="manhole"
                            defaultChecked={props.car.manhole}
                            onChange={event => setValue('manhole', event.target.checked)} />
                        <label htmlFor="manhole" className='ml-2'>ლუქი</label>
                        <br />
                        <input
                            ref={register}
                            type="checkbox"
                            id="Bluetooth"
                            name="Bluetooth"
                            defaultChecked={props.car.Bluetooth}
                            onChange={event => setValue('Bluetooth', event.target.checked)} />
                        <label htmlFor="Bluetooth" className='ml-2'>Bluetooth</label>
                        <br />
                        <input
                            ref={register}
                            type="checkbox"
                            id="alarm"
                            name="alarm"
                            defaultChecked={props.car.alarm}
                            onChange={event => setValue('alarm', event.target.checked)} />
                        <label htmlFor="alarm" className='ml-2'>სიგნალიზაცია</label>
                        <br />
                        <input
                            ref={register}
                            type="checkbox"
                            id="parkSensor"
                            name="parkSensor"
                            defaultChecked={props.car.parkSensor}
                            onChange={event => setValue('parkSensor', event.target.checked)} />
                        <label htmlFor="parkSensor" className='ml-2'>პარკინგკონტროლი</label>
                        <br />
                        <input
                            ref={register}
                            type="checkbox"
                            id="navi"
                            name="navi"
                            defaultChecked={props.car.navi}
                            onChange={event => setValue('navi', event.target.checked)} />
                        <label htmlFor="navi" className='ml-2'>ნავიგაცია</label>
                        <br />
                        <input
                            ref={register}
                            type="checkbox"
                            id="carComp"
                            name="carComp"
                            defaultChecked={props.car.carComp}
                            onChange={event => setValue('carComp', event.target.checked)} />
                        <label htmlFor="carComp" className='ml-2'>ბორტკომპიუტერი</label>
                        <br />
                        <input
                            ref={register}
                            type="checkbox"
                            id="buttonWheel"
                            name="buttonWheel"
                            defaultChecked={props.car.buttonWheel}
                            onChange={event => setValue('buttonWheel', event.target.checked)} />
                        <label htmlFor="buttonWheel" className='ml-2'>მულტი საჭე</label>
                        <br />

                    </div>
                    <button
                        id="addButton"
                        type='submit'
                        className='btn btn-primary mr-1 '
                    >
                        რედაქტირება
                    </button>

                    <Link to='/cars'>
                        <button
                            type='button'
                            className='btn btn-secondary '
                            onClick={() => props.handleChangeFormClose()}
                        >
                            დახურვა
                    </button>
                    </Link>

                </form>
            </div>
        )
    }

export default ChangeCar;