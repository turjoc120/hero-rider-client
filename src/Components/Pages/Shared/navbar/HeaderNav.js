import React, { useEffect } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './HeaderNav.css'
import useAuth from '../../../../hooks/useAuth';


const HeaderNav = () => {
    const { user, logOut } = useAuth();



    return (
        <Navbar bg="transparent" expand="lg" >
            <Container >
                <Navbar.Brand as={Link} to="/home" className='d-flex'><img src="https://i.ibb.co/x8XtZhd/logo.png" width='50' height="50" alt="" /><div className='brand'><span className='brand-one'>HERO</span><span className='brand-two'>RIDER</span></div></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="ms-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} to='/home' >Home</Nav.Link>


                        {user?.displayName &&
                            <><Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                                <Nav.Link as={Link} to="/learner-page">Packages</Nav.Link>

                            </>}

                        {!user?.email && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                        {!user?.email && <Nav.Link as={HashLink} to="/#signUp">SignUp</Nav.Link>}
                    </Nav>
                    {user?.email && <Nav.Link as={Link} to="/">{user?.displayName}</Nav.Link>}

                    {user?.email && <button onClick={logOut} className=" action-btn" >logOut</button>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default HeaderNav;