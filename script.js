const characters = [
  { name: "ネッド 173cm", img: "images/ned.png", x: 100 },
  { name: "石原 秀人180cm", img: "images/watermark.png", x: 300 }
];

const dropZone = document.getElementById("dropZone");

function createCharacter(name, imageUrl, x) {
  const wrapper = document.createElement("div");
  wrapper.className = "character";
  wrapper.style.position = "absolute";
  wrapper.style.left = x + "px";

  const img = document.createElement("img");
  img.src = imageUrl;
  img.draggable = false;

  // ★ 名前表示
  const label = document.createElement("div");
  label.className = "name";
  label.textContent = name;

  // ドラッグ移動（横だけ）
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
    wrapper.style.left = currentLeft + (e.clientX - startX) + "px";
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
    wrapper.style.left = currentLeft + (e.touches[0].clientX - startX) + "px";
  });

  document.addEventListener("touchend", () => {
    isDragging = false;
  });

  wrapper.appendChild(label);
  wrapper.appendChild(img);
  dropZone.appendChild(wrapper);
}

characters.forEach(c => {
  createCharacter(c.name, c.img, c.x);
});
