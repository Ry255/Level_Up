const loginForm = document.querySelector('#loginForm')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const email = document.querySelector('#email').value.trim()
    const password = document.querySelector('#password').value.trim()
    
    if (!email || !password) {
        return alert('Completa todos los campos')
    }
    
    const Users = JSON.parse(localStorage.getItem('users')) || []
    const validUser = Users.find(user => user.email === email && user.password === password)
    
    if (!validUser) {
        return alert('Usuario y/o contraseña incorrectos!')
    }
    
    let mensajeBienvenida = `Bienvenido ${validUser.name}`
    if (validUser.email.includes('@duocuc.cl') || validUser.email.includes('@profesor.duocuc.cl')) {
        mensajeBienvenida = `¡Bienvenido ${validUser.name}! Recuerda que tienes 20% de descuento en tus compras`
    }
    
    alert(mensajeBienvenida)
    
    localStorage.setItem('login_success', JSON.stringify(validUser))
    window.location.href = 'index.html'
})