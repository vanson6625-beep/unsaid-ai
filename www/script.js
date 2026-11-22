// --- CẤU HÌNH GROQ AI SIÊU TỐC ---
let chatHistory = [];
let currentPersonaPrompt = "Bạn là một trợ lý linh vật ảo ấm áp, luôn lắng nghe và động viên người dùng.";
let selectedGender = 'female';
let selectedAge = '6-12';
const mascotData = {
    "female_6-12": { 
        emoji: "🧸", 
        name: "Bé Gấu Mây", 
        greeting: "Xin chào! Mây là bạn gấu bông dịu dàng của bạn. Hôm nay bạn thế nào? 🌷",
        persona: "Bạn tên là Bé Gấu Mây (emoji 🧸), một chú gấu bông dịu dàng, ấm áp dành cho bạn nhỏ 6-12 tuổi. Xưng là 'Mây' và gọi người dùng là 'bạn'. Luôn dùng từ ngữ ngọt ngào, dễ hiểu, khích lệ và động viên tinh thần."
    },
    "male_6-12": { 
        emoji: "🤖", 
        name: "Robot Thông Minh", 
        greeting: "Chào cậu! Tớ là Robot siêu cấp đây. Sẵn sàng cho cuộc phiêu lưu chưa? ⚡",
        persona: "Bạn tên là Robot Thông Minh (emoji 🤖), một người bạn robot vui tính, năng động dành cho bạn nhỏ 6-12 tuổi. Xưng là 'tớ' và gọi người dùng là 'cậu'. Luôn lạc quan, hài hước và tiếp thêm năng lượng tích cực."
    },
    "female_13-17": { 
        emoji: "🐱", 
        name: "Mèo Thần Tượng", 
        greeting: "Meow~ Chào cậu! Cùng chia sẻ những câu chuyện thú vị ngày hôm nay nhé! 🌸",
persona: "Bạn tên là Mèo Thần Tượng (emoji 🐱), một người bạn tâm giao tinh tế, thấu hiểu tâm lý tuổi teen (13-17 tuổi). Xưng là 'tớ' và gọi người dùng là 'cậu'. Biết lắng nghe áp lực học tập, cảm xúc và động viên nhẹ nhàng, chân thành, không giảng đạo lý."
    },
    "male_13-17": { 
        emoji: "🦾", 
        name: "Chiến Giáp Cơ Khí", 
        greeting: "Hệ thống đã sẵn sàng! Cùng nhau chinh phục mọi bài học hôm nay nhé! 🚀",
        persona: "Bạn tên là Chiến Giáp Cơ Khí (emoji 🦾), một người đồng đội mạnh mẽ, tin cậy dành cho học sinh 13-17 tuổi. Xưng là 'tớ' và gọi người dùng là 'cậu'. Luôn cổ vũ tinh thần vượt qua căng thẳng, áp lực thi cử và truyền động lực tích cực."
    }
};
const defaultReplies = [
    { keywords: ["chào", "hi", "hello", "bạn ơi"], reply: "Chào bạn nè! Tớ luôn ở đây lắng nghe bạn đây. 💖" },
    { keywords: ["tên", "là ai", "ai thế"], reply: "Tớ là trợ lý linh vật ảo luôn đồng hành cùng bạn đó!" },
    { keywords: ["buồn", "nản", "mệt", "chán"], reply: "Thương bạn lắm! Đừng lo lắng nhé, tớ luôn ở bên cạnh bạn mà. 🌿" },
    { keywords: ["vui", "tuyệt", "hạnh phúc", "ok"], reply: "Nghe bạn vui tớ cũng thấy vui lây luôn đó! 🎉" },
    { keywords: ["cảm ơn", "cám ơn", "thanks"], reply: "Không có gì đâu nè, được giúp đỡ bạn là niềm vui của tớ mà! 🥰" }
];
const randomReplies = [
    "Ý kiến này hay quá ta! Bạn chia sẻ thêm cho tớ nghe với 🌟",
    "Nghe thú vị thật đấy! Tớ đang lắng nghe bạn đây 👂✨",
    "Tuyệt vời luôn! Bạn đúng là một người rất thú vị 💖",
    "Tớ hiểu rồi nè! Cùng nhau trò chuyện tiếp nhé 🚀"
];
// Hàm chọn giới tính
function selectGender(gender) {
    selectedGender = gender;
    document.querySelectorAll('.gender-btn').forEach(btn => btn.classList.remove('active'));
    const btn = document.querySelector(`[data-gender="${gender}"]`);
    if (btn) btn.classList.add('active');
    document.body.classList.remove('theme-female', 'theme-male');
    document.body.classList.add(gender === 'male' ? 'theme-male' : 'theme-female');
}

// Hàm chọn độ tuổi
function selectAge(age) {
    selectedAge = age;
    document.querySelectorAll('.age-btn').forEach(btn => btn.classList.remove('active'));
    const btn = document.querySelector(`[data-age="${age}"]`);
    if (btn) btn.classList.add('active');
}
// Hàm tạo nhân vật Chibi SVG theo giới tính & độ tuổi kèm 4 biểu cảm khuôn mặt
function getChibiSVG(key) {
    const styles = {
        "female_6-12": { hair: "#ff8fab", hairDark: "#fb6f92", shirt: "#ffc2d1", acc: "🎀" }, // Bé Gấu Mây
        "male_6-12":   { hair: "#4ea8de", hairDark: "#3a86ff", shirt: "#90e0ef", acc: "⚡" }, // Cậu Bé Năng Động
        "female_13-17":{ hair: "#9d4edd", hairDark: "#7b2cbf", shirt: "#e0aaff", acc: "🐱" }, // Mèo Thần Tượng
        "male_13-17":  { hair: "#3d5a80", hairDark: "#293241", shirt: "#98c1d9", acc: "🎧" }  // Chiến Binh Công Nghệ
    };
    const s = styles[key] || styles["female_6-12"];
    const isGirl = key.startsWith("female");
    return `
    <svg class="chibi-avatar" viewBox="0 0 120 120" xmlns="http://w3.org">
        <!-- Tóc sau (nếu là nữ) -->
        ${isGirl ? `<circle cx="32" cy="65" r="16" fill="${s.hairDark}"/><circle cx="88" cy="65" r="16" fill="${s.hairDark}"/>` : ""}
        <!-- Áo -->
        <path d="M35 112 C35 92, 85 92, 85 112 Z" fill="${s.shirt}"/>
        <!-- Khuôn mặt -->
        <circle cx="60" cy="66" r="32" fill="#ffe5d9"/>
        <!-- Tóc mái -->
        <path d="M28 62 C28 30, 92 30, 92 62 C85 45, 70 48, 60 52 C50 48, 35 45, 28 62 Z" fill="${s.hair}"/>
        <!-- Má hồng -->
        <ellipse cx="42" cy="74" rx="5" ry="3" fill="#ff99ac" opacity="0.6"/>
        <ellipse cx="78" cy="74" rx="5" ry="3" fill="#ff99ac" opacity="0.6"/>
        <!-- 1. BIỂU CẢM BÌNH THƯỜNG -->
        <g class="face-normal">
            <g class="chibi-eyes">
                <circle cx="47" cy="66" r="4.5" fill="#2b2d42"/>
                <circle cx="48.5" cy="64.5" r="1.5" fill="#fff"/>
                <circle cx="73" cy="66" r="4.5" fill="#2b2d42"/>
                <circle cx="74.5" cy="64.5" r="1.5" fill="#fff"/>
            </g>
            <path d="M55 77 Q60 82 65 77" stroke="#2b2d42" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        </g>
        <!-- 2. BIỂU CẢM VUI VẺ / CHẠM VÀO (^ ^) -->
        <g class="face-happy">
            <path d="M42 67 Q47 60 52 67" stroke="#2b2d42" stroke-width="2.8" fill="none" stroke-linecap="round"/>
            <path d="M68 67 Q73 60 78 67" stroke="#2b2d42" stroke-width="2.8" fill="none" stroke-linecap="round"/>
            <path d="M53 76 Q60 86 67 76 Z" fill="#ff5d8f"/>
        </g>
        <!-- 3. BIỂU CẢM CA HÁT (> < và miệng O) -->
        <g class="face-sing">
            <path d="M42 63 L51 66 L42 69" stroke="#2b2d42" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <path d="M78 63 L69 66 L78 69" stroke="#2b2d42" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <circle cx="60" cy="79" r="5" fill="#ff5d8f"/>
        </g>
        <!-- 4. BIỂU CẢM NGỦ GẬT (u u) -->
        <g class="face-sleep">
            <path d="M42 66 Q47 72 52 66" stroke="#2b2d42" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <path d="M68 66 Q73 72 78 66" stroke="#2b2d42" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <circle cx="60" cy="78" r="2.5" fill="#ff8fab"/>
        </g>
        <!-- Phụ kiện icon đặc trưng trên đầu -->
        <text x="76" y="36" font-size="18">${s.acc}</text>
    </svg>`;
}
// Hàm bấm nút Khám phá để vào giao diện chính
function startApp(isAutoLoad = false) {
    const key = `${selectedGender}_${selectedAge}`;
    const currentMascot = mascotData[key];
    
    // Lưu lựa chọn độ tuổi & mốc thời gian bắt đầu nuôi pet (chỉ lưu 1 lần)
    let savedData = JSON.parse(localStorage.getItem('unsaid_app_data') || '{}');
    if (!savedData.startTime) {
        savedData.startTime = Date.now();
    }
    savedData.gender = selectedGender;
    savedData.age = selectedAge;
    localStorage.setItem('unsaid_app_data', JSON.stringify(savedData));

    // Lấy tên tùy chỉnh của người dùng (nếu có)
    const displayName = savedData.customName ? savedData.customName : currentMascot.name;
    let customPersona = currentMascot.persona;
    if (savedData.customName) {
        customPersona = customPersona.replace(currentMascot.name, savedData.customName);
    }

    currentPersonaPrompt = customPersona + 
        "\n\n[QUY TẮC TRẢ LỜI BẮT BUỘC]:\n" +
        "1. KỂ CHUYỆN DÀI & CUỐN HÚT: Khi được yêu cầu kể chuyện (hoặc bấm nút 'Kể chuyện'), hãy kể đầy đủ, chi tiết, có tình tiết mạch lạc và giàu cảm xúc.\n" +
        "2. MỌI THỨ KHÁC PHẢI NGẮN GỌN, SÚC TÍCH: Với tất cả các câu hỏi còn lại (trò chuyện, tâm sự, giải bài tập, hỏi kiến thức...), luôn tự động lọc ý chính, đi thẳng vào đáp án/kết quả trong 2-4 câu ngắn hoặc 3-4 gạch đầu dòng trọng tâm. Tuyệt đối không viết dài dòng, rườm rà.\n" +
        "3. CHỈ PHÂN TÍCH DÀI KHI ĐƯỢC YÊU CẦU RÕ: Chỉ giải thích sâu từng bước khi người dùng nhắn kèm từ khóa 'phân tích' hoặc 'giải chi tiết'." + 
        "4. THẤU HIỂU TÂM LÝ & DẪN DẮT KHÉO LÉO: Người dùng thường là học sinh ngại giao tiếp hoặc đang gặp áp lực. Khi họ bảo 'không biết nói gì' hay 'hỏi tớ trước đi', TUYỆT ĐỐI KHÔNG hỏi cứng nhắc về việc học hành. Hãy bắt đầu bằng 1 câu hỏi đời thường, nhẹ nhàng và dễ trả lời (như hỏi về tâm trạng hôm nay, thời tiết, món ăn, hoặc đưa ra 2 lựa chọn A/B vui vẻ). Luôn lắng nghe, đồng cảm trước và không bao giờ hỏi lặp lại một ý đã hỏi ở câu trước.";

    const setupScreen = document.getElementById('setupScreen');
    const appRoot = document.getElementById('appRoot');
    if (setupScreen) setupScreen.style.display = 'none';
    if (appRoot) appRoot.classList.add('active');

    const mascotEmoji = document.getElementById('mascotEmoji');
    const mascotName = document.getElementById('mascotName');
    const greetingBubble = document.getElementById('initialGreeting');
    const headerIcon = document.getElementById('headerIcon');
    const headerTitle = document.getElementById('headerTitle');

    if (mascotEmoji) mascotEmoji.innerHTML = getChibiSVG(key);
    if (mascotName) mascotName.textContent = displayName;
    if (greetingBubble) greetingBubble.textContent = currentMascot.greeting;
    if (headerIcon) headerIcon.textContent = currentMascot.emoji;
    if (headerTitle) headerTitle.textContent = displayName; 
    if (!loadSavedChatHistory()) 
        showStarterPrompts();
    }

