Imcms.define("imcms-modal-window", ["jquery"], function ($) {
    function createModalWindow(question) {
        var modal, head, body, footer, btnYes, btnNo;

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
        });

        body = $("<div>", {
            "class": "imcms-modal-window__modal-body",
            html: $("<div>", {
                "class": "imcms-modal-body__text imcms-info-msg",
                text: question
            })
        });

        footer = $("<div>", {
            "class": "imcms-modal-window__modal-footer"
        });

        btnYes = $("<button>", {
            "type": "button",
            "id": "imcmsButtonTrue",
            "class": "imcms-modal-footer__button imcms-button imcms-button--positive",
            text: "Yes"
        });

        btnNo = $("<button>", {
            "type": "button",
            "id": "imcmsButtonFalse",
            "class": "imcms-modal-footer__button imcms-button imcms-button--negative",
            text: "No"
        });

        footer.append(btnYes).append(btnNo);
        return modal.append(head).append(body).append(footer);
    }

    function createLayout() {
        return $("<div>", {
            "class": "imcms-modal-layout"
        });
    }

    return {
        showModalWindow: function (question, callback) {
            var modal = createModalWindow(question);
            var modalLayout = createLayout();

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
