/**
 * 輝達 NVIDIA AI 全球上下游產業鏈戰情終端主控制器 (App Main Controller)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 初始化頂部導航分頁 (Tab Switching)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetTab);
      if (targetPane) targetPane.classList.add('active');

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // 2. 渲染各核心模組
  renderKpiSummary();
  initVisualizer();
  renderStocksSection();
  initBomCalculator();
  renderArchitectureSection();
  renderCapexForecastSection();
});

/**
 * 頂部跑馬板關鍵指標 (Market KPIs)
 */
function renderKpiSummary() {
  const container = document.getElementById('kpiTickerContainer');
  if (!container) return;

  const kpis = [
    { label: "NVIDIA 輝達最新市值", val: "$3.62 兆美元", sub: "全球市值龍頭 · 市佔 >90%", color: "#a3e635" },
    { label: "GB200 NVL72 基準單價", val: "~$3,000,000", sub: "約 9,600 萬台幣 / 架 (全水冷)", color: "#38bdf8" },
    { label: "2025 全球機櫃出貨預估", val: "45,000 ~ 70,000", sub: "產值逾 4 兆台幣 · 鴻海/廣達主供", color: "#ffd700" },
    { label: "台積電 CoWoS-L 月產能", val: "7.5 萬片 / 月", sub: "2025 年底目標 · 年增超過 100%", color: "#00ff88" },
    { label: "四大 CSP 2025 總 CapEx", val: "> $2,700 億美元", sub: "微軟/谷歌/Meta/AWS 豪氣買單", color: "#f43f5e" }
  ];

  container.innerHTML = kpis.map(k => `
    <div class="kpi-ticker-card">
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-val" style="color:${k.color};">${k.val}</div>
      <div class="kpi-sub">${k.sub}</div>
    </div>
  `).join('');
}

/**
 * 初始化產業圖譜視覺化引擎
 */
function initVisualizer() {
  if (window.SupplyChainVisualizer) {
    new window.SupplyChainVisualizer('supplyChainVisualizerContainer');
  }
}

/**
 * 渲染股票終端與籌碼看板 (Stocks Terminal)
 */
function renderStocksSection() {
  const stocksGrid = document.getElementById('stocksGrid');
  const tableBody = document.getElementById('stocksTableBody');
  const searchInput = document.getElementById('stockSearchInput');
  const catPills = document.querySelectorAll('.cat-pill');

  if (!stocksGrid || !window.NVIDIA_STOCKS_DATA) return;

  let currentCategory = 'all';
  let searchQuery = '';

  function filterAndDisplay() {
    let list = [...window.NVIDIA_STOCKS_DATA];

    if (currentCategory === 'taiwan') {
      list = list.filter(s => s.countryZh === '台灣');
    } else if (currentCategory === 'us') {
      list = list.filter(s => s.countryZh === '美國');
    } else if (currentCategory === 'cooling') {
      list = list.filter(s => s.sectorZh.includes('水冷') || s.sectorZh.includes('散熱') || s.sectorZh.includes('均熱'));
    } else if (currentCategory === 'cpo') {
      list = list.filter(s => s.sectorZh.includes('光') || s.sectorZh.includes('CPO'));
    } else if (currentCategory === 'odm') {
      list = list.filter(s => s.sectorZh.includes('組裝') || s.sectorZh.includes('ODM') || s.sectorZh.includes('滑軌'));
    } else if (currentCategory === 'foundry') {
      list = list.filter(s => s.sectorZh.includes('封裝') || s.sectorZh.includes('代工') || s.sectorZh.includes('探針') || s.sectorZh.includes('HBM'));
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(s => 
        s.ticker.toLowerCase().includes(q) ||
        s.nameZh.toLowerCase().includes(q) ||
        s.nameEn.toLowerCase().includes(q) ||
        s.sectorZh.toLowerCase().includes(q) ||
        s.roleDescription.toLowerCase().includes(q)
      );
    }

    // 渲染卡片網格
    stocksGrid.innerHTML = list.map(s => `
      <div class="stock-card" data-stock-id="${s.id}">
        <div class="stock-card-header">
          <div>
            <span class="stock-ticker-badge">${s.ticker} ${s.usTicker && s.usTicker !== '-' ? '('+s.usTicker+')' : ''}</span>
            <div class="stock-name-zh" style="margin-top:4px;">${s.nameZh}</div>
            <div class="stock-name-en">${s.nameEn} · ${s.countryZh}</div>
          </div>
          <div class="stock-price-box">
            <div class="stock-price">${s.price} <span style="font-size:11px; color:#94a3b8;">${s.currency}</span></div>
            <div class="stock-chg ${s.changePct >= 0 ? 'up' : 'down'}">
              ${s.changePct >= 0 ? '▲ +' : '▼ '}${s.changePct}%
            </div>
          </div>
        </div>

        <div class="stock-metrics-row">
          <div><span class="metric-item-lbl">本益比:</span> <span class="metric-item-val">${s.peRatio}x</span></div>
          <div><span class="metric-item-lbl">殖利率:</span> <span class="metric-item-val" style="color:#10b981;">${s.dividendYield}</span></div>
          <div><span class="metric-item-lbl">所屬層級:</span> <span class="metric-item-val" style="color:#38bdf8;">${s.tier === 'upstream' ? '上游' : s.tier === 'midstream' ? '中游' : '下游'}</span></div>
        </div>

        <div class="stock-exposure-box">
          <div>⚡ <strong>GB200 / AI 營收純度:</strong> <span style="color:#76b900; font-weight:bold;">${s.nvidiaExposurePct}</span></div>
          <div style="color:#cbd5e1; font-size:11px; margin-top:4px; line-height:1.4;">${s.roleDescription}</div>
        </div>

        <div class="stock-chips-box">
          <div class="chips-line"><span>外資動向:</span> <strong style="color:#fff;">${s.chipAnalysis.foreignBias}</strong></div>
          <div class="chips-line"><span>主力籌碼:</span> <strong style="color:#a3e635;">${s.chipAnalysis.majorChipSignal}</strong></div>
          <div class="chips-line"><span>法人評級:</span> <strong style="color:#ffd700;">${s.chipAnalysis.rating} (目標價 ${s.chipAnalysis.targetPrice})</strong></div>
        </div>

        <div style="font-size:11px; color:#94a3b8; background:rgba(6,10,18,0.7); padding:8px; border-radius:4px; margin-top:auto;">
          💡 <strong>核心催化劑:</strong> ${s.catalysts}
        </div>
      </div>
    `).join('');

    // 渲染比較大表
    if (tableBody) {
      tableBody.innerHTML = list.map(s => `
        <tr>
          <td><strong style="color:#a3e635;">${s.ticker}</strong></td>
          <td><strong>${s.nameZh}</strong><br><span style="font-size:10px; color:#94a3b8;">${s.nameEn}</span></td>
          <td>${s.countryZh}</td>
          <td><span style="padding:2px 6px; border-radius:4px; background:rgba(56,189,248,0.15); color:#38bdf8; font-size:11px;">${s.sectorZh}</span></td>
          <td><strong style="font-family:var(--font-mono); color:#fff;">${s.price} ${s.currency}</strong></td>
          <td class="stock-chg ${s.changePct >= 0 ? 'up' : 'down'}">${s.changePct >= 0 ? '+' : ''}${s.changePct}%</td>
          <td>${s.peRatio}x</td>
          <td style="color:#10b981; font-weight:700;">${s.dividendYield}</td>
          <td><strong style="color:#76b900;">${s.nvidiaExposurePct.split(' ')[0]}</strong></td>
          <td>${s.chipAnalysis.majorChipSignal.split('，')[0]}</td>
          <td style="color:#ffd700; font-weight:bold;">${s.chipAnalysis.rating.split(' ')[0]}</td>
        </tr>
      `).join('');
    }
  }

  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-cat');
      filterAndDisplay();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      filterAndDisplay();
    });
  }

  filterAndDisplay();
}

