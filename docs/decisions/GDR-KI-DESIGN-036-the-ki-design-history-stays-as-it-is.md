---
id: GDR-KI-DESIGN-036
title: 'The ki-design history stays as it is'
date: 2026-10-19
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-036: The ki-design history stays as it is

## Context

The repository's history still contains Observatory screenshots with private repository names and commit messages. No secrets are in them. Removing them means rewriting history and force-pushing a public repository. On 19 October 2026 Kit accepted the recommendation.

## Decision

**The git history is left as it is.** It is not rewritten.

## Consequences

- New screenshots and fixtures use synthetic data only, as the Observatory boards already do.
- If a secret is ever found in the history, this record is revisited.

## References

- examples/observatory-preview/README.md.
