/**
 * 輝達 NVIDIA AI 全球上下游產業鏈結構資料庫 (NVIDIA AI Supply Chain Ecosystem)
 * 涵蓋上游（晶圓代工/CoWoS/HBM/IP/CPO/測試）、中游（晶片/液冷水冷/電源/載板/伺服器整機）、下游（CSP/主權AI/模型巨頭）
 */

window.NVIDIA_SUPPLY_CHAIN_DATA = {
  version: "2026.1",
  lastUpdated: "2026-11-16",
  nvidiaPlatform: {
    name: "NVIDIA AI Enterprise & Blackwell / Rubin Computing Platform",
    ceo: "Jensen Huang (黃仁勳)",
    marketCap: "約 3.5 兆美元（全球市值第一大科技龍頭）",
    coreProducts: [
      { name: "Blackwell Ultra (B200 / B300)", role: "旗艦 AI 訓練與推論 GPU", status: "量產放量中" },
      { name: "GB200 NVL72 / NVL36", role: "液冷機櫃級超級超級電腦 (72顆GPU+36顆CPU)", status: "全球雲端巨頭爭搶交付" },
      { name: "Rubin (R100 / Vera CPU)", role: "2026 下一代架構 (HBM4 + 3nm + NVLink 6)", status: "已完成架構定義與流片準備" },
      { name: "Spectrum-X & Quantum-X", role: "AI 專用乙太網與 InfiniBand 網路骨幹", status: "高速成長營收支柱" }
    ]
  },
  
  // 三大層級與各專業細分賽道
  tiers: [
    {
      id: "upstream",
      nameZh: "🧬 上游：先進半導體、材料與關鍵晶片核心",
      nameEn: "Upstream: Foundry, Packaging, Memory & IP",
      color: "#00ff88",
      accent: "rgba(0, 255, 136, 0.15)",
      description: "決定 AI 算力物理極限的底層基石。包含 3nm 晶圓代工、CoWoS-L 先進封裝、HBM3e 高頻寬記憶體、矽光子光電轉換、垂直探針卡與晶片設計軟體。",
      sectors: [
        {
          id: "foundry_cowos",
          titleZh: "晶圓代工與 CoWoS 先進封裝",
          titleEn: "Foundry & Advanced Packaging (CoWoS-L/S)",
          bottleneckRating: "極高 ⭐⭐⭐⭐⭐ (全產業最大產能瓶頸)",
          marketDynamics: "台積電 N4P/N3P 獨家代工 Blackwell 雙晶片，CoWoS-L (具備局部矽中介層 LSI) 月產能 2024 年底 3.5 萬片，2025 年加速擴張至 7~8 萬片仍供不應求。日月光投控則承接 oS 後段測試與分流。",
          keyPlayers: [
            { name: "台積電 (2330 / TSM)", role: "全球獨家晶圓代工與 CoWoS 封裝龍頭", share: "100% Blackwell GPU 製造", status: "核心護城河" },
            { name: "日月光投控 (3711 / ASX)", role: "oS (on Substrate) 後段封裝與測試分流夥伴", share: "承接 15~20% 先進封裝周邊外包", status: "產能溢出受惠" },
            { name: "艾司摩爾 ASML", role: "EUV / High-NA EUV 極紫外光微影設備獨家供應", share: "先進製程必備機台", status: "設備獨佔" }
          ]
        },
        {
          id: "hbm_memory",
          titleZh: "高頻寬記憶體 (HBM3e / HBM4)",
          titleEn: "High Bandwidth Memory (HBM3e & HBM4)",
          bottleneckRating: "極高 ⭐⭐⭐⭐⭐",
          marketDynamics: "B200 單晶片搭載 8 顆 8-Hi 24GB HBM3e (共192GB)，B200 Ultra 與 Rubin 升級至 12-Hi 36GB 及 HBM4。SK海力士掌握 70% 以上份額，美光全力搶進，三星急起直追。",
          keyPlayers: [
            { name: "SK 海力士 (SK Hynix)", role: "HBM3e 獨家主力認證供應商", share: ">70% 份額", status: "技術領頭羊" },
            { name: "美光科技 (Micron / MU)", role: "8-Hi 24GB 通過認證並穩定出貨 GB200", share: "約 20% 份額", status: "第二供貨來源" },
            { name: "三星電子 (Samsung)", role: "積極送樣 12-Hi HBM3e 與自建 HBM4 完整服務", share: "急欲攻入", status: "觀察驗證中" }
          ]
        },
        {
          id: "silicon_photonics",
          titleZh: "矽光子與高速光通訊 (CPO & Optical)",
          titleEn: "Silicon Photonics & Optical Interconnect",
          bottleneckRating: "中長線關鍵轉折 ⭐⭐⭐⭐",
          marketDynamics: "NVLink 銅纜直連在機櫃內部達到 2 公尺物理極限，下一代 Rubin 或機櫃間連網將全面走向光電共封裝 (CPO) 與 1.6T 光收發模組，台廠雷射封裝與光纖連接器迎來爆發。",
          keyPlayers: [
            { name: "聯鈞 (3450)", role: "矽光子雷射光源 (CW Laser) 封測主力", share: "美系大廠核心外包", status: "純度極高" },
            { name: "訊芯-KY (6451)", role: "鴻海集團旗下，專攻博通/輝達 51.2T CPO 模組封裝", share: "CPO 封裝先驅", status: "集團綜效" },
            { name: "光聖 (6442)", role: "美系雲端巨頭高階光被動元件與跳接線大單", share: "出貨快速放量", status: "高毛利受惠" },
            { name: "上詮 (3363)", role: "攜手台積電開發光纖陣列單元 (FAU) 專屬連接器", share: "CoWoS 矽光子必備", status: "台積聯盟" },
            { name: "Coherent / Lumentum", role: "全球高速 EML 雷射晶片與 800G/1.6T 光收發龍頭", share: "歐美光學巨頭", status: "技術領先" }
          ]
        },
        {
          id: "test_probe",
          titleZh: "高頻高速測試介面與垂直探針卡",
          titleEn: "Testing Sockets & Vertical Probe Cards (VPC)",
          bottleneckRating: "高 ⭐⭐⭐⭐",
          marketDynamics: "Blackwell 晶片面積是前代 2 倍，且功耗達 1,000W，晶圓測試 (CP) 與系統級測試 (SLT) 難度幾何級數激增，探針卡針數突破 3 萬針，單價較前代跳增 3~4 倍。",
          keyPlayers: [
            { name: "旺矽 (6223)", role: "垂直式探針卡 (VPC) 全球第一，獨吃輝達晶圓測試", share: ">60% 輝達探針份額", status: "獲利歷史新高" },
            { name: "穎崴 (6515)", role: "高頻同軸測試座 (Coaxial Socket) 與 SLT 測試治具主力", share: "GB200 關鍵測試主供", status: "高單價受惠" }
          ]
        },
        {
          id: "eda_ip",
          titleZh: "EDA 設計軟體與處理器 IP",
          titleEn: "EDA Tools & Processor IP",
          bottleneckRating: "不可或缺 ⭐⭐⭐⭐",
          marketDynamics: "百億級電晶體複雜度必須依賴新思與益華之 AI 輔助 EDA 工具；Grace CPU 則採用 Arm 架構打造極高能效算力節點。",
          keyPlayers: [
            { name: "新思科技 (Synopsys / SNPS)", role: "晶片合成與先進封裝 3DIC 模擬工具龍頭", share: "EDA 雙寡頭", status: "設計基石" },
            { name: "益華電腦 (Cadence / CDNS)", role: "電子系統設計與高速訊號完整性分析工具", share: "EDA 雙寡頭", status: "模擬必備" },
            { name: "安謀 (Arm Holdings / ARM)", role: "Grace CPU 採用之 Neoverse V2 架構專屬授權", share: "CPU 架構底層", status: "權利金收割" }
          ]
        }
      ]
    },

    {
      id: "midstream",
      nameZh: "⚡ 中游：算力核心、水冷散熱、電網電源與整機整合",
      nameEn: "Midstream: GPU Platform, Liquid Cooling, Power & ODM",
      color: "#38bdf8",
      accent: "rgba(56, 189, 248, 0.15)",
      description: "台灣科技島最核心的獲利主戰場！涵蓋從 GPU 主板、ABF 高階載板、NVLink 銅纜高速背板、120kW 水冷散熱（水冷板、CDU、歧管）、140kW 特高壓電源，到千萬元級 AI 整機櫃組裝代工。",
      sectors: [
        {
          id: "liquid_cooling",
          titleZh: "水冷散熱與熱管理系統 (Liquid Cooling)",
          titleEn: "Liquid Cooling CDU, Cold Plates & Manifolds",
          bottleneckRating: "極高焦點 ⭐⭐⭐⭐⭐ (產值暴增 10 倍)",
          marketDynamics: "GB200 NVL72 單櫃功耗高達 120kW~132kW，遠超傳統氣冷 35kW 極限，強制進入全水冷時代！單櫃水冷系統產值從數千美元跳升至 8~9 萬美元，水冷板、冷卻液分配單元 (CDU)、分流歧管 (Manifold) 及快接頭 (QDC) 成關鍵戰略物料。",
          keyPlayers: [
            { name: "奇鋐 (3017)", role: "水冷板 (Cold Plate) 領先主供，出貨機殼與散熱整套系統", share: "GB200 水冷板 >50% 份額", status: "散熱獲利王" },
            { name: "雙鴻 (3324)", role: "首家具備水冷板、CDU、分流歧管一條龍認證之台廠", share: "水冷整體解決方案", status: "技術最完整" },
            { name: "健策 (3653)", role: "均熱片 (Heat Spreader) 與 ILM 加壓機構全球獨霸", share: ">80% 均熱片份額", status: "單價跳增3倍" },
            { name: "Vertiv (維諦 / VRT)", role: "全球資料中心冷卻基礎設施與大型 CDU 霸主", share: "美系 CSP 第一選用", status: "美股水冷旗艦" }
          ]
        },
        {
          id: "power_delivery",
          titleZh: "特高壓電源架構與銅纜高速互連",
          titleEn: "Power Shelves (140kW) & NVLink Copper Spine",
          bottleneckRating: "高 ⭐⭐⭐⭐",
          marketDynamics: "GB200 機櫃需要 140kW Power Shelf 將電網 AC 交流電高效轉為 54V DC 直流電；NVLink 銅纜背板由 5,000 條極高速細同軸線纜構成，免用光模組直接省下 20kW 能耗！",
          keyPlayers: [
            { name: "台達電 (2308)", role: "140kW Power Shelf 電源櫃主力主供，效率 >97.5%", share: "GB200 電源核心", status: "電源全球龍頭" },
            { name: "貿聯-KY (3665)", role: "NVLink 銅纜高速線束、Busbar 匯流排與超高壓連接線", share: "高階高速線獨家/主供", status: "毛利大幅跳升" },
            { name: "光寶科 (2301)", role: "5.5kW 高效電源模組與雲端電源架構核心", share: "重要電源夥伴", status: "穩定出貨" },
            { name: "嘉澤 (3533)", role: "CPU/GPU 連接插座 (Socket) 與 PCIe Gen6 高速接插件", share: "連接器核心", status: "規格升級" }
          ]
        },
        {
          id: "substrates_pcb",
          titleZh: "高階 ABF 載板與高頻超低損耗 CCL/PCB",
          titleEn: "ABF Substrates & High-Speed Low-Loss PCB",
          bottleneckRating: "中高 ⭐⭐⭐⭐",
          marketDynamics: "Blackwell 雙晶片使單顆封裝 ABF 載板面積擴大 3 倍，層數提升至 16~20 層；主機板 (UBB/OAM) 則全面採用 M8/M9 超低損耗銅箔基板 (CCL)，厚度超過 30 層。",
          keyPlayers: [
            { name: "欣興 (3037)", role: "輝達 B200 / OAM 載板核心第一主供，良率領先", share: "ABF 載板最大份額", status: "產能受惠" },
            { name: "臺光電 (2383)", role: "M8/M9 超低損耗銅箔基板 (CCL) 全球市佔超過 70%", share: "CCL 獨霸", status: "獲利爆發" },
            { name: "金像電 (2368)", role: "高層數 AI 伺服器主機板 (UBB/OAM) 全球第一大廠", share: "AI PCB 龍頭", status: "產能滿載" },
            { name: "景碩 (3189) / 南電 (8046)", role: "周邊網通交換器與模組 ABF 載板第二供貨商", share: "二線受惠", status: "轉單效應" }
          ]
        },
        {
          id: "server_odm",
          titleZh: "AI 伺服器整機與機櫃 ODM 組裝 (System ODM)",
          titleEn: "Server ODM & Rack Integration (NVL72 / NVL36)",
          bottleneckRating: "極高獲利產值 ⭐⭐⭐⭐⭐ (營收貢獻破千億)",
          marketDynamics: "單台 GB200 NVL72 機櫃售價近 300 萬美元（約 9,500 萬新台幣），組裝代工廠不僅負責機構件組裝，更需具備整櫃水冷壓力測試、L10/L11 軟硬體驗證能力。鴻海與廣達瓜分大半江山，緯穎、緯創與技嘉各領風騷。",
          keyPlayers: [
            { name: "鴻海 (2317) / 鴻佰", role: "NVL72 / NVL36 最大整櫃組裝代工廠，從零件到組裝垂直整合度最高", share: "佔比約 40~45%", status: "營收規模最大" },
            { name: "廣達 (2382) / 雲達", role: "首波出貨微軟、Google 之 GB200 旗艦代工廠，系統整合研發能力最強", share: "佔比約 30~35%", status: "技術領頭羊" },
            { name: "緯穎 (6669)", role: "微軟與 Meta 核心直供 ODM，自研全水冷整櫃解決方案", share: "高純度 AI 伺服器", status: "純度最高" },
            { name: "緯創 (3231)", role: "輝達 GPU 基板 (OAM) 獨家主力代工，同時通吃 Compute Tray", share: "OAM 基板獨霸", status: "關鍵零件卡位" },
            { name: "技嘉 (2376)", role: "企業級與二線雲端/主權 AI 整機解決方案，出貨彈性最高", share: "靈活利基市場", status: "高毛利" },
            { name: "川湖 (2059)", role: "AI 伺服器超重載專用高階滑軌 (Rail Kit) 獨佔龍頭", share: "市佔率 >85%", status: "獲利毛利霸主 (>65%)" }
          ]
        }
      ]
    },

    {
      id: "downstream",
      nameZh: "☁️ 下游：雲端巨頭 (CSP)、主權 AI 與落地應用生態",
      nameEn: "Downstream: Hyperscalers, Sovereign AI & Neoclouds",
      color: "#ffd700",
      accent: "rgba(255, 215, 0, 0.15)",
      description: "最終買單資本支出 (CapEx) 的金主與算力消耗者！包含全球四大 CSP 雲端巨擘、新興純 AI 算力雲 (CoreWeave)、馬斯克 xAI 巨型算力中心，以及沙烏地、阿聯酋等百億美元國家級主權 AI 投資案。",
      sectors: [
        {
          id: "hyperscalers",
          titleZh: "四大超大規模雲端巨擘 (Hyperscalers)",
          titleEn: "Big 4 Cloud Service Providers (CSPs)",
          bottleneckRating: "資本支出擴張引擎 ⭐⭐⭐⭐⭐",
          marketDynamics: "微軟、Google、Meta 與亞馬遜 2025 年合計 AI 資本支出 (CapEx) 突破 2,200 億美元！各巨頭為防範落後對手，對 Blackwell 機櫃採取「不計代價全面包攬」策略，強力推升輝達資料中心營收突破千億美元。",
          keyPlayers: [
            { name: "微軟 Azure (Microsoft / MSFT)", role: "全球最大 AI 算力買家，全力支撐 OpenAI 訓練與 Copilot 生態", capex2025: "約 750 億美元", status: "第一大買家" },
            { name: "Alphabet Google (GOOGL)", role: "一邊採購 Blackwell，一邊加速自研 TPU v5p/v6，建構雙軌防禦", capex2025: "約 550 億美元", status: "自研與外購並重" },
            { name: "Meta Platforms (META)", role: "開源 Llama 4 巨型模型與廣告推薦系統，豪買數十萬張 GPU", capex2025: "約 450 億美元", status: "最大開源算力源" },
            { name: "亞馬遜 AWS (Amazon / AMZN)", role: "打造 Project Rainier 巨型 Blackwell 叢集，強化 Bedrock 雲服務", capex2025: "約 600 億美元", status: "雲端基礎設施龍頭" },
            { name: "甲骨文 OCI (Oracle / ORCL)", role: "攜手輝達打造 131,072 顆 GPU 超級叢集，專攻企業頂級算力租賃", capex2025: "約 200 億美元", status: "成長率最高 CSP" }
          ]
        },
        {
          id: "neoclouds_enterprise",
          titleZh: "新興純 AI 算力雲與超級巨型資料中心",
          titleEn: "Neoclouds, xAI Colossus & Enterprise Clouds",
          bottleneckRating: "最激進算力搶奪者 ⭐⭐⭐⭐",
          marketDynamics: "CoreWeave 獲輝達優先供貨特權，估值狂飆；馬斯克旗下 xAI 於田納西州僅耗時 122 天便點亮 10 萬顆 H100 的 Colossus 超級電腦，並宣佈直接升級至 20 萬張 Blackwell！",
          keyPlayers: [
            { name: "CoreWeave", role: "輝達策略入股之純 AI 雲端租賃龍頭，手握全球最密集 GPU 配額", status: "輝達親生嫡系" },
            { name: "Tesla xAI (馬斯克 Colossus)", role: "全球最大單一集群 AI 算力中心，訓練 Grok 3 / FSD 自動駕駛", status: "速度與規模神話" },
            { name: "Lambda Labs / Crusoe", role: "運用地熱、天然氣源頭直建 AI 資料中心之永續算力新星", status: "電力解方領頭羊" }
          ]
        },
        {
          id: "sovereign_ai",
          titleZh: "國家級主權 AI (Sovereign AI) 國家隊",
          titleEn: "Sovereign AI & National Infrastructure",
          bottleneckRating: "非美系地緣新增大買家 ⭐⭐⭐⭐",
          marketDynamics: "黃仁勳親自奔走推銷「主權 AI」理念：各國必須自建本國語言與文化之專屬 AI 基礎設施，不容數據主權外流。中東產油國與日韓法政府大手筆投入百億美元國家專案。",
          keyPlayers: [
            { name: "沙烏地阿拉伯 (Aramco / SCAI)", role: "沙國公共投資基金 (PIF) 採購數萬張 GPU 打造阿拉伯文大型語言模型", budget: "超千億美元願景基金" },
            { name: "阿拉伯聯合大公國 (G42 / MGX)", role: "阿布達比主權 AI 投資公司，獲微軟 15 億美元入股，大建星際算力中心", budget: "中東 AI 樞紐" },
            { name: "日本政府 (METI 補助案)", role: "軟銀 (SoftBank) 與櫻花網絡 (Sakura) 獲千億日圓補助採購 Blackwell 建立國家 AI 雲", budget: "振興半導體與算力" },
            { name: "台灣國科會 / 國網中心", role: "打造「台灣杉四號」超級電腦與繁體中文大型語言模型 (TAIDE)", budget: "國家戰略算力" }
          ]
        }
      ]
    }
  ]
};
