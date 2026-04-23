import Image from "next/image";

export default function HomePage() {
  return (
    <main className="scaneda-page">
      <nav className="scaneda-navbar">
        <div className="scaneda-container scaneda-navbar-inner">
          <a className="scaneda-navbar-brand" href="#top" aria-label="Scaneda home">
            <Image
              src="/brand/scaneda/scaneda_russian_logo.png"
              alt="Сканеда"
              width={160}
              height={60}
              priority
            />
          </a>
          <div className="scaneda-navbar-links">
            <a href="#features">Возможности</a>
            <a href="#flow">Как это работает</a>
            <a href="#contact" className="scaneda-navbar-cta">
              Запросить демо
            </a>
          </div>
        </div>
      </nav>

      <section className="scaneda-hero" id="top">
        <div className="scaneda-container scaneda-hero-grid">
          <div className="scaneda-hero-copy">
            <span className="scaneda-kicker">QR menu for restaurants</span>
            <h1>Не теряйте иностранных гостей из-за бумажного меню.</h1>
            <p>
              Scaneda помогает ресторанам, кафе и отелям запускать QR-меню,
              которое открывается за секунды, показывает меню на нужном языке и
              позволяет обновлять позиции онлайн без повторной печати.
            </p>
            <div className="scaneda-hero-actions">
              <a href="#contact" className="scaneda-button scaneda-button-primary">
                Получить демо
              </a>
              <a href="#features" className="scaneda-button scaneda-button-secondary">
                Посмотреть выгоды
              </a>
            </div>
            <div className="scaneda-hero-metrics">
              <div>
                <strong>Мультиязычность</strong>
                <span>Не упускайте туристов: меню можно показать на RU, EN и других языках</span>
              </div>
              <div>
                <strong>Онлайн обновление</strong>
                <span>Меняйте цены, позиции и стоп-лист без печати новых меню</span>
              </div>
              <div>
                <strong>One-time payment</strong>
                <span>Понятная разовая оплата без запутанных ежемесячных переплат</span>
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
                    <span>Сканируйте. Открывайте. Выбирайте.</span>
                    <span className="scaneda-status">QR Menu</span>
                  </div>
                  <div className="scaneda-phone-hero">
                    <Image
                      src="/brand/scaneda/scaneda_russian_logo.png"
                      alt="Сканеда логотип"
                      width={220}
                      height={82}
                    />
                    <p>Надежное QR-меню для заведений, которым нужен быстрый запуск и удобное управление.</p>
                  </div>
                  <div className="scaneda-phone-cards">
                    <div className="scaneda-mini-card">
                      <span className="scaneda-mini-label">Без печати</span>
                      <strong>Обновляйте меню онлайн в любое время</strong>
                    </div>
                    <div className="scaneda-mini-card">
                      <span className="scaneda-mini-label">Для туристов</span>
                      <strong>Показывайте меню гостям на понятном им языке</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="scaneda-showcase-panel scaneda-showcase-panel-bottom">
              <div className="scaneda-locale-card scaneda-locale-card-active">
                <span className="scaneda-locale-pill">RU MENU</span>
                <Image
                  src="/brand/scaneda/scaneda_russian_logo.png"
                  alt="Русская версия логотипа Scaneda"
                  width={180}
                  height={68}
                />
                <p>Основное меню для местных гостей с понятной структурой и быстрой навигацией.</p>
              </div>
              <div className="scaneda-locale-card scaneda-locale-card-dark">
                <span className="scaneda-locale-pill">EN MENU</span>
                <Image
                  src="/brand/scaneda/scaneda_white_logo.png"
                  alt="English version Scaneda logo"
                  width={180}
                  height={68}
                />
                <p>Английская версия помогает не терять иностранных клиентов и повышать доверие к заведению.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="scaneda-section" id="features">
        <div className="scaneda-container">
          <div className="scaneda-section-heading">
            <span className="scaneda-kicker">Почему Scaneda</span>
            <h2>QR-меню, которое экономит деньги, удерживает гостей и упрощает работу команды.</h2>
          </div>
          <div className="scaneda-feature-grid">
            <article className="scaneda-feature-card">
              <h3>Не теряйте иностранных клиентов</h3>
              <p>
                Иностранные гости видят меню на знакомом языке, быстрее
                выбирают блюда и реже уходят без заказа из-за непонимания.
              </p>
            </article>
            <article className="scaneda-feature-card">
              <h3>Обновляйте меню без печати</h3>
              <p>
                Цены, описания, стоп-лист и новые позиции меняются онлайн за
                минуты. Не нужно заново печатать меню и тратить деньги каждый раз.
              </p>
            </article>
            <article className="scaneda-feature-card">
              <h3>Надежно и выгодно</h3>
              <p>
                Платформа работает быстро, выглядит аккуратно и подходит для
                заведений, которым нужен понятный one-time payment без лишних рисков.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="scaneda-section scaneda-section-dark" id="flow">
        <div className="scaneda-container">
          <div className="scaneda-section-heading">
            <span className="scaneda-kicker">Как это работает</span>
            <h2>Простой запуск QR-меню без сложной настройки и без постоянных расходов.</h2>
          </div>
          <div className="scaneda-steps">
            <article>
              <span>01</span>
              <h3>Добавляем ваше меню</h3>
              <p>Загружаем категории, блюда, цены и описания в аккуратную цифровую структуру.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Настраиваем языки</h3>
              <p>Гости получают русскую и английскую версии, чтобы вы не теряли продажи из-за барьера языка.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Вы обновляете всё онлайн</h3>
              <p>После запуска команда меняет меню без типографии, без ожидания и без лишних затрат.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="scaneda-section" id="contact">
        <div className="scaneda-container">
          <div className="scaneda-cta">
            <div>
              <span className="scaneda-kicker">Готово к запуску</span>
              <h2>Запустите надежное QR-меню с разовой оплатой и без расходов на печать.</h2>
              <p>
                Scaneda подходит ресторанам, кафе и отелям, которым нужен
                понятный цифровой инструмент: надежный, доступный и удобный для гостей.
              </p>
            </div>
            <a href="mailto:hello@scaneda.online" className="scaneda-button scaneda-button-primary">
              Запросить демо
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
