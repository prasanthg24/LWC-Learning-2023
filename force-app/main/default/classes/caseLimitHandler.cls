public class caseLimitHandler 
{
    public static void handleCases(List<Case> cases)
    {
      system.debug('cases--->'+cases);
     // Map to store the case count per user
    Map<Id, Integer> userCaseCountMap = new Map<Id, Integer>();
    Set<Id> userIds = new Set<Id>();
        
    for (Case newCase : cases) 
    {
        userIds.add(newCase.CreatedById);
        system.debug('createdby id --->' +newCase.CreatedById); 
    }
    
        
    // case count per user for the current month
    List<AggregateResult> caseCountResults = [SELECT CreatedById, COUNT(Id)
                                              FROM Case
                                              WHERE CreatedById IN :userIds
                                              AND CreatedDate = THIS_MONTH
                                              GROUP BY CreatedById];
    
    system.debug('caseCountResults --'+ caseCountResults);
    
    //  user and  CaseCount Map
    for (AggregateResult result : caseCountResults) {
        Id userId = (Id) result.get('CreatedById');
        Integer caseCount = (Integer) result.get('expr0');
        userCaseCountMap.put(userId, caseCount);
    }
    
    // case count overload
    for (Case newCase : cases) {
        String currentUserName = UserInfo.getName();
        Integer maximumCasesPerMonth = 120;
        if (userCaseCountMap.containsKey(newCase.CreatedById)) 
        {
            Integer caseCount = userCaseCountMap.get(newCase.CreatedById);
            if (caseCount >= maximumCasesPerMonth) 
            {
                  String errorMessage = currentUserName  + ' (' + newCase.CreatedById + ') has exceeded the maximum number of cases allowed this month. The current maximum is: ' + maximumCasesPerMonth;
               	  newCase.addError(errorMessage);
            }
        }
    }
    }
    

}