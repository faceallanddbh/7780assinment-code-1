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
        'nav_home': '首页',
        'nav_product': '产品',


        'company_title': '关于 Green World',
        'company_desc_1': '绿世界公司是一家位于香港的新循环再造概念机构成立于2026年1月1日。',
        'company_desc_2': '绿色世界的产品是由公众捐赠，并出售给公众折扣价格。',

        'entry-content-h2': '想了解更多？',
        'entry-content-p': '浏览所有产品，找到适合您的那一款。',
        'btn_explore': '探索所有产品',

        'footer_rights': 'Copyright © 2026 Green World. 保留所有权利。',

        'btn_order': '订购 >',

        'team_title': '我们的团队',
        'role_pm': '项目经理',
        'role_analyst': '分析师',
        'role_developer': '开发人员',
        'role_tester': '测试人员',

        'role_1': '邓海龙',
        'role_2': '吴奇航',
        'role_3': '王凌超',
        'role_4': '王子丰'
    },
    'en': {
        'nav_home': 'Home',
        'nav_product': 'product',


        'company_title': 'About Green World',
        'company_desc_1': 'Green World company is a new re-cycling concept organizationbased in Hong Kong which established on Jan 1,2026.',
        'company_desc_2': "Green World's products were donated by the public and sold tothe public with discounted price.",

        'entry-content-h2': 'Ready to learn more?',
        'entry-content-p': "Browse all products and find the one that's right for you.",
        'btn_explore': 'Explore All Products',

        'footer_rights': 'Copyright © 2026 Green World. All rights reserved.',

        'btn_order': 'Order >',

        'team_title': 'Our Team',
        'role_pm': 'Project Manager',
        'role_analyst': 'Analyst',
        'role_developer': 'Developer',
        'role_tester': 'Tester',

        'role_1': 'DENG HAILONG',
        'role_2': 'Wu QIHANG',
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