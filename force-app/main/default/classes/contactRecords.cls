public class contactRecords {
  @AuraEnabled(cacheable=true)
    public static List<contact> fetchCon (){
        List<contact> query= [select id,Name,Account.name,Email,Phone from contact Where AccountId != Null];
         return query;
    }  
}