// ==================== البيانات الأساسية ====================
let cart = [];
let visitors = [];
let sales = [];
const ADMIN_PASSWORD = "gamecharge2024"; // غير كلمة المرور!

// ==================== جمع معلومات الزائر ====================
async function captureVisitorInfo() {
    try {
        // جلب IP العام
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const visitorIP = ipData.ip;

        // معلومات الجهاز والمتصفح
        const userAgent = navigator.userAgent;
        const deviceType = getDeviceType(userAgent);
        const osType = getOS(userAgent);
        const browserType = getBrowser(userAgent);

        // جلب معلومات الدولة (اختياري)
        let country = "غير معروف";
        try {
            const geoResponse = await fetch(`https://ipapi.co/${visitorIP}/json/`);
            const geoData = await geoResponse.json();
            country = geoData.country_name || "غير معروف";
        } catch (e) {
            console.log("لم يتمكن من جلب معلومات الدولة");
        }

        // إنشء كائن الزائر
        const visitor = {
            id: visitors.length + 1,
            ip: visitorIP,
            device: deviceType,
            os: osType,
            browser: browserType,
            country: country,
            timestamp: new Date().toLocaleString('ar-SA')
        };

        // إضافة إلى قائمة الزوار
        visitors.push(visitor);
        localStorage.setItem('visitors', JSON.stringify(visitors));
        
        console.log("تم تسجيل الزائر:", visitor);

    } catch (error) {
        console.log("خطأ في جلب معلومات الزائر:", error);
    }
}

// تحديد نوع الجهاز
function getDeviceType(userAgent) {
    if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
        return "📱 هاتف ذكي";
    } else if (/tablet|ipad|android/i.test(userAgent)) {
        return "📱 جهاز لوحي";
    } else {
        return "💻 حاسوب";
    }
}

// تحديد نظام التشغيل
function getOS(userAgent) {
    if (/windows/i.test(userAgent)) return "Windows";
    if (/macintosh|macintel/i.test(userAgent)) return "macOS";
    if (/android/i.test(userAgent)) return "Android";
    if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS";
    if (/linux/i.test(userAgent)) return "Linux";
    return "غير معروف";
}

// تحديد المتصفح
function getBrowser(userAgent) {
    if (/edg/i.test(userAgent)) return "Edge";
    if (/chrome/i.test(userAgent) && !/edg/i.test(userAgent)) return "Chrome";
    if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) return "Safari";
    if (/firefox/i.test(userAgent)) return "Firefox";
    if (/trident/i.test(userAgent)) return "Internet Explorer";
    return "غير معروف";
}

// ==================== وظائف السلة ====================
function addToCart(product, price) {
    const existingItem = cart.find(item => item.product === product);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            product: product,
            price: price,
            quantity: 1
        });
    }
    
    updateCart();
    alert(`✅ تم إضافة "${product}" إلى السلة!`);
}

function updateCart() {
    const cartBody = document.getElementById('cartBody');
    cartBody.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.product}</td>
            <td>${item.price} ر.س</td>
            <td>
                <button onclick="changeQuantity(${index}, -1)" style="padding: 5px 10px; background-color: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">-</button>
                <span style="margin: 0 10px;">${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)" style="padding: 5px 10px; background-color: #667eea; color: white; border: none
