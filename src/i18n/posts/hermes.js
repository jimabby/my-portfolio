// Per-language content for the "Hermes" blog post.
// English values are byte-identical to the original hard-coded article.
// Proper nouns (Hermes, Claude AI, Gmail, Outlook, IMAP, SMTP, OAuth,
// Electron, AI) are kept untranslated across all languages.

const en = {
  // Listing card
  title: 'Hermes — An AI-Powered Email Client',
  excerpt:
    'A full-featured email client with Claude AI built in. Connect Gmail, Outlook, or any IMAP account and use 9 AI writing modes to compose better emails.',
  date: 'March 2026',
  readTime: '6 min read',

  // Hero
  heroP1Pre:
    "Email hasn't changed much in decades. You still stare at a blank compose window, rewrite the same sentences, and wonder if your tone sounds right. ",
  heroP1Strong: 'Hermes',
  heroP1Post: ' changes that.',
  heroP2:
    'Hermes is a full-featured email client with Claude AI built directly into the writing experience - not bolted on as an afterthought. Connect Gmail, Outlook, or any IMAP account, and let AI handle the hard parts of writing while you stay in control.',

  // Table of contents
  tocMultiAccount: 'Multi-Account & AI Provider',
  tocEmailClient: 'Full Email Client',
  tocAiSummary: 'AI Email Summary',
  tocAiAssist: 'AI Assist - 9 Writing Modes',
  tocAiAssistant: 'AI Assistant',
  tocSmartCategory: 'Smart Categories',
  tocDesktop: 'Desktop & Browser App',
  tocTryIt: 'Try It Yourself',

  // Multi-Account & AI Provider
  multiAccountHeading: 'Multi-Account & AI Provider',
  multiAccountP1:
    'Most people have more than one email address. Hermes handles all of them from a single interface.',
  multiAccountItem1Label: 'Gmail',
  multiAccountItem1Desc: 'connected via OAuth, no password stored',
  multiAccountItem2Label: 'Outlook',
  multiAccountItem2Desc: 'connected via OAuth, no password stored',
  multiAccountItem3Label: 'Any IMAP/SMTP server',
  multiAccountItem3Desc: 'custom mail servers, personal domains, or work accounts',
  multiAccountP2:
    'Beyond email accounts, you can also choose your preferred AI provider. Switch between different AI models to power the writing assistant, summaries, and smart features.',
  multiAccountCaption: 'Connect multiple email accounts and choose your AI provider',
  multiAccountTipTitle: 'Why it matters',
  multiAccountTipText:
    'Switch between accounts instantly without logging in and out. All your inboxes, one app - powered by the AI provider you trust.',

  // Full Email Client
  emailClientHeading: 'Full Email Client',
  emailClientP1:
    "Hermes isn't just an AI wrapper - it's a complete email client. Everything you expect is there.",
  emailClientItem1Label: 'Read',
  emailClientItem1Desc: 'view emails with full formatting support',
  emailClientItem2Label: 'Compose',
  emailClientItem2Desc: 'write new emails from scratch',
  emailClientItem3Label: 'Reply',
  emailClientItem3Desc: 'respond in-thread with full context',
  emailClientItem4Label: 'Forward',
  emailClientItem4Desc: 'pass emails along with your own message',
  emailClientP2:
    "The AI layer sits alongside these features - available when you want it, invisible when you don't.",

  // AI Email Summary
  aiSummaryHeading: 'AI Email Summary',
  aiSummaryP1:
    'Long email threads can be exhausting to read through. Hermes solves this with AI-powered summaries that give you the key points of any email or conversation instantly.',
  aiSummaryP2:
    'Open any email and the AI generates a concise summary of the content - highlighting action items, key decisions, and important details so you can respond faster without reading every word.',
  aiSummaryCaption: 'AI-generated summary of email content',

  // AI Assist
  aiAssistHeading: 'AI Assist - 9 Writing Modes',
  aiAssistP1:
    'This is the core of Hermes. While composing any email, you can activate AI Assist and choose from nine distinct modes, each targeting a different writing problem.',

  aiAssistGroup1Heading: 'Polish & Clarity',
  aiAssistImproveLabel: 'Improve',
  aiAssistImproveDesc:
    'rewrites your draft to be more professional and clear, keeping your original intent intact',
  aiAssistConciseLabel: 'Concise',
  aiAssistConciseDesc:
    "trims the email without losing meaning; ideal when you've written too much",
  aiAssistGrammarLabel: 'Fix Grammar',
  aiAssistGrammarDesc:
    'corrects grammar and spelling while leaving your voice unchanged',

  aiAssistGroup2Heading: 'Tone Adjustment',
  aiAssistFormalLabel: 'Formal',
  aiAssistFormalDesc:
    'rewrites in a professional, formal tone for stakeholders, clients, or executives',
  aiAssistFriendlyLabel: 'Friendly',
  aiAssistFriendlyDesc:
    'adds warmth and approachability, great for teammates or casual contacts',

  aiAssistGroup3Heading: 'Generation',
  aiAssistCompleteLabel: 'Complete',
  aiAssistCompleteDesc:
    'finishes what you started; write the first sentence and let AI continue',
  aiAssistSubjectLabel: 'Subject Ideas',
  aiAssistSubjectDesc:
    'generates subject line options based on your email content',
  aiAssistDraftLabel: 'Draft Reply',
  aiAssistDraftDesc:
    'reads the email you received and writes a fitting response automatically',

  aiAssistGroup4Heading: 'Open-Ended',
  aiAssistCustomLabel: 'Custom',
  aiAssistCustomDesc:
    'type any instruction and the AI follows it. "Make this more urgent." "Remove the last paragraph." "Translate to Spanish." Anything goes.',

  aiAssistCaption: 'The AI Assist panel with all 9 writing modes',
  aiAssistTipTitle: 'Design philosophy',
  aiAssistTipText:
    'Each mode is purpose-built for a real writing problem. Rather than one generic "improve" button, Hermes gives you the right tool for the job.',

  // AI Assistant
  aiAssistantHeading: 'AI Assistant',
  aiAssistantP1:
    'Need to quickly understand an email thread or ask a question about your inbox? Click the AI assistant icon in the corner and a side panel opens up.',
  aiAssistantP2:
    "Ask anything - summarize a conversation, find a specific email, draft a quick response, or get context on a thread you've been CC'd into. The assistant has full context of your emails and responds in real time.",
  aiAssistantCaption: 'The AI assistant panel - ask any question about your emails',

  // Smart Categories
  smartCategoryHeading: 'Smart Categories',
  smartCategoryP1:
    'Hermes uses AI to automatically categorize your incoming emails, so you can focus on what matters most.',
  smartCategoryP2:
    'Instead of manually sorting through your inbox, emails are intelligently grouped by type - promotions, updates, personal messages, and more. No rules to configure, no filters to maintain. The AI handles it.',
  smartCategoryCaption: 'AI-powered smart categorization of emails',

  // Desktop & Browser App
  desktopHeading: 'Desktop & Browser App',
  desktopP1: 'Hermes runs in two modes depending on how you want to use it.',
  desktopItem1Label: 'Electron desktop app',
  desktopItem1Desc:
    'installs as a native app on your machine. Sits in your dock or taskbar, launches instantly, works offline for reading cached emails.',
  desktopItem2Label: 'Browser',
  desktopItem2Desc:
    'run it directly in any browser with no installation required.',
  desktopP2:
    'The same codebase powers both - no features are missing in either mode.',

  // Try It Yourself
  tryItHeading: 'Try It Yourself',
  tryItP1:
    'Hermes is currently available as a private demo. If you want to review the build, discuss the architecture, or see the source, contact me and I can share the right access path.',
  tryItTipTitle: 'Request access',
  tryItTipText:
    'Use the portfolio contact form with "Hermes demo" in your message and I will follow up with details.',
};

