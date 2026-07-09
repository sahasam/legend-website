---
title: GPT From Scratch
date: 2026-07-05
slug: gpt-from-scratch
hero: jellyfish
excerpt: Friction is where the learning is
---

As I'm applying to AI Infrastructure roles, I realize I'm pretty far behind on GPT fundamentals. I've also spent most of my time avoiding PyTorch and data science because it wasn't the engineering I was interested in. On this job grind, I'm dedicating 3-4 hours a day to picking up new knowledge, closing my skill gaps, and writing about it so I can get in the habit of finishing.

One video that had been on my backlog for a while was Andrej Karpathy's *GPT from scratch*. He builds attention, layernorm, and all the basic layers of a GPT in PyTorch and makes it look easy. Instead of passively watching a YouTube video, I wanted to actively learn and pick up the intuition. I've personally been using Claude as a cheat code to accelerate my output or to completely off-load cognitive tasks. The goal has always been to make Claude as frictionless as possible and rely on its intelligence. But friction is where the learning is, and there's no avoiding friction in life.

## Learning with Claude

Claude's strength is token generation. My strength is conceptual linking. The gap I'm trying to close requires me to link new concepts to my existing knowledge. So the goal is to strike a balance between personally-generated problems and leaving enough of a gap for me to reach into my bag.

**What worked:**

- **Scaffold-and-nudge rhythm.** The tutor would set up a cell with a `TODO(human)` and a
  couple of hints, I'd fill in the actual logic, then say "check." It reviewed like a TA:
  intent → what's wrong → consequence → a *question* pointing at the fix. I wrote every load-
  bearing line myself. Claude would sometimes get a little too descriptive and leave nothing in question.
  Other times, I had to ask Claude about every single step.
- **Calibration is dynamic.** Early on it over-explained — full tables enumerating every
  PyTorch broadcasting rule — and I said so ("I felt my hand was being held"). It dialed back to
  intuition + the one subtlety that bites. Later I pushed the other way: "just give me the class
  and method names, let me figure it out." The fact that you can *steer the teaching altitude*
  mid-session turned out to matter more than any single explanation.
- **Bugs explained, not patched.** When my tokenizer silently returned the wrong types, it
  didn't hand me corrected code — it explained that two bugs were propping each other up so the
  output *looked* right while the assertion was actually failing. I fixed it. It stuck.
- **Rapid explanations are gold.** Ask Claude questions. Without asking, Claude will drift from
  your understanding. Tell it what you're thinking as you're thinking it. Sometimes I wished I was
  using a faster model, because communication speed is important for my learning.

It's easy to let the assistant do the thinking. The discipline has to come from the config *and* from me actually resisting the urge to ask "just show me." When I did ask for the answer, I got it — but I could feel the difference in how well it stuck.

## What I learned

- Bigram Language Model
- The concept of attention
- Q, K, V
- forward/generate
- PyTorch modules, parameters, shapes, tensors
- batched training

I wanted to understand the architecture of GPT. At the same time, I had no idea how deep PyTorch goes, and how easy it is to scaffold different DS architectures in code. For the next few days, I'll be focused on learning more about the ML fundamentals in Python, then I'll be investigating different things like training, inference, kernels, and GPUs. There is so much to learn about the intricacies of LLMs. I'll be here, posting updates, for a while.

The code is on GitHub: [sahasam/gpt-from-scratch](https://github.com/sahasam/gpt-from-scratch).