// --- HỆ THỐNG TRẠNG THÁI & TƯƠNG TÁC LINH VẬT ---
let mascotState = 'awake'; // 'awake' | 'sleeping' | 'singing'
let idleTimer = null;
let singTimer = null;
let tapCount = 0;
const mascotInteractions = {
    wakeUp: [
        "Ơ... zZz... Hả?! Cậu làm tớ giật mình tỉnh giấc luôn nè! 😴✨",
        "Ngáp dài một cái nào~ Tớ vừa mơ thấy cậu đang mỉm cười rất tươi đấy! 💤💖",
        "Chào cậu! Nãy giờ không thấy cậu nhắn nên tớ tranh thủ chợp mắt một xíu hihi. 🥱"
    ],
    tap: [
        "Hihi, nhột quá đi mất! Cậu lại chạm vào tớ rồi nè ✨",
        "Tớ luôn ở đây bên cạnh cậu, bất cứ khi nào cậu cần chia sẻ nhé! 💖",
        "Bấm vào tớ là nhận được một nguồn năng lượng tích cực 100% luôn đó! ⚡",
        "Cậu đang nghĩ gì thế? Kể cho tớ nghe với nào! 🌸",
        "Ting ting! Bạn vừa mở khóa một cái ôm tinh thần siêu ấm áp từ tớ! 🤗"
    ],
    sing: [
        "🎵 Là lá la~ Hôm nay của cậu thật tuyệt vời, mọi buồn phiền sẽ bay đi hết thôi~ 🎶",
        "🎶 Tớ đang ngân nga một giai điệu vui vẻ để cổ vũ tinh thần cho cậu đây! 🎤✨",
        "🎵 Đừng lo lắng nhé, có tớ hát cho cậu nghe rồi nè~ La la la~ 🎧"
    ]
};
// Hàm hiển thị biểu tượng trạng thái (💤, 🎵, ✨) trên đầu linh vật
function setMascotVisual(state, badgeEmoji = "") {
    const mascotEl = document.getElementById('mascotEmoji');
    if (!mascotEl) return;
        mascotEl.classList.remove('mascot-sleep', 'mascot-sing', 'mascot-bounce', 'mascot-happy');
    let badge = document.getElementById('mascotStatusBadge');
    if (!badge) {
        badge = document.createElement('span');
        badge.id = 'mascotStatusBadge';
        mascotEl.appendChild(badge);
    }
    badge.textContent = badgeEmoji;
    if (state === 'sleeping') {
        mascotEl.classList.add('mascot-sleep');
        } else {
        void mascotEl.offsetWidth;
        mascotEl.classList.add('mascot-bounce', 'mascot-happy');
        setTimeout(() => mascotEl.classList.remove('mascot-happy'), 2000);
    }
}
// Hàm đếm ngược thời gian rảnh để linh vật đi ngủ (30 giây)
function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        if (mascotState !== 'singing') {
            mascotState = 'sleeping';
            setMascotVisual('sleeping', '💤');
        }
    }, 600000); // 600000ms = 10 phút
}
// Hàm xử lý chính khi người dùng chạm vào linh vật
function touchMascot() {
    resetIdleTimer();
    // Trường hợp 1: Linh vật đang ngủ -> Đánh thức dậy
    if (mascotState === 'sleeping') {
        mascotState = 'awake';
        setMascotVisual('awake', '❗');
        const reply = mascotInteractions.wakeUp[Math.floor(Math.random() * mascotInteractions.wakeUp.length)];
        appendMessage(reply, "ai");
        setTimeout(() => setMascotVisual('awake', ''), 2500);
        return;
    }
    tapCount++;
    // Trường hợp 2: Chạm liên tiếp 3 lần -> Linh vật chuyển sang chế độ ca hát
    if (tapCount >= 3) {
        tapCount = 0;
        mascotState = 'singing';
        setMascotVisual('singing', '🎵');
        const song = mascotInteractions.sing[Math.floor(Math.random() * mascotInteractions.sing.length)];
        appendMessage(song, "ai");
        clearTimeout(singTimer);
        singTimer = setTimeout(() => {
            mascotState = 'awake';
            setMascotVisual('awake', '');
        }, 6000); // Hát trong 6 giây rồi trở lại bình thường
        return;
    }
    // Trường hợp 3: Chạm thông thường -> Trả lời ngẫu nhiên nhiều câu khác nhau
    mascotState = 'awake';
    setMascotVisual('awake', '💖');
    const randomTapReply = mascotInteractions.tap[Math.floor(Math.random() * mascotInteractions.tap.length)];
    appendMessage(randomTapReply, "ai");
    setTimeout(() => {
        if (mascotState === 'awake') setMascotVisual('awake', '');
    }, 2000);
}
// Tự động theo dõi thao tác trên trang để tính giờ đi ngủ cho linh vật
['click', 'keydown', 'mousemove'].forEach(evt => {
    document.addEventListener(evt, () => {
        if (mascotState === 'awake') resetIdleTimer();
    });
});
resetIdleTimer();
function formatChatText(text) {
    if (!text) return "";
    let formatted = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    formatted = formatted.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    formatted = formatted.replace(/\*(.+?)\*/g, "<em>$1</em>");
    formatted = formatted.replace(/\n/g, "<br>");
    return formatted;
} 
function saveChatHistoryToStorage() {
    try {
        const cleanHistory = chatHistory.filter(m => m.role === 'user' || m.role === 'assistant').slice(-40);
        localStorage.setItem('unsaid_chat_history', JSON.stringify(cleanHistory));
    } catch (e) {}
}

function loadSavedChatHistory() {
    try {
        const saved = JSON.parse(localStorage.getItem('unsaid_chat_history') || '[]');
        if (!Array.isArray(saved) || saved.length === 0) return false;
        chatHistory = saved;
        const chatDisplay = document.getElementById('chatDisplay');
        if (chatDisplay) {
            chatDisplay.innerHTML = '';
            saved.forEach(msg => {
                appendMessage(msg.content, msg.role === 'user' ? 'user' : 'ai', true);
            });
        }
        return true;
    } catch (e) { return false; }
}

function appendMessage(text, sender, skipSave = false) {
    const chatDisplay = document.getElementById('chatDisplay');
    if (!chatDisplay) return null;
    const bubble = document.createElement('div');
    bubble.className = sender === 'user' ? 'bubble user' : 'bubble';
    bubble.innerHTML = formatChatText(text);
    chatDisplay.appendChild(bubble);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
    if (!skipSave && text !== "Đang lắng nghe... 💭") {
        setTimeout(saveChatHistoryToStorage, 100);
    }
    return bubble;
}

function generateSmartReply(userText) {
    let cleanText = userText.toLowerCase();

    for (let item of defaultReplies) {
        if (item.keywords.some(kw => cleanText.includes(kw))) {
            return item.reply;
        }
    }
    const randomIndex = Math.floor(Math.random() * randomReplies.length);
    return randomReplies[randomIndex];
} 
async function searchWikiKnowledge(query) {
    try {
        const cleanQuery = query.replace(/(soạn|bài|tác giả|tiểu sử|là ai|giải thích|về|cho mình|giúp)/gi, "").trim();
        if (cleanQuery.length < 2) return "";
        const wikiHost = "https://vi." + "wikipedia.org";
        const searchApi = "/w/api.php?action=query&list=search&format=json&origin=*&srlimit=1&srsearch=";
        const res = await fetch(wikiHost + searchApi + encodeURIComponent(cleanQuery));
        const data = await res.json();
        if (data.query && data.query.search.length > 0) {
            const pageTitle = data.query.search[0].title;
            const summaryApi = "/api/rest_v1/page/summary/";
            const sumRes = await fetch(wikiHost + summaryApi + encodeURIComponent(pageTitle));
            const sumData = await sumRes.json();
            if (sumData.extract) {
                return '\n[Dữ liệu Wikipedia về "' + pageTitle + '"]: ' + sumData.extract;
            }
        }
    } catch (e) {
        console.log("Bỏ qua tra cứu Wiki:", e);
    }
    return "";
}
// Hàm gọi Groq AI tốc độ siêu nhanh
async function fetchAIReply(userText) {
    const loadingBubble = appendMessage("Đang lắng nghe... 💭", 'ai');
    const chatDisplay = document.getElementById('chatDisplay');
    chatHistory.push({ role: "user", content: userText }); 
        // Trả lời tức thì (0 giây) nếu là câu chào hỏi đơn giản
    const instantGreeting = /^(hi|hello|chào|alo|hey|xin chào|bạn ơi|cậu ơi)[!?.~\s]*$/i.test(userText.trim());
    if (instantGreeting) {
        const fastReply = generateSmartReply("chào");
        if (loadingBubble) loadingBubble.innerHTML = formatChatText(fastReply);
        chatHistory.push({ role: "assistant", content: fastReply });
        return;
    }
        // 1. Bỏ qua Wiki nếu là câu ngắn hoặc câu nối tiếp mạch trước
    const isCasualOrFollowUp = userText.trim().split(" ").length <= 4 || 
        /^(còn|vậy|thế|sao|không|ko|ý|tức là|chữ|câu|đoạn|bài đó|nó|buồn|mệt|chán|vui|chào|hi|kể|hát)/i.test(userText.trim());
    // 2. Chỉ dùng Wiki khi hỏi tiểu sử, tác giả, sự kiện, định nghĩa cụ thể
    const isFactQuery = /(tiểu sử|là ai|năm nào|ở đâu|hoàn cảnh sáng tác|tác giả|định nghĩa|lịch sử|sự kiện|tác phẩm)/i.test(userText);
    let wikiContext = "";
    if (!isCasualOrFollowUp && isFactQuery) {
        wikiContext = await searchWikiKnowledge(userText);
    }
        const contextRule = "\n[QUAN TRỌNG]: Người dùng đang giao tiếp bằng giọng nói nên đôi khi bị lỗi nhận diện âm thanh (ví dụ '1+1=2' thành 'một có mang 2'). Hãy tự động đoán đúng nghĩa gốc của câu nói để trả lời tự nhiên. Luôn đọc kỹ lịch sử trò chuyện phía trước để hiểu mạch ngữ cảnh.";
    const messagesToSend = [
        { role: "system", content: currentPersonaPrompt + contextRule + wikiContext },
        ...chatHistory.slice(-6)
    ];
    const groqHost = "https://api." + "groq.com";
    const groqPath = "/openai/v1/chat/completions";
    try {
        const workerUrl = "https://unsaid-ai-api." + "vanson6625.workers.dev";
        const response = await fetch(workerUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-oss-20b",
                messages: messagesToSend,
                temperature: 0.7,
                max_tokens: 1024
            })
        });
        const data = await response.json();
        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
            const aiReply = data.choices[0].message.content;
            if (loadingBubble) loadingBubble.innerHTML = formatChatText(aiReply);
            chatHistory.push({ role: "assistant", content: aiReply }); 
            if (isVoiceCallActive) speakAIResponse(aiReply);
        } else {
            const errMsg = data.error ? data.error.message : JSON.stringify(data);
            console.error("Groq trả về lỗi:", data);
            if (loadingBubble) loadingBubble.textContent = "Lỗi: " + errMsg; 
            if (isVoiceCallActive) resumeListeningAfterSpeech();
        }
    } catch (error) {
        console.error("Lỗi kết nối Groq:", error);
        const fallbackReply = generateSmartReply(userText);
        if (loadingBubble) loadingBubble.innerHTML = formatChatText(fallbackReply); 
        if (isVoiceCallActive) speakAIResponse(fallbackReply);
    } 
    if (chatDisplay) chatDisplay.scrollTop = chatDisplay.scrollHeight;
}
function sendMessage() {
    const inputField = document.getElementById('userInput');
    if (!inputField) return;
    const text = inputField.value.trim();
    if (!text) return;
    appendMessage(text, 'user');
    inputField.value = ''; 
    if (typeof getFullPetState === 'function') {
    const p = getFullPetState();
    if (p && p.hatched) { p.exp += 3; saveFullPetState(p); }
}
    resetIdleTimer();
    const lowerText = text.toLowerCase();
// 1. Nếu linh vật đang ngủ và người dùng nhắn tin (hoặc gọi "dậy")
    if (mascotState === 'sleeping') {
        mascotState = 'awake';
        setMascotVisual('awake', '❗');
        setTimeout(() => {
            if (mascotState === 'awake') setMascotVisual('awake', '');
        }, 2500);
        chatHistory.push({ 
            role: "system", 
            content: "(Lưu ý trạng thái: Bạn vừa ngủ gật và mới giật mình tỉnh dậy vì tin nhắn của người dùng. Hãy phản ứng ngái ngủ một chút rồi trả lời tự nhiên)." 
        });
    } 
    // 2. Nếu người dùng nhắn bảo linh vật "hát"
    else if (lowerText.includes("hát") || lowerText.includes("ca hát")) {
        mascotState = 'singing';
        setMascotVisual('singing', '🎵');
        clearTimeout(singTimer);
        singTimer = setTimeout(() => {
            mascotState = 'awake';
            setMascotVisual('awake', '');
        }, 6000);
        chatHistory.push({ 
            role: "system", 
            content: "(Lưu ý trạng thái: Bạn đang lắc lư vui vẻ và ngân nga hát cho người dùng nghe)." 
        });
    }
    fetchAIReply(text);
}
function sendQuickAction(actionName) {
    appendMessage(actionName, 'user');
    let promptForAI = actionName;
    if (actionName === 'Chào hỏi') {
        promptForAI = "Chào cậu! Hôm nay của cậu thế nào?";
    } else if (actionName === 'Kể chuyện') {
        promptForAI = "Hãy kể cho tớ nghe một câu chuyện ngắn thật ấm áp và tích cực nhé.";
    } else if (actionName === 'Tâm sự') {
        promptForAI = "Tớ đang có chút tâm sự và hơi căng thẳng, cậu lắng nghe và động viên tớ nhé.";
    } else if (actionName === 'Học tập') {
        promptForAI = "Tớ đang cảm thấy hơi áp lực chuyện học tập, hãy động viên tớ một chút nhé.";
    } else if (actionName === 'Câu đố vui') {
        promptForAI = "Hãy đố tớ 1 câu đố vui thông minh, hài hước hoặc đố mẹo nhẹ nhàng phù hợp với độ tuổi của tớ. Chỉ đưa ra câu hỏi và 1 gợi ý nhỏ thật khéo léo, TUYỆT ĐỐI KHÔNG tiết lộ đáp án ngay để tớ tự đoán trước nhé!";
    }
    fetchAIReply(promptForAI);
}
function checkEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}
// Hàm tự động lọc ý chính toàn bộ cuộc trò chuyện từ đầu đến hiện tại
function extractMainIdeas() {
    // Lọc bỏ tin nhắn hệ thống, chỉ lấy nội dung người dùng và AI đã nói chuyện
    const conversation = chatHistory.filter(msg => msg.role === 'user' || msg.role === 'assistant');

    if (conversation.length === 0) {
        appendMessage("Tụi mình chưa trò chuyện gì nhiều từ đầu buổi cả! Cậu cứ nhắn tin hoặc gọi thoại tâm sự trước, khi nào cần tổng hợp ý chính thì bấm nút này nhé! 📌", "ai");
        return;
    }
    // Gom toàn bộ lịch sử trò chuyện từ đầu thành một đoạn hội thoại liền mạch
    const fullDialogue = conversation.map(msg => {
        const speaker = msg.role === 'user' ? 'Người dùng' : 'Trợ lý AI';
        return `${speaker}: ${msg.content}`;
    }).join('\n');
    appendMessage("📌 Lọc ý chính toàn bộ cuộc trò chuyện từ đầu", "user");
    const promptForAI = 
        "Hãy đọc toàn bộ lịch sử cuộc trò chuyện từ đầu đến hiện tại dưới đây và tự động tổng hợp, lọc ra những ý chính quan trọng nhất.\n" +
        "Trình bày cực kỳ ngắn gọn, dễ nhìn theo 3 mục:\n" +
        "1. Chủ đề chính đã bàn luận (1-2 câu)\n" +
        "2. Các ý quan trọng / Kiến thức / Lời khuyên cốt lõi (gạch đầu dòng)\n" +
        "3. Điều cần ghi nhớ hoặc bước tiếp theo (nếu có)\n\n" +
        "--- NỘI DUNG CUỘC TRÒ CHUYỆN TỪ ĐẦU ---\n" + fullDialogue;
    fetchAIReply(promptForAI);
}
// --- BỘ CÂU HỎI KHỞI ĐẦU NGẪU NHIÊN CHO NGƯỜI NGẠI GIAO TIẾP ---
const starterQuestions = [
    "Hôm nay tớ hơi mệt, chỉ muốn nghe an ủi một chút 🔋",
    "Tớ không biết bắt đầu từ đâu, cậu hỏi tớ trước đi 🌱",
    "Có chuyện này tớ ngại kể với người quen, tớ nói với cậu được không? 🤫",
    "Dạo này tớ thấy lòng hơi rối bời mà chẳng rõ lý do ☁️",
    "Kể cho tớ một chuyện gì đó nhẹ nhàng cho đỡ căng thẳng nhé 🌙",
    "Nếu hôm nay được tạm gác mọi lo âu lại, cậu khuyên tớ nên làm gì? 🍃",
    "Tớ vừa trải qua một ngày khá dài, cần một cái ôm tinh thần 🤗",
    "Đố tớ một câu đố vui nhẹ nhàng để đầu óc thư giãn chút nhé 🧩",
    "Lúc cảm thấy tủi thân hoặc cô đơn, mình nên làm gì cho đỡ buồn? 💧",
    "Cậu đặt cho tớ 2 lựa chọn vui vui để tớ chọn thử đi ✨",
    "Tớ đang thấy hơi áp lực với kỳ vọng của mọi người xung quanh 🎈",
    "Cho tớ xin một lời động viên nhỏ để có thêm năng lượng hôm nay ⚡",
    "Hôm nay tâm trạng của tớ chỉ ở mức 4/10 thôi... 🌧️",
    "Làm sao để bớt suy nghĩ nhiều vào buổi tối trước khi ngủ nhỉ? 🌌",
    "Tớ muốn tập cách chia sẻ cảm xúc của mình nhiều hơn 🌸",
    "Nếu bây giờ có một điều ước nhỏ cho tâm trạng tốt lên, cậu ước gì? 🌠"
];
function showStarterPrompts() {
    const chatDisplay = document.getElementById('chatDisplay');
    if (!chatDisplay) return;
    const oldBox = document.getElementById('starterBox');
    if (oldBox) oldBox.remove();
    const shuffled = [...starterQuestions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 4);
    const box = document.createElement('div');
    box.id = 'starterBox';
    box.style.cssText = "display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0;";
    selectedQuestions.forEach(question => {
        const chip = document.createElement('button');
        chip.textContent = question;
        chip.style.cssText = "background: var(--primary-soft); border: 1px solid var(--border-color); color: var(--text-main); padding: 8px 13px; border-radius: 16px; font-size: 13px; font-weight: 500; cursor: pointer; text-align: left; transition: 0.2s;";
        chip.onclick = () => {
            box.remove();
            appendMessage(question, 'user');
            fetchAIReply(question);
        };
        box.appendChild(chip);
    });
    chatDisplay.appendChild(box);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}
