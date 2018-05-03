// 4283f11a-0c36-490a-a135-7df8f7c954d4



$(document).ready(function(){

   /*
   //Salvo in una variabile l'oggetto input
   var thisInput = $('#search-input');
   resetInput(thisInput);
   var thisInputVal = "";
   getTodoList();



   //Chiamata AJAX alla pressione del tasto Enter
   $('#search-input').keypress(function(e) {
      //13 = Tasto invio
      if (e.which == 13) {
         thisInputVal = thisInput.val();
         resetInput(thisInput);
         addTodo(thisInputVal);
      }
   });

   //Al click del button search recupero il contenuto dell'input
   //e invio una richiesta AJAX alla API TMDb.
   $('#search-btn').click(function(){
      thisInputVal = thisInput.val();
      resetInput(thisInput);
      addTodo(thisInputVal);
   });


   $(document).on('click', '.delete-btn', function(){
      var thisItem = $(this).parent();
      var idItem = thisItem.attr('id');
      console.log(idItem);
      deleteItem(idItem);
   });

   $(document).on('click', '.modify-btn', function(){
      var itemContainer = $(this).parent();
      var idItem = itemContainer.attr('id');

      var thisItem = itemContainer.children('.item');
      var content = thisItem.text();

      var usrInput = prompt("Modifica todo selezionato: " + content);

      console.log( usrInput + " " + idItem);
      updateItem(usrInput, idItem);
      // var idItem = thisItem.attr('id');
      // console.log(idItem);
      // deleteItem(idItem);
   });

   /* ***** FUNZIONI *****

   //Funziona che inoltra la chiamata AJAX. Il parametro ricevuto in ingresso
   //è il valore recuperato dal campo input
   function getTodoList() {
      $.ajax({
         url : "http://138.68.64.12:3007/todo/",
         method : "GET",

         success : function(data){
            console.log(data);
            for (var i = 0; i < data.length; i++) {
               $('#list').append(
                  "<div class='item-ctn' id='"+ data[i]['id'] + "'>" +
                     "<div class='modify-btn'>M</div>" +
                     "<div class='item'>" + data[i]['text'] + "</div>" +
                     "<div class='delete-btn'>X</div>" +
                  "</div>"
               )
            }
         },
         error : function(e){
            console.log(e);
         },
      });
   }

   function addTodo(thisInputVal) {
      $.ajax({
         url : "http://138.68.64.12:3007/todo/",
         method : "POST",
         data : {
            text : thisInputVal,
         },
         success : function(data){
               console.log(data);
               $('#list').append(
                  "<div class='item-ctn' id='"+ data['id'] + "'>" +
                     "<div class='modifyn-bt'>M</div>" +
                     "<div class='item'>" + data['text'] + "</div>" +
                     "<div class='delete-btn'>X</div>" +
                  "</div>"
               )
         },

         error : function(e){
            console.log(e);
         },
      });
   }

   function updateItem(newContent, itemid){
      $.ajax({
            url : "http://138.68.64.12:3007/todo/" + itemid,
            method : "PUT",
            data : {
               id : itemid,
               text : newContent
            },
            success : function(data){
               console.log(data);
               $('#list').children("#"+itemid).children('.item').text(newContent);
            },
            error : function(e){
               console.log(e);
            },
      });
   }

   function deleteItem(itemid) {
      $.ajax({
            url : "http://138.68.64.12:3007/todo/" + itemid,
            method : "DELETE",
            // data : {
            //    id : itemid
            // },
            success : function(data){
               console.log(data);
               $('#list').children("#"+itemid).remove();
            },
            error : function(e){
               console.log(e);
            },
      });
   }

   //Funzione per il reset dell'input
   function resetInput(inputField) {
      inputField.val('');
   }

*/

});
