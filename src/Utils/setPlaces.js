
export default function setPlaces(places){
    const NONEXISTANT_PLACES = ["7-2D3","7-1D3","7-1D4","7-1D5","7-1D6","7-1D7","7-1D8","7-0D2","7-2G3","7-1G3","7-1G4","7-1G5","7-1G6","7-1G7","7-1G8","7-0G2"]
    const PONTONS = [1,2,3,4,5,6,7]
    const INITIAL_X_PONTONS = [null,1468,1130,908,713,535,359,187]
    const INITIAL_Y_PONTONS = [null,99,123,154,230,307,389,473]
    const PONTONS_GAP = [null,12,13,12,12,13,12,14]
    const defaultHeight = 12;
    const defaultWidtdh = 37;
    var newPlaces=[];
    var allNewPlaces = [];
    var ponton = 2;
    var yVar = defaultHeight + 1;
    
    // LOOP BEGINS HERE
    for(var ponton of PONTONS){    
        var currentY = INITIAL_Y_PONTONS[ponton]

        // PLACES A Droite
        const regexpD = new RegExp(`(${ponton}\\-\\d+[D]\\d+)`,'g')
        places.map(p=>{
            if(p.NOM.match(regexpD) && !doesContain(newPlaces,p) && !NONEXISTANT_PLACES.includes(p.NOM)){
                newPlaces.unshift(p)
            }
        })
        var groupIndex = parseInt(/-(\d+)[GD]/.exec(newPlaces.sort(sortByName()).reverse()[0].NOM)[1])
        newPlaces.sort(sortByName()).reverse().forEach(newPlace =>{
            newPlace.WIDTH = defaultWidtdh;
            newPlace.X = INITIAL_X_PONTONS[ponton]
            if(ponton != 1){
                newPlace.HEIGHT = defaultHeight;
                if(parseInt(/-(\d+)[GD]/.exec(newPlace.NOM)[1])<groupIndex){
                    currentY = currentY + PONTONS_GAP[ponton];
                    groupIndex = parseInt(/-(\d+)[GD]/.exec(newPlace.NOM)[1]);
                }
                newPlace.Y = currentY;
                currentY = currentY + yVar;
            }else{
                newPlace.HEIGHT = /-(\d+)[GD]/.exec(newPlace.NOM)[1] != 5 ? defaultHeight*2 : 88 ;
                if(parseInt(/-(\d+)[GD]/.exec(newPlace.NOM)[1])<groupIndex){
                    currentY = /-(\d+)[GD]/.exec(newPlace.NOM)[1] != 4 ? currentY + PONTONS_GAP[ponton] : currentY + PONTONS_GAP[ponton] + 2;
                    groupIndex = parseInt(/-(\d+)[GD]/.exec(newPlace.NOM)[1]);
                }
                newPlace.Y = currentY;
                currentY = /-(\d+)[GD]/.exec(newPlace.NOM)[1] != 5 ? currentY + yVar*2 : currentY + 89;
            }
            
        })
        Array.prototype.push.apply(allNewPlaces,newPlaces)
        // places à droite placées

        // PLACES à gauche
        if(ponton === 1){
            var currentY = INITIAL_Y_PONTONS[ponton]
            newPlaces = []
            continue;
        }else{
            var currentY = INITIAL_Y_PONTONS[ponton]
            newPlaces = []
            const regexpG = new RegExp(`(${ponton}\\-\\d+[G]\\d+)`,'g')
            places.map(p=>{
                if(p.NOM.match(regexpG) && !doesContain(newPlaces,p) && !NONEXISTANT_PLACES.includes(p.NOM)){
                    newPlaces.unshift(p)
                }
            })
            var groupIndex = parseInt(/-(\d+)[GD]/.exec(newPlaces.sort(sortByName()).reverse()[0].NOM)[1])
            newPlaces.sort(sortByName()).reverse().forEach(newPlace =>{
                newPlace.HEIGHT = ponton != 2 ? defaultHeight:defaultHeight*2;
                newPlace.WIDTH = defaultWidtdh;
                newPlace.ANGLE = 180;
                newPlace.X = ponton != 2 ? INITIAL_X_PONTONS[ponton] + 57 : INITIAL_X_PONTONS[ponton] + 59;
                if(parseInt(/-(\d+)[GD]/.exec(newPlace.NOM)[1])<groupIndex){
                    currentY = currentY + PONTONS_GAP[ponton];
                    groupIndex = parseInt(/-(\d+)[GD]/.exec(newPlace.NOM)[1]);
                }
                newPlace.Y = currentY;
                currentY = ponton != 2 ? currentY + yVar : currentY + 1.96*yVar;
            })
            Array.prototype.push.apply(allNewPlaces,newPlaces)
            // Places à gauche placées


            // PLACES EN HAUT
        if(ponton === 1){
            var currentY = INITIAL_Y_PONTONS[ponton]
            newPlaces = []
            continue;
        }else{
            var currentY = INITIAL_Y_PONTONS[ponton]
            newPlaces = []
            const regexpG = new RegExp(`(${ponton}GD)`,'g')
            places.map(p=>{
                if(p.NOM.match(regexpG) && !doesContain(newPlaces,p) && !NONEXISTANT_PLACES.includes(p.NOM)){
                    newPlaces.unshift(p)
                }
            })
            console.log(ponton,newPlaces)
            newPlaces.sort(sortByName()).reverse().forEach(newPlace =>{
                newPlace.HEIGHT = defaultHeight;
                newPlace.WIDTH = defaultWidtdh*2 + 19;
                newPlace.X = INITIAL_X_PONTONS[ponton] + 1;
                newPlace.Y = currentY - 28;
                currentY = currentY + yVar;
            })
            Array.prototype.push.apply(allNewPlaces,newPlaces)
            // Places EN HAUT Placées
            newPlaces= [];
        }
        }
    }
    // LOOP ENDS HERE
    console.log(newPlaces)
    var pPlaces = [ {
        ID: 10001,
        ANGLE: 4,
        HEIGHT: 100,
        NOM: "P1",
        "POIDS_MAX": 0,
        WIDTH: 20,
        X: 1317,
        Y: 1075,
        "BASSIN": "BAF",
        "GROUPE_PLACE_ID": 993,
        "PONTON": "P3",
        "QUAI": "Q1",
        "TYPE_PLACE": "",
        "COLUMN14": "",
        "DATE_DEBUT_DESACTIVATION": "",
        "DATE_FIN_DESACTIVATION": "",
        "IS_ACTIVE": 1
      },{
        ID: 10002,
        ANGLE: 4,
        HEIGHT: 100,
        NOM: "P2",
        "POIDS_MAX": 0,
        WIDTH: 20,
        X: 1296,
        Y: 1073,
        "BASSIN": "BAF",
        "GROUPE_PLACE_ID": 993,
        "PONTON": "P3",
        "QUAI": "Q1",
        "TYPE_PLACE": "",
        "COLUMN14": "",
        "DATE_DEBUT_DESACTIVATION": "",
        "DATE_FIN_DESACTIVATION": "",
        "IS_ACTIVE": 1
      },{
        ID: 10003,
        ANGLE: 4,
        HEIGHT: 100,
        NOM: "P3",
        "POIDS_MAX": 0,
        WIDTH: 20,
        X: 1275,
        Y: 1072,
        "BASSIN": "BAF",
        "GROUPE_PLACE_ID": 993,
        "PONTON": "P3",
        "QUAI": "Q1",
        "TYPE_PLACE": "",
        "COLUMN14": "",
        "DATE_DEBUT_DESACTIVATION": "",
        "DATE_FIN_DESACTIVATION": "",
        "IS_ACTIVE": 1
      }]
      Array.prototype.push.apply(allNewPlaces,pPlaces)
    return allNewPlaces;
}

function sortByName(){
    return function(a,b){
        if(parseInt(/-(\d+)[GD]/.exec(a.NOM)[1]) < parseInt(/-(\d+)[GD]/.exec(b.NOM)[1])){
            return -1;
        }else{
            if(parseInt(/-(\d+)[GD]/.exec(a.NOM)[1]) > parseInt(/-(\d+)[GD]/.exec(b.NOM)[1])){
                return 1;
            }else{
                if(parseInt(/[GD](\d+)/.exec(a.NOM)[1]) < parseInt(/[GD](\d+)/.exec(b.NOM)[1])){
                    return -1
                }else{
                    if(parseInt(/[GD](\d+)/.exec(a.NOM)[1]) > parseInt(/[GD](\d+)/.exec(b.NOM)[1])){
                        return 1;
                    }else{
                        return 0;
                    }
                }
            }
        }
    }
}

function doesContain(arr, obj){
    var isPresent = false;
    arr.forEach(arrElement=>{
        if(arrElement.NOM === obj.NOM){
            isPresent = true;
        }
    })
    return isPresent;
}