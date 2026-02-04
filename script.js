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


/* =========================================
   [新增] 双语切换功能 (Internationalization)
   ========================================= */

// 1. 定义翻译字典 
const translations = {
    'zh': {
        'nav_home': '首頁',
        'nav_product': '產品',


        'company_title': '關於 MīMō',
        'company_desc_1': 'MīMō公司位於香港，專門銷售高端電子產品。該公司成立於 2026 年 1 月 1 日。',
        'company_desc_2': 'MīMō的產品直接從供應商處采購，然後以折扣價出售給公眾。',

        'entry-content-h2': '想了解更多？',
        'entry-content-p': '瀏覽所有產品，找到適合您的那一款。',
        'btn_explore': '探索所有產品',

        'footer_rights': 'Copyright © 2026 MīMō. 保留所有權利。',

        'btn_order': '訂購 >',

        'team_title': '我們的團隊',
        'role_pm': '項目經理',
        'role_analyst': '分析師/開發人員',
        'role_developer': '開發人員',
        'role_tester': '測試人員',

        'role_1': '鄧海龍',
        'role_2': '吳奇航',
        'role_3': '王凌超',
        'role_4': '王子豐'
    },
    'en': {
        'nav_home': 'Home',
        'nav_product': 'Product',


        'company_title': 'About MīMō',
        'company_desc_1': 'MīMō Company is based in Hong Kong that specializes in selling high-end electronic products. It was established on January 1st, 2026.',
        'company_desc_2': "MīMō's products are directly sourced from suppliers and sold to the public at discounted prices.",

        'entry-content-h2': 'Ready to learn more?',
        'entry-content-p': "Browse all products and find the one that's right for you.",
        'btn_explore': 'Explore All Products',

        'footer_rights': 'Copyright © 2026 MīMō. All rights reserved.',

        'btn_order': 'Order >',

        'team_title': 'Our Team',
        'role_pm': 'Project Manager',
        'role_analyst': 'Analyst/Developer',
        'role_developer': 'Developer',
        'role_tester': 'Tester',

        'role_1': 'DENG HAILONG',
        'role_2': 'WU QIHANG',
        'role_3': 'WANG LINGCHAO',
        'role_4': 'WANG ZIFENG'
    }
};

// 2. 当前语言状态 (默认先看本地缓存有没有，没有就默认 'zh')
let currentLang = localStorage.getItem('site_lang') || 'en';

// 页面加载时，先初始化一次语言
document.addEventListener('DOMContentLoaded', () => {
    updateContent();
    updateButtonText();
});

// 3. 切换语言的主函数
function toggleLanguage() {
    // 如果是中文就变英文，反之亦然
    currentLang = currentLang === 'zh' ? 'en' : 'zh';

    // [关键] 把用户的选择存到浏览器里，下次刷新页面还在
    localStorage.setItem('site_lang', currentLang);

    updateContent();
    updateButtonText();
}

// 4. 更新页面文字
function updateContent() {
    // 找到页面上所有带 data-i18n 属性的元素
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
        const key = element.getAttribute('data-i18n'); // 获取"身份证号"
        const text = translations[currentLang][key];   // 去字典里查对应语言的文字

        if (text) {
            element.innerText = text; // 替换文字
        }
    });
}

// 5. 更新按钮显示的文字
function updateButtonText() {
    const btn = document.getElementById('lang-toggle');
    if (currentLang === 'zh') {
        btn.innerText = 'English'; // 如果当前是中文，按钮提示切换到英文
    } else {
        btn.innerText = '中文';    // 如果当前是英文，按钮提示切换到中文
    }
}