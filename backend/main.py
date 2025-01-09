from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils import scan_range
import uvicorn

app = FastAPI()

# Allow CORS (so React frontend can communicate)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this to allow specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/scan")
def scan(start_ip: str, end_ip: str):
    """
    API endpoint to scan a range of IPs and return their statuses.
    """
    results = scan_range(start_ip, end_ip)
    return {"results": results}


if __name__ == "__main__": 
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)