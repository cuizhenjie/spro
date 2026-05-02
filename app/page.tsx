import {
  ArrowRight,
  BarChart3,
  ChevronRight,
  Coins,
  LayoutGrid,
  Power,
  ScanLine,
  Store,
  User,
  type LucideIcon,
} from 'lucide-react';

const MOBILE_NAV: { label: string; icon: LucideIcon; active?: boolean }[] = [
  { label: '首页', icon: LayoutGrid },
  { label: '分析', icon: BarChart3 },
  { label: '商店', icon: Store, active: true },
  { label: '我的', icon: User },
];

const INFLUENCERS = [
  {
    id: 'V_SILVER',
    name: 'Neon Nomad',
    tagline: 'Street Samurai Aesthetics',
    accent: 'primary' as const,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBu-3hmhegonpmzEXlWovs7vSvYVyonYaqfB_gpCgi3tBPYSd6RtuJjYLEqrX8gJDSgbqvCxWpCLI_s7E6dT8siPSQWtp4vj2Gjr2tMtrlqUVd2c-Cq-gkf_4TAHCsh_RTVw56DCbV1PiklGYfi04qE6kFTFj35nC2ZRqRXd_uEUcuSJgrSXYRszTql5IQShsDVXc6WWKBmNTXV9_g6VPBWsG2Sy0xC4MCZGLmROfX_rz5wP_B8cMZWrRIrN8hUws33SK-QRxzgGVY',
  },
  {
    id: 'GHOST_IN_SHELL',
    name: 'Techwear Ops',
    tagline: 'Heavy Combat Casual',
    accent: 'secondary' as const,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAO3sxalHvM2F9FWPhaI7Llc_pqo89unAVd1Miz00_jXYzIM_VYOrIoyDdnGPlrZg301rN0WHFBgp707FjQvTlnHiiRvJvx1eTA1jAsHFSuS3YKdS313S1ywkzKmn_iN1F-zF9nk2qCYg7y_NgMwfIzYZm9C1jEyUyukm9ti24NuBZvZf4HTm_C1vPjErd7eyuXgarevjWGUo5WeUaSdfhG_0zBd-UixKyowLHJiH5NiikOVhfSUIu0qpZ5JYm4K6wsjVoBrusfs5E',
  },
  {
    id: 'EXEC_NULL',
    name: 'Corpo Chic',
    tagline: 'Boardroom Ready Synthetics',
    accent: 'primary' as const,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC1s2FDSsenFYo6byRQdg6jE9lNjf5uauED2AC0HAnX8GKwZ8EEahTTNfWxm-0DBEKMf9kYweUVhhOvMf6-PiZa00Zc5MWa6XHmxBXfBiMeJU-xWIcOJlSiO_2FrPXJcEkh4qySpUcies4nMkslMhayxcBxOl3uA2cP6CBHnPOU666RGoEugkyS6_fv9Xwinz0aEqlYtiVE1oAjfhnBrCYr9HLiaLEn5Y99Jhf8jvomNr0WSGraHRKOzC09_c8BbWw_FfibK8EUoWM',
  },
];

const PRODUCTS = [
  {
    name: '黑曜石外骨骼夹克',
    price: '¥ 1,299.00 信用点',
    badge: '新品首发',
    badgeColor: 'primary-container' as const,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBI8wxfilvYr76Z-jzaIxEJVOEC8PvWvpbdRH-y6xi22vnA-gCQZUbBIa2St56XmRT1o1BgckFGIMSqtphMltruk-sOk5eTp0SEgReNMlHmRUzNGeZJjjVebPu_s7ACkACuC8gZizMFZWvitVUUbyLdspDhIlYfdrdj2jdxIgGnwFJyNNeOwYMBVLB3wigbjCheQ_uLL0ZeskHWKPtExOfDl-DaSrOxUeg8ENeFcdUae0iFxdO_MPxP9aJszbKIjEPRXJ2moCjku-I',
    hoverBorder: 'primary-container',
    priceColor: 'text-primary-container',
    desktopOnly: false,
  },
  {
    name: '极速行者 V.4',
    price: '¥ 850.00 信用点',
    badge: null,
    badgeColor: null,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDIXDODg1Wu7r86eCMcrDcuQE2_vh7pGlAYBCtqMJ55miijxXoOjaPRDmexLQw9E-b8TKbQiw3In9IEaHv1nQss8EdRtUAPl24QXzzinC1ls9brCVyJHtzkeGeMJEqNCnbslI4l-KQW6jigbUv_vr44CHBPJkCM7ROyZ0yMcLzzkeIZkV96v7yPRB3NWuWh-MwP62V34JBg-04cuaelf17KyNX-eXboATdaJLFQDDtUNu52x357p4ObptHYl6qnWE9LOBfEOHhe8mo',
    hoverBorder: 'secondary-container',
    priceColor: 'text-secondary-container',
    desktopOnly: false,
  },
  {
    name: '神经元视界目镜',
    price: '¥ 2,100.00 信用点',
    badge: '稀有',
    badgeColor: 'error' as const,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC45VAOTUeThaHAb38O65R3YlxZtBhmZrrtkIeMzXd3ZI_WqqohIEkKSy8H24ikVL-a89kWYdTmFHFCKnU51Sxj0BTFlNGfvf2ugHmEBkxVzn_13put-X1r2Q-t-0mQkg0QvID-MH2auo7SfY1oNvo2mwAtbC2cMcUtXlKe9563_0SpKQ5tOAseXKIob04Bv7dYyzFqQ_U2q06qX1yA2dVNWv37K-5fMWUCBD8NtVszBM7mNjOWzTD79cGcmMO4F82TePeRZehFFWQ',
    hoverBorder: 'primary-container',
    priceColor: 'text-primary-container',
    desktopOnly: true,
  },
];

