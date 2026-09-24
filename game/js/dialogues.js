// ==========================================
// 重返2008：梦境碎片 - NPC 完整对话树
// 基于 角色设定_NPC.md
// ==========================================

const DIALOGUE_TREES = {

    // ===== 王奶奶 =====
    wang_granny: {
        id: 'wang_granny',
        npcName: '王奶奶',
        start: 'first_meet',
        visitKey: 'wang_granny',
        nodes: {
            first_meet: {
                speaker: '王奶奶',
                text: '哟，这不是小林瑜吗？长这么高了！吃饭了没？来来来，奶奶刚蒸了红薯，还热乎着呢。',
                choices: [
                    { text: '接过红薯', next: 'accept_potato', effect: { affection: 1 } },
                    { text: '谢谢奶奶，我不饿', next: 'decline_potato' },
                ],
            },
            accept_potato: {
                speaker: '王奶奶',
                text: '（笑眯了眼）多吃点，看你瘦的。你小时候可爱吃这个了，每次都吃得满嘴都是，你妈说你也不听。',
                next: 'linyu_taste',
            },
            linyu_taste: {
                speaker: '林瑜',
                text: '（咬了一口）……还是那个味道。',
                next: 'granny_philosophy',
            },
            granny_philosophy: {
                speaker: '王奶奶',
                text: '味道能变吗？红薯就是红薯。人就不一样了，人变得快。',
                end: true,
            },
            decline_potato: {
                speaker: '王奶奶',
                text: '（有些失落）哦……那行，奶奶给你留着。啥时候想吃了就来。奶奶家门没锁过。',
                end: true,
            },
            second_meet: {
                speaker: '王奶奶',
                text: '（像第一次一样笑着）哟，小林瑜！吃饭了没？',
                next: 'linyu_repeat',
            },
            linyu_repeat: {
                speaker: '林瑜',
                text: '奶奶，您刚才问过我了……',
                next: 'granny_forget',
            },
            granny_forget: {
                speaker: '王奶奶',
                text: '（愣了愣，然后笑）是吗？奶奶记性不好了。那……吃了就好，吃了就好。',
                end: true,
            },
            third_meet: {
                speaker: '王奶奶',
                text: '（坐在楼下的长椅上，看着远处）你小时候最爱吃我家的蒸红薯了……那时候你才这么高（比划到腰际），一晃眼……',
                next: 'linyu_concern',
            },
            linyu_concern: {
                speaker: '林瑜',
                text: '奶奶，您还好吗？',
                next: 'granny_lost',
            },
            granny_lost: {
                speaker: '王奶奶',
                text: '（没有看她）我好啊。我能有什么不好的。就是……有时候想不起来今天是哪一年了。',
                end: true,
            },
            farewell: {
                speaker: '王奶奶',
                text: '（从窗台探出头来）小林瑜，有空常回来看看啊！奶奶给你留着红薯呢。别忘了——别忘了回来。',
                end: true,
            },
        },
        getStartNode(visitCount) {
            if (visitCount === 0) return 'first_meet';
            if (visitCount === 1) return 'second_meet';
            if (visitCount === 2) return 'third_meet';
            return 'farewell';
        },
    },

    // ===== 周小萌 =====
    xiaomeng: {
        id: 'xiaomeng',
        npcName: '周小萌',
        start: 'call_down',
        visitKey: 'xiaomeng',
        nodes: {
            call_down: {
                speaker: '周小萌',
                text: '（双手拢在嘴边，朝楼上喊）林——瑜——！你怎么还没好啊！太阳都要下山啦！',
                next: 'linyu_come',
            },
            linyu_come: {
                speaker: '林瑜',
                text: '来了来了！',
                next: 'xiaomeng_shoes',
            },
            xiaomeng_shoes: {
                speaker: '周小萌',
                text: '（上下打量）你穿这个啊？今天要去冒险的，你穿拖鞋怎么行！',
                choices: [
                    { text: '回去换鞋', next: 'change_shoes' },
                    { text: '管它呢，走吧！', next: 'slippers_ok' },
                ],
            },
            change_shoes: {
                speaker: '周小萌',
                text: '快点啊！我在楼下等你！数到一百你还不来我就自己走了！（开始数数）一、二、三……',
                next: 'linyu_change',
            },
            linyu_change: {
                speaker: '林瑜',
                text: '（跑上楼换鞋，听到她在楼下认真地数着数）',
                next: 'to_store',
            },
            slippers_ok: {
                speaker: '周小萌',
                text: '（大笑）不愧是林瑜！那我们走吧！',
                next: 'to_store',
            },
            to_store: {
                speaker: '周小萌',
                text: '（边走边踢石子）你暑假作业写多少了？',
                next: 'linyu_homework',
            },
            linyu_homework: {
                speaker: '林瑜',
                text: '写了一页……',
                next: 'xiaomeng_homework',
            },
            xiaomeng_homework: {
                speaker: '周小萌',
                text: '哈哈哈我也是！我妈妈说开学前一周再写也来得及。我妈妈说暑假就是用来玩的！',
                next: 'at_store',
            },
            at_store: {
                speaker: '周小萌',
                text: '（趴在冰柜上看）今天吃哪个呢……老冰棍还是绿舌头？',
                next: 'linyu_popsicle',
            },
            linyu_popsicle: {
                speaker: '林瑜',
                text: '绿舌头吧，可以玩很久。',
                next: 'xiaomeng_buy',
            },
            xiaomeng_buy: {
                speaker: '周小萌',
                text: '（对老板）叔叔，两个绿舌头！（转头对林瑜小声说）我请客！我考了双百，我妈奖励了我五块钱！不过你别跟别人说啊，不然他们都让我请。',
                next: 'future_talk',
            },
            future_talk: {
                speaker: '周小萌',
                text: '林瑜，你说我们长大了会变成什么样的人啊？',
                choices: [
                    { text: '我想当画家', next: 'dream_painter' },
                    { text: '我想当科学家', next: 'dream_scientist' },
                    { text: '我不知道', next: 'dream_unknown' },
                ],
            },
            dream_painter: {
                speaker: '周小萌',
                text: '好！那你画我！等我变成大明星的时候，你给我画海报！',
                next: 'goodbye_xiaomeng',
            },
            dream_scientist: {
                speaker: '周小萌',
                text: '哇——那你以后是不是要研究那种……时间机器什么的？到时候你来找我玩啊，不管我在哪！',
                next: 'goodbye_xiaomeng',
            },
            dream_unknown: {
                speaker: '周小萌',
                text: '（满不在乎）没关系啦！我也不知道！我妈妈说长大了就知道了。我妈什么都知道。',
                next: 'goodbye_xiaomeng',
            },
            goodbye_xiaomeng: {
                speaker: '周小萌',
                text: '林瑜，明天我们还出来玩吧！去那个新开的游乐场！听说有旋转木马！我还没坐过呢！',
                next: 'linyu_agree',
            },
            linyu_agree: {
                speaker: '林瑜',
                text: '好！',
                next: 'pinkie_promise',
            },
            pinkie_promise: {
                speaker: '周小萌',
                text: '拉勾！（两人拉勾）拉勾上吊一百年不许变！谁变谁是小狗！',
                end: true,
                memory: { id: 'xiaomeng_promise', name: '与小萌的约定' },
            },
        },
    },

    // ===== 陈叔（小卖部老板）=====
    shop_owner: {
        id: 'shop_owner',
        npcName: '陈叔',
        start: 'enter_store',
        visitKey: 'shop_owner',
        nodes: {
            enter_store: {
                speaker: '陈叔',
                text: '（从老花镜上方看过来）哟，小林瑜来了。今天要点什么？',
                choices: [
                    { text: '买辣条', next: 'buy_spicy' },
                    { text: '买冰棍', next: 'buy_popsicle' },
                    { text: '随便看看', next: 'just_look' },
                ],
            },
            buy_spicy: {
                speaker: '林瑜',
                text: '陈叔，我要一包卫龙。',
                next: 'chen_spicy',
            },
            chen_spicy: {
                speaker: '陈叔',
                text: '（从货架上拿了一包递过来）五毛。我跟你说，这个新出的口味可辣了，别怪我没提醒你。',
                next: 'linyu_spicy',
            },
            linyu_spicy: {
                speaker: '林瑜',
                text: '没事，我能吃辣。',
                next: 'chen_remember',
            },
            chen_remember: {
                speaker: '陈叔',
                text: '你上次也说能，喝了半瓶水。',
                next: 'after_buy',
            },
            buy_popsicle: {
                speaker: '林瑜',
                text: '陈叔，我要一个绿舌头。',
                next: 'chen_popsicle',
            },
            chen_popsicle: {
                speaker: '陈叔',
                text: '（打开冰柜翻找）绿舌头……今天卖得真好，就剩最后一个了。你运气好。（递过来）五毛。',
                next: 'after_buy',
            },
            just_look: {
                speaker: '陈叔',
                text: '随便看看可以啊，别碰那个玻璃柜台，上面有油。',
                next: 'after_buy',
            },
            after_buy: {
                speaker: '陈叔',
                text: '两块钱找你……一块五。拿好了啊。回去别让你妈知道又买零食了，回头她又要来说我。',
                next: 'business_talk',
            },
            business_talk: {
                speaker: '林瑜',
                text: '陈叔，今天生意怎么样？',
                next: 'chen_business',
            },
            chen_business: {
                speaker: '陈叔',
                text: '（推了推眼镜）就那样吧。对面开了个超市，比我这儿大，东西也多。现在的小孩都喜欢去那边了。（顿了顿）不过还是有人会来的。习惯了的老顾客，还是会来的。',
                next: 'olympic_news',
            },
            olympic_news: {
                speaker: '陈叔',
                text: '（电视里在播新闻）北京奥运会还有两个月了……你说咱们国家什么时候也能办一次啊？（忽然自嘲地笑了一下）哦，今年就是啊。我老糊涂了。',
                next: 'chen_farewell',
            },
            chen_farewell: {
                speaker: '林瑜',
                text: '陈叔，我走了。',
                next: 'chen_bye',
            },
            chen_bye: {
                speaker: '陈叔',
                text: '嗯，下次再来。（低头继续整理货架，忽然抬头）对了——告诉小萌，她上回那个刮奖卡中了五毛，还没来领呢。',
                end: true,
                memory: { id: 'store_visit', name: '陈叔的小卖部' },
            },
        },
    },

    // ===== 李老师 =====
    teacher_li: {
        id: 'teacher_li',
        npcName: '李老师',
        start: 'classroom_meet',
        visitKey: 'teacher_li',
        nodes: {
            classroom_meet: {
                speaker: '李老师',
                text: '（推开教室门，李老师正站在讲台边，低头看教案）哦，你来了。',
                next: 'linyu_surprise',
            },
            linyu_surprise: {
                speaker: '林瑜',
                text: '李老师……您怎么在这里？',
                next: 'teacher_saturday',
            },
            teacher_saturday: {
                speaker: '李老师',
                text: '今天是周六，我不该在这里吗？（放下教案）你来学校做什么？暑假作业忘拿了？',
                choices: [
                    { text: '我……就是回来看看', next: 'visit_school' },
                    { text: '我也不知道为什么会来这里', next: 'dont_know_why' },
                ],
            },
            visit_school: {
                speaker: '李老师',
                text: '（点点头）好。回来看看好。人总要记得自己是从哪里出发的。',
                next: 'essay_talk',
            },
            dont_know_why: {
                speaker: '李老师',
                text: '不知道也没关系。有时候不需要知道为什么，只需要知道——你已经在这里了。',
                next: 'essay_talk',
            },
            essay_talk: {
                speaker: '李老师',
                text: '（翻开教案本，里面夹着一张泛黄的作文纸）你还记得你写过一篇作文吗？题目是《二十年后的我》。',
                next: 'linyu_essay',
            },
            linyu_essay: {
                speaker: '林瑜',
                text: '好像……写过。',
                next: 'teacher_read_essay',
            },
            teacher_read_essay: {
                speaker: '李老师',
                text: '你写的是——「二十年后我二十五岁，应该已经实现了所有的梦想。」（轻轻笑了一下）你那时候可真敢写啊。',
                choices: [
                    { text: '我现在活成了作文里没写到的那种人', next: 'ironic_reality' },
                    { text: '我已经忘了那篇作文写了什么', next: 'forgot_essay' },
                ],
            },
            ironic_reality: {
                speaker: '李老师',
                text: '（沉默了一会儿）作文嘛……写的是愿望，不是预言。没人规定二十年后的你一定要是什么样子。（把作文纸折好放回教案本）但我还是觉得——那个写作文的小女孩，她现在也一定在某个地方好好地活着。',
                next: 'teacher_farewell',
            },
            forgot_essay: {
                speaker: '李老师',
                text: '忘了也好。有些东西忘记了，才会在某一天突然想起来。到时候——你会惊喜的。原来我曾经是这样想的。',
                next: 'teacher_farewell',
            },
            teacher_farewell: {
                speaker: '林瑜',
                text: '嗯……谢谢您，李老师。',
                next: 'teacher_final',
            },
            teacher_final: {
                speaker: '李老师',
                text: '谢我做什么。我什么都没做。（低头看教案，又抬头）对了——那篇作文我给你打了「优秀」。我一直觉得，你值得这个评价。不管是二十年前，还是现在。',
                end: true,
                memory: { id: 'teacher_essay', name: '二十年后的我' },
            },
        },
    },

    // ===== 神秘男孩 =====
    mysterious_boy: {
        id: 'mysterious_boy',
        npcName: '？？？',
        start: 'first_encounter',
        visitKey: 'mysterious_boy',
        nodes: {
            first_encounter: {
                speaker: '？？？',
                text: '（坐在秋千上，轻轻地晃着。他没有看你）你来了。',
                next: 'linyu_who',
            },
            linyu_who: {
                speaker: '林瑜',
                text: '你是谁？',
                next: 'boy_smile',
            },
            boy_smile: {
                speaker: '？？？',
                text: '（轻轻笑了一下）你心里有一个答案的。说出来吧。',
                choices: [
                    { text: '你是……小时候的我？', next: 'no_direct_answer' },
                    { text: '你是这个梦的守护者？', next: 'no_direct_answer' },
                    { text: '我不知道', next: 'no_direct_answer' },
                ],
            },
            no_direct_answer: {
                speaker: '？？？',
                text: '这不重要。重要的是——你为什么回来？',
                next: 'linyu_dream',
            },
            linyu_dream: {
                speaker: '林瑜',
                text: '我不知道……我一觉醒来就在这里了。',
                next: 'boy_truth',
            },
            boy_truth: {
                speaker: '？？？',
                text: '没有人会「不小心」回到这里。是你想回来的。你的心比你的脑子先做了决定。',
                next: 'linyu_wrong',
            },
            linyu_wrong: {
                speaker: '林瑜',
                text: '这里的一切……都和我记忆中的一模一样。但又有哪里不对。',
                next: 'boy_explain',
            },
            boy_explain: {
                speaker: '？？？',
                text: '（从秋千上跳下来）当然不对。因为这不是 2008 年。这是你记忆中的 2008 年。不一样的事物被留下了，不重要的被忘记了。这里不是真实的世界——这里是你的心。',
                next: 'how_back',
            },
            how_back: {
                speaker: '林瑜',
                text: '那……我怎么才能回去？',
                next: 'boy_return',
            },
            boy_return: {
                speaker: '？？？',
                text: '你随时都可以回去。你只需要闭上眼睛，数到三。（停顿）但你还没准备好，是吗？',
                next: 'linyu_silent',
            },
            linyu_silent: {
                speaker: '林瑜',
                text: '……',
                next: 'boy_time',
            },
            boy_time: {
                speaker: '？？？',
                text: '没关系。反正……时间在这里是静止的。你想待多久都可以。（走开两步，又回头）不过别待太久。待久了，你会不想走的。',
                next: 'final_encounter',
            },
            final_encounter: {
                speaker: '？？？',
                text: '（站在游乐场的出口，像是在等你）你要走了？',
                next: 'linyu_leave',
            },
            linyu_leave: {
                speaker: '林瑜',
                text: '嗯。该回去了。',
                next: 'boy_question',
            },
            boy_question: {
                speaker: '？？？',
                text: '（点点头）找到你想找的东西了吗？',
                choices: [
                    { text: '找到了……也说不清楚找到了什么', next: 'vague_answer' },
                    { text: '没有。但我好像没那么难过了', next: 'less_sad' },
                ],
            },
            vague_answer: {
                speaker: '？？？',
                text: '（轻轻笑了一下）那就够了。有时候说不清楚的东西，才是最重要的。走吧。别回头。',
                next: 'true_goodbye',
            },
            less_sad: {
                speaker: '？？？',
                text: '（第一次转头看了你一眼——他的脸还是模糊的，但你能感觉到他在笑）那就好。那就没有白回来一趟。',
                next: 'true_goodbye',
            },
            true_goodbye: {
                speaker: '？？？',
                text: '（退后一步，阳光在他身后拉出一道长长的影子）下次再来的话……我可能就不在这里了。因为你会好好的了。不需要再回来了。（他的声音开始变远）林瑜——谢谢你回来。',
                end: true,
                memory: { id: 'mysterious_boy', name: '秋千上的男孩' },
            },
        },
        getStartNode(visitCount) {
            return visitCount === 0 ? 'first_encounter' : 'final_encounter';
        },
    },

    // ===== 妈妈（回忆语音）=====
    mom_voice: {
        id: 'mom_voice',
        npcName: '妈妈',
        start: 'kitchen_voice',
        visitKey: 'mom_voice',
        nodes: {
            kitchen_voice: {
                speaker: '妈妈',
                text: '（从厨房传来，伴随着锅铲翻炒的声音）醒了？西瓜在冰箱里，自己切啊。别切到手。',
                next: 'empty_kitchen',
            },
            empty_kitchen: {
                speaker: '林瑜',
                text: '（走到厨房门口——厨房里没有人。灶台上的火开着，锅里在炒着什么，但没有人）',
                end: true,
            },
            going_out: {
                speaker: '妈妈',
                text: '（从客厅传来）零花钱在抽屉里，自己拿。别买那些垃圾食品，听到了没？',
                next: 'linyu_ok',
            },
            linyu_ok: {
                speaker: '林瑜',
                text: '知道了——',
                next: 'mom_dinner',
            },
            mom_dinner: {
                speaker: '妈妈',
                text: '（远了一些）晚饭前回来！今天做了你爱吃的糖醋排骨！',
                end: true,
            },
            tv_voice: {
                speaker: '妈妈',
                text: '（从客厅传来）作业写完了吗就开电视？',
                next: 'linyu_done',
            },
            linyu_done: {
                speaker: '林瑜',
                text: '写完了——',
                next: 'mom_check',
            },
            mom_check: {
                speaker: '妈妈',
                text: '（脚步声走近）我看看……（停顿）你这个字写得越来越潦草了。以后考试要扣卷面分的。',
                next: 'linyu_oh',
            },
            linyu_oh: {
                speaker: '林瑜',
                text: '哦……',
                next: 'mom_forgive',
            },
            mom_forgive: {
                speaker: '妈妈',
                text: '（叹了口气，但伸手摸了摸你的头）算了，放假了，今天就让你看吧。',
                end: true,
            },
            evening_voice: {
                speaker: '妈妈',
                text: '（像是从很远的地方传来）吃饭了——去洗手！',
                next: 'empty_table',
            },
            empty_table: {
                speaker: '林瑜',
                text: '（转身——饭桌上已经摆好了碗筷，两副。但只有她一个人。）',
                end: true,
            },
        },
        getStartNode(visitCount) {
            const keys = ['kitchen_voice', 'going_out', 'tv_voice', 'evening_voice'];
            return keys[visitCount % keys.length];
        },
    },
};
