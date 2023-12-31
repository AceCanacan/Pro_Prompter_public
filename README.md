# ProPrompter 🚀

<div style="display: flex; flex-wrap: wrap; justify-content: center;">
  <div style="flex: 0 0 50%; max-width: 25%;">
    <img src="https://github.com/AceCanacan/Pro_Prompter_public/assets/110709199/ef3deb95-9ff0-4126-9f90-6d30507b7bf6" alt="Image 1" style="max-width: 100%;">
  </div>
  <div style="flex: 0 0 50%; max-width: 25%;">
    <img src="https://github.com/AceCanacan/Pro_Prompter_public/assets/110709199/f66118e2-2f1d-47b3-bd38-4f5146ecc330" alt="Image 2" style="max-width: 100%;">
  </div>
  <div style="flex: 0 0 50%; max-width: 25%;">
    <img src="https://github.com/AceCanacan/Pro_Prompter_public/assets/110709199/53dafbe7-2459-4534-b330-e8f33987b732" alt="Image 3" style="max-width: 100%;">
  </div>
  <div style="flex: 0 0 50%; max-width: 25%;">
    <img src="https://github.com/AceCanacan/Pro_Prompter_public/assets/110709199/cb4580f1-fffb-49a3-ab1d-c1e9c4e5a8e8" alt="Image 4" style="max-width: 100%;">
  </div>
</div>

ProPrompter is an avant-garde application designed to revolutionize the way you create and manage prompts for ChatGPT. Featuring sleek design, cutting-edge AI integration, and a user-centric interface, ProPrompter empowers you to craft nuanced instructions for bespoke AI-driven interactions. Built atop AWS Amplify, this tool ensures not only sophistication in AI conversational design but also robust security for your creations.

## Table of Contents 📚

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup](#setup)
- [Usage Guide](#usage-guide)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites ✅

Before you begin, ensure you have met the following requirements:

- Node.js (version 12.x or higher)
- NPM (version 6.x or higher)
- AWS Account with configured AWS CLI
- An API key from OpenAI (for GPT integration)

## Installation 💻

To install ProPrompter, follow these steps:

1. Clone the repository:
   \```bash
   git clone https://github.com/your-username/pro-prompter.git
   \```
2. Navigate to the project directory:
   \```bash
   cd pro-prompter
   \```
3. Install the required dependencies:
   \```bash
   npm install
   \```

## Setup 🔧

Setting up the ProPrompter app involves a few key steps:

1. Initialize your Amplify project if not already done:
   \```bash
   amplify init
   \```
2. Push your Amplify configurations to the cloud:
   \```bash
   amplify push
   \```
3. Configure the OpenAI API key by adding it to your environment variables:
   \```bash
   export OPENAI_API_KEY=your_openai_api_key
   \```

## Usage Guide 📖

To run ProPrompter after installation, execute:
\```bash
npm start
\```

Here's a quick rundown to get you started:

- **Login/Signup:** Securely register or login to ProPrompter with AWS Cognito authentication.
- **Create Prompts:** Navigate to the 'Make a Prompt' section to start creating custom ChatGPT prompts.
- **Manage Prompts:** View saved prompts in 'Your Prompts', edit content, or delete them as needed.
- **Summarize:** Turn conversations into concise summaries that you can store and revisit anytime.
- **Guide:** Unsure where to start? The 'How to Use' guide walks you through ProPrompter's powerful features step by step.

## FAQ ❓

**Q: Do I need to pay for using ProPrompter?**

A: ProPrompter itself is free to use. However, depending on your usage, you might incur costs for AWS services and OpenAI API usage.

**Q: How secure is ProPrompter with my data?**

A: ProPrompter uses Amazon Cognito for user management, which provides secure access to your data.

**Q: Can I contribute to the app development?**

A: Absolutely! Check the [Contributing](#contributing) section below for more details.

## Contributing 🤝

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch:
   \```bash
   git checkout -b feature/AmazingFeature
   \```
3. Commit your Changes:
   \```bash
   git commit -m 'Add some AmazingFeature'
   \```
4. Push to the Branch:
   \```bash
   git push origin feature/AmazingFeature
   \```
5. Open a Pull Request
