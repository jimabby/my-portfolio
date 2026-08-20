// Per-language content for the "Rebuilding Housed" post, which doubles as the
// Housed redesign case study. Brand, product and UI names (Housed, Pilates,
// HYROX, App Store, Google Play, WebP) stay untranslated; the prose around them
// is translated.

const en = {
  title: 'Rebuilding Housed — From Brochure Site to Booking Platform',
  excerpt:
    'How the Housed website moved from a nine-page brochure to a club-by-club platform: auditing the old site, rebuilding the information architecture, and cutting over without losing the URLs.',
  date: 'August 2026',
  readTime: '9 min read',
  badge: 'Project',

  // Hero
  heroP1:
    'The old Housed site did what most gym websites do: it described the gym. Nine pages of services, facilities, brand story and blog, all written to be read rather than acted on. It ranked, it looked fine, and almost nothing on it could be booked.',
  heroP2:
    'The rebuild started from the opposite end — what does a visitor actually come here to do? — and worked backwards to the pages. This is the transition, page by page: what the old site had, what replaced it, and how the two were joined up so the move cost nothing in search.',
  heroImgAlt: 'The rebuilt Housed homepage, with a full-bleed photograph of the reformer studio',

  // TOC
  tocWhy: 'Why the old site had to change',
  tocAudit: 'Auditing what was already there',
  tocGoals: 'What the new site had to do',
  tocIa: 'Rebuilding the information architecture',
  tocClubs: 'One page per club',
  tocMemberships: 'Memberships you can compare',
  tocBooking: 'Booking instead of browsing',
  tocJournal: 'Moving the content across',
  tocMigration: 'The cutover',
  tocTakeaways: 'What I would keep',

  // Why
  whyHeading: 'Why the old site had to change',
  whyP1:
    'The old site was not broken. It was a competent brochure: a homepage promise, a services index, pages for Pilates, wellness, partnerships and ambassadors, a brand story, and a filterable blog. Every page explained something. Almost none of them let you do anything.',
  whyP2:
    'That gap showed up in the paths visitors took. People arrived looking for a timetable, a price, or the club nearest to them, and the site answered with prose. The free pass was the one real call to action, and it sat behind a page of reading. A brochure was the right site for a single gym; it stopped being the right site once Housed had multiple clubs, several membership tiers, class bookings and an app.',
  whyOldImgAlt: 'The original Housed homepage, with the free pass offer set in oversized type',
  whyOldCaption:
    'Before: the original homepage carried a single promise and the free pass offer, with the club finder further down the page.',
  whyNewImgAlt:
    'The rebuilt Housed homepage below the fold, with personal training and referral offers side by side',
  whyNewCaption:
    'After: the same homepage now spends its second screen on two concrete offers and hands straight over to the club finder.',

  // Audit
  auditHeading: 'Auditing what was already there',
  auditP1:
    'Nothing was designed until the old site had been inventoried. Every page was listed with its URL, what it was for, whether anything on it converted, and whether it earned enough traffic to be worth carrying across. That sheet decided the shape of the rebuild more than any moodboard did.',
  auditP2: 'Four categories came out of it:',
  auditItem1Label: 'Keep the URL, rebuild the page',
  auditItem1Desc:
    ' — the homepage, Pilates, wellness and the blog. Real demand, wrong execution.',
  auditItem2Label: 'Keep the content, move it',
  auditItem2Desc:
    ' — the brand story, mission and values, which belonged inside the club and about pages rather than on a page of their own.',
  auditItem3Label: 'Replace outright',
  auditItem3Desc:
    ' — the services index, a page that existed for search engines and told members nothing they could act on.',
  auditItem4Label: 'Retire and redirect',
  auditItem4Desc:
    ' — pages with no traffic and no job, folded into whichever new page best answered the same question.',
  auditTipTitle: 'Audit before art direction',
  auditTipText:
    'The temptation on a redesign is to start with the homepage, because that is the page everyone has an opinion about. Starting with the inventory means the new sitemap is an argument you can defend, not a preference.',

  // Goals
  goalsHeading: 'What the new site had to do',
  goalsP1:
    'The brief reduced to five jobs. Everything else on the site had to justify itself against them, and a surprising number of pages could not.',
  goalsItem1: 'Get a first-timer to claim a free pass in as few steps as the law allows.',
  goalsItem2: 'Answer "which club, and what is in it?" without making anyone read a brand story.',
  goalsItem3: 'Make membership tiers comparable at a glance, priced per club.',
  goalsItem4: 'Let an existing member book a class or reach the member portal from any page.',
  goalsItem5: 'Keep the search equity the old blog had built, rather than starting again.',
  goalsP2:
    'Written down like that, the redesign stopped being a visual exercise. Four of the five jobs were structural — they were about what pages exist and how they link — and only the first was really about the look of the thing.',

  // IA
  iaHeading: 'Rebuilding the information architecture',
  iaP1:
    'The old site organised itself around facilities: gym, Pilates, group training, basketball, wellness, recovery. That is how the business is organised, not how a visitor thinks. Nobody wakes up wanting group training; they want to get stronger, move better, or last longer.',
  iaP2:
    'So the new programming pages are framed as goals — hybrid training, strength, mobility, longevity — with each tile naming the kind of member it suits and leading into the classes and coaching that deliver it. Facilities did not disappear; they moved to where they are actually a deciding factor, which is the individual club page.',
  iaOldImgAlt: 'The original Housed services index, with a card for each service',
  iaOldCaption:
    'Before: a services index written as much for search as for members, one card per facility.',
  iaNewImgAlt:
    'The rebuilt goals page, with full-height tiles for hybrid training, strength, mobility and longevity',
  iaNewCaption:
    'After: the same content framed as goals, each tile naming the member it is for.',
  iaPtImgAlt: 'The rebuilt personal training page, with a coach and member mid-session',
  iaPtCaption:
    'Personal training makes its case in one line over footage of an actual session, rather than a list of coach bios.',

  // Clubs
  clubsHeading: 'One page per club',
  clubsP1:
    'The single biggest structural change: every club now has a page of its own, and it is the page most paid traffic lands on. It opens on the wet area rather than the gym floor — the thing that differentiates one Housed from another — and a sticky sub-navigation moves through the overview, facilities, classes and location without ever leaving the page.',
  clubsP2:
    'Pricing lives on that page too, because membership pricing varies by club. The same panel that appears on the memberships page is rendered with the local numbers, and the free pass form is docked to the bottom of the screen so the offer follows the visitor down the page instead of waiting at the end of it.',
  clubsImgAlt: 'A Housed club page opening on the mineral pool at Macquarie Park',
  clubsCaption:
    'Each club leads with its own facilities, under a sub-navigation that keeps the whole page one scroll away.',
  clubsPricingImgAlt: 'A club page membership panel with three tiers and a docked free pass bar',
  clubsPricingCaption: 'Prices are rendered per club, with the free pass bar following the scroll.',
  clubsWellnessImgAlt:
    'The wellness facilities grid, listing saunas, steam room, mineral spa, cold plunge and recovery zone',
  clubsWellnessCaption:
    'Wellness facilities are a plain grid that says which clubs have what — the question people actually arrive with.',

  // Memberships
  membershipsHeading: 'Memberships you can compare',
  membershipsP1:
    'The old site listed prices. The new one compares them. Each tier pairs a photograph of what you are buying with the weekly price and its inclusions in a column beside it, so base and Pilates can be read against each other in a single glance instead of by scrolling between two cards.',
  membershipsP2:
    'The free pass form was cut back at the same time. It asks for a name, an email, a phone number and a preferred club, and it states the consent it is collecting in place rather than burying it in terms nobody opens. Every field removed from that form was worth more than any copy change on the page above it.',
  membershipsImgAlt:
    'The memberships page, with base and Pilates tiers each showing photo, weekly price and inclusions',
  membershipsCaption:
    'Each tier shows what you are buying, what it costs weekly, and what is included, in one row.',
  membershipsFreePassImgAlt:
    'The free pass form, asking for name, email, phone and preferred club beside a photo of reception',
  membershipsFreePassCaption:
    'Four fields, an explicit consent line, and one button — the shortest path the offer allows.',

  // Booking
  bookingHeading: 'Booking instead of browsing',
  bookingP1:
    'On the old site, a timetable was something you looked at. The rebuilt one is the booking system: a week of dates across the top, filters for class type and location, and every class listed with its time, coach, studio and a button that books it.',
  bookingP2:
    'Members who would rather not use a browser at all get the app page and the member portal. The app page shows the phone in hand and states plainly what it replaces — gym access, class and wellness bookings, coaching — and the portal is a single centred card for logging in, recovering a password or signing up, with store links underneath.',
  bookingTimetableImgAlt:
    'The Housed timetable, with a week of dates, filters, and a book button on every class',
  bookingTimetableCaption:
    'The timetable is the booking flow, not a PDF: filter by class type and club, then book in place.',
  bookingAppImgAlt: 'The app page, showing the Housed app on a phone held in one hand',
  bookingAppCaption: 'The app page leads with what the app replaces rather than a feature list.',
  bookingPortalImgAlt: 'The member portal login card, with App Store and Google Play links below it',
  bookingPortalCaption:
    'Existing members get one card: log in, reset, or sign up — and a way into the app.',

  // Journal
  journalHeading: 'Moving the content across',
  journalP1:
    'The old blog was the one part of the site with genuine search equity, so it was the part handled most carefully. Every post moved across with its slug intact, its publication date preserved, and its category kept, because the categories were already the way people navigated it.',
  journalP2:
    'The article template did change. Long posts now carry a sticky table of contents, a key-takeaways panel before the body, and a plain-language disclaimer on the subjects that warrant one — training advice for a general audience should say what it is not. The result reads either way: skimmed from the takeaways, or straight through.',
  journalOldImgAlt: 'The original Housed blog index, filterable by category',
  journalOldCaption:
    'Before: a filterable blog index, with read time and publication date on every card.',
  journalNewImgAlt:
    'The rebuilt journal index, leading with training tips, nutrition and wellness',
  journalNewCaption:
    'After: the same posts under a promise rather than a label, with the categories intact.',
  journalArticleImgAlt:
    'A rebuilt article page with a sticky table of contents and a key takeaways panel',
  journalArticleCaption:
    'The article template: contents on the left, takeaways before the body, disclaimer where the subject needs one.',

  // Migration
  migrationHeading: 'The cutover',
  migrationP1:
    'A redesign that loses its URLs is not a redesign, it is a relaunch — and relaunches start from zero in search. The mapping work happened before any page was built, and it was the least glamorous and most valuable part of the project.',
  migrationP2: 'The order that worked:',
  migrationStep1Label: 'Map every old URL to a new one',
  migrationStep1Desc:
    ' — one row per page, no page left pointing nowhere. A retired page maps to whichever new page answers the same question, never to the homepage.',
  migrationStep2Label: 'Redirect permanently, not temporarily',
  migrationStep2Desc:
    ' — 301s for everything that moved, so the ranking follows the content instead of being held in limbo.',
  migrationStep3Label: 'Rebuild the metadata with the page',
  migrationStep3Desc:
    ' — title, description, canonical and Open Graph card per page, rather than one shared card that makes every link preview identically.',
  migrationStep4Label: 'Regenerate the sitemap from the routes',
  migrationStep4Desc:
    ' — derived from the route table, so a new club page cannot be live and unlisted at the same time.',
  migrationStep5Label: 'Convert the imagery',
  migrationStep5Desc:
    ' — every screenshot and photograph re-encoded to WebP at the sizes the layouts actually use, which is most of the page-weight difference between the two sites.',
  migrationStep6Label: 'Watch the old URLs, not the new ones',
  migrationStep6Desc:
    ' — after cutover, the interesting report is 404s and redirect chains on the old paths. That is where a migration fails quietly.',
  migrationTipTitle: 'Keep the redirect map in the repo',
  migrationTipText:
    'A redirect map that lives in a spreadsheet gets out of date the first time someone renames a page. Kept next to the route table, it can be tested — and a missing mapping fails the build instead of a visitor.',

  // Takeaways
  takeawaysHeading: 'What I would keep',
  takeawaysP1: 'Four things carried the project, and none of them were visual:',
  takeawaysItem1:
    'Inventory first. The audit decided the sitemap; the sitemap decided the design.',
  takeawaysItem2:
    'Write the jobs down. Five sentences settled more arguments than any set of mockups.',
  takeawaysItem3:
    'Structure over surface. Four of the five jobs were solved by which pages exist and how they link.',
  takeawaysItem4:
    'Protect the URLs. The content that already ranks is the cheapest traffic the new site will ever get.',
  takeawaysP2:
    'The visual language matters — the new site is quieter, more editorial, and gets out of the way of the photography. But the reason it performs is that a visitor can now find a club, see a price, and book a class without reading a single paragraph they did not ask for.',
};

