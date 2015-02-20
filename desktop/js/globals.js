/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var jeedomCategories;

var initThemes = false;
var whichView = "";
var sortButtonShow = false;
var showAnimSvg = true;

var hexDigits = new Array ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

var positions = {
    0: {x: {0: 'x', 1: 'x1'}, y: {0: 'y', 1: 'y1'}},
    1: {x: {0: 'x2', 1: 'x1'}, y: {0: 'y2', 1: 'y1'}},
    2: {x: {0: 'x2', 1: 'x1'}, y: {0: 'y2', 1: 'y1'}},
    3: {x: {0: 'x2', 1: 'x'}, y: {0: 'y2', 1: 'y'}}
};

var myTheme = {};
myTheme.myCadre = "";
myTheme.globalPlanId = [];
myTheme.myColors = [];
myTheme.myButtons = [];
myTheme.myDropdowns = [];

var myButtonsDesign = {
    objects: [],
    inc : 0,
    add: function (style, image, params) {
        this.objects.push({'id': this.inc, 'style': style, 'image': image, 'params': params});
        this.inc++;
    },
    reset: function () {
        this.objects = [];
        this.inc = 0;
    },
    indexOf: function (id) {
        if (is_string(id))
            id = parseInt(id);
        for (var index in this.objects) {
            if (this.objects[index].id === id)
                return parseInt(index);
        }
        return false;
    },
    search: function (id) {
        if (is_string(id))
            id = parseInt(id);
        for (var index in this.objects) {
            if (this.objects[index].id === id)
                return this.objects[index];
        }
        return false;
    },
    remove: function (id) {
        if (is_string(id))
            id = parseInt(id);
        for (var index in this.objects) {
            if (this.objects[index].id === id) {
                if (this.objects.splice(index, 1).length !== 0)
                    return this.objects.length;
                else
                    return false;
            }
        }
        return false;
    }
};
 
