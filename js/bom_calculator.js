/**
 * 輝達 GB200 NVL72 機櫃 BOM 成本與台廠產值價值分配試算模型
 * (NVIDIA GB200 NVL72 Rack BOM Cost & Value Allocation Engine)
 */

class BomCalculator {
  static calculate(params = {}) {
    const racks = params.racks || 45000;
    const rackPriceUsd = params.rackPriceUsd || 3000000; // 單架 $3,000,000 美元
    const fxRate = params.fxRate || 32.0; // 美元兌台幣匯率
    const liquidShare = (params.liquidShare || 85) / 100; // 台灣水冷滲透率
    const odmShareFoxconn = (params.odmShareFoxconn || 45) / 100;
    const odmShareQuanta = (params.odmShareQuanta || 35) / 100;
    const odmShareWiwynn = (params.odmShareWiwynn || 20) / 100;

    // 全球總機櫃產值
    const totalMarketUsd = racks * rackPriceUsd;
    const totalMarketNtd = totalMarketUsd * fxRate;

    // 單機櫃價值佔比定義 (BOM Value Breakdown)
    const bomSplit = {
      nvidiaSilicon: { pct: 0.650, name: "NVIDIA 晶片本體 (72x B200 + 36x Grace + 9x NVLink Switch)" },
      tsmcCoWoS: { pct: 0.070, name: "台積電晶圓代工與 CoWoS-L 封裝" },
      hbmMemory: { pct: 0.090, name: "HBM3e 高頻寬記憶體堆疊 (SK海力士 / 美光)" },
      liquidCooling: { pct: 0.028, name: "水冷散熱模組 (水冷板 Cold Plates, CDU, 歧管, 快接頭)" },
      powerDelivery: { pct: 0.022, name: "特高壓電源架構 (140kW Power Shelf, 匯流排)" },
      copperSpine: { pct: 0.018, name: "NVLink 銅纜高速背板 (5,000 條細同軸銅纜)" },
      substratesPcb: { pct: 0.025, name: "ABF 高階載板與高頻超低損耗 CCL/PCB" },
      mechanicsRail: { pct: 0.014, name: "重載伺服器滑軌與機箱機構件 (川湖/勤誠)" },
      odmAssembly: { pct: 0.083, name: "ODM 系統整合、整櫃組裝與 L10/L11 軟硬體測試" }
    };

    // 各項目總產值計算 (台幣億元)
    const breakdown = {};
    for (let key in bomSplit) {
      const item = bomSplit[key];
      const usdVal = totalMarketUsd * item.pct;
      const ntdBillions = (usdVal * fxRate) / 100000000;
      breakdown[key] = {
        name: item.name,
        pct: (item.pct * 100).toFixed(1),
        perRackUsd: Math.round(rackPriceUsd * item.pct),
        totalUsdM: Math.round(usdVal / 1000000),
        totalNtdB: Math.round(ntdBillions)
      };
    }

    // 關鍵台廠供應鏈潛在產值分配估算 (新台幣億元)
    const taiwanSuppliers = {
      tsmc: {
        ticker: "2330 台積電",
        role: "N4P 代工與 CoWoS-L 封裝",
        ntdB: Math.round(breakdown.tsmcCoWoS.totalNtdB * 0.95), // 台積電囊括絕大部分
        note: "約佔台積電 2025 全年營收之 10~12%"
      },
      avc: {
        ticker: "3017 奇鋐",
        role: "水冷板 (Cold Plate) 與水冷機殼主力",
        ntdB: Math.round(breakdown.liquidCooling.totalNtdB * liquidShare * 0.48),
        note: "水冷板市佔率第一（估 >50%）"
      },
      auras: {
        ticker: "3324 雙鴻",
        role: "水冷板、CDU 與分流歧管 (Manifold)",
        ntdB: Math.round(breakdown.liquidCooling.totalNtdB * liquidShare * 0.35),
        note: "CDU 與分流歧管整體認證完備"
      },
      jentech: {
        ticker: "3653 健策",
        role: "均熱片 (Heat Spreader) 與加壓機構 ILM",
        ntdB: Math.round(breakdown.liquidCooling.totalNtdB * liquidShare * 0.17),
        note: "均熱片全球市佔逾 80%，單價翻倍"
      },
      delta: {
        ticker: "2308 台達電",
        role: "140kW Power Shelf 電源櫃主力",
        ntdB: Math.round(breakdown.powerDelivery.totalNtdB * 0.75),
        note: "特高壓電源獨佔龍頭"
      },
      bizlink: {
        ticker: "3665 貿聯-KY",
        role: "NVLink 銅纜高速線束與 Busbar 匯流排",
        ntdB: Math.round(breakdown.copperSpine.totalNtdB * 0.42),
        note: "受惠 5,000 條銅纜線束單櫃產值跳升"
      },
      kingslide: {
        ticker: "2059 川湖",
        role: "AI 伺服器超重載專用滑軌",
        ntdB: Math.round(breakdown.mechanicsRail.totalNtdB * 0.85),
        note: "高階專利滑軌市佔 >85%，毛利率逼近 70%"
      },
      foxconn: {
        ticker: "2317 鴻海",
        role: "NVL72 整櫃組裝第一大代工廠",
        ntdB: Math.round(breakdown.odmAssembly.totalNtdB * odmShareFoxconn),
        note: "組裝代工產值（若含完整機櫃出貨認列則營收破兆）"
      },
      quanta: {
        ticker: "2382 廣達",
        role: "微軟與 Google 首波主力 ODM",
        ntdB: Math.round(breakdown.odmAssembly.totalNtdB * odmShareQuanta),
        note: "系統整合能力最強，毛利率高"
      },
      wiwynn: {
        ticker: "6669 緯穎",
        role: "純 AI 伺服器與自研水冷機櫃",
        ntdB: Math.round(breakdown.odmAssembly.totalNtdB * odmShareWiwynn),
        note: "微軟與 Meta 直供主力，純度最高"
      }
    };

    return {
      racks,
      rackPriceUsd,
      fxRate,
      totalMarketUsdBillions: (totalMarketUsd / 1000000000).toFixed(1),
      totalMarketNtdTrillions: (totalMarketNtd / 1000000000000).toFixed(2),
      breakdown,
      taiwanSuppliers
    };
  }
}

window.BomCalculator = BomCalculator;
