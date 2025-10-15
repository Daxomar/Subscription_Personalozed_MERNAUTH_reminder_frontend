import React from 'react'
import { DeleteSubscription, UpdateSubscription } from '../../utils/api'
import { useState } from 'react'
import { updateWithAuth } from '../../utils/updateWithAuth'

const Sub = (prop) => {
    const { subscription } = prop




    const [isEditing, setIsEditing] = useState(false);
    const [editedSub, setEditedSub] = useState({ ...subscription });

    const [name, setName] = useState(subscription.name)
    const [price, setPrice] = useState(subscription.price)
    const [currency, setCurrency] = useState(subscription.currency)
    const [frequency, setFrequency] = useState(subscription.frequency)
    const [category, setCategory] = useState(subscription.category)
    const [startDate, setStartDate] = useState(subscription.startDate)
    const [paymentMethod, setPaymentMethod] = useState(subscription.paymentMethod)




    const updateData = {

        name: name,
        price: price,
        currency: currency,
        frequency: frequency,
        category: category,
        startDate: startDate,
        paymentMethod: paymentMethod
    }



    const handleSave = () => {
        UpdateSubscription(subscription._id, updateData)  // parent handles PUT to backend
        setIsEditing(false);
    };
    return (
        <div>
            {/* <li key={subscription._id} className="flex flex-col mt-4 p-8 border-2 border-black rounded-2xl bg-slate-50">
                <div className="text-2xl mb-6 font-bold font-serif border-b-2 pb-4 ">{subscription.name}</div>
                <div className="flex justify-between items-center flex-wrap" >
                    <div>
                        <div>Category: <i className="fa-solid fa-envelope"></i></div>
                        <div className=" font-semibold text-xl">{subscription.category}</div>
                    </div>

                    <div>
                        <div>status</div>
                        <div className=" font-semibold text-xl">{subscription.status}</div>
                    </div>

                    <div>
                        <div>Start-Date</div>
                        <div className=" font-semibold text-xl ">{subscription.startDate}</div>
                    </div>
                    <div>
                        <div>Renewal-Date</div>
                        <div className=" font-semibold text-xl">{subscription.renewalDate}</div>
                    </div>

                    <div>
                        <div>Payment Method</div>
                        <div className=" font-semibold text-xl">{subscription.paymentMethod}</div>
                    </div>

                </div>

                <div className="text-2xl mb-6 font-bold font-serif border-b-2 pb-4 ">{subscription.currency} {subscription.price}</div>
                <button onClick={()=> DeleteSubscription(subscription._id)}>delete</button>
            </li> */}










            <li key={subscription._id} className="flex flex-col mt-4 p-8 border-2 border-black rounded-2xl bg-slate-50">
                <div className="flex justify-between items-center">
                    <div className="text-2xl mb-6 font-bold font-serif border-b-2 pb-4 ">
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={editedSub.name}
                                onChange={(e) => setName(e.target.value)}
                                className="border p-1 rounded"
                            />
                        ) : (
                            editedSub.name
                        )}
                    </div>

                    <div>
                        {isEditing ? (
                            <>
                                <button onClick={handleSave} className="px-3 py-1 bg-green-500 text-white rounded">Save</button>
                                <button onClick={() => {


                                    setName(subscription.name);
                                    setPrice(subscription.price);
                                    setCurrency(subscription.currency);
                                    setFrequency(subscription.frequency);
                                    setCategory(subscription.category);
                                    setStartDate(subscription.startDate);
                                    setPaymentMethod(subscription.paymentMethod);
                                    setIsEditing(false)
                                }} className="px-3 py-1 bg-gray-400 text-white rounded ml-2">Cancel</button>
                            </>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center flex-wrap">
                    <div>
                        <div>Category:</div>
                        {isEditing ? (
                            <input
                                name="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="border p-1 rounded"
                            />
                        ) : (
                            <div className="font-semibold text-xl">{editedSub.category}</div>
                        )}
                    </div>

                    <div>
                        <div>Status:</div>

                        <div className="font-semibold text-xl">{editedSub.status}</div>

                    </div>

                    <div>
                        <div>Start-Date:</div>
                        {isEditing ? (
                            <input
                                type="date"
                                name="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="border p-1 rounded"
                            />
                        ) : (
                            <div className="font-semibold text-xl">{editedSub.startDate}</div>
                        )}
                    </div>

                    <div>
                        <div>Renewal-Date:</div>
                        <div className="font-semibold text-xl">{editedSub.renewalDate}</div>
                    </div>

                    <div>
                        <div>Payment Method:</div>
                        {isEditing ? (
                            <input
                                name="paymentMethod"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="border p-1 rounded"
                            />
                        ) : (
                            <div className="font-semibold text-xl">{editedSub.paymentMethod}</div>
                        )}
                    </div>
                </div>

                <div className="text-2xl mb-6 font-bold font-serif border-b-2 pb-4">
                    {isEditing ? (
                        <>  <div>Amount</div>
                            <input
                                type="number"
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="border p-1 rounded w-24 "
                            />
                            <div>Currency</div>
                            <input
                                name="currency"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="border p-1 rounded w-16 ml-2"
                            />
                        </>
                    ) : (
                        `${editedSub.currency} ${editedSub.price}`
                    )}
                </div>

                <button onClick={() => DeleteSubscription(subscription._id)} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
            </li>




        </div>
    )
}

export default Sub
