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

            for (var i = 0; i < data.length; i++) {
               var saleDate = moment(data[i].date, "DD-MM-YYYY");
               var saleAmount = data[i].amount;
               var thisMonth = saleDate.format('MM');
               venditeMensili[thisMonth-1].amount = venditeMensili[thisMonth-1].amount + saleAmount;
            }

            printLineChart(venditeMensili);
            console.log(venditeMensili);

            var salesmen = getSalesMen(data);

            console.log(salesmen);

            var individual = getIndividualSales(data);

            console.log(individual);
            //console.log(data.format('MM'));


         },

         error : function(e){
            console.log(e);
         },
      });

   });

   //Funzione che mostra un grafico che mostra l'andamento delle vendite mensili
   function printLineChart(venditeMensili) {
      var ctx = document.getElementById('myChart').getContext('2d');
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
            'amount' : 0
         }
      }

      return salesmenList;
   }

   function getIndividualSales(data) {
      //var individualSales = [];
      var salesMen = getSalesMen(data);
      console.log("prova");
      console.log(salesMen['Marco']);

      for (var i = 0; i < data.length; i++) {

         console.log(data[i].salesman);

      }

      return salesMen;

   }

});
