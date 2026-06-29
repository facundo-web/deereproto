import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle, Bot, Wrench, ShieldCheck, Send, Check, CheckCheck, Clock,
  AlertTriangle, Star, Calendar, RefreshCw, ChevronRight, ChevronLeft, Activity,
  FileText, Zap, Sparkles, MapPin, UserCog, TrendingUp, Paperclip, RotateCcw,
  Phone, Lock, Users, Radio, LayoutGrid, Inbox, Server, CheckCircle, XCircle, Bell, Building2, Smartphone, Monitor, Signal
} from "lucide-react";

/* ===== tokens ===== */
const C = {
  green: "#367C2B", greenD: "#1F5018", side: "#1E3A2C", yellow: "#FFDE00",
  wa: "#1FA855", waHead: "#075E54", waBg: "#ECE5DD", waOut: "#DCF8C6",
  olive: "#5E7038", gray: "#52564B",
  ok: "#2E7D32", okBg: "#E8F1E2", warn: "#B26A00", warnBg: "#FFF3DF",
  crit: "#B3261E", critBg: "#FBE9E7",
  ink: "#1A1C18", ink2: "#3A3D36", ink3: "#6B6F66",
  line: "#E2E5DD", line2: "#EEF0EA", card: "#FFFFFF", bg: "#F4F6F1",
};
const bGhost = { display: "inline-flex", alignItems: "center", gap: 6, background: "#fff", color: C.ink2, border: "1px solid " + C.line, borderRadius: 7, padding: "8px 12px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" };

const PROF = {
  produtor: { name: "João · Produtor", c: C.gray, Icon: MessageCircle },
  bot: { name: "Assistente Digital", c: C.olive, Icon: Bot },
  csc: { name: "Carlos · CSC AgroBaggio", c: C.green, Icon: UserCog },
  especialista: { name: "Especialista · AgroBaggio", c: C.green, Icon: UserCog },
  field: { name: "Diego · Field Trainer", c: C.olive, Icon: Wrench },
  dealer: { name: "AgroBaggio", c: C.green, Icon: ShieldCheck },
  deere: { name: "John Deere", c: C.side, Icon: ShieldCheck },
  system: { name: "Sistema", c: C.ink3, Icon: Lock },
};
const ROLE_NAME = { produtor: "Produtor", dealer: "Dealer", field: "Field Trainer", deere: "Deere" };

/* ===== roteiro da conversa do cliente ===== */
const STEPS = {
  s0: {
    enter: [{ f: "bot", t: "Olá, João! 👋 Sou o assistente digital da AgroBaggio. Como posso ajudar hoje?", time: "08:10" }],
    opts: [
      { role: "produtor", label: "Minha máquina está com problema", next: "s1", say: [{ f: "produtor", t: "Minha máquina está com problema 🚜", time: "08:11" }] },
      { role: "produtor", label: "Renovar licença ou planos", next: "sLic", say: [{ f: "produtor", t: "Quero ver renovação de licença", time: "08:11" }] },
      { role: "produtor", label: "Falar com uma pessoa", next: "sHum", say: [{ f: "produtor", t: "Prefiro falar com uma pessoa", time: "08:11" }] },
    ],
  },
  s1: {
    enter: [
      { f: "produtor", t: "O AutoTrac não engata na X9. Já tentei reiniciar.", time: "08:12", k: "media" },
      { f: "bot", t: "Entendi. Classifiquei como AutoTrac não engata — Orientação (Ramo 4). Abri o caso #BR-4471.", time: "08:12" },
      { f: "system", t: "Triagem automática · Ramo 4 · prioridade ALTA · cliente ativo", time: "08:12", n: true },
      { f: "bot", t: "Como você prefere seguir?", time: "08:12" },
    ],
    opts: [
      { role: "produtor", label: "Tentar resolver agora (guia rápido)", next: "s2", say: [{ f: "produtor", t: "Quero tentar resolver agora", time: "08:13" }] },
      { role: "produtor", label: "Falar com um especialista", next: "sHum", say: [{ f: "produtor", t: "Prefiro falar com um especialista", time: "08:13" }] },
      { role: "produtor", label: "Agendar visita técnica", next: "sAgenda", say: [{ f: "produtor", t: "Quero agendar uma visita", time: "08:13" }] },
    ],
  },
  s2: {
    enter: [
      { f: "bot", t: "Vamos juntos: 1) Confirme a licença AutoTrac ativa no monitor. 2) Veja o sinal StarFire (precisa de 3+ barras).", time: "08:14" },
      { f: "bot", t: "O AutoTrac engatou?", time: "08:15", k: "card" },
    ],
    opts: [
      { role: "produtor", label: "Resolveu! 🎉", next: "sCsat", do: { resolved: "remoto" }, say: [{ f: "produtor", t: "Resolveu! Era a licença mesmo 🎉", time: "08:16" }] },
      { role: "produtor", label: "Não resolveu", next: "sHum", say: [{ f: "produtor", t: "Segui os passos mas não resolveu", time: "08:16" }] },
      { role: "produtor", label: "Não consigo agora", next: "sPausa", say: [{ f: "produtor", t: "Estou na colheita, não consigo agora", time: "08:16" }] },
    ],
  },
  sHum: {
    enter: [
      { f: "system", t: "Escalado para atendimento humano · fila CSC", time: "08:17", n: true },
      { f: "csc", t: "Oi João, aqui é o Carlos do suporte AgroBaggio. Já estou vendo seu caso do AutoTrac.", time: "08:18" },
      { f: "especialista", t: "Sinal StarFire fraco no talhão (2 barras). Provável obstrução / posição da antena.", time: "08:20", n: true },
    ],
    opts: [
      { role: "dealer", label: "Enviar guia de reposicionamento (remoto)", next: "sRemoto", say: [{ f: "csc", t: "Vou te enviar um guia rápido pra reposicionar a antena. Faz uma passada de teste depois?", time: "08:21" }] },
      { role: "dealer", label: "Agendar visita do Field Trainer", next: "sAgenda", say: [{ f: "csc", t: "Acho melhor mandar nosso Field Trainer aí pra resolver de vez. Posso agendar?", time: "08:21" }] },
      { role: "dealer", label: "Pedir mais informações", next: "sInfo", say: [{ f: "csc", t: "Pra te ajudar melhor: em qual talhão está e há quanto tempo aparece o problema?", time: "08:21" }] },
      { role: "produtor", label: "Prefiro que alguém venha", next: "sAgenda", say: [{ f: "produtor", t: "Prefiro que alguém venha ver", time: "08:21" }] },
    ],
  },
  sRemoto: {
    enter: [{ f: "csc", t: "Reposicione a antena conforme a foto e faça uma passada de teste 👇", time: "08:22", k: "card" }],
    opts: [
      { role: "produtor", label: "Funcionou ✅", next: "sCsat", do: { resolved: "remoto" }, say: [{ f: "produtor", t: "Reposicionei e funcionou! ✅", time: "08:40" }] },
      { role: "produtor", label: "Continua igual", next: "sAgenda", say: [{ f: "produtor", t: "Continua sem engatar…", time: "08:40" }] },
    ],
  },
  sInfo: {
    enter: [
      { f: "produtor", t: "Talhão norte, começou ontem depois da chuva.", time: "08:23" },
      { f: "csc", t: "Obrigado, isso ajuda. Recomendo uma visita pra recalibrar com segurança.", time: "08:24" },
    ],
    opts: [{ role: "dealer", label: "Agendar visita do Field Trainer", next: "sAgenda", say: [{ f: "csc", t: "Posso agendar a visita?", time: "08:24" }] }],
  },
  sAgenda: {
    enter: [{ f: "csc", t: "Tenho o Diego (Field Trainer) disponível amanhã às 9h. Posso confirmar?", time: "08:25", k: "card" }],
    opts: [
      { role: "produtor", label: "Confirmar 9h ✅", next: "sConfirmado", do: { agenda: "amanhã 9h" }, say: [{ f: "produtor", t: "Pode confirmar, 9h tá ótimo ✅", time: "08:26" }] },
      { role: "produtor", label: "Prefiro outro horário", next: "sReagenda", say: [{ f: "produtor", t: "9h não dá, pode ser outro horário?", time: "08:26" }] },
      { role: "produtor", label: "Antes quero falar com alguém", next: "sHum", say: [{ f: "produtor", t: "Antes queria falar com alguém", time: "08:26" }] },
      { role: "produtor", label: "Adiar — estou na colheita", next: "sPausa", say: [{ f: "produtor", t: "Vou adiar, estou na colheita", time: "08:26" }] },
    ],
  },
  sReagenda: {
    enter: [{ f: "csc", t: "Sem problema. Quinta às 8h30 funciona?", time: "08:27" }],
    opts: [
      { role: "produtor", label: "Quinta 8h30, confirmo", next: "sConfirmado", do: { agenda: "quinta 8h30" }, say: [{ f: "produtor", t: "Quinta 8h30 tá ótimo, confirmo 👍", time: "08:28" }] },
      { role: "produtor", label: "Adiar — estou na colheita", next: "sPausa", say: [{ f: "produtor", t: "Melhor adiar por enquanto", time: "08:28" }] },
    ],
  },
  sConfirmado: {
    enter: [
      { f: "system", t: "Visita agendada → backlog do Field Trainer (Diego)", time: "08:29", n: true },
      { f: "csc", t: "Visita confirmada ✅ O Diego te avisa quando estiver a caminho.", time: "08:29" },
    ],
    opts: [{ role: "field", label: "Marcar: a caminho", next: "sCaminho", say: [{ f: "field", t: "Olá João, sou o Diego. Estou a caminho, chego em ~1h 🚙", time: "09:00" }] }],
  },
  sCaminho: {
    enter: [],
    opts: [
      { role: "produtor", label: "Ok, te espero 👍", next: "sEmCampo", say: [{ f: "produtor", t: "Beleza Diego, te espero no talhão norte 👍", time: "09:02" }] },
      { role: "field", label: "Cheguei — iniciar visita", next: "sEmCampo", say: [{ f: "field", t: "Cheguei na fazenda, indo ao talhão norte.", time: "10:05" }] },
    ],
  },
  sEmCampo: {
    enter: [{ f: "field", t: "Verificando antena e sinal no talhão…", time: "10:10", n: true }],
    opts: [{ role: "field", label: "Concluir: recalibrado e validado", next: "sResolvido", do: { resolved: "campo" }, say: [{ f: "field", t: "Recalibrei a antena e validei com 1 passada. AutoTrac engatando 100% 🌱", time: "10:48" }] }],
  },
  sResolvido: {
    enter: [
      { f: "field", t: "Recalibrado AutoTrac · validado 1 passada · caso fechado", time: "10:48", n: true },
      { f: "csc", t: "Tudo certo por aí agora, João? ✅", time: "11:00" },
    ],
    opts: [{ role: "produtor", label: "Tudo certo, obrigado!", next: "sCsat", say: [{ f: "produtor", t: "Tudo certo, valeu demais! 🙏", time: "11:02" }] }],
  },
  sLic: {
    enter: [{ f: "bot", t: "Sua licença AutoPath vence em 30 dias. Quer que eu prepare a renovação e te passe pro consultor?", time: "08:12" }],
    opts: [
      { role: "produtor", label: "Sim, pode preparar", next: "sLicOk", say: [{ f: "produtor", t: "Sim, pode preparar a renovação", time: "08:13" }] },
      { role: "produtor", label: "Quero entender os planos", next: "sHum", say: [{ f: "produtor", t: "Antes quero entender os planos", time: "08:13" }] },
    ],
  },
  sLicOk: {
    enter: [
      { f: "system", t: "Renovação AutoPath gerada · enviada ao consultor", time: "08:14", n: true },
      { f: "csc", t: "Renovação preparada ✅ Te enviei o link de pagamento e fico à disposição.", time: "08:15" },
    ],
    opts: [],
  },
  sCsat: {
    enter: [{ f: "bot", t: "Que bom! Como você avalia o atendimento?", time: "11:03", k: "card" }],
    opts: [
      { role: "produtor", label: "⭐⭐⭐⭐⭐ Ótimo", next: "sFim", do: { csat: 5 }, say: [{ f: "produtor", t: "⭐⭐⭐⭐⭐", time: "11:04" }] },
      { role: "produtor", label: "⭐⭐⭐ Ok", next: "sFim", do: { csat: 3 }, say: [{ f: "produtor", t: "⭐⭐⭐", time: "11:04" }] },
      { role: "produtor", label: "⭐ Ruim", next: "sFimRuim", do: { csat: 1 }, say: [{ f: "produtor", t: "⭐", time: "11:04" }] },
    ],
  },
  sFim: {
    enter: [
      { f: "bot", t: "Obrigado, João! 🌱 Qualquer coisa é só chamar.", time: "11:05" },
      { f: "system", t: "Follow-up D+7 agendado ao dono · checar uso do AutoTrac", time: "11:05", n: true },
    ],
    opts: [],
  },
  sFimRuim: {
    enter: [
      { f: "system", t: "CSAT baixo · alerta para o dealer e para a Deere", time: "11:05", n: true },
      { f: "csc", t: "Sinto muito que não tenha sido bom. Vou te ligar pessoalmente pra entender.", time: "11:06" },
    ],
    opts: [],
  },
  sPausa: {
    enter: [
      { f: "bot", t: "Sem problema. Deixo o caso aberto e te chamo em alguns dias 👍", time: "08:30" },
      { f: "system", t: "Caso pausado pelo produtor · risco de estancar (sem movimento)", time: "08:30", n: true },
    ],
    opts: [{ role: "produtor", label: "Pensando bem, vamos resolver agora", next: "sAgenda", say: [{ f: "produtor", t: "Pensando bem, vamos resolver agora", time: "D+2" }] }],
  },
  oManut: {
    enter: [{ f: "dealer", t: "Olá João! Sua X9 está chegando em 250h de uso. Quer agendar a revisão preventiva? Evita parada na safra.", time: "—" }],
    opts: [
      { role: "produtor", label: "Quero agendar a revisão", next: "sAgenda", say: [{ f: "produtor", t: "Quero agendar a revisão preventiva", time: "—" }] },
      { role: "produtor", label: "Depois da colheita", next: "sPausa", say: [{ f: "produtor", t: "Depois da colheita, por favor", time: "—" }] },
    ],
  },
  oLic: {
    enter: [{ f: "dealer", t: "Oi João, sua licença AutoPath vence em 30 dias. Quer renovar com 1 clique?", time: "—" }],
    opts: [
      { role: "produtor", label: "Renovar agora", next: "sLicOk", say: [{ f: "produtor", t: "Renovar agora", time: "—" }] },
      { role: "produtor", label: "Me liga depois", next: "sPausa", say: [{ f: "produtor", t: "Me liga depois", time: "—" }] },
    ],
  },
  oAcomp: {
    enter: [{ f: "dealer", t: "Vi que você ativou o AutoTrac 🎉 Quer uma dica rápida pra usar o AutoPath também e ganhar mais hectares?", time: "—" }],
    opts: [
      { role: "produtor", label: "Quero a dica", next: "sAcompOk", say: [{ f: "produtor", t: "Quero sim!", time: "—" }] },
      { role: "produtor", label: "Agora não", next: "sPausa", say: [{ f: "produtor", t: "Agora não, obrigado", time: "—" }] },
    ],
  },
  sAcompOk: {
    enter: [
      { f: "dealer", t: "Top! Te mandei um vídeo de 2 min e marquei um acompanhamento. Qualquer dúvida, chama 🌱", time: "—" },
      { f: "system", t: "Acompanhamento de adoção criado · AutoPath", time: "—", n: true },
    ],
    opts: [],
  },
};
const DEALER_INIT = [
  { id: "oManut", label: "Manutenção preventiva", Icon: Wrench },
  { id: "oLic", label: "Renovação de licença", Icon: RefreshCw },
  { id: "oAcomp", label: "Acompanhar uso", Icon: TrendingUp },
];
const CH_DEALER = [
  { label: "Pedir atualização", msg: "Carlos, como está o #BR-4471? Precisa de apoio?", reply: { f: "csc", t: "Tudo sob controle. Especialista já viu o sinal, decidindo o próximo passo." } },
  { label: "Sinalizar risco de SLA", msg: "Atenção: #BR-4471 perto do limite de SLA. Conseguem priorizar?", reply: { f: "csc", t: "Entendido, priorizando agora." } },
  { label: "Sugerir acionar Field Trainer", msg: "Sugiro acionar o Field Trainer pra resolver de vez. Topam?", reply: { f: "csc", t: "Boa, já vou propor a visita ao João." }, customerStep: "sAgenda" },
];
const CH_FIELD = [
  { label: "Pedir ETA da visita", msg: "Diego, qual a previsão pra visita do #BR-4471?", reply: { f: "field", t: "Saindo em breve, ETA ~1h quando confirmar." } },
  { label: "Pedir foto do talhão", msg: "Consegue mandar uma foto do talhão na visita?", reply: { f: "field", t: "Claro, envio assim que chegar 📷" } },
  { label: "Confirmar conclusão", msg: "Quando concluir, me confirma pra fechar o acompanhamento?", reply: { f: "field", t: "Combinado, aviso assim que validar a passada." } },
];
const DEALER_REPLY = [
  { label: "Atualizar a Deere", ev: { f: "csc", t: "Atualizando: caso em andamento, sem bloqueios." } },
  { label: "Pedir apoio na licença", ev: { f: "csc", t: "Pode ser que precise de apoio com a licença, dá pra verificar?" } },
];
const FIELD_REPLY = [
  { label: "Reportar à Deere", ev: { f: "field", t: "A caminho do talhão norte, tudo certo por aqui." } },
  { label: "Avisar conclusão", ev: { f: "field", t: "Recalibrado e validado. Pode fechar o acompanhamento ✅" } },
];

