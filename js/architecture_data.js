/**
 * 輝達晶片架構演進與技術瓶頸深度解析資料庫
 * (NVIDIA Chip Architecture Roadmap & Bottlenecks)
 */

window.ARCHITECTURE_DATA = {
  // 世代技術規格比較矩陣
  generations: [
    {
      gen: "Hopper (H100 / H200)",
      year: "2022 ~ 2023",
      process: "台積電 4N 製程",
      dieDesign: "單晶片 (Monolithic Die)",
      transistors: "800 億 (80B)",
      memory: "80GB ~ 141GB HBM3 / HBM3e",
      memBandwidth: "3.35 TB/s ~ 4.8 TB/s",
      computeFP4: "不支援 (FP8 約 4 PFLOPS)",
      nvlinkBandwidth: "900 GB/s (NVLink 4)",
      cooling: "傳統風冷 / 3D VC 均熱板為主",
      rackPower: "標準機櫃 15kW ~ 35kW",
      status: "上一代成熟主力，目前轉向推論"
    },
    {
      gen: "Blackwell (B200 / GB200)",
      year: "2024 ~ 2025",
      process: "台積電 N4P 製程 (客製化雙 Die)",
      dieDesign: "雙晶片藉由 10TB/s NV-HBI 高速互連 (2x Reticle Limit)",
      transistors: "2,080 億 (208B)",
      memory: "192GB ~ 288GB HBM3e (8-Hi / 12-Hi)",
      memBandwidth: "8.0 TB/s",
      computeFP4: "20 PFLOPS (推論性能提升 5 倍)",
      nvlinkBandwidth: "1,800 GB/s (1.8 TB/s, NVLink 5)",
      cooling: "強制全面導入液冷水冷 (Liquid Cooling)",
      rackPower: "NVL72 機櫃高達 120kW ~ 132kW",
      status: "當前全球 AI 訓練與推論最搶手旗艦"
    },
    {
      gen: "Rubin (R100 / GR200)",
      year: "2026 ~ 2027",
      process: "台積電 3nm / 2nm 製程",
      dieDesign: "4 Die 多晶片 3DIC 先進封裝 (極限微縮)",
      transistors: "預估突破 3,000 億 (300B+)",
      memory: "288GB ~ 384GB HBM4 (12-Hi / 16-Hi, 2048-bit 介面)",
      memBandwidth: "預估達 16.0 TB/s (提升 2 倍)",
      computeFP4: "預估 45~50 PFLOPS",
      nvlinkBandwidth: "3,600 GB/s (3.6 TB/s, NVLink 6)",
      cooling: "水冷結合微流體 (Microfluidic) 或冷板直觸",
      rackPower: "預估單櫃超過 150kW ~ 200kW",
      status: "架構設計已定型，台廠研發全面對齊"
    }
  ],

  // 三大工程瓶頸與產業攻防戰
  bottlenecks: [
    {
      id: "cowos_warpage",
      title: "一、CoWoS-L 封裝翹曲與重工良率 (Warpage & Yield)",
      severity: "極高危機（2024 下半年曾引發市場恐慌，現已獲突破）",
      icon: "🔬",
      color: "#f43f5e",
      problemDescription: "B200 是台積電史上第一款採用 CoWoS-L (Local Silicon Interconnect) 大量生產的晶片。因為結合了有機載板、局部矽中介層 (LSI) 與 2 顆超大 GPU Die + 8 顆 HBM3e，在多層熱膨脹係數 (CTE) 不一致的情況下，回焊過程中極易發生翹曲 (Warpage) 與微凸塊斷裂，導致初期良率偏低。",
      solution: "台積電透過重新調整頂層金屬層佈線、優化環氧樹脂封膠 (Underfill) 材料以及在晶片邊緣增加應力平衡 Dummy 結構，成功於 2024Q4 將 CoWoS-L 綜合良率拉升至 90% 以上水準，化解 Blackwell 難產危機。",
      beneficiaries: "台積電 (2330)、旺矽 (6223 測試把關)、穎崴 (6515 SLT 篩檢)"
    },
    {
      id: "liquid_leakage",
      title: "二、120kW 超高熱密度與水冷漏液快接頭認證 (QDC Leakage)",
      severity: "即時工程核心關鍵（資料中心工程師最大惡夢）",
      icon: "💧",
      color: "#0ea5e9",
      problemDescription: "NVL72 機櫃功耗達到 120kW，發熱密度相當於幾十台大型電暖爐塞在單一冰箱大小空間內。單台機櫃內部需要數百公尺冷卻管道與近百個快速接頭 (QDC)。水冷液若發生哪怕幾毫升微小滲漏，即可能導致價值上億元的晶片短路燒毀；此外水流不均可能引發局部熱點 (Hot Spot)。",
      solution: "導入高可靠度無滴漏快接頭 (Clean Break QDC)、雙重電阻式漏液偵測繩纜 (Leak Detection Rope)，並在 CDU 內部建置微型負壓回流機制（一旦偵測滲漏立即由正壓轉為抽吸負壓）。台廠奇鋐、雙鴻、健策皆經過長達 9~12 個月嚴格測試方取得認證。",
      beneficiaries: "奇鋐 (3017 水冷板)、雙鴻 (3324 CDU/歧管)、Vertiv (VRT)"
    },
    {
      id: "copper_vs_cpo",
      title: "三、NVLink 銅纜 2 公尺物理極限 vs. 矽光子 (CPO) 轉折點",
      severity: "中長線架構轉移大勢（2026~2027 關鍵分水嶺）",
      icon: "⚡",
      color: "#eab308",
      problemDescription: "輝達在 GB200 機櫃內部採用了長達 2 英里的細同軸銅纜 (Over 5,000 NVLink copper cables)，相較光纖模組直接省下 20kW 能耗與數萬美元成本。然而，銅纜訊號高頻衰減隨距離幾何級數增加，在 PCIe 6.0 / NVLink 5 的 200Gbps 單通道速率下，銅纜傳輸極限距離僅約 1.5~2 公尺，無法跨機櫃延伸！",
      solution: "目前機櫃內採用銅纜直連；而機櫃與機櫃之間（Scale-Out 橫向擴展）則開始導入 800G/1.6T 光模組。待 2026 Rubin 世代單通道邁向 400Gbps 時，銅纜將徹底達到物理極限，強制推動「矽光子光電共封裝 (CPO)」成為唯一解法！",
      beneficiaries: "貿聯-KY (3665 當前銅纜大贏家)、聯鈞 (3450 矽光子雷射)、上詮 (3363 光纖陣列)"
    }
  ],

  // NVL72 機櫃實體內部組裝架構 (Rack Architecture)
  rackArchitecture: {
    name: "NVIDIA GB200 NVL72 Rack Architecture",
    height: "標準 42U / 48U 資料中心機架",
    weight: "約 1.36 公噸 (1,360 kg，需加固機房地板)",
    powerConsumption: "約 120 kW ~ 132 kW",
    components: [
      { unit: "Compute Trays (運算抽屜)", qty: "18 席", desc: "每席容納 2 顆 Grace CPU + 4 顆 Blackwell GPU (配備冷水板直觸)" },
      { unit: "NVLink Switch Trays (交換抽屜)", qty: "9 席", desc: "每席搭載 2 顆第 5 代 NVLink Switch 晶片，提供 144 個高速通訊端口" },
      { unit: "Power Shelves (電源機架)", qty: "6 席", desc: "140kW 高壓電源櫃，將三相 415V AC 交流電轉為 54V DC 直流母線 (Busbar)" },
      { unit: "CDU (冷卻液分配單元)", qty: "1 組 (機架底部或側掛)", desc: "負責循環、過濾並監控注入 72 顆 GPU 水冷板的冷卻液溫度與流量" },
      { unit: "NVLink Copper Spine (銅纜背板)", qty: "1 式 (機架背部)", desc: "5,000 條超高密度同軸銅纜，以零功耗實現 130 TB/s 全雙工總頻寬" }
    ]
  }
};
