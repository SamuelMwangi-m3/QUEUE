# QUEUE — Missed Action Tracker

QUEUE is a lightweight React application that helps users track missed actions
such as calls, deliveries, meetings, or follow-ups — and ensures they are handled later.

Instead of forgetting or relying on memory, QUEUE creates a simple, visual queue
of pending actions that need attention.

---

## Problem Statement

People miss important actions every day:
- Missed calls
- Missed deliveries
- Missed meetings
- Unfinished follow-ups

Most of the time, these actions are forgotten because they are not written down
immediately.

QUEUE solves this by providing a fast and minimal way to log missed actions
and follow up later.

---

## Solution

QUEUE allows users to:
- Log a missed action in seconds
- View all pending actions in one place
- Mark actions as handled
- Filter between pending and completed actions
- Persist data locally without a backend

---

## Features

- Add missed actions
- Mark actions as completed
- Delete actions
- Filter by status (Pending / Completed)
- Persistent storage using LocalStorage
- Clean and minimal UI

---

## Tech Stack

- React (Vite)
- JavaScript (ES6+)
- React Hooks (`useState`, `useEffect`)
- LocalStorage
- CSS / Tailwind (optional)

---

## Data Model

Each action is stored as an object:

```json
{
  "id": "uuid",
  "title": "Missed Call",
  "description": "Call from supplier",
  "timestamp": "2025-01-10T14:30",
  "status": "pending"
}
