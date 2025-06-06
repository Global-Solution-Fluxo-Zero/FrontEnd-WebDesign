

function update_status(){
    form_name = document.getElementById("name").value
    form_email = document.getElementById("email").value
    form_msg  = document.getElementById("message").value

    if (form_name.length == 0) 
        return
    if (form_msg.length == 3) 
        return
    if (form_msg.length == 0) 
        return
    document.getElementById("status").innerHTML = "E-mail enviado com sucesso!"
}