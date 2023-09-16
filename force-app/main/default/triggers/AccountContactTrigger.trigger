trigger AccountContactTrigger on Account (after insert,after update)
{
    set<Id> acId = new set<Id>();
    for(Account ac :Trigger.new)
    {
        if(ac.name=='Prasanth')
        {
          acId.add(ac.Id);
        }
    }
    List<Contact> ConList = [select id,firstName From Contact Where AccountId IN:acId ];
    
    List <Contact> newList = new List<Contact>();
    
    for( Contact c : ConList)
    {
     c.firstName ='Prasanth';
       newList.add(c);
        
    }

    if(newList != null)
    {
        update newList;
    }
}