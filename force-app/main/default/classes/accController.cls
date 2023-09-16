public class accController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccList()
    {
        return [SELECT Id,Name,Phone FROM Account Limit 15];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> findAccList(String keyword)
    {
        string key ='%'+keyword+'%';
        return[SELECT Id,Name FROM Account WHERE Name Like:key LIMIT 10];
    }
}