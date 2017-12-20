$(document).ready(function() {
    // TODO: generer persos
    initPerso();
});

// var persos = require('json/persos.json');

function initPerso() {
    $.each(roaster, function(id, perso) {
        $("#roaster").append(generateDivPerso(perso));
    });
}

function generateDivPerso(perso) {
    console.log(perso);
    var divPerso = '<div class="perso">';
    divPerso += '<img src="img/perso/' + perso.name.replace(/\s+/g, '_') + '.png' + '" alt="' + perso.name + '">';
    divPerso += '<p class="name">' + perso.name + '</p>';
    return divPerso + '</div>'
}