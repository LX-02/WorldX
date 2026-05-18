import { useState } from "react";

const articleImage = {
  hero1: new URL("../../../../我用一句话生成了一个AI世界 — 从自动化构建到涌现叙事的全栈技术解析-顾n凡 YGY的文章/images/001.jpg", import.meta.url).href,
  hero2: new URL("../../../../我用一句话生成了一个AI世界 — 从自动化构建到涌现叙事的全栈技术解析-顾n凡 YGY的文章/images/002.jpg", import.meta.url).href,
  hero3: new URL("../../../../我用一句话生成了一个AI世界 — 从自动化构建到涌现叙事的全栈技术解析-顾n凡 YGY的文章/images/003.jpg", import.meta.url).href,
  hero4: new URL("../../../../我用一句话生成了一个AI世界 — 从自动化构建到涌现叙事的全栈技术解析-顾n凡 YGY的文章/images/004.jpg", import.meta.url).href,
  architecture: new URL("../../../../我用一句话生成了一个AI世界 — 从自动化构建到涌现叙事的全栈技术解析-顾n凡 YGY的文章/images/005.jpg", import.meta.url).href,
  mapDirect: new URL("../../../../我用一句话生成了一个AI世界 — 从自动化构建到涌现叙事的全栈技术解析-顾n凡 YGY的文章/images/006.jpg", import.meta.url).href,
  mapDirectProblems: new URL("../../../../我用一句话生成了一个AI世界 — 从自动化构建到涌现叙事的全栈技术解析-顾n凡 YGY的文章/images/007.jpg", import.meta.url).href,
  worldCraftResult: new URL("../../../../我用一句话生成了一个AI世界 — 从自动化构建到涌现叙事的全栈技术解析-顾n凡 YGY的文章/images/009.jpg", import.meta.url).href,
  reviewLoop: new URL("../../../../我用一句话生成了一个AI世界 — 从自动化构建到涌现叙事的全栈技术解析-顾n凡 YGY的文章/images/010.jpg", import.meta.url).href,
  labelOriginal: new URL("../../../../我用一句话生成了一个AI世界 — 从自动化构建到涌现叙事的全栈技术解析-顾n凡 YGY的文章/images/011.jpg", import.meta.url).href,
  labelBad: new URL("../../../../我用一句话生成了一个AI世界 — 从自动化构建到涌现叙事的全栈技术解析-顾n凡 YGY的文章/images/012.jpg", import.meta.url).href,
  gridAssist: new URL("../../../../我用一句话生成了一个AI世界 — 从自动化构建到涌现叙事的全栈技术解析-顾n凡 YGY的文章/images/013.jpg", import.meta.url).href,
  gridReview: new URL("../../../../我用一句话生成了一个AI世界 — 从自动化构建到涌现叙事的全栈技术解析-顾n凡 YGY的文章/images/015.jpg", import.meta.url).href,
  overlayOriginal: new URL("../../../../我用一句话生成了一个AI世界 — 从自动化构建到涌现叙事的全栈技术解析-顾n凡 YGY的文章/images/016.jpg", import.meta.url).href,
  overlayWalkable: new URL("../../../../我用一句话生成了一个AI世界 — 从自动化构建到涌现叙事的全栈技术解析-顾n凡 YGY的文章/images/017.jpg", import.meta.url).href,
  colorOriginal: new URL("../../../../我用一句话生成了一个AI世界 — 从自动化构建到涌现叙事的全栈技术解析-顾n凡 YGY的文章/images/018.jpg", import.meta.url).href,
  colorMarked: new URL("../../../../我用一句话生成了一个AI世界 — 从自动化构建到涌现叙事的全栈技术解析-顾n凡 YGY的文章/images/019.jpg", import.meta.url).href,
  spriteSheet: new URL("../../../../我用一句话生成了一个AI世界 — 从自动化构建到涌现叙事的全栈技术解析-顾n凡 YGY的文章/images/020.jpg", import.meta.url).href,
};

const sections = [
  { id: "demo", label: "演示" },
  { id: "why", label: "差异" },
  { id: "architecture", label: "架构" },
  { id: "map", label: "地图" },
  { id: "breakthrough", label: "突破" },
  { id: "sprite", label: "动画" },
  { id: "details", label: "巧思" },
];

