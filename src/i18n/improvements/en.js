export default {
  "intro": "I build web applications, AI tools, and digital experiences for businesses. Based in Sydney, working from the first interface through to the finished product.",
  "about": "I’m Jim, a Sydney-based developer with a background in mathematics and IT. My work spans business websites, email tools, and mobile apps. I enjoy making complex workflows easier to use, with thoughtful interfaces and practical software behind them.",
  "viewWork": "Explore my work",
  "location": "Based in",
  "locationValue": "Sydney, Australia",
  "emailInstead": "Or email me directly.",
  "contactError": "We could not confirm delivery. Your message is still here; try again or use email.",
  "offers": [
    "Web applications: responsive interfaces, APIs, and business workflows, from an initial idea to a working product.",
    "Website rebuilds: clearer navigation, stronger project or service pages, and a considered migration of existing content.",
    "AI and mobile tools: focused features such as email assistance, daily tracking, and useful summaries."
  ],
  "projectDate": "Project date",
  "softwareRole": "Software developer",
  "appRole": "App developer",
  "storyTitle": "Behind the build",
  "problem": "The problem",
  "decisions": "Key decisions",
  "outcome": "What the build delivers",
  "tourTitle": "Take a quick tour",
  "tourNote": "A guided walkthrough of captured product screens. Use the steps to explore the flow.",
  "step": "Step {n} of {total}",
  "previous": "Previous step",
  "next": "Next step",
  "play": "Play tour",
  "pause": "Pause tour",
  "replay": "Replay tour",
  "compareTitle": "Before & after",
  "compareNote": "Drag the slider or use the arrow keys to compare the two versions.",
  "before": "Before",
  "after": "After",
  "reveal": "Reveal the new design",
  "revealValue": "{n}% new design",
  "requestDemo": "Discuss this project",
  "allScreens": "All project screenshots",
  "featureYes": "Included",
  "featureNo": "Not included",
  "comparisonNotes": {
    "housed-redesign": "The Housed homepage moves from a broad brand introduction to a more visual starting point for exploring clubs and memberships. The full story below explains the changes to navigation, booking, and content.",
    "simba-education-new-build": "The original WordPress site and the custom education build share the same subject, but organise the first impression differently. Compare the page hierarchy, imagery, and entry points into the programmes.",
    "simba-education-redesign": "The original site and the later redesign show two treatments of the same education brand. Compare the navigation, typography, and emphasis on programmes.",
    "simba-health-redesign": "The rebuilt healthcare homepage makes routes into services and symptoms more explicit. Compare how the two versions introduce the service and organise the next step."
  },
  "stories": {
    "hermes-ai-email-client": {
      "problem": "Writing, reading, and organising email can mean repeatedly switching between an inbox and a separate AI tool. Hermes brings those tasks into one email client.",
      "decisions": [
        "Keep the message and writing assistance side by side, so a draft can be reviewed in context.",
        "Offer specific writing modes—tone, grammar, subject lines, and replies—rather than a single ambiguous action.",
        "Support multiple email accounts and AI providers, with an Electron desktop experience alongside the browser app."
      ],
      "outcome": "The private demo brings together inbox browsing, conversation summaries, nine writing modes, and smart categories. The walkthrough shows the interface; access to the running build is available by request.",
      "steps": [
        "Open the inbox",
        "Understand the thread",
        "Shape the reply"
      ],
      "stepText": [
        "Start with the inbox and message view in one workspace.",
        "Read the summary alongside the email to pick out the important details.",
        "Choose a writing mode from the assist panel while keeping the draft visible."
      ]
    },
    "housed-redesign": {
      "problem": "The earlier site explained the gym, but visitors also needed to find a club, compare memberships, and reach a timetable. The redesign organises the site around those tasks.",
      "decisions": [
        "Give each club its own context, facilities, and location information.",
        "Make memberships comparable and connect them to a clear next step.",
        "Audit existing pages before reorganising the content, including the paths into the journal and member portal."
      ],
      "outcome": "The rebuild includes club pages, membership choices, timetables, and a member portal. The comparisons and walkthrough show how the pages support those journeys; the longer article covers the migration decisions.",
      "steps": [
        "Choose a space",
        "Compare memberships",
        "Find a class"
      ],
      "stepText": [
        "Explore the spaces before committing to a membership.",
        "Review the membership options in a dedicated comparison view.",
        "Move from browsing the club to the timetable and booking journey."
      ]
    },
    "oncora": {
      "problem": "Between appointments, symptoms, treatment dates, and questions can become scattered notes. Oncora brings that information into a mobile companion designed around daily check-ins.",
      "decisions": [
        "Start with a short daily check-in instead of a dense dashboard.",
        "Turn individual entries into trends over time, while keeping a body map for location-specific observations.",
        "Keep a self-reported appointment summary distinct from the AI companion and educational content."
      ],
      "outcome": "The React Native app screens connect daily records, symptom patterns, a care toolkit, and an exportable appointment report. The walkthrough follows that path from a daily entry to a self-reported summary for a care-team conversation.",
      "steps": [
        "Check in today",
        "See patterns",
        "Prepare for an appointment"
      ],
      "stepText": [
        "The daily screen gives the next check-in a clear starting point.",
        "Trends bring temperature, energy, and other recorded measures together over time.",
        "The report organises self-reported observations for discussion with the care team."
      ]
    },
    "simba-education-cms": {
      "problem": "Head office needed one place to share policies, announcements, and training with five centres, and website promotions had to go live without waiting on a developer and a deployment. The Staff Hub & CMS puts both jobs in one signed-in workspace.",
      "decisions": [
        "Write a promotion once and lay it out automatically for every page, device, and screen width, while keeping any hand adjustment made at one size.",
        "Give centre staff a reading view and head office the editing rights, with role-based folders, an audit log, and two-step sign-in for administrators.",
        "Make background work visible: emails, website refreshes, and document previews each report their health, and anything that failed can be retried from the screen."
      ],
      "outcome": "An Angular 21 client on a .NET 10 API and Postgres, deployed on AWS, now carries campaigns, events, legal pages, documents, and training for every centre. The walkthrough follows a promotion from the list to its canvas, then over to each team’s training.",
      "steps": [
        "Write the promotion",
        "Arrange each size",
        "Follow each team"
      ],
      "stepText": [
        "Each campaign is written once and ticked onto the pages it belongs on.",
        "The canvas shows the banner at its real size, ready to adjust for that page and width.",
        "On the staff side, team progress shows where every person at every centre is with their training."
      ]
    },
    "imperial-centre": {
      "problem": "Most people visiting a shopping centre’s website want one of three answers: is the shop I need here, is it open now, and where do I park. Imperial Centre’s new site is built around answering those quickly, on any screen.",
      "decisions": [
        "Give every one of the 48 retailers its own page and its own hours, and show today’s hours on each directory card, so nobody has to open a store’s page to find out whether it is open.",
        "Work out NSW public holidays in code for any year, Easter and substitute days included, and apply the state’s restricted trading rules, so the holiday hours never need updating by hand.",
        "Send contact and leasing enquiries through one rate-limited route with a honeypot, a confirmation to the visitor, and a fallback inbox if the send fails, so no enquiry is lost."
      ],
      "outcome": "A Next.js site with TypeScript and Tailwind CSS, with store and event pages built ahead of time, the trading hours page rebuilt daily, and enquiries sent through SendGrid. The walkthrough goes from finding a store to checking its hours to planning the trip.",
      "steps": [
        "Find a store",
        "Check the hours",
        "Plan the trip"
      ],
      "stepText": [
        "Search, filter by category, or jump to a letter, with today’s hours on every card.",
        "Centre, retailer, and public holiday hours side by side, with today marked.",
        "Choose how you’re arriving and see the car parks, free periods, and nearest stops."
      ]
    },
    "housed-sales-system": {
      "problem": "Housed’s sales team ran every lead, call, and follow-up through ABC GymSales, a subscription CRM. Housed wanted to own that system — its data, its rules, and its cost — without asking a busy sales team to learn a new way of working.",
      "decisions": [
        "Map GymSales screen by screen before writing any code, then import the club’s real settings, 49 automations, and 106 message templates, so the team opens a system that already knows their club.",
        "Keep the GymSales layout and vocabulary — News Feed, Next Call, End of Day — so nobody needs retraining, and spend the effort on what the team kept working around: automation history, duplicate merging, and reports in each gym’s own timezone.",
        "Treat messaging as the risky part: opt-outs checked when a message is queued and again when it is sent, signed Twilio webhooks, and a send queue that two servers can share without sending anything twice."
      ],
      "outcome": "An Angular, .NET, and PostgreSQL app, with SMS through Twilio and email through SendGrid, deployed for Housed Macquarie Park. The table below compares it with GymSales feature by feature; the walkthrough follows a salesperson from the lead list to the end-of-day report.",
      "steps": [
        "Find the lead",
        "Work the queue",
        "Close the day"
      ],
      "stepText": [
        "Search, refine, and bulk-edit leads, with each person’s status, source, and opt-outs in one row.",
        "The next person to call, ordered by who has waited longest, with a warning if they were contacted in the last four hours.",
        "The gym’s day in its own timezone: new leads, calls, appointments booked and completed, and what is still open."
      ],
      "comparison": {
        "eyebrow": "GymSales and Housed Sales System",
        "title": "Feature by feature",
        "intro": "The first goal was parity: every screen a salesperson used in GymSales had to exist on day one. After that, the build added what the team kept working around. A few GymSales features have not been carried over yet, and they are listed too.",
        "columns": ["Feature", "ABC GymSales", "Housed Sales System"],
        "groups": [
          {
            "label": "Kept from GymSales",
            "rows": [
              ["Lead list with filters, tags, and bulk actions", "yes", "yes"],
              ["Client profile with the full contact history", "yes", "yes"],
              ["Next Call queue with a four-hour contact guard", "yes", "yes"],
              ["Calendar by day, week, month, and salesperson", "yes", "yes"],
              ["Automated SMS and email follow-ups", "yes", "yes"],
              ["SMS and email templates with merge fields", "yes", "yes"],
              ["Performance, reports, and End of Day", "yes", "yes"],
              ["Opt-outs per channel, and Do Not Call", "yes", "yes"]
            ]
          },
          {
            "label": "Added beyond GymSales",
            "rows": [
              ["Versioned automations with a run history for each rule", "no", "yes"],
              ["Duplicate check on new leads, and a two-record merge", "no", "yes"],
              ["Reports and End of Day in each gym’s own timezone", "no", "yes"],
              ["Calendar check for appointments with no outcome recorded", "no", "yes"],
              ["Ad-click attribution on every lead (gclid, fbclid, UTM)", "no", "yes"],
              ["Rules that open a secondary-sale opportunity on a membership sale", "no", "yes"],
              ["Per-gym rules: required marketing source, re-engagement window", "Working hours only", "yes"]
            ]
          },
          {
            "label": "Not carried over yet",
            "rows": [
              ["WhatsApp messaging", "yes", "no"],
              ["Guests page and front-desk sign-in kiosk", "yes", "no"],
              ["Member-system integrations", "20+ systems", "GymMaster only"]
            ]
          }
        ],
        "note": "Based on the GymSales features Housed used, mapped from the live account in July 2026 and checked again in October 2026. GymSales may offer features Housed did not use."
      }
    }
  }
};
