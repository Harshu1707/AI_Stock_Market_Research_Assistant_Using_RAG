# Stock Market Research Assistant (SMRA)

SMRA is a full-stack AI-powered financial research assistant built with a React + Vite frontend and a FastAPI backend. It combines local historical stock analytics, Gemini-powered chat, RAG over financial PDFs, yfinance quotes, and Finnhub/NewsAPI news search.

> Educational use only. This is not financial advice.

## Architecture

```text
backend/
  app/
    api/              REST and streaming endpoints
    analytics/        Pandas/TA-Lib indicators and SQLite queries
    database/         SQLAlchemy models/session/init
    llm/              Gemini client, prompts, intent classification
    rag/              PDF extraction, chunking, FAISS retrieval
    schemas/          Pydantic request models
    services/         Chat orchestration, news, yfinance quotes
    utils/            Settings and environment loading
    main.py           FastAPI app
  data/               CSV/XLSX uploads and sample data
  uploads/            Uploaded financial reports
  vectorstore/        Local FAISS index
  requirements.txt
frontend/
  src/
    components/       Sidebar, cards, loading, charts
    pages/            Chat, dashboard, analytics, reports, news
    services/         Axios API client
    utils/            Formatting helpers
  package.json
```

## Features

- **AI chat assistant** with multi-turn history, intent classification, tool routing, and a built-in disclaimer.
- **Historical analytics** from CSV/XLSX into SQLite, including OHLCV, daily percentage change, SMA 5/10/20/50/200, EMA-20, RSI-14, rolling volatility, best/worst performers, and sector aggregation.
- **Financial document RAG** using PyPDF2, LangChain chunking, sentence-transformer embeddings, local FAISS storage, and document/page citations.
- **Live market intelligence** using yfinance for quotes and Finnhub or NewsAPI for latest stock/sector news with lightweight sentiment labels.
- **Professional dashboard UI** with Tailwind CSS, Recharts visualizations, responsive layout, loading states, and error handling.

## API Endpoints

- `GET /api/health`
- `POST /api/chat`
- `POST /api/chat/stream`
- `POST /api/dataset/upload`
- `GET /api/stocks/{symbol}/history`
- `GET /api/stocks/{symbol}/indicators`
- `GET /api/stocks/{symbol}/quote`
- `POST /api/stocks/compare`
- `GET /api/analytics/performers`
- `GET /api/analytics/sectors`
- `POST /api/reports/upload`
- `POST /api/reports/query`
- `POST /api/news`

## Setup: Backend

1. Create and activate a virtual environment:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\\Scripts\\activate
```

2. Install dependencies:

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

If TA-Lib fails on your OS, install the native TA-Lib library first. The code includes a Pandas fallback for indicators so the app can still run while you resolve the binary dependency.

3. Configure environment variables:

```bash
cp .env.example .env
```

Then edit `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
FINNHUB_API_KEY=your_finnhub_api_key
NEWSAPI_KEY=your_newsapi_key
DATABASE_URL=sqlite:///./data/stocks.db
CORS_ORIGINS=http://localhost:5173
```

Free key links:

- Gemini API key: Google AI Studio
- Finnhub API key: Finnhub free tier
- NewsAPI key: NewsAPI developer tier

4. Start FastAPI:

```bash
uvicorn app.main:app --reload --port 8000
```

5. Open API docs:

```text
http://localhost:8000/docs
```

6. Load sample market data. Use the UI upload control on the Stock Analytics page, or run:

```bash
curl -X POST http://localhost:8000/api/dataset/upload \
  -F "file=@data/sample_stocks.csv"
```

## Setup: Frontend

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Optional environment file:

```bash
cat > .env <<'ENV'
VITE_API_BASE_URL=http://localhost:8000/api
ENV
```

3. Start Vite:

```bash
npm run dev
```

4. Open the application:

```text
http://localhost:5173
```

## Recommended Demo Flow

1. Start the backend and frontend.
2. Upload `backend/data/sample_stocks.csv` from the Stock Analytics page.
3. Click **Analyze** for `AAPL`, `MSFT`, or `NVDA` to see price, SMA overlays, RSI, and volatility.
4. Upload an annual report PDF in **Financial Reports** and ask: “What are the major revenue and risk trends?”
5. Search `NVDA earnings analyst rating` in **News & Sentiment**.
6. Ask the chat assistant: “Compare AAPL and MSFT performance and recent news.”

## Notes

- No Docker is required.
- SQLite database file is created at `backend/data/stocks.db` on startup.
- FAISS vector indexes are stored under `backend/vectorstore/`.
- Uploaded reports are stored under `backend/uploads/`.
- Missing Gemini/news API keys do not crash the app; the backend returns helpful configuration messages.


