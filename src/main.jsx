import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, BookOpen, Check, Clock3, Layers3, Menu, Sparkles, X } from 'lucide-react'
import './index.css'

const chapters = [
  ['intro', '01', 'Как устроена система', 'Сначала логика — потом формулы'],
  ['concepts', '02', 'Основные характеристики', 'Время · аспект · Perfect'],
  ['builder', '03', 'Собираем формулу', 'Соединяем характеристики'],
  ['tenses', '04', '12 английских времён', 'Полный справочник'],
]
const periods = {
  Past: { ru: 'Прошлое', desc: 'Действие или ситуация относится к периоду до настоящего момента.', color: 'rose', example: 'Yesterday, I read a book.' },
  Present: { ru: 'Настоящее', desc: 'Говорим о настоящем периоде, факте, привычке или связи с текущим моментом.', color: 'mint', example: 'I read every evening.' },
  Future: { ru: 'Будущее', desc: 'Действие или ситуация относится к будущему.', color: 'blue', example: 'I will read tomorrow.' },
}
const tenseDetails = {
  "Past Simple": [
    "V2",
    "did not + V1",
    "Did + subject + V1?",
    "Завершённые события в прошлом, последовательность событий, прошлые привычки и состояния.",
    "I watched a film yesterday.",
    "Я посмотрел(а) фильм вчера.",
    "Past Simple сообщает о событии как о факте прошлого. Время или контекст показывают, что речь идёт о прошлом.",
    "В отличие от Past Continuous, здесь действие не показывается изнутри как процесс. В отличие от Past Perfect, не подчёркивается, что оно произошло раньше другой прошлой точки."
  ],
  "Past Continuous": [
    "was / were + V-ing",
    "was / were not + V-ing",
    "Was / Were + subject + V-ing?",
    "Процесс в определённый момент прошлого; фон для другого события; два параллельных процесса.",
    "I was cooking when you called.",
    "Я готовил(а), когда ты позвонил(а).",
    "Мы мысленно переносимся в прошлый момент и видим действие в процессе. Оно могло начаться раньше и закончиться позже.",
    "Past Simple называет событие, а Past Continuous показывает процесс вокруг выбранного момента."
  ],
  "Past Perfect": [
    "had + V3",
    "had not + V3",
    "Had + subject + V3?",
    "Действие завершилось до определённого момента или другого события в прошлом.",
    "They had eaten before the train arrived.",
    "Они поели до прибытия поезда.",
    "Точка отсчёта находится в прошлом. Действие с Past Perfect предшествует этой точке.",
    "Past Simple описывает событие в прошлом; Past Perfect помогает показать, что одно прошлое действие случилось раньше другого."
  ],
  "Past Perfect Continuous": [
    "had been + V-ing",
    "had not been + V-ing",
    "Had + subject + been + V-ing?",
    "Процесс продолжался до определённого момента в прошлом; важны длительность или сам ход процесса.",
    "He had been working for hours before he took a break.",
    "Он работал уже несколько часов, прежде чем сделал перерыв.",
    "Процесс начался раньше прошлой точки отсчёта и продолжался до неё или незадолго до неё.",
    "Past Perfect подчёркивает завершённость/результат предшествующего действия; Past Perfect Continuous — длительность или процесс."
  ],
  "Present Simple": [
    "V1 / V1 + s(es)",
    "do / does not + V1",
    "Do / Does + subject + V1?",
    "Регулярные действия, факты, состояния, расписания и общие закономерности.",
    "The library opens at nine.",
    "Библиотека открывается в девять.",
    "Present Simple описывает то, что считается обычным, постоянным или истинным в рассматриваемом настоящем периоде.",
    "Present Continuous показывает временный процесс или ситуацию вокруг настоящего момента, а Present Simple — факт, привычку или состояние."
  ],
  "Present Continuous": [
    "am / is / are + V-ing",
    "am / is / are not + V-ing",
    "Am / Is / Are + subject + V-ing?",
    "Процесс сейчас или в текущий период; временная ситуация; меняющаяся тенденция; личная договорённость на будущее.",
    "I am learning Spanish this year.",
    "В этом году я изучаю испанский.",
    "Действие рассматривается в процессе и связано с текущим периодом. Оно не обязательно происходит именно в секунду речи.",
    "Present Simple представляет привычку или факт; Present Continuous — процесс или временную ситуацию."
  ],
  "Present Perfect": [
    "have / has + V3",
    "have / has not + V3",
    "Have / Has + subject + V3?",
    "Опыт к настоящему моменту, актуальный результат, изменения и период, который ещё не завершился.",
    "She has just finished her homework.",
    "Она только что закончила домашнее задание.",
    "Действие предшествует настоящему моменту, но важно его отношение к настоящему: результат, опыт или незавершённый период.",
    "Past Simple обычно помещает событие в завершённое прошлое время; Present Perfect связывает прошлое действие с настоящим."
  ],
  "Present Perfect Continuous": [
    "have / has been + V-ing",
    "have / has not been + V-ing",
    "Have / Has + subject + been + V-ing?",
    "Процесс начался раньше и продолжается сейчас или недавно завершился; акцент на длительности и активности.",
    "It has been raining all morning.",
    "Дождь идёт всё утро.",
    "Процесс тянется из прошлого к настоящему или оставляет заметные признаки в настоящем.",
    "Present Perfect часто выделяет результат или факт; Present Perfect Continuous — длительность и ход процесса."
  ],
  "Future Simple": [
    "will + V1",
    "will not + V1",
    "Will + subject + V1?",
    "Прогнозы, обещания, предложения и решения, принимаемые в момент речи.",
    "I will help you with the bags.",
    "Я помогу тебе с сумками.",
    "Говорящий представляет действие как будущее событие. WILL — вспомогательный глагол, после него используется начальная форма.",
    "Future Continuous показывает процесс в будущий момент, а Future Perfect — действие, завершённое к будущей точке."
  ],
  "Future Continuous": [
    "will be + V-ing",
    "will not be + V-ing",
    "Will + subject + be + V-ing?",
    "Процесс в определённый момент будущего; ожидаемое течение событий; вежливые вопросы о планах.",
    "At noon, we will be having lunch.",
    "В полдень мы будем обедать.",
    "Мы переносимся в будущий момент и рассматриваем действие в процессе.",
    "Future Simple называет будущее событие, а Future Continuous показывает, что в выбранный момент оно будет происходить."
  ],
  "Future Perfect": [
    "will have + V3",
    "will not have + V3",
    "Will + subject + have + V3?",
    "Действие будет завершено до определённого момента в будущем.",
    "By next week, they will have moved house.",
    "К следующей неделе они уже переедут.",
    "Будущая точка отсчёта задаётся словами вроде by Friday. К этому моменту действие будет завершено.",
    "Future Simple говорит о будущем событии; Future Perfect — о завершённости до будущей точки."
  ],
  "Future Perfect Continuous": [
    "will have been + V-ing",
    "will not have been + V-ing",
    "Will + subject + have been + V-ing?",
    "Длительность процесса к определённому моменту в будущем.",
    "By May, I will have been living here for a year.",
    "К маю будет год, как я здесь живу.",
    "Мы смотрим из будущей точки назад на процесс и оцениваем, сколько времени он к тому моменту будет продолжаться.",
    "Future Perfect подчёркивает завершённость действия к сроку, а Future Perfect Continuous — продолжительность процесса к этому сроку."
  ]
}

