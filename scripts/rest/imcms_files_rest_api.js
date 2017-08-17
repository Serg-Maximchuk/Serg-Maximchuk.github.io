/**
 * Created by Serhii Maksymchuk from Ubrainians for imCode
 * 17.08.17.
 */
Imcms.define("imcms-files-rest-api", [], function () {
    return {
        create: function (data, callback) {
            callback.call();
        },
        read: function (data, callback) {
            var mockResponse = [{
                name: "images",
                path: "images",
                children: [
                    {
                        name: "images_2019",
                        path: "images/images_2019",
                        children: []
                    }, {
                        name: "images_2018",
                        path: "images/images_2018",
                        children: [
                            {
                                name: "flowers",
                                path: "images/images_2018/flowers",
                                children: [
                                    {
                                        name: "black",
                                        path: "images/images_2018/flowers/black",
                                        children: []
                                    }, {
                                        name: "rose",
                                        path: "images/images_2018/flowers/rose",
                                        children: [{
                                            name: "beer",
                                            path: "images/images_2018/flowers/rose/beer",
                                            children: []
                                        }]
                                    }
                                ]
                            }
                        ]
                    }, {
                        name: "images_2017",
                        path: "images/images_2017",
                        children: [
                            {
                                name: "cars",
                                path: "images/images_2017/cars",
                                children: [
                                    {
                                        name: "bmw",
                                        path: "images/images_2017/cars/bmw",
                                        children: []
                                    }, {
                                        name: "lada",
                                        path: "images/images_2017/cars/lada",
                                        children: [{
                                            name: "kalyna",
                                            path: "images/images_2017/cars/lada/kalyna",
                                            children: []
                                        }]
                                    }
                                ]
                            }, {
                                name: "holiday",
                                path: "images/images_2017/holiday",
                                children: []
                            }
                        ]
                    }, {
                        name: "images_2016",
                        path: "images/images_2016",
                        children: [
                            {
                                name: "summer",
                                path: "images/images_2016/summer",
                                children: [
                                    {
                                        name: "img",
                                        path: "images/images_2016/summer/img",
                                        children: []
                                    }, {
                                        name: "family",
                                        path: "images/images_2016/summer/family",
                                        children: [{
                                            name: "photo",
                                            path: "images/images_2016/summer/family/photo",
                                            children: []
                                        }]
                                    }
                                ]
                            }, {
                                name: "holiday",
                                path: "images/images_2016/holiday",
                                children: []
                            }, {
                                name: "spring",
                                path: "images/images_2016/spring",
                                children: []
                            }
                        ]
                    }
                ]
            }];
            callback.call(null, mockResponse);
        },
        update: function (data, callback) {
            callback.call();
        },
        remove: function (data, callback) {
            callback.call();
        }
    };
});
