import { LightningElement, api,wire,track } from 'lwc';
import createContact from '@salesforce/apex/createAccountController.createContact';

import createAccount from '@salesforce/apex/createAccountController.createAccount';


import  getDefaultParentAccount from '@salesforce/apex/createAccountController.getDefaultParentAccount';


import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import LeadSource_FIELD from '@salesforce/schema/Contact.LeadSource';


import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import Rating_FIELD from '@salesforce/schema/Account.Rating';
import Type_FIELD from '@salesforce/schema/Account.Type';
import PARENT_FIELD from '@salesforce/schema/Account.ParentId';

import { getRecord } from 'lightning/uiRecordApi';

const CONTACT_PARENT_FIELD = ['Contact.AccountId'];

const FIELDS = ['Account.ParentId'];
import { getListUi } from 'lightning/uiListApi';

export default class NewRecordButton extends LightningElement {

                            @api recordid;
                            @api buttonclick;
                            showAccountModal = false;
                            showContactModal =false
                            demoaction;
                      
                                
                            @api rating;
                            @api accountName;
                            @api type;
                            @api annualRevenue;
                            @api  parentAccount; 
                             value ='';
                      
                            @api contactAccount;
                            @api    LastName;
                            @api   BirthDate;
                            @api   Phone;
                            @api  value;
                            @api  leadsourcePicklist;
                            @api  Email;
                            @api  FirstName;
                            @api  parentAccountId

 accountOptions = [];

    @wire(getListUi, {
        objectApiName: 'Account',
        listViewApiName: 'AllAccounts' // Replace with the appropriate list view name
    })
    wiredAccountData({ error, data }) {
        if (data) {
            this.accountOptions = data.records.records.map(record => ({
                label: record.fields.Name.value,
                value: record.id
            }));
        } else if (error) {
            console.error(error);
        }
    }

    
    
                        handleParentAccountChange(event) {
                            this.parentAccount = event.target.value;
                            console.log(" this.parentAccount---", this.parentAccount);
                        }

                        handleRatingChange(event) {
                            this.rating = event.target.value;
                        }

                        handleAccountNameChange(event) {
                            this.accountName = event.target.value;
                        }

                        handleTypeChange(event) {
                            this.type = event.target.value;
                        }

                        handleAnnualRevenueChange(event) {
                            this.annualRevenue = event.target.value;
                        }



    @wire(getObjectInfo, { objectApiName: CONTACT_OBJECT })
        contactMetadata;
     @wire(getPicklistValues,
        {
            recordTypeId: '$contactMetadata.data.defaultRecordTypeId', 
            fieldApiName: LeadSource_FIELD
        }
    )

    leadsourcePicklist;
     handleChange(event) {
        this.value = event.detail.value;
    }


     @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
     accountMetadata;
     @wire(getPicklistValues,
        {
            recordTypeId: '$accountMetadata.data.defaultRecordTypeId', 
            fieldApiName: Rating_FIELD
        })
    ratingPicklist;

    

    @wire(getPicklistValues,
        {
            recordTypeId: '$accountMetadata.data.defaultRecordTypeId', 
            fieldApiName: Type_FIELD
        })
    typePicklist;


 @wire(getRecord, { recordId: '$recordid', fields: [PARENT_FIELD] })
        wiredAccount({ error, data }) 
        {
            if (data) {
                    this.parentAccount = getFieldValue(data, PARENT_FIELD);
                    console.log(data.fields[PARENT_FIELD].value);
                    //this.parentAccountId = data.fields[PARENT_FIELD].value;
               
            } else if (error) {
               
            }
        }
   @wire(getRecord, { recordId: '$recordid', fields: [CONTACT_PARENT_FIELD] })
    wiredContact({ error, data }) {
        if (data) {
            console.log(data.fields[CONTACT_PARENT_FIELD].value);
            
            
            this.contactAccount = getFieldValue(data, CONTACT_PARENT_FIELD);
           
        } else if (error) {
           
        }
    }




    handleshowModal(event)
        {
    /*getDefaultParentAccount( {parentAccount:this.recordid}  )
           
          
            .then(result => {
               this.parentAccount = result.Name;
                this.contactAccount = result.Name;
                console.log( " this.parentAccount---"+result.Name)
            })
            .catch(error => {
                
            });*/
            
          

           this.demoaction = this.buttonclick;
            if( this.demoaction==='Account')
            {
               
                this.showAccountModal = true;
                console.log('recordid:', this.recordid);



            }
            else if( this.demoaction==='Contact')
            {console.log(this.demoaction);
                this.showContactModal =true;

            
            }
        }

        createAccount()

