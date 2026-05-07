"use client";

import { useEffect, useRef, useState } from "react";

const serviceCards = [
  {
    title: "餵食與補水",
    body: "依照飼主指示備餐、補水、清洗碗具，並記錄食慾與飲水狀況。",
  },
  {
    title: "散步與陪伴",
    body: "安排安全路線、消耗精力、觀察步態與精神狀態，降低分離焦慮。",
  },
  {
    title: "清潔與梳理",
    body: "梳毛、擦拭足部、清理貓砂與環境，讓居家照護維持乾淨穩定。",
  },
  {
    title: "基礎健康觀察",
    body: "注意排泄、皮膚、眼耳口鼻與行為異常，協助及早發現照護風險。",
  },
  {
    title: "熟齡寵物支援",
    body: "提供低刺激陪伴、慢速散步、舒適墊位整理與固定時間提醒。",
  },
  {
    title: "外出期間代照",
    body: "短期出差或旅行時，維持寵物原本作息，減少寄宿環境造成的壓力。",
  },
];

const carePlans = {
  daily: {
    title: "日常保養",
    desc: "適合健康穩定的犬貓，重點是維持規律作息與乾淨環境。",
    tasks: ["確認食盆與飲水", "清潔貓砂與睡墊", "觀察排泄與活動狀態", "回傳照片與照護紀錄"],
  },
  senior: {
    title: "熟齡照護",
    desc: "適合需要較慢節奏與固定觀察的寵物，著重舒適、移動安全與健康觀察。",
    tasks: ["檢查起身與步態反應", "補充飲水與柔軟食物", "整理低刺激休息區", "記錄精神與用藥狀況"],
  },
  travel: {
    title: "外出代照",
    desc: "適合飼主短期外出，維持原本作息並提供完整回報。",
    tasks: ["確認門窗與環境安全", "依時段完成餵食與換水", "陪伴玩耍並清理環境", "每日回傳照片與摘要"],
  },
};

const planTabs = [
  ["daily", "日常保養"],
  ["senior", "熟齡照護"],
  ["travel", "外出代照"],
];

const supplies = [
  {
    title: "飲食區",
    body: "主食、零食、量杯、飲水機濾芯、備用碗具。",
    width: "86%",
  },
  {
    title: "清潔區",
    body: "貓砂、便袋、濕紙巾、除臭噴霧、毛巾與梳子。",
    width: "72%",
  },
  {
    title: "健康區",
    body: "用藥說明、獸醫聯絡方式、外出籠、醫療紀錄。",
    width: "64%",
  },
];

