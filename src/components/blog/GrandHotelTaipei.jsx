import { Link } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import BlogProgressBar from "./BlogProgressBar";
import BlogShareButtons from "./BlogShareButtons";
import BlogPrevNext from "./BlogPrevNext";
import BlogSEO from "./BlogSEO";
import ScrollUp from "../scrollup/ScrollUp";
import "./blog.css";

import heroImage from "../../assets/taipei-taoyuan/taipei-taoyuan-9.webp";
import gateImage from "../../assets/taipei-taoyuan/taipei-taoyuan-5.webp";
import lobbyImage from "../../assets/taipei-taoyuan/taipei-taoyuan-4.webp";
import corridorImage from "../../assets/taipei-taoyuan/taipei-taoyuan-2.webp";
import dragonImage from "../../assets/taipei-taoyuan/taipei-taoyuan-3.webp";
import viewImage from "../../assets/taipei-taoyuan/taipei-taoyuan-16.webp";
import galleryImage1 from "../../assets/taipei-taoyuan/taipei-taoyuan-1.webp";
import galleryImage6 from "../../assets/taipei-taoyuan/taipei-taoyuan-6.webp";
import galleryImage7 from "../../assets/taipei-taoyuan/taipei-taoyuan-7.webp";
import galleryImage8 from "../../assets/taipei-taoyuan/taipei-taoyuan-8.webp";
import galleryImage10 from "../../assets/taipei-taoyuan/taipei-taoyuan-10.webp";
import galleryImage11 from "../../assets/taipei-taoyuan/taipei-taoyuan-11.webp";
import galleryImage12 from "../../assets/taipei-taoyuan/taipei-taoyuan-12.webp";
import galleryImage13 from "../../assets/taipei-taoyuan/taipei-taoyuan-13.webp";
import galleryImage14 from "../../assets/taipei-taoyuan/taipei-taoyuan-14.webp";
import galleryImage15 from "../../assets/taipei-taoyuan/taipei-taoyuan-15.webp";
import galleryImage17 from "../../assets/taipei-taoyuan/taipei-taoyuan-17.webp";
import galleryImage18 from "../../assets/taipei-taoyuan/taipei-taoyuan-18.webp";

const galleryPhotos = [
  { src: galleryImage8, alt: "Grand Hotel Taipei rooflines against a clear sky" },
  { src: galleryImage12, alt: "Patterned hotel door framing the courtyard" },
  { src: galleryImage17, alt: "Lantern-lit interior with a gong at the Grand Hotel Taipei" },
  { src: galleryImage18, alt: "Stone monument on the Grand Hotel Taipei grounds" },
];

