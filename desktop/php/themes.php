<?php
if (!isConnect('admin')) {
    throw new Exception('{{401 - Accès non autorisé}}');
}
include_file('3rdparty', 'snap.svg', 'js', 'themes');

sendVarToJS('eqType', 'themes');
$eqLogics = eqLogic::byType('themes');
?>
<style id="bsStyleTheme">
    .noPaddingLeft { padding-left: 0;}
    .noPaddingRight { padding-right: 0;}
    .noMarginBottom { margin-bottom: 0;}
    //.pull-left {
    //    float: left;
    //    margin-right: 5px;
    //}
    .borderCheck {
        border-right: 1px solid #ddd;
    }
    .noPaddingWell {
        padding-bottom: 0;
        padding-top: 0;
    }
    .form-button {
        display: block;
        width: 100%;
        height: 38px;
        padding: 8px 12px;
        font-size: 14px;
        line-height: 1.42857143;
    }
    h6 {
        line-height: 1.43;
        margin-bottom: 0;
        margin-top: 0;
    }
    .slider.slider-horizontal {
        width: 100%;
        height: 34px;
    }

    #bsOffsetButtonSlider .slider-selection {
        background: #BABABA;
    }
    fileinput-button {
        position: relative;
        overflow: hidden;
    }
    .fileinput-button input {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
        opacity: 0;
        -ms-filter: 'alpha(opacity=0)';
        font-size: 200px;
        direction: ltr;
        cursor: pointer;
    }
    .popover {
        z-index: 1020;
        width : 270px;
        padding-bottom: 15px;
    }
    .popovertheme {
        width : 400px;
        max-width: 400px;
    }
    .popover-title {
        line-height: 1.43;
    }
    
    a.buttonTest > span {
         text-indent: -9999px;
   }

    a.newButton {
        display: block;
        width: 250px;
        height: 32px;
        margin: 0 auto;
        text-indent: -9999px;
        background: url('plugins/themes/doc/images/boutons1.png');
        outline: none;
    }
    a.newButton:hover, .newButton:focus {
        background-position: 0 -32px;
        outline: none;
    }
    a.newButton:active {
        background-position: 0 32px;
        outline: none;
    }
