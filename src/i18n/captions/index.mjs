// Per-image case study captions, one entry per gallery screenshot.
//
// Authored project by project rather than language by language: a caption only
// makes sense next to the image it describes, and keeping all four languages of
// one caption together is what makes them reviewable. The four language-major
// dictionaries the context expects are assembled at the bottom.
//
// Arrays are index-aligned with each project's `gallery` in Data.jsx — a test
// keeps the two the same length. Product, brand and UI names stay in their
// original form.

// Takeaway System
const takeaway = {
  en: [
    'The staff dashboard for menu management. Every dish is listed with its photo, category, price, on-sale status and last edit time, and can be searched, edited or pulled from the menu in place.',
  ],
  'zh-Hans': [
    '后台的菜品管理页面。每道菜都列出图片、分类、价格、售卖状态与最近修改时间，可直接搜索、编辑或下架。',
  ],
  'zh-Hant': [
    '後台的菜品管理頁面。每道菜都列出圖片、分類、價格、販售狀態與最近修改時間，可直接搜尋、編輯或下架。',
  ],
  ja: [
    'スタッフ向けのメニュー管理画面。各料理を写真・カテゴリー・価格・販売状態・最終更新時刻とともに一覧表示し、その場で検索・編集・掲載停止ができます。',
  ],
};

// Sociopedia
const sociopedia = {
  en: [
    'The main feed. A profile summary and linked social accounts sit on the left, the composer and post stream run down the middle, and sponsored content plus a friends list fill the right rail.',
  ],
  'zh-Hans': [
    '主信息流页面。左侧是个人资料与已绑定的社交账号，中间是发布框与动态流，右侧则是推广内容与好友列表。',
  ],
  'zh-Hant': [
    '主資訊流頁面。左側是個人資料與已綁定的社群帳號，中間是發文框與動態牆，右側則是推廣內容與好友列表。',
  ],
  ja: [
    'メインのフィード画面。左にプロフィールと連携済みのソーシャルアカウント、中央に投稿フォームとタイムライン、右に広告枠と友達リストを配置しています。',
  ],
};

// Gym (EVOGYM)
const gym = {
  en: [
    'The landing page hero. An oversized "EVOLVE" wordmark sits behind the pitch and its sign-up button, with press logos immediately below as social proof.',
  ],
  'zh-Hans': [
    '落地页首屏。超大的 "EVOLVE" 字标衬在文案与注册按钮之后，下方紧接媒体标识以增强说服力。',
  ],
  'zh-Hant': [
    '著陸頁首屏。超大的 "EVOLVE" 字標襯在文案與註冊按鈕之後，下方緊接媒體標誌以增強說服力。',
  ],
  ja: [
    'ランディングページのヒーロー部分。大きな "EVOLVE" のワードマークをコピーと登録ボタンの背面に置き、その下にメディア掲載ロゴを並べて信頼感を補強しています。',
  ],
};

// iCase
const icase = {
  en: [
    'The storefront hero for a custom phone case shop. The pitch, the guarantees — durable material, a five-year print guarantee, support for current iPhone models — and a preview of a customer photo printed on a case all sit above the fold.',
  ],
  'zh-Hans': [
    '定制手机壳店铺的首屏。卖点文案、三项承诺（耐用材质、五年印刷质保、支持主流 iPhone 机型）以及照片印在手机壳上的预览效果，全部呈现在首屏之内。',
  ],
  'zh-Hant': [
    '客製化手機殼商店的首屏。賣點文案、三項承諾（耐用材質、五年印刷保固、支援主流 iPhone 機型）以及照片印在手機殼上的預覽效果，全部呈現在首屏之內。',
  ],
  ja: [
    'オリジナルスマホケース店のヒーロー部分。訴求コピー、3つの保証（耐久素材・5年間のプリント保証・最新 iPhone 対応）、そして写真をケースにプリントしたプレビューをファーストビューに収めています。',
  ],
};

// iDesign - Ecommerce
const idesign = {
  en: [
    'A full-bleed seasonal campaign slider opens the store, and a featured products grid follows underneath with category tabs, so shoppers can switch ranges without leaving the page.',
  ],
  'zh-Hans': [
    '店铺以整屏的季节性促销轮播开场，下方是精选商品网格，并配有分类标签，让顾客无需离开页面即可切换品类。',
  ],
  'zh-Hant': [
    '商店以整屏的季節性促銷輪播開場，下方是精選商品網格，並配有分類標籤，讓顧客無需離開頁面即可切換品類。',
  ],
  ja: [
    '全幅のシーズンキャンペーンスライダーで店舗が始まり、その下に注目商品のグリッドとカテゴリータブを配置。ページを離れずに商品カテゴリーを切り替えられます。',
  ],
};

// EarRelief
const earrelief = {
  en: [
    'The homepage hero rotates through the clinic services — here, hearing assessments — while the phone number and online booking button stay in the header. Four trust markers sit directly beneath: expert team, evidence-based treatment, holistic care, convenience.',
  ],
  'zh-Hans': [
    '首页轮播依次介绍诊所服务，此处为听力评估，电话与在线预约按钮则常驻页头。下方紧接四项信任要素：专业团队、循证治疗、整体照护与就诊便利。',
  ],
  'zh-Hant': [
    '首頁輪播依序介紹診所服務，此處為聽力評估，電話與線上預約按鈕則常駐頁首。下方緊接四項信任要素：專業團隊、實證治療、整體照護與就診便利。',
  ],
  ja: [
    'トップページのヒーローはクリニックのサービスを順に紹介し（この画面は聴力検査）、電話番号とオンライン予約ボタンはヘッダーに常設。その直下に「専門チーム・根拠に基づく治療・ホリスティックケア・通いやすさ」の4つの安心材料を並べています。',
  ],
};

