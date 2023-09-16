import { LightningElement, wire } from "lwc";

import { ShowToastEvent } from "lightning/platformShowToastEvent";

import getRecord from "@salesforce/apex/getDepartmentStudent.getRecord";

import UpdateRecord from "@salesforce/apex/UpdateStudent.UpdateRecord";

import LightningConfirm from "lightning/confirm";









export default class ParentChildComponent extends LightningElement 
{


    
    DepartmentList;
    StudentId;
    @wire(getRecord)
    wiredDepartment({ data, error })
     {
        if (data) {
            this.DepartmentList = data;
            this.error = undefined;
        } else {
            this.error = error;
            this.DepartmentList = undefined;
        }
    }

    async handleConfirmClick(event) {
        this.StudentId = event.target.value;
        const res = await LightningConfirm.open({
            message: "Are you sure you want to approve this record?",
            variant: "default", // headerless
            label: "Approve a record"
        });
        if (res) {
            UpdateRecord({ Id: this.StudentId }).then((result) => 
            {
                const showToast = new ShowToastEvent({
                    title: "Approved status",
                    message: result,
                    variant: "Success",
                    mode: "dismissable"
                });
                this.dispatchEvent(showToast);
                
                setTimeout(function () 
                {
                    window.location.reload();
                }, 1000);
            });
        }
    }



}