const dropZone = document.getElementById("dropZone");
const BASE_HEIGHT = 160;

dropZone.addEventListener("dragover", e => {
  e.preventDefault();
});

dropZone.addEventListener("drop", e => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  createCharacter(url);
});

function createCharacter(imageUrl) {
  const wrapper = document.createElement("div");
  wrapper.className = "character";

  const img = document.createElement("img");
  img.src = imageUrl;
  img.style.height = "300px";
  img.draggable = false;

  // 身長入力
  const input = document.createElement("input");
  input.type = "number";
  input.value = 160;
  input.style.display = "block";

  input.addEventListener("input", () => {
    const scale = input.value / BASE_HEIGHT;
    wrapper.style.transform = `scale(${scale})`;
  });

  // ドラッグ移動
  let isDragging = false;
  let startX = 0;
  let currentLeft = 0;

  wrapper.addEventListener("mousedown", e => {
    isDragging = true;
    startX = e.clientX;
    currentLeft = wrapper.offsetLeft;
    wrapper.style.zIndex = Date.now();
  });

  document.addEventListener("mousemove", e => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    wrapper.style.left = currentLeft + dx + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // スマホ対応
  wrapper.addEventListener("touchstart", e => {
    isDragging = true;
    startX = e.touches[0].clientX;
    currentLeft = wrapper.offsetLeft;
    wrapper.style.zIndex = Date.now();
  });

  document.addEventListener("touchmove", e => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - startX;
    wrapper.style.left = currentLeft + dx + "px";
  });

  document.addEventListener("touchend", () => {
    isDragging = false;
  });

  wrapper.appendChild(img);
  wrapper.appendChild(input);
  wrapper.style.left = Math.random() * 400 + "px";

  dropZone.appendChild(wrapper);
}