const zhHans = {
  title: 'Hermes — 由 AI 驱动的邮件客户端',
  excerpt:
    '一款内置 Claude AI 的全功能邮件客户端。连接 Gmail、Outlook 或任意 IMAP 账户，使用 9 种 AI 写作模式撰写更出色的邮件。',
  date: '2026 年 3 月',
  readTime: '阅读约 6 分钟',

  heroP1Pre:
    '几十年来，电子邮件几乎没有什么变化。你依然要面对空白的撰写窗口，反复重写同样的句子，还要担心自己的语气是否合适。',
  heroP1Strong: 'Hermes',
  heroP1Post: ' 改变了这一切。',
  heroP2:
    'Hermes 是一款全功能的邮件客户端，将 Claude AI 直接融入写作体验之中，而非事后生硬地加装上去。连接 Gmail、Outlook 或任意 IMAP 账户，让 AI 处理写作中最费力的部分，同时一切仍由你掌控。',

  tocMultiAccount: '多账户与 AI 提供方',
  tocEmailClient: '完整的邮件客户端',
  tocAiSummary: 'AI 邮件摘要',
  tocAiAssist: 'AI 助写 - 9 种写作模式',
  tocAiAssistant: 'AI 助手',
  tocSmartCategory: '智能分类',
  tocDesktop: '桌面端与浏览器应用',
  tocTryIt: '亲自体验',

  multiAccountHeading: '多账户与 AI 提供方',
  multiAccountP1:
    '大多数人都不止一个邮箱地址。Hermes 让你在同一个界面中管理所有邮箱。',
  multiAccountItem1Label: 'Gmail',
  multiAccountItem1Desc: '通过 OAuth 连接，不存储密码',
  multiAccountItem2Label: 'Outlook',
  multiAccountItem2Desc: '通过 OAuth 连接，不存储密码',
  multiAccountItem3Label: '任意 IMAP/SMTP 服务器',
  multiAccountItem3Desc: '自定义邮件服务器、个人域名或工作账户',
  multiAccountP2:
    '除了邮箱账户，你还可以选择自己偏好的 AI 提供方。在不同的 AI 模型之间切换，为写作助手、摘要和智能功能提供支持。',
  multiAccountCaption: '连接多个邮箱账户并选择你的 AI 提供方',
  multiAccountTipTitle: '意义所在',
  multiAccountTipText:
    '无需反复登录登出即可瞬间在账户之间切换。所有收件箱，尽在一款应用中，由你信赖的 AI 提供方驱动。',

  emailClientHeading: '完整的邮件客户端',
  emailClientP1:
    'Hermes 不只是一个 AI 外壳，而是一款完整的邮件客户端。你所期待的一切功能，这里都有。',
  emailClientItem1Label: '阅读',
  emailClientItem1Desc: '以完整的格式支持查看邮件',
  emailClientItem2Label: '撰写',
  emailClientItem2Desc: '从零开始撰写新邮件',
  emailClientItem3Label: '回复',
  emailClientItem3Desc: '在原会话中带完整上下文回复',
  emailClientItem4Label: '转发',
  emailClientItem4Desc: '附上你自己的留言转发邮件',
  emailClientP2:
    'AI 层与这些功能并存，需要时随手可用，不需要时则不打扰你。',

  aiSummaryHeading: 'AI 邮件摘要',
  aiSummaryP1:
    '冗长的邮件会话读起来可能令人疲惫。Hermes 通过 AI 驱动的摘要解决了这个问题，让你即刻掌握任何邮件或对话的要点。',
  aiSummaryP2:
    '打开任意邮件，AI 都会生成简洁的内容摘要，突出待办事项、关键决策和重要细节，让你无需逐字阅读即可更快回复。',
  aiSummaryCaption: 'AI 生成的邮件内容摘要',

  aiAssistHeading: 'AI 助写 - 9 种写作模式',
  aiAssistP1:
    '这是 Hermes 的核心。在撰写任意邮件时，你都可以启用 AI 助写，并从九种不同的模式中选择，每一种都针对不同的写作难题。',

  aiAssistGroup1Heading: '润色与清晰',
  aiAssistImproveLabel: '改进',
  aiAssistImproveDesc:
    '重写你的草稿，使其更专业、更清晰，同时保留你的原本意图',
  aiAssistConciseLabel: '精简',
  aiAssistConciseDesc: '在不丢失含义的前提下精简邮件，写得太长时尤为合适',
  aiAssistGrammarLabel: '修正语法',
  aiAssistGrammarDesc: '修正语法和拼写，同时保持你的表达风格不变',

  aiAssistGroup2Heading: '语气调整',
  aiAssistFormalLabel: '正式',
  aiAssistFormalDesc: '以专业、正式的语气重写，适合相关方、客户或高管',
  aiAssistFriendlyLabel: '友好',
  aiAssistFriendlyDesc: '增添温暖与亲和力，非常适合同事或较为随意的联系人',

  aiAssistGroup3Heading: '生成',
  aiAssistCompleteLabel: '续写',
  aiAssistCompleteDesc: '帮你完成已开始的内容；写下第一句，让 AI 继续往下写',
  aiAssistSubjectLabel: '主题建议',
  aiAssistSubjectDesc: '根据你的邮件内容生成主题行备选方案',
  aiAssistDraftLabel: '起草回复',
  aiAssistDraftDesc: '阅读你收到的邮件，并自动撰写一份得体的回复',

  aiAssistGroup4Heading: '开放式',
  aiAssistCustomLabel: '自定义',
  aiAssistCustomDesc:
    '输入任意指令，AI 都会照办。“让语气更紧迫些。”“删掉最后一段。”“翻译成西班牙语。”怎么都行。',

  aiAssistCaption: '包含全部 9 种写作模式的 AI 助写面板',
  aiAssistTipTitle: '设计理念',
  aiAssistTipText:
    '每一种模式都是为真实的写作难题量身打造。Hermes 不是给你一个笼统的“改进”按钮，而是为每项任务提供合适的工具。',

  aiAssistantHeading: 'AI 助手',
  aiAssistantP1:
    '想要快速读懂一段邮件会话，或就收件箱提出问题？点击角落里的 AI 助手图标，侧边面板便会打开。',
  aiAssistantP2:
    '尽管发问——总结一段对话、查找某封特定邮件、快速起草回复，或了解你被抄送进来的会话的来龙去脉。助手掌握你邮件的完整上下文，并实时作出回应。',
  aiAssistantCaption: 'AI 助手面板——就你的邮件提出任何问题',

  smartCategoryHeading: '智能分类',
  smartCategoryP1:
    'Hermes 借助 AI 自动归类你收到的邮件，让你专注于最重要的事情。',
  smartCategoryP2:
    '无需手动整理收件箱，邮件会按类型被智能归组——推广、更新、私人消息等等。无需配置规则，无需维护过滤器，一切交由 AI 处理。',
  smartCategoryCaption: '由 AI 驱动的邮件智能分类',

  desktopHeading: '桌面端与浏览器应用',
  desktopP1: 'Hermes 提供两种运行模式，可根据你的使用方式自由选择。',
  desktopItem1Label: 'Electron 桌面应用',
  desktopItem1Desc:
    '作为原生应用安装到你的设备上。常驻在程序坞或任务栏中，即点即开，离线时也能阅读已缓存的邮件。',
  desktopItem2Label: '浏览器',
  desktopItem2Desc: '直接在任意浏览器中运行，无需安装。',
  desktopP2: '两种模式由同一套代码库驱动——任何模式都不会缺少功能。',

  tryItHeading: '亲自体验',
  tryItP1:
    'Hermes 目前以私密演示的形式提供。如果你想查看构建、探讨架构或查阅源代码，请与我联系，我可以为你提供合适的访问方式。',
  tryItTipTitle: '申请访问',
  tryItTipText:
    '在作品集的联系表单中留言并注明“Hermes demo”，我会跟进并向你提供详情。',
};

