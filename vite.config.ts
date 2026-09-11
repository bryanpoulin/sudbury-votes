import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import crypto from 'crypto';
import {defineConfig, Plugin} from 'vite';

// Level 2 Anti-Stuffing & Persistent In-Memory State
const ipCooldowns = new Map<string, number>();
const voteDeltas: Record<string, {
  cityWide: Record<string, number>;
  byWard: Record<number, Record<string, number>>;
}> = {
  arena: { cityWide: { A: 0, B: 0, C: 0, D: 0 }, byWard: {} },
  roads: { cityWide: { A: 0, B: 0, C: 0, D: 0 }, byWard: {} },
  housing: { cityWide: { A: 0, B: 0, C: 0, D: 0 }, byWard: {} },
  taxes: { cityWide: { A: 0, B: 0, C: 0, D: 0 }, byWard: {} }
};

function sentimentApiPlugin(): Plugin {
  return {
    name: 'sentiment-api',
    configureServer(server) {
      server.middlewares.use('/api/sentiment', (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');

        if (req.method === 'GET') {
          res.statusCode = 200;
          res.end(JSON.stringify({ success: true, voteDeltas }));
          return;
        }

        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });

          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');
              const { topicId, optionId, ward } = data;

              if (!topicId || !optionId || !['arena', 'roads', 'housing', 'taxes'].includes(topicId)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Invalid topic or option specification.' }));
                return;
              }

              // Extract IP and calculate anonymized SHA-256 hash
              const forwarded = req.headers['x-forwarded-for'];
              const clientIp = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.socket.remoteAddress) || '127.0.0.1';
              const ipHash = crypto.createHash('sha256').update(`${clientIp}_sudbury_civic_${topicId}`).digest('hex');

              const now = Date.now();
              const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours
              const lastVote = ipCooldowns.get(ipHash);

              if (lastVote && now - lastVote < cooldownPeriod) {
                res.statusCode = 429;
                res.end(JSON.stringify({
                  success: false,
                  cooldownActive: true,
                  error: 'A ballot from this network has already been recorded for this issue in the past 24 hours (Level 2 Civic Integrity Cooldown).'
                }));
                return;
              }

              // Record cooldown
              ipCooldowns.set(ipHash, now);

              // Increment delta
              if (!voteDeltas[topicId]) {
                voteDeltas[topicId] = { cityWide: { A: 0, B: 0, C: 0, D: 0 }, byWard: {} };
              }
              voteDeltas[topicId].cityWide[optionId] = (voteDeltas[topicId].cityWide[optionId] || 0) + 1;

              if (ward && ward >= 1 && ward <= 12) {
                if (!voteDeltas[topicId].byWard[ward]) {
                  voteDeltas[topicId].byWard[ward] = { A: 0, B: 0, C: 0, D: 0 };
                }
                voteDeltas[topicId].byWard[ward][optionId] = (voteDeltas[topicId].byWard[ward][optionId] || 0) + 1;
              }

              res.statusCode = 200;
              res.end(JSON.stringify({
                success: true,
                message: 'Ballot verified and recorded successfully.',
                voteDeltas
              }));
            } catch {
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: 'Internal server error processing ballot.' }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), sentimentApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
