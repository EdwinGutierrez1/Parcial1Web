document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos (código existente)
    const servicioCards = document.querySelectorAll('.servicio-card');
    const totalPreview = document.getElementById('total-preview');
    const totalFinal = document.getElementById('total-final');
    const continuarBtn = document.getElementById('continuar-btn');
    const serviciosSection = document.querySelector('.servicios-section');
    const formularioSection = document.querySelector('.formulario-section');
    const resumenReserva = document.getElementById('resumen-reserva');
    const cantidadPersonas = document.getElementById('cantidad-personas');
    const cantidadPersonasResumen = document.getElementById('cantidad-personas-resumen');
    const decrementarBtn = document.getElementById('decrementar');
    const incrementarBtn = document.getElementById('incrementar');
    const precioBase = document.getElementById('precio-base').textContent;
    const precioBaseInput = document.getElementById('precio-base-input');
    
    // Constantes para los precios de servicios
    const PRECIO_COMIDA = 60000; // por persona
    const PRECIO_DECORACION = 150000; // precio fijo
    const PRECIO_ACTIVIDADES = 80000; // por persona
    const PRECIO_BASE_PERSONA = 60000; // precio base por persona
    
    // Función para formatear números con puntos de miles
    function formatearPrecio(numero) {
        return numero.toLocaleString('es-CL');
    }
    
    let serviciosActivos = {
        'servicio1': false,
        'servicio2': false,
        'servicio3': false
    };
    
    // Calcular el total inicial
    calcularTotal();
    
    // Añadir eventos a los botones de incrementar/decrementar personas
    decrementarBtn.addEventListener('click', function() {
        if (parseInt(cantidadPersonas.value) > 1) {
            cantidadPersonas.value = parseInt(cantidadPersonas.value) - 1;
            cantidadPersonasResumen.textContent = cantidadPersonas.value;
            calcularTotal();
        }
    });
    
    incrementarBtn.addEventListener('click', function() {
        if (parseInt(cantidadPersonas.value) < 10) {
            cantidadPersonas.value = parseInt(cantidadPersonas.value) + 1;
            cantidadPersonasResumen.textContent = cantidadPersonas.value;
            calcularTotal();
        }
    });
    
    cantidadPersonas.addEventListener('input', function() {
        // Asegurar que esté entre 1 y 10
        if (parseInt(this.value) < 1) this.value = 1;
        if (parseInt(this.value) > 10) this.value = 10;
        cantidadPersonasResumen.textContent = this.value;
        calcularTotal();
    });
    
    // Añadir evento de clic a cada tarjeta de servicio
    servicioCards.forEach(card => {
        card.addEventListener('click', function() {
            // Obtener el ID del servicio
            const serviceId = this.id.replace('card-', '');
            
            // Toggle selección
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                serviciosActivos[serviceId] = false;
                document.getElementById(serviceId).value = "0";
            } else {
                this.classList.add('selected');
                serviciosActivos[serviceId] = true;
                document.getElementById(serviceId).value = "1";
            }
            
            // Actualizar totales
            calcularTotal();
        });
    });
    
    // Función para calcular el total
    function calcularTotal() {
        const personas = parseInt(cantidadPersonas.value);
        let total = PRECIO_BASE_PERSONA * personas; // Precio base por persona
        
        // Añadir servicios seleccionados
        if (serviciosActivos.servicio1) {
            total += PRECIO_COMIDA * personas; // Servicio de comidas (por persona)
        }
        
        if (serviciosActivos.servicio2) {
            total += PRECIO_DECORACION; // Servicio de decoraciones (precio fijo)
        }
        
        if (serviciosActivos.servicio3) {
            total += PRECIO_ACTIVIDADES * personas; // Actividades extras (por persona)
        }
        
        // Actualizar totales en la página con formato de miles
        totalPreview.textContent = formatearPrecio(total);
        totalFinal.textContent = formatearPrecio(total);
        
        // Actualizar el resumen de la reserva
        actualizarResumen();
    }
    
    // Función para actualizar el resumen de la reserva
    function actualizarResumen() {
        resumenReserva.innerHTML = '';
        const personas = parseInt(cantidadPersonas.value);
        
        // Añadir línea de precio base
        const liBase = document.createElement('li');
        liBase.textContent = `Precio base: $${formatearPrecio(PRECIO_BASE_PERSONA)} × ${personas} persona(s) = $${formatearPrecio(PRECIO_BASE_PERSONA * personas)}`;
        resumenReserva.appendChild(liBase);
        
        // Añadir servicios seleccionados
        if (serviciosActivos.servicio1) {
            const li = document.createElement('li');
            li.textContent = `Servicio de Comidas: $${formatearPrecio(PRECIO_COMIDA)} × ${personas} persona(s) = $${formatearPrecio(PRECIO_COMIDA * personas)}`;
            resumenReserva.appendChild(li);
        }
        
        if (serviciosActivos.servicio2) {
            const li = document.createElement('li');
            li.textContent = `Servicio de Decoraciones: $${formatearPrecio(PRECIO_DECORACION)} (precio fijo)`;
            resumenReserva.appendChild(li);
        }
        
        if (serviciosActivos.servicio3) {
            const li = document.createElement('li');
            li.textContent = `Actividades Extras: $${formatearPrecio(PRECIO_ACTIVIDADES)} × ${personas} persona(s) = $${formatearPrecio(PRECIO_ACTIVIDADES * personas)}`;
            resumenReserva.appendChild(li);
        }
    }
    
    // Evento para el botón de continuar
    continuarBtn.addEventListener('click', function() {
        serviciosSection.style.display = 'none';
        formularioSection.style.display = 'block';
        
        // Transferir el número de personas al formulario
        document.getElementById('personas').value = cantidadPersonas.value;
    });
    
    // NUEVO CÓDIGO: Crear y configurar botón "Volver"
    // 1. Crear el botón si no existe
    let volverBtn = document.getElementById('volver-btn');
    if (!volverBtn) {
        volverBtn = document.createElement('button');
        volverBtn.id = 'volver-btn';
        volverBtn.className = 'btn btn-secondary'; // Puedes ajustar la clase según tu diseño
        volverBtn.textContent = 'Volver a servicios';
        
        // Insertar el botón al inicio del formulario (puedes ajustar la ubicación)
        const formularioHeader = formularioSection.querySelector('h2') || formularioSection.firstChild;
        formularioSection.insertBefore(volverBtn, formularioHeader);
    }
    
    // 2. Añadir el evento al botón para volver a la sección de servicios
    volverBtn.addEventListener('click', function() {
        formularioSection.style.display = 'none';
        serviciosSection.style.display = 'block';
    });
});