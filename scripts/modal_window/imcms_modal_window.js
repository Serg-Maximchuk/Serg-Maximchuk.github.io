Imcms.define("imcms-modal-window", ["jquery"], function ($) {
    function createModalWindow(question) {
        var modal, head, body,
            footer, btnYes, btnNo,
            layout = $("<div>", {
                "class": "imcms-modal-layout"
            })
        ;

        modal = $("<div>", {
            "id": "imcmsModalWindow",
            "class": "imcms-modal-window"
        });

        head = $("<div>", {
            "class": "imcms-modal-window__modal-head imcms-head",
            html: $("<div>", {
                "class": "imcms-modal-head__title imcms-title",
                text: "Modal Window"
            })
        }).appendTo(modal);

        body = $("<div>", {
            "class": "imcms-modal-window__modal-body",
            html: $("<div>", {
                "class": "imcms-modal-body__text imcms-info-msg",
                text: question
            })
        }).appendTo(modal);

        footer = $("<div>", {
            "class": "imcms-modal-window__modal-footer"
        }).appendTo(modal);

        btnYes = $("<button>", {
            "type": "button",
            "id": "imcmsButtonTrue",
            "class": "imcms-modal-footer__button imcms-button imcms-button--positive",
            text: "Yes"
        }).appendTo(footer);

        btnNo = $("<button>", {
            "type": "button",
            "id": "imcmsButtonFalse",
            "class": "imcms-modal-footer__button imcms-button imcms-button--negative",
            text: "No"
        }).appendTo(footer);

        return [modal, layout];
    }

    return {
        showModalWindow: function (question, callback) {
            var modalWindow = createModalWindow(question);
            var modal = modalWindow[0];
            var modalLayout = modalWindow[1];

            $("body").append(modalLayout).append(modal);

            modal.find("#imcmsButtonTrue").click(function () {
                callback(true);
                modal.remove();
                modalLayout.remove();
            });

            modal.find("#imcmsButtonFalse").click(function () {
                callback(false);
                modal.remove();
                modalLayout.remove();
            });
        }
    };
});
