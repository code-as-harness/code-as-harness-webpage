# Code as Agent Harness Site

A static landing page for the paper:

**Code as Agent Harness: Toward Executable, Verifiable, and Stateful Agent Systems**

Paper: https://arxiv.org/abs/2605.18747

## Local Test

From this folder:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173
```

Because this is plain HTML/CSS/JS, opening `index.html` directly also works, but a local server is closer to GitHub Pages behavior.

## GitHub Pages Deploy

Use this folder as the root of a GitHub repository. Push it to GitHub, then enable Pages.

Option A: GitHub Actions

1. Keep `.github/workflows/pages.yml`.
2. In GitHub, go to `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main`.

Option B: Deploy from branch

1. Delete `.github/workflows/pages.yml` if you do not want Actions.
2. In GitHub, go to `Settings -> Pages`.
3. Set `Source` to `Deploy from a branch`.
4. Choose branch `main` and folder `/root`.

No custom domain is required. The project URL will look like:

```text
https://<github-user-or-org>.github.io/<repo-name>/
```
