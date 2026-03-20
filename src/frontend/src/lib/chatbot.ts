export type Language = "hindi" | "english";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function detectLanguage(text: string): Language {
  // Check for Devanagari Unicode block (\u0900-\u097F)
  const hindiPattern = /[\u0900-\u097F]/;
  return hindiPattern.test(text) ? "hindi" : "english";
}

interface ResponseEntry {
  keywords: string[];
  hindiKeywords: string[];
  english: string;
  hindi: string;
}

const responses: ResponseEntry[] = [
  {
    keywords: ["hello", "hi", "hey", "namaste", "good morning", "good evening"],
    hindiKeywords: ["नमस्ते", "हेलो", "हाय", "नमस्कार", "प्रणाम"],
    english: `Hello! 👋 Namaste! I'm AI Saathi, your friendly bilingual assistant.

I can help you with:
• 💰 Earning Tips — freelancing, passive income & side hustles
• 💻 Tech Help — smartphone tips, apps & cybersecurity
• 🏢 Business Ideas — startup tips & low-investment ideas
• 📚 Education — free courses, career guidance & skills

Just type your question or tap a quick-reply button below!`,
    hindi: `नमस्ते! 👋 मैं AI Saathi हूँ, आपका बिलिंगुअल सहायक।

मैं इन विषयों में आपकी मदद कर सकता हूँ:
• 💰 पैसे कमाने के टिप्स — फ्रीलांसिंग, पैसिव इनकम
• 💻 टेक मदद — स्मार्टफोन टिप्स, ऐप्स और साइबर सुरक्षा
• 🏢 बिज़नेस आइडिया — स्टार्टअप टिप्स और कम निवेश के आइडिया
• 📚 शिक्षा — मुफ्त कोर्स, करियर गाइडेंस

नीचे दिए बटन दबाएं या अपना सवाल टाइप करें!`,
  },
  {
    keywords: [
      "earning",
      "earn",
      "money",
      "income",
      "freelance",
      "side hustle",
      "passive",
      "online earning",
      "make money",
    ],
    hindiKeywords: [
      "पैसे",
      "कमाई",
      "आमदनी",
      "फ्रीलांस",
      "इनकम",
      "पैसे कमाने",
      "ऑनलाइन कमाई",
      "साइड",
    ],
    english: `💰 **Earning Tips — How to Make Money Online**

Here are proven ways to earn income:

**Step 1 — Start Freelancing**
• Register on Fiverr, Upwork, or Freelancer.com
• Offer skills like writing, design, coding, or data entry
• Start with low rates to build reviews, then increase

**Step 2 — Explore Passive Income**
• Create YouTube videos or a blog on a topic you know
• Earn through AdSense, affiliate links, or sponsorships
• Sell digital products: eBooks, templates, stock photos

**Step 3 — Online Side Hustles**
• Sell products on Amazon, Meesho, or OLX
• Become a food delivery or cab driver partner
• Teach skills online via Chegg, Vedantu, or Unacademy

**Step 4 — Invest & Grow**
• Start SIP in mutual funds with just ₹500/month
• Use Groww or Zerodha apps for easy investing

💡 Tip: Consistency beats perfection. Start small, stay consistent!`,
    hindi: `💰 **पैसे कमाने के टिप्स — ऑनलाइन पैसे कैसे कमाएं**

यहाँ पैसे कमाने के सिद्ध तरीके हैं:

**चरण 1 — फ्रीलांसिंग शुरू करें**
• Fiverr, Upwork या Freelancer.com पर रजिस्टर करें
• लेखन, डिज़ाइन, कोडिंग या डेटा एंट्री जैसी स्किल्स ऑफर करें
• पहले कम रेट में काम करें, फिर बढ़ाएं

**चरण 2 — पैसिव इनकम बनाएं**
• YouTube चैनल या ब्लॉग शुरू करें
• AdSense, एफिलिएट लिंक से कमाई करें
• eBook, टेम्पलेट, स्टॉक फोटो बेचें

**चरण 3 — साइड बिज़नेस**
• Amazon, Meesho या OLX पर सामान बेचें
• Swiggy/Zomato या Ola/Uber पार्टनर बनें
• Vedantu या Unacademy पर ऑनलाइन पढ़ाएं

**चरण 4 — निवेश करें और बढ़ाएं**
• ₹500/माह से SIP में निवेश शुरू करें
• Groww या Zerodha ऐप इस्तेमाल करें

💡 टिप: छोटे से शुरू करें, लेकिन नियमित रहें!`,
  },
  {
    keywords: [
      "tech",
      "technology",
      "smartphone",
      "phone",
      "app",
      "internet",
      "cyber",
      "computer",
      "software",
      "digital",
      "security",
      "wifi",
      "laptop",
    ],
    hindiKeywords: [
      "टेक",
      "तकनीक",
      "स्मार्टफोन",
      "फोन",
      "ऐप",
      "इंटरनेट",
      "साइबर",
      "कंप्यूटर",
      "सॉफ्टवेयर",
      "डिजिटल",
      "सुरक्षा",
      "वाईफाई",
      "लैपटॉप",
    ],
    english: `💻 **Tech Help — Useful Tech Tips for Everyone**

**Step 1 — Smartphone Basics**
• Update your phone regularly for security patches
• Use Google Files to free up storage space
• Enable two-factor authentication (2FA) on all accounts

**Step 2 — Must-Have Apps**
• 📖 Learning: YouTube, Khan Academy, Duolingo
• 💳 Payments: GPay, PhonePe, Paytm
• 🔒 Security: Google Authenticator, Bitwarden (password manager)
• 📁 Work: Google Drive, Canva, Microsoft Office

**Step 3 — Internet Safety Tips**
• Never share OTP or password with anyone
• Use strong, unique passwords for each account
• Avoid public WiFi for banking or sensitive tasks
• Watch out for phishing emails and fake websites

**Step 4 — Free Learning Resources**
• Google Digital Garage — free digital skills course
• YouTube tutorials in Hindi for any tech topic
• Coursera & edX — free audit options available

💡 Tip: Keep your software updated — it's your best security!`,
    hindi: `💻 **टेक मदद — सभी के लिए उपयोगी टेक टिप्स**

**चरण 1 — स्मार्टफोन बेसिक्स**
• फोन को नियमित रूप से अपडेट रखें
• Google Files से स्टोरेज खाली करें
• सभी अकाउंट पर Two-Factor Authentication (2FA) लगाएं

**चरण 2 — जरूरी ऐप्स**
• 📖 सीखने के लिए: YouTube, Khan Academy, Duolingo
• 💳 पेमेंट: GPay, PhonePe, Paytm
• 🔒 सुरक्षा: Google Authenticator, Bitwarden
• 📁 काम: Google Drive, Canva, Microsoft Office

**चरण 3 — इंटरनेट सुरक्षा टिप्स**
• कभी भी OTP या पासवर्ड किसी को न बताएं
• हर अकाउंट के लिए अलग और मजबूत पासवर्ड रखें
• बैंकिंग के लिए पब्लिक WiFi से बचें
• फिशिंग ईमेल और नकली वेबसाइट से सावधान रहें

**चरण 4 — मुफ्त सीखने के संसाधन**
• Google Digital Garage — मुफ्त डिजिटल स्किल्स कोर्स
• YouTube पर हिंदी में कोई भी टेक टॉपिक सीखें

💡 टिप: सॉफ्टवेयर अपडेट रखना सबसे अच्छी सुरक्षा है!`,
  },
  {
    keywords: [
      "business",
      "startup",
      "entrepreneur",
      "idea",
      "investment",
      "invest",
      "small business",
      "shop",
      "store",
      "sell",
      "product",
      "service",
    ],
    hindiKeywords: [
      "बिज़नेस",
      "स्टार्टअप",
      "उद्यमी",
      "आइडिया",
      "निवेश",
      "छोटा",
      "दुकान",
      "बेचना",
      "प्रोडक्ट",
      "सर्विस",
      "व्यापार",
      "व्यवसाय",
    ],
    english: `🏢 **Business Ideas — Start Your Own Venture**

**Step 1 — Low-Investment Business Ideas**
• 🎨 Handmade products: candles, soaps, jewellery — sell on Etsy or Instagram
• 🍱 Tiffin/food delivery service from home
• 📸 Photography or videography services
• ✂️ Tailoring, stitching, or alterations
• 🖨️ Print-on-demand: T-shirts, mugs via Printful

**Step 2 — Online Business Ideas**
• Start a dropshipping store (no inventory needed)
• Create and sell online courses on Udemy or Teachable
• Start a social media marketing agency (SMMA)
• Build a niche blog or YouTube channel

**Step 3 — Startup Tips**
• Validate your idea — talk to 10 potential customers first
• Start lean: MVP (Minimum Viable Product) before big investment
• Use free tools: Canva for design, Google Workspace for operations
• Register your business on Udyam portal for government support

**Step 4 — Funding Options**
• MUDRA Loan — up to ₹10 lakh for small businesses
• PM SVANidhi — for street vendors
• Angel investors and startup incubators for tech startups

💡 Tip: Solve a real problem for real people — that's the best business idea!`,
    hindi: `🏢 **बिज़नेस आइडिया — अपना व्यवसाय शुरू करें**

**चरण 1 — कम निवेश के बिज़नेस आइडिया**
• 🎨 हस्तनिर्मित उत्पाद: मोमबत्तियाँ, साबुन, जेवर — Etsy/Instagram पर बेचें
• 🍱 घर से टिफिन/खाना डिलीवरी सेवा
• 📸 फोटोग्राफी या वीडियोग्राफी सेवाएं
• ✂️ सिलाई-कढ़ाई या कपड़े की मरम्मत
• 🖨️ T-shirt, मग पर प्रिंटिंग सेवा

**चरण 2 — ऑनलाइन बिज़नेस आइडिया**
• Dropshipping स्टोर शुरू करें (स्टॉक की जरूरत नहीं)
• Udemy या Teachable पर ऑनलाइन कोर्स बनाएं और बेचें
• सोशल मीडिया मार्केटिंग एजेंसी शुरू करें
• नीश ब्लॉग या YouTube चैनल बनाएं

**चरण 3 — स्टार्टअप टिप्स**
• पहले 10 संभावित ग्राहकों से बात करके आइडिया वैलिडेट करें
• MVP (Minimum Viable Product) से शुरू करें
• मुफ्त टूल्स का उपयोग करें: Canva, Google Workspace
• Udyam Portal पर बिज़नेस रजिस्टर करें

**चरण 4 — फंडिंग के विकल्प**
• MUDRA Loan — छोटे व्यवसाय के लिए ₹10 लाख तक
• PM SVANidhi — स्ट्रीट वेंडर्स के लिए
• Angel Investors और Startup Incubators

💡 टिप: असली समस्या का समाधान करें — यही सबसे अच्छा बिज़नेस आइडिया है!`,
  },
  {
    keywords: [
      "education",
      "learn",
      "course",
      "study",
      "career",
      "skill",
      "college",
      "degree",
      "job",
      "certificate",
      "scholarship",
      "university",
    ],
    hindiKeywords: [
      "शिक्षा",
      "सीखना",
      "कोर्स",
      "पढ़ाई",
      "करियर",
      "स्किल",
      "कॉलेज",
      "डिग्री",
      "नौकरी",
      "सर्टिफिकेट",
      "छात्रवृत्ति",
      "विश्वविद्यालय",
    ],
    english: `📚 **Education — Free Learning & Career Guidance**

**Step 1 — Free Online Learning Platforms**
• 🎓 Coursera & edX — university courses (audit for free)
• 📹 YouTube — tutorials for any subject in any language
• 🔬 Khan Academy — maths, science, economics (free)
• 💻 freeCodeCamp — web development (completely free)
• 🇮🇳 SWAYAM — Indian government's free MOOC platform

**Step 2 — In-Demand Skills to Learn**
• Web/App Development (HTML, CSS, JavaScript, Python)
• Data Analysis & Excel
• Digital Marketing & SEO
• Graphic Design (Canva, Photoshop)
• English Communication Skills

**Step 3 — Career Guidance**
• Identify your strengths: take free aptitude tests online
• Research job market: LinkedIn, Naukri.com
• Build a portfolio on GitHub or Behance
• Get free certifications from Google, Microsoft, IBM

**Step 4 — Government Schemes for Education**
• PM eVIDYA — free digital education
• National Scholarship Portal for financial assistance
• Skill India & PMKVY for vocational training

💡 Tip: 30 minutes of learning every day adds up to a new skill in a month!`,
    hindi: `📚 **शिक्षा — मुफ्त सीखने और करियर गाइडेंस**

**चरण 1 — मुफ्त ऑनलाइन लर्निंग प्लेटफॉर्म**
• 🎓 Coursera और edX — यूनिवर्सिटी कोर्स (ऑडिट के लिए मुफ्त)
• 📹 YouTube — किसी भी विषय के ट्यूटोरियल हिंदी में
• 🔬 Khan Academy — गणित, विज्ञान, अर्थशास्त्र (मुफ्त)
• 💻 freeCodeCamp — वेब डेवलपमेंट (पूरी तरह मुफ्त)
• 🇮🇳 SWAYAM — भारत सरकार का मुफ्त MOOC प्लेटफॉर्म

**चरण 2 — सबसे ज्यादा मांग वाली स्किल्स**
• वेब/ऐप डेवलपमेंट (HTML, CSS, JavaScript, Python)
• डेटा एनालिसिस और Excel
• डिजिटल मार्केटिंग और SEO
• ग्राफिक डिज़ाइन (Canva, Photoshop)
• अंग्रेजी कम्युनिकेशन स्किल्स

**चरण 3 — करियर गाइडेंस**
• ऑनलाइन एप्टीट्यूड टेस्ट से अपनी ताकत पहचानें
• LinkedIn और Naukri.com पर जॉब मार्केट जानें
• GitHub या Behance पर पोर्टफोलियो बनाएं
• Google, Microsoft, IBM के मुफ्त सर्टिफिकेट पाएं

**चरण 4 — शिक्षा के लिए सरकारी योजनाएं**
• PM eVIDYA — मुफ्त डिजिटल शिक्षा
• National Scholarship Portal — वित्तीय सहायता
• Skill India और PMKVY — व्यावसायिक प्रशिक्षण

💡 टिप: रोज 30 मिनट की पढ़ाई एक महीने में नई स्किल दे सकती है!`,
  },
];

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  text: `Namaste! 🙏 I'm **AI Saathi** (AI साथी), your bilingual assistant!\n\nI can help you with:\n• 💰 Earning Tips — freelancing, passive income & side hustles\n• 💻 Tech Help — smartphone tips, apps & cybersecurity\n• 🏢 Business Ideas — startup tips & low-investment ideas\n• 📚 Education — free courses, career guidance & skills\n\nType in **English or Hindi** — I'll respond in the same language! How can I help you today?`,
  sender: "bot",
  timestamp: new Date(),
};

