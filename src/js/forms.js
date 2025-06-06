function update_status(){
    form_name = document.getElementById("name").value
    form_email = document.getElementById("email").value
    form_msg  = document.getElementById("message").value
    if (form_name.length == 0) 
        return
    console.log(form_email)
    if (form_email.length <= 3 && form_email.includes("@")) 
        return
    if (form_msg.length == 0) 
        return
    document.getElementById("status").innerHTML = "E-mail enviado com sucesso!"
}