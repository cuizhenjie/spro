"use client";

import React, { useState } from "react";
import Image from "next/image";

const MODES = [
  {
    id: "outfit",
    label: "穿搭服饰",
    desc: "上传服饰商品，AI自动生成标题、描述与标签",
  },
  {
    id: "accessory",
    label: "配饰商品",
    desc: "配饰商品智能上架，支持多角度图片",
  },
  { id: "style", label: "穿搭风格", desc: "风格数据包一键发布，打造个人品牌" },
] as const;

type Mode = (typeof MODES)[number]["id"];

const MOCK_RESULTS = {
  outfit: {
    title: "都市通勤穿搭套装",
    tags: ["通勤", "简约", "商务休闲", "春夏", "百搭"],
    desc: "精选都市白领通勤穿搭，简约大方又不失格调...",
  },
  accessory: {
    title: "WASTELAND_HIGH_FREQ_VISOR",
    tags: ["霓虹", "战术", "复古", "机械"],
    desc: "经典复古设计，精密机械机芯，适合商务送礼...",
  },
  style: {
    title: "Y2K千禧辣妹风数据包",
    tags: ["Y2K", "辣妹", "千禧", "甜酷", "街头"],
    desc: "包含200+精选单品图+穿搭模板，适合潮流店铺...",
  },
};

