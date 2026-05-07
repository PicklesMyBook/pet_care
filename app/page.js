"use client";

import { useEffect, useRef, useState } from "react";

const serviceCards = [
  { title: "日常照護", body: "依照毛孩年齡、個性與生活習慣安排餵食、散步、陪伴與清潔，讓照護節奏穩定可靠。" },
  { title: "美容清潔", body: "從基礎洗澡、指甲修剪到局部整理，使用溫和用品並觀察皮膚與毛況。" },
  { title: "健康巡檢", body: "每次照護記錄食慾、活動力、排便與情緒狀態，必要時主動提醒飼主。" },
  { title: "短期寄宿", body: "提供獨立休息空間、固定巡房與照片回報，適合出差、旅行或臨時照護需求。" },
  { title: "高齡陪伴", body: "為高齡毛孩安排低壓力照護、慢速活動與用藥提醒，降低環境轉換的不安。" },
  { title: "到府服務", body: "熟悉環境中的到府餵食、清潔與陪玩，減少敏感毛孩外出壓力。" },
];

const carePlans = {
  daily: {
    title: "日常照護計畫",
    desc: "適合需要固定照護節奏的毛孩，涵蓋餵食、活動、清潔與狀態回報。",
    tasks: ["確認餵食份量", "散步或室內活動", "清潔飲水與餐碗", "回報照片與狀態"],
  },
  senior: {
    title: "高齡毛孩計畫",
    desc: "針對年長犬貓調整活動強度，加入更多觀察與安撫時間。",
    tasks: ["檢查食慾與精神", "低強度活動", "用藥與保健品提醒", "記錄特殊狀況"],
  },
  travel: {
    title: "旅行寄宿計畫",
    desc: "出門期間提供穩定住宿、巡房與即時回報，讓飼主安心安排行程。",
    tasks: ["建立寄宿資料", "安排休息空間", "每日照片回報", "離店前整理物品"],
  },
};

const planTabs = [
  ["daily", "日常照護"],
  ["senior", "高齡毛孩"],
  ["travel", "旅行寄宿"],
];

const supplies = [
  { title: "營養補給", body: "依需求推薦主食、零食與保健品，避免過度推銷不必要的品項。", width: "86%" },
  { title: "清潔用品", body: "精選洗劑、梳具與除臭用品，適合居家維持毛孩舒適度。", width: "72%" },
  { title: "外出配件", body: "牽繩、外出包與防滑用品，提升日常散步與旅行安全。", width: "64%" },
];

const carouselSlides = [
  { src: "/assets/store-carousel-reception.png", alt: "PawCare 接待櫃台與等候區", label: "接待區" },
  { src: "/assets/store-carousel-grooming.png", alt: "PawCare 美容清潔空間", label: "美容室" },
  { src: "/assets/store-carousel-lounge.png", alt: "PawCare 毛孩休息區", label: "休息區" },
];

