import { Subject } from 'rxjs';

// An RxJS Subject can act as both an Observable and an Observer at the same time.
const subject = new Subject();

// Object for initial chat state
// const initialState = {
//     status: '',
//     data: [],
//     newDataCount: 0,
//     error: ''
// };

let initialState = {
    user_email: '',
    auth_token: '',
    id: '',
    vendor_id: ''
};

let state = initialState;

/* We’ll be subscribing our different React Hooks setState functions to our RxJS Subject
so that when it receives any data, it forwards that data to every state associated 
with our setState function.*/

// init() method that will initialize our component’s state whenever it’s mounted

// we appended our message object to our state.data array, then we incremented our newDataCount

const vendorStore = {
    init: () => {
    //   state = {...state, newDataCount: 0}
        state = {...state}
        subject.next(state)
    },
    subscribe: setState => subject.subscribe(setState),
    setVendorDetails: vendor => {
      state = vendor;
      subject.next(state);
    },
    clearVendorDetails: () => {
      state = initialState;
      subject.next(state);
    },
    initialState
  };
  
export default vendorStore;
