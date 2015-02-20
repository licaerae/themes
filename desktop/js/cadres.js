/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$('#bsDuplicatePage').on('click', function () {
    var source = $('#bsPageSelect').val();
    var destination = $('#bsOtherPages').val();
    var pageSelect = secondaryPages.search(source);
    var tempCadre = [];
    if (pageSelect) {
        for (var index in pageSelect.cadres) {
            var newCadre = secondaryPages.cadre(destination, pageSelect.cadres[index].cadre);
            var cadre = pageSelect.cadres[index].cadre.replace('myCadre' + pageSelect.cadres[index].id, 'myCadre' + newCadre).replace('data-cadre="' + pageSelect.cadres[index].id + '"', 'data-cadre="' + newCadre + '"');
            secondaryPages.updateCadre(destination, newCadre, cadre);
            tempCadre.push({'old': pageSelect.cadres[index].id, 'new': newCadre});
        }
        for (var index in pageSelect.svg) {
            var newCadre;
            for (var nbCadre = 0; nbCadre < tempCadre.length; nbCadre++) {
                if (tempCadre[index].old === pageSelect.svg[index].cadre)
                    newCadre = tempCadre[index].new;
            }
            secondaryPages.svg(destination, newCadre, pageSelect.svg[index].svg);
        }
        notify('Pages Secondaires', 'Plan ' + source + ' coorectement dupliqué vers ' + destination + '', 'success');
    }
});

$('#bsCadreImage').on('click', function () {
    bsCadreImage();
});
function bsCadreImage() {
    $('#myCadreWindow').empty();
    var page = $('#bsPageSelect').val();
    var cadre = '0';
    if ($('#bsIsStyle').prop("checked"))
        cadre = '<div name="myCadreIDCADRE" data-cadre="IDCADRE" data-locked="0" class="" style="z-index: 89; position: absolute; width: ' + $('#myCadreWindow').innerWidth() + 'px; height: ' + $('#myCadreWindow').innerHeight() + 'px; padding: 0.5em;">' +
                '<h4 class="text-center" style="color:' + $('#bsColorWindow').val() + '; border-bottom: 1px solid ' + $('#bsColorWindow').val() + ';">' +
                'Titre</h4>' +
                '</div>';
    else
        cadre = '<div name="myCadreIDCADRE" data-cadre="IDCADRE" data-locked="0" class="" style="z-index: 89; position: absolute;  width: ' + $('#myCadreWindow').innerWidth() + 'px; height: ' + $('#myCadreWindow').innerHeight() + 'px; padding: 0.5em;">' +
                '<h4 class="text-center" style="border-bottom: 1px solid;">' +
                'Titre</h4>' +
                '</div>';
    var id = secondaryPages.cadre(page, cadre);
    cadre = cadre.replace(/IDCADRE/g, '' + id);
    var cadreSelect = secondaryPages.updateCadre(page, id, cadre);
    $('#myCadreWindow').prepend(cadre);
    $("div[name='myCadre" + id + "']").css('background-size', '100% 100%');
    cadrePopover(id);
}

$('#bsSecondaireView').on('change', '.bsSvgColor', function () {
    var page = $('#bsPageSelect').val();
    var svg = $(this).data('svg');
    var svgSelect = secondaryPages.searchSvg(page, svg);
    $(this).css('background-color', $(this).val());
    svgSelect.svg[0].attr('fill', $(this).val());
    svgSelect.svg[1].attr('stroke', $(this).val());
    svgSelect.svg[2].attr('stroke', $(this).val());
    svgSelect.svg[3].attr('stroke', $(this).val());
    svgSelect.svg[4].attr('fill', $(this).val());
});

$('#bsSecondaireView').on('shown.bs.popover', "svg[name*='mySvgWindow']", function () {
    var svg = $(this).data('svg');
    var page = $('#bsPageSelect').val();
    //var cadre = $(this).data('cadre');
    $("strong[name='bsSvgDetails" + svg + "'").text('Ligne SVG N°' + svg);
    var svgSelect = secondaryPages.searchSvg(page, svg);
    var color = Snap.color(svgSelect.svg[0].attr('fill'));
    var options = '';
    for (var index in jeedomCategories) {
        options += '<option style="background-color: ' + jeedomCategories[index].color + '" value="' + jeedomCategories[index].color + '">' + jeedomCategories[index].name + '</option>';
    }
    $('select[name="bsSvgColor' + svg + '"]').html(options);
    $('select[name="bsSvgColor' + svg + '"]').css("color", '#fff');
    $('select[name="bsSvgColor' + svg + '"]').css('background-color', color.hex);
    if ($('select[name="bsSvgColor' + svg + '"]').css('background-color') === $('select[name="bsSvgColor' + svg + '"]').css('color'))
        $('select[name="bsSvgColor' + svg + '"]').css("color", '#000');
    $('select[name="bsSvgColor' + svg + '"]').val('' + color.hex);
    animSvg(svgSelect.svg);
});

