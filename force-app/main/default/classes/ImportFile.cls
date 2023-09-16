public with sharing class ImportFile {



    @AuraEnabled
    public static List<ImportResult> loadCSVData(Id contentDocumentId) {
        ContentVersion contentVersionObj = [SELECT Id, VersionData FROM ContentVersion WHERE ContentDocumentId = :contentDocumentId];
        
        List<Contact> conlist = new List<Contact>();
        String data = contentVersionObj.VersionData.toString();
        String[] csvFileLines = data.split('\n');
        
        List<ImportResult> importResults = new List<ImportResult>();

        for (Integer i = 1; i < csvFileLines.size(); i++) {
            String[] csvRecordData = csvFileLines[i].split(',');
            Contact conObj = new Contact();
            conObj.AccountId = csvRecordData[0];
            conObj.FirstName = csvRecordData[1];
            conObj.LastName = csvRecordData[2];
            
            Date myDate = Date.parse(csvRecordData[3]);
            conObj.Birthdate = myDate;
            
            conObj.Email = csvRecordData[4];
            conObj.Phone = csvRecordData[5];
            conObj.LeadSource = csvRecordData[6];
            conObj.MailingCity = csvRecordData[7];
            conObj.MailingPostalCode = csvRecordData[8];
            conObj.MailingStreet = csvRecordData[9];
            
            String data1 = csvRecordData[10];
            Datetime dt = (Datetime)JSON.deserialize('"' + data1 + '"', Datetime.class);
            conObj.Appointment_Date_Time__c = dt;
            
            // if (csvRecordData.size() > 10) {
            //     String isActiveValue = csvRecordData[11].trim().toLowerCase();
            //     if (isActiveValue.equals('true')) {
            //         conObj.is_active__c = true;
            //     } else if (isActiveValue.equals('false')) {
            //         conObj.is_active__c = false;
            //     } else {
            //         System.debug('Invalid value for is_active__c field: ' + csvRecordData[11]);
            //     }
            // } 
            String isActiveValue = csvRecordData[11].trim().toLowerCase();
              System.debug('isActiveValue--'+isActiveValue);
            if (isActiveValue.equals(true))
             {
                    conObj.is_active__c = true;
                    System.debug('isActiveValue--'+isActiveValue);
                } else if (isActiveValue.equals(false)) {
                    conObj.is_active__c = false;
                     System.debug('isActiveValue--'+isActiveValue);
                } 

            conlist.add(conObj);
            System.debug('conlist---' + conObj);
        }
        
        List<Database.SaveResult> saveResults = Database.insert(conlist, false);
        system.debug('saveResults--'+saveResults);
        for (Integer i = 0; i < saveResults.size(); i++) {
            if (!saveResults[i].isSuccess()) {
                Database.Error error = saveResults[i].getErrors()[0];
                String errorMessage = 'Error at line ' + (i + 1) + ': ' + error.getMessage();
                importResults.add(new ImportResult(false, errorMessage, conlist[i]));
                system.debug('errorMessages----' + errorMessage);
            } else {
                importResults.add(new ImportResult(true, null, conlist[i]));
            }
        }
        
        return importResults;
    }
    
    
    
    
        public class ImportResult {
        @AuraEnabled
        public Boolean success { get; set; }
        @AuraEnabled
        public String errorMessage { get; set; }
        @AuraEnabled
        public Contact contact { get; set; }

        public ImportResult(Boolean success, String errorMessage, Contact contact) {
            this.success = success;
            
            this.contact = contact;
            this.errorMessage = errorMessage;
        }
    }
}