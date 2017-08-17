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
                files: [
                    {
                        name: "sample1",
                        format: "JPG",
                        uploaded: "15.02.2017",
                        resolution: "635x120",
                        size: "37kB"
                    }, {
                        name: "sample3",
                        format: "BMP",
                        uploaded: "17.02.2017",
                        resolution: "635x120",
                        size: "34kB"
                    }, {
                        name: "sample4",
                        format: "GIF",
                        uploaded: "18.02.2017",
                        resolution: "64x64",
                        size: "16kB"
                    }
                ],
                folders: [
                    {
                        name: "images_2019",
                        path: "images/images_2019",
                        files: [
                            {
                                name: "sample1",
                                format: "JPG",
                                uploaded: "15.02.2017",
                                resolution: "635x120",
                                size: "37kB"
                            }, {
                                name: "sample2",
                                format: "PNG",
                                uploaded: "16.02.2017",
                                resolution: "635x120",
                                size: "35kB"
                            }, {
                                name: "sample4",
                                format: "GIF",
                                uploaded: "18.02.2017",
                                resolution: "64x64",
                                size: "16kB"
                            }
                        ],
                        folders: []
                    }, {
                        name: "images_2018",
                        path: "images/images_2018",
                        files: [
                            {
                                name: "sample2",
                                format: "PNG",
                                uploaded: "16.02.2017",
                                resolution: "635x120",
                                size: "35kB"
                            }, {
                                name: "sample3",
                                format: "BMP",
                                uploaded: "17.02.2017",
                                resolution: "635x120",
                                size: "34kB"
                            }, {
                                name: "sample4",
                                format: "GIF",
                                uploaded: "18.02.2017",
                                resolution: "64x64",
                                size: "16kB"
                            }
                        ],
                        folders: [
                            {
                                name: "flowers",
                                path: "images/images_2018/flowers",
                                files: [
                                    {
                                        name: "sample1",
                                        format: "JPG",
                                        uploaded: "15.02.2017",
                                        resolution: "635x120",
                                        size: "37kB"
                                    }, {
                                        name: "sample2",
                                        format: "PNG",
                                        uploaded: "16.02.2017",
                                        resolution: "635x120",
                                        size: "35kB"
                                    }, {
                                        name: "sample3",
                                        format: "BMP",
                                        uploaded: "17.02.2017",
                                        resolution: "635x120",
                                        size: "34kB"
                                    }
                                ],
                                folders: [
                                    {
                                        name: "black",
                                        path: "images/images_2018/flowers/black",
                                        files: [
                                            {
                                                name: "sample1",
                                                format: "JPG",
                                                uploaded: "15.02.2017",
                                                resolution: "635x120",
                                                size: "37kB"
                                            }, {
                                                name: "sample2",
                                                format: "PNG",
                                                uploaded: "16.02.2017",
                                                resolution: "635x120",
                                                size: "35kB"
                                            }, {
                                                name: "sample4",
                                                format: "GIF",
                                                uploaded: "18.02.2017",
                                                resolution: "64x64",
                                                size: "16kB"
                                            }
                                        ],
                                        folders: []
                                    }, {
                                        name: "rose",
                                        path: "images/images_2018/flowers/rose",
                                        files: [
                                            {
                                                name: "sample1",
                                                format: "JPG",
                                                uploaded: "15.02.2017",
                                                resolution: "635x120",
                                                size: "37kB"
                                            }, {
                                                name: "sample2",
                                                format: "PNG",
                                                uploaded: "16.02.2017",
                                                resolution: "635x120",
                                                size: "35kB"
                                            }, {
                                                name: "sample3",
                                                format: "BMP",
                                                uploaded: "17.02.2017",
                                                resolution: "635x120",
                                                size: "34kB"
                                            }, {
                                                name: "sample4",
                                                format: "GIF",
                                                uploaded: "18.02.2017",
                                                resolution: "64x64",
                                                size: "16kB"
                                            }
                                        ],
                                        folders: [{
                                            name: "beer",
                                            path: "images/images_2018/flowers/rose/beer",
                                            files: [
                                                {
                                                    name: "sample1",
                                                    format: "JPG",
                                                    uploaded: "15.02.2017",
                                                    resolution: "635x120",
                                                    size: "37kB"
                                                }, {
                                                    name: "sample2",
                                                    format: "PNG",
                                                    uploaded: "16.02.2017",
                                                    resolution: "635x120",
                                                    size: "35kB"
                                                }, {
                                                    name: "sample3",
                                                    format: "BMP",
                                                    uploaded: "17.02.2017",
                                                    resolution: "635x120",
                                                    size: "34kB"
                                                }
                                            ],
                                            folders: []
                                        }]
                                    }
                                ]
                            }
                        ]
                    }, {
                        name: "images_2017",
                        path: "images/images_2017",
                        files: [
                            {
                                name: "sample2",
                                format: "PNG",
                                uploaded: "16.02.2017",
                                resolution: "635x120",
                                size: "35kB"
                            }, {
                                name: "sample3",
                                format: "BMP",
                                uploaded: "17.02.2017",
                                resolution: "635x120",
                                size: "34kB"
                            }, {
                                name: "sample4",
                                format: "GIF",
                                uploaded: "18.02.2017",
                                resolution: "64x64",
                                size: "16kB"
                            }
                        ],
                        folders: [
                            {
                                name: "cars",
                                path: "images/images_2017/cars",
                                files: [
                                    {
                                        name: "sample1",
                                        format: "JPG",
                                        uploaded: "15.02.2017",
                                        resolution: "635x120",
                                        size: "37kB"
                                    }, {
                                        name: "sample4",
                                        format: "GIF",
                                        uploaded: "18.02.2017",
                                        resolution: "64x64",
                                        size: "16kB"
                                    }
                                ],
                                folders: [
                                    {
                                        name: "bmw",
                                        path: "images/images_2017/cars/bmw",
                                        files: [
                                            {
                                                name: "sample1",
                                                format: "JPG",
                                                uploaded: "15.02.2017",
                                                resolution: "635x120",
                                                size: "37kB"
                                            }
                                        ],
                                        folders: []
                                    }, {
                                        name: "lada",
                                        path: "images/images_2017/cars/lada",
                                        files: [
                                            {
                                                name: "sample1",
                                                format: "JPG",
                                                uploaded: "15.02.2017",
                                                resolution: "635x120",
                                                size: "37kB"
                                            }, {
                                                name: "sample2",
                                                format: "PNG",
                                                uploaded: "16.02.2017",
                                                resolution: "635x120",
                                                size: "35kB"
                                            }, {
                                                name: "sample3",
                                                format: "BMP",
                                                uploaded: "17.02.2017",
                                                resolution: "635x120",
                                                size: "34kB"
                                            }, {
                                                name: "sample4",
                                                format: "GIF",
                                                uploaded: "18.02.2017",
                                                resolution: "64x64",
                                                size: "16kB"
                                            }
                                        ],
                                        folders: [{
                                            name: "kalyna",
                                            path: "images/images_2017/cars/lada/kalyna",
                                            files: [
                                                {
                                                    name: "sample2",
                                                    format: "PNG",
                                                    uploaded: "16.02.2017",
                                                    resolution: "635x120",
                                                    size: "35kB"
                                                }, {
                                                    name: "sample3",
                                                    format: "BMP",
                                                    uploaded: "17.02.2017",
                                                    resolution: "635x120",
                                                    size: "34kB"
                                                }
                                            ],
                                            folders: []
                                        }]
                                    }
                                ]
                            }, {
                                name: "holiday",
                                path: "images/images_2017/holiday",
                                files: [
                                    {
                                        name: "sample1",
                                        format: "JPG",
                                        uploaded: "15.02.2017",
                                        resolution: "635x120",
                                        size: "37kB"
                                    }, {
                                        name: "sample3",
                                        format: "BMP",
                                        uploaded: "17.02.2017",
                                        resolution: "635x120",
                                        size: "34kB"
                                    }, {
                                        name: "sample4",
                                        format: "GIF",
                                        uploaded: "18.02.2017",
                                        resolution: "64x64",
                                        size: "16kB"
                                    }
                                ],
                                folders: []
                            }
                        ]
                    }, {
                        name: "images_2016",
                        path: "images/images_2016",
                        files: [
                            {
                                name: "sample1",
                                format: "JPG",
                                uploaded: "15.02.2017",
                                resolution: "635x120",
                                size: "37kB"
                            }, {
                                name: "sample4",
                                format: "GIF",
                                uploaded: "18.02.2017",
                                resolution: "64x64",
                                size: "16kB"
                            }
                        ],
                        folders: [
                            {
                                name: "summer",
                                path: "images/images_2016/summer",
                                files: [
                                    {
                                        name: "sample1",
                                        format: "JPG",
                                        uploaded: "15.02.2017",
                                        resolution: "635x120",
                                        size: "37kB"
                                    }, {
                                        name: "sample2",
                                        format: "PNG",
                                        uploaded: "16.02.2017",
                                        resolution: "635x120",
                                        size: "35kB"
                                    }
                                ],
                                folders: [
                                    {
                                        name: "img",
                                        path: "images/images_2016/summer/img",
                                        files: [
                                            {
                                                name: "sample2",
                                                format: "PNG",
                                                uploaded: "16.02.2017",
                                                resolution: "635x120",
                                                size: "35kB"
                                            }, {
                                                name: "sample3",
                                                format: "BMP",
                                                uploaded: "17.02.2017",
                                                resolution: "635x120",
                                                size: "34kB"
                                            }, {
                                                name: "sample4",
                                                format: "GIF",
                                                uploaded: "18.02.2017",
                                                resolution: "64x64",
                                                size: "16kB"
                                            }
                                        ],
                                        folders: []
                                    }, {
                                        name: "family",
                                        path: "images/images_2016/summer/family",
                                        files: [
                                            {
                                                name: "sample2",
                                                format: "PNG",
                                                uploaded: "16.02.2017",
                                                resolution: "635x120",
                                                size: "35kB"
                                            }, {
                                                name: "sample4",
                                                format: "GIF",
                                                uploaded: "18.02.2017",
                                                resolution: "64x64",
                                                size: "16kB"
                                            }
                                        ],
                                        folders: [{
                                            name: "photo",
                                            path: "images/images_2016/summer/family/photo",
                                            files: [
                                                {
                                                    name: "sample1",
                                                    format: "JPG",
                                                    uploaded: "15.02.2017",
                                                    resolution: "635x120",
                                                    size: "37kB"
                                                }, {
                                                    name: "sample2",
                                                    format: "PNG",
                                                    uploaded: "16.02.2017",
                                                    resolution: "635x120",
                                                    size: "35kB"
                                                }, {
                                                    name: "sample3",
                                                    format: "BMP",
                                                    uploaded: "17.02.2017",
                                                    resolution: "635x120",
                                                    size: "34kB"
                                                }, {
                                                    name: "sample4",
                                                    format: "GIF",
                                                    uploaded: "18.02.2017",
                                                    resolution: "64x64",
                                                    size: "16kB"
                                                }
                                            ],
                                            folders: []
                                        }]
                                    }
                                ]
                            }, {
                                name: "holiday",
                                path: "images/images_2016/holiday",
                                files: [
                                    {
                                        name: "sample1",
                                        format: "JPG",
                                        uploaded: "15.02.2017",
                                        resolution: "635x120",
                                        size: "37kB"
                                    }
                                ],
                                folders: []
                            }, {
                                name: "spring",
                                path: "images/images_2016/spring",
                                files: [
                                    {
                                        name: "sample1",
                                        format: "JPG",
                                        uploaded: "15.02.2017",
                                        resolution: "635x120",
                                        size: "37kB"
                                    }, {
                                        name: "sample3",
                                        format: "BMP",
                                        uploaded: "17.02.2017",
                                        resolution: "635x120",
                                        size: "34kB"
                                    }, {
                                        name: "sample4",
                                        format: "GIF",
                                        uploaded: "18.02.2017",
                                        resolution: "64x64",
                                        size: "16kB"
                                    }
                                ],
                                folders: []
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