/* ===== dados de plataforma (Deere) ===== */
const CLIENTES = [
  { nome: "João Mendes", faz: "Santa Mônica", reg: "MT", dealer: "AgroBaggio", tech: "AutoTrac · AutoPath", uso: 13, csat: null, status: "Ativo · caso aberto", live: true },
  { nome: "Eduardo Lima", faz: "Primavera", reg: "GO", dealer: "AgroBaggio", tech: "AutoTrac · AutoPath", uso: 91, csat: 5, status: "Referência" },
  { nome: "Sandra Rocha", faz: "Vale Verde", reg: "MT", dealer: "Tracbel", tech: "AutoTrac", uso: 22, csat: null, status: "Em risco" },
  { nome: "Marcos Dias", faz: "do Cerrado", reg: "GO", dealer: "AgroBaggio", tech: "AutoTrac", uso: 0, csat: null, status: "Nunca ativou" },
  { nome: "Tiago Alves", faz: "Boa Vista", reg: "MT", dealer: "Tracbel", tech: "AutoTrac · AutoPath", uso: 47, csat: 4, status: "Ativo" },
  { nome: "Coop São José", faz: "—", reg: "RS", dealer: "AgroBaggio", tech: "AutoTrac", uso: 35, csat: 4, status: "Ativo" },
  { nome: "Renata Souza", faz: "Três Irmãos", reg: "GO", dealer: "AgroBaggio", tech: "AutoPath", uso: 68, csat: 5, status: "Ativo" },
  { nome: "Paulo Neto", faz: "Horizonte", reg: "MT", dealer: "Tracbel", tech: "AutoTrac", uso: 8, csat: 2, status: "Em risco" },
];
const CONSULTAS = [
  { id: "MT-7782", cliente: "Tiago Alves", ramo: "Ramo 2 · Sinal", prio: "Média", sla: "4h12", estado: "Em fila", resp: "CSC Tracbel" },
  { id: "RS-0471", cliente: "Coop São José", ramo: "Ramo 1 · Relatório", prio: "Baixa", sla: "1d", estado: "Em andamento", resp: "CSC AgroBaggio" },
  { id: "MT-1190", cliente: "Sandra Rocha", ramo: "Ramo 3 · Setup", prio: "Alta", sla: "Atrasado", estado: "Parado", resp: "—" },
  { id: "GO-3055", cliente: "Eduardo Lima", ramo: "Ramo 4 · Orientação", prio: "Baixa", sla: "—", estado: "Resolvido", resp: "Assistente Digital" },
];
const DEALERS_PERF = [
  { nome: "AgroBaggio · CSC", casos: 142, fcr: 71, tmedio: "2 min", remoto: 68, csat: 4.6 },
  { nome: "Tracbel", casos: 98, fcr: 58, tmedio: "6 min", remoto: 54, csat: 4.1 },
  { nome: "Comagril", casos: 64, fcr: 49, tmedio: "11 min", remoto: 41, csat: 3.8 },
  { nome: "Vimaqui", casos: 53, fcr: 62, tmedio: "4 min", remoto: 60, csat: 4.3 },
];
const FIELDS_PERF = [
  { nome: "Diego Martins", dealer: "AgroBaggio", visitas: 22, tvisita: "38 min", passada: 92, usod7: 87 },
  { nome: "Lucas Pereira", dealer: "Tracbel", visitas: 17, tvisita: "52 min", passada: 84, usod7: 73 },
  { nome: "Bruno Costa", dealer: "AgroBaggio", visitas: 14, tvisita: "41 min", passada: 88, usod7: 81 },
  { nome: "Felipe Nunes", dealer: "Comagril", visitas: 9, tvisita: "1h05", passada: 76, usod7: 64 },
];

