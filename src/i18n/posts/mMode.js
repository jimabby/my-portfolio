// Per-language content for the "Understanding M Mode" blog post.
const en = {
  // Listing
  title: 'Understanding M Mode',
  excerpt:
    'Learn how shutter speed, aperture, and ISO work together to give you full creative control over your camera — with practical examples you can try right away.',
  date: 'February 2025',
  readTime: '5 min read',

  // Hero
  badge: 'Camera Basics',
  heroImageAlt: 'Camera in M Mode',
  heroText1Pre: 'Manual Mode (',
  heroText1Strong: 'M Mode',
  heroText1Post:
    ') gives you full control of your camera. Instead of letting the camera choose settings, you decide how the image should look.',
  heroText2:
    "In this guide, you'll learn how shutter speed, aperture, and ISO work together, with simple examples you can try immediately.",

  // TOC
  toc1: 'Step 1 - Switch to M Mode',
  toc2: 'Step 2 - The Three Settings Explained',
  toc3: 'How They Work Together',
  toc4: 'Example Settings to Try',
  toc5: 'Final Tips',

  // Step 1
  step1Heading: 'Step 1 - Switch to M Mode',
  step1DialAlt: 'Camera dial on M',
  step1DialCaption: 'Camera mode dial set to M',
  step1Para1Pre: 'Most cameras have a mode dial on top. Turn the dial until it points to ',
  step1Para1Strong: 'M',
  step1Para1Post: '.',
  step1Para2: "Once you're in M Mode, you can control:",
  step1Item1: 'Shutter Speed',
  step1Item2: 'Aperture (f-number)',
  step1Item3: 'ISO',
  step1TipTitle: 'Quick Tip',
  step1TipText:
    "Don't worry if it feels confusing at first. The goal is to learn how each setting changes your photo.",

  // Step 2
  step2Heading: 'Step 2 - The Three Settings Explained',
  shutterAlt: 'Shutter Speed diagram',
  shutterCaption: 'Shutter speed',
  shutterSubheading: 'Shutter Speed - Motion',
  shutterItem1: 'Fast shutter (1/1000s): freezes action',
  shutterItem2: 'Slow shutter (1/10s): adds motion blur',
  shutterItem3: 'Very slow shutter: requires tripod',
  apertureAlt: 'Aperture diagram',
  apertureCaption: 'Aperture',
  apertureSubheading: 'Aperture - Depth of Field',
  apertureItem1: 'Wide aperture (f/1.8): blurry background',
  apertureItem2: 'Narrow aperture (f/8-f/16): more in focus',
  apertureItem3: 'Common for portraits: f/1.8-f/2.8',
  isoAlt: 'ISO diagram',
  isoCaption: 'ISO',
  isoSubheading: 'ISO - Brightness & Noise',
  isoItem1: 'Low ISO (100-400): clean image',
  isoItem2: 'High ISO (1600+): brighter but grainy',
  isoItem3: 'Use ISO last, after setting shutter/aperture',

  // How they work together
  workHeading: 'How They Work Together',
  workTriangleAlt: 'Exposure Triangle Diagram',
  workTriangleCaption: 'Exposure Triangle Diagram',
  workItem1Label: 'Shutter',
  workItem1Desc: ' - controls motion',
  workItem2Label: 'Aperture',
  workItem2Desc: ' - controls background blur',
  workItem3Label: 'ISO',
  workItem3Desc: ' - controls brightness',
  workBrightenIntro: 'To brighten your photo, you can:',
  workBrightenItem1: 'Use a slower shutter',
  workBrightenItem2: 'Use a wider aperture (lower f-number)',
  workBrightenItem3: 'Increase ISO',
  workReduce: 'To reduce brightness, do the opposite.',

  // Examples
  examplesHeading: 'Example Settings to Try',
  examplePortraitLabel: 'Portrait:',
  examplePortraitDesc: ' 1/125s, f/2.8, ISO 100-400',
  exampleIndoorLabel: 'Indoor:',
  exampleIndoorDesc: ' 1/60s, f/2.0, ISO 800-1600',
  exampleSportsLabel: 'Sports:',
  exampleSportsDesc: ' 1/1000s, f/4, ISO 400-800',
  exampleNightLabel: 'Night city (tripod):',
  exampleNightDesc: ' 1-5s, f/8, ISO 100',
  examplePortraitAlt: 'Portrait example',
  examplePortraitCaption: 'Portrait example',
  exampleLongExpAlt: 'Long-exposure night shot',
  exampleLongExpCaption: 'Long-exposure night shot',

  // Final tips
  finalHeading: 'Final Tips',
  finalItem1: 'Start with Aperture Priority (A/Av) if M Mode feels too hard.',
  finalItem2: 'Watch your light meter for guidance.',
  finalItem3: 'Take 2-3 test shots whenever lighting changes.',
  finalItem4: 'Mistakes are the best teacher - keep experimenting.',
  finalImageAlt: 'Photographer shooting in Manual Mode',
};