const zhHans = {
  title: 'Housed 网站重构——从宣传册到预约平台',
  excerpt:
    'Housed 网站如何从九页宣传册转变为按门店组织的平台：盘点旧站、重建信息架构，并在不丢失原有网址的前提下完成切换。',
  date: '2026 年 8 月',
  readTime: '9 分钟阅读',
  badge: '项目',

  heroP1:
    '旧版 Housed 网站做的事和多数健身房网站一样：介绍这家健身房。九个页面写满服务、设施、品牌故事与博客，通篇都是供人阅读的内容，而不是供人行动的。它的排名不差，观感也可以，但上面几乎没有任何东西可以直接预约。',
  heroP2:
    '重构从相反的一端开始——访客到这里究竟想做什么？——再反推需要哪些页面。下面是这次迁移的逐页记录：旧站有什么、被什么取代，以及两者如何衔接，才让这次搬迁没有在搜索上付出代价。',
  heroImgAlt: '重构后的 Housed 首页，整屏铺满普拉提器械教室的照片',

  tocWhy: '旧站为何必须改',
  tocAudit: '先盘点已有的内容',
  tocGoals: '新站必须完成的事',
  tocIa: '重建信息架构',
  tocClubs: '每家门店一个页面',
  tocMemberships: '可以互相比较的会籍',
  tocBooking: '从浏览转向预约',
  tocJournal: '把内容搬过去',
  tocMigration: '切换上线',
  tocTakeaways: '我会保留的做法',

  whyHeading: '旧站为何必须改',
  whyP1:
    '旧站并没有坏。它是一份合格的宣传册：首页的一句承诺、服务总览、普拉提与康养页面、合作与大使页面、品牌故事，以及可筛选的博客。每个页面都在解释某件事，却几乎没有一个页面能让你做成某件事。',
  whyP2:
    '这个落差直接体现在访客的行为路径上。人们是为了课表、价格或最近的门店而来，网站却用长文回应。免费体验券是唯一真正的行动号召，而它被压在一整页阅读之后。当 Housed 只有一家门店时，宣传册是对的；一旦有了多家门店、多个会籍档位、团课预约与 App，它就不再成立。',
  whyOldImgAlt: '旧版 Housed 首页，免费体验券以超大字体呈现',
  whyOldCaption: '之前：旧首页只承载一句承诺与免费体验券，门店查询放在页面更下方。',
  whyNewImgAlt: '重构后的 Housed 首页第二屏，私教与推荐好友优惠并列呈现',
  whyNewCaption: '之后：同一个首页把第二屏交给两个具体优惠，随后直接进入门店查询。',

  auditHeading: '先盘点已有的内容',
  auditP1:
    '在旧站被完整盘点之前，什么都没有开始设计。每个页面都被列出网址、用途、上面是否有任何转化，以及流量是否值得带到新站。这张表对重构形态的影响，远大于任何情绪板。',
  auditP2: '最终归为四类：',
  auditItem1Label: '保留网址，重建页面',
  auditItem1Desc: '——首页、普拉提、康养与博客。需求真实，做法不对。',
  auditItem2Label: '保留内容，换个位置',
  auditItem2Desc: '——品牌故事、使命与价值观，它们属于门店页与关于页，而不该各占一页。',
  auditItem3Label: '直接替换',
  auditItem3Desc: '——服务总览页，一个为搜索引擎而存在、却没告诉会员任何可行动信息的页面。',
  auditItem4Label: '下线并跳转',
  auditItem4Desc: '——既没有流量也没有任务的页面，合并进最能回答同一问题的新页面。',
  auditTipTitle: '先盘点，再谈美术',
  auditTipText:
    '改版最容易的起点是首页，因为每个人都对它有意见。从盘点开始，意味着新的站点地图是一个可以辩护的论证，而不是一种偏好。',

  goalsHeading: '新站必须完成的事',
  goalsP1: '需求最终收敛为五件事。站上其他一切都必须对照这五条自证，而相当多的页面没能通过。',
  goalsItem1: '让第一次到访的人以法规允许的最少步骤领到免费体验券。',
  goalsItem2: '在不必读完品牌故事的前提下，回答「哪家门店、里面有什么」。',
  goalsItem3: '让会籍档位一眼可比，并按门店定价。',
  goalsItem4: '让现有会员在任何页面都能预约课程或进入会员专区。',
  goalsItem5: '守住旧博客积累的搜索权重，而不是从零开始。',
  goalsP2:
    '写成这样之后，改版就不再是一次视觉练习。五件事里有四件是结构性的——关乎存在哪些页面、彼此如何连接——只有第一件真正与外观有关。',

  iaHeading: '重建信息架构',
  iaP1:
    '旧站按设施来组织自己：健身、普拉提、团课、篮球、康养、恢复。那是业务的组织方式，不是访客的思考方式。没有人醒来时想要「团课」，他们想变强、想动得更好、想活得更久。',
  iaP2:
    '于是新的课程页面以目标来划分——混合训练、力量、活动度、长寿健康——每个图块都点明适合的人群，并顺势引向实现它的课程与教练。设施并没有消失，而是移到了真正起决定作用的位置：单个门店的页面。',
  iaOldImgAlt: '旧版 Housed 服务总览页，每项服务一张卡片',
  iaOldCaption: '之前：一份同时写给搜索引擎与会员的服务总览，每项设施一张卡片。',
  iaNewImgAlt: '重构后的目标页面，混合训练、力量、活动度与长寿健康各占整屏高图块',
  iaNewCaption: '之后：同样的内容以目标呈现，每个图块都点明它是为谁准备的。',
  iaPtImgAlt: '重构后的私教页面，画面是教练与会员的训练过程',
  iaPtCaption: '私教页面用一句话与真实训练画面说明主张，而不是罗列教练简介。',

  clubsHeading: '每家门店一个页面',
  clubsP1:
    '最大的结构改动：每家门店现在都有独立页面，而它正是投放流量最主要的落地页。页面不以健身区、而以水疗区开场——那是不同 Housed 之间真正的差异——吸顶子导航则让概览、设施、课程与位置都在同一页内切换。',
  clubsP2:
    '价格也放在这个页面上，因为会籍价格因门店而异。会籍面板与会籍页共用同一套，只是渲染本地价格；免费体验券表单固定在屏幕底部，让优惠随访客一路下滑，而不是等在页面末尾。',
  clubsImgAlt: 'Housed 门店页面，以 Macquarie Park 的矿物泉开场',
  clubsCaption: '每家门店以自身设施开场，子导航让整页内容始终只差一次滚动。',
  clubsPricingImgAlt: '门店页面的会籍面板，三个档位与固定在底部的免费体验券栏',
  clubsPricingCaption: '价格按门店渲染，免费体验券栏跟随滚动。',
  clubsWellnessImgAlt: '康养设施网格，列出桑拿、蒸汽房、矿物泉、冷水浴与恢复区',
  clubsWellnessCaption: '康养设施用朴素网格说明哪家门店有什么——那正是人们真正带来的问题。',

  membershipsHeading: '可以互相比较的会籍',
  membershipsP1:
    '旧站是罗列价格，新站是比较价格。每个档位都把所购内容的实景照片与每周价格、权益列表并排放置，让基础会籍与普拉提会籍在一眼之内可比，而不必在两张卡片之间来回滚动。',
  membershipsP2:
    '免费体验券表单同时被削减。它只要姓名、邮箱、电话与意向门店，并在当场说明所收集的同意事项，而不是藏进没人会打开的条款里。从这张表单上删掉的每一个字段，都比上方页面的任何文案调整更有价值。',
  membershipsImgAlt: '会籍页面，基础与普拉提档位各自展示照片、每周价格与权益',
  membershipsCaption: '每个档位在同一行里说明买到什么、每周多少钱、包含哪些内容。',
  membershipsFreePassImgAlt: '免费体验券表单，姓名、邮箱、电话与意向门店，旁边是前台照片',
  membershipsFreePassCaption: '四个字段、一行明示的同意说明、一个按钮——这是该优惠允许的最短路径。',

  bookingHeading: '从浏览转向预约',
  bookingP1:
    '在旧站上，课表是拿来看的。重构后的课表就是预约系统：顶部是一周日期，可按课程类型与门店筛选，每堂课都列出时间、教练、教室，以及一个直接完成预约的按钮。',
  bookingP2:
    '不想使用浏览器的会员则有 App 页面与会员专区。App 页面展示手中的实机，并直白说明它替代了什么——门禁、团课与康养预约、教练服务；会员专区是一张居中的卡片，用于登录、找回密码或注册，下方附上商店链接。',
  bookingTimetableImgAlt: 'Housed 课表，一周日期、筛选器，每堂课都有预约按钮',
  bookingTimetableCaption: '课表就是预约流程，而不是一份 PDF：按课程类型与门店筛选，当场预约。',
  bookingAppImgAlt: 'App 页面，展示单手握持的 Housed App',
  bookingAppCaption: 'App 页面先说明它替代了什么，而不是先列功能。',
  bookingPortalImgAlt: '会员专区登录卡片，下方是 App Store 与 Google Play 链接',
  bookingPortalCaption: '现有会员只看到一张卡片：登录、重设密码或注册，以及进入 App 的入口。',

  journalHeading: '把内容搬过去',
  journalP1:
    '旧博客是整站唯一真正积累了搜索权重的部分，因此也是处理得最谨慎的部分。每篇文章都带着原有的 slug 搬过去，发布日期照旧，分类也保留——因为分类本来就是人们浏览它的方式。',
  journalP2:
    '文章模板确实变了。长文现在配有吸顶目录、正文之前的重点摘要面板，以及在需要的主题上用平实语言写的免责说明——面向大众的训练建议，应当说清它不是什么。结果是两种读法都成立：从摘要速览，或一路读完。',
  journalOldImgAlt: '旧版 Housed 博客列表，可按分类筛选',
  journalOldCaption: '之前：可筛选的博客列表，每张卡片都标出阅读时长与发布日期。',
  journalNewImgAlt: '重构后的博客列表，以训练技巧、营养与康养开场',
  journalNewCaption: '之后：同样的文章置于一句主张之下，而非一个标签，分类保持不变。',
  journalArticleImgAlt: '重构后的文章页，配有吸顶目录与重点摘要面板',
  journalArticleCaption: '文章模板：左侧目录、正文前摘要，并在需要的主题上加上免责说明。',

  migrationHeading: '切换上线',
  migrationP1:
    '丢掉网址的改版不叫改版，那叫重新上线——而重新上线在搜索上是从零开始。网址映射的工作在任何页面开工之前就已完成，它是整个项目里最不体面、也最有价值的部分。',
  migrationP2: '实际有效的顺序是：',
  migrationStep1Label: '把每个旧网址映射到一个新网址',
  migrationStep1Desc:
    '——一页一行，不留任何指向空处的页面。下线页面映射到能回答同一问题的新页面，绝不统一丢给首页。',
  migrationStep2Label: '用永久跳转，而不是临时跳转',
  migrationStep2Desc: '——所有搬迁都用 301，让排名跟着内容走，而不是被挂在半空。',
  migrationStep3Label: '元数据随页面一起重建',
  migrationStep3Desc:
    '——每页都有自己的标题、描述、canonical 与 Open Graph 卡片，而不是共用一张让所有链接预览都长得一样的图。',
  migrationStep4Label: '站点地图由路由生成',
  migrationStep4Desc: '——从路由表推导，因此新门店页面不可能一边上线、一边没被收录。',
  migrationStep5Label: '转换所有图像',
  migrationStep5Desc:
    '——所有截图与照片都按版面实际使用的尺寸重新编码为 WebP，两个网站的体积差异大半来自这里。',
  migrationStep6Label: '盯旧网址，而不是新网址',
  migrationStep6Desc: '——切换之后，真正值得看的报表是旧路径上的 404 与跳转链。迁移就是在那里悄悄失败的。',
  migrationTipTitle: '把跳转映射放进代码库',
  migrationTipText:
    '放在表格里的跳转映射，会在第一次有人改页面名时就过期。放在路由表旁边，它就可以被测试——缺失的映射会让构建失败，而不是让访客碰壁。',

  takeawaysHeading: '我会保留的做法',
  takeawaysP1: '真正支撑这个项目的有四点，而它们都不是视觉上的：',
  takeawaysItem1: '先盘点。盘点决定站点地图，站点地图决定设计。',
  takeawaysItem2: '把目标写下来。五句话解决的争论，比任何一套稿子都多。',
  takeawaysItem3: '结构优先于表面。五件事里有四件靠「存在哪些页面、如何连接」解决。',
  takeawaysItem4: '守住网址。已经有排名的内容，是新站能拿到的最便宜的流量。',
  takeawaysP2:
    '视觉语言当然重要——新站更安静、更接近编辑风格，也不去和摄影争夺注意力。但它之所以有效，是因为访客现在可以找到门店、看到价格、预约课程，而不必读一段自己没有要求的文字。',
};

