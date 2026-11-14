"""Render static preview images of the interactive figures for the AI tutor.

Writes public/ai/fig/<lang>/<lesson>-<fig>.png at the default parameters.
Usage: python3 scripts/render_figures.py <site root URL> [lesson id ...]
The site root is a local build, e.g. http://localhost:8765/ai-tutored-finance/.
"""

import json
import sys
from pathlib import Path

import yaml
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent


def main():
    site, only = sys.argv[1], sys.argv[2:]
    langs = [l["code"] for l in json.loads((ROOT / "src/i18n/languages.json").read_text())["languages"]]
    cur = yaml.safe_load((ROOT / "course/curriculum.yaml").read_text())
    lessons = [l for s in cur["stages"] for l in s["lessons"] if l.get("published") and (not only or l["id"] in only)]
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 760, "height": 900}, device_scale_factor=2, color_scheme="light")
        for lang in langs:
            out = ROOT / f"public/ai/fig/{lang}"
            out.mkdir(parents=True, exist_ok=True)
            for l in lessons:
                page.goto(f"{site}{lang}/lessons/{l['slug']}/")
                ids = page.eval_on_selector_all("figure.lfwai-figure", "els => els.map(e => e.id.replace(/^fig-/, ''))")
                for fid in ids:
                    el = page.query_selector(f"#fig-{fid}")
                    el.scroll_into_view_if_needed()
                    page.wait_for_timeout(200)
                    el.screenshot(path=str(out / f"{l['id']}-{fid}.png"))
                    print(lang, l["id"], fid)
        browser.close()


if __name__ == "__main__":
    main()
