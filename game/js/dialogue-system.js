// ==========================================
// 重返2008：梦境碎片 - 对话系统
// 支持分支选项、打字机效果、NPC 状态追踪
// ==========================================

const DialogueSystem = {
    currentTree: null,
    currentNodeId: null,
    npcVisits: {},
    isActive: false,
    onEndCallback: null,

    init() {
        this.npcVisits = {};
    },

    /** 开始一段 NPC 对话 */
    start(treeId, onEnd) {
        const tree = DIALOGUE_TREES[treeId];
        if (!tree) return false;

        this.currentTree = tree;
        this.onEndCallback = onEnd || null;
        this.isActive = true;

        const visitKey = tree.visitKey || treeId;
        const count = this.npcVisits[visitKey] || 0;
        const startId = tree.getStartNode ? tree.getStartNode(count) : tree.start;

        this.npcVisits[visitKey] = count + 1;
        this.showNode(startId);
        return true;
    },

    showNode(nodeId) {
        const node = this.currentTree?.nodes[nodeId];
        if (!node) {
            this.endDialogue();
            return;
        }
        this.currentNodeId = nodeId;

        if (node.choices && node.choices.length > 0) {
            EffectsSystem.showDialogWithChoices(
                node.speaker,
                node.text,
                node.choices.map(c => ({
                    text: c.text,
                    action: () => this.handleChoice(c),
                })),
            );
        } else {
            EffectsSystem.showDialog(node.speaker, node.text);
            EffectsSystem.setDialogAdvanceHandler(() => {
                EffectsSystem.hideDialog();
                if (node.end) {
                    this.handleNodeEnd(node);
                } else if (node.next) {
                    this.showNode(node.next);
                } else {
                    this.endDialogue();
                }
            });
        }
    },

    handleChoice(choice) {
        if (choice.effect?.affection) {
            // 可扩展好感度系统
        }
        VoiceSystem.stop();
        EffectsSystem.hideDialog();
        EffectsSystem.clearDialogChoices();
        if (choice.next) {
            this.showNode(choice.next);
        } else {
            this.endDialogue();
        }
    },

    handleNodeEnd(node) {
        if (node.memory && typeof SceneManager !== 'undefined') {
            const mem = node.memory;
            if (!SceneManager.collectedMemories.has(mem.id)) {
                SceneManager.collectedMemories.add(mem.id);
                if (typeof Game !== 'undefined') Game.collectedMemories = SceneManager.collectedMemories;
                AudioSystem.playSFX('sfx_memory', 0.4);
                EffectsSystem.memoryFlash();
                EffectsSystem.updateMemoryUI(
                    SceneManager.collectedMemories.size,
                    Game?.totalMemories || 10,
                    mem.name,
                );
            }
        }
        this.endDialogue();
    },

    endDialogue() {
        this.isActive = false;
        this.currentTree = null;
        this.currentNodeId = null;
        EffectsSystem.clearDialogChoices();
        EffectsSystem.setDialogAdvanceHandler(null);
        if (typeof Game !== 'undefined' && Game.state === 'dialog') {
            Game.state = 'playing';
        }
        if (this.onEndCallback) {
            const cb = this.onEndCallback;
            this.onEndCallback = null;
            cb();
        }
    },

    getVisitCount(treeId) {
        const tree = DIALOGUE_TREES[treeId];
        const key = tree?.visitKey || treeId;
        return this.npcVisits[key] || 0;
    },

    reset() {
        this.npcVisits = {};
        this.isActive = false;
        this.currentTree = null;
        this.currentNodeId = null;
        this.onEndCallback = null;
    },
};
