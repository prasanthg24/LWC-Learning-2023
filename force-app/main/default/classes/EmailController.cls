public class EmailController {
    
    @InvocableMethod
    public static void sendWelcomeEmail(list<EmailWrapper> lstEmailWrapper){
		Messaging.SingleEmailMessage objEmail = new Messaging.SingleEmailMessage();
        
       
        objEmail.setToAddresses(new list<String>{lstEmailWrapper[0].strRecipientEmail});
		
        
        objEmail.setTemplateId([SELECT Name FROM EmailTemplate WHERE Name = :lstEmailWrapper[0].strEmailTemplate LIMIT 1].Id);
        
        
        objEmail.setTargetObjectId(lstEmailWrapper[0].strRecipientId);
        objEmail.setTreatTargetObjectAsRecipient(false);
        
        Messaging.SendEmailResult[] emailResult = Messaging.sendEmail(new Messaging.SingleEmailMessage[] {objEmail});
        if(!emailResult[0].isSuccess()){
            System.debug('Error :' +emailResult[0].getErrors());
        } else{
            System.debug('Success');
        } 
    }
}