
/* This file is part of Jeedom.
 *
 * Jeedom is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Jeedom is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Jeedom. If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * */

/*
 * Fonction pour l'ajout de commande, appellé automatiquement par plugin.template
 */
function addCmdToTable(_cmd) {
}

function saveEqLogic(_data) {
    initPopover();
    $('#bsMyCadreView').show();
    $('#bsMyGeneralView').show();
    _data.configuration.bsMySecondaryPages = '';
    _data.configuration.bsMyButton = '';
    _data.configuration.bsMyColor = '';
    _data.configuration.bsMyDropdown = '';
    _data.configuration.bsMyPlanId = '';
    _data.configuration.bsMyCadre = myTheme.myCadre;
    _data.specificCapatibilities = init(_data.specificCapatibilities,{});
    _data.specificCapatibilities.bsMySecondaryPages = secondaryPages.json();
    _data.specificCapatibilities.bsMyButton = JSON.stringify(myTheme.myButtons);
    _data.specificCapatibilities.bsMyColor = JSON.stringify(myTheme.myColors);
    _data.specificCapatibilities.bsMyDropdown = JSON.stringify(myTheme.myDropdowns);
    _data.specificCapatibilities.bsMyPlanId = JSON.stringify(myTheme.globalPlanId);
    return _data;
}

function prePrintEqLogic() {
    $('#div_alert').hide();
    initThemes = false;
    $('input[name="bsReadOnlyYes"]').val('1');
}

function convertOldConfig( _data ) {
    _data.specificCapatibilities = init(_data.specificCapatibilities,{});
    _data.configuration.bsMySecondaryPages = init(_data.configuration.bsMySecondaryPages);
    _data.configuration.bsMyButton = init(_data.configuration.bsMyButton);
    _data.configuration.bsMyColor = init(_data.configuration.bsMyColor);
    _data.configuration.bsMyDropdown = init(_data.configuration.bsMyDropdown);
    _data.configuration.bsMyPlanId = init(_data.configuration.bsMyPlanId, "[]");
   if (_data.configuration.bsMySecondaryPages !== "") {
        _data.specificCapatibilities.bsMySecondaryPages = _data.configuration.bsMySecondaryPages;
        _data.configuration.bsMySecondaryPages = "";
    }
    else
        _data.specificCapatibilities.bsMySecondaryPages = init(_data.specificCapatibilities.bsMySecondaryPages);
   if (_data.configuration.bsMyColor !== "") {
        _data.specificCapatibilities.bsMyColor = _data.configuration.bsMyColor;
        _data.configuration.bsMyColor = "";
    }
    else
        _data.specificCapatibilities.bsMyColor = init(_data.specificCapatibilities.bsMyColor);
   if (_data.configuration.bsMyButton !== "") {
        _data.specificCapatibilities.bsMyButton = _data.configuration.bsMyButton;
        _data.configuration.bsMyButton = "";
    }
    else
        _data.specificCapatibilities.bsMyButton = init(_data.specificCapatibilities.bsMyButton);
   if (_data.configuration.bsMyDropdown !== "") {
        _data.specificCapatibilities.bsMyDropdown = _data.configuration.bsMyDropdown;
        _data.configuration.bsMyDropdown = "";
    }
    else
        _data.specificCapatibilities.bsMyDropdown = init(_data.specificCapatibilities.bsMyDropdown);
   if (_data.configuration.bsMyPlanId !== "[]") {
        _data.specificCapatibilities.bsMyPlanId = _data.configuration.bsMyPlanId;
        _data.configuration.bsMyPlanId = "";
    }
    else
        _data.specificCapatibilities.bsMyPlanId = init(_data.specificCapatibilities.bsMyPlanId,'[]');
    return _data;
}

function printEqLogic(_data) {
    jeedom.getConfiguration({
        key: 'eqLogic:category',
        default: 0,
        success: function (data) {
            jeedomCategories = [];
            for (var index in data) {
                jeedomCategories.push({'name': data[index].name, 'color': data[index].color});
            }
        }
    });
    bsMenuThemesApercu();
    modifyWithoutSave = false;
    _data.configuration.bsImageMainWindow = init(_data.configuration.bsImageMainWindow, "0");
    updateListImages(_data.configuration.bsImageMainWindow);
    updateListCategories("");
    myTheme.myCadre = "";
    myTheme.globalPlanId = [];
    myTheme.myColors = [];
    myTheme.myButtons = [];
    myTheme.myDropdowns = [];
    secondaryPages.reset();
    _data.configuration.bsColorHome = init(_data.configuration.bsColorHome, "btn-primary");
    _data.configuration.bsWidthMainWindow = init(_data.configuration.bsWidthMainWindow, 1024);
    _data.configuration.bsHeightMainWindow = init(_data.configuration.bsHeightMainWindow, 768);
    _data.configuration.bsWidthWindow = init(_data.configuration.bsWidthWindow, 1024);
    _data.configuration.bsHeightWindow = init(_data.configuration.bsHeightWindow, 593);
    _data.configuration.bsHeightMainMenu = init(_data.configuration.bsHeightMainMenu, 110);
    _data.configuration.bsMainMenuText = init(_data.configuration.bsMainMenuText, "Menu");
    _data.configuration.bsBgColorWindow = init(_data.configuration.bsBgColorWindow, "#e8e8e8");
    _data.configuration.bsColorWindow = init(_data.configuration.bsColorWindow, "#333");
    _data.configuration.bsWidthButton = init(_data.configuration.bsWidthButton, "");
    _data.configuration.bsStyleButton = init(_data.configuration.bsStyleButton, "0");
    _data.configuration.bsMyCadre = init(_data.configuration.bsMyCadre);
    _data = convertOldConfig(_data);
    
    if (_data.specificCapatibilities.bsMyButton === "") {
        $('#bsWidthMainWindow').val(_data.configuration.bsWidthMainWindow);
        $('#bsHeightMainWindow').val(_data.configuration.bsHeightMainWindow);
        $('#bsWidthWindow').val(_data.configuration.bsWidthWindow);
        $('#bsHeightWindow').val(_data.configuration.bsHeightWindow);
        $('#bsHeightMainMenu').val(_data.configuration.bsHeightMainMenu);
        $('#bsMainMenuText').val(_data.configuration.bsMainMenuText);
        $('#bsColorWindow').val(_data.configuration.bsColorWindow);
        $('#bsBgColorWindow').val(_data.configuration.bsBgColorWindow);
        $('#bsMyCadreView').hide();
        $('#bsMyGeneralView').hide();
    }
    else {
        myTheme.myButtons = JSON.parse(_data.specificCapatibilities.bsMyButton);
        $('#bsMyCadreView').show();
        $('#bsMyGeneralView').show();
    }
    _data.configuration.bsListFonts = init(_data.configuration.bsListFonts, "0");
    updateListFonts(_data.configuration.bsListFonts);
    _data.configuration.bsOffsetButton = init(_data.configuration.bsOffsetButton, "0");
    $('#bsOffsetButton').bootstrapSlider('setValue', parseInt(_data.configuration.bsOffsetButton));
    $('.bsCadreFields').prop('disabled', true);
    $('#bsExpert').removeClass('btn-success');
    $('#bsMyCadre').prop('readonly', true);
    $('#bsMyGeneral').prop('readonly', true);
    
    if (_data.specificCapatibilities.bsMyColor !== "") {
        myTheme.myColors = JSON.parse(_data.specificCapatibilities.bsMyColor);
    }
    if (_data.specificCapatibilities.bsMyDropdown !== "") {
        myTheme.myDropdowns = JSON.parse(_data.specificCapatibilities.bsMyDropdown);
    }
    if (_data.specificCapatibilities.bsMyPlanId !== "[]" || _data.configuration.bsMyCadre !== "") {
        myTheme.myCadre = _data.configuration.bsMyCadre;
        myTheme.globalPlanId = JSON.parse(_data.specificCapatibilities.bsMyPlanId);
        if(!is_array(myTheme.globalPlanId))
            myTheme.globalPlanId = [];
        myTheme.globalPlanId[0] = init(myTheme.globalPlanId[0]);
    }
    if (_data.specificCapatibilities.bsMySecondaryPages !== "") {
        secondaryPages.parse(_data.specificCapatibilities.bsMySecondaryPages);
        //_data.specificCapatibilities.bsMySecondaryPages = "";
    }
    isPlanThemes();
    _data.configuration.isStyle = init(_data.configuration.isStyle, '0');
    if (_data.configuration.isStyle !== '0')
        $('#myBootstrapMenu > h4').addClass("text-center").css({'color': _data.configuration.bsColorWindow, 'border-bottom': '1px solid ' + _data.configuration.bsColorWindow}).text(_data.configuration.bsMainMenuText);
    else
        $('#myBootstrapMenu > h4').addClass("text-center").css({'border-bottom': '1px solid'}).text(_data.configuration.bsMainMenuText);
    if (myTheme.myCadre === "")
        $('#bsBootStrapButton').prop('disabled', true);
    else
        $('#bsBootStrapButton').prop('disabled', false);
    _data.configuration.bsViewMenuYes = init(_data.configuration.bsViewMenuYes, "1");
    (_data.configuration.bsViewMenuYes === "1") ? bsViewMenuYes() : bsViewMenuNo();
    _data.configuration.bsJustifiedYes = init(_data.configuration.bsJustifiedYes, "0");
    (_data.configuration.bsJustifiedYes === "1") ? bsJustifiedYes() : bsJustifiedNo();
    _data.configuration.bsStateYes = init(_data.configuration.bsStateYes, "1");
    (_data.configuration.bsStateYes === "1") ? bsStateYes() : bsStateNo();
    _data.configuration.bsGroupYes = init(_data.configuration.bsGroupYes, "0");
    (_data.configuration.bsGroupYes === "1") ? bsGroupYes() : bsGroupNo();
    _data.configuration.bsStyleCadreYes = init(_data.configuration.bsStyleCadreYes, "1");
    (_data.configuration.bsStyleCadreYes === "1") ? bsStyleCadreYes() : bsStyleCadreNo();
    if (_data.configuration.isStyle === "1")
        bsIsStyle();
    (init(_data.isVisible,'0') === "1") ? bsIsVisibleYes() : bsIsVisibleNo();
    (init(_data.isEnable,'0') === "1") ? bsIsEnableYes() : bsIsEnableNo();
    $('#bsMenuThemesDetails').hide();
    $('#bsMenuThemesExport').hide();
    $('#bsMenuImportButton').hide();
    $("#bsHardSaveView").hide();
    bsColorWindow();
    bsBorderWindow();
    bsBorderRadius();
    bsBorderShadow();
    $('#bsWidthButton').val(_data.configuration.bsWidthButton);
    $('#bsStyleButton').val(_data.configuration.bsStyleButton);
    initThemes = true;
    createMenuBar();
    secondaryPages.check();
}

$('.eqLogicAction[data-action=themeRemove]').on('click', function () {
    if ($('.li_eqLogic.active').attr('data-eqLogic_id') !== undefined) {
        bootbox.confirm('{{Etes-vous sûr de vouloir supprimer le Thèmes , tous les plans liés seront aussi éffacés}} ' + eqType + ' <b>' + $('.li_eqLogic.active a:first').text() + '</b> ?', function (result) {
            if (result) {
                
                if( myTheme.myCadre !== '')
                    deletePlanThemes( -1, -1);
                for (var index = 0; index < myTheme.myButtons.length; index++) {
                    if (myTheme.myDropdowns[index] !== "") {
                        for (var indexDrop = 0; indexDrop < myTheme.myDropdowns[index].length; indexDrop++) {
                            if (init(myTheme.globalPlanId[index][indexDrop]) !== '')
                                deletePlanThemes(index, indexDrop);
                        }
                    }
                    else {
                        if (init(myTheme.globalPlanId[index]) !== '')
                            deletePlanThemes(index, -1);
                    }
                }
                jeedom.eqLogic.remove({
                    type: isset($(this).attr('data-eqLogic_type')) ? $(this).attr('data-eqLogic_type') : eqType,
                    id: $('.li_eqLogic.active').attr('data-eqLogic_id'),
                    error: function (error) {
                        $('#div_alert').showAlert({message: error.message, level: 'danger'});
                    },
                    success: function () {
                        var vars = getUrlVars();
                        var url = 'index.php?';
                        for (var i in vars) {
                            if (i !== 'id' && i !== 'removeSuccessFull' && i !== 'saveSuccessFull') {
                                url += i + '=' + vars[i].replace('#', '') + '&';
                            }
                        }
                        modifyWithoutSave = false;
                        url += 'removeSuccessFull=1';
                        window.location.href = url;
                    }
                });
            }
        });
    } else {
        $('#div_alert').showAlert({message: '{{Veuillez d\'abord sélectionner un}} ' + eqType, level: 'danger'});
    }
});

