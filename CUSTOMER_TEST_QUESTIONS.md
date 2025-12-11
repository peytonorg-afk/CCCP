# Customer Test Questions - Comprehensive List

Use these questions to test your chatbot and ensure it works well for average customers.

## Business Information Questions

### Hours & Availability
- "What are your hours?"
- "Are you open today?"
- "Can I just stop in today?"
- "What time do you close?"
- "Are you open on weekends?"
- "What are your Saturday hours?"
- "Can I come in right now?"
- "When are you open?"

### Location & Contact
- "Where are you located?"
- "What's your address?"
- "What's your phone number?"
- "How can I contact you?"
- "Do you have a store I can visit?"
- "What's your email?"

### ServicesWhat serv
- "ices do you offer?"
- "What do you do?"
- "What can you help me with?"
- "Do you repair MacBooks?"
- "Do you do AV integration?"
- "Tell me about your services"
- "What kind of work do you do?"

### Pricing
- "How much does it cost?"
- "What are your prices?"
- "How much for MacBook repair?"
- "Do you have pricing information?"
- "What's the cost?"

### Policies
- "Do you offer warranty?"
- "What's your return policy?"
- "How long does repair take?"
- "Do you do same-day service?"
- "What payment methods do you accept?"

## Product/Technical Questions

### MacBooks
- "What MacBook models are there?"
- "Which MacBook is best for me?"
- "MacBook Air vs MacBook Pro?"
- "What's the difference between MacBook models?"
- "I need a new MacBook, which one?"

### Computers
- "What kind of computers do you have?"
- "What computers do you sell?"
- "Do you have laptops?"
- "What's a good computer for video editing?"

### AV/IT Services
- "What is a video wall?"
- "Tell me about AV integration"
- "What is a VLAN?"
- "Do you do network setup?"
- "What AV services do you offer?"

## General Questions

### Help & Support
- "I need help"
- "Can you help me?"
- "I have a question"
- "How does this work?"
- "What should I do?"

### Common Requests
- "I need a repair"
- "My screen is broken"
- "My laptop won't turn on"
- "I need tech support"
- "Can you fix my computer?"

### General Knowledge
- "What's the weather?"
- "Tell me a joke"
- "How are you?"
- "What can you do?"

## Edge Cases & Difficult Questions

### Vague Questions
- "Help"
- "Info"
- "?"
- "What"
- "Tell me something"

### Complex Questions
- "I need a laptop for video editing under $2000 that's portable"
- "What's the best MacBook for a student who does graphic design?"
- "Can you compare your services to competitors?"

### Unrelated Questions
- "What's the capital of France?"
- "Order me a pizza"
- "What's 2+2?"
- "Do you sell cars?"

## Test Scenarios

### Scenario 1: New Customer
1. "What services do you offer?"
2. "What are your hours?"
3. "Where are you located?"
4. "Can I stop in today?"

### Scenario 2: Repair Customer
1. "I need MacBook repair"
2. "How much does it cost?"
3. "How long does it take?"
4. "Do you offer warranty?"

### Scenario 3: Product Research
1. "What MacBook models are there?"
2. "Which one is best for video editing?"
3. "What's the difference between Air and Pro?"

### Scenario 4: Quick Question
1. "Are you open today?"
2. "What's your phone number?"

## Expected Behavior

### ✅ Good Responses Should:
- Answer the question directly
- Be concise (40-80 words)
- Use knowledge base when available
- Use general knowledge when needed
- Be helpful and friendly
- Not just say "contact us"

### ❌ Bad Responses Should NOT:
- Say "I don't know" unnecessarily
- Just say "contact us" without helping
- Be too verbose (>100 words)
- Give wrong information
- Be dismissive

## Testing Checklist

Run through these questions and verify:

- [ ] Business hours questions → Gives helpful answer
- [ ] Location questions → Provides address or guidance
- [ ] Service questions → Lists services accurately
- [ ] Product questions → Provides helpful information
- [ ] General questions → Answers helpfully
- [ ] Edge cases → Handles gracefully
- [ ] All responses are concise
- [ ] All responses are helpful (not just "contact us")

## Quick Test Script

Run this to test multiple questions:

```bash
# Test business questions
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What are your hours?"}'

curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Can I stop in today?"}'

curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What services do you offer?"}'
```

## Summary

Test with:
- ✅ Business info questions (hours, location, services)
- ✅ Product questions (MacBooks, computers)
- ✅ General questions
- ✅ Edge cases

Your chatbot should handle all of these helpfully!
