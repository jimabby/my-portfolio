import { describe, it, expect } from 'vitest';
import { projectCaptions } from '../i18n/captions/index.mjs';
import { projectsData } from '../components/portfolio/Data';

// Captions are matched to screenshots by array position, and they load from a
// separate chunk, so neither the length check nor the language parity that
// translations.test.js gives the base dictionary applies here. Both are
// reproduced below.

const galleryLength = (project) =>
  project.gallery?.length > 0 ? project.gallery.length : 1;

describe('case study captions', () => {
  const langs = Object.keys(projectCaptions);

  it('covers the four supported languages', () => {
    expect(langs.sort()).toEqual(['en', 'ja', 'zh-Hans', 'zh-Hant']);
  });

  it('captions every screenshot of every case study', () => {
    for (const project of projectsData) {
      // Projects written up on the blog have no case study page to caption.
      if (project.article) continue;
      for (const lang of langs) {
        expect(
          projectCaptions[lang][project.id]?.length,
          `${project.slug} has the wrong number of "${lang}" captions`
        ).toBe(galleryLength(project));
      }
    }
  });

  it('has no captions for a project that does not exist', () => {
    const ids = new Set(projectsData.map((project) => String(project.id)));
    for (const lang of langs) {
      for (const id of Object.keys(projectCaptions[lang])) {
        expect(ids, `"${lang}" has captions for unknown project ${id}`).toContain(id);
      }
    }
  });

  it('writes an actual sentence, not a placeholder', () => {
    for (const lang of langs) {
      for (const [id, captions] of Object.entries(projectCaptions[lang])) {
        captions.forEach((caption, i) => {
          expect(caption.length, `${lang}/${id}[${i}] is too short to be useful`).toBeGreaterThan(
            20
          );
        });
      }
    }
  });

  it('keeps captions out of the base translations dictionary', async () => {
    const { translations } = await import('../i18n/translations');
    // If this regresses, four languages of caption ride in the entry bundle
    // for every visitor, including those who never open a case study.
    expect(translations.en.captions).toBeUndefined();
  });
});