const comparisonRows = [
  ["世界", "手工搭建的固定小镇", "一句话自动生成，每次都不一样"],
  ["地图", "预制 Tiled 地图", "多模态管线自动生成 + 自我审查"],
  ["角色", "预设固定角色", "AI 自动设计 + 自动生成角色样貌、动画"],
  ["记忆检索", "Embedding 向量相似度", "关键词 + 权重线性模型"],
  ["自我修正", "无", "全链路审查 -> 约束注入 -> 重试循环"],
  ["用户干预", "有限", "广播、记忆编辑、人设修改、架空对话"],
  ["上手门槛", "需要大量配置", "配上 API Key 就行"],
];

function Figure({
  src,
  caption,
  tone = "light",
  fit = "cover",
}: {
  src: string;
  caption: string;
  tone?: "light" | "dark";
  fit?: "cover" | "contain";
}) {
  return (
    <figure className={`share-figure share-figure--${tone} share-figure--${fit}`}>
      <button type="button" className="image-zoom-trigger" data-zoom-src={src} data-zoom-caption={caption}>
        <img src={src} alt={caption} loading="lazy" />
        <span>点击放大</span>
      </button>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function StepCard({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <article className="step-card">
      <span>{kicker}</span>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

export function SharePage() {
  const [zoomedImage, setZoomedImage] = useState<{ src: string; caption: string } | null>(null);

  return (
    <main
      className="share-page"
      onClick={(event) => {
        const trigger = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-zoom-src]");
        if (!trigger) return;
        setZoomedImage({
          src: trigger.dataset.zoomSrc || "",
          caption: trigger.dataset.zoomCaption || "",
        });
      }}
    >
      <style>{styles}</style>
      <nav className="share-nav" aria-label="页面章节">
        <a href="#top" className="share-nav__brand">WorldX 分享</a>
        <div>
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>{section.label}</a>
          ))}
        </div>
      </nav>

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">产研周会技术分享</p>
          <h1>
            <span>一句话生成</span>
            <span>一个AI世界</span>
          </h1>
          <p className="hero-subtitle">
            从自动化构建到涌现叙事：WorldX 如何把一段自然语言变成可运行、可交互、可持续演化的 AI 世界。
          </p>
          <div className="hero-actions">
            <a href="#demo">先看演示</a>
            <a href="#breakthrough">看核心突破</a>
          </div>
        </div>
        <div className="hero-gallery" aria-label="WorldX 演示截图">
          <button type="button" data-zoom-src={articleImage.hero1} data-zoom-caption="WorldX 创建页演示截图">
            <img src={articleImage.hero1} alt="WorldX 创建页演示截图" />
          </button>
          <button type="button" data-zoom-src={articleImage.hero2} data-zoom-caption="WorldX 世界运行演示截图一">
            <img src={articleImage.hero2} alt="WorldX 世界运行演示截图一" />
          </button>
          <button type="button" data-zoom-src={articleImage.hero3} data-zoom-caption="WorldX 世界运行演示截图二">
            <img src={articleImage.hero3} alt="WorldX 世界运行演示截图二" />
          </button>
          <button type="button" data-zoom-src={articleImage.hero4} data-zoom-caption="WorldX 世界运行演示截图三">
            <img src={articleImage.hero4} alt="WorldX 世界运行演示截图三" />
          </button>
        </div>
      </section>

      <section id="demo" className="content-section content-section--intro">
        <div className="section-heading">
          <p className="eyebrow">Opening</p>
          <h2>先演示，再拆解</h2>
        </div>
        <div className="intro-grid">
          <div>
            <p className="lead">
              开场先不讲架构，直接让大家看到一个世界跑起来：角色在地图中移动、对话、形成事件，用户还能像“上帝”一样注入广播、编辑记忆和人格。
            </p>
            <p>
              演示之后，再回答一个更关键的问题：这不是一个固定 AI 小镇，也不是一个聊天机器人外壳，而是从一句话开始，自动生成地图、角色、交互规则和运行时模拟。
            </p>
          </div>
          <div className="quote-panel">
            <strong>一句话目标</strong>
            <p>一句自然语言描述 -&gt; 几分钟自动生成 -&gt; 一个完整的、可被角色理解和交互的 AI 世界。</p>
          </div>
        </div>
      </section>

      <section id="why" className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Why WorldX</p>
          <h2>从固定 AI 小镇，到自动创造世界</h2>
          <p>
            Generative Agents 证明了 AI 角色可以在固定世界中涌现社会行为。WorldX 进一步追问：如果世界本身也能自动生成，会发生什么？
          </p>
        </div>
        <div className="comparison-table" role="table" aria-label="Stanford Generative Agents 与 WorldX 对比">
          <div className="comparison-table__head" role="row">
            <span></span>
            <span>Stanford Generative Agents</span>
            <span>WorldX</span>
          </div>
          {comparisonRows.map(([label, stanford, worldx]) => (
            <div className="comparison-table__row" role="row" key={label}>
              <span>{label}</span>
              <span>{stanford}</span>
              <span>{worldx}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="architecture" className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Architecture</p>
          <h2>四模块协作</h2>
        </div>
        <div className="architecture-layout">
          <Figure src={articleImage.architecture} caption="WorldX 整体架构图" fit="contain" />
          <div className="architecture-copy">
            <StepCard
              kicker="01"
              title="Orchestrator 编排器"
              body="把一句话展开成 world-design.json。它是全系统合约，后续地图、角色、动作和运行时都围绕这份结构化蓝图展开。"
            />
            <StepCard
              kicker="02"
              title="Generators 生成器"
              body="生成地图、地图标注和角色动画。这里最关键的不是单次生成，而是约束、审查、重试和传统 CV 的组合。"
            />
            <StepCard
              kicker="03"
              title="Server 模拟引擎 + Client 游戏客户端"
              body="Server 驱动角色感知、决策、对话、记忆和反思；Client 用 Phaser 3 + React 展示可运行世界。"
            />
          </div>
        </div>
      </section>

      <section id="map" className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Hard Part</p>
          <h2>地图不是背景图</h2>
          <p>
            WorldX 需要的是一张可被代码理解、可被角色导航、可被运行时交互的地图。它必须同时包含美术、语义、坐标、可行走网格和 Tiled JSON。
          </p>
        </div>

        <div className="map-direct-layout">
          <div className="map-direct-copy">
            <h3>路线一：文生图直接生成</h3>
            <p>优点是美术自由度高、风格泛化强，最符合 WorldX 希望“一句话生成任意世界”的目标。</p>
            <p>但直接生成的地图只是图片：道路可能不连通，视角和遮挡不稳定，也没有区域、坐标、碰撞和语义。</p>
            <Figure src={articleImage.mapDirect} caption="文生图直接生成的地图效果" />
          </div>
          <Figure src={articleImage.mapDirectProblems} caption="路线一暴露出的长图问题清单" fit="contain" />
        </div>

        <div className="split-panel">
          <div>
            <h3>路线二：基础素材自动搭建</h3>
            <p>
              素材拼装天然有结构化坐标，但地图风格容易趋同，LLM 直接输出复杂布局也不稳定。这个路线理论上限高，但不符合作者短期对美观和泛化的诉求。
            </p>
          </div>
          <Figure src={articleImage.worldCraftResult} caption="素材搭建路线的结果示意" />
        </div>

        <div className="review-band">
          <div>
            <p className="eyebrow">Route 1 Extension</p>
            <h3>最终选择：路线一 + 约束 + 审查</h3>
            <p>
              作者最终回到文生图路线。连通性、纯背景、近俯视、少遮挡、可进入建筑横切视角等相对简单的问题，先通过 prompt 约束和视觉审查循环收敛。
            </p>
            <p>关键是审查反馈追加到下一轮 prompt，而不是替换原约束，使每轮生成都带着上一轮的教训继续收敛。</p>
          </div>
          <Figure src={articleImage.reviewLoop} caption="地图生成自我审查与重试循环" tone="dark" fit="contain" />
        </div>
      </section>

      <section id="breakthrough" className="content-section content-section--accent">
        <div className="section-heading">
          <p className="eyebrow">Breakthrough</p>
          <h2>地图标注：让模型画答案</h2>
          <p>
            真正困难的是让 AI 生成的图片变成有语义、有坐标、能被代码理解的地图。地图标注才是这条路线中最难的部分。
          </p>
        </div>

        <div className="label-flow">
          <article className="label-step">
            <div className="label-step__copy">
              <span>思路一</span>
              <h3>多模态模型直接标坐标</h3>
              <p>多模态模型能看出“杂货店在左上、咖啡厅在右侧”，但很难稳定返回精确像素坐标。它像人一样理解图像结构，却不是为“肉眼读坐标”训练的。</p>
            </div>
            <div className="image-pair">
              <Figure src={articleImage.labelOriginal} caption="用于测试坐标识别的小地图原图" tone="dark" />
              <Figure src={articleImage.labelBad} caption="模型知道大致位置，但坐标框偏差明显" tone="dark" />
            </div>
          </article>

          <article className="label-step">
            <div className="label-step__copy">
              <span>思路二</span>
              <h3>网格辅助 + 自我审查</h3>
              <p>给图片加网格，相当于给模型一把尺子；再把标注结果画回图上，让模型审查纠偏。这个方案有提升，但 token 和时间成本高，对大范围不规则可行走区域仍然困难。</p>
            </div>
            <div className="image-pair">
              <Figure src={articleImage.gridAssist} caption="网格辅助：让模型有坐标参照" tone="dark" />
              <Figure src={articleImage.gridReview} caption="多轮审查后仍难稳定精确" tone="dark" />
            </div>
          </article>

          <article className="label-step label-step--final">
            <div className="label-step__copy">
              <span>最终方案</span>
              <h3>图像标注 + 色差定位</h3>
              <p>不要让模型写坐标，让图像模型直接在原图上涂出可行走区域。模型负责视觉理解和“画答案”，程序负责从色差中计算精确坐标。</p>
              <ol>
                <li>AI 判断哪里可走、哪里是建筑、哪里是物件。</li>
                <li>图像模型在原图上叠加指定颜色。</li>
                <li>CV 从色差中提取坐标和可行走网格。</li>
              </ol>
            </div>
            <div className="before-after">
              <Figure src={articleImage.overlayOriginal} caption="复杂地图原图" tone="dark" />
              <Figure src={articleImage.overlayWalkable} caption="图像模型涂出的可行走区域" tone="dark" />
            </div>
          </article>
        </div>

        <div className="insight-block">
          <p>核心洞察</p>
          <h2>图像生成即视觉理解</h2>
          <span>
            图像生成模型对图像内容的理解能力可能远超人们通常认为的，因为不理解就根本无法生成。常规大模型是“写”出答案，图像生成模型是“画”出答案。
          </span>
        </div>

        <div className="breakthrough-card">
          <div>
            <p className="eyebrow">Extension</p>
            <h3>多色彩划分：把标注对应到具体对象</h3>
            <p>可行走区域可以只用一种颜色，但功能区和交互元素还要知道“哪个坐标属于哪个对象”。做法是给不同元素分配不同颜色，再按颜色提取对应坐标。</p>
          </div>
          <div className="before-after">
            <Figure src={articleImage.colorOriginal} caption="多色彩标注前的地图" tone="dark" />
            <Figure src={articleImage.colorMarked} caption="用不同颜色区分不同可交互元素" tone="dark" />
          </div>
        </div>
      </section>

      <section id="sprite" className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Character Animation</p>
          <h2>角色动画：模板改绘</h2>
          <p>
            角色不只是要有四向图，还要能在地图上走起来。作者最终复用了地图标注中的经验：凭空生成不稳定，基于参考模板改绘更可靠。
          </p>
        </div>

        <div className="sprite-layout">
          <Figure src={articleImage.spriteSheet} caption="角色分帧精灵图生成结果" />
          <div className="sprite-points">
            <StepCard
              kicker="思路一"
              title="首尾帧 + 视频模型"
              body="直观但贵，动画稳定性、多个角色一致性和自我审查都比较难。"
            />
            <StepCard
              kicker="思路二"
              title="直接生成分帧精灵图"
              body="能接入游戏引擎，但每帧位置、尺寸、动作幅度难以稳定对齐。"
            />
            <StepCard
              kicker="最终"
              title="参考模板 + 改绘"
              body="把每帧动作、位置和尺寸固定在模板里，让图像模型在约束内改绘目标角色。"
            />
          </div>
        </div>
      </section>

      <section id="details" className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Small Designs</p>
          <h2>让世界更可信的小巧思</h2>
        </div>
        <div className="details-grid">
          <StepCard kicker="边界" title="可行性守门" body="超出 8 角色或 8 区域/元素时返回不可行，不偷偷缩水生成。" />
          <StepCard kicker="角色" title="IP 角色反脸谱化" body="IP 角色 90% 时间像普通人生活，标志性一面只在真正触发时显露。" />
          <StepCard kicker="社会性" title="角色锚定 anchor" body="掌柜、摊贩绑定到区域或物件；买东西会转成与锚定角色对话。" />
          <StepCard kicker="记忆" title="遗忘不是 bug" body="记忆会衰减、淘汰和巩固，反思会影响后续关注焦点和记忆结构。" />
          <StepCard kicker="情绪" title="Valence + Arousal" body="情绪不是 happy/sad 标签，而是效价和唤醒度的组合，并会自然衰减。" />
          <StepCard kicker="感知" title="角色不是全知的" body="角色只看到当前地点、附近角色、近期事件和明显情绪，涌现才更可信。" />
        </div>
      </section>

      <section className="summary-section">
        <p className="eyebrow">Takeaways</p>
        <h2>WorldX 的启发</h2>
        <div className="takeaways">
          <p>把生成式能力放进可收敛的工程闭环。</p>
          <p>不要强迫模型输出它不擅长的格式。</p>
          <p>让模型用最擅长的模态表达，再用程序转结构。</p>
          <p>涌现叙事不是只靠 LLM，而是世界结构、记忆、感知、情绪和交互共同作用。</p>
        </div>
      </section>
      {zoomedImage && (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={zoomedImage.caption}
          onClick={() => setZoomedImage(null)}
        >
          <button type="button" className="image-lightbox__close" onClick={() => setZoomedImage(null)}>关闭</button>
          <img src={zoomedImage.src} alt={zoomedImage.caption} />
          <p>{zoomedImage.caption}</p>
        </div>
      )}
    </main>
  );
}

const styles = `
  .share-page {
    --bg: #f6f2e8;
    --ink: #17211d;
    --muted: #65716b;
    --line: rgba(23, 33, 29, 0.14);
    --green: #1e6b54;
    --gold: #c7842e;
    --coral: #d85d45;
    --blue: #325e91;
    position: fixed;
    inset: 0;
    z-index: 20;
    overflow-y: auto;
    overflow-x: hidden;
    pointer-events: auto;
    color: var(--ink);
    background:
      linear-gradient(180deg, rgba(246, 242, 232, 0.96), rgba(246, 242, 232, 1) 44%),
      radial-gradient(circle at 18% 14%, rgba(216, 93, 69, 0.12), transparent 28%),
      radial-gradient(circle at 84% 8%, rgba(30, 107, 84, 0.12), transparent 32%);
    font-family: "Inter", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
  }

  .share-page * {
    box-sizing: border-box;
  }

  .share-nav {
    position: sticky;
    top: 0;
    z-index: 30;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    min-height: 56px;
    padding: 10px clamp(18px, 4vw, 56px);
    border-bottom: 1px solid rgba(23, 33, 29, 0.1);
    background: rgba(246, 242, 232, 0.88);
    backdrop-filter: blur(18px);
  }

  .share-nav a {
    color: var(--ink);
    text-decoration: none;
    font-size: 13px;
    font-weight: 700;
  }

  .share-nav > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 6px;
  }

  .share-nav > div a {
    padding: 7px 10px;
    border: 1px solid transparent;
  }

  .share-nav > div a:hover,
  .share-nav__brand {
    border-color: rgba(23, 33, 29, 0.18);
  }

  .hero-section,
  .content-section,
  .summary-section {
    width: min(1180px, calc(100vw - 40px));
    margin: 0 auto;
    scroll-margin-top: 82px;
  }

  .hero-section {
    min-height: calc(100vh - 56px);
    display: grid;
    grid-template-columns: minmax(0, 0.92fr) minmax(420px, 1.08fr);
    gap: clamp(28px, 5vw, 72px);
    align-items: center;
    padding: clamp(48px, 8vw, 92px) 0 52px;
  }

  .hero-copy h1,
  .section-heading h2,
  .summary-section h2 {
    margin: 0;
    letter-spacing: 0;
    line-height: 1.05;
  }

  .hero-copy h1 {
    max-width: none;
    display: grid;
    gap: 4px;
    font-size: clamp(46px, 6vw, 78px);
  }

  .hero-copy h1 span {
    display: block;
    white-space: nowrap;
  }

  .hero-subtitle,
  .lead {
    font-size: clamp(18px, 2.3vw, 24px);
    line-height: 1.65;
    color: #304139;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 28px;
  }

  .hero-actions a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0 18px;
    border: 1px solid var(--ink);
    color: var(--ink);
    text-decoration: none;
    font-weight: 800;
  }

  .hero-actions a:first-child {
    background: var(--ink);
    color: #fffaf0;
  }

  .hero-gallery {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .hero-gallery button,
  .image-zoom-trigger {
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    border: 0;
    color: inherit;
    background: transparent;
    cursor: zoom-in;
    text-align: inherit;
  }

  .hero-gallery img,
  .share-figure img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero-gallery img {
    aspect-ratio: 1.22 / 1;
    border: 1px solid rgba(23, 33, 29, 0.14);
  }

  .hero-gallery button::after,
  .image-zoom-trigger span {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 8px;
    color: #fff8e8;
    background: rgba(21, 34, 30, 0.78);
    font-size: 12px;
    font-weight: 800;
    opacity: 0;
    transform: translateY(4px);
    transition: opacity 160ms ease, transform 160ms ease;
  }

  .hero-gallery button::after {
    content: "点击放大";
  }

  .hero-gallery button:hover::after,
  .image-zoom-trigger:hover span {
    opacity: 1;
    transform: translateY(0);
  }

  .content-section {
    padding: clamp(58px, 8vw, 104px) 0;
    border-top: 1px solid var(--line);
  }

  .content-section--intro {
    border-top: 0;
    padding-top: 28px;
  }

  .content-section--accent {
    width: 100%;
    max-width: none;
    padding-left: max(20px, calc((100vw - 1180px) / 2));
    padding-right: max(20px, calc((100vw - 1180px) / 2));
    color: #f8f0df;
    background: #15221e;
    border-top: 0;
  }

  .section-heading {
    max-width: 980px;
    margin-bottom: clamp(26px, 4vw, 46px);
  }

  .section-heading h2,
  .summary-section h2 {
    white-space: nowrap;
    font-size: clamp(32px, 4.4vw, 52px);
  }

  .section-heading p:not(.eyebrow),
  .content-section p,
  .summary-section p {
    color: var(--muted);
    line-height: 1.78;
  }

  .content-section--accent .section-heading p:not(.eyebrow),
  .content-section--accent p {
    color: rgba(248, 240, 223, 0.76);
  }

  .eyebrow {
    margin: 0 0 12px;
    color: var(--coral);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .intro-grid,
  .sprite-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(340px, 0.78fr);
    gap: clamp(24px, 4vw, 42px);
    align-items: start;
  }

  .architecture-layout {
    display: grid;
    grid-template-columns: minmax(620px, 1.45fr) minmax(280px, 0.55fr);
    gap: clamp(20px, 3vw, 34px);
    align-items: start;
  }

  .quote-panel,
  .review-band,
  .breakthrough-card,
  .summary-section {
    border: 1px solid var(--line);
    background: rgba(255, 252, 244, 0.62);
  }

  .quote-panel {
    padding: 28px;
  }

  .quote-panel strong {
    color: var(--green);
    font-size: 14px;
  }

  .comparison-table {
    border: 1px solid var(--line);
    background: rgba(255, 252, 244, 0.72);
  }

  .comparison-table__head,
  .comparison-table__row {
    display: grid;
    grid-template-columns: 150px minmax(0, 1fr) minmax(0, 1fr);
  }

  .comparison-table__head {
    background: #1c2a25;
    color: #fff8e8;
    font-weight: 900;
  }

  .comparison-table span {
    min-width: 0;
    padding: 16px 18px;
    border-right: 1px solid var(--line);
    line-height: 1.55;
  }

  .comparison-table span:last-child {
    border-right: 0;
  }

  .comparison-table__row + .comparison-table__row {
    border-top: 1px solid var(--line);
  }

  .comparison-table__row span:first-child {
    font-weight: 900;
    color: var(--green);
  }

  .share-figure {
    margin: 0;
    border: 1px solid var(--line);
    background: rgba(255, 252, 244, 0.72);
  }

  .share-figure--dark {
    border-color: rgba(248, 240, 223, 0.18);
    background: rgba(248, 240, 223, 0.06);
  }

  .share-figure img {
    aspect-ratio: 16 / 10;
  }

  .share-figure--contain img {
    object-fit: contain;
    background: rgba(255, 255, 255, 0.72);
  }

  .share-figure figcaption {
    padding: 12px 14px;
    color: var(--muted);
    font-size: 13px;
    line-height: 1.5;
    border-top: 1px solid var(--line);
  }

  .share-figure--dark figcaption {
    color: rgba(248, 240, 223, 0.68);
    border-top-color: rgba(248, 240, 223, 0.16);
  }

  .architecture-copy,
  .sprite-points,
  .details-grid {
    display: grid;
    gap: 14px;
  }

  .step-card {
    padding: 18px;
    border: 1px solid var(--line);
    background: rgba(255, 252, 244, 0.72);
  }

  .step-card span,
  .label-step__copy span {
    color: var(--gold);
    font-size: 12px;
    font-weight: 900;
  }

  .step-card h3,
  .split-panel h3,
  .review-band h3,
  .breakthrough-card h3,
  .label-step h3 {
    margin: 8px 0 10px;
    font-size: 22px;
    letter-spacing: 0;
  }

  .step-card p {
    margin: 0;
    font-size: 14px;
  }

  .split-panel,
  .review-band,
  .breakthrough-card {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(420px, 1.2fr);
    gap: 28px;
    align-items: center;
    margin-top: 22px;
  }

  .split-panel > div:first-child {
    padding: 26px;
  }

  .map-direct-layout {
    display: grid;
    grid-template-columns: minmax(360px, 0.82fr) minmax(420px, 1.18fr);
    gap: 24px;
    align-items: stretch;
    margin-top: 22px;
  }

  .map-direct-copy {
    display: grid;
    align-content: start;
    gap: 14px;
    padding: 26px;
    border: 1px solid var(--line);
    background: rgba(255, 252, 244, 0.62);
  }

  .map-direct-copy .share-figure img {
    aspect-ratio: 16 / 9;
  }

  .map-direct-layout > .share-figure img {
    min-height: 520px;
    max-height: 680px;
  }

  .split-panel--reverse {
    grid-template-columns: minmax(420px, 1.2fr) minmax(0, 0.8fr);
  }

  .image-pair {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
    margin-top: 18px;
  }

  .review-band {
    grid-template-columns: minmax(0, 0.72fr) minmax(540px, 1.28fr);
    padding: 24px;
    background: #1c2a25;
    color: #fff8e8;
    border-color: rgba(23, 33, 29, 0.2);
  }

  .review-band p {
    color: rgba(255, 248, 232, 0.74);
  }

  .review-band .share-figure img {
    aspect-ratio: 2.35 / 1;
  }

  .label-flow {
    display: grid;
    gap: 22px;
  }

  .label-step {
    display: grid;
    grid-template-columns: minmax(300px, 0.62fr) minmax(0, 1.38fr);
    gap: 22px;
    align-items: center;
    padding: clamp(20px, 3vw, 30px);
    border: 1px solid rgba(248, 240, 223, 0.18);
    background: rgba(248, 240, 223, 0.06);
  }

  .label-step--final {
    grid-template-columns: minmax(360px, 0.72fr) minmax(0, 1.28fr);
    background: rgba(242, 228, 197, 0.1);
    border-color: rgba(242, 228, 197, 0.32);
  }

  .label-step__copy ol {
    margin: 16px 0 0;
    padding-left: 20px;
    color: rgba(248, 240, 223, 0.82);
    line-height: 1.8;
  }

  .breakthrough-card {
    margin-top: 28px;
    padding: clamp(22px, 4vw, 36px);
    border-color: rgba(248, 240, 223, 0.18);
    background: rgba(248, 240, 223, 0.06);
  }

  .breakthrough-card ol {
    margin: 18px 0 0;
    padding-left: 20px;
    color: rgba(248, 240, 223, 0.82);
    line-height: 1.8;
  }

  .before-after {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .insight-block {
    margin: 34px 0;
    padding: clamp(26px, 5vw, 54px);
    border: 1px solid rgba(248, 240, 223, 0.2);
    background: #f2e4c5;
    color: #15221e;
  }

  .insight-block p {
    margin: 0 0 8px;
    color: var(--coral);
    font-weight: 900;
  }

  .insight-block h2 {
    margin: 0;
    white-space: nowrap;
    font-size: clamp(38px, 6vw, 78px);
    letter-spacing: 0;
    line-height: 1;
  }

  .insight-block span {
    display: block;
    max-width: 760px;
    margin-top: 20px;
    color: #3f4c45;
    font-size: 18px;
    line-height: 1.8;
  }

  .details-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .summary-section {
    margin-top: 0;
    margin-bottom: 80px;
    padding: clamp(32px, 6vw, 62px);
  }

  .takeaways {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin-top: 28px;
  }

  .takeaways p {
    margin: 0;
    padding: 18px;
    border: 1px solid var(--line);
    background: rgba(255, 252, 244, 0.6);
    font-weight: 800;
  }

  .image-lightbox {
    position: fixed;
    inset: 0;
    z-index: 80;
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
    place-items: center;
    gap: 14px;
    padding: 60px 34px 30px;
    background: rgba(10, 15, 13, 0.9);
    cursor: zoom-out;
  }

  .image-lightbox img {
    max-width: min(96vw, 1420px);
    max-height: 82vh;
    object-fit: contain;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.42);
  }

  .image-lightbox p {
    margin: 0;
    color: #fff8e8;
    font-size: 14px;
    text-align: center;
  }

  .image-lightbox__close {
    position: absolute;
    top: 18px;
    right: 22px;
    min-height: 38px;
    padding: 0 14px;
    border: 1px solid rgba(255, 248, 232, 0.36);
    color: #fff8e8;
    background: rgba(255, 248, 232, 0.08);
    font-weight: 800;
    cursor: pointer;
  }

  @media (max-width: 900px) {
    .share-nav {
      align-items: flex-start;
      flex-direction: column;
    }

    .hero-section,
    .intro-grid,
    .architecture-layout,
    .map-direct-layout,
    .split-panel,
    .split-panel--reverse,
    .review-band,
    .breakthrough-card,
    .label-step,
    .label-step--final,
    .sprite-layout {
      grid-template-columns: 1fr;
    }

    .hero-gallery,
    .image-pair,
    .before-after,
    .details-grid,
    .takeaways {
      grid-template-columns: 1fr;
    }

    .comparison-table {
      overflow-x: auto;
    }

    .comparison-table__head,
    .comparison-table__row {
      min-width: 760px;
    }
  }

  @media (max-width: 560px) {
    .hero-section,
    .content-section,
    .summary-section {
      width: min(100vw - 28px, 1180px);
    }

    .hero-copy h1 {
      font-size: 42px;
      white-space: normal;
    }

    .section-heading h2,
    .summary-section h2,
    .insight-block h2 {
      white-space: normal;
    }

    .share-nav > div a {
      padding: 6px 8px;
    }
  }
`;
