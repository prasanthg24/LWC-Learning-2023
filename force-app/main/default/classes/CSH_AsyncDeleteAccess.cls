public class CSH_AsyncDeleteAccess implements Queueable {
     String accessName= '';
  
    public CSH_AsyncDeleteAccess(String accessName) {
        this.accessName = accessName;  
    } 
    public void execute(QueueableContext context) {
        List<PermissionSetAssignment> psas = [ select Id from PermissionSetAssignment where PermissionSetId IN ( select Id from PermissionSet where Name = 'Bypass_Validation') and AssigneeId =:UserInfo.getUserId()];
        if(psas.size()>0){
            DELETE psas; 
        }
  }
}