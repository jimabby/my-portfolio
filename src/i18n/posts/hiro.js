// Per-language content for the "Hiro - The AI Job Application Agent" post.
// Proper nouns (Hiro, Seek, Indeed, LinkedIn, AI, DOCX, CSV, Gmail, etc.)
// stay untranslated; surrounding prose is translated.

const en = {
  title: 'Hiro — The AI Job Application Agent',
  excerpt:
    'An AI desktop agent that scrapes Seek, Indeed, and LinkedIn on a schedule, scores every job against your resume, tailors your application, and submits — all while you sleep.',
  date: 'March 2026',
  readTime: '8 min read',

  // Hero
  heroPara1Pre:
    'Job hunting is a second job. You refresh listings, copy-paste your resume, rewrite cover letters for each posting, and still end up sending the same generic application as everyone else. ',
  heroPara1Post: ' does it for you - automatically.',
  heroPara2:
    'Hiro is an AI-powered desktop agent that scrapes Seek, Indeed, and LinkedIn on a configurable schedule, scores each job against your resume, tailors your application to the specific role, and submits - all overnight. You wake up to a dashboard of applications already sent.',

  // TOC
  tocProblem: 'The Problem with Job Hunting',
  tocScraping: 'Multi-Platform Scraping',
  tocAiScoring: 'AI Match Scoring',
  tocTailoring: 'Resume & Cover Letter Tailoring',
  tocAutoApply: 'Auto-Apply',
  tocDashboard: 'Dashboard',
  tocJobDetail: 'Job Detail Panel',
  tocAnalytics: 'Analytics & Timeline',
  tocScheduling: 'Scheduling & Follow-ups',
  tocTryIt: 'Try It Yourself',

  // Problem
  problemHeading: 'The Problem with Job Hunting',
  problemPara1:
    "The average job search involves hundreds of applications. Each one requires the same manual loop: find the listing, read the description, tweak your resume, write a cover letter, fill in the same fields you've filled a hundred times before, submit, and wait.",
  problemPara2:
    'Most of that loop is automatable. The only part that actually needs your judgement is deciding whether a job is worth your time - and even that can be assisted with AI scoring. Hiro automates everything else so you can focus on what matters: preparing for the interviews you actually want.',
  problemTipTitle: 'What Hiro is not',
  problemTipText:
    "Hiro doesn't spam applications blindly. Every submission is scored, tailored, and filtered against your configured preferences - so what gets sent represents you accurately.",

  // Scraping
  scrapingHeading: 'Multi-Platform Scraping',
  scrapingPara1:
    'Hiro watches three of the largest job boards simultaneously. Each platform has its own login flow, pagination logic, and listing format - Hiro handles all of it.',
  scrapingSeekLabel: 'Seek',
  scrapingSeekDesc:
    ' - full listing scrape with title, company, salary range, location, and full job description',
  scrapingIndeedLabel: 'Indeed',
  scrapingIndeedDesc:
    ' - same depth of extraction, including sponsored and organic listings',
  scrapingLinkedInLabel: 'LinkedIn',
  scrapingLinkedInDesc:
    ' - stealth session login to access Easy Apply listings that require authentication',
  scrapingPara2:
    'Cross-platform duplicate detection ensures you never apply to the same job twice, even if the same listing appears on multiple boards.',

  // AI Scoring
  aiScoringHeading: 'AI Match Scoring',
  aiScoringPara1:
    'Every scraped job gets scored against your resume before anything else happens. The AI reads both documents and returns a match percentage (0-100%) alongside a one-sentence explanation of why the score landed where it did.',
  aiScoringSubheading: 'What the score considers',
  aiScoringItem1: 'Skills and technologies listed in both the job and your resume',
  aiScoringItem2: 'Years of experience requirements vs your history',
  aiScoringItem3: 'Seniority level and role title alignment',
  aiScoringItem4: 'Industry and domain overlap',
  aiScoringPara2:
    "Jobs that score below your configured threshold are skipped entirely. You set the bar - Hiro respects it. This keeps your application quality high and avoids wasting recruiter time on roles that aren't a fit.",
  aiScoringTipTitle: 'Keyword Gap',
  aiScoringTipText:
    "The Job Detail panel shows exactly which skills from the job description are present or missing in your resume - so you can see at a glance what's dragging a score down.",

  // Tailoring
  tailoringHeading: 'Resume & Cover Letter Tailoring',
  tailoringPara1:
    'A generic resume sent to every job is one of the fastest ways to get filtered out. Hiro tailors your resume and cover letter to each specific job description - without changing facts.',
  tailoringResumeSubheading: 'Resume tailoring',
  tailoringResumePara:
    "The AI reorders and rewrites your bullet points to emphasise the experience most relevant to each role. Your actual experience doesn't change - the framing does. The tailored resume is available to download as a DOCX from the Job Detail panel.",
  tailoringCoverSubheading: 'Cover letter generation',
  tailoringCoverPara:
    'Hiro writes a tailored cover letter for each application. You can configure the tone globally in Settings:',
  tailoringToneProfLabel: 'Professional',
  tailoringToneProfDesc: ' - formal, structured, to the point',
  tailoringToneCasualLabel: 'Casual & Warm',
  tailoringToneCasualDesc: ' - conversational, approachable',
  tailoringToneConfidentLabel: 'Confident & Direct',
  tailoringToneConfidentDesc: ' - assertive, high-agency',
  tailoringCoverPara2:
    'You can also provide an optional cover letter template - a structural skeleton the AI fills in, so the output always matches your preferred format.',
  tailoringScreeningSubheading: 'Screening Q&A',
  tailoringScreeningPara:
    'Many applications include screening questions like "Why do you want to work here?" or "Describe a time you led a project." Hiro answers these with AI using context from your resume and the job description. Answers are cached and reused for similar questions, so repeated applications get faster over time.',

  // Auto-Apply
  autoApplyHeading: 'Auto-Apply',
  autoApplyPara1:
    'Once a job passes the score threshold and the materials are tailored, Hiro submits the application automatically. Supported application types:',
  autoApplySeekLabel: 'Seek Quick Apply',
  autoApplySeekDesc:
    ' - fills and submits the Quick Apply form including skill checkboxes and salary fields',
  autoApplyLinkedInLabel: 'LinkedIn Easy Apply',
  autoApplyLinkedInDesc:
    ' - completes multi-step Easy Apply flows, including screening questions',
  autoApplyIndeedLabel: 'Indeed',
  autoApplyIndeedDesc: " - handles Indeed's native application flow",
  autoApplyPara2:
    'For Seek, Hiro also automatically checks the tech stack checkboxes that match your resume, and fills the salary expectation field from your configured minimum.',

  // Dashboard
  dashboardHeading: 'Dashboard',
  dashboardPara1:
    "The dashboard is where you track everything Hiro has sent on your behalf. It's built to be navigable with just a keyboard.",
  dashboardStatsSubheading: 'Stats bar',
  dashboardStatsPara:
    'At a glance: applications sent today, this week, all time, number of interviews, and your overall response rate.',
  dashboardTableSubheading: 'Application table',
  dashboardTableItem1: 'Filter by status - Applied, Interview, Rejected, No Response',
  dashboardTableItem2: 'Filter by platform - Seek, Indeed, LinkedIn',
  dashboardTableItem3Pre: 'Live search by job title or company (press ',
  dashboardTableItem3Post: ' to focus)',
  dashboardTableItem4Post: ' keyboard navigation between rows',
  dashboardTableItem5Post: ' to close the detail panel',
  dashboardTableItem6: 'Inline comments - add notes to any application in the table',
  dashboardTableItem7: 'Export CSV - downloads all applications respecting active filters',

  // Job Detail
  jobDetailHeading: 'Job Detail Panel',
  jobDetailPara1:
    'Click any row to open the Job Detail panel - a full-width side panel showing everything about that application.',
  jobDetailMatchLabel: 'Match explanation',
  jobDetailMatchDesc:
    ' - the one-sentence AI summary of why the job scored the way it did',
  jobDetailKeywordLabel: 'Keyword Gap',
  jobDetailKeywordDesc:
    ' - side-by-side view of skills present and missing in your resume vs the job description',
  jobDetailInterviewLabel: 'Interview Questions',
  jobDetailInterviewDesc:
    ' - for jobs in "Interview" status, generate 8 likely interview questions tailored to the role',
  jobDetailResumeLabel: 'Full tailored resume',
  jobDetailResumeDesc:
    ' - download the resume Hiro used for this specific application as a DOCX',
  jobDetailScreeningLabel: 'Screening Q&A',
  jobDetailScreeningDesc:
    ' - view the AI-generated answers to application questions',
  jobDetailBlacklistLabel: 'Blacklist Company',
  jobDetailBlacklistDesc:
    ' - one click to exclude this company from all future scans permanently',
  jobDetailTipTitle: 'Interview prep built in',
  jobDetailTipText:
    'When a job moves to "Interview" status, Hiro generates 8 likely questions based on the job description and your resume - so you can walk in knowing what they\'re likely to ask.',

  // Analytics
  analyticsHeading: 'Analytics & Timeline',
  analyticsPara1:
    'Two dedicated pages give you a different lens on your job search activity.',
  analyticsPageSubheading: 'Analytics page',
  analyticsItem1: 'SVG bar chart of applications over the last 7 days',
  analyticsItem2:
    'Platform donut chart - how your applications split across Seek, Indeed, LinkedIn',
  analyticsItem3: 'By-status breakdown - Applied, Interview, Rejected, No Response',
  analyticsItem4: 'Response rate over time',
  analyticsTimelineSubheading: 'Timeline page',
  analyticsTimelinePara:
    'Every application grouped by day and platform in a collapsible day-by-day history. Useful for reconstructing the story of your job search and spotting patterns - which days generated the most responses, which platforms perform best.',

  // Scheduling
  schedulingHeading: 'Scheduling & Follow-ups',
  schedulingPara1:
    'Hiro runs on your schedule, not the other way around. Set a daily scan time in Settings and it runs Monday-Friday at that time automatically - no need to open the app.',
  schedulingFollowupSubheading: 'Auto follow-up emails',
  schedulingFollowupPara:
    'After a configurable number of days with no response, Hiro drafts and sends a follow-up email on your behalf. Toggle this on or off in Settings and set the day threshold that triggers it.',
  schedulingReportSubheading: 'Daily email report',
  schedulingReportPara:
    'At 6pm each day, Hiro sends a summary of everything it applied to that day directly to your Gmail - job titles, companies, platforms, and match scores. You stay informed without having to open the app.',
  schedulingTipTitle: 'Set it and forget it',
  schedulingTipText:
    'Configure Hiro once on a Sunday, go to work on Monday, and receive a 6pm summary of what it applied to while you were living your life.',

  // Try It
  tryItHeading: 'Try It Yourself',
  tryItPara1:
    'Hiro is currently in development. Links will be posted here once available.',
  tryItTipTitle: 'Coming soon',
  tryItTipText:
    'Project links, demo, and source code will be added here shortly.',
};

