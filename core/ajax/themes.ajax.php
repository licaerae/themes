<?php

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
 */

try {
    require_once dirname(__FILE__) . '/../../../../core/php/core.inc.php';
    include_file('core', 'authentification', 'php');

    if (!isConnect('admin')) {
        throw new Exception(__('401 - Accès non autorisé', __FILE__));
    }

    if (init('action') == 'listFont') {
        $uploaddir = dirname(__FILE__) . '/../uploads/fonts';
        if (!file_exists($uploaddir)) {
            mkdir($uploaddir);
        }
        if (!file_exists($uploaddir)) {
            throw new Exception(__('Répertoire d\'upload de fonts non trouvé : ', __FILE__) . $uploaddir);
        }
        ajax::success(themes::listFonts());
    }

    if (init('action') == 'listImage') {
        $uploaddir = dirname(__FILE__) . '/../uploads/images';
        if (!file_exists($uploaddir)) {
            mkdir($uploaddir);
        }
        if (!file_exists($uploaddir)) {
            throw new Exception(__('Répertoire d\'upload d\'images non trouvé : ', __FILE__) . $uploaddir);
        }
        ajax::success(themes::listImages());
    }

    if (init('action') == 'listCategory') {
        $uploaddir = dirname(__FILE__) . '/../uploads/images/' . init('category');
        if (!file_exists($uploaddir)) {
            throw new Exception(__('Répertoire d\'upload d\'images non trouvé : ', __FILE__) . $uploaddir);
        }
        ajax::success(themes::listImages(init('category')));
    }

    if (init('action') == 'listCategories') {
        $uploaddir = dirname(__FILE__) . '/../uploads/images';
        if (!file_exists($uploaddir)) {
            throw new Exception(__('Répertoire d\'upload d\'images non trouvé : ', __FILE__) . $uploaddir);
        }
        ajax::success(themes::listCategories());
    }

    if (init('action') == 'addCategory') {
        $dir = init('category');
        if( $dir == "") {
                throw new Exception(__('Nom de catégorie vide', __FILE__));
        }
        $uploaddir = dirname(__FILE__) . '/../uploads/images/' . $dir;
        if (!file_exists($uploaddir)) {
            mkdir($uploaddir);
        }
        if (!file_exists($uploaddir)) {
            throw new Exception(__('Impossible de créer la catégorie : ', __FILE__) . $dir);
        }
        ajax::success();
    }

    if (init('action') == 'removeCategory') {
        $dir = init('category');
        if( $dir == "") {
                throw new Exception(__('Nom de catégorie vide', __FILE__));
        }
        $uploaddir = dirname(__FILE__) . '/../uploads/images/' . $dir;
        $list = themes::listImages($dir);
        if(count($list) > 0) {
                throw new Exception(__('Cette catégorie contient encore des images ', __FILE__) . json_encode($list));
        }
        if (file_exists($uploaddir)) {
            rmdir($uploaddir);
        }
        if (file_exists($uploaddir)) {
            throw new Exception(__('Impossible d\'éffacer la catégorie : ', __FILE__) . init('category'));
        }
        ajax::success();
    }

    if (init('action') == 'getCategory') {
        $uploaddir = dirname(__FILE__) . '/../uploads/images/' . init('category');
        if (!file_exists($uploaddir)) {
            throw new Exception(__('Répertoire d\'upload d\'images non trouvé : ', __FILE__) . $uploaddir);
        }
        ajax::success(themes::listImages(init('category')));
    }

    if (init('action') == 'removeImage') {
        if (!themes::removeImage(init('image'), init('category'))) {
            throw new Exception(__('Impossible d\'éffacer l\'image : ', __FILE__) . init('image'));
        }
        ajax::success();
    }

    if (init('action') == 'removeFont') {
        if (!themes::removeFont(init('font'))) {
            throw new Exception(__('Impossible d\'éffacer la Font : ', __FILE__) . init('font'));
        }
        ajax::success();
    }

    if (init('action') == 'imageUpload') {
        $dir = init('category');
        if ($dir == "") {
            $uploaddir = dirname(__FILE__) . '/../uploads/images';
        }
        else {
            $uploaddir = dirname(__FILE__) . '/../uploads/images/' . $dir;
        }
        if (!file_exists($uploaddir)) {
            mkdir($uploaddir);
        }
        if (!file_exists($uploaddir)) {
            throw new Exception(__('Répertoire d\'upload non trouvé : ', __FILE__) . $uploaddir);
        }
        if (!isset($_FILES['images'])) {
            throw new Exception(__('Aucun fichier trouvé. Vérifié parametre PHP (post size limit)', __FILE__));
        }
        $extension = strtolower(strrchr($_FILES['images']['name'], '.'));
        if (!in_array($extension, array('.png','.jpg'))) {
            throw new Exception('Seul les images sont accepté (autorisé .jpg .png) : ' . $extension);
        }
        if (filesize($_FILES['images']['tmp_name']) > 8000000) {
            throw new Exception(__('Le fichier est trop gros (maximum 8mo)', __FILE__));
        }
        if (!move_uploaded_file($_FILES['images']['tmp_name'], $uploaddir . '/' . $_FILES['images']['name'])) {
            throw new Exception(__('Impossible de déplacer le fichier temporaire', __FILE__));
        }
        if (!file_exists($uploaddir . '/' . $_FILES['images']['name'])) {
            throw new Exception(__('Impossible d\'uploader le fichier (limite du serveur web ?)', __FILE__));
        }
        ajax::success();
    }

    if (init('action') == 'fontUpload') {
        $uploaddir = dirname(__FILE__) . '/../uploads/fonts';
        if (!file_exists($uploaddir)) {
            $result = mkdir($uploaddir);
        }
        if (!file_exists($uploaddir)) {
            throw new Exception(__('Répertoire d\'upload non trouvé : ', __FILE__) . ' ' . $result);
        }
        if (!isset($_FILES['fonts'])) {
            throw new Exception(__('Aucun fichier trouvé. Vérifié parametre PHP (post size limit)', __FILE__));
        }
        $extension = strtolower(strrchr($_FILES['fonts']['name'], '.'));
        if (!in_array($extension, array('.ttf','.woff'))) {
            throw new Exception('Seul les fonts True Type et Web Open Font Format sont accepté (autorisé .ttf,.woff) : ' . $extension);
        }
        if (filesize($_FILES['fonts']['tmp_name']) > 1000000) {
            throw new Exception(__('Le fichier est trop gros (maximum 1mo)', __FILE__));
        }
        if (!move_uploaded_file($_FILES['fonts']['tmp_name'], $uploaddir . '/' . $_FILES['fonts']['name'])) {
            throw new Exception(__('Impossible de déplacer le fichier temporaire', __FILE__) . json_encode($_FILES));
        }
        if (!file_exists($uploaddir . '/' . $_FILES['fonts']['name'])) {
            throw new Exception(__('Impossible d\'uploader le fichier (limite du serveur web ?)', __FILE__));
        }
        ajax::success();
    }

    if (init('action') == 'themeImport') {
       if (!isset($_FILES['themes'])) {
            throw new Exception(__('Aucun fichier trouvé. Vérifié parametre PHP (post size limit)', __FILE__));
        }
        $extension = strtolower(strrchr($_FILES['themes']['name'], '.'));
        if (!in_array($extension, array('.thm'))) {
            throw new Exception('Seul les fichiers thèmes sont accepté (autorisé .thm) : ' . $extension);
        }
        if (filesize($_FILES['themes']['tmp_name']) > 500000) {
            throw new Exception(__('Le fichier est trop gros (maximum 500Ko)', __FILE__));
        }
        ajax::success(file_get_contents($_FILES['themes']['tmp_name']));
    }

    throw new Exception(__('Aucune methode correspondante à : ', __FILE__) . init('action'));
    /*     * *********Catch exeption*************** */
} catch (Exception $e) {
    ajax::error(displayExeption($e), $e->getCode());
}
?>
