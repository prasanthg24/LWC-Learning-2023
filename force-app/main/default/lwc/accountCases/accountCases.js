import { LightningElement, wire, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getAccountCases from '@salesforce/apex/AccountCasesController.getAccountCases';


const columns = [

    { label: 'Case Number', fieldName: 'CaseNumber', type: 'url', sortable: true,
        typeAttributes: {
            label: { fieldName: 'CaseNumber' },
            target: '_blank'
        },
        typeAttributes: {
            label: { fieldName: 'CaseNumber' },
            target: '_blank'
        },
        type: 'button',
        typeAttributes: { 
            label: { fieldName: 'CaseNumber' },
            variant: 'base'
        },
        sortable: true
    },
    { label: 'Subject', fieldName: 'Subject', type: 'text', sortable: true },
    { label: 'Date Last Modified', fieldName: 'LastModifiedDate', type: 'date', sortable: true ,
        typeAttributes: {
            value: 
            { 
                fieldName: 'CreatedDate' 
            },
            dateStyle: 'short',
            month: '2-digit',
            day: '2-digit',
            year: '2-digit'
        }
    },
    { label: 'Status', fieldName: 'Status__c', type: 'text', sortable: true },
    { label: 'Case Reason', fieldName: 'Reason', type: 'text', sortable: true },
        { 
        label: 'Date/Time Opened', 
        fieldName: 'CreatedDate', 
        type: 'date', 
        sortable: true,
        typeAttributes: {
            value: { 
                fieldName: 'CreatedDate' 
            },
            dateStyle: 'short',
            month: '2-digit',
            day: '2-digit',
            year: '2-digit'
        }
    }
];

export default class AccountCases extends NavigationMixin(LightningElement) 
{
    @api recordId;
    @track cases;
    defaultSortField = 'CreatedDate';
    defaultSortDirection = 'desc';

    @wire(getAccountCases, { accountId: '$recordId' })
    wiredCases({ error, data }) {
        if (data) {
            this.cases = data;
        } else if (error) {
            // Handle error
        }
    }

    handleCaseNumberClick(event) {
        const caseId = event.detail.row.Id;
        
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__recordPage',
            attributes: {
                recordId: caseId,
                actionName: 'view',
            },
        }).then(url => {
            window.open(url, '_blank');
        });
    }
    
    get columns() {
        return columns;
    }

handleSortData(event) {
    const { fieldName } = event.detail;
    const casesCopy = JSON.parse(JSON.stringify(this.cases));
    let sortedCases;

    if (this.sortedBy === fieldName) {
        // Clicked the same column twice, toggle sort direction
        sortedCases = casesCopy.reverse();
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        // Clicked a different column, sort in ascending order
        sortedCases = casesCopy.sort((a, b) => {
            let valueA = a[fieldName] || '';
            let valueB = b[fieldName] || '';
            if (fieldName === 'CreatedDate' || fieldName === 'LastModifiedDate') {
                valueA = new Date(valueA);
                valueB = new Date(valueB);
                return valueA - valueB;
            } else {
                if (valueA > valueB) {
                    return 1;
                } else if (valueA < valueB) {
                    return -1;
                }
            }
            return 0;
        });
        this.sortDirection = 'asc';
    }

    this.sortedBy = fieldName;
    this.cases = sortedCases;
}


 /*   handleSortData(event) {
        const { fieldName, sortDirection } = event.detail;  
        const casesCopy = JSON.parse(JSON.stringify(this.cases));  
        const sortedCases = casesCopy.sort((a, b) => {
            let valueA = a[fieldName] || '';
            let valueB = b[fieldName] || '';
            if (fieldName === 'CreatedDate' || fieldName === 'LastModifiedDate') {
                valueA = new Date(valueA);
                valueB = new Date(valueB);
                return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
            }        
            if (sortDirection === 'asc') {
                return valueA > valueB ? 1 : -1;
            } else if (sortDirection === 'desc') {
                return valueA < valueB ? 1 : -1;
            }
    
            return 0;
        });
        this.cases = sortedCases;

        // return refreshApex(this._wiredResult);
         //eval("$A.get('e.force:refreshView').fire();");
       //  window.location.reload();
    }*/
    
}


/*

import { refreshApex } from '@salesforce/apex';
import { subscribe, MessageContext } from 'lightning/messageService';
import CASE_CREATED_CHANNEL from '@salesforce/messageChannel/accountCaseChannel__c';
import getCases from '@salesforce/apex/CaseController.getCases';
import { LightningElement, wire, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import getAccountCases from '@salesforce/apex/AccountCasesController.getAccountCases';

const columns = [
    { 
        label: 'Case Number', 
        fieldName: 'CaseNumber', 
        type: 'url', 
        sortable: true,
        typeAttributes: {
            label: { fieldName: 'CaseNumber' },
            target: '_blank'
        }
    },
    { 
        label: 'Date/Time Opened', 
        fieldName: 'CreatedDate', 
        type: 'date', 
        sortable: true,
        typeAttributes: {
            value: { 
                fieldName: 'CreatedDate' 
            },
            // Add this line to format the date
            dateStyle: 'short',
            month: '2-digit',
            day: '2-digit',
            year: '2-digit'
        }
    },
    // Other columns...
];

export default class AccountCases extends NavigationMixin(LightningElement) {
    @api recordId;
    @track cases;
    defaultSortField = 'CreatedDate';
    defaultSortDirection = 'desc';

    @wire(getAccountCases, { accountId: '$recordId' })
    wiredCases({ error, data }) {
        if (data) {
            this.cases = data;
        } else if (error) {
            // Handle error
        }
    }

    handleSortData(event) {
        const { fieldName, sortDirection } = event.detail;

        const casesCopy = JSON.parse(JSON.stringify(this.cases));

        const sortedCases = casesCopy.sort((a, b) => {
            let valueA = a[fieldName] || '';
            let valueB = b[fieldName] || '';

            if (fieldName === 'CreatedDate' || fieldName === 'LastModifiedDate') {
                valueA = new Date(valueA);
                valueB = new Date(valueB);
                return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
            }

            if (sortDirection === 'asc') {
                return valueA > valueB ? 1 : -1;
            } else if (sortDirection === 'desc') {
                return valueA < valueB ? 1 : -1;
            }

            return 0;
        });

        this.cases = sortedCases.map(caseItem => caseItem);

    }

    get columns() {
        return columns;
    }

    handleCaseNumberClick(event) {
        const caseId = event.detail.row.Id;

        this[NavigationMixin.GenerateUrl]({
            type: 'standard__recordPage',
            attributes: {
                recordId: caseId,
                actionName: 'view',
            },
        }).then(url => {
            window.open(url, '_blank');
        });
    }
}

*/