// Housed
const housed = {
  en: [
    'The homepage. A single promise — your home for everything fitness — over a shot of the gym floor, with the free pass offer carried in oversized type and split into two paths: claim it now, or find a club first.',
    'The Pilates page opens on the reformer studio and the weekly price, then drops straight into the club finder, where each location comes with its address and a map.',
    'Programming is framed as goals rather than equipment: hybrid training, strength, mobility and longevity, each with the kind of member it suits.',
    'The wellness pages have a sub-navigation of their own — traditional and infrared saunas, mineral spa, cold plunge — because recovery is sold as a membership in its own right.',
    'The services index, written for search as much as for members: gym, Pilates, group training, basketball, wellness and recovery, each card listing what the membership actually includes.',
    'The about page carries the long-form brand story, then splits mission and values into their own panels so neither gets lost in the prose.',
    'The blog is filterable by category — fitness, Pilates, wellness, recovery, nutrition, basketball — and every card shows its read time and publication date up front.',
    'The partnerships page pitches brands directly: what a collaboration can look like, a media kit to download, and the logos of partners already on board.',
    'The ambassador page states what the brand stands for, then reduces applying to three steps: film a session, post it with the tag, submit the form.',
  ],
  'zh-Hans': [
    '首页。健身房实景之上只有一句承诺——健身所需，尽在于此——免费体验券以超大字体呈现，并分成两条路径：立即领取，或先找到附近门店。',
    '普拉提页面以器械教室与每周价格开场，随后直接进入门店查询，每个门店都附有地址与地图。',
    '课程体系以目标而非器械来划分：混合训练、力量、灵活性与长寿健康，并说明各自适合的人群。',
    '康养页面拥有独立的子导航——传统桑拿、红外桑拿、矿物泉与冷水浴——因为恢复本身就是一项单独的会籍。',
    '服务总览页同时面向搜索引擎与会员：健身、普拉提、团课、篮球、康养与恢复，每张卡片都列出会籍的实际内容。',
    '关于页面承载完整的品牌故事，并将使命与价值观分置于独立版块，避免淹没在长文之中。',
    '博客可按分类筛选——健身、普拉提、康养、恢复、营养与篮球——每张卡片都在显眼处标出阅读时长与发布日期。',
    '合作页面直接面向品牌方：说明合作形式，提供媒体资料包下载，并展示已合作品牌的标识。',
    '大使页面先阐明品牌主张，再把申请流程简化为三步：拍下一次训练、带标签发布、提交表单。',
  ],
  'zh-Hant': [
    '首頁。健身房實景之上只有一句承諾——健身所需，盡在於此——免費體驗券以超大字體呈現，並分成兩條路徑：立即領取，或先找到附近門店。',
    '皮拉提斯頁面以器械教室與每週價格開場，隨後直接進入門店查詢，每個門店都附有地址與地圖。',
    '課程體系以目標而非器材來劃分：混合訓練、力量、活動度與長壽健康，並說明各自適合的族群。',
    '康養頁面擁有獨立的子導覽——傳統桑拿、紅外線桑拿、礦物浴池與冷水浴——因為恢復本身就是一項單獨的會籍。',
    '服務總覽頁同時面向搜尋引擎與會員：健身、皮拉提斯、團課、籃球、康養與恢復，每張卡片都列出會籍的實際內容。',
    '關於頁面承載完整的品牌故事，並將使命與價值觀分置於獨立區塊，避免淹沒在長文之中。',
    '部落格可依分類篩選——健身、皮拉提斯、康養、恢復、營養與籃球——每張卡片都在顯眼處標出閱讀時長與發布日期。',
    '合作頁面直接面向品牌方：說明合作形式，提供媒體資料包下載，並展示已合作品牌的標誌。',
    '大使頁面先闡明品牌主張，再把申請流程簡化為三步：拍下一次訓練、帶標籤發布、提交表單。',
  ],
  ja: [
    'トップページ。ジムフロアの写真の上に「フィットネスのすべてがここに」という約束を一言だけ置き、無料パスを大きな文字で訴求。「今すぐ受け取る」と「まず店舗を探す」の2経路に分岐させています。',
    'ピラティスのページはリフォーマースタジオと週額料金で始まり、そのまま店舗検索へ。各店舗に住所と地図を添えています。',
    'プログラムは器具ではなく目的で分類：ハイブリッドトレーニング、筋力、可動性、ロンジェビティ。それぞれどんな人に向くかを併記しています。',
    'ウェルネス関連ページには独自のサブナビ（伝統サウナ・赤外線サウナ・ミネラルスパ・冷水浴）を用意。リカバリーを独立した会員プランとして扱っているためです。',
    'サービス一覧は会員にも検索エンジンにも向けた構成。ジム、ピラティス、グループトレーニング、バスケットボール、ウェルネス、リカバリーの各カードに会員特典の中身を明記しています。',
    'アバウトページは長文のブランドストーリーを掲載しつつ、ミッションとバリューを別パネルに分けて埋もれないようにしています。',
    'ブログはカテゴリー（フィットネス・ピラティス・ウェルネス・リカバリー・栄養・バスケットボール）で絞り込み可能。各カードに読了時間と公開日を先に表示します。',
    'パートナーシップのページはブランド向けの提案そのもの。協業の形、ダウンロードできるメディアキット、既存パートナーのロゴを並べています。',
    'アンバサダーページではブランドの姿勢を示したうえで、応募を3ステップ（トレーニングを撮る、タグ付きで投稿する、フォームを送る）に単純化しています。',
  ],
};

// Onsen
const onsen = {
  en: [
    'The homepage sets the tone before it sells anything: a dark, seasonal image, the mark, and a single line of copy, with the brand story and the waitlist sign-up held back until further down the page.',
    'The personal training page pairs an editorial write-up with the training floor itself, then lays coaching packages out side by side so the weekly commitment and what each includes can be compared at a glance.',
  ],
  'zh-Hans': [
    '首页先立调性，再谈销售：深色的季节性影像、品牌标识与一行文案，品牌故事与候补名单登记则留到页面更下方。',
    '私教页面将编辑式的介绍与训练场地实景并置，随后横向排列各档教练方案，让每周训练频次与包含内容一目了然。',
  ],
  'zh-Hant': [
    '首頁先立調性，再談銷售：深色的季節性影像、品牌標誌與一行文案，品牌故事與候補名單登記則留到頁面更下方。',
    '私人教練頁面將編輯式的介紹與訓練場地實景並置，隨後橫向排列各檔教練方案，讓每週訓練頻次與包含內容一目了然。',
  ],
  ja: [
    'トップページは売り込みの前にトーンを決めます。暗く季節感のあるビジュアル、ロゴ、そして一行のコピー。ブランドストーリーとウェイトリスト登録はページ下部に回しています。',
    'パーソナルトレーニングのページは、読み物としての紹介文とトレーニングフロアの実景を並置。その下にコーチングプランを横並びにし、週あたりの頻度と含まれる内容を一目で比較できるようにしています。',
  ],
};

// Simba Education
const simbaEducation = {
  en: [
    'The homepage leads with the current offer — a three-day subsidised care guarantee — set inside organic photo shapes of children and educators rather than a conventional grid.',
    'The careers page is written as an invitation rather than a job board, describing the Reggio Emilia-inspired approach before linking through to current vacancies.',
    'Each centre gets its own page, opening on the suburb by name so local searches land somewhere specific, with tour and enquiry buttons above a facilities gallery.',
  ],
  'zh-Hans': [
    '首页以当前活动开场——三天补贴托育保障——并以有机形状的照片拼贴呈现孩子与教师，而非常规的方格布局。',
    '招聘页面写成一封邀请函而非职位列表，先介绍受瑞吉欧启发的教育理念，再引导至在招职位。',
    '每家园所都有独立页面，以所在城区名称开场，让本地搜索能落到具体地点，参观与咨询按钮置于设施相册之上。',
  ],
  'zh-Hant': [
    '首頁以當前活動開場——三天補助托育保障——並以有機形狀的照片拼貼呈現孩子與教師，而非常規的方格版面。',
    '徵才頁面寫成一封邀請函而非職缺列表，先介紹受瑞吉歐啟發的教育理念，再引導至在徵職缺。',
    '每家園所都有獨立頁面，以所在地區名稱開場，讓在地搜尋能落到具體地點，參觀與諮詢按鈕置於設施相簿之上。',
  ],
  ja: [
    'トップページは現在のキャンペーン（3日間の補助付き保育保証）を前面に出し、通常のグリッドではなく有機的な形に切り抜いた子どもと保育者の写真の中に配置しています。',
    '採用ページは求人一覧というより招待状として書かれており、レッジョ・エミリアに着想を得た方針を伝えたうえで募集職種へ誘導します。',
    '各園に独立したページを用意し、地域名を冒頭に置くことでローカル検索の受け皿に。見学・問い合わせボタンを施設ギャラリーの上に配置しています。',
  ],
};

