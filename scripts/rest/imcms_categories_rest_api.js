Imcms.define("imcms-categories-rest-api", ["imcms-rest-api"], function (rest) {


    var api = new rest.API("/api/v0/users");

    //mock data
    api.read = function (data, callback) {
        callback([
            {
                id: 0,
                username: "Category secured"
            },
            {
                id: 1,
                username: "Category test"
            },
            {
                id: 2,
                username: "Category 1"
            },
            {
                id: 3,
                username: "Category 2"
            },
            {
                id: 4,
                username: "Category 3"
            }
        ]);
    };

    return api;

});
