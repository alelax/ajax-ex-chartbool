// 4283f11a-0c36-490a-a135-7df8f7c954d4

/* http://138.68.64.12:3017/sales */
var venditeMensili = [  { 'month' : '01', 'amount' : 0 },
                        { 'month' : '02', 'amount' : 0 },
                        { 'month' : '03', 'amount' : 0 },
                        { 'month' : '04', 'amount' : 0 },
                        { 'month' : '05', 'amount' : 0 },
                        { 'month' : '06', 'amount' : 0 },
                        { 'month' : '07', 'amount' : 0 },
                        { 'month' : '08', 'amount' : 0 },
                        { 'month' : '09', 'amount' : 0 },
                        { 'month' : '10', 'amount' : 0 },
                        { 'month' : '11', 'amount' : 0 },
                        { 'month' : '12', 'amount' : 0 },
                     ]

$(document).ready(function(){

   $('#btn').click(function(){

      $.ajax({
         url : "http://138.68.64.12:3017/sales",
         method : "GET",

         success : function(data) {
            console.log(data);

            var monthlySales = getMonthlySales(data);

            printLineChart(monthlySales);
            console.log(venditeMensili);

            var individualSales = getIndividualSales(data);
            console.log("individual");;
            console.log(individualSales);
            //console.log(data.format('MM'));
            printPieChart(individualSales);

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
      for (var i = 0; i < data.length; i++) {
         var saleDate = moment(data[i].date, "DD-MM-YYYY");
         var saleAmount = data[i].amount;
         var thisMonth = saleDate.format('MM');
         venditeMensili[thisMonth-1].amount += saleAmount;
      }

      return venditeMensili;
   }

   //Funzione che mostra un grafico che mostra l'andamento delle vendite mensili
   function printLineChart(venditeMensili) {
      var ctx = document.getElementById('monthlySales').getContext('2d');
      var chart = new Chart(ctx, {
         // The type of chart we want to create
         type: 'line',

         // The data for our dataset
         data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [{
               label: "Vendite Mensili",
               borderColor: 'rgb(255, 99, 132)',
               backgroundColor: 'rgba(255, 99, 132, 0)',
               data: [venditeMensili[0].amount, venditeMensili[1].amount, venditeMensili[2].amount, venditeMensili[3].amount,
                      venditeMensili[4].amount, venditeMensili[5].amount, venditeMensili[6].amount, venditeMensili[7].amount,
                      venditeMensili[8].amount, venditeMensili[9].amount, venditeMensili[10].amount, venditeMensili[11].amount
                     ]
            }]
         },

         // Configuration options go here
         options: {}
      });

   }


   function printPieChart(venditeIndividuali) {
      var ctx = document.getElementById('individualSales').getContext('2d');
      var myPieChart = new Chart(ctx,{
         type: 'pie',
         data: {
            labels : [ venditeIndividuali[0].name + " %", venditeIndividuali[1].name + " %", venditeIndividuali[2].name + " %", venditeIndividuali[3].name + " %" ],
            datasets : [{
               label: "Vendite Individuali",
               borderColor: [ 'rgb(198, 2, 75)', 'rgb(21, 43, 163)', 'rgb(104, 219, 9)', 'rgb(223, 18, 18)' ],
               backgroundColor: [ 'rgb(198, 2, 75)', 'rgb(21, 43, 163)', 'rgb(104, 219, 9)', 'rgb(223, 18, 18)' ],
               data: [ venditeIndividuali[0].amount_percent, venditeIndividuali[1].amount_percent, venditeIndividuali[2].amount_percent, venditeIndividuali[3].amount_percent ]
            }]
         },
         options: {}
      });
   }

   //Funzione che riceve i dati dall'API e calcola l'ammontare delle vendite nell'anno
   function getTotalSales(data) {
      var totalSales = 0;
      for (var i = 0; i < data.length; i++) {
         totalSales += data[i].amount;
      }
      return totalSales;
   }

   //Funzione che raccoglie la lista di tutti i venditori dell'azienda
   function getSalesMen(data) {
      var list = [];
      var salesmenList = [];

      for (var i = 0; i < data.length; i++) {
         if ( !(list.includes(data[i].salesman)) ) {
            list.push( data[i].salesman );
         }
      }

      for (var i = 0; i < list.length; i++) {
         salesmenList[i] = {
            'name' : list[i],
            'amount' : 0,
            'amount_percent' : 0,
         }
      }

      return salesmenList;
   }

   //Funzione che riceve in ingresso i data inviati dall'API e restituisce un oggetto
   //contenente le vendite totali di ogni venditore nell'anno 2017
   function getIndividualSales(data) {

      var salesMenData = getSalesMen(data);
      var totalSales = getTotalSales(data);

      for (var i = 0; i < data.length; i++) {
         for (var j = 0; j < salesMenData.length; j++) {
            if ( data[i].salesman == salesMenData[j].name) {
               salesMenData[j].amount += data[i].amount;
            }
         }
      }

      for (var i = 0; i < salesMenData.length; i++) {
         salesMenData[i].amount_percent = (salesMenData[i].amount / totalSales * 100).toFixed(2);
      }

      return salesMenData;

   }

});
