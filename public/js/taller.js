

$(function () {

    const urlBase = "index.php";

    cargarTalleres();


        $(document).on("click", ".btn-solicitar", function () {
        let tallerId = $(this).data("id");

        $.post(urlBase, { option: "solicitar", taller_id: tallerId }, function (data) {
            let res = typeof data === "string" ? JSON.parse(data) : data;
            mostrarMensaje(res.message || res.error, res.success ? "success" : "danger");
        });
    });

    function cargarTalleres() {
        $.get(urlBase, { option: "talleres_json" }, function (data) {
            let talleres = typeof data === "string" ? JSON.parse(data) : data;
            let tbody = $("#talleres-body");
            tbody.empty();

            if (talleres.length === 0) {
                tbody.append('<tr><td colspan="5" class="text-center">No hay talleres disponibles</td></tr>');
                return;
            }



    $("#btnLogout").on("click", function () {
        $.post(urlBase, { option: "logout" }, function () {
            window.location.href = "index.php?page=login";
        });
    });

    function mostrarMensaje(texto, tipo) {
        let div = $("#mensaje");
        div.html(`<div class="alert alert-${tipo}">${texto}</div>`);
        setTimeout(() => div.empty(), 3000);
    }
});