        { 

              let nameCmp = this.template.querySelector(".nameCls");

                if (!nameCmp.value) {
                        nameCmp.setCustomValidity("Account Name value is required");
                    } else {
                        nameCmp.setCustomValidity(""); 
                    }
                    nameCmp.reportValidity();

                    console.log( nameCmp.reportValidity());
                    if (nameCmp.reportValidity())
                        {

         
          console.log( " this.parentAccount---"+this.parentAccount)


                        createAccount({
                        parentAccount: this.parentAccount,
                        rating: this.rating,
                        accountName: this.accountName,
                        type: this.type,
                        annualRevenue: this.annualRevenue
                         })
                       .then(() => {
                                    const event = new ShowToastEvent({
                                            title: 'Success!',
                                            message: 'Account  created Successfully!',
                                            variant: 'success',
                                            
                                            });
                                         this.dispatchEvent(event);
                        setTimeout(function () 
                        {
                            window.location.reload();
                        }, 500);
                                   })
      
                    .catch(error => {
                        const evt = new ShowToastEvent({
                                    title: 'Toast Error',
                                    message: 'An error occurred while cloning records.',
                                    variant: 'error',
                                    mode: 'dismissable'
                                });
                                this.dispatchEvent(evt);
                                console.error(error);
    
                                })
                                .finally(() => {
                                   
                                });
            }
        }
    
       
       
                        handleAccountChange(event) {
                            this.contactAccount = event.target.value;
                            console.log(" this.contactAccount---", this.contactAccount);
                        }

         

            handleInputChange(event) {
            
                const fieldName = event.target.label;
                const fieldValue = event.target.value;

                
                if (fieldName === 'AccountId') {
                    //this.contactAccount = fieldValue;
                       // console.log("this.contactAccount----",this.contactAccount)
                } else if (fieldName === 'Last Name') {
                    this.LastName = fieldValue;
                }
                else if (fieldName === 'First Name') {
                    this.FirstName = fieldValue;
                } else if (fieldName === 'Birth Date') {
                    this.BirthDate = fieldValue;
                } else if (fieldName === 'Phone') {
                    this.Phone = fieldValue;
                } else if (fieldName === 'Lead Source') {
                    this.value = fieldValue;
                } else if (fieldName === 'Email') {
                    this.Email = fieldValue;
                }
            }





                            
                createContact(event) 
                {
                        const fields = {
                            AccountId: this.contactAccount,
                            LastName: this.LastName,
                            Birthdate: this.BirthDate,
                            Phone: this.Phone,
                            LeadSource: this.value,
                            Email: this.Email,
                            FirstName: this.FirstName };
                    let nameCmp = this.template.querySelector(".lastName");

                if (!nameCmp.value) {
                        nameCmp.setCustomValidity("Last Name value is required");
                    } else {
                        nameCmp.setCustomValidity(""); 
                    }
                    nameCmp.reportValidity();

                    console.log( nameCmp.reportValidity());
                    if (nameCmp.reportValidity())
                        {


                        createContact({ 
                            AccountId: this.contactAccount,
                            lastName: this.LastName,
                            birthDate: this.BirthDate,
                            phone: this.Phone,
                            leadSource: this.value,
                            email: this.Email,
                            firstName: this.FirstName
                        })
                            .then(() => {
                                                    const event = new ShowToastEvent({
                                                            title: 'Success!',
                                                            message: 'Contact created Successfully!',
                                                            variant: 'success',
                                                            
                                                            });
                                                        this.dispatchEvent(event);
                                        setTimeout(function () 
                                        {
                                            window.location.reload();
                                        }, 500);
                                                })
                    
                                    .catch(error => {
                                        const evt = new ShowToastEvent({
                                                    title: 'Toast Error',
                                                    message: error,
                                                    variant: 'error',
                                                    mode: 'dismissable'
                                                });
                                                console.error(error);
                                                this.dispatchEvent(evt);
                                                console.error(error);
                    
                                                })
                                                .finally(() => {
                                                
                                                });
                    }


                }



 





























          handleCancel()
          {
              this.showAccountModal =false;
              const myEvent = new CustomEvent('close', { 
                    detail: { 
                        msg:"Modal Closed Successfully!!"
                    }
                })
                this.dispatchEvent(myEvent)
          }

          handleCancel2()
          {
              this.showContactModal =false;
              const myEvent = new CustomEvent('close', { 
                    detail: { 
                        msg:"Modal Closed Successfully!!"
                    }
                })
                this.dispatchEvent(myEvent)
          }


    

    }

    




















    /*connectedCallback() {
        // Set default parent account value parentAccount
       
          getDefaultParentAccount(
            {parentAccount:this.recordid}
            )
            .then(result => {
                this.parentAccount = result.Name;
                this.AccountName = result.Name;
                console.log( " this.parentAccount---"+this.parentAccount)
            })
            .catch(error => {
                // Handle error if needed
            });
    }*/

    /*
           getDefaultParentAccount( {parentAccount:this.recordid}  )
           
          
            .then(result => {
               this.parentAccount = result.Name;
                this.contactAccount = result.Name;
                console.log( " this.parentAccount---"+this.parentAccount)
            })
            .catch(error => {
                // Handle error if needed
            });
            */