import React from 'react'
import { DeleteSubscription } from '../../utils/api'

const Sub = (prop) => {
    const { subscription } = prop
    return (
        <div>
            <li key={subscription._id} className="flex flex-col mt-4 p-8 border-2 border-black rounded-2xl bg-slate-50">
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
            </li>
        </div>
    )
}

export default Sub
