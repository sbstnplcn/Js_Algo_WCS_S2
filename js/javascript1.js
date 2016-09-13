"use strict"
let students = [{
    nom: "Sebirou",
    Prenom: "Anne-Claire",
    age: 29,
    sexe : 'F'
},{
    nom: "Huc",
    Prenom: "Vivien",
    age: 18,
    sexe : 'M'
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
    sexe : 'M'
}, {
    nom: "Cisse",
    Prenom: "Ousmane",
    age: 34,
    sexe : 'M'
}, {
    nom: "Gomez",
    Prenom: "Tony",
    age: 30,
    sexe : 'M'
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
for (i=0; i<students.length; i++){
    if (students[i].sexe === "M"){
        m += 1
    }
    else{
        f += 1
    }
}
pariteM = `${m*100/students.length} %`
pariteF = `${f*100/students.length} %`
// console.log(ageMoyen)
// console.log(nomLePlusLong)
// console.log(odreAlphabetique)
// console.log(pariteM, pariteF)

// creer vue HTML
// 1 page en Jquery, 1 en Native JS

// Vanilla Js

let textMoyenne = document.createElement('div')
textMoyenne.innerHTML = `${ageMoyen}`
textMoyenne.setAttribute('id', 'afficheAgeMoyen')
document.getElementById('moyenne').appendChild(textMoyenne).className = "hide"
document.getElementById("buttonMoyenne").addEventListener("click", function(){
    textMoyenne.classList.toggle("show")
    textMoyenne.classList.toggle("hide")
})

let nomLong = document.createElement('div')
nomLong.innerHTML = `${nomLePlusLong}`
nomLong.setAttribute('id', 'affichenomLong')
document.getElementById('nomLong').appendChild(nomLong).className = "hide"
document.getElementById("buttonNomLong").addEventListener("click", function(){
    nomLong.classList.toggle("show")
    nomLong.classList.toggle("hide")
})

let parite = document.createElement('div')
parite.innerHTML = `${pariteF} / ${pariteM}`
parite.setAttribute('id', 'afficheParite')
document.getElementById('parite').appendChild(parite).className = "hide"
document.getElementById("buttonParite").addEventListener("click", function(){
    parite.classList.toggle("show")
    parite.classList.toggle("hide")
})

for (i = 0; i < students.length; i++) {
    let list = document.createElement('li')
    list.innerHTML = `${odreAlphabetique[i].nom} ${odreAlphabetique[i].Prenom}`
    list.setAttribute('id', 'afficheList')
    document.getElementById('list').appendChild(list).className = "hide"
    document.getElementById("buttonList").addEventListener("click", function(){
        list.classList.toggle("show")
        list.classList.toggle("hide")
})
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
