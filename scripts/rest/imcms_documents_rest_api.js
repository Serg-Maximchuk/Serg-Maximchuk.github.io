Imcms.define("imcms-documents-rest-api", [], function () {
    return {

        remove: function (documentId, callback) {
            var responses = [200, 500],
                responseCode = responses[Math.floor(Math.random() * responses.length)];
            if (responseCode === 200) {
                console.log("%c Document " + documentId + " was removed", "color: blue;");
            } else {
                console.log("%c Document " + documentId + " wasn't removed due to some circumstances", "color: red;");

            }
            callback(responseCode);
        }

    }
});