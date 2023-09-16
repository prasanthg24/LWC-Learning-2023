import { LightningElement ,wire} from 'lwc';
import getAccList from '@salesforce/apex/AccountController.getAccList';
export default class GetAccountList extends LightningElement
 {

@wire(getAccList) 
accounts;

}