// Simba Education - custom rebuild
const simbaEduNew = {
  en: [
    'The homepage gives the whole hero to one timely message — make-up days for public holidays — with a single enquiry button rather than a row of competing calls to action.',
    'Every centre page names its suburb in the heading, then goes straight to the facilities gallery and the detail parents actually ask about: dietitian-approved meals, language, sport and art therapy programs.',
    'The centres index lists all five locations as photo cards, including the one still in development, so a family in the wrong suburb can see what is coming rather than bounce.',
    'The educational philosophy is illustrated rather than written out: each belief — the hundred languages of children, the environment as the third teacher — gets its own drawing down a vertical thread.',
    'The programs page explains the Reggio Emilia approach in plain language, on the organic green shapes that carry the brand through the whole site.',
    'The parent portal opens on live counts of upcoming events, locations and available resources, above a searchable, tagged resource library.',
  ],
  'zh-Hans': [
    '首页把整个首屏留给一条时效性信息——公共假期可补托育日——并只保留一个咨询按钮，而非并列多个互相竞争的行动号召。',
    '每个园所页面都在标题中写明所在城区，随后直接进入设施相册与家长真正关心的细节：营养师审核的餐食，以及语言、体育与艺术治疗课程。',
    '园所总览以照片卡片列出全部五个地点，包括仍在筹备中的一个，让所在城区尚未开园的家庭知道后续规划，而不是直接离开。',
    '教育理念以插画而非长文呈现：每一条信念——儿童的一百种语言、环境是第三位老师——都沿着纵向脉络配有独立插图。',
    '课程页面用平实的语言解释瑞吉欧教育法，并延续贯穿全站的有机绿色形状。',
    '家长门户以近期活动、园所数量与可用资源的实时计数开场，下方是可搜索、带标签的资源库。',
  ],
  'zh-Hant': [
    '首頁把整個首屏留給一條時效性訊息——國定假日可補托育日——並只保留一個諮詢按鈕，而非並列多個互相競爭的行動呼籲。',
    '每個園所頁面都在標題中寫明所在地區，隨後直接進入設施相簿與家長真正關心的細節：營養師審核的餐食，以及語言、體育與藝術治療課程。',
    '園所總覽以照片卡片列出全部五個據點，包括仍在籌備中的一個，讓所在地區尚未開園的家庭知道後續規劃，而不是直接離開。',
    '教育理念以插畫而非長文呈現：每一條信念——兒童的一百種語言、環境是第三位老師——都沿著縱向脈絡配有獨立插圖。',
    '課程頁面用平實的語言解釋瑞吉歐教育法，並延續貫穿全站的有機綠色形狀。',
    '家長入口以近期活動、園所數量與可用資源的即時計數開場，下方是可搜尋、帶標籤的資源庫。',
  ],
  ja: [
    'トップページはヒーロー全体を一つの旬な訴求（祝日分の振替保育）に充て、CTA を並べずに問い合わせボタン1つに絞っています。',
    '各園のページは見出しに地域名を明記し、そのまま施設ギャラリーと保護者が本当に知りたい情報へ。栄養士監修の給食、語学・スポーツ・アートセラピーのプログラムを掲載しています。',
    '園一覧は5拠点すべてを写真カードで掲載。開園準備中の園も載せることで、近隣にまだ園がない家庭にも今後の予定が伝わります。',
    '教育理念は長文ではなくイラストで表現。「子どもの100の言葉」「環境は third teacher」といった信念ごとに、縦の流れに沿った絵を添えています。',
    'プログラムページはレッジョ・エミリア・アプローチを平易な言葉で解説し、サイト全体を貫く有機的なグリーンの図形で統一しています。',
    '保護者ポータルは、開催予定のイベント数・園数・利用可能な資料数のカウントで始まり、その下に検索とタグ付きの資料ライブラリを備えています。',
  ],
};

// Simba Education - redesign
const simbaEduRedesign = {
  en: [
    'The redesigned homepage puts the number first: daily rate, what it includes and the subsidy, right under the headline, with a fee calculator sitting beside the tour booking. A strip of proof points — reviews, centre count, approvals — follows immediately.',
    'The story page splits the brand into three claims a parent can scan — philosophy, promise, commitment — instead of one long block of history.',
    'The centres page is a live map rather than a list, because the question being asked is which centre is near me, not how many are there.',
    'Programs are organised by age band — nursery, toddler, preschool — so parents self-select in one step instead of reading through a curriculum document.',
    'The parent hub gathers the app, upcoming events, daily snapshots, enrolment forms and useful links behind one sub-navigation, with events filterable by centre.',
  ],
  'zh-Hans': [
    '改版后的首页把数字放在最前：日托费用、包含内容与补贴比例都紧随标题，费用计算器与预约参观并列。紧接着是一条佐证信息带——评分、园所数量与资质认证。',
    '品牌故事页把品牌拆成家长可快速浏览的三项主张——理念、承诺与责任——而不是一整段冗长的沿革。',
    '园所页面用交互地图取代列表，因为家长真正想问的是「哪一家离我近」，而不是「一共有几家」。',
    '课程按年龄段组织——托婴、幼儿与学前——让家长一步就能对号入座，而不必通读整份课程文件。',
    '家长中心把应用、近期活动、每日动态、报名表单与常用链接收拢在同一组子导航之下，活动还可按园所筛选。',
  ],
  'zh-Hant': [
    '改版後的首頁把數字放在最前：日托費用、包含內容與補助比例都緊隨標題，費用試算與預約參觀並列。緊接著是一條佐證資訊帶——評分、園所數量與資格認證。',
    '品牌故事頁把品牌拆成家長可快速瀏覽的三項主張——理念、承諾與責任——而不是一整段冗長的沿革。',
    '園所頁面用互動地圖取代列表，因為家長真正想問的是「哪一家離我近」，而不是「一共有幾家」。',
    '課程依年齡層組織——托嬰、幼兒與學前——讓家長一步就能對號入座，不必通讀整份課程文件。',
    '家長中心把應用程式、近期活動、每日動態、報名表單與常用連結收攏在同一組子導覽之下，活動還可依園所篩選。',
  ],
  ja: [
    'リニューアル後のトップページは数字を先に出します。見出しのすぐ下に日額料金・含まれるもの・補助率を置き、見学予約の隣に料金シミュレーターを配置。続けて評価・園数・認可などの裏付けを帯状に並べています。',
    'ストーリーページはブランドを、保護者がざっと読める3つの主張（理念・約束・コミットメント）に分解。長い沿革の代わりにしています。',
    '園のページは一覧ではなく地図。問われているのは「何園あるか」ではなく「近くにどの園があるか」だからです。',
    'プログラムは年齢帯（乳児・幼児・就学前）で整理し、カリキュラム全文を読まなくても1ステップで自分に合う区分を選べるようにしています。',
    'ペアレントハブはアプリ、開催予定イベント、日々の記録、入園フォーム、便利なリンクを1つのサブナビにまとめ、イベントは園ごとに絞り込めます。',
  ],
};

