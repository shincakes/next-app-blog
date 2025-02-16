import logging
import os

# Define log directory
LOG_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../logs")
if not os.path.exists(LOG_DIR):
    os.makedirs(LOG_DIR)

# Define log file path
LOG_FILE = os.path.join(LOG_DIR, "app.log")

# Configure logging
logger = logging.getLogger("flask_backend")
logger.setLevel(logging.DEBUG)

# Console Handler (for Docker)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)

# File Handler (Logs stored in logs/app.log)
file_handler = logging.FileHandler(LOG_FILE)
file_handler.setLevel(logging.DEBUG)

# Log format
log_format = logging.Formatter("%(asctime)s - %(levelname)s - %(module)s - %(message)s")
console_handler.setFormatter(log_format)
file_handler.setFormatter(log_format)

# Add handlers
logger.addHandler(console_handler)
logger.addHandler(file_handler)
