import { Link } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import BlogProgressBar from "./BlogProgressBar";
import BlogShareButtons from "./BlogShareButtons";
import BlogPrevNext from "./BlogPrevNext";
import BlogSEO from "./BlogSEO";
import ScrollUp from "../scrollup/ScrollUp";
import "./blog.css";

const Hiro = () => {
  return (
    <>
      <BlogSEO
        title="Hiro - The AI Job Application Agent"
        description="Hiro scrapes Seek, Indeed, and LinkedIn on a schedule, scores every job against your resume, tailors your application, and submits - all while you sleep."
        ogImage="hiro.webp"
        slug="hiro"
      />
      <Header />
      <BlogProgressBar />

      <main className="blog blog--single section" id="hiro">
        <div className="blog__container container">

          {/* Back button */}
          <div className="blog__back-wrapper">
            <Link to="/blog" className="blog__back-button">
              {"<- Back to Blog"}
            </Link>
          </div>

          {/* HERO */}
          <header className="blog__hero card">
            <div className="blog__post-meta">
              <span className="blog__badge">Project</span>
              <span className="blog__meta-dot">|</span>
              <time className="blog__meta-date">March 2026</time>
              <span className="blog__meta-dot">|</span>
              <span className="blog__meta-readtime">8 min read</span>
            </div>

            <h1 className="blog__post-title">
              Hiro - The AI Job Application Agent
            </h1>

            <p className="blog__hero-text">
              Job hunting is a second job. You refresh listings, copy-paste your
              resume, rewrite cover letters for each posting, and still end up
              sending the same generic application as everyone else.{" "}
              <strong>Hiro</strong> does it for you - automatically.
            </p>

            <p className="blog__hero-text">
              Hiro is an AI-powered desktop agent that scrapes Seek, Indeed, and
              LinkedIn on a configurable schedule, scores each job against your
              resume, tailors your application to the specific role, and submits
             - all overnight. You wake up to a dashboard of applications already
              sent.
            </p>
          </header>

          {/* TABLE OF CONTENTS */}
          <nav className="blog__toc card">
            <h2 className="blog__toc-title">In this article</h2>
            <ol className="blog__toc-list">
              <li><a href="#problem">The Problem with Job Hunting</a></li>
              <li><a href="#scraping">Multi-Platform Scraping</a></li>
              <li><a href="#ai-scoring">AI Match Scoring</a></li>
              <li><a href="#tailoring">Resume &amp; Cover Letter Tailoring</a></li>
              <li><a href="#auto-apply">Auto-Apply</a></li>
              <li><a href="#dashboard">Dashboard</a></li>
              <li><a href="#job-detail">Job Detail Panel</a></li>
              <li><a href="#analytics">Analytics &amp; Timeline</a></li>
              <li><a href="#scheduling">Scheduling &amp; Follow-ups</a></li>
              <li><a href="#try-it">Try It Yourself</a></li>
            </ol>
          </nav>

          {/* CONTENT */}
          <div className="blog__content">

            {/* THE PROBLEM */}
            <section className="blog__section card" id="problem">
              <h2 className="blog__heading">The Problem with Job Hunting</h2>

              <p>
                The average job search involves hundreds of applications. Each
                one requires the same manual loop: find the listing, read the
                description, tweak your resume, write a cover letter, fill in
                the same fields you've filled a hundred times before, submit,
                and wait.
              </p>

              <p>
                Most of that loop is automatable. The only part that actually
                needs your judgement is deciding whether a job is worth your
                time - and even that can be assisted with AI scoring. Hiro
                automates everything else so you can focus on what matters:
                preparing for the interviews you actually want.
              </p>

              <div className="blog__tip">
                <h3 className="blog__tip-title">What Hiro is not</h3>
                <p className="blog__tip-text">
                  Hiro doesn't spam applications blindly. Every submission is
                  scored, tailored, and filtered against your configured
                  preferences - so what gets sent represents you accurately.
                </p>
              </div>
            </section>

            {/* SCRAPING */}
            <section className="blog__section card" id="scraping">
              <h2 className="blog__heading">Multi-Platform Scraping</h2>

              <p>
                Hiro watches three of the largest job boards simultaneously.
                Each platform has its own login flow, pagination logic, and
                listing format - Hiro handles all of it.
              </p>

              <ul className="blog__list blog__list--spaced">
                <li>
                  <strong>Seek</strong> - full listing scrape with title, company,
                  salary range, location, and full job description
                </li>
                <li>
                  <strong>Indeed</strong> - same depth of extraction, including
                  sponsored and organic listings
                </li>
                <li>
                  <strong>LinkedIn</strong> - stealth session login to access
                  Easy Apply listings that require authentication
                </li>
              </ul>

              <p>
                Cross-platform duplicate detection ensures you never apply to
                the same job twice, even if the same listing appears on multiple
                boards.
              </p>
            </section>

            {/* AI SCORING */}
            <section className="blog__section card" id="ai-scoring">
              <h2 className="blog__heading">AI Match Scoring</h2>

              <p>
                Every scraped job gets scored against your resume before anything
                else happens. The AI reads both documents and returns a match
                percentage (0-100%) alongside a one-sentence explanation of why
                the score landed where it did.
              </p>

              <div className="blog__info-block">
                <h3 className="blog__subheading">What the score considers</h3>
                <ul className="blog__list">
                  <li>Skills and technologies listed in both the job and your resume</li>
                  <li>Years of experience requirements vs your history</li>
                  <li>Seniority level and role title alignment</li>
                  <li>Industry and domain overlap</li>
                </ul>
              </div>

              <p>
                Jobs that score below your configured threshold are skipped
                entirely. You set the bar - Hiro respects it. This keeps your
                application quality high and avoids wasting recruiter time on
                roles that aren't a fit.
              </p>

              <div className="blog__tip">
                <h3 className="blog__tip-title">Keyword Gap</h3>
                <p className="blog__tip-text">
                  The Job Detail panel shows exactly which skills from the job
                  description are present or missing in your resume - so you
                  can see at a glance what's dragging a score down.
                </p>
              </div>
            </section>

            {/* TAILORING */}
            <section className="blog__section card" id="tailoring">
              <h2 className="blog__heading">Resume &amp; Cover Letter Tailoring</h2>

              <p>
                A generic resume sent to every job is one of the fastest ways
                to get filtered out. Hiro tailors your resume and cover letter
                to each specific job description - without changing facts.
              </p>

              <div className="blog__info-block">
                <h3 className="blog__subheading">Resume tailoring</h3>
                <p>
                  The AI reorders and rewrites your bullet points to emphasise
                  the experience most relevant to each role. Your actual
                  experience doesn't change - the framing does. The tailored
                  resume is available to download as a DOCX from the Job Detail
                  panel.
                </p>
              </div>

              <div className="blog__info-block">
                <h3 className="blog__subheading">Cover letter generation</h3>
                <p>
                  Hiro writes a tailored cover letter for each application. You
                  can configure the tone globally in Settings:
                </p>
                <ul className="blog__list">
                  <li><strong>Professional</strong> - formal, structured, to the point</li>
                  <li><strong>Casual &amp; Warm</strong> - conversational, approachable</li>
                  <li><strong>Confident &amp; Direct</strong> - assertive, high-agency</li>
                </ul>
                <p>
                  You can also provide an optional cover letter template - a
                  structural skeleton the AI fills in, so the output always
                  matches your preferred format.
                </p>
              </div>

              <div className="blog__info-block">
                <h3 className="blog__subheading">Screening Q&amp;A</h3>
                <p>
                  Many applications include screening questions like "Why do you
                  want to work here?" or "Describe a time you led a project."
                  Hiro answers these with AI using context from your resume and
                  the job description. Answers are cached and reused for similar
                  questions, so repeated applications get faster over time.
                </p>
              </div>
            </section>

            {/* AUTO-APPLY */}
            <section className="blog__section card" id="auto-apply">
              <h2 className="blog__heading">Auto-Apply</h2>

              <p>
                Once a job passes the score threshold and the materials are
                tailored, Hiro submits the application automatically. Supported
                application types:
              </p>

              <ul className="blog__list blog__list--spaced">
                <li>
                  <strong>Seek Quick Apply</strong> - fills and submits the
                  Quick Apply form including skill checkboxes and salary fields
                </li>
                <li>
                  <strong>LinkedIn Easy Apply</strong> - completes multi-step
                  Easy Apply flows, including screening questions
                </li>
                <li>
                  <strong>Indeed</strong> - handles Indeed's native application
                  flow
                </li>
              </ul>

              <p>
                For Seek, Hiro also automatically checks the tech stack
                checkboxes that match your resume, and fills the salary
                expectation field from your configured minimum.
              </p>
            </section>

            {/* DASHBOARD */}
            <section className="blog__section card" id="dashboard">
              <h2 className="blog__heading">Dashboard</h2>

              <p>
                The dashboard is where you track everything Hiro has sent on
                your behalf. It's built to be navigable with just a keyboard.
              </p>

              <div className="blog__info-block">
                <h3 className="blog__subheading">Stats bar</h3>
                <p>
                  At a glance: applications sent today, this week, all time,
                  number of interviews, and your overall response rate.
                </p>
              </div>

              <div className="blog__info-block">
                <h3 className="blog__subheading">Application table</h3>
                <ul className="blog__list">
                  <li>Filter by status - Applied, Interview, Rejected, No Response</li>
                  <li>Filter by platform - Seek, Indeed, LinkedIn</li>
                  <li>Live search by job title or company (press <kbd>/</kbd> to focus)</li>
                  <li>
                    <kbd>Up</kbd> / <kbd>Down</kbd> keyboard navigation between rows
                  </li>
                  <li><kbd>Escape</kbd> to close the detail panel</li>
                  <li>Inline comments - add notes to any application in the table</li>
                  <li>Export CSV - downloads all applications respecting active filters</li>
                </ul>
              </div>
            </section>

            {/* JOB DETAIL PANEL */}
            <section className="blog__section card" id="job-detail">
              <h2 className="blog__heading">Job Detail Panel</h2>

              <p>
                Click any row to open the Job Detail panel - a full-width
                side panel showing everything about that application.
              </p>

              <ul className="blog__list blog__list--spaced">
                <li>
                  <strong>Match explanation</strong> - the one-sentence AI summary
                  of why the job scored the way it did
                </li>
                <li>
                  <strong>Keyword Gap</strong> - side-by-side view of skills
                  present and missing in your resume vs the job description
                </li>
                <li>
                  <strong>Interview Questions</strong> - for jobs in "Interview"
                  status, generate 8 likely interview questions tailored to the role
                </li>
                <li>
                  <strong>Full tailored resume</strong> - download the resume
                  Hiro used for this specific application as a DOCX
                </li>
                <li>
                  <strong>Screening Q&amp;A</strong> - view the AI-generated answers
                  to application questions
                </li>
                <li>
                  <strong>Blacklist Company</strong> - one click to exclude this
                  company from all future scans permanently
                </li>
              </ul>

              <div className="blog__tip">
                <h3 className="blog__tip-title">Interview prep built in</h3>
                <p className="blog__tip-text">
                  When a job moves to "Interview" status, Hiro generates 8
                  likely questions based on the job description and your resume - 
                  so you can walk in knowing what they're likely to ask.
                </p>
              </div>
            </section>

            {/* ANALYTICS */}
            <section className="blog__section card" id="analytics">
              <h2 className="blog__heading">Analytics &amp; Timeline</h2>

              <p>
                Two dedicated pages give you a different lens on your job search
                activity.
              </p>

              <div className="blog__info-block">
                <h3 className="blog__subheading">Analytics page</h3>
                <ul className="blog__list">
                  <li>SVG bar chart of applications over the last 7 days</li>
                  <li>Platform donut chart - how your applications split across Seek, Indeed, LinkedIn</li>
                  <li>By-status breakdown - Applied, Interview, Rejected, No Response</li>
                  <li>Response rate over time</li>
                </ul>
              </div>

              <div className="blog__info-block">
                <h3 className="blog__subheading">Timeline page</h3>
                <p>
                  Every application grouped by day and platform in a collapsible
                  day-by-day history. Useful for reconstructing the story of your
                  job search and spotting patterns - which days generated the most
                  responses, which platforms perform best.
                </p>
              </div>
            </section>

            {/* SCHEDULING */}
            <section className="blog__section card" id="scheduling">
              <h2 className="blog__heading">Scheduling &amp; Follow-ups</h2>

              <p>
                Hiro runs on your schedule, not the other way around. Set a
                daily scan time in Settings and it runs Monday-Friday at that
                time automatically - no need to open the app.
              </p>

              <div className="blog__info-block">
                <h3 className="blog__subheading">Auto follow-up emails</h3>
                <p>
                  After a configurable number of days with no response, Hiro
                  drafts and sends a follow-up email on your behalf. Toggle
                  this on or off in Settings and set the day threshold that
                  triggers it.
                </p>
              </div>

              <div className="blog__info-block">
                <h3 className="blog__subheading">Daily email report</h3>
                <p>
                  At 6pm each day, Hiro sends a summary of everything it applied
                  to that day directly to your Gmail - job titles, companies,
                  platforms, and match scores. You stay informed without having
                  to open the app.
                </p>
              </div>

              <div className="blog__tip">
                <h3 className="blog__tip-title">Set it and forget it</h3>
                <p className="blog__tip-text">
                  Configure Hiro once on a Sunday, go to work on Monday, and
                  receive a 6pm summary of what it applied to while you were
                  living your life.
                </p>
              </div>
            </section>

            {/* TRY IT */}
            <section className="blog__section card" id="try-it">
              <h2 className="blog__heading">Try It Yourself</h2>

              <p>
                Hiro is currently in development. Links will be posted here once
                available.
              </p>

              <div className="blog__tip">
                <h3 className="blog__tip-title">Coming soon</h3>
                <p className="blog__tip-text">
                  Project links, demo, and source code will be added here
                  shortly.
                </p>
              </div>
            </section>

          </div>

          {/* AUTHOR BIO */}
          <div className="blog__author card">
            <div className="blog__author-avatar">
              <span>J</span>
            </div>
            <div className="blog__author-info">
              <p className="blog__author-label">Written by</p>
              <p className="blog__author-name">Jim</p>
              <p className="blog__author-bio">
                Developer passionate about building tools that automate the
                tedious parts of life so you can focus on what actually matters.
              </p>
            </div>
          </div>

          {/* SHARE */}
          <BlogShareButtons title="Hiro - The AI Job Application Agent" />

          {/* PREV / NEXT */}
          <BlogPrevNext currentSlug="hiro" />

          {/* BOTTOM BACK NAV */}
          <div className="blog__back-wrapper blog__back-wrapper--bottom">
            <Link to="/blog" className="blog__back-button">
              {"<- Back to Blog"}
            </Link>
          </div>

        </div>
      </main>

      <ScrollUp />
      <Footer />
    </>
  );
};

export default Hiro;