const zhHant = {
  title: 'Housed 網站重構——從宣傳冊到預約平台',
  excerpt:
    'Housed 網站如何從九頁宣傳冊轉變為依門店組織的平台：盤點舊站、重建資訊架構，並在不丟失原有網址的前提下完成切換。',
  date: '2026 年 8 月',
  readTime: '9 分鐘閱讀',
  badge: '專案',

  heroP1:
    '舊版 Housed 網站做的事和多數健身房網站一樣：介紹這家健身房。九個頁面寫滿服務、設施、品牌故事與部落格，通篇都是供人閱讀的內容，而不是供人行動的。它的排名不差，觀感也可以，但上面幾乎沒有任何東西可以直接預約。',
  heroP2:
    '重構從相反的一端開始——訪客到這裡究竟想做什麼？——再反推需要哪些頁面。以下是這次遷移的逐頁記錄：舊站有什麼、被什麼取代，以及兩者如何銜接，才讓這次搬遷沒有在搜尋上付出代價。',
  heroImgAlt: '重構後的 Housed 首頁，整屏鋪滿皮拉提斯器械教室的照片',

  tocWhy: '舊站為何必須改',
  tocAudit: '先盤點既有內容',
  tocGoals: '新站必須完成的事',
  tocIa: '重建資訊架構',
  tocClubs: '每家門店一個頁面',
  tocMemberships: '可以互相比較的會籍',
  tocBooking: '從瀏覽轉向預約',
  tocJournal: '把內容搬過去',
  tocMigration: '切換上線',
  tocTakeaways: '我會保留的做法',

  whyHeading: '舊站為何必須改',
  whyP1:
    '舊站並沒有壞。它是一份合格的宣傳冊：首頁的一句承諾、服務總覽、皮拉提斯與康養頁面、合作與大使頁面、品牌故事，以及可篩選的部落格。每個頁面都在解釋某件事，卻幾乎沒有一個頁面能讓你做成某件事。',
  whyP2:
    '這個落差直接體現在訪客的行為路徑上。人們是為了課表、價格或最近的門店而來，網站卻用長文回應。免費體驗券是唯一真正的行動號召，而它被壓在一整頁閱讀之後。當 Housed 只有一家門店時，宣傳冊是對的；一旦有了多家門店、多個會籍級距、團課預約與 App，它就不再成立。',
  whyOldImgAlt: '舊版 Housed 首頁，免費體驗券以超大字體呈現',
  whyOldCaption: '之前：舊首頁只承載一句承諾與免費體驗券，門店查詢放在頁面更下方。',
  whyNewImgAlt: '重構後的 Housed 首頁第二屏，私教與推薦好友優惠並列呈現',
  whyNewCaption: '之後：同一個首頁把第二屏交給兩個具體優惠，隨後直接進入門店查詢。',

  auditHeading: '先盤點既有內容',
  auditP1:
    '在舊站被完整盤點之前，什麼都沒有開始設計。每個頁面都被列出網址、用途、上面是否有任何轉換，以及流量是否值得帶到新站。這張表對重構形態的影響，遠大於任何情緒板。',
  auditP2: '最終歸為四類：',
  auditItem1Label: '保留網址，重建頁面',
  auditItem1Desc: '——首頁、皮拉提斯、康養與部落格。需求真實，做法不對。',
  auditItem2Label: '保留內容，換個位置',
  auditItem2Desc: '——品牌故事、使命與價值觀，它們屬於門店頁與關於頁，而不該各佔一頁。',
  auditItem3Label: '直接替換',
  auditItem3Desc: '——服務總覽頁，一個為搜尋引擎而存在、卻沒告訴會員任何可行動資訊的頁面。',
  auditItem4Label: '下線並轉址',
  auditItem4Desc: '——既沒有流量也沒有任務的頁面，併入最能回答同一問題的新頁面。',
  auditTipTitle: '先盤點，再談美術',
  auditTipText:
    '改版最容易的起點是首頁，因為每個人都對它有意見。從盤點開始，意味著新的網站地圖是一個可以辯護的論證，而不是一種偏好。',

  goalsHeading: '新站必須完成的事',
  goalsP1: '需求最終收斂為五件事。站上其他一切都必須對照這五條自證，而相當多的頁面沒能通過。',
  goalsItem1: '讓第一次到訪的人以法規允許的最少步驟領到免費體驗券。',
  goalsItem2: '在不必讀完品牌故事的前提下，回答「哪家門店、裡面有什麼」。',
  goalsItem3: '讓會籍級距一眼可比，並依門店定價。',
  goalsItem4: '讓現有會員在任何頁面都能預約課程或進入會員專區。',
  goalsItem5: '守住舊部落格累積的搜尋權重，而不是從零開始。',
  goalsP2:
    '寫成這樣之後，改版就不再是一次視覺練習。五件事裡有四件是結構性的——關乎存在哪些頁面、彼此如何連接——只有第一件真正與外觀有關。',

  iaHeading: '重建資訊架構',
  iaP1:
    '舊站依設施來組織自己：健身、皮拉提斯、團課、籃球、康養、恢復。那是業務的組織方式，不是訪客的思考方式。沒有人醒來時想要「團課」，他們想變強、想動得更好、想活得更久。',
  iaP2:
    '於是新的課程頁面以目標來劃分——混合訓練、力量、活動度、長壽健康——每個圖塊都點明適合的族群，並順勢引向實現它的課程與教練。設施並沒有消失，而是移到了真正起決定作用的位置：單一門店的頁面。',
  iaOldImgAlt: '舊版 Housed 服務總覽頁，每項服務一張卡片',
  iaOldCaption: '之前：一份同時寫給搜尋引擎與會員的服務總覽，每項設施一張卡片。',
  iaNewImgAlt: '重構後的目標頁面，混合訓練、力量、活動度與長壽健康各佔整屏高圖塊',
  iaNewCaption: '之後：同樣的內容以目標呈現，每個圖塊都點明它是為誰準備的。',
  iaPtImgAlt: '重構後的私教頁面，畫面是教練與會員的訓練過程',
  iaPtCaption: '私教頁面用一句話與真實訓練畫面說明主張，而不是羅列教練簡介。',

  clubsHeading: '每家門店一個頁面',
  clubsP1:
    '最大的結構改動：每家門店現在都有獨立頁面，而它正是投放流量最主要的到達頁。頁面不以健身區、而以水療區開場——那是不同 Housed 之間真正的差異——置頂子導覽則讓總覽、設施、課程與位置都在同一頁內切換。',
  clubsP2:
    '價格也放在這個頁面上，因為會籍價格因門店而異。會籍面板與會籍頁共用同一套，只是渲染當地價格；免費體驗券表單固定在畫面底部，讓優惠隨訪客一路下滑，而不是等在頁面末尾。',
  clubsImgAlt: 'Housed 門店頁面，以 Macquarie Park 的礦物浴池開場',
  clubsCaption: '每家門店以自身設施開場，子導覽讓整頁內容始終只差一次滾動。',
  clubsPricingImgAlt: '門店頁面的會籍面板，三個級距與固定在底部的免費體驗券列',
  clubsPricingCaption: '價格依門店渲染，免費體驗券列跟隨滾動。',
  clubsWellnessImgAlt: '康養設施網格，列出桑拿、蒸氣室、礦物浴池、冷水浴與恢復區',
  clubsWellnessCaption: '康養設施用樸素網格說明哪家門店有什麼——那正是人們真正帶來的問題。',

  membershipsHeading: '可以互相比較的會籍',
  membershipsP1:
    '舊站是羅列價格，新站是比較價格。每個級距都把所購內容的實景照片與每週價格、權益列表並排放置，讓基礎會籍與皮拉提斯會籍在一眼之內可比，而不必在兩張卡片之間來回滾動。',
  membershipsP2:
    '免費體驗券表單同時被削減。它只要姓名、電子郵件、電話與意向門店，並在當場說明所蒐集的同意事項，而不是藏進沒人會打開的條款裡。從這張表單上刪掉的每一個欄位，都比上方頁面的任何文案調整更有價值。',
  membershipsImgAlt: '會籍頁面，基礎與皮拉提斯級距各自展示照片、每週價格與權益',
  membershipsCaption: '每個級距在同一列裡說明買到什麼、每週多少錢、包含哪些內容。',
  membershipsFreePassImgAlt: '免費體驗券表單，姓名、電子郵件、電話與意向門店，旁邊是前台照片',
  membershipsFreePassCaption: '四個欄位、一行明示的同意說明、一個按鈕——這是該優惠允許的最短路徑。',

  bookingHeading: '從瀏覽轉向預約',
  bookingP1:
    '在舊站上，課表是拿來看的。重構後的課表就是預約系統：頂部是一週日期，可依課程類型與門店篩選，每堂課都列出時間、教練、教室，以及一個直接完成預約的按鈕。',
  bookingP2:
    '不想使用瀏覽器的會員則有 App 頁面與會員專區。App 頁面展示手中的實機，並直白說明它取代了什麼——門禁、團課與康養預約、教練服務；會員專區是一張置中的卡片，用於登入、找回密碼或註冊，下方附上商店連結。',
  bookingTimetableImgAlt: 'Housed 課表，一週日期、篩選器，每堂課都有預約按鈕',
  bookingTimetableCaption: '課表就是預約流程，而不是一份 PDF：依課程類型與門店篩選，當場預約。',
  bookingAppImgAlt: 'App 頁面，展示單手握持的 Housed App',
  bookingAppCaption: 'App 頁面先說明它取代了什麼，而不是先列功能。',
  bookingPortalImgAlt: '會員專區登入卡片，下方是 App Store 與 Google Play 連結',
  bookingPortalCaption: '現有會員只看到一張卡片：登入、重設密碼或註冊，以及進入 App 的入口。',

  journalHeading: '把內容搬過去',
  journalP1:
    '舊部落格是整站唯一真正累積了搜尋權重的部分，因此也是處理得最謹慎的部分。每篇文章都帶著原有的 slug 搬過去，發布日期照舊，分類也保留——因為分類本來就是人們瀏覽它的方式。',
  journalP2:
    '文章模板確實變了。長文現在配有置頂目錄、正文之前的重點摘要區塊，以及在需要的主題上用平實語言寫的免責說明——面向大眾的訓練建議，應當說清它不是什麼。結果是兩種讀法都成立：從摘要速覽，或一路讀完。',
  journalOldImgAlt: '舊版 Housed 部落格列表，可依分類篩選',
  journalOldCaption: '之前：可篩選的部落格列表，每張卡片都標出閱讀時長與發布日期。',
  journalNewImgAlt: '重構後的部落格列表，以訓練技巧、營養與康養開場',
  journalNewCaption: '之後：同樣的文章置於一句主張之下，而非一個標籤，分類保持不變。',
  journalArticleImgAlt: '重構後的文章頁，配有置頂目錄與重點摘要區塊',
  journalArticleCaption: '文章模板：左側目錄、正文前摘要，並在需要的主題上加上免責說明。',

  migrationHeading: '切換上線',
  migrationP1:
    '丟掉網址的改版不叫改版，那叫重新上線——而重新上線在搜尋上是從零開始。網址對映的工作在任何頁面開工之前就已完成，它是整個專案裡最不體面、也最有價值的部分。',
  migrationP2: '實際有效的順序是：',
  migrationStep1Label: '把每個舊網址對映到一個新網址',
  migrationStep1Desc:
    '——一頁一列，不留任何指向空處的頁面。下線頁面對映到能回答同一問題的新頁面，絕不統一丟給首頁。',
  migrationStep2Label: '用永久轉址，而不是臨時轉址',
  migrationStep2Desc: '——所有搬遷都用 301，讓排名跟著內容走，而不是被掛在半空。',
  migrationStep3Label: '中介資料隨頁面一起重建',
  migrationStep3Desc:
    '——每頁都有自己的標題、描述、canonical 與 Open Graph 卡片，而不是共用一張讓所有連結預覽都長得一樣的圖。',
  migrationStep4Label: '網站地圖由路由生成',
  migrationStep4Desc: '——從路由表推導，因此新門店頁面不可能一邊上線、一邊沒被收錄。',
  migrationStep5Label: '轉換所有圖像',
  migrationStep5Desc:
    '——所有截圖與照片都依版面實際使用的尺寸重新編碼為 WebP，兩個網站的體積差異大半來自這裡。',
  migrationStep6Label: '盯舊網址，而不是新網址',
  migrationStep6Desc: '——切換之後，真正值得看的報表是舊路徑上的 404 與轉址鏈。遷移就是在那裡悄悄失敗的。',
  migrationTipTitle: '把轉址對映放進程式碼庫',
  migrationTipText:
    '放在表格裡的轉址對映，會在第一次有人改頁面名稱時就過期。放在路由表旁邊，它就可以被測試——缺失的對映會讓建置失敗，而不是讓訪客碰壁。',

  takeawaysHeading: '我會保留的做法',
  takeawaysP1: '真正支撐這個專案的有四點，而它們都不是視覺上的：',
  takeawaysItem1: '先盤點。盤點決定網站地圖，網站地圖決定設計。',
  takeawaysItem2: '把目標寫下來。五句話解決的爭論，比任何一套稿子都多。',
  takeawaysItem3: '結構優先於表面。五件事裡有四件靠「存在哪些頁面、如何連接」解決。',
  takeawaysItem4: '守住網址。已經有排名的內容，是新站能拿到的最便宜的流量。',
  takeawaysP2:
    '視覺語言當然重要——新站更安靜、更接近編輯風格，也不去和攝影爭奪注意力。但它之所以有效，是因為訪客現在可以找到門店、看到價格、預約課程，而不必讀一段自己沒有要求的文字。',
};

