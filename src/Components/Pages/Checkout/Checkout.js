import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useAuth from '../../../hooks/useAuth';
import Packages from '../LearnerPage/Packages';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe("pk_test_51KD8gqE7WZj5EJtAXOqhPl0yfSFQ8DVzD1UAro2ZnTDK1DEgIlqnoyMmpKNozaEaJ4MIKgOuKauWnJjfJrBiVVh8004P1JDpOs")

const Checkout = () => {
    const { packId } = useParams()
    const [pack, setPack] = useState({})
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    useEffect(() => {
        axios.get(`/packages.json`).then(res => {
            const clickedPack = res.data.find(i => i.id === packId)
            setPack(clickedPack)

        })
    }, [])


    const { register, handleSubmit } = useForm();
    const history = useHistory()

    const { user } = useAuth()

    const handelBack = () => {
        history.push("/");
    };

    const onSubmit = data => {



    };

    return (
        <Container className="my-5 ">
            <div className="d-flex justify-content-start">
                <Button onClick={handelBack} variant="outline-dark" className="mb-4 "> Go Back </Button>

            </div>
            <h2 className='mb-3'>Checkout Information</h2>
            <Row className="g-5">


                {/* booking sec  */}

                <Col xs={12} lg={6} md={6}>


                    <Elements stripe={stripePromise}>
                        <CheckoutForm pack={pack} setError={setError} setSuccess={setSuccess} />
                    </Elements>
                    {error && <small className='text-danger mt-5'>{error}</small>}
                    {
                        success && <p style={{ color: 'green' }}>{success}</p>
                    }
                </Col>


                {/* package info  */}


                <Col className='px-5' xs={12} lg={6} md={6}>

                    <Card style={{ width: '30rem' }}>
                        <Card.Img variant="top" src={pack.img} />
                        <div>
                            <Card.Body>
                                <Card.Title>{pack.title}</Card.Title>
                                <Card.Text>
                                    {pack.info}
                                    <div>
                                        <span style={{ fontSize: '2rem', color: "purple" }} >${pack.price}</span>
                                    </div>
                                </Card.Text>
                                <Link to={`/`}> <button className='action-btn'>Cancel Order</button></Link>
                            </Card.Body>
                        </div>
                    </Card>


                </Col>

            </Row>
        </Container >
    );
};

export default Checkout;