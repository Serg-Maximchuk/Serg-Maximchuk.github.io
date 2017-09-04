Imcms.define("imcms-access-tab-builder",
    [
        "imcms-bem-builder", "imcms-components-builder", "imcms-roles-rest-api",
        "imcms-page-info-tabs-linker"
    ],
    function (BEM, components, rolesRestApi, linker) {

        return {
            name: "access",
            data: {},
            buildTab: function (index) {
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

                rolesRestApi.read(null)
                    .done(function (roles) {
                        var rolesDataMapped = roles.map(function (role) {
                            return {
                                text: role.name,
                                "data-value": role.id
                            }
                        });
                        $addRoleSelect.append(components.selects.mapOptionsToSelectItems(rolesDataMapped));
                    });

                var $addRoleButton = components.buttons.neutralButton({
                        text: "Add role",
                        click: function () {
                            console.log("%c Not implemented feature: add role.", "color: red;")
                        }
                    }),
                    $addRoleInnerBlock = addRoleInnerBEM.buildBlock("<div>", [
                        {"select": $addRoleSelect},
                        {"button": $addRoleButton}
                    ]),
                    $addRoleContainer = addRoleContainerBEM.buildBlock("<div>", [{"access-role": $addRoleInnerBlock}])
                ;

                this.data.$accessBlock = linker.buildFormBlock([$addRoleContainer], index);
                return this.data.$accessBlock;
            },
            fillTabDataFromDocument: function (document) {

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
                    roles = generateRoles(rolesBEM, document),
                    $rolesBody = rolesBEM.buildElement("body", "<div>").append(roles),
                    $rolesTable = rolesBEM.buildBlock("<div>", [
                        {"head": $rolesHead},
                        {"body": $rolesBody}
                    ]),
                    $rolesField = rolesContainerBEM.buildBlock("<div>", [{"access-role": $rolesTable}])
                ;

                this.data.$accessBlock.prepend($rolesField);

                function generateRoles(rolesBEM, document) {

                    function checkIfRoleNamePermittedInRole(roleName, role) {
                        return roleName === role.permission_name ? "checked" : undefined;
                    }

                    return document.roles.map(function (role) {
                        var $roleTitle = rolesBEM.buildBlockElement("column-title", "<div>", {text: role.name}),
                            viewRoleName = "VIEW",
                            $roleView = rolesBEM.makeBlockElement("column", components.radios.imcmsRadio("<div>", {
                                name: role.descriptor,
                                "data-value": viewRoleName,
                                checked: checkIfRoleNamePermittedInRole(viewRoleName, role)
                            })),
                            editRoleName = "EDIT",
                            $roleEdit = rolesBEM.makeBlockElement("column", components.radios.imcmsRadio("<div>", {
                                name: role.descriptor,
                                "data-value": editRoleName,
                                checked: checkIfRoleNamePermittedInRole(editRoleName, role)
                            })),
                            restricted1RoleName = "RESTRICTED_1",
                            $roleRestricted1 = rolesBEM.makeBlockElement("column", components.radios.imcmsRadio("<div>", {
                                name: role.descriptor,
                                "data-value": restricted1RoleName,
                                checked: checkIfRoleNamePermittedInRole(restricted1RoleName, role)
                            })),
                            restricted2RoleName = "RESTRICTED_2",
                            $roleRestricted2 = rolesBEM.makeBlockElement("column", components.radios.imcmsRadio("<div>", {
                                name: role.descriptor,
                                "data-value": restricted2RoleName,
                                checked: checkIfRoleNamePermittedInRole(restricted2RoleName, role)
                            })),
                            $deleteRoleButton = rolesBEM.makeBlockElement("button", components.buttons.closeButton({
                                click: function () {
                                    console.log("%c Not implemented feature: delete role.", "color: red;")
                                }
                            }));

                        return rolesBEM.buildBlockElement("row", "<div>").append([
                            $roleTitle,
                            $roleView,
                            $roleEdit,
                            $roleRestricted1,
                            $roleRestricted2,
                            $deleteRoleButton
                        ]);
                    });
                }
            }
        };
    }
);