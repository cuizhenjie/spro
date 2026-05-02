"use client";

import React, { useState, useEffect } from "react";
import { logout, getAuth, type AuthUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle, XCircle, ArrowDown, ArrowUp, Wallet, Brain, RefreshCw, Filter, Download } from "lucide-react";

const ORDER_HISTORY = [
  { id: "TX-0X9A8F-01", name: "Neural Pathway Refinement v2.0", type: "skill" as const, value: -500, status: "completed" as const },
  { id: "TX-0X9A8F-02", name: "Mainframe Credit Injection", type: "topup" as const, value: 1000, status: "completed" as const },
  { id: "TX-0X9A8E-99", name: "Optic Camouflage Algorithm", type: "skill" as const, value: -850, status: "completed" as const },
  { id: "TX-0X9A8E-42", name: "Tactical Response Override", type: "skill" as const, value: -1200, status: "failed" as const },
  { id: "TX-0X9A8D-11", name: "Emergency Credit Cache", type: "topup" as const, value: 500, status: "completed" as const },
  { id: "TX-0X9A8D-07", name: "AI 色彩诊断 Pro", type: "skill" as const, value: -350, status: "completed" as const },
  { id: "TX-0X9A8C-33", name: "赛博币充值 · 月度礼包", type: "topup" as const, value: 2000, status: "completed" as const },
  { id: "TX-0X9A8C-19", name: "AI 面部美学分析", type: "skill" as const, value: -680, status: "completed" as const },
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [coins, setCoins] = useState(8950);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const auth = getAuth();
    if (!auth.loggedIn) {
      router.replace("/login");
      return;
    }
    setUser(auth);
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleDeposit = () => setCoins((prev) => prev + 100);
  const handleWithdraw = () => setCoins((prev) => Math.max(0, prev - 100));

  const faqs = [
    {
      q: "如何获取发票？",
      a: "进入「个人中心 → 订单历史」，点击对应订单右侧「获取发票」按钮，填写开票信息后可在 1-3 个工作日内收到电子发票。如需纸质发票请联系客服。",
    },
    {
      q: "赛博币如何计费？",
      a: "赛博币用于购买市场中的高级AI工具。1 枚赛博币约等于 0.05 元，每次生成/分析消耗 5-50 枚不等，按工具复杂度自动计算。",
    },
    {
      q: "我如何升级方案？",
      a: "前往「定价」页面，选择适合您的套餐等级（拾荒者/赛博朋克/霸主），点击升级后完成支付即可。升级立即生效，不影响现有资产。",
    },
    {
      q: "使用费用是多少？",
      a: "基础功能免费（每天 5 次扫描）。赛博朋克套餐 ¥19/月，享受无限扫描和优先处理；霸主套餐 ¥99/月，含 API 权限和专属服务器。",
    },
    {
      q: "免费次数用完了怎么办？",
      a: "您可以购买赛博币按次付费，或升级到赛博朋克/霸主套餐获得无限次使用权限。",
    },
  ];

  if (!user) return null;

  return (
    <main className="flex-1 pt-24 pb-24 px-6 md:px-12 max-w-[container-max] mx-auto w-full relative z-10 min-h-screen">
      {/* Profile Header Section */}
      <section className="mb-12 flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-secondary overflow-hidden shadow-[0_0_15px_rgba(236,255,227,0.3)] shrink-0 relative group cursor-pointer">
          <div className="absolute inset-0 bg-secondary/10 group-hover:bg-secondary/30 transition-colors duration-300 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="material-symbols-outlined text-secondary text-3xl">
              add_a_photo
            </span>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=800"
            alt="Profile Avatar"
            fill
            className="object-cover filter sepia hue-rotate-90 contrast-125"
            unoptimized
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="font-h1 text-h1 text-on-background">{user.name}</h2>
            <span className="px-2 py-1 bg-primary/20 text-primary font-mono-data text-xs border border-primary/50 rounded-none shadow-[0_0_8px_rgba(255,171,243,0.3)] uppercase">
              {user.level}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 px-3 py-1.5 cyber-glass">
              <span className="material-symbols-outlined text-secondary text-sm">
                wifi_tethering
              </span>
              <span className="font-mono-data text-mono-data text-secondary">
                神经连接：稳定
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 cyber-glass">
              <span className="material-symbols-outlined text-primary text-sm">
                location_on
              </span>
              <span className="font-mono-data text-mono-data text-primary">
                LOC: SECTOR 7
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 cyber-glass">
              <span className="material-symbols-outlined text-outline text-sm">
                schedule
              </span>
              <span className="font-mono-data text-mono-data text-outline">
                运行时间: 98.4%
              </span>
            </div>
          </div>
        </div>

        <div className="hidden xl:block w-64 h-32 cyber-glass p-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30"></div>
          <p className="font-label-caps text-label-caps text-primary mb-2 relative z-10">
            系统日志
          </p>
          <div className="font-mono-data text-[10px] text-on-surface-variant space-y-1 opacity-70 relative z-10">
            <p>&gt; AUTHENTICATING...</p>
            <p>&gt; HANDSHAKE SECURE.</p>
            <p>&gt; LOADING WARDROBE DB.</p>
            <p className="text-secondary animate-pulse">&gt; READY.</p>
          </div>
        </div>
      </section>

      {/* Stats Grid (Bento style) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Scans Card */}
        <div className="cyber-glass p-6 relative group overflow-hidden hover:border-secondary/50 transition-colors duration-300">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/5 rounded-full blur-xl group-hover:bg-secondary/20 transition-all"></div>
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <p className="font-label-caps text-label-caps text-outline mb-1">
                总扫描次数
              </p>
              <h3 className="font-h2 text-h2 text-secondary">1,402</h3>
            </div>
            <span className="material-symbols-outlined text-secondary text-3xl opacity-80">
              qr_code_scanner
            </span>
          </div>
          <div className="w-full bg-surface-container-high h-1 rounded-none overflow-hidden relative z-10">
            <div className="bg-secondary h-full w-[85%] shadow-[0_0_10px_#ecffe3]"></div>
          </div>
          <p className="font-mono-data text-[10px] text-secondary mt-2 text-right relative z-10">
            +12 THIS CYCLE
          </p>
        </div>

        {/* Coins Card */}
        <div className="cyber-glass p-6 relative group overflow-hidden hover:border-primary/50 transition-colors duration-300">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/20 transition-all"></div>
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <p className="font-label-caps text-label-caps text-outline mb-1">
                赛博币
              </p>
              <h3 className="font-h2 text-h2 text-primary flex items-center gap-1">
                <span className="text-xl">Ƀ</span> {coins.toLocaleString()}
              </h3>
            </div>
            <span className="material-symbols-outlined text-primary text-3xl opacity-80">
              monetization_on
            </span>
          </div>
          <div className="flex gap-2 relative z-10">
            <button
              onClick={handleDeposit}
              className="flex-1 cyber-button text-primary font-label-caps text-[10px] py-2 uppercase bg-transparent"
            >
              存入
            </button>
            <button
              onClick={handleWithdraw}
              className="flex-1 border border-outline text-outline hover:border-primary hover:text-primary hover:shadow-[0_0_15px_rgba(255,171,243,0.5)] transition-all font-label-caps text-[10px] py-2 uppercase bg-transparent"
            >
              提取
            </button>
          </div>
        </div>

        {/* Achievement Card */}
        <div className="cyber-glass p-6 relative group overflow-hidden hover:border-tertiary/50 transition-colors duration-300">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-tertiary/5 rounded-full blur-xl group-hover:bg-tertiary/20 transition-all"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="font-label-caps text-label-caps text-outline mb-1">
                成就等级
              </p>
              <h3 className="font-h2 text-h2 text-tertiary">LVL 42</h3>
            </div>
            <span className="material-symbols-outlined text-tertiary text-3xl opacity-80">
              military_tech
            </span>
          </div>
          <p className="font-mono-data text-mono-data text-on-surface-variant mb-4 relative z-10">
            霓虹浪人等级
          </p>
          <div className="flex gap-1 mt-auto relative z-10">
            <div className="h-2 flex-1 bg-tertiary shadow-[0_0_8px_#ffe04a]"></div>
            <div className="h-2 flex-1 bg-tertiary shadow-[0_0_8px_#ffe04a]"></div>
            <div className="h-2 flex-1 bg-tertiary shadow-[0_0_8px_#ffe04a]"></div>
            <div className="h-2 flex-1 bg-surface-container-high"></div>
            <div className="h-2 flex-1 bg-surface-container-high"></div>
          </div>
        </div>
      </section>

      {/* Order History Section */}
      <section className="mt-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-h1 text-h1 text-on-surface mb-2 tracking-tight">
              <span className="text-primary">&gt;</span> 交易日志
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full inline-block animate-pulse shadow-[0_0_8px_rgba(236,255,227,0.8)]" />
              SYSTEM: OK // RECORDING_ACTIVE
            </p>
          </div>
          <div className="flex gap-4">
            <button className="cyber-glass px-6 py-2 font-label-caps text-label-caps text-on-surface hover:text-secondary border border-transparent hover:border-secondary transition-all flex items-center gap-2">
              <Filter className="w-4 h-4" /> FILTER
            </button>
            <button className="cyber-glass px-6 py-2 font-label-caps text-label-caps text-on-surface hover:text-primary border border-transparent hover:border-primary transition-all flex items-center gap-2">
              <Download className="w-4 h-4" /> EXPORT
            </button>
          </div>
        </div>

        {/* Stats Overview Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="cyber-glass p-6 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-secondary" /> 总支出
            </h3>
            <p className="font-h2 text-h2 text-on-surface">
              4,092 <span className="text-primary text-lg">赛博币</span>
            </p>
          </div>
          <div className="cyber-glass p-6 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4 flex items-center gap-2">
              <Brain className="w-4 h-4 text-primary" /> 已获 AI 技能
            </h3>
            <p className="font-h2 text-h2 text-on-surface">
              12 <span className="text-secondary text-lg">模块</span>
            </p>
          </div>
          <div className="cyber-glass p-6 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-tertiary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-tertiary" /> 最近充值
            </h3>
            <p className="font-h2 text-h2 text-on-surface">
              24H <span className="text-on-surface-variant text-lg">AGO</span>
            </p>
          </div>
        </div>

        {/* Terminal Table */}
        <div className="cyber-glass border border-outline-variant/30 overflow-x-auto relative">
          {/* Decorative Terminal Corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-secondary/50 -translate-x-px -translate-y-px" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-secondary/50 translate-x-px -translate-y-px" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-secondary/50 -translate-x-px translate-y-px" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-secondary/50 translate-x-px translate-y-px" />

          {/* Desktop Table */}
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-outline-variant/50 bg-surface-container/50">
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant w-44">交易 ID</th>
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant">物品名称</th>
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant text-right">价值</th>
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant text-center w-36">系统状态</th>
              </tr>
            </thead>
            <tbody className="font-mono-data text-mono-data">
              {ORDER_HISTORY.map((order) => (
                <tr key={order.id} className="border-b border-outline-variant/20 hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4 text-on-surface/80 group-hover:text-primary transition-colors">{order.id}</td>
                  <td className="p-4 text-on-surface">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 text-xs border ${
                        order.type === "skill"
                          ? "bg-primary/10 text-primary border-primary/30"
                          : "bg-tertiary/10 text-tertiary border-tertiary/30"
                      }`}>
                        {order.type === "skill" ? "SKILL" : "TOP-UP"}
                      </span>
                      {order.name}
                    </div>
                  </td>
                  <td className={`p-4 text-right flex items-center justify-end gap-1 ${
                    order.value < 0 ? "text-secondary" : "text-tertiary"
                  }`}>
                    {order.value < 0 ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />}
                    {order.value > 0 ? "+" : ""}{order.value} C
                  </td>
                  <td className="p-4">
                    <div className={`flex items-center justify-center gap-2 ${
                      order.status === "completed" ? "text-secondary" : "text-error"
                    }`}>
                      {order.status === "completed" ? (
                        <CheckCircle className="w-[18px] h-[18px]" />
                      ) : (
                        <XCircle className="w-[18px] h-[18px]" />
                      )}
                      <span className="text-xs tracking-wider">{order.status === "completed" ? "已完成" : "失败"}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="mt-6 flex justify-between items-center text-on-surface-variant font-mono-data text-sm">
          <p>SHOWING LOGS [01-{ORDER_HISTORY.length}] OF {ORDER_HISTORY.length + 34}</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-outline-variant/50 hover:bg-white/5 hover:text-secondary transition-colors">&lt; PREV</button>
            <button className="px-3 py-1 border border-outline-variant/50 hover:bg-white/5 hover:text-secondary transition-colors">NEXT &gt;</button>
          </div>
        </div>
      </section>

      {/* Logout Section */}
      <section className="flex justify-center mt-8">
        <button
          onClick={handleLogout}
          className="border border-error text-error hover:bg-error/10 hover:shadow-[0_0_15px_rgba(255,68,68,0.5)] transition-all font-label-caps text-label-caps py-3 px-12 uppercase tracking-widest flex items-center justify-center gap-2 bg-transparent"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          断开连接
        </button>
      </section>

      {/* FAQ Section */}
      <section className="mt-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-primary text-2xl">
            quiz
          </span>
          <h2 className="font-h2 text-h2 text-on-surface">常见问题</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="cyber-glass overflow-hidden border border-outline-variant hover:border-primary/50 transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-primary/5 transition-colors"
              >
                <span className="font-label-caps text-label-caps text-on-surface flex items-center gap-3">
                  <span className="text-primary font-mono-data">Q{i + 1}.</span>
                  {faq.q}
                </span>
                <span
                  className={`material-symbols-outlined text-primary transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                >
                  expand_more
                </span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 border-t border-primary/20">
                  <p className="font-mono-data text-mono-data text-on-surface-variant pt-4 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