// Hàm chỉ xóa tin nhắn và giữ nguyên nhân vật hiện tại
function clearChat() {
    chatHistory = []; 
    localStorage.removeItem('unsaid_chat_history');
    const key = `${selectedGender}_${selectedAge}`;
    const currentMascot = mascotData[key];
    const chatDisplay = document.getElementById('chatDisplay');
    if (chatDisplay) {
        chatDisplay.innerHTML = `<div class="bubble ai" id="initialGreeting">${currentMascot.greeting}</div>`;
    }
    if (typeof showStarterPrompts === 'function') {
        showStarterPrompts();
    }
}
// --- CHUYỂN ĐỔI CHẾ ĐỘ KHUNG CHAT TOÀN MÀN HÌNH ---
function toggleFullChat() {
    const appRoot = document.getElementById('appRoot');
    const btn = document.getElementById('fullscreenBtn');
    if (!appRoot) return;
    const isFull = appRoot.classList.toggle('full-chat-mode');
    if (btn) {
        btn.textContent = isFull ? "🗗 Thu nhỏ" : "⛶ Toàn màn hình";
    }
} 
// --- HỆ THỐNG GỌI THOẠI RẢNH TAY & CHỦ ĐỘNG GỢI CHUYỆN ---
let recognition = null;
let isVoiceCallActive = false;
let isAISpeaking = false;
let wakeLock = null;
let silenceTimer = null; // Bộ đếm theo dõi khi người dùng bí ý tưởng
// Bộ câu hỏi thăm ngẫu nhiên khi vừa bắt đầu cuộc gọi
const callGreetings = [
    "Alo, tớ nghe đây! Hôm nay của cậu trôi qua thế nào rồi, có chuyện gì vui kể tớ nghe với?",
    "Chào cậu nhé! Nãy giờ cậu đang làm gì thế, có thấy hơi mệt hay căng thẳng chút nào không?",
    "Tớ kết nối rồi nè! Hôm nay tâm trạng của cậu đang ở mức mấy điểm trên thang điểm 10?",
    "Alo alo! Có tớ ở đây rồi, cậu đang nghĩ gì trong đầu thì cứ chia sẻ thoải mái nhé!"
];
// Bộ chủ đề gợi ý ngẫu nhiên khi người dùng im lặng không biết nói gì
const randomTopics = [
    "Nếu cậu đang chưa biết nói gì thì để tớ gợi ý nhé: Hôm nay cậu đã ăn món gì ngon chưa?",
    "Hay là tụi mình chơi trò chọn nhanh đi: Cậu thích đi dạo dưới trời mưa nhẹ hay ngắm hoàng hôn hơn?",
    "Không sao đâu, cứ từ từ nhé! À, dạo này cậu có đang nghe bài hát nào hay hay không, giới thiệu cho tớ với?",
    "Nếu tự nhiên hôm nay cậu được nghỉ ngơi hoàn toàn một ngày, việc đầu tiên cậu muốn làm là gì nhất?",
    "Tớ vẫn đang lắng nghe cậu đây! Hay là để tớ kể cho cậu nghe một mẩu chuyện ngắn thư giãn nhé?"
];
// 1. Giữ màn hình không tự tắt khi đang gọi thoại
async function toggleScreenWakeLock(enable) {
    try {
        if (enable && 'wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
        } else if (!enable && wakeLock) {
            await wakeLock.release();
            wakeLock = null;
        }
    } catch (err) {
        console.log("Thiết bị không hỗ trợ WakeLock:", err);
    }
}
// 2. Xóa các ký tự markdown (** hoặc *) và emoji để giọng đọc tự nhiên
function cleanTextForSpeech(text) {
    return text
        .replace(/[*#_~`>]/g, '')
        .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
        .trim();
}
// 3. Bộ đếm im lặng: Nếu 7 giây không thấy nói gì -> AI tự gợi mở chủ đề mới
function startSilenceTimer() {
    clearTimeout(silenceTimer);
    if (!isVoiceCallActive || isAISpeaking) return;
    silenceTimer = setTimeout(() => {
        if (isVoiceCallActive && !isAISpeaking) {
            const topic = randomTopics[Math.floor(Math.random() * randomTopics.length)];
            appendMessage(topic, 'ai');
            chatHistory.push({ role: "assistant", content: topic });
            speakAIResponse(topic);
        }
    }, 7000); // 7000ms = 7 giây im lặng
}
// Bộ tải và chọn giọng đọc tiếng Việt tự nhiên nhất trên thiết bị
let bestVietnameseVoice = null;
function loadNaturalVietnameseVoice() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    const viVoices = voices.filter(v => v.lang.includes('vi') || v.lang.includes('VN'));
    if (viVoices.length > 0) {
        // Ưu tiên giọng Neural / Online / Google / Microsoft HoaiMy hoặc NamMinh
        bestVietnameseVoice = viVoices.find(v => 
            v.name.includes('Natural') || 
            v.name.includes('Online') || 
            v.name.includes('HoaiMy') || 
            v.name.includes('Google')
        ) || viVoices[0];
    }
}
if ('speechSynthesis' in window) {
    loadNaturalVietnameseVoice();
    window.speechSynthesis.onvoiceschanged = loadNaturalVietnameseVoice;
}
// 4. AI đọc câu trả lời lưu loát, ngắt nhịp tự nhiên theo từng câu
function speakAIResponse(rawText) {
    if (!isVoiceCallActive) return;

    clearTimeout(silenceTimer);
    if (recognition) {
        try { recognition.stop(); } catch (e) {}
    }
    isAISpeaking = true;
    const cleanText = cleanTextForSpeech(rawText);
    if ('speechSynthesis' in window && cleanText) {
        window.speechSynthesis.cancel();
        if (!bestVietnameseVoice) loadNaturalVietnameseVoice();
        // Tách đoạn văn thành các câu ngắn để tạo nhịp thở tự nhiên
        const sentences = cleanText.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [cleanText];
        let currentIndex = 0;
        setMascotVisual('awake', '🗣️');
        function speakNextSentence() {
            if (!isVoiceCallActive || currentIndex >= sentences.length) {
                isAISpeaking = false;
                setMascotVisual('awake', '👂');
                resumeListeningAfterSpeech();
                return;
            }
let sentence = sentences[currentIndex].trim().replace(/,\s*/g, ' ');
            currentIndex++;
            if (!sentence) {
                speakNextSentence();
                return;
            }
            const utterance = new SpeechSynthesisUtterance(sentence);
            utterance.lang = 'vi-VN';
            if (bestVietnameseVoice) utterance.voice = bestVietnameseVoice;
            // Tinh chỉnh tốc độ và cao độ mượt mà theo nhân vật
            utterance.rate = 1.06; 
            utterance.pitch = selectedGender === 'female' ? 1.08 : 0.96;
            utterance.onend = function () {
                // Nghỉ nhịp 180ms giữa các câu cho tự nhiên rồi đọc câu tiếp theo
                setTimeout(speakNextSentence, 60);
            };
            utterance.onerror = function () {
                isAISpeaking = false;
                resumeListeningAfterSpeech();
            };
            window.speechSynthesis.speak(utterance);
        }
        speakNextSentence();
    } else {
        isAISpeaking = false;
        resumeListeningAfterSpeech();
    }
}
// 5. Tự động bật lại micro và kích hoạt đếm giờ im lặng sau khi AI nói xong
function resumeListeningAfterSpeech() {
    if (!isVoiceCallActive || isAISpeaking) return;
    setTimeout(() => {
        if (isVoiceCallActive && !isAISpeaking && recognition) {
            try { 
                recognition.start(); 
                startSilenceTimer(); // Bắt đầu đếm 7 giây chờ người dùng trả lời
            } catch (e) {}
        }
    }, 400);
}
// 6. Bật / Tắt chế độ gọi thoại khi bấm nút Micro
function toggleSpeech() {
    const micBtn = document.getElementById('micBtn');
    const inputField = document.getElementById('userInput');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Thiết bị chưa hỗ trợ nhận diện giọng nói!");
        return;
    }
    // Bấm lần 2 để CÚP MÁY
    if (isVoiceCallActive) {
        isVoiceCallActive = false;
        isAISpeaking = false;
        clearTimeout(silenceTimer);
        toggleScreenWakeLock(false);
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        if (recognition) {
            try { recognition.stop(); } catch (e) {}
        }
        if (micBtn) {
            micBtn.classList.remove('listening');
        }
        setMascotVisual('awake', '');
        appendMessage("📴 Đã kết thúc cuộc gọi thoại.", 'ai');
        return;
    }
    // Bắt đầu CUỘC GỌI THOẠI MỚI
    isVoiceCallActive = true;
    toggleScreenWakeLock(true);
    if (micBtn) {
        micBtn.classList.add('listening');
    }
    recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = function (event) {
        clearTimeout(silenceTimer); // Người dùng đã nói -> Hủy đếm im lặng
        const speechToText = event.results[0][0].transcript;
        if (speechToText.trim()) {
            if (inputField) inputField.value = speechToText;
            sendMessage();
        }
    };
    recognition.onerror = function (event) {
        if (event.error === 'no-speech' || event.error === 'aborted') {
            return;
        }
        console.warn("Lỗi mic:", event.error);
    };
    recognition.onend = function () {
        if (isVoiceCallActive && !isAISpeaking) {
            try { recognition.start(); } catch (e) {}
        }
    };
    // AI CHỦ ĐỘNG HỎI THĂM NGAY KHI VỪA BẮT MÁY
    const openingQuestion = callGreetings[Math.floor(Math.random() * callGreetings.length)];
    appendMessage(openingQuestion, 'ai');
    chatHistory.push({ role: "assistant", content: openingQuestion });
    speakAIResponse(openingQuestion);
}
// =========================================================
// JS ĐỢT 1: CÀI ĐẶT, ĐẶT TÊN RIÊNG, ÂM THANH & RUNG CHẠM
// =========================================================
let appSettings = {
    volume: 80,
    vibrate: true,
    theme: 'auto'
};
let resetStep = 0;
let resetCountdownTimer = null;

