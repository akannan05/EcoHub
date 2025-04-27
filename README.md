# EcoHub

<div align="center">
  <img src="https://github.com/akannan05/EcoHub/blob/main/ecohub.jpg" />
  <br>
  <br>
  <em>Making Computer Vision Smarter, Greener, and Cleaner.</em>
</div>

<br>  

While computer vision and artificial intelligence have achieved extraordinary breakthroughs over the past decade, environmental awareness within the field has lagged behind. Today, most users of computer vision models (hobbyists, engineers, researchers, etc.) rarely consider the energy consumption, carbon footprint, or broader environmental impact of the models they deploy. As models grow larger and more computationally intensive, this blind spot leads to significant, often unnecessary, environmental costs.

EcoHub aims to bridge this gap by providing an accessible platform to benchmark, compare, and deploy models with efficiency and sustainability metrics at the forefront. Our goal is to empower developers to make **informed, responsible decisions** — optimizing **not just for performance, but for the planet**. 

## Motivation

Model Bloating is a growing problem in computer vision. It refers to using unnecessarily large and complex models when simpler alternatives would suffice.

This leads to problems from both an economic cost and carbon footprint perspective:
- Increased computational load/compute power
- Higher energy consumption
- Greater CO2 emissions
  
EcoHub empowers developers to choose smarter models and minimize environmental harm while still achieving their goals.

## Components

**Model Comparing:**  
Users can directly compare models supported by torchvision.models across key metrics:
- CPU usage (efficiency)
- Inference Time (efficiency)
- Peak Memory usage (efficiency)
- Power Draw (environmental)
- CO2 Emissions (environmental)
- Trees needed to offset CO2 Emissions (environmental)

Metrics are collected across different devices, and results can be filtered by device for clearer comparisons.

**Custom Benchmarking:**  
In addition to models supported by torchvision.models, users can benchmark their **own custom computer vision models** (e.g., `.pt` files). EcoHub provides a streamlined uploader and testing environment to validate the performance and eco-efficiency of user models.

**Calculator:**  
EcoHub offers an **interactive calculator** for quick sustainability estimates.  
Users input rough values (model size, inference frequency, deployment duration, etc.) to estimate:
- Total energy usage
- Carbon footprint
- Number of trees needed to offset the deployment

This gives developers a lightweight way to make greener decisions even before deploying.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **Benchmarking:** Python (PyTorch, torchvision), Bash scripting
- **Hardware Used:** Raspberry Pi 4B (ARM64), MacBook M2 Air (ARM64)

## Getting Started

The web application can be accessed from the following link:  
**[Coming Soon — Deployment in Progress]**

For local development:

```bash
# Clone the repository
git clone https://github.com/akannan05/EcoHub.git

# Navigate into the directory
cd EcoHub

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

# Run both servers concurrently
npm run dev
```

## Scaling and Future Work

- **Expand Model Library:** Add more models across computer vision and other ML domains like NLP and multimodal AI.
- **Compiled Binaries:** Distribute platform-specific binaries for benchmarking to improve local device accuracy.
- **Improve Benchmarking Accuracy:** Integrate wattmeter-based measurements for precise real-world power draw tracking.
- **Global Leaderboards and Community:** Create competitive leaderboards and evolve EcoHub into a forum-driven platform for engineers focused on sustainable AI.
- **VS Code or Coding Extension:** Build an extension that integrates directly into users' computer vision projects, automatically reporting ecometrics (energy usage, CO2 output, efficiency stats) while they develop.
- **LLM Integration:** Allow users to input project specifications (e.g., FPS, latency, accuracy, device specs) through natural language, and EcoHub will recommend the most efficient model based on their constraints.
