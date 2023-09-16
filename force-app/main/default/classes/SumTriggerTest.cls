@isTest
public class SumTriggerTest 
{
    public static testMethod void TestUpdateObjectOne()
    {
        ObjectOne__c obj1 = new   ObjectOne__c();
        //test.startTest();
        insert obj1;
        //test.stopTest();
        system.debug ('object One record Id =  '+ obj1.Id);
        
        
        ObjectTwo__c obj2 = new ObjectTwo__c();
        obj2.ObjectOne__c = obj1.Id;
        obj2.NumberTwo__c = 100;
        //test.startTest();
        insert obj2;
        //test.stopTest();
        system.debug ('object two record Id = '+ obj2.Id);
        
        ObjectOne__c updatedRecord = [SELECT Id, Name, NumberOne__c FROM ObjectOne__c Where Id =: obj1.Id ];
        System.assertEquals(100,updatedRecord.NumberOne__c );
        
        
        ObjectTwo__c  delObj =
            [SELECT Name, Id, NumberTwo__c, ObjectOne__c FROM ObjectTwo__c Where Id =: obj2.Id];
        
        delete delObj;
        
        
        
        
    }
}