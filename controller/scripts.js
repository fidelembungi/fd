function send_messages() {

    var nom = "";
    var email = "";
    var telephone = "";
    var messages = "";
    var regexTel = "";
    var msg_return = "";

    nom = $('#nom').val();
    email = $('#email').val();
    telephone = $('#telephone').val();
    messages = $('#message').val();
    regexTel = /^(?:\+243|0)\d{9}$/;


    if (nom === "") {
        msg_return =
            '<div class = "alert alert-danger bg-danger alert-dismissible text-light">' +
            'Veuillez entrez votre nom complet' +
            '<button type = "button" class = "btn btn-close border-light text-light"' +
            'data-bs-dismiss = "alert" aria-label ="close"> ' +
            '</button>' +
            '</div>';

        $('#msg_return').empty().append(msg_return);
    } else {
        if (nom.length < 7) {
            alert("Veuillez entrez votre prenom et nom complet dans le champs de noms");
        } else {
            if (telephone === "") {
                alert("Veuillez entrez votre numéro de téléphone");
            } else {
                if (regexTel.test(telephone)) {
                    if (messages === "") {
                        alert("veuillez rédiger un message pour envoyer")
                    } else {

                        $.ajax({
                            url: "./model/scripts.php",
                            type: "POST",
                            data: {
                                "ent": "msg",
                                "noms": nom,
                                "email": email,
                                "telephone": telephone,
                                "messages": messages
                            },
                            error: function (data) {
                                console.log(data);
                            },
                            success: function (data) {
                                alert(data);
                                var donnees = JSON.parse(data);

                                if (donnees[0] != 0) {

                                    nom = $('#nom').val('');
                                    email = $('#email').val('');
                                    telephone = $('#telephone').val('');
                                    messages = $('#message').val('');

                                    msg_return =
                                        '<div class = "alert alert-success alert-dismissible">' +
                                        'Message envoyé avec succès' +
                                        '<button type = "button" class = "btn btn-close btn-transparent border light"' +
                                        'data-bs-dismiss = "alert" aria-label = "close"> ' +

                                        '</button>' +
                                        '</div>';

                                    $('#msg_return').empty().append(msg_return);


                                } else {

                                    nom = $('#nom').val('');
                                    email = $('#email').val('');
                                    telephone = $('#telephone').val('');
                                    messages = $('#message').val('');

                                    msg_return =
                                        '< div class = "alert alert-danger alert-dismissible" >' +
                                        'Erreur inattendu veuillez réessayer ' +
                                        '<button type = "button" class = "btn btn-close btn-transparent border light"' +
                                        'data - bs - dismiss = "alert" aria - label = "close" > ' +

                                        '< /button>' +
                                        '< /div>';

                                    $('#msg_return').empty().append(msg_return);
                                }
                            }
                        });

                    }
                } else {
                    alert("Veuillez entrez votre numéro correctement");
                }
            }
        }
    }

}

function foc() {
    $('#username').focus();
}

