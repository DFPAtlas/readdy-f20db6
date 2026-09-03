# OffScript Dating - Owner Admin Command Centre

## 1. Project Description
OffScript Dating is a premium members-only AI dating app for UK adults 18+. The Owner Admin Command Centre is the secure internal dashboard where the owner and authorized admins can monitor and run the entire platform — from member management and AI agent monitoring to safety triage and verification reviews.

Brand line: "Meet someone who does not follow the script."  
Brand promise: "Verified members. Real stories. Safer sparks."

Brand Colors:
- Midnight Black: #090812
- Deep Violet: #2B144F
- Electric Magenta: #FF2DAA
- Warm Coral: #FF6B5F
- Soft Cream: #FFF4E8
- Safety Green: #2EE59D

## 2. Page Structure
- `/` - OffScript Dating Landing Page (public)
- `/owner/login` - Admin login
- `/owner/otp-setup` - Admin OTP setup (first-time)
- `/owner/dashboard` - Main admin dashboard
- `/owner/members` - Member management
- `/owner/verification` - Identity verification queue
- `/owner/reports` - User reports and moderation
- `/owner/ai-agents` - AI agent monitoring
- `/owner/system-health` - System health monitoring
- `/owner/settings` - Admin settings

## 3. Core Features (Owner Command Centre)
- [ ] Secure login with admin credential check
- [ ] OTP two-factor authentication setup + challenge
- [ ] Protected route middleware (only active admins)
- [ ] Dashboard with metric cards and status overview
- [ ] Members table with search, filters, actions
- [ ] Verification queue with approve/reject workflow
- [ ] Reports system with triage actions
- [ ] AI agents monitoring dashboard
- [ ] System health monitoring cards
- [ ] Admin settings with profile, OTP, and team management
- [ ] Audit logging placeholders for all sensitive actions
- [ ] Confirmation modals for all destructive actions

## 4. Data Model Design
(Requires Supabase)

### Table: app.admin_users
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| email | text | Admin email |
| display_name | text | Admin name |
| role | text | owner/admin/moderator/support |
| password_hash | text | Bcrypt hash |
| active | boolean | Account active |
| otp_enabled | boolean | 2FA enabled |
| otp_secret | text | TOTP secret |
| recovery_codes | jsonb | Backup codes |
| last_login | timestamptz | Last login time |
| created_at | timestamptz | Account created |

### Table: app.admin_audit_logs
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| admin_id | uuid | Who performed action |
| action | text | Action type |
| target_type | text | What was affected |
| target_id | uuid | Target identifier |
| reason | text | Reason for action |
| metadata | jsonb | Extra context |
| ip_address | text | Client IP |
| created_at | timestamptz | When action occurred |

### Table: app.profiles
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| display_name | text | Member name |
| email | text | Member email |
| age | integer | Member age |
| location | text | City/region |
| gender | text | Gender |
| bio | text | Profile bio |
| status | text | active/paused/suspended/banned |
| verification_status | text | pending/approved/rejected/resubmit |
| subscription_status | text | free/premium/cancelled |
| safety_score | integer | 0-100 safety rating |
| last_active | timestamptz | Last activity |
| created_at | timestamptz | Join date |

### Table: app.reports
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| reporter_id | uuid | Who reported |
| reported_id | uuid | Who was reported |
| target_type | text | profile/chat/wall |
| reason | text | Report reason |
| severity | text | low/medium/high/critical |
| ai_summary | text | AI-generated summary |
| status | text | open/reviewing/resolved/dismissed/escalated |
| assigned_to | uuid | Admin assigned |
| created_at | timestamptz | Report date |
| resolved_at | timestamptz | Resolution date |

## 5. Backend / Third-party Integration Plan
- **Supabase**: Required — auth, database, storage, real-time features
- **Stripe**: For subscription monitoring and payment status
- **n8n**: For AI agent webhook endpoints and automation
- **n8n agents**: AI Matchmaker, Wall Moderator, Chat Guardian, Report Triage, Verification Review, Support Triage, Subscription Watch, Safety Dashboard, Daily Matchmaker Scheduler

## 6. Development Phase Plan

### Phase 1: Landing Homepage (Complete)
- OffScript Dating public landing page with brand identity
- Deliverable: Full homepage

### Phase 2: Owner Admin Command Centre (Current)
- Goal: Build the complete owner/admin shell, layout, navigation, and all pages
- Deliverable: All /owner/* routes with protected layout, login, OTP, dashboard, members, verification, reports, AI agents, system health, and settings pages
- Sub-phases:
  - 2a: Brand update, auth context, mock data, admin layout
  - 2b: Login, OTP setup, dashboard
  - 2c: Members, Verification, Reports pages
  - 2d: AI Agents, System Health, Settings pages
  - 2e: Router wiring, build verification

### Phase 3: Member-facing App (Future)
- Goal: Build the member signup, profile, matching, and chat experience
- Deliverable: Public member pages with personality matching, AI matchmaker

---

*Last updated: 2026-07-07*