const zhHans = {
  // Listing
  title: '理解 M 档（手动模式）',
  excerpt:
    '了解快门速度、光圈和 ISO 如何协同工作，让你完全掌控相机的创作自由——附有可立即尝试的实用示例。',
  date: '2025 年 2 月',
  readTime: '阅读约 5 分钟',

  // Hero
  badge: '相机基础',
  heroImageAlt: 'M 档下的相机',
  heroText1Pre: '手动模式（',
  heroText1Strong: 'M 档',
  heroText1Post:
    '）让你完全掌控相机。与其让相机自动选择设置，不如由你来决定照片应有的样子。',
  heroText2:
    '在本指南中，你将学到快门速度、光圈和 ISO 如何协同工作，并附有可立即尝试的简单示例。',

  // TOC
  toc1: '第一步 - 切换到 M 档',
  toc2: '第二步 - 三项设置详解',
  toc3: '它们如何协同工作',
  toc4: '可尝试的示例设置',
  toc5: '最后的建议',

  // Step 1
  step1Heading: '第一步 - 切换到 M 档',
  step1DialAlt: '转盘指向 M 的相机',
  step1DialCaption: '相机模式转盘设置为 M',
  step1Para1Pre: '大多数相机顶部都有一个模式转盘。转动转盘，直到它指向 ',
  step1Para1Strong: 'M',
  step1Para1Post: '。',
  step1Para2: '进入 M 档后，你可以控制：',
  step1Item1: '快门速度',
  step1Item2: '光圈（f 值）',
  step1Item3: 'ISO',
  step1TipTitle: '小贴士',
  step1TipText:
    '如果一开始感觉困惑，不必担心。目标是了解每项设置如何改变你的照片。',

  // Step 2
  step2Heading: '第二步 - 三项设置详解',
  shutterAlt: '快门速度示意图',
  shutterCaption: '快门速度',
  shutterSubheading: '快门速度 - 运动',
  shutterItem1: '高速快门（1/1000s）：凝固动作',
  shutterItem2: '慢速快门（1/10s）：产生运动模糊',
  shutterItem3: '极慢快门：需要三脚架',
  apertureAlt: '光圈示意图',
  apertureCaption: '光圈',
  apertureSubheading: '光圈 - 景深',
  apertureItem1: '大光圈（f/1.8）：背景虚化',
  apertureItem2: '小光圈（f/8-f/16）：更多区域清晰',
  apertureItem3: '人像常用：f/1.8-f/2.8',
  isoAlt: 'ISO 示意图',
  isoCaption: 'ISO',
  isoSubheading: 'ISO - 亮度与噪点',
  isoItem1: '低 ISO（100-400）：画面干净',
  isoItem2: '高 ISO（1600+）：更明亮但有颗粒感',
  isoItem3: '最后再调 ISO，先设定好快门/光圈',

  // How they work together
  workHeading: '它们如何协同工作',
  workTriangleAlt: '曝光三角示意图',
  workTriangleCaption: '曝光三角示意图',
  workItem1Label: '快门',
  workItem1Desc: ' - 控制运动',
  workItem2Label: '光圈',
  workItem2Desc: ' - 控制背景虚化',
  workItem3Label: 'ISO',
  workItem3Desc: ' - 控制亮度',
  workBrightenIntro: '要让照片更亮，你可以：',
  workBrightenItem1: '使用更慢的快门',
  workBrightenItem2: '使用更大的光圈（更小的 f 值）',
  workBrightenItem3: '提高 ISO',
  workReduce: '要降低亮度，反向操作即可。',

  // Examples
  examplesHeading: '可尝试的示例设置',
  examplePortraitLabel: '人像：',
  examplePortraitDesc: ' 1/125s, f/2.8, ISO 100-400',
  exampleIndoorLabel: '室内：',
  exampleIndoorDesc: ' 1/60s, f/2.0, ISO 800-1600',
  exampleSportsLabel: '运动：',
  exampleSportsDesc: ' 1/1000s, f/4, ISO 400-800',
  exampleNightLabel: '城市夜景（三脚架）：',
  exampleNightDesc: ' 1-5s, f/8, ISO 100',
  examplePortraitAlt: '人像示例',
  examplePortraitCaption: '人像示例',
  exampleLongExpAlt: '长曝光夜景照片',
  exampleLongExpCaption: '长曝光夜景照片',

  // Final tips
  finalHeading: '最后的建议',
  finalItem1: '如果 M 档感觉太难，可以先从光圈优先（A/Av）开始。',
  finalItem2: '注意观察测光表作为参考。',
  finalItem3: '每当光线变化时，拍 2-3 张测试照片。',
  finalItem4: '错误是最好的老师——不断尝试。',
  finalImageAlt: '以手动模式拍摄的摄影师',
};

