import useCart from '../../hooks/useCart'
import { FaTrashAlt } from 'react-icons/fa'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Cart() {
    const [cart, refetch] = useCart()
    const [isModal, setIsModal] = useState(false)
    const axiosSecure = useAxiosSecure()
    const totalPrice = cart?.reduce((total, item) => total + item.price, 0)

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res?.data?.deletedCount) {

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"

                            });
                            refetch()
                        }
                    })


            }

        });
    }
    return (
        <div>
            <div className='flex justify-evenly'>
                <div className='text-4xl'>Items:{cart?.length}</div>
                <div className='text-4xl'>Total Price:{totalPrice}</div>
                {
                    cart?.length ? <Link>
                        <button onClick={() => setIsModal(true)} className='btn btn-primary'>Pay</button>
                    </Link> :
                        <button disabled={!cart?.length} className='btn btn-primary'>Pay</button>
                }


            </div>

            {
                isModal && (<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
                        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                        <Link to='/dashbord/stripePayment'> <button className='block btn btn-sm bg-green-500 '>Stripe</button></Link>
                        <Link to='/dashbord/sslcommerzPayment'><button className='block btn btn-sm mt-3 bg-sky-500'>sslcommerz</button></Link>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setIsModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                          
                        </div>

                        {/* Close button (X) */}
                        <button
                            onClick={() => setIsModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            
                        </button>
                    </div>
                </div>)
            }
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>


                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>

                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                cart?.map((item, index) => (
                                    <tr>
                                        <td>
                                            <div>{index + 1}</div>
                                        </td>
                                        <td>
                                            <div className="flex items-center space-x-3">

                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={item?.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>

                                            </div>
                                        </td>
                                        <td>
                                            {item?.name}
                                        </td>
                                        <td>${item?.price} </td>
                                        <th>
                                            <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-lg text-red-500">
                                                <FaTrashAlt></FaTrashAlt>
                                            </button>
                                        </th>
                                    </tr>
                                ))
                            }



                        </tbody>


                    </table>
                </div>
            </div>

        </div>
    )
}