const carouselSlides = [
  {
    src: "/assets/store-carousel-reception.png",
    alt: "PawCare 高端接待與精品用品展示區",
    label: "接待精品區",
  },
  {
    src: "/assets/store-carousel-grooming.png",
    alt: "PawCare 私密洗護美容照護區",
    label: "洗護美容區",
  },
  {
    src: "/assets/store-carousel-lounge.png",
    alt: "PawCare 安靜諮詢與寵物休息區",
    label: "諮詢休息區",
  },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activePlan, setActivePlan] = useState("daily");
  const [checkedTasks, setCheckedTasks] = useState([]);
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);

  const plan = carePlans[activePlan];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((slide) => (slide + 1) % carouselSlides.length);
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    };
  }, []);

  function moveSlide(step) {
    setActiveSlide((slide) => (slide + step + carouselSlides.length) % carouselSlides.length);
  }

  function toggleTask(index) {
    setCheckedTasks((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  }

  function selectPlan(planName) {
    setActivePlan(planName);
    setCheckedTasks([]);
  }

  function handleBookingSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const petType = formData.get("petType") || "寵物";
    const serviceType = formData.get("serviceType") || "照護";

    setToast(`已收到 ${petType} 的${serviceType}需求，我們會盡快回覆可服務時段。`);
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }
    toastTimer.current = setTimeout(() => setToast(""), 3600);
    event.currentTarget.reset();
  }

  return (
    <>
      <header className="site-header">
        <nav className="nav" aria-label="主要導覽">
          <a className="brand" href="#top" aria-label="PawCare 首頁">
            <span className="brand-mark" aria-hidden="true">P</span>
            <span>PawCare 寵物照護</span>
          </a>
          <div className="nav-links">
            <a href="#store-info">店內環境</a>
            <a href="#services">服務</a>
            <a href="#routine">照護排程</a>
            <a href="#supplies">用品建議</a>
            <a href="#contact">聯絡</a>
          </div>
          <a className="btn" href="#booking">預約諮詢</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-label="寵物照護首頁">
          <div className="hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">到府照護與日常健康管理</span>
              <h1>把每一天的照護做得穩定、乾淨、安心。</h1>
              <p>PawCare 提供餵食、清潔、散步、基礎健康紀錄與長期照護提醒，適合忙碌家庭、幼年寵物、熟齡犬貓與術後恢復期。</p>
              <div className="hero-actions">
                <a className="btn" href="#booking">安排第一次評估</a>
                <a className="btn secondary" href="#routine">查看照護計畫</a>
              </div>
            </div>

            <form className="booking-panel" id="booking" onSubmit={handleBookingSubmit}>
              <h2 className="panel-title">快速預約</h2>
              <p className="panel-note">填寫基本需求，我們會回覆可服務時段與建議方案。</p>
              <div className="form-grid">
                <label>
                  寵物種類
                  <select name="petType" id="petType" required>
                    <option value="">請選擇</option>
                    <option>犬</option>
                    <option>貓</option>
                    <option>犬貓皆有</option>
                    <option>其他小型寵物</option>
                  </select>
                </label>
                <label>
                  需要服務
                  <select name="serviceType" id="serviceType" required>
                    <option value="">請選擇</option>
                    <option>餵食與換水</option>
                    <option>散步與陪伴</option>
                    <option>清潔與梳理</option>
                    <option>健康觀察</option>
                  </select>
                </label>
                <label>
                  希望日期
                  <input name="visitDate" id="visitDate" type="date" required />
                </label>
                <label>
                  補充說明
                  <textarea name="notes" id="notes" placeholder="例如：寵物年齡、飲食限制、用藥時間" />
                </label>
                <button className="btn" type="submit">送出預約</button>
              </div>
            </form>
          </div>
        </section>

        <div className="section-inner">
          <div className="summary-grid" aria-label="照護摘要">
            <article className="care-summary">
              <span className="summary-value">12</span>
              <span className="summary-label">項日常照護檢核</span>
            </article>
            <article className="care-summary">
              <span className="summary-value">30m</span>
              <span className="summary-label">單次到府基本時長</span>
            </article>
            <article className="care-summary">
              <span className="summary-value">24h</span>
              <span className="summary-label">照護紀錄回傳</span>
            </article>
            <article className="care-summary">
              <span className="summary-value">4</span>
              <span className="summary-label">種客製照護方案</span>
            </article>
          </div>
        </div>

        <section className="section" id="services">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <p className="section-kicker">Services</p>
                <h2>從日常到特殊需求的完整照護</h2>
              </div>
              <p>每次服務都會留下紀錄，包含飲食、水量、排泄、活動狀態與照片，方便你掌握寵物的細微變化。</p>
            </div>
            <div className="services-grid">
              {serviceCards.map((service, index) => (
                <article className="service-card" key={service.title}>
                  <div className="icon-box" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt" id="routine">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <p className="section-kicker">Routine</p>
                <h2>依照寵物狀態切換照護計畫</h2>
              </div>
              <p>選擇不同需求，查看建議的每日檢核。完成項目會即時計算進度。</p>
            </div>
            <div className="routine">
              <div className="routine-controls" role="tablist" aria-label="照護計畫">
                {planTabs.map(([key, label]) => (
                  <button
                    className={`routine-tab${activePlan === key ? " active" : ""}`}
                    type="button"
                    role="tab"
                    aria-selected={activePlan === key}
                    key={key}
                    onClick={() => selectPlan(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <article className="plan-card">
                <h3 id="planTitle">{plan.title}</h3>
                <p id="planDesc">{plan.desc}</p>
                <div className="task-list" id="taskList" aria-live="polite">
                  {plan.tasks.map((task, index) => (
                    <label className="task" key={task}>
                      <input
                        type="checkbox"
                        aria-label={task}
                        checked={checkedTasks.includes(index)}
                        onChange={() => toggleTask(index)}
                      />
                      <span>{task}</span>
                    </label>
                  ))}
                </div>
                <p className="panel-note" id="progressText" style={{ marginTop: 18 }}>
                  完成 {checkedTasks.length} / {plan.tasks.length}
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="supplies">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <p className="section-kicker">Supplies</p>
                <h2>用品準備清單</h2>
              </div>
              <p>預約前準備好常用物品，可以讓照護流程更順暢，也能降低寵物壓力。</p>
            </div>
            <div className="supply-grid">
              {supplies.map((supply) => (
                <article className="supply-card" key={supply.title}>
                  <h3>{supply.title}</h3>
                  <p>{supply.body}</p>
                  <div className="supply-meter" aria-hidden="true">
                    <span style={{ width: supply.width }} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="store-info">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <p className="section-kicker">Store</p>
                <h2>店內環境與店家地圖</h2>
              </div>
            </div>
            <div className="shop-grid">
              <article className="shop-photo-card">
                <div className="shop-carousel" aria-label="高端店內環境輪播">
                  <div className="carousel-track">
                    {carouselSlides.map((slide, index) => (
                      <img
                        className={`carousel-slide${activeSlide === index ? " active" : ""}`}
                        src={slide.src}
                        alt={slide.alt}
                        key={slide.src}
                      />
                    ))}
                  </div>
                  <button className="carousel-control prev" type="button" aria-label="上一張店內環境圖" onClick={() => moveSlide(-1)}>
                    &lt;
                  </button>
                  <button className="carousel-control next" type="button" aria-label="下一張店內環境圖" onClick={() => moveSlide(1)}>
                    &gt;
                  </button>
                  <div className="carousel-dots" role="tablist" aria-label="店內環境圖片切換">
                    {carouselSlides.map((slide, index) => (
                      <button
                        className={`carousel-dot${activeSlide === index ? " active" : ""}`}
                        type="button"
                        role="tab"
                        aria-label={slide.label}
                        aria-selected={activeSlide === index}
                        key={slide.label}
                        onClick={() => setActiveSlide(index)}
                      />
                    ))}
                  </div>
                </div>
                <div className="shop-photo-body carousel-body">
                  <h3>高端品牌感店內環境</h3>
                  <p>輪播展示接待精品區、私密洗護美容區與安靜諮詢休息區，以乾淨材質、柔和燈光與精緻分區呈現專業信任感。</p>
                </div>
                <img src="/assets/store-interior.png" alt="PawCare 店內接待、照護與用品展示環境" />
                <div className="shop-photo-body">
                  <h3>明亮乾淨的照護空間</h3>
                  <p>接待區、照護工作區與用品展示保持分區，讓寵物在穩定、衛生的環境中完成諮詢與服務。</p>
                </div>
              </article>
              <article className="shop-photo-card shop-map-card">
                <img src="/assets/store-map-ai.png" alt="PawCare AI 繪製店家地圖，標示 10548 臺北市松山區松基里敦化北路158號" />
                <div className="shop-photo-body">
                  <h3>店門位置</h3>
                  <p>我們的店位於 10548 臺北市松山區松基里敦化北路158號，地圖已用 PawCare 標記標出店門位置，方便到店諮詢、用品補給與照護交接。</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section alt" id="contact">
          <div className="section-inner contact-wrap">
            <div>
              <p className="section-kicker">Contact</p>
              <h2>先了解寵物，再安排服務。</h2>
              <p style={{ color: "var(--muted)", maxWidth: 520 }}>初次服務會先確認寵物個性、過敏與用藥、家中動線、緊急聯絡人與獸醫資訊，再開始正式照護。</p>
            </div>
            <div className="contact-panel">
              <h3 style={{ marginTop: 0 }}>服務資訊</h3>
              <ul className="contact-list">
                <li><strong>服務時間</strong><span>週一至週日 08:00 - 21:00</span></li>
                <li><strong>店門位置</strong><span>10548 臺北市松山區松基里敦化北路158號</span></li>
                <li><strong>聯絡電話</strong><span>02-2345-6789</span></li>
                <li><strong>電子信箱</strong><span>care@pawcare.example</span></li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <span>© 2026 PawCare 寵物照護</span>
          <span>到府照護、日常陪伴、健康紀錄</span>
        </div>
      </footer>

      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}