var secondaryPages = {
    objects: [],
    reset: function () {
        this.objects = [];
    },
    check: function () {
        for (var idButton = 0; idButton < myTheme.myButtons.length; idButton++) {
            if (myTheme.myDropdowns[idButton] === "") {
                if (myTheme.globalPlanId[idButton] !== "")
                    this.update(myTheme.globalPlanId[idButton], myTheme.myButtons[idButton]);
            }
            else {
                for (var index = 0; index < myTheme.myDropdowns[idButton].length; index++) {
                    if (myTheme.globalPlanId[idButton][index] !== "")
                        this.update(myTheme.globalPlanId[idButton][index], myTheme.myDropdowns[idButton][index]);
                }
            }
        }
        for(var index = 0; index < this.objects.length; index++) {
            var check = false;
            for(var indexDrop = 0; indexDrop < myTheme.myButtons.length; indexDrop++) {
                if(myTheme.myDropdowns[indexDrop].indexOf(this.objects[index].text) !== -1) {
                    check = true;
                }
            }
            if(myTheme.myButtons.indexOf(this.objects[index].text) !== -1) {
                check = true;
            }
            if (!check)
                this.objects[index].id = -1;
        }
        var stop = false;
        do {
            stop = this.remove(-1);
       }while(stop !== false)
    },
    indexOf: function (id) {
        if (is_string(id))
            id = parseInt(id);
        for (var index in this.objects) {
            if (this.objects[index].id === id)
                return parseInt(index);
        }
        return false;
    },
    search: function (id) {
        if (is_string(id))
            id = parseInt(id);
        for (var index in this.objects) {
            if (this.objects[index].id === id)
                return this.objects[index];
        }
        return false;
    },
    searchCadre: function (id, idCadre) {
        if (is_string(id))
            id = parseInt(id);
        if (is_string(idCadre))
            idCadre = parseInt(idCadre);
        var index = this.indexOf(id);
        if (index !== false) {
            for (var i in this.objects[index].cadres) {
                if (this.objects[index].cadres[i].id === idCadre)
                    return this.objects[index].cadres[i];
            }
            return false;
        }
    },
    searchSvg: function (id, idSvg) {
        if (is_string(id))
            id = parseInt(id);
        if (is_string(idSvg))
            idSvg = parseInt(idSvg);
        var index = this.indexOf(id);
        if (index !== false) {
            for (var i in this.objects[index].svg) {
                if (this.objects[index].svg[i].id === idSvg)
                    return this.objects[index].svg[i];
            }
            return false;
        }
    },
    find: function (text) {
        for (var index in this.objects) {
            if (this.objects[index].text === text)
                return this.objects[index];
        }
        return false;
    },
    add: function (id, text) {
        if (is_string(id))
            id = parseInt(id);
        var index = this.indexOf(id);
        if (index === false)
            return this.objects.push({'id': id, 'text': text, 'inc': 0, 'cadres': [], 'svg': []});
    },
    update: function (id, text) {
        if (is_string(id))
            id = parseInt(id);
        for (var index in this.objects) {
            if (this.objects[index].id === id) {
                this.objects[index].text = text;
            }
        }
        return false;
    },
    remove: function (id) {
        if (is_string(id))
            id = parseInt(id);
        for (var index in this.objects) {
            if (this.objects[index].id === id) {
                if (this.objects.splice(index, 1).length !== 0)
                    return this.objects.length;
                else
                    return false;
            }
        }
        return false;
    },
    cadre: function (id, cadre) {
        if (is_string(id))
            id = parseInt(id);
        var index = this.indexOf(id);
        if (index !== false) {
            var idCadre = this.objects[index].inc;
            this.objects[index].cadres.push({'id': idCadre, 'cadre': cadre});
            this.objects[index].inc++;
            return idCadre;

        }
        return false;
    },
    svg: function (id, cadre, svg) {
        if (is_string(id))
            id = parseInt(id);
        var index = this.indexOf(id);
        if (index !== false) {
            var idSvg = this.objects[index].inc;
            this.objects[index].svg.push({'id': idSvg, 'svg': svg, 'cadre': cadre});
            this.objects[index].inc++;
            return idSvg;
        }
        return false;
    },
    nbCadres: function (id) {
        if (is_string(id))
            id = parseInt(id);
        var index = this.indexOf(id);
        return this.objects[index].cadres.length;

    },
    nbSvg: function (id) {
        if (is_string(id))
            id = parseInt(id);
        var index = this.indexOf(id);
        return this.objects[index].svg.length;

    },
    resetCadres: function (id) {
        if (is_string(id))
            id = parseInt(id);
        var index = this.indexOf(id);
        if (index !== false) {
            this.objects[index].cadres = [];
            this.objects[index].svg = [];
            this.objects[index].inc = 0;
        }
        else
            return false;
    },
    removeCadre: function (id, idCadre) {
        if (is_string(id))
            id = parseInt(id);
        if (is_string(idCadre))
            idCadre = parseInt(idCadre);
        var index = this.indexOf(id);
        if (index !== false) {
            for (var i in this.objects[index].cadres) {
                if (this.objects[index].cadres[i].id === idCadre)
                    return (this.objects[index].cadres.splice(i, 1).length !== 0);
            }
        }
        return false;
    },
    removeSvg: function (id, idSvg) {
        if (is_string(id))
            id = parseInt(id);
        if (is_string(idSvg))
            idSvg = parseInt(idSvg);
        var index = this.indexOf(id);
        if (index !== false) {
            for (var i in this.objects[index].svg) {
                if (this.objects[index].svg[i].id === idSvg)
                    return (this.objects[index].svg.splice(i, 1).length !== 0);
            }
        }
        return false;
    },
    updateCadre: function (id, idCadre, cadre) {
        if (is_string(id))
            id = parseInt(id);
        if (is_string(idCadre))
            idCadre = parseInt(idCadre);
        var index = this.indexOf(id);
        if (index !== false) {
            for (var i in this.objects[index].cadres) {
                if (this.objects[index].cadres[i].id === idCadre) {
                    this.objects[index].cadres[i].cadre = cadre;
                    return this.objects[index].cadres[i];
                }
            }
        }
        return false;
    },
    updateSvg: function (id, idSvg, svg) {
        if (is_string(id))
            id = parseInt(id);
        if (is_string(idSvg))
            idSvg = parseInt(idSvg);
        var index = this.indexOf(id);
        if (index !== false) {
            for (var i in this.objects[index].svg) {
                if (this.objects[index].svg[i].id === idSvg) {
                    this.objects[index].svg[i].svg = svg;
                    return this.objects[index].svg[i];
                }
            }
        }
        return false;
    },
    json: function () {
        for (var nbObj in this.objects) {
            for (var nbSvg in this.objects[nbObj].svg) {
                var temp = [];
                for (var nbGroup = 0; nbGroup < 5; nbGroup++) {
                    temp.push(this.objects[nbObj].svg[nbSvg].svg[nbGroup].toString());
                }
                this.objects[nbObj].svg[nbSvg].svg = temp;
            }
        }
        return JSON.stringify(this.objects);
    },
    parse: function (data) {
        if (isset(data)) {
            this.objects = JSON.parse(data);
        }
        else
            this.objects = [];
    }
};

function checkSecondaryPage() {
    for(var index = 0; index < myTheme.myButtons.length; index++) {
        
    }
}


