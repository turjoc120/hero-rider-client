import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HeaderNav from '../Shared/navbar/HeaderNav';

const Home = () => {
    const inconStyle = {
        backgroundColor: "purple",
        borderRadius: '50%',
        marginBottom: '20px',

    }

    return (
        <div>
            <HeaderNav></HeaderNav>
            <Container>
                <Row>
                    <Col xs={12} lg={6} md={6} className='d-flex justify-content-center align-items-center'>
                        <div><h1 className='herohead'>Let's Go To <br /> Your Destination </h1>
                            <Button variant='outline-dark' className='px-4 py-3 mt-3'>Sign Up Now!</Button></div>
                    </Col>
                    <Col xs={12} lg={6} md={6}>
                        <img className='img-fuild' src="https://image.freepik.com/free-vector/carsharing-service-abstract-concept-illustration-rental-service-short-term-rent-carsharing-application-ride-application-hiring-car-peer-peer-hourly-payment_335657-379.jpg" alt="" />
                    </Col>

                </Row>

                <div style={{ marginBottom: "100px" }} id="signUp">
                    <Row>
                        <Col md={6} lg={6} xs={12}>
                            <img width="100" src="https://image.flaticon.com/icons/png/512/1185/1185522.png" alt="" />
                            <h4 className='my-3'>Join as A <span style={{ color: 'purple' }}>Rider</span></h4>
                            <Link to="/rider-signup">
                                <button className='action-btn' >
                                    Sign Up Now
                                </button>
                            </Link>
                        </Col>
                        <Col md={6} lg={6} xs={12}>
                            <img width="100" src="https://image.flaticon.com/icons/png/512/1202/1202353.png" alt="" />
                            <h4 className='my-3'>Join as A <span style={{ color: 'purple' }}>Learner </span></h4>
                            <Link to="/learner-signup">
                                <button className='action-btn' >
                                    Sign Up Now
                                </button>
                            </Link>
                        </Col>
                    </Row>
                </div>

                <div className='my-5'>
                    <Row className='gx-5'>
                        <Col xs={11} lg={3} md={2}> <div>
                            <img className='img-fuild ' style={inconStyle} src="https://www.ridesharing.com/images/icone/Pouce_Accueil.png" alt="" />
                            <h5>Sign up for free</h5>
                            <p>Drivers and passengers don’t pay any registration or membership fee</p>
                        </div>
                        </Col>
                        <Col xs={11} lg={3} md={2}> <div>
                            <img className='img-fuild' style={inconStyle} src="https://www.ridesharing.com/images/icone/Car_Accueil.png" alt="" />
                            <h5>Learn Driving Fast</h5>
                            <p>You can learn as a complete noob or improve your skills here with our help</p>
                        </div>
                        </Col>
                        <Col xs={11} lg={3} md={2}> <div>
                            <img className='img-fuild' style={inconStyle} src="https://www.ridesharing.com/images/icone/Pin_Accueil.png" alt="" />
                            <h5>Get Home fast</h5>
                            <p>Drivers have full responsibility of passengers to get them to their destination fast</p>
                        </div>
                        </Col>

                        <Col xs={11} lg={3} md={2}> <div>
                            <img className='img-fuild' style={inconStyle} src="https://www.ridesharing.com/images/icone/Credit_Accueil.png" alt="" />
                            <h5>Online payment</h5>
                            <p>Book and pay your seat online for long distance rides</p>
                        </div>
                        </Col>

                    </Row>
                </div >

            </Container >
        </div >
    );
};

export default Home;