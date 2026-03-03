import { Link } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./blog.css";

// TODO: uncomment and replace paths when you have screenshots
// import heroImg        from '../../assets/hermes-hero.png';
// import accountImg     from '../../assets/hermes-accounts.png';
// import inboxImg       from '../../assets/hermes-inbox.png';
// import aiPanelImg     from '../../assets/hermes-ai-panel.png';
// import streamingImg   from '../../assets/hermes-streaming.png';
// import foldersImg     from '../../assets/hermes-folders.png';

const Hermes = () => {
  return (
    <>
      <Header />

      <main className="blog blog--single section" id="hermes">
        <div className="blog__container container">

          {/* Back button */}
          <div className="blog__back-wrapper">
            <Link to="/blog" className="blog__back-button">
              ← Back to Blog
            </Link>
          </div>

          {/* HERO */}
          <header className="blog__hero card">
            <div className="blog__post-meta">
              <span className="blog__badge">Project</span>
              <span className="blog__meta-dot">·</span>
              <time className="blog__meta-date">March 2026</time>
              <span className="blog__meta-dot">·</span>
              <span className="blog__meta-readtime">6 min read</span>
            </div>

            <h1 className="blog__post-title">
              Hermes — An AI-Powered Email Client
            </h1>

            <p className="blog__hero-text">
              Email hasn't changed much in decades. You still stare at a blank
              compose window, rewrite the same sentences, and wonder if your
              tone sounds right. <strong>Hermes</strong> changes that.
            </p>

            <p className="blog__hero-text">
              Hermes is a full-featured email client with Claude AI built
              directly into the writing experience — not bolted on as an
              afterthought. Connect Gmail, Outlook, or any IMAP account, and
              let AI handle the hard parts of writing while you stay in control.
            </p>

            {/* TODO: hero screenshot — replace src with heroImg once you have it */}
            {/* <figure className="blog__figure blog__figure--hero">
              <img src={heroImg} alt="Hermes app overview" className="blog__img" />
            </figure> */}
          </header>

          {/* TABLE OF CONTENTS */}
          <nav className="blog__toc card">
            <h2 className="blog__toc-title">In this article</h2>
            <ol className="blog__toc-list">
              <li><a href="#multi-account">Multi-Account Support</a></li>
              <li><a href="#email-client">Full Email Client</a></li>
              <li><a href="#ai-assist">AI Assist — 9 Writing Modes</a></li>
              <li><a href="#streaming">Real-Time Streaming</a></li>
              <li><a href="#folders">Folder Navigation</a></li>
              <li><a href="#desktop">Desktop &amp; Browser App</a></li>
              <li><a href="#try-it">Try It Yourself</a></li>
            </ol>
          </nav>

          {/* CONTENT */}
          <div className="blog__content">

            {/* MULTI-ACCOUNT */}
            <section className="blog__section card" id="multi-account">
              <h2 className="blog__heading">Multi-Account Support</h2>

              <p>
                Most people have more than one email address. Hermes handles
                all of them from a single interface.
              </p>

              <ul className="blog__list">
                <li><strong>Gmail</strong> — connected via OAuth, no password stored</li>
                <li><strong>Outlook</strong> — connected via OAuth, no password stored</li>
                <li><strong>Any IMAP/SMTP server</strong> — custom mail servers, personal domains, or work accounts</li>
              </ul>

              <p>
                OAuth means you log in through Google or Microsoft's own
                secure flow. Hermes never sees your password.
              </p>

              {/* TODO: account switcher screenshot */}
              {/* <figure className="blog__figure blog__figure--full">
                <img src={accountImg} alt="Hermes account switcher" className="blog__img" />
                <figcaption className="blog__caption">Switching between accounts in Hermes</figcaption>
              </figure> */}

              <div className="blog__tip">
                <h3 className="blog__tip-title">Why it matters</h3>
                <p className="blog__tip-text">
                  Switch between accounts instantly without logging in and out.
                  All your inboxes, one app.
                </p>
              </div>
            </section>

            {/* FULL EMAIL CLIENT */}
            <section className="blog__section card" id="email-client">
              <h2 className="blog__heading">Full Email Client</h2>

              <p>
                Hermes isn't just an AI wrapper — it's a complete email
                client. Everything you expect is there.
              </p>

              <ul className="blog__list">
                <li><strong>Read</strong> — view emails with full formatting support</li>
                <li><strong>Compose</strong> — write new emails from scratch</li>
                <li><strong>Reply</strong> — respond in-thread with full context</li>
                <li><strong>Forward</strong> — pass emails along with your own message</li>
              </ul>

              <p>
                The AI layer sits alongside these features — available when you
                want it, invisible when you don't.
              </p>

              {/* TODO: inbox / reading view screenshot */}
              {/* <figure className="blog__figure blog__figure--full">
                <img src={inboxImg} alt="Hermes inbox view" className="blog__img" />
                <figcaption className="blog__caption">Reading and composing emails in Hermes</figcaption>
              </figure> */}
            </section>

            {/* AI ASSIST */}
            <section className="blog__section card" id="ai-assist">
              <h2 className="blog__heading">AI Assist — 9 Writing Modes</h2>

              <p>
                This is the core of Hermes. While composing any email, you can
                activate AI Assist and choose from nine distinct modes, each
                targeting a different writing problem.
              </p>

              <div className="blog__info-block">
                <h3 className="blog__subheading">Polish &amp; Clarity</h3>
                <ul className="blog__list">
                  <li>
                    <strong>Improve</strong> — rewrites your draft to be more
                    professional and clear, keeping your original intent intact
                  </li>
                  <li>
                    <strong>Concise</strong> — trims the email without losing
                    meaning; ideal when you've written too much
                  </li>
                  <li>
                    <strong>Fix Grammar</strong> — corrects grammar and spelling
                    while leaving your voice unchanged
                  </li>
                </ul>
              </div>

              <div className="blog__info-block">
                <h3 className="blog__subheading">Tone Adjustment</h3>
                <ul className="blog__list">
                  <li>
                    <strong>Formal</strong> — rewrites in a professional,
                    formal tone for stakeholders, clients, or executives
                  </li>
                  <li>
                    <strong>Friendly</strong> — adds warmth and approachability,
                    great for teammates or casual contacts
                  </li>
                </ul>
              </div>

              <div className="blog__info-block">
                <h3 className="blog__subheading">Generation</h3>
                <ul className="blog__list">
                  <li>
                    <strong>Complete</strong> — finishes what you started; write
                    the first sentence and let AI continue
                  </li>
                  <li>
                    <strong>Subject Ideas</strong> — generates subject line
                    options based on your email content
                  </li>
                  <li>
                    <strong>Draft Reply</strong> — reads the email you received
                    and writes a fitting response automatically
                  </li>
                </ul>
              </div>

              <div className="blog__info-block">
                <h3 className="blog__subheading">Open-Ended</h3>
                <ul className="blog__list">
                  <li>
                    <strong>Custom</strong> — type any instruction and the AI
                    follows it. "Make this more urgent." "Remove the last
                    paragraph." "Translate to Spanish." Anything goes.
                  </li>
                </ul>
              </div>

              {/* TODO: AI modes panel screenshot */}
              {/* <figure className="blog__figure blog__figure--full">
                <img src={aiPanelImg} alt="Hermes AI Assist panel showing 9 modes" className="blog__img" />
                <figcaption className="blog__caption">The AI Assist panel with all 9 writing modes</figcaption>
              </figure> */}

              <div className="blog__tip">
                <h3 className="blog__tip-title">Design philosophy</h3>
                <p className="blog__tip-text">
                  Each mode is purpose-built for a real writing problem. Rather
                  than one generic "improve" button, Hermes gives you the right
                  tool for the job.
                </p>
              </div>
            </section>

            {/* STREAMING */}
            <section className="blog__section card" id="streaming">
              <h2 className="blog__heading">Real-Time Streaming</h2>

              <p>
                AI suggestions stream in word by word — you see the output
                being generated in real time, just like a fast typist filling
                in your email. No waiting for a spinner to finish before you
                can read the result.
              </p>

              <p>
                This makes the experience feel responsive and alive rather than
                like a slow API call with a loading screen.
              </p>

              {/* TODO: streaming in action screenshot / GIF */}
              {/* <figure className="blog__figure blog__figure--full">
                <img src={streamingImg} alt="AI suggestion streaming in real time" className="blog__img" />
                <figcaption className="blog__caption">AI suggestions streaming word by word</figcaption>
              </figure> */}
            </section>

            {/* FOLDERS */}
            <section className="blog__section card" id="folders">
              <h2 className="blog__heading">Folder Navigation</h2>

              <p>
                Hermes mirrors the folder structure you already have in your
                email provider.
              </p>

              <ul className="blog__list">
                <li><strong>Inbox</strong> — your main incoming mail</li>
                <li><strong>Sent</strong> — everything you've sent</li>
                <li><strong>Drafts</strong> — emails in progress</li>
                <li><strong>Trash</strong> — deleted items</li>
                <li><strong>Custom folders</strong> — any folders you've created in Gmail, Outlook, or your IMAP server appear automatically</li>
              </ul>

              {/* TODO: folder sidebar screenshot */}
              {/* <figure className="blog__figure blog__figure--full">
                <img src={foldersImg} alt="Hermes folder navigation sidebar" className="blog__img" />
                <figcaption className="blog__caption">Folder navigation sidebar in Hermes</figcaption>
              </figure> */}
            </section>

            {/* DESKTOP */}
            <section className="blog__section card" id="desktop">
              <h2 className="blog__heading">Desktop &amp; Browser App</h2>

              <p>
                Hermes runs in two modes depending on how you want to use it.
              </p>

              <ul className="blog__list blog__list--spaced">
                <li>
                  <strong>Electron desktop app</strong> — installs as a native
                  app on your machine. Sits in your dock or taskbar, launches
                  instantly, works offline for reading cached emails.
                </li>
                <li>
                  <strong>Browser</strong> — run it directly in any browser
                  with no installation required.
                </li>
              </ul>

              <p>
                The same codebase powers both — no features are missing in
                either mode.
              </p>
            </section>

            {/* TRY IT */}
            <section className="blog__section card" id="try-it">
              <h2 className="blog__heading">Try It Yourself</h2>

              <p>
                Hermes is available to try — links coming soon.
              </p>

              {/* TODO: add project links here */}
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
                Developer passionate about building tools that make everyday
                tasks faster and less frustrating.
              </p>
            </div>
          </div>

          {/* BOTTOM BACK NAV */}
          <div className="blog__back-wrapper blog__back-wrapper--bottom">
            <Link to="/blog" className="blog__back-button">
              ← Back to Blog
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default Hermes;