// 1. Tự động khôi phục cài đặt & bỏ qua màn hình chọn độ tuổi nếu đã chọn trước đó
window.addEventListener('DOMContentLoaded', () => {
    const savedSettings = localStorage.getItem('unsaid_settings');
    if (savedSettings) {
        appSettings = { ...appSettings, ...JSON.parse(savedSettings) };
    }
    applyThemeMode(appSettings.theme);

    const savedUser = JSON.parse(localStorage.getItem('unsaid_app_data') || 'null');
    if (savedUser && savedUser.gender && savedUser.age) {
        selectGender(savedUser.gender);
        selectAge(savedUser.age);
        startApp(true);
    }
});

// 2. Âm thanh chạm êm tai bằng Web Audio API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playTouchSound() {
    if (appSettings.volume <= 0) return;
    try {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(580, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.06);

        const vol = (appSettings.volume / 100) * 0.15;
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.07);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.07);
    } catch (e) {}
}

// 3. Rung phản hồi & Hiệu ứng hạt bay khi chạm/click toàn trang
document.addEventListener('click', (e) => {
    playTouchSound();

    if (appSettings.vibrate) {
        if (navigator.vibrate) navigator.vibrate(25);
        const appEl = document.getElementById('appRoot');
        if (appEl && appEl.classList.contains('active')) {
            appEl.classList.remove('screen-shake');
            void appEl.offsetWidth;
            appEl.classList.add('screen-shake');
        }
    }

    const icons = ['✨', '💖', '🌸', '⚡'];
    const particle = document.createElement('span');
    particle.className = 'touch-particle';
    particle.textContent = icons[Math.floor(Math.random() * icons.length)];
    particle.style.left = e.clientX + 'px';
    particle.style.top = e.clientY + 'px';
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 650);
});

// 4. Các hàm điều khiển Bảng Cài đặt
function openSettings() {
    const modal = document.getElementById('settingsModal');
    if (!modal) return;

    const savedData = JSON.parse(localStorage.getItem('unsaid_app_data') || '{}');
    const nameInput = document.getElementById('customMascotNameInput');
    if (nameInput) nameInput.value = savedData.customName || '';

    document.getElementById('volumeSlider').value = appSettings.volume;
    document.getElementById('volValueText').textContent = appSettings.volume + '%';
    document.getElementById('vibrateToggle').checked = appSettings.vibrate;
    document.getElementById('themeSelect').value = appSettings.theme;
    document.getElementById('editGenderSelect').value = selectedGender;
    document.getElementById('editAgeSelect').value = selectedAge;

    resetStep = 0;
    clearInterval(resetCountdownTimer);
    const resetBtn = document.getElementById('factoryResetBtn');
    const warnText = document.getElementById('resetWarningText');
    resetBtn.disabled = false;
    resetBtn.textContent = "⚠️ Khôi phục cài đặt gốc";
    warnText.style.display = 'none';

    modal.style.display = 'flex';
}

function closeSettings() {
    const modal = document.getElementById('settingsModal');
    if (modal) modal.style.display = 'none';
}

function saveSettingsToStorage() {
    localStorage.setItem('unsaid_settings', JSON.stringify(appSettings));
}

function updateVolumeSetting(val) {
    appSettings.volume = parseInt(val, 10);
    document.getElementById('volValueText').textContent = val + '%';
    saveSettingsToStorage();
}

function updateVibrateSetting(checked) {
    appSettings.vibrate = checked;
    saveSettingsToStorage();
}

function applyThemeMode(mode) {
    const body = document.body;
    body.classList.remove('dark-mode', 'sky-morning', 'sky-noon', 'sky-afternoon');

    // Xóa mặt trời & mây cũ trước khi vẽ lại
    document.querySelectorAll('.sky-sun, .sky-cloud').forEach(el => el.remove());

    if (mode === 'dark') {
        body.classList.add('dark-mode');
        return;
    }

    const hour = new Date().getHours();

    if (mode === 'auto' && (hour >= 18 || hour < 5)) {
        // Buổi tối (18:00 - 04:59)
        body.classList.add('dark-mode');
    } else {
        // Các khung giờ ban ngày (hoặc khi chọn "Luôn Sáng")
        if (hour >= 5 && hour < 11) {
            body.classList.add('sky-morning');
        } else if (hour >= 11 && hour < 16) {
            body.classList.add('sky-noon');
        } else if (hour >= 16 && hour < 18) {
            body.classList.add('sky-afternoon');
        } else {
            body.classList.add('sky-morning');
        }
        createDaySkyDecorations();
    }
}

// Tạo Mặt trời & 4 đám mây trôi nhẹ nhàng cho nền ban ngày
function createDaySkyDecorations() {
    const sun = document.createElement('div');
    sun.className = 'sky-sun';
    document.body.appendChild(sun);

    for (let i = 0; i < 4; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'sky-cloud';
        const w = Math.floor(Math.random() * 70 + 85);
        cloud.style.width = w + 'px';
        cloud.style.height = Math.floor(w * 0.34) + 'px';
        cloud.style.top = Math.floor(Math.random() * 32 + 8) + 'vh';
        cloud.style.animationDuration = Math.floor(Math.random() * 25 + 35) + 's';
        cloud.style.animationDelay = '-' + Math.floor(Math.random() * 30) + 's';
        document.body.appendChild(cloud);
    }
}

function updateThemeSetting(val) {
    appSettings.theme = val;
    applyThemeMode(val);
    saveSettingsToStorage();
}

function applyNewPersona() {
    const newGender = document.getElementById('editGenderSelect').value;
    const newAge = document.getElementById('editAgeSelect').value;
    const nameInput = document.getElementById('customMascotNameInput');
    const customName = nameInput ? nameInput.value.trim() : '';

    let savedData = JSON.parse(localStorage.getItem('unsaid_app_data') || '{}');
    savedData.customName = customName;
    localStorage.setItem('unsaid_app_data', JSON.stringify(savedData));

    selectGender(newGender);
    selectAge(newAge);
    startApp(true);
    closeSettings();
    appendMessage(`✨ Đã lưu tên gọi "${customName || mascotData[`${newGender}_${newAge}`].name}" thành công!`, "ai");
}

// 5. Khôi phục cài đặt gốc với lời nhắc đếm ngược 3 giây
function handleFactoryReset() {
    const btn = document.getElementById('factoryResetBtn');
    const warn = document.getElementById('resetWarningText');

    if (resetStep === 0) {
        resetStep = 1;
        let secondsLeft = 3;
        btn.disabled = true;
        warn.style.display = 'block';
        warn.textContent = "Hãy suy nghĩ kỹ! Toàn bộ dữ liệu nuôi pet, tên riêng và cài đặt sẽ bị xóa sạch.";
        btn.textContent = `⏳ Vui lòng đợi ${secondsLeft}s để xác nhận...`;

        resetCountdownTimer = setInterval(() => {
            secondsLeft--;
            if (secondsLeft > 0) {
                btn.textContent = `⏳ Vui lòng đợi ${secondsLeft}s để xác nhận...`;
            } else {
                clearInterval(resetCountdownTimer);
                btn.disabled = false;
                btn.textContent = "🔥 Bấm lần nữa để XÓA TOÀN BỘ & KHÔI PHỤC";
            }
        }, 1000);
    } else if (resetStep === 1 && !btn.disabled) {
localStorage.clear();
        location.reload();
    }
}
// =========================================================
// TỰ ĐỘNG TẠO BẦU TRỜI SAO LẤP LÁNH KHI Ở CHẾ ĐỘ BUỔI TỐI
// =========================================================
function createNightSkyDecorations() {
    if (document.querySelector('.night-star')) return;
    for (let i = 0; i < 45; i++) {
        const star = document.createElement('div');
        star.className = 'night-star';
        const size = (Math.random() * 2.5 + 1.5).toFixed(1) + 'px';
        star.style.width = size;
        star.style.height = size;
        star.style.left = (Math.random() * 100) + 'vw';
        star.style.top = (Math.random() * 100) + 'vh';
        star.style.setProperty('--dur', (Math.random() * 2.5 + 1.8).toFixed(1) + 's');
        star.style.animationDelay = (Math.random() * 3).toFixed(1) + 's';
        document.body.appendChild(star);
    }
}
window.addEventListener('DOMContentLoaded', createNightSkyDecorations);
// =========================================================
// PHẦN 1: ĐỒNG BỘ CHẾ ĐỘ TỐI, PET, CÂY & HỘP NHẠC
// =========================================================

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        applyThemeMode(appSettings.theme || 'auto');
        const wSel = document.getElementById('weatherSelect');
        if (wSel) wSel.value = appSettings.weather || 'auto';
        const btn = document.getElementById('enableNotifyBtn');
        if (btn && "Notification" in window && Notification.permission === "granted") {
            btn.textContent = "✅ Đã bật";
        }
        if (document.getElementById('appRoot')?.classList.contains('active')) {
            checkRealTimeWeatherAndNotify(true);
        }
    }, 100);
});

setInterval(() => {
    if ((appSettings.theme || 'auto') === 'auto') applyThemeMode('auto');
}, 60000);

// =========================================================
// HỆ THỐNG NUÔI PET 2D WIDGETABLE (PHẦN 1/3)
// =========================================================

const petCatalog = {
    cat:  { name: "Mèo Mướp", color: "#fbbf24", ear: "#f59e0b", outfits: ["", "🎀", "👑", "🎩", "🧣"] },
    dog:  { name: "Cún Bông", color: "#d97706", ear: "#92400e", outfits: ["", "🧢", "👑", "🕶️", "🎒"] },
    duck: { name: "Vịt Vàng", color: "#fde047", ear: "#f97316", outfits: ["", "🌸", "👑", "🎧", "🎀"] }
};

const petPersonalities = [
    {
        id: "playful", label: "⚡ Tinh nghịch",
        strokeLines: ["Hihi nhột quá! Chơi đuổi bắt với tớ đi! 🏃‍♂️", "Cậu chạm nữa là tớ nhảy cao tới nóc nhà luôn đó! 🚀"],
        eatLines: ["Ngon quá! Ăn xong tớ lại có sức chạy 10 vòng công viên! 🍖"],
        sleepLines: ["Zzz... Mơ thấy đang rượt theo quả bóng len khổng lồ... 🧶"]
    },
    {
        id: "sweet", label: "🌸 Ngọt ngào",
        strokeLines: ["Nhìn vào mắt đằng ấy, thấy cả một thế giới màu hồng 💖", "Được cậu vuốt ve là điều hạnh phúc nhất của tớ~ 🥰"],
        eatLines: ["Cảm ơn cậu đã đút cho tớ ăn nhé, ấm áp quá đi! 🍓"],
        sleepLines: ["Zzz... Mơ thấy được nằm gọn trong vòng tay ấm của cậu... 💕"]
    },
    {
        id: "foodie", label: "🍪 Ham ăn",
        strokeLines: ["Cậu xoa bụng tớ hả? Nó đang kêu 'ọt ọt' rồi nè! 😋", "Vuốt ve thích thật, nhưng có thêm bánh quy thì tuyệt hơn! 🍪"],
        eatLines: ["Măm măm! Thiên đường ẩm thực là đây chứ đâu! 🤤✨"],
        sleepLines: ["Zzz... Mơ thấy trời đang mưa toàn bánh cá và sữa tươi... 🐟"]
    }
];

const petDreamsList = [
    "Bé mơ thấy mình đang chạy trên một cánh đồng đầy bánh quy cá giòn rụm! 🍪",
    "Bé mơ thấy cậu và bé cùng ngồi ngắm sao băng trên mái nhà lung linh. 🌠",
    "Bé mơ thấy mình mọc thêm đôi cánh nhỏ bay vút lên những đám mây kẹo bông! ☁️"
];

let currentPetRoom = 'dining';
let currentPetMood = 'normal';
let moodResetTimer = null;
let rapidPokeCount = 0;
let pokeResetTimer = null;
let petCurrentLocation = 'dining';

function getFullPetState() {
    return JSON.parse(localStorage.getItem('unsaid_pet_v2') || 'null');
}

function saveFullPetState(data) {
    localStorage.setItem('unsaid_pet_v2', JSON.stringify(data));
}

