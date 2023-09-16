public class UpdateStudent 
{
    @AuraEnabled
    public static String UpdateRecord(String Id)
    {
        //system.debug(Id);
        Student__c s = new Student__c();
        s.Id = Id;
        s.isApproved__c = True;
        Update s;
        return 'The record is approved';
        
    }
}