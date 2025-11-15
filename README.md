# Lucid Sandbox Agent

A production-ready AI agent that provides secure code execution with x402 micropayments on Base L2. Built using the Daydreams Lucid Agents framework for autonomous payments.

## 🌟 Features

- **x402 Micropayments** - Seamless USDC payments on Base L2 via x402 protocol
- **Secure Sandbox** - Execute JavaScript in isolated V8 environments using isolated-vm
- **Daydreams Integration** - Built on Lucid Agents framework for autonomous payments
- **Tiered Pricing** - Flexible pricing from $0.01 to $0.05 per execution
- **Execution Proofs** - Cryptographic SHA-256 proofs for verifiable computation
- **Multi-Chain Wallets** - Support for Base, Ethereum, and Solana addresses

## 🏗️ Architecture

### Technology Stack

- **Framework**: Daydreams Lucid Agents
- **Server**: Express.js with TypeScript
- **Sandbox**: isolated-vm for secure code execution
- **Blockchain**: Base L2 (Ethereum Layer 2)
- **Payment Token**: USDC
- **Payment Protocol**: x402 (HTTP 402 revival)
- **Facilitator**: Daydreams

### Your Wallet Addresses

```
Base L2:     0x11c24Fbcd702cd611729F8402d8fB51ECa75Ba83
Ethereum:    0x11c24Fbcd702cd611729F8402d8fB51ECa75Ba83
Solana:      2x4BRUreTFZCaCKbGKVXFYD5p2ZUBpYaYjuYsw9KYhf3
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- npm or yarn package manager

### Installation

```bash
# 1. Navigate to project
cd lucid-sandbox-agent

# 2. Install dependencies
npm install

# 3. Configure environment
# .env is already configured with your wallet addresses!
# Just add your OpenAI API key if needed:
# OPENAI_API_KEY=your_key_here

# 4. Start development server
npm run dev
```

Visit http://localhost:3000 to see your agent!

### Production Build

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## 📖 API Reference

### GET /api/status

Get agent status and capabilities (free).

**Response:**
```json
{
  "name": "Lucid Sandbox Executor",
  "version": "1.0.0",
  "status": "online",
  "network": {
    "name": "base",
    "chainId": 8453,
    "token": "USDC"
  },
  "payment": {
    "facilitator": "Daydreams",
    "walletAddress": "0x11c24Fbcd702cd611729F8402d8fB51ECa75Ba83"
  },
  "pricing": {
    "basic": { "price": 0.01, "timeout": 10000 },
    "standard": { "price": 0.02, "timeout": 30000 },
    "premium": { "price": 0.05, "timeout": 60000 }
  }
}
```

### POST /api/execute

Execute code with x402 payment verification.

**Without Payment (First Request):**
```bash
curl -X POST http://localhost:3000/api/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "console.log(\"Hello, x402!\")",
    "language": "javascript",
    "tier": "standard"
  }'
```

**Response: 402 Payment Required**
```json
{
  "error": "Payment Required",
  "message": "Code execution in secure sandbox",
  "paymentRequirement": {
    "maxAmountRequired": "20000",
    "resource": "/api/execute",
    "payTo": "0x11c24Fbcd702cd611729F8402d8fB51ECa75Ba83",
    "asset": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    "network": "base",
    "scheme": "eip3009"
  }
}
```

**With Payment (Second Request):**
```bash
curl -X POST http://localhost:3000/api/execute \
  -H "Content-Type: application/json" \
  -H "X-PAYMENT: {\"scheme\":\"eip3009\",\"signature\":\"0x...\",\"from\":\"0x...\",\"to\":\"0x11c24Fbcd702cd611729F8402d8fB51ECa75Ba83\",\"value\":\"20000\",\"validAfter\":\"0\",\"validBefore\":\"...\",\"nonce\":\"...\"}" \
  -d '{
    "code": "console.log(\"Hello, x402!\")",
    "language": "javascript",
    "tier": "standard"
  }'
