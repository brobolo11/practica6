$(document).ready(function () {

    // Mostrar todas las cartas
    $('#mostrarTodos').on('click', function () {
        $.ajax({
            url: "http://localhost:5000/users",
            type: "GET",
            success: function (data) {
                $(".cartas").empty();
                for (let cadaUsuario of data) {
                    $(".cartas").append(
                        `<div class="cartaUsuario">
                            <p>ID:${cadaUsuario.id}</p>
                            <p>${cadaUsuario.nombre} ${cadaUsuario.apellido}</p>
                            <p>${cadaUsuario.tlf}</p>
                        </div>`
                    );
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", status, error);
                $(".cartas").html("<p id='mensajeError'>Error al buscar en la base de datos</p>");
            }
        });
    });

    // Buscar usuario por ID
    $('#buscarID').on('click', function () {
        let id = $("#usuarioID").val();

        $.ajax({
            url: `http://localhost:5000/users/${id}`,
            type: "GET",
            success: function (data) {
                $(".cartas").empty();
                $(".cartas").append(
                    `<div class="cartaUsuario">
                        <p>ID:${data.id}</p>
                        <p>${data.nombre} ${data.apellido}</p>
                        <p>${data.tlf}</p>
                    </div>`
                );
            },
            error: function (xhr, status, error) {
                console.error("Error:", status, error);
                $(".cartas").html("<p id='mensajeError'>Error al encontrar el ID en la base de datos</p>");
            }
        });
    });

    // Mostrar el modal al hacer clic en "nuevo usuario"
    $('#nuevoUsuario').on('click', function () {
        $('.modal').fadeIn();
    });

    // Ocultar el modal al hacer clic en "Cancelar"
    $('#cancelar').on('click', function () {
        $('.modal').fadeOut();
    });

    // Ocultar el modal al hacer clic fuera del contenido del modal
    $('.modal').on('click', function (e) {
        if ($(e.target).is('.modal')) {
            $('.modal').fadeOut();
        }
    });

    // Manejar la presentación del formulario
    $('#form').on('submit', function (e) {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    
        const nombre = $('#nombre').val();
        const apellido = $('#apellido').val();
        const telefono = $('#tlf').val();
    
        // Crear el objeto con los datos del nuevo usuario
        const nuevoUsuario = {
            nombre: nombre,
            apellido: apellido,
            tlf: telefono
        };
    
        // Hacer la solicitud POST al servidor
        $.ajax({
            url: "http://localhost:5000/users",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(nuevoUsuario),
            success: function (response) {
                // Agregar la nueva tarjeta al contenedor de cartas
                const nuevaCarta = `
                    <div class="cartaUsuario">
                        <p>ID:${response.id}</p>
                        <p>${response.nombre} ${response.apellido}</p>
                        <p>${response.tlf}</p>
                    </div>
                `;
                $('.cartas').append(nuevaCarta);
    
                // Limpiar los campos del formulario y cerrar el modal
                $('#form')[0].reset();
                $('.modal').fadeOut();
            },
            error: function (xhr, status, error) {
                console.error("Error al crear el usuario:", error);
                alert("No se pudo crear el usuario. Intenta nuevamente.");
            }
        });
    });
    
});
