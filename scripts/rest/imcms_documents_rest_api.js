Imcms.define("imcms-documents-rest-api", ["imcms-rest-api"], function (rest) {

    var api = new rest.API("/api/documents");

    //mock data
    api.read = function (data, callback) {
        callback([{
            id: 1001,
            title: "Start page",
            alias: "start-page",
            type: "text"
        }, {
            id: 1002,
            title: "Second page",
            alias: "second-page",
            type: "text"
        }, {
            id: 1003,
            title: "Another page",
            alias: "some-page",
            type: "text"
        }, {
            id: 1004,
            title: "File page",
            alias: "file-page",
            type: "file"
        }, {
            id: 1005,
            title: "Another page 1",
            alias: "some-page-1",
            type: "text"
        }, {
            id: 1006,
            title: "Another page 2",
            alias: "some-page-2",
            type: "text"
        }, {
            id: 1007,
            title: "Another page 3",
            alias: "some-page-3",
            type: "text"
        }, {
            id: 1008,
            title: "Another page 4",
            alias: "some-page-4",
            type: "text"
        }, {
            id: 1009,
            title: "Another page 5",
            alias: "some-page-5",
            type: "text"
        }, {
            id: 1010,
            title: "Another page 6",
            alias: "some-page-6",
            type: "text"
        }, {
            id: 1011,
            title: "Another page 7",
            alias: "some-page-7",
            type: "text"
        }, {
            id: 1012,
            title: "Another page 8",
            alias: "some-page-8",
            type: "text"
        }, {
            id: 1013,
            title: "Another page 9",
            alias: "some-page-9",
            type: "text"
        }, {
            id: 1014,
            title: "Another page 10",
            alias: "some-page-10",
            type: "text"
        }, {
            id: 1015,
            title: "Another page 11",
            alias: "some-page-11",
            type: "text"
        }, {
            id: 1016,
            title: "Another page 12",
            alias: "some-page-12",
            type: "text"
        }, {
            id: 1017,
            title: "Another page 13",
            alias: "some-page-13",
            type: "text"
        }, {
            id: 1018,
            title: "Another page 14",
            alias: "some-page-14",
            type: "text"
        }]);
    };

    api.remove = function (documentId, callback) {
        var responses = [200, 500],
            responseCode = responses[Math.floor(Math.random() * responses.length)];
        if (responseCode === 200) {
            console.log("%c Document " + documentId + " was removed (not really)", "color: blue;");
        } else {
            console.log("%c Document " + documentId + " wasn't removed due to some mock circumstances", "color: red;");

        }
        callback(responseCode);
    };

    return api;
});