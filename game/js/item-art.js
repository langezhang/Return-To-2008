// ==========================================
// 重返2008：梦境碎片 - 物品图标 SVG
// ==========================================

const ItemArt = {
    /** 返回物品 SVG 字符串 */
    get(itemId) {
        return this.sprites[itemId] || this.sprites.default;
    },

    sprites: {
        default: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="20" fill="#ffd700" opacity="0.6"/><text x="32" y="38" text-anchor="middle" fill="#fff" font-size="20">?</text></svg>`,

        ceiling_crack: `<svg viewBox="0 0 80 48" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="48" fill="#e8dcc8" rx="2"/><path d="M40 8 Q35 20 38 30 Q42 38 36 44" stroke="#8a7a6a" stroke-width="2" fill="none"/><path d="M40 8 Q45 18 43 28" stroke="#9a8a7a" stroke-width="1" fill="none" opacity="0.6"/></svg>`,

        fan: `<svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="18" r="6" fill="#888"/><g transform="translate(40,18)"><ellipse cx="0" cy="-22" rx="6" ry="22" fill="#ccc" opacity="0.9" transform="rotate(0)"/><ellipse cx="0" cy="-22" rx="6" ry="22" fill="#bbb" opacity="0.9" transform="rotate(120)"/><ellipse cx="0" cy="-22" rx="6" ry="22" fill="#aaa" opacity="0.9" transform="rotate(240)"/></g><line x1="40" y1="24" x2="40" y2="50" stroke="#666" stroke-width="3"/><line x1="40" y1="50" x2="40" y2="58" stroke="#c44" stroke-width="2"/></svg>`,

        window: `<svg viewBox="0 0 70 90" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="62" height="82" fill="#5a8ab0" rx="2"/><rect x="8" y="8" width="54" height="74" fill="#7ab0d8" opacity="0.7"/><line x1="35" y1="8" x2="35" y2="82" stroke="#fff" stroke-width="2" opacity="0.5"/><line x1="8" y1="45" x2="62" y2="45" stroke="#fff" stroke-width="2" opacity="0.5"/><rect x="4" y="4" width="62" height="82" fill="none" stroke="#8a7050" stroke-width="3" rx="2"/></svg>`,

        homework: `<svg viewBox="0 0 60 50" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="50" height="40" fill="#fff8e8" stroke="#c8a870" stroke-width="1" rx="1"/><text x="10" y="18" fill="#333" font-size="6" font-family="serif">小明有5个苹果</text><text x="10" y="28" fill="#333" font-size="6" font-family="serif">小红有3个苹果</text><text x="10" y="38" fill="#888" font-size="6" font-family="serif">一共？___</text><rect x="2" y="2" width="56" height="44" fill="none" stroke="#d4a840" stroke-width="2" rx="2"/></svg>`,

        desk: `<svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="25" width="70" height="8" fill="#8a6040" rx="1"/><rect x="10" y="33" width="6" height="22" fill="#6a4020"/><rect x="64" y="33" width="6" height="22" fill="#6a4020"/><rect x="20" y="18" width="40" height="8" fill="#a07050" rx="1"/><circle cx="55" cy="14" r="4" fill="#e44" opacity="0.8"/></svg>`,

        bed: `<svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="20" width="70" height="35" fill="#c8d8a0" rx="3"/><rect x="8" y="23" width="64" height="28" fill="#a8c880" rx="2"/><rect x="5" y="15" width="70" height="8" fill="#d0e0b0" rx="2"/><rect x="60" y="18" width="12" height="10" fill="#f0e8d0" rx="2"/></svg>`,

        exit_prologue: `<svg viewBox="0 0 90 40" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="2" width="50" height="36" fill="#c8a870" rx="2"/><rect x="24" y="6" width="42" height="28" fill="#ffe8a0" opacity="0.8"/><path d="M44 16 L52 22 L44 28 Z" fill="#ffd700"/><text x="45" y="38" text-anchor="middle" fill="#fff" font-size="8">出门</text></svg>`,

        tv: `<svg viewBox="0 0 90 70" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="70" height="50" fill="#333" rx="4"/><rect x="16" y="16" width="58" height="38" fill="#555" rx="2"/><rect x="8" y="8" width="74" height="54" fill="none" stroke="#888" stroke-width="2" rx="4" stroke-dasharray="4 2" opacity="0.5"/><rect x="35" y="58" width="20" height="6" fill="#666" rx="1"/><ellipse cx="45" cy="66" rx="15" ry="3" fill="#444"/></svg>`,

        note: `<svg viewBox="0 0 55 45" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="49" height="39" fill="#fff8f0" stroke="#e8c8a0" stroke-width="1" rx="1" transform="rotate(-3 28 22)"/><text x="8" y="16" fill="#333" font-size="5" font-family="serif">饭菜在锅里</text><text x="8" y="24" fill="#333" font-size="5" font-family="serif">零花钱在抽屉</text><rect x="30" y="28" width="18" height="10" fill="#e8d040" rx="1" transform="rotate(-3 39 33)"/><text x="39" y="36" fill="#333" font-size="6" text-anchor="middle">¥5</text></svg>`,

        photo: `<svg viewBox="0 0 55 65" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="49" height="59" fill="#fff" stroke="#c8a870" stroke-width="2" rx="1"/><rect x="8" y="8" width="39" height="30" fill="#d8c8a8"/><circle cx="20" cy="22" r="6" fill="#f0d0a0"/><circle cx="35" cy="22" r="6" fill="#e0c090"/><circle cx="27" cy="30" r="5" fill="#f8e0c0"/><rect x="10" y="42" width="35" height="3" fill="#ccc" rx="1"/><rect x="10" y="48" width="25" height="3" fill="#ddd" rx="1"/></svg>`,

        phone: `<svg viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="5" width="34" height="50" fill="#d0d0c8" rx="4"/><rect x="12" y="10" width="26" height="12" fill="#2a4a2a" rx="1"/><text x="25" y="19" text-anchor="middle" fill="#0f0" font-size="4" font-family="monospace">14:17</text><circle cx="18" cy="30" r="4" fill="#888"/><circle cx="25" cy="30" r="4" fill="#888"/><circle cx="32" cy="30" r="4" fill="#888"/><circle cx="18" cy="38" r="4" fill="#888"/><circle cx="25" cy="38" r="4" fill="#888"/><circle cx="32" cy="38" r="4" fill="#888"/><path d="M15 48 Q25 55 35 48" stroke="#666" stroke-width="3" fill="none"/></svg>`,

        exit_chapter1: `<svg viewBox="0 0 90 40" xmlns="http://www.w3.org/2000/svg"><path d="M10 35 L45 5 L80 35" fill="none" stroke="#888" stroke-width="3"/><rect x="35" y="20" width="20" height="18" fill="#666" rx="1"/><text x="45" y="38" text-anchor="middle" fill="#ffd700" font-size="7">下楼</text></svg>`,

        granny_wang: `<svg viewBox="0 0 55 75" xmlns="http://www.w3.org/2000/svg"><ellipse cx="27" cy="18" rx="14" ry="16" fill="#e8d0b0"/><path d="M13 18 Q10 8 27 6 Q44 8 41 18" fill="#c8b8a0"/><rect x="12" y="34" width="30" height="35" fill="#a06080" rx="4"/><ellipse cx="27" cy="50" rx="18" ry="8" fill="#d4a040" opacity="0.8"/><line x1="45" y1="40" x2="55" y2="30" stroke="#8a7050" stroke-width="2"/><ellipse cx="55" cy="28" rx="8" ry="5" fill="#c8a870" opacity="0.7"/></svg>`,

        xiaomeng: `<svg viewBox="0 0 50 70" xmlns="http://www.w3.org/2000/svg"><ellipse cx="25" cy="16" rx="12" ry="14" fill="#f0d0a8"/><path d="M10 12 Q8 4 18 2" stroke="#333" stroke-width="2" fill="none"/><path d="M40 12 Q42 4 32 2" stroke="#333" stroke-width="2" fill="none"/><circle cx="20" cy="15" r="2" fill="#333"/><circle cx="30" cy="15" r="2" fill="#333"/><path d="M18 22 Q25 28 32 22" stroke="#333" stroke-width="1.5" fill="none"/><rect x="14" y="30" width="22" height="28" fill="#e878a0" rx="3"/><rect x="16" y="58" width="8" height="10" fill="#4080c0" rx="1"/><rect x="26" y="58" width="8" height="10" fill="#4080c0" rx="1"/><rect x="20" y="48" width="10" height="4" fill="#f88" rx="1"/></svg>`,

        store: `<svg viewBox="0 0 75 65" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="15" width="65" height="45" fill="#f0e8d0" stroke="#c8a870" stroke-width="2" rx="2"/><rect x="10" y="20" width="55" height="25" fill="#4080a0" opacity="0.6" rx="1"/><text x="37" y="12" text-anchor="middle" fill="#c44" font-size="8" font-weight="bold">小卖部</text><rect x="15" y="48" width="8" height="10" fill="#e44" rx="1"/><rect x="26" y="48" width="8" height="10" fill="#4a4" rx="1"/><rect x="37" y="48" width="8" height="10" fill="#48a" rx="1"/><rect x="48" y="48" width="8" height="10" fill="#a84" rx="1"/></svg>`,

        shop_owner: `<svg viewBox="0 0 55 70" xmlns="http://www.w3.org/2000/svg"><ellipse cx="27" cy="16" rx="13" ry="15" fill="#d8c0a0"/><rect x="10" y="31" width="34" height="32" fill="#fff" rx="2"/><rect x="8" y="31" width="38" height="8" fill="#4080c0" rx="1"/><rect x="20" y="12" width="14" height="4" fill="#888" rx="1" opacity="0.6"/><line x1="40" y1="20" x2="50" y2="18" stroke="#666" stroke-width="2"/><circle cx="50" cy="17" r="2" fill="#888"/></svg>`,

        school_gate: `<svg viewBox="0 0 50 80" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="10" width="40" height="65" fill="none" stroke="#888" stroke-width="3" rx="2"/><line x1="15" y1="10" x2="15" y2="75" stroke="#888" stroke-width="2"/><line x1="25" y1="10" x2="25" y2="75" stroke="#888" stroke-width="2"/><line x1="35" y1="10" x2="35" y2="75" stroke="#888" stroke-width="2"/><circle cx="42" cy="42" r="4" fill="#888"/><rect x="8" y="2" width="34" height="10" fill="#c44" rx="1"/><text x="25" y="9" text-anchor="middle" fill="#fff" font-size="5">××小学</text></svg>`,

        teacher_li: `<svg viewBox="0 0 50 75" xmlns="http://www.w3.org/2000/svg"><ellipse cx="25" cy="14" rx="12" ry="14" fill="#e8d8c0"/><rect x="12" y="28" width="26" height="35" fill="#fff" rx="2"/><rect x="12" y="28" width="26" height="6" fill="#333" rx="1"/><rect x="18" y="10" width="14" height="5" fill="#333" rx="1" opacity="0.7"/><rect x="35" y="35" width="12" height="16" fill="#d8c8a8" rx="1" transform="rotate(10 41 43)"/><circle cx="41" cy="38" r="3" fill="#e44"/></svg>`,

        bicycle: `<svg viewBox="0 0 75 55" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="38" r="14" fill="none" stroke="#666" stroke-width="3"/><circle cx="57" cy="38" r="14" fill="none" stroke="#666" stroke-width="3"/><line x1="18" y1="38" x2="40" y2="18" stroke="#666" stroke-width="3"/><line x1="40" y1="18" x2="57" y2="38" stroke="#666" stroke-width="3"/><line x1="40" y1="18" x2="40" y2="10" stroke="#666" stroke-width="2"/><line x1="35" y1="10" x2="45" y2="10" stroke="#666" stroke-width="3"/><ellipse cx="40" cy="22" rx="12" ry="4" fill="#8a8" opacity="0.5"/></svg>`,

        flower_wall: `<svg viewBox="0 0 65 70" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="20" width="65" height="50" fill="#4a6a3a" opacity="0.6" rx="2"/><circle cx="15" cy="35" r="6" fill="#e44" opacity="0.8"/><circle cx="30" cy="28" r="5" fill="#e66" opacity="0.7"/><circle cx="45" cy="38" r="6" fill="#d33" opacity="0.8"/><circle cx="20" cy="50" r="5" fill="#f55" opacity="0.6"/><circle cx="50" cy="52" r="5" fill="#c22" opacity="0.7"/><circle cx="35" cy="45" r="4" fill="#e88" opacity="0.8"/></svg>`,

        exit_chapter2: `<svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg"><path d="M5 30 L40 8 L75 30" fill="none" stroke="#ffd700" stroke-width="2" stroke-dasharray="4 3"/><text x="40" y="38" text-anchor="middle" fill="#ffd700" font-size="7">→ 游乐场</text></svg>`,

        carousel: `<svg viewBox="0 0 110 80" xmlns="http://www.w3.org/2000/svg"><ellipse cx="55" cy="70" rx="45" ry="8" fill="#888" opacity="0.4"/><rect x="20" y="15" width="70" height="8" fill="#c44" rx="2"/><path d="M20 15 Q55 5 90 15" fill="#e44" opacity="0.7"/><circle cx="55" cy="40" r="25" fill="none" stroke="#888" stroke-width="2" stroke-dasharray="3 3"/><ellipse cx="55" cy="50" rx="8" ry="15" fill="#d4a040"/><circle cx="30" cy="35" r="3" fill="#ffd700"/><circle cx="80" cy="35" r="3" fill="#ffd700"/><circle cx="55" cy="20" r="3" fill="#ffd700"/></svg>`,

        elephant_slide: `<svg viewBox="0 0 85 75" xmlns="http://www.w3.org/2000/svg"><ellipse cx="42" cy="55" rx="30" ry="18" fill="#888" opacity="0.5"/><path d="M20 55 Q15 30 35 20 Q55 15 65 25 L75 55 Q60 50 42 55 Q24 50 20 55" fill="#999"/><circle cx="30" cy="28" r="4" fill="#666"/><path d="M18 35 Q10 45 15 55" stroke="#777" stroke-width="4" fill="none"/><rect x="55" y="30" width="20" height="30" fill="#aaa" rx="2" transform="rotate(15 65 45)"/></svg>`,

        ball_pool: `<svg viewBox="0 0 75 65" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="20" width="65" height="40" fill="#888" rx="3" opacity="0.5"/><circle cx="20" cy="45" r="8" fill="#e44" opacity="0.6"/><circle cx="35" cy="50" r="7" fill="#48a" opacity="0.5"/><circle cx="50" cy="42" r="8" fill="#4a4" opacity="0.4"/><circle cx="60" cy="52" r="6" fill="#a4a" opacity="0.5"/><circle cx="28" cy="38" r="6" fill="#aa4" opacity="0.4"/></svg>`,

        marble: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="16" fill="url(#marbleGrad)" stroke="#fff" stroke-width="1" opacity="0.9"/><defs><radialGradient id="marbleGrad"><stop offset="0%" stop-color="#fff" stop-opacity="0.8"/><stop offset="50%" stop-color="#88ccff" stop-opacity="0.6"/><stop offset="100%" stop-color="#4488cc" stop-opacity="0.8"/></radialGradient></defs><ellipse cx="20" cy="18" rx="4" ry="6" fill="#4488cc" opacity="0.5"/></svg>`,

        coin_ride: `<svg viewBox="0 0 55 65" xmlns="http://www.w3.org/2000/svg"><ellipse cx="27" cy="55" rx="20" ry="6" fill="#888" opacity="0.4"/><rect x="12" y="20" width="30" height="35" fill="#d4a0a0" rx="8"/><circle cx="27" cy="15" r="10" fill="#d4a0a0"/><circle cx="24" cy="13" r="2" fill="#333"/><circle cx="30" cy="13" r="2" fill="#333"/><ellipse cx="27" cy="17" rx="3" ry="2" fill="#333"/><text x="27" y="42" text-anchor="middle" fill="#fff" font-size="6">投币</text></svg>`,

        mysterious_boy: `<svg viewBox="0 0 50 70" xmlns="http://www.w3.org/2000/svg"><ellipse cx="25" cy="16" rx="12" ry="14" fill="#ccc" opacity="0.5" filter="blur(2px)"/><rect x="12" y="30" width="26" height="32" fill="#8090a0" rx="2" opacity="0.7"/><rect x="12" y="30" width="26" height="5" fill="#fff" opacity="0.3" rx="1"/><ellipse cx="25" cy="16" rx="8" ry="10" fill="#fff" opacity="0.2"/></svg>`,

        exit_chapter3: `<svg viewBox="0 0 90 40" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="5" width="30" height="28" fill="#4a3828" rx="2" opacity="0.8"/><circle cx="45" cy="19" r="8" fill="#ffd700" opacity="0.6"/><text x="45" y="38" text-anchor="middle" fill="#ffd700" font-size="7">回家</text></svg>`,

        sunlight: `<svg viewBox="0 0 90 80" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="5" width="70" height="60" fill="#ffe8a0" opacity="0.3" rx="2"/><line x1="45" y1="0" x2="45" y2="80" stroke="#ffd700" stroke-width="1" opacity="0.3"/><line x1="20" y1="30" x2="70" y2="30" stroke="#ffd700" stroke-width="1" opacity="0.3"/></svg>`,

        marble_keepsake: `<svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"><circle cx="22" cy="22" r="18" fill="url(#mkGrad)" stroke="#ffd700" stroke-width="1"/><defs><radialGradient id="mkGrad"><stop offset="0%" stop-color="#fff"/><stop offset="60%" stop-color="#aad4ff"/><stop offset="100%" stop-color="#6699cc"/></radialGradient></defs><ellipse cx="22" cy="20" rx="5" ry="7" fill="#4488cc" opacity="0.6"/></svg>`,

        phone_2026: `<svg viewBox="0 0 35 55" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="2" width="29" height="51" fill="#1a1a1a" rx="4"/><rect x="6" y="8" width="23" height="38" fill="#2a4a6a" rx="1"/><text x="17" y="22" text-anchor="middle" fill="#fff" font-size="5">7:15</text><text x="17" y="32" text-anchor="middle" fill="#aaa" font-size="3">周日</text><circle cx="17" cy="50" r="3" fill="#444"/></svg>`,
    },
};