function svgPopover(id, cadre) {
    $('#mySvgWindow' + id).popover({
        html: true,
        title: '<strong class="control-label" name="bsSvgDetails' + id + '">Ligne SVG</strong>' +
                '<button type="button" class="pull-right btn btn-xs btn-danger  mySvgDel" data-svg="' + id + '" title="Supprimer la ligne SVG">' +
                '<i class="fa fa-trash-o"></i></button>',
        content:
                '<div class="container-fluid well noPaddingRight noPaddingLeft" style="width:200px;">' +
                '<div style="position:relative;left:78px">' +
                '<button type="button" class="btn btn-primary  mySvgUp" style="width: 38px;height: 38px;padding: 0;font-size: 1.3em;" data-svg="' + id + '" title="Haut">' +
                '<i class="fa fa-arrow-up"></i></button>' +
                '</div>' +
                '<div style="position:relative;left:40px">' +
                '<button type="button" class="btn btn-primary  mySvgLeft" style="width: 38px;height: 38px;padding: 0;font-size: 1.3em;" data-svg="' + id + '" title="Gauche">' +
                '<i class="fa fa-arrow-left"></i></button>' +
                '<button type="button" class="btn btn-success  mySvgOk" style="width: 38px;height: 38px;padding: 0;font-size: 1.3em;" data-cadre="' + cadre + '" data-svg="' + id + '" title="Valider">' +
                '<i class="fa fa-check-circle"></i></button>' +
                '<button type="button" class="btn btn-primary  mySvgRight" style="width: 38px;height: 38px;padding: 0;font-size: 1.3em;" data-svg="' + id + '" title="Droite">' +
                '<i class="fa fa-arrow-right"></i></button>' +
                '</div>' +
                '<div style="position:relative;left:78px">' +
                '<button type="button" class="btn btn-primary  mySvgDown" style="width: 38px;height: 38px;padding: 0;font-size: 1.3em;" data-svg="' + id + '" title="Bas">' +
                '<i class="fa fa-arrow-down"></i></button>' +
                '</div></div>' +
                '<div class="form-group form-group-sm"><div class="col-sm-12">' +
                '<div class="btn-group" data-toggle="buttons">' +
                '<label class="btn btn-sm btn-block btn-primary">' +
                '<input type="checkbox" id="bsSvgBegin' + id + '" autocomplete="off"/>Début' +
                '</label>' +
                '<label class="btn btn-sm btn-block btn-primary">' +
                '<input type="checkbox" id="bsSvgFirst' + id + '" autocomplete="off"/>1er Point' +
                '</label>' +
                '<label class="btn btn-sm btn-block btn-primary">' +
                '<input type="checkbox" id="bsSvgSecond' + id + '" autocomplete="off"/>2eme Point' +
                '</label>' +
                '<label class="btn btn-sm btn-block btn-primary">' +
                '<input type="checkbox" id="bsSvgEnd' + id + '" autocomplete="off"/>Fin' +
                '</label>' +
                '</div></div></div>' +
                '<div class="form-group form-group-sm"><div class="col-sm-12">' +
                '<select class="form-control bsSvgColor" name="bsSvgColor' + id + '" style="background-color: #2a9fd6" data-svg="' + id + '" class="form-control">' +
                '</select>' +
                '</div></div>',
        placement: 'right',
        viewport: "#myCadreWindow"
    });
    //$('#mySvgWindow' + id).draggable({
    //    snap: "#myCadreWindow"
    //});
    $('#mySvgWindow' + id).popover('show');
    if (cadre !== -1) {
        showAnimSvg = false;
        $("div[name='myCadre" + cadre + "']").popover('destroy');
    }
}

$('#bsSecondaireView').on('click', '.mySvgDel', function () {
    var page = $('#bsPageSelect').val();
    var svg = $(this).data('svg');
    bootbox.confirm('<span>Voulez vous Supprimez cette ligne SVG</span>' +
            '<input name="bsDelSvg" type="text" data-page="' + page + '" data-svg="' + svg + '" style="display:none"/>', function (result) {
                if (result) {
                    var page = $('input[name="bsDelSvg"]').data('page');
                    var svg = $('input[name="bsDelSvg"]').data('svg');
                    $('#mySvgWindow' + svg).popover('destroy');
                    $('#mySvgWindow' + svg).remove();
                    var svgSelect = secondaryPages.searchSvg(page, svg);
                    if (svgSelect.cadre !== -1) {
                        cadrePopover(svgSelect.cadre);
                        $("div[name='myCadre" + svgSelect.cadre + "']").popover('show');
                    }
                    secondaryPages.removeSvg(page, svg);
                }
            });
});

$('#bsSecondaireView').on('click', '.mySvgOk', function () {
    var svg = parseInt($(this).data('svg'));
    var cadre = parseInt($(this).data('cadre'));
    $('#mySvgWindow' + svg).popover('destroy');
    if (cadre !== -1) {
        cadrePopover(cadre);
        //$("div[name='myCadre" + cadre + "']").popover('enable');
        showAnimSvg = true;
        $("div[name='myCadre" + cadre + "']").popover('show');
    }
});

$('#bsSecondaireView').on('change', '.bsSvgLevel', function () {
    var svg = parseInt($(this).data('svg'));
    $('#mySvgWindow' + svg).css('z-index', $(this).val());
});

