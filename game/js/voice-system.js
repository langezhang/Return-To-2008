// ==========================================
// 重返2008：梦境碎片 - NPC 配音系统
// 林瑜：26岁成熟女声，分句朗读更自然
// ==========================================

const VoiceSystem = {
    enabled: true,
    speaking: false,
    voices: [],
    chunkQueue: [],
    chunkTimer: null,

    profiles: {
        '王奶奶': { rate: 0.85, pitch: 0.95, volume: 1, preferFemale: true, age: 'old' },
        '周小萌': { rate: 1.12, pitch: 1.3, volume: 1, preferFemale: true, age: 'child' },
        '陈叔':   { rate: 0.93, pitch: 0.78, volume: 1, preferFemale: false, age: 'middle' },
        '李老师': { rate: 0.88, pitch: 0.82, volume: 1, preferFemale: false, age: 'middle' },
        '？？？': { rate: 0.82, pitch: 0.88, volume: 0.9, preferFemale: false, age: 'child' },
        '妈妈':   { rate: 0.92, pitch: 1.02, volume: 1, preferFemale: true, age: 'middle' },
        '林瑜': {
            rate: 0.88,
            pitch: 0.96,
            volume: 0.95,
            preferFemale: true,
            age: 'young_adult',
            natural: true,
            voicePriority: [
                'xiaoxiao', 'xiaoyi', 'xiaochen', 'xiaomo',
                'xiaoxuan', 'xiaorui', 'xiaoshuang',
            ],
        },
    },

    init() {
        if (!window.speechSynthesis) {
            console.warn('浏览器不支持语音合成');
            this.enabled = false;
            return;
        }
        this.loadVoices();
        window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
    },

    loadVoices() {
        const all = window.speechSynthesis.getVoices();
        this.voices = all.filter(v =>
            v.lang.startsWith('zh') || v.lang.startsWith('cmn') || v.lang.includes('CN'),
        );
        if (this.voices.length === 0) this.voices = all;
    },

    cleanText(text) {
        if (!text) return '';
        return text
            .replace(/（[^）]*）/g, '')
            .replace(/\([^)]*\)/g, '')
            .replace(/[「」『』""]/g, '')
            .replace(/\s+/g, '')
            .trim();
    },

    /** 分句，让朗读更接近真人停顿 */
    splitChunks(text) {
        const cleaned = this.cleanText(text);
        if (!cleaned) return [];
        const parts = cleaned.split(/(?<=[。！？；，、…])|(?<=\.\.\.)/g).filter(s => s.trim());
        if (parts.length <= 1 && cleaned.length > 28) {
            return cleaned.match(/.{1,24}[，、]?/g) || [cleaned];
        }
        return parts.length ? parts : [cleaned];
    },

    pickVoice(profile) {
        if (!this.voices.length) return null;
        const zhVoices = this.voices.filter(v =>
            v.lang.includes('CN') || v.lang.includes('Hans') || v.lang.includes('zh'),
        );
        const pool = zhVoices.length ? zhVoices : this.voices;

        if (profile.voicePriority) {
            for (const key of profile.voicePriority) {
                const found = pool.find(v => v.name.toLowerCase().includes(key));
                if (found) return found;
            }
        }

        const neural = pool.filter(v => /natural|neural|online|xiaoxiao|xiaoyi/i.test(v.name));
        if (profile.age === 'young_adult' && profile.preferFemale) {
            const young = neural.find(v => /xiaoxiao|xiaoyi|xiaochen|xiaomo|xiaoxuan/i.test(v.name));
            if (young) return young;
        }

        const female = pool.filter(v =>
            /女|female|xiao|huihui|tingting|lili|yunxia/i.test(v.name),
        );
        const male = pool.filter(v =>
            /男|male|yun|kang|ze/i.test(v.name),
        );

        if (profile.age === 'child' && profile.preferFemale) {
            return pool.find(v => /xiaomeng|xiaorui|child/i.test(v.name)) || female[0] || pool[0];
        }
        if (profile.age === 'old' && profile.preferFemale) return female[0] || pool[0];
        if (profile.preferFemale && female.length) return female[0];
        if (!profile.preferFemale && male.length) return male[0];
        return neural[0] || pool[0];
    },

    speak(speaker, text) {
        const profile = this.profiles[speaker] || { rate: 1, pitch: 1, volume: 1 };
        if (profile.natural) {
            return this.speakChunked(speaker, text, profile);
        }
        return this.speakOnce(speaker, text, profile);
    },

    speakOnce(speaker, text, profile) {
        return new Promise(resolve => {
            if (!this.enabled || !window.speechSynthesis) { resolve(); return; }
            const cleaned = this.cleanText(text);
            if (!cleaned) { resolve(); return; }

            this.stop(false);
            const utt = this.buildUtterance(cleaned, profile);
            utt.onend = () => { this.speaking = false; resolve(); };
            utt.onerror = () => { this.speaking = false; resolve(); };
            this.speaking = true;
            window.speechSynthesis.speak(utt);
        });
    },

    speakChunked(speaker, text, profile) {
        return new Promise(resolve => {
            if (!this.enabled || !window.speechSynthesis) { resolve(); return; }
            const chunks = this.splitChunks(text);
            if (!chunks.length) { resolve(); return; }

            this.stop(false);
            this.speaking = true;
            let idx = 0;

            const next = () => {
                if (idx >= chunks.length) {
                    this.speaking = false;
                    this.chunkQueue = [];
                    resolve();
                    return;
                }
                const chunk = chunks[idx++].trim();
                if (!chunk) { next(); return; }

                const utt = this.buildUtterance(chunk, profile);
                utt.onend = () => {
                    const pause = /[。！？]/.test(chunk.slice(-1)) ? 280 : 120;
                    this.chunkTimer = setTimeout(next, pause);
                };
                utt.onerror = () => next();
                window.speechSynthesis.speak(utt);
            };

            next();
        });
    },

    buildUtterance(text, profile) {
        const utt = new SpeechSynthesisUtterance(text);
        utt.lang = 'zh-CN';
        utt.rate = profile.rate ?? 1;
        utt.pitch = profile.pitch ?? 1;
        utt.volume = (profile.volume ?? 1) * (AudioSystem?.masterVolume ?? 0.5);
        const voice = this.pickVoice(profile);
        if (voice) utt.voice = voice;
        return utt;
    },

    stop(clearQueue = true) {
        if (this.chunkTimer) {
            clearTimeout(this.chunkTimer);
            this.chunkTimer = null;
        }
        if (clearQueue) this.chunkQueue = [];
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        this.speaking = false;
    },

    toggle() {
        this.enabled = !this.enabled;
        if (!this.enabled) this.stop();
        return this.enabled;
    },

    setEnabled(val) {
        this.enabled = !!val;
        if (!this.enabled) this.stop();
    },
};