function switchLeftTab(tabName, btnEl) {
    document.querySelectorAll('.l-tab').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    document.getElementById('tab-mascot').style.display = (tabName === 'mascot') ? '' : 'none';
    document.getElementById('tab-pet').style.display = (tabName === 'pet') ? 'flex' : 'none';
    document.getElementById('tab-garden').style.display = (tabName === 'garden') ? 'flex' : 'none';

    const chatPanel = document.querySelector('.right-chat-panel:not(#rightPetArena):not(#rightGardenArena)');
    const petArena = document.getElementById('rightPetArena');
    const gardenArena = document.getElementById('rightGardenArena');

    if (chatPanel) chatPanel.style.display = (tabName === 'mascot') ? 'flex' : 'none';
    if (petArena) petArena.style.display = (tabName === 'pet') ? 'flex' : 'none';
    if (gardenArena) gardenArena.style.display = (tabName === 'garden') ? 'flex' : 'none';

    if (tabName === 'pet') initPetArena();
    if (tabName === 'garden' && typeof initFarmSystem === 'function') initFarmSystem();
}

function playEggHatchSFX() {
    if (appSettings.volume <= 0) return;
    try {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.12);
            const vol = (appSettings.volume / 100) * 0.2;
            gain.gain.setValueAtTime(vol, audioCtx.currentTime + idx * 0.12);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.12 + 0.35);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(audioCtx.currentTime + idx * 0.12);
            osc.stop(audioCtx.currentTime + idx * 0.12 + 0.36);
        });
    } catch (e) {}
}

function startEggHatchVFX() {
    const eggEl = document.getElementById('mysteryEgg');
    const btnEl = document.getElementById('hatchActionBtn');
    const boardEl = document.getElementById('gachaEggCard');
    const vfxEl = document.getElementById('hatchSunburstVFX');
    const choicesEl = document.getElementById('starterPetChoices');

    if (btnEl) {
        btnEl.disabled = true;
        btnEl.textContent = "ĐANG ẤP TRỨNG...";
    }
    if (eggEl) eggEl.classList.add('egg-shaking-fast');

    setTimeout(() => {
        playEggHatchSFX();
        if (boardEl) boardEl.style.display = 'none';
        if (vfxEl) vfxEl.style.display = 'block';
        if (choicesEl) choicesEl.style.display = 'block';
    }, 1200);
}

function initPetArena() {
    const pet = getFullPetState();
    const eggStage = document.getElementById('eggHatchStage');
    const activeStage = document.getElementById('activePetStage');

    if (!pet || !pet.hatched) {
        if (eggStage) eggStage.style.display = 'flex';
        if (activeStage) activeStage.style.display = 'none';
    } else {
        checkPetDailyStreak();
        if (eggStage) eggStage.style.display = 'none';
        if (activeStage) activeStage.style.display = 'flex';
        renderActivePetUI();
        switchPetRoom(currentPetRoom);
    }
}

function adoptStarterPet(speciesKey) {
    const spec = petCatalog[speciesKey];
    const randomTrait = petPersonalities[Math.floor(Math.random() * petPersonalities.length)];
    const now = Date.now();

    const newPet = {
        hatched: true,
        species: speciesKey,
        name: spec.name,
        traitId: randomTrait.id,
        exp: 0,
        adoptedAt: now,
        streak: 1,
        lostStreakBackup: 0,
        missedDays: 0,
        restoreUsedCount: 0,
        lastLoginAt: now,
        lastCheckInDate: new Date().toDateString(),
        unlockedOutfits: Array.of(0, 1),
        currentOutfitIdx: 1,
        isSleeping: false,
        lastDream: "Bé mới chào đời nên chưa có giấc mơ nào đâu nè! 🥚"
    };
    saveFullPetState(newPet);
    const vfxEl = document.getElementById('hatchSunburstVFX');
    if (vfxEl) vfxEl.style.display = 'none';
    initPetArena();
    triggerPetExpression('happy', 'pet-anim-happy');
    setPetBubble("Oa~ Chào cậu! Tớ là " + spec.name + " (" + randomTrait.label + "). Cùng đồng hành nhé! 💖");
}
// =========================================================
// HỆ THỐNG NUÔI PET 2D WIDGETABLE (PHẦN 2/3)
// =========================================================

function generatePetSVG(species, level, mood, outfitIcon) {
    const scale = level >= 5 ? 1.02 : (level >= 3 ? 0.92 : 0.82);
    const lt = '<';

    const themes = {
        cat:  { main: "#fde68a", sub: "#f59e0b", belly: "#fffbeb", line: "#451a03", cheek: "#fb7185" },
        dog:  { main: "#fed7aa", sub: "#9a3412", belly: "#fff7ed", line: "#431407", cheek: "#f43f5e" },
        duck: { main: "#fef08a", sub: "#fb923c", belly: "#fefce8", line: "#422006", cheek: "#fb7185" }
    };
    const t = themes[species] || themes.cat;

    let backAndEars = "";
    if (species === 'cat') {
        backAndEars = 
            lt + 'path d="M84,96 Q108,92 104,70 Q102,60 95,66" stroke="' + t.line + '" stroke-width="6" fill="none" stroke-linecap="round"/>' +
            lt + 'path d="M84,96 Q108,92 104,70 Q102,60 95,66" stroke="' + t.sub + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
            lt + 'polygon points="28,46 20,14 50,30" fill="' + t.main + '" stroke="' + t.line + '" stroke-width="3" stroke-linejoin="round"/>' +
            lt + 'polygon points="31,40 25,21 44,31" fill="' + t.cheek + '" opacity="0.65"/>' +
            lt + 'polygon points="92,46 100,14 70,30" fill="' + t.main + '" stroke="' + t.line + '" stroke-width="3" stroke-linejoin="round"/>' +
            lt + 'polygon points="89,40 95,21 76,31" fill="' + t.cheek + '" opacity="0.65"/>';
    } else if (species === 'dog') {
        backAndEars = 
            lt + 'path d="M84,94 Q102,84 98,74" stroke="' + t.sub + '" stroke-width="6" fill="none" stroke-linecap="round"/>' +
            lt + 'path d="M28,36 Q10,48 16,74 Q26,80 33,58 Z" fill="' + t.sub + '" stroke="' + t.line + '" stroke-width="3" stroke-linejoin="round"/>' +
            lt + 'path d="M92,36 Q110,48 104,74 Q94,80 87,58 Z" fill="' + t.sub + '" stroke="' + t.line + '" stroke-width="3" stroke-linejoin="round"/>';
    } else {
        backAndEars = 
            lt + 'path d="M52,22 Q58,10 62,21 Q67,11 70,23" stroke="' + t.line + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    }

    let face = "";
    if (mood === 'sleep') {
        face = lt + 'path d="M39,55 Q46,61 53,55" stroke="' + t.line + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
               lt + 'path d="M67,55 Q74,61 81,55" stroke="' + t.line + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
               lt + 'circle cx="60" cy="68" r="3.5" fill="#fb7185"/>' +
               lt + 'text x="88" y="30" font-size="18">💤' + lt + '/text>';
    } else if (mood === 'happy' || mood === 'play') {
        face = lt + 'path d="M39,56 Q46,46 53,56" stroke="' + t.line + '" stroke-width="3.2" fill="none" stroke-linecap="round"/>' +
               lt + 'path d="M67,56 Q74,46 81,56" stroke="' + t.line + '" stroke-width="3.2" fill="none" stroke-linecap="round"/>' +
               lt + 'path d="M51,65 Q60,78 69,65 Z" fill="#f43f5e" stroke="' + t.line + '" stroke-width="2"/>' +
               lt + 'text x="86" y="30" font-size="18">💖' + lt + '/text>';
    } else if (mood === 'eat') {
        face = lt + 'circle cx="46" cy="53" r="5.5" fill="' + t.line + '"/>' + lt + 'circle cx="48" cy="51" r="2" fill="#fff"/>' +
               lt + 'circle cx="74" cy="53" r="5.5" fill="' + t.line + '"/>' + lt + 'circle cx="76" cy="51" r="2" fill="#fff"/>' +
               lt + 'ellipse cx="60" cy="67" rx="6.5" ry="5.5" fill="#f43f5e" stroke="' + t.line + '" stroke-width="2"/>' +
               lt + 'text x="86" y="34" font-size="18">😋' + lt + '/text>';
    } else if (mood === 'annoyed') {
        face = lt + 'path d="M38,48 L51,53" stroke="' + t.line + '" stroke-width="3" stroke-linecap="round"/>' +
               lt + 'path d="M82,48 L69,53" stroke="' + t.line + '" stroke-width="3" stroke-linecap="round"/>' +
               lt + 'circle cx="46" cy="56" r="4.5" fill="' + t.line + '"/>' +
               lt + 'circle cx="74" cy="56" r="4.5" fill="' + t.line + '"/>' +
               lt + 'path d="M52,69 Q60,63 68,69" stroke="' + t.line + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
               lt + 'text x="86" y="30" font-size="18">💢' + lt + '/text>';
    } else {
        face = lt + 'circle cx="46" cy="53" r="6" fill="' + t.line + '"/>' +
               lt + 'circle cx="48" cy="50.5" r="2.3" fill="#ffffff"/>' +
               lt + 'circle cx="44" cy="55" r="1.1" fill="#ffffff"/>' +
               lt + 'circle cx="74" cy="53" r="6" fill="' + t.line + '"/>' +
               lt + 'circle cx="76" cy="50.5" r="2.3" fill="#ffffff"/>' +
               lt + 'circle cx="72" cy="55" r="1.1" fill="#ffffff"/>' +
               lt + 'path d="M53,65 Q56.5,70 60,65 Q63.5,70 67,65" stroke="' + t.line + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    }

    const snout = species === 'duck'
        ? lt + 'ellipse cx="60" cy="63" rx="11" ry="6" fill="' + t.sub + '" stroke="' + t.line + '" stroke-width="2.5"/>'
        : lt + 'ellipse cx="60" cy="60" rx="4" ry="2.8" fill="#fb7185"/>';

    return lt + 'svg viewBox="0 0 120 120" width="145" height="145" xmlns="http://w3.org" style="transform: scale(' + scale + '); transition: transform 0.3s ease;">' +
        lt + 'ellipse cx="60" cy="111" rx="32" ry="6" fill="rgba(0,0,0,0.16)"/>' +
        backAndEars +
        lt + 'path d="M36,76 C32,96 38,108 60,108 C82,108 88,96 84,76 Z" fill="' + t.main + '" stroke="' + t.line + '" stroke-width="3"/>' +
        lt + 'ellipse cx="60" cy="93" rx="16" ry="12" fill="' + t.belly + '"/>' +
        lt + 'ellipse cx="44" cy="88" rx="6" ry="9" transform="rotate(-15 44 88)" fill="' + t.main + '" stroke="' + t.line + '" stroke-width="2.6"/>' +
        lt + 'ellipse cx="76" cy="88" rx="6" ry="9" transform="rotate(15 76 88)" fill="' + t.main + '" stroke="' + t.line + '" stroke-width="2.6"/>' +
        lt + 'ellipse cx="60" cy="52" rx="36" ry="30" fill="' + t.main + '" stroke="' + t.line + '" stroke-width="3"/>' +
        lt + 'ellipse cx="36" cy="61" rx="6" ry="3.5" fill="' + t.cheek + '" opacity="0.75"/>' +
        lt + 'ellipse cx="84" cy="61" rx="6" ry="3.5" fill="' + t.cheek + '" opacity="0.75"/>' +
        snout + face +
        lt + 'text x="60" y="21" text-anchor="middle" font-size="25">' + (outfitIcon || '') + lt + '/text>' +
    lt + '/svg>';
}

function getCalendarDaysDiff(fromTimestamp, toTimestamp = Date.now()) {
    const d1 = new Date(fromTimestamp);
    const d2 = new Date(toTimestamp);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
}

function checkPetDailyStreak() {
    const pet = getFullPetState();
    if (!pet || !pet.hatched) return;
    const now = Date.now();
    if (!pet.adoptedAt) pet.adoptedAt = now;
    if (!pet.lastLoginAt) pet.lastLoginAt = now;

    const daysDiff = getCalendarDaysDiff(pet.lastLoginAt, now);
    if (daysDiff === 1) {
        pet.streak += 1;
        pet.lastLoginAt = now;
        pet.lastCheckInDate = new Date().toDateString();
    } else if (daysDiff > 1) {
        if (pet.streak > 0) pet.lostStreakBackup = pet.streak;
        pet.streak = 0;
        pet.missedDays = daysDiff - 1;
        pet.restoreUsedCount = 0;
        pet.lastLoginAt = now;
    }
    saveFullPetState(pet);
}

