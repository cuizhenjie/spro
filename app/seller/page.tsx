"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { GlassCard } from "@/components/CyberUI/GlassCard";
import { HUDBrackets } from "@/components/CyberUI/HUDBrackets";
import { CATEGORIES } from "@/lib/marketplace-data";
import { PRODUCTS, type Product } from "@/lib/products-data";
import { CheckCircle, XCircle, ArrowDown, ArrowUp, Filter, Download } from "lucide-react";

// --- Local Types ---

interface SellerOrder {
  id: string;
  productName: string;
  type: "skill" | "topup" | "product";
  value: number;
  status: "completed" | "failed" | "pending";
  buyer: string;
  time: string;
}

interface SellerProduct extends Product {
  listed: boolean;
}

interface UploadForm {
  name: string;
  description: string;
  price: string;
  category: string;
  coverPreview: string;
}

// --- Mock Data ---

const SELLER_ORDERS: SellerOrder[] = [
  { id: "TX-0XA1F-01", productName: "AI 色彩诊断 Pro", type: "skill", value: 350, status: "completed", buyer: "NOMAD_77", time: "2分钟前" },
  { id: "TX-0XA1F-02", productName: "Y2K_STYLE_PACK", type: "product", value: 180, status: "completed", buyer: "GHOST_42", time: "15分钟前" },
  { id: "TX-0XA1E-99", productName: "NEO_TOKYO_TRENCH", type: "product", value: 850, status: "completed", buyer: "SYNTH_09", time: "1小时前" },
  { id: "TX-0XA1E-42", productName: "NEON_RUNNER_V3", type: "product", value: 580, status: "failed", buyer: "BYTE_31", time: "3小时前" },
  { id: "TX-0XA1D-11", productName: "AI 衣品升级改造", type: "skill", value: 680, status: "completed", buyer: "PULSE_88", time: "5小时前" },
  { id: "TX-0XA1D-07", productName: "HAPTIC_GAUNTLETS", type: "product", value: 1200, status: "pending", buyer: "NULL_00", time: "6小时前" },
  { id: "TX-0XA1C-33", productName: "风格预测引擎 Pro", type: "skill", value: 150, status: "completed", buyer: "ECHO_55", time: "1天前" },
  { id: "TX-0XA1C-19", productName: "WASTELAND_VISOR", type: "product", value: 420, status: "completed", buyer: "FLUX_23", time: "1天前" },
];

const initialSellerProducts: SellerProduct[] = PRODUCTS.map((p) => ({
  ...p,
  listed: true,
}));

const UPLOAD_CATEGORIES = CATEGORIES.filter((c) => c.id !== "all");

// --- Component ---

