/**
 * Status Endpoint
 * 
 * GET /api/status
 * Returns agent capabilities, pricing, and network info
 * This is a free endpoint for agent discovery
 */

import type { Request, Response } from 'express';
import { CONFIG } from '../lib/config.js';

export async function statusHandler(req: Request, res: Response) {
  try {
    const status = {
      // Agent metadata
      name: CONFIG.agent.name,
      version: CONFIG.agent.version,
      description: CONFIG.agent.description,
      status: 'online',

      // Network information
      network: {
        name: CONFIG.network.name,
        chainId: CONFIG.network.chainId,
        token: CONFIG.x402.paymentToken,
        tokenAddress: CONFIG.network.usdcAddress,
      },

      // Payment configuration
      payment: {
        facilitator: CONFIG.x402.facilitatorName,
        walletAddress: CONFIG.wallets.base,
        networks: {
          base: CONFIG.wallets.base,
          ethereum: CONFIG.wallets.ethereum,
          solana: CONFIG.wallets.solana,
        },
      },

      // Execution capabilities
      capabilities: {
        languages: CONFIG.sandbox.allowedLanguages,
        maxExecutionTime: CONFIG.sandbox.maxExecutionTime,
        maxMemory: CONFIG.sandbox.maxMemory,
      },

      // Pricing tiers
      pricing: {
        basic: {
          price: CONFIG.pricing.basic,
          timeout: 10000,
          memory: 64,
          description: 'Basic execution with 10s timeout',
        },
        standard: {
          price: CONFIG.pricing.standard,
          timeout: 30000,
          memory: 128,
          description: 'Standard execution with 30s timeout',
        },
        premium: {
          price: CONFIG.pricing.premium,
          timeout: 60000,
          memory: 256,
          description: 'Premium execution with 60s timeout and proofs',
        },
      },

      // Available endpoints
      endpoints: {
        status: {
          path: '/api/status',
          method: 'GET',
          cost: 0,
          description: 'Get agent status and capabilities',
        },
        execute: {
          path: '/api/execute',
          method: 'POST',
          cost: 'variable',
          description: 'Execute code with x402 payment',
        },
        verify: {
          path: '/api/verify',
          method: 'GET',
          cost: 0,
          description: 'Verify agent wallet addresses',
        },
      },

      // Timestamps
      timestamp: Date.now(),
      uptime: process.uptime(),
    };

    // Cache for 1 minute
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.json(status);

  } catch (error) {
    console.error('Status endpoint error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to retrieve status',
    });
  }
}
