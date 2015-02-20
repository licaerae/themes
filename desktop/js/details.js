/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$('#bsImageMainWindow').on('change', function () {
    bsImageMainWindow();
});

$('#bsWidthMainWindow').on('change', function () {
    $('#div_frameMenu').css('width', $('#bsWidthMainWindow').val());
    createMenuBar();
    $('#bsDesignButton').prop('disabled', false);
});

$('#bsHeightMainWindow').on('change', function () {
    $('#div_frameMenu').css('height', $('#bsHeightMainWindow').val());
    createMenuBar();
    $('#bsDesignButton').prop('disabled', false);
});

$('#bsMainMenu').on('change', function () {
    createMenuBar();
});

$('#bsHeightMainMenu').change(function () {
    createMenuBar();
});

$('#bsStyleButton').on('change', function () {
    createMenuBar();
});
$('#bsMainMenuText').on('change', function () {
    $('#myBootstrapMenu > h4').text($('#bsMainMenuText').val());
});

$('#bsIsStyle').on('change', function () {
    bsIsStyle();
    bsColorWindow();
    bsBgColorWindow();
    createMenuBar();
});

$('#bsOffsetButton').bootstrapSlider({
    formatter: function (value) {
        return 'Décalage: ' + value;
    }
});

$('#bsOffsetButton').on('slideStop', function () {
    var offset = parseInt($('#bsOffsetButton').bootstrapSlider('getValue'));
    $('#bsOffset').val(offset);
    createMenuBar();
});

$("#bsStateYes").click(function () {
    if ($('#bsStateYes').hasClass('btn-success'))
        return;
    bsStateYes();
});

$("#bsStateNo").click(function () {
    if ($('#bsStateNo').hasClass('btn-success'))
        return;
    bsStateNo();
});

$("#bsJustifiedYes").click(function () {
    if ($('#bsJustifiedYes').hasClass('btn-success'))
        return;
    bsJustifiedYes();
    createMenuBar();
});

$("#bsJustifiedNo").click(function () {
    if ($('#bsJustifiedNo').hasClass('btn-success'))
        return;
    bsJustifiedNo();
    createMenuBar();
});

$("#bsViewMenuYes").click(function () {
    if ($('#bsViewMenuYes').hasClass('btn-success'))
        return;
    bsViewMenuYes();
});

$("#bsViewMenuNo").click(function () {
    if ($('#bsViewMenuNo').hasClass('btn-success'))
        return;
    bsViewMenuNo();
});

$('#bsStyleView').on('change', '#bsBgColorWindow', function () {
    bsBgColorWindow();
    createMenuBar();
});

$('#bsStyleView').on('change', '#bsColorWindow', function () {
    bsColorWindow();
    createMenuBar();
});

$('#bsWidthButton').on('change', function () {
    createMenuBar();
});

$('#bsColorHome').on('change', function () {
    var bgColor = $('#bsColorHome').val();
    //bgColor = "bg-" + bgColor.replace('btn-', '');
    $('#bsColorHome').removeClass();
    $('#bsColorHome').addClass('form-control eqLogicAttr ' + bgColor);
    $('#bsHomeButton').removeClass('btn-default btn-primary btn-info btn-success btn-warning btn-danger');
    $('#bsHomeButton').addClass($('#bsColorHome').val());
});

$("#bsGroupYes").click(function () {
    if ($('#bsGroupYes').hasClass('btn-success'))
        return;
    bsGroupYes();
    createMenuBar();
});

$("#bsGroupNo").click(function () {
    if ($('#bsGroupNo').hasClass('btn-success'))
        return;
    bsGroupNo();
    createMenuBar();
});

$("#bsStyleCadreYes").click(function () {
    if ($('#bsStyleCadreYes').hasClass('btn-success'))
        return;
    bsStyleCadreYes();
});

$("#bsStyleCadreNo").click(function () {
    if ($('#bsStyleCadreNo').hasClass('btn-success'))
        return;
    bsStyleCadreNo();
});

$('#bsBorderWindow').change(function () {
    bsBorderWindow();
});

$('#bsBorderBold').change(function () {
    bsBorderWindow();
});

$('#bsBorderColor').change(function () {
    bsBorderWindow();
});

$('#bsBorderRadius').change(function () {
    bsBorderRadius();
});