function App() {
  const [active, setActive] = useState('intro')
  const [conceptPage, setConceptPage] = useState(0)
  const [simplePattern, setSimplePattern] = useState('regular')
  const [voiceMode, setVoiceMode] = useState('active')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [time, setTime] = useState('Past')
  const [aspect, setAspect] = useState('Continuous')
  const [perfect, setPerfect] = useState(false)
  const [passive, setPassive] = useState(false)
  const [selectedTense, setSelectedTense] = useState(null)
  const [detailOrigin, setDetailOrigin] = useState('tenses')
  const [subject, setSubject] = useState('I')
  const openTense = (name) => { setDetailOrigin(active); setSelectedTense(name); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const closeTense = () => { setSelectedTense(null); setActive(detailOrigin); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const goTo = (id) => {
    setActive(id); setMobileOpen(false); setSelectedTense(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const irregular = { go:['went','gone'], eat:['ate','eaten'], see:['saw','seen'], write:['wrote','written'], do:['did','done'], have:['had','had'], make:['made','made'], take:['took','taken'], read:['read','read'], come:['came','come'], buy:['bought','bought'], speak:['spoke','spoken'], be:['was / were','been'] }
  const baseVerb = 'ask'
  const pastVerb = irregular[baseVerb]?.[0] || (baseVerb.endsWith('e') ? baseVerb + 'd' : baseVerb.endsWith('y') && !/[aeiou]y$/.test(baseVerb) ? baseVerb.slice(0,-1)+'ied' : baseVerb + 'ed')
  const thirdVerb = irregular[baseVerb]?.[1] || (baseVerb.endsWith('e') ? baseVerb + 'd' : baseVerb.endsWith('y') && !/[aeiou]y$/.test(baseVerb) ? baseVerb.slice(0,-1)+'ied' : baseVerb + 'ed')
  const ingVerb = baseVerb.endsWith('ie') ? baseVerb.slice(0,-2)+'ying' : baseVerb.endsWith('e') && !baseVerb.endsWith('ee') ? baseVerb.slice(0,-1)+'ing' : baseVerb+'ing'
  const thirdPerson = /(?:s|sh|ch|x|z|o)$/.test(baseVerb) ? baseVerb+'es' : baseVerb.endsWith('y') && !/[aeiou]y$/.test(baseVerb) ? baseVerb.slice(0,-1)+'ies' : baseVerb+'s'
  const beForm = time === 'Past' ? (['I','He','She','It'].includes(subject) ? 'was' : 'were') : (subject === 'I' ? 'am' : ['He','She','It'].includes(subject) ? 'is' : 'are')
  const haveForm = ['He','She','It'].includes(subject) ? 'has' : 'have'
  const conjugated = perfect ? (aspect === 'Continuous' ? `${time === 'Past' ? 'had' : time === 'Future' ? 'will have' : haveForm} been ${ingVerb}` : `${time === 'Past' ? 'had' : time === 'Future' ? 'will have' : haveForm} ${thirdVerb}`) : aspect === 'Continuous' ? `${time === 'Future' ? 'will be' : beForm} ${ingVerb}` : time === 'Past' ? pastVerb : time === 'Future' ? `will ${baseVerb}` : ['He','She','It'].includes(subject) ? thirdPerson : baseVerb
  const sampleSentence = `${subject} ${conjugated}.`
  function formula() {
    if (perfect && aspect === 'Continuous') return time === 'Past' ? ['had been', 'V-ing', 'Past Perfect Continuous'] : time === 'Present' ? ['have / has been', 'V-ing', 'Present Perfect Continuous'] : ['will have been', 'V-ing', 'Future Perfect Continuous']
    if (perfect) return time === 'Past' ? ['had', 'V3', 'Past Perfect'] : time === 'Present' ? ['have / has', 'V3', 'Present Perfect'] : ['will have', 'V3', 'Future Perfect']
    if (aspect === 'Continuous') return time === 'Past' ? ['was / were', 'V-ing', 'Past Continuous'] : time === 'Present' ? ['am / is / are', 'V-ing', 'Present Continuous'] : ['will be', 'V-ing', 'Future Continuous']
    return time === 'Past' ? ['V2', '', 'Past Simple'] : time === 'Present' ? ['V1 (s / es)', '', 'Present Simple'] : ['will', 'V1', 'Future Simple']
  }
  const result = formula()
  const passiveUnsupported = perfect && aspect === 'Continuous'
  const passiveAux = perfect
    ? (time === 'Past' ? 'had been' : time === 'Future' ? 'will have been' : 'has been')
    : aspect === 'Continuous'
      ? (time === 'Past' ? 'was being' : time === 'Future' ? 'will be being' : 'is being')
      : (time === 'Past' ? 'was' : time === 'Future' ? 'will be' : 'is')
  const passiveResult = [passiveAux, 'V3', `${result[2]} Passive`]
  const shownResult = passive ? passiveResult : result
  const shownSentence = passive ? `The question ${passiveAux} ${thirdVerb}.` : sampleSentence
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
      <main className="content" data-active={active}>
        <section className="hero-section" id="intro">
          <div className="eyebrow"><i/> ИНТЕРАКТИВНЫЙ УЧЕБНИК</div>
          <div className="hero-grid">
            <div className="hero-copy"><h1>Времена английского.<br/><em>Без зубрёжки.</em></h1><p className="hero-lead">12 времён — это не 12 несвязанных правил. Это система, которую можно понять, если разобрать её на несколько простых характеристик.</p><button className="primary-button" onClick={() => goTo('concepts')}>Начать разбираться <ArrowRight size={17}/></button></div>
            <div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-center"><span>TIME</span><strong>∞</strong><small>one system</small></div><div className="time-node node-past"><i/>PAST</div><div className="time-node node-present"><i/>PRESENT</div><div className="time-node node-future"><i/>FUTURE</div><div className="art-caption">THREE TIME REFERENCES</div></div>
          </div>
          <div className="hero-bottom"><span>ТВОЙ ПУТЬ К ПОНИМАНИЮ</span><span>4 шага ↓</span></div>
        </section>
        <section className="intro-strip"><div className="intro-icon"><Layers3 size={21}/></div><div><b>Одна система. Несколько характеристик.</b><p>Чтобы понять, как образуется время, зададим действию три вопроса: когда оно происходит, как мы его рассматриваем и связано ли оно с другим моментом.</p></div></section>
        <section className="chapter-section builder-section" id="builder">
          <div className="section-heading"><div className="section-kicker">ГЛАВА 03 · СОБИРАЕМ СИСТЕМУ</div><h2>Из характеристик — <em>в формулу.</em></h2><p>Меняй параметры и наблюдай, как меняется грамматическая конструкция. Это визуальная модель теории, а не тест.</p></div>
          <div className="builder-card"><div className="builder-controls">
            <div className="control-group"><label>01 · ВРЕМЕННОЙ ОРИЕНТИР</label><div className="segmented">{['Past','Present','Future'].map(v => <button key={v} className={time === v ? 'active' : ''} onClick={() => setTime(v)}>{v}</button>)}</div></div>
            <div className="control-group"><label>02 · ВЗГЛЯД НА ДЕЙСТВИЕ</label><div className="segmented two">{['Simple','Continuous'].map(v => <button key={v} className={aspect === v ? 'active' : ''} onClick={() => setAspect(v)}>{v}</button>)}</div></div>
            <button className={'perfect-toggle ' + (perfect ? 'on' : '')} onClick={() => setPerfect(!perfect)}><span className="toggle-box">{perfect && <Check size={13}/>}</span><span><b>Добавить Perfect</b><small>Действие предшествует моменту отсчёта</small></span><i>{perfect ? 'ON' : 'OFF'}</i></button>
            <div className="control-group"><label>03 · ПОДЛЕЖАЩЕЕ</label><div className="subject-picker"><select value={subject} onChange={e => setSubject(e.target.value)}><option>I</option><option>You</option><option>He</option><option>She</option><option>It</option><option>We</option><option>They</option></select></div></div>
          </div><div className="builder-result"><span className="result-eyebrow">ПОЛУЧИВШАЯСЯ КОНСТРУКЦИЯ</span><h3>{shownResult[2]}</h3><div className="legend formula-legend"><span><i/> вспомогательная часть</span><span><b/> смысловой глагол</span></div><div className="formula-box"><strong>{shownResult[0]}</strong>{shownResult[1] && <><i>+</i><b>{shownResult[1]}</b></>}</div><div className="live-verb"><span>{passive ? 'ПРИМЕР PASSIVE VOICE' : 'КАК МЕНЯЕТСЯ ГЛАГОЛ'}</span><strong key={shownSentence} className="verb-animation">{passive ? (passiveUnsupported ? 'В этой форме Passive обычно не используется.' : shownSentence) : shownSentence}</strong><small>{passive ? (passiveUnsupported ? 'Perfect Continuous Passive грамматически возможно, но крайне редко и обычно избегается.' : 'В Passive Voice подлежащее обозначает того, на кого направлено действие. Исполнитель действия может быть не указан.') : 'Форма обновляется при изменении времени, аспекта, Perfect или подлежащего.'}</small></div><p>{passive ? 'Passive Voice образуется с помощью формы BE в выбранном времени и смыслового глагола в V3.' : perfect ? 'Perfect добавляет связь с более поздним моментом отсчёта.' : aspect === 'Continuous' ? 'Continuous показывает действие в процессе и использует форму BE + V-ing.' : 'Simple представляет действие как факт, привычку или целое событие.'}</p><button className={'passive-toggle ' + (passive ? 'on' : '')} onClick={() => setPassive(!passive)} disabled={!passive && passiveUnsupported}>{passive ? 'Вернуться к Active Voice' : 'Образовать Passive Voice'} <span>⇄</span></button>{passiveUnsupported && !passive && <small className="passive-unavailable-note">Функция недоступна: эта форма Passive Voice практически не используется.</small>}<button className="detail-link builder-detail-link" onClick={() => openTense(result[2])}>Прочитать подробнее <span>→</span></button></div></div>
          <div className="next-chapter"><div><span>СЛЕДУЮЩИЙ ЭТАП</span><h3>12 английских времён</h3><p>Перейди к справочнику и посмотри, как характеристики складываются в конкретные формы.</p></div><BookOpen size={28}/></div>
        </section>

        <section className="chapter-section concepts-section" id="concepts">
          <div className="section-heading"><div className="section-kicker">ГЛАВА 02 · ОСНОВНЫЕ ХАРАКТЕРИСТИКИ</div><h2>Три вопроса — <em>одна система.</em></h2><p>Разберём, как время, способ представления действия и связь с моментом отсчёта работают вместе.</p></div>
          <div className="concept-page-nav" aria-label="Навигация по разделам главы">
            <button type="button" onClick={() => setConceptPage(p => Math.max(0, p - 1))} disabled={conceptPage === 0} aria-label="Предыдущая страница">‹</button>
            <div><span>СТРАНИЦА {String(conceptPage + 1).padStart(2, '0')} / 03</span><div className="concept-page-dots">{['Время','Аспект','Perfect'].map((name, i) => <button type="button" key={name} className={conceptPage === i ? 'active' : ''} onClick={() => setConceptPage(i)} aria-label={name}/>)}</div></div>
            <button type="button" onClick={() => setConceptPage(p => Math.min(2, p + 1))} disabled={conceptPage === 2} aria-label="Следующая страница">›</button>
          </div>
          <div className={`concept-part ${conceptPage === 0 ? "concept-part-active" : ""}`} id="time">
          <div className="section-heading"><div className="section-kicker">ЧАСТЬ 1 · ВРЕМЕННОЙ ОРИЕНТИР</div><h2>Когда происходит <em>действие?</em></h2><p>Первый шаг — определить, к какому временному периоду относится действие.</p></div>
          <div className="time-cards">{Object.entries(periods).map(([key, p]) => <button key={key} className={'time-card ' + p.color + (time === key ? ' selected' : '')} onClick={() => setTime(key)}><span className="card-top">{p.ru}<span>↗</span></span><strong>{key}</strong><span className="card-desc">{p.desc}</span><i className="example">{p.example}</i>{time === key && <small className="chosen"><Check size={12}/> выбрано</small>}</button>)}</div>
          <div className="timeline-panel"><div className="panel-heading"><b>ВРЕМЕННАЯ ШКАЛА</b><span>Выбери период выше</span></div><div className="timeline"><div className={'segment past ' + (time === 'Past' ? 'chosen' : '')}><span>PAST</span></div><div className="segment present"><span>NOW</span><i/></div><div className={'segment future ' + (time === 'Future' ? 'chosen' : '')}><span>FUTURE</span></div></div><div className="timeline-caption"><span>раньше</span><span>момент речи</span><span>позже</span></div><p className="selected-explanation"><i className={'dot ' + periods[time].color}/><span><b>{time} — {periods[time].ru.toLowerCase()}.</b> {periods[time].desc}</span></p></div>
        </div>
        <div className={`concept-part ${conceptPage === 1 ? "concept-part-active" : ""}`} id="view">
          <div className="section-heading"><div className="section-kicker">ЧАСТЬ 2 · ВЗГЛЯД НА ДЕЙСТВИЕ</div><h2>Как мы рассматриваем <em>действие?</em></h2><p>Одно и то же событие можно представить как факт или показать изнутри — как процесс.</p></div>
          <div className="view-grid">
            <article className="view-card"><div className="view-card-label">01 / ФАКТ ИЛИ СОБЫТИЕ</div><h3>Simple</h3><p>Действие рассматривается целиком: как факт, привычка, повторение или отдельное событие. Акцент не на том, как долго оно длилось.</p><div className="simple-choice" role="group" aria-label="Характер действия">
                <button type="button" className={simplePattern === 'single' ? 'active' : ''} onClick={() => setSimplePattern('single')}>Разовое действие</button>
                <button type="button" className={simplePattern === 'regular' ? 'active' : ''} onClick={() => setSimplePattern('regular')}>Регулярное действие</button>
              </div>
              <div className={'mini-visual simple-visual ' + (simplePattern === 'single' ? 'single-event' : 'repeated-events')} aria-label={simplePattern === 'single' ? 'Одно событие на временной линии' : 'Повторяющиеся события на временной линии'}>
                <span className="simple-axis"/>
                {simplePattern === 'single' ? <i className="event-flag"/> : <>{[12,31,50,69,88].map((pos) => <i key={pos} className="event-flag" style={{left: pos + '%'}}/>)}</>}
              </div>
              <div className="view-example"><b>{simplePattern === 'single' ? 'I visited London last year.' : 'I work every day.'}</b><span>{simplePattern === 'single' ? 'Я посетил(а) Лондон в прошлом году.' : 'Я работаю каждый день.'}</span></div>
              <p className="simple-pattern-note">{simplePattern === 'single' ? 'Один флажок — одно событие, представленное как целый факт.' : 'Несколько флажков — действие повторяется регулярно, но каждое повторение всё равно рассматривается как факт.'}</p></article>
            <article className="view-card continuous-card"><div className="view-card-label">02 / ПРОЦЕСС</div><h3>Continuous</h3><p>Действие показывается в процессе протекания. Мы словно смотрим на него в определённый момент или период.</p><div className="mini-visual process-visual"><span/><i/></div><div className="view-example"><b>I am working now.</b><span>Я сейчас работаю.</span></div></article>
          </div>
          <div className="grammar-note"><b>✳</b><p><strong>Важно:</strong> Simple не означает только «один раз». В Simple действие может повторяться регулярно. Главное — мы не выделяем его протекание как процесс.</p></div>
        </div>
        <div className={`concept-part ${conceptPage === 2 ? "concept-part-active" : ""}`} id="perfect">
          <div className="section-heading"><div className="section-kicker">ЧАСТЬ 3 · СВЯЗЬ С МОМЕНТОМ</div><h2>Что добавляет <em>Perfect?</em></h2><p>Perfect показывает, что действие произошло до определённого момента отсчёта. Этот момент может быть в прошлом, настоящем или будущем.</p></div>
          <div className="perfect-panel"><div className="perfect-copy"><span className="perfect-tag">PERFECT = ПРЕДШЕСТВОВАНИЕ</span><h3>Сначала действие.<br/>Потом — точка отсчёта.</h3><p>Нас интересует не просто событие, а его связь с более поздним моментом: результат, опыт или то, что уже было сделано к этому времени.</p><p className="perfect-rule">В Perfect вспомогательный глагол HAVE принимает форму, которая соответствует выбранному временному ориентиру. В настоящем времени форма также зависит от подлежащего.</p><div className="perfect-time-forms"><div><small>PAST</small><strong>HAD</strong></div><div><small>PRESENT</small><strong>HAVE / HAS</strong><span>HAS — he / she / it</span></div><div><small>FUTURE</small><strong>WILL HAVE</strong></div></div><p className="perfect-structure"><b>Perfect:</b> нужная форма HAVE + V3<br/><b>Perfect Continuous:</b> нужная форма HAVE + BEEN + V-ing</p></div><div className="perfect-visual"><div className="section-kicker">ДО МОМЕНТА ОТСЧЁТА</div><div className="perfect-track"><i/><b/></div><div className="track-labels"><span>действие</span><span>момент отсчёта</span></div><div className="perfect-callout"><Clock3 size={17}/> Действие уже произошло к выбранному моменту.</div></div></div>
          <div className="grammar-note"><b>✳</b><p><strong>Не путай:</strong> Perfect — это не отдельное «прошедшее время». Он задаёт отношение между действием и моментом отсчёта. Поэтому существуют Present Perfect, Past Perfect и Future Perfect.</p></div>
        </div>
        </section>

        <section className="chapter-section tenses-section" id="tenses">
          <div className="section-heading">
            <div className="section-kicker">ГЛАВА 04 · ПОЛНЫЙ СПРАВОЧНИК</div>
            <h2>12 времён — <em>одна система.</em></h2>
            <p>Каждое время складывается из временного ориентира и способа представить действие. Сравнивай не только формулы, но и то, на чём делает акцент говорящий.</p>
          </div>
          <div className="tense-table-toolbar">
            <div><span className="table-mode-label">РЕЖИМ ТАБЛИЦЫ</span><p>Переключи залог, чтобы сравнить способы образования.</p></div>
            <div className="voice-switch" role="group" aria-label="Выбор залога">
              <button type="button" className={voiceMode === 'active' ? 'active' : ''} onClick={() => setVoiceMode('active')}>Active Voice</button>
              <button type="button" className={voiceMode === 'passive' ? 'active' : ''} onClick={() => setVoiceMode('passive')}>Passive Voice</button>
            </div>
          </div>
          <div className="tense-table-wrap">
            <table className="tense-matrix">
              <thead><tr><th scope="col">ВРЕМЯ</th><th scope="col">SIMPLE</th><th scope="col">CONTINUOUS</th><th scope="col">PERFECT</th><th scope="col">PERFECT CONTINUOUS</th></tr></thead>
              <tbody>
                {[
                  {period:'Past',cells:[
                    {name:'Past Simple',formula:['V2','was / were + V3'],markers:'yesterday · last week · ago',example:['I sent the email yesterday.','The email was sent yesterday.'],translation:'Я отправил(а) письмо вчера.',detail:'Завершённый факт в прошлом.'},
                    {name:'Past Continuous',formula:['was / were + V-ing','was / were being + V3'],markers:'at 5 yesterday · while',example:['I was writing the email at five.','The email was being written at five.'],translation:'В пять я писал(а) письмо.',detail:'Процесс в определённый момент прошлого.'},
                    {name:'Past Perfect',formula:['had + V3','had been + V3'],markers:'by · before · by the time',example:['I had sent the email before noon.','The email had been sent before noon.'],translation:'Я отправил(а) письмо до полудня.',detail:'Действие завершилось до прошлой точки отсчёта.'},
                    {name:'Past Perfect Continuous',formula:['had been + V-ing','had been being + V3'],markers:'for · since · before · by the time',example:['I had been writing for an hour before noon.','The email had been being written for an hour before noon.'],translation:'До полудня я писал(а) уже час.',detail:'Длительность процесса до прошлой точки.',rare:true}
                  ]},
                  {period:'Present',cells:[
                    {name:'Present Simple',formula:['V1 / V1 + s','am / is / are + V3'],markers:'always · usually · every day',example:['She sends emails every day.','Emails are sent every day.'],translation:'Она отправляет письма каждый день.',detail:'Факт, привычка или регулярное действие.'},
                    {name:'Present Continuous',formula:['am / is / are + V-ing','am / is / are being + V3'],markers:'now · at the moment · currently',example:['She is writing an email now.','An email is being written now.'],translation:'Сейчас она пишет письмо.',detail:'Процесс в настоящий момент или период.'},
                    {name:'Present Perfect',formula:['have / has + V3','have / has been + V3'],markers:'already · just · yet · ever · never',example:['She has sent the email.','The email has been sent.'],translation:'Она уже отправила письмо.',detail:'Прошлое действие связано с настоящим результатом.'},
                    {name:'Present Perfect Continuous',formula:['have / has been + V-ing','have / has been being + V3'],markers:'for · since · all day · lately',example:['She has been writing for an hour.','The email has been being written for an hour.'],translation:'Она пишет уже час.',detail:'Процесс начался раньше и продолжается или недавно завершился.',rare:true}
                  ]},
                  {period:'Future',cells:[
                    {name:'Future Simple',formula:['will + V1','will be + V3'],markers:'tomorrow · next week · soon',example:['I will send the email tomorrow.','The email will be sent tomorrow.'],translation:'Я отправлю письмо завтра.',detail:'Будущий факт, решение или прогноз.'},
                    {name:'Future Continuous',formula:['will be + V-ing','will be being + V3'],markers:'this time tomorrow · at 5 tomorrow',example:['I will be writing at five tomorrow.','The email will be being written at five tomorrow.'],translation:'Завтра в пять я буду писать.',detail:'Процесс в определённый момент будущего.',rare:true},
                    {name:'Future Perfect',formula:['will have + V3','will have been + V3'],markers:'by · by then · by next week',example:['I will have sent the email by noon.','The email will have been sent by noon.'],translation:'К полудню я уже отправлю письмо.',detail:'Действие завершится до будущей точки отсчёта.'},
                    {name:'Future Perfect Continuous',formula:['will have been + V-ing','will have been being + V3'],markers:'for · by · by the time',example:['By noon, I will have been writing for an hour.','By noon, the email will have been being written for an hour.'],translation:'К полудню я буду писать уже час.',detail:'Продолжительность процесса к будущей точке.',rare:true}
                  ]}
                ].map(row => <tr key={row.period}>
                  <th scope="row" className="period-heading"><strong>{row.period}</strong><span>{row.period === 'Past' ? 'прошлое' : row.period === 'Present' ? 'настоящее' : 'будущее'}</span></th>
                  {row.cells.map(cell => <td key={cell.name}>
                    <article className="matrix-cell">
                      <h3>{cell.name}</h3>
                      <span className="matrix-label">ФОРМУЛА</span>
                      <strong className="matrix-formula">{cell.formula[voiceMode === 'active' ? 0 : 1]}</strong>
                      {voiceMode === 'passive' && cell.rare && <span className="matrix-caution">Форма грамматически возможна, но крайне редкая и обычно избегается.</span>}
                      <span className="matrix-label">МАРКЕРЫ</span>
                      <p className="matrix-markers">{cell.markers}</p>
                      <span className="matrix-label">ПРИМЕР</span>
                      <b className="matrix-example">{cell.example[voiceMode === 'active' ? 0 : 1]}</b>
                      <span className="matrix-translation">{cell.translation}</span>
                      <p className="matrix-detail">{cell.detail}</p>
                      <button className="matrix-more" type="button" onClick={() => openTense(cell.name)}>Подробнее <span>→</span></button>
                    </article>
                  </td>)}
                </tr>)}
              </tbody>
            </table>
          </div>
          <p className="matrix-footnote">Маркеры — типичные подсказки, а не жёсткие правила: выбор времени зависит прежде всего от смысла и контекста. Формы Perfect Continuous Passive и Future Continuous Passive крайне редки; в обычной речи их, как правило, переформулируют.</p>
          <div className="grammar-note"><b>✳</b><p><strong>Как читать формулы:</strong> V1 — начальная форма глагола; V2 — форма Past Simple; V3 — третья форма (Past Participle). В вопросах и отрицаниях порядок вспомогательных глаголов меняется по общим правилам. Некоторые глаголы состояния обычно не употребляются в Continuous в своём обычном значении.</p></div>
          <div className="grammar-note"><b>✳</b><p><strong>Оговорка о Future:</strong> таблица показывает стандартную учебную модель с WILL. В английском будущее также часто выражается конструкциями be going to, Present Continuous и Present Simple — выбор зависит от смысла и контекста.</p></div>
        </section>

        {selectedTense && <div className="detail-page">
          <div className="detail-topline"><button className="back-link" onClick={closeTense}>← Назад</button><span>СПРАВОЧНИК · {Object.keys(tenseDetails).indexOf(selectedTense)+1} / 12</span></div>
          <div className="detail-hero"><div className="section-kicker">ПОДРОБНОЕ ОБЪЯСНЕНИЕ</div><h1>{selectedTense}</h1><p>{tenseDetails[selectedTense][3]}</p></div>
          <div className="detail-content">
            <section className="detail-block"><div className="section-kicker">01 · КАК ОБРАЗУЕТСЯ</div><h2>Формы предложения</h2><div className="detail-form-grid"><article><small>УТВЕРЖДЕНИЕ</small><strong>{selectedTense === 'Past Simple' ? 'Subject + V2' : selectedTense === 'Present Simple' ? 'Subject + V1 / V1+s' : selectedTense.startsWith('Future') ? 'Subject + '+tenseDetails[selectedTense][0] : 'Subject + '+tenseDetails[selectedTense][0]}</strong></article><article><small>ОТРИЦАНИЕ</small><strong>{tenseDetails[selectedTense][1]}</strong></article><article><small>ВОПРОС</small><strong>{tenseDetails[selectedTense][2]}</strong></article></div><p className="detail-note">В английском языке вспомогательный глагол принимает на себя грамматическую работу: помогает образовать вопрос и отрицание, а смысловой глагол сохраняет нужную форму.</p></section>
            <section className="detail-block"><div className="section-kicker">02 · СМЫСЛ И УПОТРЕБЛЕНИЕ</div><h2>Когда выбирают это время</h2><p>{tenseDetails[selectedTense][3]}</p><div className="detail-example"><b>{tenseDetails[selectedTense][4]}</b><span>{tenseDetails[selectedTense][5]}</span></div><p>{tenseDetails[selectedTense][6]}</p></section>
            <section className="detail-block contrast-block"><div className="section-kicker">03 · НЕ ПУТАТЬ С ПОХОЖИМИ ФОРМАМИ</div><h2>В чём главное отличие</h2><p>{tenseDetails[selectedTense][7]}</p></section>
            <div className="detail-footer-nav"><button className="back-link" onClick={() => setSelectedTense(null)}>← Вернуться ко всем временам</button><span>ENGLISH TENSES · THEORY</span></div>
          </div>
        </div>}
        <footer className="footer"><a className="brand" href="#intro"><span className="brand-mark"><BookOpen size={16}/></span>english<span className="brand-light">tenses</span></a><span>Учимся понимать, а не заучивать.</span><span>© 2026</span></footer>
        <div className="page-navigation"><button onClick={() => goTo(chapters[Math.max(0, chapters.findIndex(c => c[0] === active)-1)][0])} disabled={active === 'intro'}>← Назад</button><span>{String(chapters.findIndex(c => c[0] === active)+1).padStart(2,'0')} / 04</span><button onClick={() => goTo(chapters[Math.min(chapters.length-1, chapters.findIndex(c => c[0] === active)+1)][0])} disabled={active === 'tenses'}>Далее <ArrowRight size={15}/></button></div>
      </main>
    </div>
  </div>
}
createRoot(document.getElementById('root')).render(<App />)
