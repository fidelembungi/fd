<?php
try {
    $db = new PDO("mysql:dbname=fd;host=localhost;", "root", "");
    $db->exec("SET NAMES UTF8");
    $db->SETAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die('erreur:' . $e->getMessage());
}
$utilisateurs = $db->query("SELECT * FROM messages ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($utilisateurs);

?>