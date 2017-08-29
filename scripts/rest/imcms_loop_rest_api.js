/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 29.08.17
 */
Imcms.define("imcms-loop-rest-api", ["imcms-rest-api"], function (rest) {
    var api = new rest.API("/api/loop");

    //mock data
    api.read = function (data, callback) {
        callback({
            docId: 1001,
            loopId: 1,
            entries: [{
                no: 1,
                enabled: true,
                content: "Lorem ipsum... 1"
            }, {
                no: 2,
                enabled: false,
                content: "Lorem ipsum... 2"
            }, {
                no: 3,
                enabled: true,
                content: "Lorem ipsum... 3"
            }, {
                no: 4,
                enabled: true,
                content: "Lorem ipsum... 4"
            }, {
                no: 5,
                enabled: false,
                content: "Lorem ipsum... 5"
            }, {
                no: 6,
                enabled: true,
                content: "Lorem ipsum... 6"
            }, {
                no: 7,
                enabled: false,
                content: "Lorem ipsum... 7"
            }, {
                no: 8,
                enabled: true,
                content: "Lorem ipsum... 8"
            }, {
                no: 9,
                enabled: true,
                content: "Lorem ipsum... 9"
            }]
        });
    };

    return api;
});
