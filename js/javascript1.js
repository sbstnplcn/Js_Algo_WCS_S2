let students = [{
    nom: "Sebirou",
    Prenom: "Anne-Claire",
    age: 29
},{
    nom: "Huc",
    Prenom: "Vivien",
    age: 18
}, {
    nom: "de Barthez",
    Prenom: "Paul",
    age: 22
},  {
    nom: "Mouat",
    Prenom: "Karl",
    age: 35
}, {
    nom: "Bordais",
    Prenom: "Alexis",
    age: 34
}, {
    nom: "Alary",
    Prenom: "Audrey",
    age: 23
}, {
    nom: "Palacin",
    Prenom: "Sébastien",
    age: 27
}, {
    nom: "Cisse",
    Prenom: "Ousmane",
    age: 34
}, {
    nom: "Gomez",
    Prenom: "Tony",
    age: 30
}, {
    nom: "Mourgues",
    Prenom: "Nans",
    age: 25
}]

// age moyen should // be 27,7
// nom le plus long // should be "de Barthez"
// ordre alphabetique

let totalAge = 0
let ageMoyen
let i
let longueurNom = 0;
let nomLePlusLong
let sonNom

for (i=0; i<students.length; i++){

    totalAge += students[i].age

    if(students[i].nom.length > longueurNom){
        longueurNom = students[i].nom.length;
        nomLePlusLong = students[i].nom;
        prenomNomLePlusLong = students[i].Prenom
    }

    function ordreAl(a, b){
        if (a.nom > b.nom){
            return 1
        }
        else if (a.nom < b.nom){
            return -1
        }
        else{
            return 0
        }
    }
}

ageMoyen = totalAge / students.length

let odreAlphabetique = students.sort(ordreAl)

// console.log(ageMoyen)
// console.log(nomLePlusLong)
// console.log(odreAlphabetique)
// console.log(prenomNomLePlusLong)

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
nomLong.innerHTML = `${prenomNomLePlusLong} ${nomLePlusLong}`
nomLong.setAttribute('id', 'affichenomLong')
document.getElementById('nomLong').appendChild(nomLong).className = "hide"
document.getElementById("buttonNomLong").addEventListener("click", function(){
    nomLong.classList.toggle("show")
    nomLong.classList.toggle("hide")
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
