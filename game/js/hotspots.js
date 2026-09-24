// ==========================================
// 重返2008：梦境碎片 - 场景热点坐标
// 基于 AI 原画物品位置校准（百分比定位）
// ==========================================

const HotspotData = {
    /** @returns {{x,y,w,h,shape?}} */
    get(chapterId, objectId) {
        return this.map[chapterId]?.[objectId] || null;
    },

    map: {
        prologue: {
            ceiling_crack: { x: 48, y: 6,  w: 22, h: 8,  shape: 'rect' },
            fan:           { x: 50, y: 14, w: 14, h: 12, shape: 'ellipse' },
            window:        { x: 18, y: 30, w: 24, h: 32, shape: 'rect' },
            homework:      { x: 30, y: 54, w: 14, h: 10, shape: 'rect' },
            desk:          { x: 30, y: 52, w: 22, h: 16, shape: 'rect' },
            bed:           { x: 74, y: 50, w: 30, h: 24, shape: 'rect' },
            exit_prologue: { x: 50, y: 82, w: 22, h: 14, shape: 'rect' },
        },

        chapter1: {
            tv:            { x: 40, y: 36, w: 20, h: 22, shape: 'rect' },
            note:          { x: 54, y: 56, w: 14, h: 10, shape: 'rect' },
            photo:         { x: 16, y: 26, w: 12, h: 16, shape: 'rect' },
            phone:         { x: 76, y: 36, w: 10, h: 14, shape: 'rect' },
            mom_voice:     { x: 60, y: 18, w: 14, h: 12, shape: 'ellipse' },
            xiaomeng:      { x: 82, y: 68, w: 10, h: 18, shape: 'ellipse' },
            exit_chapter1: { x: 50, y: 86, w: 28, h: 12, shape: 'rect' },
        },

        chapter2: {
            granny_wang:   { x: 14, y: 46, w: 11, h: 24, shape: 'ellipse' },
            school_gate:   { x: 22, y: 36, w: 20, h: 38, shape: 'rect' },
            teacher_li:    { x: 30, y: 34, w: 9,  h: 22, shape: 'ellipse' },
            xiaomeng:      { x: 46, y: 56, w: 9,  h: 20, shape: 'ellipse' },
            bicycle:       { x: 9,  y: 72, w: 15, h: 26, shape: 'ellipse' },
            store:         { x: 80, y: 42, w: 18, h: 32, shape: 'rect' },
            shop_owner:    { x: 87, y: 38, w: 10, h: 28, shape: 'ellipse' },
            flower_wall:   { x: 55, y: 48, w: 26, h: 12, shape: 'rect' },
            exit_chapter2: { x: 50, y: 88, w: 32, h: 10, shape: 'rect' },
        },

        chapter3: {
            carousel:       { x: 34, y: 28, w: 30, h: 30, shape: 'ellipse' },
            elephant_slide: { x: 12, y: 46, w: 20, h: 28, shape: 'rect' },
            ball_pool:      { x: 66, y: 48, w: 22, h: 20, shape: 'rect' },
            marble:         { x: 50, y: 60, w: 6,  h: 6,  shape: 'ellipse' },
            coin_ride:      { x: 52, y: 38, w: 10, h: 14, shape: 'rect' },
            mysterious_boy: { x: 76, y: 36, w: 11, h: 22, shape: 'ellipse' },
            exit_chapter3:  { x: 50, y: 86, w: 28, h: 12, shape: 'rect' },
        },

        epilogue: {
            sunlight:         { x: 50, y: 26, w: 48, h: 42, shape: 'rect' },
            marble_keepsake:  { x: 15, y: 57, w: 6,  h: 8,  shape: 'ellipse' },
            phone_2026:       { x: 43, y: 53, w: 12, h: 16, shape: 'ellipse' },
        },
    },
};