const GrandHotelTaipei = () => {
  return (
    <>
      <BlogSEO
        title="Staying at the Grand Hotel Taipei"
        description="A personal April stay at the Grand Hotel Taipei, from the red-pillared entrance and grand lobby to quiet corridors, city views, and slow moments around the grounds."
        ogImage="grand-hotel-taipei.webp"
        slug="grand-hotel-taipei"
      />
      <Header />
      <BlogProgressBar />

      <main className="blog blog--single section" id="grand-hotel-taipei">
        <div className="blog__container container">

          <div className="blog__back-wrapper">
            <Link to="/blog" className="blog__back-button">
              {"<- Back to Blog"}
            </Link>
          </div>

          <header className="blog__hero card">
            <div className="blog__post-meta">
              <span className="blog__badge">Travel</span>
              <span className="blog__meta-dot">|</span>
              <time className="blog__meta-date">April 2026</time>
              <span className="blog__meta-dot">|</span>
              <span className="blog__meta-readtime">8 min read</span>
            </div>

            <h1 className="blog__post-title">
              Staying at the Grand Hotel Taipei
            </h1>

            <p className="blog__hero-text">
              In April, I stayed at the Grand Hotel Taipei, one of those places
              that does not ease quietly into view. It appears above the city in
              red columns, gold rooflines, and layers of detail that make the
              whole building feel ceremonial before you even reach the door.
            </p>

            <p className="blog__hero-text">
              I went in expecting a hotel stay. What I remember more is the
              feeling of moving through a landmark: slow mornings, polished
              corridors, a lobby built for looking up, and Taipei spreading out
              beyond the trees.
            </p>

            <figure className="blog__figure blog__figure--hero">
              <img src={heroImage} alt="The Grand Hotel Taipei exterior in April sunlight" className="blog__img" />
            </figure>
          </header>

          <nav className="blog__toc card">
            <h2 className="blog__toc-title">In this article</h2>
            <ol className="blog__toc-list">
              <li><a href="#arrival">Arriving at the Gate</a></li>
              <li><a href="#lobby">The Red Lobby</a></li>
              <li><a href="#stay">Settling Into the Stay</a></li>
              <li><a href="#room">The Room</a></li>
              <li><a href="#dining">Dining at the Hotel</a></li>
              <li><a href="#details">Details Around the Hotel</a></li>
              <li><a href="#tunnels">The Tunnels Beneath the Hotel</a></li>
              <li><a href="#views">Views Over Taipei</a></li>
              <li><a href="#gallery">Photo Gallery</a></li>
              <li><a href="#reflection">What Stayed With Me</a></li>
            </ol>
          </nav>

          <div className="blog__content">
            <section className="blog__section card" id="arrival">
              <h2 className="blog__heading">Arriving at the Gate</h2>

              <p>
                The approach already feels like part of the stay. The gate
                frames the hotel from a distance, and the red facade sits behind
                it like a backdrop. It is big, formal, and theatrical in a way
                that makes you slow down with your camera before you even check
                in.
              </p>

              <p>
                April gave the place a bright, warm look. The sky was clear, the
                greenery around the entrance was full, and the hotel stood out
                sharply against everything around it. It felt less like arriving
                at accommodation and more like walking toward a piece of Taipei's
                visual identity.
              </p>

              <figure className="blog__figure blog__figure--full">
                <img src={gateImage} alt="The Grand Hotel Taipei seen through the entrance gate" className="blog__img" />
                <figcaption className="blog__caption">The first proper view on the way in</figcaption>
              </figure>
            </section>

            <section className="blog__section card" id="lobby">
              <h2 className="blog__heading">The Red Lobby</h2>

              <p>
                The lobby is the moment the hotel fully commits to its own
                drama. Red pillars, patterned ceilings, lanterns, wide stairs,
                and a long carpeted axis all pull your eye forward. It is not a
                minimalist space, and that is exactly the point.
              </p>

              <p>
                I liked that it felt busy with detail but still ordered. There
                are repeating lines everywhere: columns, ceiling panels, carpet
                borders, balcony rails. It gives the room a rhythm, especially
                when you stand near the entrance and look toward the stairs.
              </p>

              <figure className="blog__figure blog__figure--full">
                <img src={lobbyImage} alt="The red-pillared lobby inside the Grand Hotel Taipei" className="blog__img" />
                <figcaption className="blog__caption">The lobby makes a first impression and keeps going</figcaption>
              </figure>
            </section>

            <section className="blog__section card" id="stay">
              <h2 className="blog__heading">Settling Into the Stay</h2>

              <p>
                After the lobby, the quieter parts of the hotel felt almost
                cinematic. The corridors stretch out in long red lines, with
                patterned carpet and ceiling lights repeating into the distance.
                It is the kind of hallway that makes a simple walk back to the
                room feel more memorable than it should.
              </p>

              <p>
                My favorite part of staying there was having time to notice the
                pace of the building. In a normal hotel, you pass through shared
                areas quickly. Here, I kept stopping: to look at the ceiling, to
                frame the symmetry, to catch how the light changed between the
                public spaces and the quieter floors.
              </p>

              <figure className="blog__figure blog__figure--full">
                <img src={corridorImage} alt="A long red-carpeted corridor at the Grand Hotel Taipei" className="blog__img" />
                <figcaption className="blog__caption">Even the corridors have a strong sense of place</figcaption>
              </figure>
            </section>

            <section className="blog__section card" id="room">
              <h2 className="blog__heading">The Room</h2>

              <p>
                After all the ceremony of the public spaces, the room was a
                calmer, more comfortable kind of Chinese style. A hand-painted
                branch with birds spread across the wall behind the bed, paired
                with dark lattice panels, a red bedside cabinet, and a soft gold
                runner across crisp white sheets. It felt traditional without
                being heavy.
              </p>

              <p>
                The bathroom was more modern and practical: warm wood tones, a
                deep tub, a large mirror, and a tidy vanity. Small touches like
                the dark amber Blueseeds toiletries kept it feeling considered
                rather than generic. It was an easy room to come back to between
                walks around the grounds.
              </p>

              <figure className="blog__figure blog__figure--full">
                <img src={galleryImage10} alt="Guest room at the Grand Hotel Taipei with a painted branch mural behind the bed" className="blog__img" />
                <figcaption className="blog__caption">Traditional Chinese style, softened for comfort</figcaption>
              </figure>

              <div className="blog__examples-grid">
                <figure className="blog__figure">
                  <img src={galleryImage11} alt="Modern bathroom with a deep tub at the Grand Hotel Taipei" className="blog__img blog__img--cover" />
                  <figcaption className="blog__caption">A modern, practical bathroom</figcaption>
                </figure>
                <figure className="blog__figure">
                  <img src={galleryImage15} alt="Blueseeds bath amenities in the Grand Hotel Taipei bathroom" className="blog__img blog__img--cover" />
                  <figcaption className="blog__caption">Small considered touches</figcaption>
                </figure>
              </div>
            </section>

            <section className="blog__section card" id="dining">
              <h2 className="blog__heading">Dining at the Hotel</h2>

              <p>
                Eating at the Grand Hotel feels like an extension of the
                architecture. The restaurants lean into the same red-and-gold
                language as the rest of the building, so even a casual meal
                comes with patterned ceilings, marble, and warm lighting. One
                wall I kept coming back to was a glowing red panel with the
                hotel's tower logo picked out in rows of little bottles, framed
                against the stone.
              </p>

              <p>
                The food itself was comforting and unfussy: bamboo steamers
                arriving still warm, classic Chinese plates brought out in
                steady rounds, and a table set up near the windows so the light
                changed while we ate. It was the kind of slow, generous meal
                that suits the pace of the whole place.
              </p>

              <figure className="blog__figure blog__figure--full">
                <img src={galleryImage7} alt="A glowing red panel forming the Grand Hotel Taipei logo inside the restaurant" className="blog__img" />
                <figcaption className="blog__caption">The restaurant carries the same red-and-gold theme as the lobby</figcaption>
              </figure>

              <div className="blog__examples-grid">
                <figure className="blog__figure">
                  <img src={galleryImage6} alt="A bamboo steamer of warm dim sum at the Grand Hotel Taipei" className="blog__img blog__img--cover" />
                  <figcaption className="blog__caption">Bamboo steamers arriving warm</figcaption>
                </figure>
                <figure className="blog__figure">
                  <img src={galleryImage14} alt="A plated dish on a dining table by the window at the Grand Hotel Taipei" className="blog__img blog__img--cover" />
                  <figcaption className="blog__caption">A plate brought out by the window</figcaption>
                </figure>
              </div>
            </section>

            <section className="blog__section card" id="details">
              <h2 className="blog__heading">Details Around the Hotel</h2>

              <p>
                The Grand Hotel is easy to photograph from the outside, but the
                smaller interior details are what made it fun to explore. The
                decorative ceilings, glossy wall surfaces, warm lighting, and
                sculptural pieces all build the atmosphere in layers.
              </p>

              <p>
                One detail that stood out was the dragon display. It added to
                the sense that the building is not trying to disappear into the
                background. Everywhere you turn, there is another reminder that
                the hotel is designed to be seen.
              </p>

              <figure className="blog__figure blog__figure--full">
                <img src={dragonImage} alt="A golden dragon display inside the Grand Hotel Taipei" className="blog__img" />
                <figcaption className="blog__caption">A small interior scene with a lot of character</figcaption>
              </figure>
            </section>

            <section className="blog__section card" id="tunnels">
              <h2 className="blog__heading">The Tunnels Beneath the Hotel</h2>

              <p>
                The part I did not expect to enjoy as much as I did was going
                underground. Hidden beneath the Grand Hotel are escape tunnels,
                built into the hill so guests could leave quickly in an
                emergency. Today you can walk them, and they are a complete
                contrast to the polished red interiors upstairs: rough,
                cave-like walls, cool air, and a long curving passage lit by
                small lights.
              </p>

              <p>
                What makes them memorable is the slide. Instead of only stairs,
                one tunnel has a smooth metal chute running alongside the steps,
                originally meant to move people down the slope fast. Standing at
                the top, looking down the curve of stone and metal disappearing
                into the dim light, was easily the most surprising moment of the
                stay.
              </p>

              <figure className="blog__figure blog__figure--full">
                <img src={galleryImage1} alt="The stone escape tunnel and slide beneath the Grand Hotel Taipei" className="blog__img" />
                <figcaption className="blog__caption">Stairs and a slide running down through the stone tunnel</figcaption>
              </figure>

              <figure className="blog__figure blog__figure--full">
                <img src={galleryImage13} alt="A close look at the curving metal slide inside the Grand Hotel tunnel" className="blog__img" />
                <figcaption className="blog__caption">The metal chute curving down into the dim light</figcaption>
              </figure>
            </section>

            <section className="blog__section card" id="views">
              <h2 className="blog__heading">Views Over Taipei</h2>

              <p>
                Being set above the city gives the hotel a different mood from
                staying closer to the center. From the grounds, Taipei feels a
                little more spacious: river, bridges, low green areas, and the
                skyline sitting further away in the haze.
              </p>

              <p>
                That distance was part of the charm. It made the stay feel like
                a pause from the dense city streets without feeling disconnected
                from Taipei itself.
              </p>

              <figure className="blog__figure blog__figure--full">
                <img src={viewImage} alt="View over Taipei from near the Grand Hotel Taipei" className="blog__img" />
                <figcaption className="blog__caption">A wider look back toward the city</figcaption>
              </figure>
            </section>

            <section className="blog__section card" id="gallery">
              <h2 className="blog__heading">Photo Gallery</h2>

              <p>
                A few more frames from the stay: the room and bathroom, smaller
                architectural details, and quiet moments around the grounds that
                did not need their own section but still belong with the trip.
              </p>

              <div className="blog__examples-grid">
                {galleryPhotos.map((photo) => (
                  <figure className="blog__figure" key={photo.src}>
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="blog__img blog__img--cover"
                    />
                    <figcaption className="blog__caption">
                      {photo.alt}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section className="blog__section card" id="reflection">
              <h2 className="blog__heading">What Stayed With Me</h2>

              <p>
                Some hotels are comfortable, some are convenient, and some are
                memorable because they have a strong identity. The Grand Hotel
                Taipei is the third kind. It is not subtle, but it is generous
                with atmosphere.
              </p>

              <p>
                Looking back on the April stay, the parts I remember most are
                not only the room or the check-in. They are the visual moments:
                the huge red facade against the sky, the lobby lanterns, the
                long corridor back to the room, and the city sitting quietly in
                the distance.
              </p>

              <div className="blog__tip">
                <h3 className="blog__tip-title">Worth it for</h3>
                <p className="blog__tip-text">
                  A stay that feels distinctly Taipei, especially if you enjoy
                  architecture, photography, and hotels with a strong sense of
                  history and place.
                </p>
              </div>
            </section>
          </div>

          <div className="blog__author card">
            <div className="blog__author-avatar">
              <span>J</span>
            </div>
            <div className="blog__author-info">
              <p className="blog__author-label">Written by</p>
              <p className="blog__author-name">Jim</p>
              <p className="blog__author-bio">
                Developer and photographer documenting projects, travel, and the
                visual details that make places memorable.
              </p>
            </div>
          </div>

          <BlogShareButtons title="Staying at the Grand Hotel Taipei" />

          <BlogPrevNext currentSlug="grand-hotel-taipei" />

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

export default GrandHotelTaipei;