$('#bsSecondaireView').on('click', '.mySvgRight', function (event) {
    var offset = 10;
    var page = $('#bsPageSelect').val();
    var svg = parseInt($(this).data('svg'));
    var svgSelect = secondaryPages.searchSvg(page, svg);
    var group = svgSelect.svg;
    if (event.shiftKey)
        offset = 100;
    if ($('#bsSvgBegin' + svg).prop('checked')) {
        mySvgRight(offset, 0, svg, group);
    }
    if ($('#bsSvgFirst' + svg).prop('checked')) {
        mySvgRight(offset, 1, svg, group);
    }
    if ($('#bsSvgSecond' + svg).prop('checked')) {
        mySvgRight(offset, 2, svg, group);
    }
    if ($('#bsSvgEnd' + svg).prop('checked')) {
        mySvgRight(offset, 3, svg, group);
    }
});
function mySvgRight(offset, point, svg, group) {
    var x = parseInt(group[point].attr(positions[point].x[0]));
    var x1 = parseInt(group[point + 1].attr(positions[point].x[1]));
    if (x + offset < parseInt($('#mySvgWindow' + svg).width())) {
        x = x + offset;
        x1 = x1 + offset;
        group[point].attr(positions[point].x[0], x);
        group[point + 1].attr(positions[point].x[1], x1);
    }
}

$('#bsSecondaireView').on('click', '.mySvgLeft', function (event) {
    var offset = 10;
    if (event.shiftKey)
        offset = 100;
    var page = $('#bsPageSelect').val();
    var svg = parseInt($(this).data('svg'));
    var svgSelect = secondaryPages.searchSvg(page, svg);
    var group = svgSelect.svg;
    if ($('#bsSvgBegin' + svg).prop('checked')) {
        mySvgLeft(offset, 0, group);
    }
    if ($('#bsSvgFirst' + svg).prop('checked')) {
        mySvgLeft(offset, 1, group);
    }
    if ($('#bsSvgSecond' + svg).prop('checked')) {
        mySvgLeft(offset, 2, group);
    }
    if ($('#bsSvgEnd' + svg).prop('checked')) {
        mySvgLeft(offset, 3, group);
    }
});
function mySvgLeft(offset, point, group) {
    var x = parseInt(group[point].attr(positions[point].x[0]));
    var x1 = parseInt(group[point + 1].attr(positions[point].x[1]));
    if (x - offset > 0) {
        x = x - offset;
        x1 = x1 - offset;
        group[point].attr(positions[point].x[0], x);
        group[point + 1].attr(positions[point].x[1], x1);
    }
}

$('#bsSecondaireView').on('click', '.mySvgUp', function (event) {
    var offset = 10;
    if (event.shiftKey)
        offset = 100;
    var page = $('#bsPageSelect').val();
    var svg = parseInt($(this).data('svg'));
    var svgSelect = secondaryPages.searchSvg(page, svg);
    var group = svgSelect.svg;
    if ($('#bsSvgBegin' + svg).prop('checked')) {
        mySvgUp(offset, 0, group);
    }
    if ($('#bsSvgFirst' + svg).prop('checked')) {
        mySvgUp(offset, 1, group);
    }
    if ($('#bsSvgSecond' + svg).prop('checked')) {
        mySvgUp(offset, 2, group);
    }
    if ($('#bsSvgEnd' + svg).prop('checked')) {
        mySvgUp(offset, 3, group);
    }
});
function mySvgUp(offset, point, group) {
    var y = parseInt(group[point].attr(positions[point].y[0]));
    var y1 = parseInt(group[point + 1].attr(positions[point].y[1]));
    if (y - offset > 0) {
        y = y - offset;
        y1 = y1 - offset;
        group[point].attr(positions[point].y[0], y);
        group[point + 1].attr(positions[point].y[1], y1);
    }
}

$('#bsSecondaireView').on('click', '.mySvgDown', function (event) {
    var offset = 10;
    if (event.shiftKey)
        offset = 100;
    var page = $('#bsPageSelect').val();
    var svg = parseInt($(this).data('svg'));
    var svgSelect = secondaryPages.searchSvg(page, svg);
    var group = svgSelect.svg;
    if ($('#bsSvgBegin' + svg).prop('checked')) {
        mySvgDown(offset, 0, svg, group);
    }
    if ($('#bsSvgFirst' + svg).prop('checked')) {
        mySvgDown(offset, 1, svg, group);
    }
    if ($('#bsSvgSecond' + svg).prop('checked')) {
        mySvgDown(offset, 2, svg, group);
    }
    if ($('#bsSvgEnd' + svg).prop('checked')) {
        mySvgDown(offset, 3, svg, group);
    }
});
function mySvgDown(offset, point, svg, group) {
    var y = parseInt(group[point].attr(positions[point].y[0]));
    var y1 = parseInt(group[point + 1].attr(positions[point].y[1]));
    if (y + offset < parseInt($('#mySvgWindow' + svg).height())) {
        y = y + offset;
        y1 = y1 + offset;
        group[point].attr(positions[point].y[0], y);
        group[point + 1].attr(positions[point].y[1], y1);
    }
}

