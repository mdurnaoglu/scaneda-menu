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
            <span className="scaneda-kicker">QR experience for modern restaurants</span>
            <h1>Цифровое меню, которое выглядит премиально и работает мгновенно.</h1>
            <p>
              Scaneda помогает ресторанам, кафе и отелям запускать QR-меню с
              чистым интерфейсом, удобной локализацией и управлением контентом
              без лишней сложности.
            </p>
            <div className="scaneda-hero-actions">
              <a href="#contact" className="scaneda-button scaneda-button-primary">
                Обсудить запуск
              </a>
              <a href="#features" className="scaneda-button scaneda-button-secondary">
                Посмотреть преимущества
              </a>
            </div>
            <div className="scaneda-hero-metrics">
              <div>
                <strong>RU first</strong>
                <span>Русский язык как основной вход для гостей</span>
              </div>
              <div>
                <strong>EN ready</strong>
                <span>Английская версия для международной аудитории</span>
              </div>
              <div>
                <strong>Mobile native</strong>
                <span>Акцент на быстрый и удобный мобильный опыт</span>
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
                    <span>Сканируйте. Открывайте. Заказывайте.</span>
                    <span className="scaneda-status">Live</span>
                  </div>
                  <div className="scaneda-phone-hero">
                    <Image
                      src="/brand/scaneda/scaneda_russian_logo.png"
                      alt="Сканеда логотип"
                      width={220}
                      height={82}
                    />
                    <p>Современное QR-меню для заведений, которые ценят стиль и скорость.</p>
                  </div>
                  <div className="scaneda-phone-cards">
                    <div className="scaneda-mini-card">
                      <span className="scaneda-mini-label">Скорость</span>
                      <strong>Мгновенное открытие меню</strong>
                    </div>
                    <div className="scaneda-mini-card">
                      <span className="scaneda-mini-label">Локализация</span>
                      <strong>Русский и English без трения</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="scaneda-showcase-panel scaneda-showcase-panel-bottom">
              <div className="scaneda-locale-card scaneda-locale-card-active">
                <span className="scaneda-locale-pill">RU</span>
                <Image
                  src="/brand/scaneda/scaneda_russian_logo.png"
                  alt="Русская версия логотипа Scaneda"
                  width={180}
                  height={68}
                />
              </div>
              <div className="scaneda-locale-card scaneda-locale-card-dark">
                <span className="scaneda-locale-pill">EN</span>
                <Image
                  src="/brand/scaneda/scaneda_white_logo.png"
                  alt="English version Scaneda logo"
                  width={180}
                  height={68}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="scaneda-section" id="features">
        <div className="scaneda-container">
          <div className="scaneda-section-heading">
            <span className="scaneda-kicker">Почему Scaneda</span>
            <h2>Лендинг строит ощущение технологичного и уверенного бренда с первого экрана.</h2>
          </div>
          <div className="scaneda-feature-grid">
            <article className="scaneda-feature-card">
              <h3>Черный navbar, зеленый акцент</h3>
              <p>
                Контрастная шапка с фирменным зеленым тоном логотипа создает
                сильный бренд-сигнал и хорошо читается на любом экране.
              </p>
            </article>
            <article className="scaneda-feature-card">
              <h3>Apple-like визуальный ритм</h3>
              <p>
                Спокойная типографика, воздух, мягкие градиенты и точные отступы
                дают ощущение дорогого digital-продукта.
              </p>
            </article>
            <article className="scaneda-feature-card">
              <h3>Mobile responsive в приоритете</h3>
              <p>
                Сетка, блоки и кнопки адаптированы под телефонный сценарий, где
                пользователи чаще всего и открывают QR-меню.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="scaneda-section scaneda-section-dark" id="flow">
        <div className="scaneda-container">
          <div className="scaneda-section-heading">
            <span className="scaneda-kicker">Как это работает</span>
            <h2>Простой сценарий внедрения без лишней нагрузки на команду ресторана.</h2>
          </div>
          <div className="scaneda-steps">
            <article>
              <span>01</span>
              <h3>Брендируем пространство</h3>
              <p>Логотип, цвета и локализация сразу подстраиваются под подачу заведения.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Настраиваем меню</h3>
              <p>Категории, позиции и описания публикуются в чистой и понятной структуре.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Запускаем на scaneda.online</h3>
              <p>Гости получают быстрый доступ к меню, а команда легко обновляет контент.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="scaneda-section" id="contact">
        <div className="scaneda-container">
          <div className="scaneda-cta">
            <div>
              <span className="scaneda-kicker">Готово к запуску</span>
              <h2>Создайте аккуратный digital-first вход для гостей вместе со Scaneda.</h2>
              <p>
                Один экран, сильная айдентика, понятная структура и адаптация под
                мобильный пользовательский путь.
              </p>
            </div>
            <a href="mailto:hello@scaneda.online" className="scaneda-button scaneda-button-primary">
              hello@scaneda.online
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