// Simba Health - original site
const simbaHealthOriginal = {
  en: [
    'The homepage puts prices in the hero rather than behind an enquiry form: appointment length and cost for each discipline, on translucent cards over the clinic itself.',
    'Conditions are listed the way patients describe them — coccyx pain, heel pain, headaches — each with a line drawing and a short explanation of what treatment involves.',
    'The services index is set as a plain stacked list over a single photograph, so the six disciplines read in one pass instead of competing as cards.',
    'A dedicated pricing page states the reasoning as well as the numbers: healthcare in Australia is expensive, and the fees are published in full rather than quoted on request.',
    'The locations page pairs every clinic address, email and phone number with a map, so the nearest one is obvious without reading three blocks of text.',
    'Audiology gets its own landing page, led by the free consultation and a banner offering a hearing aid demo and screening at no cost.',
    'The podiatry page repeats the pricing pattern for its own appointment types, including the biomechanical assessment, before making the case for the clinic.',
    'The DEXA scan page argues its point in the headline — see what the scale cannot — over a photo of an actual result screen, with booking and a demo video side by side.',
  ],
  'zh-Hans': [
    '首页把价格放在首屏，而不是藏在咨询表单之后：各科别的就诊时长与费用，以半透明卡片叠加在诊所实景之上。',
    '病症以患者自己的说法列出——尾骨疼痛、足跟疼痛、头痛——每一项都配有线描插图与简短的治疗说明。',
    '服务总览以单张照片上的纵向文字列表呈现，六个科别一眼读完，而不必在多张卡片间比较。',
    '独立的价格页面不只给出数字，也说明理由：澳大利亚的医疗费用高昂，因此收费全部公开，而非需要询价。',
    '门店页面把每家诊所的地址、邮箱与电话与地图并列，无需读完三段文字就能看出哪家最近。',
    '听力科拥有独立的落地页，以免费咨询为主线，并以横幅提供免费的助听器体验与听力筛查。',
    '足病科页面沿用同样的价格呈现方式，涵盖各类就诊类型（含生物力学评估），随后再阐述选择该诊所的理由。',
    'DEXA 体成分扫描页面直接用标题给出论点——体重秤看不到的部分——背景是真实的检测结果界面，预约与演示视频并排放置。',
  ],
  'zh-Hant': [
    '首頁把價格放在首屏，而不是藏在諮詢表單之後：各科別的就診時長與費用，以半透明卡片疊加在診所實景之上。',
    '病症以病患自己的說法列出——尾骨疼痛、足跟疼痛、頭痛——每一項都配有線描插圖與簡短的治療說明。',
    '服務總覽以單張照片上的縱向文字列表呈現，六個科別一眼讀完，不必在多張卡片間比較。',
    '獨立的價格頁面不只給出數字，也說明理由：澳洲的醫療費用高昂，因此收費全部公開，而非需要詢價。',
    '據點頁面把每家診所的地址、電子郵件與電話與地圖並列，無需讀完三段文字就能看出哪家最近。',
    '聽力科擁有獨立的著陸頁，以免費諮詢為主線，並以橫幅提供免費的助聽器體驗與聽力篩檢。',
    '足病科頁面沿用同樣的價格呈現方式，涵蓋各類就診類型（含生物力學評估），隨後再闡述選擇該診所的理由。',
    'DEXA 體組成掃描頁面直接用標題給出論點——體重計看不到的部分——背景是真實的檢測結果畫面，預約與示範影片並排放置。',
  ],
  ja: [
    'トップページは料金を問い合わせフォームの奥ではなくヒーローに配置。診療科ごとの所要時間と費用を、院内写真の上の半透明カードで示しています。',
    '症状は患者自身の言葉で並べます（尾骨の痛み、かかとの痛み、頭痛など）。それぞれに線画と、治療内容の短い説明を添えています。',
    'サービス一覧は1枚の写真の上に文字を積んだ素直なリスト。6つの診療科がカードで競合せず、ひと目で読み通せます。',
    '料金専用ページは数字だけでなく理由も明示します。オーストラリアの医療費は高い——だから見積り依頼ではなく、料金を全面公開しています。',
    '拠点ページは各院の住所・メール・電話を地図と並べ、3つの説明文を読まなくても最寄りが分かるようにしています。',
    'オージオロジーには専用のランディングページを用意し、無料相談を軸に、補聴器のデモと聴力スクリーニングを無料で提供するバナーを添えています。',
    'ポダイアトリーのページも同じ料金の見せ方を踏襲し、バイオメカニクス評価を含む各種診療タイプを提示したうえで、選ばれる理由を説明します。',
    'DEXA 検査のページは見出しで主張を出し切ります（体重計では分からないもの）。背景は実際の測定結果画面で、予約とデモ動画を横並びに配置しています。',
  ],
};

// Simba Health - redesign
const simbaHealthRedesign = {
  en: [
    'The rebuilt homepage answers the two ways people arrive — knowing the service they want, or only the symptom — with a route for each, and lifts the symptom shortcuts into the navigation itself. The strip beneath handles the questions that would otherwise become phone calls: rebates accepted, fees published, same-day availability, no referral needed.',
    'Each service page carries its own price card and booking button in the hero, then breaks the conditions it treats into tabs. The booking bar stays docked to the bottom of the screen as you read.',
    'The journal is built as a searchable library rather than a reverse-chronological blog, filtered by topic and by how much time the reader has.',
    'Booking runs as a stepped modal — service, location, time, details, confirm — over the fees page, and opens with a way out for patients who do not know which discipline they need.',
  ],
  'zh-Hans': [
    '重建后的首页对应两类访客——已知想要的服务，或只知道症状——分别给出入口，并把症状快捷入口直接提升到导航栏。下方的信息带解决了那些原本会变成来电的问题：可用的医保报销、公开的收费、当日可约、无需转诊。',
    '每个服务页面都在首屏内置价格卡与预约按钮，随后以标签页拆分可治疗的病症。阅读过程中，预约条始终停靠在屏幕底部。',
    '健康专栏做成可搜索的文章库，而非按时间倒序的博客，可按主题以及读者可用的时间长短筛选。',
    '预约以分步弹窗完成——选择服务、地点、时间、填写资料、确认——叠加在费用页面之上，并为不确定该看哪一科的患者提供了出口。',
  ],
  'zh-Hant': [
    '重建後的首頁對應兩類訪客——已知想要的服務，或只知道症狀——分別給出入口，並把症狀捷徑直接提升到導覽列。下方的資訊帶解決了那些原本會變成來電的問題：可用的健保給付、公開的收費、當日可約、無需轉診。',
    '每個服務頁面都在首屏內建價格卡與預約按鈕，隨後以標籤頁拆分可治療的病症。閱讀過程中，預約列始終停靠在螢幕底部。',
    '健康專欄做成可搜尋的文章庫，而非依時間倒序的部落格，可依主題以及讀者可用的時間長短篩選。',
    '預約以分步彈窗完成——選擇服務、地點、時間、填寫資料、確認——疊加在費用頁面之上，並為不確定該看哪一科的病患提供了出口。',
  ],
  ja: [
    '再構築したトップページは、来訪の2パターン（受けたい診療が決まっている／症状しか分からない）に別々の導線を用意し、症状ショートカット自体をナビゲーションに引き上げました。その下の帯は、電話問い合わせになりがちな疑問（各種給付の対応、料金の公開、当日予約、紹介状不要）に先回りして答えます。',
    '各サービスページはヒーロー内に料金カードと予約ボタンを備え、対応症状をタブで整理。読み進める間も予約バーが画面下部に固定されます。',
    'ジャーナルは時系列のブログではなく検索可能なライブラリとして構築し、トピックと読む時間の長さで絞り込めます。',
    '予約は料金ページ上のステップ式モーダル（サービス→拠点→日時→情報入力→確認）で完結し、どの診療科か分からない人向けの逃げ道を最初に用意しています。',
  ],
};