$("input[name*='bsBorderShadow']").change(function () {
    bsBorderShadow();
});

$('#bsMyCadre').on('change', function () {
    myTheme.myCadre = $('#bsMyCadre').val();
});

$('#bsMyGeneral').on('change', function () {
    myTheme.globalPlanId[0] = $('#bsMyGeneral').val();
    myTheme.myButtons[0] = 'Général';
    myTheme.myDropdowns[0] = '';
    myTheme.myColors[0] = $('#bsColorHome').val();
});

$('#bsExpert').on('click', function () {
    bsExpert();
});

function bsImageMainWindow() {
    var image = $('#bsImageMainWindow').val();
    $("#div_frameMenu").css('background', '');
    $("#div_frameMenu").css('background-size', '');
    if (isset(image) && image !== "0") {
        $("#div_frameMenu").css('background', "url('plugins/themes/core/uploads/images/" + image + "') no-repeat");
        $("#div_frameMenu").css('background-size', '100% 100%');
    }
    bsBgColorWindow();
}

function bsStateYes() {
    var calHeightWindow = parseInt($('#bsHeightWindow').val()) - 65;
    var posMenu = parseInt($('#bsMainMenu').val());
    $('#bsHeightWindow').val(calHeightWindow);
    if (posMenu > 1) {
        $('#myBootstrapMenu').outerHeight(calHeightWindow + 'px');
    }
    $('#myBootstrapWindow').outerHeight(calHeightWindow + 'px');
    $('#myBootstrapState').show();
    $('#bsStateNo').removeClass('btn-success');
    $('#bsStateYes').addClass('btn-success');
    $("input[name='bsStateYes']").val('1');
}

function bsStateNo() {
    var calHeightWindow = parseInt($('#bsHeightWindow').val()) + 65;
    var posMenu = parseInt($('#bsMainMenu').val());
    $('#bsHeightWindow').val(calHeightWindow);
    if (posMenu > 1) {
        $('#myBootstrapMenu').outerHeight(calHeightWindow + 'px');
    }
    $('#myBootstrapWindow').outerHeight(calHeightWindow + 'px');
    $('#myBootstrapState').hide();
    $('#bsStateYes').removeClass('btn-success');
    $('#bsStateNo').addClass('btn-success');
    $("input[name='bsStateYes']").val('0');
}

function bsGroupYes() {
    $('#bsGroupNo').removeClass('btn-success');
    $('#bsGroupYes').addClass('btn-success');
    $("input[name='bsGroupYes']").val('1');
}

function bsGroupNo() {
    $('#bsGroupYes').removeClass('btn-success');
    $('#bsGroupNo').addClass('btn-success');
    $("input[name='bsGroupYes']").val('0');
}

function bsJustifiedYes() {
    $('#bsJustifiedNo').removeClass('btn-success');
    $('#bsJustifiedYes').addClass('btn-success');
    $("input[name='bsJustifiedYes']").val('1');
}

function bsJustifiedNo() {
    $('#bsJustifiedYes').removeClass('btn-success');
    $('#bsJustifiedNo').addClass('btn-success');
    $("input[name='bsJustifiedYes']").val('0');
}

function bsViewMenuYes() {
    $('#bsViewMenuNo').removeClass('btn-success');
    $('#bsViewMenuYes').addClass('btn-success');
    $('#myBootstrapMenu > h4').show();
    $("input[name='bsViewMenuYes']").val('1');
}

function bsViewMenuNo() {
    $('#bsViewMenuYes').removeClass('btn-success');
    $('#bsViewMenuNo').addClass('btn-success');
    $('#myBootstrapMenu > h4').hide();
    $("input[name='bsViewMenuYes']").val('0');
}

function bsStyleCadreYes() {
    $('#bsStyleCadreNo').removeClass('btn-success');
    $('#bsStyleCadreYes').addClass('btn-success');
    bsBorderWindow();
    bsBorderRadius();
    bsBorderShadow();
    bsBgColorWindow();
    $("input[name='bsStyleCadreYes']").val('1');
}

function bsStyleCadreNo() {
    $('#bsStyleCadreYes').removeClass('btn-success');
    $('#bsStyleCadreNo').addClass('btn-success');
    $('#myBootstrapWindow').css({'color': '', 'background-color': '', 'border': '', 'border-radius': '0px', 'box-shadow': ''});
    bsBgColorWindow();
    $("input[name='bsStyleCadreYes']").val('0');
}

