$(document).ready(function() {

"use strict"
let students = [{
    nom: "Sebirou",
    Prenom: "Anne-Claire",
    age: 29,
    sexe : 'F',
    codePostal : 40150,
    ville: 'Soorts-Hossegor'
},{
    nom: "Huc",
    Prenom: "Vivien",
    age: 18,
    sexe : 'M',
    codePostal: 33185,
    ville: 'Le Haillan'
}, {
    nom: "de Barthez",
    Prenom: "Paul",
    age: 22,
    sexe : 'M'
},  {
    nom: "Mouat",
    Prenom: "Karl",
    age: 35,
    sexe : 'M'
}, {
    nom: "Bordais",
    Prenom: "Alexis",
    age: 34,
    sexe : 'M'
}, {
    nom: "Alary",
    Prenom: "Audrey",
    age: 23,
    sexe : 'F'
}, {
    nom: "Palacin",
    Prenom: "Sébastien",
    age: 27,
    sexe : 'M',
    codePostal : 31000,
    ville : 'Toulouse'
}, {
    nom: "Cisse",
    Prenom: "Ousmane",
    age: 34,
    sexe : 'M',
    codePostal: 44000,
    ville : 'Nantes'
}, {
    nom: "Gomez",
    Prenom: "Tony",
    age: 30,
    sexe : 'M',
    codePostal :33140,
    ville : "Villenave d'Ornon"
}, {
    nom: "Mourgues",
    Prenom: "Nans",
    age: 25,
    sexe : 'M'
}]

// age moyen should // be 27,7
// nom le plus long // should be "de Barthez"
// ordre alphabetique
// faire de l'ajax pour charger la liste des students qui eux seront contenu dans un fichier JSON

let totalAge = 0
let ageMoyen
let i
let longueurNom = 0;
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

ageMoyen = totalAge / students.length

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

pariteM = `${m*100/students.length} %`
pariteF = `${f*100/students.length} %`
// console.log(ageMoyen)
// console.log(nomLePlusLong)
// console.log(odreAlphabetique)
// console.log(pariteM, pariteF)

// creer vue HTML
// 1 page en Jquery, 1 en Native JS

// Vanilla Js

function showOnClick(v, w, x, y, z){
    v = document.createElement('div')
    v.innerHTML = w
    v.setAttribute('id', x)
    document.getElementById(y).appendChild(v).className = "hide"
    document.getElementById(z).addEventListener("click", function(){
        v.classList.toggle("show")
        v.classList.toggle("hide")
    })
}

showOnClick(parite, `${pariteF} / ${pariteM}`, 'afficheParite', 'parite', "buttonParite")
showOnClick(nomLong, `${nomLePlusLong}`, 'affichenomLong', 'nomLong', "buttonNomLong")
showOnClick(textMoyenne, `${ageMoyen}`, 'afficheAgeMoyen', 'moyenne', "buttonMoyenne")
for (i = 0; i < students.length; i++) {
    showOnClick(list, `${odreAlphabetique[i].nom} ${odreAlphabetique[i].Prenom}`, 'afficheList', 'list', "buttonList")
}

// jQuery
$('#QbuttonMoyenne').click(function(){
    $('#Qmoyenne').html(ageMoyen).toggleClass('hide')
})
$('#QbuttonNomLong').click(function(){
    $('#QnomLong').html(`${nomLePlusLong}`).toggleClass('hide')
})
$('#QbuttonParite').click(function(){
    $('#Qparite').html(`${pariteF} / ${pariteM}`).toggleClass('hide')
})

for (i = 0; i < students.length; i++) {
    $('#Qlist').append(`<li>${odreAlphabetique[i].nom} ${odreAlphabetique[i].Prenom}</li>`)
}
$('#QbuttonList').click(function(){
$('#Qlist').toggleClass('hide')
})


// AJAX
let html = ""
$.getJSON("ajax.json", function(json) {
    json.forEach(function(val) {
        html += `${"<li>"} ${val.nom} ${val.Prenom} ${"</li>"}`
    })
  $("#Qajax").append(html)
})
$("#QbuttonAjax").on("click", function() {
    $('#Qajax').toggleClass('hide')
})

let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: new google.maps.LatLng(45,2.6)
});
let geocoder = new google.maps.Geocoder();
geocodeAddress(geocoder, map);
let address
let contentString

function geocodeAddress(geocoder, resultsMap) {
    $.getJSON("ajax.json", function(json) {
        json.forEach(function(val) {
            address = val.ville
            contentString = `${val.nom} ${val.Prenom}`
            let infowindow = new google.maps.InfoWindow({
                content: contentString
            })
            geocoder.geocode({'address': address}, function(results) {
                let marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                })
                marker.addListener('click', function() {
                    infowindow.open(map, marker)
                    $(this).toggleClass('hide')
                })
            })
        })
    })
}


})
// Google API key : AIzaSyAx5FDqSbdMpU6pOR6B8hTide4bKWY-Fn4
