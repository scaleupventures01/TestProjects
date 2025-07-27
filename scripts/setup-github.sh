#!/bin/bash
set -e
echo "🚀 Setting up GitHub repositories for AI Team System"
read -p "Enter your GitHub username: " GITHUB_USER
echo "📦 Creating template repository..."
gh repo create ai-team-template --public --description "AI Multi-Team Development System Template" --clone=false || echo "Repo may already exist"
git remote add origin https://github.com/$GITHUB_USER/ai-team-template.git 2>/dev/null || git remote set-url origin https://github.com/$GITHUB_USER/ai-team-template.git
echo "✅ Setup started for $GITHUB_USER" 