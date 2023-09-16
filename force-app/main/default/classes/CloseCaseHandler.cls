public class CloseCaseHandler 
{  @AuraEnabled
	public static void CaseClose(String CaseId)
    {
        system.debug('caseid'+ CaseId);
        Case c = new Case();
        c.Id = CaseId;
        c.Status='Closed';
        update c;
        system.debug(c);
    }
}