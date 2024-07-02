import { configurarEventosEjercicios } from './ejercicios.js';

$(document).ready(function() {
    const mainContent = $('#main-content');

    function cargarVista(vista) {
        $.get(`views/${vista}.html`, function(data) {
            mainContent.html(data);
            configurarEventos(vista);
        });
    }

    $('#main-menu a').off('click').on('click', function(event) {
        event.preventDefault();
        const vista = $(this).data('view');

        $('#main-menu a').removeClass('active');
        $(this).addClass('active');

        cargarVista(vista);
    });

    cargarVista('inicio');

    function configurarEventos(vista) {
        switch (vista) {
            case 'ejercicios':
                configurarEventosEjercicios();
                break;
            case 'rutinas':
                configurarEventosRutinas();
                break;
        }
    }
});
