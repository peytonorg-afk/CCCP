# Legal Checklist Before Launching Your Chatbot

## ⚠️ Important: This is NOT legal advice. Consult with a lawyer for your specific situation.

## What Your Chatbot Currently Does

### Data Collection
- ✅ Stores user messages in Supabase (`conversations` table)
- ✅ Stores session IDs (UUIDs)
- ✅ Collects IP addresses (for rate limiting)
- ✅ Collects name/email when handoff is suggested (`/api/lead` endpoint)
- ✅ Uses OpenAI API (which may process user data)

### Features
- ✅ Real-time website scraping (fetches from your website)
- ✅ Can be embedded on external websites (CORS enabled)
- ✅ Generates AI responses using OpenAI

---

## Legal Considerations

### 1. **Privacy Policy & Data Collection** ⚠️ REQUIRED

**What you need:**
- Privacy policy that discloses:
  - What data you collect (messages, IP, session IDs, name/email)
  - How you use it (conversation history, customer service)
  - Where it's stored (Supabase)
  - How long you keep it
  - Third-party services (OpenAI, Supabase)
  - User rights (access, deletion, etc.)

**Where to add:**
- Link in widget footer or initial message
- On your main website
- In widget terms/conditions

**Regulations to consider:**
- **GDPR** (if EU users): Right to access, delete, export data
- **CCPA** (if California users): Disclosure requirements
- **Other state laws**: Various privacy laws in US states

**Action items:**
- [ ] Create privacy policy
- [ ] Add link to privacy policy in widget
- [ ] Implement data deletion request process
- [ ] Document data retention policy

---

### 2. **Terms of Service / Terms of Use** ⚠️ RECOMMENDED

**What you need:**
- Terms that cover:
  - Chatbot is AI-powered (may have errors)
  - Not a substitute for professional advice
  - User responsibility for information provided
  - Limitation of liability
  - Acceptable use policy

**Action items:**
- [ ] Create terms of service
- [ ] Add link in widget (first message or footer)
- [ ] Require acceptance before use (optional but recommended)

---

### 3. **Web Scraping / Real-Time Fetching** ⚠️ CHECK

**Current behavior:**
- Your chatbot scrapes YOUR OWN website (`cccp.com`)
- Fetches contact/about pages for business info

**Legal considerations:**
- ✅ **Scraping your own site**: Generally legal (it's your content)
- ⚠️ **Scraping other sites**: Could violate terms of service
- ⚠️ **Rate limiting**: Your code has rate limiting (good!)
- ⚠️ **robots.txt**: Should respect robots.txt (currently doesn't check)

**Action items:**
- [ ] Verify you own/have rights to scrape `cccp.com`
- [ ] If scraping other sites, check their terms of service
- [ ] Consider adding robots.txt checking
- [ ] Add reasonable delays between requests

---

### 4. **OpenAI Terms of Service** ✅ LIKELY COMPLIANT

**What to check:**
- ✅ Using OpenAI API (not violating terms)
- ✅ Not using responses to train competing models (you're not)
- ⚠️ **Data usage**: OpenAI may use your data for training (check their terms)
- ⚠️ **Content policy**: Ensure chatbot doesn't generate harmful content

**Action items:**
- [ ] Review OpenAI Terms of Service
- [ ] Check OpenAI data usage policy
- [ ] Consider OpenAI's content moderation
- [ ] Document that you're using OpenAI API

---

### 5. **Business Liability / Disclaimers** ⚠️ RECOMMENDED

**Risks:**
- AI may give incorrect information
- User may rely on chatbot advice
- Business-specific advice (repairs, products) could be wrong

**Protections:**
- Add disclaimer: "AI-powered assistant. Information may not be accurate."
- For critical info (pricing, warranties), direct to official sources
- Document that chatbot is for general assistance only

**Action items:**
- [ ] Add disclaimer in widget
- [ ] For critical business info, verify accuracy
- [ ] Consider insurance (errors & omissions)

---

### 6. **CORS / Embedding on External Sites** ✅ CONFIGURED

**Current setup:**
- CORS is configured (`ALLOWED_ORIGINS` env var)
- Widget can be embedded on other domains

**Legal considerations:**
- ✅ You control who can embed (via CORS)
- ⚠️ **Third-party sites**: If clients embed on their sites, ensure they have proper terms
- ⚠️ **Data responsibility**: You're still responsible for data collected

**Action items:**
- [ ] Document embedding requirements for clients
- [ ] Ensure clients have proper privacy policies
- [ ] Consider data processing agreements if needed

---

### 7. **Industry-Specific Regulations** ⚠️ CHECK

**For Camera Corner Connecting Point:**
- Electronics/repair business
- May have specific regulations:
  - Consumer protection laws
  - Warranty disclosures
  - Repair service regulations
  - Product liability

**Action items:**
- [ ] Check state/local business regulations
- [ ] Verify warranty/repair service compliance
- [ ] Ensure pricing information is accurate

---

## Quick Launch Checklist

### Minimum Requirements (Can launch with these):
- [ ] Privacy policy created and linked
- [ ] Basic terms of service
- [ ] Disclaimer in widget ("AI-powered, may have errors")
- [ ] Verify OpenAI terms compliance
- [ ] Verify you own/have rights to scrape your website

### Recommended (Better protection):
- [ ] Full terms of service
- [ ] Data deletion process implemented
- [ ] GDPR/CCPA compliance if applicable
- [ ] Business liability insurance
- [ ] Content moderation/error handling

### Best Practice (Enterprise-level):
- [ ] Legal review by attorney
- [ ] Data processing agreements
- [ ] Regular compliance audits
- [ ] User consent mechanisms
- [ ] Comprehensive error handling

---

## Quick Fixes You Can Do Now

### 1. Add Privacy Policy Link to Widget

In `widget/widget.js`, add a privacy policy link in the footer or initial message.

### 2. Add Disclaimer

Add to system prompt or widget:
> "This is an AI-powered assistant. Information may not be accurate. For official information, please contact us directly."

### 3. Document Data Collection

Create a simple privacy policy that states:
- What you collect (messages, IP, session IDs)
- Why (customer service, conversation history)
- Where (Supabase database)
- How to request deletion

### 4. Review OpenAI Terms

Read OpenAI's Terms of Service and Usage Policies to ensure compliance.

---

## Resources

- **GDPR Compliance**: https://gdpr.eu/
- **CCPA Compliance**: https://oag.ca.gov/privacy/ccpa
- **OpenAI Terms**: https://openai.com/policies/terms-of-use
- **OpenAI Usage Policies**: https://openai.com/policies/usage-policies

---

## Bottom Line

**Can you launch?** Probably yes, but you should:
1. ✅ Add a privacy policy (minimum)
2. ✅ Add a basic disclaimer
3. ✅ Review OpenAI terms
4. ⚠️ Consider consulting a lawyer for your specific business

**Most critical:** Privacy policy and basic terms. These protect you and inform users.

---

## Need Help?

- Consult with a business attorney
- Use privacy policy generators (but review with lawyer)
- Check your industry's regulatory requirements
- Review similar businesses' privacy policies for reference
