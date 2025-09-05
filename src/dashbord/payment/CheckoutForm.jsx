import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
    const [error, seterror] = useState('')
    const [clientSecret, setclientSecret] = useState('')
    const [transationId, settransationId] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const [cart, refetch] = useCart()
    const { user } = useAuth()
    const navigate=useNavigate()

    const totalPrice = cart?.reduce((total, item) => total + item.price, 0)
    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log('clientSecret', res.data.clientSecret)
                    setclientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card == null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('error', error)
            seterror(error.message)
        } else {
            console.log('paymentMethod', paymentMethod)
            seterror('')
        }

        //confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email
                    }
                }
            }
        )
        if (confirmError) {
            console.log('confirmError')
        } else {
            if (paymentIntent.status == 'succeeded') {
                console.log('transation id', paymentIntent.id)
                settransationId(paymentIntent.id)

                //save the payment info for the databadse
                const payment = {
                    email: user?.email,
                    price: totalPrice,
                    transationId: paymentIntent.id,
                    date: new Date(),
                    cartId: cart.map(item => item._id),
                    menuId: cart.map(item => item.manuId),
                    status: 'pending'
                }
                const res = await axiosSecure.post('/payment', payment)
                refetch()
                   if (res?.data?.paymentResult?.insertedId){
                    Swal.fire({
                        title: "Payment Successfull!",
                        icon: "success",
                        draggable: true
                    });
                    navigate('/dashbord/paymentHistory')
                }

            }

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
                <button className="btn btn-neutral bg-green-500" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                {
                    transationId && <p className="text-green-600">Your transation id: {transationId}</p>
                }
                <p className="text-red-500">{error}</p>
            </form>
        </div>
    )
}
