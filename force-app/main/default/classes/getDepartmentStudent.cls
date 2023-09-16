public class getDepartmentStudent {

    @AuraEnabled(cacheable=true)
    public static List<sobject> getRecord()
    {
        return[SELECT Id, Name, Child_Approved_Status__c ,(SELECT Id,Name,Department__c ,isApproved__c  FROM Students__r)  FROM Department__c];
    }
}