// ==========================================
// 重返2008：梦境碎片 - 场景背景艺术（CSS + SVG）
// 中式梦核 · 千禧怀旧 · 阈限空间
// ==========================================

const SceneArt = {
    /** 为场景背景层注入梦核风格背景 */
    render(chapterId, layerEl) {
        if (!layerEl) return;
        layerEl.innerHTML = '';
        layerEl.className = 'scene-bg-layer active scene-art-' + chapterId;
        const art = this.scenes[chapterId];
        if (art) layerEl.appendChild(art());
    },

    scenes: {
        prologue() {
            const wrap = el('div', 'scene-art-inner');
            wrap.innerHTML = `
                <div class="sa-wall"></div>
                <div class="sa-ceiling"></div>
                <div class="sa-floor"></div>
                <div class="sa-blue-window">
                    <div class="sa-window-frame"></div>
                    <div class="sa-window-light"></div>
                    <div class="sa-curtain sa-curtain-l"></div>
                    <div class="sa-curtain sa-curtain-r"></div>
                </div>
                <div class="sa-bed">
                    <div class="sa-bamboo-mat"></div>
                    <div class="sa-pillow"></div>
                </div>
                <div class="sa-desk">
                    <div class="sa-homework"></div>
                    <div class="sa-pencil-cup"></div>
                </div>
                <div class="sa-fan">
                    <div class="sa-fan-blade"></div>
                    <div class="sa-fan-cord"></div>
                </div>
                <div class="sa-poster"></div>
                <div class="sa-cracks"></div>
                <div class="sa-dust-particles"></div>
            `;
            return wrap;
        },

        chapter1() {
            const wrap = el('div', 'scene-art-inner');
            wrap.innerHTML = `
                <div class="sa-wall sa-wall-warm"></div>
                <div class="sa-floor sa-floor-tile"></div>
                <div class="sa-sofa"></div>
                <div class="sa-crt-tv">
                    <div class="sa-tv-screen"></div>
                    <div class="sa-tv-lace"></div>
                </div>
                <div class="sa-cabinet">
                    <div class="sa-vcd"></div>
                    <div class="sa-cd-stack"></div>
                </div>
                <div class="sa-tea-table">
                    <div class="sa-note-paper"></div>
                    <div class="sa-money"></div>
                </div>
                <div class="sa-photo-wall"></div>
                <div class="sa-phone-landline"></div>
                <div class="sa-calendar">2008年6月</div>
                <div class="sa-olympic-poster">北京2008</div>
                <div class="sa-sunbeam sa-sunbeam-1"></div>
                <div class="sa-sunbeam sa-sunbeam-2"></div>
            `;
            return wrap;
        },

        chapter2() {
            const wrap = el('div', 'scene-art-inner');
            wrap.innerHTML = `
                <div class="sa-sky sa-sky-harsh"></div>
                <div class="sa-road"></div>
                <div class="sa-building sa-building-l"></div>
                <div class="sa-building sa-building-r"></div>
                <div class="sa-store-front">
                    <div class="sa-store-sign">小卖部</div>
                    <div class="sa-ice-cabinet"></div>
                    <div class="sa-store-goods"></div>
                </div>
                <div class="sa-school-gate">
                    <div class="sa-gate-bars"></div>
                    <div class="sa-school-sign">××小学</div>
                </div>
                <div class="sa-bench-area"></div>
                <div class="sa-rose-wall"></div>
                <div class="sa-bike-28"></div>
                <div class="sa-utility-pole"></div>
                <div class="sa-olympic-banner">同一个世界 同一个梦想</div>
                <div class="sa-heat-haze"></div>
            `;
            return wrap;
        },

        chapter3() {
            const wrap = el('div', 'scene-art-inner');
            wrap.innerHTML = `
                <div class="sa-sky sa-sky-dusk"></div>
                <div class="sa-playground-ground"></div>
                <div class="sa-carousel">
                    <div class="sa-carousel-roof"></div>
                    <div class="sa-carousel-horse"></div>
                    <div class="sa-carousel-lights"></div>
                </div>
                <div class="sa-elephant-slide"></div>
                <div class="sa-ball-pit">
                    <div class="sa-ball sa-ball-1"></div>
                    <div class="sa-ball sa-ball-2"></div>
                    <div class="sa-ball sa-ball-3"></div>
                </div>
                <div class="sa-swing-set">
                    <div class="sa-swing-chain"></div>
                    <div class="sa-swing-seat"></div>
                </div>
                <div class="sa-ride-bear"></div>
                <div class="sa-fence-rusty"></div>
                <div class="sa-empty-bench"></div>
                <div class="sa-twilight-glow"></div>
            `;
            return wrap;
        },

        epilogue() {
            const wrap = el('div', 'scene-art-inner');
            wrap.innerHTML = `
                <div class="sa-wall sa-wall-modern"></div>
                <div class="sa-floor sa-floor-modern"></div>
                <div class="sa-modern-bed"></div>
                <div class="sa-modern-window">
                    <div class="sa-morning-light"></div>
                </div>
                <div class="sa-nightstand">
                    <div class="sa-marble-keepsake"></div>
                    <div class="sa-money-keepsake"></div>
                </div>
                <div class="sa-smartphone"></div>
                <div class="sa-watercolor-box"></div>
                <div class="sa-ceiling-crack-modern"></div>
                <div class="sa-soft-light"></div>
            `;
            return wrap;
        },
    },
};

function el(tag, cls) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
}
