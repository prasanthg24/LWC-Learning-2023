import { LightningElement, api, track } from 'lwc';
import loadCSVData from '@salesforce/apex/ImportFile.loadCSVData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ImportExportContact extends LightningElement {
 
    @track contentDocumentId;
    @track recordCount=0;
    @track fileName = '';
   // @track showResults = false;
    errorMessages=[];
    csvData;

    contacts = []; 



   
    get acceptedFormats()
    {
        return ['.csv'];
    }

 /*   convertToCSV(data) {
       console.log('convertToCSV--'+data);
      
        const columnHeaders = ['Success', 'Error Message']; // Customize the column headers as needed
        const rows = [columnHeaders];

        data.forEach(item => {
            const row = [item.success ? 'Success' : 'Error', item.errorMessage];
            rows.push(row);
        });

        let csvContent = '';
        rows.forEach(row => {
            const csvRow = row.map(cell => `"${cell}"`).join(',');
            csvContent += csvRow + '\r\n';
        });

 console.log('csvContent--'+csvContent);
        return csvContent;
    }*/


uploadFileHandler(event) {
        const uploadedFiles = event.detail.files;

        console.log('File name is: ' + uploadedFiles[0].name);
        this.fileName = uploadedFiles[0].name;

        console.log('Document ID is: ' + uploadedFiles[0].documentId);
        this.contentDocumentId = uploadedFiles[0].documentId;

        loadCSVData({ contentDocumentId: this.contentDocumentId })
            .then(result => {
                const csvData = this.convertToCSV(result);
                    const csvFileName = 'resultFile.csv';
                    this.downloadCSV(csvData, csvFileName);
                        
                if (result && typeof result === 'object') {
                    // const csvData = this.convertToCSV(result);
                    // const csvFileName = 'resultFile.csv';
                    // this.downloadCSV(csvData, csvFileName);
                        
                        console.log("this.recordCount---"+this.recordCount)
                     if(this.recordCount > 0)
                        {   
                                const event = new ShowToastEvent({
                                title: 'Success',
                                message:
                                this.recordCount +' Contact Inserted Successfully.',
                                variant:'success',
                                mode:'dismissible'
                                });
                                this.dispatchEvent(event);
                                this.recordCount =0;
                                this.fileName = '';
                        }
                    
                        else {
                            const event = new ShowToastEvent({
                                title: 'Error',
                                variant: 'error',
                                message: error,
                                mode: 'dismissible'
                            });
                            this.dispatchEvent(event);
                            console.error('Invalid response:', result);
                        } }
            })
            .catch(error => {
                this.error = error;
                console.log(error);
                const event = new ShowToastEvent({
                    title: 'Error',
                    variant: 'error',
                    message: error,
                    mode: 'dismissible'
                });
                this.dispatchEvent(event);
            });
    }

    convertToCSV(result) {
      
        let csvData = 'data:text/csv;charset=utf-8,';
        csvData += 'Success Status,Account ID,First Name,Last Name,Birthdate,Email,Phone,Lead Source,Mailing City,Mailing Postal Code,Mailing Street,Appointment Date Time,Error Message\n';

        result.forEach(item => {
            csvData += item.success + ',';
            if(item.success==true)
            {
                this.recordCount++;
            }
            console.log("item.success--"+item.success );
            console.log("item.success--"+this.recordCount)
           
            csvData += (item.contact ? item.contact.AccountId : '') + ',';
            csvData += (item.contact ? item.contact.FirstName : '') + ',';
            csvData += (item.contact ? item.contact.LastName : '') + ',';
            csvData += (item.contact ? item.contact.Birthdate : '') + ',';
            csvData += (item.contact ? item.contact.Email : '') + ',';
            csvData += (item.contact ? item.contact.Phone : '') + ',';
            csvData += (item.contact ? item.contact.LeadSource : '') + ',';
            csvData += (item.contact ? item.contact.MailingCity : '') + ',';
            csvData += (item.contact ? item.contact.MailingPostalCode : '') + ',';
            csvData += (item.contact ? item.contact.MailingStreet : '') + ',';
            csvData += (item.contact ? item.contact.Appointment_Date_Time__c : '') + ',';
            //csvData += (item.contact ? item.contact.is_active__c : '') + '\n';
            csvData += '"' + (item.errorMessage || '') + '\n';
            
        });
        
        return encodeURI(csvData);
    }

    downloadCSV(csvData, fileName) {
     
      
        const element = document.createElement('a');
        element.href = csvData;
        element.download = fileName;
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);


         
    }


        exportContacts() {
        const headers = ['AccountId', 'First Name', 'Last Name', 'Birthdate', 'Email',
         'Lead Source', 'Phone', 'Mailing City', 'Mailing Zip', 
         'Mailing Street', 'Appointment Date Time', 'Is Active'];
        const csvData = [headers];
        const csvContent = 'data:text/csv;charset=utf-8,' + csvData.map(row => row.join(',')).join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'template.csv');
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }  


}












  /*uploadFileHandler( event ) {
        const uploadedFiles = event.detail.files;

        // to get File Name 
        console.log('file name is:-'+uploadedFiles[0].name);

        this.fileName = uploadedFiles[0].name;

        // to get document id
        console.log('document id is:-'+uploadedFiles[0].documentId);

        this.contentDocumentId=uploadedFiles[0].documentId;
        
        loadCSVData({ contentDocumentId : this.contentDocumentId })
        .then((result)=>{
          this.recordCount=result;
            console.log('this.recordCount====',this.recordCount);
        
          const event = new ShowToastEvent({
          title: 'Success',
          message:
            this.recordCount+' Contact records inserted Successfully.',
           variant:'success',
           mode:'dismissible'
           });
           this.dispatchEvent(event);
         })
         .then(result => {
           console.log('typeof result--',typeof result)
                // Process the response
                if (result && typeof result === 'object') {
                   // const csvData = result;
                   // console.log('CSV Data:', csvData);
              const csvData = this.convertToCSV(result);
                    const csvFileName = 'resultFile.csv';
                    this.downloadCSV(csvData, csvFileName);
                    // You can perform further processing with the CSV data, such as saving it to a file or displaying it in a component.
                } else {
                    console.error('Invalid response:', result);
                }
            })
        .catch((error)=>{
           this.error = error;
           console.log(error);
           const event=new ShowToastEvent({
              title:'Error',
              variant:'error',
              message:error,
              mode:'dismissible'
           })
           this.dispatchEvent(event);
        })

    }
    convertToCSV(data) {
       console.log('convertToCSV--'+data);
      
        const columnHeaders = ['Success', 'Error Message']; // Customize the column headers as needed
        const rows = [columnHeaders];

        data.forEach(item => {
            const row = [item.success ? 'Success' : 'Error', item.errorMessage];
            rows.push(row);
        });

        let csvContent = '';
        rows.forEach(row => {
            const csvRow = row.map(cell => `"${cell}"`).join(',');
            csvContent += csvRow + '\r\n';
        });

 console.log('csvContent--'+csvContent);
        return csvContent;
    }


    downloadCSV(csvData, fileName) {
      console.log('csvData--'+csvData);
       console.log('fileName--'+fileName);
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvData);
    link.download = fileName;
    link.target = '_blank';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}*/