/* ===== UI helpers ===== */
function Pill({ children, bg, fg }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: bg, color: fg, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>{children}</span>;
}
function statusOf(flags, step) {
  if (flags.resolved) return { t: "Resolvido", bg: C.okBg, fg: C.ok };
  if (step === "sPausa") return { t: "Pausado · não avança", bg: C.critBg, fg: C.crit };
  if (step === "s0") return { t: "Aguardando início", bg: C.line2, fg: C.ink3 };
  return { t: "Em andamento", bg: C.warnBg, fg: C.warn };
}
function estadoCor(e) {
  if (/resolv|referên/i.test(e)) return { bg: C.okBg, fg: C.ok };
  if (/risco|parado|atras|nunca/i.test(e)) return { bg: C.critBg, fg: C.crit };
  if (/fila|andamento/i.test(e)) return { bg: C.warnBg, fg: C.warn };
  return { bg: C.line2, fg: C.ink2 };
}
function Bar({ v, c }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 7 }}><div style={{ flex: 1, height: 6, background: C.line2, borderRadius: 6, overflow: "hidden" }}><div style={{ width: v + "%", height: "100%", background: c || C.green }} /></div><span style={{ fontSize: 11.5, fontWeight: 600, width: 30, textAlign: "right" }}>{v}%</span></div>;
}
function KPI({ label, value, sub, Icon, tone }) {
  const c = tone === "crit" ? C.crit : tone === "ok" ? C.ok : C.ink;
  return (
    <div style={{ border: "1px solid " + C.line, borderRadius: 10, padding: 13, background: "#fff" }}>
      <div className="flex items-center gap-2" style={{ color: C.ink3, fontSize: 11.5 }}><Icon size={13} style={{ color: tone === "crit" ? C.crit : C.green }} /> {label}</div>
      <div style={{ fontSize: 23, fontWeight: 700, color: c, marginTop: 4 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: C.ink3, marginTop: 1 }}>{sub}</div>}
    </div>
  );
}
function Tbl({ head, rows }) {
  return (
    <div style={{ border: "1px solid " + C.line, borderRadius: 10, overflow: "hidden", background: "#fff" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
        <thead><tr style={{ background: "#FBFCFA" }}>{head.map((h, i) => <th key={i} style={{ textAlign: i === 0 ? "left" : "left", padding: "9px 12px", fontSize: 11, fontWeight: 700, color: C.ink3, textTransform: "uppercase", letterSpacing: ".04em", borderBottom: "1px solid " + C.line }}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i} style={{ borderBottom: "1px solid " + C.line2 }}>{r.map((cell, j) => <td key={j} style={{ padding: "9px 12px", verticalAlign: "middle" }}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

const AV = {
  produtor: { kind: "person", label: "JM", bg: "#E7E4DC", c: C.ink2 },
  csc: { kind: "person", label: "C", bg: C.green, c: "#fff" },
  especialista: { kind: "person", label: "E", bg: C.green, c: "#fff" },
  field: { kind: "field", label: "DM", bg: C.olive, c: "#fff" },
  dealer: { kind: "company", bg: C.green, c: "#fff" },
  bot: { kind: "bot", bg: C.olive, c: "#fff" },
  deere: { kind: "brand", bg: C.side, c: C.yellow },
  system: { kind: "sys", bg: "#EBEFE6", c: C.ink3 },
};
function Avatar({ who, size = 30 }) {
  const a = AV[who] || AV.system;
  const base = { width: size, height: size, borderRadius: a.kind === "company" ? Math.round(size * 0.28) : size, background: a.bg, color: a.c, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0, position: "relative" };
  let inner;
  if (a.kind === "bot") inner = <Bot size={Math.round(size * 0.56)} />;
  else if (a.kind === "brand") inner = <ShieldCheck size={Math.round(size * 0.56)} />;
  else if (a.kind === "sys") inner = <Lock size={Math.round(size * 0.5)} />;
  else if (a.kind === "company") inner = <Building2 size={Math.round(size * 0.54)} />;
  else inner = <span style={{ fontSize: Math.round(size * 0.4) }}>{a.label}</span>;
  return (
    <div style={base}>
      {inner}
      {a.kind === "field" && <span style={{ position: "absolute", right: -2, bottom: -3, padding: "0 2px", height: Math.round(size * 0.42), minWidth: Math.round(size * 0.42), borderRadius: size, background: C.yellow, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: Math.round(size * 0.22), fontWeight: 800, color: C.greenD }}>JD</span>}
    </div>
  );
}
function ModeTog({ mode, setMode }) {
  const opt = (k, Icon, t, sub) => (
    <button onClick={() => setMode(k)} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: mode === k ? C.side : "#fff", color: mode === k ? "#fff" : C.ink2, border: "1px solid " + (mode === k ? C.side : C.line), borderRadius: 9, padding: "8px 13px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}><Icon size={15} /> <span>{t}<span style={{ display: "block", fontSize: 9.5, fontWeight: 500, opacity: .7 }}>{sub}</span></span></button>
  );
  return <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>{opt("whatsapp", Smartphone, "WhatsApp", "dia a dia")}{opt("painel", Monitor, "Painel", "a proposta")}</div>;
}
function PhoneFrame({ contact, sub, avatarWho, log, mine, typing, footer, height = 410 }) {
  return (
    <div style={{ width: 360, maxWidth: "100%", border: "10px solid #111", borderRadius: 30, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,.18)", background: C.waBg }}>
      <div style={{ background: C.waHead, color: "#fff", padding: "9px 13px", display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar who={avatarWho} size={34} />
        <div style={{ flex: 1 }}><div style={{ fontSize: 13.5, fontWeight: 700 }}>{contact}</div><div style={{ fontSize: 10.5, opacity: .85 }}>{typing ? "digitando…" : (sub || "online")}</div></div>
        <Phone size={16} />
      </div>
      <Thread log={log} mine={mine} typing={typing} height={height} bg={C.waBg} />
      <div style={{ background: "#F0F2EB", borderTop: "1px solid " + C.line, padding: 12 }}>{footer}</div>
    </div>
  );
}

function Bubble({ e, mine }) {
  const p = PROF[e.f] || PROF.system;
  if (e.n) {
    return (
      <div style={{ display: "flex", justifyContent: "center", margin: "8px 0" }}>
        <div style={{ background: "#EBEFE6", color: C.ink3, fontSize: 11, padding: "5px 11px", borderRadius: 7, display: "inline-flex", alignItems: "center", gap: 5, maxWidth: "88%" }}>
          <Lock size={11} /> <span>{e.t}</span>{e.time && <span style={{ opacity: .6 }}>· {e.time}</span>}
        </div>
      </div>
    );
  }
  const out = mine(e.f);
  const bg = out ? (e.f === "produtor" ? C.waOut : (e.f === "deere" ? "#E7ECEA" : C.okBg)) : "#fff";
  return (
    <div style={{ display: "flex", justifyContent: out ? "flex-end" : "flex-start", margin: "6px 0", animation: "pop .22s ease-out" }}>
      <div style={{ maxWidth: "80%", background: bg, border: "1px solid " + (out ? "transparent" : C.line), borderRadius: 9, padding: "7px 10px", boxShadow: "0 1px 1px rgba(0,0,0,.04)" }}>
        <div className="flex items-center gap-1" style={{ marginBottom: 2 }}>
          <Avatar who={e.f} size={18} />
          <span style={{ fontSize: 10.5, fontWeight: 700, color: p.c }}>{p.name}</span>
        </div>
        <div style={{ fontSize: 13, color: C.ink, lineHeight: 1.32 }}>{e.t}</div>
        {e.k === "media" && <div style={{ marginTop: 5, display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: C.ink3, background: "#F2F4EE", borderRadius: 6, padding: "3px 7px" }}><Paperclip size={11} /> áudio + foto</div>}
        {e.k === "card" && <div style={{ marginTop: 5, border: "1px dashed " + C.line, borderRadius: 6, padding: "5px 8px", fontSize: 11, color: C.ink3 }}>↳ resposta interativa</div>}
        <div style={{ fontSize: 9.5, color: C.ink3, textAlign: "right", marginTop: 2 }}>{e.time}{out && <CheckCheck size={11} style={{ display: "inline", marginLeft: 3, color: C.wa, verticalAlign: "middle" }} />}</div>
      </div>
    </div>
  );
}
function TypingB({ who, mine }) {
  const p = PROF[who] || PROF.system;
  const out = mine(who);
  return (
    <div style={{ display: "flex", justifyContent: out ? "flex-end" : "flex-start", margin: "6px 0" }}>
      <div style={{ background: "#fff", border: "1px solid " + C.line, borderRadius: 9, padding: "8px 12px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: p.c, marginBottom: 3 }}>{p.name} está digitando</div>
        <span className="dot" style={{ animationDelay: "0s" }} /><span className="dot" style={{ animationDelay: ".2s" }} /><span className="dot" style={{ animationDelay: ".4s" }} />
      </div>
    </div>
  );
}
function Thread({ log, mine, typing, height, bg }) {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [log.length, typing]);
  return (
    <div ref={ref} style={{ overflowY: "auto", padding: "10px 12px", height, background: bg || "transparent" }}>
      {log.map((e, i) => <Bubble key={i} e={e} mine={mine} />)}
      {typing && <TypingB who={typing} mine={mine} />}
    </div>
  );
}
function TurnoBanner({ on }) {
  if (!on) return null;
  return <div style={{ display: "flex", alignItems: "center", gap: 7, background: C.yellow, color: C.greenD, fontWeight: 700, fontSize: 12.5, padding: "8px 12px", borderRadius: 8, marginBottom: 12 }}><Bell size={14} /> É a sua vez de agir neste caso.</div>;
}
function Decisions({ opts, role, choose, waiting, busy }) {
  if (busy) return <div style={{ fontSize: 12.5, color: C.ink3, display: "flex", alignItems: "center", gap: 6, padding: "8px 0" }}><Radio size={14} style={{ color: C.green }} /> Conversa em andamento…</div>;
  const mineOpts = opts.filter(o => o.role === role);
  if (mineOpts.length) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: "uppercase", letterSpacing: ".05em" }}>Sua vez — escolha uma resposta</div>
        {mineOpts.map((o, i) => (
          <button key={i} onClick={() => choose(o)} style={{ textAlign: "left", background: "#fff", border: "1px solid " + C.green, color: C.greenD, borderRadius: 8, padding: "10px 12px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
            <span>{o.label}</span><ChevronRight size={15} />
          </button>
        ))}
      </div>
    );
  }
  if (waiting.length) return <div style={{ fontSize: 12.5, color: C.ink3, display: "flex", alignItems: "center", gap: 6, padding: "8px 0" }}><Clock size={14} /> Aguardando <b style={{ color: C.ink2 }}>{waiting.map(w => ROLE_NAME[w]).join(" / ")}</b> — troque de aba para agir.</div>;
  return <div style={{ fontSize: 12.5, color: C.ink3, display: "flex", alignItems: "center", gap: 6, padding: "8px 0" }}><Check size={14} style={{ color: C.ok }} /> Conversa encerrada.</div>;
}
function Coord({ label, sub, log, mine, typing, buttons, height }) {
  return (
    <div style={{ border: "1px solid " + C.line, borderRadius: 10, overflow: "hidden", background: "#fff" }}>
      <div style={{ background: "#FBFCFA", borderBottom: "1px solid " + C.line, padding: "8px 12px" }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}><Send size={13} style={{ color: C.side }} /> {label}</div>
        {sub && <div style={{ fontSize: 10.5, color: C.ink3, marginTop: 1 }}>{sub}</div>}
      </div>
      {log.length ? <Thread log={log} mine={mine} typing={typing} height={height || 150} /> :
        <div style={{ height: height || 150, display: "flex", alignItems: "center", justifyContent: "center", color: C.ink3, fontSize: 12, padding: 14, textAlign: "center" }}>Sem mensagens neste canal ainda.</div>}
      <div style={{ borderTop: "1px solid " + C.line, padding: 10, display: "flex", gap: 6, flexWrap: "wrap", background: "#FBFCFA" }}>
        {buttons.map((b, i) => <button key={i} onClick={b.onClick} style={{ ...bGhost, fontSize: 12 }}>{b.Icon && <b.Icon size={12} />}{b.label}</button>)}
      </div>
    </div>
  );
}

/* opções interativas dentro do fluxo do WhatsApp (não é um painel) */
function WAOptions({ opts, role, choose, busy, waiting }) {
  if (busy) return null;
  const mine = opts.filter(o => o.role === role);
  if (mine.length) {
    return (
      <div style={{ background: C.waBg, padding: "0 12px 10px", display: "flex", justifyContent: "flex-start" }}>
        <div style={{ width: "90%" }}>
          <div style={{ fontSize: 10, color: C.ink3, margin: "0 0 5px 2px", display: "flex", alignItems: "center", gap: 4 }}><MessageCircle size={10} /> Toque para responder</div>
          {mine.map((o, i) => (
            <button key={i} onClick={() => choose(o)} style={{ width: "100%", textAlign: "center", background: "#fff", border: "1px solid #C9D6CE", color: "#1A8A6D", borderRadius: 9, padding: "10px 12px", fontSize: 13.5, fontWeight: 600, cursor: "pointer", marginBottom: 6, boxShadow: "0 1px 2px rgba(0,0,0,.05)" }}>{o.label}</button>
          ))}
        </div>
      </div>
    );
  }
  if (waiting.length) return <div style={{ background: C.waBg, padding: "0 14px 10px", fontSize: 11.5, color: C.ink3, display: "flex", alignItems: "center", gap: 6 }}><Clock size={13} /> Aguardando AgroBaggio responder…</div>;
  return <div style={{ background: C.waBg, padding: "0 14px 10px", fontSize: 11.5, color: C.ink3, display: "flex", alignItems: "center", gap: 6 }}><Check size={13} style={{ color: C.ok }} /> Atendimento encerrado.</div>;
}
function Composer({ onWrite, disabled }) {
  const [v, setV] = useState("");
  const send = () => { if (v.trim() && !disabled) { onWrite(v.trim()); setV(""); } };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 10, background: "#F0F2EB", borderTop: "1px solid " + C.line }}>
      <input value={v} onChange={e => setV(e.target.value)} onKeyDown={e => { if (e.key === "Enter") send(); }} placeholder="Mensagem" disabled={disabled}
        style={{ flex: 1, border: "1px solid " + C.line, borderRadius: 20, padding: "9px 14px", fontSize: 13, outline: "none", background: "#fff", color: C.ink }} />
      <button onClick={send} disabled={disabled || !v.trim()} style={{ width: 38, height: 38, borderRadius: 38, background: C.wa, border: "none", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: disabled || !v.trim() ? "default" : "pointer", opacity: disabled || !v.trim() ? .5 : 1, flexShrink: 0 }}><Send size={17} /></button>
    </div>
  );
}

/* ===== VISTA PRODUTOR ===== */
const CHATS = [
  { who: "dealer", name: "Suporte AgroBaggio", prev: "Olá, João! Como posso ajudar?", time: "08:10", badge: 1, open: true },
  { who: "system", name: "Cooperativa Sorriso", prev: "Reunião quinta-feira 🌾", time: "ontem" },
  { who: "system", name: "Família 🌱", prev: "Vem almoçar domingo?", time: "ontem" },
  { who: "system", name: "Posto Sorriso", prev: "Nota fiscal enviada", time: "seg" },
];
function VProdutor({ log, opts, choose, waiting, busy, typing, turno, onWrite }) {
  const [screen, setScreen] = useState("list");
  const mine = f => f === "produtor";
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: 372, maxWidth: "100%" }}>
        <TurnoBanner on={turno} />
        <div style={{ border: "10px solid #111", borderRadius: 30, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,.18)", background: C.waBg }}>
          {screen === "list" ? (
            <div>
              <div style={{ background: C.waHead, color: "#fff", padding: "14px 16px 12px" }}><div style={{ fontSize: 18, fontWeight: 700 }}>WhatsApp</div></div>
              <div style={{ background: "#fff", minHeight: 432 }}>
                <div style={{ padding: "9px 14px", fontSize: 11.5, color: C.ink3, background: "#F7F8F4", borderBottom: "1px solid " + C.line }}>Escolha um contato para conversar. Para a demo, abra o <b>Suporte AgroBaggio</b>.</div>
                {CHATS.map((c, i) => (
                  <div key={i} onClick={() => c.open && setScreen("chat")} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderBottom: "1px solid " + C.line2, cursor: c.open ? "pointer" : "default", opacity: c.open ? 1 : .5 }}>
                    <Avatar who={c.who} size={44} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</span><span style={{ fontSize: 10.5, color: c.badge ? C.wa : C.ink3 }}>{c.time}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}><span style={{ fontSize: 12.5, color: C.ink3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.prev}</span>{c.badge && <span style={{ minWidth: 18, height: 18, borderRadius: 9, background: C.wa, color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px" }}>{c.badge}</span>}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ background: C.waHead, color: "#fff", padding: "9px 13px", display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={() => setScreen("list")} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", padding: 0, display: "flex" }}><ChevronLeft size={20} /></button>
                <Avatar who="dealer" size={34} />
                <div style={{ flex: 1 }}><div style={{ fontSize: 13.5, fontWeight: 700 }}>Suporte AgroBaggio</div><div style={{ fontSize: 10.5, opacity: .85 }}>{typing && typing !== "produtor" ? "digitando…" : "online"}</div></div>
                <Phone size={16} />
              </div>
              <Thread log={log.filter(e => !e.n)} mine={mine} typing={typing && typing !== "produtor" ? typing : null} height={344} bg={C.waBg} />
              <WAOptions opts={opts} role="produtor" choose={choose} busy={busy} waiting={waiting} />
              <Composer onWrite={onWrite} disabled={busy} />
            </div>
          )}
        </div>
        <div style={{ textAlign: "center", fontSize: 11.5, color: C.ink3, marginTop: 10, maxWidth: 372 }}>O produtor é pessoa física e só usa o WhatsApp. As opções aparecem dentro da conversa — e ele também pode escrever.</div>
      </div>
    </div>
  );
}

/* ===== VISTA DEALER ===== */
function VDealer({ log, opts, choose, waiting, busy, typing, flags, step, runStep, chDealer, chSendDealer, typingDealer, turno, reengage }) {
  const [mode, setMode] = useState("whatsapp");
  const s = statusOf(flags, step);
  const mineChat = f => f !== "produtor";
  const mineCh = f => f === "csc" || f === "dealer";
  const esperaProdutor = !busy && waiting.includes("produtor");
  const inics = (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{DEALER_INIT.map(a => <button key={a.id} onClick={() => runStep(a.id)} disabled={busy} style={{ ...bGhost, fontSize: 11.5 }}><a.Icon size={12} /> {a.label}</button>)}</div>
  );
  const reBox = esperaProdutor ? (
    <div style={{ marginTop: 9, padding: "8px 10px", background: C.warnBg, borderRadius: 8, fontSize: 11.5, color: C.warn }}>
      <div style={{ marginBottom: 6, display: "flex", alignItems: "center", gap: 5 }}><Clock size={12} /> A vez é do produtor. Se ele não responder:</div>
      <button onClick={reengage} style={{ ...bGhost, fontSize: 11.5 }}><RefreshCw size={12} /> Reengajar (reenviar mensagem)</button>
    </div>
  ) : null;
  const acoes = (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: C.green, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 6 }}>Ações do dealer</div>
      <Decisions opts={opts} role="dealer" choose={choose} waiting={waiting} busy={busy} />
      {reBox}
      <div style={{ marginTop: 10, borderTop: "1px dashed " + C.line, paddingTop: 9 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.ink3, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 6 }}>Iniciativas proativas</div>{inics}
      </div>
    </div>
  );
  const prodEstado = busy ? { t: "respondendo…", bg: C.warnBg, fg: C.warn } : esperaProdutor ? { t: "aguardando ele", bg: C.warnBg, fg: C.warn } : flags.resolved ? { t: "resolvido", bg: C.okBg, fg: C.ok } : { t: "em conversa", bg: C.line2, fg: C.ink2 };
  const fieldEstado = flags.resolved === "campo" ? { t: "visita concluída", bg: C.okBg, fg: C.ok } : flags.agenda ? { t: "agendado", bg: C.warnBg, fg: C.warn } : { t: "standby", bg: C.line2, fg: C.ink3 };
  const parte = (who, label, est) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}><Avatar who={who} size={22} /><span style={{ fontSize: 12.5, fontWeight: 600, flex: 1 }}>{label}</span><Pill bg={est.bg} fg={est.fg}>{est.t}</Pill></div>
  );
  return (
    <div>
      <TurnoBanner on={turno} />
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
        <Avatar who="dealer" size={42} />
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>AgroBaggio <span style={{ fontSize: 12, fontWeight: 400, color: C.ink3 }}>· concessionário</span></div>
          <div style={{ fontSize: 12, color: C.ink3 }}>Atendendo João Mendes · #BR-4471 · Sorriso/MT</div>
        </div>
        <Pill bg={s.bg} fg={s.fg}>{s.t}</Pill>
        <Pill bg={C.line2} fg={C.ink2}><Star size={11} /> CSAT {flags.csat || "—"}</Pill>
      </div>
      <ModeTog mode={mode} setMode={setMode} />
      {mode === "whatsapp" ? (
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PhoneFrame contact="João Mendes" sub="produtor · #BR-4471" avatarWho="produtor" log={log} mine={mineChat} typing={typing} height={380} footer={acoes} />
          </div>
          <div style={{ textAlign: "center", fontSize: 11.5, color: C.ink3, marginTop: 10 }}>No celular o dealer responde e toma iniciativa pelo mesmo WhatsApp. Para a foto completa, troque para <b>Painel</b>.</div>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 420px", minWidth: 320, border: "1px solid " + C.line, borderRadius: 10, overflow: "hidden", background: "#fff" }}>
            <div style={{ background: "#FBFCFA", borderBottom: "1px solid " + C.line, padding: "9px 12px", fontSize: 12.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}><MessageCircle size={14} style={{ color: C.green }} /> Conversa do cliente <span style={{ fontWeight: 400, color: C.ink3 }}>· mesmo fio, visão do dealer</span></div>
            <Thread log={log} mine={mineChat} typing={typing} height={300} />
            <div style={{ borderTop: "1px solid " + C.line, padding: 12, background: "#FBFCFA" }}>{acoes}</div>
          </div>
          <div style={{ flex: "0 0 300px", minWidth: 270, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ border: "1px solid " + C.line, borderRadius: 10, padding: 13, background: "#fff" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.ink3, textTransform: "uppercase", marginBottom: 6 }}>Estado das partes</div>
              {parte("produtor", "Produtor", prodEstado)}
              {parte("dealer", "Dealer (você)", { t: "atendendo", bg: C.okBg, fg: C.ok })}
              {parte("field", "Field Trainer", fieldEstado)}
            </div>
            <Coord label="Coordenação · John Deere" sub={chDealer.length ? "A Deere está acompanhando" : "Canal com a Deere"} log={chDealer} mine={mineCh} typing={typingDealer} height={130}
              buttons={DEALER_REPLY.map(r => ({ label: r.label, Icon: Send, onClick: () => chSendDealer(r.ev) }))} />
            <div style={{ border: "1px solid " + C.line, borderRadius: 10, padding: 13, background: "#fff" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.ink3, textTransform: "uppercase", marginBottom: 8 }}>Checklist de ativação</div>
              <Check2 t="Compra" done /><Check2 t="Setup técnico" done /><Check2 t="Setup digital (OpsCenter)" done /><Check2 t="Primeira operação" done={!!flags.resolved} /><Check2 t="Treinamento" done={flags.resolved === "campo"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Check2({ t, done }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, padding: "3px 0" }}><span style={{ width: 16, height: 16, borderRadius: 5, background: done ? C.green : "#fff", border: "1px solid " + (done ? C.green : C.line), display: "flex", alignItems: "center", justifyContent: "center" }}>{done && <Check size={11} color="#fff" />}</span><span style={{ color: done ? C.ink : C.ink3 }}>{t}</span></div>;
}

/* ===== VISTA FIELD TRAINER ===== */
function VField({ log, opts, choose, waiting, busy, typing, flags, step, chField, chSendField, typingField, turno }) {
  const [mode, setMode] = useState("whatsapp");
  const active = ["sConfirmado", "sCaminho", "sEmCampo", "sResolvido"].includes(step) || flags.agenda;
  const mineChat = f => f !== "produtor";
  const mineCh = f => f === "field";
  const backlog = (
    <div style={{ border: "1px solid " + C.line, borderRadius: 10, background: "#fff", padding: 14 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.ink3, textTransform: "uppercase", marginBottom: 8 }}>Backlog de campo</div>
      {active ? (
        <div style={{ border: "1px solid " + C.olive, borderRadius: 9, padding: 11, background: "#F6F7F0" }}>
          <div style={{ fontSize: 13.5, fontWeight: 700 }}>João · #BR-4471</div>
          <div style={{ fontSize: 12, color: C.ink3, margin: "2px 0 7px" }}>AutoTrac não engata · talhão norte</div>
          <Pill bg={C.warnBg} fg={C.warn}><Calendar size={11} /> {flags.agenda || "a agendar"}</Pill>
          <div style={{ marginTop: 8, fontSize: 12, color: C.ink2, display: "flex", alignItems: "center", gap: 5 }}><MapPin size={12} /> Faz. Santa Mônica · Sorriso/MT</div>
        </div>
      ) : <div style={{ fontSize: 12.5, color: C.ink3 }}>Nenhuma visita atribuída. Aparece quando o dealer deriva ou o produtor confirma um agendamento.</div>}
    </div>
  );
  const acoes = (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: C.olive, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 6 }}>Ações do Field Trainer</div>
      <Decisions opts={opts} role="field" choose={choose} waiting={waiting} busy={busy} />
    </div>
  );
  return (
    <div>
      <TurnoBanner on={turno} />
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
        <Avatar who="field" size={42} />
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Diego Martins <span style={{ fontSize: 12, fontWeight: 400, color: C.ink3 }}>· Field Trainer (brandeado Deere)</span></div>
          <div style={{ fontSize: 12, color: C.ink3 }}>Pessoa em campo · região MT</div>
        </div>
      </div>
      <ModeTog mode={mode} setMode={setMode} />
      {mode === "whatsapp" ? (
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PhoneFrame contact="João Mendes" sub="produtor · #BR-4471" avatarWho="produtor" log={log} mine={mineChat} typing={typing} height={400} footer={acoes} />
          </div>
          <div style={{ textAlign: "center", fontSize: 11.5, color: C.ink3, marginTop: 10 }}>No campo, o Field Trainer avisa o produtor pelo WhatsApp. No <b>Painel</b> vê o backlog e o canal com a Deere.</div>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ flex: "0 0 290px", minWidth: 260, display: "flex", flexDirection: "column", gap: 12 }}>
            {backlog}
            <Coord label="Coordenação · John Deere" sub={chField.length ? "A Deere está acompanhando a visita" : "Canal com a Deere"} log={chField} mine={mineCh} typing={typingField} height={150}
              buttons={FIELD_REPLY.map(r => ({ label: r.label, Icon: Send, onClick: () => chSendField(r.ev) }))} />
          </div>
          <div style={{ flex: "1 1 380px", minWidth: 320, border: "1px solid " + C.line, borderRadius: 10, overflow: "hidden", background: "#fff" }}>
            <div style={{ background: "#FBFCFA", borderBottom: "1px solid " + C.line, padding: "9px 12px", fontSize: 12.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}><Wrench size={14} style={{ color: C.olive }} /> Conversa <span style={{ fontWeight: 400, color: C.ink3 }}>· visão do Field Trainer</span></div>
            <Thread log={log} mine={mineChat} typing={typing} height={360} />
            <div style={{ borderTop: "1px solid " + C.line, padding: 12, background: "#FBFCFA" }}>{acoes}</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== VISTA DEERE — plataforma de governança ===== */
const DEERE_NAV = [
  ["visao", LayoutGrid, "Visão geral"],
  ["carteira", Users, "Carteira"],
  ["acomp", Activity, "Acompanhamento"],
  ["consultas", Inbox, "Consultas"],
  ["dealers", ShieldCheck, "Dealers"],
  ["fields", Wrench, "Field Trainers"],
  ["agentes", Bot, "Agentes"],
  ["plataforma", Server, "Plataforma"],
];
function VDeere({ log, flags, step, typing, chDealer, chField, sendDealer, sendField, typingDealer, typingField }) {
  const [sec, setSec] = useState("visao");
  const [ch, setCh] = useState("dealer");
  const s = statusOf(flags, step);
  const stalled = step === "sPausa";
  const real = log.filter(e => !e.n);
  const last = real.length ? real[real.length - 1].f : null;
  const seen = new Set(log.map(e => e.f));
  const csatMed = flags.csat ? ((flags.csat + 13) / 4).toFixed(1) : "4.5";

  function Visao() {
    return (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 12 }}>
          <KPI label="Atendimentos hoje" value="128" sub="+12% vs ontem" Icon={MessageCircle} />
          <KPI label="1ª resposta média" value="2 min" sub="meta 3 min" Icon={Clock} tone="ok" />
          <KPI label="FCR" value="64%" sub="resolvido no 1º contato" Icon={Zap} />
          <KPI label="CSAT médio" value={csatMed} sub="de 5" Icon={Star} tone="ok" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 14 }}>
          <KPI label="Resolvido remoto" value="64%" sub="sem visita de campo" Icon={Bot} />
          <KPI label="Visitas de campo" value="22" sub="esta semana" Icon={Wrench} />
          <KPI label="Casos abertos" value="17" sub="em andamento" Icon={Inbox} />
          <KPI label="Casos parados" value={stalled ? "1" : "0"} sub="sem movimento" Icon={AlertTriangle} tone={stalled ? "crit" : undefined} />
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 340px", border: "1px solid " + (stalled ? C.crit : C.green), borderRadius: 10, padding: 14, background: stalled ? C.critBg : C.okBg }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: stalled ? C.crit : C.greenD, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 6, display: "flex", alignItems: "center", gap: 5 }}><Radio size={12} /> Caso ao vivo</div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>João · #BR-4471 · AutoTrac</div>
            <div style={{ fontSize: 12.5, color: C.ink2, margin: "3px 0 9px" }}>AgroBaggio · Sorriso/MT · {s.t}</div>
            <button onClick={() => setSec("acomp")} style={{ ...bGhost }}>Abrir acompanhamento <ChevronRight size={14} /></button>
          </div>
          <div style={{ flex: "1 1 300px", border: "1px solid " + C.line, borderRadius: 10, padding: 14, background: "#fff" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.ink3, textTransform: "uppercase", marginBottom: 10 }}>Consultas por ramo (hoje)</div>
            {[["Ramo 1 · Relatórios", 28, C.olive], ["Ramo 2 · Sinal/Conectividade", 41, C.green], ["Ramo 3 · Setup/Ativação", 33, C.greenD], ["Ramo 4 · Orientação", 26, C.gray]].map((r, i) => (
              <div key={i} style={{ marginBottom: 9 }}><div style={{ fontSize: 12, color: C.ink2, marginBottom: 3 }}>{r[0]}</div><Bar v={r[1]} c={r[2]} /></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  function Carteira() {
    return (
      <div>
        <div style={{ fontSize: 12.5, color: C.ink3, marginBottom: 12 }}>Base monitorada · {CLIENTES.length} clientes em destaque · {CLIENTES.filter(c => /risco|nunca/i.test(c.status)).length} em risco</div>
        <Tbl head={["Cliente", "Região", "Dealer", "Tecnologia", "Uso", "CSAT", "Estado"]}
          rows={CLIENTES.map(c => {
            const ec = estadoCor(c.status);
            return [
              <span style={{ fontWeight: 600 }}>{c.nome} {c.live && <span style={{ color: C.green, fontSize: 11 }}>● ao vivo</span>}<div style={{ fontSize: 11, color: C.ink3, fontWeight: 400 }}>Faz. {c.faz}</div></span>,
              c.reg, c.dealer, c.tech,
              <div style={{ width: 90 }}><Bar v={c.uso} c={c.uso < 25 ? C.crit : c.uso < 60 ? C.warn : C.green} /></div>,
              c.csat ? <Pill bg={C.line2} fg={C.ink2}><Star size={10} /> {c.csat}</Pill> : <span style={{ color: C.ink3 }}>—</span>,
              <Pill bg={ec.bg} fg={ec.fg}>{c.status}</Pill>,
            ];
          })} />
      </div>
    );
  }
  function Acomp() {
    const mineMon = f => f !== "produtor";
    const mineDeere = f => f === "deere";
    const stat = f => typing === f ? { t: "digitando…", c: C.green, live: true } : last === f ? { t: "falou agora", c: C.green, live: true } : seen.has(f) ? { t: "no caso", c: C.ink3 } : { t: "—", c: C.ink3 };
    const roster = [["produtor", "Cliente"], ["csc", "Dealer · CSC"], ["especialista", "Dealer · especialista"], ["field", "Field Trainer"]];
    return (
      <div>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 12 }}>
          {["Follow-up D+7 · 6 casos", "Pós-visita · 3", "Adoção AutoPath · 9", "CSAT baixo · 1"].map((t, i) => <Pill key={i} bg={C.line2} fg={C.ink2}>{t}</Pill>)}
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 360px", minWidth: 300, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ border: "1px solid " + C.line, borderRadius: 10, overflow: "hidden", background: "#fff" }}>
              <div style={{ background: "#FBFCFA", borderBottom: "1px solid " + C.line, padding: "9px 12px", fontSize: 12.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}><ShieldCheck size={14} style={{ color: C.side }} /> Monitor do caso · #BR-4471 <span style={{ fontWeight: 400, color: C.ink3 }}>· somente leitura</span></div>
              <Thread log={log} mine={mineMon} typing={typing} height={260} bg="#FBFCFA" />
            </div>
            <div style={{ border: "1px solid " + C.line, borderRadius: 10, background: "#fff", padding: 13 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.ink3, textTransform: "uppercase", marginBottom: 9, display: "flex", alignItems: "center", gap: 5 }}><Users size={12} /> Partes envolvidas — ao vivo</div>
              {roster.map(([f, role]) => { const st = stat(f); const P = PROF[f]; return (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 9, padding: "5px 0" }}>
                  <span style={{ width: 8, height: 8, borderRadius: 8, background: st.live ? C.green : C.line, boxShadow: st.live ? "0 0 0 3px " + C.okBg : "none" }} />
                  <P.Icon size={14} style={{ color: P.c }} />
                  <span style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>{P.name.split(" · ")[0]}<span style={{ fontWeight: 400, color: C.ink3 }}> · {role}</span></span>
                  <span style={{ fontSize: 11.5, color: st.c, fontWeight: st.live ? 700 : 400 }}>{st.t}</span>
                </div>
              ); })}
            </div>
          </div>
          <div style={{ flex: "0 0 330px", minWidth: 280, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.ink3, textTransform: "uppercase", letterSpacing: ".05em" }}>Falar com as partes</div>
            <div style={{ display: "flex", gap: 6 }}>
              {[["dealer", "Dealer · Carlos", UserCog], ["field", "Field · Diego", Wrench]].map(([k, t, Icon]) => (
                <button key={k} onClick={() => setCh(k)} style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, background: ch === k ? C.side : "#fff", color: ch === k ? "#fff" : C.ink2, border: "1px solid " + (ch === k ? C.side : C.line), borderRadius: 8, padding: "8px 10px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
                  <Icon size={13} /> {t}{((k === "dealer" && chDealer.length) || (k === "field" && chField.length)) ? <span style={{ width: 6, height: 6, borderRadius: 6, background: ch === k ? C.yellow : C.green }} /> : null}
                </button>
              ))}
            </div>
            {ch === "dealer"
              ? <Coord label="Canal Deere ↔ AgroBaggio" sub="Coordenação interna · não vai ao cliente" log={chDealer} mine={mineDeere} typing={typingDealer} height={200}
                  buttons={CH_DEALER.map(m => ({ label: m.label, Icon: Send, onClick: () => sendDealer(m) }))} />
              : <Coord label="Canal Deere ↔ Field Trainer" sub="Coordenação interna · não vai ao cliente" log={chField} mine={mineDeere} typing={typingField} height={200}
                  buttons={CH_FIELD.map(m => ({ label: m.label, Icon: Send, onClick: () => sendField(m) }))} />}
            {stalled && <div style={{ border: "1px solid " + C.crit, borderRadius: 10, padding: 12, background: C.critBg, fontSize: 12, color: C.crit }}><b>Caso parado no produtor.</b> Use o canal do Dealer para pedir retomada.</div>}
          </div>
        </div>
      </div>
    );
  }
  function Consultas() {
    const live = { id: "BR-4471", cliente: "João Mendes", ramo: "Ramo 4 · Orientação", prio: "Alta", sla: flags.resolved ? "—" : "2h40", estado: flags.resolved ? "Resolvido" : stalled ? "Parado" : "Em andamento", resp: "AgroBaggio" };
    const rows = [live, ...CONSULTAS];
    return (
      <div>
        <div style={{ fontSize: 12.5, color: C.ink3, marginBottom: 12 }}>Fila de consultas de toda a rede · ordenadas por prioridade e SLA</div>
        <Tbl head={["#", "Cliente", "Ramo", "Prioridade", "SLA", "Estado", "Responsável"]}
          rows={rows.map(c => {
            const ec = estadoCor(c.estado);
            const pc = c.prio === "Alta" ? C.crit : c.prio === "Média" ? C.warn : C.ink3;
            return [
              <span style={{ fontWeight: 600 }}>{c.id}{c.id === "BR-4471" && <span style={{ color: C.green, fontSize: 11 }}> ●</span>}</span>,
              c.cliente, c.ramo,
              <span style={{ color: pc, fontWeight: 600 }}>{c.prio}</span>,
              <span style={{ color: /atras/i.test(c.sla) ? C.crit : C.ink2, fontWeight: 600 }}>{c.sla}</span>,
              <Pill bg={ec.bg} fg={ec.fg}>{c.estado}</Pill>,
              c.resp,
            ];
          })} />
      </div>
    );
  }
  function Dealers() {
    return (
      <div>
        <div style={{ fontSize: 12.5, color: C.ink3, marginBottom: 12 }}>Desempenho e resolução por concessionário</div>
        <Tbl head={["Dealer", "Casos", "FCR", "Tempo médio", "Resolvido remoto", "CSAT"]}
          rows={DEALERS_PERF.map(d => [
            <span style={{ fontWeight: 600 }}>{d.nome}</span>, d.casos,
            <div style={{ width: 110 }}><Bar v={d.fcr} c={d.fcr < 55 ? C.warn : C.green} /></div>,
            d.tmedio,
            <div style={{ width: 110 }}><Bar v={d.remoto} c={C.olive} /></div>,
            <Pill bg={C.line2} fg={C.ink2}><Star size={10} /> {d.csat}</Pill>,
          ])} />
      </div>
    );
  }
  function Fields() {
    return (
      <div>
        <div style={{ fontSize: 12.5, color: C.ink3, marginBottom: 12 }}>Resolução em campo · qualidade da 1ª passada e adoção a D+7</div>
        <Tbl head={["Field Trainer", "Dealer", "Visitas", "Tempo médio", "1ª passada", "Uso D+7"]}
          rows={FIELDS_PERF.map(d => [
            <span style={{ fontWeight: 600 }}>{d.nome}</span>, d.dealer, d.visitas, d.tvisita,
            <div style={{ width: 100 }}><Bar v={d.passada} c={C.green} /></div>,
            <div style={{ width: 100 }}><Bar v={d.usod7} c={d.usod7 < 70 ? C.warn : C.green} /></div>,
          ])} />
      </div>
    );
  }
  function Agentes() {
    const card = (titulo, Icon, estado, ec, linhas) => (
      <div style={{ border: "1px solid " + C.line, borderRadius: 10, padding: 14, background: "#fff", flex: "1 1 240px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><Icon size={16} style={{ color: C.green }} /><span style={{ fontWeight: 700, fontSize: 13.5, flex: 1 }}>{titulo}</span><Pill bg={ec.bg} fg={ec.fg}>{estado}</Pill></div>
        {linhas.map((l, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, padding: "3px 0" }}><span style={{ color: C.ink3 }}>{l[0]}</span><span style={{ fontWeight: 600 }}>{l[1]}</span></div>)}
      </div>
    );
    return (
      <div>
        <div style={{ fontSize: 12.5, color: C.ink3, marginBottom: 12 }}>Estado operacional dos agentes que atendem a rede</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {card("Assistente Digital", Bot, "Operando", { bg: C.okBg, fg: C.ok }, [["Conversas hoje", "340"], ["Taxa de contenção", "58%"], ["Deflexão p/ humano", "41%"], ["CSAT do bot", "4.3"]])}
          {card("Fila CSC (dealers)", UserCog, "6 online", { bg: C.okBg, fg: C.ok }, [["Atendentes online", "6"], ["Na fila agora", "3"], ["Tempo médio resposta", "2 min"], ["SLA cumprido", "92%"]])}
          {card("Field Trainers", Wrench, "3 em campo", { bg: C.warnBg, fg: C.warn }, [["Disponíveis", "4"], ["Em campo", "3"], ["Visitas hoje", "11"], ["Backlog", "8"]])}
        </div>
      </div>
    );
  }
  function Plataforma() {
    const integ = [
      ["OpsCenter", "Sincronizado há 4 min", true],
      ["CRM (base instalada)", "Sincronizado há 8 min", true],
      ["WhatsApp Business API", "Latência 120 ms", true],
      ["StarFire / RTK (sinal)", "Operacional", true],
      ["Pagamentos (renovações)", "Degradado · fila lenta", false],
    ];
    return (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 14 }}>
          <KPI label="Uptime (30d)" value="99,9%" Icon={Activity} tone="ok" />
          <KPI label="Eventos hoje" value="48,2k" sub="mensagens + ações" Icon={Zap} />
          <KPI label="Erros (24h)" value="3" sub="não críticos" Icon={AlertTriangle} />
          <KPI label="Última sync" value="4 min" sub="OpsCenter" Icon={RefreshCw} tone="ok" />
        </div>
        <div style={{ border: "1px solid " + C.line, borderRadius: 10, background: "#fff", overflow: "hidden" }}>
          <div style={{ background: "#FBFCFA", borderBottom: "1px solid " + C.line, padding: "9px 12px", fontSize: 12.5, fontWeight: 700 }}>Integrações</div>
          {integ.map((it, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderBottom: i < integ.length - 1 ? "1px solid " + C.line2 : "none" }}>
              {it[2] ? <CheckCircle size={16} style={{ color: C.ok }} /> : <XCircle size={16} style={{ color: C.warn }} />}
              <span style={{ fontWeight: 600, fontSize: 13, flex: 1 }}>{it[0]}</span>
              <span style={{ fontSize: 12, color: it[2] ? C.ink3 : C.warn }}>{it[1]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const RENDER = { visao: Visao, carteira: Carteira, acomp: Acomp, consultas: Consultas, dealers: Dealers, fields: Fields, agentes: Agentes, plataforma: Plataforma };
  const Section = RENDER[sec];
  const title = DEERE_NAV.find(n => n[0] === sec)[2];

  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      <div style={{ flex: "0 0 188px", border: "1px solid " + C.line, borderRadius: 10, background: "#fff", overflow: "hidden" }}>
        <div style={{ padding: "12px 14px", borderBottom: "1px solid " + C.line, fontSize: 12, fontWeight: 700, color: C.side, display: "flex", alignItems: "center", gap: 7 }}><ShieldCheck size={15} /> Governança Brasil</div>
        {DEERE_NAV.map(([k, Icon, t]) => {
          const on = sec === k;
          const alert = k === "consultas" && stalled;
          return (
            <button key={k} onClick={() => setSec(k)} style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 9, background: on ? C.okBg : "transparent", color: on ? C.greenD : C.ink2, border: "none", borderLeft: "3px solid " + (on ? C.green : "transparent"), padding: "10px 13px", fontSize: 13, fontWeight: on ? 700 : 500, cursor: "pointer" }}>
              <Icon size={15} style={{ color: on ? C.green : C.ink3 }} /> <span style={{ flex: 1 }}>{t}</span>
              {alert && <span style={{ width: 7, height: 7, borderRadius: 7, background: C.crit }} />}
            </button>
          );
        })}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>{title}</div>
        <Section />
      </div>
    </div>
  );
}

/* ===== mockups de ferramenta (previews tipo screenshot) ===== */
function MockChrome({ title, icon: Ic, children }) {
  return (
    <div style={{ width: 330, maxWidth: "100%", border: "1px solid " + C.line, borderRadius: 10, overflow: "hidden", background: "#fff", boxShadow: "0 6px 20px rgba(0,0,0,.10)" }}>
      <div style={{ background: C.side, color: "#fff", padding: "7px 11px", display: "flex", alignItems: "center", gap: 7, fontSize: 11.5, fontWeight: 700 }}><Ic size={13} /> {title}</div>
      <div style={{ padding: 12 }}>{children}</div>
    </div>
  );
}
function MockWA({ n }) {
  const out = n.who === "produtor" && !n.ret;
  return (
    <div style={{ width: 250, maxWidth: "100%", border: "7px solid #111", borderRadius: 22, overflow: "hidden", background: C.waBg, margin: "0 auto", boxShadow: "0 8px 24px rgba(0,0,0,.14)" }}>
      <div style={{ background: C.waHead, color: "#fff", padding: "7px 10px", display: "flex", alignItems: "center", gap: 7, fontSize: 11.5, fontWeight: 700 }}><Avatar who={n.who === "bot" ? "bot" : "dealer"} size={20} /> {n.who === "bot" ? "Assistente Digital" : "Suporte AgroBaggio"}</div>
      <div style={{ padding: 11, minHeight: 120, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 6 }}>
        <div style={{ alignSelf: out ? "flex-end" : "flex-start", maxWidth: "88%", background: out ? C.waOut : "#fff", border: out ? "none" : "1px solid " + C.line, borderRadius: 9, padding: "7px 10px", fontSize: 12, lineHeight: 1.35 }}>
          {n.msg}<div style={{ fontSize: 8.5, color: C.ink3, textAlign: "right", marginTop: 2 }}>{n.time}{out && <CheckCheck size={10} style={{ display: "inline", marginLeft: 3, color: C.wa, verticalAlign: "middle" }} />}</div>
        </div>
      </div>
    </div>
  );
}
function MockPanel({ n }) {
  return (
    <MockChrome title="Operations Support · Painel do dealer" icon={Monitor}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 9px", border: "1px solid " + C.line, borderRadius: 7, marginBottom: 9 }}>
        <Avatar who="produtor" size={26} /><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600 }}>João Mendes · #BR-4471</div><div style={{ fontSize: 10, color: C.ink3 }}>AutoTrac · Sorriso/MT</div></div><Pill bg={C.warnBg} fg={C.warn}>em andamento</Pill>
      </div>
      <div style={{ fontSize: 10, fontWeight: 700, color: C.ink3, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 5 }}>Ação do CSC no painel</div>
      <div style={{ background: C.okBg, border: "1px solid " + C.green, borderRadius: 7, padding: "8px 10px", fontSize: 12, color: C.greenD }}>{n.msg}</div>
    </MockChrome>
  );
}
function MockRemoto({ n }) {
  return (
    <MockChrome title="Diagnóstico remoto · StarFire" icon={Signal}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 10 }}>
        {[1, 2, 3, 4, 5].map(b => <div key={b} style={{ width: 11, height: 6 + b * 6, borderRadius: 2, background: b <= 2 ? C.crit : C.line2 }} />)}
        <span style={{ fontSize: 11, color: C.crit, fontWeight: 700, marginLeft: 7 }}>2/5 · sinal fraco</span>
      </div>
      <div style={{ fontSize: 10.5, color: C.ink3, marginBottom: 8 }}>Telemetria · antena · posição · histórico de passadas</div>
      <div style={{ background: "#FBFCFA", border: "1px solid " + C.line, borderRadius: 7, padding: "8px 10px", fontSize: 12 }}>{n.msg}</div>
    </MockChrome>
  );
}
function MockField({ n }) {
  return (
    <div style={{ width: 250, maxWidth: "100%", border: "7px solid #111", borderRadius: 22, overflow: "hidden", background: "#fff", margin: "0 auto", boxShadow: "0 8px 24px rgba(0,0,0,.14)" }}>
      <div style={{ background: C.olive, color: "#fff", padding: "8px 11px", display: "flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 700 }}><Wrench size={14} /> Field Trainer · app</div>
      <div style={{ padding: 12, minHeight: 116 }}>
        <div style={{ border: "1px solid " + C.olive, borderRadius: 8, padding: 10, background: "#F6F7F0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}><Avatar who="field" size={22} /><span style={{ fontSize: 12, fontWeight: 700 }}>João · #BR-4471</span></div>
          <div style={{ fontSize: 10.5, color: C.ink3, marginBottom: 7 }}>AutoTrac · talhão norte · Sorriso/MT</div>
          <div style={{ fontSize: 11.5, color: C.ink, background: "#fff", border: "1px solid " + C.line, borderRadius: 6, padding: "6px 8px" }}>{n.msg}</div>
        </div>
      </div>
    </div>
  );
}
function ToolPreview({ n }) {
  if (n.who === "produtor" || n.who === "bot") return <MockWA n={n} />;
  if (n.who === "especialista") return <MockRemoto n={n} />;
  if (n.who === "field") return <MockField n={n} />;
  return <MockPanel n={n} />;
}

/* ===== FLUXO · clicável, passo a passo, com preview da ferramenta ===== */
const FLANES = [
  { k: "produtor", who: "produtor", t: "Produtor", s: "WhatsApp", c: C.gray },
  { k: "bot", who: "bot", t: "Assistente Digital", s: "automação", c: C.olive },
  { k: "csc", who: "csc", t: "Dealer · CSC", s: "painel", c: C.green },
  { k: "esp", who: "especialista", t: "Especialista remoto", s: "telemetria", c: C.green },
  { k: "field", who: "field", t: "Field Trainer", s: "app + campo", c: C.olive },
];
const FLY = { produtor: 118, bot: 184, csc: 250, esp: 316, field: 384 };
const STG = [
  { who: "produtor", lane: "produtor", t: "Manda a consulta", time: "08:12", canal: "WhatsApp", desc: "O produtor abre o WhatsApp e descreve o problema do AutoTrac, com áudio e foto.", msg: "O AutoTrac não engata na X9. Já tentei reiniciar." },
  { who: "bot", lane: "bot", t: "Triagem automática", time: "08:12", canal: "Automação", desc: "O Assistente Digital transcreve, classifica como Ramo 4 e abre o caso #BR-4471 — sem fila, sem formulário.", msg: "Classifiquei como AutoTrac não engata (Ramo 4). Abri o caso #BR-4471." },
  { who: "csc", lane: "csc", t: "CSC · 1ª resposta", time: "08:14", canal: "Painel", desc: "O CSC do dealer vê o caso no painel e responde com um primeiro contorno.", msg: "Carlos vai verificar o sinal e já orienta o produtor." },
  { who: "produtor", lane: "produtor", t: "Recebe contorno + nº", time: "08:14", ret: true, canal: "WhatsApp", desc: "O produtor recebe a 1ª resposta e o número do caso — volta para o WhatsApp dele.", msg: "Recebi! Vou verificar seu sinal remotamente, um instante 🙌" },
  { who: "especialista", lane: "esp", t: "Analisa sinal remoto", time: "08:21", canal: "Telemetria", desc: "O especialista remoto acessa a telemetria do equipamento: sinal StarFire fraco (2/5). Tenta resolver sem ir a campo.", msg: "Sinal StarFire fraco no talhão. Provável posição da antena." },
  { who: "csc", lane: "csc", t: "Decide → aciona Field", time: "08:25", canal: "Painel", desc: "Não fecha remoto. O dealer decide acionar o Field Trainer e propõe a visita ao produtor.", msg: "Não fecha remoto → vou mandar o Field Trainer. Agendar visita." },
  { who: "field", lane: "field", t: "Recebe o pedido e agenda", time: "08:30", canal: "App de campo", desc: "O Field Trainer recebe a derivação no app, vê o backlog e agenda a visita.", msg: "Visita recebida · agendada amanhã 9h · talhão norte." },
  { who: "produtor", lane: "produtor", t: "Visita confirmada", time: "08:32", ret: true, canal: "WhatsApp", desc: "O produtor recebe a confirmação e o aviso de técnico a caminho — volta.", msg: "Visita confirmada ✅ O Diego te avisa quando estiver a caminho." },
  { who: "field", lane: "field", t: "Em campo: recalibra", time: "10:10", canal: "Presencial", desc: "O Field Trainer vai à fazenda, recalibra a antena e valida com uma passada.", msg: "Recalibrei a antena e validei 1 passada. AutoTrac 100% 🌱" },
  { who: "csc", lane: "csc", t: "Recebe report · fecha", time: "11:32", canal: "Painel", desc: "O dealer recebe o report com foto e fecha o caso.", msg: "Report recebido com foto · caso #BR-4471 fechado." },
  { who: "produtor", lane: "produtor", t: "Recebe: resolvido", time: "11:32", ret: true, canal: "WhatsApp", desc: "O produtor recebe a confirmação de resolvido — volta.", msg: "Tudo certo por aí agora, João? Resolvemos o AutoTrac ✅" },
  { who: "produtor", lane: "produtor", t: "Follow-up D+7", time: "D+7", ret: true, canal: "WhatsApp", desc: "Sete dias depois, follow-up ao dono para confirmar o uso. Em toda a linha, a Deere acompanha cross.", msg: "Como está o uso do AutoTrac? (uso confirmado em 87%)" },
];
const canalCor = c => /WhatsApp/i.test(c) ? { bg: "#DFF3E8", fg: "#1A8A6D" } : /Painel/i.test(c) ? { bg: C.okBg, fg: C.greenD } : { bg: "#EEF1E7", fg: C.olive };
function Fluxo() {
  const X = i => 60 + i * 150;
  const N = STG.length;
  const [step, setStep] = useState(0);
  const scrollRef = useRef(null);
  useEffect(() => { const el = scrollRef.current; if (el) el.scrollTo({ left: Math.max(0, X(step) - el.clientWidth / 2), behavior: "smooth" }); }, [step]);
  const segs = STG.slice(0, -1).map((n, i) => ({ from: i, a: [X(i) + 69, FLY[n.lane]], b: [X(i + 1) - 69, FLY[STG[i + 1].lane]] }));
  const plotW = X(N - 1) + 120;
  const pathd = (a, b) => "M " + a[0] + " " + a[1] + " C " + (a[0] + 46) + " " + a[1] + ", " + (b[0] - 46) + " " + b[1] + ", " + b[0] + " " + b[1];
  const cur = STG[step];
  const cc = canalCor(cur.canal);
  return (
    <div>
      <div style={{ marginBottom: 14, maxWidth: 1080 }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: C.green }}>Como funciona</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: "5px 0 3px" }}>O fluxo completo — clique em cada momento</h1>
        <div style={{ fontSize: 13, color: C.ink2 }}>Cada momento mostra <b>qual ator entra</b> e <b>por qual canal</b>. Toque num passo para ver embaixo a ferramenta onde ele acontece. A Deere acompanha tudo, cross.</div>
      </div>

      <div style={{ display: "flex", border: "1px solid " + C.line, borderRadius: 10, overflow: "hidden", background: C.card }}>
        <div style={{ position: "relative", width: 168, flexShrink: 0, borderRight: "1px solid " + C.line, background: "#FBFCFA", height: 430 }}>
          <div style={{ position: "absolute", left: 12, top: 30, right: 8 }}>
            <div className="flex items-center gap-2"><Avatar who="deere" size={20} /><span style={{ fontSize: 12, fontWeight: 700, color: C.side }}>John Deere</span></div>
            <div style={{ fontSize: 9.5, color: C.ink3, marginTop: 1, marginLeft: 28 }}>visão cross</div>
          </div>
          {FLANES.map(l => (
            <div key={l.k} style={{ position: "absolute", left: 12, top: FLY[l.k] - 18, right: 6 }}>
              <div className="flex items-center gap-2"><Avatar who={l.who} size={22} /><span style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.1 }}>{l.t}</span></div>
              <div style={{ fontSize: 9.5, color: C.ink3, marginTop: 1, marginLeft: 30 }}>{l.s}</div>
            </div>
          ))}
        </div>
        <div ref={scrollRef} style={{ overflowX: "auto", flex: 1 }}>
          <div style={{ position: "relative", width: plotW, height: 430 }}>
            <div style={{ position: "absolute", left: 0, top: 26, width: plotW, height: 34, background: "#F2F5F1", borderBottom: "1px dashed " + C.side, display: "flex", alignItems: "center", paddingLeft: 12 }}>
              <span style={{ fontSize: 10.5, color: C.side, fontWeight: 600 }}>Deere acompanha cada passo — métricas, satisfação e coordenação</span>
            </div>
            {FLANES.map(l => <div key={l.k} style={{ position: "absolute", left: 0, top: FLY[l.k] - 27, width: plotW, height: 54, borderTop: "1px solid " + C.line2 }} />)}
            <svg width={plotW} height="430" viewBox={"0 0 " + plotW + " 430"} style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
              <defs><marker id="fah" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></marker></defs>
              {segs.map((sg, i) => { const lit = step > sg.from; return <path key={i} d={pathd(sg.a, sg.b)} fill="none" stroke={lit ? C.green : "#D6DDCF"} strokeWidth={lit ? 2.5 : 1.5} markerEnd="url(#fah)" style={{ transition: "stroke .3s" }} />; })}
            </svg>
            {STG.map((n, i) => { const lit = i <= step; const sel = i === step; const x = X(i), y = FLY[n.lane]; return (
              <div key={i} onClick={() => setStep(i)} style={{ position: "absolute", left: x - 70, top: y - 27, width: 140, zIndex: 2, opacity: lit ? 1 : .4, cursor: "pointer", transition: "opacity .25s, transform .2s", transform: sel ? "translateY(-2px)" : "none" }}>
                <div style={{ background: sel ? "#FCFEFA" : "#fff", border: (sel ? 2 : 1) + "px solid " + (sel ? C.green : (n.ret ? C.wa : C.line)), borderRadius: 8, padding: "7px 9px", boxShadow: sel ? "0 6px 18px rgba(31,80,24,.18)" : "0 1px 2px rgba(0,0,0,.05)" }}>
                  {n.ret && <div className="flex items-center gap-1" style={{ marginBottom: 3 }}><ChevronLeft size={11} style={{ color: C.wa }} /><span style={{ fontSize: 8, fontWeight: 700, color: C.wa, letterSpacing: ".03em", textTransform: "uppercase" }}>volta ao produtor</span></div>}
                  <div className="flex items-center gap-1"><Avatar who={n.who} size={17} /><span style={{ fontSize: 11.5, fontWeight: 600, lineHeight: 1.12 }}>{n.t}</span></div>
                  <div style={{ fontSize: 9.5, color: C.ink3, marginTop: 3 }}>{n.time} · {n.canal}</div>
                </div>
              </div>
            ); })}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3" style={{ margin: "12px 0", flexWrap: "wrap" }}>
        <button onClick={() => setStep(x => Math.max(0, x - 1))} style={bGhost}><ChevronLeft size={15} /> Anterior</button>
        <button onClick={() => setStep(x => Math.min(N - 1, x + 1))} style={bGhost}>Próximo <ChevronRight size={15} /></button>
        <span style={{ fontSize: 12.5, color: C.ink3 }}>Passo <b style={{ color: C.ink }}>{step + 1}</b> de {N} · clique nos cartões acima</span>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "stretch", border: "1px solid " + C.line, borderRadius: 10, background: "#FBFCFA", padding: 16 }}>
        <div style={{ flex: "1 1 300px", minWidth: 260 }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 8 }}><Avatar who={cur.who} size={30} /><div><div style={{ fontSize: 14, fontWeight: 700 }}>{PROF[cur.who] ? PROF[cur.who].name.split(" · ")[0] : cur.who}</div><div style={{ fontSize: 11, color: C.ink3 }}>{cur.t} · {cur.time}</div></div></div>
          <div style={{ marginBottom: 10 }}><Pill bg={cc.bg} fg={cc.fg}><MessageCircle size={11} /> canal: {cur.canal}</Pill></div>
          <div style={{ fontSize: 13, color: C.ink2, lineHeight: 1.5 }}>{cur.desc}</div>
        </div>
        <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: C.ink3, textTransform: "uppercase", letterSpacing: ".05em" }}>Onde se aciona</div>
          <ToolPreview n={cur} />
        </div>
      </div>
    </div>
  );
}

