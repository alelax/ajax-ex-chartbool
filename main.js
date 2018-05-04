// 4283f11a-0c36-490a-a135-7df8f7c954d4

/* http://138.68.64.12:3017/sales */


$(document).ready(function(){

   $('#btn').click(function(){

      $(this).hide();
      $('.chart-container').show();

      $.ajax({
         url : "http://138.68.64.12:3017/sales",
         method : "GET",

         success : function(data) {

            var lineChartData = getMonthlySales(data);
            printLineChart(lineChartData);

            var pieChartData = getIndividualSales(data);
            printPieChart(pieChartData);

         },

         error : function(e){
            console.log(e);
         },
      });

   });


   /* ***** FUNZIONI ***** */

   //Funzione che riceve in ingresso i data inviati dall'API e restituisce un oggetto
   //contenente il totale delle vendite per ogni mese dell'anno 2017
   function getMonthlySales(data) {

      var venditeMensili = {
         'January' : 0,
         'February' : 0,
         'March' : 0,
         'April' : 0,
         'May' : 0,
         'June' : 0,
         'July' : 0,
         'August' : 0,
         'September' : 0,
         'October': 0,
         'November': 0,
         'December': 0,
      }
      for (var i = 0; i < data.length; i++) {
         var saleDate = moment(data[i].date, "DD-MM-YYYY");
         var saleAmount = data[i].amount;
         var thisMonth = saleDate.format('MMMM');
         venditeMensili[thisMonth] += saleAmount;
      }

      var dati = {
         labels : [],
         monthAmount : []
      };

      for (var keyVenditeMensili in venditeMensili) {
         dati.labels.push(keyVenditeMensili);
         dati.monthAmount.push(venditeMensili[keyVenditeMensili]);
      }

      return dati;
   }

   //Funzione che mostra un grafico che visualizza l'andamento delle vendite mensili
   function printLineChart(dati) {
      var ctx = document.getElementById('monthlySales').getContext('2d');
      var chart = new Chart(ctx, {
         // The type of chart we want to create
         type: 'line',

         // The data for our dataset
         data: {
            labels: dati.labels,
            datasets: [{
               label: "Vendite Mensili",
               borderColor: 'rgb(40, 77, 213)',
               backgroundColor: 'rgba(40, 77, 213, 0.65)',
               data: dati.monthAmount
            }]
         },

         // Configuration options go here
         options: {}
      });

   }

   //Funzione che riceve in ingresso i data inviati dall'API e restituisce un oggetto
   //contenente le vendite totali di ogni venditore nell'anno 2017
   function getIndividualSales(data) {

      var salesMen = {};
      var totalAmount = 0;

      for (var i = 0; i < data.length; i++) {
         sales = data[i];
         saler = sales.salesman;

         if ( !(salesMen[saler]) ) {
            salesMen[saler] = 0;
         }

         salesMen[saler] += sales.amount;
         totalAmount += sales.amount;
      }

      var dati = {
         labels : [],
         annualAmount : [],
         percent : []
      };

      for (var keySalesMen in salesMen) {
         dati.labels.push(keySalesMen);
         dati.annualAmount.push(salesMen[keySalesMen]);
         salesPercent = ( salesMen[keySalesMen] * 100 / totalAmount).toFixed(2);
         dati.percent.push(salesPercent)
      }

      return dati;


   }

   //Funzione che mostra un grafico che visualizza l'andamento delle vendite annuali di ogni venditore
   function printPieChart(dati) {
      var ctx = document.getElementById('individualSales').getContext('2d');
      var myPieChart = new Chart(ctx,{
         type: 'pie',
         data: {
            labels : dati.labels,
            datasets : [{
               label: "Vendite Individuali",
               borderColor: [ 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)' ],
               backgroundColor: [ 'rgba(198, 2, 75, 0.82)', 'rgb(21, 43, 163)', 'rgb(104, 219, 9)', 'rgb(223, 18, 18)' ],
               data: dati.percent
            }]
         },
         options: {}
      });
   }


});
