# Model Dashboard

## Overview
The Model Dashboard is a web-based application for data scientists and machine learning engineers to manage, track, and compare machine learning models. It enhances the model development process by promoting collaboration and improving model transparency.

## Features
- **Model Registry:** Centralized repository for model metadata, hyperparameters, and performance metrics.
- **Model Comparison:** Visualization tool for comparing model performance.
- **Model Tracking:** Real-time monitoring of model performance and drift.
- **Collaboration:** Multi-user support for team collaboration.
- **Visualization:** Interactive visualizations for model understanding.

## Technical Stack
- **Frontend:** React, Redux, Material-UI
- **Backend:** Flask (Python)
- **Database:** PostgreSQL
- **Model Serving:** Supports scikit-learn, TensorFlow, PyTorch

## Getting Started
1. Clone the repository: `git clone https://github.com/MridulTi/Model_Dashboard.git`
2. Install dependencies: `pip install -r requirements.txt`
3. Set up the database: `python setup_db.py`
4. Run the application: `python app.py`
5. Access the dashboard: `http://localhost:5000`

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Submit a pull request with a detailed description.

## License
The Model Dashboard is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgments
Inspired by TensorFlow Model Garden and MLflow, with thanks to the open-source community.


Certainly! Here's how you can structure the `README.md` file based on the provided setup instructions:

```
# Project Setup Guide

This guide provides instructions for setting up the backend and frontend of the project. Follow the steps below to get everything running.

## Backend (Flask)

### 1. Clone the Repository

1. Open your terminal or Git Bash.
2. Clone the repository:
   ```bash
   git clone https://github.com/MridulTi/Model_Dashboard .
   ```

### 2. Setup Virtual Environment and Install Dependencies

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/Scripts/activate  # On Windows, use `.venv\Scripts\activate`
   ```

3. Install the required Python packages:
   ```bash
   pip install flask flask-cors flask-sqlalchemy flask-caching flask-jwt-extended flask-socketio validators torch torchvision pillow facenet-pytorch opencv-python
   ```

4. Install additional dependencies:
   ```bash
   pip install "grad-cam==1.4.0"
   pip install "ultralytics==8.2.60"
   ```

### 3. Prepare the Required Files and Folders

1. Create a folder named `weights`:
   ```bash
   mkdir weights
   ```

2. Download the required model files and place them in the `weights` folder:
   - Download `yolov8n.pt` from [Ultralytics YOLOv8 repository](http://yolov8n.pt).
   - Download `resnetinceptionv1_epoch_32.pth` from Hugging Face.
   - Save both files into the `weights` folder.

3. Create the `images` folder with subfolders:
   ```bash
   mkdir -p images/results
   mkdir -p images/uploads
   ```

### 4. Run the Backend Application

1. Start the Flask application:
   ```bash
   python apps.py
   ```

## Frontend (React)

### 1. Install Dependencies

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install the required Node.js packages:
   ```bash
   npm install
   ```

### 2. Start the Development Server

1. Run the React development server:
   ```bash
   npm run dev
   ```

## Notes

- Ensure you have Python 3.x and Node.js installed on your machine.
- Use the appropriate repository URL and directory names as per your project setup.
- Check for any additional environment-specific setup or configuration in the project's documentation.

---

If you encounter any issues or need further assistance, please refer to the project’s README or consult with your team.
```