const zhHans = {
  title: 'Hiro — AI 求职申请代理',
  excerpt:
    '一款 AI 桌面代理，按计划自动抓取 Seek、Indeed 和 LinkedIn 的职位，对照你的简历为每个职位打分，量身定制申请材料并自动投递——这一切都在你睡觉时完成。',
  date: '2026 年 3 月',
  readTime: '8 分钟阅读',

  heroPara1Pre:
    '找工作就是另一份全职工作。你不停刷新职位列表、复制粘贴简历、为每个职位重写求职信，最后却和其他人一样投出千篇一律的申请。',
  heroPara1Post: ' 会替你自动完成这一切。',
  heroPara2:
    'Hiro 是一款 AI 驱动的桌面代理，按照可配置的计划抓取 Seek、Indeed 和 LinkedIn 的职位，对照你的简历为每个职位打分，针对具体岗位量身定制申请材料并投递——全程在夜间完成。你醒来时，就能看到一个已投递申请的仪表盘。',

  tocProblem: '求职的痛点',
  tocScraping: '多平台抓取',
  tocAiScoring: 'AI 匹配评分',
  tocTailoring: '简历与求职信定制',
  tocAutoApply: '自动投递',
  tocDashboard: '仪表盘',
  tocJobDetail: '职位详情面板',
  tocAnalytics: '分析与时间线',
  tocScheduling: '排程与跟进',
  tocTryIt: '亲自体验',

  problemHeading: '求职的痛点',
  problemPara1:
    '一次普通的求职往往涉及数百份申请。每一份都需要重复同样的手动流程：找到职位、阅读职位描述、调整简历、撰写求职信、填写那些已经填过上百遍的字段、提交，然后等待。',
  problemPara2:
    '这个流程的大部分都可以自动化。真正需要你判断的，只是决定一个职位是否值得你花时间——而即便这一步，也可以借助 AI 评分来辅助。Hiro 自动处理其余的一切，让你能专注于真正重要的事情：为那些你真心想要的面试做准备。',
  problemTipTitle: 'Hiro 不是什么',
  problemTipText:
    'Hiro 不会盲目地海投申请。每一次投递都经过评分、定制，并根据你设定的偏好进行筛选——确保投出的内容能准确地代表你。',

  scrapingHeading: '多平台抓取',
  scrapingPara1:
    'Hiro 同时监控三大主流招聘网站。每个平台都有各自的登录流程、分页逻辑和职位格式——Hiro 全部都能处理。',
  scrapingSeekLabel: 'Seek',
  scrapingSeekDesc:
    '——完整抓取职位列表，包括职位名称、公司、薪资范围、地点和完整的职位描述',
  scrapingIndeedLabel: 'Indeed',
  scrapingIndeedDesc: '——同样深度的信息提取，涵盖赞助职位和自然搜索职位',
  scrapingLinkedInLabel: 'LinkedIn',
  scrapingLinkedInDesc:
    '——通过隐身会话登录，访问需要身份验证的 Easy Apply 职位',
  scrapingPara2:
    '跨平台去重检测确保你不会重复申请同一个职位，即使同一条职位同时出现在多个网站上。',

  aiScoringHeading: 'AI 匹配评分',
  aiScoringPara1:
    '每一个抓取到的职位在进入后续流程之前，都会先对照你的简历进行评分。AI 会同时阅读两份文档，给出匹配百分比（0-100%），并附上一句话说明该分数为何如此。',
  aiScoringSubheading: '评分考量的因素',
  aiScoringItem1: '职位与你简历中同时出现的技能和技术',
  aiScoringItem2: '所需工作年限与你的履历对比',
  aiScoringItem3: '资历级别与职位头衔的契合度',
  aiScoringItem4: '行业与领域的重合度',
  aiScoringPara2:
    '低于你设定阈值的职位会被直接跳过。标准由你来定——Hiro 会尊重它。这能保持你的申请质量，避免在不匹配的职位上浪费招聘方的时间。',
  aiScoringTipTitle: 'Keyword Gap（关键词差距）',
  aiScoringTipText:
    '职位详情面板会清晰地展示职位描述中的哪些技能在你简历里已有、哪些缺失——让你一眼看出是什么在拉低分数。',

  tailoringHeading: '简历与求职信定制',
  tailoringPara1:
    '对每个职位都投同一份通用简历，是最容易被筛掉的方式之一。Hiro 会针对每一份具体的职位描述定制你的简历和求职信——但不会篡改事实。',
  tailoringResumeSubheading: '简历定制',
  tailoringResumePara:
    'AI 会重新排序并改写你的要点，突出与每个岗位最相关的经历。你真实的经历不会改变——改变的是呈现方式。定制后的简历可在职位详情面板中以 DOCX 格式下载。',
  tailoringCoverSubheading: '求职信生成',
  tailoringCoverPara:
    'Hiro 会为每份申请撰写一封量身定制的求职信。你可以在设置中全局配置语气：',
  tailoringToneProfLabel: 'Professional（专业）',
  tailoringToneProfDesc: '——正式、有条理、直奔主题',
  tailoringToneCasualLabel: 'Casual & Warm（轻松亲切）',
  tailoringToneCasualDesc: '——口语化、平易近人',
  tailoringToneConfidentLabel: 'Confident & Direct（自信直接）',
  tailoringToneConfidentDesc: '——果断、主动性强',
  tailoringCoverPara2:
    '你还可以提供一个可选的求职信模板——一个结构骨架，由 AI 填充内容，让输出始终符合你偏好的格式。',
  tailoringScreeningSubheading: '筛选问答',
  tailoringScreeningPara:
    '许多申请会包含筛选问题，比如“你为什么想来这里工作？”或“描述一次你带领项目的经历。”Hiro 会借助 AI，结合你简历和职位描述中的上下文来回答这些问题。答案会被缓存并在类似问题上复用，因此重复申请会越来越快。',

  autoApplyHeading: '自动投递',
  autoApplyPara1:
    '一旦某个职位通过评分阈值且材料已定制完成，Hiro 就会自动提交申请。支持的申请类型：',
  autoApplySeekLabel: 'Seek Quick Apply',
  autoApplySeekDesc: '——填写并提交 Quick Apply 表单，包括技能勾选框和薪资字段',
  autoApplyLinkedInLabel: 'LinkedIn Easy Apply',
  autoApplyLinkedInDesc: '——完成多步骤的 Easy Apply 流程，包括筛选问题',
  autoApplyIndeedLabel: 'Indeed',
  autoApplyIndeedDesc: '——处理 Indeed 的原生申请流程',
  autoApplyPara2:
    '对于 Seek，Hiro 还会自动勾选与你简历匹配的技术栈选项，并根据你设定的最低值填写期望薪资字段。',

  dashboardHeading: '仪表盘',
  dashboardPara1:
    '仪表盘是你追踪 Hiro 代你投出的所有申请的地方。它的设计支持仅用键盘即可操作。',
  dashboardStatsSubheading: '统计栏',
  dashboardStatsPara:
    '一目了然：今日、本周、累计投递的申请数量、面试数量，以及你的整体回复率。',
  dashboardTableSubheading: '申请表格',
  dashboardTableItem1: '按状态筛选——已申请、面试、被拒、无回复',
  dashboardTableItem2: '按平台筛选——Seek、Indeed、LinkedIn',
  dashboardTableItem3Pre: '按职位名称或公司实时搜索（按 ',
  dashboardTableItem3Post: ' 聚焦）',
  dashboardTableItem4Post: ' 键盘上下行导航',
  dashboardTableItem5Post: ' 关闭详情面板',
  dashboardTableItem6: '内联评论——可为表格中任意申请添加备注',
  dashboardTableItem7: '导出 CSV——按当前生效的筛选条件下载所有申请',

  jobDetailHeading: '职位详情面板',
  jobDetailPara1:
    '点击任意一行即可打开职位详情面板——一个全宽侧边面板，展示该申请的所有信息。',
  jobDetailMatchLabel: 'Match explanation（匹配说明）',
  jobDetailMatchDesc: '——一句话的 AI 摘要，说明该职位为何获得这样的分数',
  jobDetailKeywordLabel: 'Keyword Gap（关键词差距）',
  jobDetailKeywordDesc: '——并排展示你简历相对职位描述已具备和缺失的技能',
  jobDetailInterviewLabel: 'Interview Questions（面试问题）',
  jobDetailInterviewDesc:
    '——对于处于“面试”状态的职位，生成 8 个针对该岗位定制的可能面试问题',
  jobDetailResumeLabel: '完整定制简历',
  jobDetailResumeDesc:
    '——以 DOCX 格式下载 Hiro 为此特定申请使用的简历',
  jobDetailScreeningLabel: 'Screening Q&A（筛选问答）',
  jobDetailScreeningDesc: '——查看 AI 生成的申请问题答案',
  jobDetailBlacklistLabel: 'Blacklist Company（拉黑公司）',
  jobDetailBlacklistDesc: '——一键将该公司永久排除在所有未来扫描之外',
  jobDetailTipTitle: '内置面试准备',
  jobDetailTipText:
    '当某个职位进入“面试”状态时，Hiro 会基于职位描述和你的简历生成 8 个可能的问题——让你走进面试时就知道对方大概会问什么。',

  analyticsHeading: '分析与时间线',
  analyticsPara1: '两个专门的页面，从不同视角呈现你的求职活动。',
  analyticsPageSubheading: '分析页面',
  analyticsItem1: '过去 7 天申请数量的 SVG 柱状图',
  analyticsItem2: '平台环形图——你的申请在 Seek、Indeed、LinkedIn 之间的分布',
  analyticsItem3: '按状态分类——已申请、面试、被拒、无回复',
  analyticsItem4: '回复率随时间的变化',
  analyticsTimelineSubheading: '时间线页面',
  analyticsTimelinePara:
    '所有申请按日期和平台分组，呈现为可折叠的逐日历史记录。这有助于还原你求职过程的脉络，发现规律——哪些日子带来最多回复，哪些平台表现最佳。',

  schedulingHeading: '排程与跟进',
  schedulingPara1:
    'Hiro 按你的时间表运行，而不是反过来。在设置中设定每日扫描时间，它就会在周一至周五的那个时间自动运行——无需打开应用。',
  schedulingFollowupSubheading: '自动跟进邮件',
  schedulingFollowupPara:
    '在设定的天数内没有收到回复后，Hiro 会代你起草并发送一封跟进邮件。你可以在设置中开启或关闭此功能，并设定触发它的天数阈值。',
  schedulingReportSubheading: '每日邮件报告',
  schedulingReportPara:
    '每天下午 6 点，Hiro 会将当天投递的所有内容汇总后直接发送到你的 Gmail——包括职位名称、公司、平台和匹配分数。无需打开应用，你也能随时掌握进展。',
  schedulingTipTitle: '设好就不用再管',
  schedulingTipText:
    '在某个周日把 Hiro 配置好，周一照常去上班，下午 6 点就能收到一份它在你过自己生活时投递了哪些职位的汇总。',

  tryItHeading: '亲自体验',
  tryItPara1: 'Hiro 目前正在开发中。相关链接将在可用后发布在这里。',
  tryItTipTitle: '敬请期待',
  tryItTipText: '项目链接、演示和源代码将很快添加到这里。',
};

