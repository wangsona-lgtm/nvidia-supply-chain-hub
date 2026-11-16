/**
 * 輝達上下游產業鏈互動圖譜視覺化引擎 (含高科技 SVG 拓撲流向圖)
 * NVIDIA Full-Stack Supply Chain Interactive Topology & Blueprint Engine
 */

class SupplyChainVisualizer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentFilter = "all";
    this.selectedNodeId = "mid_nvda"; // 預設聚焦輝達核心
    this.nodes = this.getTopologyNodes();
    this.links = this.getTopologyLinks();
    this.init();
  }

  init() {
    if (!this.container || !window.NVIDIA_SUPPLY_CHAIN_DATA) return;
    this.render();
  }

  getTopologyNodes() {
    return {
      // 1. 上游
      up_eda: { id: 'up_eda', stage: 1, name: 'EDA 設計與 IP 架構', sub: 'Synopsys / ARM', col: 0, row: 0, tickers: ['SNPS', 'ARM'], margin: '75% ~ 82%', role: '提供百億電晶體模擬工具與 Grace CPU Neoverse V2 架構授權', share: '雙寡頭獨佔', moat: 'AI 晶片設計軟體轉換成本極高' },
      up_tsmc: { id: 'up_tsmc', stage: 1, name: '晶圓代工 (TSMC)', sub: '台積電 (2330 / TSM)', col: 0, row: 1, tickers: ['2330', 'TSM'], margin: '54% ~ 58%', role: '獨家 4NP 製程代工 Blackwell 雙晶片，2026 推進至 N3P/A16', share: '100% Blackwell GPU 製造', moat: '全球先進製程唯一高良率量產護城河' },
      up_cowos: { id: 'up_cowos', stage: 1, name: 'CoWoS-L 先進封裝', sub: '台積電 / 日月光投控', col: 0, row: 2, tickers: ['2330', '3711'], margin: '50% ~ 55%', role: '2.5D 晶圓級整合雙 GPU 晶粒與 8 顆 HBM3e，LSI 矽橋接器', share: '月產能 3.5萬 -> 7.5萬片', moat: '大面積封裝翹曲控制與局部矽中介層專利' },
      up_hbm: { id: 'up_hbm', stage: 1, name: 'HBM3e 高頻寬記憶體', sub: 'SK海力士 / 美光 / 三星', col: 0, row: 3, tickers: ['MU'], margin: '45% ~ 55%', role: '單顆 GPU 搭載 192GB 8-Hi HBM3e，傳輸頻寬達 8TB/s', share: 'SK海力士 >70%, 美光 ~20%', moat: 'MR-MUF 專利散熱與高良率 12-Hi 堆疊技術' },
      up_probe: { id: 'up_probe', stage: 1, name: '垂直探針卡與高頻測試', sub: '旺矽 (6223) / 穎崴 (6515)', col: 0, row: 4, tickers: ['6223', '6515'], margin: '48% ~ 55%', role: '千瓦級功耗之晶圓測試 (CP) 與系統級測試 (SLT) 治具測試座', share: '旺矽 VPC 市佔 >60%', moat: '3 萬針微型高頻接觸與千瓦級高溫測試專利' },
      up_cpo: { id: 'up_cpo', stage: 1, name: '矽光子 CPO 與光收發', sub: '聯鈞 (3450) / 上詮 / 光聖', col: 0, row: 5, tickers: ['3450', '3363', '6442'], margin: '35% ~ 45%', role: '800G/1.6T 光收發模組、CW 雷射封裝與光纖陣列連接器', share: 'Rubin 世代與萬卡機櫃骨幹', moat: '光電共封裝光損耗控制與台積電矽光子聯盟' },

      // 2. 中游組件與核心
      mid_pcb: { id: 'mid_pcb', stage: 2, name: '高階 ABF 載板 & CCL', sub: '欣興 (3037) / 台光電 (2383)', col: 1, row: 0, tickers: ['3037', '2383', '2368'], margin: '28% ~ 35%', role: '16~20層大面積 ABF 載板與 M8 超低損耗銅箔基板 (CCL)', share: '欣興 B200 載板主力, 台光電 CCL >70%', moat: '大尺寸抗熱脹翹曲技術與超低介電損耗專利' },
      mid_nvda: { id: 'mid_nvda', stage: 2, name: '⚡ 輝達 Blackwell GPU 平台', sub: 'NVIDIA (NVDA)', col: 1, row: 1, tickers: ['NVDA'], margin: '74% ~ 76%', role: 'B200 / GB200 算力核心晶片 + NVLink 5.0 Switch 晶片', share: '佔單座 NVL72 機櫃價值高達 65% ($1.95M)', moat: 'CUDA 軟體護城河與 1.8TB/s NVLink 互聯通訊協議' },
      mid_cooling: { id: 'mid_cooling', stage: 2, name: '💧 液冷水冷散熱模組', sub: '奇鋐 (3017) / 雙鴻 (3324) / Vertiv', col: 1, row: 2, tickers: ['3017', '3324', 'VRT'], margin: '25% ~ 35%', role: 'CDU 冷卻液分配單元、Cold Plate 水冷板、Manifold 分歧管與快接頭', share: '單櫃產值自氣冷 $8K 跳升至 $84,000 (暴增 10x)', moat: '負壓防漏技術與航太級自封式乾式斷開快接頭 (QDC)' },
      mid_power: { id: 'mid_power', stage: 2, name: '⚡ 140kW 特高壓大功率電源', sub: '台達電 (2308) / 光寶科 (2301)', col: 1, row: 3, tickers: ['2308', '2301'], margin: '30% ~ 36%', role: '140kW Power Shelf 電源櫃 (電網 AC 轉 54V DC，效率 >97.5%)', share: '單櫃價值約 $66,000，台達電佔半數以上', moat: '超高電網抗突波與極限功率密度轉換架構' },
      mid_cable: { id: 'mid_cable', stage: 2, name: '🔌 NVLink 銅纜高速背板', sub: '貿聯-KY (3665) / 安費諾', col: 1, row: 4, tickers: ['3665'], margin: '28% ~ 34%', role: '單櫃超過 5,000 根細同軸銅纜，無損直連 72 顆 GPU', share: '單櫃價值約 $54,000，貿聯主力供貨', moat: '極高頻微同軸遮蔽工藝，免用光模組直接省下 20kW 能耗' },
      mid_rails: { id: 'mid_rails', stage: 2, name: '🗄️ 超高荷重專用滑軌', sub: '川湖 (2059)', col: 1, row: 5, tickers: ['2059'], margin: '65% ~ 68%', role: '專為 1,300kg 機架重載打造之超薄耐壓導軌機構件', share: '全球 AI 伺服器高階滑軌市佔率 >85%', moat: '上千項高負載滑動專利與各大雲端巨擘驗證壁壘' },

      // 3. 中游 ODM 整櫃組裝
      odm_foxconn: { id: 'odm_foxconn', stage: 3, name: '🏗️ 鴻海 (2317) / 鴻佰', sub: 'Foxconn / Ingrasys', col: 2, row: 0, tickers: ['2317'], margin: '7.5% ~ 9.5%', role: 'GB200 NVL72/NVL36 整櫃系統組裝、水冷加壓測試與關鍵零組件自製', share: '整櫃代工份額約 40% ~ 45% (全球最大龍頭)', moat: '全球超大規模產能調配與墨西哥/台灣/美國在地化交付' },
      odm_quanta: { id: 'odm_quanta', stage: 3, name: '🏗️ 廣達 (2382) / 雲達', sub: 'Quanta / QCT', col: 2, row: 1, tickers: ['2382'], margin: '8.0% ~ 10.0%', role: '微軟與 Google 首波 Blackwell 整櫃核心代工，軟硬體整合能力頂尖', share: '整櫃代工份額約 30% ~ 35%', moat: '白牌資料中心架構研發深耕逾十年，高難度系統除錯強項' },
      odm_wiwynn: { id: 'odm_wiwynn', stage: 3, name: '🏗️ 緯穎 (6669)', sub: 'Wiwynn Corp.', col: 2, row: 2, tickers: ['6669'], margin: '8.5% ~ 10.5%', role: '微軟與 Meta 核心直供 ODM，自研全水冷整櫃解決方案與冷板設計', share: 'AI 伺服器營收純度超過 40%', moat: '完全聚焦於超大規模資料中心，無消費性硬體低毛利包袱' },
      odm_wistron: { id: 'odm_wistron', stage: 3, name: '🏗️ 緯創 (3231)', sub: 'Wistron Corp.', col: 2, row: 3, tickers: ['3231'], margin: '7.5% ~ 9.0%', role: '輝達 GPU 運算基板 (OAM) 獨家主力代工與 Compute Tray 模組製造', share: '掌控 GPU 運算基板咽喉，交貨給各大整機廠', moat: '超高密度 SMT 打件良率與輝達原廠多年深厚綁定' },

      // 4. 下游買方與應用
      down_msft: { id: 'down_msft', stage: 4, name: '☁️ 微軟 Azure (MSFT)', sub: 'Microsoft Corp.', col: 3, row: 0, tickers: ['MSFT'], margin: '70%+', role: '全球最大 AI 算力採購巨頭，全力支援 OpenAI (GPT-4/o1) 與 Copilot', share: '2025 預估 CapEx 超過 750 億美元', moat: '全球最完整企業級雲端應用場景與 OpenAI 深度戰略綁定' },
      down_googl: { id: 'down_googl', stage: 4, name: '☁️ Google Cloud (GOOGL)', sub: 'Alphabet Inc.', col: 3, row: 1, tickers: ['GOOGL'], margin: '廣告+雲端強勁', role: '大舉採購 Blackwell 同步自研 TPU v5p/v6，建構雙軌運算防禦', share: '2025 預估 CapEx 約 550 億美元', moat: '自有全球最大資料中心私有光纖網絡與 Gemini 原生多模態模型' },
      down_meta: { id: 'down_meta', stage: 4, name: '☁️ Meta Platforms (META)', sub: 'Meta Platforms Inc.', col: 3, row: 2, tickers: ['META'], margin: '80%+', role: '打造 Llama 4 巨型開源模型與百億級用戶社群推薦演算法', share: '2025 預估 CapEx 約 450 億美元', moat: '全球最繁榮之開源 AI 生態與 32 億日活用戶之商業變現能力' },
      down_amzn: { id: 'down_amzn', stage: 4, name: '☁️ 亞馬遜 AWS (AMZN)', sub: 'Amazon.com Inc.', col: 3, row: 3, tickers: ['AMZN'], margin: '雲端高毛利', role: '打造 Project Rainier 萬卡 Blackwell 叢集，強化 Bedrock 企業算力', share: '2025 預估 CapEx 約 600 億美元', moat: '全球市佔第一雲端基礎設施與龐大企業雲原生客戶群' },
      down_neoclouds: { id: 'down_neoclouds', stage: 4, name: '🚀 CoreWeave & xAI', sub: '純算力雲 & 馬斯克 Colossus', col: 3, row: 4, tickers: [], margin: '算力租賃極高溢價', role: '田納西州 10 萬卡超算升級至 20 萬卡 Blackwell，極限訓練 Grok 3', share: '獲輝達優先配貨特權，租賃訂單滿載至 2026', moat: '122 天超高速建廠部署紀錄與專屬 AI 算力基礎設施' },
      down_sovereign: { id: 'down_sovereign', stage: 4, name: '🏛️ 國家級主權 AI 國家隊', sub: '沙烏地 / 阿聯酋 / 日本 / 台灣', col: 3, row: 5, tickers: [], margin: '國家預算級支持', role: '打造國家專屬語言模型與戰略算力中心，確保國家數據主權不外流', share: '年增數百億美元新興增量市場', moat: '非美系地緣政治避險大買家，各國國家基金重金投注' }
    };
  }

  getTopologyLinks() {
    return [
      // 上游至中游核心
      { from: 'up_eda', to: 'mid_nvda' },
      { from: 'up_tsmc', to: 'up_cowos' },
      { from: 'up_cowos', to: 'mid_nvda' },
      { from: 'up_hbm', to: 'up_cowos' },
      { from: 'up_probe', to: 'up_tsmc' },
      { from: 'up_probe', to: 'up_cowos' },
      { from: 'up_cpo', to: 'mid_nvda' },

      // 中游組件匯聚至整機 ODM
      { from: 'mid_pcb', to: 'mid_nvda' },
      { from: 'mid_pcb', to: 'odm_wistron' },
      { from: 'mid_nvda', to: 'odm_foxconn' },
      { from: 'mid_nvda', to: 'odm_quanta' },
      { from: 'mid_nvda', to: 'odm_wiwynn' },
      { from: 'mid_nvda', to: 'odm_wistron' },
      { from: 'mid_cooling', to: 'odm_foxconn' },
      { from: 'mid_cooling', to: 'odm_quanta' },
      { from: 'mid_cooling', to: 'odm_wiwynn' },
      { from: 'mid_power', to: 'odm_foxconn' },
      { from: 'mid_power', to: 'odm_quanta' },
      { from: 'mid_power', to: 'odm_wiwynn' },
      { from: 'mid_cable', to: 'odm_foxconn' },
      { from: 'mid_cable', to: 'odm_quanta' },
      { from: 'mid_rails', to: 'odm_foxconn' },
      { from: 'mid_rails', to: 'odm_quanta' },
      { from: 'mid_rails', to: 'odm_wiwynn' },
      { from: 'odm_wistron', to: 'odm_foxconn' },
      { from: 'odm_wistron', to: 'odm_quanta' },

      // 整機 ODM 交付給下游買方
      { from: 'odm_foxconn', to: 'down_msft' },
      { from: 'odm_foxconn', to: 'down_googl' },
      { from: 'odm_foxconn', to: 'down_amzn' },
      { from: 'odm_foxconn', to: 'down_neoclouds' },
      { from: 'odm_foxconn', to: 'down_sovereign' },
      { from: 'odm_quanta', to: 'down_msft' },
      { from: 'odm_quanta', to: 'down_googl' },
      { from: 'odm_quanta', to: 'down_meta' },
      { from: 'odm_wiwynn', to: 'down_msft' },
      { from: 'odm_wiwynn', to: 'down_meta' }
    ];
  }

  getNodeCoords(node) {
    // Canvas 寬高 1200 x 680
    const colX = [25, 320, 630, 930];
    const colWidths = [245, 255, 245, 245];
    const x = colX[node.col];
    const w = colWidths[node.col];

    let y, h;
    if (node.col === 0) {
      // 6 個節點
      h = 58;
      y = 62 + node.row * 96;
    } else if (node.col === 1) {
      // 6 個節點，特別加強輝達 NVDA 卡片
      if (node.id === 'mid_nvda') {
        h = 74;
        y = 152;
      } else if (node.row === 0) {
        h = 58;
        y = 62;
      } else {
        h = 58;
        y = 62 + node.row * 96;
      }
    } else if (node.col === 2) {
      // 4 個節點
      h = 80;
      y = 96 + node.row * 128;
    } else {
      // 6 個節點
      h = 58;
      y = 62 + node.row * 96;
    }

    return {
      x, y, w, h,
      outX: x + w,
      outY: y + h / 2,
      inX: x,
      inY: y + h / 2
    };
  }

  setFilter(filter) {
    this.currentFilter = filter;
    this.render();
  }

  selectNode(nodeId) {
    this.selectedNodeId = nodeId;
    this.updateSvgHighlight();
    this.renderNodeInspector();
  }

  updateSvgHighlight() {
    const selId = this.selectedNodeId;
    if (!selId) return;

    // 找出所有與 selId 相關的 links
    const activeLinks = this.links.filter(l => l.from === selId || l.to === selId);
    const relatedNodeIds = new Set([selId]);
    activeLinks.forEach(l => {
      relatedNodeIds.add(l.from);
      relatedNodeIds.add(l.to);
    });

    // 更新 Node 狀態
    const nodeEls = this.container.querySelectorAll('.topo-node');
    nodeEls.forEach(el => {
      const id = el.getAttribute('data-id');
      el.classList.remove('active-node', 'related-node', 'dimmed');
      if (id === selId) {
        el.classList.add('active-node');
      } else if (relatedNodeIds.has(id)) {
        el.classList.add('related-node');
      } else {
        el.classList.add('dimmed');
      }
    });

    // 更新 Link 狀態
    const linkEls = this.container.querySelectorAll('.topo-link');
    linkEls.forEach(el => {
      const from = el.getAttribute('data-from');
      const to = el.getAttribute('data-to');
      el.classList.remove('active-flow', 'dimmed');
      if (from === selId || to === selId) {
        el.classList.add('active-flow');
      } else {
        el.classList.add('dimmed');
      }
    });
  }

  renderSvgFlowchart() {
    const nodes = this.nodes;
    const links = this.links;

    // 定義各欄顏色
    const stageColors = ['#00ff88', '#38bdf8', '#c084fc', '#ffd700'];

    // 生成連線 SVG Path
    const pathsHtml = links.map(link => {
      const fromNode = nodes[link.from];
      const toNode = nodes[link.to];
      if (!fromNode || !toNode) return '';

      const c1 = this.getNodeCoords(fromNode);
      const c2 = this.getNodeCoords(toNode);

      const dx = Math.max(30, (c2.inX - c1.outX) * 0.5);
      const d = `M ${c1.outX} ${c1.outY} C ${c1.outX + dx} ${c1.outY}, ${c2.inX - dx} ${c2.inY}, ${c2.inX} ${c2.inY}`;

      return `
        <path d="${d}" 
              class="topo-link" 
              data-from="${link.from}" 
              data-to="${link.to}" 
              marker-end="url(#arrow)" />
      `;
    }).join('');

    // 生成節點 SVG
    const nodesHtml = Object.values(nodes).map(node => {
      const c = this.getNodeCoords(node);
      const stageColor = stageColors[node.stage - 1];
      const isCore = node.id === 'mid_nvda';

      return `
        <g class="topo-node ${node.id === this.selectedNodeId ? 'active-node' : ''}" 
           data-id="${node.id}" 
           style="transform-origin: ${c.x + c.w / 2}px ${c.y + c.h / 2}px;">
          
          <!-- 背景卡片 -->
          <rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="8" ry="8" 
                class="node-rect ${isCore ? 'core-rect' : ''}" 
                style="stroke:${stageColor};" />

          <!-- 左側色彩裝飾條 -->
          <rect x="${c.x}" y="${c.y}" width="4" height="${c.h}" rx="2" ry="2" 
                style="fill:${stageColor};" />

          <!-- 標題 -->
          <text x="${c.x + 14}" y="${c.y + 20}" class="node-title ${isCore ? 'core-title' : ''}">
            ${node.name}
          </text>

          <!-- 副標/代表公司 -->
          <text x="${c.x + 14}" y="${c.y + 36}" class="node-sub">
            ${node.sub}
          </text>

          <!-- 毛利率 / 關鍵標籤 -->
          <text x="${c.x + c.w - 12}" y="${c.y + 50}" class="node-margin" text-anchor="end" style="fill:${stageColor};">
            毛利: ${node.margin}
          </text>
        </g>
      `;
    }).join('');

    return `
      <div class="topo-svg-wrapper">
        <svg viewBox="0 0 1200 660" class="topo-svg-canvas">
          <defs>
            <!-- 箭頭標記 -->
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#64748b" />
            </marker>
            <marker id="arrow-active" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#76b900" />
            </marker>

            <!-- 網格背景 -->
            <pattern id="topoGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.02)" stroke-width="1"/>
            </pattern>
          </defs>

          <!-- 背景底色與網格 -->
          <rect width="1200" height="660" fill="#080e1b" rx="10" />
          <rect width="1200" height="660" fill="url(#topoGrid)" rx="10" />

          <!-- 四大階段頂部表頭橫條 -->
          <g class="topo-stage-headers">
            <!-- Stage 1 -->
            <rect x="25" y="16" width="245" height="34" rx="6" fill="rgba(0, 255, 136, 0.12)" stroke="#00ff8855" />
            <text x="147" y="38" text-anchor="middle" fill="#00ff88" font-size="12" font-weight="800">
              🧬 1. 上游：晶圓·封裝·材料·IP
            </text>

            <!-- Stage 2 -->
            <rect x="320" y="16" width="255" height="34" rx="6" fill="rgba(56, 189, 248, 0.12)" stroke="#38bdf855" />
            <text x="447" y="38" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="800">
              ⚡ 2. 中游：輝達核心與關鍵零組件
            </text>

            <!-- Stage 3 -->
            <rect x="630" y="16" width="245" height="34" rx="6" fill="rgba(192, 132, 252, 0.12)" stroke="#c084fc55" />
            <text x="752" y="38" text-anchor="middle" fill="#c084fc" font-size="12" font-weight="800">
              🏗️ 3. 中游：AI 伺服器整櫃代工
            </text>

            <!-- Stage 4 -->
            <rect x="930" y="16" width="245" height="34" rx="6" fill="rgba(255, 215, 0, 0.12)" stroke="#ffd70055" />
            <text x="1052" y="38" text-anchor="middle" fill="#ffd700" font-size="12" font-weight="800">
              ☁️ 4. 下游：四大 CSP·超算·主權 AI
            </text>
          </g>

          <!-- 連接線群組 -->
          <g class="topo-links-group">
            ${pathsHtml}
          </g>

          <!-- 節點群組 -->
          <g class="topo-nodes-group">
            ${nodesHtml}
          </g>
        </svg>
      </div>
    `;
  }

  renderNodeInspector() {
    const inspectorEl = this.container.querySelector('#topoNodeInspector');
    if (!inspectorEl) return;

    const node = this.nodes[this.selectedNodeId];
    if (!node) {
      inspectorEl.innerHTML = `<div style="color:#64748b; font-size:12px;">點選上方任意拓撲節點，即可在此檢視其深度規格、毛利率與 GB200 供貨地位。</div>`;
      return;
    }

    const stageNames = [
      '🧬 上游底層核心 (Upstream)',
      '⚡ 中游核心與關鍵零組件 (Midstream Components)',
      '🏗️ 中游整機 ODM 代工 (System ODM)',
      '☁️ 下游買方與算力落地 (Downstream CSPs)'
    ];
    const stageColors = ['#00ff88', '#38bdf8', '#c084fc', '#ffd700'];
    const curStageColor = stageColors[node.stage - 1];

    inspectorEl.innerHTML = `
      <div class="topo-inspector-card" style="border-left: 4px solid ${curStageColor};">
        <div class="topo-inspector-header">
          <div>
            <div style="font-size:11px; font-weight:700; color:${curStageColor}; text-transform:uppercase;">
              ${stageNames[node.stage - 1]}
            </div>
            <h3 style="font-size:18px; font-weight:900; color:#fff; margin-top:2px;">
              ${node.name}
            </h3>
            <div style="font-size:12px; color:#94a3b8; font-family:var(--font-mono); margin-top:2px;">
              代表廠商：<strong style="color:#f8fafc;">${node.sub}</strong>
            </div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:10px; color:#94a3b8;">預估毛利率區間</div>
            <div style="font-size:20px; font-weight:900; color:${curStageColor}; font-family:var(--font-mono);">
              ${node.margin}
            </div>
          </div>
        </div>

        <div class="topo-inspector-grid">
          <div class="topo-metric-box">
            <span class="metric-label">🎯 關鍵技術職責與規格：</span>
            <span class="metric-val">${node.role}</span>
          </div>
          <div class="topo-metric-box">
            <span class="metric-label">📊 供應份額與地位：</span>
            <span class="metric-val" style="color:#a3e635;">${node.share}</span>
          </div>
          <div class="topo-metric-box" style="grid-column: 1 / -1;">
            <span class="metric-label">🛡️ 核心競爭護城河與壁壘：</span>
            <span class="metric-val" style="color:#cbd5e1;">${node.moat}</span>
          </div>
        </div>

        <div class="topo-inspector-footer">
          <div class="topo-ticker-pills">
            <span style="font-size:11px; color:#94a3b8; margin-right:4px;">關聯股票：</span>
            ${node.tickers.map(t => `
              <button class="inspector-ticker-btn" data-ticker="${t}">
                🔍 觀察 ${t}
              </button>
            `).join('')}
          </div>
          <button class="topo-reset-btn" id="topoResetFlowBtn">
            🔄 重設全景流向
          </button>
        </div>
      </div>
    `;

    // 綁定股票按鈕切換至 tab-stocks
    const tickerBtns = inspectorEl.querySelectorAll('.inspector-ticker-btn');
    tickerBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const t = btn.getAttribute('data-ticker');
        const stocksTabBtn = document.querySelector('.tab-btn[data-tab="tab-stocks"]');
        if (stocksTabBtn) {
          stocksTabBtn.click();
          const searchInput = document.getElementById('stockSearchInput');
          if (searchInput) {
            searchInput.value = t;
            searchInput.dispatchEvent(new Event('input'));
          }
        }
      });
    });

    // 綁定重設按鈕
    const resetBtn = inspectorEl.querySelector('#topoResetFlowBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.selectedNodeId = 'mid_nvda';
        this.updateSvgHighlight();
        this.renderNodeInspector();
      });
    }
  }

  render() {
    const data = window.NVIDIA_SUPPLY_CHAIN_DATA;
    if (!data) return;

    let html = `
      <div class="sc-blueprint-wrapper">

        <!-- 頂部高科技互動拓撲圖譜區塊 (Interactive SVG Topology Map) -->
        <div class="topo-chart-section">
          <div class="topo-section-header">
            <div>
              <div class="live-pill" style="display:inline-flex; margin-bottom:6px;">
                <span class="live-dot"></span>
                <span>動態互動拓撲 · 全球 AI 算力骨幹路徑</span>
              </div>
              <h2 style="font-size:20px; font-weight:900; color:#fff;">
                🌐 輝達 AI 上中下游全球產業鏈視覺拓撲圖 (Interactive Topology Flowchart)
              </h2>
              <p style="font-size:12px; color:#94a3b8; margin-top:3px;">
                點擊下方任意節點（如台積電、水冷散熱、廣達、微軟），系統將自動以綠色動態光流高亮其「上游供應商」與「下游客戶」之產值傳導脈絡。
              </p>
            </div>

            <!-- 快捷流向過濾按鈕 -->
            <div class="topo-quick-filters">
              <button class="topo-filter-pill active" data-flow="all">全景動態流向</button>
              <button class="topo-filter-pill" data-flow="cowos">🔬 台積電 CoWoS 鏈</button>
              <button class="topo-filter-pill" data-flow="cooling">💧 水冷散熱鏈 (雙鴻/奇鋐)</button>
              <button class="topo-filter-pill" data-flow="odm">🏗️ 整櫃 ODM 組裝鏈 (鴻海/廣達)</button>
              <button class="topo-filter-pill" data-flow="csp">☁️ 四大 CSP 採購鏈</button>
            </div>
          </div>

          <!-- SVG 畫布本體 -->
          ${this.renderSvgFlowchart()}

          <!-- 選取節點深度規格檢視卡 (Inspector Panel) -->
          <div id="topoNodeInspector" style="margin-top:14px;"></div>
        </div>

        <!-- 分割線 -->
        <div style="display:flex; align-items:center; gap:16px; margin: 30px 0 20px 0;">
          <div style="flex:1; height:1px; background:var(--border-subtle);"></div>
          <div style="font-size:13px; font-weight:800; color:#a3e635; display:flex; align-items:center; gap:6px;">
            <span>📑</span> 深度賽道卡片清單與關鍵份額 (Detailed Sector Catalog)
          </div>
          <div style="flex:1; height:1px; background:var(--border-subtle);"></div>
        </div>

        <!-- 賽道聚焦篩選器 -->
        <div class="sc-filter-bar">
          <div style="font-size:13px; font-weight:700; color:#fff; display:flex; align-items:center; gap:6px;">
            <span style="color:#76b900;">⚡</span> 賽道篩選器：
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

        <!-- 三大層級詳細卡片欄 (Detailed Tier Cards) -->
        <div class="sc-tiers-column">
    `;

    data.tiers.forEach((tier, tIdx) => {
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
    this.updateSvgHighlight();
    this.renderNodeInspector();
  }

  bindEvents() {
    // 綁定 SVG 節點點擊
    const nodeEls = this.container.querySelectorAll('.topo-node');
    nodeEls.forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        this.selectNode(id);
      });
    });

    // 綁定快捷流向過濾按鈕
    const flowPills = this.container.querySelectorAll('.topo-filter-pill');
    flowPills.forEach(pill => {
      pill.addEventListener('click', () => {
        flowPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const flow = pill.getAttribute('data-flow');
        if (flow === 'all') {
          this.selectNode('mid_nvda');
        } else if (flow === 'cowos') {
          this.selectNode('up_cowos');
        } else if (flow === 'cooling') {
          this.selectNode('mid_cooling');
        } else if (flow === 'odm') {
          this.selectNode('odm_foxconn');
        } else if (flow === 'csp') {
          this.selectNode('down_msft');
        }
      });
    });

    // 綁定下方詳細卡片篩選器
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
