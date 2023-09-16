public class GoogleDriveIntegration {

    @AuraEnabled(cacheable=true)
    public static String searchFiles(String query) {
        System.debug('query--'+query);
        HttpRequest request = new HttpRequest();
        request.setMethod('GET');
        // request.setEndpoint('callout:Google_named_credentials' + '/files/'+fileId);
        system.debug('encoding----------'+EncodingUtil.urlEncode(query,'UTF-8'));
        request.setEndpoint('callout:Google_named_credentials' + '/files/' + EncodingUtil.urlEncode(query, 'UTF-8'));
        request.setHeader('Content-Type', 'application/json');
        Http http = new Http();
        HttpResponse response = http.send(request);
        
        if (response.getStatusCode() == 200) {
            String result = response.getBody();
            return result;
        } else {
            System.debug(response.getBody());
            return response.getBody();
        }
    }



      @AuraEnabled(cacheable=true)
    public static String createFolder(String folderName) {
        HttpRequest request = new HttpRequest();
        request.setMethod('POST');
        request.setEndpoint('callout:Google_named_credentials' + '/files');
        request.setHeader('Content-Type', 'application/json');
        
        Map<String, Object> folderMetadata = new Map<String, Object>();
        folderMetadata.put('name', folderName);
        folderMetadata.put('mimeType', 'application/vnd.google-apps.folder');
        
        request.setBody(JSON.serialize(folderMetadata));

        Http http = new Http();
        HttpResponse response = http.send(request);

        if (response.getStatusCode() == 200) {
            Map<String, Object> res = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            System.debug(response.getBody());
            String folderId = String.valueOf(res.get('id'));

            return folderId;
        } else {
            System.debug(response.getBody());
            return response.getBody();
        }
    }


    @AuraEnabled(cacheable=true)
        Public static String makeCallout(){
            
        String result;
        HttpRequest request = new HttpRequest();
        request.setMethod('GET');
        request.setEndpoint('callout:Google_named_credentials' + '/files'+'?q=%22root%22%20in%20parents&fields=files/id,files/name,files/iconLink,files/thumbnailLink,files/mimeType,nextPageToken');
        Http http = new Http();
        HTTPResponse response = http.send(request);
            if(response.getStatusCode() == 200) {
            result = response.getBody();
            result = String.valueOf(result);
        }
        System.debug('result------------' +result);
        return result;
        }

                @AuraEnabled(cacheable=true)
        public static String deleteFile(String fileId){
        System.debug('Delete'); 
        System.debug('fileId------'+fileId);

        HttpRequest request = new HttpRequest();

        request.setMethod('DELETE');
                            //Google_named_credentials
        request.setEndpoint('callout:Google_named_credentials' + '/files/'+fileId);

        Http http = new Http();
        HTTPResponse response = http.send(request);

        if (response.getStatusCode() == 200) {
        System.debug(response.getBody());
        return String.valueOf(response.getBody()); 
        }

        else{

        System.debug('response.getBody()---'+response.getBody());
        return response.getBody();

        }
        }


@AuraEnabled(cacheable=true)
public static String uploadFile(String base64, String filename) {
    Blob fileToUpload = EncodingUtil.base64Decode(base64);
	system.debug('base64--->'+base64);
    system.debug('filename-->'+filename);
    HttpRequest request = new HttpRequest();
    request.setMethod('POST');
    request.setEndpoint('callout:UploadFile' + '/files?uploadType=multipart');
    request.setBodyAsBlob(fileToUpload);

    Http http = new Http();
    HttpResponse response = http.send(request);

    if (response.getStatusCode() == 200) {
        Map<String, Object> res = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
        System.debug(response.getBody());

        String fileId = String.valueOf(res.get('id'));

       
        HttpRequest changeNameRequest = new HttpRequest();
        changeNameRequest.setMethod('PATCH');
        changeNameRequest.setEndpoint('callout:Google_named_credentials' + '/files/' + fileId);
        String body = '{"name":"' + filename + '"}';
        changeNameRequest.setBody(body);

        HttpResponse changeNameResponse = http.send(changeNameRequest);

        if (changeNameResponse.getStatusCode() == 200) {
            System.debug(changeNameResponse.getBody());
            return String.valueOf(changeNameResponse.getBody());
        } else {
            System.debug(changeNameResponse.getBody());
            return changeNameResponse.getBody();
        }
    } else {
        System.debug(response.getBody());
        return response.getBody();
    }
}

}




















   /*     @AuraEnabled 

public static String changeName(String filename, String fileId) { 

    HttpRequest request = new HttpRequest(); 

    request.setMethod('PATCH'); 

    request.setEndpoint('callout:Google_named_credentials' + '/files/' + fileId); 

    String body = '{"name":"' + filename + '"}'; 

    request.setBody(body); 

  

    Http http = new Http(); 

    HttpResponse response = http.send(request); 

  

    if (response.getStatusCode() == 200) { 

        System.debug(response.getBody()); 

        return String.valueOf(response.getBody()); 

    } else { 

        System.debug(response.getBody()); 

        return response.getBody(); 

    } 

} 

 

 @AuraEnabled(cacheable=true) 

public static String uploadFile(String base64, String filename) { 

    Blob fileToUpload = EncodingUtil.base64Decode(base64); 

     

    HttpRequest request = new HttpRequest(); 

    request.setMethod('POST'); 

    request.setEndpoint('callout:UploadFile' + '/files?uploadType-multipart'); 

    request.setBodyAsBlob(fileToUpload); 

     

    Http http = new Http(); 

    HttpResponse response = http.send(request); 

     

    if (response.getStatusCode() == 200) { 

        Map<String, Object> res = (Map<String, Object>) JSON.deserializeUntyped(response.getBody()); 

        System.debug(response.getBody()); 



      return GoogleDriveIntegration.changeName(filename, String.valueOf(res.get('id'))); 

            // return response.getBody(); 

 

    } else { 

        System.debug(response.getBody()); 

        return response.getBody(); 

    } 

} */