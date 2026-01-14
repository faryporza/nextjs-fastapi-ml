# Iris Flower Species Predictor

A Full-Stack Machine Learning Web Application that predicts Iris flower species based on sepal and petal measurements. This project demonstrates a monorepo structure integration between a **Next.js** frontend and a **FastAPI** backend, deployed on **Render**.

## Tech Stack

### Frontend
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP Client:** Fetch API

### Backend & Machine Learning
- **Framework:** FastAPI
- **Server:** Uvicorn
- **ML Library:** Scikit-learn (Random Forest Classifier)
- **Data Processing:** Pandas, NumPy
- **Serialization:** Joblib

### Deployment
- **Platform:** Render (Web Services)
- **Structure:** Monorepo (Single repository for both frontend and backend)

---

## Project Structure

```bash
.
├── backend/                # Python FastAPI Server
│   ├── models/             # Saved ML Models (.pkl)
│   ├── main.py             # API Entry Point
│   ├── train_model.py      # Script to train and save model
│   ├── data.csv            # Training dataset
│   └── requirements.txt    # Python dependencies
│
├── frontend/               # Next.js Application
│   ├── src/app/            # App Router pages
│   ├── public/             # Static assets
│   └── package.json        # Node.js dependencies
│
└── README.md