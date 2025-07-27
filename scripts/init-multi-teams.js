#!/usr/bin/env node

const MetaOrchestrator = require('../.claude/orchestration/meta-orchestrator');
const MemoryManager = require('../.claude/memory/memory-manager');
const KnowledgeCurator = require('../.claude/orchestration/knowledge-curator');
const EvolutionEngine = require('../.claude/learning/evolution-engine');

async function initializeMetaSystem() {
  console.log('🚀 Initializing Meta Multi-Team AI System...\n');
  
  try {
    // Phase 1: Core Systems
    console.log('Phase 1: Initializing Core Systems');
    const memoryManager = new MemoryManager();
    await memoryManager.initialize();
    console.log('✅ Memory systems online');
    
    // Phase 2: Team Orchestration
    console.log('\nPhase 2: Activating Team Orchestration');
    const orchestrator = new MetaOrchestrator();
    await orchestrator.initializeTeams();
    console.log('✅ All teams activated');
    
    // Phase 3: Knowledge Systems
    console.log('\nPhase 3: Starting Knowledge Systems');
    const curator = new KnowledgeCurator(memoryManager, orchestrator.teams);
    await curator.initialize();
    console.log('✅ Knowledge curator online');
    
    // Phase 4: Evolution Engine
    console.log('\nPhase 4: Initializing Evolution Engine');
    const evolution = new EvolutionEngine(orchestrator.teams, memoryManager);
    await evolution.initialize();
    console.log('✅ Evolution engine ready');
    
    // Phase 5: System Integration
    console.log('\nPhase 5: Integrating Systems');
    await integrateComponents(orchestrator, memoryManager, curator, evolution);
    console.log('✅ All systems integrated');
    
    // Display success message
    displaySuccessMessage();
    
  } catch (error) {
    console.error('❌ Initialization failed:', error);
    process.exit(1);
  }
}

async function integrateComponents(orchestrator, memoryManager, curator, evolution) {
  // Connect all components
  orchestrator.setKnowledgeCurator(curator);
  orchestrator.setEvolutionEngine(evolution);
  orchestrator.setMemoryManager(memoryManager);
  
  // Set up event listeners
  orchestrator.on('team_update', async (teamName, update) => {
    await memoryManager.storeTeamUpdate(teamName, update);
    await curator.processTeamUpdate(teamName, update);
  });
  
  orchestrator.on('cross_team_sync', async (syncData) => {
    await memoryManager.storeCrossTeamSync(syncData);
    await curator.performCrossTeamLearning();
  });
  
  // Initialize learning loops
  await evolution.startContinuousEvolution();
  await curator.startContinuousLearning();
  
  // Set up health monitoring
  setInterval(async () => {
    const health = await orchestrator.getSystemHealth();
    if (health.status !== 'healthy') {
      console.warn('⚠️ System health warning:', health.issues);
    }
  }, 30000); // Check every 30 seconds
}

function displaySuccessMessage() {
  console.log(`
╔══════════════════════════════════════════════════════════════════╗
║      🧠 META PERSISTENT MULTI-TEAM AI SYSTEM INITIALIZED! 🧠      ║
╚══════════════════════════════════════════════════════════════════╝

Your advanced AI system features:

✨ PERSISTENT MEMORY
   - Full session continuity across all teams
   - Automatic knowledge consolidation
   - Cross-team learning propagation

🤖 MULTI-TEAM ORCHESTRATION
   - 7 specialized development teams
   - 36 intelligent agents total
   - Dynamic resource allocation
   - Autonomous coordination

📈 CONTINUOUS EVOLUTION
   - Reinforcement learning optimization
   - Genetic algorithm strategy evolution
   - Real-time performance adaptation
   - Emergent behavior discovery

🔄 RESILIENT OPERATIONS
   - Fault-tolerant communication
   - Automatic state recovery
   - Graceful degradation
   - Self-healing workflows

Ready Commands:
- /init-meta-team : Activate the full system
- /build : Start a multi-team project
- /global-status : View all teams
- /evolve : Run strategy evolution
- /knowledge-sync : Transfer learnings

Type '/init-meta-team' to begin!
  `);
}

// Run initialization
initializeMetaSystem().catch(console.error); 