const zhHant = {
  title: 'Hiro — AI 求職申請代理',
  excerpt:
    '一款 AI 桌面代理，按計劃自動抓取 Seek、Indeed 和 LinkedIn 的職缺，對照你的履歷為每個職缺評分，量身打造申請資料並自動投遞——這一切都在你睡覺時完成。',
  date: '2026 年 3 月',
  readTime: '8 分鐘閱讀',

  heroPara1Pre:
    '找工作就是另一份全職工作。你不停重新整理職缺列表、複製貼上履歷、為每個職缺重寫求職信，最後卻和其他人一樣投出千篇一律的申請。',
  heroPara1Post: ' 會替你自動完成這一切。',
  heroPara2:
    'Hiro 是一款 AI 驅動的桌面代理，依照可設定的排程抓取 Seek、Indeed 和 LinkedIn 的職缺，對照你的履歷為每個職缺評分，針對具體職位量身打造申請資料並投遞——全程在夜間完成。你醒來時，就能看到一個已投遞申請的儀表板。',

  tocProblem: '求職的痛點',
  tocScraping: '多平台抓取',
  tocAiScoring: 'AI 匹配評分',
  tocTailoring: '履歷與求職信客製化',
  tocAutoApply: '自動投遞',
  tocDashboard: '儀表板',
  tocJobDetail: '職缺詳情面板',
  tocAnalytics: '分析與時間軸',
  tocScheduling: '排程與追蹤',
  tocTryIt: '親自體驗',

  problemHeading: '求職的痛點',
  problemPara1:
    '一次普通的求職往往涉及數百份申請。每一份都需要重複同樣的手動流程：找到職缺、閱讀職缺描述、調整履歷、撰寫求職信、填寫那些已經填過上百遍的欄位、提交，然後等待。',
  problemPara2:
    '這個流程的大部分都可以自動化。真正需要你判斷的，只是決定一個職缺是否值得你花時間——而即便這一步，也可以借助 AI 評分來輔助。Hiro 自動處理其餘的一切，讓你能專注於真正重要的事情：為那些你真心想要的面試做準備。',
  problemTipTitle: 'Hiro 不是什麼',
  problemTipText:
    'Hiro 不會盲目地海投申請。每一次投遞都經過評分、客製化，並根據你設定的偏好進行篩選——確保投出的內容能準確地代表你。',

  scrapingHeading: '多平台抓取',
  scrapingPara1:
    'Hiro 同時監控三大主流求職網站。每個平台都有各自的登入流程、分頁邏輯和職缺格式——Hiro 全部都能處理。',
  scrapingSeekLabel: 'Seek',
  scrapingSeekDesc:
    '——完整抓取職缺列表，包括職位名稱、公司、薪資範圍、地點和完整的職缺描述',
  scrapingIndeedLabel: 'Indeed',
  scrapingIndeedDesc: '——同樣深度的資訊擷取，涵蓋贊助職缺和自然搜尋職缺',
  scrapingLinkedInLabel: 'LinkedIn',
  scrapingLinkedInDesc:
    '——透過隱身工作階段登入，存取需要身分驗證的 Easy Apply 職缺',
  scrapingPara2:
    '跨平台去重偵測確保你不會重複申請同一個職缺，即使同一筆職缺同時出現在多個網站上。',

  aiScoringHeading: 'AI 匹配評分',
  aiScoringPara1:
    '每一個抓取到的職缺在進入後續流程之前，都會先對照你的履歷進行評分。AI 會同時閱讀兩份文件，給出匹配百分比（0-100%），並附上一句話說明該分數為何如此。',
  aiScoringSubheading: '評分考量的因素',
  aiScoringItem1: '職缺與你履歷中同時出現的技能和技術',
  aiScoringItem2: '所需工作年資與你的經歷對比',
  aiScoringItem3: '資歷等級與職位頭銜的契合度',
  aiScoringItem4: '產業與領域的重疊度',
  aiScoringPara2:
    '低於你設定門檻的職缺會被直接略過。標準由你來定——Hiro 會尊重它。這能維持你的申請品質，避免在不匹配的職缺上浪費招募方的時間。',
  aiScoringTipTitle: 'Keyword Gap（關鍵字差距）',
  aiScoringTipText:
    '職缺詳情面板會清楚地展示職缺描述中的哪些技能在你履歷裡已有、哪些缺失——讓你一眼看出是什麼在拉低分數。',

  tailoringHeading: '履歷與求職信客製化',
  tailoringPara1:
    '對每個職缺都投同一份通用履歷，是最容易被篩掉的方式之一。Hiro 會針對每一份具體的職缺描述客製化你的履歷和求職信——但不會竄改事實。',
  tailoringResumeSubheading: '履歷客製化',
  tailoringResumePara:
    'AI 會重新排序並改寫你的要點，突顯與每個職位最相關的經歷。你真實的經歷不會改變——改變的是呈現方式。客製化後的履歷可在職缺詳情面板中以 DOCX 格式下載。',
  tailoringCoverSubheading: '求職信生成',
  tailoringCoverPara:
    'Hiro 會為每份申請撰寫一封量身打造的求職信。你可以在設定中全域設定語氣：',
  tailoringToneProfLabel: 'Professional（專業）',
  tailoringToneProfDesc: '——正式、有條理、直奔主題',
  tailoringToneCasualLabel: 'Casual & Warm（輕鬆親切）',
  tailoringToneCasualDesc: '——口語化、平易近人',
  tailoringToneConfidentLabel: 'Confident & Direct（自信直接）',
  tailoringToneConfidentDesc: '——果斷、主動性強',
  tailoringCoverPara2:
    '你還可以提供一個可選的求職信範本——一個結構骨架，由 AI 填充內容，讓輸出始終符合你偏好的格式。',
  tailoringScreeningSubheading: '篩選問答',
  tailoringScreeningPara:
    '許多申請會包含篩選問題，比如「你為什麼想來這裡工作？」或「描述一次你帶領專案的經歷。」Hiro 會借助 AI，結合你履歷和職缺描述中的上下文來回答這些問題。答案會被快取並在類似問題上重複使用，因此重複申請會越來越快。',

  autoApplyHeading: '自動投遞',
  autoApplyPara1:
    '一旦某個職缺通過評分門檻且資料已客製化完成，Hiro 就會自動提交申請。支援的申請類型：',
  autoApplySeekLabel: 'Seek Quick Apply',
  autoApplySeekDesc: '——填寫並提交 Quick Apply 表單，包括技能勾選框和薪資欄位',
  autoApplyLinkedInLabel: 'LinkedIn Easy Apply',
  autoApplyLinkedInDesc: '——完成多步驟的 Easy Apply 流程，包括篩選問題',
  autoApplyIndeedLabel: 'Indeed',
  autoApplyIndeedDesc: '——處理 Indeed 的原生申請流程',
  autoApplyPara2:
    '對於 Seek，Hiro 還會自動勾選與你履歷匹配的技術堆疊選項，並根據你設定的最低值填寫期望薪資欄位。',

  dashboardHeading: '儀表板',
  dashboardPara1:
    '儀表板是你追蹤 Hiro 代你投出的所有申請的地方。它的設計支援僅用鍵盤即可操作。',
  dashboardStatsSubheading: '統計列',
  dashboardStatsPara:
    '一目了然：今日、本週、累計投遞的申請數量、面試數量，以及你的整體回覆率。',
  dashboardTableSubheading: '申請表格',
  dashboardTableItem1: '按狀態篩選——已申請、面試、被拒、無回覆',
  dashboardTableItem2: '按平台篩選——Seek、Indeed、LinkedIn',
  dashboardTableItem3Pre: '按職位名稱或公司即時搜尋（按 ',
  dashboardTableItem3Post: ' 聚焦）',
  dashboardTableItem4Post: ' 鍵盤上下列導覽',
  dashboardTableItem5Post: ' 關閉詳情面板',
  dashboardTableItem6: '內嵌評論——可為表格中任意申請新增備註',
  dashboardTableItem7: '匯出 CSV——按目前生效的篩選條件下載所有申請',

  jobDetailHeading: '職缺詳情面板',
  jobDetailPara1:
    '點擊任意一列即可開啟職缺詳情面板——一個全寬側邊面板，展示該申請的所有資訊。',
  jobDetailMatchLabel: 'Match explanation（匹配說明）',
  jobDetailMatchDesc: '——一句話的 AI 摘要，說明該職缺為何獲得這樣的分數',
  jobDetailKeywordLabel: 'Keyword Gap（關鍵字差距）',
  jobDetailKeywordDesc: '——並排展示你履歷相對職缺描述已具備和缺失的技能',
  jobDetailInterviewLabel: 'Interview Questions（面試問題）',
  jobDetailInterviewDesc:
    '——對於處於「面試」狀態的職缺，生成 8 個針對該職位客製化的可能面試問題',
  jobDetailResumeLabel: '完整客製化履歷',
  jobDetailResumeDesc:
    '——以 DOCX 格式下載 Hiro 為此特定申請使用的履歷',
  jobDetailScreeningLabel: 'Screening Q&A（篩選問答）',
  jobDetailScreeningDesc: '——查看 AI 生成的申請問題答案',
  jobDetailBlacklistLabel: 'Blacklist Company（封鎖公司）',
  jobDetailBlacklistDesc: '——一鍵將該公司永久排除在所有未來掃描之外',
  jobDetailTipTitle: '內建面試準備',
  jobDetailTipText:
    '當某個職缺進入「面試」狀態時，Hiro 會根據職缺描述和你的履歷生成 8 個可能的問題——讓你走進面試時就知道對方大概會問什麼。',

  analyticsHeading: '分析與時間軸',
  analyticsPara1: '兩個專門的頁面，從不同視角呈現你的求職活動。',
  analyticsPageSubheading: '分析頁面',
  analyticsItem1: '過去 7 天申請數量的 SVG 長條圖',
  analyticsItem2: '平台環圈圖——你的申請在 Seek、Indeed、LinkedIn 之間的分佈',
  analyticsItem3: '按狀態分類——已申請、面試、被拒、無回覆',
  analyticsItem4: '回覆率隨時間的變化',
  analyticsTimelineSubheading: '時間軸頁面',
  analyticsTimelinePara:
    '所有申請按日期和平台分組，呈現為可摺疊的逐日歷史記錄。這有助於還原你求職過程的脈絡，發現規律——哪些日子帶來最多回覆，哪些平台表現最佳。',

  schedulingHeading: '排程與追蹤',
  schedulingPara1:
    'Hiro 按你的時間表運行，而不是反過來。在設定中設定每日掃描時間，它就會在週一至週五的那個時間自動執行——無需開啟應用程式。',
  schedulingFollowupSubheading: '自動追蹤郵件',
  schedulingFollowupPara:
    '在設定的天數內沒有收到回覆後，Hiro 會代你草擬並寄送一封追蹤郵件。你可以在設定中開啟或關閉此功能，並設定觸發它的天數門檻。',
  schedulingReportSubheading: '每日郵件報告',
  schedulingReportPara:
    '每天下午 6 點，Hiro 會將當天投遞的所有內容彙整後直接寄送到你的 Gmail——包括職位名稱、公司、平台和匹配分數。無需開啟應用程式，你也能隨時掌握進展。',
  schedulingTipTitle: '設好就不用再管',
  schedulingTipText:
    '在某個週日把 Hiro 設定好，週一照常去上班，下午 6 點就能收到一份它在你過自己生活時投遞了哪些職缺的彙整。',

  tryItHeading: '親自體驗',
  tryItPara1: 'Hiro 目前正在開發中。相關連結將在可用後發布在這裡。',
  tryItTipTitle: '敬請期待',
  tryItTipText: '專案連結、示範和原始碼將很快新增到這裡。',
};

