<?php

try {
    $db = new PDO("mysql:dbname=fd;host=localhost;", "root", "");
    $db->exec("SET NAMES UTF8");
    $db->SETAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
}

catch (PDOException $e) {
    die('erreur:' . $e->getMessage());
}//conditions avec la methode switch-case
if (isset($_POST["ent"])) {
    $ent = $_POST["ent"];
    $resultat = array();

   
    switch ($ent) {

        

        case 'msg':
            $nom = addslashes($_POST["noms"]);
            $email = addslashes($_POST["email"]);
            $telephone = addslashes($_POST["telephone"]);
            $message = addslashes($_POST["messages"]);

            $sql = "insert into messages(noms, email, telephone, messages) values('$nom', '$email', '$telephone', '$message')";

            if ($requete = $db->query($sql)) {
                $resultat = array(1);
            } else {
                $resultat = array(0);
            }
        break;

        case 'connexion':
            $nom_utilisateur = addslashes($_POST["user"]);
            $mot_de_passe = addslashes($_POST["mdp"]);
            $sql = "select * from users where username='$nom_utilisateur' and mdp='$mot_de_passe'";
            $requete = $db->query($sql);
            $data = $requete->fetchAll();
            $n = $requete->rowcount();
            if ($n == 1) {
                //$resultat = array(1);
                $resultat = array(1, $data[0]["username"]);
            } else {
                $resultat = array(0);
            }
        break;
        
        case 'affcher_message':
            $sql = "select * from messages";
            $requete = $db->query($sql);
            $data = $requete->fetchAll(PDO::FETCH_ASSOC);
            $n = $requete->rowcount();
            if ($n > 0) {
                foreach ($data as $ligne) {
                    $resultat[] = $ligne;
                }
            }
            break;
            
        case 'supprimer':
            $id = addslashes($_POST["id"]);
            $sql = "delete from messages where id = '$id'";
            if ($requete = $db->query($sql)) {
                $resultat = array(1);
            } else {
                $resultat = array(0);
            }
            break;
    }
    echo (json_encode($resultat));
} else {
    $resultat = array("n" => 500);
    echo (json_encode($resultat));
}