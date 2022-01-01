import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import HeaderNav from '../Shared/navbar/HeaderNav';
import Packages from './Packages';

const Learner = () => {
    const [pack, setPack] = useState([])
    const [learner, setLearner] = useState({})
    const { user } = useAuth()


    useEffect(() => {
        axios.get(`https://calm-fjord-87082.herokuapp.com/learner/${user.email}`).then(res => setLearner(res.data))
    }, [user])

    useEffect(() => {
        axios.get(`/packages.json`).then(res => setPack(res.data))
    }, [])

    if (!learner) {
        return (<h2 style={{ height: "100vh", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>if you are a learner wait its loading.....</h2>)
    }

    return (
        <div>
            <HeaderNav></HeaderNav>
            <Container className='my-3'>
                <img width="200" className='mx-auto rounded-pill' src={`data:image/png;base64,${learner.profilePic}`} alt="" />
                <h2 className='mt-3'>welcome  <span style={{ color: 'purple' }}>{learner?.name}</span></h2>
                <h4 className='my-3 mb-5'>we have 2 matching packages for you</h4>
                <Row className='gx-4' lg={2} md={2} xs={1}>
                    {
                        pack.map(i => <Packages key={i.id} i={i}></Packages>)
                    }

                </Row>
            </Container>
        </div>
    );
};

export default Learner;