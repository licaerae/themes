/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

function createHtmlItem() {
    var html = "", cadreDefault = "", kids;
    var menu = parseInt($('#bsMainMenu').val());
    html += '<div class="" style="width:$bsWidthMainWindowpx;height:$bsHeightMainWindowpx;">\n\n';
    html += '<style>\n';
    if ($('#bsListFonts').val() !== "0") {
        html += '@font-face {\n';
        html += '\tfont-family: myFontTheme;\n';
        html += "\tsrc: url('plugins/themes/core/uploads/fonts/" + $('#bsListFonts').val() + "') format('truetype');\n";
        html += '}\n';
    }
    html += '$bsCadre';
    html += '.noPaddingLeft { padding-left: 0;}\n';
    html += '.noPaddingRight { padding-right: 0;}\n';
    html += '.noMarginBottom { margin-bottom: 0;}\n';
    html += '#bt_returnFullScreen { display: none;}\n';
    html += '</style>\n\n';
    html += '<script>\n';
    if ($('#menuBarOverflow').width() < $('#menuBar').width()) {
        html += 'var step = 50;\n';
        html += 'var scrolling = false;\n\n';
        html += "$('#scrollBeginButton').on('click', function(event) {\n";
        html += '\t$("#menuBarOverflow").animate({\n';
        if (menu < 2) {
            html += '\t\tscrollLeft: "-=" + step + "px"\n';
        }
        else {
            html += '\t\tscrollTop: "-=" + step + "px"\n';
        }
        html += '\t});\n';
        html += '}).on("mouseover", function(event) {\n';
        html += '\tscrolling = true;\n';
        html += '\tscrollContent("left");\n';
        html += '}).on("mouseout", function(event) {\n';
        html += '\tscrolling = false;\n';
        html += '});\n\n';
        html += "$('#scrollEndButton').on('click', function(event) {\n";
        html += '\t$("#menuBarOverflow").animate({\n';
        if (menu < 2) {
            html += '\t\tscrollLeft: "+=" + step + "px"\n';
        }
        else {
            html += '\t\tscrollTop: "+=" + step + "px"\n';
        }
        html += '\t});\n';
        html += '}).on("mouseover", function(event) {\n';
        html += '\tscrolling = true;\n';
        html += '\tscrollContent("right");\n';
        html += '}).on("mouseout", function(event) {\n';
        html += '\tscrolling = false;\n';
        html += '});\n\n';
        html += 'function scrollContent(direction) {\n';
        html += '\tvar amount = (direction === "left" ? "-=3px" : "+=3px");\n';
        html += '\t$("#menuBarOverflow").animate({\n';
        if (menu < 2) {
            html += '\t\tscrollLeft: amount\n';
        }
        else {
            html += '\t\tscrollTop: amount\n';
        }
        html += '\t}, 1, function () {\n';
        html += '\t\tif (scrolling) {\n';
        html += '\t\t\tscrollContent(direction);\n';
        html += '\t\t}\n';
        html += '\t});\n';
        html += '}\n\n';
    }
    html += '//displayFrame("#myBootstrapWindow",#idSecondaire#0);\n';
    html += "$('$myFrameMenu').on('click',function(){\n";
    html += "\tframeHeader_id = $(this).data('planid');\n";
    html += "\tdisplayFrame('#myBootstrapWindow',frameHeader_id);\n";
    if ($('#bsStateYes').hasClass('btn-success')) {
        html += "\t$('#myBreadcrumbs').empty();\n";
        html += "\tvar temp = updateBread(frameHeader_id,$(this).text());\n";
        html += "\t$('#myBreadcrumbs').append(temp);\n";
    }
    html += "});\n\n";
    if ($('#bsStateYes').hasClass('btn-success')) {
        html += "function MyBread(frameHeader_id){\n";
        html += "\tdisplayFrame('#div_frameMenu',frameHeader_id);\n";
        html += "\t$('#myBreadcrumbs').empty();\n";
        html += "\tvar temp = updateBread(frameHeader_id,\"\");\n";
        html += "\t$('#myBreadcrumbs').append(temp);      \n";
        html += "}\n\n";

        html += "function updateBread(id,text)\n";
        html += "{\n";
        html += "\tvar html='';\n";
        html += "\tif(id == #idSecondaire#0) {\n";
        html += "\t\thtml = '<li class=\"active\">Home</li>';\n";
        html += "\t}\n";
        html += "\telse {\n";
        // class myFrameBread à définir ou à supprimer
        html += "\t\thtml = '<li><a id=\"home\" class=\"myFrameBread\" onclick=\"MyBread(#idSecondaire#0)\" data-planid=\"#idSecondaire#0\">Home</a></li>';\n";
        html += "\t\thtml += '<li class=\"active\">'+text+'</li>';\n";
        html += "\t}\n";
        html += "\treturn html;\n";
        html += "}\n\n";
    }
    html += "</script>\n";
    html += '$bsWindow\n';
    cadreDefault = ".default {\n";
    var bsWindow = $('#div_frameMenu').parent().clone();
    if ($('#bsListFonts').val() !== "0") {
        bsWindow.find('#myBootstrapMenu > h4').css({'font-family': 'myFontTheme, Helvetica, Arial, sans-serif'});
    }
    if ($('#bsIsStyle').prop("checked")) {
        cadreDefault += "\tbackground-color : " + $('#bsBgColorWindow').val() + ";\n";
        cadreDefault += "\tcolor : " + $('#bsColorWindow').val() + ";\n";
    }
    var image = $('#bsImageMainWindow').val();
    if (image !== "0")
        cadreDefault += "\tbackground-color : transparent;\n";
    if ($('#bsBorderBold').val() !== "none") {
        cadreDefault += "\tborder : " + (($('#bsBorderWindow').val() === "") ? "0" : $('#bsBorderWindow').val()) + "px " + $('#bsBorderBold').val() + " " + $('#bsBorderColor').val() + ";\n";
    }
    else
        cadreDefault += "\tborder : none;\n";
    cadreDefault += "\tborder-radius : " + (($('#bsBorderRadius').val() !== "") ? $('#bsBorderRadius').val() + "px;\n" : "0px;\n");
    if ($("input[name='bsBorderShadow1']").val() !== "" && $("input[name='bsBorderShadow2']").val() !== "" && $("input[name='bsBorderShadow3']").val() !== "") {
        cadreDefault += "\tbox-shadow : " + $("input[name='bsBorderShadow1']").val() + 'px ' + $("input[name='bsBorderShadow2']").val() + 'px ' + $("input[name='bsBorderShadow3']").val() + 'px ' + $("input[name='bsBorderShadowColor']").val() + ";\n";
    }
    cadreDefault += "}\n";
    html = html.replace("$bsWidthMainWindow", $('#bsWidthMainWindow').val());
    html = html.replace("$bsHeightMainWindow", $('#bsHeightMainWindow').val());
    html = html.replace("$bsCadre", cadreDefault);
    bsWindow.find('#myBootstrapMenu').css({'color': '', 'background-color': '', 'border': '', 'border-radius': '', 'box-shadow': ''});
    bsWindow.find('#myBootstrapState').css({'color': '', 'background-color': '', 'border': '', 'border-radius': '', 'box-shadow': ''});
    bsWindow.find('#myBootstrapWindow').css({'color': '', 'background-color': '', 'border': '', 'border-radius': '', 'box-shadow': ''});
    bsWindow.find('#myBootstrapWindow').removeClass('well');
    bsWindow.find('.popover').remove();
    if ($('#bsStyleCadreYes').hasClass('btn-success') === false)
        bsWindow.find('#myBootstrapWindow').addClass('BSWINDOW');
    else
        bsWindow.find('#myBootstrapWindow').css('margin-bottom', '20px');
    if (bsWindow.find('.myBsButton').length !== 0) {
        kids = bsWindow.find(".myBsButton");
        html = html.replace("$myFrameMenu", '.myBsButton');
    }
    if (bsWindow.find('.myBsNavTab').length !== 0) {
        kids = bsWindow.find(".myBsNavTab");
        html = html.replace("$myFrameMenu", '.myBsNavTab');
    }
    if (bsWindow.find('.myBsNavPill').length !== 0) {
        kids = bsWindow.find(".myBsNavPill");
        html = html.replace("$myFrameMenu", '.myBsNavPill');
    }
    kids.each(function (index) {
        if ($(this).attr('data-planid') === 'X')
            $(this).attr('data-planid', '#idSecondaire#' + index);
    });
    html = html.replace("$bsWindow", bsWindow.html());
    html = html.replace('no-repeat;', 'no-repeat; background-size: 100% 100%;');
    html = html.replace(/well/g, "well default");
    if ($('#bsStyleCadreYes').hasClass('btn-success') === false)
        html = html.replace(/BSWINDOW/g, "well");
    html = html.replace("icon-home", "icon maison-house109");
    return html;
}

