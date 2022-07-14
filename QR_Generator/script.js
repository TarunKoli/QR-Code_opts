const wrapper = document.querySelector(".wrapper");
const generateBtn = wrapper.querySelector(".btns .generate");
const qrInput = wrapper.querySelector(".form input");
const qrImg = wrapper.querySelector(".qr-code img");
const downloadBtn = wrapper.querySelector(".download");

generateBtn.addEventListener("click", () => {
  let qrValue = qrInput.value;
  if (!qrValue) return;

  generateBtn.innerText = "Generating QR Code....";
  const QR = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
  qrImg.src = QR;

  qrImg.addEventListener("load", () => {
    wrapper.classList.add("active");
    generateBtn.innerText = "Generate QR Code";

    downloadBtn.addEventListener("click", () => {
      download(QR);
    });
  });
});

function download(QR) {
  fetch(QR)
    .then((res) => res.blob())
    .then((file) => {
      let tempUrl = URL.createObjectURL(file);
      let aTag = document.createElement("a");
      aTag.href = tempUrl;
      aTag.download = "qr.png";
      document.body.appendChild(aTag);
      aTag.click();
      URL.revokeObjectURL(file);
      aTag.remove();
    });
}

qrInput.addEventListener("keyup", () => {
  if (!qrInput.value) {
    wrapper.classList.remove("active");
  }
});