// Simba Hearing
const simbaHearing = {
  en: [
    'The homepage sells the outcome rather than the hardware: a family dinner, heard properly. Independence is the argument underneath — care tailored to a life, not to one manufacturer\'s catalogue.',
    'Services are framed as a hearing health service rather than a single test, with the full assessment highlighted among screening, wax removal and custom ear plugs.',
    'Because the clinic is independent, the product page can carry devices from four manufacturers side by side, each with its own strengths and a demo booking.',
    'The patient journey is laid out as a numbered path — free walk-in screen, full consultation, then a personalised prescription — so the commitment at each step is clear before booking.',
  ],
  'zh-Hans': [
    '首页售卖的是结果而非硬件：一顿听得真切的家庭晚餐。其下的论据是独立性——为一种生活方式定制的照护，而非某一家厂商的产品目录。',
    '服务被定位为完整的听力健康服务，而非一次单独的检查；在听力筛查、耵聍清理与定制耳塞之中，重点突出全面听力评估。',
    '正因为诊所独立于厂商，产品页面得以并列呈现四家厂商的设备，各自标明特点并可预约试戴。',
    '就诊流程以编号路径呈现——免费到店筛查、完整咨询评估，再到个性化助听方案——让每一步的投入在预约前就一目了然。',
  ],
  'zh-Hant': [
    '首頁販售的是結果而非硬體：一頓聽得真切的家庭晚餐。其下的論據是獨立性——為一種生活方式量身打造的照護，而非某一家廠商的產品目錄。',
    '服務被定位為完整的聽力健康服務，而非一次單獨的檢查；在聽力篩檢、耳垢清理與客製耳塞之中，重點突出全面聽力評估。',
    '正因為診所獨立於廠商，產品頁面得以並列呈現四家廠商的設備，各自標明特點並可預約試戴。',
    '就診流程以編號路徑呈現——免費到店篩檢、完整諮詢評估，再到個人化助聽方案——讓每一步的投入在預約前就一目了然。',
  ],
  ja: [
    'トップページが売るのは機器ではなく結果です。家族の食卓がきちんと聞こえること。その根拠が独立性——特定メーカーのカタログではなく、その人の生活に合わせたケアです。',
    'サービスは単発の検査ではなく「聴こえの健康サービス」として提示。スクリーニング、耳垢除去、オーダーメイド耳栓と並べたうえで、精密聴力評価を強調しています。',
    'メーカーから独立しているからこそ、製品ページに4社の機器を並べ、それぞれの特長と試聴予約を掲載できます。',
    '受診の流れは番号付きの導線で提示。無料の来店スクリーニング、精密相談、そして一人ひとりに合わせた補聴器の処方まで、予約前に各段階の負担が分かります。',
  ],
};

// Airbest
const airbest = {
  en: [
    'The homepage argues availability, not range: parts on the shelf, jobs on schedule. The numbers under the pitch are the ones a tradesperson actually checks — lines in stock, years trading, brands carried, and the hours the counter is open.',
    'The catalogue is scoped to what is physically on the shelf right now, filterable by category, with stock state on every card. The whole site runs in English and Chinese.',
    'A section spells out what the trade counter does rather than assuming it is obvious, and the authorised-dealer logos answer the next question — whether the brand on the job is carried here.',
    'The contact page treats trading hours as primary information: a map, the address, and the full day-by-day hours table, because arriving to a closed counter is the failure case.',
    'Roles are posted as full listings — counter sales, warehouse, delivery — each with its actual duties and requirements rather than a generic invitation to send a resume.',
  ],
  'zh-Hans': [
    '首页强调的是「有货」而非「品类多」：货架上有件，工期不误。文案下方的数字正是师傅真正会看的几项——在库品项、经营年数、代理品牌数，以及交易柜台的营业时间。',
    '产品目录只收录此刻确实在货架上的商品，可按类别筛选，每张卡片都标明库存状态。整站提供中英双语。',
    '专门用一个版块讲清交易柜台到底提供哪些服务，而不假定顾客已经知道；授权经销品牌的标识则回答了下一个问题——手上这台机器的品牌这里有没有配件。',
    '联系页面把营业时间当作首要信息：地图、地址，以及逐日列出的完整营业时间表——毕竟白跑一趟、柜台已关门才是最糟的情况。',
    '招聘以完整职位形式发布——柜台销售、仓库、配送——各自列明实际职责与要求，而不是笼统地邀请投递简历。',
  ],
  'zh-Hant': [
    '首頁強調的是「有貨」而非「品類多」：貨架上有件，工期不誤。文案下方的數字正是師傅真正會看的幾項——在庫品項、經營年數、代理品牌數，以及交易櫃檯的營業時間。',
    '產品目錄只收錄此刻確實在貨架上的商品，可依類別篩選，每張卡片都標明庫存狀態。全站提供中英雙語。',
    '專門用一個區塊講清交易櫃檯到底提供哪些服務，而不假定顧客已經知道；授權經銷品牌的標誌則回答了下一個問題——手上這台機器的品牌這裡有沒有零件。',
    '聯絡頁面把營業時間當作首要資訊：地圖、地址，以及逐日列出的完整營業時間表——畢竟白跑一趟、櫃檯已關門才是最糟的情況。',
    '徵才以完整職缺形式發布——櫃檯銷售、倉庫、配送——各自列明實際職責與要求，而不是籠統地邀請投遞履歷。',
  ],
  ja: [
    'トップページが訴えるのは品揃えではなく在庫です（棚に部品を、工期どおりに）。コピーの下の数字は、職人が実際に確認する項目——在庫品目数、営業年数、取扱ブランド数、そしてカウンターの営業時間です。',
    'カタログは「今この瞬間に棚にあるもの」に絞り、カテゴリーで絞り込み可能。各カードに在庫状態を表示します。サイト全体が英語と中国語に対応しています。',
    'トレードカウンターが何をするのかを、当然のこととせず1セクションで明示。正規取扱ブランドのロゴが、次の疑問（現場のブランドの部品を扱っているか）に答えます。',
    '連絡先ページは営業時間を最重要情報として扱います。地図、住所、そして曜日ごとの営業時間表——閉まった店に着いてしまうことこそ最悪の結果だからです。',
    '求人は職種ごとの本格的な募集要項（カウンター販売、倉庫、配送）として掲載し、履歴書送付を漠然と呼びかけるのではなく実際の業務と要件を明記しています。',
  ],
};