const TRENDS = [
  {
    label: '趋势_01',
    labelColor: 'text-primary-container',
    title: '霓虹街头辛迪加',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBaHkj7vtHkKKq7e-2A57tDfRtdGrxDXjU6xR7Zgy9iNyXVjsZOF5Sbh0B7eqE9RqcRy5fpggf46PAh53bW2_U8p3Z2W_zBIuEFBUvJup2WzmNgrcs5H7jypXO0sVhvByaqtBdievPHJW0EVHjGU60GnXIY4QbHGPE7bd-r8mkKmUpIIJH_7Gi-oiqCvoV_mFOUc2zAyHJqo9lu_MS2DpjRNCHEpzxelWzcuNSf2NN1Asdg8zlvtIzKA54FY899vhO-KTS7hi1xeFQ',
  },
  {
    label: '趋势_02',
    labelColor: 'text-secondary-container',
    title: '硬件植入派',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD4uqAgk5hEj-MCNCZLTKQ38AwrGdMUYXfnqpoXlt3UrO5YFnCPa4IgYv7AaG_RnyIL0JYssmeoE0nGhG3sZk6XagwJX-td3uu-wCGIwq8MbPlhStaSBog8Ks7TSflmoF6nJSg8vq_8yZRltnd8NFe2FXqsF6FPXec9KNbOz4_ZfOKdgWM-yS1RKhSUYvdfaHl9yV-Fy-ip5fLC59FV6UXo3DlOd09B7eirM77m1C43fH48FtUBGaPFixCWph7nChcBOrDng9iW2KI',
  },
];

