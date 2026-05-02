"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GlassCard } from "@/components/CyberUI/GlassCard";
import { HUDBrackets } from "@/components/CyberUI/HUDBrackets";
import { PRODUCTS } from "@/lib/products-data";
import { Coins, ShoppingCart, Star, TrendingUp, CheckCircle, ArrowLeft, Zap } from "lucide-react";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const product = PRODUCTS.find((p) => p.id === params.id);

  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <div className="font-mono text-on-surface-variant">// PRODUCT_NOT_FOUND</div>
          <button
            onClick={() => router.push("/marketplace")}
            className="mt-6 px-6 py-3 border border-primary text-primary font-mono hover:bg-primary/10 transition-colors"
          >
            BACK TO MARKET
          </button>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    setAdded(true);
    try {
      const orders = JSON.parse(localStorage.getItem("spro_orders") || "[]");
      const exists = orders.find((o: any) => o.productId === product.id);
      if (!exists) {
        orders.unshift({
          id: "ORD_" + Math.random().toString(36).slice(2, 8).toUpperCase(),
          productId: product.id,
          productName: product.name,
          productImage: product.image,
          author: product.author,
          price: product.price,
          type: "buy",
          status: "completed",
          time: "刚刚",
          rarity: product.rarity,
        });
        localStorage.setItem("spro_orders", JSON.stringify(orders));
      }
    } catch {}
    setTimeout(() => setAdded(false), 2000);
  };

  const rarityColor: Record<string, string> = {
    COMMON: "#9CA3AF",
    RARE: "#60A5FA",
    EPIC: "#A78BFA",
    LEGENDARY: "#F59E0B",
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

      <div className="relative z-10 pt-28 pb-24 px-4 max-w-5xl mx-auto">
        {/* Back */}
        <button
          onClick={() => router.push("/marketplace")}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary font-mono text-sm mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          返回市场
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Image */}
          <HUDBrackets>
            <GlassCard className="overflow-hidden p-0 relative">
              <div
                className="w-full aspect-square bg-surface-container-high"
                style={{
                  backgroundImage: `url('${product.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
              <div
                className="absolute top-4 left-4 px-3 py-1 font-mono text-xs font-bold border backdrop-blur-sm"
                style={{
                  color: rarityColor[product.rarity],
                  borderColor: `${rarityColor[product.rarity]}60`,
                  backgroundColor: `${rarityColor[product.rarity]}20`,
                }}
              >
                {product.rarity}
              </div>
            </GlassCard>
          </HUDBrackets>

          {/* Right: Info */}
          <div className="space-y-6">
            <div>
              <div className="font-mono text-xs text-on-surface-variant mb-2">
                CREATED BY{" "}
                <span className="text-primary">{product.author}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-on-surface uppercase tracking-widest">
                {product.name}
              </h1>
            </div>

            {/* Rating + Sales */}
            <div className="flex items-center gap-6 font-mono text-sm">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-secondary fill-secondary" : "text-outline-variant"}`}
                  />
                ))}
                <span className="text-secondary ml-1">{product.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant">
                <TrendingUp className="w-4 h-4" />
                {product.sales} 已售
              </div>
            </div>

            {/* Price */}
            <div className="flex items-end gap-4">
              <span className="text-4xl font-display font-bold text-primary drop-shadow-[0_0_10px_rgba(255,171,243,0.5)]">
                {product.price}
              </span>
              <span className="text-xl text-on-surface-variant line-through font-mono">
                {product.originalPrice}
              </span>
              <span className="px-2 py-1 bg-secondary/20 text-secondary font-mono text-xs border border-secondary/30">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            </div>

            {/* Description */}
            <div className="border-t border-white/10 pt-4">
              <p className="text-on-surface-variant leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <h3 className="font-mono text-xs text-on-surface-variant uppercase tracking-wider">
                // INCLUDED_FEATURES
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 font-mono text-sm">
                    <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span className="text-on-surface">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 font-bold font-mono text-base tracking-wider transition-all duration-300 flex items-center justify-center gap-3 ${
                  added
                    ? "bg-secondary text-background shadow-[0_0_30px_rgba(236,255,227,0.8)]"
                    : "border-2 border-secondary text-secondary hover:bg-secondary hover:text-background hover:shadow-[0_0_30px_rgba(236,255,227,0.6)]"
                }`}
              >
                {added ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    ADDED TO CART
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    ADD TO CART — {product.price} CR
                  </>
                )}
              </button>
              <button
                onClick={() => router.push("/orders")}
                className="w-full py-3 border border-primary/50 text-primary font-mono text-sm tracking-wider hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                BUY NOW
              </button>
            </div>

            {/* Coin balance */}
            <div className="flex items-center gap-2 font-mono text-xs text-on-surface-variant">
              <Coins className="w-4 h-4 text-tertiary" />
              您的余额：200 CR
              <span className="text-secondary hover:underline cursor-pointer ml-2">
                充值 Coins →
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
