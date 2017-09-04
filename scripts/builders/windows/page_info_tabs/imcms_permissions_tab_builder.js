Imcms.define("imcms-permissions-tab-builder",
    [
        "imcms-bem-builder", "imcms-components-builder",
        "imcms-page-info-tabs-linker"
    ],
    function (BEM, components, linker) {

        return {
            name: "permissions",
            data: {},
            buildTab: function (index) {
                function createRestrictedCheckboxesDependingOnIndex(index) {
                    return mapCheckboxesFromAttributesArray([{
                        name: "edit_text" + index,
                        text: "Edit text"
                    }, {
                        name: "edit_menu" + index,
                        text: "Edit menu"
                    }, {
                        name: "edit_image" + index,
                        text: "Edit image"
                    }, {
                        name: "edit_loop" + index,
                        text: "Edit loop"
                    }, {
                        name: "edit_doc_info" + index,
                        text: "Edit doc info"
                    }]);
                }

                function mapCheckboxesFromAttributesArray(attributesArr) {
                    return attributesArr.map(function (attributes) {
                        return components.checkboxes.imcmsCheckbox("<div>", attributes);
                    });
                }

                var fieldItemBEM = new BEM({
                    block: "imcms-field",
                    elements: {
                        "item": "imcms-col-3"
                    }
                });

                var restrictedCheckboxes0 = createRestrictedCheckboxesDependingOnIndex(0);
                var $restrictedRole1Rights = components.checkboxes.checkboxContainer("<div>",
                    restrictedCheckboxes0,
                    {title: "Restricted 1"}
                );

                var restrictedCheckboxes1 = createRestrictedCheckboxesDependingOnIndex(1);
                var $restrictedRole2Rights = components.checkboxes.checkboxContainer("<div>",
                    restrictedCheckboxes1,
                    {title: "Restricted 2"}
                );

                this.data.restrictedCheckboxes = restrictedCheckboxes0.concat(restrictedCheckboxes1);

                var $permissionsWrapper = fieldItemBEM.buildBlock("<div>", [{
                    "item": $restrictedRole1Rights,
                    modifiers: ["float-l", "col-3"]
                }, {
                    "item": $restrictedRole2Rights,
                    modifiers: ["float-l", "col-3"]
                }]);

                return linker.buildFormBlock([$permissionsWrapper], index);
            },
            fillTabDataFromDocument: function (document) {
                var permissionsTab = this.data,

                    restrictedCheckboxes = {};

                permissionsTab.restrictedCheckboxes.forEach(function (permission) {
                    restrictedCheckboxes[permission.find("input").prop("name")] = permission;
                });

                document.permissions.forEach(function (permission, index) {
                    var edit_text = "edit_text",
                        edit_menu = "edit_menu",
                        edit_image = "edit_image",
                        edit_loop = "edit_loop",
                        edit_doc_info = "edit_doc_info";

                    restrictedCheckboxes[edit_text + index].setValue(permission[edit_text]);
                    restrictedCheckboxes[edit_menu + index].setValue(permission[edit_menu]);
                    restrictedCheckboxes[edit_image + index].setValue(permission[edit_image]);
                    restrictedCheckboxes[edit_loop + index].setValue(permission[edit_loop]);
                    restrictedCheckboxes[edit_doc_info + index].setValue(permission[edit_doc_info]);
                });
            }
        };
    }
);