function connection() {

    var user = "";
    var mdp = "";
    var reponse = "";
    var donnees = "";

    user = $('#username').val();
    mdp = $("#mdp").val();


    if (user == "") {
        reponse =
            '<div class = "alert alert-danger bg-danger alert-dismissible text-light">' +
            "Veuillez entrez votre nom d'utilisateur" +
            '<button type = "button" class = "btn btn-close border-light text-light"' +
            'data-bs-dismiss = "alert" aria-label ="close"> ' +
            '</button>' +
            '</div>';

        $("#answer").empty().append(reponse);
    } else {
        if (mdp == "") {
            reponse =
                '<div class = "alert alert-danger bg-danger alert-dismissible text-light">' +
                "Veuillez entrez votre mot de passe" +
                '<button type = "button" class = "btn btn-close border-light text-light"' +
                'data-bs-dismiss = "alert" aria-label ="close"> ' +
                '</button>' +
                '</div>';

            $("#answer").empty().append(reponse);
        } else {
            if (mdp.length > 7) {
                $.ajax({
                    url: "../model/scripts.php",
                    type: "POST",
                    data: {
                        "ent": "connexion",
                        "user": user,
                        "mdp": mdp
                    },
                    error: function (data) {
                        console.log(data);
                    },
                    success: function (data) {
                        donnees = JSON.parse(data);

                        if (donnees[0] != 0) {

                            $("#username").val("");
                            $("#mdp").val("");

                            reponse =
                                '<div class = "alert alert-success bg-success alert-dismissible text-light">' +
                                "Mot de passe ou nom d'utilisateur incorrect" +
                                '<button type = "button" class = "btn btn-close border-light text-light"' +
                                'data-bs-dismiss = "alert" aria-label ="close"> ' +
                                '</button>' +
                                '</div>';

                            $("#answer").empty().append(reponse);

                            location.href = "../views/dashboard.html";

                        } else {
                            reponse =
                                '<div class = "alert alert-warning bg-warning alert-dismissible text-light">' +
                                "Mot de passe ou nom d'utilisateur incorrect" +
                                '<button type = "button" class = "btn btn-close border-light text-light"' +
                                'data-bs-dismiss = "alert" aria-label ="close"> ' +
                                '</button>' +
                                '</div>';

                            $("#answer").empty().append(reponse);
                        }

                    }
                });
            } else {
                reponse =
                    '<div class = "alert alert-danger bg-danger alert-dismissible text-light">' +
                    "Entrez au moins 8 caractères pour le mot de passe" +
                    '<button type = "button" class = "btn btn-close border-light text-light"' +
                    'data-bs-dismiss = "alert" aria-label ="close"> ' +
                    '</button>' +
                    '</div>';
                $("#answer").empty().append(reponse);
            }
        }
    }
}

function chargerMessage() {

    var donnees = "";

    $.ajax({
        url: "../model/lister.php",
        type: "POST",
        data: {
            "ent": "afficher_message"
        },
        error: function (data) {
            console.log(data);
        },
        success: function (data) {

            donnees = JSON.parse(data);
            var i = 0;
            var string = "";

            $.each(donnees, function (key, value) {
                i += 1;
                string +=

                    '<div class="col-md-4 mb-3">' +
                    '    <div class="card shadow-sm">' +
                    '        <div class="card-body">' +
                    '            <h5 class="card-title">' + value["noms"] + '</h5>' +
                    '            <h6 class="card-title">' +
                    '                <a href="tel:' + value["telephone"] + '"' +
                    '                class = "card-title" >' +
                    '                     ' + value["telephone"] +
                    '                </a>' +
                    '            </h6>' +
                    '            <p class="card-text">' +
                    '                <a href = "mailto:' + value["email"] + '"' +
                    '                class = "card-title" >' +
                    '                    ' + value["email"] +
                    '                </a>' +
                    '            </p>' +
                    '            <p class="card-text">' +
                    '                ' + value["messages"] +
                    '            </p>' +
                    '            <button id="' + value["id"] + '" class="btn btn-danger btn-sm me-2" onclick="supprimer(this.id);">Supprimer</button>' +
                    '        </div>' +
                    '    </div>' +
                    '</div>';

            });

            $("#listMessages").empty().append(string);
        }

    });
}

function supprimer(id) {

    var donnees = "";
    var reponse = "";

    if (confirm("Voulez-vous supprimer ce message ?")) {
        $.ajax({
            url: "../model/scripts.php",
            type: "POST",
            data: {
                "ent": "supprimer",
                "id": id
            },
            error: function (data) {
                console.log(data);
            },
            success: function (data) {

                donnees = JSON.parse(data);

                if (donnees[0] != 0) {
                    reponse =
                        '<div class = "alert alert-primary bg-primary alert-dismissible text-light">' +
                        "Supprimer avec success" +
                        '<button type = "button" class = "btn btn-close border-light text-light"' +
                        'data-bs-dismiss = "alert" aria-label ="close"> ' +
                        '</button>' +
                        '</div>';

                    $("#answer").empty().append(reponse);

                    chargerMessage();
                } else {
                    reponse =
                        '<div class = "alert alert-warning bg-warning alert-dismissible text-light">' +
                        "Erreur de suppression réessayer" +
                        '<button type = "button" class = "btn btn-close border-light text-light"' +
                        'data-bs-dismiss = "alert" aria-label ="close"> ' +
                        '</button>' +
                        '</div>';

                    $("#answer").empty().append(reponse);
                }
            }
        });
    } else {
        
    }


}