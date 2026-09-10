---
name: codex-traffic-light
description: "Proactively apply this skill to every Codex task and every user turn, regardless of the task type or which other skill is primary. Treat it as the default cross-task title and lifecycle-status manager: synchronize the task title at session start, when a completed task receives a follow-up, when the task begins waiting for user input, immediately before the first project write, after user commands such as thinking/waiting/active/done/完成/归档, and before the final response. Use it alongside site, coding, document, research, and other task-specific skills; do not skip it merely because another skill is also applicable. Maintain the configured sequence prefix and traffic-light icon, including explicit renumbering and user-controlled state changes."
---

# Codex 红绿灯

Maintain the current Codex task title in the following format:

```text
[NN][STATUS] Original task title
```

The sequence is two digits while possible (`01`–`99`), expands to three digits at `100`, and the status is configurable. Use the four states defined below. Titles must contain only the status icon, not a status description.

## Configuration

The default display labels are:

```yaml
number_digits: 2
status_display:
  thinking: "🟡"
  waiting: "🔴"
  active: "🧩"
  completed: "✅"
```

Users may replace any display value with another icon. Keep the internal keys unchanged:

- `thinking`: Codex is actively exploring, reading, searching, analyzing, or planning, without project writes.
- `waiting`: Codex is paused and requires user input, confirmation, authorization, or a decision on a proposed plan before continuing.
- `active`: Codex has started project writes or other substantive authorized execution.
- `completed`: the current request is finished and delivered, or the user explicitly marks it done.

## Numbering rules

1. If the current title already starts with a valid status prefix and a number, preserve that number.
2. Otherwise, inspect the available Codex task titles and choose the next unused number. Use two digits through `99`; use three digits starting at `100`.
3. Never silently reuse an existing number during ordinary task creation. Treat the number as a stable task identifier, not as priority or sidebar sort order.

## First-turn behavior

After the first user message of a new task, automatically assign or preserve the sequence number and set the initial status to `thinking`. Do this without requiring the user to explicitly invoke this skill. If the task-title operation is unavailable, continue the conversation and report that synchronization is unavailable.

When a completed task receives a new user message, reopen it before substantive work begins: use `thinking` for a new question, analysis, review, or requirement, `waiting` when user input is needed, and `active` when the user clearly requests execution.

## Explicit renumbering

When the user explicitly asks to “重新编号”, “renumber”, or equivalent, enter renumber mode instead of preserving existing numbers:

1. Determine the scope from the request. If no scope is specified, use all accessible tasks already managed by this skill, including active and archived tasks when the relevant task-list operations expose them. Do not rename unrelated tasks without a managed status prefix unless the user explicitly asks to include untagged tasks.
2. Preserve each selected task’s status label and original title text; change only its sequence number.
3. Order tasks deterministically using the current task-list order, with pinned tasks first, followed by other tasks. Keep archived tasks in their returned order after active tasks unless the user specifies another order.
4. Assign consecutive numbers starting at `01`; use three digits from `100` onward. Do not leave gaps unless the user requests a custom starting number or ordering.
5. Avoid collisions by first applying unique temporary prefixes to all affected tasks, then applying their final numbers. If any rename fails, stop, report the affected tasks, and do not claim completion.
6. If the requested scope is ambiguous or the operation would rename more tasks than the user appears to intend, summarize the scope and ask for confirmation before the bulk rename.

Renumbering is an explicit maintenance operation. Do not perform it automatically during ordinary status updates or new-task creation.

## Status transitions

Apply the appropriate status at meaningful lifecycle boundaries:

- New requirement, exploration, planning, analysis, or review: `thinking`.
- User clarification, confirmation, authorization, approval, a decision on a proposed plan, or other input is required: `waiting`.
- The user explicitly authorizes execution or requests a concrete change, and the first write or substantive execution is about to begin: `active`.
- The current request is answered or implemented, verified as appropriate, and delivered with no pending user decision or expected execution: `completed`.

Before the first project write, set `active`. Do not set `active` for read-only inspection. Before sending the final response, choose `waiting` when the response asks for or implicitly awaits user input, confirmation, approval, authorization, or a decision; choose `completed` only when the current request is genuinely finished. Avoid repeated title updates during one uninterrupted phase.

## Plan-mode handoff

In Plan mode, delivering a proposed plan does not mean the underlying implementation request is complete. When the plan is ready but implementation is still waiting for the user to approve it, revise it, or switch out of Plan mode, set the task to `waiting` before the final response and leave it red between turns.

Use `completed` after a plan response only when the user explicitly requested a plan as the entire deliverable and no implementation is expected, or when the user explicitly marks the task complete. When the user later authorizes implementation, change the task to `active` immediately before the first project write.

## User-controlled status commands

An explicit user instruction about the current task overrides inferred lifecycle state. Recognize clear status commands, including these examples:

- `思考中`, `thinking`, `分析中` → `thinking`
- `等待`, `暂停`, `等我确认`, `waiting` → `waiting`
- `开始执行`, `继续修改`, `执行中`, `active` → `active`
- `完成`, `done`, `finish`, `结束`, `归档`, `completed` → `completed`

Only treat these words as commands when the user is clearly directing the current task's status. A user command to mark the task `completed` is authoritative and does not require Codex to verify unfinished work. “归档” changes the lifecycle status to `completed`; perform the separate archive operation only when the user explicitly asks to archive the task itself.

## Updating the title

Before renaming, remove only an existing prefix matching this skill’s configured format. Preserve the rest of the title exactly, including punctuation and user wording. Then apply the stable number and the configured display label, and update the current task title using the Codex task-title operation.

Archiving is separate from lifecycle status. When a task with `completed` status is archived, keep `[✅]` in its title; do not invent or apply an archived status.

If the title cannot be updated, continue the user’s requested work and briefly report that the status label could not be synchronized.
