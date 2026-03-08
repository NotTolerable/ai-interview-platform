# HackCanada Backend

## Mock interview API (FastAPI)

The **mock-interview** and related endpoints (question generation, answer analysis, etc.) are in **main.py**. You need this server running for the Behaviourly frontend interview flow to work.

**Run it:**

```bash
cd hackcanada-backend
uvicorn main:app --reload --port 8001
```

Keep this terminal open. The frontend is configured to call `http://localhost:8001` for the API (see `VITE_API_BASE_URL` in the frontend `.env`).

**Requirements:** Python 3.10+, and a `.env` in this folder or the repo root with `GEMINI_API_KEY` set.

## Auth (Flask, optional)

`Auth.py` runs the Flask app on port **8000** (login, logout, `/me`). Run it only if you need that auth flow:

```bash
python Auth.py
```
