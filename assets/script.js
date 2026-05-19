const canvas = document.querySelector("#code-rain");
const ctx = canvas.getContext("2d");
const terminal = document.querySelector("#terminal-output");
const copyButton = document.querySelector("#copy-citation");

const glyphs = [
  "agent.step()", "pytest", "state", "trace", "tool()", "plan", "review", "patch",
  "memory", "sandbox", "verify", "DOM", "API", "repo", "diff", "tests", "feedback",
  "runner", "policy", "skill", "commit", "rollback", "harness", "execute",
];

let columns = [];
let width = 0;
let height = 0;

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const columnWidth = 94;
  columns = Array.from({ length: Math.ceil(width / columnWidth) + 2 }, (_, i) => ({
    x: i * columnWidth,
    y: Math.random() * height,
    speed: 0.55 + Math.random() * 1.6,
    phase: Math.random() * 100,
  }));
}

function drawRain(time) {
  ctx.clearRect(0, 0, width, height);
  ctx.font = "13px SFMono-Regular, Menlo, Consolas, monospace";
  ctx.textBaseline = "top";

  for (const column of columns) {
    column.y += column.speed;
    if (column.y > height + 180) column.y = -220;

    for (let i = 0; i < 10; i += 1) {
      const word = glyphs[(Math.floor(column.phase + i + time / 1200)) % glyphs.length];
      const y = column.y - i * 34;
      const alpha = Math.max(0, 0.42 - i * 0.035);
      ctx.fillStyle = i === 0 ? `rgba(125,255,178,${alpha + 0.18})` : `rgba(114,221,255,${alpha})`;
      ctx.fillText(word, column.x, y);
    }
  }

  requestAnimationFrame(drawRain);
}

const lines = [
  { text: "$ agent-harness init --repo survey --mode executable", className: "terminal-command" },
  { text: "✓ mounted workspace: reasoning / actions / environment", className: "terminal-ok" },
  { text: "✓ attached tools: shell, browser, tests, static-analysis", className: "terminal-ok" },
  { text: "" },
  { text: "$ harness.plan('long-horizon agent task')", className: "terminal-command" },
  { text: "01 decompose intent into verifiable steps", className: "terminal-dim" },
  { text: "02 write code artifact for each action boundary", className: "terminal-dim" },
  { text: "03 execute, observe feedback, repair, persist state", className: "terminal-dim" },
  { text: "" },
  { text: "$ pytest tests/harness_contract.py", className: "terminal-command" },
  { text: "FAILED test_shared_state_consistency", className: "terminal-error" },
  { text: "reason: reviewer agent observed stale execution trace", className: "terminal-warn" },
  { text: "" },
  { text: "$ harness.patch --target memory --strategy regression-free", className: "terminal-command" },
  { text: "✓ wrote durable trace index", className: "terminal-ok" },
  { text: "✓ replayed prior tasks without regression", className: "terminal-ok" },
  { text: "✓ ready: executable, verifiable, stateful", className: "terminal-ok" },
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function typeTerminal() {
  terminal.innerHTML = "";
  for (const line of lines) {
    const row = document.createElement("span");
    row.className = line.className || "";
    terminal.append(row);

    for (let i = 0; i <= line.text.length; i += 1) {
      row.innerHTML = escapeHtml(line.text.slice(0, i));
      await new Promise((resolve) => setTimeout(resolve, line.text.startsWith("$") ? 16 : 7));
    }

    row.insertAdjacentHTML("afterend", "\n");
    await new Promise((resolve) => setTimeout(resolve, line.text ? 105 : 150));
  }
  terminal.insertAdjacentHTML("beforeend", '<span class="terminal-caret"></span>');
}

copyButton?.addEventListener("click", async () => {
  const citation = document.querySelector(".code-box pre")?.textContent || "";
  await navigator.clipboard.writeText(citation);
  copyButton.textContent = "Copied";
  setTimeout(() => {
    copyButton.textContent = "Copy";
  }, 1400);
});

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
requestAnimationFrame(drawRain);
typeTerminal();
