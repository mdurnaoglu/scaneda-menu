"use client";

import { useState } from "react";
import Image from "next/image";

const languages = [
  { value: "ru", label: "RU" },
  { value: "en", label: "EN" }
];

const copy = {
  ru: {
    homeLabel: "Сканеда",
    navFeatures: "Возможности",
    navFlow: "Как это работает",
    navCta: "Запросить демо",
    kicker: "QR menu for restaurants",
    heroTitle: "Не теряйте иностранных гостей из-за бумажного меню.",
    heroText:
      "Scaneda помогает ресторанам, кафе и отелям запускать QR-меню, которое открывается за секунды, показывает меню на нужном языке и позволяет обновлять позиции онлайн без повторной печати.",
    heroPrimary: "Получить демо",
    heroSecondary: "Посмотреть выгоды",
    metricOneTitle: "Мультиязычность",
    metricOneText: "Не упускайте туристов: меню можно показать на RU, EN и других языках",
    metricTwoTitle: "Онлайн обновление",
    metricTwoText: "Меняйте цены, позиции и стоп-лист без печати новых меню",
    metricThreeTitle: "One-time payment",
    metricThreeText: "Понятная разовая оплата без запутанных ежемесячных переплат",
    phoneTopline: "Сканируйте. Открывайте. Выбирайте.",
    phoneStatus: "QR Menu",
    phoneText: "Надежное QR-меню для заведений, которым нужен быстрый запуск и удобное управление.",
    miniOneLabel: "Без печати",
    miniOneText: "Обновляйте меню онлайн в любое время",
    miniTwoLabel: "Для туристов",
    miniTwoText: "Показывайте меню гостям на понятном им языке",
    localeRu: "RU MENU",
    localeRuText: "Основное меню для местных гостей с понятной структурой и быстрой навигацией.",
    localeEn: "EN MENU",
    localeEnText: "Английская версия помогает не терять иностранных клиентов и повышать доверие к заведению.",
    featuresKicker: "Почему Scaneda",
    featuresTitle: "QR-меню, которое экономит деньги, удерживает гостей и упрощает работу команды.",
    featureOneTitle: "Не теряйте иностранных клиентов",
    featureOneText: "Иностранные гости видят меню на знакомом языке, быстрее выбирают блюда и реже уходят без заказа из-за непонимания.",
    featureTwoTitle: "Обновляйте меню без печати",
    featureTwoText: "Цены, описания, стоп-лист и новые позиции меняются онлайн за минуты. Не нужно заново печатать меню и тратить деньги каждый раз.",
    featureThreeTitle: "Надежно и выгодно",
    featureThreeText: "Платформа работает быстро, выглядит аккуратно и подходит для заведений, которым нужен понятный one-time payment без лишних рисков.",
    flowKicker: "Как это работает",
    flowTitle: "Простой запуск QR-меню без сложной настройки и без постоянных расходов.",
    stepOneTitle: "Добавляем ваше меню",
    stepOneText: "Загружаем категории, блюда, цены и описания в аккуратную цифровую структуру.",
    stepTwoTitle: "Настраиваем языки",
    stepTwoText: "Гости получают русскую и английскую версии, чтобы вы не теряли продажи из-за барьера языка.",
    stepThreeTitle: "Вы обновляете всё онлайн",
    stepThreeText: "После запуска команда меняет меню без типографии, без ожидания и без лишних затрат.",
    ctaKicker: "Готово к запуску",
    ctaTitle: "Запустите надежное QR-меню с разовой оплатой и без расходов на печать.",
    ctaText: "Scaneda подходит ресторанам, кафе и отелям, которым нужен понятный цифровой инструмент: надежный, доступный и удобный для гостей.",
    ctaButton: "Запросить демо"
  },
  en: {
    homeLabel: "Scaneda",
    navFeatures: "Benefits",
    navFlow: "How it works",
    navCta: "Request demo",
    kicker: "QR menu for restaurants",
    heroTitle: "Do not lose foreign guests because of a paper menu.",
    heroText:
      "Scaneda helps restaurants, cafes, and hotels launch a QR menu that opens instantly, shows the menu in the guest's language, and lets your team update items online without printing again.",
    heroPrimary: "Request demo",
    heroSecondary: "See benefits",
    metricOneTitle: "Multilingual",
    metricOneText: "Keep tourists engaged with menu versions in RU, EN, and more",
    metricTwoTitle: "Online updates",
    metricTwoText: "Change prices, items, and sold-out dishes without reprinting menus",
    metricThreeTitle: "One-time payment",
    metricThreeText: "Simple one-time pricing without confusing monthly overpayments",
    phoneTopline: "Scan. Open. Choose.",
    phoneStatus: "QR Menu",
    phoneText: "A reliable QR menu for venues that need fast launch and easy control.",
    miniOneLabel: "No printing",
    miniOneText: "Update your menu online whenever you need",
    miniTwoLabel: "For tourists",
    miniTwoText: "Show the menu in a language your guests understand",
    localeRu: "RU MENU",
    localeRuText: "A clean main menu for local guests with fast, clear navigation.",
    localeEn: "EN MENU",
    localeEnText: "The English version helps you keep foreign customers and build trust instantly.",
    featuresKicker: "Why Scaneda",
    featuresTitle: "A QR menu that saves money, keeps guests, and simplifies daily operations.",
    featureOneTitle: "Do not lose foreign customers",
    featureOneText: "International guests can read the menu right away, choose faster, and are less likely to leave without ordering.",
    featureTwoTitle: "Update the menu without printing",
    featureTwoText: "Prices, descriptions, sold-out items, and new dishes can be changed online in minutes. No need to print new menus every time.",
    featureThreeTitle: "Reliable and cost-effective",
    featureThreeText: "The platform is fast, polished, and built for venues that want a clear one-time payment model without unnecessary risk.",
    flowKicker: "How it works",
    flowTitle: "A simple QR menu launch without complex setup or recurring print costs.",
    stepOneTitle: "We add your menu",
    stepOneText: "Categories, dishes, prices, and descriptions are organized into a clean digital menu structure.",
    stepTwoTitle: "We configure languages",
    stepTwoText: "Guests get Russian and English menu versions so language barriers do not cost you sales.",
    stepThreeTitle: "You update everything online",
    stepThreeText: "After launch, your team edits the menu without a print shop, delays, or extra expenses.",
    ctaKicker: "Ready to launch",
    ctaTitle: "Launch a reliable QR menu with one-time payment and no printing costs.",
    ctaText: "Scaneda is built for restaurants, cafes, and hotels that want a dependable, affordable digital menu experience for every guest.",
    ctaButton: "Request demo"
  }
};

