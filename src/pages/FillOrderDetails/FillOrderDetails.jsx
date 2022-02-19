import { useMutation } from "@apollo/client";
import { useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainMenu from "../../components/Elements/MainMenu/MainMenu";
import Switch from "../../components/Elements/Switch/Switch";
import OrderDetails from "../../components/FillOrderDetails/OrderDetails/OrderDetails";
import { CREATE_ORDER } from "../../graphql/mutations";
import companyStore from "../../store/company";
import loadingStore from "../../store/loading";
import orderStore from "../../store/order";
import searchStore from "../../store/search";

export default function FillOrderDetails(){
    const [companyState, setCompanyState] = useState(companyStore.initialState);
    const [searchState, setSearchState] = useState(searchStore.initialState);

    const [priority, setPriority] = useState(false);
    const navigate = useNavigate();
    const placeOrder = '/order_details';
    const [senderDetails, setSenderDetails] = useState({});
    const [receiverDetails, setReceiverDetails] = useState({});

    const [CreateOrder, {data, loading, error}] = useMutation(CREATE_ORDER);

    useLayoutEffect(()=>{
        // Company store subscribe
        companyStore.subscribe(setCompanyState);
        companyStore.init();

        // Search store subscribe
        searchStore.subscribe(setSearchState);
        searchStore.init();
    },[]);

    const handleSenderChanges = (details) => {
        setSenderDetails(details);
    };

    const handleReceiverChanges = (details) => {
        setReceiverDetails(details);
    };

    const handleSubmit = () => {
        loadingStore.setLoading({loading: true});
        const createOrder = {
            // order_id: 'XXX',
            pickup: senderDetails.pickup,
            sender_details: {
                name: senderDetails.name,
                address: senderDetails.address,
                phone: senderDetails.phone,
                state: senderDetails.state,
                pincode: senderDetails.pincode
            },
            receiver_details: {
                name: receiverDetails.name,
                address: receiverDetails.address,
                phone: receiverDetails.phone,
                state: receiverDetails.state,
                pincode: receiverDetails.pincode
            },
            // tracking_no: 'TTT',
            // vendor_id: companyState.vendor_id,
            vendor_name: companyState.name,
            order_type: priority?'Priority':'Normal',
            parcel_type: searchState.type,
            weight: searchState.weight,
            // id: 'III',
            amount: priority?companyState.priority_price:companyState.normal_price,
            source: searchState.source,
            destination: searchState.destination
        };
        const newOrder = {
            sender: JSON.stringify({
                name: senderDetails.name,
                address: senderDetails.address,
                phone: senderDetails.phone,
                state: senderDetails.state,
                pincode: senderDetails.pincode
            }),
            receiver: JSON.stringify({
                name: receiverDetails.name,
                address: receiverDetails.address,
                phone: receiverDetails.phone,
                state: receiverDetails.state,
                pincode: receiverDetails.pincode
            }),
            pickup_date_time: senderDetails.pickup,
            amount: priority?companyState.priority_price:companyState.normal_price,
            vendor_id: '12f57c98-32d4-4370-8a81-0d2fd505076f',
            // vendor_id: companyState.vendor_id,
            weight: searchState.weight,
            type: searchState.type,
            priority: priority?'Priority':'Normal',
            weight_unit: "Kgs",
            destination_city: searchState.destination,
            source_city: searchState.source,
        };
        CreateOrder({
            variables: {
                createOrderInput: newOrder
            }
        }).then(res=>{
            const orderCreated = res.data.CreateOrder;
            createOrder.order_id = orderCreated.ordor_id;
            createOrder.order_no = orderCreated.order_no;
            createOrder.tracking_no = orderCreated.tracking_id;
            createOrder.vendor_id = orderCreated.vendor_id;
            orderStore.setOrder(createOrder, navigate(placeOrder));
        }).catch(err=>{
            console.log(err);
        }).finally(()=>{
            loadingStore.setLoading({loading: false});
        });
    };

    return(
        <div className="bg-red-50 pb-8 pt-4">
            {/* <MainMenu isWhite /> */}
            <div className={(priority?"bg-slate-50":"bg-white") + " py-8 px-12 relative mx-20 shadow-md rounded-xl"}>
                <div className="">
                    <h3 className="text-xl flex-1 text-center text-gray-900 font-medium">Please enter the Sender and Receiver Details</h3>
                </div>
                <div className="absolute right-8 top-8">
                    <Switch priority={priority} onChange={(prior)=>setPriority(prior)} />
                </div>
                <div className="h-0.5 w-80 bg-gray-200 rounded-xl mx-auto mt-4" />
                <div className="flex flex-row mt-8">
                    <div className="mx-12">
                        <OrderDetails isSender onChange={handleSenderChanges} />
                    </div>
                    <div className="w-0.5 bg-gray-300 rounded-xl my-4"></div>
                    <div className="mx-12">
                        <OrderDetails onChange={handleReceiverChanges} />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-1 px-12 mt-8 justify-between">
                        <div className="flex">
                            <p><span className="block text-gray-600 font-normal text-xl text-left">Final Bill</span><span className="text-left text-gray-600 block">(Incl. taxes)</span></p>
                            <span className="ml-4 text-2xl font-medium">Rs.{priority?companyState.priority_price:companyState.normal_price}.00</span>
                        </div>
                    </div>
                    <button onClick={handleSubmit} type="button" className="btn flex-1 w-full mx-auto mt-8 text-center btn-primary font-medium bg-red-500 hover:bg-red-600 rounded-xl text-white py-2">PLACE ORDER</button>
                </div>
            </div>
        </div>
    );
}