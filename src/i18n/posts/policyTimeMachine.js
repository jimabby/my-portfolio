// Per-language content for the "Policy Time Machine" post. Product and tool
// names (Policy Time Machine, Policy Diff Explorer, Airflow, DAG, LLM, HITL,
// FastAPI, YAML, CI, Docker, GitHub, Apache-2.0) and currency codes stay
// untranslated; the prose around them is translated. Every figure is from the
// project's synthetic fixture and must match its README.

const en = {
  title: 'Policy Time Machine — Try Tomorrow’s Rules on Yesterday’s Decisions',
  excerpt:
    'An Airflow project that replays two years of past decisions under a proposed rule, shows which sentence caused each change, and turns human rulings into a regression suite for the next proposal.',
  date: 'September 2026',
  readTime: '8 min read',
  badge: 'Project',

  // Hero
  heroP1:
    'Every organisation has rules that people apply to messy cases: refunds, claims, lending, moderation, expenses. When someone proposes changing one, the honest answer to “what will this actually do?” is usually “nobody knows”. People argue from anecdote, ship it, and find out three months later.',
  heroP2:
    'Policy Time Machine makes that question answerable. It replays two years of past decisions under the proposed rule, using only the facts known on each decision date, shows which sentence caused each change, and asks a person to settle the few cases that matter. Their rulings become a regression suite that every future rule change has to pass.',
  videoTitle: 'Policy Time Machine — three-minute demo',
  videoPlay: 'Play the three-minute demo video',
  videoCaption:
    'The three-minute demo, including the backfill running in Airflow and a reviewer’s form on a waiting task. Every number in it comes from a synthetic fixture.',

  // TOC
  tocProblem: 'The question nobody can answer',
  tocReplay: 'Rewind and replay',
  tocTwist: 'The twist: not every change is the proposal’s',
  tocPit: 'No spoilers from the future',
  tocPeople: 'A person gets the final say',
  tocSweep: 'Choosing the number',
  tocTrust: 'Can you trust these numbers?',
  tocAirflow: 'Why Airflow',
  tocLessons: 'What I learned',
  tocTryIt: 'Try it yourself',

  // Problem
  problemHeading: 'The question nobody can answer',
  problemP1:
    'Take an expense policy: receipts required above GBP 75, a notice period for travel, a discretion clause for managers. A finance lead wants to relax the receipt rule. Would you ship that change? Nobody in the room knows how many past claims would have come out differently, which ones, or whether the difference is a good one.',
  problemP2:
    'A backtest is the obvious fix, but a hand-rolled one usually gets three things wrong. It counts changes without saying which sentence caused them. It blames the new rule for mistakes the old one was already making. And it quietly uses today’s data to judge yesterday’s cases. Policy Time Machine is my attempt to get all three right.',
  problemTipTitle: 'Built for Beyond the DAG',
  problemTipText:
    'I built this for Beyond the DAG, on Airflow 3.1 with the Common AI provider, human-in-the-loop operators, assets, dynamic task mapping and a UI plugin. The demo runs on synthetic data, with a deterministic rule evaluator standing in for the model, so you can try it without an API key.',

  // Replay
  replayHeading: 'Rewind and replay',
  replayP1:
    'The core loop is simple. Take every recorded decision, decide it again under the proposed policy, and compare the new answer with the old one. In the shipped fixture, that is 600 expense claims across two years.',
  replayP2:
    'An LLM judge reads the policy text and the case, then returns a typed verdict: an outcome, a confidence and the clause it relied on. It is a validated object, not prose that has to be parsed. Offline, a deterministic rule evaluator returns the same shape of answer. That is how CI tests it, and how the whole demo runs in about a second.',
  replayP3:
    'For the proposed policy, 147 of 600 decisions come out differently. That is almost one in four: 135 more generous and 12 stricter.',
  replayChartAlt:
    '600 historical decisions as one bar: 109 changed because of policy v2, 38 were already off the old rulebook, 453 came out the same',
  replayChartCaption:
    'The whole demo in one bar. Blue and orange together are the 147 changed answers.',
  replayShotAlt:
    'The Policy Diff Explorer plain summary: 147 of the last 600 decisions would come out differently under v2, followed by five steps explaining how it works',
  replayShotCaption:
    'The Policy Diff Explorer opens with a plain-language summary for the person who owns the rule. The evidence is one click behind it.',

  // Twist
  twistHeading: 'The twist: not every change is the proposal’s',
  twistP1:
    '“147 change” is not something you can act on. “Which sentence do I edit?” is. So every change is attributed to the clause responsible, including clauses that changed by ceasing to apply. That is how most rule changes actually move decisions, and it is the case a simple approach misses, because a rule that stops firing cites nothing.',
  twistP2:
    'Getting that answer means judging every case twice: once under the proposed policy and once under the policy already in force. It doubles the cost, and it turned up something I had not been looking for.',
  twistP3:
    '38 of the 147 changes are cases where the recorded decision already disagreed with the old rulebook: a reviewer had departed from the policy they had. Charging those to the new proposal would overstate its impact by 26%. With them separated out, 109 changes are actually the proposal’s doing.',
  twistChartAlt:
    'Changed decisions by clause: clause 1.1 relaxed accounts for 48, the reviewers’ own deviations for 38, clause 2.1 relaxed for 22',
  twistChartCaption:
    'The second bar is not a clause. It is the reviewers, and it is the second-largest bucket in the chart.',
  twistTipTitle: 'Why this matters',
  twistTipText:
    'A backtest that judges only the new policy can never produce that second bar. It would blame the proposal for mistakes the organisation was already making.',

  // Point in time
  pitHeading: 'No spoilers from the future',
  pitP1:
    'Partway through the two years, the fixture promotes half the employees to grade 3, and the proposed policy exempts grade 3 and above from receipts. Join today’s grade onto a historical claim, which is what most hand-rolled backtests do, and you approve claims from people who had not been promoted yet.',
  pitP2:
    'Done that way, 39 of 600 cases come out wrong, and every one of those errors makes the proposal look better. The test suite asserts it. A naive backtest does not add noise; it adds bias.',
  pitP3:
    'The fix is a point-in-time replay. Each monthly run only sees the cases inside its own window, and each case is filled in with the facts known on its decision date. Airflow’s data intervals do most of that work.',

  // People
  peopleHeading: 'A person gets the final say',
  peopleP1:
    'Nobody should have to read 147 cases. The review step picks a handful: cases where the judge was unsure, the money is large, or the change makes the organisation more permissive than it chose to be. In the demo, that is 8 cases.',
  peopleP2:
    'Each one goes to a named reviewer through Airflow’s human-in-the-loop operator. The question is not “approve or reject?” but “what is the correct outcome, and why?” The answer is stored as a precedent, along with who made it and which proposal they were looking at.',
  peopleP3:
    'From then on, every candidate policy is judged again against every precedent, and a reversal fails the run, just like a failing unit test. The first run gives you an estimate. Every run after that gives you a regression suite for organisational judgement.',
  peopleTipTitle: 'Precedent is permanent',
  peopleTipText:
    'Before a change reaches a person, it is judged again several times. One that will not reproduce is the model changing its mind rather than the policy moving, so it is held out of the queue. Once model noise is written into a permanent record, it cannot be taken back out.',

  // Sweep
  sweepHeading: 'Choosing the number',
  sweepP1:
    'Attribution stops at “clause 1.1 accounts for 48 changes”. The next question is always “then what should it say?” A clause like “receipts required above GBP 75” has exactly one dial, and the sweep turns it: six full replays at six thresholds, free and offline, because it only re-evaluates rules over cases already on file.',
  sweepChartAlt:
    'Decisions that change against the receipt threshold: 93 at GBP 25, 147 at the 75 in force, 212 at 250, with the policy-driven share tracking below it',
  sweepChartCaption:
    'The choice becomes a curve, not an argument. The gap between the two lines is the reviewers’ own deviations, and it barely moves.',
  sweepP2:
    'It shows trade-offs, not a recommendation. The choice stays with the person who owns the rule. Once there is a direction, a separate DAG can draft the edited clause, but that draft is judged again against every human ruling and labelled “Not approved by anyone” until a person adopts it.',

  // Trust
  trustHeading: 'Can you trust these numbers?',
  trustP1:
    'A number without an error bar is not a number, so the Explorer puts four checks next to the headline figures:',
  trustItem1Label: 'Does the answer repeat?',
  trustItem1Desc: ' — the judge is asked the same question several times to measure its noise floor.',
  trustItem2Label: 'Does it agree with people?',
  trustItem2Desc: ' — the judge is scored against the humans who ruled, with a confidence band.',
  trustItem3Label: 'Does a second model agree?',
  trustItem3Desc:
    ' — a different model answers the same questions. Where the two judges split, that disagreement is the finding.',
  trustItem4Label: 'Is there enough history?',
  trustItem4Desc:
    ' — a power calculation says how big a difference this sample can actually detect. Two years of expenses cannot tell a 24.5% change rate from a 20% one.',
  trustChartAlt:
    'Flip rate by expense category with 95% intervals: meals at 52.6% against 17.8% for the rest, every other category overlapping',
  trustChartCaption:
    'Who does the change land on? Meals stands apart from the rest. That is a question someone should answer before the rule ships, not a finding of unfairness.',
  trustShotAlt:
    'The Explorer full detail view: tiles for decisions replayed, outcomes that change, judge accuracy, spend and the precedent gate',
  trustShotCaption:
    'The full detail view. Every tile carries its caveat, including the ones that say “not measured”.',

  // Airflow
  airflowHeading: 'Why Airflow',
  airflowP1: 'This is not “an LLM in a DAG”. Each Airflow feature does a real job:',
  airflowItem1Label: 'Backfill',
  airflowItem1Desc: ' is the simulation engine. One backfill fans out 24 monthly runs that replay two years of history.',
  airflowItem2Label: 'Data intervals',
  airflowItem2Desc: ' keep the replay honest by limiting each run to its own window.',
  airflowItem3Label: 'Dynamic task mapping',
  airflowItem3Desc:
    ' gives each case its own judge task, with concurrency capped so the model endpoint is not overwhelmed.',
  airflowItem4Label: 'Human-in-the-loop operators',
  airflowItem4Desc: ' wait for a named reviewer in the triggerer, without holding a worker slot.',
  airflowItem5Label: 'Assets',
  airflowItem5Desc:
    ' chain the pipeline: new changes wake the review step, and new precedents wake the regression gate. Nothing polls.',
  airflowItem6Label: 'A UI plugin',
  airflowItem6Desc: ' puts the Policy Diff Explorer in its own tab inside Airflow.',
  airflowP2:
    'The DAGs are generated from YAML and contain no domain knowledge, and a test checks that. Add a new domain file, refunds instead of expenses for example, and five new DAGs appear.',

  // Lessons
  lessonsHeading: 'What I learned',
  lessonsP1:
    'The hard part was never calling the model. It was all the ways a number can look right and still be wrong:',
  lessonsItem1:
    'A threshold sweep over a range like “between GBP 40 and GBP 100” once moved both ends to the same value, matched nothing, and still drew a smooth, confident curve. A dial like that is now detected and refused.',
  lessonsItem2:
    'Airflow does not protect a plugin’s FastAPI endpoints. My auth check was an unawaited coroutine, so every route stayed open while a test that only checked the dependency existed kept passing. The test now uses a real client with no token.',
  lessonsItem3:
    'Once a model was writing rules, a trimmed-down eval was no longer safe enough. The evaluator now walks the parsed expression node by node and refuses anything it does not explicitly support.',
  lessonsItem4:
    'When a human review times out, Airflow falls back to its defaults, which here was the most generous outcome. A review the clock answered is now refused rather than written into the permanent record.',
  lessonsItem5:
    'Mapping the review over two lists at once gave Airflow a cross product: eight contested cases became 64 review tasks, most showing one case’s question over another case’s evidence, and none of the answers could be recorded. The review now maps over pairs, one task per case, and the form shows the facts as they stood on the decision date.',
  lessonsP2:
    'The project finished with more than 1,500 tests. The README charts are regenerated from the fixture on every build, so a chart cannot outlive the number it draws.',

  // Try it
  tryItHeading: 'Try it yourself',
  tryItP1:
    'The project is open source under Apache-2.0. The guided tour runs offline in a few seconds with no API key, and Docker brings up Airflow with the Policy Diff Explorer.',
  tryItP2Pre: 'Clone the repository and run ',
  tryItP2Post: ' to start the tour.',
  tryItRepoLabel: 'View Policy Time Machine on GitHub',
  tryItTipTitle: 'A note on the numbers',
  tryItTipText:
    'Every figure in this post comes from a synthetic fixture, not a real organisation. The offline demo uses deterministic rules instead of a live AI judge, and the reviewer responses in the self-test are simulated.',
};