// Aus Global Trading
const ausGlobal = {
  en: [
    'The homepage states the trade in one line and follows it with the terms that matter to an importer: 60-plus countries, stocked in Ningbo, delivered to your port on FOB or CIF. The header carries the clock in each trading city, because the desk is reached across time zones.',
    'Coverage is drawn as routes out of a single warehouse, then broken into region lists — Australia and New Zealand, Asia-Pacific, Middle East, Pacific, East Africa, Europe — so a buyer can find their own market rather than read a claim about global reach.',
    'The Chinese view is a full translation, not a landing page: the same freight, export documentation, multi-currency settlement and trade desk services, written for importers reading in Chinese.',
    'The enquiry page asks for the order rather than a general message — quantities, terms, destination — with the direct phone number, email and warehouse address alongside it.',
  ],
  'zh-Hans': [
    '首页用一句话说明业务，随后给出进口商真正关心的条款：覆盖 60 多个国家、宁波备货、以 FOB 或 CIF 交付到你的港口。页头显示各贸易城市的当地时间，因为业务往来本就跨越时区。',
    '覆盖范围以自单一仓库出发的航线呈现，并拆分为区域清单——澳新、亚太、中东、太平洋、东非与欧洲——让买家直接找到自己的市场，而不是读一句「全球覆盖」的口号。',
    '中文版是完整翻译而非一张落地页：同样的货运、出口单证、多币种结算与贸易服务台内容，为中文阅读的进口商而写。',
    '询价页面要的是订单本身而非泛泛留言——数量、贸易条款、目的港——并在旁边直接给出电话、邮箱与仓库地址。',
  ],
  'zh-Hant': [
    '首頁用一句話說明業務，隨後給出進口商真正關心的條款：覆蓋 60 多個國家、寧波備貨、以 FOB 或 CIF 交付到你的港口。頁首顯示各貿易城市的當地時間，因為業務往來本就跨越時區。',
    '覆蓋範圍以自單一倉庫出發的航線呈現，並拆分為區域清單——澳紐、亞太、中東、太平洋、東非與歐洲——讓買家直接找到自己的市場，而不是讀一句「全球覆蓋」的口號。',
    '中文版是完整翻譯而非一張著陸頁：同樣的貨運、出口單證、多幣別結算與貿易服務台內容，為中文閱讀的進口商而寫。',
    '詢價頁面要的是訂單本身而非泛泛留言——數量、貿易條件、目的港——並在旁邊直接給出電話、電子郵件與倉庫地址。',
  ],
  ja: [
    'トップページは事業を一文で示し、続けて輸入業者が重視する条件を提示します。60か国以上、寧波在庫、FOB または CIF での指定港渡し。ヘッダーには各取引都市の時刻を表示——商談は時差をまたいで行われるからです。',
    '対応範囲は単一倉庫から伸びる航路として描き、地域別リスト（豪州・NZ、アジア太平洋、中東、太平洋、東アフリカ、欧州）に分解。「グローバル対応」という主張ではなく、自分の市場を直接見つけられます。',
    '中国語版はランディングページではなく完全な翻訳です。輸送、輸出書類、多通貨決済、トレードデスクという同じ内容を、中国語で読む輸入業者向けに書いています。',
    '問い合わせページは一般的なメッセージではなく注文内容（数量・取引条件・仕向地）を尋ね、その横に直通電話・メール・倉庫住所を併記しています。',
  ],
};

// Aircon Solutions Australia
const airconSolutions = {
  en: [
    'The homepage splits by sector instead of by service, so a hotel and a warehouse each see work that looks like their own. The header carries the phone number and whether the office is open right now.',
    'The project index is the proof: real installations with sector, location and scale attached, filterable by the kind of building a visitor is responsible for.',
    'The equipment page opens with the brands carried, then filters the range by system type — split, ducted, cassette — with specifications a click away.',
    'The FAQ answers the awkward questions in public: whether quotes are charged for, licensing, warranty, callouts, and whether they will service a system someone else installed.',
    'Service areas are published as full suburb lists by region rather than a radius on a map, with the warehouse and trade counter marked at the bottom.',
  ],
  'zh-Hans': [
    '首页按行业而非按服务划分，酒店与仓库各自都能看到与自己相似的案例。页头常驻电话号码，并显示当前是否在营业时间内。',
    '案例总览就是最好的证明：真实的安装工程，附带行业、地点与规模，并可按访客所负责的建筑类型筛选。',
    '设备页面先呈现代理的品牌，再按系统类型筛选产品——壁挂分体、风管式与嵌入式——技术规格只需一次点击。',
    '常见问题页面公开回答那些不太好开口的问题：报价是否收费、执照资质、质保范围、紧急上门，以及是否愿意维修由其他公司安装的系统。',
    '服务范围以分区的完整郊区清单公布，而不是地图上的一个半径圈，页面底部标出仓库与交易柜台的位置。',
  ],
  'zh-Hant': [
    '首頁按產業而非按服務劃分，飯店與倉庫各自都能看到與自己相似的案例。頁首常駐電話號碼，並顯示目前是否在營業時間內。',
    '案例總覽就是最好的證明：真實的安裝工程，附帶產業、地點與規模，並可依訪客所負責的建築類型篩選。',
    '設備頁面先呈現代理的品牌，再依系統類型篩選產品——壁掛分離式、風管式與嵌入式——技術規格只需一次點擊。',
    '常見問題頁面公開回答那些不太好開口的問題：報價是否收費、執照資格、保固範圍、緊急到府，以及是否願意維修由其他公司安裝的系統。',
    '服務範圍以分區的完整區域清單公布，而不是地圖上的一個半徑圈，頁面底部標出倉庫與交易櫃檯的位置。',
  ],
  ja: [
    'トップページはサービス別ではなく業種別に分岐し、ホテルにも倉庫にも「自分たちに近い実績」が見えるようにしています。ヘッダーには電話番号と、いま営業時間内かどうかを常時表示。',
    '施工実績一覧がそのまま証拠になります。業種・所在地・規模を添えた実際の工事を、訪問者が担当する建物の種類で絞り込めます。',
    '設備ページはまず取扱ブランドを示し、次にシステム種別（壁掛け・ダクト・カセット）で絞り込み。仕様書はワンクリック先に置いています。',
    'FAQ は答えにくい質問にも公開で回答します。見積りは有料か、免許の有無、保証、緊急対応、そして他社が施工したシステムでも点検するか。',
    '対応エリアは地図上の半径ではなく、地域別の郊外名リストとして全件公開。ページ下部に倉庫とトレードカウンターの位置を示しています。',
  ],
};

// MaxMise Beauty
const maxmise = {
  en: [
    'The homepage leads with a full-width treatment slider, and an "Online Booking" button sits in the main navigation beside the treatment menu so an enquiry is never more than one click away.',
  ],
  'zh-Hans': [
    '首页以整幅的疗程轮播开场，导航栏中的「在线预约」按钮紧邻疗程菜单，使咨询预约始终只有一步之遥。',
  ],
  'zh-Hant': [
    '首頁以整幅的療程輪播開場，導覽列中的「線上預約」按鈕緊鄰療程選單，使諮詢預約始終只有一步之遙。',
  ],
  ja: [
    'トップページは全幅の施術スライダーで始まり、グローバルナビの施術メニューの隣に「オンライン予約」ボタンを配置。問い合わせまで常に1クリックで到達できます。',
  ],
};

