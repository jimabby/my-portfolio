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
    }
  }
};