const ja = {
  title: 'Housed のリニューアル——パンフレット型サイトから予約プラットフォームへ',
  excerpt:
    '9ページのパンフレット型サイトを、店舗単位のプラットフォームへ。旧サイトの棚卸し、情報設計の作り直し、そして URL を失わない切り替えまでの記録。',
  date: '2026年8月',
  readTime: '9分で読めます',
  badge: 'プロジェクト',

  heroP1:
    '旧 Housed サイトは、多くのジムのサイトと同じことをしていました。つまり「ジムの説明」です。サービス、施設、ブランドストーリー、ブログの9ページ。どれも読ませるために書かれており、行動させるためには書かれていません。検索順位も見た目も悪くありませんでしたが、その場で予約できるものはほとんどありませんでした。',
  heroP2:
    'リニューアルは逆の側から始めました。訪問者はここで何をしたいのか——そこからページを逆算します。以下はその移行の記録です。旧サイトに何があり、何に置き換わり、そして検索上の損失を出さないために両者をどう繋いだのか。',
  heroImgAlt: 'リニューアル後の Housed トップページ。リフォーマースタジオの写真を全面に配置',

  tocWhy: 'なぜ旧サイトを変えたのか',
  tocAudit: 'まず既存資産の棚卸し',
  tocGoals: '新サイトが果たすべき役割',
  tocIa: '情報設計の作り直し',
  tocClubs: '店舗ごとに1ページ',
  tocMemberships: '比較できる会員プラン',
  tocBooking: '閲覧から予約へ',
  tocJournal: 'コンテンツの移行',
  tocMigration: '切り替え作業',
  tocTakeaways: '次も必ずやること',

  whyHeading: 'なぜ旧サイトを変えたのか',
  whyP1:
    '旧サイトは壊れていたわけではありません。よくできたパンフレットでした。トップの一言、サービス一覧、ピラティスとウェルネスのページ、パートナーシップとアンバサダー、ブランドストーリー、そして絞り込めるブログ。どのページも何かを説明していましたが、何かを完了させられるページはほとんどありませんでした。',
  whyP2:
    'その差は訪問者の行動に表れます。人はタイムテーブル、価格、最寄り店舗を知るために来るのに、サイトは長文で答えていました。実質的な行動導線は無料パスだけで、それも読み物の後ろに置かれていました。店舗が1つならパンフレットで十分でしたが、複数店舗・複数プラン・クラス予約・アプリが揃った時点で、それは正しい形ではなくなりました。',
  whyOldImgAlt: '旧 Housed トップページ。無料パスの訴求が大きな文字で置かれている',
  whyOldCaption: 'Before：旧トップは一言の約束と無料パスのみ。店舗検索はさらに下にありました。',
  whyNewImgAlt: 'リニューアル後トップの2画面目。パーソナルトレーニングと紹介特典が並ぶ',
  whyNewCaption: 'After：同じトップの2画面目を具体的な2つのオファーに充て、そのまま店舗検索へ繋げます。',

  auditHeading: 'まず既存資産の棚卸し',
  auditP1:
    '旧サイトを棚卸しし終えるまで、デザインは一切始めませんでした。全ページについて URL、目的、コンバージョンの有無、引き継ぐに値する流入があるかを書き出す。このシートが、どのムードボードよりもリニューアルの形を決めました。',
  auditP2: '結果は4つに分かれました。',
  auditItem1Label: 'URL は維持し、ページは作り直す',
  auditItem1Desc: '——トップ、ピラティス、ウェルネス、ブログ。需要は本物、作りが間違っていた。',
  auditItem2Label: '内容は残し、置き場所を変える',
  auditItem2Desc:
    '——ブランドストーリー、ミッション、バリュー。独立ページではなく店舗ページと会社紹介の中にあるべきもの。',
  auditItem3Label: '丸ごと置き換える',
  auditItem3Desc: '——サービス一覧。検索エンジンのために存在し、会員には行動可能な情報を与えていなかったページ。',
  auditItem4Label: '廃止してリダイレクト',
  auditItem4Desc: '——流入も役割もないページは、同じ問いに答える新ページへ統合。',
  auditTipTitle: 'アートディレクションより先に棚卸し',
  auditTipText:
    'リニューアルはトップページから始めたくなります。誰もが意見を持っているからです。棚卸しから始めれば、新しいサイトマップは好みではなく説明できる根拠になります。',

  goalsHeading: '新サイトが果たすべき役割',
  goalsP1:
    '要件は5つの仕事に収束しました。それ以外のすべては、この5つに照らして自らを正当化する必要があり、かなりの数のページがそれに耐えられませんでした。',
  goalsItem1: '初来訪者が、法令上許される最小手数で無料パスを受け取れること。',
  goalsItem2: 'ブランドストーリーを読ませずに「どの店舗で、何があるのか」に答えること。',
  goalsItem3: '会員プランを一目で比較でき、価格は店舗ごとに示すこと。',
  goalsItem4: '既存会員がどのページからでもクラス予約と会員ポータルに到達できること。',
  goalsItem5: '旧ブログが積み上げた検索資産を、ゼロに戻さず引き継ぐこと。',
  goalsP2:
    'こう書き出した時点で、リニューアルは視覚の課題ではなくなりました。5つのうち4つは構造の問題——どのページが存在し、どう繋がるか——であり、見た目に関わるのは最初の1つだけでした。',

  iaHeading: '情報設計の作り直し',
  iaP1:
    '旧サイトは施設で自らを整理していました。ジム、ピラティス、グループトレーニング、バスケットボール、ウェルネス、リカバリー。それは事業の整理であって、訪問者の考え方ではありません。「グループトレーニングがしたい」と思って起きる人はおらず、強くなりたい、動きやすくなりたい、長く元気でいたいと思っているだけです。',
  iaP2:
    'そこで新しいプログラムのページは目的で切りました。ハイブリッドトレーニング、筋力、可動性、ロンジェビティ。各タイルに向いている人を明記し、それを実現するクラスとコーチングへ繋げます。施設が消えたわけではなく、本当に判断材料になる場所——各店舗のページ——へ移りました。',
  iaOldImgAlt: '旧 Housed のサービス一覧。サービスごとにカードが並ぶ',
  iaOldCaption: 'Before：検索エンジンにも会員にも向けたサービス一覧。施設ごとに1枚のカード。',
  iaNewImgAlt:
    'リニューアル後の目的別ページ。ハイブリッドトレーニング、筋力、可動性、ロンジェビティのタイル',
  iaNewCaption: 'After：同じ内容を目的で提示し、各タイルが「誰のためか」を明言します。',
  iaPtImgAlt: 'リニューアル後のパーソナルトレーニングのページ。実際のセッション風景',
  iaPtCaption:
    'パーソナルトレーニングは、コーチ紹介の羅列ではなく一文と実際のセッション映像で伝えます。',

  clubsHeading: '店舗ごとに1ページ',
  clubsP1:
    '最大の構造変更です。各店舗が専用ページを持ち、そこが広告流入の主な着地点になりました。ジムフロアではなくウェットエリアから始まる——Housed 同士の違いが最も出る場所だからです——追従サブナビで、概要・施設・クラス・アクセスをページ内で行き来できます。',
  clubsP2:
    '価格もこのページに置きました。会員価格は店舗ごとに異なるためです。会員プランのパネルは会員ページと同じものを、その店舗の数字で描画します。無料パスのフォームは画面下部に固定し、オファーが最後で待つのではなくスクロールに付いてきます。',
  clubsImgAlt: 'Macquarie Park のミネラルプールから始まる Housed 店舗ページ',
  clubsCaption: '各店舗は自分の施設から始まり、サブナビでページ全体が常に1スクロール圏内に収まります。',
  clubsPricingImgAlt: '店舗ページの会員プランパネルと、下部に固定された無料パスのバー',
  clubsPricingCaption: '価格は店舗ごとに描画し、無料パスのバーはスクロールに追従します。',
  clubsWellnessImgAlt:
    'サウナ、スチームルーム、ミネラルスパ、冷水浴、リカバリーゾーンを並べたウェルネス施設のグリッド',
  clubsWellnessCaption:
    'ウェルネス施設は「どの店舗に何があるか」を示す素直なグリッド。来訪者が実際に抱えている問いです。',

  membershipsHeading: '比較できる会員プラン',
  membershipsP1:
    '旧サイトは価格を並べ、新サイトは価格を比較させます。各プランに実際の写真、週額、含まれる内容を横並びで置いたので、ベースとピラティスをカード間でスクロールせずに一目で見比べられます。',
  membershipsP2:
    '同時に無料パスのフォームも削りました。氏名、メール、電話、希望店舗の4つだけを尋ね、何に同意したことになるのかをその場で明示します。規約に埋めるのではありません。このフォームから削った項目1つは、上のページのコピー修正より価値がありました。',
  membershipsImgAlt: '会員ページ。ベースとピラティスの各プランに写真、週額、含まれる内容',
  membershipsCaption: '各プランが「何を買うのか・週いくらか・何が含まれるか」を1行で示します。',
  membershipsFreePassImgAlt: '氏名・メール・電話・希望店舗を尋ねる無料パスのフォームと受付の写真',
  membershipsFreePassCaption:
    '4項目、明示された同意の一文、そしてボタン1つ——このオファーで許される最短経路です。',

  bookingHeading: '閲覧から予約へ',
  bookingP1:
    '旧サイトのタイムテーブルは「見るもの」でした。作り直したそれは予約システムそのものです。上部に1週間の日付、クラス種別と店舗のフィルター、各クラスに時間・コーチ・スタジオと、その場で予約できるボタン。',
  bookingP2:
    'ブラウザを使いたくない会員にはアプリのページと会員ポータルがあります。アプリのページは手に持った実機を見せ、何が置き換わるか——入館、クラスとウェルネスの予約、コーチング——を率直に述べます。ポータルはログイン・パスワード再設定・新規登録のための中央の1枚のカードで、下にストアのリンクを添えています。',
  bookingTimetableImgAlt: '1週間の日付、フィルター、各クラスの予約ボタンを備えた Housed のタイムテーブル',
  bookingTimetableCaption:
    'タイムテーブルは PDF ではなく予約フロー。種別と店舗で絞り込み、その場で予約します。',
  bookingAppImgAlt: '片手で持った Housed アプリを見せるアプリページ',
  bookingAppCaption: 'アプリページは機能一覧より先に「何が置き換わるか」を述べます。',
  bookingPortalImgAlt: '会員ポータルのログインカードと、その下の App Store・Google Play リンク',
  bookingPortalCaption:
    '既存会員に見えるのは1枚のカードだけ。ログイン、再設定、新規登録、そしてアプリへの入口。',

  journalHeading: 'コンテンツの移行',
  journalP1:
    '旧ブログはサイト内で唯一、本物の検索資産を持つ部分でした。だからこそ最も慎重に扱いました。全記事を slug のまま移し、公開日を保持し、カテゴリーも維持しました。カテゴリーはすでに人々の回遊手段だったからです。',
  journalP2:
    '変えたのは記事テンプレートです。長い記事には追従する目次、本文前のキーポイント欄、そして内容に応じた平易な注意書きを置きました。一般向けのトレーニング情報は「これは何でないか」を述べるべきです。結果として、要点だけ拾う読み方でも通読でも成立します。',
  journalOldImgAlt: 'カテゴリーで絞り込める旧 Housed ブログ一覧',
  journalOldCaption: 'Before：絞り込めるブログ一覧。各カードに読了時間と公開日。',
  journalNewImgAlt: 'トレーニング、栄養、ウェルネスを掲げるリニューアル後のジャーナル一覧',
  journalNewCaption: 'After：同じ記事群をラベルではなく約束の下に置き、カテゴリーはそのまま維持。',
  journalArticleImgAlt: '追従目次とキーポイント欄を備えたリニューアル後の記事ページ',
  journalArticleCaption:
    '記事テンプレート：左に目次、本文前に要点、必要な主題には注意書き。',

  migrationHeading: '切り替え作業',
  migrationP1:
    'URL を失うリニューアルはリニューアルではなく、再ローンチです。そして再ローンチは検索においてゼロからのやり直しを意味します。URL のマッピングはページを1枚も作る前に終えました。地味で、いちばん価値のある工程です。',
  migrationP2: 'うまくいった順序は次のとおりです。',
  migrationStep1Label: '旧 URL を1つずつ新 URL へ対応させる',
  migrationStep1Desc:
    '——1ページ1行、行き先のないページを残さない。廃止ページは同じ問いに答える新ページへ。トップに丸投げはしません。',
  migrationStep2Label: '一時ではなく恒久リダイレクト',
  migrationStep2Desc: '——移動したものはすべて 301。評価が宙に浮かず、コンテンツに付いて動きます。',
  migrationStep3Label: 'メタデータはページと一緒に作り直す',
  migrationStep3Desc:
    '——タイトル、ディスクリプション、canonical、Open Graph カードをページごとに。共通カード1枚では、どのリンクも同じプレビューになります。',
  migrationStep4Label: 'サイトマップはルートから生成',
  migrationStep4Desc: '——ルート表から導出するので、新店舗ページが公開済みなのに未掲載という状態が起きません。',
  migrationStep5Label: '画像を変換する',
  migrationStep5Desc:
    '——スクリーンショットと写真は、レイアウトが実際に使うサイズで WebP に再エンコード。両サイトのページ重量差の大半はここです。',
  migrationStep6Label: '見るのは新 URL ではなく旧 URL',
  migrationStep6Desc:
    '——切り替え後に意味があるのは、旧パスの 404 とリダイレクト連鎖のレポートです。移行が静かに失敗するのはそこです。',
  migrationTipTitle: 'リダイレクト表はリポジトリに置く',
  migrationTipText:
    '表計算ソフトの中のリダイレクト表は、誰かがページ名を変えた瞬間に古くなります。ルート表の隣に置けばテストでき、抜けは訪問者ではなくビルドが検知します。',

  takeawaysHeading: '次も必ずやること',
  takeawaysP1: 'このプロジェクトを支えたのは4つで、どれも視覚的なことではありません。',
  takeawaysItem1: '棚卸しを先に。棚卸しがサイトマップを決め、サイトマップがデザインを決めました。',
  takeawaysItem2: '役割を文章にする。5つの文が、どのモックアップよりも多くの議論を終わらせました。',
  takeawaysItem3:
    '表層より構造。5つの役割のうち4つは「どのページが存在し、どう繋がるか」で解決しました。',
  takeawaysItem4: 'URL を守る。すでに順位のあるコンテンツは、新サイトが得られる最も安い流入です。',
  takeawaysP2:
    'ビジュアルの言語も重要です。新サイトはより静かで、エディトリアルで、写真の邪魔をしません。ただし成果が出ている理由は、訪問者が店舗を見つけ、価格を確かめ、クラスを予約するまでに、頼んでもいない文章を1段落も読まずに済むようになったことです。',
};

export default { en, 'zh-Hans': zhHans, 'zh-Hant': zhHant, ja };