$('#bsBootStrapButton').on('click', function () {
    var page = $('#bsPageSelect').val();
    if (page === "0")
        createFirstPlan();
    else
        createPagePlan(page);
});

$('#bsDesignButton').on('click', function () {
    notify('Création des Pages', 'Sauvegarder immédiatement après création des pages, pour ne pas perdre les identifiants des pages', 'warning');
    if (myTheme.myCadre === "")
        createPlanThemes(-1, -1, 'home', $('#bsWidthMainWindow').val(), $('#bsHeightMainWindow').val());
    else
        updatePlanThemes(-1, -1, 'home', $('#bsWidthMainWindow').val(), $('#bsHeightMainWindow').val());
    for (var buttons = 0; buttons < myTheme.myButtons.length; buttons++) {
        if (myTheme.myDropdowns[buttons] !== "") {
            for (var indexDrop = 0; indexDrop < myTheme.myDropdowns[buttons].length; indexDrop++) {
                if (myTheme.globalPlanId[buttons][indexDrop] === "")
                    createPlanThemes(buttons, indexDrop, myTheme.myDropdowns[buttons][indexDrop], $('#bsWidthWindow').val(), $('#bsHeightWindow').val());
                else
                    updatePlanThemes(buttons, indexDrop, myTheme.myDropdowns[buttons][indexDrop], $('#bsWidthWindow').val(), $('#bsHeightWindow').val());
            }
        }
        else {
            if (myTheme.globalPlanId[buttons] === "")
                createPlanThemes(buttons, -1, myTheme.myButtons[buttons], $('#bsWidthWindow').val(), $('#bsHeightWindow').val());
            else
                updatePlanThemes(buttons, -1, myTheme.myButtons[buttons], $('#bsWidthWindow').val(), $('#bsHeightWindow').val());
        }
    }
});

// **************    Popover Menu Général     *****************

$('#bsMenuThemesApercuView').on('change', 'select#bsPopMainMenu', function () {
    $('#bsMainMenu').val($(this).val());
    $("#bsPopoverMenu").popover('hide');
    modifyWithoutSave = true;
    createMenuBar();
});
$('#bsMenuThemesApercuView').on('change', 'input#bsPopHeightMainMenu', function () {
    $('#bsHeightMainMenu').val($(this).val());
    modifyWithoutSave = true;
    createMenuBar();
});
$('#bsMenuThemesApercuView').on('change', 'input#bsPopMainMenuText', function () {
    modifyWithoutSave = true;
    $('#bsMainMenuText').val($(this).val());
    $('#myBootstrapMenu > h4').text($(this).val());
});
$('#bsMenuThemesApercuView').on('click', 'button#bsPopStateYes', function () {
    if ($('#bsPopStateYes').hasClass('btn-success'))
        return;
    $('#bsPopStateNo').removeClass('btn-success');
    $('#bsPopStateYes').addClass('btn-success');
    bsStateYes();
});
$('#bsMenuThemesApercuView').on('click', 'button#bsPopStateNo', function () {
    if ($('#bsPopStateNo').hasClass('btn-success'))
        return;
    $('#bsPopStateYes').removeClass('btn-success');
    $('#bsPopStateNo').addClass('btn-success');
    bsStateNo();
});
$('#bsMenuThemesApercuView').on('click', 'button#bsPopMenuButton', function () {
    if (!$("#myBootstrapMenu").children('h4').is(":visible")) {
        $("#bsPopMainMenuText").prop('disabled', false);
        bsViewMenuYes();
    }
    else {
        $("#bsPopMainMenuText").prop('disabled', true);
        bsViewMenuNo();
    }
});
$('#bsMenuThemesApercuView').on('click', "button#bsPopStyleCadreYes", function () {
    if ($('#bsPopStyleCadreYes').hasClass('btn-success'))
        return;
    $('#bsPopStyleCadreNo').removeClass('btn-success');
    $('#bsPopStyleCadreYes').addClass('btn-success');
    bsStyleCadreYes();
});
$('#bsMenuThemesApercuView').on('click', "button#bsPopStyleCadreNo", function () {
    if ($('#bsPopStyleCadreNo').hasClass('btn-success'))
        return;
    $('#bsPopStyleCadreYes').removeClass('btn-success');
    $('#bsPopStyleCadreNo').addClass('btn-success');
    bsStyleCadreNo();
});

$('#bsMenuThemesApercuView').on('click', "button#bsPopReadOnlyYes", function () {
    if ($('#bsPopReadOnlyYes').hasClass('btn-success'))
        return;
    $('#bsPopReadOnlyNo').removeClass('btn-success');
    $('#bsPopReadOnlyYes').addClass('btn-success');
    $('input[name="bsReadOnlyYes"]').val('1');
});
$('#bsMenuThemesApercuView').on('click', "button#bsPopReadOnlyNo", function () {
    if ($('#bsPopReadOnlyNo').hasClass('btn-success'))
        return;
    bootbox.confirm("Etes-vous sur de vouloir supprimer la protection sur votre page principale empéchant toute mauvaise manipulation, attention ce paramètre n'est pas sauvegardé", function (result) {
        if (result) {
            $('#bsPopReadOnlyYes').removeClass('btn-success');
            $('#bsPopReadOnlyNo').addClass('btn-success');
            $("#bsDesignButton").prop('disabled', false);
            $('input[name="bsReadOnlyYes"]').val('0');
        }
    });
});

$('#bsMenuThemesApercuView').on('shown.bs.popover', '#bsPopoverMenu', function () {
    $("strong[name='bsMenuDetails']").text('Menu - L:' + $("#myBootstrapMenu").css('width') + ' - H:' + $("#myBootstrapMenu").css('height'));
    $('#bsPopMainMenu').val($('#bsMainMenu').val());
    var posMenu = parseInt($('#bsMainMenu').val());
    $('#bsPopHeightMainMenu').val($('#bsHeightMainMenu').val());
    $('#bsPopMainMenuText').val($('#bsMainMenuText').val());
    if ($('input[name="bsViewMenuYes"]').val() === "1") {
        $('#bsPopViewMenuNo').removeClass('btn-success');
        $('#bsPopViewMenuYes').addClass('btn-success');
    }
    else {
        $('#bsPopViewMenuYes').removeClass('btn-success');
        $('#bsPopViewMenuNo').addClass('btn-success');
    }
    if ($('input[name="bsStateYes"]').val() === "1") {
        $('#bsPopStateNo').removeClass('btn-success');
        $('#bsPopStateYes').addClass('btn-success');
    }
    else {
        $('#bsPopStateYes').removeClass('btn-success');
        $('#bsPopStateNo').addClass('btn-success');
    }
    if ($("#myBootstrapMenu").children('h4').is(":visible")) {
        $("#bsPopMainMenuText").prop('disabled', false);
    }
    else {
        $("#bsPopMainMenuText").prop('disabled', true);
    }
    if(posMenu > 1)
        $("#bsPopMenuButton").prop('disabled', true);
    else
        $("#bsPopMenuButton").prop('disabled', false);        
    if ($('input[name="bsStyleCadreYes"]').val() === "1") {
        $('#bsPopStyleCadreNo').removeClass('btn-success');
        $('#bsPopStyleCadreYes').addClass('btn-success');
    }
    else {
        $('#bsPopStyleCadreYes').removeClass('btn-success');
        $('#bsPopStyleCadreNo').addClass('btn-success');
    }
    if ($('input[name="bsReadOnlyYes"]').val() === "1") {
        $('#bsPopReadOnlyNo').removeClass('btn-success');
        $('#bsPopReadOnlyYes').addClass('btn-success');
    }
    else {
        $('#bsPopReadOnlyYes').removeClass('btn-success');
        $('#bsPopReadOnlyNo').addClass('btn-success');
        $("#bsDesignButton").prop('disabled', false);
    }
    if($('#bsStyleButton').val() === '1') {
        $("#bsPopMainMenu").prop('disabled', true);
    }
    else
        $("#bsPopMainMenu").prop('disabled', false);
    if ($('#bsExpert').hasClass('btn-success')) 
        $("#bsPopReadOnlyView").show();
    else
        $("#bsPopReadOnlyView").hide();
});

function menuPopover() {
    whichView = "menuPopover";
    var bsStateYes = $('input[name="bsStateYes"]').val() === "1" ? 'btn-success"' : '';
    var bsStateNo = $('input[name="bsStateYes"]').val() === "0" ? 'btn-success"' : '';
    var bsStyleCadreYes = $('input[name="bsStyleCadreYes"]').val() === "1" ? 'btn-success"' : '';
    var bsStyleCadreNo = $('input[name="bsStyleCadreYes"]').val() === "0" ? 'btn-success"' : '';
    $("#bsPopoverMenu").popover({
        html: true,
        title: '<strong class="control-label" name="bsMenuDetails">Menu - L:' + $("#myBootstrapMenu").css('width') + ' - H:' + $("#myBootstrapMenu").css('height') + '</strong>' +
                '',
        content:
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-4 control-label" for="bsPopMainMenu">Position</label>' +
                '<div class="col-sm-8">' +
                '<select class="form-control" value="' + $('#bsMainMenu').val() + '" id="bsPopMainMenu" placeholder="Plan..">' +
                '<option value="0">Haut</option>' +
                '<option value="1">Bas</option>' +
                '<option value="2">Gauche</option>' +
                '<option value="3">Droite</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-4 control-label" for="bsPopHeightMainMenu">Dimension</label>' +
                '<div class="col-sm-8">' +
                '<input type="number" class="form-control" value="' + $('#bsHeightMainMenu').val() + '" id="bsPopHeightMainMenu" placeholder="Hauteur.."/>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<div class="col-sm-4"><button class="btn btn-sm btn-success " id="bsPopMenuButton" type="button" title="Voir/Cacher le Titre">Texte</button></div>' +
                '<div class="col-sm-8"><input type="text" value="' + $('#bsMainMenuText').val() + '" class="form-control" id="bsPopMainMenuText" name="bsPopMainMenuText" placeholder="Texte.."/></div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-6 control-label" for="bsPopStateYes">Barre d\'état</label>' +
                '<div class="col-sm-6">' +
                '<div class="btn-group" data-toggle="buttons">' +
                '<button class="btn btn-xs ' + bsStateYes + '" type="button" id="bsPopStateYes" autocomplete="off">Oui</button>' +
                '<button class="btn btn-xs ' + bsStateNo + '" type="button" id="bsPopStateNo" autocomplete="off">Non</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-6 control-label" for="bsPopStyleCadreYes">Cadre Unique</label>' +
                '<div class="col-sm-6">' +
                '<div class="btn-group" data-toggle="buttons">' +
                '<button class="btn btn-xs ' + bsStyleCadreYes + '" type="button" id="bsPopStyleCadreYes" autocomplete="off">Oui</button>' +
                '<button class="btn btn-xs ' + bsStyleCadreNo + '" type="button" id="bsPopStyleCadreNo" autocomplete="off">Non</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm"><div class="col-sm-12">' +
                '<button type="button" class="btn btn-block btn-info " id="bsPopDim" title="Configuration de la Fenêtre Principale"><i class="fa fa-arrows"></i> Dimensions</button>' +
                '</div></div>' +
                '<div class="form-group form-group-sm"><div class="col-sm-12">' +
                '<button type="button" class="btn btn-block btn-info " id="bsPopButton" title="Configuration des Boutons/Menus/Onglets"><i class="fa fa-pencil"></i> Boutons</button>' +
                '</div></div>' +
                '<div class="form-group form-group-sm"><div class="col-sm-12">' +
                '<button type="button" class="btn btn-block btn-info " id="bsPopStyle" title="Configuration des Couleurs, Bordures et Ombres"><i class="fa fa-star-o"></i> Style</button>' +
                '</div></div>' +
                '<div class="form-group form-group-sm" id="bsPopReadOnlyView" style="display:none">' +
                '<label class="col-sm-6 control-label" for="bsPopReadOnlyYes">Read Only</label>' +
                '<div class="col-sm-6">' +
                '<div class="btn-group" data-toggle="buttons">' +
                '<button class="btn btn-xs btn-success" type="button" id="bsPopReadOnlyYes" autocomplete="off">Oui</button>' +
                '<button class="btn btn-xs" type="button" id="bsPopReadOnlyNo" autocomplete="off">Non</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '',
        placement: 'left',
        viewport: "#bsMenuThemesApercuView"
    });
    $('#bsPopoverMenu').popover('show');
}

