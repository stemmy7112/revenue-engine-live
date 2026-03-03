#!/bin/bash
# Quick commands to manage your separate branches

echo "=== Current Branch Status ==="
echo ""
echo "Checking which branch you're on:"
git branch -v
echo ""
echo "=== Pushing all branches to remote ==="
git push origin copilot/setup-vite-react-frontend --force-with-lease
git push origin feature/mobile-ready-20260303-164412 --force-with-lease
git push origin backup/pre-mobile-work-20260303-164412 --force-with-lease
echo ""
echo "✅ All branches backed up to GitHub!"
echo ""
echo "=== Your branch separation is complete ==="
echo ""
echo "📌 Production (no mobile): copilot/setup-vite-react-frontend"
echo "📱 Mobile features:       feature/mobile-ready-20260303-164412"
echo "🔒 Safety backup:         backup/pre-mobile-work-20260303-164412"
