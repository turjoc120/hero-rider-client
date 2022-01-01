import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useAuth from '../../../hooks/useAuth';

import HeaderNav from '../Shared/navbar/HeaderNav';

const LearnerRegister = () => {
    const [passMatch, setPassmatch] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [nidImg, setNid] = useState(null)

    const [proPic, setProPic] = useState(null)

    const [imgError, setImgError] = useState(false)
    const [proPicError, setProPicError] = useState(false)

    const history = useHistory();

    const { registerLearner, errMess } = useAuth()

    const onSubmit = data => {
        if (data.password !== data.confirmPass) {
            setPassmatch(true)
        }
        if (!nidImg) {
            setImgError(true)
            return
        }

        if (!proPic) {
            setProPicError(true)
            return
        }



        else {
            setPassmatch(false)
            data.userType = "learner"
            const formData = new FormData()
            formData.append('nid', nidImg)

            formData.append('profile', proPic)
            for (var key in data) {
                formData.append(key, data[key]);
            }

            // add user to db 
            registerLearner(data.email, data.password, data.name, history)
            axios.post('https://calm-fjord-87082.herokuapp.com/add-learner', formData).then(res => { console.log(res.data) })

            reset()
        }


    };


    return (
        <div>
            <HeaderNav></HeaderNav>

            <div className=' mt-3'>
                <h1>Join as a Driving Lesson Learner.</h1>
                <h5 className='mt-3 '>Become a captain, rider or foodman on the highest earning platform!</h5>
            </div>

            <form className=" px-5" onSubmit={handleSubmit(onSubmit)}>

                <p className="mt-4 mb-3">Fill this form with correct information</p>



                <div className='w-75 mx-auto'>
                    <input defaultValue={""} placeholder="Full Name" className="w-100 px-2  py-3 rounded-3  border border-secondary border-2" {...register("name", { required: true })} />
                    {errors.name && <small className="text-danger ">*This field is required</small>}


                    <input defaultValue={""} placeholder="email" type="email" className="w-100 px-2 mt-3  py-3 rounded-3 border border-secondary border-2" {...register("email", { required: true })} />
                    {errors.email && <small className="text-danger ">*This field is required</small>}

                    <input defaultValue={""} type={'number'} placeholder="age" className="w-100 px-2  py-3 rounded-3 mt-3 border border-secondary border-2" {...register("age", { required: true })} />
                    {errors.address && <small className="text-danger ">*This field is required</small>}

                    <input defaultValue={""} type="password" placeholder="password" className="w-100 px-2 mt-3  py-3 rounded-3 border border-secondary border-2" {...register("password", { required: true })} />
                    {errors.password && <small className="text-danger ">*This field is required</small>}
                    {passMatch && <small className="text-danger ">*password doesn't match</small>}


                    <input defaultValue={""} type="password" placeholder="retype password" className="w-100 px-2 mt-3  py-3 rounded-3 border border-secondary border-2" {...register("confirmPass", { required: true })} />
                    {errors.confirmPass && <small className="text-danger ">*This field is required</small>}
                    {passMatch && <small className="text-danger ">*password doesn't match</small>}

                    <input defaultValue={""} type={'number'} placeholder="phone" className="w-100 px-2  py-3 rounded-3 mt-3 border border-secondary border-2" {...register("phone", { required: true })} />
                    {errors.address && <small className="text-danger ">*This field is required</small>}

                    <input defaultValue={""} placeholder="full address.." className="w-100 px-2  py-3 rounded-3 mt-3 border border-secondary border-2" {...register("address", { required: true })} />
                    {errors.address && <small className="text-danger ">*This field is required</small>}



                    {/* handle images  */}


                    <div style={{ textAlign: 'left' }} className=' mt-5'> <label className='me-4 text-secondary fw-lighter' for="carType">Upload Your NID card</label>
                        <input accept='image/*' type='file' onChange={(e) => setNid(e.target.files[0])} />
                        <div>{imgError && <small className="text-danger ">*This field is required</small>}
                        </div>
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

                </div>


                <div className="my-3"><input className="me-2" type="checkbox" id="subscribeNews" name="subscribe" value="newsletter" />
                    <label for="subscribeNews">Agree with our terms and conditions</label></div>

                {errMess && <small className="text-danger ">{errMess}</small>}
                <input className="action-btn w-25 mx-auto " type="submit" value='SignUp' />


            </form>
            <div className="mt-3"><p>Already have a account? <Link to="/login">Login</Link></p></div>



        </div>
    );
};

export default LearnerRegister;