// **************    Popoer Gestions Boutons     *****************

$('#bsMenuThemesApercuView').on('click', 'button#bsPopButton', function () {
    $('#bsPopoverMenu').popover('destroy');
    buttonPopover();
});

$('#bsMenuThemesApercuView').on('click', 'button#bsPopStyle', function () {
    $('#bsPopoverMenu').popover('destroy');
    stylePopover();
});

$('#bsMenuThemesApercuView').on('click', 'button#bsPopDim', function () {
    $('#bsPopoverMenu').popover('destroy');
    dimPopover();
});

$('#bsMenuThemesApercuView').on('change', 'select#bsPopWidthButton', function () {
    $('#bsWidthButton').val($(this).val());
    createMenuBar();
});

$('#bsMenuThemesApercuView').on('change', 'select#bsPopColorHome', function () {
    var bgColor = $('#bsPopColorHome').val();
    //bgColor = "bg-" + bgColor.replace('btn-', '');
    $('#bsPopColorHome').removeClass();
    $('#bsPopColorHome').addClass('form-control ' + bgColor);
    $('#bsColorHome').val($(this).val());
    $('#bsHomeButton').removeClass('btn-default btn-primary btn-info btn-success btn-warning btn-danger');
    $('#bsHomeButton').addClass($('#bsColorHome').val());
});

$('#bsMenuThemesApercuView').on('change', 'input#bsPopOffset', function () {
    $('#bsOffset').val($('#bsPopOffset').val());
    var temp = parseInt($(this).val());
    if (temp < 0)
        temp = 0;
    if (temp > 8)
        temp = 8;
    $(this).val(temp);
    createMenuBar();
});

$('#bsMenuThemesApercuView').on('click', 'button#bsPopJustifiedYes', function () {
    if ($('#bsPopJustifiedYes').hasClass('btn-success'))
        return;
    $('#bsPopJustifiedNo').removeClass('btn-success');
    $('#bsPopJustifiedYes').addClass('btn-success');
    bsJustifiedYes();
    createMenuBar();
});
$('#bsMenuThemesApercuView').on('click', 'button#bsPopJustifiedNo', function () {
    if ($('#bsPopJustifiedNo').hasClass('btn-success'))
        return;
    $('#bsPopJustifiedYes').removeClass('btn-success');
    $('#bsPopJustifiedNo').addClass('btn-success');
    bsJustifiedNo();
    createMenuBar();
});
$('#bsMenuThemesApercuView').on('click', 'button#bsPopGroupYes', function () {
    if ($('#bsPopGroupYes').hasClass('btn-success'))
        return;
    $('#bsPopGroupNo').removeClass('btn-success');
    $('#bsPopGroupYes').addClass('btn-success');
    bsGroupYes();
    createMenuBar();
});
$('#bsMenuThemesApercuView').on('click', 'button#bsPopGroupNo', function () {
    if ($('#bsPopGroupNo').hasClass('btn-success'))
        return;
    $('#bsPopGroupYes').removeClass('btn-success');
    $('#bsPopGroupNo').addClass('btn-success');
    bsGroupNo();
    createMenuBar();
});
$('#bsMenuThemesApercuView').on('click', 'button#bsPopAddButton', function () {
    $('bsPopAddButton').tooltip('hide');
    $('#addTextDropdown').empty();
    $('#addTextPlanId').empty();
    $('#addTextDel').empty();
    $('#bsListDropdown').removeClass('has-error');
    $('#bsButtonName').parent().parent().removeClass('has-error');
    $('#bsButtonName').val("");
    $('#bsIdButton').val("");
    $('#bsColorButton').val("btn-primary");
    $('#bsColorButton').removeClass();
    $('#bsColorButton').addClass('form-control ' + $('#bsColorButton').val());
    $('#bsDropdown').removeClass('btn-success active');
    $('#bsListDropdown').hide();
    $('#bsListDropdownTexts').val("");
    $('#bsIdPlanDisplay').hide();
    $('#addTextDropdown').removeClass('col-sm-6');
    $('#addTextDropdown').addClass('col-sm-10');
    $('#addTextPlanId').hide();
    $('#addTextDel').hide();
    AddTextDrop("", "");
    $('#div_frameMenu').popover('hide');
    $('#modalCreateButton').modal('show');
});

$('#bsMenuThemesApercuView').on('click', 'button#bsPopSortbsMenu', function () {
    $('#div_frameMenu').popover('destroy');
    sortButton();
});
$('#bsMenuThemesApercuView').on('click', 'button#bsPopExitbsMenu', function () {
    $('#div_frameMenu').popover('destroy');
    menuPopover();
});
$('#bsMenuThemesApercuView').on('change', 'select#bsPopStyleButton', function () {
    $('#bsStyleButton').val($(this).val());
    switch ($('#bsStyleButton').val()) {
        case '0':
            $('#bsPopGroupYes').prop('disabled', false);
            $('#bsPopGroupNo').prop('disabled', false);
            $('#bsPopJustifiedYes').prop('disabled', true);
            $('#bsPopJustifiedNo').prop('disabled', true);
            break;
        case '1':
        case '2':
            $('#bsPopGroupYes').prop('disabled', true);
            $('#bsPopGroupNo').prop('disabled', true);
            $('#bsPopJustifiedYes').prop('disabled', false);
            $('#bsPopJustifiedNo').prop('disabled', false);
            break;
    }
    switch ($('#bsMainMenu').val()) {
        case '2':
            $('#bsPopGroupYes').prop('disabled', true);
            $('#bsPopGroupNo').prop('disabled', true);
            $('#bsPopJustifiedYes').prop('disabled', true);
            $('#bsPopJustifiedNo').prop('disabled', true);
            break;
        case '3':
            $('#bsPopGroupYes').prop('disabled', true);
            $('#bsPopGroupNo').prop('disabled', true);
            $('#bsPopJustifiedYes').prop('disabled', true);
            $('#bsPopJustifiedNo').prop('disabled', true);
            break;
    }
    createMenuBar();
});

$('#bsMenuThemesApercuView').on('shown.bs.popover', '#div_frameMenu', function () {
    switch (whichView) {
        case "buttonPopover":
            initBsMenuView();
            break;
        case "stylePopover":
            initStylePopover();
            break;
        case "dimPopover":
            initDimPopover();
            break;
    }
});
function initBsMenuView() {
    var offset = $('#bsOffsetButton').bootstrapSlider('getValue');
    var menu = parseInt($('#bsMainMenu').val());
    $('#bsPopStyleButton').val($('#bsStyleButton').val());
    $('#bsPopOffset').val(offset);
    $('#bsPopWidthButton').val($('#bsWidthButton').val());
    $('#bsPopColorHome').val($('#bsColorHome').val());
    $('#bsPopColorHome').removeClass();
    $('#bsPopColorHome').addClass('form-control ' + $('#bsPopColorHome').val());
    if ($('input[name="bsJustifiedYes"]').val() === "1") {
        $('#bsPopJustifiedNo').removeClass('btn-success');
        $('#bsPopJustifiedYes').addClass('btn-success');
    }
    else {
        $('#bsPopJustifiedYes').removeClass('btn-success');
        $('#bsPopJustifiedNo').addClass('btn-success');
    }
    if ($('input[name="bsGroupYes"]').val() === "1") {
        $('#bsPopGroupNo').removeClass('btn-success');
        $('#bsPopGroupYes').addClass('btn-success');
    }
    else {
        $('#bsPopGroupYes').removeClass('btn-success');
        $('#bsPopGroupNo').addClass('btn-success');
    }
    if (menu > 1) {
        $('#bsPopGroupYes').prop('disabled', true);
        $('#bsPopGroupNo').prop('disabled', true);
        bsGroupNo();
    }
    else {
        $('#bsPopGroupYes').prop('disabled', false);
        $('#bsPopGroupNo').prop('disabled', false);
    }
    switch ($('#bsStyleButton').val()) {
        case '0':
            $('#bsPopGroupYes').prop('disabled', false);
            $('#bsPopGroupNo').prop('disabled', false);
            $('#bsPopJustifiedYes').prop('disabled', true);
            $('#bsPopJustifiedNo').prop('disabled', true);
            break;
        case '1':
        case '2':
            $('#bsPopGroupYes').prop('disabled', true);
            $('#bsPopGroupNo').prop('disabled', true);
            $('#bsPopJustifiedYes').prop('disabled', false);
            $('#bsPopJustifiedNo').prop('disabled', false);
            break;
    }
    switch ($('#bsMainMenu').val()) {
        case '0':
        case '1':
            $('#isNavTabs').prop('disabled', false);
            $('#bsPopOffset').prop('disabled', false);
            break;
        case '2':
        case '3':
            $('#isNavTabs').prop('disabled', true);
            $('#bsPopOffset').prop('disabled', true);
            $('#bsPopGroupYes').prop('disabled', true);
            $('#bsPopGroupNo').prop('disabled', true);
            $('#bsPopJustifiedYes').prop('disabled', true);
            $('#bsPopJustifiedNo').prop('disabled', true);
            break;
    }
    var options = '';
    $('#bsPopButtonIdSelect').empty();
    for (var index = 1; index < myTheme.myButtons.length; index++) {
        options += '<option value="' + index + '">' + myTheme.myButtons[index] + '</option>';
    }
    $('#bsPopButtonIdSelect').html(options);
    if (myTheme.myButtons.length < 2) {
        $('#bsPopButtonId').prop('disabled', true);
        $('#bsPopSortbsMenu').prop('disabled', true);
        $('#bsPopButtonIdSelect').prop('disabled', true);
    }
    else {
        $('#bsPopButtonIdSelect').val('1');
        $('#bsPopSortbsMenu').prop('disabled', false);
        $('#bsPopButtonId').prop('disabled', false);
        $('#bsPopButtonIdSelect').prop('disabled', false);
        
    }
}
function buttonPopover() {
    whichView = "buttonPopover";
    var offset = $('#bsOffsetButton').bootstrapSlider('getValue');
    var options = '', disabled = 'disabled', value = '';
    var bsGroupYes = $('input[name="bsGroupYes"]').val() === "1" ? 'btn-success"' : '';
    var bsGroupNo = $('input[name="bsGroupYes"]').val() === "0" ? 'btn-success"' : '';
    var bsJustifiedYes = $('input[name="bsJustifiedYes"]').val() === "1" ? 'btn-success"' : '';
    var bsJustifiedNo = $('input[name="bsJustifiedYes"]').val() === "0" ? 'btn-success"' : '';
    for (var index = 1; index < myTheme.myButtons.length; index++) {
        disabled = '';
        value = myTheme.globalPlanId[1];
        options += '<option value="' + myTheme.globalPlanId[index] + '" data-index="' + index + '" data-indexdrop="-1">' + myTheme.myButtons[index] + '</option>';
    }
    $("#div_frameMenu").popover({
        html: true,
        title: '<strong class="control-label" name="bsMenuViewDetails">Boutons</strong>' +
                '',
        content:
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-4 control-label" for="bsPopStyleButton">Type</label>' +
                '<div class="col-sm-8">' +
                '<select class="form-control" value="' + $('#bsStyleButton').val() + '" id="bsPopStyleButton">' +
                '<option value="0">Boutons</option>' +
                '<option value="1" id="isNavTabs">Onglets</option>' +
                '<option value="2">Menus</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-4 control-label" for="bsPopWidthButton">Taille</label>' +
                '<div class="col-sm-8">' +
                '<select class="form-control"  value="' + $('#bsWidthButton').val() + '" id="bsPopWidthButton">' +
                '<option value="btn-sm">Petit</option>' +
                '<option value="btn-xs">Très petit</option>' +
                '<option value="">Normal</option>' +
                '<option value="btn-lg">Grand</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-4 control-label" for="bsPopColorHome">"home"</label>' +
                '<div class="col-sm-8">' +
                '<select class="form-control" value="' + $('#bsColorHome').val() + '" id="bsPopColorHome">' +
                '<option class="btn-primary" value="btn-primary">Primary</option>' +
                '<option class="btn-default" value="btn-default">default</option>' +
                '<option class="btn-success" value="btn-success">Success</option>' +
                '<option class="btn-info" value="btn-info">Info</option>' +
                '<option class="btn-warning" value="btn-warning">Warning</option>' +
                '<option class="btn-danger" value="btn-danger">Danger</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm" style="display:none">' +
                '<label class="col-sm-4 control-label" for="bsPopJustifiedYes">Justifié</label>' +
                '<div class="col-sm-8">' +
                '<div class="btn-group" data-toggle="buttons">' +
                '<button class="btn btn-xs ' + bsJustifiedYes + '" type="button" id="bsPopJustifiedYes" autocomplete="off">Oui</button>' +
                '<button class="btn btn-xs ' + bsJustifiedNo + '" type="button" id="bsPopJustifiedNo" autocomplete="off">Non</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-4 control-label" for="bsPopGroupYes">Groupés</label>' +
                '<div class="col-sm-8">' +
                '<div class="btn-group" data-toggle="buttons">' +
                '<button class="btn btn-xs ' + bsGroupYes + '" type="button" id="bsPopGroupYes" autocomplete="off">Oui</button>' +
                '<button class="btn btn-xs ' + bsGroupNo + '" type="button" id="bsPopGroupNo" autocomplete="off">Non</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-4 control-label" for="bsPopOffsetButton">Décalage</label>' +
                '<div class="col-sm-8">' +
                '<input type="number" class="form-control" id="bsPopOffset" value="' + offset + '" data-min="0" data-max="0"/>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<div class="col-sm-5">' +
                '<button type="button" class="btn btn-sm btn-success " id="bsPopAddButton" title="Ajouter un bouton"><i class="fa fa-plus-circle"></i></button>' +
                '<button type="button" class="btn btn-sm btn-info " id="bsPopButtonId" ' + disabled + ' title="Editer le bouton"><i class="fa fa-pencil"></i></button>' +
                '</div>' +
                '<div class="col-sm-7">' +
                '<select class="form-control" value="' + value + '" id="bsPopButtonIdSelect" ' + disabled + '>' + options +
                '</select>' +
                '</div></div>' +
                '<div class="form-group form-group-sm"><div class="col-sm-12">' +
                '<button type="button" class="btn btn-block btn-info " id="bsPopSortbsMenu" title="Ré-ordonner les Boutons/Menus/Onglets"><i class="fa fa-magnet"></i> Classer</button>' +
                '</div></div>' +
                '<div class="form-group form-group-sm"><div class="col-sm-12">' +
                '<button type="button" class="btn btn-block btn-success " id="bsPopExitbsMenu" title="Retour au Popover précédent"><i class="fa fa-check"></i> Valider</button>' +
                '</div></div>' +
                '',
        placement: 'left',
        viewport: "#bsMenuThemesApercuView"
    });
    $('#div_frameMenu').popover('show');
}