const ja = {
  title: 'Hiro — AI 就活エージェント',
  excerpt:
    'Seek、Indeed、LinkedIn をスケジュールに沿って巡回し、あなたの履歴書と照らして求人ごとにスコアを付け、応募書類を最適化して提出まで行う AI デスクトップエージェント——すべてあなたが眠っている間に。',
  date: '2026年3月',
  readTime: '8 分で読めます',

  heroPara1Pre:
    '就職活動はもう一つの仕事です。求人を更新し、履歴書をコピー＆ペーストし、応募ごとにカバーレターを書き直しても、結局みんなと同じありきたりな応募書類を送ることになります。',
  heroPara1Post: ' がそれを自動で代行します。',
  heroPara2:
    'Hiro は AI を活用したデスクトップエージェントで、設定可能なスケジュールに沿って Seek、Indeed、LinkedIn を巡回し、あなたの履歴書と照らして各求人にスコアを付け、その職種に合わせて応募書類を最適化し、提出まで行います——すべて夜間に。目が覚めれば、すでに送信済みの応募がダッシュボードに並んでいます。',

  tocProblem: '就職活動の課題',
  tocScraping: 'マルチプラットフォーム巡回',
  tocAiScoring: 'AI マッチスコアリング',
  tocTailoring: '履歴書とカバーレターの最適化',
  tocAutoApply: '自動応募',
  tocDashboard: 'ダッシュボード',
  tocJobDetail: '求人詳細パネル',
  tocAnalytics: '分析とタイムライン',
  tocScheduling: 'スケジュールとフォローアップ',
  tocTryIt: '自分で試す',

  problemHeading: '就職活動の課題',
  problemPara1:
    '平均的な就職活動では何百件もの応募が発生します。そのどれもが同じ手作業のループを必要とします。求人を見つけ、説明を読み、履歴書を調整し、カバーレターを書き、これまで何百回も入力してきた同じ項目を埋め、提出し、そして待つ。',
  problemPara2:
    'そのループの大部分は自動化できます。本当にあなたの判断が必要なのは、その求人に時間をかける価値があるかを決める部分だけです——しかもそれさえ AI スコアリングで補助できます。Hiro はそれ以外のすべてを自動化するので、あなたは本当に大切なこと、つまり本当に行きたい面接の準備に集中できます。',
  problemTipTitle: 'Hiro ではないもの',
  problemTipText:
    'Hiro はやみくもに応募をばらまくことはしません。すべての提出はスコアリングされ、最適化され、あなたが設定した条件で絞り込まれます——だから送られるものは正確にあなたを表します。',

  scrapingHeading: 'マルチプラットフォーム巡回',
  scrapingPara1:
    'Hiro は最大級の求人サイト 3 つを同時に監視します。各プラットフォームには独自のログインフロー、ページネーションのロジック、求人フォーマットがあります——Hiro はそのすべてに対応します。',
  scrapingSeekLabel: 'Seek',
  scrapingSeekDesc:
    '——職種名、企業、給与レンジ、勤務地、求人説明全文を含む完全な求人取得',
  scrapingIndeedLabel: 'Indeed',
  scrapingIndeedDesc: '——スポンサー求人とオーガニック求人を含む、同等の深さの抽出',
  scrapingLinkedInLabel: 'LinkedIn',
  scrapingLinkedInDesc:
    '——認証が必要な Easy Apply 求人にアクセスするためのステルスセッションログイン',
  scrapingPara2:
    'クロスプラットフォームの重複検出により、同じ求人が複数のサイトに掲載されていても、同じ求人に二度応募することはありません。',

  aiScoringHeading: 'AI マッチスコアリング',
  aiScoringPara1:
    '取得したすべての求人は、他の処理に入る前にまずあなたの履歴書と照らしてスコアリングされます。AI は両方の文書を読み、マッチ率（0〜100%）と、なぜそのスコアになったのかを一文で説明します。',
  aiScoringSubheading: 'スコアが考慮する要素',
  aiScoringItem1: '求人とあなたの履歴書の両方に記載されたスキルと技術',
  aiScoringItem2: '必要な経験年数とあなたの経歴の比較',
  aiScoringItem3: '職位レベルと役職名の整合性',
  aiScoringItem4: '業界とドメインの重なり',
  aiScoringPara2:
    'あなたが設定したしきい値を下回る求人は完全にスキップされます。基準を決めるのはあなた——Hiro はそれを尊重します。これにより応募の質が保たれ、合わない職種で採用担当者の時間を無駄にすることを避けられます。',
  aiScoringTipTitle: 'Keyword Gap（キーワードギャップ）',
  aiScoringTipText:
    '求人詳細パネルは、求人説明にあるスキルのうち、あなたの履歴書にあるものと欠けているものを正確に表示します——だから何がスコアを下げているのか一目でわかります。',

  tailoringHeading: '履歴書とカバーレターの最適化',
  tailoringPara1:
    'すべての求人に同じ汎用的な履歴書を送ることは、最も早く落とされる方法の一つです。Hiro は事実を変えることなく、各求人の説明に合わせて履歴書とカバーレターを最適化します。',
  tailoringResumeSubheading: '履歴書の最適化',
  tailoringResumePara:
    'AI はあなたの箇条書きを並べ替え、書き直して、各職種に最も関連する経験を強調します。あなたの実際の経験は変わりません——変わるのは見せ方です。最適化された履歴書は、求人詳細パネルから DOCX としてダウンロードできます。',
  tailoringCoverSubheading: 'カバーレターの生成',
  tailoringCoverPara:
    'Hiro は応募ごとに最適化されたカバーレターを作成します。トーンは設定画面で全体に対して設定できます。',
  tailoringToneProfLabel: 'Professional（プロフェッショナル）',
  tailoringToneProfDesc: '——フォーマルで、構成がしっかりし、要点を押さえた',
  tailoringToneCasualLabel: 'Casual & Warm（カジュアルで温かい）',
  tailoringToneCasualDesc: '——会話的で、親しみやすい',
  tailoringToneConfidentLabel: 'Confident & Direct（自信があり率直）',
  tailoringToneConfidentDesc: '——断定的で、主体性の高い',
  tailoringCoverPara2:
    'オプションでカバーレターのテンプレートを用意することもできます——AI が埋める構造の骨組みで、出力が常にあなたの好みの形式に合うようになります。',
  tailoringScreeningSubheading: 'スクリーニング Q&A',
  tailoringScreeningPara:
    '多くの応募には「なぜここで働きたいのですか？」「プロジェクトを率いた経験を説明してください。」といったスクリーニング質問が含まれます。Hiro はあなたの履歴書と求人説明の文脈を使い、AI でこれらに回答します。回答はキャッシュされ、似た質問で再利用されるため、応募を繰り返すほど速くなります。',

  autoApplyHeading: '自動応募',
  autoApplyPara1:
    '求人がスコアのしきい値を超え、書類が最適化されると、Hiro は自動で応募を提出します。対応する応募タイプ：',
  autoApplySeekLabel: 'Seek Quick Apply',
  autoApplySeekDesc:
    '——スキルのチェックボックスや給与欄を含め、Quick Apply フォームに入力して提出',
  autoApplyLinkedInLabel: 'LinkedIn Easy Apply',
  autoApplyLinkedInDesc:
    '——スクリーニング質問を含む、複数ステップの Easy Apply フローを完了',
  autoApplyIndeedLabel: 'Indeed',
  autoApplyIndeedDesc: '——Indeed のネイティブ応募フローに対応',
  autoApplyPara2:
    'Seek では、Hiro はあなたの履歴書に合う技術スタックのチェックボックスも自動でチェックし、設定した最低額から希望給与欄を埋めます。',

  dashboardHeading: 'ダッシュボード',
  dashboardPara1:
    'ダッシュボードは、Hiro があなたに代わって送ったすべてを追跡する場所です。キーボードだけで操作できるように作られています。',
  dashboardStatsSubheading: '統計バー',
  dashboardStatsPara:
    '一目で：今日・今週・累計の応募数、面接数、そして全体の返信率。',
  dashboardTableSubheading: '応募テーブル',
  dashboardTableItem1: 'ステータスで絞り込み——応募済み、面接、不採用、返信なし',
  dashboardTableItem2: 'プラットフォームで絞り込み——Seek、Indeed、LinkedIn',
  dashboardTableItem3Pre: '職種名や企業でのライブ検索（',
  dashboardTableItem3Post: ' を押してフォーカス）',
  dashboardTableItem4Post: ' で行間をキーボード移動',
  dashboardTableItem5Post: ' で詳細パネルを閉じる',
  dashboardTableItem6:
    'インラインコメント——テーブル内の任意の応募にメモを追加',
  dashboardTableItem7:
    'CSV エクスポート——有効な絞り込みを反映してすべての応募をダウンロード',

  jobDetailHeading: '求人詳細パネル',
  jobDetailPara1:
    '任意の行をクリックすると求人詳細パネルが開きます——その応募に関するすべてを表示する全幅のサイドパネルです。',
  jobDetailMatchLabel: 'Match explanation（マッチの説明）',
  jobDetailMatchDesc: '——なぜその求人がそのスコアになったのかを一文でまとめた AI の要約',
  jobDetailKeywordLabel: 'Keyword Gap（キーワードギャップ）',
  jobDetailKeywordDesc:
    '——求人説明に対して、あなたの履歴書にあるスキルと欠けているスキルを並べて表示',
  jobDetailInterviewLabel: 'Interview Questions（面接質問）',
  jobDetailInterviewDesc:
    '——「面接」ステータスの求人について、その職種に合わせた想定面接質問を 8 つ生成',
  jobDetailResumeLabel: '最適化された履歴書全文',
  jobDetailResumeDesc:
    '——この特定の応募に Hiro が使った履歴書を DOCX としてダウンロード',
  jobDetailScreeningLabel: 'Screening Q&A（スクリーニング Q&A）',
  jobDetailScreeningDesc: '——応募質問に対して AI が生成した回答を表示',
  jobDetailBlacklistLabel: 'Blacklist Company（企業をブラックリスト登録）',
  jobDetailBlacklistDesc:
    '——ワンクリックでこの企業を今後のすべてのスキャンから永久に除外',
  jobDetailTipTitle: '面接準備を内蔵',
  jobDetailTipText:
    '求人が「面接」ステータスに移ると、Hiro は求人説明とあなたの履歴書をもとに想定質問を 8 つ生成します——だから何を聞かれそうか分かった状態で面接に臨めます。',

  analyticsHeading: '分析とタイムライン',
  analyticsPara1:
    '2 つの専用ページが、あなたの就活の活動を別の視点から見せてくれます。',
  analyticsPageSubheading: '分析ページ',
  analyticsItem1: '直近 7 日間の応募数を示す SVG 棒グラフ',
  analyticsItem2:
    'プラットフォームのドーナツチャート——Seek、Indeed、LinkedIn であなたの応募がどう分かれているか',
  analyticsItem3: 'ステータス別の内訳——応募済み、面接、不採用、返信なし',
  analyticsItem4: '時間経過に伴う返信率',
  analyticsTimelineSubheading: 'タイムラインページ',
  analyticsTimelinePara:
    'すべての応募が日付とプラットフォームごとにグループ化され、折りたためる日ごとの履歴になります。就活の流れを振り返り、パターンを見つけるのに役立ちます——どの日に最も返信が多かったか、どのプラットフォームが最も成果を出すか。',

  schedulingHeading: 'スケジュールとフォローアップ',
  schedulingPara1:
    'Hiro はあなたのスケジュールに合わせて動きます、その逆ではありません。設定画面で毎日のスキャン時刻を決めれば、月曜から金曜のその時刻に自動で実行されます——アプリを開く必要はありません。',
  schedulingFollowupSubheading: '自動フォローアップメール',
  schedulingFollowupPara:
    '設定した日数を過ぎても返信がない場合、Hiro があなたに代わってフォローアップメールを作成・送信します。設定画面でこの機能をオン・オフでき、トリガーとなる日数のしきい値も設定できます。',
  schedulingReportSubheading: '毎日のメールレポート',
  schedulingReportPara:
    '毎日午後 6 時に、Hiro はその日応募したすべての要約をあなたの Gmail に直接送ります——職種名、企業、プラットフォーム、マッチスコア。アプリを開かなくても状況を把握できます。',
  schedulingTipTitle: '設定したら、あとはおまかせ',
  schedulingTipText:
    'ある日曜に Hiro を一度設定し、月曜は普通に仕事に行き、あなたが自分の生活を送っている間に何に応募したかの午後 6 時の要約を受け取りましょう。',

  tryItHeading: '自分で試す',
  tryItPara1:
    'Hiro は現在開発中です。利用可能になり次第、ここにリンクを掲載します。',
  tryItTipTitle: '近日公開',
  tryItTipText:
    'プロジェクトのリンク、デモ、ソースコードを近日中にここに追加します。',
};

export default { en, 'zh-Hans': zhHans, 'zh-Hant': zhHant, ja };
