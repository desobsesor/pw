/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    alert("epssp");
    $("form#uploadForms").submit(function (event) {
        alert("epssp");
        $(this).ajaxSubmit({
            error: function (xhr) {
                status("Error: " + xhr.status);
            },
            success: function (response) {
                console.log(response);
            }
        });
        return event.preventDefault();
    });
});