// MediRecords
const medirecords = {
  en: [
    'The homepage opens on a dark hero and a single positioning line — more than a practice management system — with a node diagram linking the product pillars and a "Book a demo" call to action.',
  ],
  'zh-Hans': [
    '首页以深色首屏与一句定位文案开场——不只是一套诊所管理系统——搭配串联各产品支柱的节点图，以及「预约演示」的行动号召。',
  ],
  'zh-Hant': [
    '首頁以深色首屏與一句定位文案開場——不只是一套診所管理系統——搭配串聯各產品支柱的節點圖，以及「預約展示」的行動呼籲。',
  ],
  ja: [
    'トップページはダークなヒーローと一文のポジショニングコピー（単なる診療管理システムではない）で始まり、製品の柱をつなぐノード図と「デモを予約」の CTA を添えています。',
  ],
};

// MyOwnVet
const myownvet = {
  en: [
    'A post from the clinic blog, on acupuncture therapy for pets. Articles run with a hero image and date stamp beside a sidebar of search and recent posts, while the phone number, address and opening hours stay pinned to the top bar.',
  ],
  'zh-Hans': [
    '诊所博客中的一篇文章，主题是宠物针灸疗法。文章配有主图与日期，右侧边栏提供搜索与最新文章，电话、地址与营业时间则固定在顶栏。',
  ],
  'zh-Hant': [
    '診所部落格中的一篇文章，主題是寵物針灸療法。文章配有主圖與日期，右側邊欄提供搜尋與最新文章，電話、地址與營業時間則固定在頂欄。',
  ],
  ja: [
    '動物病院ブログの記事で、テーマはペットの鍼治療。記事はヒーロー画像と日付を備え、サイドバーに検索と最新記事を配置。電話番号・住所・診療時間は上部バーに常時表示しています。',
  ],
};

// Pockyt
const pockyt = {
  en: [
    'The home screen answers one question — how much is left — before it shows anything else. Budget jars fill up as the month goes on, and a mascot reacts to the pace of spending rather than scolding after the fact.',
    'The transaction list is built around filters people actually use: this week, this month, income against expenses, or a single category, with the running total for whatever is selected pinned above the list.',
    'The wallet tracks cards for their due dates and their reward rates, and answers the question at the till: for this category, which of these cards should be used?',
    'The coach reads the user\'s own transactions and answers in plain language — what stood out this month, how it compares to their average, and what to do about it — with suggested questions for anyone who does not know what to ask.',
    'Receipts are captured with the camera and read automatically, so the paper trail survives without any typing. The empty state says exactly what to tap.',
    'Goals are shown as a single pooled progress figure with a projected completion date, then broken into the individual purchases behind it.',
    'Challenges turn budgeting into something with a season and a score: each one names the rule, the difficulty and the XP, so committing is a deliberate choice rather than a vague intention.',
    'Trophies mark the habits worth repeating — a first transaction, a logging streak, connecting cards — with locked tiers visible so there is always a next one.',
    'The heatmap puts a month on one screen, so a single heavy day is obvious at a glance, with totals, daily average and active days underneath and a suggested cap based on what actually happened.',
    'Cashback is compared per card and per category, with a prompt when a different card in the wallet would have earned more on the same spending.',
  ],
  'zh-Hans': [
    '主界面先回答一个问题——还剩多少可花——然后才展示其他内容。预算罐随着月份推进逐渐填满，吉祥物会对花钱的节奏作出反应，而不是事后责备。',
    '交易列表围绕人们真正会用的筛选条件构建：本周、本月、收入与支出对比，或单个分类，所选范围的合计金额始终固定在列表上方。',
    '卡包既跟踪信用卡的还款日，也跟踪各自的返现费率，并回答收银台前的那个问题：这一类消费，该刷哪张卡？',
    'AI 教练读取用户自己的交易记录，并用平实的语言作答——本月有哪些异常、与个人平均水平相差多少、接下来该怎么做——并为不知从何问起的人提供推荐提问。',
    '小票通过相机拍摄并自动识别，无需手动输入即可留存凭证。空状态会明确告诉你该点哪里。',
    '储蓄目标先以合并后的总进度与预计达成日期呈现，再拆分为背后的各笔具体计划。',
    '挑战把记账变成有赛季、有积分的事：每项挑战都写明规则、难度与可得经验值，让参与成为一次明确的选择，而非模糊的决心。',
    '成就徽章标记那些值得重复的习惯——第一笔记账、连续记账、绑定卡片——未解锁的等级同样可见，让下一个目标始终存在。',
    '热力图把整月浓缩到一屏，某一天的大额支出一眼可辨，下方是合计、日均与有消费天数，并根据真实数据给出建议的每日上限。',
    '返现按卡片与消费类别分别比较，当钱包里的另一张卡本可以在同样的消费上多赚一些时，会主动提示。',
  ],
  'zh-Hant': [
    '主畫面先回答一個問題——還剩多少可花——然後才顯示其他內容。預算罐隨著月份推進逐漸填滿，吉祥物會對花錢的節奏做出反應，而不是事後責備。',
    '交易列表圍繞人們真正會用的篩選條件建構：本週、本月、收入與支出對比，或單一分類，所選範圍的合計金額始終固定在列表上方。',
    '卡包既追蹤信用卡的繳款日，也追蹤各自的回饋費率，並回答收銀台前的那個問題：這一類消費，該刷哪張卡？',
    'AI 教練讀取使用者自己的交易紀錄，並用平實的語言作答——本月有哪些異常、與個人平均相差多少、接下來該怎麼做——並為不知從何問起的人提供推薦提問。',
    '發票透過相機拍攝並自動辨識，無需手動輸入即可留存憑證。空狀態會明確告訴你該點哪裡。',
    '儲蓄目標先以合併後的總進度與預計達成日期呈現，再拆分為背後的各筆具體計畫。',
    '挑戰把記帳變成有賽季、有積分的事：每項挑戰都寫明規則、難度與可得經驗值，讓參與成為一次明確的選擇，而非模糊的決心。',
    '成就徽章標記那些值得重複的習慣——第一筆記帳、連續記帳、綁定卡片——未解鎖的等級同樣可見，讓下一個目標始終存在。',
    '熱力圖把整月濃縮到一屏，某一天的大額支出一眼可辨，下方是合計、日均與有消費天數，並根據真實資料給出建議的每日上限。',
    '回饋按卡片與消費類別分別比較，當錢包裡的另一張卡本可以在同樣的消費上多賺一些時，會主動提示。',
  ],
  ja: [
    'ホーム画面はまず「あと いくら使えるか」に答え、それ以外は後回し。予算ジャーは月の進行とともに満ちていき、マスコットは使うペースに反応します（後から叱るのではなく）。',
    '取引一覧は実際に使う絞り込みを軸に構成。今週、今月、収入と支出、あるいは特定カテゴリー。選択中の範囲の合計は常に一覧の上部に固定されます。',
    'ウォレットはカードの支払期日と還元率の両方を管理し、レジ前の疑問に答えます。このカテゴリーなら、どのカードを使うべきか。',
    'コーチは本人の取引データを読み、平易な言葉で回答します。今月目立った点、平均との差、次にやるべきこと。何を聞けばよいか分からない人向けに質問候補も用意しています。',
    'レシートはカメラで撮ると自動で読み取られ、手入力なしで記録が残ります。空の状態では、どこをタップすればよいかを明示します。',
    '目標はまず合算した進捗と達成予定時期を示し、その内訳として個々の目的別プランに分解します。',
    'チャレンジは家計管理をシーズンとスコアのあるものに変えます。各チャレンジにルール・難易度・獲得 XP を明記し、参加を漠然とした決意ではなく明確な選択にしています。',
    'トロフィーは繰り返す価値のある習慣（初回の記録、連続記録、カード連携）を可視化。未解放の段階も見えるので、次の目標が常に存在します。',
    'ヒートマップは1か月を1画面に収め、突出した1日をひと目で把握。下に合計・日平均・記録した日数を並べ、実際のデータに基づく1日あたりの上限を提案します。',
    'キャッシュバックはカード別・カテゴリー別に比較し、同じ支出でもウォレット内の別のカードの方が得だった場合には通知します。',
  ],
};

