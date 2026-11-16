/**
 * 四大 CSP 資本支出與 GB200 機櫃出貨預測數據庫
 * (Hyperscalers CapEx & AI Rack Shipment Forecast)
 */

window.CAPEX_FORECAST_DATA = {
  lastUpdated: "2026-11-16",
  hyperscalers: [
    {
      name: "微軟 (Microsoft)",
      ticker: "MSFT",
      y2023: 319, // 億美元
      y2024: 557,
      y2025e: 760,
      y2026e: 920,
      aiSharePct: "約 65%",
      primaryFocus: "支撐 OpenAI o1/GPT-5 訓練、Azure AI 雲端推論叢集、全球資料中心新建",
      color: "#00a4ef"
    },
    {
      name: "Alphabet (Google)",
      ticker: "GOOGL",
      y2023: 322,
      y2024: 520,
      y2025e: 640,
      y2026e: 750,
      aiSharePct: "約 60%",
      primaryFocus: "Gemini 2.0 基礎模型訓練、自研 TPU 與外購 Blackwell 雙軌架構擴張",
      color: "#34a853"
    },
    {
      name: "Meta Platforms",
      ticker: "META",
      y2023: 281,
      y2024: 395,
      y2025e: 480,
      y2026e: 560,
      aiSharePct: "約 75% (全美純度最高)",
      primaryFocus: "Llama 4 多模態開源生態、Reels/Threads 推薦排序 AI 引擎升級",
      color: "#0668e1"
    },
    {
      name: "亞馬遜 (Amazon AWS)",
      ticker: "AMZN",
      y2023: 527,
      y2024: 750,
      y2025e: 880,
      y2026e: 1020,
      aiSharePct: "約 55%",
      primaryFocus: "AWS 雲端算力基礎設施全面換代、Project Rainier Blackwell 超級集群",
      color: "#ff9900"
    }
  ],

  // 全球 GB200 機櫃出貨逐季預估 (單位：架 Racks)
  rackShipmentTimeline: [
    { quarter: "2024 Q4", nvl72: 1200, nvl36: 800, total: 2000, note: "首波小批量樣機與驗證機出貨，主要交付微軟與 Google" },
    { quarter: "2025 Q1", nvl72: 5500, nvl36: 3000, total: 8500, note: "CoWoS-L 擴產釋放，鴻海與廣達墨西哥廠開始規模化點火" },
    { quarter: "2025 Q2", nvl72: 11000, nvl36: 4500, total: 15500, note: "全面爆發期！水冷零件供應鏈瓶頸全面化解" },
    { quarter: "2025 Q3", nvl72: 16000, nvl36: 5500, total: 21500, note: "微軟與 Meta 進入拉貨最高峰，單季機櫃出貨突破 2 萬架" },
    { quarter: "2025 Q4", nvl72: 18500, nvl36: 6500, total: 25000, note: "Blackwell Ultra (B300) 銜接導入，2025 全年估突破 7 萬架" },
    { quarter: "2026 全年", nvl72: 65000, nvl36: 25000, total: 90000, note: "Blackwell 與下一代 Rubin 平行出貨，主權 AI 採購比重顯著增加" }
  ],

  strategicSummary: "根據彭博與摩根士丹利最新統計，四大雲端巨頭 2025 年資本支出將突破 2,700 億美元大關。儘管市場偶有對『AI 投資回報率 (ROI)』的疑慮，但各大科技巨頭 CEO 在法說會上均明確表態：『投資不足 (Under-investing) 導致錯失下一代科技霸權的風險，遠遠大於投資過度 (Over-investing) 的風險！』這使得對輝達 Blackwell 晶片與台廠代工的強勁訂單需求至少將延續至 2026 年底。"
};
