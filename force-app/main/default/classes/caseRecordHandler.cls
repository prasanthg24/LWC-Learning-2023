public class caseRecordHandler {
    @AuraEnabled
    public static List<case> getdatatable() 
    {
       // List<case> caselist = [SELECT Id, CaseNumber, Type, Subject, Contact.Name, Origin, Status FROM Case WHERE Status!='Closed'];
       // System.debug(caselist);
        return [SELECT Id, CaseNumber, Type, Subject, Contact.Name, Origin, Status FROM Case WHERE Status!='Closed'];
        
    }
}