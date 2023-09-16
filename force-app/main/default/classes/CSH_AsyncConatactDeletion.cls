public class CSH_AsyncConatactDeletion implements Queueable {
     List<String> recIds= new List<String>();
  
    public CSH_AsyncConatactDeletion(List<String> recIds) {
        this.recIds = recIds;  
    } 
    public void execute(QueueableContext context) {
        List<Contact> lst = new List<Contact>();
        List<Messaging.EmailFileAttachment> attachmentList = new List<Messaging.EmailFileAttachment>();
        lst.addAll([SELECT Id,Account.Name FROM Contact WHERE Id IN :recIds]);
         List<Database.DeleteResult> deleteRespList = Database.delete(lst,false);
            Map<Id,String> contactsFailed = new Map<Id,String>();
            Map<Id,String> allContactsFailed = new Map<Id,String>();
            for(Database.DeleteResult dr : deleteRespList){
                if(!dr.isSuccess()){
                    if(dr.getErrors().get(0).getMessage().contains('cases')){
                        contactsFailed.put(dr.getId(),dr.getErrors().get(0).getMessage().substringBefore(':'));
                        allContactsFailed.put(dr.getId(),dr.getErrors().get(0).getMessage().substringBefore(':'));
                        system.debug('error-->'+dr.getErrors().get(0).getMessage().substringBefore(':'));
                    }else{
                        allContactsFailed.put(dr.getId(),dr.getErrors().get(0).getMessage().substringBefore(':'));
                    }
                }  
            }
        
            System.enqueueJob( new  CSH_AsyncDeleteAccess('Bypass_Validation' ) );
        
            if(allContactsFailed.size()>0){
                String csvData = 'Contact Name, Associated Cases, Error Message \n';
                Integer headerLength = csvData.length();
                for(Contact con : [SELECT Id,Name,  (SELECT Id,CaseNumber, Status FROM Cases ORDER BY CaseNumber DESC)  FROM Contact WHERE Id IN :allContactsFailed.keySet()]){
                    Integer cnt= 0;
                    if(contactsFailed.containsKey(con.Id)){
                       for(Case openCase : con.Cases){
                           if (cnt == 0){
                              csvData +=' "'+con.Name+'", "'+openCase.CaseNumber+'",'+contactsFailed.get(con.Id)+'\n';
                           }
                           else{
                            csvData += ', "'+openCase.CaseNumber+'" \n';    
                           }
                        cnt+=1;
                       }
                    }else if(allContactsFailed.containsKey(con.Id)){
                        csvData +=' "'+con.Name+'",,'+allContactsFailed.get(con.Id)+'\n'; 
                    }
                
                }
                Messaging.EmailFileAttachment csvAttcmnt = new Messaging.EmailFileAttachment ();
               //Create CSV file using Blob
               blob csvBlob = Blob.valueOf (csvData);
               string csvname= 'FailedContactRecord - '+System.now()+'.csv';
               csvAttcmnt.setFileName (csvname);
               csvAttcmnt.setBody (csvBlob);
               attachmentList.add(csvAttcmnt);
            }
        

               Messaging.SingleEmailMessage singEmail = new Messaging.SingleEmailMessage ();
              // String [] toAddresses = new list<string> {UserInfo.getUserEmail()};
                   String [] toAddresses = new list<string> {'gitika.lnu@cognizant.com'};
               singEmail.setToAddresses (toAddresses);
               String subject =attachmentList.size()>0?'FailedContactRecord':'Contacts deleted successfully.';
               singEmail.setSubject (subject);
               String body =attachmentList.size()>0?'PFA':'Contacts deleted successfully.';
               singEmail.setPlainTextBody (body);
              //Set blob as CSV file attachment
              if(attachmentList.size()>0){
                singEmail.setFileAttachments (new Messaging.EmailFileAttachment []{attachmentList[0]});}
         Messaging.SendEmailResult[] r = Messaging.sendEmail(new Messaging.SingleEmailMessage[]{singEmail});
        if (r[0].success) {
            System.debug('The email was sent successfully.');
        } else {
            System.debug('The email failed to send: ' + r[0].errors[0].message);
        }
  }
}