export default function SellerDashboardPage() {
  const [sellerProducts, setSellerProducts] = useState<SellerProduct[]>(initialSellerProducts);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"assets" | "orders">("assets");
  const [form, setForm] = useState<UploadForm>({
    name: "",
    description: "",
    price: "",
    category: "style",
    coverPreview: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectUrlsRef = useRef<Set<string>>(new Set());

  // Derived stats
  const totalRevenue = sellerProducts.filter((p) => p.listed).reduce((sum, p) => sum + p.price * Math.floor(p.sales * 0.3), 0);
  const activeTools = sellerProducts.filter((p) => p.listed).length;

  // --- Handlers ---

  const updateField = useCallback(
    <K extends keyof UploadForm>(field: K, value: UploadForm[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleCoverChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const prev = form.coverPreview;
      if (prev) {
        URL.revokeObjectURL(prev);
        objectUrlsRef.current.delete(prev);
      }

      const url = URL.createObjectURL(file);
      objectUrlsRef.current.add(url);
      updateField("coverPreview", url);
    },
    [updateField, form.coverPreview],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const price = Number(form.price);
      if (!form.name.trim() || !form.description.trim() || !Number.isFinite(price) || price <= 0) return;

      setForm({ name: "", description: "", price: "", category: "style", coverPreview: "" });
      setShowUploadForm(false);
    },
    [form],
  );

  const toggleProductListed = useCallback((productId: string) => {
    setSellerProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, listed: !p.listed } : p)));
  }, []);

  // --- Render ---

  return (
    <main className="pt-[100px] px-4 md:px-10 max-w-[1280px] mx-auto space-y-10 relative z-10 pb-24">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-primary/20 pb-4">
        <div>
          <h1 className="font-h1 text-h1 text-primary drop-shadow-[0_0_15px_rgba(255,171,243,0.4)]">
            商家控制台
          </h1>
          <p className="font-mono-data text-mono-data text-on-surface-variant mt-2">
            // 商家控制台 // 身份验证：已授权
          </p>
        </div>
      </div>

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="bg-surface-container/50 backdrop-blur-md border border-primary/30 p-6 relative overflow-hidden group hover:bg-primary/5 transition-all">
          <div className="absolute top-0 right-0 p-2 text-primary/30 font-mono-data text-[10px]">WIDGET_01</div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4">总收益</h3>
          <div className="font-h2 text-h2 text-primary flex items-center gap-2">
            <span className="material-symbols-outlined">toll</span>
            {totalRevenue.toLocaleString()} 赛博币
          </div>
          <div className="mt-2 font-mono-data text-xs text-secondary flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">arrow_upward</span> +12% 24H
          </div>
        </GlassCard>

        <GlassCard className="bg-surface-container/50 backdrop-blur-md border border-primary/30 p-6 relative overflow-hidden group hover:bg-primary/5 transition-all">
          <div className="absolute top-0 right-0 p-2 text-primary/30 font-mono-data text-[10px]">WIDGET_02</div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4">在售资产</h3>
          <div className="font-h2 text-h2 text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">view_in_ar</span>
            {activeTools}
          </div>
          <div className="mt-2 font-mono-data text-xs text-on-surface-variant">
            {sellerProducts.length - activeTools} 待审核
          </div>
        </GlassCard>

        <GlassCard className="bg-surface-container/50 backdrop-blur-md border border-primary/30 p-6 relative overflow-hidden group hover:bg-primary/5 transition-all">
          <div className="absolute top-0 right-0 p-2 text-primary/30 font-mono-data text-[10px]">WIDGET_03</div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4">当日流量</h3>
          <div className="font-h2 text-h2 text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">monitoring</span>
            1,204
          </div>
          <div className="mt-2 font-mono-data text-xs text-secondary flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">arrow_upward</span> +5% 24H
          </div>
        </GlassCard>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-outline-variant/50">
        <button
          onClick={() => setActiveTab("assets")}
          className={`pb-3 font-label-caps text-label-caps tracking-widest transition-all border-b-2 -mb-px ${
            activeTab === "assets"
              ? "text-primary border-primary"
              : "text-on-surface-variant border-transparent hover:text-primary"
          }`}
        >
          资产管理
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-3 font-label-caps text-label-caps tracking-widest transition-all border-b-2 -mb-px ${
            activeTab === "orders"
              ? "text-primary border-primary"
              : "text-on-surface-variant border-transparent hover:text-primary"
          }`}
        >
          订单记录
        </button>
      </div>

      {/* Tab: Asset Management */}
      {activeTab === "assets" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Mint / Upload */}
          <div className="lg:col-span-1">
            {showUploadForm ? (
              <form
                onSubmit={handleSubmit}
                className="bg-surface-container/50 backdrop-blur-md border border-primary/30 p-6 space-y-5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 text-primary/30 font-mono-data text-[10px]">
                  UPLOAD_MODULE
                </div>

                <h3 className="font-h3 text-h3 text-primary">注入新资产</h3>

                {/* Name */}
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 block">
                    资产名称 *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="例：千禧辣妹风数据包"
                    className="w-full bg-background/80 border border-primary/20 px-4 py-3 text-on-surface font-body placeholder:text-on-surface-variant/40 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 block">
                    描述 *
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="描述您的工具能为用户带来什么价值..."
                    rows={3}
                    className="w-full bg-background/80 border border-primary/20 px-4 py-3 text-on-surface font-body placeholder:text-on-surface-variant/40 focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Price + Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 block">
                      价格 (赛博币) *
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={form.price}
                      onChange={(e) => updateField("price", e.target.value)}
                      placeholder="450"
                      className="w-full bg-background/80 border border-primary/20 px-4 py-3 text-on-surface font-mono-data placeholder:text-on-surface-variant/40 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 block">
                      分类
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => updateField("category", e.target.value)}
                      className="w-full bg-background/80 border border-primary/20 px-4 py-3 text-on-surface font-body focus:border-primary focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      {UPLOAD_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.icon} {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Cover Image */}
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 block">
                    封面图片
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-primary/40 hover:border-primary hover:bg-primary/10 transition-all p-4 flex flex-col items-center gap-2"
                  >
                    {form.coverPreview ? (
                      <>
                        <img src={form.coverPreview} alt="封面预览" className="w-full max-h-32 object-cover border border-primary/30" />
                        <span className="font-mono-data text-xs text-primary">替换封面</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-4xl text-primary/60">cloud_upload</span>
                        <span className="font-mono-data text-xs text-on-surface-variant">上传封面</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full border border-primary text-primary px-4 py-3 font-label-caps text-label-caps hover:bg-primary/20 transition-colors shadow-[0_0_10px_rgba(255,171,243,0)] hover:shadow-[0_0_15px_rgba(255,171,243,0.5)] flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">rocket_launch</span>
                  发布资产
                </button>

                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="w-full border border-outline-variant text-on-surface-variant px-4 py-2 font-label-caps text-label-caps hover:bg-surface-container transition-colors"
                >
                  取消
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowUploadForm(true)}
                className="w-full h-full min-h-[200px] border-2 border-dashed border-primary/50 bg-primary/5 hover:bg-primary/20 hover:border-primary transition-all flex flex-col items-center justify-center gap-4 group p-6 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,171,243,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="material-symbols-outlined text-5xl text-primary group-hover:scale-110 transition-transform duration-300">
                  add_circle
                </span>
                <div className="text-center">
                  <div className="font-h3 text-h3 text-primary">+ 注入新资产</div>
                  <div className="font-mono-data text-mono-data text-on-surface-variant mt-1">
                    上传新的穿搭工具或数据包
                  </div>
                </div>
              </button>
            )}
          </div>

          {/* Right: Asset List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Section: Products */}
            <div className="flex justify-between items-center mb-4 border-b border-primary/20 pb-2 mt-8">
              <h2 className="font-h3 text-h3 text-on-surface">穿搭商品</h2>
              <span className="font-mono-data text-mono-data text-primary">
                [{sellerProducts.length}_项]
              </span>
            </div>

            {sellerProducts.map((product) => (
              <HUDBrackets key={product.id}>
                <div className={`bg-surface/80 backdrop-blur-md border p-4 flex items-center gap-6 hover:border-primary/50 transition-colors group ${
                  product.listed ? "border-outline-variant" : "border-outline/5 opacity-60"
                }`}>
                  {/* Cover Image */}
                  <div className="w-20 h-20 bg-surface-container-high border border-outline-variant relative shrink-0 overflow-hidden">
                    <img
                      src={product.image}
                      alt={(product as any).nameZh ?? product.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-h3 text-h3 text-on-surface group-hover:text-primary transition-colors truncate">
                        {(product as any).nameZh ?? product.name}
                      </h4>
                      <span className={`px-1 py-px text-[10px] font-mono-data border ${
                        product.rarity === "LEGENDARY"
                          ? "text-tertiary border-tertiary/30 bg-tertiary/10"
                          : product.rarity === "EPIC"
                          ? "text-primary border-primary/30 bg-primary/10"
                          : product.rarity === "RARE"
                          ? "text-secondary border-secondary/30 bg-secondary/10"
                          : "text-on-surface-variant border-outline-variant bg-surface-container"
                      }`}>
                        {product.rarity}
                      </span>
                    </div>
                    <div className="flex gap-4 mt-2 font-mono-data text-mono-data text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">sell</span> {product.price} 赛博币
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">category</span> {(product as any).categoryLabel ?? product.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">shopping_cart</span> {product.sales}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">star</span> {product.rating}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="hidden sm:block shrink-0">
                    <button
                      onClick={() => toggleProductListed(product.id)}
                      className={`border px-4 py-2 font-label-caps text-label-caps transition-colors ${
                        product.listed
                          ? "border-primary text-primary hover:bg-primary/20 shadow-[0_0_10px_rgba(255,171,243,0)] hover:shadow-[0_0_15px_rgba(255,171,243,0.5)]"
                          : "border-outline-variant text-on-surface-variant hover:bg-surface-container"
                      }`}
                      title={product.listed ? "点击下架" : "点击上架"}
                    >
                      {product.listed ? "在售" : "已下架"}
                    </button>
                  </div>
                </div>
              </HUDBrackets>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Order History */}
      {activeTab === "orders" && (
        <section>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-h2 text-h2 text-on-surface mb-2">
                <span className="text-primary">&gt;</span> 交易日志
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary rounded-full inline-block animate-pulse shadow-[0_0_8px_rgba(236,255,227,0.8)]" />
                实时订单 · RECORDING_ACTIVE
              </p>
            </div>
            <div className="flex gap-4">
              <button className="cyber-glass px-6 py-2 font-label-caps text-label-caps text-on-surface hover:text-secondary border border-transparent hover:border-secondary transition-all flex items-center gap-2">
                <Filter className="w-4 h-4" /> 筛选
              </button>
              <button className="cyber-glass px-6 py-2 font-label-caps text-label-caps text-on-surface hover:text-primary border border-transparent hover:border-primary transition-all flex items-center gap-2">
                <Download className="w-4 h-4" /> 导出
              </button>
            </div>
          </div>

          {/* Terminal Table */}
          <div className="cyber-glass border border-outline-variant/30 overflow-x-auto relative">
            {/* Decorative Terminal corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-secondary/50 -translate-x-px -translate-y-px" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-secondary/50 translate-x-px -translate-y-px" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-secondary/50 -translate-x-px translate-y-px" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-secondary/50 translate-x-px translate-y-px" />

            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-outline-variant/50 bg-surface-container/50">
                  <th className="p-4 font-label-caps text-label-caps text-on-surface-variant w-44">交易 ID</th>
                  <th className="p-4 font-label-caps text-label-caps text-on-surface-variant">商品名称</th>
                  <th className="p-4 font-label-caps text-label-caps text-on-surface-variant">买家</th>
                  <th className="p-4 font-label-caps text-label-caps text-on-surface-variant text-right">价值</th>
                  <th className="p-4 font-label-caps text-label-caps text-on-surface-variant text-right">时间</th>
                  <th className="p-4 font-label-caps text-label-caps text-on-surface-variant text-center w-36">状态</th>
                </tr>
              </thead>
              <tbody className="font-mono-data text-mono-data">
                {SELLER_ORDERS.map((order) => (
                  <tr key={order.id} className="border-b border-outline-variant/20 hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4 text-on-surface/80 group-hover:text-primary transition-colors">{order.id}</td>
                    <td className="p-4 text-on-surface">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 text-xs border ${
                          order.type === "skill"
                            ? "bg-primary/10 text-primary border-primary/30"
                            : order.type === "product"
                            ? "bg-tertiary/10 text-tertiary border-tertiary/30"
                            : "bg-secondary/10 text-secondary border-secondary/30"
                        }`}>
                          {order.type === "skill" ? "AI工具" : order.type === "product" ? "商品" : "充值"}
                        </span>
                        {order.productName}
                      </div>
                    </td>
                    <td className="p-4 text-on-surface-variant">{order.buyer}</td>
                    <td className={`p-4 text-right flex items-center justify-end gap-1 ${
                      order.value > 0 ? "text-secondary" : "text-secondary"
                    }`}>
                      +{order.value} 赛博币
                    </td>
                    <td className="p-4 text-right text-on-surface-variant">{order.time}</td>
                    <td className="p-4">
                      <div className={`flex items-center justify-center gap-2 ${
                        order.status === "completed" ? "text-secondary"
                        : order.status === "pending" ? "text-tertiary"
                        : "text-error"
                      }`}>
                        {order.status === "completed" ? (
                          <CheckCircle className="w-[18px] h-[18px]" />
                        ) : order.status === "pending" ? (
                          <span className="material-symbols-outlined text-lg animate-pulse">hourglass_top</span>
                        ) : (
                          <XCircle className="w-[18px] h-[18px]" />
                        )}
                        <span className="text-xs tracking-wider">
                          {order.status === "completed" ? "已完成" : order.status === "pending" ? "待处理" : "失败"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="mt-6 flex justify-between items-center text-on-surface-variant font-mono-data text-sm">
            <p>显示记录 [01-{SELLER_ORDERS.length}] 共 {SELLER_ORDERS.length + 34} 条</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-outline-variant/50 hover:bg-white/5 hover:text-secondary transition-colors">&lt; 上一页</button>
              <button className="px-3 py-1 border border-outline-variant/50 hover:bg-white/5 hover:text-secondary transition-colors">下一页 &gt;</button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
