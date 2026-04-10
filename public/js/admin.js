$(function () {
    const urlBase = "index.php";
 
    cargarSolicitudes();
 
    function cargarSolicitudes() {
        $.get(urlBase, { option: "solicitudes_json" }, function (data) {
            let solicitudes = typeof data === "string" ? JSON.parse(data) : data;
            let tbody = $("#solicitudes-body");
            tbody.empty();
 
            if (solicitudes.length === 0) {
                tbody.append('<tr><td colspan="6" class="text-center">No hay solicitudes pendientes</td></tr>');
                return;
            }


 
    $(document).on("click", ".btn-aprobar", function () {
        let id = $(this).data("id");
        $.post(urlBase, { option: "aprobar", id_solicitud: id }, function (data) {
            let res = typeof data === "string" ? JSON.parse(data) : data;
            if (res.success) {
                $(`#fila-${id}`).fadeOut(300, function () { $(this).remove(); });
                mostrarMensaje("Solicitud aprobada correctamente", "success");
            } else {
                mostrarMensaje(res.error, "danger");
            }
        });
    });
 
    $(document).on("click", ".btn-rechazar", function () {
        let id = $(this).data("id");
        $.post(urlBase, { option: "rechazar", id_solicitud: id }, function (data) {
            let res = typeof data === "string" ? JSON.parse(data) : data;
            if (res.success) {
                $(`#fila-${id}`).fadeOut(300, function () { $(this).remove(); });
                mostrarMensaje("Solicitud rechazada", "warning");
            } else {
                mostrarMensaje(res.error, "danger");
            }
        });
    });
 
    $("#btnLogout").on("click", function () {
        $.post(urlBase, { option: "logout" }, function () {
            window.location.href = "index.php?page=login";
        });
    });
 
    function mostrarMensaje(texto, tipo) {
        let div = $("#mensaje");
        div.html(`<div class="alert alert-${tipo} mt-3">${texto}</div>`);
        setTimeout(() => div.empty(), 3000);
    }
});