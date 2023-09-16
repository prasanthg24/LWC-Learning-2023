trigger caseLimitTrigger on Case (after insert) {
   if(trigger.IsInsert && trigger.IsAfter)
   {
       caseLimitHandler.handleCases(trigger.new);
       
   }
}