/**
 * 初始化 GB200 機櫃成本與價值分配互動試算器 (BOM Calculator)
 */
function initBomCalculator() {
  const container = document.getElementById('bomCalculatorContainer');
  if (!container || !window.BomCalculator) return;

  container.innerHTML = `
    <div class="calc-layout-grid">
      <!-- 左欄：控制滑桿 -->
      <div class="calc-controls-card">
        <h2 style="font-size:18px; font-weight:800; color:#fff; margin-bottom:6px;">🧮 GB200 NVL72 機櫃 BOM 產值與台廠分配模型</h2>
        <p style="font-size:12px; color:#94a3b8; margin-bottom:18px;">
          單台 NVL72 機櫃售價近 <strong>$3,000,000 美元（約 9,600 萬台幣）</strong>。拉動下方滑桿，即時精算各零組件產值與台廠各龍頭的潛在營收挹注！
        </p>

        <div class="calc-slider-group">
          <div class="slider-label-row">
            <span>2025 全球 NVL72 機櫃總出貨量:</span>
            <strong id="disp_racks" style="color:#a3e635; font-family:var(--font-mono); font-size:14px;">45,000 架</strong>
          </div>
          <input type="range" id="calc_racks" min="15000" max="80000" value="45000" step="5000" class="calc-range-slider">
        </div>

        <div class="calc-slider-group">
          <div class="slider-label-row">
            <span>單台 NVL72 機櫃平均售價 (ASP):</span>
            <strong id="disp_price" style="color:#38bdf8; font-family:var(--font-mono); font-size:14px;">$3,000,000 美元</strong>
          </div>
          <input type="range" id="calc_price" min="2500000" max="3800000" value="3000000" step="100000" class="calc-range-slider">
        </div>

        <div class="calc-slider-group">
          <div class="slider-label-row">
            <span>台系水冷供應鏈滲透率 (%):</span>
            <strong id="disp_liquid" style="color:#ffd700; font-family:var(--font-mono); font-size:14px;">85 %</strong>
          </div>
          <input type="range" id="calc_liquid" min="50" max="100" value="85" step="5" class="calc-range-slider">
        </div>

        <div style="background:rgba(15,23,42,0.6); padding:12px; border-radius:8px; border:1px solid rgba(255,255,255,0.06); margin-top:14px;">
          <div style="font-size:12px; font-weight:700; color:#fff; margin-bottom:8px;">🏗️ ODM 整櫃組裝代工份額情境假設：</div>
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; font-size:11px;">
            <div>
              <label style="color:#94a3b8;">鴻海/鴻佰:</label>
              <input type="number" id="calc_odm_foxconn" value="45" min="10" max="80" class="search-input-box" style="width:100%; min-width:auto; margin-top:4px;">
            </div>
            <div>
              <label style="color:#94a3b8;">廣達/雲達:</label>
              <input type="number" id="calc_odm_quanta" value="35" min="10" max="80" class="search-input-box" style="width:100%; min-width:auto; margin-top:4px;">
            </div>
            <div>
              <label style="color:#94a3b8;">緯穎:</label>
              <input type="number" id="calc_odm_wiwynn" value="20" min="5" max="50" class="search-input-box" style="width:100%; min-width:auto; margin-top:4px;">
            </div>
          </div>
        </div>
      </div>

      <!-- 右欄：計算結果與台廠分額清單 -->
      <div class="calc-results-card" id="bomResultsBox"></div>
    </div>
  `;

  function updateBom() {
    const racks = Number(document.getElementById('calc_racks').value);
    const rackPrice = Number(document.getElementById('calc_price').value);
    const liquid = Number(document.getElementById('calc_liquid').value);
    const foxconn = Number(document.getElementById('calc_odm_foxconn').value);
    const quanta = Number(document.getElementById('calc_odm_quanta').value);
    const wiwynn = Number(document.getElementById('calc_odm_wiwynn').value);

    document.getElementById('disp_racks').textContent = `${racks.toLocaleString()} 架`;
    document.getElementById('disp_price').textContent = `$${(rackPrice / 1000000).toFixed(2)}M 美元`;
    document.getElementById('disp_liquid').textContent = `${liquid} %`;

    const res = window.BomCalculator.calculate({
      racks: racks,
      rackPriceUsd: rackPrice,
      liquidShare: liquid,
      odmShareFoxconn: foxconn,
      odmShareQuanta: quanta,
      odmShareWiwynn: wiwynn
    });

    const box = document.getElementById('bomResultsBox');
    if (!box) return;

    box.innerHTML = `
      <div style="font-size:12px; color:#76b900; font-weight:700; text-transform:uppercase;">NVL72 全球總產值試算結果</div>
      <h3 style="font-size:20px; font-weight:800; color:#fff; margin:4px 0 14px 0;">全球市場總規模</h3>

      <div class="calc-kpi-block">
        <div class="calc-kpi-main">$${res.totalMarketUsdBillions} 億美元 <span style="font-size:15px; color:#cbd5e1; font-weight:normal;">(約 ${res.totalMarketNtdTrillions} 兆台幣)</span></div>
        <div style="font-size:11px; color:#94a3b8; margin-top:6px;">以 ${racks.toLocaleString()} 架計算，由台廠與美廠共同瓜分之整體 AI 算力基礎設施產值</div>
      </div>

      <div style="font-size:13px; font-weight:700; color:#fff; margin-bottom:8px;">📊 單機櫃 BOM 價值細項拆解 (Cost Breakdown):</div>
      <div class="calc-breakdown-list">
        ${Object.values(res.breakdown).map(b => `
          <div class="calc-breakdown-item">
            <span>${b.name} (${b.pct}%):</span>
            <strong style="font-family:var(--font-mono); color:#fff;">$${b.perRackUsd.toLocaleString()} /架 <span style="color:#a3e635; font-size:11px;">(全產值 ${b.totalNtdB.toLocaleString()} 億NT)</span></strong>
          </div>
        `).join('')}
      </div>

      <div style="font-size:13px; font-weight:700; color:#38bdf8; margin:16px 0 6px 0;">🇹🇼 台廠核心受惠標的潛在產值分配估算：</div>
      <div class="supplier-alloc-grid">
        ${Object.values(res.taiwanSuppliers).map(s => `
          <div class="supplier-alloc-card">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <strong style="color:#fff; font-size:12px;">${s.ticker}</strong>
              <span style="color:#a3e635; font-weight:bold; font-size:13px;">+${s.ntdB.toLocaleString()} 億NT</span>
            </div>
            <div style="color:#94a3b8; font-size:11px; margin-top:2px;">${s.role}</div>
            <div style="color:#38bdf8; font-size:10px; margin-top:2px;">${s.note}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // 綁定事件監聽
  ['calc_racks', 'calc_price', 'calc_liquid', 'calc_odm_foxconn', 'calc_odm_quanta', 'calc_odm_wiwynn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateBom);
  });

  updateBom();
}

