function mostrarMensaje(){
alert('Bienvenido a FACELAD');
}

const formulario = document.getElementById('loginForm');

formulario.addEventListener('submit', function(e){
e.preventDefault();
alert('Inicio de sesión exitoso');
});