$('#bsCadreBootstrap').on('click', function () {
    var page = $('#bsPageSelect').val();
    var cadre = '';
    if ($('#bsIsStyle').prop("checked"))
        cadre = '<div name="myCadreIDCADRE" data-cadre="IDCADRE" data-locked="0" class="default" style="z-index: 99; position: absolute; width: 150px; height: 150px; padding: 0.5em;">' +
                '<h4 class="text-center" style="color:' + $('#bsColorWindow').val() + '; border-bottom: 1px solid ' + $('#bsColorWindow').val() + ';">' +
                'Titre</h4>' +
                '</div>';
    else
        cadre = '<div name="myCadreIDCADRE" data-cadre="IDCADRE" data-locked="0" class="default" style="z-index: 99; position: absolute;  width: 150px; height: 150px; padding: 0.5em;">' +
                '<h4 class="text-center" style="border-bottom: 1px solid;">' +
                'Titre</h4>' +
                '</div>';
    var id = secondaryPages.cadre(page, cadre);
    cadre = cadre.replace(/IDCADRE/g, '' + id);
    var cadreSelect = secondaryPages.updateCadre(page, id, cadre);
    createCadre(cadreSelect.id, cadreSelect.cadre);
});

$('#bsSecondaireView').on('click', '.myCadreDel', function () {
    var page = $('#bsPageSelect').val();
    var cadre = $(this).data('cadre');
    bootbox.confirm('<span>Voulez vous Supprimez ce cadre</span>' +
            '<input name="bsDelCadre" type="text" data-page="' + page + '" data-cadre="' + cadre + '" style="display:none"/>', function (result) {
                if (result) {
                    var page = $('input[name="bsDelCadre"]').data('page');
                    var cadre = $('input[name="bsDelCadre"]').data('cadre');
                    $("div[name='myCadre" + cadre + "']").popover('destroy');
                    $("div[name='myCadre" + cadre + "']").remove();
                    secondaryPages.removeCadre(page, cadre);
                }
            });
});

$('#bsSecondaireView').on('change', '.myCadreTitleColor', function () {
    var cadre = $(this).data('cadre');
    $("div[name='myCadre" + cadre + "']").children('h4').css('color', $(this).val());
    var page = $('#bsPageSelect').val();
    var h4 = $("div[name='myCadre" + cadre + "']").children('h4').clone();
    var style = $('#styleCadre' + cadre).clone();
    var newCadre = $("div[name='myCadre" + cadre + "']").clone().removeClass('ui-resizable ui-resizable-resizing ui-draggable ui-draggable-dragging ui-draggable-handle').empty();
    newCadre.popover('destroy');
    newCadre.append(style);
    newCadre.append(h4);
    secondaryPages.updateCadre(page, cadre, $('<div>').append(newCadre).html());
});

$('#bsSecondaireView').on('change', '.bsCadreFont', function () {
    var cadre = $(this).data('cadre');
    $('#styleCadre' + cadre).remove();
    if ($(this).val() !== "0") {
        var fontface = addFontFace($(this).val(), cadre);
        $("div[name='myCadre" + cadre + "']").prepend(fontface);
        $("div[name='myCadre" + cadre + "']").find('h4').css({'font-family': 'myFont' + cadre + ', Helvetica, Arial, sans-serif'});
    }
    else {
        if ($('#bsListFonts').val() === '0')
            $("div[name='myCadre" + cadre + "']").find('h4').css({'font-family': ''});
        else
            $("div[name='myCadre" + cadre + "']").find('h4').css({'font-family': 'myFontTheme, Helvetica, Arial, sans-serif'});
    }
    var page = $('#bsPageSelect').val();
    var h4 = $("div[name='myCadre" + cadre + "']").children('h4').clone();
    var style = $('#styleCadre' + cadre).clone();
    var newCadre = $("div[name='myCadre" + cadre + "']").clone().removeClass('ui-resizable ui-resizable-resizing ui-draggable ui-draggable-dragging ui-draggable-handle').empty();
    newCadre.popover('destroy');
    newCadre.append(style);
    newCadre.append(h4);
    secondaryPages.updateCadre(page, cadre, $('<div>').append(newCadre).html());
});

$('#bsSecondaireView').on('click', '.bsButtonTitleColor', function () {
    var cadre = $(this).data('cadre');
    var colorMenuH4 = rgb2hex($("#myBootstrapMenu").children('h4').css('color'));
    if($("input[name='myCadreTitleColor" + cadre + "']").prop('disabled')) {
        $("input[name='myCadreTitleColor" + cadre + "']").prop('disabled',false);
        $("div[name='myCadre" + cadre + "']").children('h4').css('color', $("input[name='myCadreTitleColor" + cadre + "']").val());
    }
    else {
        $("input[name='myCadreTitleColor" + cadre + "']").prop('disabled',true);
        $("div[name='myCadre" + cadre + "']").children('h4').css('color', colorMenuH4);
    }
    var page = $('#bsPageSelect').val();
    var h4 = $("div[name='myCadre" + cadre + "']").children('h4').clone();
    var style = $('#styleCadre' + cadre).clone();
    var newCadre = $("div[name='myCadre" + cadre + "']").clone().removeClass('ui-resizable ui-resizable-resizing ui-draggable ui-draggable-dragging ui-draggable-handle').empty();
    newCadre.popover('destroy');
    newCadre.append(style);
    newCadre.append(h4);
    secondaryPages.updateCadre(page, cadre, $('<div>').append(newCadre).html());
});

$('#bsSecondaireView').on('change', '.myCadreTitle', function () {
    var cadre = $(this).data('cadre');
    var page = $('#bsPageSelect').val();
    $("div[name='myCadre" + cadre + "']").children('h4').text($(this).val());
    var h4 = $("div[name='myCadre" + cadre + "']").children('h4').clone();
    var style = $('#styleCadre' + cadre).clone();
    var newCadre = $("div[name='myCadre" + cadre + "']").clone().removeClass('ui-resizable ui-resizable-resizing ui-draggable ui-draggable-dragging ui-draggable-handle').empty();
    newCadre.popover('destroy');
    newCadre.append(style);
    newCadre.append(h4);
    secondaryPages.updateCadre(page, cadre, $('<div>').append(newCadre).html());
});

