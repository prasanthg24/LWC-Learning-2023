public class ReportController {
    private String key = '746946120285-i32r8u8ek5htdft8frb8pl0r6s4q16b2.apps.googleusercontent.com';
    private String secret = 'Your_Client_Secret';
    private String refresh_token = '1%2F2Gz_hznXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXGvogk';
    private String refreshToken;
    private String accesstoken;
    private Integer expiresIn;
    private String tokentype;

    public ReportController() {
        AccessToken();
    }

    public void generateReport(String reportDevName) {
        try {
            List<Report> reportList = [SELECT Id, DeveloperName, Name FROM Report WHERE DeveloperName = :reportDevName];
            if (reportList.size() > 0) {
                String reportId = (String)reportList[0].get('Id');
                String reportName = (String)reportList[0].get('Name');
                String url = '/' + reportId + '?csv=1&isdtp=p1';
                System.debug('url-->' + url);

                ApexPages.PageReference objPage = new ApexPages.PageReference(url);
                Blob urlStor = objPage.getContent();
                System.debug('urlStor--->' + urlStor);

                String boundary = 'SalesforceNewsTechnologyStuff9889464542212';
                String delimiter = '\r\n--' + boundary + '\r\n';
                String close_delim = '\r\n--' + boundary + '--';
                String bodyEncoded = EncodingUtil.base64Encode(urlStor);
                System.debug('bodyEncoded--->' + bodyEncoded);

                String folderId = '1zS5uMK6hKOi2SW19xwqUmaxFDGyXw9Mf';
                String driveId = '1DVRPlthRkYBeGAGGPt-TW_tVrEpa_A9x';
                String body = delimiter + 'Content-Type: application/json\r\n\r\n' +
                    '{ "name" : "' + reportName + '.csv' + '",' +
                    ' "mimeType" : "text/csv",' +
                    '"teamDriveId": "' + driveId + '",\n  "driveId": "' + driveId + '",\n  "parents":[\n    "' + folderId + '"\n    ]}' +
                    delimiter + 'Content-Type: text/application/vnd.ms-excel' + '\r\n' +
                    'Content-Transfer-Encoding: base64\r\n' + '\r\n' +
                    bodyEncoded + close_delim;

                String endpoint = 'https://www.googleapis.com/upload/drive/v3/files?driveId=' + driveId +
                    '&includeItemsFromAllDrives=true&corpora=drive&supportsAllDrives=true&uploadType=multipart';
                System.debug('endpoint==>' + endpoint);
                System.debug('body--->' + body);
                System.debug('body--->' + JSON.serializePretty(body));
                System.debug('accesstoken466==>' + accesstoken);

                Http http = new Http();
                HttpRequest req = new HttpRequest();
                req.setEndpoint(endpoint);
                req.setHeader('Authorization', 'Bearer ' + accesstoken);
                req.setHeader('Content-Type', 'multipart/mixed; boundary="' + boundary + '"');
                req.setHeader('Content-length', String.valueOf(body.length()));
                req.setBody(body);
                req.setMethod('POST');
                req.setTimeout(60 * 1000);

                HttpResponse resp = http.send(req);
                System.debug('resp--->' + resp.getBody());
            }
        } catch (Exception ex) {
            System.debug('Exception Message: ' + ex.getMessage());
            throw new AuraHandledException('Error generating report: ' + ex.getMessage());
        }
    }

    private void AccessToken() {
        String endpoint = 'https://oauth2.googleapis.com/token';
        String grant_type = 'refresh_token';
        String body = 'grant_type=' + grant_type + '&client_id=' + key + '&client_secret=' + secret + '&refresh_token=' + refresh_token;
        
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.setBody(body);
        req.setMethod('POST');
        req.setTimeout(60 * 1000);

        HttpResponse resp = http.send(req);
        Map<String, Object> responseMap = (Map<String, Object>)JSON.deserializeUntyped(resp.getBody());
        accesstoken = (String)responseMap.get('access_token');
        expiresIn = (Integer)responseMap.get('expires_in');
        refreshToken = (String)responseMap.get('refresh_token');
        tokentype = (String)responseMap.get('token_type');
    }
}