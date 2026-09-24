// ==========================================
// 重返2008：梦境碎片 - 视觉特效系统
// ==========================================

const EffectsSystem = {
    // DOM元素缓存
    glitchLayer: null,
    staticNoise: null,
    sceneContainer: null,
    dialogBox: null,
    innerMonologue: null,
    hintSystem: null,
    chapterTitle: null,
    memoryCollection: null,
    itemTooltip: null,
    
    // 当前打字机效果计时器
    typewriterTimers: [],
    dialogAdvanceHandler: null,
    isTyping: false,
    
    // 初始化
    init() {
        this.glitchLayer = document.getElementById('glitch-layer');
        this.staticNoise = document.getElementById('static-noise');
        this.sceneContainer = document.getElementById('scene-container');
        this.dialogBox = document.getElementById('dialog-box');
        this.innerMonologue = document.getElementById('inner-monologue');
        this.hintSystem = document.getElementById('hint-system');
        this.chapterTitle = document.getElementById('chapter-title');
        this.memoryCollection = document.getElementById('memory-collection');
        this.itemTooltip = document.getElementById('item-tooltip');
    },
    
    // ========== 故障艺术效果 ==========
    triggerGlitch(duration = 300) {
        if (!this.glitchLayer) return;
        this.glitchLayer.classList.add('active');
        setTimeout(() => {
            this.glitchLayer.classList.remove('active');
        }, duration);
    },
    
    // ========== 雪花屏效果 ==========
    setStaticIntensity(intensity) {
        if (!this.staticNoise) return;
        if (intensity === 'intense') {
            this.staticNoise.classList.add('intense');
        } else if (intensity === 'normal') {
            this.staticNoise.classList.remove('intense');
        }
    },
    
    // ========== 画面闪烁 ==========
    screenFlicker() {
        if (!this.sceneContainer) return;
        this.sceneContainer.classList.add('screen-flicker');
        setTimeout(() => {
            this.sceneContainer.classList.remove('screen-flicker');
        }, 150);
    },
    
    // ========== 扭曲效果 ==========
    warpEffect() {
        if (!this.sceneContainer) return;
        this.sceneContainer.classList.add('warp-effect');
        setTimeout(() => {
            this.sceneContainer.classList.remove('warp-effect');
        }, 500);
    },
    
    // ========== 老电视关机效果 ==========
    tvPowerOff(callback) {
        if (!this.sceneContainer) return;
        this.sceneContainer.classList.add('tv-power-off');
        setTimeout(() => {
            this.sceneContainer.classList.remove('tv-power-off');
            if (callback) callback();
        }, 800);
    },
    
    // ========== 记忆闪回 ==========
    memoryFlash() {
        if (!this.sceneContainer) return;
        this.sceneContainer.classList.add('memory-flash');
        setTimeout(() => {
            this.sceneContainer.classList.remove('memory-flash');
        }, 800);
    },
    
    // ========== 场景过渡 ==========
    transitionScene(callback) {
        if (!this.sceneContainer) return;
        this.triggerGlitch(400);
        this.setStaticIntensity('intense');
        
        this.sceneContainer.classList.add('fade-out');
        
        setTimeout(() => {
            if (callback) callback();
            this.setStaticIntensity('normal');
            this.sceneContainer.classList.remove('fade-out');
            this.sceneContainer.classList.add('fade-in');
            setTimeout(() => {
                this.sceneContainer.classList.remove('fade-in');
            }, 1500);
        }, 1500);
    },
    
    // ========== 显示章节标题 ==========
    showChapterTitle(title, subtitle, duration = 4000) {
        if (!this.chapterTitle) return;
        const nameEl = document.getElementById('chapter-name');
        const subEl = document.getElementById('chapter-subtitle');
        
        if (nameEl) nameEl.textContent = title;
        if (subEl) subEl.textContent = subtitle;
        
        this.chapterTitle.classList.remove('hidden');
        this.chapterTitle.style.opacity = '0';
        this.chapterTitle.style.transition = 'opacity 0.5s ease';
        
        requestAnimationFrame(() => {
            this.chapterTitle.style.opacity = '1';
        });
        
        setTimeout(() => {
            this.chapterTitle.style.opacity = '0';
            setTimeout(() => {
                this.chapterTitle.classList.add('hidden');
            }, 500);
        }, duration);
    },
    
    // ========== 显示内心独白 ==========
    showMonologue(text, duration = 4000) {
        if (!this.innerMonologue) return;
        const textEl = document.getElementById('monologue-text');
        if (!textEl) return;

        VoiceSystem.stop();
        
        textEl.textContent = text;
        this.innerMonologue.classList.remove('hidden');

        VoiceSystem.speak('林瑜', text.replace(/\n/g, '。'));
        
        // 重置动画
        textEl.style.animation = 'none';
        textEl.offsetHeight;
        textEl.style.animation = `typewriter-fade ${duration / 1000}s ease-out`;
        
        return new Promise(resolve => {
            setTimeout(() => {
                this.innerMonologue.classList.add('hidden');
                resolve();
            }, duration);
        });
    },
    
    // ========== 显示对话框 ==========
    showDialog(speaker, text, onComplete) {
        if (!this.dialogBox) return;
        this.clearDialogChoices();

        const speakerEl = document.getElementById('dialog-speaker');
        const textEl = document.getElementById('dialog-text');
        const continueEl = document.getElementById('dialog-continue');

        if (speakerEl) speakerEl.textContent = speaker;
        if (textEl) textEl.textContent = '';
        if (continueEl) continueEl.style.display = 'none';

        this.dialogBox.classList.remove('hidden');

        if (typeof Game !== 'undefined') Game.state = 'dialog';

        this.updateDialogPortrait(speaker);
        VoiceSystem.speak(speaker, text);

        this.isTyping = true;
        this.typeText(textEl, text, () => {
            this.isTyping = false;
            if (continueEl) continueEl.style.display = 'block';
            if (onComplete) onComplete();
        });
    },

    showDialogWithChoices(speaker, text, choices) {
        if (!this.dialogBox) return;
        this.clearDialogChoices();

        const speakerEl = document.getElementById('dialog-speaker');
        const textEl = document.getElementById('dialog-text');
        const continueEl = document.getElementById('dialog-continue');
        const choicesEl = document.getElementById('dialog-choices');

        if (speakerEl) speakerEl.textContent = speaker;
        if (textEl) textEl.textContent = '';
        if (continueEl) continueEl.style.display = 'none';

        this.dialogBox.classList.remove('hidden');
        if (typeof Game !== 'undefined') Game.state = 'dialog';

        this.updateDialogPortrait(speaker);
        VoiceSystem.speak(speaker, text);

        this.isTyping = true;
        this.typeText(textEl, text, () => {
            this.isTyping = false;
            if (!choicesEl) return;
            choicesEl.innerHTML = '';
            choices.forEach((choice, i) => {
                const btn = document.createElement('button');
                btn.className = 'dialog-choice-btn';
                btn.textContent = choice.text;
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (choice.action) choice.action();
                });
                choicesEl.appendChild(btn);
            });
            choicesEl.classList.remove('hidden');
        });
    },

    clearDialogChoices() {
        const choicesEl = document.getElementById('dialog-choices');
        if (choicesEl) {
            choicesEl.innerHTML = '';
            choicesEl.classList.add('hidden');
        }
    },

    setDialogAdvanceHandler(handler) {
        this.dialogAdvanceHandler = handler;
    },

    /** 对话头像映射 */
    speakerPortraitMap: {
        '王奶奶': 'granny_wang',
        '周小萌': 'xiaomeng',
        '陈叔': 'shop_owner',
        '李老师': 'teacher_li',
        '？？？': 'mysterious_boy',
        '妈妈': 'mom_voice',
        '林瑜': 'linyu',
    },

    updateDialogPortrait(speaker) {
        const el = document.getElementById('dialog-portrait');
        if (!el) return;
        const itemId = this.speakerPortraitMap[speaker];
        if (itemId && typeof ItemArt !== 'undefined') {
            el.innerHTML = ItemArt.get(itemId === 'linyu' ? 'homework' : itemId);
            el.classList.add('visible');
        } else {
            el.classList.remove('visible');
            el.innerHTML = '';
        }
    },

    clearDialogPortrait() {
        const el = document.getElementById('dialog-portrait');
        if (el) {
            el.innerHTML = '';
            el.classList.remove('visible');
        }
    },

    advanceDialog() {
        if (this.isTyping) return;
        const choicesEl = document.getElementById('dialog-choices');
        if (choicesEl && !choicesEl.classList.contains('hidden') && choicesEl.children.length > 0) return;
        VoiceSystem.stop();
        if (this.dialogAdvanceHandler) {
            const handler = this.dialogAdvanceHandler;
            this.dialogAdvanceHandler = null;
            handler();
            return;
        }
        this.hideDialog();
    },
    
    // 打字机效果
    typeText(element, text, callback) {
        if (!element) return;
        
        // 清除之前的计时器
        this.typewriterTimers.forEach(t => clearTimeout(t));
        this.typewriterTimers = [];
        
        let index = 0;
        element.textContent = '';
        
        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                const delay = Math.random() * 50 + 30;
                const timer = setTimeout(type, delay);
                this.typewriterTimers.push(timer);
            } else {
                if (callback) callback();
            }
        };
        
        type();
    },
    
    // 隐藏对话框
    hideDialog() {
        VoiceSystem.stop();
        if (this.dialogBox) {
            this.dialogBox.classList.add('hidden');
        }
        this.clearDialogPortrait();
        this.clearDialogChoices();
        this.dialogAdvanceHandler = null;
        if (typeof Game !== 'undefined' && Game.state === 'dialog' && !DialogueSystem?.isActive) {
            Game.state = 'playing';
        }
    },
    
    // ========== 显示物品提示 ==========
    showItemTooltip(text, x, y) {
        if (!this.itemTooltip) return;
        const textEl = document.getElementById('tooltip-text');
        if (textEl) textEl.textContent = text;
        
        this.itemTooltip.classList.remove('hidden');
        this.itemTooltip.style.left = (x + 20) + 'px';
        this.itemTooltip.style.top = (y - 10) + 'px';
    },
    
    hideItemTooltip() {
        if (this.itemTooltip) {
            this.itemTooltip.classList.add('hidden');
        }
    },
    
    // ========== 显示提示 ==========
    showHint(text, duration = 3000) {
        if (!this.hintSystem) return;
        const textEl = document.getElementById('hint-text');
        if (textEl) textEl.textContent = text;
        
        this.hintSystem.classList.remove('hidden');
        
        setTimeout(() => {
            this.hintSystem.classList.add('hidden');
        }, duration);
    },
    
    // ========== 更新记忆碎片UI ==========
    updateMemoryUI(count, total, lastName) {
        if (!this.memoryCollection) return;
        const countEl = document.getElementById('memory-count');
        const nameEl = document.getElementById('memory-name');
        
        if (countEl) countEl.textContent = `记忆碎片: ${count}/${total}`;
        if (nameEl && lastName) {
            nameEl.textContent = `获得: ${lastName}`;
            setTimeout(() => {
                nameEl.textContent = '';
            }, 3000);
        }
        
        this.memoryCollection.classList.remove('hidden');
    },
    
    // ========== 添加阳光射线效果 ==========
    addSunRays(container) {
        if (!container) return;
        
        // 创建阳光射线元素
        const sunRays = document.createElement('div');
        sunRays.className = 'sun-rays';
        sunRays.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
            background: radial-gradient(
                ellipse at 60% 20%,
                rgba(255, 255, 200, 0.3) 0%,
                rgba(255, 240, 180, 0.15) 20%,
                rgba(255, 200, 100, 0.05) 40%,
                transparent 70%
            );
        `;
        container.appendChild(sunRays);
        
        // 浮动尘埃粒子
        for (let i = 0; i < 20; i++) {
            const dust = document.createElement('div');
            const size = Math.random() * 3 + 1;
            dust.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 220, ${Math.random() * 0.4 + 0.1});
                border-radius: 50%;
                pointer-events: none;
                z-index: 3;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-dust ${Math.random() * 5 + 5}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            container.appendChild(dust);
        }
    },
    
    // ========== 添加粒子效果 ==========
    spawnParticles(x, y, count = 10, color = '#ffd700') {
        if (!this.sceneContainer) return;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 4 + 2;
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 80 + 40;
            const dx = Math.cos(angle) * velocity;
            const dy = Math.sin(angle) * velocity;
            
            particle.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 200;
                opacity: 1;
                transition: all ${Math.random() * 0.5 + 0.5}s ease-out;
            `;
            
            this.sceneContainer.appendChild(particle);
            
            requestAnimationFrame(() => {
                particle.style.left = (x + dx) + 'px';
                particle.style.top = (y + dy) + 'px';
                particle.style.opacity = '0';
            });
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    },
    
    // ========== 添加CSS动画样式 ==========
    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-dust {
                0%, 100% { transform: translate(0, 0); opacity: 0.3; }
                25% { transform: translate(10px, -20px); opacity: 0.8; }
                50% { transform: translate(-5px, -40px); opacity: 0.4; }
                75% { transform: translate(15px, -15px); opacity: 0.7; }
            }
            
            @keyframes sun-shimmer {
                0%, 100% { opacity: 0.15; }
                50% { opacity: 0.25; }
            }
            
            @keyframes pulse-glow {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 0.8; transform: scale(1.1); }
            }
            
            .sun-rays {
                animation: sun-shimmer 4s ease-in-out infinite;
            }
        `;
        document.head.appendChild(style);
    },
};
