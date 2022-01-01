import axios from 'axios';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useAuth from '../../../hooks/useAuth';
import HeaderNav from '../Shared/navbar/HeaderNav';

const RiderRegister = () => {
    const [passMatch, setPassmatch] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [nidImg, setNid] = useState(null)
    const [drivingLImg, setDrivingL] = useState(null)
    const [proPic, setProPic] = useState(null)

    const [imgError, setImgError] = useState(false)
    const [proPicError, setProPicError] = useState(false)
    const [drivingLerror, setDrivingLError] = useState(false)
    const history = useHistory();

    const { registerUser, errMess } = useAuth()

    const onSubmit = data => {
        if (data.password !== data.confirmPass) {
            setPassmatch(true)
        }
        if (!nidImg) {
            setImgError(true)
            return
        }
        if (!drivingLImg) {
            setDrivingLError(true)
            return
        }
        if (!proPic) {
            setProPicError(true)
            return
        }



        else {
            setPassmatch(false)
            data.userType = "rider"
            const formData = new FormData()
            formData.append('nid', nidImg)
            formData.append('license', drivingLImg)
            formData.append('profile', proPic)
            for (var key in data) {
                formData.append(key, data[key]);
            }

            // add user to db 
            registerUser(data.email, data.password, data.name, history)
            axios.post('https://calm-fjord-87082.herokuapp.com/add-user', formData).then(res => { console.log(res.data) })

            reset()
        }


    };


    return (
        <div>
            <HeaderNav></HeaderNav>
            <Row>
                <Col xs={12} md={12} lg={8} className='d-flex justify-content-center align-items-center'>
                    <div className=' mt-3'>
                        <h1>Earn with Your Vehicle</h1>
                        <h5 className='mt-3 '>Become a captain, rider or foodman on the highest earning platform!</h5>
                    </div>
                </Col>

                <Col xs={12} md={12} lg={4} >
                    <img className="img-fluid" src="https://i.ibb.co/2YRpgrf/City-driver-pana.png" alt="" />
                </Col>
            </Row>



            <form className=" px-5" onSubmit={handleSubmit(onSubmit)}>
                <Row className='g-4'>
                    <p className="mt-4 mb-3">Fill this form with correct information</p>
                    <Col md={6} xs={12} lg={6}>


                        <input defaultValue={""} placeholder="Full Name" className="w-100 px-2  py-3 rounded-3  border border-secondary border-2" {...register("name", { required: true })} />
                        {errors.name && <small className="text-danger ">*This field is required</small>}


                        <input defaultValue={""} placeholder="email" type="email" className="w-100 px-2 mt-3  py-3 rounded-3 border border-secondary border-2" {...register("email", { required: true })} />
                        {errors.email && <small className="text-danger ">*This field is required</small>}


                        <input defaultValue={""} type="password" placeholder="password" className="w-100 px-2 mt-3  py-3 rounded-3 border border-secondary border-2" {...register("password", { required: true })} />
                        {errors.password && <small className="text-danger ">*This field is required</small>}
                        {passMatch && <small className="text-danger ">*password doesn't match</small>}


                        <input defaultValue={""} type="password" placeholder="retype password" className="w-100 px-2 mt-3  py-3 rounded-3 border border-secondary border-2" {...register("confirmPass", { required: true })} />
                        {errors.confirmPass && <small className="text-danger ">*This field is required</small>}
                        {passMatch && <small className="text-danger ">*password doesn't match</small>}

                        <input defaultValue={""} placeholder="full address.." className="w-100 px-2  py-3 rounded-3 mt-3 border border-secondary border-2" {...register("address", { required: true })} />
                        {errors.address && <small className="text-danger ">*This field is required</small>}

                        <input defaultValue={""} type={'number'} placeholder="phone number" className="w-100 px-2  py-3 rounded-3 mt-3 border border-secondary border-2" {...register("phone", { required: true })} />
                        {errors.address && <small className="text-danger ">*This field is required</small>}

                    </Col>

                    {/* handle images  */}

                    <Col md={6} xs={12} lg={6}>

                        <input defaultValue={""} placeholder="Area" className="w-100 px-2  py-3 rounded-3  border border-secondary border-2" {...register("area", { required: true })} />
                        {errors.area && <small className="text-danger ">*This field is required</small>}

                        <input defaultValue={""} placeholder="Name,Model,Name Palate" className="w-100 mt-3 px-2  py-3 rounded-3  border border-secondary border-2" {...register("carInfo", { required: true })} />
                        {errors.carInfo && <small className="text-danger ">*This field is required</small>}


                        <div style={{ textAlign: 'left' }} className=' mt-5'> <label className='me-4 text-secondary fw-lighter' for="carType">Upload Your NID card</label>
                            <input accept='image/*' type='file' onChange={(e) => setNid(e.target.files[0])} />
                            <div>{imgError && <small className="text-danger ">*This field is required</small>}
                            </div>
                        </div>


                        <div style={{ textAlign: 'left' }} className='mt-5'> <label className='me-3 text-secondary fw-lighter' for="carType">Upload  Driving Liscence</label>
                            <input accept='image/*' type='file' onChange={e => setDrivingL(e.target.files[0])} />
                            <div> {drivingLerror && <small className="text-danger ">*This field is required</small>}</div>
                        </div>

                        <div style={{ textAlign: 'left' }} className='mt-5'> <label className='me-3 text-secondary fw-lighter' for="carType">Upload Your profile picture</label>
                            <input accept='image/*' type='file' onChange={e => setProPic(e.target.files[0])} />
                            <div> {proPicError && <small className="text-danger ">*This field is required</small>}</div>
                        </div>

                        <div style={{ textAlign: 'left' }} className='mt-5'> <label className='me-4 text-secondary fw-lighter' for="carType">What is your vehicle type</label>
                            <select className='px-5 py-1' id="carType" name="carType" {...register("carType", { required: true })}  >
                                <option value="Car">Car</option>
                                <option value="Bike">Bike</option>
                            </select>
                        </div>

                        {errors.carType && <small className="text-danger ">*This field is required</small>}

                    </Col>

                    <div className="my-3"><input className="me-2" type="checkbox" id="subscribeNews" name="subscribe" value="newsletter" />
                        <label for="subscribeNews">Agree with our terms and conditions</label></div>

                    {errMess && <small className="text-danger ">{errMess}</small>}
                    <input className="action-btn w-25 mx-auto " type="submit" value='SignUp' />
                </Row>

            </form>
            <div className="mt-3"><p>Already have a account? <Link to="/login">Login</Link></p></div>



        </div>
    );
};

export default RiderRegister;