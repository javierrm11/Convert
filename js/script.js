function convertirImagen() {
    var input = document.getElementById('archivo');
    var file = input.files[0];
    var formato = document.querySelector('.tipos').value;

    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var img = new Image();
            img.onload = function() {
                var canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                if (formato === 'pdf') {
                    var pdf = new jspdf.jsPDF();
                    pdf.addImage(canvas, 'PNG', 0, 0);
                    pdf.save('imagen.pdf');
                } else {
                    var imageData;

                    if (formato === 'png') {
                        imageData = canvas.toDataURL("image/png");
                    } else if (formato === 'jpg') {
                        imageData = canvas.toDataURL("image/jpeg");
                    } else if (formato === 'webp'){
                        imageData = canvas.toDataURL("image/webp");
                    }

                    // Muestra el botón de descarga
                    var descargarBoton = document.getElementById('descargar');
                    descargarBoton.setAttribute('href', imageData);
                    descargarBoton.style.display = 'inline';
                }
            };
            img.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
}