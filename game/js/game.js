// ==========================================
// 重返2008：梦境碎片 - 主游戏逻辑（完整剧本版）
// ==========================================

const Game = {
    state: 'title',
    currentChapter: null,
    chapterSequence: ['prologue', 'chapter1', 'chapter2', 'chapter3', 'epilogue'],
    chapterIndex: -1,
    isTransitioning: false,
    collectedMemories: new Set(),

    init() {
        EffectsSystem.init();
        EffectsSystem.injectStyles();
        VoiceSystem.init();
        DialogueSystem.init();
        SceneManager.init();
        AudioSystem.init();
        this.bindEvents();
        this.showTitle();
        this.updateVoiceToggleUI();
        // 预加载 audio
        setTimeout(() => AudioSystem.loadAmbientTracks(), 500);
    },

    bindEvents() {
        document.getElementById('start-btn')?.addEventListener('click', () => this.startGame());
        document.getElementById('restart-btn')?.addEventListener('click', () => this.restartGame());
        document.getElementById('voice-toggle')?.addEventListener('click', (e) => {
            e.stopPropagation();
            VoiceSystem.toggle();
            this.updateVoiceToggleUI();
        });

        document.getElementById('dialog-box')?.addEventListener('click', () => {
            EffectsSystem.advanceDialog();
        });

        document.getElementById('inner-monologue')?.addEventListener('click', () => {
            document.getElementById('inner-monologue')?.classList.add('hidden');
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                if (this.state === 'title') this.startGame();
                else EffectsSystem.advanceDialog();
            }
            if (e.key === 'Escape') EffectsSystem.hideDialog();
        });
    },

    updateVoiceToggleUI() {
        const btn = document.getElementById('voice-toggle');
        if (!btn) return;
        btn.textContent = VoiceSystem.enabled ? '🔊 配音开' : '🔇 配音关';
        btn.classList.toggle('voice-off', !VoiceSystem.enabled);
    },

    showTitle() {
        this.state = 'title';
        document.body.classList.add('state-title');
        document.getElementById('title-screen')?.classList.remove('hidden');
        EffectsSystem.hideDialog();
        document.getElementById('ending-screen')?.classList.add('hidden');
        document.getElementById('memory-collection')?.classList.add('hidden');
    },

    startGame() {
        AudioSystem.resume();
        document.body.classList.remove('state-title');
        document.getElementById('title-screen')?.classList.add('hidden');
        this.state = 'playing';
        this.chapterIndex = -1;
        this.collectedMemories = new Set();
        SceneManager.collectedMemories = new Set();
        SceneManager.visitedObjects = {};
        DialogueSystem.reset();
        EffectsSystem.updateMemoryUI(0, this.totalMemories, '');
        setTimeout(() => this.nextChapter(), 500);
    },

    get totalMemories() { return 12; },

    nextChapter() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.chapterIndex++;
        if (this.chapterIndex >= this.chapterSequence.length) {
            this.isTransitioning = false;
            this.showEnding();
            return;
        }
        const chapterId = this.chapterSequence[this.chapterIndex];
        const cfg = GAME_CONFIG.scenes[chapterId];
        if (!cfg) { this.isTransitioning = false; return; }
        this.currentChapter = chapterId;
        this.state = 'transition';

        EffectsSystem.transitionScene(() => {
            SceneManager.loadScene(chapterId);
            EffectsSystem.showChapterTitle(cfg.title, cfg.subtitle, 3500);

            this.playChapterAudio(chapterId);

            const data = SCENE_DATA[chapterId];
            if (data?.introMonologue) {
                setTimeout(() => EffectsSystem.showMonologue(data.introMonologue, 4500), 1500);
            }
            setTimeout(() => { this.isTransitioning = false; this.state = 'playing'; }, 2000);
        });
    },

    playChapterAudio(chapterId) {
        AudioSystem.stopAll();
        switch (chapterId) {
            case 'prologue':
                AudioSystem.playAmbient('ambient_cicada', 0.35);
                break;
            case 'chapter1':
                AudioSystem.playAmbient('ambient_cicada', 0.3);
                break;
            case 'chapter2':
                AudioSystem.playAmbient('ambient_cicada', 0.25);
                AudioSystem.playBGM('bgm_beijing_lofi', 0.15);
                break;
            case 'chapter3':
                AudioSystem.playAmbient('ambient_children', 0.2);
                AudioSystem.playBGM('bgm_music_box', 0.18);
                break;
            case 'epilogue':
                AudioSystem.playAmbient('ambient_fridge', 0.2);
                break;
        }
    },

    showEnding() {
        this.state = 'ending';
        VoiceSystem.stop();
        AudioSystem.stopAll();
        const screen = document.getElementById('ending-screen');
        const tEl = document.getElementById('ending-title');
        const xEl = document.getElementById('ending-text');
        if (!screen) return;

        const count = this.collectedMemories.size;
        const total = this.totalMemories;

        if (count >= 8) {
            tEl.textContent = '记忆已归档';
            xEl.textContent = `你找到了 ${count}/${total} 个记忆碎片。\n\n那些被遗忘的瞬间，如今再次清晰起来。\n\n2008年的阳光、蝉鸣、妈妈的字条、\n绿舌头的甜味、蔷薇花墙下的约定……\n\n它们从未真正离开。\n\n林瑜没有辞职。但她开始画画了。\n2028年秋天，她出了一本水彩画集。\n书名叫做《2008年的夏天》。\n\n她把画集寄了一本到深圳。\n收件人：周小萌。`;
        } else if (count >= 4) {
            tEl.textContent = '半梦半醒';
            xEl.textContent = `你找到了 ${count}/${total} 个记忆碎片。\n\n有些记忆回来了，有些永远留在了那个夏天。\n也许记忆就是这样——\n不是所有东西都需要被找回。\n\n林瑜看着窗外的阳光。\n她决定今天去买一盒水彩。`;
        } else {
            tEl.textContent = '匆匆一梦';
            xEl.textContent = `你只找到了 ${count}/${total} 个记忆碎片。\n\n梦境太短，来不及细看就醒了。\n但即使是最模糊的记忆，\n也在默默塑造着今天的你。\n\n也许下次入梦时。`;
        }
        EffectsSystem.transitionScene(() => screen.classList.remove('hidden'));
        document.getElementById('memory-collection')?.classList.add('hidden');
    },

    restartGame() {
        VoiceSystem.stop();
        AudioSystem.stopAll();
        document.getElementById('ending-screen')?.classList.add('hidden');
        const c = document.getElementById('scene-container');
        if (c) c.innerHTML = '';
        this.chapterIndex = -1;
        this.collectedMemories = new Set();
        SceneManager.collectedMemories = new Set();
        SceneManager.visitedObjects = {};
        DialogueSystem.reset();
        this.state = 'playing';
        EffectsSystem.updateMemoryUI(0, this.totalMemories, '');
        setTimeout(() => this.nextChapter(), 500);
    },
};

document.addEventListener('DOMContentLoaded', () => Game.init());
if (typeof window !== 'undefined') {
    window.Game = Game;
    window.SceneManager = SceneManager;
    window.EffectsSystem = EffectsSystem;
    window.AudioSystem = AudioSystem;
    window.VoiceSystem = VoiceSystem;
    window.DialogueSystem = DialogueSystem;
}
