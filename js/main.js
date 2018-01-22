$(document).ready(function(){

 $("#btnSend").click(function(){

    var url = `https://kidscancode.bitrix24.com/rest/1/64ubmxtgiaie3lu3/crm.lead.add`;
    var request =   $.ajax({

      method : 'POST',
      url : url,
      data : JSON.stringify( {fields : { title : 'test', name: 'michael', last_name : 'akrawi'}})
    });

    request.done(function(){ console.log('add'); });

    request.fail(function( jqXHR, textStatus ) {
      console.log(jqXHR);
      alert( "Request failed: " + textStatus );
    });

 });

});