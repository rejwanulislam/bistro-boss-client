import React from 'react'
import useAuth from '../../hooks/useAuth'
import useCart from '../../hooks/useCart'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import useAxiosPublick from '../../hooks/useAxiosPublick'

export default function SslcommerzPayment() {
    const {user}=useAuth()
    const [cart]=useCart()
    const axiosSecure=useAxiosSecure()
    const axiosPublick=useAxiosPublick()
        const totalPrice = cart?.reduce((total, item) => total + item.price, 0)

    console.log(cart)
    console.log(totalPrice)
    const handleCreactPayment=async(e)=>{
        e.preventDefault()
        const paymentData={
            name:user?.displayName,
            email:user?.email,
            price:totalPrice,
            date:new Date(),
            transationId:"",
            cartId:cart?.map(item=>item?._id),
            menuId:cart?.map(item=>item?.manuId),
            status:'pending'

        }
      const {data}=await axiosSecure.post('/crect-ssl-payment',paymentData)    
          console.log(data)
          if(data?.GatewayPageURL){
            window.location.replace(data?.GatewayPageURL)
          }
    }
  return (
    <div>
<div className=" flex items-center justify-center w-full bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full ">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Payment
        </h2>

        <form onSubmit={handleCreactPayment} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={user?.email}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pay Now Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}
