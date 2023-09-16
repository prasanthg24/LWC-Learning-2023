import { LightningElement,wire } from 'lwc';
import fetchCon from '@salesforce/apex/contactRecords.fetchCon';
export default class reduxExample extends LightningElement {
    data1 = [];
    wiredActivities;
    records = '';
    error;
    @wire(fetchCon,{} )
    wiredCases(value)
    {
        this.wiredActivities = value;
        const { data, error } = value;
    
    if(data)
    {
        let dataEditing = JSON.parse(JSON.stringify(data));
        
        this.data1 = dataEditing;
        
    }else if(error){
        this.error = error;
    }
    
}
}