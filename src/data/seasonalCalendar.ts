export interface MonthlyCarePlan {
  month: number;
  monthName: string;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  lunarTerm: string;
  headline: string;
  climateOverview: string;
  coreTasks: {
    title: string;
    description: string;
    tag: '播种栽植' | '浇水施肥' | '修剪塑形' | '防虫防寒' | '采收储藏';
  }[];
  recommendedFlowers: {
    name: string;
    action: string;
    type: string;
  }[];
  watchOutAlert: string;
  suggestedPresetReminders: {
    title: string;
    flowerName: string;
    taskType: 'water' | 'fertilize' | 'prune' | 'sun' | 'plant' | 'check';
    notes: string;
  }[];
}

export const SEASONAL_CALENDAR_DATA: MonthlyCarePlan[] = [
  {
    month: 1,
    monthName: '一月 · 睦月',
    season: 'winter',
    lunarTerm: '小寒 · 大寒',
    headline: '万物闭藏，室暖迎春，控水防寒',
    climateOverview: '一年中最寒冷之月，绝大部分落叶花木处于深度休眠期，室内年宵花陆续盛放。',
    coreTasks: [
      {
        title: '室内年宵花保温增湿',
        description: '蝴蝶兰、大花蕙兰温度维持15℃以上，远离空调热风直吹，叶面喷雾保持湿度。',
        tag: '防虫防寒'
      },
      {
        title: '休眠木本冬季重剪',
        description: '月季、紫薇在休眠期进行冬季强剪，清理弱枝病枝，为春季萌发蓄力。',
        tag: '修剪塑形'
      },
      {
        title: '严格严格控水停肥',
        description: '多数休眠盆栽半月甚至一月给水一次，水温需与室温持平，全面停施速效肥。',
        tag: '浇水施肥'
      }
    ],
    recommendedFlowers: [
      { name: '朱顶红', action: '入室控温催花', type: '球根' },
      { name: '蝴蝶兰', action: '花梗绑扎支撑与观赏', type: '气生兰' },
      { name: '水仙花', action: '浅盆水培迎春', type: '球根' }
    ],
    watchOutAlert: '自来水冰凉刺骨，直接浇花极易导致毛细根受骤冷坏死，务必在室内静置回温后再浇。',
    suggestedPresetReminders: [
      { title: '蝴蝶兰花期水苔干湿检查与微量浸盆', flowerName: '蝴蝶兰', taskType: 'water', notes: '观察根系泛白方可沿盆缘少量给温水' },
      { title: '休眠月季冬季骨架强剪定型', flowerName: '月季', taskType: 'prune', notes: '剪去细弱交叉枝，保留向外朝向的壮芽' }
    ]
  },
  {
    month: 2,
    monthName: '二月 · 如月',
    season: 'winter',
    lunarTerm: '立春 · 雨水',
    headline: '东风解冻，春水初生，初备春耕',
    climateOverview: '气温逐步缓慢回升，南方已有春意萌动，北方仍需防范倒春寒。',
    coreTasks: [
      {
        title: '早春清园与石硫合剂封园',
        description: '全面清除落叶枯枝杂草，枝干喷施石硫合剂杀灭越冬虫卵与真菌孢子。',
        tag: '防虫防寒'
      },
      {
        title: '准备营养土与花盆',
        description: '备足泥炭、珍珠岩、颗粒土与有机底肥（羊粪、骨粉），翻晒旧土杀菌。',
        tag: '播种栽植'
      },
      {
        title: '冷室宿根早春唤醒',
        description: '休眠落叶盆栽逐步移至向阳温暖处，开始增加光照，轻微增加补水频次。',
        tag: '浇水施肥'
      }
    ],
    recommendedFlowers: [
      { name: '月季', action: '早春裸根苗定植与埋冬肥', type: '木本灌木' },
      { name: '虞美人', action: '早春避霜直播', type: '一二年生' },
      { name: '花毛茛', action: '控光促蕾与叶面追钾肥', type: '球根宿根' }
    ],
    watchOutAlert: '“春捂秋冻”，切勿过早将喜温室内花卉搬出室外，早春夜间霜冻杀伤力极大。',
    suggestedPresetReminders: [
      { title: '月季埋施春季缓释发芽底肥', flowerName: '月季', taskType: 'fertilize', notes: '沿盆边挖浅沟埋入腐熟羊粪或控释肥' },
      { title: '早春清园彻底清理枯叶预防病菌', flowerName: '花园全景', taskType: 'check', notes: '喷洒广谱杀菌剂一次' }
    ]
  },
  {
    month: 3,
    monthName: '三月 · 弥生',
    season: 'spring',
    lunarTerm: '惊蛰 · 春分',
    headline: '百花萌动，春阳破晓，翻盆移栽',
    climateOverview: '春暖花开，万物复苏，是一年中植物翻盆换土与播种移栽的黄金高峰期。',
    coreTasks: [
      {
        title: '多年生盆栽翻盆换土',
        description: '对满根板结的植株进行脱盆修剪老根烂根，换上疏松透气的新营养土。',
        tag: '播种栽植'
      },
      {
        title: '全面开启萌芽水肥',
        description: '新芽展叶期施用高氮平衡水溶肥（花多多1号），促进粗壮新枝叶形成。',
        tag: '浇水施肥'
      },
      {
        title: '早春春花病虫害初筛',
        description: '嫩芽初展易吸引蚜虫与蓟马，及时悬挂黄板或喷施吡虫啉防患于未然。',
        tag: '防虫防寒'
      }
    ],
    recommendedFlowers: [
      { name: '雏菊', action: '春阳下勤施磷钾肥促繁密爆盆', type: '一二年生草花' },
      { name: '绣球花', action: '调蓝剂施用（想开蓝花须在此时施硫酸铝）', type: '灌木' },
      { name: '风信子', action: '花期后留叶养球或赏花', type: '球根' },
      { name: '茉莉花', action: '早春重剪老枝发新芽', type: '木本' }
    ],
    watchOutAlert: '绣球调蓝必须在花芽未显色前的春分前后完成；早春盛开的雏菊与银莲花不可缺水。',
    suggestedPresetReminders: [
      { title: '雏菊及时掐除残花延长爆盆花期', flowerName: '雏菊', taskType: 'prune', notes: '沿花梗基部剪掉开败的花朵，促进后续花苞萌发' },
      { title: '大花绣球早春土壤调蓝硫酸铝灌根', flowerName: '大花绣球', taskType: 'fertilize', notes: '稀释1000倍，每隔10天灌根一次连续3次' },
      { title: '茉莉春季出室重剪死枝徒长枝', flowerName: '茉莉花', taskType: 'prune', notes: '保留基部2-3对健壮芽点，促发粗壮新枝' }
    ]
  },
  {
    month: 4,
    monthName: '四月 · 卯月',
    season: 'spring',
    lunarTerm: '清明 · 谷雨',
    headline: '繁花似锦，新芽吐翠，催蕾保花',
    climateOverview: '气温恒定适宜，春雨绵绵，大部分春季花卉进入含苞待放与盛花巅峰阶段。',
    coreTasks: [
      {
        title: '转用高磷钾肥催蕾',
        description: '停止单一高氮肥，全面改用磷酸二氢钾（800-1000倍）灌根与叶面喷洒。',
        tag: '浇水施肥'
      },
      {
        title: '分批疏蕾集中养分',
        description: '牡丹、芍药、大花月季每枝保留顶端第一壮蕾，抹除多余侧生小花蕾。',
        tag: '修剪塑形'
      },
      {
        title: '防范春雨霉菌白粉',
        description: '梅雨或连阴雨后务必加强通风，喷施代森锰锌或氟硅唑预防白粉病。',
        tag: '防虫防寒'
      }
    ],
    recommendedFlowers: [
      { name: '紫藤', action: '花廊挂架引绑与盛花赏花', type: '古典藤本' },
      { name: '洋甘菊', action: '晴天上午采摘花头晒茶', type: '香草花卉' },
      { name: '银莲花', action: '花期避雨防花粉结块', type: '毛茛科块根' },
      { name: '荷花/睡莲', action: '分藕栽植与加水浮泥', type: '水生植物' }
    ],
    watchOutAlert: '花苞膨大及开花期严禁将水直接从上方喷淋在花朵花蕊上，否则花瓣极易霉烂发褐。',
    suggestedPresetReminders: [
      { title: '紫藤盛花期花架安全加固与迎风检查', flowerName: '紫藤', taskType: 'check', notes: '检查花序悬垂受力，及时疏剪杂蔓' },
      { title: '芍药/牡丹花苞疏蕾定枝', flowerName: '芍药', taskType: 'prune', notes: '剥去侧蕾，集中养分供应主花' },
      { title: '全园春花喷洒磷酸二氢钾提亮花色', flowerName: '花园全景', taskType: 'fertilize', notes: '傍晚喷洒叶背与叶面' }
    ]
  },
  {
    month: 5,
    monthName: '五月 · 皋月',
    season: 'spring',
    lunarTerm: '立夏 · 小满',
    headline: '暮春初夏，花潮澎湃，及时剪残',
    climateOverview: '春夏交替，日照时间明显拉长，气温迅速攀升，初春花卉落幕，初夏花卉接力。',
    coreTasks: [
      {
        title: '第一茬春花残花修剪',
        description: '月季、杜鹃花谢后立即从花下饱满叶芽上方剪除，避免结籽大量空耗植株养分。',
        tag: '修剪塑形'
      },
      {
        title: '开启初夏嫩枝扦插',
        description: '利用花后修剪下来的健康半木质化枝条，扦插于蛭石或珍珠岩中，生根迅速。',
        tag: '播种栽植'
      },
      {
        title: '加大蒸腾补水频率',
        description: '晴热大风天盆土蒸发加快，每日上午需逐盆巡查，及时补充透水。',
        tag: '浇水施肥'
      }
    ],
    recommendedFlowers: [
      { name: '栀子花', action: '硫酸亚铁螯合铁灌根防叶片黄化，花苞期避开正午强光', type: '芳香常绿灌木' },
      { name: '茉莉花', action: '全日照大水大肥催生第一茬花', type: '木本' },
      { name: '大花绣球', action: '现蕾期补水遮阳', type: '灌木' },
      { name: '康乃馨', action: '母亲节前后切花瓶插', type: '切花宿根' }
    ],
    watchOutAlert: '春季球根（郁金香、风信子）开花后叶片枯黄，万勿立即丢弃，需继续给钾肥养球直至自然枯死。栀子花蕾期勿向花苞喷大水。',
    suggestedPresetReminders: [
      { title: '栀子花孕蕾期硫酸亚铁调酸防黄化', flowerName: '栀子花', taskType: 'fertilize', notes: '稀释1000倍浇根，保持土壤pH 5.5酸性环境' },
      { title: '月季第一波大花后残花回剪与追肥', flowerName: '月季', taskType: 'prune', notes: '花下第2-3片5小叶上方0.5cm剪下' },
      { title: '蝴蝶兰花后花梗修剪与适度浸润', flowerName: '蝴蝶兰', taskType: 'prune', notes: '基部剪断促使叶片新根生长' }
    ]
  },
  {
    month: 6,
    monthName: '六月 · 水无月',
    season: 'summer',
    lunarTerm: '芒种 · 夏至',
    headline: '梅雨连绵，湿热蒸腾，防涝通风',
    climateOverview: '江南梅雨季节高湿闷热，北方日照毒辣，是植物病虫害（红蜘蛛、介壳虫、黑斑）高发期。',
    coreTasks: [
      {
        title: '架设遮阳网避正午烈日',
        description: '绣球、多肉、蕨类、兰花避开11:00-15:00直射烈日，搭设50%-70%遮阳网。',
        tag: '防虫防寒'
      },
      {
        title: '严控浇水避开正午高温',
        description: '必须在清晨日出前或傍晚凉爽后浇水，严禁正午当头浇水导致“烫根烂根”。',
        tag: '浇水施肥'
      },
      {
        title: '大花绣球花后修剪',
        description: '老枝开花绣球花谢后尽快在8月前修剪完毕，以留足秋季分化明年花芽的时间。',
        tag: '修剪塑形'
      }
    ],
    recommendedFlowers: [
      { name: '荷花', action: '盛放期每日加满清水', type: '水生植物' },
      { name: '蓝睡莲', action: '强光暴晒促花', type: '水生' },
      { name: '向日葵', action: '盛夏开盘与立杆防倒', type: '草本' }
    ],
    watchOutAlert: '暴雨后花盆底部接水盘务必在半小时内倒空，积水加高温等于将根系泡在沸水蒸笼中。',
    suggestedPresetReminders: [
      { title: '阴雨高湿天气预防红蜘蛛与黑斑病喷雾', flowerName: '花园全景', taskType: 'check', notes: '联苯肼酯+代森锰锌交替喷洒' },
      { title: '高温天气遮阳网展开与通风扇开启', flowerName: '半阴耐阴植物', taskType: 'sun', notes: '绣球、兰花拉上遮阳帘' }
    ]
  },
  {
    month: 7,
    monthName: '七月 · 文月',
    season: 'summer',
    lunarTerm: '小暑 · 大暑',
    headline: '三伏赤日，生机与考验，控肥度夏',
    climateOverview: '一年中气温最高的三伏天，多数温带喜凉植物（多肉、仙客来、花毛茛）陷入休眠或半休眠。',
    coreTasks: [
      {
        title: '喜凉植物控水停肥',
        description: '休眠植物严禁施入任何化肥或浓肥，拉长浇水周期，夜间通风降温。',
        tag: '浇水施肥'
      },
      {
        title: '耐热花卉全速冲刺',
        description: '茉莉、蓝雪花、太阳花、荷花等热带花卉享受大水大肥暴晒，旺盛绽放。',
        tag: '浇水施肥'
      },
      {
        title: '地面洒水制造凉爽微环境',
        description: '黄昏在地面与墙面喷洒凉水吸热降温，降低盆栽夜间呼吸消耗。',
        tag: '防虫防寒'
      }
    ],
    recommendedFlowers: [
      { name: '茉莉花', action: '花后轻剪与每五天薄肥一次', type: '木本' },
      { name: '波斯菊', action: '耐旱生长', type: '草本' },
      { name: '红掌', action: '室内散射光湿润养护', type: '室内' }
    ],
    watchOutAlert: '切勿在植物叶片严重萎蔫发软的暴晒正午猛然灌透冷水，应先移入阴凉处通风回软后再慢水浇灌。',
    suggestedPresetReminders: [
      { title: '炎夏清晨早起巡查透水浇灌', flowerName: '花园全景', taskType: 'water', notes: '早晨8点前完成全部植物补水' },
      { title: '休眠植物（如天竺葵、仙客来）严禁施肥警示', flowerName: '休眠植物', taskType: 'check', notes: '避免烧根' }
    ]
  },
  {
    month: 8,
    monthName: '八月 · 叶月',
    season: 'summer',
    lunarTerm: '立秋 · 处暑',
    headline: '秋老虎肆虐，曙光微露，修剪迎秋',
    climateOverview: '立秋后白天依旧高温炽热，早晚温差开始慢慢拉开，多数植物正在积蓄秋花爆发的力量。',
    coreTasks: [
      {
        title: '月季秋季中度修剪',
        description: '8月下旬至9月初对月季进行中度修剪统一花期，为国庆金秋花海奠定基础。',
        tag: '修剪塑形'
      },
      {
        title: '休眠球根起球清点',
        description: '初夏枯萎的郁金香、朱顶红、洋水仙种球取出晾干，干燥阴凉处通风储藏。',
        tag: '采收储藏'
      },
      {
        title: '大花绣球修剪生死线',
        description: '8月底必须停止所有老枝绣球的大幅度修剪，否则将误剪已孕育的越冬花芽。',
        tag: '修剪塑形'
      }
    ],
    recommendedFlowers: [
      { name: '大花绣球', action: '停止修剪，保护新芽', type: '灌木' },
      { name: '彼岸花', action: '抽出花葶盛放观赏', type: '秋花球根' },
      { name: '向日葵', action: '收获饱满向日葵盘', type: '草本' }
    ],
    watchOutAlert: '“秋老虎”午后紫外线依然强劲，不要过早撤除遮阳网，至少维持到白露之后。',
    suggestedPresetReminders: [
      { title: '大花绣球秋季花芽分化停止修剪确认', flowerName: '大花绣球', taskType: 'check', notes: '严禁剪掉顶芽' },
      { title: '月季秋花统一定剪', flowerName: '月季', taskType: 'prune', notes: '修剪株高的三分之一，摘去黄叶' }
    ]
  },
  {
    month: 9,
    monthName: '九月 · 长月',
    season: 'autumn',
    lunarTerm: '白露 · 秋分',
    headline: '秋高气爽，金风送爽，贴秋膘追肥',
    climateOverview: '天高云淡，昼夜温差加大，植物迎来全年第二次爆发式生长与开花黄金期。',
    coreTasks: [
      {
        title: '植物“贴秋膘”追大肥',
        description: '全面恢复高浓度水溶肥与有机肥追施，促进枝叶强健与根系木质化。',
        tag: '浇水施肥'
      },
      {
        title: '撤除遮阳网增加光照',
        description: '除喜阴植物外，其余植物全部恢复全日照，光合作用效率最大化。',
        tag: '防虫防寒'
      },
      {
        title: '秋播草花全面启动',
        description: '角堇、三色堇、金鱼草、石竹在9月中下旬气温降至25℃以下时播种育苗。',
        tag: '播种栽植'
      }
    ],
    recommendedFlowers: [
      { name: '桂花', action: '秋分前后十里飘香', type: '木本' },
      { name: '大丽花', action: '金秋巨轮花盛放', type: '宿根' },
      { name: '芍药', action: '俗称“秋分栽芍药”，分株栽植黄金期', type: '毛茛科' }
    ],
    watchOutAlert: '芍药栽植务必在秋季，春栽不易生根，种植深度以芽眼覆土3-5cm为宜，切勿埋得过深。',
    suggestedPresetReminders: [
      { title: '秋播草花种子冷水浸泡点播', flowerName: '草花种籽', taskType: 'plant', notes: '育苗盘盖保鲜膜微湿催芽' },
      { title: '芍药秋季分株上盆或地栽', flowerName: '芍药', taskType: 'plant', notes: '芽眼朝上覆土3-5cm' }
    ]
  },
  {
    month: 10,
    monthName: '十月 · 神无月',
    season: 'autumn',
    lunarTerm: '寒露 · 霜降',
    headline: '秋色绚烂，球根秋植，秋花盛宴',
    climateOverview: '金秋十月，桂花飘香，菊花争艳，是种植春季开花球根植物的最佳黄金窗口。',
    coreTasks: [
      {
        title: '秋植球根全面下地',
        description: '郁金香、洋水仙、风信子、番红花、花毛茛深埋种球，经历严冬自然春化。',
        tag: '播种栽植'
      },
      {
        title: '秋花花期观赏与水肥维持',
        description: '大丽花、月季、菊花花朵正艳，适度控制水分防止倒伏，追施高磷肥。',
        tag: '浇水施肥'
      },
      {
        title: '易冻花卉入室前消杀',
        description: '盆栽入室前彻底喷施一次杀菌杀虫剂，清洗盆面杂物与苔藓，防止害虫入室。',
        tag: '防虫防寒'
      }
    ],
    recommendedFlowers: [
      { name: '郁金香', action: '秋季埋球定植', type: '球根' },
      { name: '花毛茛', action: '湿沙催芽与入盆', type: '球根' },
      { name: '朱顶红', action: '秋季埋入大球', type: '球根' }
    ],
    watchOutAlert: '洋葱状秋植球根（如郁金香）一般覆土深度为种球高度的2-3倍，太浅易受冻倒伏，太深难破土。',
    suggestedPresetReminders: [
      { title: '郁金香与洋水仙球根消毒与秋埋', flowerName: '郁金香', taskType: 'plant', notes: '多菌灵浸泡20分钟，种球高度2-3倍覆土' },
      { title: '热带花木（茉莉、红掌）防霜降入室准备', flowerName: '热带花卉', taskType: 'check', notes: '室外气温跌破12℃前搬入明亮室内' }
    ]
  },
  {
    month: 11,
    monthName: '十一月 · 霜月',
    season: 'autumn',
    lunarTerm: '立冬 · 小雪',
    headline: '草木染霜，落叶归根，防冻越冬',
    climateOverview: '秋去冬来，寒潮频繁南下，绝大部分绿植落叶或转入冬眠，做好防冻准备。',
    coreTasks: [
      {
        title: '喜温花卉全面入室',
        description: '蝴蝶兰、红掌、绿萝、茉莉必须全部移入温暖室内，南向阳台享受冬阳。',
        tag: '防虫防寒'
      },
      {
        title: '落叶灌木修剪与冬灌',
        description: '土壤封冻前浇透一次“冻水”，提高土壤蓄热能力，防止冬春干旱抽条。',
        tag: '浇水施肥'
      },
      {
        title: '地栽花木树干刷白与包裹',
        description: '耐寒性较差的幼树主干涂刷涂白剂（生石灰石硫合剂水），防止昼夜温差冻裂。',
        tag: '防虫防寒'
      }
    ],
    recommendedFlowers: [
      { name: '三色堇/角堇', action: '露天阳台定植，耐受霜雪冬日持续绽放', type: '超耐寒草花' },
      { name: '水仙花', action: '开始雕刻水养', type: '球根' },
      { name: '蝴蝶兰', action: '控温抽花剑', type: '气生兰' },
      { name: '月季', action: '落叶后冬剪与堆土防冻', type: '灌木' }
    ],
    watchOutAlert: '室内开始供暖后空气极其干燥，切勿将盆花直接放在地暖地板上或暖气片正上方，易蒸干根系。露天三色堇不怕冻但需晒足冬阳。',
    suggestedPresetReminders: [
      { title: '三色堇防雨雪压枝与晒足全日照', flowerName: '三色堇', taskType: 'sun', notes: '置于南向全日照避风处，冰雪消融后检查盆土干湿度' },
      { title: '全花园树木与宿根土壤灌透越冬防冻水', flowerName: '花园全景', taskType: 'water', notes: '封冻前彻底灌透' },
      { title: '蝴蝶兰抽梗期固定支架与叶面增湿', flowerName: '蝴蝶兰', taskType: 'check', notes: '花箭长至10cm时用软夹轻绑包塑铁丝' }
    ]
  },
  {
    month: 12,
    monthName: '十二月 · 师走',
    season: 'winter',
    lunarTerm: '大雪 · 冬至',
    headline: '岁暮天寒，暗香浮动，冬藏蓄势',
    climateOverview: '严冬腊月，大地冰封，室外万籁俱寂，室内年宵花苞累累，暗香浮动。',
    coreTasks: [
      {
        title: '年宵花蕾期保蕾',
        description: '朱顶红、水仙花、蝴蝶兰保持充足直射冬阳，温差适度，避免落蕾。',
        tag: '防虫防寒'
      },
      {
        title: '休眠木本深埋重冬肥',
        description: '在休眠月季、牡丹、紫藤树冠投影外围深挖坑，埋入大量腐熟羊粪、骨粉。',
        tag: '浇水施肥'
      },
      {
        title: '整理盘点来年种植规划',
        description: '整理花架，清洗消毒旧花盆，规划来年春播春栽品种清单。',
        tag: '采收储藏'
      }
    ],
    recommendedFlowers: [
      { name: '水仙花', action: '阳光充足清水催花', type: '球根' },
      { name: '朱顶红', action: '冬日红火绽放', type: '球根' },
      { name: '蝴蝶兰', action: '春节前夕吐蕊盛放', type: '兰科' }
    ],
    watchOutAlert: '冬季室内水培植物（如水仙）夜间若气温过低可倒掉盆水，白天再重新注入温水，防止结冰冻伤。',
    suggestedPresetReminders: [
      { title: '室外月季深施冬季腐熟有机底肥', flowerName: '月季', taskType: 'fertilize', notes: '根颈外围环状沟施羊粪与骨粉' },
      { title: '水仙花水培定期换水与充足日光浴', flowerName: '水仙花', taskType: 'sun', notes: '多晒太阳防止叶片徒长倒伏' }
    ]
  }
];