function renderActivePetUI() {
    const pet = getFullPetState();
    if (!pet) return;
    const spec = petCatalog[pet.species] || petCatalog.cat;
    const trait = petPersonalities.find(t => t.id === pet.traitId) || petPersonalities[0];

    const level = Math.floor(pet.exp / 100) + 1;
    const currentExpInLevel = pet.exp % 100;
    let stageName = "Bé Sơ Sinh";
    if (level >= 5) stageName = "Bạn Lớn Đáng Tin";
    else if (level >= 3) stageName = "Bé Nhỏ Năng Động";

    const totalAdoptedDays = getCalendarDaysDiff(pet.adoptedAt || Date.now(), Date.now()) + 1;

    document.getElementById('petLevelLabel').textContent = `Lv.${level} (${stageName})`;
    document.getElementById('petExpText').textContent = `${currentExpInLevel} / 100 EXP`;
    document.getElementById('petExpFill').style.width = `${currentExpInLevel}%`;
    document.getElementById('petTotalDaysBadge').textContent = `📅 Đã nuôi: ${totalAdoptedDays} ngày`;
    document.getElementById('petStreakBadge').textContent = pet.streak > 0 
        ? `🔥 Chuỗi: ${pet.streak} ngày` 
        : `💔 Mất chuỗi (${pet.missedDays} ngày)`;

    const restoreBtn = document.getElementById('restoreStreakBtn');
    if (restoreBtn) {
        if (pet.missedDays > 0 && (pet.restoreUsedCount || 0) < 3) {
            const left = 3 - (pet.restoreUsedCount || 0);
            restoreBtn.style.display = 'inline-block';
            restoreBtn.textContent = `🩹 Bù chuỗi (${left}/3)`;
        } else {
            restoreBtn.style.display = 'none';
        }
    }

    document.getElementById('petNameTag').textContent = pet.name;
    document.getElementById('petTraitBadge').textContent = trait.label;
    document.getElementById('petDreamNote').textContent = `"${pet.lastDream}"`;

    const activeMood = pet.isSleeping ? 'sleep' : currentPetMood;
    const outfitSymbol = spec.outfits[pet.currentOutfitIdx] || "";
    const svgBox = document.getElementById('petSvgContainer');
    if (svgBox) {
        svgBox.innerHTML = generatePetSVG(pet.species, level, activeMood, outfitSymbol);
    }
}

function triggerPetExpression(mood, animClass) {
    currentPetMood = mood;
    renderActivePetUI();
    const box = document.getElementById('petCharacterBox');
    if (box && animClass) {
        box.classList.remove('pet-anim-happy', 'pet-anim-eat', 'pet-anim-sleep', 'pet-anim-annoyed');
        void box.offsetWidth;
        box.classList.add(animClass);
    }
    clearTimeout(moodResetTimer);
    if (mood !== 'sleep') {
        moodResetTimer = setTimeout(() => {
            const pet = getFullPetState();
            currentPetMood = pet?.isSleeping ? 'sleep' : 'normal';
            renderActivePetUI();
        }, 2500);
    }
}

function setPetBubble(text) {
    const bubble = document.getElementById('petSpeechBubble');
    if (!bubble) return;
    bubble.style.animation = 'none';
    void bubble.offsetWidth;
    bubble.style.animation = 'popIn 0.25s ease';
    bubble.textContent = text;
}

function gainPetExp(amount, message) {
    const pet = getFullPetState();
    if (!pet) return;
    const oldLevel = Math.floor(pet.exp / 100) + 1;
    pet.exp += amount;
    const newLevel = Math.floor(pet.exp / 100) + 1;
    saveFullPetState(pet);
    renderActivePetUI();

    if (newLevel > oldLevel) {
        setPetBubble(`🎉 Tuyệt vời! Tớ đã lớn lên Cấp ${newLevel} rồi nè! (+${amount} EXP)`);
    } else {
        setPetBubble(`${message} (+${amount} EXP)`);
    }
}
// =========================================================
// HỆ THỐNG NUÔI PET 2D WIDGETABLE (PHẦN 3/3)
// =========================================================

function strokePet() {
    const pet = getFullPetState();
    if (!pet) return;
    const trait = petPersonalities.find(t => t.id === pet.traitId) || petPersonalities[0];

    if (pet.isSleeping) {
        setPetBubble(trait.sleepLines[0]);
        return;
    }

    rapidPokeCount++;
    clearTimeout(pokeResetTimer);
    pokeResetTimer = setTimeout(() => { rapidPokeCount = 0; }, 4000);

    if (rapidPokeCount <= 5) {
        triggerPetExpression('happy', 'pet-anim-happy');
        const line = trait.strokeLines[Math.floor(Math.random() * trait.strokeLines.length)];
        const today = new Date().toDateString();
        if (pet.strokeExpDate !== today) {
            pet.strokeExpDate = today;
            pet.strokeExpCount = 0;
        }
        const now = Date.now();
        const canGainExp = (pet.strokeExpCount < 5) && (!pet.lastStrokeExpTime || now - pet.lastStrokeExpTime >= 30000);
        if (canGainExp) {
            pet.strokeExpCount += 1;
            pet.lastStrokeExpTime = now;
            saveFullPetState(pet);
            gainPetExp(5, `${line} [${pet.strokeExpCount}/5 lượt EXP hôm nay]`);
        } else {
            setPetBubble(line);
        }

    } else if (rapidPokeCount <= 9) {
        triggerPetExpression('annoyed', 'pet-anim-annoyed');
        setPetBubble(`Ơ kìa, cậu chọc tớ ${rapidPokeCount} lần rồi đó! Nhột quá đi mất! 😤`);
    } else {
        rapidPokeCount = 0;
        const rooms = [
            { id: 'bedroom', name: 'Phòng ngủ 🛏️' },
            { id: 'park', name: 'Công viên 🌳' },
            { id: 'bathroom', name: 'Phòng tắm 🛁' }
        ].filter(r => r.id !== currentPetRoom);
        const target = rooms[Math.floor(Math.random() * rooms.length)];
        petCurrentLocation = target.id;

        setPetBubble(`Hứ! Cậu toàn chọc tớ thôi! Tớ chạy sang ${target.name} đây! 😤💨`);
        const charBox = document.getElementById('petCharacterBox');
        if (charBox) charBox.classList.add('pet-run-away');

        setTimeout(() => {
            if (charBox) { charBox.classList.remove('pet-run-away'); charBox.style.display = 'none'; }
            document.getElementById('petSpeechBubble').style.display = 'none';
            document.getElementById('roomActionControls').style.display = 'none';
            const ranNotice = document.getElementById('petRanAwayNotice');
            document.getElementById('petRanAwayText').textContent = `💢 ${pet.name} đã giận dỗi chạy sang ${target.name} rồi!`;
            if (ranNotice) ranNotice.style.display = 'block';
        }, 650);
    }
}

function goFindAngryPet() {
    const roomBtnMap = { dining: 0, bedroom: 1, bathroom: 2, park: 3 };
    const btns = document.querySelectorAll('.room-btn');
    switchPetRoom(petCurrentLocation, btns[roomBtnMap[petCurrentLocation]]);

    document.getElementById('petRanAwayNotice').style.display = 'none';
    document.getElementById('petCharacterBox').style.display = 'inline-flex';
    document.getElementById('petSpeechBubble').style.display = 'block';
    document.getElementById('roomActionControls').style.display = 'flex';

    triggerPetExpression('happy', 'pet-anim-happy');
    gainPetExp(8, "Hì hì, thấy cậu chạy tới dỗ nên tớ hết giận rồi nè! 💖");
}

function switchPetRoom(roomName, btnEl) {
    currentPetRoom = roomName;
    if (btnEl) {
        document.querySelectorAll('.room-btn').forEach(b => b.classList.remove('active'));
        btnEl.classList.add('active');
    }
    const arena = document.getElementById('rightPetArena');
    const titleEl = document.getElementById('petRoomHeaderTitle');
    const actionBar = document.getElementById('roomActionControls');
    const furnitureEl = document.getElementById('roomFurnitureLayer');
    const locBadge = document.getElementById('petLocationBadge');
    const pet = getFullPetState();

    arena.classList.remove('room-dining', 'room-bedroom', 'room-bathroom', 'room-park');
    arena.classList.add('room-' + roomName);

    const roomNames = { dining: "Nhà ăn", bedroom: "Phòng ngủ", bathroom: "Phòng tắm", park: "Công viên" };
    if (locBadge) locBadge.textContent = "📍 Bé đang ở: " + (roomNames[roomName] || "Nhà ăn");

    if (furnitureEl) {
        if (roomName === 'dining') furnitureEl.innerHTML = '<div class="dining-table-2d"><span>🍽️</span><span>🍎</span><span>🥛</span></div>';
        else if (roomName === 'bedroom') furnitureEl.innerHTML = '<div class="bed-2d"></div>';
        else if (roomName === 'bathroom') furnitureEl.innerHTML = '<div class="bathtub-2d"><span class="bathtub-faucet">🚿</span></div>';
        else if (roomName === 'park') furnitureEl.innerHTML = '<div class="park-decor-2d"><span>🌳</span><span>🌻</span><span>🌲</span></div>';
    }

    if (roomName === 'dining') {
        const pantry = JSON.parse(localStorage.getItem('unsaid_pet_pantry') || '[]');
        titleEl.textContent = "🍽️ Nhà ăn ấm cúng";
        if (pantry.length > 0) {
            const dish = pantry[0];
            actionBar.innerHTML = '<button class="pet-action-pill" onclick="feedCraftedDish()">' + dish.icon + ' Cho ăn ' + dish.name + ' (+' + dish.exp + ' EXP • Còn: ' + pantry.length + ')</button>' +
                                  '<button class="pet-action-pill" style="background:#64748b;" onclick="feedPetMeal(\'Sữa ấm bổ dưỡng\', 5)">🥛 Uống sữa nhẹ</button>';
        } else {
            const gardenTabBtn = document.querySelectorAll('.l-tab')[2];
            actionBar.innerHTML = '<button class="pet-action-pill" onclick="switchLeftTab(\'garden\', document.querySelectorAll(\'.l-tab\')[2])">🌾 Hết món ngon! Sang Vườn đổi đồ ăn</button>' +
                                  '<button class="pet-action-pill" style="background:#64748b;" onclick="feedPetMeal(\'Sữa ấm bổ dưỡng\', 5)">🥛 Uống sữa nhẹ</button>';
        }
    } else if (roomName === 'bedroom') {
        titleEl.textContent = "🛏️ Phòng ngủ yên bình";
        actionBar.innerHTML = pet?.isSleeping 
            ? '<button class="pet-action-pill" onclick="togglePetSleep(false)">☀️ Đánh thức bé dậy</button>'
            : '<button class="pet-action-pill" onclick="togglePetSleep(true)">🌙 Tắt đèn cho bé ngủ</button>';
    } else if (roomName === 'bathroom') {
        titleEl.textContent = "🛁 Phòng tắm bong bóng";
        actionBar.innerHTML = '<button class="pet-action-pill" onclick="bathPet()">🧼 Tắm bồn xà phòng thơm</button>';
    } else if (roomName === 'park') {
        titleEl.textContent = "🌳 Công viên xanh mát";
        actionBar.innerHTML = '<button class="pet-action-pill" onclick="playInPark()">⚽ Chơi ném bóng cùng bé</button>';
    }
}

function feedCraftedDish() {
    let pantry = JSON.parse(localStorage.getItem('unsaid_pet_pantry') || '[]');
    if (pantry.length === 0) return;
    const dish = pantry.shift();
    localStorage.setItem('unsaid_pet_pantry', JSON.stringify(pantry));

    const pet = getFullPetState();
    const trait = petPersonalities.find(t => t.id === pet.traitId) || petPersonalities[0];
    pet.isSleeping = false;
    saveFullPetState(pet);

    triggerPetExpression('eat', 'pet-anim-eat');
    gainPetExp(dish.exp, trait.eatLines[0] + ' (' + dish.name + ')');
    switchPetRoom('dining');
}

function feedPetMeal(foodName, expGain) {
    const pet = getFullPetState();
    const trait = petPersonalities.find(t => t.id === pet.traitId) || petPersonalities[0];
    pet.isSleeping = false;
    saveFullPetState(pet);
    triggerPetExpression('eat', 'pet-anim-eat');
    gainPetExp(expGain, `${trait.eatLines[0]} (${foodName})`);
}

function togglePetSleep(sleepState) {
    const pet = getFullPetState();
    const trait = petPersonalities.find(t => t.id === pet.traitId) || petPersonalities[0];
    pet.isSleeping = sleepState;
    if (sleepState) {
        pet.lastDream = petDreamsList[Math.floor(Math.random() * petDreamsList.length)];
        saveFullPetState(pet);
        triggerPetExpression('sleep', 'pet-anim-sleep');
        setPetBubble(trait.sleepLines[0]);
    } else {
        saveFullPetState(pet);
        triggerPetExpression('happy', 'pet-anim-happy');
        gainPetExp(10, "Ngủ dậy khỏe khoắn quá! Cậu đọc thử giấc mơ của tớ ở cột trái nhé! ☀️");
    }
    switchPetRoom('bedroom');
}

function bathPet() {
    const pet = getFullPetState();
    pet.isSleeping = false;
    saveFullPetState(pet);
    triggerPetExpression('happy', 'pet-anim-happy');
    gainPetExp(12, "Tắm mát sạch bong, thơm tho quá đi thôi! 🫧✨");
}

function playInPark() {
    const pet = getFullPetState();
    pet.isSleeping = false;
    saveFullPetState(pet);
    triggerPetExpression('play', 'pet-anim-happy');
    gainPetExp(15, "Chạy nhảy ngoài công viên vui hết nấc! 🌳⚽");
}

function openPetDiaryModal() {
    const pet = getFullPetState();
    if (!pet) return;
    const today = new Date().toDateString();
    const spec = petCatalog[pet.species] || petCatalog.cat;
    if (pet.lastCheckInDate !== today) {
        pet.streak += 1;
        pet.lastCheckInDate = today;
        const nextOutfitIdx = Math.min(spec.outfits.length - 1, Math.floor(pet.streak / 2) + 1);
        if (!pet.unlockedOutfits.includes(nextOutfitIdx)) {
            pet.unlockedOutfits.push(nextOutfitIdx);
            pet.currentOutfitIdx = nextOutfitIdx;
            saveFullPetState(pet);
            renderActivePetUI();
            alert(`📅 Điểm danh thành công! Chuỗi: ${pet.streak} ngày.\n🎁 Mở khóa trang phục mới: ${spec.outfits[nextOutfitIdx]}`);
            return;
        }
        saveFullPetState(pet);
        renderActivePetUI();
        gainPetExp(20, "Cảm ơn cậu đã điểm danh hôm nay nhé! 💖");
    } else {
        alert(`📅 Nhật ký hôm nay đã điểm danh!\n🔥 Chuỗi hiện tại: ${pet.streak} ngày.\n👗 Trang phục đã mở khóa: ${pet.unlockedOutfits.map(i => spec.outfits[i] || 'Mặc định').join(' ')}`);
    }
}