```

**Response: Success**
```json
{
  "success": true,
  "output": "Hello, x402!",
  "executionTime": 45,
  "memoryUsed": 2048576,
  "executionId": "abc123def456",
  "tier": "standard",
  "proof": "0xabc...",
  "payment": {
    "amount": 0.02,
    "payer": "0x...",
    "transactionHash": "0x...",
    "network": "base",
    "token": "USDC"
  }
}
```

### GET /api/verify

Verify agent wallet addresses and trust (free).

**Response:**
```json
{
  "agent": {
    "name": "Lucid Sandbox Executor",
    "version": "1.0.0"
  },
  "wallets": {
    "base": {
      "address": "0x11c24Fbcd702cd611729F8402d8fB51ECa75Ba83",
      "network": "Base L2",
      "primary": true
    },
    "ethereum": {
      "address": "0x11c24Fbcd702cd611729F8402d8fB51ECa75Ba83",
      "network": "Ethereum Mainnet"
    },
    "solana": {
      "address": "2x4BRUreTFZCaCKbGKVXFYD5p2ZUBpYaYjuYsw9KYhf3",
      "network": "Solana Mainnet"
    }
  },
  "trust": {
    "trustScore": 95,
    "verifiedAt": 1700000000000
  }
}
```

## 💰 Pricing Tiers

| Tier | Price | Timeout | Memory | Description |
|------|-------|---------|--------|-------------|
| **Basic** | $0.01 | 10s | 64MB | Basic execution |
| **Standard** | $0.02 | 30s | 128MB | Standard execution |
| **Premium** | $0.05 | 60s | 256MB | With execution proofs |

## 🔐 Security Features

### Sandbox Isolation

- **isolated-vm**: Separate V8 isolate per execution
- **Memory Limits**: Configurable per tier (64-256MB)
- **Timeout Enforcement**: Prevents infinite loops
- **No System Access**: No filesystem, network, or process access

### Payment Security

- **EIP-3009**: Transfer With Authorization standard
- **x402 Protocol**: HTTP 402 payment verification
- **Nonce Verification**: Prevents replay attacks
- **Timestamp Validation**: Payment freshness checks
- **Facilitator Verification**: Daydreams handles settlement

## 🌐 x402 Payment Flow

```
1. Client → GET /api/status
   ↓ Response: Agent capabilities

2. Client → POST /api/execute (no payment)
   ↓ Response: 402 Payment Required

3. Client → Creates EIP-3009 payment authorization
   ↓ Signs with wallet

4. Client → POST /api/execute (with X-PAYMENT header)
   ↓

5. Server → Verifies payment with Daydreams facilitator
   ↓ Facilitator submits transaction to Base L2

6. Server → Executes code in sandbox
   ↓

7. Client ← Returns execution results + payment confirmation
```

## 🛠️ Development

### Project Structure

```
lucid-sandbox-agent/
├── src/
│   ├── index.ts                 # Main Express server
│   ├── lib/
│   │   ├── config.ts           # Configuration management
│   │   ├── x402-payment.ts     # x402 protocol implementation
│   │   └── sandbox.ts          # Code sandbox executor
│   ├── middleware/
│   │   └── x402.ts             # x402 Express middleware
│   └── routes/
│       ├── status.ts           # Status endpoint
│       ├── execute.ts          # Execute endpoint
│       └── verify.ts           # Verify endpoint
├── package.json
├── tsconfig.json
├── .env                        # Environment configuration
└── README.md
```

### Key Files

1. **src/lib/config.ts**
   - Centralized configuration
   - Your wallet addresses
   - Network settings
   - Pricing tiers

2. **src/lib/x402-payment.ts**
   - Complete x402 protocol implementation
   - Payment verification
   - Facilitator integration
   - EIP-3009 handling

3. **src/lib/sandbox.ts**
   - Secure code execution
   - isolated-vm integration
   - Memory and timeout management
   - Execution proof generation

4. **src/middleware/x402.ts**
   - Express middleware for x402
   - Automatic 402 responses
   - Payment verification
   - Request enrichment

5. **src/index.ts**
   - Express server setup
   - Route configuration
   - Error handling
   - Logging

### Testing

```bash
# Check TypeScript types
npm run typecheck

# Start development server
npm run dev

# Test status endpoint
curl http://localhost:3000/api/status

# Test payment requirement
curl -X POST http://localhost:3000/api/execute \
  -H "Content-Type: application/json" \
  -d '{"code":"console.log(2+2)","language":"javascript","tier":"basic"}'
