Imcms.define("imcms-modal-window",
    ["imcms-bem-builder", "imcms-components-builder", "jquery"],
    function (BEM, components, $) {
        var $modal, $shadow;

        function createModalWindow(question, callback) {
            function closeModal() {
                $modal.remove();
                $shadow.remove();
            }

            function buildHead() {
                var headBEM = new BEM({
                    block: "imcms-head",
                    elements: {"title": "imcms-title"}
                });

                var $title = headBEM.buildElement("title", "<div>", {text: "Confirmation"});

                return headBEM.buildBlock("<div>", [{"title": $title}]);
            }

            function buildBody(question) {
                var bodyBEM = new BEM({
                    block: "imcms-modal-body",
                    elements: {"text": "imcms-info-msg"}
                });

                var $question = components.texts.infoText("<div>", question);

                return bodyBEM.buildBlock("<div>", [{"text": $question}]);
            }

            function buildFooter(callback) {
                var footerBEM = new BEM({
                    block: "imcms-modal-footer",
                    elements: {"button": "imcms-button"}
                });

                var $yesButton = components.buttons.positiveButton({
                    text: "Yes",
                    click: function () {
                        callback(true);
                        closeModal();
                    }
                });

                var $noButton = components.buttons.negativeButton({
                    text: "No",
                    click: function () {
                        callback(false);
                        closeModal();
                    }
                });

                return footerBEM.buildBlock("<div>", [
                    {"button": $yesButton},
                    {"button": $noButton}
                ]);
            }

            var modalWindowBEM = new BEM({
                block: "imcms-modal-window",
                elements: {
                    "modal-head": "imcms-head",
                    "modal-body": "imcms-modal-body",
                    "modal-footer": "imcms-modal-footer"
                }
            });

            var $head = buildHead();
            var $body = buildBody(question);
            var $footer = buildFooter(callback);

            return modalWindowBEM.buildBlock("<div>", [
                {"modal-head": $head},
                {"modal-body": $body},
                {"modal-footer": $footer}
            ])
        }

        function createLayout() {
            return $("<div>", {"class": "imcms-modal-layout"});
        }

        return {
            showModalWindow: function (question, callback) {
                $modal = createModalWindow(question, callback);
                $shadow = createLayout();

                $("body").append($shadow, $modal);
            }
        };
    }
);