$('#bsSecondaireView').on('click', '.myCadreViewTitle', function () {
    var cadre = $(this).data('cadre');
    var page = $('#bsPageSelect').val();
    $("div[name='myCadre" + cadre + "']").children('h4').toggle();
    var h4 = $("div[name='myCadre" + cadre + "']").children('h4').clone();
    var style = $('#styleCadre' + cadre).clone();
    if ($("div[name='myCadre" + cadre + "']").children('h4').is(":visible"))
        $("input[name='myCadreTitle" + cadre + "']").prop('disabled', false);
    else
        $("input[name='myCadreTitle" + cadre + "']").prop('disabled', true);
    var newCadre = $("div[name='myCadre" + cadre + "']").clone().removeClass('ui-resizable ui-resizable-resizing ui-draggable ui-draggable-dragging ui-draggable-handle').empty();
    newCadre.popover('destroy');
    newCadre.append(style);
    newCadre.append(h4);
    secondaryPages.updateCadre(page, cadre, $('<div>').append(newCadre).html());
});

$('#bsSecondaireView').on('change', '.bsCadrePicture', function () {
    var cadre = $(this).data('cadre');
    var image = $('#bsCadrePicture' + cadre).val();
    if (isset(image) && image === "0") {
        $("div[name='myCadre" + cadre + "']").css('background', '');
        $("div[name='myCadre" + cadre + "']").css('background-size', '');
    }
    else {
        $("div[name='myCadre" + cadre + "']").css('background', "url('plugins/themes/core/uploads/images/" + image + "') no-repeat");
        $("div[name='myCadre" + cadre + "']").css('background-size', '100% 100%');
    }
    var page = $('#bsPageSelect').val();
    var h4 = $("div[name='myCadre" + cadre + "']").children('h4').clone();
    var style = $('#styleCadre' + cadre).clone();
    var newCadre = $("div[name='myCadre" + cadre + "']").clone().removeClass('ui-resizable ui-resizable-resizing ui-draggable ui-draggable-dragging ui-draggable-handle').empty();
    newCadre.popover('destroy');
    newCadre.append(style);
    newCadre.append(h4);
    secondaryPages.updateCadre(page, cadre, $('<div>').append(newCadre).html());
});

$('#bsSecondaireView').on('change', '.bsCadreLevel', function () {
    var cadre = $(this).data('cadre');
    $("div[name='myCadre" + cadre + "']").css('z-index', $(this).val());
});

function nextFrame(el, frameArray, whichFrame) {
    if (whichFrame >= frameArray.length) {
        return;
    }
    el.animate(frameArray[ whichFrame ].animation, frameArray[ whichFrame ].dur, nextFrame.bind(null, el, frameArray, whichFrame + 1));
}
function animSvg(svg) {
    var svgAnim = [
        {animation: {opacity: '0'}, dur: 100},
        {animation: {opacity: '1'}, dur: 100},
        {animation: {opacity: '0'}, dur: 100},
        {animation: {opacity: '1'}, dur: 100},
        {animation: {opacity: '0'}, dur: 100},
        {animation: {opacity: '1'}, dur: 100},
        {animation: {opacity: '0'}, dur: 100},
        {animation: {opacity: '1'}, dur: 100}
    ];
    nextFrame(svg, svgAnim, 0);
}

$('#bsSecondaireView').on('change', 'select[name*="bsSvgIdSelect"]', function () {
    var cadre = $(this).data('cadre');
    var svg = $("select[name='bsSvgIdSelect" + cadre + "']").val();
    var page = $('#bsPageSelect').val();
    var svgSelect = secondaryPages.searchSvg(page, svg);
    animSvg(svgSelect.svg);
});

$('#bsSecondaireView').on('click', '.bsSvgId', function () {
    var cadre = $(this).data('cadre');
    var svg = $("select[name='bsSvgIdSelect" + cadre + "']").val();
    svgPopover(svg, cadre);
});

$('#bsSecondaireView').on('click', '.bsCadreSvg', function () {
    var cadre = $(this).data('cadre');
    var page = $('#bsPageSelect').val();
    var svg =
            '<svg id="mySvgWindowIDSVG" name="mySvgWindowIDSVG" data-svg="IDSVG" data-cadre="' + cadre + '" height="100%" width="100%" style="z-index: 89; position: absolute; top: 0;left: 0;">' +
            '</svg>';
    var id = secondaryPages.svg(page, cadre, svg);
    svg = svg.replace(/IDSVG/g, '' + id);
    $("div[name='myCadre" + cadre + "']").append(svg);
    svgPopover(id, cadre);
    var options = '<option value="' + id + '">Ligne N°' + id + '</option>';
    $("select[name='bsSvgIdSelect" + cadre + "']").append(options);
    $("select[name='bsSvgIdSelect" + cadre + "']").val('' + id);
    $("select[name='bsSvgIdSelect" + cadre + "']").prop('disabled', false);
    $("button[name='bsSvgId" + cadre + "']").prop('disabled', false);
    var mySvg = Snap('#mySvgWindow' + id);
    var first = mySvg.rect(5, 5, 10, 10).attr({fill: jeedomCategories[0].color});
    var line1 = mySvg.line(10, 10, 10, 50).attr({'fill': "none", 'stroke': jeedomCategories[0].color, 'stroke-width': 3});
    var line2 = mySvg.line(10, 50, 10, 100).attr({'fill': "none", 'stroke': jeedomCategories[0].color, 'stroke-width': 3});
    var line3 = mySvg.line(10, 100, 10, 150).attr({'fill': "none", 'stroke': jeedomCategories[0].color, 'stroke-width': 3});
    var last = mySvg.rect(5, 145, 10, 10).attr({fill: jeedomCategories[0].color});
    var group = mySvg.g(first, line1, line2, line3, last);
    var svgSelect = secondaryPages.updateSvg(page, id, group);
});

