# RetroSnakeA – Retro Revival with AI Safety Coach

RetroSnakeA is a classic Snake game rebuilt under the **Retro Revival** theme and enhanced with a modern **AI Safety Coach**.  
The project demonstrates how traditional retro gameplay can be augmented using lightweight, explainable AI logic.

---

## 🎮 Project Overview

The game follows the traditional grid-based Snake mechanics while introducing an AI module that continuously analyzes the game state and predicts unsafe moves.  
The AI provides real-time suggestions to help the player avoid collisions with walls or the snake’s own body.

---

## 🧠 AI Safety Coach (Modern Twist)

The AI Safety Coach works by:
- Simulating all possible next moves (UP, DOWN, LEFT, RIGHT)
- Predicting wall and self-collisions before the move is executed
- Suggesting the safest available direction
- Warning the player when **no safe moves remain**

This approach keeps the AI:
- Lightweight
- Deterministic
- Explainable (no black-box ML)

---

## ✨ Features

- Retro grid-based Snake gameplay
- Keyboard-controlled movement
- Food spawning and snake growth
- Score tracking
- Wall and self-collision detection
- **AI Safety Coach with predictive logic**
- Visual danger warning when no safe move exists

---

## 🛠 Tech Stack

- HTML5 Canvas
- JavaScript
- Kiro IDE (used for rapid logic generation and iteration)

---

## 🚀 How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/sun21vinzz/RetroSnakeA.git
