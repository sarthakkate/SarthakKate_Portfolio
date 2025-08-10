document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle Logic ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', () => {
            navLinks.classList.toggle('hidden');
            navLinks.classList.toggle('flex');
            navLinks.classList.toggle('absolute');
            navLinks.classList.toggle('top-full');
            navLinks.classList.toggle('left-0');
            navLinks.classList.toggle('w-full');
            navLinks.classList.toggle('bg-gray-800');
            navLinks.classList.toggle('shadow-lg');
            navLinks.classList.toggle('py-4');
            navLinks.classList.toggle('items-center');
            navLinks.classList.toggle('space-y-4');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (!navLinks.classList.contains('hidden')) {
                    navLinks.classList.add('hidden');
                    navLinks.classList.remove('flex', 'absolute', 'top-full', 'left-0', 'w-full', 'bg-gray-800', 'shadow-lg', 'py-4', 'items-center', 'space-y-4');
                }
            });
        });
    }

    // --- Dynamic Words Logic ---
    const dynamicWords = ["Professional Coder", "Developer", "ML Engineer", "AI Integrator"];
    let currentWordIndex = 0;
    const dynamicWordSpan = document.getElementById('dynamic-word-span');

    function updateDynamicWord() {
        if (dynamicWordSpan) {
            dynamicWordSpan.textContent = dynamicWords[currentWordIndex];
            currentWordIndex = (currentWordIndex + 1) % dynamicWords.length;
        }
    }

    updateDynamicWord();
    setInterval(updateDynamicWord, 3000);

    // --- Projects Data & Rendering ---
    const projectData = [
        {
            name: 'Digital Cafe Menu & Ordering System',
            techStack: 'HTML, CSS, JavaScript, Python, Vercel, GitHub',
            description: 'Developed a responsive web application for a cafe using a single-page model, enabling customers to scan a QR code to view the menu, place an order, and request assistance. Integrated a Python script for automated generation of unique, table-specific QR codes, and included a direct WhatsApp integration for order submission.',
            github: 'https://github.com/sarthakkate/DigitalCafeMenu'
            // live: 'https://digital-cafe-menu.vercel.app' // Placeholder Vercel link
        },
        {
            name: 'DevConnect - Developer Portfolio + Blog Platform',
            techStack: 'React (Vite), Firebase, Tailwind CSS',
            description: 'Designed and built a responsive platform for developers to showcase portfolios and publish tech blogs. Created dynamic sections for projects, skills, and social profiles. Implemented Markdown support for writing and managing blogs.',
            github: 'https://github.com/sarthakkate/DevConnect'
        },
        {
            name: 'AI Resume Builder',
            techStack: 'React (Vite), Gemini API, Firebase, Tailwind CSS, React-PDF',
            description: 'Built an AI-enhanced resume builder with real-time editing and PDF download functionality. Integrated Gemini API to generate resume content suggestions and grammar improvements. Designed dark-themed, responsive UI with accessible form sections.',
            github: 'https://github.com/sarthakkate/AI-Resume-Builder'
        },
        {
            name: 'Stock Market Prediction using HMM',
            techStack: 'ML, Data Processing, Model Training',
            description: 'Collected and preprocessed financial time-series data (e.g., closing prices, returns). Used HMM to model hidden market regimes and transitions based on observed stock movements. Trained the model using Expectation-Maximization (EM) algorithm for optimal parameter estimation. Evaluated model accuracy using metrics like log-likelihood and compared predicted vs actual trends.',
            github: 'https://github.com/sarthakkate/stockmarketPredictionHMM'
        }
    ];

    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsContainer.innerHTML = ''; // Clear existing content
        projectData.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'bg-gray-700 p-6 rounded-lg shadow-md flex flex-col justify-between';
            projectCard.innerHTML = `
                <div>
                    <h3 class="text-xl font-semibold text-gray-200 mb-2">${project.name}</h3>
                    <p class="text-sm text-blue-300 mb-3">${project.techStack}</p>
                    <p class="text-gray-300 text-sm mb-4">${project.description}</p>
                </div>
                <div class="flex space-x-2 mt-4 self-end">
                    ${project.github ? `
                    <a
                        href="${project.github}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-block bg-gray-600 hover:bg-gray-500 text-white text-sm font-bold py-2 px-4 rounded-lg self-end transition duration-300"
                    >
                        View on GitHub
                    </a>` : ''}
                    ${project.live ? `
                    <a
                        href="${project.live}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-lg self-end transition duration-300"
                    >
                        View Live
                    </a>` : ''}
                </div>
            `;
            projectsContainer.appendChild(projectCard);
        });
    }

    // --- AI Code Snippet Generator Logic ---
    const aiPromptInput = document.getElementById('ai-prompt');
    const generateAiResponseBtn = document.getElementById('generate-ai-response-btn');
    const aiResponseDisplay = document.getElementById('ai-response-display');

    // IMPORTANT: Replace "YOUR_GOOGLE_CLOUD_API_KEY_HERE" with your actual Google Cloud API Key
    // You can get one from the Google Cloud Console: https://console.cloud.google.com/apis/credentials
    const GOOGLE_CLOUD_API_KEY = "YOUR_GOOGLE_CLOUD_API_KEY_HERE";

    if (generateAiResponseBtn && aiPromptInput && aiResponseDisplay) {
        generateAiResponseBtn.addEventListener('click', async () => {
            const prompt = aiPromptInput.value.trim();
            if (!prompt) {
                aiResponseDisplay.textContent = 'Please enter a description for the code snippet!';
                return;
            }

            if (GOOGLE_CLOUD_API_KEY === "YOUR_GOOGLE_CLOUD_API_KEY_HERE" || !GOOGLE_CLOUD_API_KEY) {
                aiResponseDisplay.textContent = 'Error: Please replace "YOUR_GOOGLE_CLOUD_API_KEY_HERE" in js/script.js with your actual Google Cloud API Key.';
                return;
            }

            aiResponseDisplay.textContent = 'Generating code...';
            generateAiResponseBtn.disabled = true;
            generateAiResponseBtn.classList.add('opacity-50', 'cursor-not-allowed');

            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: `Generate a code snippet for: ${prompt}. Please provide the code in a markdown code block, specifying the language.` }] });

            const payload = { contents: chatHistory };
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GOOGLE_CLOUD_API_KEY}`;

            let retries = 0;
            const maxRetries = 5;
            const baseDelay = 1000;

            while (retries < maxRetries) {
                try {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (!response.ok) {
                        if (response.status === 429) {
                            retries++;
                            const delay = baseDelay * Math.pow(2, retries - 1);
                            console.warn(`Rate limit hit. Retrying in ${delay / 1000}s... (Attempt ${retries}/${maxRetries})`);
                            await new Promise(resolve => setTimeout(resolve, delay));
                            continue;
                        }
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const result = await response.json();
                    if (result.candidates && result.candidates.length > 0 &&
                        result.candidates[0].content && result.candidates[0].content.parts &&
                        result.candidates[0].content.parts.length > 0) {
                        const text = result.candidates[0].content.parts[0].text;
                        aiResponseDisplay.textContent = text;
                    } else {
                        aiResponseDisplay.textContent = 'Could not get a valid code snippet from AI.';
                    }
                    break;
                } catch (error) {
                    console.error("Error generating AI response:", error);
                    aiResponseDisplay.textContent = 'Failed to generate code. Please try again.';
                    break;
                } finally {
                    generateAiResponseBtn.disabled = false;
                    generateAiResponseBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                }
            }

            if (retries === maxRetries) {
                aiResponseDisplay.textContent = 'Failed to generate code after multiple retries due to rate limiting.';
                generateAiResponseBtn.disabled = false;
                generateAiResponseBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        });
    }

    // --- Footer Year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
