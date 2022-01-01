import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { logInUser, errMess } = useAuth()
    const location = useLocation()
    const history = useHistory()

    const onSubmit = data => {
        logInUser(data.email, data.password, location, history)
        reset()
    };

    return (
        <Container fluid>
            <h2 className='mt-4'>Login to <span style={{ color: 'purple' }}>Hero Rider</span></h2>
            <Row className="gy-md-3">

                <Col xs={12} md={12} lg={7} >
                    <img className="img-fluid" src="https://i.ibb.co/Cs0ws33/Navigation-bro.png" alt="" />
                </Col>

                <Col xs={11} md={8} lg={5} className="mx-auto my-auto">
                    <form className="d-flex flex-column justify-content-center align-items-center px-5" onSubmit={handleSubmit(onSubmit)}>
                        <p className="mt-4 mb-3 fw-bold">Fill Your Email And Password</p>



                        <input defaultValue={""} placeholder="email" type="email" className="w-100 px-2 mt-3  py-3 rounded-3 border border-secondary border-2" {...register("email", { required: true })} />
                        {errors.email && <small className="text-danger ">*This field is required</small>}


                        <input defaultValue={""} type="password" placeholder="password" className="w-100 px-2 mt-3  py-3 rounded-3 border border-secondary border-2" {...register("password", { required: true })} />
                        {errors.password && <small className="text-danger ">*This field is required</small>}

                        {errMess && <small className="text-danger ">{errMess}</small>}
                        <input className="action-btn mt-3" type="submit" value='Login' />
                    </form>
                    <div className="mt-3"><p>Don't have a account? <Link to="/#signUp">sign up</Link></p></div>
                </Col>

            </Row>
        </Container>
    );
};

export default Login;