const zhHant = {
  title: 'Hermes — 由 AI 驅動的電郵用戶端',
  excerpt:
    '一款內建 Claude AI 的全功能電郵用戶端。連接 Gmail、Outlook 或任意 IMAP 帳戶，使用 9 種 AI 寫作模式撰寫更出色的電郵。',
  date: '2026 年 3 月',
  readTime: '閱讀約 6 分鐘',

  heroP1Pre:
    '數十年來，電子郵件幾乎沒有什麼變化。你依然要面對空白的撰寫視窗，反覆重寫同樣的句子，還要擔心自己的語氣是否合適。',
  heroP1Strong: 'Hermes',
  heroP1Post: ' 改變了這一切。',
  heroP2:
    'Hermes 是一款全功能的電郵用戶端，將 Claude AI 直接融入寫作體驗之中，而非事後生硬地加裝上去。連接 Gmail、Outlook 或任意 IMAP 帳戶，讓 AI 處理寫作中最費力的部分，同時一切仍由你掌控。',

  tocMultiAccount: '多帳戶與 AI 供應方',
  tocEmailClient: '完整的電郵用戶端',
  tocAiSummary: 'AI 電郵摘要',
  tocAiAssist: 'AI 助寫 - 9 種寫作模式',
  tocAiAssistant: 'AI 助手',
  tocSmartCategory: '智慧分類',
  tocDesktop: '桌面端與瀏覽器應用程式',
  tocTryIt: '親自體驗',

  multiAccountHeading: '多帳戶與 AI 供應方',
  multiAccountP1:
    '大多數人都不止一個電郵地址。Hermes 讓你在同一個介面中管理所有電郵。',
  multiAccountItem1Label: 'Gmail',
  multiAccountItem1Desc: '透過 OAuth 連接，不儲存密碼',
  multiAccountItem2Label: 'Outlook',
  multiAccountItem2Desc: '透過 OAuth 連接，不儲存密碼',
  multiAccountItem3Label: '任意 IMAP/SMTP 伺服器',
  multiAccountItem3Desc: '自訂郵件伺服器、個人網域或工作帳戶',
  multiAccountP2:
    '除了電郵帳戶，你還可以選擇自己偏好的 AI 供應方。在不同的 AI 模型之間切換，為寫作助手、摘要和智慧功能提供支援。',
  multiAccountCaption: '連接多個電郵帳戶並選擇你的 AI 供應方',
  multiAccountTipTitle: '意義所在',
  multiAccountTipText:
    '無需反覆登入登出即可瞬間在帳戶之間切換。所有收件匣，盡在一款應用程式中，由你信賴的 AI 供應方驅動。',

  emailClientHeading: '完整的電郵用戶端',
  emailClientP1:
    'Hermes 不只是一個 AI 外殼，而是一款完整的電郵用戶端。你所期待的一切功能，這裡都有。',
  emailClientItem1Label: '閱讀',
  emailClientItem1Desc: '以完整的格式支援檢視電郵',
  emailClientItem2Label: '撰寫',
  emailClientItem2Desc: '從零開始撰寫新電郵',
  emailClientItem3Label: '回覆',
  emailClientItem3Desc: '在原會話中帶完整上下文回覆',
  emailClientItem4Label: '轉寄',
  emailClientItem4Desc: '附上你自己的留言轉寄電郵',
  emailClientP2:
    'AI 層與這些功能並存，需要時隨手可用，不需要時則不打擾你。',

  aiSummaryHeading: 'AI 電郵摘要',
  aiSummaryP1:
    '冗長的電郵會話讀起來可能令人疲憊。Hermes 透過 AI 驅動的摘要解決了這個問題，讓你即刻掌握任何電郵或對話的要點。',
  aiSummaryP2:
    '開啟任意電郵，AI 都會生成簡潔的內容摘要，突出待辦事項、關鍵決策和重要細節，讓你無需逐字閱讀即可更快回覆。',
  aiSummaryCaption: 'AI 生成的電郵內容摘要',

  aiAssistHeading: 'AI 助寫 - 9 種寫作模式',
  aiAssistP1:
    '這是 Hermes 的核心。在撰寫任意電郵時，你都可以啟用 AI 助寫，並從九種不同的模式中選擇，每一種都針對不同的寫作難題。',

  aiAssistGroup1Heading: '潤色與清晰',
  aiAssistImproveLabel: '改進',
  aiAssistImproveDesc:
    '重寫你的草稿，使其更專業、更清晰，同時保留你的原本意圖',
  aiAssistConciseLabel: '精簡',
  aiAssistConciseDesc: '在不丟失含義的前提下精簡電郵，寫得太長時尤為合適',
  aiAssistGrammarLabel: '修正文法',
  aiAssistGrammarDesc: '修正文法和拼寫，同時保持你的表達風格不變',

  aiAssistGroup2Heading: '語氣調整',
  aiAssistFormalLabel: '正式',
  aiAssistFormalDesc: '以專業、正式的語氣重寫，適合相關方、客戶或高層主管',
  aiAssistFriendlyLabel: '友善',
  aiAssistFriendlyDesc: '增添溫暖與親和力，非常適合同事或較為隨意的聯絡人',

  aiAssistGroup3Heading: '生成',
  aiAssistCompleteLabel: '續寫',
  aiAssistCompleteDesc: '幫你完成已開始的內容；寫下第一句，讓 AI 繼續往下寫',
  aiAssistSubjectLabel: '主旨建議',
  aiAssistSubjectDesc: '根據你的電郵內容生成主旨行備選方案',
  aiAssistDraftLabel: '草擬回覆',
  aiAssistDraftDesc: '閱讀你收到的電郵，並自動撰寫一份得體的回覆',

  aiAssistGroup4Heading: '開放式',
  aiAssistCustomLabel: '自訂',
  aiAssistCustomDesc:
    '輸入任意指令，AI 都會照辦。「讓語氣更緊迫些。」「刪掉最後一段。」「翻譯成西班牙文。」怎麼都行。',

  aiAssistCaption: '包含全部 9 種寫作模式的 AI 助寫面板',
  aiAssistTipTitle: '設計理念',
  aiAssistTipText:
    '每一種模式都是為真實的寫作難題量身打造。Hermes 不是給你一個籠統的「改進」按鈕，而是為每項任務提供合適的工具。',

  aiAssistantHeading: 'AI 助手',
  aiAssistantP1:
    '想要快速讀懂一段電郵會話，或就收件匣提出問題？點擊角落裡的 AI 助手圖示，側邊面板便會開啟。',
  aiAssistantP2:
    '儘管發問——總結一段對話、尋找某封特定電郵、快速草擬回覆，或了解你被副本抄送進來的會話的來龍去脈。助手掌握你電郵的完整上下文，並即時作出回應。',
  aiAssistantCaption: 'AI 助手面板——就你的電郵提出任何問題',

  smartCategoryHeading: '智慧分類',
  smartCategoryP1:
    'Hermes 借助 AI 自動歸類你收到的電郵，讓你專注於最重要的事情。',
  smartCategoryP2:
    '無需手動整理收件匣，電郵會按類型被智慧歸組——推廣、更新、私人訊息等等。無需設定規則，無需維護過濾器，一切交由 AI 處理。',
  smartCategoryCaption: '由 AI 驅動的電郵智慧分類',

  desktopHeading: '桌面端與瀏覽器應用程式',
  desktopP1: 'Hermes 提供兩種執行模式，可根據你的使用方式自由選擇。',
  desktopItem1Label: 'Electron 桌面應用程式',
  desktopItem1Desc:
    '作為原生應用程式安裝到你的裝置上。常駐在 Dock 或工作列中，即點即開，離線時也能閱讀已快取的電郵。',
  desktopItem2Label: '瀏覽器',
  desktopItem2Desc: '直接在任意瀏覽器中執行，無需安裝。',
  desktopP2: '兩種模式由同一套程式碼庫驅動——任何模式都不會缺少功能。',

  tryItHeading: '親自體驗',
  tryItP1:
    'Hermes 目前以私密示範的形式提供。如果你想檢視建置、探討架構或查閱原始碼，請與我聯絡，我可以為你提供合適的存取方式。',
  tryItTipTitle: '申請存取',
  tryItTipText:
    '在作品集的聯絡表單中留言並註明「Hermes demo」，我會跟進並向你提供詳情。',
};

