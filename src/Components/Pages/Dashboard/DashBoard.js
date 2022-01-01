
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import HeaderNav from '../Shared/navbar/HeaderNav';

const DashBoard = () => {
    const [rider, setRider] = useState({})
    const { user } = useAuth()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();


    useEffect(() => {
        axios.get(`https://calm-fjord-87082.herokuapp.com/user/${user.email}`).then(res => setRider(res.data))
    }, [user])


    const onSubmit = (data) => {
        console.log(data);

    }

    if (!rider) {
        return (<h3 style={{ height: "100vh", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>If you are a rider wait its Loading...</h3>)
    }

    return (
        <div>
            <HeaderNav></HeaderNav>

            <Container>
                <img width="200" className='mx-auto rounded-pill' src={`data:image/png;base64,${rider.profilePic}`} alt="" />
                <h2 className='my-3'>Welcome To Dashboard <span style={{ color: 'purple' }}>{rider.name}</span></h2>
                <Row className='my-3'>
                    <Col lg={6} md={6} xs={11}>
                        <p>Your National Id Card</p>
                        <img className='w-50' src={`data:image/png;base64,${rider?.nidPic}`} alt="" />
                    </Col>
                    <Col lg={6} md={6} xs={11}>
                        <p>Your Driving License</p>
                        <img className='w-50' src={`data:image/png;base64,${rider?.licensePic}`} alt="" />
                    </Col>
                </Row>

                <form className=" px-5" onSubmit={handleSubmit(onSubmit)}>

                    <p className="mt-4 mb-3">You can update your information</p>



                    <input defaultValue={rider?.name} placeholder="Full Name" className="w-100 px-2  py-3 rounded-3  border border-secondary border-2" />



                    <input defaultValue={rider?.email} placeholder="email" type="email" className="w-100 px-2 mt-3  py-3 rounded-3 border border-secondary border-2" />



                    <input defaultValue={"*******"} type="password" placeholder="password" className="w-100 px-2 mt-3  py-3 rounded-3 border border-secondary border-2" {...register("password", { required: true })} />


                    <input defaultValue={"********"} type="password" placeholder="retype password" className="w-100 px-2 mt-3  py-3 rounded-3 border border-secondary border-2" {...register("confirmPass", { required: true })} />


                    <input defaultValue={rider?.address} placeholder="full address.." className="w-100 px-2  py-3 rounded-3 mt-3 border border-secondary border-2" {...register("address", { required: true })} />

                    <input defaultValue={rider?.phone} type={'number'} placeholder="phone number" className="w-100 px-2  py-3 rounded-3 mt-3 border border-secondary border-2" {...register("phone", { required: true })} />




                    {/* handle images  */}



                    <input defaultValue={rider?.area} placeholder="Area" className="w-100 px-2 mt-3 py-3 rounded-3  border border-secondary border-2" {...register("area", { required: true })} />


                    <input defaultValue={rider?.carInfo} placeholder="Name,Model,Name Palate" className="w-100 mt-3 px-2  py-3 rounded-3  border border-secondary border-2" {...register("carInfo", { required: true })} />



                    <div style={{ textAlign: 'left' }} className='mt-5'> <label className='me-4 text-secondary fw-lighter' for="carType">What is your vehicle type</label>
                        <select className='px-5 py-1' id="carType" name="carType" {...register("carType", { required: true })}  >
                            <option value="Car">Car</option>
                            <option value="Bike">Bike</option>
                        </select>
                    </div>




                    <div className="my-3"><input className="me-2" type="checkbox" id="subscribeNews" name="subscribe" value="newsletter" />
                        <label for="subscribeNews">I Confirm To Update My Information</label></div>


                    <input className="action-btn w-25 mx-auto mb-5 " type="submit" value='Update Info' />


                </form>
            </Container>
        </div>
    );
};

export default DashBoard;