OneAtlas Runtime

AI-native runtime application platform for generating operational internal tools from natural language prompts.

OneAtlas Runtime is a schema-driven platform that generates editable business applications such as CRMs, HR dashboards, analytics workspaces, inventory systems, admin panels, and support workspaces.

Unlike traditional CRUD scaffolds, the platform uses:

Runtime schemas
Conversational mutations
Versioned schema history
Frozen preview snapshots
Dynamic UI rendering
Live Features
Core Runtime Features
Runtime schema generation
Conversational editing engine
Schema versioning
Undo support
Preview snapshot system
Dynamic runtime rendering
Template instantiation system
Mutation history tracking
Supported Templates

The platform currently supports:

CRM Workspace
Inventory System
Analytics Workspace
HR Dashboard
Admin Dashboard
Support Workspace

Each template includes:

Metrics dashboards
Tables
Activity feeds
Alerts
Workflow pipelines
Dynamic runtime components
Runtime Architecture

The application is built around a runtime schema system.

Instead of generating hardcoded pages, the system stores app structure as JSON schemas in the database.

Example flow:

Prompt
   ↓
Template Matching
   ↓
Runtime Schema Creation
   ↓
Database Persistence
   ↓
Dynamic Rendering
   ↓
Conversational Mutations
   ↓
Schema Versioning
Conversational Editing

The platform supports targeted schema mutations.

Examples:

Add priority field
Rename company to account
Remove email field
Add salary field
Rename supplier to vendor

The mutation engine updates only the affected schema portion instead of regenerating the full app.

Preview Snapshot System

Preview links are immutable snapshots.

When a preview is generated:

Current schema is frozen
Snapshot is stored in database
Unique preview token is generated
Public preview URL becomes available

Future edits do not affect older previews.

This behavior matches real-world deployment previews.

Tech Stack
Frontend
Next.js 15
React
TypeScript
Tailwind CSS
Sonner Toasts
Backend
Next.js Route Handlers
Prisma ORM
PostgreSQL (Neon)
Deployment
Vercel
Neon PostgreSQL
Folder Structure
app/
 ├── api/
 │    ├── generate/
 │    ├── apps/
 │    └── templates/
 │
 ├── builder/
 │
 ├── preview/
 │
 └── components/

lib/
 ├── prisma.ts
 ├── templates.ts
 ├── mutation-engine.ts
 └── template-matcher.ts

prisma/
 └── schema.prisma

types/
 └── app.ts
Database Models

Main entities:

App
SchemaVersion
MutationLog
PreviewSnapshot

These models enable:

Version history
Undo operations
Snapshot previews
Runtime persistence
Setup Instructions
1. Clone Repository
git clone <your-repo-url>
2. Install Dependencies
npm install
3. Configure Environment Variables

Create .env

DATABASE_URL="your_neon_database_url"
4. Run Prisma
npx prisma generate
npx prisma db push
5. Start Development Server
npm run dev

Open:

http://localhost:3000
API Routes
Generate App
POST /api/generate

Creates runtime app from prompt.

Example:

{
  "prompt": "Create a CRM dashboard for managing clients"
}
Edit Runtime Schema
POST /api/apps/[id]/edit

Example:

{
  "instruction": "Add priority field"
}
Undo Mutation
POST /api/apps/[id]/undo

Reverts latest schema mutation.

Generate Preview Snapshot
POST /api/apps/[id]/preview

Creates immutable preview snapshot.

Template Instantiation
POST /api/templates/[id]/instantiate

Directly creates app from selected template.

Conversational Runtime Examples
CRM Workspace
Add follow up date field
Rename company to account
Remove deal value field
HR Dashboard
Add salary field
Rename department to team
Inventory System
Add reorder level field
Rename supplier to vendor
UI/UX Goals

The platform was designed with:

Clean enterprise UI
Minimalistic aesthetic
Runtime-first architecture
Fast interactions
Context-aware editing
Modern dashboard layouts
Tradeoffs & Assumptions
Current Mutation Engine

The MVP uses rule-based mutations instead of a real LLM.

Reason:

Faster implementation
Deterministic behavior
Easier debugging
Safer schema operations

The architecture is intentionally designed so an LLM layer can later replace the parser.

Template-Based Generation

Apps are instantiated from operational templates instead of fully generated from scratch.

Reason:

Better consistency
Faster rendering
Easier maintenance
Safer runtime evolution
Runtime Rendering

UI is rendered dynamically from schema JSON.

Advantages:

Reusable rendering system
Dynamic editing
Scalable runtime architecture
Future Improvements

Potential upgrades:

Real AI/LLM integration
Drag-and-drop builder
Multi-user collaboration
Real authentication
Role-based permissions
Live deployments
Real charts with Recharts
Dark mode
Command palette
Realtime sync
Deployment
Frontend

Deploy using:

Vercel
Database

Hosted on:

Neon PostgreSQL
Author

Built by Sarvagya Jain.

Runtime-first internal application platform MVP.