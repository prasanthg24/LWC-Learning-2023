import { LightningElement, track, wire,api } from 'lwc';
import { initialize } from 'c/reduxActions';
import { getContactList } from 'c/reduxActions';

import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/redux';

export default class ContactList extends LightningElement {
    @api contacts = [];

    @wire(CurrentPageReference)
    pageRef;

    connectedCallback() {
        // const reduxStateUpdated = new CustomEvent('reduxStateUpdated');
        // document.dispatchEvent(reduxStateUpdated);
        registerListener('reduxStateUpdated', this.handleReduxStateUpdate, this);
      
      
    }


    handleReduxStateUpdate(event) {
        const state = event.detail;
        console.log('state---', state);

        if (state && state.contactList) {
             let dataEditing = JSON.parse(JSON.stringify(state.contactList));
            this.contacts = dataEditing;
        }
        console.log('this.contacts---', this.contacts);
        console.log('state.contactList--', state.contactList);
    }

    handleClick() {
        
        // Dispatch the Redux action to fetch contact list
    
        initialize()(this.pageRef)
            .then(() => {

               console.log('this.pageRef---',this.pageRef);
                // const reduxStateUpdated = new CustomEvent('reduxStateUpdated');
                // document.dispatchEvent(reduxStateUpdated);
            })
            .catch(error => {
                console.error('Error occurred during initialization', error);
            });
        
 //fireEvent(this.pageRef, 'reduxStateUpdated', this.pageRef);


 getContactList()
            .then(result => {
                // Handle the result data here, such as updating component properties or firing an event.
                // For example, you can assign the result to a tracked property for rendering in the template.
                this.contacts = result;
console.log('getContactList()');
                // Alternatively, you can fire a custom event with the result data.
                const event = new CustomEvent('resultobtained', {
                    detail: { contacts: result }
                });
                this.dispatchEvent(event);
            })
            .catch(error => {
                // Handle the error here, such as displaying an error message.
                console.error(error);
            });
        
    }
}













    // disconnectedCallback(a) {
    //     unregisterAllListeners(this);
    // }










// import { LightningElement, track, wire } from 'lwc';
// import { getRecord } from 'lightning/uiRecordApi';
// import { initialize } from 'c/reduxActions'; // Import your Redux action

// // Redux store imports
// import { CurrentPageReference } from 'lightning/navigation';
// import { registerListener, unregisterAllListeners } from 'c/redux';

// export default class ContactList extends LightningElement {
//     @track contacts = [];

//     @wire(CurrentPageReference)
//     pageRef;

//     // connectedCallback() {
//     //     registerListener('reduxStateUpdated', this.handleReduxStateUpdate, this);

//     // }

//   connectedCallback() {
//     registerListener('reduxStateUpdated', this.handleReduxStateUpdate);
    
//     console.log('Im in connected callback method');
// }


//     disconnectedCallback() {
//         unregisterAllListeners(this);
//     }

//     handleReduxStateUpdate() {
//         alert('Called')
//         console.log('Im in c handleReduxStateUpdate method')
//         const state = JSON.parse(sessionStorage.getItem('reduxState'));
//         console.log('state---',state);

//         if (state && state.contactList) {
//             this.contacts = state.contactList;
//         }
//         console.log(' this.contacts---', this.contacts);
//            console.log(' state.contactLis--', state.contactList);
//     }

//     handleClick() {
//         // Dispatch the Redux action to fetch contact list
//         initialize()(this.pageRef);
//          registerListener('reduxStateUpdated', this.handleReduxStateUpdate);
        
//     }
// }