</style>
<div class="row row-overflow">
    <div class="col-lg-2 col-md-3 col-sm-4">
        <div class="bs-sidebar">
            <ul id="ul_eqLogic" class="nav nav-list bs-sidenav">
                <!--a class="newButton" id="bsButtonsDisplay" ><span>Button</span></a-->
                <a class="btn btn-warning" id="bsButtonsDisplay" style="width : 100%;margin-top : 5px;margin-bottom: 5px;"><i class="icon divers-vlc"></i> {{Boutons Personnalisés}}</a>
                <a class="btn btn-success" id="bsImageDisplay" style="width : 100%;margin-top : 5px;margin-bottom: 5px;"><i class="fa fa-picture-o"></i> {{Images}}</a>
                <a class="btn btn-default eqLogicAction" style="width : 100%;margin-top : 5px;margin-bottom: 5px;" data-action="add"><i class="fa fa-plus-circle"></i> {{Ajouter un theme}}</a>
                <li class="filter" style="margin-bottom: 5px;"><input class="filter form-control input-sm" placeholder="{{Rechercher}}" style="width: 100%"/></li>
                <?php
                foreach ($eqLogics as $eqLogic) {
                    echo '<li class="cursor li_eqLogic" data-eqLogic_id="' . $eqLogic->getId() . '"><a>' . $eqLogic->getHumanName(true) . '</a></li>';
                }
                ?>
            </ul>
        </div>
    </div>

    <div class="col-lg-10 col-md-9 col-sm-8 eqLogicThumbnailDisplay" style="border-left: solid 1px #EEE; padding-left: 25px;">
        <legend>{{Mes Themes}}</legend>
        <?php
        if (count($eqLogics) == 0) {
            echo "<br/><br/><br/><center><span style='color:#767676;font-size:1.2em;font-weight: bold;'>{{Vous n'avez pas encore de thèmes, cliquez sur Ajouter un thème pour commencer}}</span></center>";
        } else {
            ?>
            <div class="eqLogicThumbnailContainer">
                <?php
                foreach ($eqLogics as $eqLogic) {
                    echo '<div class="eqLogicDisplayCard cursor" data-eqLogic_id="' . $eqLogic->getId() . '" style="background-color : #ffffff; height : 200px;margin-bottom : 10px;padding : 5px;border-radius: 2px;width : 160px;margin-left : 10px;" >';
                    echo "<center>";
                    echo '<img src="plugins/themes/doc/images/themes_icon.png" height="105" width="95" />';
                    echo "</center>";
                    echo '<span style="font-size : 1.1em;position:relative; top : 15px;word-break: break-all;white-space: pre-wrap;word-wrap: break-word;"><center>' . $eqLogic->getHumanName(true, true) . '</center></span>';
                    echo '</div>';
                }
                ?>
            </div>
        <?php } ?>
    </div>

    <div class="col-lg-10 col-md-9 col-sm-8 eqLogicButtonsView" style="border-left: solid 1px #EEE; padding-left: 25px;display: none;">
        <form class="form-horizontal">
            <fieldset>
                <legend><i class="fa fa-arrow-circle-left eqLogicAction cursor" data-action="returnToThumbnailDisplay"></i> {{Général}}</legend>
                <div class="container-fluid" id="bsMenuThemesButtonsView">
                    <div class="form-horizontal col-sm-2">
                        <div class="col-sm-12">
                        <div class="well form-group form-group-sm">
                            <div class="col-sm-12">
                                <button type="button" class="btn btn-sm btn-block btn-primary " id="bsButtonsAdd" title="{{Ajouter un Bouton Personnalisé}}"><i class="fa fa-plus-circle"></i> Ajouter</button>
                            </div>
                        </div>
                        </div>
                    </div>                
                    <div class="well col-sm-10">
                        <div class="panel panel-default" id="bsButtonsDefault">
                            <div class="panel-heading"><h6>{{Boutons Personnalisés}}</h6></div>
                            <div class="panel-body">
                                <div class="col-sm-12" id="bsButtonsView">
                                </div> 
                            </div> 
                        </div>
                    </div>                
                </div>
            </fieldset>        
        </form>
    </div>
    <div class="col-lg-10 col-md-9 col-sm-8 eqLogicImageView" style="border-left: solid 1px #EEE; padding-left: 25px;display: none;">
        <form class="form-horizontal" method="post" enctype="multipart/form-data">
            <fieldset>
                <legend><i class="fa fa-arrow-circle-left eqLogicAction cursor" data-action="returnToThumbnailDisplay"></i> {{Général}}</legend>
                <div class="container-fluid" id="bsMenuThemesImagesView">
                    <div class="form-horizontal col-sm-2">
                        <div class="well col-sm-12">
                        <div class="form-group form-group-sm">
                            <div class="col-sm-12">
                            <span class="form-control btn-sm btn-info fileinput-button">
                                <i class="glyphicon glyphicon-plus"></i>
                                <span> {{Image(s)...}}</span>
                                <input class="form-control" type="file" id="bsImagesFileload" name="images" data-url="plugins/themes/core/ajax/themes.ajax.php?action=imageUpload"/>
                            </span>
                            </div>    
                        </div>
                        <div class="form-group form-group-sm">
                            <div class="col-sm-2">
                                <button type="button" class="btn btn-sm btn-primary " id="bsImagesAddCategory" title="{{Ajouter une catégorie}}"><i class="fa fa-folder"></i></button>
                            </div>
                            <div class="col-sm-10">
                                <select class="form-control" value="" id="bsImagesCategory" >
                                    <option value="">Thèmes</option>
                                </select>
                            </div>
                        </div>
                        </div>
                    </div>                
                    <div class="well col-sm-10" id="bsCategory">
                        <div class="panel panel-default" id="bsCategoryDefault">
                            <div class="panel-heading"><h6>{{Catégorie : Théme}}<small><em><bold> - {{utilisée pour tout les thèmes}}</bold></em></small></h6></div>
                            <div class="panel-body">
                                <div class="col-sm-12" id="bsImagesView">
                                </div> 
                            </div> 
                        </div>
                    </div>                
                </div>
            </fieldset>        
        </form>
    </div>
    <div class="col-lg-10 col-md-9 col-sm-8 eqLogic" style="border-left: solid 1px #EEE; padding-left: 25px;display: none;">
        <form class="form-horizontal" method="post" enctype="multipart/form-data">
            <fieldset>
                <legend><i class="fa fa-arrow-circle-left eqLogicAction cursor" data-action="returnToThumbnailDisplay"></i> {{Général}}  <i class='fa fa-cogs eqLogicAction pull-right cursor expertModeVisible' data-action='configure'></i></legend>
                <div class="container-fluid">
                    <div class="well col-sm-12">
                        <div class="well col-sm-2">
                             <span class="btn btn-block btn-warning" id="bsMenuImportButton" style="display :none" >
                                <i class="fa fa-download"></i>
                                <span> {{Importer...}}</span>
                                <input class="form-control" type="file" id="bsMenuThemesImport" style="cursor : pointer; opacity: 0; position: absolute; top: 20px; right: 0;" name="themes" data-url="plugins/themes/core/ajax/themes.ajax.php?action=themeImport"/>
                            </span>
                            <button type="button" class="btn btn-block btn-warning" style="display :none" id="bsMenuThemesExport"><i class="fa fa-upload"></i> {{Exporter...}}</button>
                            <button type="button" class="btn btn-block btn-primary" style="display :none" id="bsMenuThemesDetails"><i class="fa fa-search"></i> {{Détails}}</button>
                            <button type="button" class="btn btn-block btn-primary" id="bsMenuThemesApercu"><i class="fa fa-refresh"></i> {{Aperçu}}</button>
                            <button type="button" class="btn btn-block btn-info" disabled id="bsStepByStepButton"><i class="fa fa-smile-o"></i> {{Pas à Pas}}</button>
                            <button type="button" class="btn btn-block btn-danger" id="bsDesignButton"><i class="fa fa-thumb-tack"></i> {{Design}}</button>
                            <button type="button" class="btn btn-block btn-danger" id="bsBootStrapButton"><i class="fa fa-magic"></i> {{BootStrap}}</button>
                        </div>
                        <div class="col-sm-5">
                            <div class="panel panel-primary">
                                <!-- Default panel contents -->
                                <div class="panel-heading"><h6>{{Gestions des Pages Secondaires}}</h6></div>
                                <div class="panel-body">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label" for="bsPageSelect">{{Pages}}</label>
                                            <div class="col-sm-9">
                                                <select class="form-control" id="bsPageSelect">
                                                </select>               
                                            </div>
                                        </div>
                                        <div class="form-group" id="bsDuplicateView" style="display: none">
                                            <div class="col-sm-3">
                                                <a class="btn btn-default pull-right" id="bsDuplicatePage">
                                                    <i class="fa fa-files-o"></i> {{Dupliquer}}
                                                </a>
                                            </div>
                                            <label class="col-sm-2 control-label" for="bsOtherPages"> {{Vers}}: </label>
                                            <div class="col-sm-7">
                                                <select class="form-control" id="bsOtherPages">
                                                </select>               
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-7">
                                        <fieldset class="bsCadreFields" id="bsCadreFields1">
                                            <div class="panel panel-info">
                                                <div class="panel-heading"><h6>{{Profondeur}}</h6></div>
                                                <div class="panel-body">
                                                    <div class="form-group">
                                                        <div class="col-sm-12">
                                                            <select class="form-control" id="bsPageLevel">
                                                                <option value="99">{{Niveau}} -1</option>
                                                                <option value="1000">{{Niveau}} 1</option>
                                                                <option value="1001">{{Niveau}} 2</option>
                                                                <option value="1002">{{Niveau}} 3</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div> 
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div class="col-sm-5">
                                        <fieldset class="bsCadreFields">
                                            <div class="panel panel-info">
                                                <div class="panel-heading"><h6>{{Cadres}}</h6></div>
                                                <div class="panel-body">
                                                    <div class="form-group">
                                                        <div class="col-sm-12">
                                                            <button type="button" class="btn btn-block btn-info" id="bsCadreBootstrap"><i class="fa fa-pencil-square-o"></i> {{Ajouter}}</button>
                                                        </div> 
                                                    </div> 
                                                </div> 
                                            </div>
                                        </fieldset>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        <div class="col-sm-5">
                            <div class="panel panel-primary">
                                <!-- Default panel contents -->
                                <div class="panel-heading"><h6>{{Description du Thème}}</h6></div>
                                <div class="panel-body">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">{{Nom}}</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="eqLogicAttr form-control" data-l1key="id" style="display : none;" />
                                            <input type="text" class="eqLogicAttr form-control" data-l1key="name" placeholder="{{Nom}}"/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label" >{{Objet parent}}</label>
                                        <div class="col-sm-8">
                                            <select id="sel_object" class="eqLogicAttr form-control" data-l1key="object_id">
                                                <option value="">{{Aucun}}</option>
                                                <?php
                                                foreach (object::all() as $object) {
                                                    echo '<option value="' . $object->getId() . '">' . $object->getName() . '</option>';
                                                }
                                                ?>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label" for="bsIsEnableYes">{{Activer}}</label>
                                        <div class="col-sm-4">
                                            <div class="btn-group" data-toggle="buttons">
                                                <button class="btn btn-sm btn-success" type="button" id="bsIsEnableYes" autocomplete="off">{{Oui}}</button>
                                                <button class="btn btn-sm" type="button" id="bsIsEnableNo" autocomplete="off">{{Non}}</button>
                                            </div>
                                            <input type="checkbox" hidden class="eqLogicAttr" data-l1key="isEnable" size="16" checked/>
                                        </div>
                                        <label class="col-sm-2 control-label" for="bsIsVisibleYes">{{Visible}}</label>
                                        <div class="col-sm-4">
                                            <div class="btn-group" data-toggle="buttons">
                                                <button class="btn btn-sm btn-success" type="button" id="bsIsVisibleYes" autocomplete="off">{{Oui}}</button>
                                                <button class="btn btn-sm" type="button" id="bsIsVisibleNo" autocomplete="off">{{Non}}</button>
                                            </div>
                                            <input type="checkbox" hidden class="eqLogicAttr" data-l1key="isVisible" checked/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label" for="bsExpert">{{Expert}}</label>
                                        <div class="col-sm-4">
                                            <div class="btn-group" data-toggle="buttons">
                                                <button class="btn btn-sm" type="button" id="bsExpert" autocomplete="off">{{Oui}}</button>
                                            </div>
                                        </div>
                                        <div id="bsHardSaveView" style="display:none">
                                            <div class="col-sm-6">
                                                <button class="col-sm-12 btn btn-sm btn-danger" type="button" id="bsHardSaveYes" autocomplete="off">{{RaZ de Page}}</button>
                                            </div> 
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid" id="bsSecondaireView" style="display: none; overflow-x: auto">
                    <div class="col-sm-2" style="display: none">
                        <div class="panel panel-info" id="bsPanelSvg">
                            <!-- Default panel contents -->
                            <div class="panel-heading"><h6>SVG</h6></div>
                            <div class="panel-body">
                                <div class="form-group">
                                    <div class="col-sm-12">
                                        <button type="button" class="btn btn-block btn-info" id="bsCadreSvg"><i class="fa fa-plus-circle"></i> {{Ajouter}}</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-3">
                                        <button type="button" class="btn btn-info" id="bsSvgId"><i class="fa fa-pencil"></i></button>
                                    </div>
                                    <div class="col-sm-9">
                                        <select class="form-control" id="bsSvgIdSelect">
                                        </select>               
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                        <div class="container-fluid" id="bsWindowView">
                        </div>
                </div>
                <div class="container-fluid" id="bsMenuThemesApercuView" style="overflow-x: auto">
                    <div class="col-sm-2" style="min-width:275px">
                    </div>
                    <div class="col-sm-8 noPaddingLeft" id="bsPopoverMenu">
                        <div id="div_frameMenu" class="" style="padding:0;width: 1024px;height: 768px">
                            <div id="bsTop" style="margin-left:0;width: 1024px">
                                <div class="row" id="bsMenuView">
                                    <div class="well" id="myBootstrapMenu" style="padding: 10px;margin-left: 15px;width: 1024px;height: 90px">
                                        <h4 class="text-center" style="border-bottom: 1px solid black">Menu</h4>
                                        <div style="position: absolute;" id="modelButtonBarOverflow">
                                            <div class="pull-left" style="position: relative;width: 95px;border-right: 1px groove;padding-right: 5px">
                                                <button type="button" id="scrollBeginButton" class="pull-left btn btn-primary"><i class="fa fa-chevron-left"></i></button>
                                                <button type="button" class="btn btn-primary myBsButton" id="bsHomeButton" data-planid="X"><i class="icon maison-house109"></i></button>
                                            </div>
                                            <div class="pull-left" style="width: 912px;height: 400px;overflow: hidden" id="menuBarOverflow">
                                                <div style="width: 912px;" class="noPaddingLeft" id="menuBar">
                                                </div>
                                            </div>
                                            <div class="pull-left" style="position: relative;width: 40px;border-left: 1px groove;margin: 0;padding-left: 5px">
                                                <button type="button" id="scrollEndButton" class="pull-left btn  btn-primary"><i class="fa fa-chevron-right"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" id="bsWindow">
                                    <div class="col-sm-12 well" id="myBootstrapWindow" style="padding: 0;margin-left: 15px;width:1024px;height: 573px"></div>
                                </div>
                            </div>
                            <div class="row" id="bsState">
                                <div class="well" id="myBootstrapState" style="padding: 5px;margin-left: 15px;margin-bottom: 0;width: 1024px;height: 55px">
                                    <ol id="myBreadcrumbs" class="pull-left breadcrumb" style="font-size:12px">
                                        <li class="active">Home</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid" id="bsMenuThemesDetailsView" style="display: none;">
                    <div class="panel-group" id="bsAccordion" role="tablist" aria-multiselectable="true">
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingOne">
                                <h4 class="panel-title">
                                    <a data-toggle="collapse" data-parent="#bsAccordion" href="#bsCollapseOne" aria-expanded="true" aria-controls="bsCollapseOne">
                                        {{Informations}}
                                    </a>
                                </h4>
                            </div>
                            <div id="bsCollapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                <div class="panel-body">
                                    <div class="col-sm-4">
                                        <div class="panel panel-primary">
                                            <div class="panel-heading"><h6>{{Détail de la Fenêtre principale}}</h6></div>
                                            <div class="panel-body">
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsWidthMainWindow">{{Largeur}}</label>
                                                    <div class="col-sm-6">
                                                        <input type="number" class="form-control eqLogicAttr" id="bsWidthMainWindow" value="1024" placeholder="{{Largeur}}.." data-l1key="configuration" data-l2key="bsWidthMainWindow"/>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsHeightMainWindow">{{Hauteur}}</label>
                                                    <div class="col-sm-6">
                                                        <input type="number" class="form-control eqLogicAttr" id="bsHeightMainWindow" value="768" placeholder="{{Hauteur}}.." data-l1key="configuration" data-l2key="bsHeightMainWindow"/>
                                                    </div>
                                                </div>
                                                <div class="form-group form-group-sm">
                                                    <label class="col-sm-6 control-label" for="bsImageMainWindow">{{Image}}</label>
                                                    <div class="col-sm-6">
                                                        <select class="form-control eqLogicAttr" id="bsImageMainWindow" data-l1key="configuration" data-l2key="bsImageMainWindow">
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group" id="bsMyCadreView">
                                                    <label class="col-sm-6 control-label" for="bsMyCadre">{{Id du Plan}}</label>
                                                    <div class="col-sm-6">
                                                        <input type="number" class="form-control eqLogicAttr" readonly id="bsMyCadre" placeholder="{{Plan}}.." data-l1key="configuration" data-l2key="bsMyCadre"/>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-sm-6">
                                                        <button class="form-control btn btn-sm btn-danger " type="button" id="bsDelFont" title="{{Supprimer la Font}}">
                                                            <i class="fa fa-trash-o"></i> {{Sélection}}
                                                        </button>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <select class="form-control eqLogicAttr" id="bsListFonts" data-l1key="configuration" data-l2key="bsListFonts">
                                                        </select>               
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsMyFont">{{Ajouter une Font}}</label>
                                                    <div class="col-sm-6">
                                                        <input class="form-control" type="file" id="bsMyFont" name="fonts" data-url="plugins/themes/core/ajax/themes.ajax.php?action=fontUpload"/>
                                                    </div>
                                                </div>
                                                <div class="form-group" id="bsReadOnlyView" style="display:none">
                                                    <label class="col-sm-6 control-label" for="bsReadOnlyYes">{{Lecture Seule}}</label>
                                                    <div class="col-sm-6">
                                                            <div class="btn-group form-button" data-toggle="buttons">
                                                                <button class="btn btn-xs btn-success" type="button" id="bsReadOnlyYes" autocomplete="off">{{Oui}}</button>
                                                                <button class="btn btn-xs" type="button" id="bsReadOnlyNo" autocomplete="off">{{Non}}</button>
                                                            </div>
                                                            <input name="bsReadOnlyYes" hidden value="1"/>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                        <div class="panel panel-primary">
                                            <div class="panel-heading"><h6>{{Détails du Cadre principal}}</h6></div>
                                            <div class="panel-body">
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsStyleCadreYes">{{Cadre unique}}</label>
                                                    <div class="col-sm-6 control-group">
                                                        <div class="control-group">
                                                            <div class="pull-right btn-group form-button" data-toggle="buttons">
                                                                <button class="btn btn-xs btn-success" type="button" id="bsStyleCadreYes" autocomplete="off">{{Oui}}</button>
                                                                <button class="btn btn-xs" type="button" id="bsStyleCadreNo" autocomplete="off">{{Non}}</button>
                                                            </div>
                                                            <input class="eqLogicAttr" name="bsStyleCadreYes" hidden data-l1key="configuration" data-l2key="bsStyleCadreYes"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsWidthWindow">{{Largeur}}</label>
                                                    <div class="col-sm-6">
                                                        <input type="number" class="form-control readonly eqLogicAttr" readonly id="bsWidthWindow" value="1024" data-l1key="configuration" data-l2key="bsWidthWindow"/>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsHeightWindow">{{Hauteur}}</label>
                                                    <div class="col-sm-6">
                                                        <input type="number" class="form-control readonly eqLogicAttr" readonly id="bsHeightWindow" value="573" data-l1key="configuration" data-l2key="bsHeightWindow"/>
                                                    </div>
                                                </div>
                                                <div class="form-group" id="bsMyGeneralView">
                                                    <label class="col-sm-6 control-label" for="bsMyGeneral">{{Id du Cadre}}</label>
                                                    <div class="col-sm-6">
                                                        <input type="number" class="form-control" readonly id="bsMyGeneral" placeholder="{{Général}}.."/>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="panel panel-info">
                                            <div class="panel-heading"><h6>{{Options d'affichage du Menu}}</h6></div>
                                            <div class="panel-body">
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsMainMenu">{{Menu}}</label>
                                                    <div class="col-sm-6">
                                                        <select class="form-control eqLogicAttr" id="bsMainMenu" placeholder="Plan.." data-l1key="configuration" data-l2key="bsMainMenu">
                                                            <option value="0">{{Haut}}</option>
                                                            <option value="1">{{Bas}}</option>
                                                            <option value="2">{{Gauche}}</option>
                                                            <option value="3">{{Droite}}</option>
                                                        </select>               
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsHeightMainMenu">{{Hauteur}}/{{Largeur}}</label>
                                                    <div class="col-sm-6">
                                                        <input type="number" class="form-control eqLogicAttr" id="bsHeightMainMenu" value="90" placeholder="{{Hauteur}}/{{Largeur}}.." data-l1key="configuration" data-l2key="bsHeightMainMenu"/>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsMainMenuText">{{Texte}}</label>
                                                    <div class="col-sm-6">
                                                        <input type="text" class="form-control eqLogicAttr" id="bsMainMenuText" value="Menu" placeholder="{{Texte}}.." data-l1key="configuration" data-l2key="bsMainMenuText"/>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsViewMenuYes">{{Visible}}</label>
                                                    <div class="col-sm-6 control-group">
                                                        <div class="control-group">
                                                            <div class="pull-right btn-group form-button" data-toggle="buttons">
                                                                <button class="btn btn-xs btn-success" type="button" id="bsViewMenuYes" autocomplete="off">{{Oui}}}</button>
                                                                <button class="btn btn-xs" type="button" id="bsViewMenuNo" autocomplete="off">{{Non}}</button>
                                                            </div>
                                                            <input class="eqLogicAttr" name="bsViewMenuYes" hidden data-l1key="configuration" data-l2key="bsViewMenuYes"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsStateBar">{{Barre d'état}}</label>
                                                    <div class="col-sm-6 control-group">
                                                        <div class="control-group">
                                                            <div class="pull-right btn-group form-button" data-toggle="buttons">
                                                                <button class="btn btn-xs btn-success" type="button" id="bsStateYes" autocomplete="off">{{Oui}}</button>
                                                                <button class="btn btn-xs" type="button" id="bsStateNo" autocomplete="off">{{Non}}</button>
                                                            </div>
                                                            <input class="eqLogicAttr" name="bsStateYes" hidden data-l1key="configuration" data-l2key="bsStateYes"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsStyleButton">{{Type Menu}}</label>
                                                    <div class="col-sm-6">
                                                        <select class="form-control eqLogicAttr" id="bsStyleButton" data-l1key="configuration" data-l2key="bsStyleButton">
                                                            <option value="0">{{Boutons}}</option>
                                                            <option value="1">{{Onglets}}</option>
                                                            <option value="2">{{Menus}}</option>
                                                        </select>               
                                                    </div>
                                                </div>
                                                <!--div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsStateBar">{{Justifié}}</label>
                                                    <div class="col-sm-6 control-group">
                                                        <div class="control-group">
                                                            <div class="pull-right btn-group form-button" data-toggle="buttons">
                                                                <button class="btn btn-xs" type="button" id="bsJustifiedYes" autocomplete="off">{{Oui}}</button>
                                                                <button class="btn btn-xs btn-success" type="button" id="bsJustifiedNo" autocomplete="off">{{Non}}</button>
                                                            </div>
                                                            <input class="eqLogicAttr" name="bsJustifiedYes" hidden data-l1key="configuration" data-l2key="bsJustifiedYes"/>
                                                        </div>
                                                    </div>
                                                </div-->
                                            </div> 
                                        </div>
                                        <div class="panel panel-info">
                                            <div class="panel-heading"><h6>{{Options d'affichage des Boutons}}</h6></div>
                                            <div class="panel-body">
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsWidthButton">{{Taille Bouton}}</label>
                                                    <div class="col-sm-6">
                                                        <select class="form-control eqLogicAttr" id="bsWidthButton" data-l1key="configuration" data-l2key="bsWidthButton">
                                                            <option value="btn-sm">{{Petit}}</option>
                                                            <option value="btn-xs">{{Très Petit}}</option>
                                                            <option value="">{{Normal}}</option>
                                                            <option value="btn-lg">{{Grand}}</option>
                                                        </select>               
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsColorHome">{{Couleur 'home'}}</label>
                                                    <div class="col-sm-6">
                                                        <select class="form-control eqLogicAttr" id="bsColorHome"  style="" data-l1key="configuration" data-l2key="bsColorHome">
                                                            <option class="btn-primary" value="btn-primary">Primary</option>
                                                            <option class="btn-default" value="btn-default">default</option>
                                                            <option class="btn-success" value="btn-success">Success</option>
                                                            <option class="btn-info" value="btn-info">Info</option>
                                                            <option class="btn-warning" value="btn-warning">Warning</option>
                                                            <option class="btn-danger" value="btn-danger">Danger</option>
                                                        </select>               
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsStateBar">{{Boutons Groupés}}</label>
                                                    <div class="col-sm-6 control-group">
                                                        <div class="control-group">
                                                            <div class="pull-right btn-group form-button" data-toggle="buttons">
                                                                <button class="btn btn-xs" type="button" id="bsGroupYes" autocomplete="off">{{Oui}}</button>
                                                                <button class="btn btn-xs btn-success" type="button" id="bsGroupNo" autocomplete="off">{{Non}}</button>
                                                            </div>
                                                            <input class="eqLogicAttr" name="bsGroupYes" hidden data-l1key="configuration" data-l2key="bsGroupYes"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsOffsetButton">{{Décalage}}</label>
                                                    <div class="col-sm-offset-1 col-sm-4">
                                                        <input id="bsOffsetButton" data-slider-id='bsOffsetButtonSlider' type="text" data-slider-min="0" data-slider-max="8" data-slider-step="1" data-slider-value="0"/>
                                                        <input id="bsOffset" class="eqLogicAttr" hidden data-l1key="configuration" data-l2key="bsOffsetButton"/>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="panel panel-success">
                                            <div class="panel-heading">
                                                <h6>Style
                                                    <div class="pull-right col-sm-1">
                                                        <input type="checkbox" class="eqLogicAttr"  id="bsIsStyle" data-l1key="configuration" data-l2key="isStyle"/>
                                                    </div>
                                                </h6>
                                            </div>
                                            <div class="panel-body" id="bsStyleView">
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsBgColorWindow">{{Fond}}</label>
                                                    <div class="col-sm-6">
                                                        <input class="form-control eqLogicAttr" id="bsBgColorWindow" type="color" value="#e8e8e8" placeholder="{{Couleur}}" data-l1key="configuration" data-l2key="bsBgColorWindow"/>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsColorWindow">{{Texte}}</label>
                                                    <div class="col-sm-6">
                                                        <input class="form-control eqLogicAttr" id="bsColorWindow" type="color" value="#333" placeholder="{{Couleur}}" data-l1key="configuration" data-l2key="bsColorWindow"/>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                        <div class="panel panel-success">
                                            <div class="panel-heading"><h6>{{Bordure}}</h6></div>
                                            <div class="panel-body">
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsBorderWindow">{{Taille}}</label>
                                                    <div class="col-sm-6">
                                                        <input class="form-control eqLogicAttr" id="bsBorderWindow" type="number" data-l1key="configuration" data-l2key="bsBorderWindow"/>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsBorderRadius">{{Rayon}}</label>
                                                    <div class="col-sm-6">
                                                        <input class="form-control eqLogicAttr" id="bsBorderRadius" type="number" data-l1key="configuration" data-l2key="bsBorderRadius"/>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsBorderBold">Style</label>
                                                    <div class="col-sm-6">
                                                        <select class="form-control eqLogicAttr" id="bsBorderBold" data-l1key="configuration" data-l2key="bsBorderBold">
                                                            <option value="none">none</option>
                                                            <option value="solid">solid</option>
                                                            <option value="groove">groove</option>
                                                            <option value="dotted">dotted</option>
                                                            <option value="dashed">dashed</option>
                                                            <option value="double">double</option>
                                                            <option value="ridge">ridge</option>
                                                            <option value="inset">inset</option>
                                                            <option value="outset">outset</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsBorderColor">{{Couleur}}</label>
                                                    <div class="col-sm-6">
                                                        <input class="form-control eqLogicAttr" id="bsBorderColor" type="color" placeholder="{{Couleur}}" data-l1key="configuration" data-l2key="bsBorderColor"/>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                        <div class="panel panel-success">
                                            <div class="panel-heading"><h6>{{Ombre}}</h6></div>
                                            <div class="panel-body">
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsBorderShadow1">{{Taille}}</label>
                                                    <div class="col-sm-6">
                                                        <div class="control-group">
                                                            <input class="col-sm-12 eqLogicAttr" name="bsBorderShadow1" type="number" data-l1key="configuration" data-l2key="bsBorderShadow1"/>
                                                            <input class="col-sm-12 eqLogicAttr" name="bsBorderShadow2" type="number" data-l1key="configuration" data-l2key="bsBorderShadow2"/>
                                                            <input class="col-sm-12 eqLogicAttr" name="bsBorderShadow3" type="number" data-l1key="configuration" data-l2key="bsBorderShadow3"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-6 control-label" for="bsBorderShadowColor">{{Couleur}}</label>
                                                    <div class="col-sm-6">
                                                        <input class="form-control eqLogicAttr" id="bsBorderShadowColor" name="bsBorderShadowColor" type="color" placeholder="{{Couleur}}" data-l1key="configuration" data-l2key="bsBorderShadowColor"/>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel panel-default" style="display:none" >
                            <div class="panel-heading" role="tab" id="headingTwo">
                                <h4 class="panel-title">
                                    <a class="collapsed" data-toggle="collapse" data-parent="#bsAccordion" href="#bsCollapseTwo" aria-expanded="false" aria-controls="bsCollapseTwo">
                                        Barre de Menu
                                    </a>
                                </h4>
                            </div>
                            <div id="bsCollapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                <div class="panel-body">
                                    <div class="col-sm-12">
                                        <div class="panel panel-warning">
                                            <div class="panel-heading"><h6>Gestion des Boutons, onglets ou Menus</h6></div>
                                            <div class="panel-body">
                                                <div class="well col-sm-2">
                                                    <button type="button" class="btn btn-block btn-info" id="bsAddButton"><i class="fa fa-plus-circle"></i> Ajouter</button>
                                                    <button type="button" class="btn btn-block btn-info" id="bsEditButton"><i class="fa fa-pencil"></i> Editer</button>
                                                    <button type="button" class="btn btn-block btn-info" id="bsDeleteButton"><i class="fa fa-trash-o"></i> Supprimer</button>
                                                </div>
                                                <div class="col-sm-10">
                                                    <div class="col-sm-12 well noPaddingWell">
                                                        <div class="col-sm-12" id="modelCheckBar" style="">
                                                            <div class="pull-left borderCheck" style="margin-right: 0;width: 44px;">
                                                                <fieldset disabled>
                                                                    <div class="checkbox">
                                                                        <label>
                                                                            <input type="checkbox" readonly value=""/>
                                                                        </label>
                                                                    </div>
                                                                </fieldset>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12 well">
                                                        <div class="col-sm-12" id="modelNavTabsBar">
                                                            <ul class="nav nav-tabs" id="modelNavTabsBarItems">
                                                                <li role="presentation" class="navTabsItems active"><a class="myBsNavTab" data-planid="X"><i class="icon maison-house109"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12 well">
                                                        <div class="col-sm-12" id="modelNavPillsBar">
                                                            <ul class="nav nav-pills" id="modelNavPillsBarItems">
                                                                <li role="presentation" class="navPillsItems active"><a class="myBsNavPill" data-planid="X"><i class="icon maison-house109"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12 well">
                                                        <div id="modelButtonBarOverflow">

                                                            <div class="pull-left" style="width: 40px;border-right: 1px groove;padding-right: 5px">
                                                                <button type="button" id="scrollBeginButtonModel" class="pull-left btn  btn-primary"><i class="fa fa-chevron-left"></i></button>
                                                            </div>
                                                            <div class="pull-left" style="width: 912px;overflow: hidden" id="menuBarOverflowModel">
                                                                <div style="width: 912px;" class="noPaddingLeft" id="modelButtonBar">
                                                                    <div class="btn-group">
                                                                        <button type="button" class="pull-left btn btn-sm btn-primary myBsButton" data-planid="X"><i class="icon maison-house109"></i></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="pull-left" style="width: 40px;border-left: 1px groove;margin: 0;padding-left: 5px;">
                                                                <button type="button" id="scrollEndButtonModel" class="pull-left btn  btn-primary"><i class="fa fa-chevron-right"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset> 
            <select  hidden id="bsPageImage"></select>
            <fieldset>
                <div class="form-actions">
                    <a class="btn btn-danger eqLogicAction" data-action="themeRemove"><i class="fa fa-minus-circle"></i> {{Supprimer}}</a>
                    <a class="btn btn-success eqLogicAction" data-action="save"><i class="fa fa-check-circle"></i> {{Sauvegarder}}</a>
                </div>
            </fieldset>
        </form>

    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="modalCreateButton" tabindex="-1" role="dialog" aria-labelledby="modalCreateButton" aria-hidden="true">
    <div class="modal-dialog" style="width:400px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">{{Création d'un Bouton}}</h4>
            </div>
            <div class="modal-body form-horizontal">
                <div class="form-group form-group-sm">
                    <label class="col-sm-4 control-label" for="bsButtonName">{{Nom}}</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="bsButtonName" placeholder="{{Nom}}..."/>
                    </div>
                </div>
                <div class="form-group form-group-sm">
                    <label class="col-sm-4 control-label" for="bsColorButton">{{Couleur}}</label>
                    <div class="col-sm-8">
                        <select class="form-control" id="bsColorButton">
                            <option class="btn-primary" value="btn-primary">Primary</option>
                            <option class="btn-default" value="btn-default">default</option>
                            <option class="btn-success" value="btn-success">Success</option>
                            <option class="btn-info" value="btn-info">Info</option>
                            <option class="btn-warning" value="btn-warning">Warning</option>
                            <option class="btn-danger" value="btn-danger">Danger</option>
                        </select>               
                    </div>
                </div>
                <div class="form-group form-group-sm">
                    <label class="col-sm-4 control-label" for="bsDropdown">{{Sous-menu}}</label>
                    <div class="col-sm-8 control-group">
                        <div class="pull-left btn-group form-button" data-toggle="buttons">
                            <button class="btn btn-xs" type="button" id="bsDropdown" autocomplete="off">{{Oui}}</button>
                        </div>
                    </div>
                </div>
                <div class="form-group form-group-sm noPaddingLeft noPaddingRight" id="bsListDropdown" style="display: none;" >
                    <label class="col-sm-2 control-label" for="bsListDropdown0">{{Textes}}</label>
                    <div class="col-sm-10">
                        <div class="col-sm-2">
                            <button type="button" id="bsAddList" class="btn btn-sm btn-success " title="{{Ajouter un Sous Menu}}"><i class="fa fa-plus-circle"></i></button>
                        </div>
                        <div class="col-sm-10 noPaddingRight" id="addTextDropdown">
                        </div>
                        <div class="col-sm-2 noPaddingRight" id="addTextPlanId" style="display: none;">
                        </div>
                        <div class="col-sm-2 noPaddingRight" id="addTextDel" style="display: none;">
                        </div>
                    </div>
                </div>
                <div class="form-group form-group-sm" id="bsIdPlanDisplay" style="display: none;" >
                    <label class="col-sm-4 control-label" for="bsButtonIdPlan">{{Id du Plan}}</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="bsButtonIdPlan" placeholder="{{Plan}}..."/>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <input id="bsIdButton" hidden value=""/>
                <input id="bsIdDropdownLength" hidden value=""/>
                <button type="button" class="btn btn-danger" id="modalCancel">{{Annuler}}</button>
                <button type="button" class="btn btn-success" id="modalSave">{{Sauvegarder}}</button>
            </div>
        </div>
    </div>
</div>
<!--div class="modal fade" id="modalDeleteButton" tabindex="-1" role="dialog" aria-labelledby="modalDeleteButton" aria-hidden="true">
    <div class="modal-dialog" style="width:350px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Suppréssion d'un Bouton</h4>
            </div>
            <div class="modal-body">
                <div class="well col-sm-12">
                    <div class="col-sm-12 well">
                        <div class="col-sm-12" id="delButtonBar">
                        </div>
                    </div>
                    <div class="col-sm-12 well">
                        <div class="col-sm-12" id="delNavTabsBar">
                            <ul class="nav nav-tabs" id="delNavTabsBarItems">
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-12 well">
                        <div class="col-sm-12" id="delNavPillsBar">
                            <ul class="nav nav-pills" id="delNavPillsBarItems">
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <input id="bsIdDelButton" hidden value=""/>
                <button type="button" class="btn btn-success" id="modalDelCancel">Annuler</button>
                <button type="button" class="btn btn-danger" id="modalDelSave">Supprimer</button>
            </div>
        </div>
    </div>
</div-->
<div class="modal fade" id="modalInfoButton" tabindex="-1" role="dialog" aria-labelledby="modalInfoButton" aria-hidden="true">
    <div class="modal-dialog" style="width:650px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">{{Liens de l'image}}</h4>
            </div>
            <div class="modal-body">
                <div class="well col-sm-12">
                    <div class="form-group">
                        <label class="col-sm-2 control-label" for="bsURL">URL</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="bsURL" placeholder="Nom..."/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label" for="bsCSS">CSS</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="bsCSS" placeholder="Nom..."/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label" for="bsHTTP">HTTP</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="bsHTTP" placeholder="Nom..."/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modalImportButton" tabindex="-1" role="dialog" aria-labelledby="modalInfoButton" aria-hidden="true">
    <div class="modal-dialog" style="width:650px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Import</h4>
            </div>
            <div class="modal-body">
                <div class="well col-sm-12">
                    <div class="form-group">
                        <label class="col-sm-2 control-label" for="bsImport">Import</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" rows="5" id="bsImport"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" id="modalImportCancel">{{Annuler}}</button>
                <button type="button" class="btn btn-success" id="modalImportSave">{{Valider}}</button>
            </div>
        </div>
    </div>
</div>
<a id="bsFileExport" href="" style="display: none" target="_blank"></a>
<?php
include_file('desktop', 'globals', 'js', 'themes');
include_file('desktop', 'fonctions', 'js', 'themes');
include_file('desktop', 'details', 'js', 'themes');
include_file('desktop', 'cadres', 'js', 'themes');
include_file('desktop', 'themes', 'js', 'themes');
include_file('core', 'plugin.template', 'js');
?>


