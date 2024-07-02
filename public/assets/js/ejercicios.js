// Exportar las funciones que necesitan ser usadas en otros archivos
export function configurarEventosEjercicios() {
    obtenerEjercicios();
    // Evento para mostrar el modal de inserción de ejercicio
    $('#btnInsertarEjercicio').on('click', function() {
        $('#modalInsertarEjercicio').modal('show');
    });

    // Evento para guardar el nuevo ejercicio
    $(document).off('click', '#btnGuardarEjercicio').on('click', '#btnGuardarEjercicio', function() {
        const nombre = $('#nombreEjercicio').val();
        const descripcion = $('#descripcionEjercicio').val();

        $.ajax({
            url: 'http://localhost/PROYECTOS/GymAppBack(PHP)/GymApp-BackEnd-PHP/public/index.php?action=insertarEjercicio',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                nombre: nombre,
                descripcion: descripcion
            }),
            success: function(response) {
                $('#nombreEjercicio').val('');
                $('#descripcionEjercicio').val('');
                $('#modalInsertarEjercicio').modal('hide');
                obtenerEjercicios(); // Actualizar la tabla con los nuevos datos
                console.log(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error al insertar el ejercicio:', textStatus, errorThrown);
            }
        });
    });

    // Evento para mostrar el modal de modificación de ejercicio
    $('#tabla-ejercicios').off('click').on('click', '.btn_modificar', function() {
        const ejercicioID = $(this).data('id');
        // Cargar datos del ejercicio y mostrar en el modal de modificación
        $('#modalModificarEjercicio').modal('show');
        
        // Hacer una solicitud AJAX para obtener los datos del ejercicio
        $.ajax({
            url: `http://localhost/PROYECTOS/GymAppBack(PHP)/GymApp-BackEnd-PHP/public/index.php?action=obtenerEjercicio&id=${ejercicioID}`,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                // Llenar el formulario del modal con los datos del ejercicio
                $('#modificarEjercicioID').val(data.ejercicio.ID);
                $('#modificarNombreEjercicio').val(data.ejercicio.T_NOMBRE);
                $('#modificarDescripcionEjercicio').val(data.ejercicio.T_DESCRIPCION);

                // Mostrar el modal de modificación
                $('#modalModificarEjercicio').modal('show');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error al obtener los datos del ejercicio:', textStatus, errorThrown);
            }
        });
    });

    // Evento para actualizar el ejercicio
    $(document).off('click', '#btnGuardarCambiosEjercicio').on('click', '#btnGuardarCambiosEjercicio', function() {
        
        const id = $('#modificarEjercicioID').val();
        const nombre = $('#modificarNombreEjercicio').val();
        const descripcion = $('#modificarDescripcionEjercicio').val();

        $.ajax({
            url: `http://localhost/PROYECTOS/GymAppBack(PHP)/GymApp-BackEnd-PHP/public/index.php?action=actualizarEjercicio&id=${id}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                nombre: nombre,
                descripcion: descripcion
            }),
            success: function(response) {
                $('#modalModificarEjercicio').modal('hide');
                obtenerEjercicios(); // Actualizar la tabla con los nuevos datos
                console.log(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error al actualizar el ejercicio:', textStatus, errorThrown);
            }
        });
    });

    // Evento para mostrar el modal de confirmación de eliminación de ejercicio
    $('#tabla-ejercicios').off('click', '.btn_eliminar').on('click', '.btn_eliminar', function() {
        const ejercicioID = $(this).data('id');
        $('#modalEliminarEjercicio').modal('show');
        // Puedes almacenar el ID del ejercicio en un atributo de datos del botón de confirmación
        $('#btnConfirmarEliminarEjercicio').data('id', ejercicioID);
        console.log($('#btnConfirmarEliminarEjercicio').data('id'));
    });

    // Evento para confirmar la eliminación del ejercicio
    $('#btnConfirmarEliminarEjercicio').off('click').on('click', function() {
        const ejercicioID = $(this).data('id');

        $.ajax({
            url: `http://localhost/PROYECTOS/GymAppBack(PHP)/GymApp-BackEnd-PHP/public/index.php?action=eliminarEjercicio&id=${ejercicioID}`,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                $('#modalEliminarEjercicio').modal('hide');
                obtenerEjercicios(); // Actualizar la tabla con los nuevos datos
                console.log(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error al eliminar el ejercicio:', textStatus, errorThrown);
            }
        });
    });
}

function obtenerEjercicios() {
    $.ajax({
        url: 'http://localhost/PROYECTOS/GymAppBack(PHP)/GymApp-BackEnd-PHP/public/index.php?action=obtenerTodosEjercicios',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('Datos recibidos:', data);
            mostrarEjercicios(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error al obtener los ejercicios:', textStatus, errorThrown);
        }
    });
}

    // Función para mostrar los ejercicios en la tabla
    function mostrarEjercicios(ejercicios) {
        const tbody = $('#tabla-ejercicios');
        tbody.empty(); // Limpiar el contenido existente

        ejercicios.forEach(ejercicio => {
            const fila = `<tr id="${ejercicio.ID}">
                            <td>${ejercicio.T_NOMBRE}</td>
                            <td>${ejercicio.T_DESCRIPCION}</td>
                            <td>
                                <button class="btn btn-primary btn-sm btn_modificar" data-id="${ejercicio.ID}">
                                    <i class="fas fa-edit"></i> Editar
                                </button>
                            </td>
                            <td>
                                <button class="btn btn-danger btn-sm btn_eliminar" data-id="${ejercicio.ID}">
                                    <i class="fas fa-trash-alt"></i> Eliminar
                                </button>
                            </td>

                        </tr>`;
            tbody.append(fila);
        });
    }
