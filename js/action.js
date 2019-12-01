$(document).ready(function(){
    
    $.ajax({

        url: "banco/actions.php",
        type: "GET",
        dataType: "json",

        data: {

            action: "OpenShow"

        },
        beforeSend: function(){

            $("main").html("<img src=\"imagens/load/loader.gif\" style=\"margin-left: 35em;\">");

        }


    }).done(function(val){

        if(val["erro"]){

            alert(val["message"]);

        } else{

            let data = val["data"];

            if(data == "" || data == null){

                $("main").html("<span style=\"margin-left: 30em;\">Não a shows disponíveis no momento. Cadastre mais shows!</span>");
                
            } else{
            
                let html = "<div class='row'>";

                for(x in data){

                    html += "<div class='col s12 medium m4'>"+
                                "<div class='card medium'>"+
                                    "<div class='card-image waves-effect waves-block waves-light' style='border-radius: 15px;'>"+
                                        "<img src='"+ data['caminho'] +"'>"+
                                        "<span class='card-title'>"+ data['nome'] +"</span>"+
                                    "</div>"+
                                    "<div class='card-content'>"+
                                        "<p>"+ data['descricao'] +"</p>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"
                    
                }

                html += "</div>";
                
                $("main").html(html);
            }
        }

    }).fail(function(x, status, val){

        $("main").html("Ops, Ocorreu um erro inesperado. Tente novmaente mais tarde.");

        console.clear();
        console.log(val);

    });

    $("a#list-shows").click(function(){

        location.reload();

    });

    $("a#add-show").click(function(){

        $.ajax({

            url: "cadastrarShow.html",
            type: "GET",

            beforeSend: function(){
    
                $("main").html("<img src=\"imagens/load/loader.gif\" style=\"margin-left: 35em;\">");
    
            }
    
    
        }).done(function(val){

            $("main").html(val);

            $("input#data").mask("00/00/0000");

            $(".datepicker").datepicker();
            $(".datepicker").datepicker({

                format: "dd/mm/yyyy"
                
            });

        }).fail(function(x, status, val){
    
            $("main").html("Ops, Ocorreu um erro inesperado. Tente novmaente mais tarde.");
    
            console.clear();
            console.log(val);
    
        });


    });

    $("main").delegate("button#cadastrar", "click", function(){

        let btnThis = $(this);
        let show    = $("input#show");
        let desc    = $("input#descricao");
        let dtShow  = $("input#data");

        if(show.val() != "" && desc.val() != "" && dtShow.val() != ""){

            let newTicket = new FormData($("form#formulario")[0]);

            $.ajax({

                url: "banco/actions.php",
                type: "POST",
                processData: false,
                contentType: false,
                data: newTicket

            }).done(function(val){

                if(val["error"]){

                    M.toast({
                        html: val["message"],
                        classes: 'green black-text rounded'
                    });

                } else{

                    M.toast({
                        html: "Show adicionado com sucesso",
                        classes: "green white-text rounded"
                    });

                }

            }).fail(function(x, status, val){

                let message = "Ops, ocorreu um erro inesperado. Por favor, atualize a página e tente novamente.";

                M.toast({
                    html: message,
                    classes: 'red yellow-text rounded',
                });
                console.log(val);
            });

        } else{

            M.toast({
                html: 'Preencha todos os campos para prosseguir',
                classes: 'white black-text rounded',
            });

        }

    });

    M.AutoInit();

});
