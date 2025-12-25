const characters = [
  { name: "ゼン 203cm", img: "images/zen.png", x: 1000 },
  { name: "バレット 193cm", img: "images/bullet.png", x: 3050 }, 
  { name: "ヘインバーグ 188cm", img: "images/heinberg.png", x: 3000 }, 
  { name: "看守長 185cm", img: "images/chiefguard.png", x: 3350 }, 
  { name: "眼帯 181cm", img: "images/eyepatch.png", x: 1800 }, 
  { name: "クロス 177cm", img: "images/cross.png", x: 900 },
  { name: "処刑人 176cm", img: "images/theswitchman.png", x: 3600 },
  { name: "シューター 175cm", img: "images/shooter.png", x: 3800 },
  { name: "看守 173cm", img: "images/kansyu_v2.png", x: 200 },
  { name: "ネッド 173cm", img: "images/ned_v2.png", x: 0 },
  { name: "シェフ 171cm", img: "images/chef.png", x: 1400 },
  { name: "弁護士 170cm", img: "images/lawyer.png", x: 2800 },
  { name: "トモ 169cm", img: "images/tomo.png", x: 1200 },
  { name: "新人ちゃん 168cm", img: "images/sinjin.png", x: 400 },
  { name: "ローランド 168cm", img: "images/roland.png", x: 730 },
  { name: "ヒロヤ 167cm", img: "images/hiroya.png", x: 2220 },
  { name: "カズヤ 167cm", img: "images/kazuya_v2.png", x: 2350 },
  { name: "チャン 167cm", img: "images/chan.png", x: 1100 },
  { name: "囚人B 165cm", img: "images/inmateB.png", x: 4150 },
  { name: "アンドル 163cm", img: "images/andol.png", x: 600 },
  { name: "ドクター 161cm", img: "images/doctor_v2.png", x: 2650 },
  { name: "囚人A 159cm", img: "images/inmateA.png", x: 3970 },
  { name: "店長 153cm", img: "images/manager.png", x: 2500 },
  { name: "囚人C 150cm", img: "images/inmateC.png", x: 4300 },
  { name: "ミリィ 149cm", img: "images/milly.png", x: 2050 },
  { name: "メイプル 145cm", img: "images/maple.png", x: 3250 },
  { name: "アルク 110cm", img: "images/alc.png", x: 2200 },
  { name: "わんわん 37cm", img: "images/wanwan.png", x: 1600 },
  { name: "猫 23cm", img: "images/cat.png", x: 1900 }


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
  if (e.touches.length >= 2) {
    return;
  }
  e.preventDefault();
  isDragging = true;
  startX = e.touches[0].clientX;
  currentLeft = wrapper.offsetLeft;
  wrapper.style.zIndex = Date.now();
}, { passive: false });

 document.addEventListener("touchmove", e => {
  if (!isDragging) return;
  if (e.touches.length >= 2) return;  
  e.preventDefault();
  wrapper.style.left =
    currentLeft + (e.touches[0].clientX - startX) + "px";
}, { passive: false });
  
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