function bsBorderWindow() {
    var str = "";
    str = (($('#bsBorderWindow').val() !== "") ? $('#bsBorderWindow').val() + 'px ' : "0px ") + $('#bsBorderBold').val() + ' ' + $('#bsBorderColor').val();
    $('#myBootstrapMenu').css('border', str);
    if ($("#bsStyleCadreYes").hasClass('btn-success'))
        $('#myBootstrapWindow').css('border', str);
    $('#myBootstrapState').css('border', str);
}

function bsBorderRadius() {
    var str = ($('#bsBorderRadius').val() !== "") ? $('#bsBorderRadius').val() + 'px' : "0px";
    $('#myBootstrapMenu').css('border-radius', str);
    if ($("#bsStyleCadreYes").hasClass('btn-success'))
        $('#myBootstrapWindow').css('border-radius', str);
    $('#myBootstrapState').css('border-radius', str);
}

function bsBgColorWindow() {
    if (!initThemes)
        return;
    var image = $('#bsImageMainWindow').val();
    if (image !== "0") {
        $('#myBootstrapMenu').css('background-color', 'transparent');
        $('#myBootstrapWindow').css('background-color', 'transparent');
        $('#myBootstrapState').css('background-color', 'transparent');
    }
    else if ($('#bsIsStyle').prop("checked")) {
        $('#myBootstrapMenu').css('background-color', $('#bsBgColorWindow').val());
        $('#myBootstrapWindow').css('background-color', $('#bsBgColorWindow').val());
        $('#myBootstrapState').css('background-color', $('#bsBgColorWindow').val());
    }
    else {
        $('#myBootstrapMenu').css('background-color', '');
        $('#myBootstrapWindow').css('background-color', '');
        $('#myBootstrapState').css('background-color', '');
    }
}

function bsColorWindow() {
    if ($('#bsIsStyle').prop("checked")) {
        $('#myBootstrapMenu').css('color', $('#bsColorWindow').val());
        $('#myBootstrapWindow').css('color', $('#bsColorWindow').val());
        $('#myBootstrapState').css('color', $('#bsColorWindow').val());
    }
    else {
        $('#myBootstrapMenu').css('color', '');
        $('#myBootstrapWindow').css('color', '');
        $('#myBootstrapState').css('color', '');
    }
}

function bsBorderShadow() {
    var str = "";
    str = $("input[name='bsBorderShadow1']").val() + 'px ' + $("input[name='bsBorderShadow2']").val() + 'px ' + $("input[name='bsBorderShadow3']").val() + 'px ' + $("input[name='bsBorderShadowColor']").val();
    str = ($("input[name='bsBorderShadow1']").val() !== "" && $("input[name='bsBorderShadow2']").val() !== "" && $("input[name='bsBorderShadow3']").val() !== "") ? str : "";
    $('#myBootstrapMenu').css('box-shadow', str);
    if ($("#bsStyleCadreYes").hasClass('btn-success'))
        $('#myBootstrapWindow').css('box-shadow', str);
    $('#myBootstrapState').css('box-shadow', str);
}

function bsIsStyle() {
    var kids = $('#bsStyleView').find('.form-group').clone();
    if ($('#bsIsStyle').prop("checked")) {
        $('#bsStyleView').empty();
        $('#bsStyleView').append(kids);
        $("#bsIsStyle").val('1');
    }
    else {
        $('#bsStyleView').empty();
        $('#bsStyleView').append('<fieldset disabled></fieldset>');
        $('#bsStyleView').children('fieldset').append(kids);
        $("#bsIsStyle").val('0');
    }
}

function bsExpert() {
    if ($('#bsExpert').hasClass('btn-success')) {
        if(whichView !== 'menuPopover')
            $('*').popover('destroy');        
        $('#bsExpert').removeClass('btn-success');
        $('#bsMyCadre').prop('readonly', true);
        $('#bsMyGeneral').prop('readonly', true);
        $('#bsMenuThemesDetails').hide();
        bsMenuThemesApercu();
    }
    else {
        $('#bsMenuThemesDetails').show();
        $('#bsExpert').addClass('btn-success');
        $('#bsMyCadre').prop('readonly', false);
        $('#bsMyGeneral').prop('readonly', false);
    }
}

