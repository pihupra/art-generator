const ASCII_CHARS = "@%#*+=-:. ";

function imageToASCII(img) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const width = 100; // fixed output width
    const height = Math.floor(img.height * width / img.width / 2);

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(img, 0, 0, width, height);
    const data = ctx.getImageData(0, 0, width, height).data;

    let ascii = "";
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        const gray = 0.299*r + 0.587*g + 0.114*b;
        ascii += ASCII_CHARS[Math.floor(gray * ASCII_CHARS.length / 256)];
        if ((i/4 + 1) % width === 0) ascii += "\n";
    }
    return ascii;
}

document.getElementById("upload").addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            document.getElementById("ascii-output").innerText = imageToASCII(img);
        };
        img.src = e.target.result;
    };

    if(file) reader.readAsDataURL(file);
});
