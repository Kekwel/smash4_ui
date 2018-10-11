$(document).ready(function() {
    // TODO: generer persos
    /* TODO Creer commentaires */

    //    test1();
    initRows();
});

function readFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('.upload-demo').addClass('ready');
            $uploadCrop.croppie('bind', {
                url: e.target.result
            }).then(function() {
                /*  console.log('jQuery bind complete');*/
            });

        }

        reader.readAsDataURL(input.files[0]);
    } else {
        swal("Sorry - you're browser doesn't support the FileReader API");
    }
}

function initPerso() {
    $.each(roaster, function(id, perso) {
        $("#roster").append(generateDivPerso(perso));
    });
}

/*function generateDivPerso(perso) {
    var divPerso = '<div class="perso">';
    divPerso += '<img src="img/perso/' + perso.name.replace(/\s+/g, '_').toLowerCase() + '.png' + '" alt="' + perso.name + '">';
    divPerso += '<p class="name">' + perso.name + '</p>';
    return divPerso + '</div>'
}*/
function generateDivPerso(perso) {
    var divPerso = '<div class="perso">';
    // divPerso += '<img class="moving-bg" src="img/fond_css.png"></img>';
    divPerso += '<img class="image-perso" src="img/perso/' + perso.replace(/\s+/g, '_').toLowerCase() + '.png' + '" alt="' + perso + '">';
    // divPerso += '<div class="black-box"><span class="name">' + perso + '</span></div>';
    divPerso += '<div class="name">' + perso + '</div>';
    // divPerso += '<div class="name"><span class="black-border">' + perso + '</span></div>';
    return divPerso + '</div>'
}

function test1() {
    initPerso();

    $uploadCrop = $('#crop-perso').croppie({
        enableExif: true,
        viewport: {
            width: 196,
            height: 106
        },
        boundary: {
            width: 300,
            height: 300
        }

    });

    $('#valide_perso').hide();

    $('#upload').on('change', function() {
        readFile(this);
    });

    $('#upload_result').on('click', function(ev) {
        $uploadCrop.croppie('result', {
            type: 'canvas',
            size: 'viewport'
        }).then(function(resp) {
            var nom = $('#perso_name').val();
            var img = $('<img id="tmp_upload">');

            img.attr('src', resp);

            $('#tmp_upload').replaceWith(img);

            $('#tmp_name').text(nom);

            $('#valide_perso').show();
        });
    });

    $('#valide_perso').on('click', function(ev) {
        var nom = $('#perso_name').val();
        var newP = $('<p class="name">');
        newP.text(nom);

        var image = $('#tmp_upload').clone();

        console.log('VALIDE ');

        var newDiv = $('<div class="perso">');
        newDiv.append(image);
        newDiv.append(newP);

        $('#roaster').append(newDiv);

        $('#tmp_name').text('');
        $('#tmp_upload').removeAttr('src');
        $('#valide_perso').hide();
    });
}

function initRows() {
    $.each(rows, function(i, row) {
        var divRow = $('<div id="row' + i + '" class="row">')
        divRow.append('<div class="black-bar"></div>');
        $.each(row, function(j, perso) {
            divRow.append(generateDivPerso(perso));
        });
        divRow.append('<div class="black-bar"></div>');
        $('#roster').append(divRow);
    });
}