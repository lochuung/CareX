import uvicorn
from main import app 

if __name__ == "__main__":
    config = uvicorn.Config("main:app", port=5050, log_level="info")
    server = uvicorn.Server(config)
    server.run()