const ja = {
  title: 'Hermes — AI を搭載したメールクライアント',
  excerpt:
    'Claude AI を組み込んだ多機能メールクライアント。Gmail、Outlook、または任意の IMAP アカウントを接続し、9 種類の AI ライティングモードでより良いメールを作成できます。',
  date: '2026年3月',
  readTime: '読了時間 6 分',

  heroP1Pre:
    'メールはこの数十年、ほとんど変わっていません。今でも空白の作成画面を前に、同じ文章を何度も書き直し、自分の口調が適切かどうか悩むものです。',
  heroP1Strong: 'Hermes',
  heroP1Post: ' は、それを変えます。',
  heroP2:
    'Hermes は、Claude AI を後付けではなくライティング体験そのものに直接組み込んだ多機能メールクライアントです。Gmail、Outlook、または任意の IMAP アカウントを接続すれば、主導権はあなたが握ったまま、執筆の難しい部分を AI に任せられます。',

  tocMultiAccount: 'マルチアカウントと AI プロバイダー',
  tocEmailClient: '完全なメールクライアント',
  tocAiSummary: 'AI メール要約',
  tocAiAssist: 'AI アシスト - 9 種類のライティングモード',
  tocAiAssistant: 'AI アシスタント',
  tocSmartCategory: 'スマート分類',
  tocDesktop: 'デスクトップ＆ブラウザアプリ',
  tocTryIt: '実際に試す',

  multiAccountHeading: 'マルチアカウントと AI プロバイダー',
  multiAccountP1:
    '多くの人は複数のメールアドレスを持っています。Hermes なら、そのすべてを一つの画面で扱えます。',
  multiAccountItem1Label: 'Gmail',
  multiAccountItem1Desc: 'OAuth 経由で接続し、パスワードは保存しません',
  multiAccountItem2Label: 'Outlook',
  multiAccountItem2Desc: 'OAuth 経由で接続し、パスワードは保存しません',
  multiAccountItem3Label: '任意の IMAP/SMTP サーバー',
  multiAccountItem3Desc: 'カスタムメールサーバー、独自ドメイン、または仕事用アカウント',
  multiAccountP2:
    'メールアカウントに加えて、好みの AI プロバイダーを選ぶこともできます。さまざまな AI モデルを切り替えて、ライティングアシスタント、要約、スマート機能を動かせます。',
  multiAccountCaption: '複数のメールアカウントを接続し、AI プロバイダーを選択',
  multiAccountTipTitle: 'なぜ重要か',
  multiAccountTipText:
    'ログインとログアウトを繰り返すことなく、アカウント間を瞬時に切り替えられます。すべての受信トレイを一つのアプリで——あなたが信頼する AI プロバイダーが支えます。',

  emailClientHeading: '完全なメールクライアント',
  emailClientP1:
    'Hermes は単なる AI のラッパーではなく、完全なメールクライアントです。期待されるすべての機能がそろっています。',
  emailClientItem1Label: '閲覧',
  emailClientItem1Desc: '完全な書式に対応してメールを表示',
  emailClientItem2Label: '作成',
  emailClientItem2Desc: '新しいメールを一から書く',
  emailClientItem3Label: '返信',
  emailClientItem3Desc: 'スレッド内で完全な文脈を保ったまま返信',
  emailClientItem4Label: '転送',
  emailClientItem4Desc: '自分のメッセージを添えてメールを転送',
  emailClientP2:
    'AI レイヤーはこれらの機能と並んで存在します——必要なときに使え、不要なときには姿を見せません。',

  aiSummaryHeading: 'AI メール要約',
  aiSummaryP1:
    '長いメールスレッドを読み通すのは骨が折れます。Hermes は AI による要約でこれを解決し、どんなメールや会話でも要点を瞬時に把握できるようにします。',
  aiSummaryP2:
    'どのメールを開いても、AI が内容の簡潔な要約を生成し、対応すべき項目、重要な決定事項、押さえておくべき詳細を浮き彫りにします。一字一句読まなくても、より早く返信できます。',
  aiSummaryCaption: 'AI が生成したメール内容の要約',

  aiAssistHeading: 'AI アシスト - 9 種類のライティングモード',
  aiAssistP1:
    'これが Hermes の中核です。どのメールを作成中でも AI アシストを起動でき、それぞれ異なる執筆上の課題に対応する 9 種類のモードから選べます。',

  aiAssistGroup1Heading: '推敲と明瞭さ',
  aiAssistImproveLabel: '改善',
  aiAssistImproveDesc:
    '元の意図はそのままに、下書きをより専門的で明快な文章に書き直します',
  aiAssistConciseLabel: '簡潔に',
  aiAssistConciseDesc:
    '意味を損なわずにメールを短く整えます。書きすぎたときに最適です',
  aiAssistGrammarLabel: '文法を修正',
  aiAssistGrammarDesc: 'あなたの語り口はそのままに、文法とスペルを修正します',

  aiAssistGroup2Heading: '口調の調整',
  aiAssistFormalLabel: 'フォーマル',
  aiAssistFormalDesc:
    '関係者、クライアント、経営層向けに、専門的でフォーマルな口調に書き直します',
  aiAssistFriendlyLabel: 'フレンドリー',
  aiAssistFriendlyDesc:
    '温かみと親しみやすさを加えます。同僚や気軽な相手に最適です',

  aiAssistGroup3Heading: '生成',
  aiAssistCompleteLabel: '続きを書く',
  aiAssistCompleteDesc:
    '書き始めた内容を仕上げます。最初の一文を書けば、あとは AI が続けます',
  aiAssistSubjectLabel: '件名のアイデア',
  aiAssistSubjectDesc: 'メールの内容に基づいて件名の候補を生成します',
  aiAssistDraftLabel: '返信を下書き',
  aiAssistDraftDesc: '受け取ったメールを読み取り、ふさわしい返信を自動で作成します',

  aiAssistGroup4Heading: '自由入力',
  aiAssistCustomLabel: 'カスタム',
  aiAssistCustomDesc:
    'どんな指示でも入力すれば AI がそれに従います。「もっと急ぎの口調にして。」「最後の段落を削除して。」「スペイン語に翻訳して。」何でも思いのままです。',

  aiAssistCaption: '9 種類のライティングモードをすべて備えた AI アシストパネル',
  aiAssistTipTitle: '設計思想',
  aiAssistTipText:
    '各モードは、実際の執筆上の課題に合わせて作り込まれています。一つの汎用的な「改善」ボタンではなく、Hermes はその仕事にふさわしい道具を用意します。',

  aiAssistantHeading: 'AI アシスタント',
  aiAssistantP1:
    'メールスレッドをすばやく把握したり、受信トレイについて質問したりしたいときは、隅にある AI アシスタントのアイコンをクリックすると、サイドパネルが開きます。',
  aiAssistantP2:
    '何でも尋ねられます——会話を要約する、特定のメールを探す、手早く返信を下書きする、CC で巻き込まれたスレッドの経緯を把握する。アシスタントはあなたのメールの完全な文脈を把握し、リアルタイムで応答します。',
  aiAssistantCaption: 'AI アシスタントパネル——メールについて何でも質問できます',

  smartCategoryHeading: 'スマート分類',
  smartCategoryP1:
    'Hermes は AI を使って受信メールを自動的に分類し、最も大切なことに集中できるようにします。',
  smartCategoryP2:
    '受信トレイを手作業で仕分けする代わりに、メールは種類ごとにインテリジェントに分類されます——プロモーション、更新通知、個人的なメッセージなど。設定するルールも、維持するフィルターもありません。AI がすべて処理します。',
  smartCategoryCaption: 'AI による賢いメール分類',

  desktopHeading: 'デスクトップ＆ブラウザアプリ',
  desktopP1: 'Hermes は、使い方に応じて 2 つのモードで動作します。',
  desktopItem1Label: 'Electron デスクトップアプリ',
  desktopItem1Desc:
    'ネイティブアプリとしてマシンにインストールされます。Dock やタスクバーに常駐し、瞬時に起動し、オフラインでもキャッシュ済みのメールを読めます。',
  desktopItem2Label: 'ブラウザ',
  desktopItem2Desc: 'インストール不要で、どのブラウザでも直接実行できます。',
  desktopP2:
    '両モードを同じコードベースが支えているため——どちらのモードでも欠ける機能はありません。',

  tryItHeading: '実際に試す',
  tryItP1:
    'Hermes は現在、非公開のデモとして提供しています。ビルドの確認、アーキテクチャの議論、ソースの閲覧をご希望の場合は、ご連絡いただければ適切なアクセス方法をお伝えします。',
  tryItTipTitle: 'アクセスを申請',
  tryItTipText:
    'ポートフォリオのお問い合わせフォームにメッセージとして「Hermes demo」とご記入ください。追って詳細をご連絡します。',
};

export default { en, 'zh-Hans': zhHans, 'zh-Hant': zhHant, ja };
