const contactForm = document.querySelector('#contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

const name = document.querySelector('#name').value.trim();
const email = document.querySelector('#email').value.trim();
const message = document.querySelector('#message').value.trim();

if(name.length === 0) {
    return alert('El nombre es obligatorio');
}

if(name.length > 100) {
    return alert('El nombre no puede superar los 100 caracteres');
}

if(email.length === 0) {
    return alert('El correo es obligatorio');
}

if(!email.includes('@')){
    return alert('Ingresa un correo válido');
}

if(email.length > 100) {
    return alert('El correo no puede superar los 100 caracteres');
}

if(message.length === 0) {
    return alert('El mensaje es obligatorio');
}

if(message.length > 500) {
    return alert('El mensaje no puede superar los 500 caracteres');
}

const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
const newMessage = {
    name: name,
    email: email,
    message: message
}
messages.push(newMessage)
localStorage.setItem('contactMessages', JSON.stringify(messages));

alert('Mensaje enviado correctamente');
window.location.href = 'index.html';

});