```

## 📦 Deployment

### Environment Variables

Your wallet addresses are already configured in `.env`:

```env
AGENT_WALLET_ADDRESS_BASE=0x11c24Fbcd702cd611729F8402d8fB51ECa75Ba83
AGENT_WALLET_ADDRESS_ETH=0x11c24Fbcd702cd611729F8402d8fB51ECa75Ba83
AGENT_WALLET_ADDRESS_SOLANA=2x4BRUreTFZCaCKbGKVXFYD5p2ZUBpYaYjuYsw9KYhf3
```

### Deploy to Production

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Set production environment:**
   ```bash
   export NODE_ENV=production
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

### Platform-Specific Deployment

#### Vercel
```bash
npm install -g vercel
vercel deploy --prod
```

#### Railway
```bash
npm install -g @railway/cli
railway up
```

#### Fly.io
```bash
fly launch
fly deploy
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔗 Integration Examples

### JavaScript/TypeScript Client

```typescript
import { ethers } from 'ethers';

async function executeCode(code: string) {
  // 1. Get payment requirements
  const response = await fetch('http://localhost:3000/api/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code,
      language: 'javascript',
      tier: 'standard'
    })
  });

  if (response.status === 402) {
    const { paymentRequirement } = await response.json();
    
    // 2. Create payment authorization (EIP-3009)
    const wallet = new ethers.Wallet(privateKey);
    // ... sign payment authorization ...
    
    // 3. Retry with payment
    const result = await fetch('http://localhost:3000/api/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-PAYMENT': JSON.stringify(paymentPayload)
      },
      body: JSON.stringify({
        code,
        language: 'javascript',
        tier: 'standard'
      })
    });
    
    return await result.json();
  }
}
```

### Python Client

```python
import requests
import json

def execute_code(code: str):
    # 1. Request execution
    response = requests.post('http://localhost:3000/api/execute',
        json={
            'code': code,
            'language': 'javascript',
            'tier': 'standard'
        }
    )
    
    if response.status_code == 402:
        payment_req = response.json()['paymentRequirement']
        
        # 2. Create and sign payment
        # ... payment logic ...
        
        # 3. Retry with payment
        result = requests.post('http://localhost:3000/api/execute',
            headers={'X-PAYMENT': json.dumps(payment_payload)},
            json={
                'code': code,
                'language': 'javascript',
                'tier': 'standard'
            }
        )
        
        return result.json()
```

## 🎯 Use Cases

1. **AI Agent Code Execution**
   - Agents can test generated code
   - Autonomous debugging workflows
   - Pay-per-execution model

2. **Smart Contract Testing**
   - Test contract logic safely
   - Simulate transactions
   - Validate edge cases

3. **API Monetization**
   - Per-use charging
   - No subscriptions needed
   - Instant payments

4. **Educational Platforms**
   - Safe code execution for students
   - Pay-per-run model
   - Instant feedback

## 🐛 Troubleshooting

### Payment Verification Fails

- Ensure signature is valid EIP-3009 format
- Check timestamp is within valid window
- Verify payment amount matches tier requirement
- Confirm token address is Base USDC

### Execution Timeouts

- Reduce code complexity
- Upgrade to higher tier
- Check for infinite loops

### Server Won't Start

```bash
# Check if port is in use
lsof -i :3000

# Kill process if needed
kill -9 $(lsof -t -i:3000)

# Use different port
PORT=3001 npm run dev
```

## 📝 License

MIT License

## 🙏 Acknowledgments

- [Daydreams](https://www.daydreams.systems/) - Lucid Agents framework
- [x402 Protocol](https://www.x402.org) - Micropayment protocol
- [Coinbase](https://www.coinbase.com) - Base L2 network
- [isolated-vm](https://github.com/laverdet/isolated-vm) - Secure sandboxing

## 📬 Support

- Documentation: This README
- x402 Protocol: https://www.x402.org/docs
- Daydreams: https://www.daydreams.systems/
- x402scan: https://x402scan.com

## 🚀 Next Steps

1. ✅ Project is ready to run
2. ✅ Your wallet addresses are configured
3. 📝 Add OpenAI API key if using AI features
4. 🚀 Deploy to production
5. 📊 Register on x402scan.com
6. 💰 Start accepting payments!

---

Built with ❤️ using Daydreams Lucid Agents and x402 Protocol
