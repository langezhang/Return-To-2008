// ==========================================
// 重返2008：梦境碎片 - 音频系统（真实音源版）
// ==========================================

const AudioSystem = {
    ctx: null,
    currentAmbient: null,
    currentBGM: null,
    masterVolume: 0.5,
    ambientVolume: 0.4,
    sfxVolume: 0.6,
    bgmVolume: 0.25,

    // 音频元素池
    audioElements: {},

    init() {
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
        // 预创建音频元素
        this.createAudio('bgm_ambient');
        this.createAudio('bgm_beijing_lofi');
        this.createAudio('bgm_musicbox');
        this.createAudio('sfx_flip');
        this.createAudio('sfx_nokia');
        this.createAudio('sfx_qq');
        this.createAudio('sfx_xp');
        this.createAudio('sfx_glitch');
        // 尝试加载本地音频文件
        this.loadAmbientTracks();
    },

    createAudio(id) {
        const el = document.createElement('audio');
        el.id = `audio-${id}`;
        el.preload = 'auto';
        document.body.appendChild(el);
        this.audioElements[id] = el;
    },

    loadAmbientTracks() {
        // 尝试加载本地环境音 WAV 文件
        const ambientFiles = {
            'ambient_cicada': '../音频/ambient_cicada.wav',
            'ambient_fridge': '../音频/ambient_fridge_hum.wav',
            'ambient_children': '../音频/ambient_children_far.wav',
            'ambient_news': '../音频/ambient_news_intro.wav',
            'bgm_music_box': '../音频/bgm_music_box.wav',
            'bgm_beijing_lofi': '../音频/bgm_beijing_lofi.wav',
            'sfx_nokia': '../音频/sfx_nokia_ringtone.wav',
            'sfx_qq': '../音频/sfx_qq_cough.wav',
            'sfx_xp': '../音频/sfx_xp_shutdown.wav',
            'sfx_page': '../音频/sfx_page_flip.wav',
        };
        for (const [key, path] of Object.entries(ambientFiles)) {
            const audio = new Audio(path);
            audio.preload = 'auto';
            audio.volume = 0.3;
            this.audioElements[key] = audio;
        }
    },

    async resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            await this.ctx.resume();
        }
    },

    // 播放背景环境音（循环）
    playAmbient(key, volume = 0.3) {
        this.stopAmbient();
        const audio = this.audioElements[key];
        if (audio && audio.readyState >= 2) {
            audio.loop = true;
            audio.volume = volume * this.ambientVolume * this.masterVolume;
            audio.play().catch(() => {});
            this.currentAmbient = audio;
        } else {
            // fallback：合成简易环境音
            this.createFallbackAmbient(key);
        }
    },

    // 合成 fallback 环境音
    createFallbackAmbient(key) {
        if (!this.ctx) return;
        const sr = this.ctx.sampleRate;
        const duration = 4;
        const buffer = this.ctx.createBuffer(1, sr * duration, sr);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < sr * duration; i++) {
            const t = i / sr;
            let val = 0;
            if (key === 'ambient_cicada' || key === 'bgm_cicada') {
                const freq = 4500 + Math.sin(t * 0.5) * 500;
                const env = Math.sin(t * 6) * 0.5 + 0.5;
                val = Math.sin(2 * Math.PI * freq * t) * 0.04 * env;
            } else if (key === 'bgm_beijing_lofi') {
                val = Math.sin(2 * Math.PI * 523 * t) * 0.02;
                val += Math.sin(2 * Math.PI * 659 * t) * 0.01;
            } else if (key === 'ambient_fridge' || key === 'bgm_fan') {
                val = Math.sin(2 * Math.PI * 60 * t) * 0.03;
                val += Math.sin(2 * Math.PI * 120 * t) * 0.015;
            } else if (key === 'bgm_music_box' || key === 'sfx_carousel') {
                const freq = [523, 659, 784][Math.floor(t * 2) % 3];
                val = Math.sin(2 * Math.PI * freq * t) * 0.03;
            } else {
                val = Math.random() * 0.03;
            }
            data[i] = val * this.ambientVolume;
        }

        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        const gain = this.ctx.createGain();
        gain.gain.value = this.ambientVolume * this.masterVolume;
        source.connect(gain);
        gain.connect(this.ctx.destination);
        source.start();
        this.currentAmbient = { source, gain };
    },

    // 播放BGM
    playBGM(key, volume = 0.2) {
        this.stopBGM();
        const audio = this.audioElements[key];
        if (audio && audio.readyState >= 2) {
            audio.loop = true;
            audio.volume = volume * this.bgmVolume * this.masterVolume;
            audio.play().catch(() => {});
            this.currentBGM = audio;
        } else {
            this.createFallbackBGM(key);
        }
    },

    createFallbackBGM(key) {
        if (!this.ctx) return;
        // 简单的环境音作为BGM fallback
        this.createFallbackAmbient(key);
        this.currentBGM = this.currentAmbient;
    },

    // 播放音效
    playSFX(key, volume = 0.5) {
        const audio = this.audioElements[key];
        if (audio && audio.readyState >= 2) {
            const clone = audio.cloneNode();
            clone.volume = volume * this.sfxVolume * this.masterVolume;
            clone.play().catch(() => {});
        } else {
            this.createFallbackSFX(key);
        }
    },

    createFallbackSFX(key) {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        if (key === 'sfx_nokia' || key === 'sfx_ring') {
            [659, 587, 831, 659].forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const g = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = freq;
                g.gain.setValueAtTime(0, now + i * 0.15);
                g.gain.linearRampToValueAtTime(0.15, now + i * 0.15 + 0.02);
                g.gain.linearRampToValueAtTime(0, now + i * 0.15 + 0.12);
                osc.connect(g);
                g.connect(this.ctx.destination);
                osc.start(now + i * 0.15);
                osc.stop(now + i * 0.15 + 0.12);
            });
        } else if (key === 'sfx_memory') {
            [523, 659, 784].forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const g = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = freq;
                g.gain.setValueAtTime(0, now + i * 0.12);
                g.gain.linearRampToValueAtTime(0.12, now + i * 0.12 + 0.04);
                g.gain.linearRampToValueAtTime(0, now + i * 0.12 + 0.4);
                osc.connect(g);
                g.connect(this.ctx.destination);
                osc.start(now + i * 0.12);
                osc.stop(now + i * 0.12 + 0.4);
            });
        } else if (key === 'sfx_glitch') {
            const dur = 0.3;
            const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * dur, this.ctx.sampleRate);
            const d = buf.getChannelData(0);
            for (let i = 0; i < d.length; i++) {
                d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.08));
            }
            const s = this.ctx.createBufferSource();
            s.buffer = buf;
            const g = this.ctx.createGain();
            g.gain.value = 0.2;
            s.connect(g);
            g.connect(this.ctx.destination);
            s.start();
        } else if (key === 'sfx_page') {
            const dur = 0.5;
            const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * dur, this.ctx.sampleRate);
            const d = buf.getChannelData(0);
            for (let i = 0; i < d.length; i++) {
                const t = i / this.ctx.sampleRate;
                d[i] = (Math.random() * 2 - 1) * Math.exp(-t * 20) * 0.3;
            }
            const s = this.ctx.createBufferSource();
            s.buffer = buf;
            const g = this.ctx.createGain();
            g.gain.value = 0.15;
            s.connect(g);
            g.connect(this.ctx.destination);
            s.start();
        } else {
            // 通用短音效
            const osc = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = 440;
            g.gain.setValueAtTime(0.1, now);
            g.gain.linearRampToValueAtTime(0, now + 0.1);
            osc.connect(g);
            g.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.1);
        }
    },

    stopAmbient() {
        if (this.currentAmbient) {
            if (this.currentAmbient.source) {
                try { this.currentAmbient.source.stop(); } catch (e) {}
            } else if (typeof this.currentAmbient.pause === 'function') {
                this.currentAmbient.pause();
                this.currentAmbient.currentTime = 0;
            }
            this.currentAmbient = null;
        }
    },

    stopBGM() {
        if (this.currentBGM) {
            if (typeof this.currentBGM.pause === 'function') {
                this.currentBGM.pause();
                this.currentBGM.currentTime = 0;
            } else if (this.currentBGM.source) {
                try { this.currentBGM.source.stop(); } catch (e) {}
            }
            this.currentBGM = null;
        }
    },

    stopAll() {
        this.stopAmbient();
        this.stopBGM();
        // 停止所有audio元素
        Object.values(this.audioElements).forEach(a => {
            if (a && typeof a.pause === 'function') {
                a.pause();
                a.currentTime = 0;
            }
        });
    },

    fadeOut(gainNode, duration = 1) {
        if (!gainNode || !this.ctx) return;
        gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + duration);
    },
};
