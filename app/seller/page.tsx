"use client";

import React, { useState, useCallback, useRef } from "react";
import { MARKET_TOOLS, CATEGORIES } from "@/lib/marketplace-data";
import type { MarketTool } from "@/types/marketplace";

// --- Local Types ---

type ToolCategory = MarketTool["category"];

interface SellerTool extends MarketTool {
  listed: boolean;
  orders: number;
  revenue: number;
  coverPreview?: string;
}

interface UploadForm {
  name: string;
  description: string;
  price: string;
  category: ToolCategory;
  coverPreview: string;
}

// --- Initial Data ---

const INITIAL_ORDERS = [86, 42, 31];

const initialSellerTools: SellerTool[] = MARKET_TOOLS.slice(0, 3).map(
  (tool, idx) => ({
    ...tool,
    listed: true,
    orders: INITIAL_ORDERS[idx] ?? 12,
    revenue: tool.price * (INITIAL_ORDERS[idx] ?? 12),
  }),
);

const UPLOAD_CATEGORIES = CATEGORIES.filter((c) => c.id !== "all");

// --- Component ---

export default function SellerDashboardPage() {
  const [sellerTools, setSellerTools] =
    useState<SellerTool[]>(initialSellerTools);
  const [showUploadForm, setShowUploadForm] = useState(false);
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
  const totalRevenue = sellerTools.reduce((sum, t) => sum + t.revenue, 0);
  const activeTools = sellerTools.filter((t) => t.listed).length;
  const pendingCount = sellerTools.length - activeTools;

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
      if (prev && !sellerTools.some((t) => t.coverPreview === prev)) {
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
      if (
        !form.name.trim() ||
        !form.description.trim() ||
        !Number.isFinite(price) ||
        price <= 0
      ) {
        return;
      }

      const newTool: SellerTool = {
        id: `seller-${Date.now()}`,
        name: form.name.trim(),
        nameEn: form.name.trim(),
        description: form.description.trim(),
        icon: "✨",
        price,
        originalPrice: price,
        category: form.category,
        features: ["AI 时尚分析", "即时交付"],
        color: "#c0fff4",
        listed: true,
        orders: 0,
        revenue: 0,
        isNew: true,
        coverPreview: form.coverPreview || undefined,
      };

      setSellerTools((prev) => [newTool, ...prev]);
      setForm({
        name: "",
        description: "",
        price: "",
        category: "style",
        coverPreview: "",
      });
      setShowUploadForm(false);
    },
    [form],
  );

  const toggleListed = useCallback((toolId: string) => {
    setSellerTools((prev) =>
      prev.map((t) => (t.id === toolId ? { ...t, listed: !t.listed } : t)),
    );
  }, []);

  // --- Render ---

  return (
    <main className="pt-[100px] px-4 md:px-10 max-w-[1280px] mx-auto space-y-10 relative z-10 pb-24">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-primary/20 pb-4">
        <div>
          <h1 className="font-h1 text-h1 text-primary drop-shadow-[0_0_15px_rgba(255,171,243,0.4)]">
            CREATOR_TERMINAL
          </h1>
          <p className="font-mono-data text-mono-data text-on-surface-variant mt-2">
            // 商家控制台 // AUTH: GRANTED
          </p>
        </div>
      </div>

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatWidget
          label="TOTAL_REVENUE"
          value={`${totalRevenue.toLocaleString()} Ƀ`}
          icon="toll"
          valueColor="text-primary"
          delta="+12% 24H"
          positive
          widgetId="01"
        />
        <StatWidget
          label="ACTIVE_ASSETS"
          value={activeTools.toString()}
          icon="view_in_ar"
          valueColor="text-on-surface"
          delta={
            pendingCount > 0 ? `${pendingCount} PENDING APPROVAL` : "ALL LISTED"
          }
          positive={false}
          widgetId="02"
        />
        <StatWidget
          label="DAILY_TRAFFIC"
          value="1,204"
          icon="monitoring"
          valueColor="text-on-surface"
          delta="+5% 24H"
          positive
          widgetId="03"
        />
      </div>

      {/* Main Action & Asset List */}
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

              <h3 className="font-h3 text-h3 gradient-text">MINT_NEW_ASSET</h3>

              {/* Name */}
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 block">
                  ASSET_NAME *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="例：NEO_TOKYO_STYLE"
                  className="w-full bg-background/80 border border-primary/20 px-4 py-3 text-on-surface font-body placeholder:text-on-surface-variant/40 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 block">
                  DESCRIPTION *
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="描述工具功能和场景..."
                  rows={3}
                  className="w-full bg-background/80 border border-primary/20 px-4 py-3 text-on-surface font-body placeholder:text-on-surface-variant/40 focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Price + Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 block">
                    PRICE (Ƀ) *
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
                    CATEGORY
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      updateField("category", e.target.value as ToolCategory)
                    }
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
                  COVER_IMAGE
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
                      <img
                        src={form.coverPreview}
                        alt="封面预览"
                        className="w-full max-h-32 object-cover border border-primary/30"
                      />
                      <span className="font-mono-data text-xs text-primary">
                        REPLACE_COVER
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-h2 text-primary/60">
                        cloud_upload
                      </span>
                      <span className="font-mono-data text-xs text-on-surface-variant">
                        UPLOAD_COVER
                      </span>
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
                DEPLOY_ASSET
              </button>

              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="w-full border border-outline-variant text-on-surface-variant px-4 py-2 font-label-caps text-label-caps hover:bg-surface-container transition-colors"
              >
                CANCEL
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowUploadForm(true)}
              className="w-full h-full min-h-[200px] border-2 border-dashed border-primary/50 bg-primary/5 hover:bg-primary/20 hover:border-primary transition-all flex flex-col items-center justify-center gap-4 group p-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,171,243,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="material-symbols-outlined text-h1 text-primary group-hover:scale-110 transition-transform duration-300">
                add_circle
              </span>
              <div className="text-center">
                <div className="font-h3 text-h3 text-primary glitch-hover">
                  + MINT_NEW_ASSET
                </div>
                <div className="font-mono-data text-mono-data text-on-surface-variant mt-1">
                  注入新资产
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Right: Asset List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-4 border-b border-primary/20 pb-2">
            <h2 className="font-h3 text-h3 text-on-surface">ASSET_INVENTORY</h2>
            <span className="font-mono-data text-mono-data text-primary">
              [{sellerTools.length}_ITEMS_FOUND]
            </span>
          </div>

          {sellerTools.length === 0 && (
            <div className="bg-surface-container/50 backdrop-blur-md border border-outline-variant p-12 text-center">
              <span className="material-symbols-outlined text-h1 text-on-surface-variant/40">
                inventory_2
              </span>
              <p className="font-mono-data text-on-surface-variant mt-4">
                NO_ASSETS_FOUND
              </p>
            </div>
          )}

          {sellerTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onToggle={toggleListed} />
          ))}
        </div>
      </div>

      {/* System HUD decorative corners */}
      <div className="fixed top-20 right-4 font-mono-data text-[10px] text-primary/30 pointer-events-none hidden lg:block">
        SYS_STATUS: NOMINAL
        <br />
        UPLINK: ACTIVE
        <br />
        SEC_LEVEL: 04
      </div>
      <div className="fixed bottom-24 left-4 font-mono-data text-[10px] text-primary/30 pointer-events-none hidden lg:block">
        GRID_REF: 44.9/X
      </div>
    </main>
  );
}

