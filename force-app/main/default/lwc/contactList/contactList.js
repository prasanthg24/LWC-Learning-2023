import { LightningElement, wire, api ,track} from 'lwc';

import getRelatedData from '@salesforce/apex/AccountDetailController.getRelatedData';
const CONTACT_COLUMNS = [ 

    

    { label: 'First Name', fieldName: 'FirstName', type: 'Text'  },

    { label: 'Last Name', fieldName: 'LastName', type: 'Text'  }, 

    { label: 'Birth Date', fieldName: 'Birthdate', type: 'Date' },

    { label: 'Email', fieldName: 'Email' },

    { label: 'Phone', fieldName: 'Phone', type: 'Phone' },

    { label: 'Lead Source', fieldName: 'LeadSource', type: 'Picklist' },
     

    // { label: 'Account Name', fieldName: 'AccountName', type: 'Text'  },

];

export default class ContactList extends LightningElement {
    @api record;
    
    @api recordId; 
    contactColumns = CONTACT_COLUMNS; 
    contactsData; 

     buttonclick = 'Contact';
    //this.recordId =this.record;
    @wire(getRelatedData, { accountId: '$record' }) 
    wiredRelatedData({ error, data })
    { 
        if (data) { 
             
            this.contactsData = data.contacts; 
        } else if (error) { 
          // Handle error 
        } 
    }

        showModal = true
            msg
            clickHandler(){ 
                this.showModal = true
            }
            closeHandler(event){ 

                const myEvent = new CustomEvent('close', { 
            detail: { 
                msg:"Modal Closed Successfully!!"
            }
        })
        this.dispatchEvent(myEvent)
          
            }

}