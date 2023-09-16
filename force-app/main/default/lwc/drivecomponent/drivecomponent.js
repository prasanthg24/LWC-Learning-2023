import { LightningElement, wire ,track,api} from 'lwc';
import makeCallout from '@salesforce/apex/GoogleDriveIntegration.makeCallout';
import {NavigationMixin} from 'lightning/navigation'
import { refreshApex } from '@salesforce/apex';
import deleteFile from '@salesforce/apex/GoogleDriveIntegration.deleteFile';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import uploadFile from '@salesforce/apex/GoogleDriveIntegration.uploadFile'; 

import createFolder from '@salesforce/apex/GoogleDriveIntegration.createFolder';
import searchFiles from '@salesforce/apex/GoogleDriveIntegration.searchFiles';

const acceptedFormats = ['.pdf', '.doc', '.docx'];
export default class Drivecomponent extends LightningElement {
                @track filesList  = [];
                @track nextPageToken;
                url;
                data = [];
                @track searchString;
                @track fileData =[];
                @track showUploadModal = false;
                @track showDeleteModal = false;
                @track idfile;
                
    wiredFile;
    @wire(makeCallout)
    wiredFile(wireResult)
    {
                const {data, error} = wireResult;
                this.wiredFile=wireResult; 
                //console.log("Result data--->",data);

                if (data) 
                {
                this.filesList=JSON.parse(data).files;
                console.log("filesList--->",this.filesList);
                }
                
    }
    
 @track folderName = '';

    handleFolderNameChange(event) {
        this.folderName = event.target.value;
    }

    handleCreateFolder() {
        createFolder({ folderName: this.folderName })
            .then(result => {
                console.log('Folder created:', result);
                   refreshApex(this.wiredFile);
                   this.folderName = '';
                     this.showModal = false;

                // Handle success
                   this.dispatchEvent(
                    new ShowToastEvent ({
                       title: 'Folder',
                        message: 'Folder Created Successfully',
                       variant : 'Success',
                        }),
        );
            })
            .catch(error => {
                console.error('Error creating folder:', error);
                // Handle error
            });
    }

    
    previewHandler(event)
    {

         const fileId = event.target.dataset.fileId;
           // const fileId = event.target.getAttribute("data-file-id");
            console.log('fileId-----event.target.dataset.fileId ---', fileId);
            const url = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
            window.open(url, "_blank");


        /*const fileId = event.target.getAttribute("data-file-id");
        //console.log('fileId--------', fileId);
        const url = "https://drive.google.com/file/d/" + fileId + "/view?usp=sharing";
        window.open(url, "_blank");*/
    }

    handleFileDownload(event) 
    {
          console.log('handleFileDownload--------', event.target.value);
        const url = `https://drive.google.com/u/4/uc?id=${event.target.value}&export=download`;
        //console.log('url---', url);
        window.open(url, "_blank");
    }


    /*handleDelete(event) {
        deleteFile({ fileId: event.target.value })
        .then((res) => {
             console.log("Status Delete--->", res);
             this.dispatchEvent(
                    new ShowToastEvent ({
                        title: 'Deleted',
                        message: 'Deleted Successfully',
                        variant : 'Success',
                        }),
        );
        refreshApex(this.wiredFile);
        })
        .catch((err) => {
            // console.log(err);
        })
    }*/
  
  @track searchResults = [];

handleSearch(event) {
    this.searchString = event.target.value;
    //console.log('searchString---'+this.searchString);
    
 if(this.searchString)
    {
        //console.log(this.searchString,'inside if');
    this.filesList = this.filesList.filter(file => {
        return file.name.toLowerCase().includes(this.searchString);
    });
    }
    else{
        refreshApex(this.wiredFile);
    }
    
}

   @track isChecked = false;
    @track isListView = true;

    HandleCheckbox(event)
    {
        this.isChecked = event.target.checked;
        this.isListView = this.isChecked;
        refreshApex(this.wiredFile);
    }

     handleCancelClick() {
        this.showDeleteModal = false;
    }
handleDeleteClick(event) {

        this.showDeleteModal = true;

        this.idfile =event.target.value;

       

    }

    handleDelete(event) {
         console.log('File ID---------',this.idfile )
          const fileId1 = event.target.getAttribute("data-file-id");
           console.log('File ID---------',this.idfile )
         deleteFile({ fileId: this.idfile })
        .then((res) => {
             this.dispatchEvent(
                    new ShowToastEvent ({
                       title: 'Deleted',
                        message: 'Deleted Successfully',
                       variant : 'Success',
                        }),
        );
         this.showDeleteModal = false;
        refreshApex(this.wiredFile);
        })
        .catch((err) => {
            // console.log(err);
        })
    }

