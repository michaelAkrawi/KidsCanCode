

  function validatereCaptcha(){

  var token = grecaptcha.getResponse();     
  var response = $.post('http://localhost:59115/KidsCanCode.asmx/VerifyCaptcha',
            {
                secret: '6LfuUEIUAAAAAP5IxNLLt1KpS6cNzp_qWFcyhAEr',
                token: token
            }).done(function (json) {
                var data = JSON.parse(json);
                if(data.success == true){
                  console.log('success');
                 // grecaptcha.reset();
                }
            }).fail(function(){
                grecaptcha.reset();
            });

 }

 function createNewLead(){

        var name = $("#txbName").val();
        var phone = $("#txbPhone").val();
        var email = $("#txbEmail").val();
        var subject = $("#txbSubject").val();
        var content = $("#txbContent").val();

        const url = `https://kidscancode.bitrix24.com/rest/1/64ubmxtgiaie3lu3/crm.lead.add`;

        const request = $.ajax({

            method: 'POST',
            url: url,
            data: {
                fields:
                {
                    TITLE: `${subject} ${name} `,
                    NAME: name,
                    EMAIL: [{ "VALUE": email, "VALUE_TYPE": "HOME" }],
                    PHONE: [{ "VALUE": phone, "VALUE_TYPE": "MOBILE" }],
                    COMMENTS: content
                }
            }
        });

        request.done(function () { console.log('add'); });

        request.fail(function (jqXHR, textStatus) {
            console.log(jqXHR);
            alert("Request failed: " + textStatus);
        });
 }