function createSvg(id, cadre, svg) {
    var page = $('#bsPageSelect').val();
    var svgMain =
            '<svg id="mySvgWindow' + id + '" name="mySvgWindow' + id + '" data-svg="' + id + '" data-cadre="' + cadre + '" height="100%" width="100%" style="z-index: 89; position: absolute; top: 0;left: 0;">' +
            '</svg>';
    $("div[name='myCadre" + cadre + "']").append(svgMain);
    var options = '<option value="' + id + '">Ligne N°' + id + '</option>';
    $("select[name='bsSvgIdSelect" + cadre + "']").append(options);
    $("select[name='bsSvgIdSelect" + cadre + "']").val('' + id);
    $("select[name='bsSvgIdSelect" + cadre + "']").prop('disabled', false);
    $("button[name='bsSvgId" + cadre + "']").prop('disabled', false);
    var mySvg = Snap('#mySvgWindow' + id);
    var first = Snap.parse(svg[0]);
    var line1 = Snap.parse(svg[1]);
    var line2 = Snap.parse(svg[2]);
    var line3 = Snap.parse(svg[3]);
    var last = Snap.parse(svg[4]);
    var group = mySvg.g(first, line1, line2, line3, last);
    var svgSelect = secondaryPages.updateSvg(page, id, group);
}