const testimonials = [
  { name: "林小姐", pet: "米克斯 Lucky", quote: "第一次寄宿前很擔心，但每天都有照片和狀態紀錄。Lucky 回家後精神很好，照護細節比我預期完整。", rating: "5.0" },
  { name: "張先生", pet: "英短 Momo", quote: "Momo 很怕陌生環境，店員會慢慢陪牠適應，不會急著處理。接回來時毛也整理得很乾淨。", rating: "5.0" },
  { name: "陳小姐", pet: "貴賓犬 Cola", quote: "美容前會先確認皮膚狀況和想保留的造型，完成後還提醒耳朵清潔方式，服務很細心。", rating: "4.9" },
  { name: "王先生", pet: "高齡柴犬 阿福", quote: "阿福年紀大、走路慢，PawCare 幫牠安排安靜房間和短時間散步，照護方式很適合老犬。", rating: "5.0" },
  { name: "黃小姐", pet: "布偶貓 Nini", quote: "臨時出差需要到府餵食，回報很準時，貓砂和飲水也整理得很乾淨，之後會固定預約。", rating: "4.9" },
  { name: "許先生", pet: "柯基 Toro", quote: "Toro 活力很旺，照護人員會安排足夠活動，也會提醒牠最近體重變化，感覺真的有在觀察。", rating: "5.0" },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [activePlan, setActivePlan] = useState("daily");
  const [checkedTasks, setCheckedTasks] = useState([]);
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);
  const plan = carePlans[activePlan];

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide((slide) => (slide + 1) % carouselSlides.length), 4200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActiveReview((review) => (review + 1) % testimonials.length), 5200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  function moveSlide(step) {
    setActiveSlide((slide) => (slide + step + carouselSlides.length) % carouselSlides.length);
  }

  function moveReview(step) {
    setActiveReview((review) => (review + step + testimonials.length) % testimonials.length);
  }

  function toggleTask(index) {
    setCheckedTasks((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index]
    );
  }

  function selectPlan(planName) {
    setActivePlan(planName);
    setCheckedTasks([]);
  }

  function handleBookingSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const petType = formData.get("petType") || "毛孩";
    const serviceType = formData.get("serviceType") || "照護服務";
    setToast(`已收到 ${petType} 的 ${serviceType} 預約需求，我們會盡快與您確認時間。`);
    if (toastTimer.current) clearTimeout(toastTimer.current);
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
            <a href="#store-info">門市環境</a>
            <a href="#services">服務</a>
            <a href="#routine">照護計畫</a>
            <a href="#reviews">客戶評價</a>
            <a href="#contact">聯絡</a>
          </div>
          <a className="btn" href="#booking">預約諮詢</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-label="寵物照護首頁">
          <div className="hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">門市照護、寄宿、美容與到府服務</span>
              <h1>把毛孩交給懂牠節奏的人照顧</h1>
              <p>PawCare 提供專業、溫和且可追蹤的寵物照護服務，從日常陪伴到短期寄宿，都讓飼主清楚掌握每個細節。</p>
              <div className="hero-actions">
                <a className="btn" href="#booking">立即預約</a>
                <a className="btn secondary" href="#routine">查看照護計畫</a>
              </div>
            </div>

            <form className="booking-panel" id="booking" onSubmit={handleBookingSubmit}>
              <h2 className="panel-title">快速預約</h2>
              <p className="panel-note">留下毛孩資訊與需求，我們會協助安排合適時段。</p>
              <div className="form-grid">
                <label>毛孩類型
                  <select name="petType" id="petType" required>
                    <option value="">請選擇</option>
                    <option>狗狗</option>
                    <option>貓咪</option>
                    <option>兔子或小型寵物</option>
                    <option>其他寵物</option>
                  </select>
                </label>
                <label>服務類型
                  <select name="serviceType" id="serviceType" required>
                    <option value="">請選擇</option>
                    <option>日常照護</option>
                    <option>美容清潔</option>
                    <option>短期寄宿</option>
                    <option>到府服務</option>
                  </select>
                </label>
                <label>預計日期
                  <input name="visitDate" id="visitDate" type="date" required />
                </label>
                <label>備註
                  <textarea name="notes" id="notes" placeholder="例如個性、飲食、用藥或特殊照護需求" />
                </label>
                <button className="btn" type="submit">送出預約</button>
              </div>
            </form>
          </div>
        </section>

        <div className="section-inner">
          <div className="summary-grid" aria-label="照護亮點">
            <article className="care-summary"><span className="summary-value">12</span><span className="summary-label">位專業照護人員</span></article>
            <article className="care-summary"><span className="summary-value">30m</span><span className="summary-label">平均回覆時間</span></article>
            <article className="care-summary"><span className="summary-value">24h</span><span className="summary-label">寄宿巡房照護</span></article>
            <article className="care-summary"><span className="summary-value">4.9</span><span className="summary-label">客戶平均評分</span></article>
          </div>
        </div>

        <section className="section" id="services">
          <div className="section-inner">
            <div className="section-head">
              <div><p className="section-kicker">Services</p><h2>依毛孩需求安排照護</h2></div>
              <p>我們先理解毛孩狀態，再規劃服務內容，讓每次照護都清楚、穩定、可回報。</p>
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
              <div><p className="section-kicker">Routine</p><h2>可勾選的照護流程</h2></div>
              <p>依照不同情境切換計畫，快速確認照護項目是否完成。</p>
            </div>
            <div className="routine">
              <div className="routine-controls" role="tablist" aria-label="照護計畫">
                {planTabs.map(([key, label]) => (
                  <button className={`routine-tab${activePlan === key ? " active" : ""}`} type="button" role="tab" aria-selected={activePlan === key} key={key} onClick={() => selectPlan(key)}>
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
                      <input type="checkbox" aria-label={task} checked={checkedTasks.includes(index)} onChange={() => toggleTask(index)} />
                      <span>{task}</span>
                    </label>
                  ))}
                </div>
                <p className="panel-note" id="progressText" style={{ marginTop: 18 }}>已完成 {checkedTasks.length} / {plan.tasks.length}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="supplies">
          <div className="section-inner">
            <div className="section-head">
              <div><p className="section-kicker">Supplies</p><h2>照護用品建議</h2></div>
              <p>依毛孩日常需求推薦用品，讓回家後的照護也能延續。</p>
            </div>
            <div className="supply-grid">
              {supplies.map((supply) => (
                <article className="supply-card" key={supply.title}>
                  <h3>{supply.title}</h3>
                  <p>{supply.body}</p>
                  <div className="supply-meter" aria-hidden="true"><span style={{ width: supply.width }} /></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt" id="reviews">
          <div className="section-inner">
            <div className="section-head">
              <div><p className="section-kicker">Reviews</p><h2>客戶評價</h2></div>
              <p>來自寄宿、美容、到府照護與高齡陪伴的真實回饋。</p>
            </div>
            <div className="testimonial-shell" aria-roledescription="carousel" aria-label="客戶評價輪播">
              <div className="testimonial-track" style={{ transform: `translateX(-${activeReview * 100}%)` }}>
                {testimonials.map((review) => (
                  <article className="testimonial-card" key={`${review.name}-${review.pet}`}>
                    <div className="testimonial-rating" aria-label={`${review.rating} 顆星評價`}>
                      <span aria-hidden="true">★★★★★</span>
                      <strong>{review.rating}</strong>
                    </div>
                    <blockquote>「{review.quote}」</blockquote>
                    <div className="testimonial-author"><span>{review.name}</span><small>{review.pet}</small></div>
                  </article>
                ))}
              </div>
              <button className="testimonial-control prev" type="button" aria-label="上一則評價" onClick={() => moveReview(-1)}>&lt;</button>
              <button className="testimonial-control next" type="button" aria-label="下一則評價" onClick={() => moveReview(1)}>&gt;</button>
            </div>
            <div className="testimonial-dots" role="tablist" aria-label="選擇評價">
              {testimonials.map((review, index) => (
                <button className={`testimonial-dot${activeReview === index ? " active" : ""}`} type="button" role="tab" aria-label={`查看 ${review.name} 的評價`} aria-selected={activeReview === index} key={`${review.name}-dot`} onClick={() => setActiveReview(index)} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="store-info">
          <div className="section-inner">
            <div className="section-head">
              <div><p className="section-kicker">Store</p><h2>明亮、安靜、容易觀察的門市空間</h2></div>
            </div>
            <div className="shop-grid">
              <article className="shop-photo-card">
                <div className="shop-carousel" aria-label="門市照片輪播">
                  <div className="carousel-track">
                    {carouselSlides.map((slide, index) => (
                      <img className={`carousel-slide${activeSlide === index ? " active" : ""}`} src={slide.src} alt={slide.alt} key={slide.src} />
                    ))}
                  </div>
                  <button className="carousel-control prev" type="button" aria-label="上一張門市照片" onClick={() => moveSlide(-1)}>&lt;</button>
                  <button className="carousel-control next" type="button" aria-label="下一張門市照片" onClick={() => moveSlide(1)}>&gt;</button>
                  <div className="carousel-dots" role="tablist" aria-label="選擇門市照片">
                    {carouselSlides.map((slide, index) => (
                      <button className={`carousel-dot${activeSlide === index ? " active" : ""}`} type="button" role="tab" aria-label={slide.label} aria-selected={activeSlide === index} key={slide.label} onClick={() => setActiveSlide(index)} />
                    ))}
                  </div>
                </div>
                <div className="shop-photo-body carousel-body">
                  <h3>分區照護空間</h3>
                  <p>從接待到美容、休息區都保持動線清楚，降低毛孩等待與移動時的壓力。</p>
                </div>
                <img src="/assets/store-interior.png" alt="PawCare 門市內部空間" />
                <div className="shop-photo-body">
                  <h3>舒適的室內環境</h3>
                  <p>以容易清潔的材質與穩定照明，維持每天照護品質。</p>
                </div>
              </article>
              <article className="shop-photo-card shop-map-card">
                <img src="/assets/store-map-ai.png" alt="PawCare 門市位置地圖" />
                <div className="shop-photo-body">
                  <h3>門市位置</h3>
                  <p>10548 台北市松山區健康路 58 號，鄰近主要道路，方便接送與臨停。</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section alt" id="contact">
          <div className="section-inner contact-wrap">
            <div>
              <p className="section-kicker">Contact</p>
              <h2>告訴我們毛孩需要什麼</h2>
              <p style={{ color: "var(--muted)", maxWidth: 520 }}>不確定該選哪一種服務也可以先諮詢，我們會依照年齡、個性、健康狀態與時間安排提供建議。</p>
            </div>
            <div className="contact-panel">
              <h3 style={{ marginTop: 0 }}>聯絡資訊</h3>
              <ul className="contact-list">
                <li><strong>營業時間</strong><span>週一至週日 08:00 - 21:00</span></li>
                <li><strong>門市地址</strong><span>10548 台北市松山區健康路 58 號</span></li>
                <li><strong>服務電話</strong><span>02-2345-6789</span></li>
                <li><strong>電子信箱</strong><span>care@pawcare.example</span></li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <span>© 2026 PawCare 寵物照護</span>
          <span>專業照護、美容、寄宿與到府服務</span>
        </div>
      </footer>

      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}
