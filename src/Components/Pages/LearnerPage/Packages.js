import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Packages = ({ i }) => {
    return (
        <div>
            <Col>
                <Card style={{ width: '30rem' }}>
                    <Card.Img variant="top" src={i.img} />
                    <div>
                        <Card.Body>
                            <Card.Title>{i.title}</Card.Title>
                            <Card.Text>
                                {i.info}
                                <div>
                                    <span style={{ fontSize: '2rem', color: "purple" }} >${i.price}</span>
                                </div>
                            </Card.Text>
                            <Link to={`/checkout/${i.id}`}> <button className='action-btn'>Buy Now</button></Link>
                        </Card.Body>
                    </div>
                </Card>
            </Col>
        </div>
    );
};

export default Packages;