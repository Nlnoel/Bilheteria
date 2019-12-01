<?php

    class Conexao{

        private $objConn;

        public function __construct(){

            //SGBD
            $host   = "mysql:host=localhost;";
            //Nome do banco
            $db     = "bilheteria";
            //Senha
            $pass   = "";
            //Usuario
            $user   = "root";

            try{
                
                $this->objConn = new PDO($host."dbname=".$db, $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                
            } catch(Exception $e){

                throw new Exception("Erro ao Tentar conectar com o banco de dados!");
                
            }

        }

        public function run($strSql, $arrVal = array()){

            if(!empty($arrVal)){

                $stm = $this->objConn->prepare($strSql);

                if($stm->execute($arrVal)){

                    return $stm;
                    
                } else{
                    
                    $arrError = $stm->errorInfo();

                    throw new Exception($arrError[2]);

                }

            } else{

                if($stm = $this->objConn->query($strSql)){

                    return $stm;

                } else{

                    $arrError = $stm->errorInfo();

                    throw new Exception($arrError[2]);

                }

            }

        }

    }