const zhHans = {
  title: 'Policy Time Machine — 用明天的规则重审昨天的决定',
  excerpt:
    '一个 Airflow 项目：在拟议规则下重放过去两年的决定，指出每一处变化由哪一句条款造成，并把人工裁定变成下一次提案必须通过的回归测试。',
  date: '2026 年 9 月',
  readTime: '8 分钟阅读',
  badge: '项目',

  heroP1:
    '每个组织都有需要人来套用到复杂个案上的规则：退款、理赔、贷款、内容审核、报销。当有人提议修改其中一条时，对于“这到底会带来什么影响？”这个问题，诚实的回答通常是“没人知道”。大家凭印象争论，上线，然后三个月后才发现结果。',
  heroP2:
    'Policy Time Machine 让这个问题有了答案。它在拟议规则下重放过去两年的决定，只使用每个决定当天已知的事实，指出每一处变化是哪一句条款造成的，并请人来裁定少数真正重要的个案。这些裁定会成为一套回归测试，之后每一次规则修改都必须通过。',
  videoTitle: 'Policy Time Machine — 三分钟演示',
  videoPlay: '播放三分钟演示视频',
  videoCaption: '三分钟演示，包括在 Airflow 中运行的 backfill，以及等待中的任务上的审核表单。其中每个数字都来自合成数据集。',

  tocProblem: '没人能回答的问题',
  tocReplay: '倒带与重放',
  tocTwist: '反转：并非每处变化都归咎于提案',
  tocPit: '不要剧透未来',
  tocPeople: '最终由人来决定',
  tocSweep: '选定那个数字',
  tocTrust: '这些数字可信吗？',
  tocAirflow: '为什么是 Airflow',
  tocLessons: '我学到了什么',
  tocTryIt: '亲自试试',

  problemHeading: '没人能回答的问题',
  problemP1:
    '以一份报销政策为例：超过 GBP 75 需要收据，出差需要提前通知，经理有一条酌情处理条款。财务负责人想放宽收据规则。你会上线这个修改吗？会议室里没有人知道有多少过去的报销会得出不同结果、是哪些，以及这种差异是否是好事。',
  problemP2:
    '回测是显而易见的办法，但手写的回测通常会犯三个错误。它只统计变化，却不说明是哪一句造成的；它把旧规则本来就在犯的错误算到新规则头上；它还悄悄用今天的数据去评判昨天的个案。Policy Time Machine 是我把这三点都做对的尝试。',
  problemTipTitle: '为 Beyond the DAG 而做',
  problemTipText:
    '这个项目是为 Beyond the DAG 构建的，基于 Airflow 3.1，使用了 Common AI provider、人机协作（human-in-the-loop）operator、assets、动态任务映射和 UI 插件。演示使用合成数据，由确定性的规则求值器代替模型，因此无需 API 密钥即可试用。',

  replayHeading: '倒带与重放',
  replayP1:
    '核心流程很简单：取出每一个已记录的决定，在拟议政策下重新判定，再把新答案与旧答案比较。在附带的数据集中，这是两年内的 600 笔报销。',
  replayP2:
    '一个 LLM 评审读取政策文本和个案，然后返回一个有类型的裁决：结果、置信度，以及它所依据的条款。这是一个经过校验的对象，而不是需要解析的文字。离线时，确定性的规则求值器会返回同样结构的答案。CI 就是这样测试它的，整个演示也因此只需大约一秒。',
  replayP3:
    '在拟议政策下，600 个决定中有 147 个结果不同。几乎是四分之一：135 个更宽松，12 个更严格。',
  replayChartAlt:
    '600 个历史决定组成的一根条形：109 个因政策 v2 而改变，38 个本来就不符合旧规则，453 个结果不变',
  replayChartCaption: '一根条形就是整个演示。蓝色和橙色加起来就是那 147 个改变的答案。',
  replayShotAlt:
    'Policy Diff Explorer 的简明摘要：在 v2 下，最近 600 个决定中有 147 个会得出不同结果，下方用五个步骤说明其工作原理',
  replayShotCaption: 'Policy Diff Explorer 首先为规则的负责人提供一份通俗的摘要，证据只需再点一下就能看到。',

  twistHeading: '反转：并非每处变化都归咎于提案',
  twistP1:
    '“有 147 处变化”没法据此行动，“我该改哪一句？”才可以。因此每一处变化都会归因到相应的条款，包括那些因为不再适用而发生变化的条款。大多数规则修改正是这样改变决定的，而简单的做法恰恰会漏掉这种情况，因为一条不再触发的规则什么也不会引用。',
  twistP2:
    '要得到这个答案，每个个案都要评判两次：一次在拟议政策下，一次在现行政策下。成本翻倍，但它揭示了一件我原本没在找的事。',
  twistP3:
    '147 处变化中有 38 处，是已记录的决定本来就与旧规则不符：审核人偏离了他们当时的政策。把这些算到新提案头上，会把它的影响夸大 26%。把它们分开后，真正由提案造成的变化是 109 处。',
  twistChartAlt: '按条款划分的变化：放宽的条款 1.1 占 48 个，审核人自身的偏离占 38 个，放宽的条款 2.1 占 22 个',
  twistChartCaption: '第二根条形不是一条条款，而是审核人本身，而且它是图中第二大的一类。',
  twistTipTitle: '为什么这很重要',
  twistTipText: '只评判新政策的回测永远画不出第二根条形。它会把组织早已在犯的错误归咎于提案。',

  pitHeading: '不要剧透未来',
  pitP1:
    '在这两年的中途，数据集把一半员工晋升到 3 级，而拟议政策免除 3 级及以上员工的收据要求。如果把今天的职级套到历史报销上（大多数手写回测都是这么做的），你就会批准那些当时尚未晋升的人的报销。',
  pitP2:
    '这样做的话，600 个个案中有 39 个会出错，而且每一个错误都让提案看起来更好。测试套件会断言这一点。天真的回测带来的不是噪声，而是偏差。',
  pitP3:
    '解决办法是按时间点重放。每个月度运行只能看到自己时间窗口内的个案，每个个案只填入其决定当天已知的事实。Airflow 的 data interval 完成了其中大部分工作。',

  peopleHeading: '最终由人来决定',
  peopleP1:
    '没有人应该去读 147 个个案。审核步骤只挑出少数几个：评审不确定的、金额较大的，或者让组织比它原本选择的更宽松的。在演示中，是 8 个个案。',
  peopleP2:
    '每一个都会通过 Airflow 的人机协作 operator 发给一位指定的审核人。问题不是“批准还是拒绝？”，而是“正确的结果是什么，为什么？”答案会作为先例保存下来，同时记录是谁做出的，以及当时审阅的是哪个提案。',
  peopleP3:
    '从此以后，每一个候选政策都要针对每一条先例重新评判，一旦推翻先例，运行就会失败，就像单元测试失败一样。第一次运行给你一个估算。之后的每一次运行，都在为组织的判断力做回归测试。',
  peopleTipTitle: '先例是永久的',
  peopleTipText:
    '在一处变化交给人之前，它会被重新评判多次。无法复现的变化，说明是模型改变了主意而不是政策变了，因此会被排除在队列之外。模型的噪声一旦写进永久记录，就再也无法取出。',

  sweepHeading: '选定那个数字',
  sweepP1:
    '归因止步于“条款 1.1 造成了 48 处变化”。接下来的问题总是“那它应该怎么写？”像“超过 GBP 75 需要收据”这样的条款只有一个旋钮，而扫描就是去转动它：在六个阈值下做六次完整重放，免费且离线，因为它只是在已有个案上重新求值规则。',
  sweepChartAlt:
    '结果改变的决定数与收据阈值的关系：GBP 25 时为 93，现行的 75 时为 147，250 时为 212，由政策导致的部分在其下方同步变化',
  sweepChartCaption: '选择变成了一条曲线，而不是一场争论。两条线之间的差距是审核人自身的偏离，几乎不变。',
  sweepP2:
    '它展示的是取舍，而不是建议，决定权仍在规则负责人手里。一旦有了方向，另一个 DAG 可以起草修改后的条款，但这份草稿会针对每一条人工裁定重新评判，并在有人采纳之前一直标注“未经任何人批准”。',

  trustHeading: '这些数字可信吗？',
  trustP1: '没有误差范围的数字不算数字，所以 Explorer 在主要数据旁边放了四项检查：',
  trustItem1Label: '答案能复现吗？',
  trustItem1Desc: '——同一个问题会多次询问评审，以测量它的噪声底线。',
  trustItem2Label: '它与人的判断一致吗？',
  trustItem2Desc: '——评审会与做出裁定的人进行比对打分，并给出置信区间。',
  trustItem3Label: '第二个模型同意吗？',
  trustItem3Desc: '——由另一个模型回答同样的问题。两个评审意见分歧之处，本身就是发现。',
  trustItem4Label: '历史数据够多吗？',
  trustItem4Desc: '——功效计算会说明这个样本实际能检测出多大的差异。两年的报销数据无法区分 24.5% 和 20% 的变化率。',
  trustChartAlt: '按报销类别划分的变化率及 95% 区间：餐饮为 52.6%，其余为 17.8%，其他类别彼此重叠',
  trustChartCaption: '变化落在谁身上？餐饮与其他类别明显不同。这是规则上线前应该有人回答的问题，而不是不公平的结论。',
  trustShotAlt: 'Explorer 的完整详情视图：重放的决定数、结果改变数、评审准确率、花费以及先例关卡等卡片',
  trustShotCaption: '完整详情视图。每张卡片都附带说明，包括那些写着“未测量”的。',

  airflowHeading: '为什么是 Airflow',
  airflowP1: '这不是“在 DAG 里放一个 LLM”。每个 Airflow 功能都承担了实际工作：',
  airflowItem1Label: 'Backfill',
  airflowItem1Desc: '是模拟引擎。一次 backfill 展开 24 个月度运行，重放两年的历史。',
  airflowItem2Label: 'Data interval',
  airflowItem2Desc: '把每次运行限制在自己的时间窗口内，让重放保持诚实。',
  airflowItem3Label: '动态任务映射',
  airflowItem3Desc: '为每个个案分配独立的评审任务，并限制并发，避免压垮模型接口。',
  airflowItem4Label: '人机协作 operator',
  airflowItem4Desc: '在 triggerer 中等待指定的审核人，不占用 worker 槽位。',
  airflowItem5Label: 'Assets',
  airflowItem5Desc: '把流程串联起来：新的变化唤醒审核步骤，新的先例唤醒回归关卡，不需要任何轮询。',
  airflowItem6Label: 'UI 插件',
  airflowItem6Desc: '把 Policy Diff Explorer 作为独立标签页放进 Airflow 里。',
  airflowP2:
    'DAG 由 YAML 生成，不含任何领域知识，并有测试检查这一点。加入一个新的领域文件，比如用退款代替报销，就会出现五个新的 DAG。',

  lessonsHeading: '我学到了什么',
  lessonsP1: '难点从来不是调用模型，而是一个数字看起来正确、实际上却是错的种种情况：',
  lessonsItem1:
    '对“GBP 40 到 GBP 100 之间”这样的区间做阈值扫描时，曾把两端移到同一个值，什么都匹配不上，却仍画出一条平滑、自信的曲线。现在这种旋钮会被识别并拒绝。',
  lessonsItem2:
    'Airflow 不会保护插件的 FastAPI 接口。我的认证检查是一个未被 await 的协程，所以每个路由都是开放的，而只检查依赖是否存在的测试却一直通过。现在的测试使用一个不带 token 的真实客户端。',
  lessonsItem3:
    '一旦由模型来编写规则，精简版的 eval 就不再够安全了。现在的求值器会逐个节点遍历解析后的表达式，拒绝任何未明确支持的内容。',
  lessonsItem4:
    '人工审核超时时，Airflow 会回退到默认值，而在这里默认值是最宽松的结果。现在，由时钟“回答”的审核会被拒绝，而不会写进永久记录。',
  lessonsItem5:
    '同时对两个列表做映射，Airflow 得到的是笛卡尔积：8 个有争议的案例变成了 64 个审核任务，大多数把一个案例的问题配上另一个案例的证据，而且没有一个答案能被记录。现在审核按成对的数据映射，每个案例一个任务，表单也显示决定当日已知的事实。',
  lessonsP2: '项目完成时有超过 1,500 个测试。README 中的图表会在每次构建时从数据集重新生成，因此图表不会比它所画的数字活得更久。',

  tryItHeading: '亲自试试',
  tryItP1: '项目以 Apache-2.0 开源。引导式演示离线运行，几秒即可完成，无需 API 密钥；Docker 则可以启动带有 Policy Diff Explorer 的 Airflow。',
  tryItP2Pre: '克隆仓库后运行 ',
  tryItP2Post: ' 即可开始演示。',
  tryItRepoLabel: '在 GitHub 上查看 Policy Time Machine',
  tryItTipTitle: '关于这些数字',
  tryItTipText: '本文中的每个数字都来自合成数据集，而不是真实的组织。离线演示使用确定性规则代替实时 AI 评审，自测中的审核人回复也是模拟的。',
};

