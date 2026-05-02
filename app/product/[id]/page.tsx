"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GlassCard } from "@/components/CyberUI/GlassCard";
import { HUDBrackets } from "@/components/CyberUI/HUDBrackets";
import { PRODUCTS } from "@/lib/products-data";
import { MARKET_TOOLS, CATEGORIES } from "@/lib/marketplace-data";
import { Coins, ShoppingCart, Star, TrendingUp, CheckCircle, ArrowLeft, Zap, Shield } from "lucide-react";
import type { Product } from "@/lib/products-data";
import type { MarketTool } from "@/types/marketplace";

type Item = (Product & { _type: "product" }) | (MarketTool & { _type: "tool" });

function findItem(id: string): Item | undefined {
  const product = PRODUCTS.find((p) => p.id === id);
  if (product) return { ...product, _type: "product" };
  const tool = MARKET_TOOLS.find((t) => t.id === id);
  if (tool) return { ...tool, _type: "tool" };
  return undefined;
}

const rarityColor: Record<string, string> = {
  COMMON: "#9CA3AF",
  RARE: "#60A5FA",
  EPIC: "#A78BFA",
  LEGENDARY: "#F59E0B",
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const item = findItem(params.id as string);
  const [added, setAdded] = useState(false);

  if (!item) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <div className="font-mono text-on-surface-variant">// PRODUCT_NOT_FOUND</div>
          <button
            onClick={() => router.push("/marketplace")}
            className="mt-6 px-6 py-3 border border-primary text-primary font-mono hover:bg-primary/10 transition-colors"
          >
            返回市场
          </button>
        </div>
      </main>
    );
  }

  const isProduct = item._type === "product";
  const product = isProduct ? (item as Product & { _type: "product" }) : null;
  const tool = !isProduct ? (item as MarketTool & { _type: "tool" }) : null;

  const coverImage = isProduct
    ? product!.image
    : (tool!.coverImage || "/assets/marketplace-cover.png");

  const displayName = isProduct ? product!.name : tool!.name;
  const author = isProduct ? product!.author : "StyleBoxAI 官方";
  const description = isProduct ? product!.description : tool!.description;
  const features = isProduct ? product!.features : tool!.features;
  const price = item.price;
  const originalPrice = item.originalPrice;
  const rating = isProduct ? product!.rating : 4.5;
  const sales = isProduct ? product!.sales : 256;
  const rarity = isProduct ? product!.rarity : "EPIC";
  const category = isProduct
    ? product!.category
    : CATEGORIES.find((c) => c.id === tool!.category)?.name ?? tool!.category;
  const isHot = !isProduct && tool!.isHot;
  const isNew = !isProduct && tool!.isNew;

  const handleAddToCart = () => {
    setAdded(true);
    try {
      const orders = JSON.parse(localStorage.getItem("spro_orders") || "[]");
      const exists = orders.find((o: any) => o.productId === item.id);
      if (!exists) {
        orders.unshift({
          id: "ORD_" + Math.random().toString(36).slice(2, 8).toUpperCase(),
          productId: item.id,
          productName: displayName,
          productImage: coverImage,
          author,
          price,
          type: "buy",
          status: "completed",
          time: "刚刚",
          rarity,
        });
        localStorage.setItem("spro_orders", JSON.stringify(orders));
      }
    } catch {}
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="min-h-screen bg-background text-on-surface relative overflow-x-hidden">
      {/* Scanline */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30" style={{
        background: "linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%)",
        backgroundSize: "100% 4px",
      }} />

      {/* Background glow */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary blur-[150px] opacity-10 pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-secondary blur-[150px] opacity-5 pointer-events-none z-0" />

      <div className="relative z-10 pt-28 pb-24 px-4 max-w-6xl mx-auto">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary font-mono text-sm mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          返回
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: Image (2 cols) */}
          <div className="lg:col-span-2">
            <HUDBrackets>
              <GlassCard className="overflow-hidden p-0 relative">
                <div
                  className="w-full aspect-square bg-surface-container-high"
                  style={{
                    backgroundImage: `url('${coverImage}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                </div>
                {/* Rarity badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1 font-mono text-xs font-bold border backdrop-blur-sm"
                  style={{
                    color: rarityColor[rarity],
                    borderColor: `${rarityColor[rarity]}60`,
                    backgroundColor: `${rarityColor[rarity]}20`,
                  }}
                >
                  {rarity}
                </div>
                {/* Category badge */}
                <div className="absolute top-4 right-4 px-3 py-1 font-label-caps text-label-caps text-primary bg-primary/10 border border-primary/30 backdrop-blur-sm">
                  {category}
                </div>
              </GlassCard>
            </HUDBrackets>

            {/* Features card below image */}
            <div className="mt-6 cyber-glass border border-outline-variant/30 p-6">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-secondary" />
                包含特性
              </h3>
              <div className="space-y-3">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span className="text-sm text-on-surface leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Info (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Meta */}
            <div>
              <div className="font-mono text-xs text-on-surface-variant mb-2 flex items-center gap-2">
                <span>创作者:</span>
                <span className="text-primary">{author}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-on-surface tracking-wider">
                {displayName}
              </h1>
              {!isProduct && tool!.nameEn && (
                <p className="font-mono-data text-mono-data text-on-surface-variant mt-1">
                  {tool!.nameEn}
                </p>
              )}
            </div>

            {/* Rating + Sales */}
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(rating) ? "text-secondary fill-secondary" : "text-outline-variant"}`}
                  />
                ))}
                <span className="text-secondary ml-1 font-mono text-sm">{rating}</span>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant font-mono text-sm">
                <TrendingUp className="w-4 h-4" />
                {sales} 已售
              </div>
              {isHot && (
                <span className="px-2 py-1 bg-primary/10 border border-primary/30 text-primary font-mono text-xs">
                  HOT
                </span>
              )}
              {isNew && (
                <span className="px-2 py-1 bg-secondary/10 border border-secondary/30 text-secondary font-mono text-xs">
                  NEW
                </span>
              )}
            </div>

            {/* Price */}
            <div className="cyber-glass border border-outline-variant/30 p-6">
              <div className="flex items-end gap-4">
                <span className="text-4xl font-display font-bold text-primary drop-shadow-[0_0_10px_rgba(255,171,243,0.5)]">
                  {price}
                </span>
                <span className="text-lg text-on-surface-variant line-through font-mono">
                  {originalPrice}
                </span>
                <span className="px-2 py-1 bg-secondary/20 text-secondary font-mono text-xs border border-secondary/30">
                  -{Math.round((1 - price / originalPrice) * 100)}%
                </span>
                <span className="ml-auto font-mono text-sm text-on-surface-variant">CR</span>
              </div>
              {/* Coin balance */}
              <div className="flex items-center gap-2 font-mono text-xs text-on-surface-variant mt-4 pt-4 border-t border-outline-variant/30">
                <Coins className="w-4 h-4 text-tertiary" />
                您的余额：520 CR
                <button
                  onClick={() => router.push("/pricing")}
                  className="text-secondary hover:underline cursor-pointer ml-2"
                >
                  充值 →
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-outline-variant/30 pt-6">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-3">
                商品描述
              </h3>
              <p className="text-on-surface-variant leading-relaxed">{description}</p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-outline-variant/30">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 font-bold font-mono text-base tracking-wider transition-all duration-300 flex items-center justify-center gap-3 ${
                  added
                    ? "bg-secondary text-background shadow-[0_0_30px_rgba(236,255,227,0.8)]"
                    : "border-2 border-secondary text-secondary hover:bg-secondary hover:text-background hover:shadow-[0_0_30px_rgba(236,255,227,0.6)]"
                }`}
              >
                {added ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    已加入购物车
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    加入购物车 — {price} CR
                  </>
                )}
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 border-2 border-primary text-primary font-bold font-mono text-base tracking-wider hover:bg-primary hover:text-background hover:shadow-[0_0_30px_rgba(255,171,243,0.6)] transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Zap className="w-5 h-5" />
                立即购买
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-4 pt-4 flex-wrap">
              {["即时交付", "官方认证", "7天退款"].map((badge) => (
                <div key={badge} className="flex items-center gap-2 px-3 py-1.5 cyber-glass border border-outline-variant/20">
                  <CheckCircle className="w-3 h-3 text-secondary" />
                  <span className="font-mono text-xs text-on-surface-variant">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
