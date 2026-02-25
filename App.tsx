import { useState, useEffect, useRef, useCallback } from 'react';
import { GameState, ChatMessage, Language, ResourceType } from './types';
import { MISSIONS, STORAGE_KEY, STORAGE_VERSION, UI_STRINGS, RESOURCE_LABELS } from './constants';
import { getAIHint } from './services/gemini';

// ─── Constants ───────────────────────────────────────────────────────────────

const TOTAL_MISSIONS = MISSIONS.length;

const RESOURCE_POSITIONS: Record<ResourceType, { top: string; left: string }> = {
  water:    { top: '18%', left: '22%' },
  shelter:  { top: '38%', left: '50%' },
  fire:     { top: '55%', left: '70%' },
  food:     { top: '22%', left: '60%' },
  medicine: { top: '45%', left: '28%' },
  raft:     { top: '72%', left: '42%' },
  signal:   { top: '65%', left: '58%' },
  rescue:   { top: '48%', left: '50%' },
  escape:   { top: '30%', left: '50%' },
};

function buildInitialState(lang: Language): GameState {
  const mission = MISSIONS[0];
  return {
    currentMission: 0,
    completedMissions: [],
    resources: [],
    daysOnIsland: 1,
    rescued: false,
    language: lang,
    hintsUsed: 0,
    showHelpModal: false,
    history: [
      {
        role: 'assistant',
        text: lang === 'ca'
          ? '🏝️ Has naufragat! Estàs sol/a en una illa deserta. Per sobreviure i ser rescatat, hauràs de resoldre equacions matemàtiques. Cada equació correcta et proporciona un recurs vital. Bona sort, aventurer/a! Escriu "pista" si necessites ajuda.'
          : '🏝️ ¡Has naufragado! Estás solo/a en una isla desierta. Para sobrevivir y ser rescatado, tendrás que resolver ecuaciones matemáticas. Cada ecuación correcta te da un recurso vital. ¡Buena suerte, aventurero/a! Escribe "pista" si necesitas ayuda.',
        timestamp: Date.now(),
        isNarrative: true,
      },
      {
        role: 'assistant',
        text: mission.narrative[lang],
        timestamp: Date.now() + 1,
        isNarrative: true,
      },
      {
        role: 'assistant',
        text: `📐 <strong>${mission.title[lang]}</strong><br/><br/>${mission.challenge[lang]}`,
        timestamp: Date.now() + 2,
      },
    ],
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function IslandMap({ resources, currentMission, rescued }: {
  resources: ResourceType[];
  currentMission: number;
  rescued: boolean;
}) {
  const currentResource = !rescued ? MISSIONS[currentMission]?.resource : null;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Ocean background waves */}
      <div className="absolute inset-0 ocean-waves opacity-80" />

      {/* Decorative wave lines */}
      {[20, 40, 60, 80].map((y) => (
        <div
          key={y}
          className="absolute left-0 right-0 h-px opacity-10"
          style={{ top: `${y}%`, background: 'linear-gradient(90deg, transparent, #60c8ff, transparent)' }}
        />
      ))}

      {/* Island shape */}
      <div
        className="relative island-glow"
        style={{
          width: '85%',
          height: '85%',
          background: 'radial-gradient(ellipse at 50% 40%, #3d8b37 0%, #2d6a28 35%, #c8963c 65%, #a67c2e 80%, transparent 100%)',
          borderRadius: '55% 45% 60% 40% / 50% 60% 40% 55%',
        }}
      >
        {/* Sand beach ring */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 60%, transparent 45%, #d4a853 60%, transparent 75%)',
            borderRadius: 'inherit',
          }}
        />

        {/* Trees decoration */}
        {[
          { top: '12%', left: '50%', size: '1.3rem' }, // top centre
          { top: '22%', left: '33%', size: '1.2rem' }, // upper left
          { top: '26%', left: '68%', size: '1.4rem' }, // upper right
          { top: '50%', left: '16%', size: '1.1rem' }, // mid left
          { top: '44%', left: '74%', size: '1.2rem' }, // mid right
          { top: '62%', left: '30%', size: '1.3rem' }, // lower left
          { top: '70%', left: '64%', size: '1.1rem' }, // lower right
        ].map((tree, i) => (
          <span key={i} className="absolute select-none wave" style={{ top: tree.top, left: tree.left, fontSize: tree.size, animationDelay: `${i * 0.3}s` }}>
            🌴
          </span>
        ))}

        {/* Resource markers */}
        {MISSIONS.map((mission) => {
          const pos = RESOURCE_POSITIONS[mission.resource];
          const isCollected = resources.includes(mission.resource);
          const isCurrent = currentResource === mission.resource;

          return (
            <div
              key={mission.id}
              className="absolute flex flex-col items-center"
              style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
            >
              {isCurrent && (
                <div className="absolute inset-0 rounded-full bg-yellow-300 animate-ping opacity-60" style={{ width: '2.5rem', height: '2.5rem', transform: 'translate(-50%,-50%) translate(50%,50%)' }} />
              )}
              <span
                className={`text-2xl select-none transition-all duration-500 ${isCollected ? 'island-element-appear opacity-100' : 'opacity-20 grayscale'} ${isCurrent ? 'scale-125 drop-shadow-lg' : ''}`}
                title={RESOURCE_LABELS[mission.resource]?.ca}
              >
                {mission.emoji}
              </span>
              {isCollected && (
                <span className="text-xs mt-0.5 bg-green-500 text-white rounded-full px-1 font-bold leading-none py-0.5">✓</span>
              )}
            </div>
          );
        })}

        {/* Rescue effect */}
        {rescued && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-5xl animate-bounce">🚢</div>
          </div>
        )}
      </div>

      {/* Progress label */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
        <div className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white/80 font-semibold">
          {resources.length}/{TOTAL_MISSIONS} recursos
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === 'user';

  return (
    <div className={`flex mb-3 chat-bubble-enter ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-sm mr-2 flex-shrink-0 mt-1 shadow-lg">
          🏝️
        </div>
      )}
      <div
        className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-tr-sm'
            : msg.isNarrative
            ? 'bg-gradient-to-br from-amber-800/80 to-orange-900/80 text-amber-100 border border-amber-600/30 rounded-tl-sm'
            : 'bg-gradient-to-br from-slate-700 to-slate-800 text-gray-100 border border-slate-600/30 rounded-tl-sm'
        }`}
        dangerouslySetInnerHTML={{ __html: msg.text }}
      />
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-sm ml-2 flex-shrink-0 mt-1 shadow-lg">
          🧑‍🎓
        </div>
      )}
    </div>
  );
}

