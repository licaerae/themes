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

/* * ***************************Includes********************************* */
require_once dirname(__FILE__) . '/../../../../core/php/core.inc.php';

class themes extends eqLogic {

    public static function listFonts() {
        return  ls(dirname(__FILE__) . '/../uploads/fonts');
    }

    public static function listImages($dir = "") {
        if ($dir == "") {
            $uploaddir = dirname(__FILE__) . '/../uploads/images';
        }
        else {
            $uploaddir = dirname(__FILE__) . '/../uploads/images/' . $dir;
        }
        return  ls($uploaddir, "*", false, array('files'));
    }

    public static function listCategories() {
        return  ls(dirname(__FILE__) . '/../uploads/images', "*", false, array('folders'));
    }

    public static function removeImage($name, $dir = "") {
         if ($dir == "") {
            $uploaddir = dirname(__FILE__) . '/../uploads/images/';
         }
        else {
            $uploaddir = dirname(__FILE__) . '/../uploads/images/' . $dir . '/';
        }
       return unlink($uploaddir . $name);
    }

    public static function removeFont($name) {
        return unlink(dirname(__FILE__) . '/../uploads/fonts/' . $name);
    }

    /*     * *********************Methode d'instance************************* */

    public function preInsert() {
    }

    public function postInsert() {
    }

    public function preSave() {
    }

    public function postSave() {
    }

    public function preUpdate() {
    }

    public function postUpdate() {
    }

    public function preRemove() {
    }

    public function postRemove() {
    }

    public function toHtml($_version = 'dashboard') {
        if ($this->getIsEnable() != 1) {
            return '';
        }
        //$_version = jeedom::versionAlias($_version);
        /*$mc = cache::byKey('ThemesWidget' . $_version . $this->getId());
        if ($mc->getValue() != '') {
            return $mc->getValue();
        }*/
        $bsMyCadre = json_decode($this->getConfiguration('bsMyCadre'));
        $replace = array();
        $replace['#name#'] = $this->getName();
        $replace['#idPrincipale#'] = $bsMyCadre;
        $replace += array(
            '#id#' => $this->getId(),
            '#background_color#' => $this->getBackgroundColor($_version),
            '#eqLink#' => $this->getLinkToConfiguration(),
        );

        if ($this->getIsEnable()) {
            foreach ($this->getCmd(null, null, true) as $cmd) {
                if ($cmd->getDisplay('forceReturnLineBefore', 0) == 1) {
                    $cmd_html .= '<br/>';
                }
                $cmd_html .= $cmd->toHtml($_version, '', $cmdColor);
                if ($cmd->getDisplay('forceReturnLineAfter', 0) == 1) {
                    $cmd_html .= '<br/>';
                }
            }
        }

        if (($_version == 'dview' || $_version == 'mview') && $this->getDisplay('doNotShowObjectNameOnView', 0) == 0) {
            $object = $this->getObject();
            $replace['#object_name#'] = (is_object($object)) ? '(' . $object->getName() . ')' : '';
        } else {
            $replace['#object_name#'] = '';
        }
        if (($_version == 'dview' || $_version == 'mview') && $this->getDisplay('doNotShowNameOnView') == 1) {
            $replace['#name#'] = '';
        }
        if (($_version == 'mobile' || $_version == 'dashboard') && $this->getDisplay('doNotShowNameOnDashboard') == 1) {
            $replace['#name#'] = '';
        }
        if (($_version == 'dview' || $_version == 'mview') && $this->getDisplay('doNotDisplayBatteryLevelOnView') == 1) {
            $replace['#battery#'] = -1;
        }
        if ($_version == 'dashboard' && $this->getDisplay('doNotDisplayBatteryLevelOnDashboard') == 1) {
            $replace['#battery#'] = -1;
        }
        $parameters = $this->getDisplay('parameters');
        if (is_array($parameters)) {
            foreach ($parameters as $key => $value) {
                $replace['#' . $key . '#'] = $value;
            }
        }

        $html = template_replace($replace, getTemplate('core', $_version, 'current', 'themes'));
        //cache::set('ThemesWidget' . $_version . $this->getId(), $html, 0);
        return $html;
    }

    /*     * **********************Getteur Setteur*************************** */
}

class themesCmd extends cmd {
    /*     * *************************Attributs****************************** */


    /*     * ***********************Methode static*************************** */


    /*     * *********************Methode d'instance************************* */

    /*
     * Non obligatoire permet de demander de ne pas supprimer les commandes meme si elle ne sont pas dans la nouvelle configuration de l'équipement envoyé en JS
      public function dontRemoveCmd() {
      return true;
      }
     */
    public function execute($_options = array()) {
        return false;
    }
    /*     * **********************Getteur Setteur*************************** */
}

?>
