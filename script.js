const characters = [
  { name: "ゼン 203cm", img: "images/zen.png", x: 1000 },
  { name: "クロス 177cm", img: "images/cross.png", x: 900 },
  { name: "看守 173cm", img: "images/kansyu_v2.png", x: 200 },
  { name: "ネッド 173cm", img: "images/ned_v2.png", x: 0 },
  { name: "トモ 169cm", img: "images/tomo.png", x: 1200 },
  { name: "新人ちゃん 168cm", img: "images/sinjin.png", x: 400 },
  { name: "ローランド 168cm", img: "images/roland.png", x: 730 },
  { name: "チャン 167cm", img: "images/chan.png", x: 1100 },
  { name: "アンドル 163cm", img: "images/andol.png", x: 600 }

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
    e.preventDefault();
    isDragging = true;
    startX = e.touches[0].clientX;
    currentLeft = wrapper.offsetLeft;
    wrapper.style.zIndex = Date.now();
  });

  document.addEventListener("touchmove", e => {
    if (!isDragging) return;
    e.preventDefault();
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

let namesVisible = true;

document.getElementById("toggleNames").addEventListener("click", () => {
  namesVisible = !namesVisible;

  document.querySelectorAll(".name").forEach(name => {
    name.style.display = namesVisible ? "inline-block" : "none";
  });

  document.getElementById("toggleNames").textContent =
    namesVisible ? "名前を非表示" : "名前を表示";
});
