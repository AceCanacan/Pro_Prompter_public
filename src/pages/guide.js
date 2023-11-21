import React from 'react';
import '../pages-css/guide.css'; // Ensure the correct path to your CSS file

const Guide = () => {
  return (
    <div className="guide-container">
      <h1 className="guide-title">Guide to Using Custom Instructions in ChatGPT with ProPrompter</h1>
      
      <section className="guide-section">
        <h2>1. Understanding Custom Instructions in ChatGPT</h2>
        <div className="guide-content">
          <h3>What Are They?</h3>
          <p>Custom instructions are special directives you can give to ChatGPT to shape its responses and behavior. These instructions guide the chatbot on what information to include and how to respond in conversations.</p>
          
          <h3>Why Use Them?</h3>
          <p>Custom instructions are useful for personalizing ChatGPT's interactions, ensuring that it meets your specific needs or preferences in a conversation.</p>
        </div>
      </section>
      
      <section className="guide-section">
  <h2>2. How to Use Custom Instructions in Your ChatGPT</h2>
  <div className="guide-content">
    <h3>Setting Up Custom Instructions</h3>
    <p>To personalize ChatGPT's interactions within your app, you'll utilize the custom instructions feature. This involves inputting specific information to guide ChatGPT's responses more effectively.</p>
    
    <h3>Step-by-Step Guide</h3>
    <ul>
      <li>
        <strong>Information Input:</strong> In the first textbox labeled "What would you like ChatGPT to know about you?", input necessary information that aligns with your app's context. For example, if your app focuses on health, include relevant health-related interests or needs.
      </li>
      <li>
        <strong>Response Customization:</strong> In the second textbox, "How would you like ChatGPT to respond?", specify the desired behavior or tone of the bot's responses. This could range from professional to casual, or from informative to motivational, depending on your app's requirements.
      </li>
    </ul>

    <h3>Importance of Custom Instructions</h3>
    <p>Customizing ChatGPT ensures that the interactions are tailored to the specific needs and context of your application. It enhances user experience by providing relevant and appropriate responses, making your app more engaging and effective.</p>

    <h3>Practical Example</h3>
    <p>For instance, in a fitness app, input details like target audience fitness levels and preferred workout styles in the first textbox. In the second textbox, you might ask for motivational and encouraging responses, suitable for a fitness-centric audience.</p>
  </div>
</section>

      
      <section className="guide-section">
        <h2>3. Enhancing Your Experience with ProPrompter</h2>
        <div className="guide-content">
          <h3>ProPrompter Overview</h3>
          <p>ProPrompter is a tool designed to help you easily create effective custom instructions for ChatGPT.</p>
          
          <h3>How Does ProPrompter Help?</h3>
          <p>It asks you a series of questions about your preferences and the specific needs of your app. Based on your answers, ProPrompter generates a customized prompt that you can use with ChatGPT.</p>
          
          <h3>Benefits</h3>
          <p>ProPrompter simplifies the process of creating custom instructions. It helps you save time and ensures that the instructions are precise and effective for your particular use case.</p>
        </div>
      </section>
      
      <section className="guide-section">
      </section>
    </div>
  );
}

export default Guide;