$('#bsSecondaireView').on('shown.bs.popover', "div[name*='myCadre']", function () {
    var cadre = $(this).data('cadre');
    var page = $('#bsPageSelect').val();
    var width = $("div[name='myCadre" + cadre + "']").css('width');
    var height = $("div[name='myCadre" + cadre + "']").css('height');
    var text = 'Cadre N°' + cadre + ' - L:' + width.replace('px', '') + ' - H:' + height.replace('px', '');
    var colorMenuH4 = rgb2hex($("#myBootstrapMenu").children('h4').css('color'));
    var colorCadreH4 = rgb2hex($("div[name='myCadre" + cadre + "']").children('h4').css('color'));
    if (colorMenuH4 === colorCadreH4) {
        $("input[name='myCadreTitleColor" + cadre + "']").prop('disabled', true);
        $("input[name='myCadreTitleColor" + cadre + "']").val(colorMenuH4);
    }
    else {
        $("input[name='myCadreTitleColor" + cadre + "']").prop('disabled', false);
        $("input[name='myCadreTitleColor" + cadre + "']").val(colorCadreH4);
    }
    $('#bsCadreDetails' + cadre).text(text);
    $('#bsCadrePicture' + cadre).append($('#bsPageImage').html());
    $("select[name='bsCadreFont" + cadre + "']").append($('#bsListFonts').html());
    $("select[name='bsCadreFont" + cadre + "']").val(getFontFace(cadre));
    if ($("select[name='bsCadreFont" + cadre + "']").val() !== "0") {
        $('#styleCadre' + cadre).remove();
        var fontface = addFontFace($("select[name='bsCadreFont" + cadre + "']").val(), cadre);
        $("div[name='myCadre" + cadre + "']").prepend(fontface);
        $("div[name='myCadre" + cadre + "']").find('h4').css({'font-family': 'myFont' + cadre + ', Helvetica, Arial, sans-serif'});
    }
    else {
        if ($('#bsListFonts').val() === '0')
            $("div[name='myCadre" + cadre + "']").find('h4').css({'font-family': ''});
        else
            $("div[name='myCadre" + cadre + "']").find('h4').css({'font-family': 'myFontTheme, Helvetica, Arial, sans-serif'});
    }
    var selected = $("div[name='myCadre" + cadre + "']").css('background-image');
    if (selected !== "none") {
        selected = selected.match(/.*\/(.*)[^\"]$/);
        selected = selected[1].replace(/\"/g, '');
        selected = decodeURI(selected);
        $('#bsCadrePicture' + cadre).val(selected);
    }
    if ($("div[name='myCadre" + cadre + "']").children('h4').is(":visible"))
        $("input[name='myCadreTitle" + cadre + "']").prop('disabled', false);
    else
        $("input[name='myCadreTitle" + cadre + "']").prop('disabled', true);
    var pageSelect = secondaryPages.search(page);
    $("select[name='bsSvgIdSelect" + cadre + "']").empty();
    var options = '';
    for (var index in pageSelect.svg) {
        if (pageSelect.svg[index].cadre === parseInt(cadre))
            options += '<option value="' + pageSelect.svg[index].id + '">Ligne N°' + pageSelect.svg[index].id + '</option>';
    }
    $("select[name='bsSvgIdSelect" + cadre + "']").append(options);
    if (options !== '') {
        $("select[name='bsSvgIdSelect" + cadre + "']").prop('disabled', false);
        $("button[name='bsSvgId" + cadre + "']").prop('disabled', false);
        var svg = $("select[name='bsSvgIdSelect" + cadre + "']").val();
        var svgSelect = secondaryPages.searchSvg(page, svg);
        if (showAnimSvg)
            animSvg(svgSelect.svg);
    }
    else {
        $("select[name='bsSvgIdSelect" + cadre + "']").prop('disabled', true);
        $("button[name='bsSvgId" + cadre + "']").prop('disabled', true);
    }
    var locked = $("div[name='myCadre" + cadre + "']").attr('data-locked');
    if(locked !== '1') {
        $("button[name='myCadreLock" + cadre + "']").attr('title', "Verrouillez le Cadre");
        $("button[name='myCadreLock" + cadre + "']").removeClass('btn-success').addClass('btn-warning');
        $("button[name='myCadreLock" + cadre + "']").html('<i class="fa fa-unlock-alt"></i>');
    }
    else {
        $("button[name='myCadreLock" + cadre + "']").removeClass('btn-warning').addClass('btn-success');
        $("button[name='myCadreLock" + cadre + "']").attr('title', "Déverrouillez le Cadre");
        $("button[name='myCadreLock" + cadre + "']").html('<i class="fa fa-lock"></i>');
    }
});

function cadrePopover(index) {
    $("div[name='myCadre" + index + "']").popover({
        html: true,
        title: 
                '<button type="button" class="pull-left btn btn-xs btn-success myCadreLock" name="myCadreLock' + index + '" data-cadre="' + index + '" title="Verrouillez le Cadre"><i class="fa fa-lock"></i></button>' +
                '<strong class="control-label" id="bsCadreDetails' + index + '">Cadre</strong>' +
                '<button type="button" class="pull-right btn btn-xs btn-danger myCadreDel" data-cadre="' + index + '" title="Supprimer le Cadre">' +
                '<i class="fa fa-trash-o"></i></button>',
        content: '<div class="form-group form-group-sm">' +
                '<div class="col-sm-4"><button class="btn btn-sm btn-success  myCadreViewTitle" data-cadre="' + index + '" type="button" title="Voir/Cacher le Titre">Titre</button></div>' +
                '<div class="col-sm-8"><input type="text" class="form-control myCadreTitle" name="myCadreTitle' + index + '" data-cadre="' + index + '" value="' + $("div[name='myCadre" + index + "']").children('h4').text() + '"/></div>' +
                '</div>' +
                '<div class="form-group form-group-sm">' +
                '<div class="col-sm-4"><button class="btn btn-sm btn-success  bsButtonTitleColor" name="bsButtonTitleColor' + index + '" data-cadre="' + index + '" type="button" title="Couleur du Titre">Couleur</button></div>' +
                '<div class="col-sm-8"><input type="color" value="" class="form-control myCadreTitleColor" disabled name="myCadreTitleColor' + index + '" data-cadre="' + index + '"/></div>' +
                '</div>' +
                '<div class="form-group form-group-sm"><div class="col-sm-12">' +
                '<select class="form-control bsCadreFont" name="bsCadreFont' + index + '" data-cadre="' + index + '">' +
                '</select>' +
                '</div></div>' +
                '<div class="form-group form-group-sm"><div class="col-sm-12">' +
                '<select class="form-control bsCadrePicture" id="bsCadrePicture' + index + '" data-cadre="' + index + '">' +
                '</select>' +
                '</div></div>' +
                '<div class="form-group form-group-sm"><div class="col-sm-12">' +
                '<select class="form-control bsCadreLevel" data-cadre="' + index + '">' +
                '<option value="99">Niveau -1</option>' +
                '<option value="1000">Niveau 1</option>' +
                '<option value="1001">Niveau 2</option>' +
                '<option value="1002">Niveau 3</option>' +
                '</select>' +
                '</div></div>' +
                '<div class="form-group form-group-sm">' +
                '<div class="col-sm-5">' +
                '<button type="button" class="btn btn-sm btn-info  bsCadreSvg" data-cadre="' + index + '" title="Ajouter une ligne SVG"><i class="fa fa-plus-circle"></i></button>' +
                '<button type="button" class="btn btn-sm btn-info  bsSvgId" name="bsSvgId' + index + '" disabled data-cadre="' + index + '" title="Editer la ligne SVG"><i class="fa fa-pencil"></i></button>' +
                '</div>' +
                '<div class="col-sm-7">' +
                '<select class="form-control bsSvgIdSelect" name="bsSvgIdSelect' + index + '" disabled data-cadre="' + index + '">' +
                '</select>' +
                '</div></div>' +
                '',
        placement: 'right',
        viewport: "div[name='myCadre" + index + "']"
    });
}

$('#bsSecondaireView').on('click', '.myCadreLock', function () {
    var cadre = $(this).data('cadre');
    var page = $('#bsPageSelect').val();
    var locked = $("div[name='myCadre" + cadre + "']").attr('data-locked');
    if(locked === '1') {
        $("div[name='myCadre" + cadre + "']").attr('data-locked', '0');
        $(this).attr('title', "Verrouillez le Cadre");
        $(this).removeClass('btn-success').addClass('btn-warning');
        $(this).html('<i class="fa fa-unlock-alt"></i>');
         $("div[name='myCadre" + cadre + "']").resizable({
            minHeight: 100,
            minWidth: 100,
            maxHeight: $('#bsHeightWindow').val(),
            maxWidth: $('#bsWidthWindow').val(),
            stop: function (event, ui) {
                $("div[name='myCadre" + idCadre + "']").popover('show');
                var idCadre = parseInt($(this).data('cadre'));
                var page = $('#bsPageSelect').val();
                var h4 = $(this).children('h4').clone();
                var style = $('#styleCadre' + idCadre).clone();
                var newCadre = $(this).clone().removeClass('ui-resizable ui-resizable-resizing ui-draggable ui-draggable-dragging ui-draggable-handle').empty();
                newCadre.popover('destroy');
                newCadre.append(style);
                newCadre.append(h4);
                secondaryPages.updateCadre(page, idCadre, $('<div>').append(newCadre).html());
            }
        });
        $("div[name='myCadre" + cadre + "']").draggable({
            cursor: "move",
            containment: "#myCadreWindow",
            stack: "div[name='myCadre" + cadre + "']",
            stop: function (event, ui) {
                $("div[name='myCadre" + idCadre + "']").popover('show');
                var idCadre = parseInt($(this).data('cadre'));
                var page = $('#bsPageSelect').val();
                var h4 = $(this).children('h4').clone();
                var style = $('#styleCadre' + idCadre).clone();
                var newCadre = $(this).clone().removeClass('ui-resizable ui-resizable-resizing ui-draggable ui-draggable-dragging ui-draggable-handle').empty();
                newCadre.popover('destroy');
                newCadre.append(style);
                newCadre.append(h4);
                secondaryPages.updateCadre(page, idCadre, $('<div>').append(newCadre).html());
            }
        });
   }
    else {
        $(this).removeClass('btn-warning').addClass('btn-success');
        $(this).attr('title', "Déverrouillez le Cadre");
        $(this).html('<i class="fa fa-lock"></i>');
        $("div[name='myCadre" + cadre + "']").attr('data-locked', '1');
        $("div[name='myCadre" + cadre + "']").resizable('destroy');
        $("div[name='myCadre" + cadre + "']").draggable('destroy');
    }
    var h4 = $("div[name='myCadre" + cadre + "']").children('h4').clone();
    var style = $('#styleCadre' + cadre).clone();
    var newCadre = $("div[name='myCadre" + cadre + "']").clone().removeClass('ui-resizable ui-resizable-resizing ui-draggable ui-draggable-dragging ui-draggable-handle').empty();
    newCadre.popover('destroy');
    newCadre.append(style);
    newCadre.append(h4);
    secondaryPages.updateCadre(page, cadre, $('<div>').append(newCadre).html());
});

function createCadre(index, cadre) {
    $('#myCadreWindow').prepend(cadre);
    $("div[name='myCadre" + index + "']").addClass('default');
    $("div[name='myCadre" + index + "']").css({'background-size': '100% 100%', 'position': 'absolute'});
    cadrePopover(index);
    var locked = $("div[name='myCadre" + index + "']").attr('data-locked');
    if(locked === undefined) {
         $("div[name='myCadre" + index + "']").attr('data-locked', '0');
         locked = '0';
     }
    if(locked !== '1') {
        $("div[name='myCadre" + index + "']").resizable({
            minHeight: 100,
            minWidth: 100,
            maxHeight: $('#bsHeightWindow').val(),
            maxWidth: $('#bsWidthWindow').val(),
            stop: function (event, ui) {
                $("div[name='myCadre" + idCadre + "']").popover('show');
                var idCadre = parseInt($(this).data('cadre'));
                var page = $('#bsPageSelect').val();
                var h4 = $(this).children('h4').clone();
                var style = $('#styleCadre' + idCadre).clone();
                var newCadre = $(this).clone().removeClass('ui-resizable ui-resizable-resizing ui-draggable ui-draggable-dragging ui-draggable-handle').empty();
                newCadre.popover('destroy');
                newCadre.append(style);
                newCadre.append(h4);
                secondaryPages.updateCadre(page, idCadre, $('<div>').append(newCadre).html());
            }
        });
        $("div[name='myCadre" + index + "']").draggable({
            cursor: "move",
            containment: "#myCadreWindow",
            stack: "div[name='myCadre" + index + "']",
            stop: function (event, ui) {
                $("div[name='myCadre" + idCadre + "']").popover('show');
                var idCadre = parseInt($(this).data('cadre'));
                var page = $('#bsPageSelect').val();
                var h4 = $(this).children('h4').clone();
                var style = $('#styleCadre' + idCadre).clone();
                var newCadre = $(this).clone().removeClass('ui-resizable ui-resizable-resizing ui-draggable ui-draggable-dragging ui-draggable-handle').empty();
                newCadre.popover('destroy');
                newCadre.append(style);
                newCadre.append(h4);
                secondaryPages.updateCadre(page, idCadre, $('<div>').append(newCadre).html());
            }
        });
    }
}

function addCadreDefault() {
    var cadreDefault = "";
    cadreDefault = ".default {\n";
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
    return cadreDefault;
}

