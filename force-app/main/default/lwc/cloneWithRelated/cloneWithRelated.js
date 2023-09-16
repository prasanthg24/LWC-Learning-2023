import { LightningElement, track, api  } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import cloneAccountWithRelated from '@salesforce/apex/AccountCloneWithRelatedController.cloneAccountWithRelated';
//import LightningConfirm from "lightning/confirm";
export default class CloneWithRelated extends LightningElement 
{
    @api recordId;
    @track shouldCloneContact = false;
    @track shouldCloneOpportunity = false;
    @track displayConfirmationModal = true;
    @track displayConfirmationMessageModal = false;
    @track displayToast = false;
    @track toastMessage;
    @track toastClass;

    handleClone() {
        this.displayConfirmationModal = true;
    }

    handleCancel() {
        var url = window.location.href;
        var value = url.substr(0,url.lastIndexOf('/') + 1);
        window.history.back();
        return false;
    }


    handleCheckboxChange(event) {
    const { label, checked } = event.target;
    if (label === 'Contact') {
        this.shouldCloneContact = checked;
    } else if (label === 'Opportunity') {
        this.shouldCloneOpportunity = checked;
    }
}


    handleConfirmation() 
    {
        this.displayConfirmationModal = false;
        this.displayConfirmationMessageModal = true;
    }

    handleConfirmationCancel() 
    {
        this.displayConfirmationMessageModal = false;
        var url = window.location.href;
        var value = url.substr(0,url.lastIndexOf('/') + 1);
        window.history.back();
        return false;
    }

    performClone() {
        this.displayConfirmationMessageModal = false;
        cloneAccountWithRelated({
            accountId: this.recordId,
            shouldCloneContact: this.shouldCloneContact,
            shouldCloneOpportunity: this.shouldCloneOpportunity })
            .then( clonedAccountId => {
                console.log(clonedAccountId);
                const clonedAccountUrl = `/lightning/r/Account/${clonedAccountId}/view`;
                console.log(clonedAccountUrl);
                    const event = new ShowToastEvent({
                    title: 'Success!',
                    message: 'Record {0} created! See it {1}!',
                    variant: 'success',
                    messageData: [
                        'cloned',
                        {
                        url: `/lightning/r/Account/${clonedAccountId}/view`,
                        label: 'Click Here',
                        },
                    ],
                    });
                    this.dispatchEvent(event);
                setTimeout(function () 
                {
                    window.location.reload();
                    var url = window.location.href;
                    var value = url.substr(0,url.lastIndexOf('/') + 1);
                    window.history.back();
                    return false;
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
                this.displayToast = true;
            });
    }
    
}