function createPlanThemes(id, idDrop, name, sizeX, sizeY) {
    jeedom.plan.saveHeader({
        planHeader: {
            name: name,
            configuration: {
                desktopSizeX: sizeX,
                desktopSizeY: sizeY,
                enableOnMobile: "0",
                mobileProportion: "1",
                noReturnFullScreen: "1",
                responsiveMode: "0",
                tabletteProportion: "1"
            }
        },
        error: function (error) {
            $('#div_alert').showAlert({message: error.message, level: 'danger'});
        },
        success: function (data) {
            if (id === -1) {
                myTheme.myCadre = data.id;
                $('#bsMyMyCadre').val(myTheme.myCadre);
            }
            else if (idDrop === -1) {
                myTheme.globalPlanId[id] = data.id;
            }
            else {
                myTheme.globalPlanId[id][idDrop] = data.id;
            }
            notify('<Création d\'un Plan', 'Plan N°' + data.id + ' créer avec succès', 'success');
        }
    });
}

function updatePlanThemes(id, idDrop, name, sizeX, sizeY) {
    var planId;
    if (id === -1)
        planId = myTheme.myCadre;
    else if (idDrop === -1)
        planId = myTheme.globalPlanId[id];
    else
        planId = myTheme.globalPlanId[id][idDrop];
    jeedom.plan.saveHeader({
        planHeader: {
            name: name,
            id: planId,
            configuration: {
                desktopSizeX: sizeX,
                desktopSizeY: sizeY,
                enableOnMobile: "0",
                mobileProportion: "1",
                noReturnFullScreen: "1",
                responsiveMode: "0",
                tabletteProportion: "1"
            }
        },
        error: function (error) {
            $('#div_alert').showAlert({message: error.message, level: 'danger'});
        },
        success: function () {
            var planId;
            if (id === -1)
                planId = myTheme.myCadre;
            else if (idDrop === -1)
                planId = myTheme.globalPlanId[id];
            else
                planId = myTheme.globalPlanId[id][idDrop];
            notify('Mise à Jour d\'un Plan', 'Plan N°' + planId + ' mis à jour avec succès', 'success');
        }
    });
}

function isPlanThemes() {
    jeedom.plan.allHeader({
        error: function (error) {
            $('#div_alert').showAlert({message: error.message, level: 'danger'});
        },
        success: function (data) {
            $('#bsDesignButton').prop('disabled', true);
            var options = '<option value="0">Aucune</option>';
            if (data.length !== 0) {
                var ids = new Array();
                for (var nbHeader = 0; nbHeader < data.length; nbHeader++) {
                    ids[nbHeader] = data[nbHeader].id;
                }
                if (ids.indexOf(myTheme.myCadre) === -1) {
                    notify('Check-Up des Plans', 'Plan de la fenêtre principale manquant', 'error');
                    myTheme.myCadre = "";
                    $('#bsDesignButton').prop('disabled', false);
                    $('#bsMyCadre').val(myTheme.myCadre);
                }
                for (var nbPlan = 0; nbPlan < myTheme.myButtons.length; nbPlan++) {
                    if (myTheme.myDropdowns[nbPlan].length !== 0) {
                        for (var drops = 0; drops < myTheme.myDropdowns[nbPlan].length; drops++) {
                            if (ids.indexOf(myTheme.globalPlanId[nbPlan][drops]) === -1) {
                                notify('Check-Up des Plans', 'Plan ' + myTheme.myDropdowns[nbPlan][drops] + ' du sous menu ' + myTheme.myButtons[nbPlan] + ' manquant', 'error');
                                myTheme.globalPlanId[nbPlan][drops] = "";
                                $('#bsDesignButton').prop('disabled', false);
                                $('#bsMyPlanId').val(JSON.stringify(myTheme.globalPlanId));
                            }
                            else {
                                secondaryPages.add(myTheme.globalPlanId[nbPlan][drops], myTheme.myDropdowns[nbPlan][drops]);
                                options += '<option data-plan="' + nbPlan + '" data-drop="' + drops + '" value="' + myTheme.globalPlanId[nbPlan][drops] + '">' + myTheme.myDropdowns[nbPlan][drops] + '</option>';
                            }
                        }
                    }
                    else {
                        if (ids.indexOf(myTheme.globalPlanId[nbPlan]) === -1) {
                            notify('Check-Up des Plans', 'Plan ' + myTheme.myButtons[nbPlan] + ' manquant', 'error');
                            myTheme.globalPlanId[nbPlan] = "";
                            $('#bsDesignButton').prop('disabled', false);
                            $('#bsMyPlanId').val(JSON.stringify(myTheme.globalPlanId));
                        }
                        else {
                            options += '<option data-plan="' + nbPlan + '" data-drop="-1" value="' + myTheme.globalPlanId[nbPlan] + '">' + myTheme.myButtons[nbPlan] + '</option>';
                            secondaryPages.add(myTheme.globalPlanId[nbPlan], myTheme.myButtons[nbPlan]);
                        }
                    }
                }
                if ($('#bsDesignButton').prop('disabled'))
                    notify('Check-up des Plans', 'Check-Up complet, Tous les plans ont été trouvé', 'success');
            }
            else {
                myTheme.globalPlanId = '[]';
                $('#bsDesignButton').prop('disabled', false);
            }
            $('#bsPageSelect').empty();
            $('#bsPageSelect').html(options);
            $('#bsPageSelect').val("0");
        }
    });
}

