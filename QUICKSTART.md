# 🚀 Quick Start Guide

Get your Lucid Sandbox Agent running in 5 minutes!

## Step 1: Install Dependencies

```bash
cd lucid-sandbox-agent
npm install
```

## Step 2: Check Configuration

Your wallet addresses are already configured in `.env`:

✅ **Base L2**: `0x11c24Fbcd702cd611729F8402d8fB51ECa75Ba83`  
✅ **Ethereum**: `0x11c24Fbcd702cd611729F8402d8fB51ECa75Ba83`  
✅ **Solana**: `2x4BRUreTFZCaCKbGKVXFYD5p2ZUBpYaYjuYsw9KYhf3`

## Step 3: Start the Server

```bash
npm run dev
```

You should see:

```
╔════════════════════════════════════════════════════════════╗
║           🚀 Lucid Sandbox Agent Started 🚀               ║
╚════════════════════════════════════════════════════════════╝

💰 Payment Configuration:
   • Network: base (Chain ID: 8453)
   • Token: USDC
   • Facilitator: Daydreams
   • Wallet (Base): 0x11c24Fbcd702cd611729F8402d8fB51ECa75Ba83

🔌 Endpoints:
   • GET  http://localhost:3000/api/status (free)
   • POST http://localhost:3000/api/execute (paid)
   • GET  http://localhost:3000/api/verify (free)

✅ Ready to accept x402 payments and execute code!
```

## Step 4: Test the API

### Test Status (Free)

```bash
curl http://localhost:3000/api/status
```

### Test Payment Requirement

```bash
curl -X POST http://localhost:3000/api/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "console.log(2 + 2)",
    "language": "javascript",
    "tier": "basic"
  }'
```

**Expected Response**: 402 Payment Required

```json
{
  "error": "Payment Required",
  "paymentRequirement": {
    "maxAmountRequired": "10000",
    "payTo": "0x11c24Fbcd702cd611729F8402d8fB51ECa75Ba83",
    "asset": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    "network": "base"
  }
}
```

### Verify Wallets

```bash
curl http://localhost:3000/api/verify
```

## Step 5: Push to GitHub

```bash
# Initialize git
git init

# Add files
git add .

# Commit
git commit -m "Initial commit: Lucid Sandbox Agent with x402 payments"

# Create GitHub repo and push
gh repo create lucid-sandbox-agent --public --source=. --push

# Or manually:
# 1. Create repo on github.com
# 2. git remote add origin https://github.com/YOUR_USERNAME/lucid-sandbox-agent.git
# 3. git push -u origin main
```

## What You Built

✅ **x402 Payment Integration** - Full protocol implementation  
✅ **Secure Sandbox** - isolated-vm code execution  
✅ **Multi-Chain Wallets** - Base, ETH, Solana configured  
✅ **Three Pricing Tiers** - $0.01, $0.02, $0.05  
✅ **Express API** - Production-ready endpoints  
✅ **TypeScript** - Type-safe codebase  

## Next Steps

1. **Deploy to Production**
   ```bash
   npm run build
   npm start
   ```

2. **Register on x402scan**
   - Visit https://x402scan.com/composer
   - Register your agent endpoints
   - Start accepting payments!

3. **Monitor Usage**
   - Watch server logs
   - Track execution metrics
   - Monitor payments

## File Reference

| File | Purpose |
|------|---------|
| `src/index.ts` | Main Express server |
| `src/lib/config.ts` | Configuration (wallet addresses here!) |
| `src/lib/x402-payment.ts` | x402 payment verification |
| `src/lib/sandbox.ts` | Code execution sandbox |
| `src/middleware/x402.ts` | x402 Express middleware |
| `src/routes/execute.ts` | Main execution endpoint |
| `.env` | Environment variables |

## Troubleshooting

**Port 3000 in use?**
```bash
PORT=3001 npm run dev
```

**Dependencies won't install?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors?**
```bash
npm run typecheck
```

## Support

- **README.md** - Full documentation
- **x402 Docs** - https://www.x402.org/docs
- **Daydreams** - https://www.daydreams.systems/

---

**You're ready!** 🎉

Your Lucid Sandbox Agent is configured with your wallet addresses and ready to accept x402 payments on Base L2.