const zhHant = {
  title: 'Policy Time Machine — 用明天的規則重審昨天的決定',
  excerpt:
    '一個 Airflow 專案：在擬議規則下重播過去兩年的決定，指出每一處變化由哪一句條款造成，並把人工裁定變成下一次提案必須通過的回歸測試。',
  date: '2026 年 9 月',
  readTime: '8 分鐘閱讀',
  badge: '專案',

  heroP1:
    '每個組織都有需要人來套用到複雜個案上的規則：退款、理賠、貸款、內容審核、報銷。當有人提議修改其中一條時，對於「這到底會帶來什麼影響？」這個問題，誠實的回答通常是「沒人知道」。大家憑印象爭論，上線，然後三個月後才發現結果。',
  heroP2:
    'Policy Time Machine 讓這個問題有了答案。它在擬議規則下重播過去兩年的決定，只使用每個決定當天已知的事實，指出每一處變化是哪一句條款造成的，並請人來裁定少數真正重要的個案。這些裁定會成為一套回歸測試，之後每一次規則修改都必須通過。',
  videoTitle: 'Policy Time Machine — 三分鐘示範',
  videoPlay: '播放三分鐘示範影片',
  videoCaption: '三分鐘示範，包括在 Airflow 中執行的 backfill，以及等待中的任務上的審核表單。其中每個數字都來自合成資料集。',

  tocProblem: '沒人能回答的問題',
  tocReplay: '倒帶與重播',
  tocTwist: '反轉：並非每處變化都歸咎於提案',
  tocPit: '不要劇透未來',
  tocPeople: '最終由人來決定',
  tocSweep: '選定那個數字',
  tocTrust: '這些數字可信嗎？',
  tocAirflow: '為什麼是 Airflow',
  tocLessons: '我學到了什麼',
  tocTryIt: '親自試試',

  problemHeading: '沒人能回答的問題',
  problemP1:
    '以一份報銷政策為例：超過 GBP 75 需要收據，出差需要提前通知，經理有一條酌情處理條款。財務負責人想放寬收據規則。你會上線這個修改嗎？會議室裡沒有人知道有多少過去的報銷會得出不同結果、是哪些，以及這種差異是否是好事。',
  problemP2:
    '回測是顯而易見的辦法，但手寫的回測通常會犯三個錯誤。它只統計變化，卻不說明是哪一句造成的；它把舊規則本來就在犯的錯誤算到新規則頭上；它還悄悄用今天的資料去評判昨天的個案。Policy Time Machine 是我把這三點都做對的嘗試。',
  problemTipTitle: '為 Beyond the DAG 而做',
  problemTipText:
    '這個專案是為 Beyond the DAG 建構的，基於 Airflow 3.1，使用了 Common AI provider、人機協作（human-in-the-loop）operator、assets、動態任務映射和 UI 外掛。示範使用合成資料，由確定性的規則求值器代替模型，因此無需 API 金鑰即可試用。',

  replayHeading: '倒帶與重播',
  replayP1:
    '核心流程很簡單：取出每一個已記錄的決定，在擬議政策下重新判定，再把新答案與舊答案比較。在附帶的資料集中，這是兩年內的 600 筆報銷。',
  replayP2:
    '一個 LLM 評審讀取政策文字和個案，然後回傳一個有型別的裁決：結果、信心度，以及它所依據的條款。這是一個經過驗證的物件，而不是需要解析的文字。離線時，確定性的規則求值器會回傳同樣結構的答案。CI 就是這樣測試它的，整個示範也因此只需大約一秒。',
  replayP3: '在擬議政策下，600 個決定中有 147 個結果不同。幾乎是四分之一：135 個更寬鬆，12 個更嚴格。',
  replayChartAlt:
    '600 個歷史決定組成的一根長條：109 個因政策 v2 而改變，38 個本來就不符合舊規則，453 個結果不變',
  replayChartCaption: '一根長條就是整個示範。藍色和橙色加起來就是那 147 個改變的答案。',
  replayShotAlt:
    'Policy Diff Explorer 的簡明摘要：在 v2 下，最近 600 個決定中有 147 個會得出不同結果，下方用五個步驟說明其運作方式',
  replayShotCaption: 'Policy Diff Explorer 首先為規則的負責人提供一份淺白的摘要，證據只需再點一下就能看到。',

  twistHeading: '反轉：並非每處變化都歸咎於提案',
  twistP1:
    '「有 147 處變化」沒法據此行動，「我該改哪一句？」才可以。因此每一處變化都會歸因到相應的條款，包括那些因為不再適用而發生變化的條款。大多數規則修改正是這樣改變決定的，而簡單的做法恰恰會漏掉這種情況，因為一條不再觸發的規則什麼也不會引用。',
  twistP2:
    '要得到這個答案，每個個案都要評判兩次：一次在擬議政策下，一次在現行政策下。成本加倍，但它揭示了一件我原本沒在找的事。',
  twistP3:
    '147 處變化中有 38 處，是已記錄的決定本來就與舊規則不符：審核人偏離了他們當時的政策。把這些算到新提案頭上，會把它的影響誇大 26%。把它們分開後，真正由提案造成的變化是 109 處。',
  twistChartAlt: '按條款劃分的變化：放寬的條款 1.1 佔 48 個，審核人自身的偏離佔 38 個，放寬的條款 2.1 佔 22 個',
  twistChartCaption: '第二根長條不是一條條款，而是審核人本身，而且它是圖中第二大的一類。',
  twistTipTitle: '為什麼這很重要',
  twistTipText: '只評判新政策的回測永遠畫不出第二根長條。它會把組織早已在犯的錯誤歸咎於提案。',

  pitHeading: '不要劇透未來',
  pitP1:
    '在這兩年的中途，資料集把一半員工晉升到 3 級，而擬議政策免除 3 級及以上員工的收據要求。如果把今天的職級套到歷史報銷上（大多數手寫回測都是這麼做的），你就會批准那些當時尚未晉升的人的報銷。',
  pitP2: '這樣做的話，600 個個案中有 39 個會出錯，而且每一個錯誤都讓提案看起來更好。測試套件會斷言這一點。天真的回測帶來的不是雜訊，而是偏差。',
  pitP3:
    '解決辦法是按時間點重播。每個月度執行只能看到自己時間窗口內的個案，每個個案只填入其決定當天已知的事實。Airflow 的 data interval 完成了其中大部分工作。',

  peopleHeading: '最終由人來決定',
  peopleP1:
    '沒有人應該去讀 147 個個案。審核步驟只挑出少數幾個：評審不確定的、金額較大的，或者讓組織比它原本選擇的更寬鬆的。在示範中，是 8 個個案。',
  peopleP2:
    '每一個都會透過 Airflow 的人機協作 operator 發給一位指定的審核人。問題不是「批准還是拒絕？」，而是「正確的結果是什麼，為什麼？」答案會作為先例儲存下來，同時記錄是誰做出的，以及當時審閱的是哪個提案。',
  peopleP3:
    '從此以後，每一個候選政策都要針對每一條先例重新評判，一旦推翻先例，執行就會失敗，就像單元測試失敗一樣。第一次執行給你一個估算。之後的每一次執行，都在為組織的判斷力做回歸測試。',
  peopleTipTitle: '先例是永久的',
  peopleTipText:
    '在一處變化交給人之前，它會被重新評判多次。無法重現的變化，說明是模型改變了主意而不是政策變了，因此會被排除在佇列之外。模型的雜訊一旦寫進永久紀錄，就再也無法取出。',

  sweepHeading: '選定那個數字',
  sweepP1:
    '歸因止步於「條款 1.1 造成了 48 處變化」。接下來的問題總是「那它應該怎麼寫？」像「超過 GBP 75 需要收據」這樣的條款只有一個旋鈕，而掃描就是去轉動它：在六個門檻下做六次完整重播，免費且離線，因為它只是在已有個案上重新求值規則。',
  sweepChartAlt:
    '結果改變的決定數與收據門檻的關係：GBP 25 時為 93，現行的 75 時為 147，250 時為 212，由政策導致的部分在其下方同步變化',
  sweepChartCaption: '選擇變成了一條曲線，而不是一場爭論。兩條線之間的差距是審核人自身的偏離，幾乎不變。',
  sweepP2:
    '它展示的是取捨，而不是建議，決定權仍在規則負責人手裡。一旦有了方向，另一個 DAG 可以起草修改後的條款，但這份草稿會針對每一條人工裁定重新評判，並在有人採納之前一直標註「未經任何人批准」。',

  trustHeading: '這些數字可信嗎？',
  trustP1: '沒有誤差範圍的數字不算數字，所以 Explorer 在主要數據旁邊放了四項檢查：',
  trustItem1Label: '答案能重現嗎？',
  trustItem1Desc: '——同一個問題會多次詢問評審，以測量它的雜訊底線。',
  trustItem2Label: '它與人的判斷一致嗎？',
  trustItem2Desc: '——評審會與做出裁定的人進行比對評分，並給出信賴區間。',
  trustItem3Label: '第二個模型同意嗎？',
  trustItem3Desc: '——由另一個模型回答同樣的問題。兩個評審意見分歧之處，本身就是發現。',
  trustItem4Label: '歷史資料夠多嗎？',
  trustItem4Desc: '——檢定力計算會說明這個樣本實際能偵測出多大的差異。兩年的報銷資料無法區分 24.5% 和 20% 的變化率。',
  trustChartAlt: '按報銷類別劃分的變化率及 95% 區間：餐飲為 52.6%，其餘為 17.8%，其他類別彼此重疊',
  trustChartCaption: '變化落在誰身上？餐飲與其他類別明顯不同。這是規則上線前應該有人回答的問題，而不是不公平的結論。',
  trustShotAlt: 'Explorer 的完整詳情檢視：重播的決定數、結果改變數、評審準確率、花費以及先例關卡等卡片',
  trustShotCaption: '完整詳情檢視。每張卡片都附帶說明，包括那些寫著「未測量」的。',

  airflowHeading: '為什麼是 Airflow',
  airflowP1: '這不是「在 DAG 裡放一個 LLM」。每個 Airflow 功能都承擔了實際工作：',
  airflowItem1Label: 'Backfill',
  airflowItem1Desc: '是模擬引擎。一次 backfill 展開 24 個月度執行，重播兩年的歷史。',
  airflowItem2Label: 'Data interval',
  airflowItem2Desc: '把每次執行限制在自己的時間窗口內，讓重播保持誠實。',
  airflowItem3Label: '動態任務映射',
  airflowItem3Desc: '為每個個案分配獨立的評審任務，並限制並行數，避免壓垮模型介面。',
  airflowItem4Label: '人機協作 operator',
  airflowItem4Desc: '在 triggerer 中等待指定的審核人，不佔用 worker 槽位。',
  airflowItem5Label: 'Assets',
  airflowItem5Desc: '把流程串聯起來：新的變化喚醒審核步驟，新的先例喚醒回歸關卡，不需要任何輪詢。',
  airflowItem6Label: 'UI 外掛',
  airflowItem6Desc: '把 Policy Diff Explorer 作為獨立分頁放進 Airflow 裡。',
  airflowP2:
    'DAG 由 YAML 產生，不含任何領域知識，並有測試檢查這一點。加入一個新的領域檔案，比如用退款代替報銷，就會出現五個新的 DAG。',

  lessonsHeading: '我學到了什麼',
  lessonsP1: '難點從來不是呼叫模型，而是一個數字看起來正確、實際上卻是錯的種種情況：',
  lessonsItem1:
    '對「GBP 40 到 GBP 100 之間」這樣的區間做門檻掃描時，曾把兩端移到同一個值，什麼都比對不到，卻仍畫出一條平滑、自信的曲線。現在這種旋鈕會被識別並拒絕。',
  lessonsItem2:
    'Airflow 不會保護外掛的 FastAPI 介面。我的驗證檢查是一個未被 await 的協程，所以每個路由都是開放的，而只檢查依賴是否存在的測試卻一直通過。現在的測試使用一個不帶 token 的真實用戶端。',
  lessonsItem3:
    '一旦由模型來撰寫規則，精簡版的 eval 就不再夠安全了。現在的求值器會逐個節點走訪解析後的運算式，拒絕任何未明確支援的內容。',
  lessonsItem4:
    '人工審核逾時時，Airflow 會回退到預設值，而在這裡預設值是最寬鬆的結果。現在，由時鐘「回答」的審核會被拒絕，而不會寫進永久紀錄。',
  lessonsItem5:
    '同時對兩個列表做映射，Airflow 得到的是笛卡兒積：8 個有爭議的案例變成了 64 個審核任務，大多數把一個案例的問題配上另一個案例的證據，而且沒有一個答案能被記錄。現在審核按成對的資料映射，每個案例一個任務，表單也顯示決定當日已知的事實。',
  lessonsP2: '專案完成時有超過 1,500 個測試。README 中的圖表會在每次建置時從資料集重新產生，因此圖表不會比它所畫的數字活得更久。',

  tryItHeading: '親自試試',
  tryItP1: '專案以 Apache-2.0 開源。導覽式示範離線執行，幾秒即可完成，無需 API 金鑰；Docker 則可以啟動帶有 Policy Diff Explorer 的 Airflow。',
  tryItP2Pre: '複製儲存庫後執行 ',
  tryItP2Post: ' 即可開始示範。',
  tryItRepoLabel: '在 GitHub 上查看 Policy Time Machine',
  tryItTipTitle: '關於這些數字',
  tryItTipText: '本文中的每個數字都來自合成資料集，而不是真實的組織。離線示範使用確定性規則代替即時 AI 評審，自我測試中的審核人回覆也是模擬的。',
};