// --- Sub-Components ---

interface StatWidgetProps {
  label: string;
  value: string;
  icon: string;
  valueColor: string;
  delta: string;
  positive: boolean;
  widgetId: string;
}

function StatWidget({
  label,
  value,
  icon,
  valueColor,
  delta,
  positive,
  widgetId,
}: StatWidgetProps) {
  return (
    <div className="bg-surface-container/50 backdrop-blur-md border border-primary/30 p-6 relative overflow-hidden group hover:bg-primary/5 transition-all">
      <div className="absolute top-0 right-0 p-2 text-primary/30 font-mono-data text-[10px]">
        WIDGET_{widgetId}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4">
        {label}
      </h3>
      <div className={`font-h2 text-h2 ${valueColor} flex items-center gap-2`}>
        <span className="material-symbols-outlined">{icon}</span>
        {value}
      </div>
      <div
        className={`mt-2 font-mono-data text-xs flex items-center gap-1 ${positive ? "text-secondary" : "text-on-surface-variant"}`}
      >
        {positive && (
          <span className="material-symbols-outlined text-[14px]">
            arrow_upward
          </span>
        )}
        {delta}
      </div>
    </div>
  );
}

interface ToolCardProps {
  tool: SellerTool;
  onToggle: (id: string) => void;
}

function ToolCard({ tool, onToggle }: ToolCardProps) {
  const categoryLabel =
    UPLOAD_CATEGORIES.find((c) => c.id === tool.category)?.name ??
    tool.category;

  return (
    <div
      className={`bg-surface/80 backdrop-blur-md border p-4 flex items-center gap-6 hover:border-primary/50 transition-colors group ${
        tool.listed ? "border-outline-variant" : "border-outline/5 opacity-60"
      }`}
    >
      {/* Cover Image */}
      <div className="w-20 h-20 bg-surface-container-high border border-outline-variant relative shrink-0 overflow-hidden">
        {tool.coverPreview ? (
          <img
            src={tool.coverPreview}
            alt={tool.name}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-3xl"
            style={{ backgroundColor: `${tool.color}20` }}
          >
            {tool.icon}
          </div>
        )}
        {tool.isNew && (
          <div className="absolute top-0 left-0 bg-primary/80 px-1 py-[2px] font-mono-data text-[10px] text-on-surface">
            NEW
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-h3 text-h3 text-on-surface group-hover:text-primary transition-colors truncate">
            {tool.name}
          </h4>
          <span className="cyber-tag">{categoryLabel}</span>
        </div>
        <div className="flex gap-4 mt-2 font-mono-data text-mono-data text-on-surface-variant">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">sell</span>{" "}
            {tool.price} Ƀ
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">
              shopping_cart
            </span>{" "}
            {tool.orders} SOLD
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="hidden sm:block shrink-0">
        <button
          onClick={() => onToggle(tool.id)}
          className="border border-primary text-primary px-4 py-2 font-label-caps text-label-caps hover:bg-primary/20 transition-colors shadow-[0_0_10px_rgba(255,171,243,0)] hover:shadow-[0_0_15px_rgba(255,171,243,0.5)]"
          title={tool.listed ? "点击下架" : "点击上架"}
        >
          {tool.listed ? "LISTED" : "OFFLINE"}
        </button>
      </div>
    </div>
  );
}
