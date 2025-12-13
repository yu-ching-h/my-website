// 頁面管理
function showPage(pageId) {
    // 隱藏所有頁面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    // 顯示指定頁面
    document.getElementById(pageId).classList.remove('hidden');
}

// ==================== 首頁邏輯 ====================

const wasteBtn = document.getElementById('waste-btn');
const exitBtn = document.getElementById('exit-btn');
const settingsBtn = document.getElementById('settings-btn');

// 浪費按鈕點擊
wasteBtn.addEventListener('click', () => {
    showPage('waiting-page');
    
    // 顯示提示文字
    showHints();
    
    // 5 秒後顯示結果
    setTimeout(() => {
        showPage('result-page');
    }, 5000);
});

// 顯示提示文字的邏輯
function showHints() {
    const hints = [
        document.getElementById('hint-1'),
        document.getElementById('hint-2'),
        document.getElementById('hint-3')
    ];

    hints[0].classList.remove('hidden'); // 第一個提示立即顯示

    setTimeout(() => {
        hints[1].classList.remove('hidden'); // 2 秒後顯示第二個
    }, 2000);

    setTimeout(() => {
        hints[2].classList.remove('hidden'); // 4 秒後顯示第三個
    }, 4000);
}

// ==================== 退出按鈕邏輯 ====================

let touchCount = 0;
const TOUCHES_NEEDED = 5;
let isExitBtnActive = false;

// 退出按鈕的跳動效果
exitBtn.addEventListener('mouseenter', makeButtonJump);
exitBtn.addEventListener('click', (e) => {
    if (isExitBtnActive) {
        e.preventDefault();
        handleFakeExit();
    }
});

function makeButtonJump(e) {
    const button = e.target;
    
    // 增加碰觸計數
    touchCount++;
    
    // 計算新位置，確保按鈕在視窗範圍內
    const maxX = window.innerWidth - button.offsetWidth - 20;
    const maxY = window.innerHeight - button.offsetHeight - 20;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    // 直接改變按鈕位置
    button.style.position = 'fixed';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
    button.classList.add('jumping');
    
    // 移除 button-container 的 flex 佈局影響
    if (button.parentElement.classList.contains('button-container')) {
        button.style.position = 'fixed';
    }
    
    // 更新或移除計數器
    updateTouchCounter();
    
    // 檢查是否達到目標次數
    if (touchCount >= TOUCHES_NEEDED) {
        isExitBtnActive = true;
        button.classList.remove('exit-btn-disabled');
        button.style.opacity = '1';
        
        // 移除 mouseenter 事件監聽，讓按鈕停止跳動
        button.removeEventListener('mouseenter', makeButtonJump);
        
        // 移除計數器
        const counter = button.querySelector('.exit-btn-touch-count');
        if (counter) {
            counter.remove();
        }
    } else {
        button.classList.add('exit-btn-disabled');
    }
}

function updateTouchCounter() {
    let counter = exitBtn.querySelector('.exit-btn-touch-count');
    
    if (!counter) {
        counter = document.createElement('span');
        counter.className = 'exit-btn-touch-count';
        exitBtn.appendChild(counter);
    }
    
    const remaining = TOUCHES_NEEDED - touchCount;
    counter.textContent = remaining > 0 ? remaining : '✓';
    counter.style.backgroundColor = remaining > 0 ? '#ff9800' : '#4CAF50';
}

function handleFakeExit() {
    // 觸發黑屏效果
    document.body.classList.add('black-screen');
    
    setTimeout(() => {
        document.body.classList.remove('black-screen');
        showPage('fake-exit-page');
        
        // 重置退出按鈕狀態
        resetExitButton();
    }, 300);
}

function resetExitButton() {
    touchCount = 0;
    isExitBtnActive = false;
    
    // 重新設置按鈕到正常位置
    exitBtn.style.position = 'relative';
    exitBtn.style.left = 'auto';
    exitBtn.style.top = 'auto';
    exitBtn.classList.remove('jumping', 'exit-btn-disabled');
    exitBtn.style.opacity = '1';
    
    // 重新加入事件監聽
    exitBtn.addEventListener('mouseenter', makeButtonJump);
    
    // 移除計數器
    const counter = exitBtn.querySelector('.exit-btn-touch-count');
    if (counter) {
        counter.remove();
    }
}

// ==================== 假退出頁面邏輯 ====================

const retryExitBtn = document.getElementById('retry-exit-btn');
retryExitBtn.addEventListener('click', () => {
    resetExitButton();
    showPage('home-page');
});

// ==================== 設定頁面邏輯 ====================

const settingsPage = document.getElementById('settings-page');
const closeSettingsBtn = document.getElementById('close-settings-btn');
const wasteModeCbx = document.getElementById('waste-mode-toggle');

settingsBtn.addEventListener('click', () => {
    showPage('settings-page');
});

closeSettingsBtn.addEventListener('click', () => {
    showPage('home-page');
});

// 禁用浪費模式複選框（無法關閉）
wasteModeCbx.addEventListener('change', (e) => {
    e.preventDefault();
    wasteModeCbx.checked = true; // 強制保持勾選
});

// 嘗試透過鍵盤取消勾選
wasteModeCbx.addEventListener('keydown', (e) => {
    e.preventDefault();
});

// ==================== 返回首頁邏輯 ====================

const backToHomeBtn = document.getElementById('back-to-home-btn');
backToHomeBtn.addEventListener('click', () => {
    // 重置提示文字的顯示狀態
    document.getElementById('hint-1').classList.add('hidden');
    document.getElementById('hint-2').classList.add('hidden');
    document.getElementById('hint-3').classList.add('hidden');
    
    showPage('home-page');
});

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    showPage('home-page');
});
