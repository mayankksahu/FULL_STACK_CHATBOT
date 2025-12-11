import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#121212] font-sans text-gray-200">
      <Helmet>
        <title>About – Mindora</title>
        <meta
          name="description"
          content="Learn how to use Mindora for AI-powered text and image generation."
        />
        <meta name="author" content="Mayank Sahu" />
      </Helmet>

      <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-[100rem] h-[100rem] bg-gradient-to-b from-purple-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/2 w-[100rem] h-[100rem] bg-gradient-to-t from-blue-500/10 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <button
            onClick={() => navigate("/")}
            className="mb-6 text-sm text-purple-300 hover:text-purple-200 underline"
          >
            ← Back to Home
          </button>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            About Mindora
          </h1>
          <p className="text-gray-300 mb-8">
            Mindora is an AI-powered assistant that helps you generate{" "}
            <span className="font-semibold">text</span> and{" "}
            <span className="font-semibold">images</span> from simple prompts.
            It is built and maintained by <span className="font-semibold">Mayank Sahu</span>.
          </p>

          <div className="space-y-8 text-sm sm:text-base">
            {/* How it works */}
            <section>
              <h2 className="text-xl font-semibold mb-2 text-purple-300">
                1. How Mindora works
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>You type a prompt in the chat box.</li>
                <li>You choose whether you want a <b>text</b> or an <b>image</b> response.</li>
                <li>Mindora sends your request to Pollinations AI APIs.</li>
                <li>The AI generates the response and shows it in the chat.</li>
              </ul>
            </section>

            {/* Text mode */}
            <section>
              <h2 className="text-xl font-semibold mb-2 text-purple-300">
                2. Text mode (for answers, content, ideas)
              </h2>
              <p className="text-gray-300 mb-2">
                Use this when you want explanations, ideas, content, or code.
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Select the <b>Text</b> icon from the left of the input bar.</li>
                <li>Type your question or instruction, for example:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>"Explain React hooks in simple terms"</li>
                    <li>"Write a short story about a time-travelling student"</li>
                    <li>"Generate 10 startup ideas for AI tools"</li>
                  </ul>
                </li>
                <li>Press <b>Enter</b> or click the <b>Send</b> button.</li>
              </ul>
            </section>

            {/* Image mode */}
            <section>
              <h2 className="text-xl font-semibold mb-2 text-purple-300">
                3. Image mode (for AI images)
              </h2>
              <p className="text-gray-300 mb-2">
                Use this when you want AI-generated images.
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Select the <b>Image</b> icon from the left of the input bar.</li>
                <li>Describe the image clearly, for example:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>"A cyberpunk city at night with neon lights"</li>
                    <li>"Minimalist logo of a rocket with gradient colors"</li>
                    <li>"A fantasy landscape with floating islands"</li>
                  </ul>
                </li>
                <li>Wait for the AI to generate your image.</li>
                <li>You can <b>copy</b> or <b>download</b> the image using the buttons on hover.</li>
              </ul>
            </section>

            {/* Chat reset */}
            <section>
              <h2 className="text-xl font-semibold mb-2 text-purple-300">
                4. Resetting the chat
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Click the <b>reset icon</b> in the header.</li>
                <li>Confirm the reset in the popup dialog.</li>
                <li>This will clear all messages stored in your browser.</li>
              </ul>
            </section>

            {/* Storage / privacy */}
            <section>
              <h2 className="text-xl font-semibold mb-2 text-purple-300">
                5. Data & privacy
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Your chat history is stored locally in your browser using <b>localStorage</b>.</li>
                <li>You can clear it anytime using the <b>reset</b> button.</li>
                <li>Requests are sent to third-party AI APIs (Pollinations) to generate text and images.</li>
                <li>Avoid sharing sensitive personal information in prompts.</li>
              </ul>
            </section>

            {/* Limitations */}
            <section>
              <h2 className="text-xl font-semibold mb-2 text-purple-300">
                6. Limitations
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>AI may sometimes generate incorrect or incomplete answers.</li>
                <li>Image generation quality depends on the clarity of your prompt.</li>
                <li>There might be some delay depending on API response time.</li>
              </ul>
            </section>

            {/* Contact / credit */}
            <section>
              <h2 className="text-xl font-semibold mb-2 text-purple-300">
                7. Contact & credits
              </h2>
              <p className="text-gray-300">
                Mindora is built by <b>Mayank Sahu</b>.  
                For feedback or collaboration, you can reach out via{" "}
                <a
                  href="https://www.linkedin.com/in/mayank-sahu-mayanksahu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-purple-300 hover:text-purple-200"
                >
                  LinkedIn
                </a>.
              </p>
            </section>
          </div>

          <p className="mt-10 text-center text-xs text-gray-500">
            Mindora © {new Date().getFullYear()} · Built by Mayank Sahu
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
