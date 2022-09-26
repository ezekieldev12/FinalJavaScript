const Clickbutton = document.querySelectorAll('.button');
const tbody = document.querySelector('.tbody');
const tallas = document.querySelectorAll('.tallas .talla');
let carrito =[]

Clickbutton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})

function addToCarritoItem(e){
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;
    
    const newItem = {
        title:itemTitle,
        precio:itemPrice,
        img: itemImg,
        cantidad:1
    }
    addItemCarrito(newItem)
}

function addItemCarrito(newItem) {

    //ventana de alerta producto añadido con libreria SWEET ALERT

    const alert = document.querySelector('.alert')
    setTimeout(function(){
        alert.classList.add('oculto')
    }, )
    alert.classList.remove('oculto')
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'su producto ha sido añadido',
        showConfirmButton: false,
        timer: 1500
    })
    const InputElemnto = tbody.getElementsByClassName('input__elemento')
    for(let i =0; i < carrito.length ; i++){
        if(carrito[i].title.trim() === newItem.title.trim()){
            carrito[i].cantidad ++;
            const inputValue = InputElemnto[i].value 
            inputValue.value++;
            CarritoTotal()
            return null;
        }
    }
    carrito.push(newItem)
    renderCarrito()
}

function renderCarrito(){
    tbody.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const Content = `
        <th scope="row">1</th>
        <td class="table__productos">
            <img src=${item.img} alt="">
            <h6 class="title">${item.title}</h6>
        </td>
        <td class="table__price">${item.precio}</td>
        <td class="table__cantidad">
            <input type="number" min="1" value=${item.cantidad} class="input__elemento" >
            <button class="delete btn btn-danger">x</button>
        </td>
        `
        tr.innerHTML = Content;
        tbody.append(tr)

        tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
    })
    CarritoTotal()
}

const eliminarActive = () => {
    tallas.forEach(talla => {
        talla.classList.remove('active')
    })
}


tallas.forEach(talla => {
    talla.addEventListener('click',()=> {
        eliminarActive();
        talla.classList.add('active')
    })
})


function CarritoTotal(){
    let Total =0; 
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$",''))
        Total = Total + precio*item.cantidad
    })

    itemCartTotal.innerHTML = `Total $${Total}`
    addLocalStorage()
}

function removeItemCarrito(e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    for(let i=0; i<carrito.length ; i++){
        if(carrito[i].title.trim()=== title.trim()){
            carrito.splice(i, 1)
        }
    }

    //ventana de alerta producto removido. Con libreria SWEET ALERT

    const alert = document.querySelector('.remove')
    Swal.fire({
        title: '',
        text: "Desea eliminar el producto del carrito?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
        if (result.isConfirmed) {
            setTimeout(function(){
                alert.classList.add('remove')
            }, 2000)
            alert.classList.remove('remove')
            tr.remove()
            CarritoTotal()
        Swal.fire(
            'Eliminado!',
            'Su producto ha sido eliminado.',
            'success'
        )
        }
    })
    
}



function sumaCantidad(e){
    const sumaInput = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item =>{
        if(item.title.trim() === title){
            sumaInput.value <1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            CarritoTotal()
        }
    })
}

//Guardar datos de formulario






const btn = document.querySelector("#btnComprar");
    btn.addEventListener("click",() =>{
        Swal.fire({
            title:'Felicitaciones',
            text:'Compra realizada con exito',
            icon:'success',
            confirmButtonText:'Ok',
        });
});


//LOCALSTORAGE SE VA A EJECUTAR PARA QUE CUANDO SE REFRESQUE LA PAGINA NO SE BORREN LOS ARTICULOS QUE SE AÑADIERON AL CARRITO


function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
        carrito = storage;
        renderCarrito()
    }
}

var form = document.getElementById('form')

form.addEventListener('submit',function(e){
    e.preventDefault()

    var nombre = document.getElementById('nombre').value
    var apellido = document.getElementById('apellido').value
    var dirección = document.getElementById('dirección').value
    var código = document.getElementById('código').value
    var correo = document.getElementById('correo').value
    var mensaje = document.getElementById('mensaje').value

    fetch('https://jsonplaceholder.typicode.com/posts',{
    method:'POST',
    body: JSON.stringify({
        nombre: nombre,
        apellido:apellido,
        dirección: dirección,
        código: código,
        correo:correo,
        mensaje:mensaje,
        userId:1,
        
    }),
    headers:{
        'content-type': 'application/json;charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    Swal.fire('Datos cargados correctamente')
    })