export default function HomePage() {
  const [locale, setLocale] = useState("ru");
  const t = copy[locale];

  return (
    <main className="scaneda-page">
      <nav className="scaneda-navbar">
        <div className="scaneda-container scaneda-navbar-inner">
          <a className="scaneda-navbar-brand" href="#top" aria-label={t.homeLabel}>
            <Image
              src="/brand/scaneda/scaneda_russian_logo.png"
              alt={t.homeLabel}
              width={190}
              height={72}
              priority
            />
          </a>
          <div className="scaneda-navbar-links">
            <a href="#features">{t.navFeatures}</a>
            <a href="#flow">{t.navFlow}</a>
            <label className="scaneda-language-switch" aria-label="Language switcher">
              <span className="scaneda-language-label">Language</span>
              <select
                className="scaneda-language-select"
                value={locale}
                onChange={(event) => setLocale(event.target.value)}
              >
                {languages.map((language) => (
                  <option key={language.value} value={language.value}>
                    {language.label}
                  </option>
                ))}
              </select>
            </label>
            <a href="#contact" className="scaneda-navbar-cta">
              {t.navCta}
            </a>
          </div>
        </div>
      </nav>

      <section className="scaneda-hero" id="top">
        <div className="scaneda-container scaneda-hero-grid">
          <div className="scaneda-hero-copy">
            <span className="scaneda-kicker">{t.kicker}</span>
            <h1>{t.heroTitle}</h1>
            <p>{t.heroText}</p>
            <div className="scaneda-hero-actions">
              <a href="#contact" className="scaneda-button scaneda-button-primary">
                {t.heroPrimary}
              </a>
              <a href="#features" className="scaneda-button scaneda-button-secondary">
                {t.heroSecondary}
              </a>
            </div>
            <div className="scaneda-hero-metrics">
              <div>
                <strong>{t.metricOneTitle}</strong>
                <span>{t.metricOneText}</span>
              </div>
              <div>
                <strong>{t.metricTwoTitle}</strong>
                <span>{t.metricTwoText}</span>
              </div>
              <div>
                <strong>{t.metricThreeTitle}</strong>
                <span>{t.metricThreeText}</span>
              </div>
            </div>
          </div>

          <div className="scaneda-showcase">
            <div className="scaneda-showcase-panel scaneda-showcase-panel-top">
              <div className="scaneda-panel-header">
                <span className="scaneda-dot" />
                <span>Scaneda.online</span>
              </div>
              <div className="scaneda-phone">
                <div className="scaneda-phone-notch" />
                <div className="scaneda-phone-screen">
                  <div className="scaneda-phone-topline">
                    <span>{t.phoneTopline}</span>
                    <span className="scaneda-status">{t.phoneStatus}</span>
                  </div>
                  <div className="scaneda-phone-hero">
                    <Image
                      src="/brand/scaneda/scaneda_russian_logo.png"
                      alt={t.homeLabel}
                      width={220}
                      height={82}
                    />
                    <p>{t.phoneText}</p>
                  </div>
                  <div className="scaneda-phone-cards">
                    <div className="scaneda-mini-card">
                      <span className="scaneda-mini-label">{t.miniOneLabel}</span>
                      <strong>{t.miniOneText}</strong>
                    </div>
                    <div className="scaneda-mini-card">
                      <span className="scaneda-mini-label">{t.miniTwoLabel}</span>
                      <strong>{t.miniTwoText}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="scaneda-showcase-panel scaneda-showcase-panel-bottom">
              <div className="scaneda-locale-card scaneda-locale-card-active">
                <span className="scaneda-locale-pill">{t.localeRu}</span>
                <Image
                  src="/brand/scaneda/scaneda_russian_logo.png"
                  alt="Русская версия логотипа Scaneda"
                  width={180}
                  height={68}
                />
                <p>{t.localeRuText}</p>
              </div>
              <div className="scaneda-locale-card scaneda-locale-card-dark">
                <span className="scaneda-locale-pill">{t.localeEn}</span>
                <Image
                  src="/brand/scaneda/scaneda_white_logo.png"
                  alt="English version Scaneda logo"
                  width={180}
                  height={68}
                />
                <p>{t.localeEnText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="scaneda-section" id="features">
        <div className="scaneda-container">
          <div className="scaneda-section-heading">
            <span className="scaneda-kicker">{t.featuresKicker}</span>
            <h2>{t.featuresTitle}</h2>
          </div>
          <div className="scaneda-feature-grid">
            <article className="scaneda-feature-card">
              <h3>{t.featureOneTitle}</h3>
              <p>{t.featureOneText}</p>
            </article>
            <article className="scaneda-feature-card">
              <h3>{t.featureTwoTitle}</h3>
              <p>{t.featureTwoText}</p>
            </article>
            <article className="scaneda-feature-card">
              <h3>{t.featureThreeTitle}</h3>
              <p>{t.featureThreeText}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="scaneda-section scaneda-section-dark" id="flow">
        <div className="scaneda-container">
          <div className="scaneda-section-heading">
            <span className="scaneda-kicker">{t.flowKicker}</span>
            <h2>{t.flowTitle}</h2>
          </div>
          <div className="scaneda-steps">
            <article>
              <span>01</span>
              <h3>{t.stepOneTitle}</h3>
              <p>{t.stepOneText}</p>
            </article>
            <article>
              <span>02</span>
              <h3>{t.stepTwoTitle}</h3>
              <p>{t.stepTwoText}</p>
            </article>
            <article>
              <span>03</span>
              <h3>{t.stepThreeTitle}</h3>
              <p>{t.stepThreeText}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="scaneda-section" id="contact">
        <div className="scaneda-container">
          <div className="scaneda-cta">
            <div>
              <span className="scaneda-kicker">{t.ctaKicker}</span>
              <h2>{t.ctaTitle}</h2>
              <p>{t.ctaText}</p>
            </div>
            <a href="mailto:hello@scaneda.online" className="scaneda-button scaneda-button-primary">
              {t.ctaButton}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
