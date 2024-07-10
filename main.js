document.addEventListener("DOMContentLoaded", function(){

    const email = document.querySelector("#email")
    const asunto = document.querySelector("#asunto")
    const mensaje = document.querySelector("#mensaje")
    const input = document.querySelectorAll(".input")
    const textArea = document.querySelector(".textArea")
    const reset = document.querySelector("button[type=reset]")
    const submit = document.querySelector("button[type=submit]")
    const skchase = document.querySelector(".sk-chase")
    const formulario = document.querySelector("#formulario")

    email.addEventListener("input",validar)
    asunto.addEventListener("input",validar)
    mensaje.addEventListener("input",validar)

    const info = {
        email: "",
        asunto: "",
        mensaje: ""
    }

    function validar(e){
        let campo = e.target.name
        const dato = e.target.value.trim()
        if(e.target.name == "email"){
            validarEmail()
        }else if(dato === ""){
            mostrarMensaje(e.target.id, e.target.parentElement)
            info[campo] = ""
        }else if(e.target.parentElement.querySelector(".alerta")){
            e.target.parentElement.querySelector(".alerta").remove()
            info[campo] = e.target.value
        }else{
            info[campo] = e.target.value
        }
        comprobarDatos()
    }

    function validarEmail(){
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email.value)
        if(!resultado){
            mostrarMensaje(email.name, email.parentElement)
            info.email = ""
            comprobarDatos()
        }else if(email.parentElement.querySelector(".alerta")){
            email.parentElement.querySelector(".alerta").remove()
            info.email = email.value
            comprobarDatos()
        }else{
            info.email = email.value
            comprobarDatos()
        }
    }

    function mostrarMensaje(texto, referencia){
        const claseAlerta = referencia.querySelector(".alerta")
        if(claseAlerta){
            claseAlerta.remove()
        }
        const alerta = document.createElement("p")
        alerta.textContent = texto + " " + "incorrecto"
        referencia.appendChild(alerta)
        alerta.classList.add("alerta")
    }

    function comprobarDatos(){
        input.forEach(element => {
            const dato = element.parentElement.parentElement.querySelector(".red")
            if(Object.values(info).includes("")){
                dato.classList.add("opacity")
                dato.disabled = true
            }else{
                dato.classList.remove("opacity")
                dato.disabled = false
            }
        })
    }

    function resetarFormulario(){
        email.value = ""
        asunto.value = ""
        mensaje.value = ""
        info.email = ""
        info.asunto = ""
        info.mensaje = ""
        submit.classList.add("opacity")
        submit.disabled = true
    }

    reset.addEventListener("click", () => {
        resetarFormulario()
    })

    submit.addEventListener("click", (e) => {
        e.preventDefault()
        skchase.classList.remove("oculto")
        setTimeout(() => {

            resetarFormulario()
            skchase.classList.add("oculto")
            const exito = document.createElement("p")
            exito.classList.add("exito")
            exito.textContent = "Mensaje enviado exitosamente!"
            formulario.appendChild(exito)

            setTimeout(() => {
                exito.remove()
            }, 3000);
        }, 3000)
    })
})