const zhHant = {
  // Listing
  title: '理解 M 檔（手動模式）',
  excerpt:
    '了解快門速度、光圈和 ISO 如何協同運作，讓你完全掌控相機的創作自由——附有可立即嘗試的實用範例。',
  date: '2025 年 2 月',
  readTime: '閱讀約 5 分鐘',

  // Hero
  badge: '相機基礎',
  heroImageAlt: 'M 檔下的相機',
  heroText1Pre: '手動模式（',
  heroText1Strong: 'M 檔',
  heroText1Post:
    '）讓你完全掌控相機。與其讓相機自動選擇設定，不如由你來決定照片應有的樣子。',
  heroText2:
    '在本指南中，你將學到快門速度、光圈和 ISO 如何協同運作，並附有可立即嘗試的簡單範例。',

  // TOC
  toc1: '第一步 - 切換到 M 檔',
  toc2: '第二步 - 三項設定詳解',
  toc3: '它們如何協同運作',
  toc4: '可嘗試的範例設定',
  toc5: '最後的建議',

  // Step 1
  step1Heading: '第一步 - 切換到 M 檔',
  step1DialAlt: '轉盤指向 M 的相機',
  step1DialCaption: '相機模式轉盤設定為 M',
  step1Para1Pre: '大多數相機頂部都有一個模式轉盤。轉動轉盤，直到它指向 ',
  step1Para1Strong: 'M',
  step1Para1Post: '。',
  step1Para2: '進入 M 檔後，你可以控制：',
  step1Item1: '快門速度',
  step1Item2: '光圈（f 值）',
  step1Item3: 'ISO',
  step1TipTitle: '小提示',
  step1TipText:
    '如果一開始感覺困惑，不必擔心。目標是了解每項設定如何改變你的照片。',

  // Step 2
  step2Heading: '第二步 - 三項設定詳解',
  shutterAlt: '快門速度示意圖',
  shutterCaption: '快門速度',
  shutterSubheading: '快門速度 - 運動',
  shutterItem1: '高速快門（1/1000s）：凝固動作',
  shutterItem2: '慢速快門（1/10s）：產生運動模糊',
  shutterItem3: '極慢快門：需要三腳架',
  apertureAlt: '光圈示意圖',
  apertureCaption: '光圈',
  apertureSubheading: '光圈 - 景深',
  apertureItem1: '大光圈（f/1.8）：背景虛化',
  apertureItem2: '小光圈（f/8-f/16）：更多區域清晰',
  apertureItem3: '人像常用：f/1.8-f/2.8',
  isoAlt: 'ISO 示意圖',
  isoCaption: 'ISO',
  isoSubheading: 'ISO - 亮度與雜訊',
  isoItem1: '低 ISO（100-400）：畫面乾淨',
  isoItem2: '高 ISO（1600+）：更明亮但有顆粒感',
  isoItem3: '最後再調 ISO，先設定好快門/光圈',

  // How they work together
  workHeading: '它們如何協同運作',
  workTriangleAlt: '曝光三角示意圖',
  workTriangleCaption: '曝光三角示意圖',
  workItem1Label: '快門',
  workItem1Desc: ' - 控制運動',
  workItem2Label: '光圈',
  workItem2Desc: ' - 控制背景虛化',
  workItem3Label: 'ISO',
  workItem3Desc: ' - 控制亮度',
  workBrightenIntro: '要讓照片更亮，你可以：',
  workBrightenItem1: '使用更慢的快門',
  workBrightenItem2: '使用更大的光圈（更小的 f 值）',
  workBrightenItem3: '提高 ISO',
  workReduce: '要降低亮度，反向操作即可。',

  // Examples
  examplesHeading: '可嘗試的範例設定',
  examplePortraitLabel: '人像：',
  examplePortraitDesc: ' 1/125s, f/2.8, ISO 100-400',
  exampleIndoorLabel: '室內：',
  exampleIndoorDesc: ' 1/60s, f/2.0, ISO 800-1600',
  exampleSportsLabel: '運動：',
  exampleSportsDesc: ' 1/1000s, f/4, ISO 400-800',
  exampleNightLabel: '城市夜景（三腳架）：',
  exampleNightDesc: ' 1-5s, f/8, ISO 100',
  examplePortraitAlt: '人像範例',
  examplePortraitCaption: '人像範例',
  exampleLongExpAlt: '長曝光夜景照片',
  exampleLongExpCaption: '長曝光夜景照片',

  // Final tips
  finalHeading: '最後的建議',
  finalItem1: '如果 M 檔感覺太難，可以先從光圈優先（A/Av）開始。',
  finalItem2: '注意觀察測光表作為參考。',
  finalItem3: '每當光線變化時，拍 2-3 張測試照片。',
  finalItem4: '錯誤是最好的老師——不斷嘗試。',
  finalImageAlt: '以手動模式拍攝的攝影師',
};