/* ===== APP ===== */
const seed = () => ({ customer: STEPS.s0.enter.map(e => ({ ...e })), dealer: [], field: [] });
export default function App() {
  const [tab, setTab] = useState("fluxo");
  const [step, setStep] = useState("s0");
  const [chat, setChat] = useState(seed);
  const [typing, setTyping] = useState({ customer: null, dealer: null, field: null });
  const [flags, setFlags] = useState({ resolved: null, agenda: null, csat: null });
  const [busy, setBusy] = useState(false);
  const [seen, setSeen] = useState({ fluxo: 0, produtor: 1, dealer: 1, field: 1, deere: 1 });
  const [toast, setToast] = useState(null);
  const timers = useRef([]);
  const toastT = useRef(null);
  const prevOwner = useRef(null);
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => () => clearTimers(), []);

  const totalFor = k => {
    if (k === "fluxo") return 0;
    const cu = chat.customer.length;
    if (k === "produtor") return cu;
    if (k === "dealer") return cu + chat.dealer.length;
    if (k === "field") return cu + chat.field.length;
    return cu + chat.dealer.length + chat.field.length;
  };
  useEffect(() => { setSeen(s => ({ ...s, [tab]: totalFor(tab) })); }, [tab, chat]);
  const unseen = k => Math.max(0, totalFor(k) - seen[k]);

  const fireToast = txt => { setToast(txt); clearTimeout(toastT.current); toastT.current = setTimeout(() => setToast(null), 2900); };

  const appendTo = (k, ev) => setChat(c => ({ ...c, [k]: [...c[k], ev] }));
  const setTyp = (k, who) => setTyping(t => ({ ...t, [k]: who }));
  function playInto(k, events, start) {
    let t = start || 0;
    (events || []).forEach(ev => {
      if (ev.n) { timers.current.push(setTimeout(() => appendTo(k, ev), t)); t += 450; }
      else {
        const dur = 650 + Math.min((ev.t ? ev.t.length : 20) * 11, 700);
        timers.current.push(setTimeout(() => setTyp(k, ev.f), t));
        timers.current.push(setTimeout(() => { appendTo(k, ev); setTyp(k, null); }, t + dur));
        t += dur + 280;
      }
    });
    return t;
  }
  const opts = STEPS[step] ? STEPS[step].opts : [];
  const waiting = busy ? [] : [...new Set(opts.map(o => o.role))];

  // toast de mudança de turno
  useEffect(() => {
    if (busy) return;
    const owner = waiting[0] || null;
    if (owner && owner !== prevOwner.current && owner !== tab) fireToast("Agora é a vez de " + ROLE_NAME[owner]);
    prevOwner.current = owner;
  }, [busy, step]);

  function runCustomer(say, next, doFlags) {
    setBusy(true);
    (say || []).forEach(ev => appendTo("customer", ev));
    const enter = next ? (STEPS[next] ? STEPS[next].enter : []) : [];
    const total = playInto("customer", enter, 350);
    timers.current.push(setTimeout(() => { if (next) setStep(next); if (doFlags) setFlags(f => ({ ...f, ...doFlags })); setBusy(false); }, total + 60));
  }
  const choose = o => runCustomer(o.say, o.next, o.do);
  function writeFree(text) {
    setBusy(true);
    appendTo("customer", { f: "produtor", t: text, time: "agora" });
    const total = playInto("customer", [{ f: "bot", t: "Recebi sua mensagem! Toque numa das opções abaixo pra eu te ajudar mais rápido 👇", time: "agora" }], 450);
    timers.current.push(setTimeout(() => setBusy(false), total + 60));
  }
  function reengage() {
    appendTo("customer", { f: "csc", t: "Oi João, conseguiu ver minha última mensagem? Sigo à disposição pra continuar 👍", time: "agora" });
    if (tab !== "produtor") fireToast("Dealer reengajou o produtor");
  }
  const runStep = id => runCustomer([], id, null);
  function sendDealer(m) { appendTo("dealer", { f: "deere", t: m.msg, time: "agora" }); playInto("dealer", [m.reply], 550); if (m.customerStep) runCustomer([], m.customerStep, null); if (tab !== "dealer") fireToast("Deere enviou mensagem ao Dealer"); }
  function sendField(m) { appendTo("field", { f: "deere", t: m.msg, time: "agora" }); playInto("field", [m.reply], 550); if (tab !== "field") fireToast("Deere enviou mensagem ao Field Trainer"); }
  const chSendDealer = ev => appendTo("dealer", { ...ev, time: "agora" });
  const chSendField = ev => appendTo("field", { ...ev, time: "agora" });
  function reset() { clearTimers(); setStep("s0"); setChat(seed()); setTyping({ customer: null, dealer: null, field: null }); setFlags({ resolved: null, agenda: null, csat: null }); setBusy(false); setSeen({ fluxo: 0, produtor: 1, dealer: 1, field: 1, deere: 1 }); }

  const TABS = [["fluxo", Activity, "Fluxo"], ["produtor", MessageCircle, "Produtor"], ["dealer", Building2, "Dealer"], ["field", Wrench, "Field Trainer"], ["deere", ShieldCheck, "Deere"]];
  const turnoOf = r => !busy && waiting.includes(r);

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif", background: C.bg, minHeight: "100vh", color: C.ink }}>
      <style>{"@keyframes blink{0%,80%,100%{opacity:.2}40%{opacity:1}} @keyframes pop{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}} @keyframes slidein{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}} .dot{width:6px;height:6px;border-radius:6px;background:#9aa093;display:inline-block;margin:0 1px;animation:blink 1.2s infinite both}"}</style>

      {toast && <div style={{ position: "fixed", top: 14, right: 16, zIndex: 50, background: C.side, color: "#fff", padding: "11px 15px", borderRadius: 10, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 24px rgba(0,0,0,.22)", animation: "slidein .25s ease-out" }}><Bell size={15} style={{ color: C.yellow }} /> {toast}</div>}

      <div style={{ background: C.side, color: "#fff", padding: "0 18px", display: "flex", alignItems: "center", gap: 16, height: 54 }}>
        <div style={{ fontWeight: 700, fontSize: 14.5, display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 22, height: 22, borderRadius: 6, background: C.yellow, color: C.greenD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>JD</span> Operations Support · Brasil</div>
        <div style={{ display: "flex", gap: 4, flex: 1 }}>
          {TABS.map(([k, Icon, t]) => {
            const on = tab === k; const u = unseen(k);
            return (
              <button key={k} onClick={() => setTab(k)} style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 6, background: on ? "rgba(255,255,255,.14)" : "transparent", color: "#fff", border: "none", borderBottom: on ? "2px solid " + C.yellow : "2px solid transparent", padding: "16px 13px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                <Icon size={15} /> {t}
                {!on && u > 0 && <span style={{ minWidth: 17, height: 17, padding: "0 4px", borderRadius: 9, background: C.yellow, color: C.greenD, fontSize: 10.5, fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{u}</span>}
                {!on && u === 0 && turnoOf(k) && <span style={{ width: 7, height: 7, borderRadius: 7, background: C.yellow }} />}
              </button>
            );
          })}
        </div>
        <div style={{ fontSize: 12, opacity: .9, display: "flex", alignItems: "center", gap: 7 }}>
          {busy ? <span style={{ opacity: .8 }}>Conversa em andamento…</span> : waiting.length ? <><span style={{ opacity: .7 }}>Vez de:</span> <b style={{ color: C.yellow }}>{waiting.map(w => ROLE_NAME[w]).join(" / ")}</b></> : <span style={{ opacity: .7 }}>Encerrada</span>}
        </div>
        <button onClick={reset} style={{ ...bGhost, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,.3)", fontSize: 12 }}><RotateCcw size={13} /> Reiniciar</button>
      </div>

      <div style={{ padding: "14px 20px 6px", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ fontSize: 12.5, color: C.ink3, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <Sparkles size={13} style={{ color: C.green }} />
          Um mesmo caso, quatro pontos de vista. As respostas chegam aos poucos e cada handoff avisa a parte certa (contador na aba). A Deere é a plataforma de governança.
        </div>
      </div>

      <div style={{ padding: "10px 20px 40px", maxWidth: 1240, margin: "0 auto" }}>
        {tab === "fluxo" && <Fluxo />}
        {tab === "produtor" && <VProdutor log={chat.customer} opts={opts} choose={choose} waiting={waiting} busy={busy} typing={typing.customer} turno={turnoOf("produtor")} onWrite={writeFree} />}
        {tab === "dealer" && <VDealer log={chat.customer} opts={opts} choose={choose} waiting={waiting} busy={busy} typing={typing.customer} flags={flags} step={step} runStep={runStep} chDealer={chat.dealer} chSendDealer={chSendDealer} typingDealer={typing.dealer} turno={turnoOf("dealer")} reengage={reengage} />}
        {tab === "field" && <VField log={chat.customer} opts={opts} choose={choose} waiting={waiting} busy={busy} typing={typing.customer} flags={flags} step={step} chField={chat.field} chSendField={chSendField} typingField={typing.field} turno={turnoOf("field")} />}
        {tab === "deere" && <VDeere log={chat.customer} flags={flags} step={step} typing={typing.customer} chDealer={chat.dealer} chField={chat.field} sendDealer={sendDealer} sendField={sendField} typingDealer={typing.dealer} typingField={typing.field} />}
      </div>
    </div>
  );
}
