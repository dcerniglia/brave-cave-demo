import type { HafCheckin } from "@/types"

export const hafCheckins: HafCheckin[] = [
  // ── Marcus Chen (deep client, 7 check-ins) ──────────────────────────
  {
    id: "haf-m1",
    clientId: "c-marcus",
    week: 1,
    date: "2026-01-05",
    hurdles: [
      {
        id: "h-m1a",
        text: "Still doing IC work on two client accounts — can't let go",
        pillar: "focus",
      },
      {
        id: "h-m1b",
        text: "Haven't worked out in 3 weeks, energy is tanking",
        pillar: "fitness",
      },
    ],
    ahas: [
      {
        id: "a-m1a",
        text: "Realized I'm the bottleneck on every deal because I never built a real handoff process",
      },
      {
        id: "a-m1b",
        text: "My co-founder and I haven't had a real conversation about vision in months",
        pillar: "fraternity",
      },
    ],
    fixes: [
      {
        id: "f-m1a",
        text: "Block 6-7am every day for gym — non-negotiable morning rhythm",
        pillar: "fitness",
      },
      {
        id: "f-m1b",
        text: "Draft a client handoff playbook by next Friday",
        pillar: "focus",
      },
      {
        id: "f-m1c",
        text: "Schedule a co-founder dinner this week — no shop talk for the first hour",
        pillar: "fraternity",
      },
    ],
  },
  {
    id: "haf-m2",
    clientId: "c-marcus",
    week: 2,
    date: "2026-01-12",
    hurdles: [
      {
        id: "h-m2a",
        text: "Handoff playbook is half done — kept getting pulled into fires",
        pillar: "focus",
      },
      {
        id: "h-m2b",
        text: "VP of Sales is underperforming but I'm avoiding the conversation",
        pillar: "fraternity",
      },
    ],
    ahas: [
      {
        id: "a-m2a",
        text: "The fires ARE the symptom — if I finish the playbook the fires stop",
        pillar: "focus",
      },
      {
        id: "a-m2b",
        text: "Hit the gym 4 out of 5 days. Energy noticeably better by Thursday",
        pillar: "fitness",
      },
    ],
    fixes: [
      {
        id: "f-m2a",
        text: "Finish handoff playbook — block 2 hours Tuesday and Thursday",
        pillar: "focus",
      },
      {
        id: "f-m2b",
        text: "Have a direct conversation with VP Sales about Q1 pipeline targets",
        pillar: "fraternity",
      },
      {
        id: "f-m2c",
        text: "Review monthly P&L with CFO — haven't looked at it in 6 weeks",
        pillar: "finance",
      },
    ],
  },
  {
    id: "haf-m3",
    clientId: "c-marcus",
    week: 3,
    date: "2026-01-19",
    hurdles: [
      {
        id: "h-m3a",
        text: "VP Sales conversation went sideways — he got defensive, I backed off too quickly",
        pillar: "fraternity",
      },
    ],
    ahas: [
      {
        id: "a-m3a",
        text: "Playbook is done. Already handed off one account. The relief was instant",
        pillar: "focus",
      },
      {
        id: "a-m3b",
        text: "I back off in hard conversations because I conflate confrontation with conflict",
      },
    ],
    fixes: [
      {
        id: "f-m3a",
        text: "Prep a written framework for the VP Sales conversation — facts, expectations, timeline",
        pillar: "fraternity",
      },
      {
        id: "f-m3b",
        text: "Hand off second client account using the playbook this week",
        pillar: "focus",
      },
      {
        id: "f-m3c",
        text: "Set up a weekly 30-min deal review cadence with the sales team",
        pillar: "finance",
      },
    ],
  },
  {
    id: "haf-m4",
    clientId: "c-marcus",
    week: 4,
    date: "2026-01-26",
    hurdles: [
      {
        id: "h-m4a",
        text: "Missed two gym days — travel week threw off the rhythm",
        pillar: "fitness",
      },
      {
        id: "h-m4b",
        text: "Board deck is due in 2 weeks and I haven't started",
        pillar: "finance",
      },
    ],
    ahas: [
      {
        id: "a-m4a",
        text: "VP Sales conversation round 2 landed. He actually thanked me for being direct",
        pillar: "fraternity",
      },
      {
        id: "a-m4b",
        text: "Deal review cadence is already surfacing pipeline issues earlier",
        pillar: "finance",
      },
    ],
    fixes: [
      {
        id: "f-m4a",
        text: "Pack gym bag for travel — hotel gym or 20-min bodyweight circuit, no excuses",
        pillar: "fitness",
      },
      {
        id: "f-m4b",
        text: "Block 3 hours this week to draft board deck narrative",
        pillar: "finance",
      },
      {
        id: "f-m4c",
        text: "Ask co-founder to co-own the board deck financial section",
        pillar: "fraternity",
      },
    ],
  },
  {
    id: "haf-m5",
    clientId: "c-marcus",
    week: 5,
    date: "2026-02-02",
    hurdles: [
      {
        id: "h-m5a",
        text: "Co-founder pushed back on board deck ownership — says it's 'my job'",
        pillar: "fraternity",
      },
    ],
    ahas: [
      {
        id: "a-m5a",
        text: "We never clearly defined roles. The co-founder friction is a role clarity issue, not a relationship issue",
        pillar: "fraternity",
      },
      {
        id: "a-m5b",
        text: "Gym streak is back. 5/5 days including travel. The morning block is locked in",
        pillar: "fitness",
      },
    ],
    fixes: [
      {
        id: "f-m5a",
        text: "Draft a co-founder role clarity doc — who owns what, decide together",
        pillar: "fraternity",
      },
      {
        id: "f-m5b",
        text: "Finish board deck by Friday, present dry run to leadership team Monday",
        pillar: "finance",
      },
      {
        id: "f-m5c",
        text: "Start tracking personal spending — no budget yet, just awareness",
        pillar: "finance",
      },
    ],
  },
  {
    id: "haf-m6",
    clientId: "c-marcus",
    week: 6,
    date: "2026-02-09",
    hurdles: [
      {
        id: "h-m6a",
        text: "Board meeting is Thursday — nervous about Q1 pipeline questions",
        pillar: "finance",
      },
    ],
    ahas: [
      {
        id: "a-m6a",
        text: "Co-founder loved the role clarity doc. Said it was the best conversation we've had in a year",
        pillar: "fraternity",
      },
      {
        id: "a-m6b",
        text: "Deal review cadence gave me the data to answer board questions confidently",
        pillar: "finance",
      },
    ],
    fixes: [
      {
        id: "f-m6a",
        text: "Do a 30-min board deck dry run with co-founder Wednesday AM",
        pillar: "finance",
      },
      {
        id: "f-m6b",
        text: "Book a weekend trip with wife — fraternity isn't just business relationships",
        pillar: "fraternity",
      },
      {
        id: "f-m6c",
        text: "Add a 10-min evening wind-down — no screens, journal or stretch",
        pillar: "fitness",
      },
    ],
  },
  {
    id: "haf-m7",
    clientId: "c-marcus",
    week: 7,
    date: "2026-02-16",
    hurdles: [
      {
        id: "h-m7a",
        text: "Post-board high wore off fast — already back in the weeds on a new deal",
        pillar: "focus",
      },
    ],
    ahas: [
      {
        id: "a-m7a",
        text: "Board went great. Pipeline confidence was through the roof because of the deal reviews",
        pillar: "finance",
      },
      {
        id: "a-m7b",
        text: "I default to doing when I should be directing. The pattern repeats every time I feel momentum",
        pillar: "focus",
      },
    ],
    fixes: [
      {
        id: "f-m7a",
        text: "Delegate the new deal to VP Sales — this is his test case",
        pillar: "focus",
      },
      {
        id: "f-m7b",
        text: "Write a personal 'CEO only' task filter — if it's not on the list, I don't do it",
        pillar: "focus",
      },
      {
        id: "f-m7c",
        text: "Schedule quarterly co-founder offsite — put it on the calendar now",
        pillar: "fraternity",
      },
    ],
  },

  // ── Sarah Okafor (3 check-ins) ──────────────────────────────────────
  {
    id: "haf-s1",
    clientId: "c-sarah",
    week: 1,
    date: "2026-01-19",
    hurdles: [
      {
        id: "h-s1a",
        text: "Series A fundraise is consuming every waking hour — nothing else gets attention",
        pillar: "focus",
      },
      {
        id: "h-s1b",
        text: "Haven't seen friends in weeks, feeling isolated",
        pillar: "fraternity",
      },
    ],
    ahas: [
      {
        id: "a-s1a",
        text: "I'm treating the fundraise as urgent AND important — but half the meetings aren't actually moving the needle",
      },
    ],
    fixes: [
      {
        id: "f-s1a",
        text: "Audit investor meetings — cut the bottom 30% that aren't real prospects",
        pillar: "focus",
      },
      {
        id: "f-s1b",
        text: "One social dinner per week, even if it's just 60 minutes",
        pillar: "fraternity",
      },
    ],
  },
  {
    id: "haf-s2",
    clientId: "c-sarah",
    week: 3,
    date: "2026-02-02",
    hurdles: [
      {
        id: "h-s2a",
        text: "Cut 4 investor meetings but added 3 new ones — net zero progress",
        pillar: "focus",
      },
    ],
    ahas: [
      {
        id: "a-s2a",
        text: "I say yes to new intros automatically. Need a screening framework",
        pillar: "focus",
      },
      {
        id: "a-s2b",
        text: "The one dinner I had was with a former colleague — she offered to make a warm intro to Sequoia",
        pillar: "fraternity",
      },
    ],
    fixes: [
      {
        id: "f-s2a",
        text: "Create a 3-question investor screening filter before accepting any meeting",
        pillar: "focus",
      },
      {
        id: "f-s2b",
        text: "Follow up on the Sequoia intro — send a deck by Wednesday",
        pillar: "finance",
      },
    ],
  },
  {
    id: "haf-s3",
    clientId: "c-sarah",
    week: 5,
    date: "2026-02-16",
    hurdles: [
      {
        id: "h-s3a",
        text: "Sequoia partner wants a deep-dive on unit economics — I'm not confident in the numbers",
        pillar: "finance",
      },
    ],
    ahas: [
      {
        id: "a-s3a",
        text: "The screening filter is working — I declined 5 meetings this week without guilt",
        pillar: "focus",
      },
      {
        id: "a-s3b",
        text: "I need to invest in my finance literacy, not just delegate to my accountant",
        pillar: "finance",
      },
    ],
    fixes: [
      {
        id: "f-s3a",
        text: "Block 4 hours to build a unit economics model with the finance lead",
        pillar: "finance",
      },
      {
        id: "f-s3b",
        text: "Prep a 1-page unit economics narrative for investor conversations",
        pillar: "finance",
      },
    ],
  },

  // ── James Whitfield (2 check-ins) ───────────────────────────────────
  {
    id: "haf-j1",
    clientId: "c-james",
    week: 1,
    date: "2026-02-02",
    hurdles: [
      {
        id: "h-j1a",
        text: "Managing 6 portfolio companies and my own health is dead last",
        pillar: "fitness",
      },
      {
        id: "h-j1b",
        text: "Two portfolio CEOs are in conflict and both want me to take sides",
        pillar: "fraternity",
      },
    ],
    ahas: [
      {
        id: "a-j1a",
        text: "I optimize everyone else's business but treat my body like it's optional",
        pillar: "fitness",
      },
    ],
    fixes: [
      {
        id: "f-j1a",
        text: "Hire a personal trainer — accountability, not willpower",
        pillar: "fitness",
      },
      {
        id: "f-j1b",
        text: "Facilitate a joint call with both CEOs instead of shuttling messages",
        pillar: "fraternity",
      },
    ],
  },
  {
    id: "haf-j2",
    clientId: "c-james",
    week: 3,
    date: "2026-02-16",
    hurdles: [
      {
        id: "h-j2a",
        text: "Trainer booked but I cancelled twice — kept saying 'next week'",
        pillar: "fitness",
      },
    ],
    ahas: [
      {
        id: "a-j2a",
        text: "The joint call worked — both CEOs said they wished I'd done it sooner",
        pillar: "fraternity",
      },
      {
        id: "a-j2b",
        text: "I cancel fitness commitments because I don't treat them with the same gravity as a board meeting",
      },
    ],
    fixes: [
      {
        id: "f-j2a",
        text: "Put trainer sessions on the calendar as 'Board Meeting — Health' so I stop cancelling",
        pillar: "fitness",
      },
      {
        id: "f-j2b",
        text: "Build a quarterly review template for portfolio company check-ins",
        pillar: "focus",
      },
    ],
  },

  // ── Priya Nair (2 check-ins) ────────────────────────────────────────
  {
    id: "haf-p1",
    clientId: "c-priya",
    week: 1,
    date: "2026-01-26",
    hurdles: [
      {
        id: "h-p1a",
        text: "Engineering team is burning out — shipping pace is unsustainable",
        pillar: "fraternity",
      },
      {
        id: "h-p1b",
        text: "Cash runway is 9 months and I haven't started fundraise conversations",
        pillar: "finance",
      },
    ],
    ahas: [
      {
        id: "a-p1a",
        text: "The burnout is coming from me — I keep adding scope mid-sprint because I'm anxious about the market",
        pillar: "focus",
      },
    ],
    fixes: [
      {
        id: "f-p1a",
        text: "Commit to zero scope changes mid-sprint for the next 3 sprints",
        pillar: "focus",
      },
      {
        id: "f-p1b",
        text: "Make a list of 10 target investors and start warm intro outreach",
        pillar: "finance",
      },
    ],
  },
  {
    id: "haf-p2",
    clientId: "c-priya",
    week: 3,
    date: "2026-02-09",
    hurdles: [
      {
        id: "h-p2a",
        text: "Broke the no-scope-change rule once — caught myself but the team noticed",
        pillar: "focus",
      },
    ],
    ahas: [
      {
        id: "a-p2a",
        text: "Team morale improved visibly in just 2 sprints of no surprise scope changes",
        pillar: "fraternity",
      },
      {
        id: "a-p2b",
        text: "Two investors from the list already responded — warm intros matter",
        pillar: "finance",
      },
    ],
    fixes: [
      {
        id: "f-p2a",
        text: "Create a 'parking lot' doc for mid-sprint ideas — review it at sprint planning only",
        pillar: "focus",
      },
      {
        id: "f-p2b",
        text: "Schedule first two investor coffee chats this week",
        pillar: "finance",
      },
    ],
  },

  // ── Devon Caldwell (1 check-in) ─────────────────────────────────────
  {
    id: "haf-d1",
    clientId: "c-devon",
    week: 1,
    date: "2026-02-09",
    hurdles: [
      {
        id: "h-d1a",
        text: "Business finances are a mess — personal and company accounts are mixed",
        pillar: "finance",
      },
      {
        id: "h-d1b",
        text: "Spending so much time coaching clients that I'm not building the business",
        pillar: "focus",
      },
    ],
    ahas: [
      {
        id: "a-d1a",
        text: "I'm great at fitness discipline but can't apply the same rigor to money",
        pillar: "finance",
      },
    ],
    fixes: [
      {
        id: "f-d1a",
        text: "Open a separate business checking account this week",
        pillar: "finance",
      },
      {
        id: "f-d1b",
        text: "Block Friday mornings for business development — no client sessions",
        pillar: "focus",
      },
    ],
  },

  // ── Rachel Dominguez (1 check-in, just started) ─────────────────────
  {
    id: "haf-r1",
    clientId: "c-rachel",
    week: 1,
    date: "2026-02-16",
    hurdles: [
      {
        id: "h-r1a",
        text: "Saying yes to every project because I'm afraid of losing clients",
        pillar: "focus",
      },
      {
        id: "h-r1b",
        text: "Haven't exercised consistently since I started the firm 2 years ago",
        pillar: "fitness",
      },
    ],
    ahas: [
      {
        id: "a-r1a",
        text: "I have a scarcity mindset even though we're fully booked — it's not rational",
        pillar: "focus",
      },
    ],
    fixes: [
      {
        id: "f-r1a",
        text: "Define an ideal client profile — say no to anything outside it for 30 days",
        pillar: "focus",
      },
      {
        id: "f-r1b",
        text: "Start with 3 walks per week — don't overthink it, just move",
        pillar: "fitness",
      },
    ],
  },
]