const ja = {
  title: 'Policy Time Machine — 明日のルールで昨日の判断をやり直す',
  excerpt:
    '提案されたルールのもとで過去2年分の判断をリプレイし、どの一文が各変化を生んだかを示し、人の裁定を次の提案のための回帰テストに変える Airflow プロジェクト。',
  date: '2026年9月',
  readTime: '8分で読めます',
  badge: 'プロジェクト',

  heroP1:
    'どの組織にも、人が複雑なケースに当てはめるルールがあります。返金、保険金請求、融資、コンテンツ審査、経費精算。誰かがその一つを変えようと提案したとき、「実際に何が起きるのか？」という問いへの正直な答えは、たいてい「誰にも分からない」です。印象論で議論し、リリースし、3か月後に結果を知ることになります。',
  heroP2:
    'Policy Time Machine は、この問いに答えを出せるようにします。提案されたルールのもとで過去2年分の判断をリプレイし、各判断の日付時点で分かっていた事実だけを使います。そして、どの一文が各変化を生んだかを示し、本当に重要な少数のケースを人に裁定してもらいます。その裁定は、今後のすべてのルール変更が通過しなければならない回帰テストになります。',
  videoTitle: 'Policy Time Machine — 3分間のデモ',
  videoPlay: '3分間のデモ動画を再生',
  videoCaption: '3分間のデモ。Airflow で実行される backfill と、待機中のタスクに表示されるレビューフォームも映っています。登場する数字はすべて合成データセットによるものです。',

  tocProblem: '誰にも答えられない問い',
  tocReplay: '巻き戻してリプレイする',
  tocTwist: 'どんでん返し：すべての変化が提案のせいではない',
  tocPit: '未来のネタバレは禁止',
  tocPeople: '最後は人が決める',
  tocSweep: '数値を選ぶ',
  tocTrust: 'この数字は信頼できるのか？',
  tocAirflow: 'なぜ Airflow なのか',
  tocLessons: '学んだこと',
  tocTryIt: '試してみる',

  problemHeading: '誰にも答えられない問い',
  problemP1:
    '経費規程を例にしましょう。GBP 75 を超える場合は領収書が必要、出張には事前申請期間があり、マネージャーには裁量条項があります。経理責任者が領収書のルールを緩めたいと考えています。あなたはこの変更をリリースしますか？過去の精算のうち何件の結果が変わるのか、どれが変わるのか、その違いが良いものなのか、会議室の誰にも分かりません。',
  problemP2:
    'バックテストが当然の解決策ですが、手作りのバックテストはたいてい3つの点を誤ります。変化を数えるだけで、どの一文が原因かを示さない。旧ルールがすでに犯していた誤りを新ルールのせいにする。そして、今日のデータで昨日のケースを判断してしまう。Policy Time Machine は、この3つすべてを正しく扱おうとした試みです。',
  problemTipTitle: 'Beyond the DAG のために制作',
  problemTipText:
    'このプロジェクトは Beyond the DAG のために、Airflow 3.1 上で Common AI provider、human-in-the-loop オペレーター、assets、動的タスクマッピング、UI プラグインを使って制作しました。デモは合成データで動き、モデルの代わりに決定的なルール評価器を使うため、API キーなしで試せます。',

  replayHeading: '巻き戻してリプレイする',
  replayP1:
    '中心となる流れはシンプルです。記録されたすべての判断を取り出し、提案されたポリシーのもとで判断し直し、新しい答えを古い答えと比べます。同梱のデータセットでは、2年間の経費精算600件です。',
  replayP2:
    'LLM の審査役がポリシー本文とケースを読み、型付きの判定を返します。結果、確信度、そして根拠にした条項です。解析が必要な文章ではなく、検証済みのオブジェクトです。オフラインでは、決定的なルール評価器が同じ形の答えを返します。CI はこの方法でテストしており、デモ全体も約1秒で動きます。',
  replayP3: '提案されたポリシーでは、600件中147件の結果が変わります。ほぼ4件に1件で、135件がより寛容に、12件がより厳格になります。',
  replayChartAlt: '600件の過去の判断を1本の棒で表示：109件がポリシー v2 により変化、38件は旧ルールからすでに外れていた、453件は変化なし',
  replayChartCaption: 'デモ全体を1本の棒で。青とオレンジを合わせたものが、変化した147件の答えです。',
  replayShotAlt:
    'Policy Diff Explorer のわかりやすい要約：v2 では直近600件のうち147件の結果が変わると表示され、その下に仕組みを説明する5つのステップが続く',
  replayShotCaption: 'Policy Diff Explorer は、ルールの担当者向けにわかりやすい要約から始まります。根拠はワンクリック先にあります。',

  twistHeading: 'どんでん返し：すべての変化が提案のせいではない',
  twistP1:
    '「147件が変わる」では行動に移せません。行動に移せるのは「どの一文を直せばいいのか？」です。そのため、各変化は責任のある条項に帰属されます。適用されなくなったことで変化した条項も含めてです。ほとんどのルール変更は実際にこうして判断を動かしますが、単純な方法ではこのケースを見逃します。発動しなくなったルールは何も引用しないからです。',
  twistP2:
    'この答えを得るには、すべてのケースを2回判断する必要があります。提案されたポリシーで1回、現行ポリシーで1回です。コストは2倍になりますが、探していなかったものが見つかりました。',
  twistP3:
    '147件の変化のうち38件は、記録された判断がそもそも旧ルールと食い違っていたケースでした。審査者が当時のポリシーから外れていたのです。これを新しい提案のせいにすると、影響を26%過大評価してしまいます。切り分けると、提案によって実際に生じた変化は109件です。',
  twistChartAlt: '条項別の変化：緩和された条項 1.1 が48件、審査者自身の逸脱が38件、緩和された条項 2.1 が22件',
  twistChartCaption: '2本目の棒は条項ではありません。審査者自身であり、グラフの中で2番目に大きな区分です。',
  twistTipTitle: 'なぜ重要なのか',
  twistTipText: '新しいポリシーだけを判断するバックテストでは、この2本目の棒は決して出てきません。組織がすでに犯していた誤りを、提案のせいにしてしまいます。',

  pitHeading: '未来のネタバレは禁止',
  pitP1:
    '2年間の途中で、データセットでは従業員の半数がグレード3に昇格し、提案されたポリシーはグレード3以上の領収書を免除します。多くの手作りバックテストのように、今日のグレードを過去の精算に結び付けると、まだ昇格していなかった人の精算を承認してしまいます。',
  pitP2: 'その方法では600件中39件が誤りになり、しかもその誤りはすべて提案を良く見せる方向です。テストスイートはこれを検証しています。素朴なバックテストが加えるのはノイズではなく、バイアスです。',
  pitP3:
    '解決策は時点を正しく扱うリプレイです。毎月の実行は自分の期間内のケースしか見ず、各ケースにはその判断日に分かっていた事実だけが入ります。その大部分は Airflow の data interval が担っています。',

  peopleHeading: '最後は人が決める',
  peopleP1:
    '147件すべてを読む必要はありません。レビューの段階では少数だけを選びます。審査役が迷ったケース、金額が大きいケース、組織が選んだ以上に寛容になるケースです。デモでは8件です。',
  peopleP2:
    'それぞれは Airflow の human-in-the-loop オペレーターを通じて、指名されたレビュー担当者に届きます。問いは「承認か却下か？」ではなく「正しい結果は何で、それはなぜか？」です。答えは先例として保存され、誰が判断したか、どの提案を見ていたかも記録されます。',
  peopleP3:
    'それ以降、すべての候補ポリシーはすべての先例に対して判断し直され、先例が覆れば実行は失敗します。ユニットテストの失敗と同じです。最初の実行で得られるのは見積もりです。その後の実行はすべて、組織の判断に対する回帰テストになります。',
  peopleTipTitle: '先例は永続する',
  peopleTipText:
    '変化が人に届く前に、何度か判断し直されます。再現しない変化は、ポリシーが動いたのではなくモデルが考えを変えただけなので、キューから外されます。モデルのノイズが永続的な記録に書き込まれてしまうと、取り消すことはできません。',

  sweepHeading: '数値を選ぶ',
  sweepP1:
    '帰属分析は「条項 1.1 が48件の変化を生んだ」で止まります。次に来る問いはいつも「では何と書くべきか？」です。「GBP 75 を超える場合は領収書が必要」のような条項にはダイヤルが1つしかなく、スイープはそれを回します。6つのしきい値で6回のフルリプレイを行いますが、既存のケースに対してルールを評価し直すだけなので、無料かつオフラインです。',
  sweepChartAlt:
    '領収書のしきい値に対する結果が変わる判断の数：GBP 25 で93件、現行の75で147件、250で212件。ポリシーによる部分がその下を並行して推移',
  sweepChartCaption: '選択は議論ではなく曲線になります。2本の線の差は審査者自身の逸脱で、ほとんど動きません。',
  sweepP2:
    '示すのはトレードオフであって、推奨ではありません。決めるのはルールの担当者です。方向性が決まれば、別の DAG が修正後の条項を下書きできますが、その下書きはすべての人の裁定に対して判断し直され、誰かが採用するまで「誰も承認していない」と表示され続けます。',

  trustHeading: 'この数字は信頼できるのか？',
  trustP1: '誤差範囲のない数字は数字ではありません。そのため Explorer は、主要な数字の横に4つのチェックを並べています。',
  trustItem1Label: '答えは再現するか？',
  trustItem1Desc: ' — 同じ質問を審査役に何度か尋ね、ノイズの下限を測ります。',
  trustItem2Label: '人と一致するか？',
  trustItem2Desc: ' — 審査役を、裁定した人たちと照らし合わせて採点し、信頼区間も示します。',
  trustItem3Label: '別のモデルも同意するか？',
  trustItem3Desc: ' — 別のモデルが同じ質問に答えます。2つの審査役の意見が分かれたところこそが発見です。',
  trustItem4Label: '履歴は十分か？',
  trustItem4Desc: ' — 検出力の計算で、このサンプルが実際にどれだけの差を検出できるかを示します。2年分の経費では、24.5%と20%の変化率を区別できません。',
  trustChartAlt: '経費カテゴリ別の変化率と95%区間：食事が52.6%、残りが17.8%で、他のカテゴリは互いに重なっている',
  trustChartCaption: '変化は誰に降りかかるのか？食事だけが他と離れています。これはルールをリリースする前に誰かが答えるべき問いであり、不公平だという結論ではありません。',
  trustShotAlt: 'Explorer の詳細表示：リプレイした判断数、変化した結果、審査役の正確さ、費用、先例ゲートなどのタイル',
  trustShotCaption: '詳細表示。すべてのタイルに注意書きが付いています。「未測定」と表示されるものも含めてです。',

  airflowHeading: 'なぜ Airflow なのか',
  airflowP1: 'これは「DAG の中に LLM を置いただけ」ではありません。Airflow の各機能が実際の役割を担っています。',
  airflowItem1Label: 'Backfill',
  airflowItem1Desc: ' がシミュレーションエンジンです。1回の backfill が24回の月次実行に展開され、2年分の履歴をリプレイします。',
  airflowItem2Label: 'Data interval',
  airflowItem2Desc: ' が各実行を自分の期間に限定し、リプレイを正直に保ちます。',
  airflowItem3Label: '動的タスクマッピング',
  airflowItem3Desc: ' で各ケースに専用の審査タスクを割り当て、モデルのエンドポイントに負荷がかかりすぎないよう並列数を制限します。',
  airflowItem4Label: 'Human-in-the-loop オペレーター',
  airflowItem4Desc: ' は worker のスロットを占有せずに、triggerer の中で指名されたレビュー担当者を待ちます。',
  airflowItem5Label: 'Assets',
  airflowItem5Desc: ' がパイプラインをつなぎます。新しい変化がレビューを起動し、新しい先例が回帰ゲートを起動します。ポーリングは一切ありません。',
  airflowItem6Label: 'UI プラグイン',
  airflowItem6Desc: ' で Policy Diff Explorer を Airflow 内の専用タブとして表示します。',
  airflowP2:
    'DAG は YAML から生成され、ドメイン知識を一切含みません。テストがそれを確認しています。新しいドメインファイルを追加すれば、たとえば経費の代わりに返金のファイルなら、5つの新しい DAG が現れます。',

  lessonsHeading: '学んだこと',
  lessonsP1: '難しかったのはモデルを呼び出すことではありませんでした。数字が正しく見えるのに実は間違っている、そのあらゆるパターンです。',
  lessonsItem1:
    '「GBP 40 から GBP 100 の間」のような範囲に対するしきい値スイープが、両端を同じ値に動かしてしまい、何にも一致しないのに滑らかで自信ありげな曲線を描いたことがあります。今ではそうしたダイヤルを検出して拒否します。',
  lessonsItem2:
    'Airflow はプラグインの FastAPI エンドポイントを保護しません。私の認証チェックは await されていないコルーチンだったため、すべてのルートが開いたままで、依存関係の存在だけを確認するテストは通り続けていました。今のテストはトークンなしの実際のクライアントを使います。',
  lessonsItem3:
    'モデルがルールを書くようになると、機能を絞った eval ではもう安全とは言えません。評価器は今では解析済みの式をノードごとにたどり、明示的にサポートしていないものはすべて拒否します。',
  lessonsItem4:
    '人のレビューがタイムアウトすると Airflow はデフォルト値に戻りますが、ここではそれが最も寛容な結果でした。時計が「答えた」レビューは、永続的な記録に書き込まれず、拒否されるようになりました。',
  lessonsItem5:
    '2つのリストに同時にマッピングすると、Airflow はその直積を作ります。争点のある8件が64件のレビュータスクになり、その多くはある案件の質問に別の案件の証拠を並べたもので、どの回答も記録できませんでした。現在はペア単位でマッピングして1件につき1タスクとし、フォームには判断日時点で分かっていた事実を表示しています。',
  lessonsP2: 'プロジェクトは1,500件を超えるテストで完成しました。README のグラフはビルドのたびにデータセットから再生成されるため、グラフが描いている数字より長生きすることはありません。',

  tryItHeading: '試してみる',
  tryItP1: 'プロジェクトは Apache-2.0 のオープンソースです。ガイド付きツアーはオフラインで数秒で動き、API キーは不要です。Docker を使えば Policy Diff Explorer 付きの Airflow が起動します。',
  tryItP2Pre: 'リポジトリをクローンして ',
  tryItP2Post: ' を実行すると、ツアーが始まります。',
  tryItRepoLabel: 'GitHub で Policy Time Machine を見る',
  tryItTipTitle: '数字についての注意',
  tryItTipText: 'この記事の数字はすべて合成データセットによるもので、実在の組織のものではありません。オフラインデモはライブの AI 審査役の代わりに決定的なルールを使い、セルフテストでのレビュー担当者の回答はシミュレーションです。',
};

export default { en, 'zh-Hans': zhHans, 'zh-Hant': zhHant, ja };
