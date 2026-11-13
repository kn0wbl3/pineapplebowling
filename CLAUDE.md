# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Website for the Pineapple League, a bowling league. It is a Jekyll site built and hosted by GitHub Pages, published at https://pineapplebowling.com/. Pages builds from the `docs/` folder of `main`, so pushing to `main` is what deploys.

## Custom domain

- `docs/CNAME` holds `pineapplebowling.com`. GitHub writes it when the domain is saved in the Pages settings; do not delete it, or the domain is dropped.
- DNS is managed in Squarespace Domains (nameservers are `ns-cloud-c*.googledomains.com`). The apex has the four GitHub Pages A records (`185.199.108-111.153`), `www` is a CNAME to `kn0wbl3.github.io`, and a `_github-pages-challenge-kn0wbl3` TXT record verifies the domain on the GitHub account. A Google verification CNAME (`lca5t42hwju4`) and Squarespace's `_domainconnect` record are also present and unrelated to the site.
- `www` redirects to the apex. Check DNS with `dig +short pineapplebowling.com A` and `dig +short www.pineapplebowling.com CNAME`.

## Commands

There is no lint or test tooling. Jekyll and Ruby are not installed in the dev environment, and neither is `gh`, so PRs are opened from the GitHub website. Do not try to build or serve the site locally.

- Check a change on the Netlify deploy preview for its PR. Previews are built only for PRs.
- After merging, confirm what is live with `curl -s https://pineapplebowling.com/<page>`. The theme's HTML includes a `Beautiful Jekyll <version>` comment.

## Branch workflow

Do not commit to `main` directly. Branch from `main`, push the branch, and open a PR so Netlify builds a preview. Merging the PR into `main` deploys the site.

## Netlify PR previews

- Netlify builds a deploy preview for each PR; GitHub Pages stays the live site. Netlify's own production deploy goes to a `*.netlify.app` URL only, and no custom domain is set on Netlify.
- `netlify.toml` and `Gemfile` sit at the repo root, outside `docs/`, so GitHub Pages ignores them. The `Gemfile` uses the `github-pages` gem so previews use the same Jekyll version and plugins as the live site.
- The build runs `bundle exec jekyll build --source docs --destination _site`. `PAGES_REPO_NWO` is set in `netlify.toml` because the `github-pages` gem's metadata plugin fails without a repo name.

## Architecture

- All site content lives in `docs/`, the Pages source. Files outside it are not published.
- `docs/_config.yml` sets the remote theme (Beautiful Jekyll, pinned to 6.0.1), site title, navbar links, and custom stylesheets. The theme's own `_config.yml` is not applied to remote themes, so any theme setting must be added here.
- Each page is a Markdown file with `title` and `layout: page` front matter. The theme renders `title` as the page header, so pages should not start with a `#` heading.
- To add a page to the nav, add it under `navbar-links` in `_config.yml`.
- `docs/assets/css/side-images.css` shows the two photos in `docs/assets/img/` in the page margins on screens at least 1200px wide. To swap a photo, replace the file and keep its filename.
- Callouts use the theme's box classes with Markdown enabled inside: `<div class="box-warning" markdown="1">`.
- The theme has no favicon setting. `defaults` in `_config.yml` gives every page `head-extra: [favicon.html]`, which pulls in `docs/_includes/favicon.html`, plus a site-wide `share-img` and `share-description` for link previews. A page can override either in its front matter.
- `docs/assets/js/external-links.js`, loaded through `site-js` in `_config.yml`, makes every link to another site open in a new tab, including the Standings and Photos nav links.
- `docs/schedule.md` holds the season's dates, off weeks and position nights, and `docs/index.md` repeats the night, time, place and season dates. Update both each season.
- `docs/champions.md` lists winners newest first, with a `## <year> - <team>` heading followed by the roster.
