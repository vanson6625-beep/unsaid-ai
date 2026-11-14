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
        name: "Gundam Chiến Giáp", 
        greeting: "Hệ thống đã sẵn sàng! Cùng nhau chinh phục mọi bài học hôm nay nhé! 🚀",
        persona: "Bạn tên là Gundam Chiến Giáp (emoji 🦾), một người đồng đội mạnh mẽ, tin cậy dành cho học sinh 13-17 tuổi. Xưng là 'tớ' và gọi người dùng là 'cậu'. Luôn cổ vũ tinh thần vượt qua căng thẳng, áp lực thi cử và truyền động lực tích cực."
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
    if (gender === 'male') {
        document.body.className = 'theme-male';
    } else {
        document.body.className = 'theme-female';
    }
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
function startApp() {
    const key = `${selectedGender}_${selectedAge}`;
    const currentMascot = mascotData[key];
            currentPersonaPrompt = currentMascot.persona + 
        "\n\n[QUY TẮC TRẢ LỜI BẮT BUỘC]:\n" +
        "1. KỂ CHUYỆN DÀI & CUỐN HÚT: Khi được yêu cầu kể chuyện (hoặc bấm nút 'Kể chuyện'), hãy kể đầy đủ, chi tiết, có tình tiết mạch lạc và giàu cảm xúc.\n" +
        "2. MỌI THỨ KHÁC PHẢI NGẮN GỌN, SÚC TÍCH: Với tất cả các câu hỏi còn lại (trò chuyện, tâm sự, giải bài tập, hỏi kiến thức...), luôn tự động lọc ý chính, đi thẳng vào đáp án/kết quả trong 2-4 câu ngắn hoặc 3-4 gạch đầu dòng trọng tâm. Tuyệt đối không viết dài dòng, rườm rà.\n" +
        "3. CHỈ PHÂN TÍCH DÀI KHI ĐƯỢC YÊU CẦU RÕ: Chỉ giải thích sâu từng bước khi người dùng nhắn kèm từ khóa 'phân tích' hoặc 'giải chi tiết'."+ 
        "4. THẤU HIỂU TÂM LÝ & DẪN DẮT KHÉO LÉO: Người dùng thường là học sinh ngại giao tiếp hoặc đang gặp áp lực. Khi họ bảo 'không biết nói gì' hay 'hỏi tớ trước đi', TUYỆT ĐỐI KHÔNG hỏi cứng nhắc về việc học hành. Hãy bắt đầu bằng 1 câu hỏi đời thường, nhẹ nhàng và dễ trả lời (như hỏi về tâm trạng hôm nay, thời tiết, món ăn, hoặc đưa ra 2 lựa chọn A/B vui vẻ). Luôn lắng nghe, đồng cảm trước và không bao giờ hỏi lặp lại một ý đã hỏi ở câu trước.";
;
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
    if (mascotName) mascotName.textContent = currentMascot.name;
    if (greetingBubble) greetingBubble.textContent = currentMascot.greeting;
    if (headerIcon) headerIcon.textContent = currentMascot.emoji;
    if (headerTitle) headerTitle.textContent = currentMascot.name; 
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
function appendMessage(text, sender) {
    const chatDisplay = document.getElementById('chatDisplay');
    if (!chatDisplay) return null;
    const bubble = document.createElement('div');
    bubble.className = sender === 'user' ? 'bubble user' : 'bubble';
    bubble.innerHTML = formatChatText(text);
    chatDisplay.appendChild(bubble);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
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
// --- BỘ CÂU HỎI KHỞI ĐẦU CHO NGƯỜI NGẠI GIAO TIẾP ---
const starterQuestions = [
    "Hôm nay tớ hơi mệt, chỉ muốn nghe an ủi một chút 🔋",
    "Tớ không biết bắt đầu từ đâu, cậu hỏi tớ trước đi 🌱",
    "Dạo này tớ hơi áp lực chuyện học hành 📚",
    "Kể cho tớ một chuyện gì đó nhẹ nhàng cho đỡ căng thẳng nhé 🌙",
    "Nếu được chọn một siêu năng lực hôm nay, cậu chọn gì? ✨"
];
// Hiển thị danh sách câu hỏi gợi ý ngay trong khung chat để người dùng bấm chọn
function showStarterPrompts() {
    const chatDisplay = document.getElementById('chatDisplay');
    if (!chatDisplay) return;
    // Xóa khung gợi ý cũ nếu đang hiện
    const oldBox = document.getElementById('starterBox');
    if (oldBox) oldBox.remove();
    const box = document.createElement('div');
    box.id = 'starterBox';
    box.style.cssText = "display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0;";
    starterQuestions.forEach(question => {
        const chip = document.createElement('button');
        chip.textContent = question;
        chip.style.cssText = "background: #f0f4ff; border: 1px solid #c7d7fe; color: #3538cd; padding: 8px 12px; border-radius: 16px; font-size: 13px; cursor: pointer; text-align: left; transition: 0.2s;";

        chip.onclick = () => {
            box.remove(); // Ẩn gợi ý sau khi đã chọn
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