export function getWelcomeMessage(): Message {
  return { ...WELCOME_MESSAGE, timestamp: new Date() };
}

export function getBotResponse(userText: string): string {
  const lang = detectLanguage(userText);
  const lowerText = userText.toLowerCase();

  for (const entry of responses) {
    const keywordsToCheck =
      lang === "hindi" ? entry.hindiKeywords : entry.keywords;
    const allKeywords = [...entry.keywords, ...entry.hindiKeywords];
    const matchSet = lang === "hindi" ? keywordsToCheck : allKeywords;

    const matched = matchSet.some((kw) => {
      const lowerKw = kw.toLowerCase();
      return lowerText.includes(lowerKw) || userText.includes(kw);
    });

    if (matched) {
      return lang === "hindi" ? entry.hindi : entry.english;
    }
  }

  // Default fallback
  if (lang === "hindi") {
    // biome-ignore lint/style/noUnusedTemplateLiteral: contains \n escapes
    return `मुझे खेद है, मैं इस विषय पर अभी मदद नहीं कर सकता। 🙏\n\nकृपया नीचे दिए गए बटनों में से एक चुनें:\n• 💰 पैसे कमाने के टिप्स\n• 💻 टेक मदद\n• 🏢 बिज़नेस आइडिया\n• 📚 शिक्षा\n\nया कोई और सवाल पूछें — मैं हमेशा मदद के लिए तैयार हूँ!`;
  }
  // biome-ignore lint/style/noUnusedTemplateLiteral: contains \n escapes
  return `I'm not sure about that topic yet! 😊\n\nPlease try one of these topics:\n• 💰 Earning Tips\n• 💻 Tech Help\n• 🏢 Business Ideas\n• 📚 Education\n\nOr ask me anything related to these — I'm here to help!`;
}

export function getTypingDelay(): number {
  return Math.floor(Math.random() * 1000) + 1000; // 1000-2000ms
}

export function createMessage(text: string, sender: "user" | "bot"): Message {
  return {
    id: `${sender}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    text,
    sender,
    timestamp: new Date(),
  };
}
