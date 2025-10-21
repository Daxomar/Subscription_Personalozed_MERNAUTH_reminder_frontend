import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Waveform } from 'ldrs/react'
import 'ldrs/react/Waveform.css'
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import { fetchWithAuth } from "../utils/fetchWithAuth"
import Subs from '../Components/Users && Subscriptions/Subs';
import { CreateSubscription } from '../utils/api';



const Subscription = () => {

  const [searchTerm, setSearchTerm] = useState("");

      const [name, setName] = useState()
      const [price, setPrice] = useState()
      const [currency, setCurrency] = useState()
      const [frequency, setFrequency] = useState()
      const [category, setCategory] = useState()
      const [startDate, setStartDate] = useState()
      const [paymentMethod, setPaymentMethod] = useState()
  
  
  //Instanciating queryClient
  const queryClient = useQueryClient();
     
  
  
  //I created the needed Mutation
   const createMutation = useMutation({
    mutationFn: CreateSubscription, // This should be your POST or PUT function
    onSuccess: () => {
      console.log("✅ Created successfully!");
      // Refetch subscriptions automatically
      queryClient.invalidateQueries(['subscriptions']);
    },
    onError: (error) => {
      console.error("❌ Error creating subscription:", error);
    },
  }); 




// This function will be changed to getAllSubs from api/utils later
  const fetchAllSubs = async () => {
    try {
      // ✅ fetchWithAuth already parses JSON and handles errors internally
      const data = await fetchWithAuth("/subscriptions", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!data.success) {
        toast.error(data.message || "Failed to fetch users");
        throw new Error(data.message || "Failed to fetch users");
      }

      toast.success(data.message);
      console.log("Fetched subscriptions:", data.subscriptions);

      return data.subscriptions; // must return users for React Query
    } catch (error) {
      console.error("Fetch users error:", error.message);
      toast.error(error.message || "Unexpected error");
      throw error; // Let React Query handle retry logic
    }
  };



  //Instanciating useQuery
  const {
    data: allSubsdata = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: fetchAllSubs,
  });

  // filter users based on search term
  const subscriptions = allSubsdata.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // UI states  note to self, I  have to make this more beautiful later
 if (isLoading)
  return (
    <div className="flex justify-center items-center h-screen border-2 border-green-500">
      <Waveform
        size="150"
        stroke="10"
        speed="1"
        color="blue"
      />
    </div>
  );;
  if (isError) return <p>Failed to load users</p>;

  







// This function is what i pass into the form
  const handleSave = async(e) => {
        e.preventDefault();  
        const updateData = {
          name,
          price,
          currency,
          frequency,
          category,
          startDate,
          paymentMethod,
      }

      //gives the data which is updateData to the function in the mutation i created(createMutate)
      createMutation.mutate(updateData);
          // CreateSubscription(updateData)  // parent handles PUT to backend
        console.log("Created Successfully")
      };




  return (
    <div className="flex flex-col flex-1 justify-center items-center border-2">
      <h1>Admin Page - Only Admins can see this</h1>

      <div className="p-0 border-2 flex">
        {/* search input */}
        <div className="flex gap-2 box-border m-8 w-full items-center border-2 justify-between">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-2 border-black rounded-lg w-full h-12"
          />
          <button
            onClick={() => refetch()} // ✅ manual refresh if needed
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Refresh
          </button>
        </div>
      </div>

      <Subs subscriptions={subscriptions} />

      {/* <div className="fab fab-flower m-52">
  <div tabIndex={0} role="button" className="btn btn-circle btn-lg btn-primary">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-6">
      <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
    </svg>
  </div>

  <button className="btn btn-circle btn-lg">📷</button>
  <button className="btn btn-circle btn-lg">🗳️</button>
  <button className="btn btn-circle btn-lg">🖼️</button>
  <button className="btn btn-circle btn-lg">🎙️</button>
</div> */}



      <form onSubmit={handleSave} >
        <input
          type="text"
          placeholder='Subscription Name'
          maxLength={16}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />


         <input
          type="Number"
          placeholder='Subscription Price'
          maxLength={16}
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />


         <input
          type="text"
          placeholder='Subscription Currency'
          maxLength={16}
          required
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />


         <input
          type="text"
          placeholder='Subscription frequency'
          maxLength={16}
          required
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        />



         <input
          type="text"
          placeholder='Subscription Method'
          maxLength={16}
          required
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />



         <input
          type="datet"
          placeholder='Subscription Date'
          maxLength={16}
          required
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />




    
         <input
          type="text"
          placeholder='Subscription Categpry'
          maxLength={16}
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        

        <button >Create Subscription</button>
      </form>




    </div>
  );
};

export default Subscription
