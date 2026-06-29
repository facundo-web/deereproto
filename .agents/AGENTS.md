# JD Operations Support Prototype — Agent Rules

These rules apply to all work on `/Users/facu/Downloads/Deere prototipo/`.

---

## Architecture Context

- **Single-file React app** (`index.html`) using `STEPS` for conversation flow and `App`-level `useState` for all state.
- **Shared chat state**: `chat.customer` is the single source of truth for all tabs (Produtor, Dealer, Field, Deere). Never duplicate or shadow it.
- **Design tokens**: use `C.*` constants and CSS variables (`--jd-green-600`, etc.) — never hardcode brand colors.
- **Phone mockup**: fixed `844px` height with internal scroll. Never let content overflow the frame.

---

## UX Excellence Rules

### 1. "Produtor initiates" invariant — CRITICAL
Never pre-seed any bot or support message in the customer chat without the produtor having explicitly acted (chip tap or free text).

- ❌ Do NOT add welcome messages, greetings, or any content to an empty `chat.customer` log.
- ✅ Empty chat state = neutral visual hint only (e.g., `"Toque numa opção abaixo para iniciar"`).
- The bot's first message must always be a response to the produtor's first action.
- Breaking this destroys the realism of the demo — it is a demo blocker.

### 2. Cross-tab state consistency
All 5 tabs share the same `chat.customer` array from App state.

- Before adding any visual element that reads from this array, verify it renders correctly from **all role perspectives** (Produtor list, Produtor chat, Dealer WA, Dealer Panel, Field WA, Field Panel).
- Never inject role-specific fake content into the shared log.
- Internal-only messages use `{n:true}` flag to be filtered out of the WA thread view.

### 3. Reactive contact list
The WA contact list preview and badge for "Suporte AgroBaggio" must reflect the actual `chat.customer` log — never a hardcoded string.

- Preview: last message text (truncated to ~38 chars), prefixed with `"Você: "` if `out:true`.
- Badge: clears when the chat screen is open; shows count when on list screen with new messages.
- Timestamp: taken from the last real message, not a static value.

### 4. Screen-state persistence on tab switch
If the produtor has already opened the chat (messages exist), returning to the Produtor tab must NOT reset to the list screen.

- Use `useEffect(() => { if (filtLog.length > 0 && screen === 'list') setScreen('chat'); }, [filtLog.length])` pattern.

### 5. No placeholder state in demos
This is a live in-person demo prototype. Every static string that can be made reactive MUST be reactive. Fake state (hardcoded previews, static timestamps, unconditional badges) destroys credibility during a demo.

### 6. Responsive breakpoints — demo-critical
The target demo environment is a **13–14" laptop (1280px or less)**. The navbar tabs must remain usable at ≤1150px. Phone mockups must not overflow their containers. Test at 1100px, 1280px, and 1440px before considering any layout change complete.

### 7. Omnichannel loop — "Enviar ao produtor" pattern
When a Dealer or Field Trainer sends a document or resource to the produtor:
1. Append to `chat.customer` with `{k:'doc', docTitle, docIcon}` for rich card rendering in the WA thread.
2. Mark the doc as sent in `sentDocs` state (persisted at App level, reset on `reset()`).
3. Fire a toast confirmation.
4. The tab badge on "Produtor" must increment to reflect the new message.

---

## Pre-Ship UX Checklist

Before marking any change as complete, run through this flow manually or via browser subagent:

- [ ] **List screen**: Produtor tab shows WA list, "Suporte AgroBaggio" has correct preview and badge
- [ ] **Chat open**: Tapping the contact opens the chat with no pre-existing bot message
- [ ] **First chip**: Produtor sends first message → bot responds → Dealer tab shows message in both WA and Panel modes
- [ ] **Tab switch**: Switch Produtor → Dealer → Field → Deere → back to Produtor. Chat state consistent everywhere.
- [ ] **Screen state**: Returning to Produtor after another tab auto-opens the chat (not list) if messages exist
- [ ] **Responsive**: Layout intact at 1100px viewport width
- [ ] **Reset**: "Reiniciar" button clears all state including `sentDocs`, returns Produtor to list screen

---

## Known Patterns

### Adding a step to the conversation flow
Add to `STEPS` object with `{enter:[...events], opts:[...options]}`. Events with `{n:true}` are system-only (shown in internal threads, hidden from WA).

### Sending a resource to the produtor
```js
appendTo('customer', {
  f: 'csc',          // or 'field'
  t: 'Message text with [Resource Name]',
  time: 'HH:MM',
  k: 'doc',
  docTitle: 'Document Title',
  docIcon: '📋',
});
```

### Adding an internal coord message (Dealer↔Deere channel)
```js
appendTo('dealer', { f: 'deere', t: 'Message', time: 'agora' });
```