function ResourceChip({ resource, label, emoji }: { resource: ResourceType; label: string; emoji: string }) {
  return (
    <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-2 py-1 text-xs font-bold text-white shadow resource-card island-element-appear">
      <span>{emoji}</span>
      <span>{label}</span>
    </div>
  );
}

function HelpModal({ lang, onClose }: { lang: Language; onClose: () => void }) {
  const steps = UI_STRINGS.helpSteps[lang];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-800 border border-slate-600 rounded-2xl max-w-sm w-full p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-black text-white">{UI_STRINGS.helpTitle[lang]}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">×</button>
        </div>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow">
                <i className={`fa-solid ${step.icon} text-white text-sm`} />
              </div>
              <div>
                <p className="font-bold text-white text-sm">{step.title}</p>
                <p className="text-gray-300 text-xs mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-sm hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg"
        >
          {lang === 'ca' ? '¡Endavant!' : '¡Adelante!'}
        </button>
      </div>
    </div>
  );
}

function Sidebar({
  open, onClose, state, onJump,
}: {
  open: boolean;
  onClose: () => void;
  state: GameState;
  onJump: (idx: number) => void;
}) {
  const lang = state.language;
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/50" onClick={onClose} />}
      <div
        className={`fixed top-0 left-0 h-full w-72 z-40 bg-slate-900 border-r border-slate-700 transition-transform duration-300 flex flex-col shadow-2xl ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <span className="font-black text-white text-lg">🗺️ {UI_STRINGS.missionSidebar[lang]}</span>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">×</button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {state.rescued && (
            <div className="text-xs text-amber-300/70 font-semibold px-2 pb-1">
              {lang === 'ca' ? '📖 Revisa qualsevol missió:' : '📖 Revisa cualquier misión:'}
            </div>
          )}
          {MISSIONS.map((mission, idx) => {
            const done = state.completedMissions.includes(mission.id);
            const isCurrent = state.currentMission === idx && !state.rescued;
            const isLocked = !done && !isCurrent && !state.rescued;
            return (
              <button
                key={mission.id}
                disabled={isLocked}
                onClick={() => { if (!isLocked) { onJump(idx); onClose(); } }}
                className={`w-full text-left rounded-xl px-3 py-2.5 flex items-center gap-3 transition-all text-sm font-semibold border ${
                  isCurrent
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-200'
                    : done
                    ? 'bg-green-500/10 border-green-500/30 text-green-300 hover:bg-green-500/20 cursor-pointer'
                    : state.rescued
                    ? 'bg-slate-800 border-slate-700 text-gray-300 hover:bg-slate-700 cursor-pointer'
                    : 'bg-slate-800/40 border-slate-700/40 text-gray-600 cursor-not-allowed opacity-50'
                }`}
              >
                <span className={`text-lg ${isLocked ? 'grayscale' : ''}`}>{mission.emoji}</span>
                <span className="flex-1 leading-tight">{mission.title[lang]}</span>
                {done && <i className="fa-solid fa-circle-check text-green-400 text-xs" />}
                {isCurrent && <i className="fa-solid fa-location-dot text-amber-400 text-xs animate-pulse" />}
                {isLocked && <i className="fa-solid fa-lock text-gray-600 text-xs" />}
              </button>
            );
          })}
        </div>
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>{UI_STRINGS.progressLabel[lang]}</span>
            <span className="font-bold text-white">{state.completedMissions.length}/{TOTAL_MISSIONS}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-700"
              style={{ width: `${(state.completedMissions.length / TOTAL_MISSIONS) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function RescuedScreen({ lang, onRestart }: { lang: Language; onRestart: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-slide-up">
      <div className="text-7xl mb-6 animate-bounce">🚢</div>
      <h1 className="text-3xl font-black text-white mb-3">
        {lang === 'ca' ? '¡ RESCATADA/AT !' : '¡ RESCATADO/A !'}
      </h1>
      <p className="text-amber-200 text-lg mb-2 font-semibold">
        {lang === 'ca' ? 'Has resolt totes les equacions!' : '¡Has resuelto todas las ecuaciones!'}
      </p>
      <p className="text-gray-300 text-sm mb-8 max-w-xs">
        {lang === 'ca'
          ? 'Gràcies a les teves habilitats matemàtiques, has aconseguit tots els recursos per ser rescatat/ada. Ets un/a autèntic/a X-Hunter!'
          : 'Gracias a tus habilidades matemáticas, has conseguido todos los recursos para ser rescatado/a. ¡Eres un auténtico X-Hunter!'}
      </p>
      <div className="grid grid-cols-4 gap-3 mb-8">
        {MISSIONS.map((m) => (
          <div key={m.id} className="flex flex-col items-center gap-1">
            <span className="text-2xl">{m.emoji}</span>
            <span className="text-xs text-green-400 font-bold">✓</span>
          </div>
        ))}
      </div>
      <button
        onClick={onRestart}
        className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-base hover:from-amber-400 hover:to-orange-400 transition-all shadow-xl active:scale-95"
      >
        🏝️ {UI_STRINGS.restartBtn[lang]}
      </button>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [state, setState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as GameState & { _version?: number };
        if (parsed._version === STORAGE_VERSION) return parsed;
        // Stale version — discard and start fresh
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {}
    return buildInitialState('ca');
  });

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const lang = state.language;

  // Persist state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, _version: STORAGE_VERSION }));
  }, [state]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.history]);

  const addMessage = useCallback((msgs: Omit<ChatMessage, 'timestamp'>[]) => {
    setState((prev) => ({
      ...prev,
      history: [
        ...prev.history,
        ...msgs.map((m, i) => ({ ...m, timestamp: Date.now() + i })),
      ],
    }));
  }, []);

  const handleLanguageToggle = useCallback(() => {
    const newLang: Language = lang === 'ca' ? 'es' : 'ca';
    setState((prev) => {
      const newState = buildInitialState(newLang);
      // Preserve progress, just rebuild messages
      const mission = MISSIONS[prev.currentMission];
      const rebuildHistory: ChatMessage[] = [
        {
          role: 'assistant',
          text: newLang === 'ca'
            ? '🏝️ Has naufragat! Estàs sol/a en una illa deserta. Per sobreviure i ser rescatat, hauràs de resoldre equacions matemàtiques. Cada equació correcta et proporciona un recurs vital. Bona sort, aventurer/a! Escriu "pista" si necessites ajuda.'
            : '🏝️ ¡Has naufragado! Estás solo/a en una isla desierta. Para sobrevivir y ser rescatado, tendrás que resolver ecuaciones matemáticas. Cada ecuación correcta te da un recurso vital. ¡Buena suerte, aventurero/a! Escribe "pista" si necesitas ayuda.',
          timestamp: Date.now(),
          isNarrative: true,
        },
        {
          role: 'assistant',
          text: mission.narrative[newLang],
          timestamp: Date.now() + 1,
          isNarrative: true,
        },
        {
          role: 'assistant',
          text: `📐 <strong>${mission.title[newLang]}</strong><br/><br/>${mission.challenge[newLang]}`,
          timestamp: Date.now() + 2,
        },
      ];
      return {
        ...prev,
        language: newLang,
        history: rebuildHistory,
        showHelpModal: false,
      };
    });
    setHintIndex(0);
  }, [lang]);

  const handleJumpToLevel = useCallback((idx: number) => {
    const mission = MISSIONS[idx];
    const isAccessible = state.rescued || state.completedMissions.includes(mission.id) || state.currentMission === idx;
    if (!isAccessible) return;
    setState((prev) => {
      const history: ChatMessage[] = [
        {
          role: 'assistant',
          text: mission.narrative[prev.language],
          timestamp: Date.now(),
          isNarrative: true,
        },
        {
          role: 'assistant',
          text: `📐 <strong>${mission.title[prev.language]}</strong><br/><br/>${mission.challenge[prev.language]}`,
          timestamp: Date.now() + 1,
        },
      ];
      return { ...prev, currentMission: idx, history };
    });
    setHintIndex(0);
  }, [state.completedMissions, state.currentMission, state.rescued]);

  const handleHint = useCallback(async () => {
    const mission = MISSIONS[state.currentMission];
    setIsLoading(true);
    const currentHintIdx = Math.min(hintIndex, mission.hints[lang].length - 1);
    const hintText = await getAIHint(mission, lang, currentHintIdx);
    setIsLoading(false);
    setHintIndex((prev) => Math.min(prev + 1, mission.hints[lang].length - 1));
    setState((prev) => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1,
      history: [
        ...prev.history,
        { role: 'assistant', text: hintText, timestamp: Date.now() },
      ],
    }));
  }, [state.currentMission, hintIndex, lang]);

  const handleSubmit = useCallback(async () => {
    const raw = inputValue.trim();
    if (!raw || isLoading) return;
    setInputValue('');

    const userMsg: Omit<ChatMessage, 'timestamp'> = { role: 'user', text: raw };

    // Hint request
    if (raw.toLowerCase() === UI_STRINGS.hint[lang] || raw.toLowerCase() === 'hint' || raw.toLowerCase() === 'pista') {
      addMessage([userMsg]);
      await handleHint();
      return;
    }

    const mission = MISSIONS[state.currentMission];
    const expectedParts = mission.expectedAnswer.split(',').map(s => s.trim());
    const isMultiAnswer = expectedParts.length > 1;
    let isCorrect: boolean;
    if (isMultiAnswer) {
      const userParts = raw.split(',').map(s => s.replace(/x\s*=\s*/i, '').trim());
      isCorrect =
        userParts.length === expectedParts.length &&
        expectedParts.every((exp, i) => parseFloat(userParts[i]) === parseFloat(exp));
    } else {
      const normalized = raw.replace(/x\s*=\s*/i, '').replace(',', '.').trim();
      isCorrect = parseFloat(normalized) === parseFloat(mission.expectedAnswer);
    }

    addMessage([userMsg]);

    if (isCorrect) {
      const correctText = mission.feedback.correct[lang];
      const isDone = state.currentMission >= TOTAL_MISSIONS - 1;

      setState((prev) => {
        const nextIdx = prev.currentMission + 1;
        const newCompleted = [...prev.completedMissions, mission.id];
        const newResources = [...prev.resources, mission.resource];

        if (isDone) {
          return {
            ...prev,
            completedMissions: newCompleted,
            resources: newResources,
            rescued: true,
            daysOnIsland: prev.daysOnIsland + 1,
            history: [
              ...prev.history,
              { role: 'user', text: raw, timestamp: Date.now() - 1 },
              { role: 'assistant', text: correctText, timestamp: Date.now() },
              {
                role: 'assistant',
                text: lang === 'ca'
                  ? '🚢🎉 HAS COMPLETAT TOTES LES MISSIONS! ETS RESCATAT/DA!'
                  : '🚢🎉 ¡HAS COMPLETADO TODAS LAS MISIONES! ¡ESTÁS RESCATADO/A!',
                timestamp: Date.now() + 1,
                isNarrative: true,
              },
            ],
          };
        }

        const nextMission = MISSIONS[nextIdx];
        return {
          ...prev,
          currentMission: nextIdx,
          completedMissions: newCompleted,
          resources: newResources,
          daysOnIsland: prev.daysOnIsland + 1,
          history: [
            ...prev.history,
            { role: 'user', text: raw, timestamp: Date.now() - 1 },
            { role: 'assistant', text: correctText, timestamp: Date.now() },
            {
              role: 'assistant',
              text: nextMission.narrative[prev.language],
              timestamp: Date.now() + 100,
              isNarrative: true,
            },
            {
              role: 'assistant',
              text: `📐 <strong>${nextMission.title[prev.language]}</strong><br/><br/>${nextMission.challenge[prev.language]}`,
              timestamp: Date.now() + 200,
            },
          ],
        };
      });
      setHintIndex(0);
    } else {
      setTimeout(() => {
        addMessage([{
          role: 'assistant',
          text: mission.feedback.wrong[lang],
        }]);
      }, 200);
    }

    inputRef.current?.focus();
  }, [inputValue, isLoading, state.currentMission, state.completedMissions, state.resources, lang, addMessage, handleHint]);

  const handleRestart = useCallback(() => {
    const confirm = window.confirm(
      lang === 'ca'
        ? '⚠️ Segur que vols reiniciar la partida? Perdràs tot el progrès.'
        : '⚠️ ¿Seguro que quieres reiniciar la partida? Perderás todo el progreso.'
    );
    if (!confirm) return;
    localStorage.removeItem(STORAGE_KEY);
    const fresh = buildInitialState(lang);
    setState(fresh);
    setHintIndex(0);
    setInputValue('');
  }, [lang]);

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="h-screen flex flex-col bg-slate-900 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        state={state}
        onJump={handleJumpToLevel}
      />

      {/* Help Modal */}
      {state.showHelpModal && (
        <HelpModal
          lang={lang}
          onClose={() => setState((p) => ({ ...p, showHelpModal: false }))}
        />
      )}

      {/* ── Header ── */}
      <header className="flex-shrink-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 px-3 py-2 z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <i className="fa-solid fa-bars text-base" />
          </button>

          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-xl">🏝️</span>
            <div className="min-w-0">
              <h1 className="font-black text-white text-base leading-tight truncate">
                {UI_STRINGS.appTitle[lang]}
              </h1>
              <p className="text-xs text-amber-300 font-semibold leading-tight">
                {UI_STRINGS.day[lang]} {state.daysOnIsland} · {state.completedMissions.length}/{TOTAL_MISSIONS} {lang === 'ca' ? 'missions' : 'misiones'}
              </p>
            </div>
          </div>

          {/* Language toggle */}
          <button
            onClick={handleLanguageToggle}
            className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm font-black text-amber-300 transition-colors border border-slate-600"
          >
            {lang === 'ca' ? 'ES' : 'CA'}
          </button>

          {/* Reset button */}
          <button
            onClick={handleRestart}
            title={lang === 'ca' ? 'Reiniciar partida' : 'Reiniciar partida'}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:bg-red-700/40 hover:text-red-300 transition-colors flex-shrink-0"
          >
            <i className="fa-solid fa-rotate-left text-base" />
          </button>

          {/* Help button */}
          <button
            onClick={() => setState((p) => ({ ...p, showHelpModal: true }))}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-300 hover:bg-slate-700 hover:text-white transition-colors flex-shrink-0"
          >
            <i className="fa-solid fa-circle-question text-base" />
          </button>
        </div>

        {/* Resource bar */}
        {state.resources.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-slate-700/50">
            {state.resources.map((r) => {
              const mission = MISSIONS.find((m) => m.resource === r)!;
              return (
                <ResourceChip
                  key={r}
                  resource={r}
                  emoji={mission.emoji}
                  label={RESOURCE_LABELS[r][lang]}
                />
              );
            })}
          </div>
        )}
      </header>

      {/* ── Main area ── */}
      <div className="flex-1 flex min-h-0 overflow-hidden">

        {/* Island map – hidden on very small screens, visible md+ */}
        <div className="hidden md:flex flex-col w-80 lg:w-[26rem] xl:w-[30rem] flex-shrink-0 border-r border-slate-700 bg-slate-900/50 p-2">
          <div className="flex-1 min-h-0">
            <IslandMap
              resources={state.resources}
              currentMission={state.currentMission}
              rescued={state.rescued}
            />
          </div>

          {/* Survival stats */}
          <div className="mt-2 space-y-1.5 flex-shrink-0">
            <div className="flex justify-between items-center text-xs px-1">
              <span className="text-gray-400">{lang === 'ca' ? 'Supervivència' : 'Supervivencia'}</span>
              <span className="text-amber-300 font-bold">{state.daysOnIsland} {lang === 'ca' ? 'dies' : 'días'}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-700"
                style={{ width: `${(state.completedMissions.length / TOTAL_MISSIONS) * 100}%` }}
              />
            </div>
            <div className="text-center text-xs text-gray-500 font-semibold">
              {state.rescued
                ? (lang === 'ca' ? '🚢 Rescatat/da!' : '🚢 ¡Rescatado/a!')
                : `${TOTAL_MISSIONS - state.completedMissions.length} ${lang === 'ca' ? 'missions restants' : 'misiones restantes'}`}
            </div>
          </div>
        </div>

        {/* Chat + input column */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          {state.rescued ? (
            <RescuedScreen lang={lang} onRestart={handleRestart} />
          ) : (
            <>
              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                {state.history.map((msg) => (
                  <ChatBubble key={msg.timestamp} msg={msg} />
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 text-amber-300 text-sm pl-10">
                    <i className="fa-solid fa-spinner fa-spin" />
                    <span>{lang === 'ca' ? 'Generant pista...' : 'Generando pista...'}</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick hint button */}
              <div className="px-3 pb-1 flex gap-2 flex-shrink-0">
                <button
                  onClick={async () => {
                    addMessage([{ role: 'user', text: UI_STRINGS.hint[lang] }]);
                    await handleHint();
                  }}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-amber-500/30 transition-colors disabled:opacity-50"
                >
                  <i className="fa-solid fa-lightbulb text-xs" />
                  {lang === 'ca' ? 'Pista' : 'Pista'}
                </button>
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-700/50 border border-slate-600/40 text-gray-300 text-xs font-bold hover:bg-slate-700 transition-colors md:hidden"
                >
                  <i className="fa-solid fa-map text-xs" />
                  {lang === 'ca' ? 'Missions' : 'Misiones'}
                </button>
              </div>

              {/* Input bar */}
              <div className="flex-shrink-0 px-3 pb-4 pt-1 border-t border-slate-700/50">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
                  className="flex gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={UI_STRINGS.inputPlaceholder[lang]}
                    disabled={isLoading}
                    className="flex-1 bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-amber-500 focus:bg-slate-700 transition-colors disabled:opacity-50"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    inputMode="decimal"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 flex-shrink-0"
                  >
                    <i className="fa-solid fa-paper-plane text-sm" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
