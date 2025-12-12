(function(){
  // Inject Google Fonts
  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@300;400;600&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);

  const style = document.createElement('style');
  style.textContent = `
    :root {
      --cccp-primary: #591C27;
      --cccp-primaryDark: #401017;
      --cccp-accent: #8B2E3A;
      --cccp-text: #1F1F1F;
      --cccp-border: #E4E4E4;
      --cccp-background: #FFFFFF;
      --cccp-botBubble: #F9F9F9;
      --cccp-userBubble: #8B2E3A;
      --cccp-shadow: rgba(0,0,0,0.15);
      --cccp-shadow-light: rgba(0,0,0,0.08);
      --cccp-gradient: linear-gradient(135deg, #8B2E3A 0%, #591C27 50%, #401017 100%);
      --cccp-gradient-hover: linear-gradient(135deg, #9B3E4A 0%, #692C37 50%, #501127 100%);
    }
    
    /* Enhanced Chat Button with Premium Feel */
    #bb-chat-btn{
      position:fixed;right:24px;bottom:24px;padding:16px 24px;border-radius:50px;
      background:var(--cccp-gradient);color:#fff;border:none;cursor:pointer;
      box-shadow:0 12px 32px rgba(89,28,39,0.25), 0 4px 16px rgba(0,0,0,0.1);
      font-weight:700;transition:all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      font-family:"Montserrat","Helvetica Neue",sans-serif;font-size:15px;
      letter-spacing:0.8px;text-transform:uppercase;z-index:1000;
      backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.1);
    }
    #bb-chat-btn:hover{
      background:var(--cccp-gradient-hover);transform:translateY(-3px) scale(1.02);
      box-shadow:0 20px 48px rgba(89,28,39,0.35), 0 8px 24px rgba(0,0,0,0.15);
    }
    #bb-chat-btn:active{transform:translateY(-1px) scale(0.98)}
    
    /* Premium Chat Panel with Glass Effect - Properly Positioned */
    #bb-box{
      display:none;position:fixed;right:24px;bottom:100px;width:400px;max-width:calc(100vw - 48px);
      height:580px;max-height:calc(100vh - 140px);
      background:rgba(255,255,255,0.95);border-radius:24px;
      box-shadow:0 32px 64px rgba(0,0,0,0.12), 0 16px 32px rgba(0,0,0,0.08);
      overflow:hidden;border:1px solid rgba(255,255,255,0.2);
      font-family:"Open Sans","Roboto",sans-serif;backdrop-filter:blur(20px);
      z-index:999;animation:slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      box-sizing:border-box;
    }
    
    @keyframes slideUp{
      from{opacity:0;transform:translateY(20px) scale(0.95)}
      to{opacity:1;transform:translateY(0) scale(1)}
    }
    
    /* Enhanced Header with Gradient - Perfectly Symmetrical */
    #bb-head{
      padding:18px 24px;font-weight:700;border-bottom:1px solid rgba(255,255,255,0.1);
      background:var(--cccp-gradient);color:#fff;position:relative;
      font-family:"Montserrat","Helvetica Neue",sans-serif;font-size:17px;
      letter-spacing:0.5px;text-shadow:0 2px 4px rgba(0,0,0,0.1);
      box-sizing:border-box;min-height:56px;display:flex;align-items:center;flex-shrink:0;
    }
    #bb-head::before{
      content:'';position:absolute;top:0;left:0;right:0;bottom:0;
      background:linear-gradient(135deg,rgba(255,255,255,0.1) 0%,transparent 100%);
      pointer-events:none;
    }
    
    /* Enhanced Messages Area - Balanced Height */
    #bb-msgs{
      flex:1;overflow:auto;padding:20px;min-height:0;
      background:linear-gradient(180deg,rgba(249,249,249,0.5) 0%,rgba(255,255,255,0.8) 100%);
      scrollbar-width:thin;scrollbar-color:rgba(139,46,58,0.3) transparent;
      box-sizing:border-box;
    }
    
    /* Minimal Privacy Footer */
    #bb-footer{
      padding:8px 20px;text-align:center;border-top:1px solid rgba(228,228,228,0.2);
      background:rgba(255,255,255,0.95);backdrop-filter:blur(10px);
      box-sizing:border-box;min-height:32px;display:flex;align-items:center;justify-content:center;flex-shrink:0;
    }
    #bb-footer a{
      font-size:11px;color:rgba(89,28,39,0.7);text-decoration:none;
      font-family:"Open Sans","Roboto",sans-serif;transition:color 0.2s ease;
    }
    #bb-footer a:hover{
      color:var(--cccp-primary);text-decoration:underline;
    }
    #bb-msgs::-webkit-scrollbar{width:8px}
    #bb-msgs::-webkit-scrollbar-track{background:transparent}
    #bb-msgs::-webkit-scrollbar-thumb{
      background:rgba(139,46,58,0.3);border-radius:4px;
      transition:background 0.3s ease;
    }
    #bb-msgs::-webkit-scrollbar-thumb:hover{background:rgba(139,46,58,0.5)}
    
    /* Premium Message Bubbles */
    .msg{
      margin:16px 0;font:15px/1.6 "Open Sans","Roboto",sans-serif;
      padding:16px 20px;border-radius:20px;max-width:85%;position:relative;
      box-shadow:0 4px 16px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
      animation:messageSlide 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter:blur(10px);
    }
    
    @keyframes messageSlide{
      from{opacity:0;transform:translateY(10px)}
      to{opacity:1;transform:translateY(0)}
    }
    
    .you{
      text-align:right;background:var(--cccp-gradient);color:#fff;
      margin-left:24px;border-bottom-right-radius:6px;
      box-shadow:0 6px 20px rgba(89,28,39,0.25), 0 2px 8px rgba(0,0,0,0.1);
    }
    .you::before{
      content:'';position:absolute;top:0;left:0;right:0;bottom:0;
      background:linear-gradient(135deg,rgba(255,255,255,0.1) 0%,transparent 100%);
      border-radius:20px;pointer-events:none;
    }
    
    .bot{
      text-align:left;background:rgba(255,255,255,0.9);color:var(--cccp-text);
      border:1px solid rgba(228,228,228,0.5);margin-right:24px;
      border-bottom-left-radius:6px;backdrop-filter:blur(10px);
    }
    
    /* Perfectly Symmetrical Input Form */
    #bb-form{
      display:flex;align-items:stretch;gap:10px;padding:16px 20px;
      border-top:1px solid rgba(228,228,228,0.3);
      background:rgba(255,255,255,0.95);backdrop-filter:blur(10px);
      box-sizing:border-box;flex-shrink:0;
    }
    #bb-input{
      flex:1;padding:0 18px;border:2px solid rgba(228,228,228,0.5);
      border-radius:20px;background:rgba(255,255,255,0.95);color:var(--cccp-text);
      font-family:"Open Sans","Roboto",sans-serif;font-size:15px;
      transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);backdrop-filter:blur(10px);
      height:48px;box-sizing:border-box;line-height:48px;margin:0;
      min-width:0;
    }
    #bb-input:focus{
      outline:none;border-color:var(--cccp-accent);
      box-shadow:0 0 0 3px rgba(139,46,58,0.1);
    }
    #bb-input::placeholder{
      color:var(--cccp-text);opacity:0.5;font-weight:400;
    }
    
    #bb-send{
      padding:0 20px;border-radius:20px;border:0;
      background:var(--cccp-gradient);color:#fff;cursor:pointer;
      font-weight:700;font-family:"Montserrat","Helvetica Neue",sans-serif;
      font-size:15px;transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow:0 4px 12px rgba(89,28,39,0.25);
      height:48px;min-width:70px;display:flex;align-items:center;justify-content:center;
      white-space:nowrap;box-sizing:border-box;margin:0;flex-shrink:0;
    }
    #bb-send:hover{
      background:var(--cccp-gradient-hover);transform:translateY(-1px);
      box-shadow:0 6px 16px rgba(89,28,39,0.35);
    }
    #bb-send:active{transform:translateY(0)}
    
    /* Enhanced Lead Capture - Symmetrical Padding */
    #bb-lead{
      padding:18px 20px;border-top:1px solid rgba(228,228,228,0.3);
      background:rgba(255,255,255,0.95);backdrop-filter:blur(10px);
      box-sizing:border-box;
    }
    #bb-lead input{
      width:100%;padding:16px 20px;border:2px solid rgba(228,228,228,0.5);
      border-radius:16px;margin:12px 0;background:rgba(255,255,255,0.9);
      color:var(--cccp-text);font-family:"Open Sans","Roboto",sans-serif;
      font-size:15px;transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter:blur(10px);
    }
    #bb-lead input:focus{
      outline:none;border-color:var(--cccp-accent);
      box-shadow:0 0 0 4px rgba(139,46,58,0.1), 0 4px 16px rgba(0,0,0,0.05);
      transform:translateY(-1px);
    }
    #bb-lead input::placeholder{
      color:var(--cccp-text);opacity:0.5;font-weight:400;
    }
    #bb-lead button{
      padding:16px 24px;border:0;border-radius:16px;
      background:var(--cccp-gradient);color:#fff;cursor:pointer;
      font-weight:700;font-family:"Montserrat","Helvetica Neue",sans-serif;
      font-size:15px;transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      margin-top:12px;box-shadow:0 4px 16px rgba(89,28,39,0.25);
    }
    #bb-lead button:hover{
      background:var(--cccp-gradient-hover);transform:translateY(-2px);
      box-shadow:0 8px 24px rgba(89,28,39,0.35);
    }
    
    /* Enhanced Typography */
    .msg p{margin:0;padding:0;font-weight:400}
    .msg strong{font-weight:600;color:inherit}
    .msg em{font-style:italic;opacity:0.8}
    
    /* Mobile Optimizations with PERFECT Alignment */
    @media (max-width: 480px) {
      #bb-box{right:16px;bottom:90px;width:calc(100vw - 32px);height:calc(100vh - 140px);max-height:600px}
      #bb-chat-btn{right:20px;bottom:20px;padding:14px 20px;font-size:14px}
      .msg{padding:14px 18px;font-size:14px}
      #bb-form{gap:8px;padding:14px 16px;align-items:stretch;flex-shrink:0}
      #bb-input{height:44px;padding:0 14px;font-size:14px;line-height:44px;margin:0;border-radius:22px}
      #bb-send{height:44px;padding:0 18px;font-size:14px;min-width:65px;margin:0;border-radius:22px;flex-shrink:0}
      #bb-lead input,#bb-lead button{padding:14px 18px;font-size:14px}
      #bb-head{padding:16px 20px;min-height:52px;flex-shrink:0}
      #bb-msgs{padding:16px;flex:1;min-height:0}
      #bb-footer{padding:6px 16px;min-height:28px;flex-shrink:0}
      #bb-footer a{font-size:10px}
    }
    
    /* Loading Animation */
    .typing-indicator{
      display:flex;align-items:center;gap:4px;padding:16px 20px;
      background:rgba(255,255,255,0.9);border-radius:20px;margin:16px 0;
      border:1px solid rgba(228,228,228,0.5);backdrop-filter:blur(10px);
    }
    .typing-dot{
      width:8px;height:8px;border-radius:50%;background:var(--cccp-accent);
      animation:typing 1.4s infinite ease-in-out;
    }
    .typing-dot:nth-child(1){animation-delay:-0.32s}
    .typing-dot:nth-child(2){animation-delay:-0.16s}
    @keyframes typing{
      0%,80%,100%{transform:scale(0.8);opacity:0.5}
      40%{transform:scale(1);opacity:1}
    }
  `;
  document.head.appendChild(style);

  // Get customization options and API URL from script tag
  const scriptTag = document.currentScript || document.querySelector('script[data-api-url]');
  const buttonText = scriptTag?.getAttribute('data-button-text') || 'Chat';
  const headerText = scriptTag?.getAttribute('data-header-text') || 'How can we help?';
  const API_BASE = scriptTag?.getAttribute('data-api-url') || window.location.origin;
  const privacyUrl = scriptTag?.getAttribute('data-privacy-url') || 'https://www.cccp.com/privacy-policy';
  
  const btn = document.createElement('button'); btn.id='bb-chat-btn'; btn.textContent=buttonText;
  const box = document.createElement('div'); box.id='bb-box';
  box.innerHTML = `
    <div id="bb-head" aria-live="polite">${headerText}</div>
    <div id="bb-msgs" role="log" aria-live="polite"></div>
    <form id="bb-form" aria-label="Chat input">
      <input id="bb-input" placeholder="Type your question…" autocomplete="off" aria-label="Message"/>
      <button id="bb-send" type="submit" aria-label="Send message">Send</button>
    </form>
    <div id="bb-footer">
      <a href="${privacyUrl}" target="_blank" rel="noopener noreferrer">Privacy: Chat logs stored in Supabase</a>
    </div>
    <div id="bb-lead" style="display:none">
      <div style="font:600 14px system-ui;margin-bottom:6px">Leave your details and we’ll follow up:</div>
      <input id="bb-name" placeholder="Name"/>
      <input id="bb-email" placeholder="Email"/>
      <button id="bb-lead-send">Send</button>
    </div>
  `;
  document.body.append(btn, box);

  const msgs = document.getElementById('bb-msgs');
  const form = document.getElementById('bb-form');
  const input = document.getElementById('bb-input');
  const lead = document.getElementById('bb-lead');
  const leadBtn = document.getElementById('bb-lead-send');
  const nameIn = document.getElementById('bb-name');
  const emailIn = document.getElementById('bb-email');
  
  const sessionId = crypto.randomUUID();

  btn.onclick = ()=> box.style.display = (box.style.display==='none'||!box.style.display)?'block':'none';
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') box.style.display='none'; });

  function add(role, text){
    const d=document.createElement('div'); d.className=`msg ${role}`; d.textContent=text;
    msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
  }

  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    msgs.appendChild(typingDiv);
    msgs.scrollTop = msgs.scrollHeight;
    return typingDiv;
  }

  function hideTypingIndicator(typingDiv) {
    if (typingDiv && typingDiv.parentNode) {
      typingDiv.parentNode.removeChild(typingDiv);
    }
  }

  async function ask(q){
    add('you', q);
    const typingIndicator = showTypingIndicator();
    
    try {
      const r = await fetch(`${API_BASE}/api/chat`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ sessionId, message:q })
      });
      
      if (!r.ok) {
        throw new Error(`HTTP ${r.status}: ${r.statusText}`);
      }
      
      const data = await r.json();
      
      // Simulate realistic typing delay
      setTimeout(() => {
        hideTypingIndicator(typingIndicator);
        if (data.reply && data.reply.trim()) {
          add('bot', data.reply);
        } else {
          console.error('No reply in response:', data);
          add('bot', 'Sorry, I had trouble answering that. Please try again.');
        }
        if (data.handoffSuggested) lead.style.display='block';
      }, 800 + Math.random() * 1200);
      
    } catch (error) {
      hideTypingIndicator(typingIndicator);
      console.error('Chat error:', error);
      add('bot', 'Sorry, I had trouble connecting. Please try again.');
    }
  }

  form.addEventListener('submit', async (e)=>{ e.preventDefault();
    const q = input.value.trim(); if(!q) return; input.value=''; await ask(q);
  });

  leadBtn.addEventListener('click', async ()=>{
    const name = nameIn.value.trim(), email = emailIn.value.trim();
    if(!name || !email) return alert('Please add name and email');
    const message = 'Lead from chat widget';
    await fetch(`${API_BASE}/api/lead`,{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name,email,message })});
    lead.style.display='none'; add('bot','Thanks! We’ll follow up shortly.');
  });
})();
