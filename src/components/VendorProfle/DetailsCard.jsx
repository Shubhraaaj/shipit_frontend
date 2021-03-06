import { useEffect, useState } from "react";

export default function DetailsCard({ onUpdate, profile }){
    const [details,setDetails] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':{
                setDetails({ ...details, name: value });
                break;
            }
            case 'phone_number':
                setDetails({ ...details, phone_number: value });
                break;
            case 'email':
                setDetails({ ...details, email: value });
                break;
            case 'address':
                setDetails({ ...details, address: value });
                break;
            case 'website':
                setDetails({ ...details, website: value });
                break;
            case 'priority_factor':
                setDetails({ ...details, priority_factor: value });
                break;
            default:
                break;
        }
        // console.log('here', details);
        // onUpdate(details);
    }; 

    useEffect(()=>{
        if(Object.entries(profile).length>0&&
            profile?.name!==undefined&&
            details?.name===undefined){
                setDetails(profile);
            }
    },[profile]);

    useEffect(()=>{
        onUpdate(details);
    },[details]);

    return(
        <div className="rounded-xl shadow-lg bg-white px-8 py-8">
            <h1 className="text-4xl tracking-tight font-medium text-center text-gray-600 sm:text-5xl md:text-xl">Company Details</h1>
            <input type="text" defaultValue={details?.name} onBlur={handleChange} name="name" className=" mx-auto mt-6 form-control block w-full px-4 py-2 text-base text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-3xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Name of Organization" />
            <div className="flex space-x-4">
                <input type="text" defaultValue={details?.phone_number} onBlur={handleChange} maxLength="10" name="phone_number" className=" mx-auto mt-6 form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-3xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Enter Mobile Number" />
                <input type="text" defaultValue={details?.priority_factor} onBlur={handleChange} name="priority_factor" className=" mx-auto mt-6 form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-3xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Priority" />
            </div>
            <input type="email" defaultValue={details?.email} onBlur={handleChange} name="email" className=" mx-auto mt-6 form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-3xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Enter Email ID" />
            <textarea rows="3" defaultValue={details?.address} onBlur={handleChange} name="address" cols="30" className="mx-auto mt-6 form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-3xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Company Address" />
            <input type="text" defaultValue={details?.website} onBlur={handleChange} name="website" className=" mx-auto mt-6 form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-3xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Enter Website" />
        </div>
    );
}