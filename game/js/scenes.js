// ==========================================
// 重返2008：梦境碎片 - 场景管理器 v5
// AI 原画 + 热点抠图交互（悬浮轮廓发光）
// ==========================================

const SceneManager = {
    currentScene: null,
    currentChapter: null,
    collectedMemories: new Set(),
    visitedObjects: {},
    bgLayerActive: 'a',
    preloadedImages: {},

    init() {
        this.preloadAllBackgrounds();
    },

    preloadAllBackgrounds() {
        Object.values(GAME_CONFIG.scenes).forEach(cfg => {
            if (cfg.bgImage) this.preloadImage(cfg.bgImage);
        });
    },

    preloadImage(url) {
        if (this.preloadedImages[url]) return this.preloadedImages[url];
        const img = new Image();
        img.src = url;
        this.preloadedImages[url] = img;
        return img;
    },

    applyLayerClasses(layers, chapterId) {
        const cfg = GAME_CONFIG.scenes[chapterId];
        layers.forEach(layer => {
            layer.classList.remove('warm-shift', 'cool-shift', 'vhs-effect', 'has-ai-bg');
            if (cfg?.className) {
                cfg.className.split(' ').forEach(cls => layer.classList.add(cls));
            }
        });
    },

    renderCssFallback(chapterId, layerEl) {
        layerEl.style.backgroundImage = '';
        layerEl.classList.remove('has-ai-bg');
        SceneArt.render(chapterId, layerEl);
    },

    renderAiBackground(chapterId, layerEl, imageUrl) {
        layerEl.innerHTML = '';
        layerEl.style.backgroundImage = `url('${imageUrl}')`;
        layerEl.style.backgroundSize = 'cover';
        layerEl.style.backgroundPosition = 'center';
        layerEl.classList.add('has-ai-bg');
    },

    transitionBackground(chapterId, onComplete) {
        const a = document.getElementById('bg-layer-a');
        const b = document.getElementById('bg-layer-b');
        if (!a || !b) { if (onComplete) onComplete(); return; }

        const cur = this.bgLayerActive === 'a' ? a : b;
        const next = this.bgLayerActive === 'a' ? b : a;
        const cfg = GAME_CONFIG.scenes[chapterId];

        cur.classList.remove('active');

        const finish = () => {
            next.classList.add('active');
            this.bgLayerActive = this.bgLayerActive === 'a' ? 'b' : 'a';
            this.applyLayerClasses([a, b], chapterId);
            if (onComplete) onComplete();
        };

        if (cfg?.bgImage) {
            const img = this.preloadImage(cfg.bgImage);
            const fallback = () => {
                console.warn('背景图加载失败，使用 CSS 兜底:', cfg.bgImage);
                this.renderCssFallback(chapterId, next);
                finish();
            };
            const apply = () => {
                this.renderAiBackground(chapterId, next, cfg.bgImage);
                finish();
            };
            if (img.complete) {
                if (img.naturalWidth > 0) apply();
                else fallback();
            } else {
                img.onload = apply;
                img.onerror = fallback;
            }
        } else {
            this.renderCssFallback(chapterId, next);
            finish();
        }
    },

    loadScene(chapterId) {
        const data = SCENE_DATA[chapterId];
        if (!data) return;
        this.currentChapter = chapterId;
        this.currentScene = data;

        const container = document.getElementById('scene-container');
        if (!container) return;
        container.innerHTML = '';

        this.transitionBackground(chapterId);

        const scene = document.createElement('div');
        scene.className = 'scene scene-hotspot-mode';
        const cfg = GAME_CONFIG.scenes[chapterId];
        if (cfg?.className) cfg.className.split(' ').forEach(cls => scene.classList.add(cls));
        if (data.sunRays) EffectsSystem.addSunRays(scene);

        const hotspotLayer = document.createElement('div');
        hotspotLayer.className = 'hotspot-layer';
        data.objects.forEach(obj => this.createHotspot(hotspotLayer, obj, chapterId));
        scene.appendChild(hotspotLayer);

        container.appendChild(scene);
        EffectsSystem.updateMemoryUI(this.collectedMemories.size, Game.totalMemories || 10, '');
    },

    createHotspot(layer, obj, chapterId) {
        const hs = obj.hotspot || HotspotData.get(chapterId, obj.id);
        if (!hs) return;

        const el = document.createElement('div');
        el.className = 'scene-hotspot';
        el.id = `item-${obj.id}`;
        el.dataset.name = obj.name;
        el.title = '';

        if (obj.isNPC) el.classList.add('hotspot-npc');
        if (obj.isKey) el.classList.add('hotspot-key');
        if (obj.isExit) el.classList.add('hotspot-exit');

        const vk = `${chapterId}_${obj.id}`;
        if (this.visitedObjects[vk]) el.classList.add('hotspot-visited');
        if (obj.isMemory && this.collectedMemories.has(obj.id)) el.classList.add('hotspot-memory');

        const shape = hs.shape || 'rect';
        el.classList.add(`shape-${shape}`);

        el.style.cssText = `
            left:${hs.x}%;top:${hs.y}%;
            width:${hs.w}%;height:${hs.h}%;
        `;

        const glow = document.createElement('div');
        glow.className = 'hotspot-glow';
        el.appendChild(glow);

        el.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleItemClick(obj, e);
        });

        layer.appendChild(el);
    },

    handleItemClick(obj, event) {
        const vk = `${this.currentChapter}_${obj.id}`;
        this.visitedObjects[vk] = true;

        const el = document.getElementById(`item-${obj.id}`);
        if (el) el.classList.add('hotspot-visited');

        if (obj.onClick === 'npc' && obj.dialogueTree) {
            AudioSystem.playSFX('sfx_page', 0.3);
            DialogueSystem.start(obj.dialogueTree);
            return;
        }

        if (obj.dialog) {
            AudioSystem.playSFX('sfx_page', 0.2);
            EffectsSystem.showDialog(obj.dialog.speaker, obj.dialog.text);
        }

        if (obj.isTrigger) {
            setTimeout(() => {
                EffectsSystem.showMonologue('你盯着电话屏幕上的时间看了很久。\n2008年6月21日。\n楼下传来一个声音——\n"林——瑜——！你怎么还没好啊！"', 4000);
            }, 1500);
        }

        if (obj.isMemory && !this.collectedMemories.has(obj.id)) {
            this.collectedMemories.add(obj.id);
            if (typeof Game !== 'undefined') Game.collectedMemories = this.collectedMemories;
            AudioSystem.playSFX('sfx_memory', 0.4);
            EffectsSystem.memoryFlash();
            if (event) EffectsSystem.spawnParticles(event.clientX, event.clientY, 12, '#ffd700');
            EffectsSystem.updateMemoryUI(this.collectedMemories.size, Game.totalMemories || 10, obj.memoryName || obj.name);
            el?.classList.add('hotspot-memory');
        }

        if (obj.isExit) {
            EffectsSystem.triggerGlitch(400);
            AudioSystem.playSFX('sfx_glitch', 0.3);
            VoiceSystem.stop();
            setTimeout(() => { if (typeof Game !== 'undefined') Game.nextChapter(); }, 600);
        }

        if (obj.isEnding) {
            setTimeout(() => {
                EffectsSystem.showMonologue('窗外阳光明媚。\n虽然回不去2008，但那份温暖留在了心里。\n林瑜拉上窗帘。\n星期天。不上班。\n她决定去买一盒水彩。', 6000);
            }, 1000);
            setTimeout(() => {
                if (typeof Game !== 'undefined') Game.showEnding();
            }, 7000);
        }
    },

    getMemoryProgress() {
        return { collected: this.collectedMemories.size, total: Game.totalMemories || 10 };
    },

    reset() {
        this.currentScene = null;
        this.currentChapter = null;
        this.collectedMemories = new Set();
        this.visitedObjects = {};
        DialogueSystem.reset();
        VoiceSystem.stop();
        EffectsSystem.updateMemoryUI(0, Game.totalMemories || 10, '');
    },
};
