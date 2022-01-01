import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { Spinner } from 'react-bootstrap';

const CheckoutForm = ({ pack, setError, setSuccess }) => {
    const { price } = pack
    const stripe = useStripe()
    const elements = useElements()
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false);

    const { user } = useAuth()

    useEffect(() => {
        axios.post('https://calm-fjord-87082.herokuapp.com/create-payment-intent', pack.price).then(res => setClientSecret(res.data.clientSecret));
    }, [price]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }
        setProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setSuccess('')
            setError(error.message)
        } else {
            setError("")
            console.log('[PaymentMethod]', paymentMethod);

        }

        // payment 
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    },
                },
            },
        );
        if (intentError) {
            setError(intentError.message);
            setSuccess('');
        } else {
            setError('')
            setSuccess('Your payment processed successfully.')
            setProcessing(false);
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='action-btn' type="submit" disabled={!stripe}>
                    Pay ${pack.price}
                </button>
                {/* {processing ? <Spinner animation="border" role="status"> </Spinner>

                    :  */}
            </form>
        </div>
    );
};

export default CheckoutForm;