function createFirstPlan() {
    jeedom.plan.byPlanHeader({
        id: myTheme.myCadre,
        error: function (error) {
            $('#div_alert').showAlert({message: error.message, level: 'danger'});
        },
        success: function (objects) {
            if (whichView !== 'menuPopover')
                $('*').popover('destroy');
            var html = createHtmlItem();
            var idSecondaire = 1;
            html = html.replace(/#idSecondaire#0/gi, myTheme.globalPlanId[0]);
            for (var buttons = 1; buttons < myTheme.myButtons.length; buttons++) {
                if (myTheme.myDropdowns[buttons].length !== 0) {
                    var textDrops = myTheme.myDropdowns[buttons];
                    for (var indexDrop = 0; indexDrop < textDrops.length; indexDrop++) {
                        html = html.replace('#idSecondaire#' + idSecondaire, myTheme.globalPlanId[buttons][indexDrop]);
                        idSecondaire++;
                    }
                }
                else {
                    html = html.replace('#idSecondaire#' + idSecondaire, myTheme.globalPlanId[buttons]);
                    idSecondaire++;
                }
            }
            var changed = false, plan = {};
            var plans = [];
            plan.position = {};
            plan.display = {};
            plan.css = {'z-index': "1002", 'zoom': 1};
            plan.display.text = html;
            plan.link_type = 'text';
            plan.link_id = 9999;
            plan.planHeader_id = myTheme.myCadre;
            plan.display.height = $('#bsHeightMainWindow').val();
            plan.display.width = $('#bsWidthMainWindow').val();
            plan.position.top = 0;
            plan.position.left = 0;
            for (var index in objects) {
                if (objects[index].plan.link_id === "9999") {
                    plan.css = objects[index].plan.css;
                    plan.css['z-index'] = "1002";
                    plan.css['zoom'] = "1";
                    plan.id = objects[index].plan.id;
                    objects[index].plan = plan;
                    changed = true;
                }
                plans.push(objects[index].plan);
            }
            if (!changed)
                plans.push(plan);
            jeedom.plan.save({
                plans: plans,
                error: function (error) {
                    $('#div_alert').showAlert({message: error.message, level: 'danger'});
                    bsMenuThemesApercu();
                },
                success: function () {
                    notify('Création Boostrap', 'insertion du code Bootstrap dans la page principale N° ' + myTheme.myCadre, 'success');
                    bsMenuThemesApercu();
                }
            });
        }
    });
}

function createPagePlan(id) {
    jeedom.plan.byPlanHeader({
        id: id,
        error: function (error) {
            $('#div_alert').showAlert({message: error.message, level: 'danger'});
        },
        success: function (objects) {
            if (whichView !== 'menuPopover')
                $('*').popover('destroy');
            var myBsWindow = $('#myBsWindow').clone();
            var myCadre = myBsWindow.find("div[name*='myCadre']");
            myCadre.each(function (index) {
                $(this).find('div').remove();
                var newPosLeft, newPosTop;
                if ($('#bsStyleCadreNo').hasClass("btn-success")) {
                    var top = $('#myBsWindow').find("div[name*='myCadre']").eq(index).position().top;
                    var left = $('#myBsWindow').find("div[name*='myCadre']").eq(index).position().left;
                    newPosLeft = left - $('#myCadreWindow').position().left - 16;
                    newPosTop = top - $('#myCadreWindow').position().top - 1;
                }
                else {
                    newPosLeft = 0;
                    newPosTop = 0;
                }
                if (top !== "") {
                    $(this).css('top', newPosTop);
                }
                if (left !== "") {
                    $(this).css('left', newPosLeft);
                }
            });
            myBsWindow.find('#myCadreWindow').removeClass("container-fluid well");
            myBsWindow.find('#myCadreWindow').css('position', 'absolute');
            myBsWindow.find('#myCadreWindow').css('margin-left', '');
            myBsWindow.find("div[name*='myCadre']").removeClass("ui-resizable ui-resizable-resizing ui-draggable ui-draggable-dragging ui-draggable-handle");
            //myBsWindow.find('h4').css('font-family', 'myFontTheme, Helvetica, Arial, sans-serif');
            var changed = false, plan = {};
            var plans = [];
            plan.position = {};
            plan.display = {};
            plan.css = {'z-index': $('#bsPageLevel').val(), 'zoom': 1};
            plan.display.text = myBsWindow.html();
            plan.display.text = plan.display.text.replace('no-repeat;', 'no-repeat; background-size: 100% 100%;');
            plan.link_type = 'text';
            plan.link_id = 9999;
            plan.planHeader_id = id;
            plan.display.height = $('#bsHeightWindow').val();
            plan.display.width = $('#bsWidthWindow').val();
            plan.position.top = 0;
            plan.position.left = 0;
            for (var index in objects) {
                if (objects[index].plan.link_id === "9999") {
                    plan.css = objects[index].plan.css;
                    plan.css['z-index'] = $('#bsPageLevel').val();
                    plan.css['zoom'] = '1';
                    plan.id = objects[index].plan.id;
                    //plan.position = objects[index].plan.position;
                    objects[index].plan = plan;
                    changed = true;
                }
                plans.push(objects[index].plan);
            }
            if (!changed)
                plans.push(plan);
            jeedom.plan.save({
                plans: plans,
                error: function (error) {
                    $('#div_alert').showAlert({message: error.message, level: 'danger'});
                    bsMenuThemesApercu();
                },
                success: function () {
                    notify('Création Boostrap', 'insertion du code Bootstrap dans la page secondaire  N° ' + id, 'success');
                    bsMenuThemesApercu();
                }
            });
        }
    });
}

function deletePlanThemes(id, idDrop) {
    var planId;
    if (id === -1)
        planId = myTheme.myCadre;
    else if (idDrop === -1)
        planId = myTheme.globalPlanId[id];
    else
        planId = myTheme.globalPlanId[id][idDrop];
    jeedom.plan.removeHeader({
        id: planId,
        error: function (error) {
            $('#div_alert').showAlert({message: error.message, level: 'danger'});
        },
        success: function () {
            var planId;
            if (id === -1) {
                planId = myTheme.myCadre;
                myTheme.myCadre = '';
            }
            else if (idDrop === -1) {
                planId = myTheme.globalPlanId[id];
                myTheme.globalPlanId[id] = '';
            }
            else {
                planId = myTheme.globalPlanId[id][idDrop];
                myTheme.globalPlanId[id][idDrop] = '';
            }
            notify('Suppression d\'un Plan', 'Plan N°' + planId + ' supprimé avec succès', 'success');
        }
    });
}

function getColorButton(button) {
    var myColor = "";
    myColor = button.hasClass('btn-default') ? 'btn-default' : "";
    myColor += button.hasClass('btn-primary') ? 'btn-primary' : "";
    myColor += button.hasClass('btn-success') ? 'btn-success' : "";
    myColor += button.hasClass('btn-info') ? 'btn-info' : "";
    myColor += button.hasClass('btn-warning') ? 'btn-warning' : "";
    myColor += button.hasClass('btn-danger') ? 'btn-danger' : "";
    return myColor;
}

function createItemButtons(idButton, textButton, color, textDrops, planId) {
    var pullLeft = $('#bsGroupYes').hasClass('btn-success') ? '' : 'pull-left ';
    var block = parseInt($('#bsMainMenu').val()) > 1 ? 'btn-block ' : '';
    var addButtons = "";
    if (textDrops !== "") {
        addButtons = '<button type="button" class="' + pullLeft + 'btn ' + block + $('#bsWidthButton').val() + ' ' + color + ' dropdown-toggle" data-toggle="dropdown" aria-expanded="false">' + textButton + '<span class="caret"></span></button><ul class="dropdown-menu" role="menu" style="z-index: 1002;">';
        var addDropdownButtonsItems = "";
        var planIdDrops = new Array();
        for (var index = 0; index < textDrops.length; index++) {
            if (is_array(planId))
                planIdDrops[index] = init(planId[index]);
            else
                planIdDrops[index] = '';
            addDropdownButtonsItems += '<li><a class="myBsButton" data-planid="' + init(planIdDrops[index], 'X') + '">' + textDrops[index] + '</a></li>';
        }
        myTheme.globalPlanId[idButton] = planIdDrops;
        addButtons += addDropdownButtonsItems + '</ul>';
    }
    else {
        addButtons = '<button type="button" class="' + pullLeft + 'btn ' + block + $('#bsWidthButton').val() + ' ' + color + ' myBsButton" data-planid="' + init(planId, 'X') + '">' + textButton + '</button>';
        myTheme.globalPlanId[idButton] = init(planId);
    }
    if (idButton === 0) {
        addButtons = '<button type="button" class="' + pullLeft + 'btn ' + block + $('#bsWidthButton').val() + ' ' + color + ' myBsButton" id="bsHomeButton" data-planid="' + init(planId, 'X') + '">' + textButton + '</button>';
        myTheme.myButtons[idButton] = 'Général';
        myTheme.myColors[idButton] = $('#bsColorHome').val();
        myTheme.myDropdowns[idButton] = '';
        return  addButtons;
    }
    else {
        myTheme.myButtons[idButton] = textButton;
        myTheme.myColors[idButton] = color;
        myTheme.myDropdowns[idButton] = textDrops;
        return '<div class="btn-group ' + block + 'buttonItems">' + addButtons + '</div>';
    }
}

function createItemTabsPills(idButton, textButton, color, textDrops, planId, pills) {
    var cssClass = pills === false ? 'navTabsItems' : 'navPillsItems';
    var cssItemClass = pills === false ? 'myBsNavTab' : 'myBsNavPill';
    var addNav = "";
    if (textDrops !== "") {
        addNav = '<li class="' + cssClass + '" role="presentation" class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">' + textButton + '<span class="caret"></span></a><ul class="dropdown-menu" role="menu" style="z-index: 1002;">';
        var addNavItems = "";
        var planIdDrops = new Array();
        for (var index = 0; index < textDrops.length; index++) {
            if (isset(planId))
                planIdDrops[index] = planId[index];
            else
                planIdDrops[index] = planId;
            addNavItems += '<li class="" role="presentation"><a class="' + cssItemClass + '" data-planid="' + init(planIdDrops[index], 'X') + '">' + textDrops[index] + '</a></li>';
        }
        myTheme.globalPlanId[idButton] = planIdDrops;
        addNav += addNavItems + '</ul>';
    }
    else {
        addNav = '<li class="' + cssClass + '" role="presentation"><a class="' + cssItemClass + '" data-planid="' + init(planId, 'X') + '">' + textButton + '</a></li>';
        myTheme.globalPlanId[idButton] = planId;
    }
    if (idButton === 0) {
        myTheme.myButtons[idButton] = 'Général';
    }
    else {
        myTheme.myButtons[idButton] = textButton;
    }
    myTheme.myColors[idButton] = color;
    myTheme.myDropdowns[idButton] = textDrops;
    return addNav;
}

function removeButton(id) {
    var tempPlanId = new Array();
    var tempMyButtons = new Array();
    var tempMyDropdowns = new Array();
    var tempMyColors = new Array();
    var nbPlan = 0;
    for (var index = 0; index < myTheme.myButtons.length; index++) {
        if (index !== id) {
            tempPlanId[nbPlan] = myTheme.globalPlanId[index];
            tempMyButtons[nbPlan] = myTheme.myButtons[index];
            tempMyDropdowns[nbPlan] = myTheme.myDropdowns[index];
            tempMyColors[nbPlan] = myTheme.myColors[index];
            nbPlan++;
        }
    }
    myTheme.globalPlanId = tempPlanId;
    myTheme.myButtons = tempMyButtons;
    myTheme.myDropdowns = tempMyDropdowns;
    myTheme.myColors = tempMyColors;
}

function addItemMenu(html) {
    var menuBar;
    switch ($('#bsStyleButton').val()) {
        case '0':
            if ($('#bsGroupYes').hasClass('btn-success')) {
                menuBar = $('#menuBar').find('#menuBarItems');
            }
            else {
                menuBar = $('#menuBar');
            }
            break;
        case '1':
            menuBar = $('#menuBar').find('#menuBarItems');
            break;
        case '2':
            menuBar = $('#menuBar').find('#menuBarItems');
            break;
    }
    menuBar.append(html);
    switch ($('#bsMainMenu').val()) {
        case '0':
        case '1':
            return menuBar.children().eq(menuBar.children().length - 1).outerWidth(true);
            break;
        case '2':
        case '3':
            return menuBar.children().eq(menuBar.children().length - 1).outerHeight(true);
            break;
    }
}

function updateItemMenu(idButton, html) {
    var menuBar;
    switch ($('#bsStyleButton').val()) {
        case '0':
            menuBar = $('#menuBar').find('.buttonItems');
            break;
        case '1':
            menuBar = $('#menuBar').find('.navTabsItems');
            break;
        case '2':
            menuBar = $('#menuBar').find('.navPillsItems');
            break;
    }
    menuBar.eq(parseInt(idButton - 1)).replaceWith(html);
    switch ($('#bsMainMenu').val()) {
        case '0':
        case '1':
            return menuBar.eq(parseInt(idButton - 1)).outerWidth(true);
            break;
        case '2':
        case '3':
            return menuBar.eq(parseInt(idButton - 1)).outerHeight(true);
            break;
    }
}

function delItemMenu(idButton) {
    var menuBar;
    switch ($('#bsStyleButton').val()) {
        case '0':
            menuBar = $('#menuBar').find('.buttonItems');
            break;
        case '1':
            menuBar = $('#menuBar').find('.navTabsItems');
            break;
        case '2':
            menuBar = $('#menuBar').find('.navPillsItems');
            break;
    }
    menuBar.eq(parseInt(idButton - 1)).remove();
}

function countItemsMenu() {
    var menuBar;
    switch ($('#bsStyleButton').val()) {
        case '0':
            menuBar = $('#menuBar').find('.buttonItems');
            break;
        case '1':
            menuBar = $('#menuBar').find('.navTabsItems');
            break;
        case '2':
            menuBar = $('#menuBar').find('.navPillsItems');
            break;
    }
    return menuBar.length;
}

function createMenuBar() {
    if (!initThemes)
        return;
    switch ($('#bsStyleButton').val()) {
        case '0':
            createMenuBarButtons();
            break;
        case '1':
            createMenuBarNavs(false);
            break;
        case '2':
            createMenuBarNavs(true);
            break;

    }
}

function createMenuBarButtons() {
    $('#menuBar').empty();
    switch ($('#bsMainMenu').val()) {
        case '0':
        case '1':
            if ($('#bsViewMenuYes').hasClass('btn-success'))
                $('#myBootstrapMenu > h4').show();
            var group = $('#bsGroupYes').hasClass('btn-success') ? '<div class="btn-group pull-left" role="group" id="menuBarItems"></div>' : '';
            var widthMenuBar = 5;
            $('#menuBar').append(group);
            var home = createItemButtons(0, '<i class="icon maison-house109"></i>', $('#bsColorHome').val(), '', myTheme.globalPlanId[0]);
            for (var index = 1; index < myTheme.myButtons.length; index++) {
                widthMenuBar += addItemMenu(createItemButtons(index, myTheme.myButtons[index], myTheme.myColors[index], myTheme.myDropdowns[index], myTheme.globalPlanId[index]));
            }
            updateHighLowMenu(widthMenuBar, home);
            if ($('#bsMainMenu').val() === '0')
                $('#bsMenuView').prependTo('#bsTop');
            else
                $('#bsMenuView').appendTo('#bsTop');
            break;
        case '2':
        case '3':
            if ($('#bsGroupYes').hasClass('btn-success'))
                bsGroupNo();
            if ($('#bsViewMenuYes').hasClass('btn-success'))
                $('#myBootstrapMenu > h4').hide();
            var heightMenuBar = 0;
            var home = createItemButtons(0, '<i class="icon maison-house109"></i>', $('#bsColorHome').val(), '', myTheme.globalPlanId[0]);
            for (var index = 1; index < myTheme.myButtons.length; index++) {
                heightMenuBar += addItemMenu(createItemButtons(index, myTheme.myButtons[index], myTheme.myColors[index], myTheme.myDropdowns[index], myTheme.globalPlanId[index]));
            }
            updateLeftRightMenu(heightMenuBar, home);
            break;
    }
}

function createMenuBarNavs(pills) {
    $('#menuBar').empty();
    switch ($('#bsMainMenu').val()) {
        case '0':
            if ($('#bsViewMenuYes').hasClass('btn-success'))
                $('#myBootstrapMenu > h4').show();
            var justified = $('#bsJustifiedYes').hasClass('btn-success') ? ' nav-justified' : '';
            var group = pills === false ? '<ul class="nav nav-tabs' + justified + '" id="menuBarItems"></ul>' : '<ul class="nav nav-pills' + justified + '" id="menuBarItems"></ul>';
            var widthMenuBar = 5;
            $('#menuBar').append(group);
            var home = createItemButtons(0, '<i class="icon maison-house109"></i>', $('#bsColorHome').val(), '', myTheme.globalPlanId[0]);
            for (var index = 1; index < myTheme.myButtons.length; index++) {
                widthMenuBar += addItemMenu(createItemTabsPills(index, myTheme.myButtons[index], myTheme.myColors[index], myTheme.myDropdowns[index], myTheme.globalPlanId[index], pills));
            }
            updateHighLowMenu(widthMenuBar, home);
            $('#bsMenuView').prependTo('#bsTop');
            break;
        case '1':
            if ($('#bsViewMenuYes').hasClass('btn-success'))
                $('#myBootstrapMenu > h4').show();
            var justified = $('#bsJustifiedYes').hasClass('btn-success') ? ' nav-justified' : '';
            var group = '<ul class="nav nav-pills' + justified + '" id="menuBarItems"></ul>';
            var widthMenuBar = 5;
            $('#menuBar').append(group);
            var home = createItemButtons(0, '<i class="icon maison-house109"></i>', $('#bsColorHome').val(), '', myTheme.globalPlanId[0]);
            for (var index = 1; index < myTheme.myButtons.length; index++) {
                widthMenuBar += addItemMenu(createItemTabsPills(index, myTheme.myButtons[index], myTheme.myColors[index], myTheme.myDropdowns[index], myTheme.globalPlanId[index], true));
            }
            updateHighLowMenu(widthMenuBar, home);
            $('#bsMenuView').appendTo('#bsTop');
            break;
        case '2':
        case '3':
            if ($('#bsViewMenuYes').hasClass('btn-success'))
                $('#myBootstrapMenu > h4').hide();
            var group = '<ul class="nav nav-pills nav-stacked" id="menuBarItems"></ul>';
            var heightMenuBar = 0;
            $('#menuBar').append(group);
            var home = createItemButtons(0, '<i class="icon maison-house109"></i>', $('#bsColorHome').val(), '', myTheme.globalPlanId[0]);
            for (var index = 1; index < myTheme.myButtons.length; index++) {
                heightMenuBar += addItemMenu(createItemTabsPills(index, myTheme.myButtons[index], myTheme.myColors[index], myTheme.myDropdowns[index], myTheme.globalPlanId[index], true));
            }
            $('#menuBarItems').find('.navPillsItems').each(function () {
                $(this).find('a:eq(0)').addClass('text-center');
            });
            updateLeftRightMenu(heightMenuBar, home);
            break;
    }
}

function setTabsBarMenu() { // à garder ??????????????????????????????
    var calHeightWindow = parseInt($('#bsHeightMainWindow').val());
    calHeightWindow = calHeightWindow - 107;
    calHeightWindow -= ($("#bsStateYes").hasClass('btn-success')) ? 85 : 0;
    $('#myBootstrapMenu').removeClass('well');
    $('#myBootstrapMenu').outerHeight('87px');
    $('#myBootstrapWindow').outerHeight(calHeightWindow + 'px');
    $('#bsHeightWindow').val(calHeightWindow);
    $('#bsHeightMainMenu').prop('readonly', true);
    //$('#bsMainMenu').prop('disabled', true);
    $('#myBootstrapMenu').css('color', '');
    $('#myBootstrapMenu').css('background-color', '');
    $('#myBootstrapMenu').css('border', '');
    $('#myBootstrapMenu').css('border-radius', '');
    $('#myBootstrapMenu').css('box-shadow', '');
}

function unsetTabsBarMenu() { // à garder ??????????????????????????????
    if ($('#myBootstrapMenu').hasClass('well')) {
        return;
    }
    var str = "";
    var calHeightWindow = parseInt($('#bsHeightMainWindow').val());
    var calHeightMenu = (parseInt($('#bsMainMenu').val()) < 2) ? parseInt($('#bsHeightMainMenu').val()) + 20 : 20;
    calHeightWindow = calHeightWindow - calHeightMenu;
    calHeightWindow -= ($("#bsStateYes").hasClass('btn-success')) ? 85 : 0;
    $('#bsHeightMainMenu').prop('readonly', false);
    //$('#bsMainMenu').prop('disabled', false);
    $('#myBootstrapMenu').addClass('well');
    createMenuBar();
    //changeMenuStyle($('#bsMainMenu').val());
    bsColorWindow();
    bsBorderWindow();
    bsBorderRadius();
    bsBorderShadow();
    bsBgColorWindow();
}

function updateHighLowMenu(widthMenuBar, home) {
    var calWidthWindow = parseInt($('#bsWidthMainWindow').val());
    var calHeightWindow = parseInt($('#bsHeightMainWindow').val());
    var calHeightMenu = parseInt($('#bsHeightMainMenu').val());
    $('#myBootstrapMenu').css('margin-left', '15px');
    $('#myBootstrapWindow').css('margin-left', '15px');
    calHeightWindow = calHeightWindow - calHeightMenu - 20;
    calHeightWindow -= ($("#bsStateYes").hasClass('btn-success')) ? 65 : 0;
    $('#myBootstrapMenu').removeClass('pull-right');
    $('#myBootstrapWindow').removeClass('pull-right');
    $('#bsMenuView').removeClass();
    $('#bsWindow').removeClass();
    $('#bsTop').removeClass();
    $('#bsMenuView').addClass('row');
    $('#bsWindow').addClass('row');
    $('#bsTop').outerWidth(calWidthWindow + 'px');
    $('#myBootstrapMenu').outerHeight(calHeightMenu + 'px');
    $('#myBootstrapWindow').outerHeight(calHeightWindow + 'px');
    $('#myBootstrapWindow').outerWidth(calWidthWindow + 'px');
    $('#myBootstrapMenu').outerWidth(calWidthWindow + 'px');
    $('#myBootstrapState').outerWidth(calWidthWindow + 'px');
    $('#bsWidthWindow').val(calWidthWindow);
    $('#bsHeightWindow').val(calHeightWindow);
    var offset = $('#bsOffset').val() === '' ? 0 : parseInt($('#bsOffset').val());
    var classMenuBar = offset === 0 ? "noPaddingLeft noPaddingRight col-sm-12" : "noPaddingLeft noPaddingRight col-sm-offset-" + offset + " col-sm-" + (12 - offset);
    $('#menuBarOverflow').removeClass().addClass('pull-left');
    $('#menuBar').removeClass().addClass(classMenuBar);
    $('#scrollBeginButton').hide();
    $('#bsHomeButton').replaceWith(home);
    $('#scrollBeginButton').parent().css({'height': '', 'border-right': '1px groove', 'padding-right': '5px', 'border-bottom': '', 'margin-bottom': ''});
    $('#scrollEndButton').parent().css({'height': '', 'border-left': '1px groove', 'margin': '0', 'margin-right': '10px', 'padding-left': '5px', 'border-top': '', 'padding-top': ''});
    var width = $('#bsWidthWindow').val() - $('#bsHomeButton').outerWidth(true) - 35;
    $('#modelButtonBarOverflow').css({'width': parseInt($('#bsWidthMainWindow').val()) - 15, 'height': ''});
    if (widthMenuBar < width) {
        var scrollLeft = $('#bsHomeButton').outerWidth(true) + 10;
        $('#scrollBeginButton').parent().css({'width': scrollLeft + 'px'});
        //width = $('#bsWidthWindow').val() - $('#scrollBeginButton').parent().outerWidth(true);
        $('#scrollEndButton').parent().hide();
        $('#menuBarOverflow').css({'width': (width - 20) + 'px', 'height': '300px'});
        $('#menuBar').css({'position': 'absolute', 'width': widthMenuBar + 'px', 'height': ''});
        $('#scrollBeginButton').prop('disabled', true);
        $('#scrollEndButton').prop('disabled', true);
    }
    else {
        $('#scrollBeginButton').empty();
        $('#scrollBeginButton').append('<i class="fa fa-chevron-left"></i>');
        $('#scrollBeginButton').parent().removeClass().addClass('pull-left');
        $('#scrollBeginButton').removeClass().addClass('pull-left btn btn-primary ' + $('#bsWidthButton').val());
        $('#scrollEndButton').empty();
        $('#scrollEndButton').append('<i class="fa fa-chevron-right"></i>');
        $('#scrollEndButton').parent().removeClass().addClass('pull-right');
        $('#scrollEndButton').removeClass().addClass('btn btn-primary ' + $('#bsWidthButton').val());
        $('#scrollBeginButton').show();
        $('#scrollEndButton').parent().show();
        var scrollLeft = $('#scrollBeginButton').outerWidth(true) + $('#bsHomeButton').outerWidth(true) + 10;
        var scrollRight = $('#scrollEndButton').outerWidth(true) + 10;
        $('#scrollBeginButton').parent().css({'width': scrollLeft + 'px'});
        $('#scrollEndButton').parent().css({'width': scrollRight + 'px'});
        width = $('#bsWidthWindow').val() - ($('#scrollBeginButton').parent().outerWidth(true) + $('#scrollEndButton').parent().outerWidth(true)) - 20;
        $('#menuBarOverflow').css({'width': width + 'px', 'height': '300px'});
        $('#menuBar').css({'position': '', 'width': (widthMenuBar + 100) + 'px', 'height': '400px'});
        $('#scrollBeginButton').prop('disabled', false);
        $('#scrollEndButton').prop('disabled', false);
    }
}

function updateLeftRightMenu(heightMenuBar, home) {
    var calWidthWindow = parseInt($('#bsWidthMainWindow').val()) + 15;
    var calHeightMenu = parseInt($('#bsHeightMainMenu').val());
    var calHeightWindow = parseInt($('#bsHeightMainWindow').val());
    calHeightWindow = calHeightWindow - 20;
    calHeightWindow -= ($("#bsStateYes").hasClass('btn-success')) ? 45 : 0;
    $('#bsTop').outerWidth(calWidthWindow + 'px');
    calWidthWindow = calWidthWindow - calHeightMenu - 30;
    $('#myBootstrapMenu').css('margin-left', '0px');
    $('#myBootstrapWindow').outerHeight(calHeightWindow + 'px');
    $('#myBootstrapMenu').outerWidth(calHeightMenu + 'px');
    $('#myBootstrapState').outerWidth($('#bsWidthMainWindow').val() + 'px');
    $('#myBootstrapWindow').outerWidth(calWidthWindow + 'px');
    $('#bsWidthWindow').val(calWidthWindow);
    $('#bsHeightWindow').val(calHeightWindow);
    $('#bsTop').addClass('row');
    $('#bsMenuView').removeClass('row');
    $('#bsMenuView').addClass('col-sm-3');
    $('#bsWindow').removeClass('row');
    $('#bsWindow').addClass('col-sm-9');
    $('#myBootstrapMenu').outerHeight(calHeightWindow + 'px');
    $('#modelButtonBarOverflow').css({'width': '', 'height': height + 'px'});
    $('#menuBarOverflow').removeClass();
    $('#modelButtonBarOverflow').removeClass();//.addClass('col-sm-12');
    $('#menuBar').removeClass().addClass('noPaddingLeft noPaddingRight');
    $('#menuBar').css({'height': heightMenuBar + 'px', 'width': (parseInt($('#bsHeightMainMenu').val()) - 30) + 'px'});
    if ($('#bsMainMenu').val() === '2') {
        $('#myBootstrapMenu').removeClass('pull-right');
        $('#myBootstrapWindow').addClass('pull-right');
        $('#bsMenuView').addClass('noPaddingLeft');
        $('#bsWindow').removeClass('noPaddingLeft');
        $('#bsMenuView').prependTo('#bsTop');
    }
    else {
        $('#myBootstrapMenu').addClass('pull-right');
        $('#myBootstrapWindow').removeClass('pull-right');
        $('#bsMenuView').removeClass('noPaddingLeft');
        $('#myBootstrapWindow').css('margin-left', '0px');
        $('#bsWindow').addClass('noPaddingLeft');
        $('#bsMenuView').appendTo('#bsTop');
    }
    $('#scrollBeginButton').parent().css({'width': (parseInt($('#bsHeightMainMenu').val()) - 30) + 'px', 'border-right': '', 'padding-right': '0', 'border-bottom': '1px groove', 'margin-bottom': '5px'});
    $('#scrollEndButton').parent().css({'width': (parseInt($('#bsHeightMainMenu').val()) - 30) + 'px', 'border-left': '', 'margin': '', 'margin-right': '', 'padding-left': '', 'border-top': '1px groove', 'padding-top': '5px'});
    $('#scrollBeginButton').hide();
    $('#bsHomeButton').replaceWith(home);
    var height = $('#bsHeightWindow').val() - $('#bsHomeButton').parent().outerHeight() - 10;
    if (heightMenuBar < height) {
        $('#scrollEndButton').parent().hide();
        var scrollTop = $('#bsHomeButton').outerHeight() + 10;
        $('#scrollBeginButton').parent().css({'height': scrollTop + 'px'});
        //height = height - scrollTop;
        $('#menuBarOverflow').css({'height': heightMenuBar + 'px', 'width': '300px'});
        $('#menuBar').css({'position': 'absolute', 'height': heightMenuBar + 'px', 'width': (parseInt($('#bsHeightMainMenu').val()) - 30) + 'px'});
        $('#scrollBeginButton').prop('disabled', true);
        $('#scrollEndButton').prop('disabled', true);
    }
    else {
        $('#scrollBeginButton').empty();
        $('#scrollBeginButton').append('<i class="fa fa-chevron-up"></i>');
        $('#scrollBeginButton').parent().removeClass();
        $('#scrollBeginButton').removeClass().addClass('btn btn-block btn-primary');
        $('#scrollEndButton').empty();
        $('#scrollEndButton').append('<i class="fa fa-chevron-down"></i>');
        $('#scrollEndButton').parent().removeClass();
        $('#scrollEndButton').removeClass().addClass('btn btn-block btn-primary');
        $('#scrollBeginButton').show();
        $('#scrollEndButton').parent().show();
        var scrollTop = $('#bsHomeButton').outerHeight() + $('#scrollBeginButton').outerHeight() + 10;
        var scrollBottom = $('#scrollEndButton').outerHeight();
        $('#scrollBeginButton').parent().css({'height': scrollTop + 'px'});
        $('#scrollEndButton').parent().css({'height': scrollBottom + 'px'});
        height = $('#bsHeightWindow').val() - ($('#scrollBeginButton').parent().outerHeight() + $('#scrollEndButton').parent().outerHeight()) - 40;
        $('#menuBarOverflow').css({'height': height + 'px', 'width': '300px'});
        $('#menuBar').css({'position': '', 'height': (heightMenuBar + 100) + 'px', 'width': (parseInt($('#bsHeightMainMenu').val()) - 30) + 'px'});
        $('#menuBar').css({'position': ''});
        $('#scrollBeginButton').prop('disabled', false);
        $('#scrollEndButton').prop('disabled', false);
    }
}

// **************    Menu     *****************

$('#bsMenuThemesDetails').on('click', function () {
    bsMenuThemesDetails();
});
function bsMenuThemesDetails() {
    if (whichView !== 'menuPopover')
        $('*').popover('destroy');
    $('#bsPageSelect').val("0");
    $('#bsDuplicateView').hide();
    $('.bsCadreFields').prop('disabled', true);
    $('#bsSecondaireView').hide();
    $('#bsMenuThemesApercuView').hide();
    $('.eqLogicImageView').hide();
    $('.eqLogicButtonsView').hide();
    $('#bsMenuThemesDetailsView').show();
}

$('#bsMenuThemesApercu').on('click', function () {
    bsMenuThemesApercu();
});
function bsMenuThemesApercu() {
    $('#bsPageSelect').val("0");
    $('#bsDuplicateView').hide();
    $('.bsCadreFields').prop('disabled', true);
    $('#bsSecondaireView').hide();
    $('.eqLogicImageView').hide();
    $('.eqLogicButtonsView').hide();
    $('#bsMenuThemesDetailsView').hide();
    $('#bsMenuThemesApercuView').show();
    if (whichView !== 'menuPopover')
        menuPopover();
}

$('#bsImageDisplay').on('click', function () {
    if (whichView !== 'menuPopover')
        $('*').popover('destroy');
    $('#bsPageSelect').val("0");
    $('#bsDuplicateView').hide();
    $('.bsCadreFields').prop('disabled', true);
    $('#bsSecondaireView').hide();
    $('#bsMenuThemesDetailsView').hide();
    $('#bsMenuThemesApercuView').hide();
    $('.eqLogicButtonsView').hide();
    $('.eqLogic').hide();
    $('.eqLogicThumbnailDisplay').hide();
    $('.li_eqLogic').removeClass('active');
    if ($('#bsImageMainWindow').val() !== "")
        updateListImages($('#bsImageMainWindow').val());
    else
        updateListImages('0');
    updateListCategories("");
    $('.eqLogicImageView').show();
});

$('#bsButtonsDisplay').on('click', function () {
    if (whichView !== 'menuPopover')
        $('*').popover('destroy');
    $('#bsPageSelect').val("0");
    $('#bsDuplicateView').hide();
    $('.bsCadreFields').prop('disabled', true);
    $('#bsSecondaireView').hide();
    $('#bsMenuThemesDetailsView').hide();
    $('#bsMenuThemesApercuView').hide();
    $('.eqLogic').hide();
    $('.eqLogicThumbnailDisplay').hide();
    $('.li_eqLogic').removeClass('active');
    $('.eqLogicImageView').hide();
    $('.eqLogicButtonsView').show();
});

$('#bsPageSelect').on('change', function () {
    var page = $('#bsPageSelect').val();
    if (page === "0") {
        $('.bsCadreFields').prop('disabled', true);
        $('#bsDuplicateView').hide();
        bsMenuThemesApercu();
    }
    else {
        if (whichView !== 'menuPopover')
            $('*').popover('destroy');
        //secondaryPages.update(page,$('#bsPageSelect').val());
        var kids = $('#bsPageSelect').find('option');
        var options = '';
        for (var index = 1; index < kids.length; index++) {
            if (kids.eq(index).val() !== $('#bsPageSelect').val())
                options += '<option value="' + kids.eq(index).val() + '">' + kids.eq(index).text() + '</option>';
        }
        $('#bsOtherPages').html(options);
        $('#bsWindowView').empty();
        $('.bsCadreFields').prop('disabled', false);
        if ($('#bsStyleCadreYes').hasClass("btn-success")) {
            $('#bsCadreBootstrap').prop("disabled", true);
        }
        else {
            $('#bsCadreBootstrap').prop("disabled", false);
        }
        var bsWindow = $('#bsWindow').clone();
        bsWindow.attr('id', "myBsWindow");
        bsWindow.children().eq(0).attr('id', "myCadreWindow");
        bsWindow.children("#myCadreWindow").removeClass("col-sm-12");
        bsWindow.children("#myCadreWindow").addClass("");
        bsWindow.prepend('<style>' + addCadreDefault() + '</style>');
        if ($("#bsStyleCadreYes").hasClass('btn-success')) {
            bsWindow.children().eq(0).addClass('default');
        }
        $('#bsDuplicateView').show();
        $('#bsWindowView').append(bsWindow);
        $('#myCadreWindow').empty();
        var pageSelect = secondaryPages.search(page);
        if ($('#bsStyleCadreNo').hasClass("btn-success")) {
            if (pageSelect) {
                for (var index in pageSelect.cadres)
                    createCadre(pageSelect.cadres[index].id, pageSelect.cadres[index].cadre);
                for (var index in pageSelect.svg)
                    createSvg(pageSelect.svg[index].id, pageSelect.svg[index].cadre, pageSelect.svg[index].svg);
            }
            if ($('#bsSvgIdSelect').find('option').length === 0) {
                $('#bsSvgIdSelect').prop('disabled', true);
            }
            else {
                $('#bsSvgIdSelect').prop('disabled', false);
            }
        }
        else {
            if (pageSelect) {
                if (pageSelect.cadres.length > 1) {
                    secondaryPages.resetCadres(page);
                    notify('Pages Secondaires', 'Cadres Multiples éffacés, remplacé par un cadre unique', 'warning');
                }
                else if (pageSelect.cadres.length === 1) {
                    var height = $('<div>').html(pageSelect.cadres[0].cadre).children().eq(0).height();
                    var width = $('<div>').html(pageSelect.cadres[0].cadre).children().eq(0).width();
                    if (height !== $('#myCadreWindow').innerHeight() || width !== $('#myCadreWindow').innerWidth()) {
                        secondaryPages.resetCadres(page);
                        notify('Pages Secondaires', 'Cradre unique erroné, correction effectué', 'warning');
                    }
                    else {
                        $('#myCadreWindow').prepend(pageSelect.cadres[0].cadre);
                        $("div[name='myCadre" + pageSelect.cadres[0].id + "']").removeClass('default');
                        $("div[name='myCadre" + pageSelect.cadres[0].id + "']").css('background-size', '100% 100%');
                        for (var index in pageSelect.svg)
                            createSvg(pageSelect.svg[index].id, pageSelect.svg[index].cadre, pageSelect.svg[index].svg);
                        cadrePopover(pageSelect.cadres[0].id);
                        $('#bsSecondaireView').show();
                        return;
                    }
                }
            }
            bsCadreImage();
        }
        $('#bsMenuThemesApercuView').hide();
        $('.eqLogicImageView').hide();
        $('.eqLogicButtonsView').hide();
        $('#bsMenuThemesDetailsView').hide();
        $('#bsSecondaireView').show();
    }
});