export default function AIListingPage() {
  const [mode, setMode] = useState<Mode>("accessory");
  const [step, setStep] = useState<"upload" | "processing" | "done">(
    "processing",
  );
  const [dragOver, setDragOver] = useState(false);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    setStep("processing");
    setTimeout(() => setStep("done"), 2500);
  };

  const currentMode = MODES.find((m) => m.id === mode)!;
  const result = MOCK_RESULTS[mode];

  return (
    <main className="h-screen w-full overflow-hidden flex items-center justify-center relative bg-background text-on-background font-body-md">
      {/* Background Context (Dashboard blur) */}
      <div className="absolute inset-0 bg-surface-container z-0 overflow-hidden">
        <div className="absolute inset-0 scanlines z-10 pointer-events-none"></div>
        <div className="p-xl opacity-30">
          <h1 className="font-h1 text-h1 text-primary-container">
            SELLER_DASHBOARD
          </h1>
          <div className="grid grid-cols-3 gap-md mt-lg">
            <div className="h-64 cyber-glass border border-outline-variant"></div>
            <div className="h-64 cyber-glass border border-outline-variant"></div>
            <div className="h-64 cyber-glass border border-outline-variant"></div>
          </div>
        </div>
      </div>

      {/* Modal Overlay Background */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md z-20"></div>

      {/* Modal Container */}
      <div className="z-30 w-[90%] max-w-4xl cyber-glass border border-primary/50 shadow-[0_0_30px_rgba(255,171,243,0.2)] rounded relative flex flex-col md:flex-row overflow-hidden">
        {/* System HUD Brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary m-xs"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary m-xs"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary m-xs"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary m-xs"></div>

        {/* Left Column: Image Scanning */}
        <div className="w-full md:w-1/2 relative bg-surface-container-lowest flex items-center justify-center border-b md:border-b-0 md:border-r border-primary/30 overflow-hidden min-h-[300px]">
          {/* Uploaded Image */}
          <div className="absolute inset-0">
            <Image
              alt="Cyberpunk Visor"
              className="w-full h-full object-cover opacity-80"
              src="https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=800"
              fill
              unoptimized
            />
          </div>

          {step === "processing" && (
            <>
              {/* Laser Scan Line */}
              <div className="absolute top-1/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_#ffabf3,0_0_20px_#ffabf3] z-10 animate-pulse"></div>
              {/* Scanning Overlay Grid */}
              <div
                className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,171,243,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,171,243,0.2) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              ></div>
              <div className="absolute bottom-md left-md bg-background/90 px-sm py-xs border border-primary text-primary font-mono-data text-mono-data uppercase flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px]">
                  radar
                </span>
                [系统: 正在锁定目标]
              </div>
            </>
          )}

          {step === "upload" && (
            <div className="relative z-10 w-full h-full flex items-center justify-center bg-background/80 backdrop-blur-sm p-8">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleFileDrop}
                onClick={() => document.getElementById("file-input")?.click()}
                className={`border-2 border-dashed w-full h-full rounded flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all ${
                  dragOver
                    ? "border-primary bg-primary/10"
                    : "border-primary/30 hover:border-primary/50 hover:bg-surface/50"
                }`}
              >
                <span className="material-symbols-outlined text-primary text-4xl mb-4">
                  upload_file
                </span>
                <p className="font-h3 text-h3 text-on-surface mb-2 uppercase">
                  上传神经资产
                </p>
                <p className="font-mono-data text-mono-data text-on-surface-variant/50">
                  将文件拖入此区域
                </p>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.length) {
                      setStep("processing");
                      setTimeout(() => setStep("done"), 2500);
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Data & Form */}
        <div className="w-full md:w-1/2 p-lg flex flex-col justify-between bg-surface-container-low/50 relative">
          {/* Progress Indicator */}
          <div className="w-full mb-lg">
            <div className="flex justify-between font-label-caps text-label-caps text-outline mb-xs">
              <span className="text-primary">01 初始化</span>
              <span
                className={`text-primary ${step === "processing" ? "drop-shadow-[0_0_5px_rgba(255,171,243,0.8)]" : ""}`}
              >
                02 AI 分析中
              </span>
              <span
                className={`${step === "done" ? "text-primary drop-shadow-[0_0_5px_rgba(255,171,243,0.8)]" : ""}`}
              >
                03 审核
              </span>
            </div>
            <div className="w-full h-1 bg-surface-variant flex">
              <div className="w-1/3 bg-primary/50 h-full"></div>
              <div
                className={`w-1/3 h-full ${step === "processing" ? "bg-primary shadow-[0_0_10px_#ffabf3]" : "bg-primary/50"}`}
              ></div>
              <div
                className={`w-1/3 h-full ${step === "done" ? "bg-primary shadow-[0_0_10px_#ffabf3]" : "bg-transparent"}`}
              ></div>
            </div>
          </div>

          {/* Terminal Logs */}
          <div className="bg-surface-container-highest p-sm border border-outline-variant font-mono-data text-mono-data h-32 overflow-hidden flex flex-col justify-end mb-lg relative">
            <div className="text-primary opacity-50">
              &gt; 正在初始化神经扫描...
            </div>
            {step !== "upload" && (
              <div className="text-primary opacity-70">
                &gt; 正在扫描材质属性...
              </div>
            )}
            {step !== "upload" && (
              <div className="text-primary opacity-90">
                &gt; 正在提取风格特征...
              </div>
            )}
            {(step === "processing" || step === "done") && (
              <div className="text-primary font-bold">
                &gt; 正在生成元数据参数_
              </div>
            )}
            {step === "done" && (
              <div className="text-secondary font-bold mt-2">
                &gt; 分析完成。等待审核。
              </div>
            )}
            <div
              className={`absolute top-sm right-sm w-2 h-2 ${step === "done" ? "bg-secondary shadow-[0_0_5px_#ecffe3]" : "bg-primary shadow-[0_0_5px_#ffabf3]"} rounded-full animate-pulse`}
            ></div>
          </div>

          {/* Auto-filling Form */}
          <div className="flex-grow flex flex-col gap-md">
            <div className="relative">
              <label className="font-label-caps text-label-caps text-outline block mb-xs">
                物品名称
              </label>
              <input
                className="w-full bg-transparent border-b border-primary text-primary font-mono-data text-mono-data py-sm focus:outline-none shadow-[0_1px_10px_rgba(255,171,243,0.3)] shadow-primary/20 rounded-none px-xs"
                readOnly
                type="text"
                value={
                  step === "done"
                    ? result.title
                    : step === "processing"
                      ? "分析中..."
                      : ""
                }
              />
            </div>
            <div className="flex gap-md">
              <div className="relative w-1/2">
                <label className="font-label-caps text-label-caps text-outline block mb-xs">
                  资产类别
                </label>
                <input
                  className="w-full bg-transparent border-b border-primary text-primary font-mono-data text-mono-data py-sm focus:outline-none shadow-[0_1px_10px_rgba(255,171,243,0.3)] shadow-primary/20 rounded-none px-xs"
                  readOnly
                  type="text"
                  value={
                    step === "done"
                      ? "CYBER_ACCESSORY"
                      : step === "processing"
                        ? "..."
                        : ""
                  }
                />
              </div>
              <div className="relative w-1/2">
                <label className="font-label-caps text-label-caps text-outline block mb-xs">
                  预估售价
                </label>
                <input
                  className="w-full bg-transparent border-b border-primary text-primary font-mono-data text-mono-data py-sm focus:outline-none shadow-[0_1px_10px_rgba(255,171,243,0.3)] shadow-primary/20 rounded-none px-xs"
                  readOnly
                  type="text"
                  value={
                    step === "done"
                      ? "50 CR"
                      : step === "processing"
                        ? "..."
                        : ""
                  }
                />
              </div>
            </div>

            {/* Chips */}
            <div className="flex gap-sm flex-wrap mt-xs min-h-[32px]">
              {step === "done" &&
                result.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary/20 text-primary border border-primary/50 font-mono-data text-[12px] px-sm py-xs flex items-center gap-xs"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      sell
                    </span>
                    [标签: {tag}]
                  </span>
                ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            className={`mt-xl w-full ${step === "done" ? "bg-secondary/10 border-secondary text-secondary hover:bg-secondary/20 hover:shadow-[0_0_20px_rgba(236,255,227,0.4)]" : "bg-primary/10 border-primary text-primary hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(255,171,243,0.4)]"} border font-h3 text-h3 py-md uppercase tracking-widest transition-all flicker-on-hover flex justify-center items-center gap-sm relative overflow-hidden group`}
            onClick={() => {
              if (step === "done") {
                setStep("upload");
              } else if (step === "upload") {
                setStep("processing");
                setTimeout(() => setStep("done"), 2500);
              }
            }}
          >
            <span className="material-symbols-outlined">
              {step === "done" ? "check_circle" : "upload"}
            </span>
            {step === "done" ? "确认发布" : "部署至市集"}{" "}
            <span className="font-body-md text-sm opacity-70">
              ({step === "done" ? "完成" : "分析并发布"})
            </span>
            {/* Hover scan effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-r from-transparent ${step === "done" ? "via-secondary/30" : "via-primary/30"} to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]`}
            ></div>
          </button>
        </div>
      </div>
    </main>
  );
}