/**
 * 渲染晶片架構與技術瓶頸雷達 (Architecture & Bottlenecks)
 */
function renderArchitectureSection() {
  const container = document.getElementById('architectureContainer');
  if (!container || !window.ARCHITECTURE_DATA) return;

  const data = window.ARCHITECTURE_DATA;

  container.innerHTML = `
    <!-- 世代規格比較表 -->
    <div class="arch-table-card">
      <div style="padding:16px 20px; background:#09101d; border-bottom:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h2 style="font-size:17px; font-weight:800; color:#fff;">🔬 NVIDIA GPU 三大世代架構技術進化對比</h2>
          <p style="font-size:11px; color:#94a3b8; margin-top:2px;">從 Hopper (H100) 到 Blackwell (B200)，再到下一代 Rubin (R100)</p>
        </div>
        <span style="font-size:11px; color:#76b900; font-family:var(--font-mono); font-weight:bold;">NVIDIA ROADMAP</span>
      </div>
      <div class="arch-table-wrapper">
        <table class="arch-spec-table">
          <thead>
            <tr>
              <th>技術指標 / 規格</th>
              <th>上一代: Hopper (H100/H200)</th>
              <th style="color:#a3e635;">當前主力: Blackwell (B200/GB200)</th>
              <th style="color:#38bdf8;">下一代 (2026): Rubin (R100)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>製程節點</strong></td>
              <td>台積電 4N</td>
              <td style="color:#a3e635; font-weight:bold;">台積電 N4P (雙 Die 晶圓級整合)</td>
              <td style="color:#38bdf8;">台積電 3nm / 2nm (4 Die 3DIC)</td>
            </tr>
            <tr>
              <td><strong>電晶體總數</strong></td>
              <td>800 億 (80B)</td>
              <td style="color:#a3e635; font-weight:bold;">2,080 億 (208B · 突破微影光罩極限)</td>
              <td style="color:#38bdf8;">預估 3,000 億以上 (300B+)</td>
            </tr>
            <tr>
              <td><strong>高頻寬記憶體 (HBM)</strong></td>
              <td>80GB ~ 141GB HBM3/HBM3e</td>
              <td style="color:#a3e635; font-weight:bold;">192GB ~ 288GB HBM3e (8-Hi/12-Hi)</td>
              <td style="color:#38bdf8;">288GB ~ 384GB HBM4 (16-Hi, 2048-bit)</td>
            </tr>
            <tr>
              <td><strong>記憶體頻寬</strong></td>
              <td>3.35 ~ 4.8 TB/s</td>
              <td style="color:#a3e635; font-weight:bold;">8.0 TB/s (大幅解決記憶體牆問題)</td>
              <td style="color:#38bdf8;">預估達 16.0 TB/s (再翻倍)</td>
            </tr>
            <tr>
              <td><strong>FP4 推論算力</strong></td>
              <td>不支援</td>
              <td style="color:#a3e635; font-weight:bold;">20 PFLOPS (提升 5 倍推論吞吐)</td>
              <td style="color:#38bdf8;">預估達 45 ~ 50 PFLOPS</td>
            </tr>
            <tr>
              <td><strong>NVLink 雙向頻寬</strong></td>
              <td>900 GB/s (NVLink 4)</td>
              <td style="color:#a3e635; font-weight:bold;">1,800 GB/s (1.8 TB/s, NVLink 5)</td>
              <td style="color:#38bdf8;">3,600 GB/s (3.6 TB/s, NVLink 6)</td>
            </tr>
            <tr>
              <td><strong>散熱架構需求</strong></td>
              <td>傳統風冷 / 3D VC 均熱板</td>
              <td style="color:#a3e635; font-weight:bold;">強制導入全水冷 (120kW NVL72)</td>
              <td style="color:#38bdf8;">微流體水冷 / 冷板直觸 (150kW+)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 三大工程瓶頸卡片 -->
    <div style="margin:24px 0 14px 0;">
      <h2 style="font-size:18px; font-weight:800; color:#fff;">⚠️ 輝達產業鏈三大關鍵工程瓶頸與產業攻防戰</h2>
      <p style="font-size:12px; color:#94a3b8; margin-top:2px;">左右千億營收交付節奏與股價多空的最核心關鍵痛點：</p>
    </div>
    <div class="bottlenecks-grid">
      ${data.bottlenecks.map(b => `
        <div class="bottleneck-card" style="border-top:3px solid ${b.color};">
          <div class="bottleneck-header">
            <h3 class="bottleneck-title">${b.title}</h3>
            <span style="font-size:22px;">${b.icon}</span>
          </div>
          <div class="bottleneck-severity">${b.severity}</div>

          <div class="bottleneck-box">
            <strong style="color:#f43f5e;">⚡ 瓶頸癥結：</strong> ${b.problemDescription}
          </div>

          <div class="bottleneck-box" style="border-left:3px solid #00ff88;">
            <strong style="color:#00ff88;">💡 台廠解決方案：</strong> ${b.solution}
          </div>

          <div style="font-size:11px; color:#cbd5e1; margin-top:auto; padding-top:10px; border-top:1px dashed rgba(255,255,255,0.08);">
            <span>🎯 核心受惠台廠：</span> <strong style="color:#38bdf8;">${b.beneficiaries}</strong>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- NVL72 實體機櫃內部解構圖 (Rack Chassis Visualizer) -->
    <div class="rack-diagram-container">
      <div>
        <h3 style="font-size:16px; font-weight:800; color:#fff; margin-bottom:4px;">🏗️ NVL72 水冷機櫃內部組裝解構</h3>
        <p style="font-size:11px; color:#94a3b8; margin-bottom:14px;">高 42U/48U · 重 1.36 噸 · 功耗 120kW</p>

        <div class="rack-chassis-model">
          <div class="rack-slot compute"><span>Compute Tray #1 (2 Grace + 4 B200)</span><span style="color:#76b900;">水冷板直觸</span></div>
          <div class="rack-slot compute"><span>Compute Tray #2 ~ #9</span><span style="color:#76b900;">水冷板直觸</span></div>
          <div class="rack-slot switch"><span>NVLink Switch Tray #1~#9</span><span style="color:#38bdf8;">144 埠互連</span></div>
          <div class="rack-slot compute"><span>Compute Tray #10 ~ #18</span><span style="color:#76b900;">水冷板直觸</span></div>
          <div class="rack-slot power"><span>Power Shelf (140kW 交流轉直流)</span><span style="color:#ffd700;">台達電/光寶</span></div>
          <div class="rack-slot cdu"><span>CDU 冷卻液分配單元 (底部循環)</span><span style="color:#0ea5e9;">雙鴻/Vertiv</span></div>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; justify-content:center;">
        <h3 style="font-size:16px; font-weight:800; color:#fff; margin-bottom:10px;">🌟 機櫃級系統突破亮點</h3>
        <ul style="font-size:12px; color:#cbd5e1; line-height:1.8; padding-left:18px;">
          <li><strong>單一巨型 GPU 虛擬化：</strong> 藉由 9 席 NVLink Switch 抽屜，將 72 顆 B200 互連為單一具備 13.8TB 記憶體與 130TB/s 雙向頻寬的巨型超級 GPU！</li>
          <li><strong>銅纜零功耗背板：</strong> 機架背部密佈 5,000 條超細同軸線，免用光電轉換器直接節省 20kW 機房電力。</li>
          <li><strong>冷水進、熱水出：</strong> 25°C 進水溫度冷卻 72 顆滿載 1,000W 之 Blackwell 晶片，出水溫度達 45°C 可供資料中心供暖二次利用。</li>
        </ul>
      </div>
    </div>
  `;
}

/**
 * 渲染 CSP 資本支出、營收與現金流量表戰情模組 (CapEx, Revenue & Cash Flow)
 */
function renderCapexForecastSection() {
  const container = document.getElementById('capexForecastContainer');
  if (!container || !window.CAPEX_FORECAST_DATA) return;

  const data = window.CAPEX_FORECAST_DATA;
  const agg = data.aggregated;

  container.innerHTML = `
    <!-- 頂部戰略總覽 Banner -->
    <div style="margin-bottom:20px; padding:18px 22px; background:linear-gradient(135deg, rgba(118,185,0,0.12), rgba(56,189,248,0.12)); border:1px solid rgba(118,185,0,0.4); border-radius:10px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:8px;">
        <h2 style="font-size:19px; font-weight:900; color:#a3e635; display:flex; align-items:center; gap:8px;">
          <span>📈</span> 四大 CSP 雲端巨頭資本支出 (CapEx) 狂飆曲線與財務造血大盤
        </h2>
        <span class="live-pill">
          <span class="live-dot"></span>
          <span>彭博與大摩最新共識預測 · 2023 - 2026E 全追蹤</span>
        </span>
      </div>
      <p style="font-size:12.5px; color:#cbd5e1; line-height:1.6;">${data.strategicSummary}</p>
    </div>

    <!-- 四大巨頭合計總覽 KPI 看板 -->
    <div class="capex-summary-grid">
      <div class="capex-summary-card" style="border-left: 4px solid #a3e635;">
        <div class="capex-summary-label">2025E 四大 CSP 總 CapEx</div>
        <div class="capex-summary-val" style="color:#a3e635;">$${agg.totalCapex.y2025e} 億美元</div>
        <div class="capex-summary-sub">年增率 ${agg.totalCapex.growth2025} (突破 8.8 兆台幣)</div>
      </div>
      <div class="capex-summary-card" style="border-left: 4px solid #38bdf8;">
        <div class="capex-summary-label">2026E 四大 CSP 總 CapEx</div>
        <div class="capex-summary-val" style="color:#38bdf8;">$${agg.totalCapex.y2026e} 億美元</div>
        <div class="capex-summary-sub">年增率 ${agg.totalCapex.growth2026} (續創歷史新高)</div>
      </div>
      <div class="capex-summary-card" style="border-left: 4px solid #ffd700;">
        <div class="capex-summary-label">2025E 四大 CSP 營業現金流 (OCF)</div>
        <div class="capex-summary-val" style="color:#ffd700;">$${agg.totalOcf.y2025e} 億美元</div>
        <div class="capex-summary-sub">本業年產超過 16.7 兆台幣現金流</div>
      </div>
      <div class="capex-summary-card" style="border-left: 4px solid #c084fc;">
        <div class="capex-summary-label">2025E 自由現金流 (FCF) 與金庫</div>
        <div class="capex-summary-val" style="color:#c084fc;">$${agg.totalFcf.y2025e} 億美元</div>
        <div class="capex-summary-sub">扣除 CapEx 後仍手握 $3,375 億現金儲備</div>
      </div>
    </div>

    <!-- 1. 四大巨頭 2023 - 2026E 資本支出完整對比卡片 (Four Multi-Year Bars) -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin: 10px 0 14px 0;">
      <h3 style="font-size:16px; font-weight:800; color:#fff; display:flex; align-items:center; gap:6px;">
        <span>📊</span> 巨頭個別資本支出 2023 至 2026 年階梯式狂飆軌跡 (CapEx Multi-Year Trajectory)
      </h3>
      <span style="font-size:11px; color:#94a3b8;">單位：億美元 USD Billion</span>
    </div>

    <div class="capex-card-grid">
      ${data.hyperscalers.map(c => `
        <div class="capex-item-card" style="border-top:3px solid ${c.color};">
          <div class="capex-item-top">
            <div>
              <h4 style="font-size:16px; font-weight:800; color:#fff;">${c.name}</h4>
              <div style="font-size:11px; color:#94a3b8; font-family:var(--font-mono); margin-top:1px;">
                AI 佔比估: <strong style="color:#a3e635;">${c.aiSharePct}</strong>
              </div>
            </div>
            <span style="font-size:11px; padding:3px 10px; border-radius:12px; background:${c.color}22; color:${c.color}; font-weight:bold; border:1px solid ${c.color}55;">
              ${c.ticker}
            </span>
          </div>

          <!-- 2023-2026E 多年度對比進度條 -->
          <div class="capex-multi-bars-container">
            <!-- 2023 -->
            <div class="capex-bar-row">
              <span class="capex-bar-year">2023 實際</span>
              <div class="capex-bar-track-multi">
                <div class="capex-bar-fill-multi" style="width:${(c.capex.y2023 / 1100) * 100}%; background:#64748b;"></div>
              </div>
              <span class="capex-bar-val-multi" style="color:#94a3b8;">$${c.capex.y2023} 億</span>
            </div>

            <!-- 2024 -->
            <div class="capex-bar-row">
              <span class="capex-bar-year">2024 實際</span>
              <div class="capex-bar-track-multi">
                <div class="capex-bar-fill-multi" style="width:${(c.capex.y2024 / 1100) * 100}%; background:#38bdf8;"></div>
              </div>
              <span class="capex-bar-val-multi" style="color:#38bdf8;">
                $${c.capex.y2024} 億 <span class="fin-badge-blue">${c.capex.growth2024}</span>
              </span>
            </div>

            <!-- 2025 預估 (重點突顯) -->
            <div class="capex-bar-row" style="background:rgba(118,185,0,0.08); padding:3px 6px; border-radius:4px;">
              <span class="capex-bar-year" style="color:#a3e635;">2025 預估</span>
              <div class="capex-bar-track-multi">
                <div class="capex-bar-fill-multi" style="width:${(c.capex.y2025e / 1100) * 100}%; background:#a3e635; box-shadow:0 0 8px rgba(163,230,53,0.5);"></div>
              </div>
              <span class="capex-bar-val-multi" style="color:#a3e635;">
                $${c.capex.y2025e} 億 <span class="fin-badge-green">${c.capex.growth2025}</span>
              </span>
            </div>

            <!-- 2026 預估 (重點突顯) -->
            <div class="capex-bar-row" style="background:rgba(255,215,0,0.08); padding:3px 6px; border-radius:4px;">
              <span class="capex-bar-year" style="color:#ffd700;">2026 預估</span>
              <div class="capex-bar-track-multi">
                <div class="capex-bar-fill-multi" style="width:${(c.capex.y2026e / 1100) * 100}%; background:#ffd700; box-shadow:0 0 8px rgba(255,215,0,0.5);"></div>
              </div>
              <span class="capex-bar-val-multi" style="color:#ffd700;">
                $${c.capex.y2026e} 億 <span class="fin-badge-gold">${c.capex.growth2026}</span>
              </span>
            </div>
          </div>

          <div style="font-size:11px; color:#cbd5e1; line-height:1.55; background:rgba(15,23,42,0.6); padding:8px 10px; border-radius:6px; margin-top:auto; border-left:3px solid ${c.color};">
            🎯 <strong>核心部署計畫：</strong>${c.primaryFocus}
          </div>
        </div>
      `).join('')}
    </div>

    <!-- 2. 四大 CSP 綜合營收與雲端 AI 營收對比大表 -->
    <div class="arch-table-card">
      <div style="padding:14px 18px; background:#09101d; border-bottom:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <h3 style="font-size:15px; font-weight:800; color:#fff; display:flex; align-items:center; gap:6px;">
          <span>📑</span> 四大 CSP 綜合營收與核心雲端事業營收表 (Revenue & Cloud Segments)
        </h3>
        <span style="font-size:11px; color:#94a3b8;">數據幣別：億美元 (USD Billion)</span>
      </div>
      <div class="arch-table-wrapper">
        <table class="arch-spec-table">
          <thead>
            <tr>
              <th>巨頭名稱 (Company)</th>
              <th>2023 總營收</th>
              <th>2024 總營收</th>
              <th style="color:#a3e635;">2025E 總營收</th>
              <th style="color:#ffd700;">2026E 總營收</th>
              <th>核心雲端 / AI 變現事業</th>
              <th style="color:#38bdf8;">2024 雲端營收</th>
              <th style="color:#a3e635;">2025E 雲端營收 (YoY)</th>
            </tr>
          </thead>
          <tbody>
            ${data.hyperscalers.map(c => `
              <tr>
                <td>
                  <strong>${c.name}</strong> 
                  <span style="font-size:10px; color:${c.color}; font-weight:bold; margin-left:4px;">${c.ticker}</span>
                </td>
                <td style="font-family:var(--font-mono); color:#94a3b8;">$${c.revenue.y2023.toLocaleString()} 億</td>
                <td style="font-family:var(--font-mono); color:#cbd5e1;">$${c.revenue.y2024.toLocaleString()} 億</td>
                <td style="font-family:var(--font-mono); color:#a3e635; font-weight:bold;">
                  $${c.revenue.y2025e.toLocaleString()} 億 <span class="fin-badge-green">${c.revenue.growth2025}</span>
                </td>
                <td style="font-family:var(--font-mono); color:#ffd700; font-weight:bold;">
                  $${c.revenue.y2026e.toLocaleString()} 億
                </td>
                <td><span style="color:#f8fafc; font-weight:600;">${c.revenue.cloudSegment}</span></td>
                <td style="font-family:var(--font-mono); color:#38bdf8; font-weight:bold;">
                  $${c.revenue.cloudRevenue2024.toLocaleString()} 億
                </td>
                <td style="font-family:var(--font-mono); color:#a3e635; font-weight:bold;">
                  $${c.revenue.cloudRevenue2025e.toLocaleString()} 億 <span class="fin-badge-green">${c.revenue.cloudGrowth}</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- 3. 四大 CSP 現金流量表與自由現金流造血大表 -->
    <div class="arch-table-card">
      <div style="padding:14px 18px; background:#09101d; border-bottom:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <h3 style="font-size:15px; font-weight:800; color:#fff; display:flex; align-items:center; gap:6px;">
          <span>💰</span> 四大 CSP 現金流量表與自有資金造血大盤 (Cash Flow & Self-Funding Power)
        </h3>
        <span style="font-size:11px; color:#a3e635;">結論：四大巨頭 OCF 逾 5,200 億美元，完全以本業現金覆蓋 CapEx！</span>
      </div>
      <div class="arch-table-wrapper">
        <table class="arch-spec-table">
          <thead>
            <tr>
              <th>巨頭名稱 (Company)</th>
              <th>2024 營業現金流 (OCF)</th>
              <th style="color:#ffd700;">2025E 營業現金流 (OCF)</th>
              <th style="color:#fb7185;">2025E 資本支出 (CapEx)</th>
              <th style="color:#a3e635;">2025E 自由現金流 (FCF)</th>
              <th>CapEx / OCF 比重</th>
              <th style="color:#38bdf8;">帳上現金與流動投資</th>
              <th>財務健康與防禦力評級</th>
            </tr>
          </thead>
          <tbody>
            ${data.hyperscalers.map(c => `
              <tr>
                <td><strong>${c.name}</strong> (${c.ticker})</td>
                <td style="font-family:var(--font-mono); color:#cbd5e1;">$${c.cashFlow.ocf2024.toLocaleString()} 億</td>
                <td style="font-family:var(--font-mono); color:#ffd700; font-weight:bold;">$${c.cashFlow.ocf2025e.toLocaleString()} 億</td>
                <td style="font-family:var(--font-mono); color:#fb7185; font-weight:bold;">$${c.capex.y2025e} 億</td>
                <td style="font-family:var(--font-mono); color:#a3e635; font-weight:bold;">$${c.cashFlow.fcf2025e.toLocaleString()} 億</td>
                <td style="font-family:var(--font-mono); font-weight:bold; color:#f8fafc;">
                  ${c.cashFlow.capexToOcf2025}
                </td>
                <td style="font-family:var(--font-mono); color:#38bdf8; font-weight:bold;">
                  $${c.cashFlow.cashReserves} 億
                </td>
                <td>
                  <span class="fin-badge-green">極度強健 (AAA級現金牛)</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- 4. ROIC − WACC 經濟利差與股東價值創造矩陣 (EVA Spread Matrix) -->
    <div class="arch-table-card">
      <div style="padding:16px 20px; background:linear-gradient(90deg, #09101d, #0f1c30); border-bottom:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div>
          <div class="live-pill" style="display:inline-flex; margin-bottom:4px;">
            <span class="live-dot"></span>
            <span>資本定價核心 · 經濟增加值 (EVA)</span>
          </div>
          <h3 style="font-size:16px; font-weight:900; color:#fff; display:flex; align-items:center; gap:8px;">
            <span style="color:#a3e635;">🎯</span> 全球 AI 巨頭 ROIC − WACC 經濟利差與價值創造矩陣 (Economic Spread)
          </h3>
          <p style="font-size:11.5px; color:#94a3b8; margin-top:3px; line-height:1.5;">
            <strong>公式：經濟利差 (Spread) = ROIC (投入資本回報率) − WACC (加權資金成本)</strong>。當 Spread > 0，投入資本 (CapEx) 越大，為股東創造的真實財富越多；反之若 Spread < 0，則屬毀滅價值的過度投資。
          </p>
        </div>
        <span class="fin-badge-green" style="font-size:11px; padding:4px 10px;">超額收益黃金準繩</span>
      </div>
      <div class="arch-table-wrapper">
        <table class="arch-spec-table">
          <thead>
            <tr>
              <th>公司名稱 (代號)</th>
              <th>產業價值鏈定位</th>
              <th style="color:#a3e635;">ROIC (投入資本回報率)</th>
              <th style="color:#fb7185;">WACC (加權資金成本)</th>
              <th style="color:#ffd700;">經濟利差 (ROIC − WACC)</th>
              <th>股東價值創造狀態</th>
              <th>核心定價權與財務護城河剖析</th>
            </tr>
          </thead>
          <tbody>
            ${(data.roicWaccMatrix || []).map(r => `
              <tr>
                <td>
                  <strong style="color:#fff;">${r.company}</strong>
                </td>
                <td style="color:#94a3b8;">${r.role}</td>
                <td style="font-family:var(--font-mono); color:#a3e635; font-weight:bold; font-size:13px;">
                  ${r.roic}
                </td>
                <td style="font-family:var(--font-mono); color:#fb7185; font-weight:bold;">
                  ${r.wacc}
                </td>
                <td style="font-family:var(--font-mono); color:#ffd700; font-weight:900; font-size:13px;">
                  ${r.spread}
                </td>
                <td>
                  <span class="fin-badge-green">${r.status}</span>
                </td>
                <td style="font-size:11px; color:#cbd5e1; max-width:320px; white-space:normal; line-height:1.45;">
                  ${r.analysis}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- 5. 戰略深度剖析卡片：為何 AI 資本支出具備長期持續性？ -->
    <div class="bottlenecks-grid" style="margin-bottom:24px;">
      <div class="bottleneck-card" style="border-top:3px solid #a3e635;">
        <div class="bottleneck-header">
          <div class="bottleneck-title">🛡️ 本業現金流自我造血，完全非舉債膨脹</div>
          <span class="bottleneck-severity" style="background:rgba(163,230,53,0.15); color:#a3e635;">非網絡泡沫</span>
        </div>
        <div class="bottleneck-box">
          2000 年互聯網泡沫破裂的主因是新創公司毫無營收、全靠借貸與燒投資人的錢鋪設光纖。如今四大巨頭 2025 年合計本業營業現金流 (OCF) 高達 <strong>5,230 億美元</strong>，即使掏出 <strong>2,760 億美元</strong> 買 GPU 與建機房，淨剩餘自由現金流 (FCF) 仍超過 <strong>2,470 億美元</strong>，完全自給自足！
        </div>
      </div>

      <div class="bottleneck-card" style="border-top:3px solid #38bdf8;">
        <div class="bottleneck-header">
          <div class="bottleneck-title">💰 超過 3,300 億美元流動性戰略金庫</div>
          <span class="bottleneck-severity" style="background:rgba(56,189,248,0.15); color:#38bdf8;">頂級防禦壁壘</span>
        </div>
        <div class="bottleneck-box">
          微軟、谷歌、Meta 與亞馬遜帳上合計囤積了超過 <strong>3,375 億美元</strong> 的高流動性現金與美國國債。即便未來出現短期宏觀經濟震盪，各大巨頭的現金護城河足以支撐其在不依賴任何外部銀行融資的情況下，持續採購 Blackwell 與 Rubin 機櫃長達 3 年以上。
        </div>
      </div>

      <div class="bottleneck-card" style="border-top:3px solid #ffd700;">
        <div class="bottleneck-header">
          <div class="bottleneck-title">🚀 雲端與廣告業務已見清晰 ROI 變現</div>
          <span class="bottleneck-severity" style="background:rgba(255,215,0,0.15); color:#ffd700;">正向飛輪啟動</span>
        </div>
        <div class="bottleneck-box">
          AI 已經開始切實貢獻真金白銀：微軟 Azure 營收年增 20%（其中 AI 貢獻逾 12 個百分點）、Google Cloud 年增率暴衝至 32% 以上且營業利潤率持續轉正擴張、Meta 憑藉 AI 推薦引擎帶動廣告單價與點擊率雙位數成長，算力投資已進入「投資 ➔ 變現 ➔ 擴大再投資」之良性循環。
        </div>
      </div>
    </div>

    <!-- 5. 機櫃逐季出貨排程大表 -->
    <div class="arch-table-card">
      <div style="padding:14px 18px; background:#09101d; border-bottom:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <h3 style="font-size:15px; font-weight:800; color:#fff; display:flex; align-items:center; gap:6px;">
          <span>🚢</span> 全球 GB200 機櫃出貨放量時程預估 (單位：架 Racks)
        </h3>
        <span style="font-size:11px; color:#94a3b8;">資料來源：各大外資券商綜合研報預測 (2024Q4 - 2026 全年)</span>
      </div>
      <div class="arch-table-wrapper">
        <table class="arch-spec-table">
          <thead>
            <tr>
              <th>季度排程 (Timeline)</th>
              <th style="color:#a3e635;">NVL72 旗艦架數</th>
              <th style="color:#38bdf8;">NVL36 架數</th>
              <th style="color:#ffd700;">單季合計出貨</th>
              <th>產業交付動態與關鍵事件備註</th>
            </tr>
          </thead>
          <tbody>
            ${data.rackShipmentTimeline.map(t => `
              <tr>
                <td><strong>${t.quarter}</strong></td>
                <td style="color:#a3e635; font-weight:bold; font-family:var(--font-mono);">${t.nvl72.toLocaleString()}</td>
                <td style="color:#38bdf8; font-family:var(--font-mono);">${t.nvl36.toLocaleString()}</td>
                <td style="color:#ffd700; font-weight:bold; font-family:var(--font-mono);">${t.total.toLocaleString()}</td>
                <td>${t.note}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
