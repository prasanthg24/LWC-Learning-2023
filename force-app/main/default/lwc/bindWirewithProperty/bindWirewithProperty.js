import { LightningElement,api,wire } from 'lwc';
import getAccList from '@salesforce/apex/accController.getAccList';

export default class BindWirewithProperty extends LightningElement {


        @wire(getAccList) accounts;
}