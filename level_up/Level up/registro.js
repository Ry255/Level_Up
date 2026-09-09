const signupForm = document.querySelector('#signupForm')

signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const name = document.querySelector('#name').value.trim()
    const email = document.querySelector('#email').value.trim()
    const password = document.querySelector('#password').value.trim()
    
    if (name.length < 4) {
        return alert('El nombre debe tener al menos 4 caracteres')
    }
    
    const emailValido = email.endsWith('@gmail.com') || 
                        email.endsWith('@duocuc.cl') || 
                        email.endsWith('@profesor.duocuc.cl')
    
    if (!emailValido) {
        return alert('El correo debe ser @gmail.com, @duocuc.cl o @profesor.duocuc.cl')
    }
    
    if (!email) {
        return alert('El correo es obligatorio')
    }
    
    if (password.length < 4) {
        return alert('La contraseña debe tener al menos 4 caracteres')
    }
    
    const Users = JSON.parse(localStorage.getItem('users')) || []
    
    const isUserRegistered = Users.find(user => user.email === email)
    if (isUserRegistered) {
        return alert('El usuario ya está registrado!')
    }
    
    let mensajeDescuento = ''
    if (email.includes('@duocuc.cl')) {
        mensajeDescuento = ' ¡Has obtenido un 20% de descuento por ser de Duoc UC!'
    } else if (email.includes('@profesor.duocuc.cl')) {
        mensajeDescuento = ' ¡Profesor de Duoc UC! Has obtenido un 20% de descuento.'
    }
    
    Users.push({ 
        name: name, 
        email: email, 
        password: password,
        esDuoc: email.includes('@duocuc.cl') || email.includes('@profesor.duocuc.cl')
    })
    
    localStorage.setItem('users', JSON.stringify(Users))
    
    alert(`Registro Exitoso!`)
    
    window.location.href = 'login.html'
})