// Oncora
const oncora = {
  en: [
    'The home screen asks for about fifteen seconds a day. Four questions at night, the last check-in summarised in plain numbers, and nothing else competing for attention.',
    'Lymph nodes are tracked on a body map rather than in a form, front and back, so a change is recorded where it was noticed and compared against its own history.',
    'Trends turn those daily check-ins into the measures a haematologist asks about — temperature spikes, drenching nights, weight, energy, mood — over 7, 30 or 90 days.',
    'The care toolkit gathers the rest of treatment into one place: lab results and medications, a photo journal and side effects, coping guidance, the care team, appointments and cycle dates.',
    'The thirty-day summary exists for the appointment itself: B-symptom counts and weight change on a single page, exportable as a PDF, and labelled as self-reported so it is read for what it is.',
    'The learning section covers the diagnosis in plain language — what lymphoma is, Hodgkin against non-Hodgkin, subtypes, B-symptoms, treatment options, and why some cases are watched rather than treated.',
    'The AI companion is for the questions that come up between appointments. It is also the one paid part of the app, and the screen says so plainly: everything else stays free and on the device.',
  ],
  'zh-Hans': [
    '主界面每天只占用约十五秒。晚间四个问题，上一次记录以直白的数字概括，除此之外没有任何东西争夺注意力。',
    '淋巴结记录在人体图上完成，而非填写表单，正反面均可标注，让变化记录在被察觉的位置，并与自身历史对比。',
    '趋势页把每日记录转化为血液科医生真正会问的指标——体温峰值、盗汗夜数、体重、精力与情绪——可查看 7 天、30 天或 90 天。',
    '照护工具箱把治疗的其余部分收拢到一处：化验结果与用药、影像日志与副作用记录、应对指南、医护团队、就诊安排与疗程日期。',
    '三十天摘要是为就诊当下而生：B 症状计数与体重变化浓缩在一页之内，可导出为 PDF，并明确标注为患者自述，以便被恰当解读。',
    '学习板块用平实的语言讲解诊断——什么是淋巴瘤、霍奇金与非霍奇金的区别、常见亚型、B 症状、治疗方案，以及为何有些情况选择观察随访而非立即治疗。',
    'AI 伴侣用于两次就诊之间冒出的问题。它也是应用中唯一收费的部分，页面对此直言不讳：其余功能始终免费，且数据留在设备本地。',
  ],
  'zh-Hant': [
    '主畫面每天只佔用約十五秒。晚間四個問題，上一次記錄以直白的數字概括，除此之外沒有任何東西爭奪注意力。',
    '淋巴結記錄在人體圖上完成，而非填寫表單，正反面皆可標註，讓變化記錄在被察覺的位置，並與自身歷史對比。',
    '趨勢頁把每日記錄轉化為血液科醫師真正會問的指標——體溫峰值、盜汗夜數、體重、精力與情緒——可查看 7 天、30 天或 90 天。',
    '照護工具箱把治療的其餘部分收攏到一處：檢驗結果與用藥、影像日誌與副作用記錄、因應指南、醫護團隊、就診安排與療程日期。',
    '三十天摘要是為就診當下而生：B 症狀計數與體重變化濃縮在一頁之內，可匯出為 PDF，並明確標註為病患自述，以便被恰當解讀。',
    '學習專區用平實的語言講解診斷——什麼是淋巴瘤、何杰金氏與非何杰金氏的差別、常見亞型、B 症狀、治療方案，以及為何有些情況選擇觀察追蹤而非立即治療。',
    'AI 夥伴用於兩次就診之間冒出的問題。它也是應用中唯一收費的部分，頁面對此直言不諱：其餘功能始終免費，且資料留在裝置本機。',
  ],
  ja: [
    'ホーム画面が求めるのは1日およそ15秒。夜に4つの質問、前回の記録は素直な数字で要約し、それ以外に注意を奪うものは置きません。',
    'リンパ節はフォームではなく人体マップ上で記録します。前面と背面に対応し、気づいた場所にそのまま記録して、過去の自分と比較できます。',
    'トレンドは日々の記録を、血液内科医が実際に尋ねる指標（発熱のピーク、寝汗の夜数、体重、活力、気分）に変換し、7日・30日・90日で表示します。',
    'ケアツールキットは治療にまつわる残りをすべて1か所に集約。検査結果と服薬、フォトジャーナルと副作用、対処のヒント、医療チーム、予約、サイクルの日程です。',
    '30日サマリーは診察のためにあります。B症状の回数と体重の変化を1ページにまとめ、PDF で書き出し可能。自己申告である旨を明記し、正しく読まれるようにしています。',
    '学習セクションは診断を平易な言葉で解説します。リンパ腫とは何か、ホジキンと非ホジキンの違い、サブタイプ、B症状、治療の選択肢、そしてなぜ経過観察が選ばれる場合があるのか。',
    'AI コンパニオンは診察と診察のあいだに生じる疑問のためのもの。アプリで唯一の有料機能でもあり、画面上でそれを明言しています——それ以外はすべて無料で、データは端末内に留まります。',
  ],
};

// Keyed by the project ids in Data.jsx.
const byProject = {
  1: takeaway,
  2: sociopedia,
  3: gym,
  4: icase,
  5: idesign,
  6: earrelief,
  7: housed,
  8: onsen,
  9: simbaEducation,
  10: maxmise,
  11: medirecords,
  12: myownvet,
  13: simbaEduNew,
  14: simbaEduRedesign,
  15: simbaHealthRedesign,
  16: simbaHearing,
  17: simbaHealthOriginal,
  18: airbest,
  19: ausGlobal,
  20: airconSolutions,
  21: pockyt,
  22: oncora,
};

const LANGS = ['en', 'zh-Hans', 'zh-Hant', 'ja'];

export const projectCaptions = Object.fromEntries(
  LANGS.map((lang) => [
    lang,
    Object.fromEntries(Object.entries(byProject).map(([id, sets]) => [id, sets[lang]])),
  ])
);
