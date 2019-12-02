class Chart{

  showChart(answers){
  
    let dataAnswer = [];
    
    for(x in answers){
  
      dataAnswer.push([answers[x]["nome"], parseInt(answers[x]["qtdTicket"])]);

    }

    Highcharts.chart("container", {
      chart: {
        type: "column",
      },
      title: {
        text: "Compartivo de vendas de ingresso entre os show"
      },
      credits: {
        enabled: true,
        text: "International Tickets"
      },
      xAxis: {
        type: "category",
        allowDecimals: false,
        labels: {
          rotation: -45,
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif"
          }
        }
      },
      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: "Quantidade de Ingressos vendidos"
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: "Ingressos Vendidos: <b>{point.y}</b>"
      },
      series: [{
        name: "Ingressos",
        data: dataAnswer,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: "#FFFFFF",
          align: "right",
          format: "{point.y}",
          y: 10,
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif"
          }
        }
      }]
    });

  }

}