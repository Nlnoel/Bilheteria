<?php

    require_once("../classes/Autoload.class.php");

    $autoload = new Autoload();

    $action = "";
    if(isset($_POST["action"])){
        
        $action   = $_POST["action"] ?? "";

    } else{

        $gets = array(
            "OPENSHOW",
        );

        if(isset($_GET["action"]) && in_array(mb_strtoupper(trim($_GET["action"])), $gets)){

            $action = trim($_GET["action"]);

        } else{
            
            $action = "";

        }

    }


    switch (mb_strtoupper($action)) {
        case 'OPENSHOW':
            
            try {
                
                $objConn = new Conexao();

                $strSeach = "SELECT evt.nome, ing.tipo, ing.dia, ing.caminho, ing.descricao FROM ingresso ing
                             RIGHT JOIN evento evt ON (ing.idIngresso = evt.idShow)";

                $stmt = $objConn->run($strSeach);

                if($stmt && $stmt->rowCount() != 0){

                    $row = $stmt->fetchAll();

                    $ret = array("error" => false, "data" => $row);

                } else{

                    $ret = array("error" => true, "message" => "Ocorreu um erro durante a busca dos dados.");

                }

                echo json_encode($ret);

            } catch (Exception $e) {
                
                $ret = array("error" => true, "message" => $e->getMessage());

                echo json_encode($ret);

            }

        break;

        case 'ADDTICKET':

            try {

                $objConn = new Conexao();

                $dateIn = str_replace("/", "-", $_POST["data"]);
                $show   = trim($_POST["show"]);
                $desc   = trim($_POST["descricao"]);
                $img    = $_FILES["img"];

                if(!empty($dateIn) && !empty($show) && !empty($desc)){
                    
                    $dtShow = date("Y-m-d", strtotime($dateIn));

                    $addImg = "";

                    if(!empty($img["name"])){

                        $ext = preg_replace("/.*\.(.*)/", "$1", $img["name"]);

                        move_uploaded_file($img["tmp_name"], "../imagens/shows/".$show.".".$ext);

                        $addImg = "imagens/shows/".$show.".".$ext;

                    }

                    $strInsert  = "INSERT INTO evento (nome) VALUES (?)";
                    
                    if($objConn->run($strInsert, [$show])){

                        $strSearch = "SELECT idShow FROM evento,
                                      order by idShow desc
                                      limit 1";

                        $stmt = $objConn->run($strSearch);

                        $row = $stmt->fetch();

                        $strInsert = "INSERT INTO ingresso(tipo, dia, caminho, descricao)
                                      VALUES(?, ?, ?, ?)";

                        $stmt = $objConn->run($strInsert, [$row["idShow"], $dtShow, $addImg, $desc]);

                        $stmt ? $ret = array("error" => false) : $ret = array("error" => true, "message" => "Ocorreu um problema na hora de inserir o show, tente novamente mais tarde.");

                    } else{

                        $ret = array("error" => true, "message" => "Ocorreu um problema na hora de inserir o show, tente novamente mais tarde.");

                    }

                } else{

                    $ret = array("error" => true, "message" => "Por favor, preencha todos os campos para prosseguir com o cadastramento do show.");

                }

                echo json_encode($ret);

            } catch (Exception $e) {
                
                $ret = array("error" => true, "message" => $e->getMessage());

                echo json_encode($ret);

            }

        break;

    }