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
  ['tenses', '06', '12 английских времён', 'Полный справочник'],
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
  const [mobileOpen, setMobileOpen] = useState(false)
  const [time, setTime] = useState('Past')
  const [aspect, setAspect] = useState('Continuous')
  const [perfect, setPerfect] = useState(false)
  const [passive, setPassive] = useState(false)
  const [selectedTense, setSelectedTense] = useState(null)
  const [detailOrigin, setDetailOrigin] = useState('tenses')
  const [verb, setVerb] = useState('work')
  const [subject, setSubject] = useState('I')
  const openTense = (name) => { setDetailOrigin(active); setSelectedTense(name); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const closeTense = () => { setSelectedTense(null); setActive(detailOrigin); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const goTo = (id) => {
    setActive(id); setMobileOpen(false); setSelectedTense(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const irregular = { go:['went','gone'], eat:['ate','eaten'], see:['saw','seen'], write:['wrote','written'], do:['did','done'], have:['had','had'], make:['made','made'], take:['took','taken'], read:['read','read'], come:['came','come'], buy:['bought','bought'], speak:['spoke','spoken'], be:['was / were','been'] }
  const baseVerb = verb.trim().toLowerCase() || 'work'
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
    ? (time === 'Past' ? 'had been' : time === 'Future' ? 'will have been' : `${haveForm} been`)
    : aspect === 'Continuous'
      ? (time === 'Past' ? (['I','He','She','It'].includes(subject) ? 'was being' : 'were being') : time === 'Future' ? 'will be being' : `${beForm} being`)
      : (time === 'Past' ? (['I','He','She','It'].includes(subject) ? 'was' : 'were') : time === 'Future' ? 'will be' : beForm)
  const passiveResult = [passiveAux, 'V3', `${result[2]} Passive`]
  const shownResult = passive ? passiveResult : result
  const shownSentence = passive ? `The task ${passiveAux} ${thirdVerb}.` : sampleSentence
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
          <div className="perfect-panel"><div className="perfect-copy"><span className="perfect-tag">PERFECT = ПРЕДШЕСТВОВАНИЕ</span><h3>Сначала действие.<br/>Потом — точка отсчёта.</h3><p>Нас интересует не просто событие, а его связь с более поздним моментом: результат, опыт или то, что уже было сделано к этому времени.</p><div className="perfect-formula"><span>HAVE / HAS</span><b>+</b><span>V3</span></div><small><strong>HAVE</strong> — с I / you / we / they; <strong>HAS</strong> — с he / she / it.</small><small>В Perfect Continuous: HAVE / HAS + BEEN + V-ing.</small></div><div className="perfect-visual"><div className="section-kicker">ДО МОМЕНТА ОТСЧЁТА</div><div className="perfect-track"><i/><b/></div><div className="track-labels"><span>действие</span><span>момент отсчёта</span></div><div className="perfect-callout"><Clock3 size={17}/> Действие уже произошло к выбранному моменту.</div></div></div>
          <div className="grammar-note"><b>✳</b><p><strong>Не путай:</strong> Perfect — это не отдельное «прошедшее время». Он задаёт отношение между действием и моментом отсчёта. Поэтому существуют Present Perfect, Past Perfect и Future Perfect.</p></div>
        </section>
        <section className="chapter-section builder-section" id="builder">
          <div className="section-heading"><div className="section-kicker">ГЛАВА 05 · СОБИРАЕМ СИСТЕМУ</div><h2>Из характеристик — <em>в формулу.</em></h2><p>Меняй параметры и наблюдай, как меняется грамматическая конструкция. Это визуальная модель теории, а не тест.</p></div>
          <div className="builder-card"><div className="builder-controls">
            <div className="control-group"><label>01 · ВРЕМЕННОЙ ОРИЕНТИР</label><div className="segmented">{['Past','Present','Future'].map(v => <button key={v} className={time === v ? 'active' : ''} onClick={() => setTime(v)}>{v}</button>)}</div></div>
            <div className="control-group"><label>02 · ВЗГЛЯД НА ДЕЙСТВИЕ</label><div className="segmented two">{['Simple','Continuous'].map(v => <button key={v} className={aspect === v ? 'active' : ''} onClick={() => setAspect(v)}>{v}</button>)}</div></div>
            <button className={'perfect-toggle ' + (perfect ? 'on' : '')} onClick={() => setPerfect(!perfect)}><span className="toggle-box">{perfect && <Check size={13}/>}</span><span><b>Добавить Perfect</b><small>Действие предшествует моменту отсчёта</small></span><i>{perfect ? 'ON' : 'OFF'}</i></button>
            <div className="control-group"><label>03 · СМЫСЛОВОЙ ГЛАГОЛ</label><input className="verb-input" value={verb} onChange={e => setVerb(e.target.value.replace(/[^a-zA-Z]/g, ''))} aria-label="Начальная форма глагола" placeholder="Например, work"/><div className="subject-picker"><span>Подлежащее</span><select value={subject} onChange={e => setSubject(e.target.value)}><option>I</option><option>You</option><option>He</option><option>She</option><option>It</option><option>We</option><option>They</option></select></div></div>
          </div><div className="builder-result"><span className="result-eyebrow">ПОЛУЧИВШАЯСЯ КОНСТРУКЦИЯ</span><h3>{shownResult[2]}</h3><div className="formula-box"><strong>{shownResult[0]}</strong>{shownResult[1] && <><i>+</i><b>{shownResult[1]}</b></>}</div><div className="live-verb"><span>{passive ? 'ПРИМЕР PASSIVE VOICE' : 'КАК МЕНЯЕТСЯ ГЛАГОЛ'}</span><strong key={shownSentence} className="verb-animation">{passive ? (passiveUnsupported ? 'В этой форме Passive обычно не используется.' : shownSentence) : shownSentence}</strong><small>{passive ? (passiveUnsupported ? 'Perfect Continuous Passive грамматически возможно, но крайне редко и обычно избегается.' : 'В Passive Voice подлежащее обозначает того, на кого направлено действие. Исполнитель действия может быть не указан.') : 'Форма обновляется при изменении времени, аспекта, Perfect или подлежащего.'}</small></div><p>{passive ? 'Passive Voice образуется с помощью формы BE в выбранном времени и смыслового глагола в V3.' : perfect ? 'Perfect добавляет связь с более поздним моментом отсчёта.' : aspect === 'Continuous' ? 'Continuous показывает действие в процессе и использует форму BE + V-ing.' : 'Simple представляет действие как факт, привычку или целое событие.'}</p><div className="legend"><span><i/> вспомогательная часть</span><span><b/> смысловой глагол</span></div><button className={'passive-toggle ' + (passive ? 'on' : '')} onClick={() => setPassive(!passive)} disabled={!passive && passiveUnsupported}>{passive ? 'Вернуться к Active Voice' : 'Образовать Passive Voice'} <span>⇄</span></button><button className="detail-link builder-detail-link" onClick={() => openTense(result[2])}>Прочитать подробнее <span>→</span></button></div></div>
          <div className="next-chapter"><div><span>СЛЕДУЮЩИЙ ЭТАП</span><h3>12 времён английского языка</h3><p>Теперь можно разобрать каждую конструкцию отдельно — от смысла до готовой формулы.</p></div><BookOpen size={28}/></div>
        </section>

        <section className="chapter-section tenses-section" id="tenses">
          <div className="section-heading">
            <div className="section-kicker">ГЛАВА 06 · ПОЛНЫЙ СПРАВОЧНИК</div>
            <h2>12 времён — <em>одна система.</em></h2>
            <p>Каждое время складывается из временного ориентира и способа представить действие. Сравнивай не только формулы, но и то, на чём делает акцент говорящий.</p>
          </div>
          <div className="tense-groups">
            <div className="tense-group-heading"><span>01</span><div><h3>Past · Прошлое</h3><p>Момент или период отсчёта находится в прошлом.</p></div></div>
            <div className="tense-grid">
              <article className="tense-card"><div className="tense-card-top"><span>PAST · SIMPLE</span><span className="tense-index">01 / 12</span></div><h4>Past Simple</h4><p className="tense-purpose">Факт, привычка или завершённое событие в прошлом.</p><div className="tense-formula"><small>ФОРМУЛА</small><strong>Subject + V2</strong><span>did + V1 — в вопросах и отрицаниях</span></div><div className="tense-example"><b>I visited London last year.</b><span>Я посетил(а) Лондон в прошлом году.</span></div><p className="tense-detail">Мы сообщаем, что событие произошло в прошлом. Оно может быть единичным или повторяющимся.</p><button className="detail-link" onClick={() => openTense('Past Simple')}>Прочитать подробнее <span>→</span></button></article>
              <article className="tense-card"><div className="tense-card-top"><span>PAST · CONTINUOUS</span><span className="tense-index">02 / 12</span></div><h4>Past Continuous</h4><p className="tense-purpose">Процесс, который шёл в определённый момент или период прошлого.</p><div className="tense-formula"><small>ФОРМУЛА</small><strong>was / were + V-ing</strong><span>BE согласуется с подлежащим</span></div><div className="tense-example"><b>I was reading at eight.</b><span>В восемь я читал(а).</span></div><p className="tense-detail">Мы как будто смотрим на действие изнутри: оно уже происходило в выбранный момент.</p><button className="detail-link" onClick={() => openTense('Past Continuous')}>Прочитать подробнее <span>→</span></button></article>
              <article className="tense-card"><div className="tense-card-top"><span>PAST · PERFECT</span><span className="tense-index">03 / 12</span></div><h4>Past Perfect</h4><p className="tense-purpose">Действие произошло до другого момента или события в прошлом.</p><div className="tense-formula"><small>ФОРМУЛА</small><strong>had + V3</strong><span>HAD одинаково для всех лиц</span></div><div className="tense-example"><b>She had left before I arrived.</b><span>Она ушла до того, как я приехал(а).</span></div><p className="tense-detail">Точка отсчёта — мой приезд. Уход произошёл раньше этой точки.</p><button className="detail-link" onClick={() => openTense('Past Perfect')}>Прочитать подробнее <span>→</span></button></article>
              <article className="tense-card"><div className="tense-card-top"><span>PAST · PERFECT CONTINUOUS</span><span className="tense-index">04 / 12</span></div><h4>Past Perfect Continuous</h4><p className="tense-purpose">Процесс длился до определённого момента в прошлом; важна его продолжительность или ход.</p><div className="tense-formula"><small>ФОРМУЛА</small><strong>had been + V-ing</strong><span>HAD + BEEN + форма с -ing</span></div><div className="tense-example"><b>They had been waiting for an hour when the bus came.</b><span>Они ждали уже час, когда приехал автобус.</span></div><p className="tense-detail">Ожидание началось раньше и продолжалось вплоть до момента, когда приехал автобус.</p><button className="detail-link" onClick={() => openTense('Past Perfect Continuous')}>Прочитать подробнее <span>→</span></button></article>
            </div>
          </div>
          <div className="tense-groups">
            <div className="tense-group-heading"><span>02</span><div><h3>Present · Настоящее</h3><p>Момент отсчёта связан с настоящим.</p></div></div>
            <div className="tense-grid">
              <article className="tense-card"><div className="tense-card-top"><span>PRESENT · SIMPLE</span><span className="tense-index">05 / 12</span></div><h4>Present Simple</h4><p className="tense-purpose">Факт, состояние, привычка или регулярное действие.</p><div className="tense-formula"><small>ФОРМУЛА</small><strong>V1 / V1 + s(es)</strong><span>DO / DOES — вопросы и отрицания</span></div><div className="tense-example"><b>My brother plays tennis on Sundays.</b><span>Мой брат играет в теннис по воскресеньям.</span></div><p className="tense-detail">Мы описываем обычное положение дел, а не процесс именно в эту секунду.</p><button className="detail-link" onClick={() => openTense('Present Simple')}>Прочитать подробнее <span>→</span></button></article>
              <article className="tense-card"><div className="tense-card-top"><span>PRESENT · CONTINUOUS</span><span className="tense-index">06 / 12</span></div><h4>Present Continuous</h4><p className="tense-purpose">Процесс происходит сейчас или в текущий период; также — договорённость на будущее.</p><div className="tense-formula"><small>ФОРМУЛА</small><strong>am / is / are + V-ing</strong><span>BE согласуется с подлежащим</span></div><div className="tense-example"><b>She is talking on the phone now.</b><span>Она сейчас разговаривает по телефону.</span></div><p className="tense-detail">Действие представлено в процессе. Оно не обязательно началось ровно в момент речи.</p><button className="detail-link" onClick={() => openTense('Present Continuous')}>Прочитать подробнее <span>→</span></button></article>
              <article className="tense-card"><div className="tense-card-top"><span>PRESENT · PERFECT</span><span className="tense-index">07 / 12</span></div><h4>Present Perfect</h4><p className="tense-purpose">Прошлое действие связано с настоящим: результат, опыт или период, который ещё продолжается.</p><div className="tense-formula"><small>ФОРМУЛА</small><strong>have / has + V3</strong><span>HAVE меняется на HAS с he / she / it</span></div><div className="tense-example"><b>I have lost my keys.</b><span>Я потерял(а) ключи. (Сейчас их у меня нет.)</span></div><p className="tense-detail">Важно не просто когда случилось событие, а его связь с настоящим моментом.</p><button className="detail-link" onClick={() => openTense('Present Perfect')}>Прочитать подробнее <span>→</span></button></article>
              <article className="tense-card"><div className="tense-card-top"><span>PRESENT · PERFECT CONTINUOUS</span><span className="tense-index">08 / 12</span></div><h4>Present Perfect Continuous</h4><p className="tense-purpose">Процесс начался раньше и продолжается сейчас или только что завершился, оставив заметный след.</p><div className="tense-formula"><small>ФОРМУЛА</small><strong>have / has been + V-ing</strong><span>HAVE + BEEN + форма с -ing</span></div><div className="tense-example"><b>We have been studying for two hours.</b><span>Мы занимаемся уже два часа.</span></div><p className="tense-detail">Акцент на длительности или самом процессе, который связан с настоящим.</p><button className="detail-link" onClick={() => openTense('Present Perfect Continuous')}>Прочитать подробнее <span>→</span></button></article>
            </div>
          </div>
          <div className="tense-groups">
            <div className="tense-group-heading"><span>03</span><div><h3>Future · Будущее</h3><p>Момент отсчёта находится в будущем.</p></div></div>
            <div className="tense-grid">
              <article className="tense-card"><div className="tense-card-top"><span>FUTURE · SIMPLE</span><span className="tense-index">09 / 12</span></div><h4>Future Simple</h4><p className="tense-purpose">Будущий факт, решение, прогноз или обещание.</p><div className="tense-formula"><small>ФОРМУЛА</small><strong>will + V1</strong><span>WILL не меняется по лицам</span></div><div className="tense-example"><b>I will call you tomorrow.</b><span>Я позвоню тебе завтра.</span></div><p className="tense-detail">Действие представлено как событие будущего, без отдельного акцента на его процессе или предшествовании.</p><button className="detail-link" onClick={() => openTense('Future Simple')}>Прочитать подробнее <span>→</span></button></article>
              <article className="tense-card"><div className="tense-card-top"><span>FUTURE · CONTINUOUS</span><span className="tense-index">10 / 12</span></div><h4>Future Continuous</h4><p className="tense-purpose">Процесс будет идти в определённый момент или период будущего.</p><div className="tense-formula"><small>ФОРМУЛА</small><strong>will be + V-ing</strong><span>WILL + BE + форма с -ing</span></div><div className="tense-example"><b>This time tomorrow, I will be flying to Rome.</b><span>Завтра в это время я буду лететь в Рим.</span></div><p className="tense-detail">Мы мысленно переносимся в будущий момент и видим действие в процессе.</p><button className="detail-link" onClick={() => openTense('Future Continuous')}>Прочитать подробнее <span>→</span></button></article>
              <article className="tense-card"><div className="tense-card-top"><span>FUTURE · PERFECT</span><span className="tense-index">11 / 12</span></div><h4>Future Perfect</h4><p className="tense-purpose">Действие завершится до определённого момента в будущем.</p><div className="tense-formula"><small>ФОРМУЛА</small><strong>will have + V3</strong><span>WILL + HAVE + третья форма</span></div><div className="tense-example"><b>By Friday, I will have finished the report.</b><span>К пятнице я закончу отчёт.</span></div><p className="tense-detail">Будущая точка отсчёта — пятница; к ней результат уже будет достигнут.</p><button className="detail-link" onClick={() => openTense('Future Perfect')}>Прочитать подробнее <span>→</span></button></article>
              <article className="tense-card"><div className="tense-card-top"><span>FUTURE · PERFECT CONTINUOUS</span><span className="tense-index">12 / 12</span></div><h4>Future Perfect Continuous</h4><p className="tense-purpose">К будущему моменту процесс будет длиться уже определённое время.</p><div className="tense-formula"><small>ФОРМУЛА</small><strong>will have been + V-ing</strong><span>WILL + HAVE + BEEN + форма с -ing</span></div><div className="tense-example"><b>By June, she will have been working here for five years.</b><span>К июню будет пять лет, как она здесь работает.</span></div><p className="tense-detail">Акцент на продолжительности процесса к будущей точке отсчёта.</p><button className="detail-link" onClick={() => openTense('Future Perfect Continuous')}>Прочитать подробнее <span>→</span></button></article>
            </div>
          </div>
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
        <div className="page-navigation"><button onClick={() => goTo(chapters[Math.max(0, chapters.findIndex(c => c[0] === active)-1)][0])} disabled={active === 'intro'}>← Назад</button><span>{String(chapters.findIndex(c => c[0] === active)+1).padStart(2,'0')} / 06</span><button onClick={() => goTo(chapters[Math.min(chapters.length-1, chapters.findIndex(c => c[0] === active)+1)][0])} disabled={active === 'tenses'}>Далее <ArrowRight size={15}/></button></div>
      </main>
    </div>
  </div>
}
createRoot(document.getElementById('root')).render(<App />)
