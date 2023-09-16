public class StudentTriggerHandler 
{
    public static void getStudent(Map<Id,Student__C> obj)
    { 
        //To store Department Record Id
        set<ID> parentId = new set<ID>();
        for(Student__C a : obj.values())
        {
            parentId.add(a.Department__c);
            
        }
        //To store Department ID in key and StudentRecord in values
        Map<Id,List<Student__C>> pchild = new  Map<Id,List<Student__C>>();
        List<Student__C> studentRecord =[SELECT Department__c, Name, Id , isApproved__c FROM Student__c WHERE isApproved__C = True];
        
        system.debug('parent Id count' +parentId );
        
        for(Id parent : ParentId)
        {
            List<Student__C>innerChildList = new List<Student__C>();
            for(Student__c child : StudentRecord)
            {
                
                if(child.Department__c == parent )
                {
                    innerChildList.add(child);
                    system.debug('child Record - '+ child);
                }
            }
            pchild.put(parent,innerChildList);
            
            system.debug(pchild);
        }
        // system.debug('inner list-->'+innerchildList);
        
        system.debug('map --- '+pchild);
        //To  Update value in DML
        List<sobject> updatedDepartment = new List<sobject>();
        
        for(Id idValue : pchild.keyset())
        {
            
            system.debug('ID--'+ Idvalue + ' count --'+pchild.get(idvalue).size());
            if (pchild.get(idvalue).size() == 0)
            {
                Department__c sa = new Department__c();
                sa.Id =idValue;
                sa.Child_Approved_Status__c ='';
                updatedDepartment.add(sa);
                
            }
            else if(pchild.get(idvalue).size() == 1 )
            {
                Department__c sb = new Department__c();
                sb.Id =idValue;
                sb.Child_Approved_Status__c ='1 child approved';
                updatedDepartment.add(sb);  
                
            }
            else if(pchild.get(idvalue).size() == 2 )
            {
                Department__c sc = new Department__c();
                sc.Id =idValue;
                sc.Child_Approved_Status__c ='2 children approved';
                updatedDepartment.add(sc);
                
            }
            else if(pchild.get(idvalue).size() > 2 )
            {
                Department__c sd = new Department__c();
                sd.Id =idValue;
                sd.Child_Approved_Status__c ='All child approved';
                updatedDepartment.add(sd);
                
            }
        }
        if(updatedDepartment!= null)
        {
            update updatedDepartment;
        }
        
    }
}