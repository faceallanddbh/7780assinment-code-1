// 轮播图逻辑
let slideIndex = 1;
showSlides(slideIndex);

// 自动播放，每5秒切换一次
let autoSlide = setInterval(() => {
    plusSlides(1);
}, 5000);

function plusSlides(n) {
    showSlides(slideIndex += n);
    // 重置自动播放计时器，防止用户点击后马上又自动切换
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
        plusSlides(1);
    }, 5000);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");

    // 如果索引超过最大值，回到第一张
    if (n > slides.length) { slideIndex = 1 }
    // 如果索引小于1，跳到最后一张
    if (n < 1) { slideIndex = slides.length }

    // 隐藏所有图片
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove("active");
    }

    // 显示当前图片
    slides[slideIndex - 1].style.display = "block";
    setTimeout(() => {
        slides[slideIndex - 1].classList.add("active");
    }, 10); // 微小延迟触发CSS transition
}