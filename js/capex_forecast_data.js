/**
 * 四大 CSP 資本支出、營收與現金流量表數據庫
 * (Hyperscalers CapEx, Revenue, Cash Flow Statements & Rack Shipments)
 */

window.CAPEX_FORECAST_DATA = {
  lastUpdated: "2026-11-16",
  
  // 四大巨頭資本支出完整多年度追蹤 (單位：億美元 USD Billion)
  hyperscalers: [
    {
      name: "微軟 (Microsoft)",
      ticker: "MSFT",
      color: "#00a4ef",
      capex: {
        y2023: 319,
        y2024: 557,
        y2025e: 760,
        y2026e: 920,
        growth2024: "+74.6%",
        growth2025: "+36.4%",
        growth2026: "+21.1%"
      },
      revenue: {
        y2023: 2119,
        y2024: 2542,
        y2025e: 2915,
        y2026e: 3320,
        growth2025: "+14.7%",
        cloudSegment: "Intelligent Cloud (Azure)",
        cloudRevenue2024: 1054,
        cloudRevenue2025e: 1265,
        cloudGrowth: "+20.0%"
      },
      cashFlow: {
        ocf2023: 876,
        ocf2024: 1185,
        ocf2025e: 1360,
        ocf2026e: 1580,
        fcf2023: 557,
        fcf2024: 628,
        fcf2025e: 600,
        fcf2026e: 660,
        capexToOcf2025: "55.9%",
        cashReserves: 755 // 帳上現金與短期投資 (億美元)
      },
      aiSharePct: "約 65%",
      primaryFocus: "支撐 OpenAI o1/GPT-5 訓練、Azure AI 雲端推論叢集、全球超算資料中心新建"
    },
    {
      name: "Alphabet (Google)",
      ticker: "GOOGL",
      color: "#34a853",
      capex: {
        y2023: 323,
        y2024: 520,
        y2025e: 640,
        y2026e: 750,
        growth2024: "+61.0%",
        growth2025: "+23.1%",
        growth2026: "+17.2%"
      },
      revenue: {
        y2023: 3074,
        y2024: 3500,
        y2025e: 3960,
        y2026e: 4470,
        growth2025: "+13.1%",
        cloudSegment: "Google Cloud Platform (GCP)",
        cloudRevenue2024: 442,
        cloudRevenue2025e: 585,
        cloudGrowth: "+32.4%"
      },
      cashFlow: {
        ocf2023: 1017,
        ocf2024: 1250,
        ocf2025e: 1430,
        ocf2026e: 1620,
        fcf2023: 694,
        fcf2024: 730,
        fcf2025e: 790,
        fcf2026e: 870,
        capexToOcf2025: "44.8%",
        cashReserves: 980
      },
      aiSharePct: "約 60%",
      primaryFocus: "Gemini 2.0 旗艦多模態基礎模型訓練、自研 TPU 與外購 Blackwell 雙軌架構擴張"
    },
    {
      name: "Meta Platforms",
      ticker: "META",
      color: "#0668e1",
      capex: {
        y2023: 281,
        y2024: 395,
        y2025e: 480,
        y2026e: 560,
        growth2024: "+40.6%",
        growth2025: "+21.5%",
        growth2026: "+16.7%"
      },
      revenue: {
        y2023: 1349,
        y2024: 1638,
        y2025e: 1885,
        y2026e: 2148,
        growth2025: "+15.1%",
        cloudSegment: "Family of Apps (AI-Driven Ads)",
        cloudRevenue2024: 1615,
        cloudRevenue2025e: 1858,
        cloudGrowth: "+15.0%"
      },
      cashFlow: {
        ocf2023: 711,
        ocf2024: 925,
        ocf2025e: 1060,
        ocf2026e: 1210,
        fcf2023: 430,
        fcf2024: 530,
        fcf2025e: 580,
        fcf2026e: 650,
        capexToOcf2025: "45.3%",
        cashReserves: 720
      },
      aiSharePct: "約 75% (全美純度最高)",
      primaryFocus: "Llama 4 多模態超大規模開源生態、Reels/Threads 推薦排序 AI 引擎全面升級"
    },
    {
      name: "亞馬遜 (Amazon AWS)",
      ticker: "AMZN",
      color: "#ff9900",
      capex: {
        y2023: 527,
        y2024: 750,
        y2025e: 880,
        y2026e: 1020,
        growth2024: "+42.3%",
        growth2025: "+17.3%",
        growth2026: "+15.9%"
      },
      revenue: {
        y2023: 5748,
        y2024: 6380,
        y2025e: 7120,
        y2026e: 7950,
        growth2025: "+11.6%",
        cloudSegment: "Amazon Web Services (AWS)",
        cloudRevenue2024: 1085,
        cloudRevenue2025e: 1290,
        cloudGrowth: "+18.9%"
      },
      cashFlow: {
        ocf2023: 849,
        ocf2024: 1160,
        ocf2025e: 1380,
        ocf2026e: 1620,
        fcf2023: 322,
        fcf2024: 410,
        fcf2025e: 500,
        fcf2026e: 600,
        capexToOcf2025: "63.8%",
        cashReserves: 920
      },
      aiSharePct: "約 55%",
      primaryFocus: "AWS 雲端算力基礎設施全面換代、Project Rainier Blackwell 超級集群與 Trainium 自研"
    }
  ],

  // 四大巨頭合計總覽
  aggregated: {
    totalCapex: {
      y2023: 1450,
      y2024: 2222,
      y2025e: 2760,
      y2026e: 3250,
      growth2024: "+53.2%",
      growth2025: "+24.2%",
      growth2026: "+17.8%"
    },
    totalOcf: {
      y2023: 3453,
      y2024: 4520,
      y2025e: 5230,
      y2026e: 6030
    },
    totalFcf: {
      y2023: 2003,
      y2024: 2298,
      y2025e: 2470,
      y2026e: 2780
    },
    totalCashReserves: 3375 // 2024 年底四大巨頭合計帳上現金逾 3,375 億美元
  },

  // 全球 GB200 機櫃出貨逐季預估 (單位：架 Racks)
  rackShipmentTimeline: [
    { quarter: "2024 Q4", nvl72: 1200, nvl36: 800, total: 2000, note: "首波小批量樣機與驗證機出貨，主要交付微軟與 Google" },
    { quarter: "2025 Q1", nvl72: 5500, nvl36: 3000, total: 8500, note: "CoWoS-L 擴產釋放，鴻海與廣達墨西哥廠開始規模化點火" },
    { quarter: "2025 Q2", nvl72: 11000, nvl36: 4500, total: 15500, note: "全面爆發期！水冷零件供應鏈瓶頸全面化解" },
    { quarter: "2025 Q3", nvl72: 16000, nvl36: 5500, total: 21500, note: "微軟與 Meta 進入拉貨最高峰，單季機櫃出貨突破 2 萬架" },
    { quarter: "2025 Q4", nvl72: 18500, nvl36: 6500, total: 25000, note: "Blackwell Ultra (B300) 銜接導入，2025 全年估突破 7 萬架" },
    { quarter: "2026 全年", nvl72: 65000, nvl36: 25000, total: 90000, note: "Blackwell 與下一代 Rubin 平行出貨，主權 AI 採購比重顯著增加" }
  ],

  // ROIC - WACC 經濟增加值 (EVA Spread) 核心矩陣
  roicWaccMatrix: [
    {
      company: "輝達 (NVIDIA / NVDA)",
      ticker: "NVDA",
      role: "AI 晶片原廠霸主 (Fabless)",
      roic: "82.5%",
      wacc: "10.8%",
      spread: "+71.7%",
      status: "極致價值創造怪物 (全球第一)",
      color: "#76b900",
      analysis: "無晶圓廠輕資產營運 + 75% 壟斷級毛利率，投入資本極少卻產出龐大 NOPAT，創造資本市場史上最狂暴的經濟利差！"
    },
    {
      company: "微軟 (Microsoft / MSFT)",
      ticker: "MSFT",
      role: "AI 雲端與軟體應用霸主",
      roic: "28.5%",
      wacc: "9.1%",
      spread: "+19.4%",
      status: "卓越價值創造 (安全緩衝厚)",
      color: "#00a4ef",
      analysis: "高毛利軟體+Azure 雙輪驅動，利差達 19.4%，即便 2025 年投入 760 億 CapEx 使投入資本增加，ROIC 仍穩居 WACC 兩倍以上。"
    },
    {
      company: "Meta Platforms (META)",
      ticker: "META",
      role: "開源 Llama 與社群廣告引擎",
      roic: "29.8%",
      wacc: "9.8%",
      spread: "+20.0%",
      status: "卓越價值創造 (零債務包袱)",
      color: "#0668e1",
      analysis: "零長期硬體負債，AI 演算法驅動廣告轉化率年增雙位數，利差高達 20%，每增加 1 元資本投入創造 0.3 元稅後淨營業利益。"
    },
    {
      company: "Alphabet (Google / GOOGL)",
      ticker: "GOOGL",
      role: "搜尋霸主與雲端雙軌 AI",
      roic: "27.2%",
      wacc: "9.3%",
      spread: "+17.9%",
      status: "卓越價值創造 (安全緩衝厚)",
      color: "#34a853",
      analysis: "搜尋現金牛極其雄厚，GCP 營業利益率翻正持續擴張，利差近 18%，資本投資回報率遠超市場要求門檻。"
    },
    {
      company: "亞馬遜 (Amazon / AMZN)",
      ticker: "AMZN",
      role: "AWS 雲端算力與全球電商",
      roic: "14.2%",
      wacc: "8.8%",
      spread: "+5.4%",
      status: "正向價值創造 (利差加速擴張)",
      color: "#ff9900",
      analysis: "受零售物流倉儲重資產拖累整體 ROIC 較純軟體巨頭低，但 AWS 與高毛利廣告業務快速佔比提升，帶動利差連續三年向上突破。"
    },
    {
      company: "台積電 (TSMC / 2330)",
      ticker: "2330.TW",
      role: "重資本晶圓代工與 CoWoS 獨家",
      roic: "30.5%",
      wacc: "8.2%",
      spread: "+22.3%",
      status: "重資本奇蹟 (先進製程獨霸)",
      color: "#00ff88",
      analysis: "年年投入逾 300 億美元高額 CapEx，但因先進製程定價權無人能比，ROIC 高達 30.5%，顛覆重資產行業低利差宿命！"
    },
    {
      company: "川湖 (King Slide / 2059)",
      ticker: "2059.TW",
      role: "AI 伺服器超高荷重專利滑軌",
      roic: "28.0%",
      wacc: "7.8%",
      spread: "+20.2%",
      status: "利基型零組件毛利王 (>65%)",
      color: "#ffd700",
      analysis: "全球高階伺服器導軌市佔 >85%，上千項專利構築無敵定價權，小型製造業創造出媲美軟體巨頭的極高經濟利差。"
    },
    {
      company: "鴻海 / 廣達 (Server ODM)",
      ticker: "2317 / 2382",
      role: "AI 伺服器整櫃系統組裝 (L10-L12)",
      roic: "18.2%",
      wacc: "7.5%",
      spread: "+10.7%",
      status: "高效周轉價值創造",
      color: "#c084fc",
      analysis: "毛利率雖僅 7%~9%，但存貨周轉率高達 8~10 次/年，資產運用極其精準，在台灣低資金成本環境下穩健享有 10% 以上正利差。"
    }
  ],

  strategicSummary: "根據彭博與摩根士丹利最新統計，四大雲端巨頭 2025 年資本支出將突破 2,760 億美元大關，2026 年進一步挺進 3,250 億美元。四大科技巨頭擁有極其充沛的自有造血能力：2025 年合計營業活動現金流 (OCF) 超過 5,200 億美元，扣除破紀錄 CapEx 後自由現金流 (FCF) 仍高達 2,470 億美元，且帳上持有超過 3,300 億美元現金儲備，徹底消弭市場對 AI 資本開支無法持續的疑慮！"
};