const NAV_LINKS = ['市场', '趋势', '分析', '创作者'];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background pb-24 text-on-surface md:pb-0 md:pt-20">
      {/* Scanline overlay */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(to_bottom,transparent,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1))] bg-[length:100%_4px] opacity-30" />

      {/* HUD corner brackets */}
      <div className="pointer-events-none fixed left-4 top-24 z-40 h-16 w-16 border-t-2 border-l-2 border-primary-container/30" />
      <div className="pointer-events-none fixed right-4 top-24 z-40 h-16 w-16 border-t-2 border-r-2 border-primary-container/30" />

      {/* ── Desktop top nav ── */}
      <header className="fixed top-0 z-50 hidden w-full items-center justify-between border-b border-primary-container/30 bg-black/40 px-6 py-4 shadow-glow backdrop-blur-xl md:flex">
        <div className="flex items-center">
          <span className="font-display text-2xl font-black italic text-primary drop-shadow-[0_0_8px_rgba(255,171,243,0.8)]">
            赛博衣橱
          </span>
          <nav className="ml-12 flex space-x-8 font-display text-sm uppercase tracking-widest">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                href="#"
                className={`pb-1 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(255,171,243,0.5)] active:skew-x-2 ${
                  i === 0
                    ? 'border-b-2 border-primary text-primary-fixed'
                    : 'text-on-surface-variant transition-colors hover:text-primary-fixed'
                }`}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        <div className="ml-auto flex items-center space-x-4 text-primary">
          <div className="flex items-center rounded border border-primary-container/30 bg-black/50 px-3 py-1.5">
            <Coins className="mr-2 h-4 w-4" />
            <span className="font-mono-data text-sm">12,450 信用点</span>
          </div>
          <button className="transition-all duration-300 hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(255,171,243,0.5)]">
            <Power className="h-5 w-5" />
          </button>
          <a
            href="#"
            className="ml-2 block overflow-hidden rounded-full border border-primary-container/50 shadow-cyber-glass transition-colors hover:border-primary hover:shadow-glow"
          >
            <img
              alt="User avatar"
              className="h-8 w-8 object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU6zPSzHbjpE0VT-ChMF5ftbQAdBiOITIkDEl9qg2i23mJBmIUfKJLbyxVSNnq8IW-b8UId7bjjwCoc9Im5GKxXXjn5vsF-IbUqLPc8yWwvCSLnIijtOCLb2pth4-PXxBWQ8vN_dv_zVeejqW-_S9gftK7ULvqq2R5o_WcnQBW5vmFBH26EqecwnAZgA1F5e2eUm54z6ySFgmlWgM5kgHC95YnuCyGTMBHuP8uNYDIFYDXUYjpmQDaeaz_XAF7bLIgoV_KtxGHwuo"
            />
          </a>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="mx-auto max-w-container-max space-y-xl p-6 md:p-10">
        {/* Split header: large hero + 2 small cards */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Large feature card */}
          <div className="cyber-glass group relative overflow-hidden rounded-xl border border-outline-variant lg:col-span-8 lg:h-[500px] transition-colors hover:border-primary-container/50">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-8">
              <div className="mb-4 inline-flex w-max items-center space-x-2 rounded-sm border border-secondary-container bg-secondary-container/20 px-3 py-1 text-secondary-fixed backdrop-blur-sm">
                <ScanLine className="h-4 w-4" />
                <span className="font-mono-data text-mono-data uppercase">系统运行中</span>
              </div>
              <h1 className="font-h1 text-h1 mb-2 tracking-widest text-on-background drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                AI 面部骨相测算
              </h1>
              <p className="font-body-lg text-body-lg mb-6 max-w-xl text-on-surface-variant">
                Initiate full-spectrum bio-metric analysis to determine optimal
                aesthetic pathways. High-fidelity neural net processing ready.
              </p>
              <button className="flex w-max items-center space-x-2 rounded-none border border-primary-container px-8 py-4 font-label-caps text-label-caps text-primary-container transition-all hover:bg-primary-container/10 hover:shadow-[0_0_15px_rgba(255,171,243,0.5)]">
                <span>开启扫描</span>
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            {/* Animated scan line */}
            <div className="absolute left-0 top-0 h-1 w-full animate-pulse bg-secondary-container opacity-50 shadow-[0_0_10px_#13ff43]" />
          </div>

          {/* Right side: two stacked cards */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            {/* Card: 赛博穿搭解析 */}
            <div className="cyber-glass group relative flex min-h-[238px] flex-1 flex-col justify-end overflow-hidden rounded-xl border border-outline-variant p-6 transition-colors hover:border-secondary-container/50">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=800')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              <div className="relative z-10">
                <h3 className="font-h2 mb-2 text-2xl text-secondary-fixed drop-shadow-[0_0_8px_rgba(236,255,227,0.5)]">
                  赛博穿搭解析
                </h3>
                <p className="font-body-md mb-4 text-sm text-on-surface-variant">
                  Structural analysis of synthetic fabrics and augment integration.
                </p>
                <a
                  href="#"
                  className="flex items-center text-sm font-label-caps text-secondary-fixed transition-colors hover:text-on-surface"
                >
                  开始 <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Card: 冷暖肤色提取 */}
            <div className="cyber-glass group relative flex min-h-[238px] flex-1 flex-col justify-end overflow-hidden rounded-xl border border-outline-variant p-6 transition-colors hover:border-primary-container/50">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              <div className="relative z-10">
                <h3 className="font-h2 mb-2 text-2xl text-primary-fixed drop-shadow-[0_0_8px_rgba(255,171,243,0.5)]">
                  冷暖肤色提取
                </h3>
                <p className="font-body-md mb-4 text-sm text-on-surface-variant">
                  Chromatic mapping for optimal neon reflection.
                </p>
                <a
                  href="#"
                  className="flex items-center text-sm font-label-caps text-primary-fixed transition-colors hover:text-on-surface"
                >
                  提取 <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Influencer column + Marketplace grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Influencer Column */}
          <section className="flex flex-col space-y-6 lg:col-span-4">
            <h2 className="font-h2 text-h2 flex items-center text-primary-fixed">
              <span className="mr-4 h-8 w-2 bg-secondary-container shadow-[0_0_10px_#13ff43]" />
              穿搭博主 // NETRUNNERS
            </h2>
            {INFLUENCERS.map((inf) => (
              <div
                key={inf.id}
                className="cyber-glass flex cursor-pointer items-center space-x-4 rounded-lg border border-transparent p-4 transition-colors hover:border-surface-variant hover:bg-surface-container-high"
              >
                <img
                  alt={inf.name}
                  className={`h-16 w-16 object-cover ${
                    inf.accent === 'primary'
                      ? 'border-primary-container'
                      : 'border-secondary-container'
                  } border`}
                  src={inf.image}
                />
                <div className="flex-1">
                  <div
                    className={`font-mono-data mb-1 text-xs ${
                      inf.accent === 'primary'
                        ? 'text-primary-container'
                        : 'text-secondary-container'
                    }`}
                  >
                    ID: {inf.id}
                  </div>
                  <h4 className="font-h3 text-lg text-on-surface">{inf.name}</h4>
                  <p className="font-body-md text-xs text-on-surface-variant">
                    {inf.tagline}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-outline-variant" />
              </div>
            ))}
          </section>

          {/* Supplier Marketplace */}
          <section className="flex flex-col space-y-6 lg:col-span-8">
            <div className="flex items-end justify-between">
              <h2 className="font-h2 text-h2 flex items-center text-primary-fixed">
                <span className="mr-4 h-8 w-2 bg-primary-container shadow-glow-pink" />
                供货商直供 // ACQUIRE
              </h2>
              <a
                href="#"
                className="flex items-center font-label-caps text-label-caps text-primary-container transition-colors hover:text-primary-fixed"
              >
                查看全部 <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {PRODUCTS.map((product) => (
                <div
                  key={product.name}
                  className={`cyber-glass group flex flex-col border border-surface-container-high transition-colors hover:border-primary-container/40 ${
                    product.desktopOnly ? 'hidden md:flex' : ''
                  }`}
                >
                  <div className="relative h-48 overflow-hidden bg-surface-container-lowest p-2">
                    <img
                      alt={product.name}
                      className="h-full w-full object-cover opacity-80 mix-blend-lighten transition-opacity group-hover:opacity-100"
                      src={product.image}
                    />
                    {product.badge && (
                      <div
                        className={`absolute ${
                          product.badge === '新品首发' ? 'left-2 top-2' : 'right-2 top-2'
                        } border bg-background/80 px-2 py-1 font-mono-data text-[10px] ${
                          product.badgeColor === 'primary-container'
                            ? 'border-primary-container text-primary'
                            : 'border-error bg-error-container/80 text-error'
                        }`}
                      >
                        {product.badge}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h4 className="font-h3 mb-1 text-sm text-on-surface">{product.name}</h4>
                    <p className={`font-mono-data mb-4 text-xs ${product.priceColor}`}>
                      {product.price}
                    </p>
                    <button className="mt-auto w-full border border-outline-variant py-2 font-label-caps text-[10px] text-on-surface transition-all hover:border-primary-container hover:text-primary-container hover:shadow-cyber-glass">
                      获取数据
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Style Trends */}
        <section className="mt-12">
          <h2 className="font-h2 text-h2 mb-6 flex items-center text-primary-fixed">
            <span className="mr-4 h-8 w-2 bg-surface-variant" />
            穿搭风格趋势 // FORECAST
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {TRENDS.map((trend) => (
              <div
                key={trend.label}
                className="cyber-glass group relative h-64 overflow-hidden border border-surface-variant"
              >
                <img
                  alt={trend.title}
                  className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                  src={trend.image}
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-background via-background/80 to-transparent p-6">
                  <div
                    className={`font-mono-data mb-2 text-xs tracking-widest ${trend.labelColor}`}
                  >
                    {trend.label}
                  </div>
                  <h3 className="font-h2 text-xl text-on-surface">{trend.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* System status footer */}
        <div className="mt-12 flex items-center justify-between border-t border-surface-variant py-8 font-mono-data text-xs text-outline-variant">
          <div>SYS_V.12.4.99</div>
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-secondary-container shadow-[0_0_5px_#13ff43]" />
            <span>数据流已加密</span>
          </div>
        </div>
      </main>

      {/* ── Mobile bottom nav ── */}
      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-primary-container/30 bg-background/90 pb-safe shadow-[0_-5px_25px_rgba(255,171,243,0.15)] backdrop-blur-lg md:hidden">
        {MOBILE_NAV.map((item, i) => {
          const Icon = item.icon;
          return (
            <a
              key={i}
              href="#"
              className={`flex flex-col items-center justify-center py-3 font-display text-[10px] font-bold uppercase transition-transform active:scale-90 ${
                item.active
                  ? 'text-primary drop-shadow-[0_0_5px_rgba(255,171,243,0.6)]'
                  : 'text-outline transition-colors hover:text-primary-fixed'
              }`}
            >
              <Icon className="mb-1 h-5 w-5" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
