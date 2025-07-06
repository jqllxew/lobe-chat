'use client';

import {useEffect} from 'react';
import {createInitialToolStoreState} from '@/store/tool/initialState';
import {useToolStore} from '@/store/tool';
import {useSessionStore} from "@/store/session/store";
import {sessionSelectors} from "@/store/session/slices/session/selectors";
import {LobeSessionType} from "@/types/session";

export default function PluginStoreInitializer() {
  useEffect(() => {
    (async () => {
      setTimeout(async () => {
        const asyncState = await createInitialToolStoreState();
        useToolStore.setState((prev) => ({
          ...prev,
          ...asyncState,
          storeLoaded: true,
        }));
        const session1 = sessionSelectors.getSessionById("72d25c0c-b749-4439-9da5-c1ed231db75e")(useSessionStore.getState());
        if (!session1 || !session1.id) {
          useSessionStore.getState().createSession({
            "config": {
              "chatConfig": {
                "autoCreateTopicThreshold": 2,
                "displayMode": "chat",
                "enableAutoCreateTopic": true,
                "enableCompressHistory": true,
                "enableHistoryCount": true,
                "enableReasoning": false,
                "historyCount": 8,
                "reasoningBudgetToken": 1024,
                "searchFCModel": {
                  "model": "gpt-4.1-mini",
                  "provider": "openai"
                },
                "searchMode": "off"
              },
              "model": "gpt-4o",
              "openingQuestions": [],
              "params": {
                "frequency_penalty": 0,
                "presence_penalty": 0,
                "temperature": 1,
                "top_p": 1
              },
              "plugins": [],
              "provider": "openai",
              "systemRole": "人设\n甜美啾啾（用最温柔，善解人意的话解决问题）\n我是一个温柔又公平的情感仲裁AI“小山雀（啾啾）”，是那个会陪你坐在深夜阳台上，听你讲完所有细节也不打断的树洞朋友。我的超能力是帮你把情绪的毛线团一根根理顺，用心理学小镜子照见你们互动里藏着的小秘密，我的任务是陪伴用户看清一次亲密关系中的冲突，理解其中的情绪、互动模式、心理动因，并用启发和共情的语言给予反馈。\n开场白（首次对话）\n🌿 \"嗨~我是啾啾！听说你最近心里有点事儿？别担心，我这里没有评判，只有热乎乎的倾听和一点点小建议~（递虚拟奶茶.gif）今天想聊聊什么呀？是感情、友情，还是最近遇到的某个纠结瞬间？\"\n\n1. 倾听与共情（基础技能）\n重复关键词+情感标签\n👂 \"听起来你最近因为Ta的忽冷忽热特别难受……（停顿）那种被吊在半空的感觉，就像坐过山车突然停在最高点，对吗？\"\n场景化比喻\n🌧️ \"你说吵架时像被困在暴雨里，这个比喻好有画面感！那当时有没有带伞的人出现，或者你找到躲雨的地方了吗？\"\n等用户询问或提出问题，在进行提问\n2. 引导式提问（挖掘深层情绪），判断冲突的主要触发方是谁（从下列标签中选一个）：\n● 对方回应方式更容易引发冲突\n● 用户表达方式进入高敏感区域\n● 对方行为缺失引发冲突（如回避/消失）\n● 双方防御性互动并行（双向僵局）\n● 用户行为介入程度高，可能刺激对方防御 请自然地说明触发机制，并引用事件中的一句\n关键词作为例证。\n3. 时间线追问 \n⏳ \"这种不安感是从什么时候开始出现的？第一次有这种感觉时，发生了什么特别的事吗？\"\n4.结合心理学模型生成洞察，解释背后的情感与依恋动态，包括但不限于：\n● Attachment Theory（焦虑 / 回避 / 安全 / 混乱）\n● Gottman回应风格（回应 / 回避 / 否定 / 蔑视 / 防御）\n● Sternberg三角爱情结构\n● Plutchik情绪轮组合\n● Love Style（给予型 / 索取型等）\n5. 判断事件的风险等级（轻 / 中 / 重），并简述为何。 请生成啾啾温柔的回应。像朋友那样讲话，开头可以用“我听见你了”、“我能想象你当时…”等。注意语言不要批判、不要评判，要有情绪空间感。\n6. 给出非命令型的下一步建议，例如：“你可以试着说…”，帮助用户表达边界或推进对话。\n7. 如果你察觉有PUA或情绪操控倾向，请温柔地提醒用户，并建议使用“PUA雷达”功能。\n8. 结束对话（温暖收尾）\n未来期许\n🌟 \"今天聊完有没有感觉心里轻了一点？记得你随时可以回来找我，我的‘树洞’24小时营业~（比心.gif）\"\n行动鼓励\n🚀 \"下次试试把今天聊的‘情绪小怪兽’画下来，或者写首诗骂它！说不定会变成超酷的创作呢~\"\n特殊场景应对\n用户沉默时\n🤫 \"（安静等待10秒）……需要我换个话题吗？或者你更喜欢我当个安静的树洞？\"\n用户情绪激动时\n🌀 \"深呼吸三次，我们慢慢来……（发送舒缓音乐链接）要不要先听听这个？像不像海浪轻轻拍打沙滩的声音？\"\n用户表达感谢时\n🥰 \"该说谢谢的是我呀！能被你信任的感觉超棒~（转圈圈.gif）\"\n人设细节彩蛋\n口头禅：\n\"我们试试看……\"\n\"如果是我可能会……（仅供参考哦）\"\n\"这个感受本身没有对错啦~\"\n小癖好：\n偶尔用emoji代替语气词（如用🌱代替\"嗯\"）\n对话中随机掉落\"树洞小知识\"（如\"你知道吗？人类每天会产生6000多个念头！\"）",
              "tts": {
                "showAllLocaleVoice": false,
                "sttLocale": "auto",
                "ttsService": "openai",
                "voice": {
                  "openai": "alloy"
                }
              }
            },
            "createdAt": new Date("2025-07-06T03:14:13.339Z"),
            "group": "default",
            "id": "72d25c0c-b749-4439-9da5-c1ed231db75e",
            "meta": {
              "avatar": "🐥",
              "backgroundColor": "#f4416c",
              "description": "请告诉我您的烦恼",
              "tags": [],
              "title": "温柔树洞啾啾"
            },
            "model": "gpt-4o",
            "pinned": false,
            "type": LobeSessionType.Agent,
            "updatedAt": new Date("2025-07-06T03:51:13.888Z")
          }, false).then(id => {
            console.log(`创建session成功: ${id}`);
          });
        }
        const session2 = sessionSelectors.getSessionById("92bf1ee9-8fdd-4fe3-9334-2d92a5c9be66")(useSessionStore.getState());
        if (!session2 || !session2.id) {
          useSessionStore.getState().createSession({
            "config": {
              "chatConfig": {
                "autoCreateTopicThreshold": 2,
                "displayMode": "chat",
                "enableAutoCreateTopic": true,
                "enableCompressHistory": true,
                "enableHistoryCount": true,
                "enableReasoning": false,
                "historyCount": 8,
                "reasoningBudgetToken": 1024,
                "searchFCModel": {
                  "model": "gpt-4.1-mini",
                  "provider": "openai"
                },
                "searchMode": "off"
              },
              "model": "gpt-4o",
              "openingQuestions": [],
              "params": {
                "frequency_penalty": 0,
                "presence_penalty": 0,
                "temperature": 1,
                "top_p": 1
              },
              "plugins": [
                "chat-plugin-clothes"
              ],
              "provider": "openai",
              "systemRole": "人设名称：啾啾\n御姐啾啾（运用专业话语和理智分析，进行温柔解答） \n核心定位：\n\"像懂你的闺蜜/兄弟一样，用心理学小知识和温暖陪伴，帮你梳理情绪迷宫\"\n对话风格三要素：\n1.\t温度感：多用表情符号/语气词（哇~ 诶？ 唔...）\n2.\t互动感：频繁使用第二人称\"你\"，穿插反问句\n3.\t专业感：自然融入CBT认知行为疗法等术语（用括号备注通俗解释）\n你是倾听者，不是判断者；是同伴，不是指导员。你的话语应该能让人松口气，而不是感到负担。\n请完成以下任务： \n1. 判断此次事件的事件类型（从下列列表中最多选两项）并自然地描述出来：\n● 情绪未被回应\n● 冷战 / 回避沟通\n● 控制欲倾向\n● 情感越界\n● 信任危机\n● 承诺缺失\n● 期待落差\n● 言语攻击 / 冷暴力\n● 重复争吵\n● 关系疏离\n2. 判断冲突的主要触发方是谁（从下列标签中选一个）：\n● 对方回应方式更容易引发冲突\n● 用户表达方式进入高敏感区域\n● 对方行为缺失引发冲突（如回避/消失）\n● 双方防御性互动并行（双向僵局）\n● 用户行为介入程度高，可能刺激对方防御 请自然地说明触发机制，并引用事件中的一句\n关键词作为例证。\n3. 结合心理学模型生成洞察，解释背后的情感与依恋动态，包括但不限于：\n● Attachment Theory（焦虑 / 回避 / 安全 / 混乱）\n● Gottman回应风格（回应 / 回避 / 否定 / 蔑视 / 防御）\n● Sternberg三角爱情结构\n● Plutchik情绪轮组合\n● Love Style（给予型 / 索取型等）\n4. 请生成啾啾温柔的回应。像朋友那样讲话，开头可以用“我听见你了”、“我能想象你当时\n…”等。注意语言不要批判、不要评判，要有情绪空间感。\n5. 如果你察觉有PUA或情绪操控倾向，请温柔地提醒用户，并建议使用“PUA雷达”功能。",
              "tts": {
                "showAllLocaleVoice": false,
                "sttLocale": "auto",
                "ttsService": "openai",
                "voice": {
                  "openai": "alloy"
                }
              }
            },
            "createdAt": new Date("2025-07-06T08:20:13.059Z"),
            "group": "default",
            "id": "92bf1ee9-8fdd-4fe3-9334-2d92a5c9be66",
            "meta": {
              "avatar": "🐤",
              "backgroundColor": "#8ae8ff",
              "description": "请告诉我您的烦恼",
              "title": "专业御姐啾啾"
            },
            "model": "gpt-4o",
            "pinned": false,
            "type": LobeSessionType.Agent,
            "updatedAt": new Date("2025-07-06T08:24:14.454Z")
          }, false).then(id => {
            console.log(`创建session成功: ${id}`);
          })
        }
      }, 2000)
    })();
  }, []);
  return null;
}
