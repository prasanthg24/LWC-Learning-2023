public with sharing class AccountCasesController {
    @AuraEnabled(cacheable=true)
    public static List<Case> getAccountCases(Id accountId) {
        return [SELECT Id, CaseNumber, Subject, CreatedDate, LastModifiedDate, Status, Reason
                FROM Case
                WHERE AccountId = :accountId
                ORDER BY CreatedDate DESC];
    }
}