// **************    Popover Styles     *****************

$('#bsMenuThemesApercuView').on('click', 'button#bsPopExitbsStyle', function () {
    $('#div_frameMenu').popover('destroy');
    menuPopover();
});
$('#bsMenuThemesApercuView').on('change', '#bsPopIsStyle', function () {
    if ($('#bsPopIsStyle').prop("checked")) {
        $('#bsPopColorWindow').prop("disabled", false);
        $('#bsPopBgColorWindow').prop("disabled", false);
        $('#bsIsStyle').prop("checked", true);
    }
    else {
        $('#bsPopColorWindow').prop("disabled", true);
        $('#bsPopBgColorWindow').prop("disabled", true);
        $('#bsIsStyle').prop("checked", false);
    }
    bsIsStyle();
    bsColorWindow();
    bsBgColorWindow();
    createMenuBar();
});
$('#bsMenuThemesApercuView').on('change', 'input#bsPopBgColorWindow', function () {
    $('#bsBgColorWindow').val($('#bsPopBgColorWindow').val());
    bsBgColorWindow();
    createMenuBar();
});
$('#bsMenuThemesApercuView').on('change', 'input#bsPopColorWindow', function () {
    $('#bsColorWindow').val($('#bsPopColorWindow').val());
    bsColorWindow();
    createMenuBar();
});
$('#bsMenuThemesApercuView').on('change', 'input#bsPopBorderWindow', function () {
    $('#bsBorderWindow').val($('#bsPopBorderWindow').val());
    bsBorderWindow();
});
$('#bsMenuThemesApercuView').on('change', 'select#bsPopBorderBold', function () {
    $('#bsBorderBold').val($('#bsPopBorderBold').val());
    bsBorderWindow();
});
$('#bsMenuThemesApercuView').on('change', 'input#bsPopBorderColor', function () {
    $('#bsBorderColor').val($('#bsPopBorderColor').val());
    bsBorderWindow();
});
$('#bsMenuThemesApercuView').on('change', 'input#bsPopBorderRadius', function () {
    $('#bsBorderRadius').val($('#bsPopBorderRadius').val());
    bsBorderRadius();
});
$('#bsMenuThemesApercuView').on('change', "input[name='bsPopBorderShadow1']", function () {
    $("input[name='bsBorderShadow1']").val($("input[name='bsPopBorderShadow1']").val());
    bsBorderShadow();
});
$('#bsMenuThemesApercuView').on('change', "input[name='bsPopBorderShadow2']", function () {
    $("input[name='bsBorderShadow2']").val($("input[name='bsPopBorderShadow2']").val());
    bsBorderShadow();
});
$('#bsMenuThemesApercuView').on('change', "input[name='bsPopBorderShadow3']", function () {
    $("input[name='bsBorderShadow3']").val($("input[name='bsPopBorderShadow3']").val());
    bsBorderShadow();
});
$('#bsMenuThemesApercuView').on('change', "input[name='bsPopBorderShadowColor']", function () {
    $("input[name='bsBorderShadowColor']").val($("input[name='bsPopBorderShadowColor']").val());
    bsBorderShadow();
});
function initStylePopover() {
    if ($('#bsIsStyle').prop("checked")) {
        $('#bsPopIsStyle').prop("checked", true);
        $('#bsPopColorWindow').prop("disabled", false);
        $('#bsPopBgColorWindow').prop("disabled", false);
    }
    else {
        $('#bsPopIsStyle').prop("checked", false);
        $('#bsPopColorWindow').prop("disabled", true);
        $('#bsPopBgColorWindow').prop("disabled", true);
    }
    $('#bsCadreStyleDetails').text('Cadre Principal - L:' + $("#bsWidthWindow").css('width') + ' - H:' + $("#bsWidthWindow").css('height'));
    $('#bsPopBgColorWindow').val($('#bsBgColorWindow').val());
    $('#bsPopColorWindow').val($('#bsColorWindow').val());
    $('#bsPopBorderWindow').val($('#bsBorderWindow').val());
    $('#bsPopBorderRadius').val($('#bsBorderRadius').val());
    $('#bsPopBorderBold').val($('#bsBorderBold').val());
    $('#bsPopBorderColor').val($('#bsBorderColor').val());
    $('#bsPopWidthButton').val($('#bsWidthButton').val());
    $('input[name="bsPopBorderShadow1"]').val($('input[name="bsBorderShadow1"]').val());
    $('input[name="bsPopBorderShadow2"]').val($('input[name="bsBorderShadow2"]').val());
    $('input[name="bsPopBorderShadow3"]').val($('input[name="bsBorderShadow3"]').val());
    $('input[name="bsPopBorderShadowColor"]').val($('input[name="bsBorderShadowColor"]').val());
    $('#bsPopColorHome').val($('#bsColorHome').val());
}
function stylePopover() {
    whichView = "stylePopover";
    $("#div_frameMenu").popover({
        html: true,
        title: '<strong class="control-label" name="bsStyleDetails">Styles' +
                '<div class="pull-right col-sm-1">' +
                '<input type="checkbox" class="" id="bsPopIsStyle"/>' +
                '</div></strong>' +
                '',
        content:
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-4 control-label" for="bsPopBgColorWindow">Fond</label>' +
                '<div class="col-sm-8">' +
                '<input class="form-control" id="bsPopBgColorWindow" type="color" value="#e8e8e8" placeholder="Couleur"/>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-4 control-label" for="bsPopColorWindow">Texte</label>' +
                '<div class="col-sm-8">' +
                '<input class="form-control" id="bsPopColorWindow" type="color" value="#333" placeholder="Couleur"/>' +
                '</div>' +
                '</div>' +
                '<strong class="col-sm-12 noPaddingLeft noPaddingRight" style="border-bottom: 1px groove; margin-bottom: 8px;">Bordure</strong>' +
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-4 control-label" for="bsPopBorderWindow">Taille</label>' +
                '<div class="col-sm-8">' +
                '<input class="form-control" id="bsPopBorderWindow" type="number"/>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-4 control-label" for="bsPopBorderRadius">Rayon</label>' +
                '<div class="col-sm-8">' +
                '<input class="form-control" id="bsPopBorderRadius" type="number"/>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-4 control-label" for="bsPopBorderBold">Style</label>' +
                '<div class="col-sm-8">' +
                '<select class="form-control" id="bsPopBorderBold"">' +
                '<option value="none">none</option>' +
                '<option value="solid">solid</option>' +
                '<option value="groove">groove</option>' +
                '<option value="dotted">dotted</option>' +
                '<option value="dashed">dashed</option>' +
                '<option value="double">double</option>' +
                '<option value="ridge">ridge</option>' +
                '<option value="inset">inset</option>' +
                '<option value="outset">outset</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-4 control-label" for="bsPopBorderColor">Couleur</label>' +
                '<div class="col-sm-8">' +
                '<input class="form-control" id="bsPopBorderColor" type="color" placeholder="Couleur"/>' +
                '</div>' +
                '</div>' +
                '<strong class="col-sm-12 noPaddingLeft noPaddingRight" style="border-bottom: 1px groove; margin-bottom: 8px;">Ombre</strong>' +
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-4 control-label" for="bsPopBorderShadow1">Taille</label>' +
                '<div class="col-sm-8">' +
                '<div class="control-group">' +
                '<input class="col-sm-12" name="bsPopBorderShadow1" type="number"/>' +
                '<input class="col-sm-12" name="bsPopBorderShadow2" type="number"/>' +
                '<input class="col-sm-12" name="bsPopBorderShadow3" type="number"/>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-4 control-label" for="bsPopBorderShadowColor">Couleur</label>' +
                '<div class="col-sm-8">' +
                '<input class="form-control" id="bsPopBorderShadowColor" name="bsPopBorderShadowColor" type="color" placeholder="Couleur"/>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<div class="col-sm-12">' +
                '<button type="button" class="btn btn-block btn-success " id="bsPopExitbsStyle" title="Retour au Popover précédent"><i class="fa fa-check"></i> Valider</button>' +
                '</div></div>' +
                '',
        placement: 'left',
        viewport: "#bsMenuThemesApercuView",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    $('#div_frameMenu').popover('show');
}

// **************    popover Dimensions     *****************

$('#bsMenuThemesApercuView').on('click', 'button#bsPopExisDim', function () {
    $('#div_frameMenu').popover('destroy');
    menuPopover();
});
$('#bsMenuThemesApercuView').on('change', 'input#bsPopWidthMainWindow', function () {
    $('#div_frameMenu').css('width', $('#bsPopWidthMainWindow').val());
    $('#bsWidthMainWindow').val($('#bsPopWidthMainWindow').val());
    createMenuBar();
    $('#bsDesignButton').prop('disabled', false);
});
$('#bsMenuThemesApercuView').on('change', 'input#bsPopHeightMainWindow', function () {
    $('#div_frameMenu').css('height', $('#bsPopHeightMainWindow').val());
    $('#bsHeightMainWindow').val($('#bsPopHeightMainWindow').val());
    createMenuBar();
    $('#bsDesignButton').prop('disabled', false);
});
$('#bsMenuThemesApercuView').on('change', 'input#bsPopMyCadre', function () {
    $('#bsMyCadre').val($('#bsPopMyCadre').val());
    myTheme.myCadre = $('#bsPopMyCadre').val();
});

$('#bsMenuThemesApercuView').on('change', 'input#bsPopMyGeneral', function () {
    $('#bsMyGeneral').val($('#bsPopMyGeneral').val());
    myTheme.globalPlanId[0] = $('#bsPopMyGeneral').val();
    myTheme.myButtons[0] = 'Général';
    myTheme.myDropdowns[0] = '';
    myTheme.myColors[0] = $('#bsColorHome').val();
});
$('#bsMenuThemesApercuView').on('click', 'button#bsPopDelFont', function () {
    var delFont = $('#bsListFonts').val();
    bootbox.confirm("Etes-vous sur de vouloir effacer cette Font", function (result) {
        if (result) {
            removeFont({
                font: delFont,
                error: function (error) {
                    $('#div_alert').showAlert({message: error.message, level: 'danger'});
                },
                success: function (data) {
                    $('#bsListFonts').val('0');
                    updateListFonts($('#bsListFonts').val());
                    notify('Suppression d\'une Font', 'Font supprimée avec succès', 'success');
                }
            });
        }
    });
});
$('#bsMenuThemesApercuView').on('change', 'select#bsPopListFonts', function () {
    $('#bsListFonts').val($('#bsPopListFonts').val());
    if ($('#bsListFonts').val() === '0') {
        $('#bsPopDelFont').prop('disabled', true);
    }
    else {
        $('#bsPopDelFont').prop('disabled', false);
    }
    changeFontFace();
    createMenuBar();
});

$('#bsMenuThemesApercuView').on('change', 'select#bsPopImageMainWindow', function () {
    $('#bsImageMainWindow').val($('#bsPopImageMainWindow').val());
    bsImageMainWindow();
});
function initDimPopover() {
    $('#bsPopMyFont').fileupload({
        dataType: 'json',
        done: function (e, data) {
            if (data.result.state !== 'ok') {
                $('#div_alert').showAlert({message: data.result.result, level: 'danger'});
                return;
            }
            $('#div_frameMenu').popover('hide');
            updateListFonts($('#bsListFonts').val());
            notify('Ajout d\'une Font', 'Font ajoutée avec succès', 'success');
        }
    });
    $('#bsDimDetails').text('C. Principal - L:' + $("#bsWidthWindow").val() + 'px - H:' + $("#bsHeightWindow").val() + 'px');
    $('#bsPopWidthMainWindow').val($('#bsWidthMainWindow').val());
    $('#bsPopHeightMainWindow').val($('#bsHeightMainWindow').val());
    if ($('#bsExpert').hasClass('btn-success')) {
        $('#bsPopMyCadre').prop('readonly', false);
        $('#bsPopMyGeneral').prop('readonly', false);
    }
    else {
        $('#bsPopMyCadre').prop('readonly', true);
        $('#bsPopMyGeneral').prop('readonly', true);
    }
    $('#bsPopMyCadre').val($('#bsMyCadre').val());
    $('#bsPopMyGeneral').val($('#bsMyGeneral').val());
    $('#bsPopListFonts').append($('#bsListFonts').html());
    $('#bsPopImageMainWindow').append($('#bsPageImage').html());
    var selected = $('#div_frameMenu').css('background-image');
    if (selected !== "none") {
        selected = selected.match(/.*\/(.*)[^\"]$/);
        selected = selected[1].replace(/\"/g, '');
        selected = decodeURI(selected);
        $('#bsPopImageMainWindow').val(selected);
    }
    else
        $('#bsPopImageMainWindow').val("0");
    $('#bsPopListFonts').val($('#bsListFonts').val());
    if ($('#bsListFonts').val() === '0') {
        $('#bsPopDelFont').prop('disabled', true);
    }
    else {
        $('#bsPopDelFont').prop('disabled', false);
    }
}

function dimPopover() {
    whichView = "dimPopover";
    $("#div_frameMenu").popover({
        html: true,
        title:
                '<strong class="control-label" id="bsDimDetails" style="font-size:0.90em">Dimensions</strong>' +
                '',
        content:
                '<strong class="col-sm-12 noPaddingLeft noPaddingRight" style="border-bottom: 1px groove; margin-bottom: 8px;">Fenêtre Principale</strong>' +
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-6 control-label" for="bsPopWidthMainWindow">Largeur</label>' +
                '<div class="col-sm-6">' +
                '<input type="number" class="form-control" id="bsPopWidthMainWindow" value="1024" placeholder="Largeur.."/>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-6 control-label" for="bsPopHeightMainWindow">Hauteur</label>' +
                '<div class="col-sm-6">' +
                '<input type="number" class="form-control" id="bsPopHeightMainWindow" value="768" placeholder="Hauteur.."/>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-6 control-label" for="bsPopImageMainWindow">Image</label>' +
                '<div class="col-sm-6">' +
                '<select class="form-control" id="bsPopImageMainWindow">' +
                '</select>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm" id="bsPopMyCadreView">' +
                '<label class="col-sm-6 control-label" for="bsPopMyCadre">Id du Plan</label>' +
                '<div class="col-sm-6">' +
                '<input type="number" class="form-control" id="bsPopMyCadre" placeholder="Plan.."/>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm" id="bsPopMyGeneralView">' +
                '<label class="col-sm-6 control-label" for="bsPopMyGeneral">Id du Cadre</label>' +
                '<div class="col-sm-6">' +
                '<input type="number" class="form-control" id="bsPopMyGeneral" placeholder="General.."/>' +
                '</div>' +
                '</div>' +
                '<strong class="col-sm-12 noPaddingLeft noPaddingRight" style="border-bottom: 1px groove; margin-bottom: 8px;">Font(s)</strong>' +
                '<div class="form-group form-group-sm">' +
                '<div class="col-sm-6">' +
                '<button type="button" class="form-control btn btn-sm btn-danger" id="bsPopDelFont" title="Supprimer la Font">' +
                '<i class="fa fa-trash-o"></i> Selection' +
                '</button>' +
                '</div>' +
                '<div class="col-sm-6">' +
                '<select class="form-control" id="bsPopListFonts">' +
                '</select>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-6 control-label" for="bsPopMyFont">Ajouter</label>' +
                '<div class="col-sm-6">' +
                '<span class="form-control btn btn-sm btn-info fileinput-button">' +
                '<i class="glyphicon glyphicon-plus"></i>' +
                '<span>Font(s)...</span>' +
                '<input class="form-control" type="file" id="bsPopMyFont" name="fonts" data-url="plugins/themes/core/ajax/themes.ajax.php?action=fontUpload"/>' +
                '</span>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<div class="col-sm-12">' +
                '<button type="button" class="btn btn-block btn-success " id="bsPopExisDim" title="Retour au Popover précédent"><i class="fa fa-check"></i> Valider</button>' +
                '</div></div>' +
                '',
        placement: 'left',
        viewport: "#bsMenuThemesApercuView",
        template: '<div class="popover" role="tooltip" style="padding-bottom: 0"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    $('#div_frameMenu').popover('show');
}

// **************    Popover Classer     *****************

$('#bsMenuThemesApercuView').on('click', 'button#bsPopValidSortButton', function () {
    var kids;
    var style = $('#bsStyleButton').val();
    switch (style) {
        case '0':
            kids = $('#menuBar').find(".buttonItems");
            break;
        case '1':
            kids = $('#menuBar').find(".navTabsItems");
            break;
        case '2':
            kids = $('#menuBar').find(".navPillsItems");
            break;
    }
    for (var index = 0; index < kids.length; index++) {
        var textDrops = "", text = "", planId = "";
        var dropKids, color;
        var html = '';
        switch (style) {
            case '0':
                dropKids = kids.eq(index).find('a');
                planId = '' + kids.eq(index).find('button').data('planid');
                if (dropKids.length !== 0) {
                    textDrops = [];
                    planId = [];
                    dropKids.each(function () {
                        textDrops.push($(this).text());
                        planId.push('' + $(this).data('planid'));
                    });
                }
                text = kids.eq(index).find('button').text();
                color = getColorButton(kids.eq(index).find('button'));
                html = createItemButtons(index+1, text, color, textDrops, planId);
                break;
            case '1':
                dropKids = kids.eq(index).find('ul').find('a');
                planId = '' + kids.eq(index).children().eq(0).data('planid');
                if (dropKids.length !== 0) {
                    textDrops = [];
                    planId = [];
                    dropKids.each(function () {
                        textDrops.push($(this).text());
                        planId.push('' + $(this).data('planid'));
                    });
                }
                text = kids.eq(index).children().eq(0).text();
                color = myTheme.myColors[index];
                html = createItemTabsPills(index+1, text, color, textDrops, planId);
                break;
            case '2':
                dropKids = kids.eq(index).find('ul').find('a');
                planId = '' + kids.eq(index).children().eq(0).data('planid');
                if (dropKids.length !== 0) {
                    textDrops = [];
                    planId = [];
                    dropKids.each(function () {
                        textDrops.push($(this).text());
                        planId.push('' + $(this).data('planid'));
                    });
                }
                text = kids.eq(index).children().eq(0).text();
                color = myTheme.myColors[index];
                html = createItemTabsPills(index+1, text, color, textDrops, planId);
                break;
        }
        updateItemMenu(index, html);
    }
    $('#menuBar').sortable('destroy');
    $('#myBootstrapMenu').popover('destroy');
    createMenuBar();
    buttonPopover();
});
$('#bsMenuThemesApercuView').on('click', 'button#bsPopExitSortButton', function () {
    $('#menuBar').sortable('destroy');
    $('#myBootstrapMenu').popover('destroy');
    createMenuBar();
    buttonPopover();
});

function sortButton() {
    whichView = "sortButton";
    var place = {
        '0': 'bottom',
        '1': 'top',
        '2': 'right',
        '3': 'left'
    };
    if ($('#bsPopJustifiedYes').hasClass('btn-success')) {
        bsJustifiedNo();
        createMenuBar();
    }
    var style = $('#bsStyleButton').val();
    var items = '> *';
    switch (style) {
        case '0':
            items = $('#menuBar').find(".buttonItems");
            break;
        case '1':
            items = $('#menuBar').find(".navTabsItems");
            break;
        case '2':
            items = $('#menuBar').find(".navPillsItems");
            break;
    }
    $('#menuBar').sortable({
        revert: true,
        cursor: "move",
        items: items,
        cancel: 'ui-state-disabled',
        containment: "#menuBar"
    });
    $('#myBootstrapMenu').popover({
        html: true,
        title: '<strong class="control-label" name="bsButtonDetails">Classer</strong>' +
                '',
        content:
                '<div class="col-sm-12">' +
                '<div class="form-group">' +
                '<button type="button" class="btn btn-block btn-danger" id="bsPopExitSortButton"><i class="fa fa-times"></i> Annuler</button>' +
                '</div>' +
                '<div class="form-group">' +
                '<button type="button" class="btn btn-block btn-success" id="bsPopValidSortButton"><i class="fa fa-check"></i> Valider</button>' +
                '</div></div>' +
                '',
        placement: place[$('#bsMainMenu').val()],
        viewport: "#bsMenuThemesApercuView"
    });
    $('#myBootstrapMenu').popover('show');
}

// **************    Popover Edition Bouton     *****************

$('#bsMenuThemesApercuView').on('click', 'button#bsPopButtonId', function () {
    var index = $('#bsPopButtonIdSelect').find(':selected').val();
    $('#div_frameMenu').popover('destroy');
    buttonBar(index);
});
$('#bsMenuThemesApercuView').on('click', 'button#bsPopDropdown', function () {
    if ($('#bsPopDropdown').hasClass('btn-success')) {
        $('#bsPopDropdown').removeClass('btn-success active');
        $('#bsPopListDropdown').hide();
    }
    else {
        $('#bsPopDropdown').addClass('btn-success active');
        $('#bsPopListDropdown').show();
    }
});
$('#bsMenuThemesApercuView').on('click', 'button#bsPopDelButton', function () {
    var idButton = parseInt($('#bsPopDelButton').data('index'));
    if (myTheme.myDropdowns[idButton] !== "") {
        var isNotEmpty = false;
        for (var index = 0; index < myTheme.globalPlanId[idButton].length; index++) {
            if (myTheme.globalPlanId[idButton][index] !== "")
                isNotEmpty = true;
        }
        if (isNotEmpty) {
            notify('Suppression d\'un Sous-menu', 'Eléments(s) du sous-menu lié a un plan\nSuppression Annulée', 'warning');
            return;
        }
        myTheme.globalPlanId[idButton] = "";

    }
    if (myTheme.globalPlanId[idButton] !== "") {
        bootbox.confirm("Un plan est lié à ce bouton, le plan va être lui aussi supprimé", function (result) {
            if (result) {
                deletePlanThemes(idButton, -1);
                removeButton(idButton);
                createMenuBar();
                $('#myBootstrapMenu').popover('destroy');
                buttonPopover();
            }
            return;
        });
    }
    else {
        removeButton(idButton);
        createMenuBar();
        $('#myBootstrapMenu').popover('destroy');
        buttonPopover();
    }
});

$('#bsMenuThemesApercuView').on('click', '.bsPopListDel', function () {
    var bsListDel = $(this).data('bspoplistdel');
    var idButton = $('#bsPopDelButton').data('index');
    if (isset(myTheme.globalPlanId[idButton][bsListDel]) && (myTheme.globalPlanId[idButton][bsListDel] !== "")) {
        bootbox.confirm("Un plan est lié à cette entrée, le plan va être lui aussi supprimé", function (result) {
            if (result) {
                deletePlanThemes(idButton, bsListDel);
                $('#addPopTextDropdown').children().eq(bsListDel).remove();
                $('#addPopTextPlanId').children().eq(bsListDel).remove();
                $('#addPopTextDel').children().eq(bsListDel).remove();
            }
            else {
                return;
            }
        });
    }
    else {
        $('#addPopTextDropdown').children().eq(bsListDel).remove();
        $('#addPopTextPlanId').children().eq(bsListDel).remove();
        $('#addPopTextDel').children().eq(bsListDel).remove();
    }
});
$('#bsMenuThemesApercuView').on('click', 'button#bsPopExitMenuBar', function () {
    $('#myBootstrapMenu').popover('destroy');
    buttonPopover();
});
$('#bsMenuThemesApercuView').on('change', 'select#bsPopColorButton', function () {
    $('#bsPopColorButton').removeClass();
    $('#bsPopColorButton').addClass('form-control ' + $('#bsPopColorButton').val());
});
$('#bsMenuThemesApercuView').on('click', 'button#bsPopValidMenuBar', function () {
    var validate = true, dropdown = new Object();
    if ($('#bsPopButtonName').val() === "") {
        $('#bsPopButtonName').parent().parent().addClass('has-error');
        validate = false;
    }
    if (!validate) {
        return;
    }
    var planId = $('#bsPopButtonIdPlan').val();
    var idButton = $('#bsPopButtonName').data('index');
    if ($('#bsPopDropdown').hasClass('btn-success')) {
        dropdown = getPopListDropdown();
    }
    else {
        dropdown.text = "";
        dropdown.planId = planId;
    }
    var html = '';
    switch($('#bsStyleButton').val()) {
        case '0':
        html = createItemButtons(idButton, $('#bsPopButtonName').val(),$('#bsPopColorButton').val(), dropdown.text, dropdown.planId);
        break;
        case '1':
        html = createItemTabsPills(idButton, $('#bsPopButtonName').val(), $('#bsPopColorButton').val(), dropdown.text, dropdown.planId, false);
        break;
        case '2':
        html = createItemTabsPills(idButton, $('#bsPopButtonName').val(), $('#bsPopColorButton').val(), dropdown.text, dropdown.planId, true);
        break;
    }
    updateItemMenu(idButton, html);
    createMenuBar();
    $('#myBootstrapMenu').popover('destroy');
    if(myTheme.myDropdowns[idButton] === "") {
        if(myTheme.globalPlanId[idButton] !== "")
            secondaryPages.update(myTheme.globalPlanId[idButton], $('#bsPopButtonName').val());
    }
    else {
        for(var index = 0; index < myTheme.myDropdowns[idButton].length; index++) {
            if(myTheme.globalPlanId[idButton][index] !== "")
                secondaryPages.update(myTheme.globalPlanId[idButton][index], myTheme.myDropdowns[idButton][index]);
        }
    }
    buttonPopover();
});

$('#bsMenuThemesApercuView').on('shown.bs.popover', '#myBootstrapMenu', function () {
    switch (whichView) {
        case "buttonBar":
            initButtonBarView();
            break;
    }
});
function initButtonBarView() {
    var index = $('#bsPopButtonName').data('index');
    $("strong[name='bsButtonDetails']").text('Edition de: ' + myTheme.myButtons[index]);
    if ($('#bsExpert').hasClass('btn-success'))
        $('#bsPopButtonIdPlan').prop('readonly', false);
    else
        $('#bsPopButtonIdPlan').prop('readonly', true);
    if (index !== '') {
        $('#bsPopButtonName').val(myTheme.myButtons[index]);
        $('#bsPopColorButton').val(myTheme.myColors[index]);
        $('#bsPopColorButton').removeClass();
        $('#bsPopColorButton').addClass('form-control ' + $('#bsPopColorButton').val());
        if (myTheme.myDropdowns[index].length !== 0) {
            $('#bsPopDropdown').addClass('btn-success active');
            for (var indexDrop = 0; indexDrop < myTheme.myDropdowns[index].length; indexDrop++) {
                addPopTextDrop(myTheme.myDropdowns[index][indexDrop], myTheme.globalPlanId[index][indexDrop]);
            }
            $('#addPopTextDropdown').removeClass('col-sm-10');
            $('#addPopTextDropdown').addClass('col-sm-5');
            $('#bsPopIdPlanDisplay').hide();
            $('#addPopTextDel').show();
            $('#addPopTextPlanId').show();
            $('#bsPopListDropdown').show();
        }
        else {
            $('#bsPopDropdown').removeClass('btn-success active');
            $('#bsPopListDropdown').hide();
            $('#bsPopIdPlanDisplay').show();
            $('#bsPopButtonIdPlan').val(myTheme.globalPlanId[index]);
        }
    }
};

$('#bsMenuThemesApercuView').on('click', 'button#bsPopAddList', function () {
    addPopTextDrop("", "");
});

function getPopListDropdown() {
    var dropdown = new Object();
    dropdown.text = [];
    dropdown.planId = [];
    var kidsTextDrop = $('#addPopTextDropdown').children();
    var kidsPlanId = $('#addPopTextPlanId').children();
    for (var index = 0; index < kidsTextDrop.length; index++) {
        dropdown.text.push(kidsTextDrop.eq(index).val());
        dropdown.planId.push(kidsPlanId.eq(index).val());
    }
    return dropdown;
}

function addPopTextDrop(textDrop, planId) {
    var readonly = 'readonly';
    if ($('#bsExpert').hasClass('btn-success'))
        readonly = "";
    var addTextDrop = '<input type="text" class="form-control" id="bsPopListDropdown' + $('#addPopTextDropdown').children().length + '" value= "' + textDrop + '" placeholder="Nom..."/>';
    var addPlanId = '<input type="number" class="form-control" ' + readonly + ' id="bsPopListPlanId' + $('#addPopTextPlanId').children().length + '" value= "' + init(planId) + '" placeholder="Plan..."/>';
    var addDel = '<button type="button" class="form-control btn btn-sm btn-danger  bsPopListDel" data-bspoplistdel="' + $('#addPopTextPlanId').children().length + '" title="Supprimer l\'éntrée"><i class="fa fa-trash-o"></i></button>';
    $('#addPopTextDropdown').append(addTextDrop);
    $('#addPopTextPlanId').append(addPlanId);
    $('#addPopTextDel').append(addDel);
}

function buttonBar(index) {
    whichView = "buttonBar";
    var place = {
        '0': 'bottom',
        '1': 'top',
        '2': 'right',
        '3': 'left'
    };
    var style = $('#bsStyleButton').val();
    var button;
    switch (style) {
        case '0':
            button = $('#menuBar').find(".buttonItems").eq(index);
            break;
        case '1':
            button = $('#menuBar').find(".navTabsItems").eq(index);
            break;
        case '2':
            button = $('#menuBar').find(".navPillsItems").eq(index);
            break;
    }
    var buttonName = '', buttonColor = '', dropView = '';
    if (index !== '') {
        buttonName = myTheme.myButtons[index];
        buttonColor = myTheme.myColors[index];
        if (myTheme.myDropdowns[index] !== '')
            dropView = "btn-success";
    }
    $('#myBootstrapMenu').popover({
        html: true,
        title: '<strong class="control-label" name="bsButtonDetails">Bouton</strong>' +
                '<button type="button" class="pull-right btn btn-xs btn-danger " id="bsPopDelButton" data-index="' + index + '" title="Supprimer le bouton">' +
                '<i class="fa fa-trash-o"></i></button>' +
                '',
        content:
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-4 control-label" for="bsPopButtonName">Nom</label>' +
                '<div class="col-sm-8">' +
                '<input type="text" class="form-control" value="' + buttonName + '" id="bsPopButtonName" data-index="' + index + '" placeholder="Nom..."/>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-4 control-label" for="bsPopColorButton">Couleur</label>' +
                '<div class="col-sm-8">' +
                '<select class="form-control" value="' + buttonColor + '" id="bsPopColorButton">' +
                '<option class="btn-primary" value="btn-primary">Primary</option>' +
                '<option class="btn-default" value="btn-default">default</option>' +
                '<option class="btn-success" value="btn-success">Success</option>' +
                '<option class="btn-info" value="btn-info">Info</option>' +
                '<option class="btn-warning" value="btn-warning">Warning</option>' +
                '<option class="btn-danger" value="btn-danger">Danger</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<label class="col-sm-4 control-label" for="bsPopDropdown">Sous-menu</label>' +
                '<div class="col-sm-8 control-group">' +
                '<div class="pull-left btn-group form-button" data-toggle="buttons">' +
                '<button class="btn btn-xs ' + dropView + '" type="button" id="bsPopDropdown" autocomplete="off">Oui</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm" id="bsPopListDropdown" style="display: none;" >' +
                '<label class="col-sm-2 control-label" for="bsLisPoptDropdown0">Textes</label>' +
                '<div class="col-sm-10">' +
                '<div class="col-sm-2">' +
                '<button type="button" id="bsPopAddList" class="btn btn-sm btn-success " title="Ajouter un Sous Menu"><i class="fa fa-plus-circle"></i></button>' +
                '</div>' +
                '<div class="col-sm-10 noPaddingRight" id="addPopTextDropdown">' +
                '</div>' +
                '<div class="col-sm-3 noPaddingRight" id="addPopTextPlanId" style="display: none;">' +
                '</div>' +
                '<div class="col-sm-2 noPaddingRight" id="addPopTextDel" style="display: none;">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm" id="bsPopIdPlanDisplay" style="display: none;" >' +
                '<label class="col-sm-4 control-label" for="bsPopButtonIdPlan">Id du Plan</label>' +
                '<div class="col-sm-8">' +
                '<input type="text" class="form-control" id="bsPopButtonIdPlan" placeholder="Plan..."/>' +
                '</div>' +
                '</div>' +
                '<div class="form-group form-group-sm"><div class="col-sm-6">' +
                '<button type="button" class="btn btn-block btn-danger" id="bsPopExitMenuBar"><i class="fa fa-times"></i> Annuler</button>' +
                '</div>' +
                '<div class="col-sm-6">' +
                '<button type="button" class="btn btn-block btn-success" id="bsPopValidMenuBar"><i class="fa fa-check"></i> Valider</button>' +
                '</div></div>' +
                '',
        placement: place[$('#bsMainMenu').val()],
        viewport: '#bsMenuThemesApercuView',
        template: '<div class="popover popovertheme" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    $('#myBootstrapMenu').popover('show');
}

// **************    Divers     *****************

$('#myBootstrapMenu').on('click', '.myBsNavTab', function (event) {
    $('#menuBar').find('li').removeClass('active');
    if ($(this).parent().attr('role') === 'presentation') {
        $(this).parent().addClass('active');
    }
    else {
        $(this).parent().parent().closest('li').addClass('active');
    }
});

$('#myBootstrapMenu').on('click', '.myBsNavPill', function (event) {
    $('#menuBar').find('li').removeClass('active');
    if ($(this).parent().attr('role') === 'presentation') {
        $(this).parent().addClass('active');
    }
    else {
        $(this).parent().parent().closest('li').addClass('active');
    }
});

// **************    modal     *****************
$('#modalCreateButton').on('shown.bs.modal', function () {
    $('#bsButtonName').focus();
});

$('#addTextDel').on('click', '.bsListDel', function () {
    var bsListDel = $(this).data('bslistdel');
    var idButton = $('#bsIdButton').val();
    if (isset(myTheme.globalPlanId[idButton][bsListDel]) && (myTheme.globalPlanId[idButton][bsListDel] !== "")) {
        //tester si c'est un dropdown et supprimer tout les plans
        bootbox.confirm("Un plan est lié à cette entrée, le plan va être lui aussi supprimé", function (result) {
            if (result) {
                deletePlanThemes(idButton, bsListDel);
                $('#addTextDropdown').children().eq(bsListDel).remove();
                $('#addTextPlanId').children().eq(bsListDel).remove();
                $('#addTextDel').children().eq(bsListDel).remove();
            }
            else {
                return;
            }
        });
    }
    else {
        $('#addTextDropdown').children().eq(bsListDel).remove();
        $('#addTextPlanId').children().eq(bsListDel).remove();
        $('#addTextDel').children().eq(bsListDel).remove();
    }
});

$('#bsAddList').on('click', function () {
    AddTextDrop("", "");
});

$('#bsColorButton').on('change', function () {
    var bgColor = $('#bsColorButton').val();
    //bgColor = "bg-" + bgColor.replace('btn-', '');
    $('#bsColorButton').removeClass();
    $('#bsColorButton').addClass('form-control ' + bgColor);
});

function AddTextDrop(textDrop, planId) {
    var readonly = 'readonly';
    if ($('#bsExpert').hasClass('btn-success'))
        readonly = "";
    var addTextDrop = '<input type="text" class="form-control" id="bsListDropdown" value= "' + textDrop + '" placeholder="Nom..."/>';
    var addPlanId = '<input type="number" class="form-control" ' + readonly + ' id="bsListPlanId" value= "' + init(planId) + '" placeholder="Plan..."/>';
    var addDel = '<button type="button" class="form-control btn btn-sm btn-danger  bsListDel" data-bslistdel="' + $('#addTextPlanId').children().length + '" title="Supprimer l\'éntrée"><i class="fa fa-trash-o"></i></button>';
    addTextDrop = addTextDrop.replace('bsListDropdown', 'bsListDropdown' + ($('#addTextDropdown').children().length));
    addPlanId = addPlanId.replace('bsListPlanId', 'bsListPlanId' + ($('#addTextPlanId').children().length));
    $('#addTextDropdown').append(addTextDrop);
    $('#addTextPlanId').append(addPlanId);
    $('#addTextDel').append(addDel);
}

function getListDropdown() {
    var dropdown = new Object();
    dropdown.text = [];
    dropdown.planId = [];
    var kidsTextDrop = $('#addTextDropdown').children();
    var kidsPlanId = $('#addTextPlanId').children();
    for (var index = 0; index < kidsTextDrop.length; index++) {
        dropdown.text.push(kidsTextDrop.eq(index).val());
        dropdown.planId.push(kidsPlanId.eq(index).val());
    }
    return dropdown;
}

$('#bsDropdown').on('click', function () {
    if ($('#bsDropdown').hasClass('btn-success')) {
        $('#bsDropdown').removeClass('btn-success active');
        $('#bsListDropdown').hide();
    }
    else {
        $('#bsDropdown').addClass('btn-success active');
        $('#bsListDropdown').show();
    }
});

$('#modalCancel').on('click', function () {
    $('#modalCreateButton').modal('hide');
});

$('#bsColorButton').on('change', function () {
});

$('#modalSave').on('click', function () {
    var validate = true, dropdown = new Object();
    if ($('#bsButtonName').val() === "") {
        $('#bsButtonName').parent().parent().addClass('has-error');
        validate = false;
    }
    if (!validate) {
        return;
    }
    var planId = $('#bsButtonIdPlan').val(); // covertir en tableau
    if ($('#bsDropdown').hasClass('btn-success')) {
        dropdown = getListDropdown();
    }
    else {
        dropdown.text = "";
        dropdown.planId = planId;
    }
    var idButton = countItemsMenu() + 1;
    // idButton = $('#bsIdButton').val();
    //if (idButton === "") {
    //}
    var html = '';
    switch($('#bsStyleButton').val()) {
        case '0':
        html = createItemButtons(idButton, $('#bsButtonName').val(), $('#bsColorButton').val(), dropdown.text, dropdown.planId);
        break;
        case '1':
        html = createItemTabsPills(idButton, $('#bsButtonName').val(), $('#bsColorButton').val(), dropdown.text, dropdown.planId, false);
        break;
        case '2':
        html = createItemTabsPills(idButton, $('#bsButtonName').val(), $('#bsColorButton').val(), dropdown.text, dropdown.planId, true);
        break;
    }
    addItemMenu(html);
    $('#bsDesignButton').prop('disabled', false);
    createMenuBar();
    $('#modalCreateButton').modal('hide');
});

//*****************************************************************

$('#bsImagesView').on('click', '.bsLinkDefaultImage', function () {
    var image = $(this).data('image');
    $('#bsCSS').val("src:url('plugins/themes/core/uploads/images/" + image + "')");
    $('#bsURL').val("plugins/themes/core/uploads/images/" + image);
    $('#bsHTTP').val(window.location.protocol + "//" + window.location.hostname + "/plugins/themes/core/uploads/images/" + image);
    $('#modalInfoButton').modal('show');
});

$('#bsImagesView').on('click', '.bsDelDefaultImage', function () {
    var image = $(this).data('image');
    bootbox.confirm("Etes-vous sur de vouloir effacer cette image", function (result) {
        if (result) {
            removeImage({
                image: image,
                category: "",
                error: function (error) {
                    $('#div_alert').showAlert({message: error.message, level: 'danger'});
                },
                success: function (data) {
                    $('#bsImageMainWindow').val('0');
                    updateListImages($('#bsImageMainWindow').val());
                    notify('Suppression d\'une Image', 'image supprimée avec succès', 'success');
                }
            });
        }
    });
});

$('body').on('click', 'button.bsLinkImage', function () {
    var image = $(this).data('image');
    var category = $(this).data('category');
    if(category !== "")
        category += '/';
    $('#bsCSS').val("src:url('plugins/themes/core/uploads/images/" + category + image + "')");
    $('#bsURL').val("plugins/themes/core/uploads/images/" + category + image);
    $('#bsHTTP').val(window.location.protocol + "//" + window.location.hostname + "/plugins/themes/core/uploads/images/" + category + image);
    $('#modalInfoButton').modal('show');
});

$('body').on('click', 'button.myCategoryDel', function () {
    var category = $(this).data('category');
    deleteCategory(category);
});
function deleteCategory(category) {
    removeCategory({
        category: category,
        error: function (error) {
            $('#div_alert').showAlert({message: error.message, level: 'danger'});
        },
        success: function (data) {
            listCategories({
                error: function (error) {
                    $('#div_alert').showAlert({message: error.message, level: 'danger'});
                },
                success: function (data) {
                    updateListCategories("");
                    notify('Suppression d\'une Catégorie', 'Catégorie ' + category + ' supprimée avec succès', 'success');
                }
            });
        }
    });
}

$('body').on('click', 'button.bsDelImage', function () {
    var image = $(this).data('image');
    var category = $(this).data('category');
    bootbox.confirm("Etes-vous sur de vouloir effacer cette image", function (result) {
        if (result) {
            removeImage({
                image: image,
                category: category,
                error: function (error) {
                    $('#div_alert').showAlert({message: error.message, level: 'danger'});
                },
                success: function () {
                    updateCategoryImages($('#bsImagesCategory').val());
                    notify('Suppression d\'une Image', 'image supprimée avec succès', 'success');
                }
            });
        }
    });
});

$('#bsImagesFileload').fileupload({
    dataType: 'json',
    done: function (e, data) {
        if (data.result.state !== 'ok') {
            $('#div_alert').showAlert({message: data.result.result, level: 'danger'});
            return;
        }
        if ($('#bsImagesCategory').val() === "") {
            updateListImages($('#bsImageMainWindow').val());
            notify('Ajout d\'une Image', 'image ajoutée avec succès', 'success');
        }
        else {
            updateCategoryImages($('#bsImagesCategory').val());
            notify('Ajout d\'une Image', 'image ajoutée dans la catégorie ' + $('#bsImagesCategory').val() + ' avec succès', 'success');            
        }
    }
});

$('#bsImagesCategory').on('change', function () {
    var url = "plugins/themes/core/ajax/themes.ajax.php?action=imageUpload";
    if ($('#bsImagesCategory').val() !== "")
        url += "&category=" + $('#bsImagesCategory').val();
    $('#bsImagesFileload').fileupload(
            'option', {url: url}
    );
});

$('#bsImagesAddCategory').on('click', function () {
    bootbox.prompt("Nom de la nouvelle catégorie", function (result) {
        if (result) {
            console.log(result);
            addCategory({
                category: result,
                error: function (error) {
                    $('#div_alert').showAlert({message: error.message, level: 'danger'});
                },
                success: function (data) {
                    var panels = '<div class="panel panel-primary">' +
                            '<div class="panel-heading"><h6>Catégorie : ' + result + 
                            '<button type="button" class="pull-right btn btn-xs btn-danger  myCategoryDel" data-category="' + result + '" title="Supprimer la Catégorie"><i class="fa fa-trash-o"></i></button>' +
                            '</h6></div>' +
                            '<div class="panel-body">' +
                            '<div class="col-sm-12" name="bsImagesView' + result + '">' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    $('#bsImagesCategory').append('<option value="' + result + '">' + result + '</option>');
                    $('#bsCategory').append(panels);
                    notify('Ajout d\'une Catégorie', 'Catégorie ' + result + ' ajouté avec succès', 'success');
                }
            });
        }
    });
});

function updateCategoryImages(category) {
    listCategory({
        category: category,
        error: function (error) {
            $('#div_alert').showAlert({message: error.message, level: 'danger'});
        },
        success: function (data) {
            var images = '';
            for (var i in data) {
                images += '<div class="media-left col-sm-2" >';
                images += '<div class="well col-sm-12 noPaddingWell noPaddingLeft noPaddingRight noMarginBottom">';
                images += '<button type="button" class="pull-left btn btn-xs btn-danger  bsDelImage" data-category="' + category + '" data-image="' + data[i] + '" title="Supprimer l\'image"><i class="fa fa-trash-o"></i></button>';
                images += '<button type="button" class="pull-right btn btn-xs btn-info  bsLinkImage" data-category="' + category + '" data-image="' + data[i] + '" title="Lien de l\'image"><i class="fa fa-globe"></i></button>';
                images += '</div>';
                images += '<img class="img-thumbnail center-block" src="plugins/themes/core/uploads/images/' + category + '/' + data[i] + '" alt="' + category + '/' + data[i] + '">';
                images += '<div class="well col-sm-12 noPaddingWell" id="bsViewImage' + i + '"></div>';
                images += '</div>';
            }
            $('div[name="bsImagesView' + category +'"]').html('<div class="media">' + images + '</div>');
            for (var i in data) {
                addImage(data[i], i, category);
            }
        }
    });
}

function updateListCategories(value) {
    listCategories({
        error: function (error) {
            $('#div_alert').showAlert({message: error.message, level: 'danger'});
        },
        success: function (data) {
            var options = '<option value="">Thèmes</option>';
            var panels = '';
            for (var i in data) {
                var temp = data[i].replace('/', '');
                options += '<option value="' + temp + '">' + temp + '</option>';
                panels = '<div class="panel panel-primary">' +
                            '<div class="panel-heading"><h6>Catégorie : ' + temp + 
                            '<button type="button" class="pull-right btn btn-xs btn-danger  myCategoryDel" data-category="' + temp + '" title="Supprimer la Catégorie"><i class="fa fa-trash-o"></i></button>' +
                            '</h6></div>' +
                        '<div class="panel-body">' +
                        '<div class="col-sm-12" name="bsImagesView' + temp + '">' +
                        '</div>' +
                        '</div>' +
                        '</div>';
            }
            $('#bsImagesCategory').html(options);
            $('#bsImagesCategory').val(value);
            $('#bsCategory').children(':gt(0)').remove();
            $('#bsCategory').append(panels);
            for (var i in data) {
                updateCategoryImages(data[i].replace('/', ''));
            }
        }
    });
}

function addCategory(_params) {
    var paramsRequired = ['category'];
    var paramsSpecifics = {};
    try {
        jeedom.private.checkParamsRequired(_params || {}, paramsRequired);
    } catch (e) {
        (_params.error || paramsSpecifics.error || jeedom.private.default_params.error)(e);
        return;
    }
    var params = $.extend({}, jeedom.private.default_params, paramsSpecifics, _params || {});
    var paramsAJAX = jeedom.private.getParamsAJAX(params);
    paramsAJAX.url = 'plugins/themes/core/ajax/themes.ajax.php';
    paramsAJAX.data = {
        action: 'addCategory',
        category: _params.category
    };
    $.ajax(paramsAJAX);
}

function listCategories(_params) {
    var paramsRequired = [];
    var paramsSpecifics = {};
    try {
        jeedom.private.checkParamsRequired(_params || {}, paramsRequired);
    } catch (e) {
        (_params.error || paramsSpecifics.error || jeedom.private.default_params.error)(e);
        return;
    }
    var params = $.extend({}, jeedom.private.default_params, paramsSpecifics, _params || {});
    var paramsAJAX = jeedom.private.getParamsAJAX(params);
    paramsAJAX.url = 'plugins/themes/core/ajax/themes.ajax.php';
    paramsAJAX.data = {
        action: 'listCategories'
    };
    $.ajax(paramsAJAX);
}

function listCategory(_params) {
    var paramsRequired = ['category'];
    var paramsSpecifics = {};
    try {
        jeedom.private.checkParamsRequired(_params || {}, paramsRequired);
    } catch (e) {
        (_params.error || paramsSpecifics.error || jeedom.private.default_params.error)(e);
        return;
    }
    var params = $.extend({}, jeedom.private.default_params, paramsSpecifics, _params || {});
    var paramsAJAX = jeedom.private.getParamsAJAX(params);
    paramsAJAX.url = 'plugins/themes/core/ajax/themes.ajax.php';
    paramsAJAX.data = {
        action: 'listCategory',
        category: _params.category
    };
    $.ajax(paramsAJAX);
}

function removeCategory(_params) {
    var paramsRequired = ['category'];
    var paramsSpecifics = {};
    try {
        jeedom.private.checkParamsRequired(_params || {}, paramsRequired);
    } catch (e) {
        (_params.error || paramsSpecifics.error || jeedom.private.default_params.error)(e);
        return;
    }
    var params = $.extend({}, jeedom.private.default_params, paramsSpecifics, _params || {});
    var paramsAJAX = jeedom.private.getParamsAJAX(params);
    paramsAJAX.url = 'plugins/themes/core/ajax/themes.ajax.php';
    paramsAJAX.data = {
        action: 'removeCategory',
        category: _params.category
    };
    $.ajax(paramsAJAX);
}

function updateListImages(select) {
    listImage({
        error: function (error) {
            $('#div_alert').showAlert({message: error.message, level: 'danger'});
        },
        success: function (data) {
            var images = '';
            var options = '<option value="0">Aucune</option>';
            for (var i in data) {
                images += '<div class="media-left col-sm-2" >';
                images += '<div class="well col-sm-12 noPaddingWell noPaddingLeft noPaddingRight noMarginBottom">';
                images += '<button type="button" class="pull-left btn btn-xs btn-danger  bsDelDefaultImage" data-category="" data-image="' + data[i] + '" title="Supprimer l\'image"><i class="fa fa-trash-o"></i></button>';
                images += '<button type="button" class="pull-right btn btn-xs btn-info  bsLinkDefaultImage" data-category="" data-image="' + data[i] + '" title="Lien de l\'image"><i class="fa fa-globe"></i></button>';
                images += '</div>';
                images += '<img class="img-thumbnail center-block" src="plugins/themes/core/uploads/images/' + data[i] + '" alt="' + data[i] + '">';
                images += '<div class="well col-sm-12 noPaddingWell" id="bsViewImage' + i + '"></div>';
                images += '</div>';//href="plugins/themes/core/uploads/images/' + data[i] + '"
                options += '<option value="' + data[i] + '">' + data[i] + '</option>';
            }
            $('#bsImagesView').html('<div class="media">' + images + '</div>');
            $('#bsPageImage').html(options);
            $('#bsImageMainWindow').html(options);
            for (var i in data) {
                addImage(data[i], i, "");
            }
            $('#bsImageMainWindow').val(select);
            if (isset(select) && select !== "0") {
                $("#div_frameMenu").css('background', "url('plugins/themes/core/uploads/images/" + select + "') no-repeat");
                $("#div_frameMenu").css('background-size', '100% 100%');
                bsBgColorWindow();
            }
        }
    });
}
function addImage(image, index, category) {
    var img = new Image();
    if (category === "")
        img.src = "plugins/themes/core/uploads/images/" + image + "";
    else
        img.src = "plugins/themes/core/uploads/images/" + category + '/' + image + "";
    img.onload = function () {
        var temp = '<span class="pull-left">H: ' + this.width + '</span><span class="pull-right">L:' + this.height + '</span>';
        if(category !== "")
            $('div[name="bsImagesView' + category +'"]').find('#bsViewImage' + index).append(temp);
        else
            $('#bsImagesView').find('#bsViewImage' + index).append(temp);
    };
}

function listImage(_params) {
    var paramsRequired = [];
    var paramsSpecifics = {};
    try {
        jeedom.private.checkParamsRequired(_params || {}, paramsRequired);
    } catch (e) {
        (_params.error || paramsSpecifics.error || jeedom.private.default_params.error)(e);
        return;
    }
    var params = $.extend({}, jeedom.private.default_params, paramsSpecifics, _params || {});
    var paramsAJAX = jeedom.private.getParamsAJAX(params);
    paramsAJAX.url = 'plugins/themes/core/ajax/themes.ajax.php';
    paramsAJAX.data = {
        action: 'listImage'
    };
    $.ajax(paramsAJAX);
}

function removeImage(_params) {
    var paramsRequired = ['image', 'category'];
    var paramsSpecifics = {};
    try {
        jeedom.private.checkParamsRequired(_params || {}, paramsRequired);
    } catch (e) {
        (_params.error || paramsSpecifics.error || jeedom.private.default_params.error)(e);
        return;
    }
    var params = $.extend({}, jeedom.private.default_params, paramsSpecifics, _params || {});
    var paramsAJAX = jeedom.private.getParamsAJAX(params);
    paramsAJAX.url = 'plugins/themes/core/ajax/themes.ajax.php';
    paramsAJAX.data = {
        action: 'removeImage',
        category: _params.category,
        image: _params.image
    };
    $.ajax(paramsAJAX);
}

$('#bsMyFont').fileupload({
    dataType: 'json',
    done: function (e, data) {
        if (data.result.state !== 'ok') {
            $('#div_alert').showAlert({message: data.result.result, level: 'danger'});
            return;
        }
        updateListFonts($('#bsListFonts').val());
        notify('Ajout d\'une Font', 'Font ajoutée avec succès', 'success');
    }
});

$('#bsListFonts').on('change', function () {
    if ($('#bsListFonts').val() === '0')
        $('#bsDelFont').prop('disabled', true);
    else
        $('#bsDelFont').prop('disabled', false);
    changeFontFace();
});

function changeFontFace() {
    var filename = $('#bsListFonts').val();
    $('#myBootstrapMenu > h4').css({'font-family': 'myFontTheme, Helvetica, Arial, sans-serif'});
    if (filename === null)
        return;
    $('#fontface').remove();
    filename = filename.split('.');
    if (filename.length > 1) {
        var fontface = "<style id=\"fontface\" type=\"text/css\">\n" +
                "@font-face {\n" +
                "\tfont-family: myFontTheme;\n";
        if (filename[1] === "ttf")
            fontface += "\tsrc: url('plugins/themes/core/uploads/fonts/" + filename[0] + ".ttf') format('truetype');\n";
        else if (filename[1] === "woff")
            fontface += "\tsrc: url('plugins/themes/core/uploads/fonts/" + filename[0] + ".woff') format('woff');\n";
        else {
            $('#myBootstrapMenu').css({'font-family': ''});
            $('#myBootstrapMenu > h4').css({'font-family': ''});
            return;
        }
        fontface += "}\n" +
                "</style>";
        $('#bsStyleTheme').after(fontface);
        $('#myBootstrapMenu').css({'font-family': 'myFontTheme, Helvetica, Arial, sans-serif'});
        $('#myBootstrapState').css({'font-family': 'myFontTheme, Helvetica, Arial, sans-serif'});
        $('#myBootstrapWindow').css({'font-family': 'myFontTheme, Helvetica, Arial, sans-serif'});
        $('#myBootstrapMenu > h4').css({'font-family': 'myFontTheme, Helvetica, Arial, sans-serif'});
    }
}

function addFontFace(filename,id) {
    if (filename === null || filename === undefined)
        return "";
    var fontface = "";
    filename = filename.split('.');
    if (filename.length > 1) {
        fontface = '\n<style id="styleCadre' + id + '" type="text/css">\n' +
                "@font-face {\n" +
                "\tfont-family: myFont" + id + ";\n";
        if (filename[1] === "ttf")
            fontface += "\tsrc: url('plugins/themes/core/uploads/fonts/" + filename[0] + ".ttf') format('truetype');\n";
        else if (filename[1] === "woff")
            fontface += "\tsrc: url('plugins/themes/core/uploads/fonts/" + filename[0] + ".woff') format('woff');\n";
        fontface += "}\n" +
                "\tdiv[name='myCadre" + id + "'] { font-family: myFont" + id + ", Helvetica, Arial, sans-serif; }" +
                "</style>";
    }
    return fontface;
}

function getFontFace(id) {
    if($('#styleCadre' + id).length === 0)
        return "0";
    var fontface = $('<div>').append($('#styleCadre' + id).clone()).html();
    fontface = fontface.split('\n');
    fontface = fontface[3].match(/^\tsrc: url\('plugins\/themes\/core\/uploads\/fonts\/(.*)'\) format\('.*'\)/);
    return fontface[1];
}

$('#bsDelFont').on('click', function (event) {
    var delFont = $('#bsListFonts').val();
    bootbox.confirm("Etes-vous sur de vouloir effacer cette Font", function (result) {
        if (result) {
            removeFont({
                font: delFont,
                error: function (error) {
                    $('#div_alert').showAlert({message: error.message, level: 'danger'});
                },
                success: function (data) {
                    $('#bsListFonts').val('0');
                    updateListFonts($('#bsListFonts').val());
                    notify('Suppression d\'une Font', 'font supprimée avec succès', 'success');
                }
            });
        }
    });
});

function updateListFonts(value) {
    listFont({
        error: function (error) {
            $('#div_alert').showAlert({message: error.message, level: 'danger'});
        },
        success: function (data) {
            var options = '<option value="0">Défaut</option>';
            for (var i in data) {
                options += '<option value="' + data[i] + '">' + data[i] + '</option>';
            }
            $('#bsListFonts').html(options);
            $('#bsListFonts').val(value);
            if ($('#bsListFonts').val() === '0')
                $('#bsDelFont').prop('disabled', true);
            else
                $('#bsDelFont').prop('disabled', false);
            changeFontFace();
        }
    });
}

function listFont(_params) {
    var paramsRequired = [];
    var paramsSpecifics = {};
    try {
        jeedom.private.checkParamsRequired(_params || {}, paramsRequired);
    } catch (e) {
        (_params.error || paramsSpecifics.error || jeedom.private.default_params.error)(e);
        return;
    }
    var params = $.extend({}, jeedom.private.default_params, paramsSpecifics, _params || {});
    var paramsAJAX = jeedom.private.getParamsAJAX(params);
    paramsAJAX.url = 'plugins/themes/core/ajax/themes.ajax.php';
    paramsAJAX.data = {
        action: 'listFont'
    };
    $.ajax(paramsAJAX);
}

function removeFont(_params) {
    var paramsRequired = ['font'];
    var paramsSpecifics = {};
    try {
        jeedom.private.checkParamsRequired(_params || {}, paramsRequired);
    } catch (e) {
        (_params.error || paramsSpecifics.error || jeedom.private.default_params.error)(e);
        return;
    }
    var params = $.extend({}, jeedom.private.default_params, paramsSpecifics, _params || {});
    var paramsAJAX = jeedom.private.getParamsAJAX(params);
    paramsAJAX.url = 'plugins/themes/core/ajax/themes.ajax.php';
    paramsAJAX.data = {
        action: 'removeFont',
        font: _params.font
    };
    $.ajax(paramsAJAX);
}

var step = 50;
var scrolling = false;

$('#scrollBeginButton').on("click", function(event) {
    var menu = parseInt($('#bsMainMenu').val());
    if (menu < 2) {
        $("#menuBarOverflow").animate({
            scrollLeft: "-=" + step + "px"
        });
    }
    else {
        $("#menuBarOverflow").animate({
            scrollTop: "-=" + step + "px"
        });
    }
}).on("mouseover", function(event) {
    scrolling = true;
    scrollContent("left");
}).on("mouseout", function(event) {
    scrolling = false;
});


$('#scrollEndButton').on("click", function(event) {
    var menu = parseInt($('#bsMainMenu').val());
    if (menu < 2) {
        $("#menuBarOverflow").animate({
            scrollLeft: "+=" + step + "px"
        });
    }
    else {
        $("#menuBarOverflow").animate({
            scrollTop: "+=" + step + "px"
        });
    }
}).on("mouseover", function(event) {
    scrolling = true;
    scrollContent("right");
}).on("mouseout", function(event) {
    scrolling = false;
});

function scrollContent(direction) {
    var amount = (direction === "left" ? "-=3px" : "+=3px");
    var menu = parseInt($('#bsMainMenu').val());
    if (menu < 2) {
        $("#menuBarOverflow").animate({
            scrollLeft: amount
        }, 1, function () {
            if (scrolling) {
                scrollContent(direction);
            }
        });
    }
    else {
        $("#menuBarOverflow").animate({
            scrollTop: amount
        }, 1, function () {
            if (scrolling) {
                scrollContent(direction);
            }
        });
    }
}