  get acceptedFileItem() {
        return [".pdf", ".png", ".jpg", ".jpeg"];
    }
    
    handleUploadClick() {
        this.showUploadModal = true;
    }
      DeleteCancel() {
        this.showUploadModal = false;
     this.fileData = [];
        console.log('Modal Closed');
    }
 




    /*openfileUpload(event) {
        const file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = () => {
            var base64 = reader.result.split(',')[1];
            this.fileData = {
                'filename': file.name,
                'base64': base64,
              
            }
          console.log(this.fileData);
        }
        reader.readAsDataURL(file);

        
    }*/
    openfileUpload(event) {
       
    const files = event.target.files;
     console.log('  files.length event---'+  files.length);
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
         console.log('files[i]---',files[i]);
        var reader = new FileReader();
        reader.onload = () => {
            var base64 = reader.result.split(',')[1];
            this.fileData.push({
                'filename': file.name,
                'base64': base64
            });
         
        };
        reader.readAsDataURL(file);
          
    }
    console.log("this.fileData---",this.fileData);
}
    

    uploadToApex() {
    for (let i = 0; i < this.fileData.length; i++) {
        const { base64, filename } = this.fileData[i];
        uploadFile({ base64: base64, filename: filename })
            .then(result => {
                this.showToast('Success', 'File uploaded successfully.', 'success');
                // Perform any additional actions for each successful upload
                 refreshApex(this.wiredFile);
                   this.DeleteCancel();
                   this.fileData =' ';
            })
            .catch(error => {
                this.showToast('Error', 'Error uploading file: ' + error.body.message, 'error');
                // Handle error for each failed upload
            });
    }
    
    // Perform any final actions after all files have been uploaded
    
    // Clear fileData array
   // this.fileData = [];
}



    
      /* uploadToApex() 
       { 
        const {base64, filename} = this.fileData;
        uploadFile({ base64: base64, filename: filename }) 
        .then(result => 
        { 
                 
                   this.showToast('Success', 'File uploaded successfully.', 'success'); 
                   refreshApex(this.wiredFile);
                   this.DeleteCancel();
                   this.fileData =' ';
        }) 
        .catch(error =>
        { 
                this.showToast('Error', 'Error uploading file: ' + error.body.message, 'error'); 

        }); 

    } */

   

    showToast(title, message, variant) { 

        const toastEvent = new ShowToastEvent({ 

            title: title, 

            message: message, 

            variant: variant 

        }); 

        this.dispatchEvent(toastEvent); 

    } 



 @track searchQuery = '';
    

    handleSearchQueryChange(event) {
        this.searchQuery = event.target.value;
    }

    handleSearchFiles() {
        console.log("handleSearchFiles"+this.searchQuery);
        searchFiles({ query: this.searchQuery })
            .then(result => {
                console.log('Search results:', result);
                // Handle the search results returned from the callout
                // Update the fileList variable or perform any necessary operations
                //this.filesList = result;
            })
            .catch(error => {
                console.error('Error searching files:', error);
            });
    }

        
@track showModal = false;



showCreateFolderModal(){
        this.showModal = true;
    }


    hideModal() {
        this.showModal = false;
    }

   
}




 /*
 
    
handleFileOpen (event) {
    if (event.target.dataset.mimetype=="application/vnd.google-apps.folder")
    {
    this.goBack= true;
    getFilesInFolder({folderId: String (event.target.dataset.fileId)})
    
    .then((res)=>{
        //console.log(res);
        this.filesList = JSON.parse(res).files;
        })
        .catch((err)=>{
        // console.log(err);
        
        })
        }
        else{
        this.url = "https://drive.google.com/uc?export=view&id=" + event.target.dataset.fileId;
        window.open(this.url, "_blank");
        //console.log(this.url);
        }
}


 
 
 
 
 
 
 this.nextPageToken=JSON.parse(data).nextPageToken;
                    if(!JSON.parse(data).nextPageToken || JSON.parse(data).nextPageToken=="")
                    {

                    this.nextDisabled=true;
                    }
                    else
                    {
                    this.nextDisabled=false;
                    }
                    
                    console.log("this.nextPageToken--",this.nextPageToken);
                    
                }*/

                // const url = "https://drive.google.com/uc?export=view&id=" + fileId;
 //python download.py -l 
 //const url = "https://drive.google.com/file/d/"+fileId+"/view?usp=share_link";
//const url = `https://drive.google.com/file/d/${fileId}/export=download?usp=share_link`;