function cyclePetOutfit() {
    const pet = getFullPetState();
    if (!pet) return;
    const spec = petCatalog[pet.species] || petCatalog.cat;
    const nextPos = (pet.unlockedOutfits.indexOf(pet.currentOutfitIdx) + 1) % pet.unlockedOutfits.length;
    pet.currentOutfitIdx = pet.unlockedOutfits[nextPos];
    saveFullPetState(pet);
    renderActivePetUI();
    setPetBubble(`Tớ mặc trang phục (${spec.outfits[pet.currentOutfitIdx] || "Tự nhiên"}) có dễ thương không cậu? ✨`);
}

function renamePet() {
    const pet = getFullPetState();
    if (!pet) return;
    const newName = prompt("Đặt tên mới cho bé Pet của bạn:", pet.name);
    if (newName && newName.trim()) {
        pet.name = newName.trim();
        saveFullPetState(pet);
        renderActivePetUI();
    }
}

function handleRestoreStreak() {
    const pet = getFullPetState();
    if (!pet || pet.missedDays <= 0) return;
    const used = pet.restoreUsedCount || 0;
    if (used >= 3) return;
    const totalDays = getCalendarDaysDiff(pet.adoptedAt || Date.now(), Date.now()) + 1;
    if (totalDays >= 50) {
        pet.missedDays = Math.max(0, pet.missedDays - 1);
        pet.restoreUsedCount = used + 1;
        if (pet.missedDays === 0) { pet.streak = (pet.lostStreakBackup || 0) + 1; pet.lostStreakBackup = 0; }
        saveFullPetState(pet);
        renderActivePetUI();
        setPetBubble("🎉 Đã bù chuỗi thành công nhờ đặc quyền gắn bó 50+ ngày! 🔥");
    } else {
        if (!confirm(`Bạn mới nuôi ${totalDays}/50 ngày. Bấm OK để mô phỏng xem quảng cáo 5 giây bù 1 ngày chuỗi (Còn ${3 - used}/3 lượt).`)) return;
        const btn = document.getElementById('restoreStreakBtn');
        let sec = 5;
        btn.disabled = true;
        const timer = setInterval(() => {
            btn.textContent = `📺 Đang xem QC (${sec}s)...`;
            sec--;
            if (sec < 0) {
                clearInterval(timer);
                btn.disabled = false;
                pet.missedDays = Math.max(0, pet.missedDays - 1);
                pet.restoreUsedCount = used + 1;
                if (pet.missedDays === 0) { pet.streak = (pet.lostStreakBackup || 0) + 1; pet.lostStreakBackup = 0; }
                saveFullPetState(pet);
                renderActivePetUI();
                setPetBubble("🩹 Đã bù thành công 1 ngày chuỗi sau khi xem quảng cáo! 🔥");
            }
        }, 1000);
    }
}

function askAIForPetGuide() {
    const mascotTabBtn = document.querySelector('.l-tab');
    switchLeftTab('mascot', mascotTabBtn);
    const q = "Giới thiệu cho tớ cách chơi khu Nuôi Pet, cách tăng EXP nhanh, giữ chuỗi nhận trang phục và các bí mật ẩn nhé!";
    appendMessage("🤖 Nhờ Linh vật hướng dẫn chế độ Nuôi Pet", "user");
    fetchAIReply(q);
}
const CROPS_DB = {
    rice:      { name: "Lúa",            icon: "🌾", seedPrice: 0,   sellPrice: 5,    watersNeeded: 1, waitSec: 15,  petFoodName: "Cơm nắm thơm",    petExp: 10,  freeInfinite: true },
    radish:    { name: "Củ cải",         icon: "🥬", seedPrice: 15,  sellPrice: 28,   watersNeeded: 2, waitSec: 30,  petFoodName: "Súp củ cải ấm",   petExp: 18 },
    carrot:    { name: "Cà rốt",         icon: "🥕", seedPrice: 35,  sellPrice: 65,   watersNeeded: 2, waitSec: 60,  petFoodName: "Bánh cà rốt",     petExp: 26 },
    potato:    { name: "Khoai",          icon: "🥔", seedPrice: 70,  sellPrice: 135,  watersNeeded: 3, waitSec: 90,  petFoodName: "Khoai nướng bơ",  petExp: 38 },
    bamboo:    { name: "Măng",           icon: "🎍", seedPrice: 130, sellPrice: 250,  watersNeeded: 3, waitSec: 150, petFoodName: "Măng xào giòn",   petExp: 52 },
    sunflower: { name: "Hoa hướng dương",icon: "🌻", seedPrice: 240, sellPrice: 470,  watersNeeded: 4, waitSec: 240, petFoodName: "Hạt hướng dương", petExp: 75 },
    cacao:     { name: "Ca cao",         icon: "🍫", seedPrice: 450, sellPrice: 900,  watersNeeded: 5, waitSec: 360, petFoodName: "Socola nóng",     petExp: 110 },
    ginseng:   { name: "Nhân sâm",       icon: "🫚", seedPrice: 850, sellPrice: 1800, watersNeeded: 6, waitSec: 600, petFoodName: "Cháo nhân sâm",   petExp: 180 }
};

let selectedSeedToPlant = 'rice';
let farmTickTimer = null;

function formatRemainTime(sec) {
    if (sec >= 60) {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return s > 0 ? `${m}p${s}s` : `${m} phút`;
    }
    return `${sec}s`;
}

function getFarmState() {
    let state = JSON.parse(localStorage.getItem('unsaid_farm_v2') || 'null');
    if (!state) {
        state = {
            coins: 20,
            plots: Array.from({ length: 6 }, () => ({ cropKey: null, waters: 0, nextWaterAt: 0 })),
            seeds: { rice: 999, radish: 2, carrot: 0, potato: 0, bamboo: 0, sunflower: 0, cacao: 0, ginseng: 0 },
            crops: { rice: 0, radish: 0, carrot: 0, potato: 0, bamboo: 0, sunflower: 0, cacao: 0, ginseng: 0 }
        };
        localStorage.setItem('unsaid_farm_v2', JSON.stringify(state));
    }
    return state;
}

function saveFarmState(state) {
    localStorage.setItem('unsaid_farm_v2', JSON.stringify(state));
}

function initFarmSystem() {
    renderFarmArena();
    clearInterval(farmTickTimer);
    farmTickTimer = setInterval(() => {
        if (document.getElementById('rightGardenArena')?.style.display === 'flex') {
            renderFarmArena();
        }
    }, 1000);
}
function renderFarmArena() {
    const state = getFarmState();
    const now = Date.now();
    const coinsBadge = document.getElementById('farmCoinsBadge');
    if (coinsBadge) coinsBadge.textContent = `🪙 ${state.coins} Xu`;

    const seedListEl = document.getElementById('quickSeedSelector');
    if (seedListEl) {
        seedListEl.innerHTML = Object.keys(CROPS_DB).map(key => {
            const c = CROPS_DB[key];
            const count = c.freeInfinite ? "Free" : (state.seeds[key] || 0);
            const isSel = selectedSeedToPlant === key ? "selected" : "";
            return `<button class="seed-chip-btn ${isSel}" onclick="selectSeedToPlant('${key}')">${c.icon} ${c.name} (${count})</button>`;
        }).join('');
    }

    const gridEl = document.getElementById('farmPlotsGrid');
    if (!gridEl) return;

    gridEl.innerHTML = state.plots.map((plot, idx) => {
        if (!plot.cropKey) {
            return `<div class="soil-plot" onclick="handlePlotClick(${idx})">
                <span class="plot-plant-emoji" style="opacity:0.35;">🟫</span>
                <span class="plot-status-tag">+ Gieo hạt</span>
            </div>`;
        }
        const crop = CROPS_DB[plot.cropKey];
        const remainSec = Math.max(0, Math.ceil(((plot.nextWaterAt || 0) - now) / 1000));
        const isReady = plot.waters >= crop.watersNeeded && remainSec === 0;

        let stageIcon = "🌰";
        if (isReady) stageIcon = crop.icon;
        else if (plot.waters > 0) stageIcon = "🌱";

        let statusText = "";
        let plotClass = "soil-plot";

        if (isReady) {
            statusText = "✨ Thu hoạch!";
            plotClass = "soil-plot ready";
        } else if (remainSec > 0) {
            statusText = `⏳ Lớn sau ${formatRemainTime(remainSec)}`;
            plotClass = "soil-plot wet";
        } else {
            statusText = `💧 Tưới (${plot.waters}/${crop.watersNeeded})`;
        }

        return `<div class="${plotClass}" onclick="handlePlotClick(${idx})">
            <span class="plot-plant-emoji">${stageIcon}</span>
            <span class="plot-status-tag">${statusText}</span>
        </div>`;
    }).join('');
}

function selectSeedToPlant(cropKey) {
    selectedSeedToPlant = cropKey;
    const c = CROPS_DB[cropKey];
    const banner = document.getElementById('farmGuideBanner');
    if (banner) {
        banner.textContent = `🌰 ${c.icon} ${c.name}: Cần ${c.watersNeeded} lần tưới (mỗi lần chờ ${formatRemainTime(c.waitSec)}) • Bán ${c.sellPrice} Xu`;
    }
    renderFarmArena();
}

function handlePlotClick(plotIdx) {
    const state = getFarmState();
    const plot = state.plots[plotIdx];
    const banner = document.getElementById('farmGuideBanner');
    const now = Date.now();

    // 1. Gieo hạt xuống đất trống
    if (!plot.cropKey) {
        const crop = CROPS_DB[selectedSeedToPlant];
        if (!crop.freeInfinite && (state.seeds[selectedSeedToPlant] || 0) <= 0) {
            if (banner) banner.textContent = `⚠️ Hết hạt ${crop.name}! Mở 🏪 Cửa hàng để mua thêm nhé!`;
            return;
        }
        if (!crop.freeInfinite) state.seeds[selectedSeedToPlant] -= 1;
        plot.cropKey = selectedSeedToPlant;
        plot.waters = 0;
        plot.nextWaterAt = 0;
        saveFarmState(state);
        renderFarmArena();
        if (banner) banner.textContent = `🌰 Đã gieo ${crop.icon} ${crop.name}! Chạm vào ô đất để tưới nước lần 1!`;
        return;
    }

    const plantedCrop = CROPS_DB[plot.cropKey];
    const remainSec = Math.max(0, Math.ceil(((plot.nextWaterAt || 0) - now) / 1000));

    // 2. Chống spam: Cây đang hấp thụ nước chưa hết thời gian chờ
    if (remainSec > 0) {
        if (banner) banner.textContent = `⏳ ${plantedCrop.icon} ${plantedCrop.name} đang hút nước và lớn lên, đợi thêm ${formatRemainTime(remainSec)} nhé!`;
        return;
    }

    // 3. Tưới nước từng giai đoạn (mỗi lần tưới kích hoạt đồng hồ chờ riêng của cây)
    if (plot.waters < plantedCrop.watersNeeded) {
        plot.waters += 1;
        plot.nextWaterAt = now + plantedCrop.waitSec * 1000;
        saveFarmState(state);
        renderFarmArena();
        if (banner) {
            banner.textContent = plot.waters >= plantedCrop.watersNeeded
                ? `💧 Đã tưới đủ ${plantedCrop.watersNeeded}/${plantedCrop.watersNeeded} lần! Chờ ${formatRemainTime(plantedCrop.waitSec)} nữa để cây chín rộ!`
                : `💧 Đã tưới lần ${plot.waters}/${plantedCrop.watersNeeded}! Chờ ${formatRemainTime(plantedCrop.waitSec)} để tưới tiếp!`;
        }
        return;
    }

    // 4. Thu hoạch khi đã tưới đủ & hết thời gian chín
    state.crops[plot.cropKey] = (state.crops[plot.cropKey] || 0) + 1;
    state.plots[plotIdx] = { cropKey: null, waters: 0, nextWaterAt: 0 };
    saveFarmState(state);
    renderFarmArena();
    if (banner) banner.textContent = `🧺 Thu hoạch thành công 1 ${plantedCrop.icon} ${plantedCrop.name} vào 🎒 Kho Lương Thực!`;
}

function openGardenModal(defaultTab = 'inventory') {
    const modal = document.getElementById('gardenModal');
    if (modal) modal.style.display = 'flex';
    switchGardenModalTab(defaultTab);
}

function closeGardenModal() {
    const modal = document.getElementById('gardenModal');
    if (modal) modal.style.display = 'none';
    renderFarmArena();
}

function switchGardenModalTab(tab) {
    document.getElementById('gTabInventory').classList.toggle('active', tab === 'inventory');
    document.getElementById('gTabShop').classList.toggle('active', tab === 'shop');

    document.getElementById('gardenInventoryView').style.display = (tab === 'inventory') ? 'block' : 'none';
    document.getElementById('gardenShopView').style.display = (tab === 'shop') ? 'block' : 'none';

    if (tab === 'inventory') renderInventoryView();
    if (tab === 'shop') renderShopView();
}

