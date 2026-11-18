import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, BookOpen, Check, Clock3, Layers3, Menu, Sparkles, X } from 'lucide-react'
import './index.css'

const chapters = [
  ['intro', '01', 'Как устроена система', 'Сначала логика — потом формулы'],
  ['time', '02', 'Когда происходит действие', 'Past · Present · Future'],
  ['view', '03', 'Как мы видим действие', 'Simple · Continuous'],
  ['perfect', '04', 'Что такое Perfect', 'Связь с моментом отсчёта'],
  ['builder', '05', 'Собираем формулу', 'Соединяем характеристики'],
]
const periods = {
  Past: { ru: 'Прошлое', desc: 'Действие или ситуация относится к периоду до настоящего момента.', color: 'rose', example: 'Yesterday, I read a book.' },
  Present: { ru: 'Настоящее', desc: 'Говорим о настоящем периоде, факте, привычке или связи с текущим моментом.', color: 'mint', example: 'I read every evening.' },
  Future: { ru: 'Будущее', desc: 'Действие или ситуация относится к будущему.', color: 'blue', example: 'I will read tomorrow.' },
}
function App() {
  const [active, setActive] = useState('intro')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [time, setTime] = useState('Past')
  const [aspect, setAspect] = useState('Continuous')
  const [perfect, setPerfect] = useState(false)
  const goTo = (id) => {
    setActive(id); setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  function formula() {
    if (perfect && aspect === 'Continuous') return time === 'Past' ? ['had been', 'V-ing', 'Past Perfect Continuous'] : time === 'Present' ? ['have / has been', 'V-ing', 'Present Perfect Continuous'] : ['will have been', 'V-ing', 'Future Perfect Continuous']
    if (perfect) return time === 'Past' ? ['had', 'V3', 'Past Perfect'] : time === 'Present' ? ['have / has', 'V3', 'Present Perfect'] : ['will have', 'V3', 'Future Perfect']
    if (aspect === 'Continuous') return time === 'Past' ? ['was / were', 'V-ing', 'Past Continuous'] : time === 'Present' ? ['am / is / are', 'V-ing', 'Present Continuous'] : ['will be', 'V-ing', 'Future Continuous']
    return time === 'Past' ? ['V2', '', 'Past Simple'] : time === 'Present' ? ['V1 (s / es)', '', 'Present Simple'] : ['will', 'V1', 'Future Simple']
  }
  const result = formula()
  return <div className="site-shell">
    <header className="topbar">
      <a className="brand" href="#intro"><span className="brand-mark"><BookOpen size={18}/></span><span>english<span className="brand-light">tenses</span></span></a>
      <div className="topbar-right"><span className="theory-pill"><i/> только теория</span><button className="mobile-menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Меню">{mobileOpen ? <X/> : <Menu/>}</button></div>
    </header>
    <div className="page-layout">
      <aside className={mobileOpen ? 'sidebar sidebar-open' : 'sidebar'}>
        <div className="sidebar-label">СОДЕРЖАНИЕ</div>
        <nav>{chapters.map(c => <button key={c[0]} className={active === c[0] ? 'nav-item active' : 'nav-item'} onClick={() => goTo(c[0])}><span className="nav-number">{c[1]}</span><span className="nav-copy"><strong>{c[2]}</strong><small>{c[3]}</small></span></button>)}</nav>
        <div className="sidebar-note"><Sparkles size={16}/><p>Понимай систему, а не заучивай 12 формул.</p></div>
        <div className="sidebar-footer">ENGLISH GRAMMAR · 2026</div>
      </aside>
      <main className="content">
        <section className="hero-section" id="intro">
          <div className="eyebrow"><i/> ИНТЕРАКТИВНЫЙ УЧЕБНИК</div>
          <div className="hero-grid">
            <div className="hero-copy"><h1>Времена английского.<br/><em>Без зубрёжки.</em></h1><p className="hero-lead">12 времён — это не 12 несвязанных правил. Это система, которую можно понять, если разобрать её на несколько простых характеристик.</p><button className="primary-button" onClick={() => goTo('time')}>Начать разбираться <ArrowRight size={17}/></button></div>
            <div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-center"><span>TIME</span><strong>∞</strong><small>one system</small></div><div className="time-node node-past"><i/>PAST</div><div className="time-node node-present"><i/>PRESENT</div><div className="time-node node-future"><i/>FUTURE</div><div className="art-caption">THREE TIME REFERENCES</div></div>
          </div>
          <div className="hero-bottom"><span>ТВОЙ ПУТЬ К ПОНИМАНИЮ</span><span>5 небольших глав ↓</span></div>
        </section>
        <section className="intro-strip"><div className="intro-icon"><Layers3 size={21}/></div><div><b>Одна система. Несколько характеристик.</b><p>Чтобы понять, как образуется время, зададим действию три вопроса: когда оно происходит, как мы его рассматриваем и связано ли оно с другим моментом.</p></div></section>
        <section className="chapter-section" id="time">
          <div className="section-heading"><div className="section-kicker">ГЛАВА 02 · ВРЕМЕННОЙ ОРИЕНТИР</div><h2>Когда происходит <em>действие?</em></h2><p>Первый шаг — определить, к какому временному периоду относится действие.</p></div>
          <div className="time-cards">{Object.entries(periods).map(([key, p]) => <button key={key} className={'time-card ' + p.color + (time === key ? ' selected' : '')} onClick={() => setTime(key)}><span className="card-top">{p.ru}<span>↗</span></span><strong>{key}</strong><span className="card-desc">{p.desc}</span><i className="example">{p.example}</i>{time === key && <small className="chosen"><Check size={12}/> выбрано</small>}</button>)}</div>
          <div className="timeline-panel"><div className="panel-heading"><b>ВРЕМЕННАЯ ШКАЛА</b><span>Выбери период выше</span></div><div className="timeline"><div className={'segment past ' + (time === 'Past' ? 'chosen' : '')}><span>PAST</span></div><div className="segment present"><span>NOW</span><i/></div><div className={'segment future ' + (time === 'Future' ? 'chosen' : '')}><span>FUTURE</span></div></div><div className="timeline-caption"><span>раньше</span><span>момент речи</span><span>позже</span></div><p className="selected-explanation"><i className={'dot ' + periods[time].color}/><span><b>{time} — {periods[time].ru.toLowerCase()}.</b> {periods[time].desc}</span></p></div>
        </section>
        <section className="chapter-section" id="view">
          <div className="section-heading"><div className="section-kicker">ГЛАВА 03 · ВЗГЛЯД НА ДЕЙСТВИЕ</div><h2>Как мы рассматриваем <em>действие?</em></h2><p>Одно и то же событие можно представить как факт или показать изнутри — как процесс.</p></div>
          <div className="view-grid">
            <article className="view-card"><div className="view-card-label">01 / ФАКТ ИЛИ СОБЫТИЕ</div><h3>Simple</h3><p>Действие рассматривается целиком: как факт, привычка, повторение или отдельное событие. Акцент не на том, как долго оно длилось.</p><div className="mini-visual simple-visual"><i/><span/><i/></div><div className="view-example"><b>I work every day.</b><span>Я работаю каждый день.</span></div></article>
            <article className="view-card continuous-card"><div className="view-card-label">02 / ПРОЦЕСС</div><h3>Continuous</h3><p>Действие показывается в процессе протекания. Мы словно смотрим на него в определённый момент или период.</p><div className="mini-visual process-visual"><span/><i/></div><div className="view-example"><b>I am working now.</b><span>Я сейчас работаю.</span></div></article>
          </div>
          <div className="grammar-note"><b>✳</b><p><strong>Важно:</strong> Simple не означает только «один раз». В Simple действие может повторяться регулярно. Главное — мы не выделяем его протекание как процесс.</p></div>
        </section>
        <section className="chapter-section" id="perfect">
          <div className="section-heading"><div className="section-kicker">ГЛАВА 04 · СВЯЗЬ С МОМЕНТОМ</div><h2>Что добавляет <em>Perfect?</em></h2><p>Perfect показывает, что действие произошло до определённого момента отсчёта. Этот момент может быть в прошлом, настоящем или будущем.</p></div>
          <div className="perfect-panel"><div className="perfect-copy"><span className="perfect-tag">PERFECT = ПРЕДШЕСТВОВАНИЕ</span><h3>Сначала действие.<br/>Потом — точка отсчёта.</h3><p>Нас интересует не просто событие, а его связь с более поздним моментом: результат, опыт или то, что уже было сделано к этому времени.</p><div className="perfect-formula"><span>HAVE</span><b>+</b><span>V3</span></div><small>В Perfect Continuous добавляется BEEN + V-ing.</small></div><div className="perfect-visual"><div className="section-kicker">ДО МОМЕНТА ОТСЧЁТА</div><div className="perfect-track"><i/><b/></div><div className="track-labels"><span>действие</span><span>момент отсчёта</span></div><div className="perfect-callout"><Clock3 size={17}/> Действие уже произошло к выбранному моменту.</div></div></div>
          <div className="grammar-note"><b>✳</b><p><strong>Не путай:</strong> Perfect — это не отдельное «прошедшее время». Он задаёт отношение между действием и моментом отсчёта. Поэтому существуют Present Perfect, Past Perfect и Future Perfect.</p></div>
        </section>
        <section className="chapter-section builder-section" id="builder">
          <div className="section-heading"><div className="section-kicker">ГЛАВА 05 · СОБИРАЕМ СИСТЕМУ</div><h2>Из характеристик — <em>в формулу.</em></h2><p>Меняй параметры и наблюдай, как меняется грамматическая конструкция. Это визуальная модель теории, а не тест.</p></div>
          <div className="builder-card"><div className="builder-controls">
            <div className="control-group"><label>01 · ВРЕМЕННОЙ ОРИЕНТИР</label><div className="segmented">{['Past','Present','Future'].map(v => <button key={v} className={time === v ? 'active' : ''} onClick={() => setTime(v)}>{v}</button>)}</div></div>
            <div className="control-group"><label>02 · ВЗГЛЯД НА ДЕЙСТВИЕ</label><div className="segmented two">{['Simple','Continuous'].map(v => <button key={v} className={aspect === v ? 'active' : ''} onClick={() => setAspect(v)}>{v}</button>)}</div></div>
            <button className={'perfect-toggle ' + (perfect ? 'on' : '')} onClick={() => setPerfect(!perfect)}><span className="toggle-box">{perfect && <Check size={13}/>}</span><span><b>Добавить Perfect</b><small>Действие предшествует моменту отсчёта</small></span><i>{perfect ? 'ON' : 'OFF'}</i></button>
          </div><div className="builder-result"><span className="result-eyebrow">ПОЛУЧИВШАЯСЯ КОНСТРУКЦИЯ</span><h3>{result[2]}</h3><div className="formula-box"><strong>{result[0]}</strong>{result[1] && <><i>+</i><b>{result[1]}</b></>}</div><p>{perfect ? 'Perfect добавляет связь с более поздним моментом отсчёта.' : aspect === 'Continuous' ? 'Continuous показывает действие в процессе и использует форму BE + V-ing.' : 'Simple представляет действие как факт, привычку или целое событие.'}</p><div className="legend"><span><i/> вспомогательная часть</span><span><b/> смысловой глагол</span></div></div></div>
          <div className="next-chapter"><div><span>СЛЕДУЮЩИЙ ЭТАП</span><h3>12 времён английского языка</h3><p>Теперь можно разобрать каждую конструкцию отдельно — от смысла до готовой формулы.</p></div><BookOpen size={28}/></div>
        </section>
        <footer className="footer"><a className="brand" href="#intro"><span className="brand-mark"><BookOpen size={16}/></span>english<span className="brand-light">tenses</span></a><span>Учимся понимать, а не заучивать.</span><span>© 2026</span></footer>
      </main>
    </div>
  </div>
}
createRoot(document.getElementById('root')).render(<App />)
