/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 05.09.17
 */
Imcms.define("imcms-image-rest-api", ["imcms-rest-api"], function (rest) {
    var api = new rest.API("/api/image");

    // mock data
    api.read = function (data) {
        var mockData = {
            "1001": [
                {
                    name: "img1",
                    path: "img/choose_img/img1.png",
                    format: "PNG",
                    width: 146,
                    height: 114
                }, {
                    name: "img2",
                    path: "img/choose_img/img2.png",
                    format: "PNG",
                    width: 147,
                    height: 146
                }, {
                    name: "img3",
                    path: "img/choose_img/img3.png",
                    format: "PNG",
                    width: 32,
                    height: 29
                }, {
                    name: "img4",
                    path: "img/choose_img/img4.png",
                    format: "PNG",
                    width: 102,
                    height: 146
                }
            ]
        };

        return {
            done: function (onDone) {
                onDone(mockData[data.docId][+data.imageId + 1]);
            }
        }
    };

    return api;
});