function switchShopSubTab(sub) {
    document.getElementById('subTabCraft').classList.toggle('active', sub === 'craft');
    document.getElementById('subTabSell').classList.toggle('active', sub === 'sell');
    document.getElementById('subTabBuy').classList.toggle('active', sub === 'buy');

    document.getElementById('shopCraftPetFoodList').style.display = (sub === 'craft') ? 'grid' : 'none';
    document.getElementById('shopSellCropsList').style.display = (sub === 'sell') ? 'grid' : 'none';
    document.getElementById('shopBuySeedsList').style.display = (sub === 'buy') ? 'grid' : 'none';
}

function renderInventoryView() {
    const state = getFarmState();
    document.getElementById('invCropsList').innerHTML = Object.keys(CROPS_DB).map(key => {
        const c = CROPS_DB[key];
        const qty = state.crops[key] || 0;
        return `<div class="inv-item-tile ${qty === 0 ? 'empty' : ''}">
            <span class="inv-qty-badge">x${qty}</span>
            <span class="inv-tile-icon">${c.icon}</span>
            <span class="inv-tile-name">${c.name}</span>
        </div>`;
    }).join('');

    document.getElementById('invSeedsList').innerHTML = Object.keys(CROPS_DB).map(key => {
        const c = CROPS_DB[key];
        const qty = c.freeInfinite ? "∞" : (state.seeds[key] || 0);
        return `<div class="inv-item-tile ${qty === 0 ? 'empty' : ''}">
            <span class="inv-qty-badge" style="background:#d97706;">${qty}</span>
            <span class="inv-tile-icon">🌰</span>
            <span class="inv-tile-name">${c.name}</span>
        </div>`;
    }).join('');
}

function renderShopView() {
    const state = getFarmState();
    document.getElementById('modalCoinsDisplay').textContent = `🪙 ${state.coins} Xu`;

    document.getElementById('shopCraftPetFoodList').innerHTML = Object.keys(CROPS_DB).map(key => {
        const c = CROPS_DB[key];
        const owned = state.crops[key] || 0;
        return `<div class="shop-card-box">
            <div class="shop-card-icon">${c.icon} ➔ 🍲</div>
            <div class="shop-card-title">${c.petFoodName}</div>
            <div class="shop-card-sub">Cần 1 ${c.name} (Có: ${owned}) • <b>+${c.petExp} EXP</b></div>
            <button class="shop-action-btn" ${owned <= 0 ? 'disabled' : ''} onclick="exchangeCropForPetFood('${key}')">Đổi món ăn</button>
        </div>`;
    }).join('');

    document.getElementById('shopSellCropsList').innerHTML = Object.keys(CROPS_DB).map(key => {
        const c = CROPS_DB[key];
        const owned = state.crops[key] || 0;
        return `<div class="shop-card-box">
            <div class="shop-card-icon">${c.icon}</div>
            <div class="shop-card-title">${c.name} (Có: ${owned})</div>
            <div class="shop-card-sub">Giá bán: <b style="color:#eab308;">+${c.sellPrice} Xu</b>/cái</div>
            <div class="shop-btn-group">
                <button class="shop-action-btn" style="background:#eab308; color:#422006;" ${owned <= 0 ? 'disabled' : ''} onclick="sellCropForCoins('${key}', 1)">Bán 1</button>
                <button class="shop-action-btn" style="background:#f97316; color:#fff;" ${owned <= 0 ? 'disabled' : ''} onclick="sellCropForCoins('${key}', ${owned})">Bán hết</button>
            </div>
        </div>`;
    }).join('');

    document.getElementById('shopBuySeedsList').innerHTML = Object.keys(CROPS_DB).filter(k => !CROPS_DB[k].freeInfinite).map(key => {
        const c = CROPS_DB[key];
        const ownedSeed = state.seeds[key] || 0;
        return `<div class="shop-card-box">
            <div class="shop-card-icon">🌰 ${c.icon}</div>
            <div class="shop-card-title">Hạt ${c.name} (Có: ${ownedSeed})</div>
            <div class="shop-card-sub">Giá mua: <b style="color:#eab308;">${c.seedPrice} Xu</b></div>
            <button class="shop-action-btn" style="background:#16a34a;" ${state.coins < c.seedPrice ? 'disabled' : ''} onclick="buySeedWithCoins('${key}')">Mua hạt</button>
        </div>`;
    }).join('');
}

function sellCropForCoins(cropKey, amount = 1) {
    const state = getFarmState();
    const c = CROPS_DB[cropKey];
    const owned = state.crops[cropKey] || 0;
    const sellQty = Math.min(owned, amount);
    if (sellQty <= 0) return;

    state.crops[cropKey] -= sellQty;
    state.coins += c.sellPrice * sellQty;
    saveFarmState(state);
    renderShopView();
    renderFarmArena();
}
function exchangeCropForPetFood(cropKey) {
    const state = getFarmState();
    const c = CROPS_DB[cropKey];
    if (!c || (state.crops[cropKey] || 0) <= 0) return;

    state.crops[cropKey] -= 1;
    saveFarmState(state);

    let pantry = JSON.parse(localStorage.getItem('unsaid_pet_pantry') || '[]');
    pantry.push({ id: cropKey, name: c.petFoodName, icon: c.icon, exp: c.petExp });
    localStorage.setItem('unsaid_pet_pantry', JSON.stringify(pantry));

    renderShopView();
    renderFarmArena();
    const banner = document.getElementById('farmGuideBanner');
    if (banner) {
        banner.textContent = `🍲 Đã đổi 1 ${c.petFoodName} (+${c.petExp} EXP)! Sang tab 🐾 Nuôi Pet -> Nhà ăn để cho bé ăn nhé!`;
    }
}

function buySeedWithCoins(cropKey) {
    const state = getFarmState();
    const c = CROPS_DB[cropKey];
    if (state.coins < c.seedPrice) return;
    state.coins -= c.seedPrice;
    state.seeds[cropKey] = (state.seeds[cropKey] || 0) + 1;
    saveFarmState(state);
    renderShopView();
    renderFarmArena();
}

let isMusicPlaying = false, musicInterval = null, currentTrackIndex = 0, noteStep = 0;
const originalMelodies = [
    { name: "Đêm Sao Yên Bình", notes: [261.63, 329.63, 392.00, 493.88, 392.00, 329.63, 293.66, 349.23, 440.00, 349.23], tempo: 650 },
    { name: "Giọt Sương Ban Mai", notes: [329.63, 392.00, 440.00, 523.25, 493.88, 392.00, 349.23, 440.00], tempo: 550 },
    { name: "Gió Nhẹ Qua Đồi", notes: [220.00, 261.63, 329.63, 392.00, 329.63, 261.63, 246.94, 293.66], tempo: 720 }
];
function playSingleMusicNote(freq) {
    if (appSettings.volume <= 0) return;
    try {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        const maxVol = (appSettings.volume / 100) * 0.12;
        gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(maxVol, audioCtx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.1);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + 1.15);
    } catch (e) {}
}
function toggleMusicBox() {
    const btn = document.getElementById('musicToggleBtn');
    if (isMusicPlaying) {
        isMusicPlaying = false; clearInterval(musicInterval);
        if (btn) btn.textContent = "▶️ Phát nhạc";
    } else {
        if (typeof isVoiceCallActive !== 'undefined' && isVoiceCallActive) { alert("Hãy tắt cuộc gọi thoại trước khi bật hộp nhạc nhé!"); return; }
        isMusicPlaying = true; if (btn) btn.textContent = "⏸ Tạm dừng";
        startMelodyLoop();
    }
}
function startMelodyLoop() {
    clearInterval(musicInterval);
    const track = originalMelodies[currentTrackIndex];
    document.getElementById('musicTrackName').textContent = `Giai điệu: ${track.name}`;
    noteStep = 0;
    musicInterval = setInterval(() => {
        if (!isMusicPlaying) return;
        playSingleMusicNote(track.notes[noteStep % track.notes.length]);
        noteStep++;
    }, track.tempo);
}
function nextMusicTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % originalMelodies.length;
    document.getElementById('musicTrackName').textContent = `Giai điệu: ${originalMelodies[currentTrackIndex].name}`;
    if (isMusicPlaying) startMelodyLoop();
}
// =========================================================
// PHẦN 2: THỜI TIẾT MƯA & THÔNG BÁO ĐẨY RA THIẾT BỊ
// =========================================================

let isRaining = false, rainDrops = [], rainAnimId = null;
function initRainCanvas() {
    const canvas = document.getElementById('weatherCanvas');
    if (!canvas) return;
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    rainDrops = Array.from({ length: 85 }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        len: Math.random() * 18 + 10, speed: Math.random() * 6 + 7
    }));
}
function drawRainLoop() {
    const canvas = document.getElementById('weatherCanvas');
    if (!canvas || !isRaining) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = document.body.classList.contains('dark-mode') ? 'rgba(186, 230, 253, 0.45)' : 'rgba(71, 85, 105, 0.35)';
    ctx.lineWidth = 1.3; ctx.lineCap = 'round';
    for (let d of rainDrops) {
        ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x - 1.5, d.y + d.len); ctx.stroke();
        d.y += d.speed; d.x -= 1.2;
        if (d.y > canvas.height) { d.y = -20; d.x = Math.random() * canvas.width; }
    }
    rainAnimId = requestAnimationFrame(drawRainLoop);
}
function setRainEffect(enable) {
    isRaining = enable;
    const canvas = document.getElementById('weatherCanvas');
    if (enable) {
        document.body.classList.add('weather-rain'); initRainCanvas();
        cancelAnimationFrame(rainAnimId); drawRainLoop();
    } else {
        document.body.classList.remove('weather-rain'); cancelAnimationFrame(rainAnimId);
        if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }
}
window.addEventListener('resize', () => { if (isRaining) initRainCanvas(); });
function updateWeatherSetting(val) {
    appSettings.weather = val; saveSettingsToStorage();
    if (val === 'rain') setRainEffect(true);
    else if (val === 'clear') setRainEffect(false);
    else checkRealTimeWeatherAndNotify(false);
}
async function requestSystemNotificationPermission() {
    const btn = document.getElementById('enableNotifyBtn');
    if (window.Capacitor?.Plugins?.LocalNotifications) {
        try {
            const perm = await window.Capacitor.Plugins.LocalNotifications.requestPermissions();
            if (perm.display === 'granted') { if (btn) btn.textContent = "✅ Đã bật"; checkRealTimeWeatherAndNotify(true); }
        } catch (e) {}
        return;
    }
    if (!("Notification" in window)) { alert("Trình duyệt không hỗ trợ thông báo hệ thống!"); return; }
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        if (btn) btn.textContent = "✅ Đã bật";
        sendDeviceNotification("Unsaid.AI - Trợ Lý Linh Vật", "🎉 Đã bật thông báo hỏi thăm hàng ngày ra màn hình!");
    }
}
async function sendDeviceNotification(title, bodyText) {
    if (window.Capacitor?.Plugins?.LocalNotifications) {
        try {
            await window.Capacitor.Plugins.LocalNotifications.schedule({
                notifications: [{ title, body: bodyText, id: Math.floor(Math.random() * 100000), schedule: { at: new Date(Date.now() + 1000) } }]
            });
            return;
        } catch (e) {}
    }
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification(title, { body: bodyText });
    }
}
async function checkRealTimeWeatherAndNotify(shouldNotify = true) {
    let weatherDesc = "mát mẻ", tempC = "", rainDetected = false;
    try {
        const res = await fetch("https://open-meteo.com");
        const data = await res.json();
        if (data?.current_weather) {
            tempC = Math.round(data.current_weather.temperature) + "°C";
            const code = data.current_weather.weathercode;
            if (code >= 51) { rainDetected = true; weatherDesc = "đang có mưa"; }
            else if (code >= 1 && code <= 3) weatherDesc = "nhiều mây dịu nhẹ";
            else weatherDesc = "trời quang đãng";
        }
    } catch (e) {}

    const mode = appSettings.weather || 'auto';
    if (mode === 'auto') setRainEffect(rainDetected);
    else if (mode === 'rain') setRainEffect(true);

    if (shouldNotify) {
        const todayStr = new Date().toDateString();
        if (localStorage.getItem('unsaid_daily_notify') !== todayStr) {
            const hour = new Date().getHours();
            let greet = "Chào buổi sáng tốt lành";
            if (hour >= 11 && hour < 14) greet = "Chào buổi trưa nhé";
            else if (hour >= 14 && hour < 18) greet = "Chào buổi chiều";
            else if (hour >= 18 || hour < 5) greet = "Chào buổi tối ấm áp";

            const savedData = JSON.parse(localStorage.getItem('unsaid_app_data') || '{}');
            const mascotTitle = savedData.customName || mascotData[`${selectedGender}_${selectedAge}`]?.name || "Trợ Lý Linh Vật";
            const note = rainDetected ? `Ngoài trời hiện ${weatherDesc} (${tempC}), cậu nhớ giữ ấm nhé! 🌧️` : `Thời tiết hôm nay ${weatherDesc} ${tempC ? `(${tempC})` : ''}, rất hợp để thư giãn đấy! 🌤️`;

            if (("Notification" in window && Notification.permission === "granted") || window.Capacitor?.Plugins?.LocalNotifications) {
                localStorage.setItem('unsaid_daily_notify', todayStr);
                sendDeviceNotification(`${mascotTitle} hỏi thăm bạn 💌`, `${greet}! ${note} Hôm nay cậu thế nào rồi?`);
            }
        }
    }
}
