<?php

	class Autoload{
		
		function __construct(){

			spl_autoload_extensions(".class.php");
			spl_autoload_register(array($this, "load"));
			
		}

		private function load($className){

			$ext = spl_autoload_extensions();

			require_once(__DIR__.'/'.$className.$ext);
				
			
		}
	}


?>