const ja = {
  // Listing
  title: 'M モードを理解する',
  excerpt:
    'シャッタースピード、絞り、ISO がどのように連携し、カメラの表現を完全にコントロールできるようになるかを学びましょう。すぐに試せる実用的な作例つきです。',
  date: '2025年2月',
  readTime: '5分で読めます',

  // Hero
  badge: 'カメラの基礎',
  heroImageAlt: 'M モードのカメラ',
  heroText1Pre: 'マニュアルモード（',
  heroText1Strong: 'M モード',
  heroText1Post:
    '）では、カメラを完全にコントロールできます。カメラに設定を任せる代わりに、写真の仕上がりを自分で決められます。',
  heroText2:
    'このガイドでは、シャッタースピード、絞り、ISO がどのように連携するかを、すぐに試せる簡単な作例とともに学びます。',

  // TOC
  toc1: 'ステップ1 - M モードに切り替える',
  toc2: 'ステップ2 - 3つの設定を解説',
  toc3: '3つの設定の連携',
  toc4: '試してみたい設定の例',
  toc5: '最後のヒント',

  // Step 1
  step1Heading: 'ステップ1 - M モードに切り替える',
  step1DialAlt: 'ダイヤルが M を指したカメラ',
  step1DialCaption: 'カメラのモードダイヤルを M に設定',
  step1Para1Pre:
    'ほとんどのカメラには上部にモードダイヤルがあります。ダイヤルを回して ',
  step1Para1Strong: 'M',
  step1Para1Post: ' に合わせます。',
  step1Para2: 'M モードにすると、次の項目をコントロールできます。',
  step1Item1: 'シャッタースピード',
  step1Item2: '絞り（f 値）',
  step1Item3: 'ISO',
  step1TipTitle: 'ワンポイント',
  step1TipText:
    '最初は戸惑っても心配いりません。目標は、各設定が写真をどう変えるかを学ぶことです。',

  // Step 2
  step2Heading: 'ステップ2 - 3つの設定を解説',
  shutterAlt: 'シャッタースピードの図',
  shutterCaption: 'シャッタースピード',
  shutterSubheading: 'シャッタースピード - 動き',
  shutterItem1: '速いシャッター（1/1000s）：動きを止める',
  shutterItem2: '遅いシャッター（1/10s）：動きのブレを加える',
  shutterItem3: '非常に遅いシャッター：三脚が必要',
  apertureAlt: '絞りの図',
  apertureCaption: '絞り',
  apertureSubheading: '絞り - 被写界深度',
  apertureItem1: '開放の絞り（f/1.8）：背景がボケる',
  apertureItem2: '絞り込んだ状態（f/8-f/16）：広い範囲にピントが合う',
  apertureItem3: 'ポートレートによく使う：f/1.8-f/2.8',
  isoAlt: 'ISO の図',
  isoCaption: 'ISO',
  isoSubheading: 'ISO - 明るさとノイズ',
  isoItem1: '低い ISO（100-400）：クリーンな画像',
  isoItem2: '高い ISO（1600+）：明るいがザラつく',
  isoItem3: 'ISO は最後に、シャッター/絞りを決めてから調整する',

  // How they work together
  workHeading: '3つの設定の連携',
  workTriangleAlt: '露出トライアングルの図',
  workTriangleCaption: '露出トライアングルの図',
  workItem1Label: 'シャッター',
  workItem1Desc: ' - 動きをコントロール',
  workItem2Label: '絞り',
  workItem2Desc: ' - 背景のボケをコントロール',
  workItem3Label: 'ISO',
  workItem3Desc: ' - 明るさをコントロール',
  workBrightenIntro: '写真を明るくするには、次の方法があります。',
  workBrightenItem1: 'より遅いシャッターを使う',
  workBrightenItem2: 'より開放の絞りを使う（f 値を小さく）',
  workBrightenItem3: 'ISO を上げる',
  workReduce: '明るさを抑えるには、逆の操作をします。',

  // Examples
  examplesHeading: '試してみたい設定の例',
  examplePortraitLabel: 'ポートレート：',
  examplePortraitDesc: ' 1/125s, f/2.8, ISO 100-400',
  exampleIndoorLabel: '室内：',
  exampleIndoorDesc: ' 1/60s, f/2.0, ISO 800-1600',
  exampleSportsLabel: 'スポーツ：',
  exampleSportsDesc: ' 1/1000s, f/4, ISO 400-800',
  exampleNightLabel: '夜の街（三脚）：',
  exampleNightDesc: ' 1-5s, f/8, ISO 100',
  examplePortraitAlt: 'ポートレートの作例',
  examplePortraitCaption: 'ポートレートの作例',
  exampleLongExpAlt: '長秒露光の夜景写真',
  exampleLongExpCaption: '長秒露光の夜景写真',

  // Final tips
  finalHeading: '最後のヒント',
  finalItem1: 'M モードが難しすぎると感じたら、絞り優先（A/Av）から始めましょう。',
  finalItem2: '露出計を確認して目安にしましょう。',
  finalItem3: '光が変わるたびに、2-3枚のテスト撮影をしましょう。',
  finalItem4: '失敗は最良の師です。実験を続けましょう。',
  finalImageAlt: 'マニュアルモードで撮影するカメラマン',
};

export default { en, 'zh-Hans': zhHans, 'zh-Hant': zhHant, ja };
