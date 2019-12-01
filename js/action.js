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

            M.toast({
                html: val["message"],
                classes: 'red white-text rounded'
            });

        } else{

            let data = val["data"];

            if(data == "" || data == null){

                $("main").html("<span style=\"margin-left: 30em;\">Não a shows disponíveis no momento. Cadastre mais shows!</span>");
                
            } else{
            
                let html = "<div class='row'>";

                for(x in data){

                    html += "<div class=\"col s12 medium m4\">"+
                                "<div class=\"card medium\">"+
                                    "<div id=\"show\" data-id=\""+ data[x]['idIngresso'] +"\" class=\"card-image waves-effect waves-block waves-light modal-trigger\" href=\"#modal\" style=\"border-radius: 15px;\">"+
                                        "<img src=\""+ data[x]['caminho'] +"\">"+
                                        "<span class=\"card-title\">"+ data[x]['nome'] +"</span>"+
                                    "</div>"+
                                    "<div class=\"card-content\">"+
                                        "<p>"+ data[x]['descricao'] +"</p>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"
                    
                }

                html += "</div>";
                
                $("main").html(html);

            }
        }

    }).fail(function(x, status, val){

        $("main").html("Ops, Ocorreu um erro inesperado. Tente novamente mais tarde.");

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
        let desc    = $("textarea#descricao");
        let dtShow  = $("input#data");

        if(show.val() != "" && desc.val() != "" && dtShow.val() != ""){

            let newTicket = new FormData($("form#formulario")[0]);

            $.ajax({

                url: "banco/actions.php",
                type: "POST",
                dataType: "json",
                processData: false,
                contentType: false,
                data: newTicket,
                beforeSend: function(){

                    btnThis.closest("div.card-action").children("a#btnVoltar").hide();
                    btnThis.hide();
                    btnThis.closest("div.card-action").children("img").show();

                }

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

                    btnThis.closest("div.card-action").children("a#btnVoltar").show();
                    btnThis.show();
                    btnThis.closest("div.card-action").children("img").hide();

                    show.val("");
                    desc.val("");
                    dtShow.val("");

                    show.focus();

                }

            }).fail(function(x, status, val){

                let message = "Ops, ocorreu um erro inesperado. Por favor, atualize a página e tente novamente.";

                M.toast({
                    html: message,
                    classes: 'red yellow-text rounded'
                });
                console.log(val);
            });

        } else{

            M.toast({
                html: 'Preencha todos os campos para prosseguir',
                classes: 'white black-text rounded'
            });

        }

    });

    $("input#search").keypress(function(event){

        if(event.key === "Enter"){

            event.preventDefault();

            let strSearch = $("input#search").val();

            $.ajax({

                url: "banco/actions.php",
                type: "GET",
                dataType: "json",

                data: {

                    action: "SearchShow",
                    search: strSearch

                }
            }).done(function(val){

                if(val["error"]){

                    M.toast({
                        html: val["message"],
                        classes: 'red white-text rounded'
                    });

                } else{

                    let data = val["data"];

                    if(data == "" || data == null){

                        $("main").html("<span style=\"margin-left: 30em;\">Não foi possível encontrar nada com esté argumento de pesquisa '"+ strSearch +"'</span>");
                        
                    } else{
                    
                        let html = "<div class='row'>";

                        for(x in data){

                            html += "<div class=\"col s12 medium m4\">"+
                                        "<div class=\"card medium\">"+
                                            "<div id=\"show\" class=\"card-image waves-effect waves-block waves-light modal-trigger\" href=\"#modal\" style=\"border-radius: 15px;\">"+
                                                "<img src=\""+ data[x]['caminho'] +"\">"+
                                                "<span class=\"card-title\">"+ data[x]['nome'] +"</span>"+
                                            "</div>"+
                                            "<div class=\"card-content\">"+
                                                "<p>"+ data[x]['descricao'] +"</p>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"
                            
                        }

                        html += "</div>";
                        
                        $("main").html(html);
                    }

                }

            }).fail(function(x, status, val){

                M.toast({
                    html: "Ops, ocorreu um erro inesperado, atualize a página e tente novamente.",
                    classes: 'red black-text rounded'
                });

                console.clear();
                console.log(val);

            });
        }

    });

    $("main").delegate("div#show", "click", function(){

        let idShow  = $(this).attr("data-id");
        let show    = $(this).closest("div").children("span").html();

        $("div#modal").find("input#show").attr("value", idShow);

        $("div#modal").find("form").children("h4").html("Comprar ingresso do show do(a) " + show +"?");

    });

    $("button#btnComprar").click(function(){

        let btnThis = $(this);
        let idShow  = btnThis.closest("div#modal").find("input").attr("value");

        let purchase = confirm("Deseja Realmente comprar este ingresso?");

        if(purchase){

            $.ajax({

                url: "banco/actions.php",
                type: "POST",
                dataType: "json",

                data: {

                    action: "PurchaseTicket",
                    idShow: idShow

                },
                beforeSend: function(){

                    btnThis.closest("div").children("div#progress-load").show();
                    btnThis.hide();
                    btnThis.closest("div").children("button#btnFechar").hide();

                }

            }).done(function(val){

                if(val["error"]){

                    M.toast({
                        html: val["message"],
                        classes: 'red yellow-text rounded'
                    });

                } else{

                    M.toast({
                        html: "Ingresso comprado com sucesso.",
                        classes: 'green white-text rounded'
                    });

                    btnThis.closest("div").children("div#progress-load").hide();
                    btnThis.show();
                    btnThis.closest("div").children("button#btnFechar").show();
                    btnThis.closest("div").children("button#btnFechar").trigger("click");

                }
            }).fail(function(x, status, val){

                M.toast({
                    html: "Ops, ocorreu um erro inesperado, atualize a página e tente novamente mais tarde.",
                    classes: 'white black-text rounded'

                });

                btnThis.closest("div").children("div#progress-load").hide();
                btnThis.show();
                btnThis.closest("div").children("button#btnFechar").show();
                
                console.clear();
                console.log(val);

            });

        }

    });

    M.AutoInit();

});
