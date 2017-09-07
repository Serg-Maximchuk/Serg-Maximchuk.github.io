Imcms.define("imcms-access-tab-builder",
    [
        "imcms-bem-builder", "imcms-components-builder", "imcms-roles-rest-api",
        "imcms-page-info-tabs-linker"
    ],
    function (BEM, components, rolesRestApi, linker) {

        function buildRole(roleName, role, rolesBEM) {
            return rolesBEM.makeBlockElement("column", components.radios.imcmsRadio("<div>", {
                name: role.descriptor,
                value: roleName,
                checked: roleName === role.permission_name ? "checked" : undefined
            }));
        }

        function generateRoleRow(rolesBEM, role, $addRoleSelect) {
            var $roleTitle = rolesBEM.buildBlockElement("column-title", "<div>", {text: role.name}),
                $roleView = buildRole("VIEW", role, rolesBEM),
                $roleEdit = buildRole("EDIT", role, rolesBEM),
                $roleRestricted1 = buildRole("RESTRICTED_1", role, rolesBEM),
                $roleRestricted2 = buildRole("RESTRICTED_2", role, rolesBEM),
                $row = rolesBEM.buildBlockElement("row", "<div>", {"data-role-id": role.id}),
                $deleteRoleButton = rolesBEM.makeBlockElement("button", components.buttons.closeButton({
                    click: function () {
                        if (!$addRoleSelect.optionsCount()) {
                            $addRoleSelect.css("display", "block");
                            $addRoleSelect.next().css("display", "block");
                        }
                        if ($row.parent().find("[data-role-id]").length === 1) {
                            $row.parent().parent().css("display", "none");
                        }
                        components.selects.addOptionsToSelect([{
                            text: role.name,
                            "data-value": role.id
                        }], $addRoleSelect);
                        $row.detach();
                    }
                }))
            ;

            return $row.append([
                $roleTitle,
                $roleView,
                $roleEdit,
                $roleRestricted1,
                $roleRestricted2,
                $deleteRoleButton
            ]);
        }

        return {
            name: "access",
            data: {},

            buildTab: function (index, docId) {
                var addRoleContainerBEM = new BEM({
                        block: "imcms-field",
                        elements: {
                            "access-role": "imcms-access-addrole"
                        }
                    }),
                    addRoleInnerBEM = new BEM({
                        block: "imcms-access-addrole",
                        elements: {
                            "select": "imcms-select",
                            "button": "imcms-button"
                        }
                    })
                ;

                var $addRoleSelect = components.selects.imcmsSelect("<div>", {
                    id: "select3"
                });

                if (!docId) {
                    rolesRestApi.read(null)
                        .done(function (roles) {
                            var rolesDataMapped = roles.map(function (role) {
                                return {
                                    text: role.name,
                                    "data-value": role.id
                                }
                            });
                            components.selects.addOptionsToSelect(rolesDataMapped, $addRoleSelect);
                        });
                }

                var $addRoleButton = components.buttons.neutralButton({
                        text: "Add role"
                    }),
                    $addRoleInnerBlock = addRoleInnerBEM.buildBlock("<div>", [
                        {"select": $addRoleSelect},
                        {"button": $addRoleButton}
                    ]),
                    $addRoleContainer = addRoleContainerBEM.buildBlock("<div>", [{"access-role": $addRoleInnerBlock}]),
                    $accessBlock = linker.buildFormBlock([$addRoleContainer], index)
                ;

                var rolesBEM = new BEM({
                        block: "imcms-access-role",
                        elements: {
                            "head": "",
                            "title": "imcms-title",
                            "body": "",
                            "row": "",
                            "column-title": "imcms-title",
                            "column": "imcms-radio",
                            "button": "imcms-button"
                        }
                    }),
                    rolesContainerBEM = new BEM({
                        block: "imcms-field",
                        elements: {
                            "access-role": "imcms-access-role"
                        }
                    })
                ;

                var $titleRole = rolesBEM.buildBlockElement("title", "<div>", {text: "role"}),
                    $titleView = rolesBEM.buildBlockElement("title", "<div>", {text: "view"}),
                    $titleEdit = rolesBEM.buildBlockElement("title", "<div>", {text: "edit"}),
                    $titleRestricted1 = rolesBEM.buildBlockElement("title", "<div>", {text: "restricted 1"}),
                    $titleRestricted2 = rolesBEM.buildBlockElement("title", "<div>", {text: "restricted 2"}),
                    $rolesHead = rolesBEM.buildElement("head", "<div>").append([
                        $titleRole,
                        $titleView,
                        $titleEdit,
                        $titleRestricted1,
                        $titleRestricted2
                    ]),
                    $rolesBody = rolesBEM.buildElement("body", "<div>"),
                    $rolesTable = rolesBEM.buildBlock("<div>", [
                        {"head": $rolesHead},
                        {"body": $rolesBody}
                    ]),
                    $rolesField = rolesContainerBEM.buildBlock("<div>", [{"access-role": $rolesTable}])
                ;

                $addRoleButton.click(function () {
                    var id = $addRoleSelect.selectedValue();
                    var role = {
                        id: id,
                        name: $addRoleSelect.selectedText()
                    };
                    var $row = generateRoleRow(rolesBEM, role, $addRoleSelect);
                    $row.find(":radio")
                        .first()
                        .prop("checked", "checked");
                    $rolesBody.append($row);

                    $addRoleSelect.deleteOption(id);
                    if ($addRoleSelect.optionsCount() === 0) {
                        $addRoleSelect.css("display", "none");
                        $addRoleButton.css("display", "none");
                    } else {
                        $addRoleSelect.selectFirst();
                    }

                    $rolesTable.css("display", "block");
                });

                this.data.rolesBEM = rolesBEM;
                this.data.$addRoleSelect = $addRoleSelect;
                this.data.$rolesBody = $rolesBody;
                this.data.$rolesField = $rolesField.css("display", "none");

                $accessBlock.prepend($rolesField);

                return $accessBlock;
            },

            fillTabDataFromDocument: function (document) {

                var rolesBEM = this.data.rolesBEM;
                var $addRoleSelect = this.data.$addRoleSelect;
                var $rolesBody = this.data.$rolesBody;

                var roles = generateRolesRows(rolesBEM, $addRoleSelect, document);
                if (roles.length) {
                    $rolesBody.prepend(roles);
                    this.data.$rolesField.css("display", "block");
                }

                function generateRolesRows(rolesBEM, $addRoleSelect, document) {

                    rolesRestApi.read(null)
                        .done(function (roles) {
                            var rolesDataMapped = roles.filter(function (role) {
                                return !document.roles.some(function (docRole) {
                                    return role.id === docRole.id;
                                });

                            }).map(function (role) {
                                return {
                                    text: role.name,
                                    "data-value": role.id
                                }
                            });
                            $addRoleSelect.clearSelect();
                            if (rolesDataMapped.length) {
                                $addRoleSelect.css("display", "block");
                                components.selects.addOptionsToSelect(rolesDataMapped, $addRoleSelect);
                            } else {
                                $addRoleSelect.css("display", "none");
                            }
                        });

                    return document.roles.map(function (docRole) {
                        return generateRoleRow(rolesBEM, docRole, $addRoleSelect);
                    });
                }
            },

            clearTabData: function () {
                this.data.$rolesBody.empty();
                this.data.$rolesField.css("display", "none");
                this.fillTabDataFromDocument({roles: []});
            }
        };
    }
);
