$(document).ready(function () {

    $("#btnSend").click(function () {

        var token = grecaptcha.getResponse();
        var response = $.post('http://localhost:59115/KidsCanCode.asmx/VerifyCaptcha',
            {
                secret: '6LfuUEIUAAAAAMVdJrRHd2EC0FqgHH1WztafARue',
                token: token
            }).done(function (data) {
                console.log(data);
            });



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

    });

});