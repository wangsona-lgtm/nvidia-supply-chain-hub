/**
 * 輝達上下游產業鏈互動圖譜視覺化引擎
 * (NVIDIA Supply Chain Interactive Blueprint Engine)
 */

class SupplyChainVisualizer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentFilter = "all";
    this.init();
  }

  init() {
    if (!this.container || !window.NVIDIA_SUPPLY_CHAIN_DATA) return;
    this.render();
  }

  setFilter(filter) {
    this.currentFilter = filter;
    this.render();
  }

  render() {
    const data = window.NVIDIA_SUPPLY_CHAIN_DATA;
    if (!data) return;

    let html = `
      <div class="sc-blueprint-wrapper">
        <!-- 頂部架構快速導覽與過濾器 -->
        <div class="sc-filter-bar">
          <div style="font-size:13px; font-weight:700; color:#fff; display:flex; align-items:center; gap:6px;">
            <span style="color:#76b900;">⚡</span> 產業鏈聚焦篩選器：
          </div>
          <div class="sc-filter-chips">
            <button class="sc-filter-btn ${this.currentFilter === 'all' ? 'active' : ''}" data-filter="all">全部生態 (All)</button>
            <button class="sc-filter-btn ${this.currentFilter === 'taiwan' ? 'active' : ''}" data-filter="taiwan">🇹🇼 台灣核心供應鏈</button>
            <button class="sc-filter-btn ${this.currentFilter === 'cooling' ? 'active' : ''}" data-filter="cooling">💧 水冷散熱大聯盟</button>
            <button class="sc-filter-btn ${this.currentFilter === 'cpo' ? 'active' : ''}" data-filter="cpo">⚡ 矽光子 CPO 先鋒</button>
            <button class="sc-filter-btn ${this.currentFilter === 'odm' ? 'active' : ''}" data-filter="odm">🏗️ 伺服器 ODM 組裝</button>
            <button class="sc-filter-btn ${this.currentFilter === 'packaging' ? 'active' : ''}" data-filter="packaging">🔬 CoWoS & 晶圓代工</button>
          </div>
        </div>

        <!-- 三大層級縱深流動看板 -->
        <div class="sc-tiers-column">
    `;

    data.tiers.forEach((tier, tIdx) => {
      // 根據篩選器過濾賽道
      let sectors = tier.sectors.filter(sec => {
        if (this.currentFilter === 'all') return true;
        if (this.currentFilter === 'taiwan') {
          return sec.keyPlayers.some(p => p.name.includes('台') || p.name.includes('鴻') || p.name.includes('廣') || p.name.includes('奇') || p.name.includes('雙') || p.name.includes('健') || p.name.includes('貿') || p.name.includes('緯') || p.name.includes('光') || p.name.includes('聯') || p.name.includes('旺') || p.name.includes('欣'));
        }
        if (this.currentFilter === 'cooling') return sec.id === 'liquid_cooling';
        if (this.currentFilter === 'cpo') return sec.id === 'silicon_photonics';
        if (this.currentFilter === 'odm') return sec.id === 'server_odm';
        if (this.currentFilter === 'packaging') return sec.id === 'foundry_cowos' || sec.id === 'test_probe';
        return true;
      });

      if (sectors.length === 0) return;

      html += `
        <div class="sc-tier-card" style="border-top: 3px solid ${tier.color};">
          <div class="sc-tier-header">
            <div>
              <h2 style="font-size:18px; font-weight:800; color:#fff;">${tier.nameZh}</h2>
              <div style="font-size:11px; color:#94a3b8; font-family:var(--font-mono); margin-top:2px;">${tier.nameEn}</div>
            </div>
            <span class="sc-tier-badge" style="background:${tier.accent}; color:${tier.color}; border:1px solid ${tier.color}55;">
              ${sectors.length} 個關鍵技術賽道
            </span>
          </div>

          <p class="sc-tier-desc">${tier.description}</p>

          <div class="sc-sectors-grid">
            ${sectors.map(sec => `
              <div class="sc-sector-item">
                <div class="sc-sector-top">
                  <h3 class="sc-sector-title">${sec.titleZh}</h3>
                  <div class="sc-bottleneck-tag">${sec.bottleneckRating}</div>
                </div>

                <div class="sc-dynamics-text">${sec.marketDynamics}</div>

                <div class="sc-players-list">
                  <div style="font-size:11px; font-weight:700; color:#94a3b8; margin-bottom:6px;">🎯 核心領頭羊與供應份額：</div>
                  ${sec.keyPlayers.map(p => `
                    <div class="sc-player-row">
                      <div class="sc-player-name">
                        <strong>${p.name}</strong>
                        <span class="sc-player-status">${p.status || ''}</span>
                      </div>
                      <div class="sc-player-role">${p.role}</div>
                      ${p.share ? `<div class="sc-player-share">份額: <strong style="color:#76b900;">${p.share}</strong></div>` : ''}
                      ${p.capex2025 ? `<div class="sc-player-share">2025 CapEx: <strong style="color:#38bdf8;">${p.capex2025}</strong></div>` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        ${tIdx < data.tiers.length - 1 ? `
          <div class="sc-flow-indicator">
            <div class="flow-arrow-down">▼ 產值價值鏈向下延伸與算力聚合交付 ▼</div>
          </div>
        ` : ''}
      `;
    });

    html += `
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.bindEvents();
  }

  bindEvents() {
    const filterBtns = this.container.querySelectorAll('.sc-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        this.setFilter(filter);
      });
    });
  }
}

window.SupplyChainVisualizer = SupplyChainVisualizer;
