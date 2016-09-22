"use strict"

$(document).ready(function() {

// Tableau //

let students = [{
    nom: "Sebirou",
    Prenom: "Anne-Claire",
    age: 29,
    sexe : 'F',
    ville: "579 avenue de la bécasse, 40150, Soorts-Hossegor"
},{
    nom: "Huc",
    Prenom: "Vivien",
    age: 18,
    sexe : 'M',
    ville: "Le Haillan, 33185"
}, {
    nom: "de Barthez",
    Prenom: "Paul",
    age: 22,
    sexe : 'M',
    ville: "72 rue Henri IV, 33000, Bordeaux"
},  {
    nom: "Mouat",
    Prenom: "Karl",
    age: 35,
    sexe : 'M',
    ville: "81 rue de rivière, 33000, BORDEAUX"
}, {
    nom: "Bordais",
    Prenom: "Alexis",
    age: 34,
    sexe : 'M',
    ville: "18 rue Jean Paul Alaux, 33100, Bordeaux"
}, {
    nom: "Alary",
    Prenom: "Audrey",
    age: 23,
    sexe : 'F',
    ville: "21 rue rode, 33000, Bordeaux"
}, {
    nom: "Palacin",
    Prenom: "Sébastien",
    age: 27,
    sexe : 'M',
    ville : "36 rue des Tourneurs, 31000, Toulouse"
}, {
    nom: "Cisse",
    Prenom: "Ousmane",
    age: 34,
    sexe : 'M',
    ville : "Nantes, 44000"
}, {
    nom: "Gomez",
    Prenom: "Tony",
    age: 30,
    sexe : 'M',
    ville : "Villenave d'Ornon, 33140"
}, {
    nom: "Mourgues",
    Prenom: "Nans",
    age: 25,
    sexe : 'M',
    ville: "Santo-Pietro-di-Tenda, 20270"
}]

////////////////////// Algorithmie //////////////////////

let totalAge = 0
let ageMoyen
let i
let longueurNom = 0
let nomLePlusLong
let textMoyenne
let list
let sonNom
let ordreAl
let pariteM
let pariteF
let f = 0
let m = 0

for (i=0; i<students.length; i++){

    totalAge += students[i].age

    if(students[i].nom.length > longueurNom){
        longueurNom = students[i].nom.length;
        nomLePlusLong = students[i].nom;
    }

    if (students[i].sexe === "M"){
        m += 1
    }
    else{
        f += 1
    }
}

let odreAlphabetique = students.sort(function (a, b){
    if (a.nom.toUpperCase() > b.nom.toUpperCase()){
        return 1
    }
    else if (a.nom.toUpperCase() < b.nom.toUpperCase()){
        return -1
    }
    else{
        return 0
    }
})
ageMoyen = totalAge / students.length
pariteM = `${m*100/students.length} %`
pariteF = `${f*100/students.length} %`

////////////////////// Factorisation Affichage //////////////////////

// Vanilla Js //

function showOnClickJs(resultVariable, result, setId, resultId, resultbutton){
    resultVariable = document.createElement('div')
    resultVariable.innerHTML = result
    resultVariable.setAttribute('id', setId)
    document.getElementById(resultId).appendChild(resultVariable).className = "hide"
    document.getElementById(resultbutton).addEventListener("click", function(){
        resultVariable.classList.toggle("hide")
    })
}

showOnClickJs(parite, `${pariteF} / ${pariteM}`, 'afficheParite', 'parite', "buttonParite")
showOnClickJs(nomLong, `${nomLePlusLong}`, 'affichenomLong', 'nomLong', "buttonNomLong")
showOnClickJs(textMoyenne, `${ageMoyen}`, 'afficheAgeMoyen', 'moyenne', "buttonMoyenne")
for (i = 0; i < students.length; i++) {
    showOnClickJs(list, `${odreAlphabetique[i].nom} ${odreAlphabetique[i].Prenom}`, 'afficheList', 'list', "buttonList")
}

// jQuery //

function showOnClickJquery(QButtonId, QId, QResultat){
    $(QButtonId).click(function(){
        $(QId).html(QResultat).toggleClass('hide')
    })
}

showOnClickJquery('#QbuttonMoyenne', '#Qmoyenne', ageMoyen)
showOnClickJquery('#QbuttonNomLong', '#QnomLong', `${nomLePlusLong}`)
showOnClickJquery('#QbuttonParite', '#Qparite', `${pariteF} / ${pariteM}`)

for (i = 0; i < students.length; i++) {
    $('#Qlist').append(`<li>${odreAlphabetique[i].nom} ${odreAlphabetique[i].Prenom}</li>`)
}
$('#QbuttonList').click(function(){
    $('#Qlist').toggleClass('hide')
})

// AJAX //

let Qlist = ""
$.getJSON("student.json", function(json) {
    json.forEach(function(val) {
        Qlist += `${"<li>"} ${val.nom} ${val.Prenom} ${"</li>"}`
    })
    $("#Qajax").append(Qlist)

})
$("#QbuttonAjax").on("click", function() {
    $('#Qajax').toggleClass('hide')
})

// Geocoding //
// Google API key : AIzaSyAx5FDqSbdMpU6pOR6B8hTide4bKWY-Fn4

let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: new google.maps.LatLng(45,2.6)
});
let geocoder = new google.maps.Geocoder();
geocodeAddress(geocoder, map);
let address
let contentString

function geocodeAddress(geocoder, resultsMap) {
    $.getJSON("student.json", function(json) {
        json.forEach(function(val) {
            address = val.ville
            contentString = `${val.nom} ${val.Prenom}`
            let infowindow = new google.maps.InfoWindow({
                content: contentString
            })
            geocoder.geocode({'address': address}, function(results) {
                resultsMap.setCenter(results[0].geometry.location)
                let marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                })
                marker.addListener('click', function() {
                    infowindow.open(map, marker)
                })
            })
        })
    })
}


})
