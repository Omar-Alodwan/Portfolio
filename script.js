// Configuration - API Key will be loaded from config
let GEMINI_API_KEY = '';

// Load API key from config.js if available
async function loadApiKey() {
    try {
        // Try to load from config.js (user will create this from .env)
        const response = await fetch('config.js');
        if (response.ok) {
            // This will be handled by importing config.js if it exists
            // For now, we'll use a fallback to read from window.config
        }
    } catch (e) {
        console.warn('config.js not found. Please create it with your API key.');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadApiKey();
    initializeTheme();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeInteractiveElements();
    initializeSearch();
    initializePDFExtraction();
    initializeSmoothScrolling();
});

// Dark/Light Mode Toggle
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, themeIcon);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
    });
}

function updateThemeIcon(theme, icon) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// Interactive Skill Bars
function initializeSkillBars() {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.width = `${progress}%`;
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-item').forEach(skill => {
        skillObserver.observe(skill);
    });
}

// Interactive Elements (Clickable Skills/Projects)
function initializeInteractiveElements() {
    // Clickable Skills
    document.querySelectorAll('.clickable-skill').forEach(skill => {
        skill.addEventListener('click', function() {
            const skillName = this.querySelector('.skill-name').textContent;
            const percentage = this.querySelector('.skill-percentage').textContent;
            
            // Create a simple modal or alert with skill details
            showSkillDetails(skillName, percentage);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // Clickable Projects
    document.querySelectorAll('.clickable-project').forEach(project => {
        project.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        project.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px)';
        });
    });
}

function showSkillDetails(name, percentage) {
    // Simple notification - can be enhanced with a modal
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = `${name}: ${percentage} proficiency`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Account for navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// PDF Text Extraction
let cvText = '';
let cvContextText = '';

async function initializePDFExtraction() {
    try {
        // Load PDF text using pdf.js
        const loadingTask = pdfjsLib.getDocument('EN-CV-Alodwan.pdf');
        const pdf = await loadingTask.promise;
        
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
        }
        
        cvText = fullText;
        console.log('CV text extracted successfully');
    } catch (error) {
        console.error('Error extracting PDF text:', error);
        // Fallback: try to load from text files
        try {
            let response = await fetch('cvtxt.txt');
            if (!response.ok) {
                response = await fetch('cv-text.txt');
            }
            if (response.ok) {
                cvText = await response.text();
                console.log('CV text loaded from text file');
            }
        } catch (e) {
            console.warn('Could not load CV text from files. Please ensure EN-CV-Alodwan.pdf or cvtxt.txt is accessible.');
        }
    }
    
    // Load cv-context.txt
    try {
        const response = await fetch('cv-context.txt');
        if (response.ok) {
            cvContextText = await response.text();
        } else {
            console.warn('cv-context.txt not found. Creating template...');
        }
    } catch (error) {
        console.warn('Could not load cv-context.txt:', error);
    }
}

// Typewriter effect function - displays text character by character
function typeWriter(element, text, appendMode = false) {
    if (!element) return;
    
    // For better performance and readability, show text instantly then format
    // This prevents issues with complex markdown formatting during typing
    const speed = 5; // Fast display speed
    const parent = element.parentElement;
    
    if (!appendMode) {
        element.textContent = '';
    }
    
    let currentIndex = 0;
    const displayText = text;
    
    function typeChar() {
        if (currentIndex < displayText.length) {
            // Add characters in chunks for better performance
            const chunkSize = 3;
            const chunk = displayText.substring(currentIndex, currentIndex + chunkSize);
            element.textContent += chunk;
            currentIndex += chunkSize;
            setTimeout(typeChar, speed);
        } else {
            // Format paragraphs after typing is complete
            formatResponse(element);
            // Remove typing cursor
            if (parent) {
                parent.classList.remove('typing');
            }
        }
    }
    
    typeChar();
}

// Format the response with proper paragraphs, markdown, and line breaks
function formatResponse(element) {
    if (!element) return;
    
    let text = element.textContent;
    const parent = element.parentElement;
    
    // Convert markdown to HTML
    text = convertMarkdownToHTML(text);
    
    parent.innerHTML = text;
}

// Convert basic markdown to HTML
function convertMarkdownToHTML(text) {
    if (!text) return '';
    
    // Split into sections
    const sections = text.split(/\n\n+/);
    let html = '';
    
    sections.forEach(section => {
        section = section.trim();
        if (!section) return;
        
        // Check if it's a list section (contains bullet points)
        if (section.includes('\n* ')) {
            const lines = section.split('\n');
            let listItems = [];
            let currentText = '';
            
            lines.forEach(line => {
                line = line.trim();
                if (line.startsWith('* ')) {
                    if (currentText) {
                        html += `<p>${formatInlineMarkdown(currentText)}</p>`;
                        currentText = '';
                    }
                    listItems.push(line.substring(2));
                } else if (listItems.length > 0) {
                    // Continuation of list item
                    listItems[listItems.length - 1] += ' ' + line;
                } else {
                    currentText += (currentText ? ' ' : '') + line;
                }
            });
            
            if (currentText) {
                html += `<p>${formatInlineMarkdown(currentText)}</p>`;
            }
            
            if (listItems.length > 0) {
                html += '<ul>';
                listItems.forEach(item => {
                    html += `<li>${formatInlineMarkdown(item)}</li>`;
                });
                html += '</ul>';
            }
        } else {
            // Regular paragraph
            section = section.replace(/\n/g, ' ');
            html += `<p>${formatInlineMarkdown(section)}</p>`;
        }
    });
    
    return html;
}

// Format inline markdown (bold, etc.)
function formatInlineMarkdown(text) {
    // Bold text: **text** or __text__
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');
    
    // Italic text: *text* or _text_ (but not at start of line for bullets)
    text = text.replace(/\*([^*]+?)\*/g, '<em>$1</em>');
    text = text.replace(/_([^_]+?)_/g, '<em>$1</em>');
    
    return text;
}

// Prompt user to enter API key
function promptForApiKey() {
    const modal = document.createElement('div');
    modal.className = 'api-key-modal';
    modal.innerHTML = `
        <div class="api-key-content">
            <h3>🔑 API Key Required</h3>
            <p>To use the AI search feature, please enter your Google Gemini API key.</p>
            <p class="small-text">Get your free API key from <a href="https://makersuite.google.com/app/apikey" target="_blank">Google AI Studio</a></p>
            <input type="password" id="apiKeyInput" placeholder="Enter your API key" class="api-key-input">
            <div class="api-key-buttons">
                <button id="saveApiKey" class="btn btn-primary">Save & Search</button>
                <button id="cancelApiKey" class="btn btn-secondary">Cancel</button>
            </div>
            <p class="small-text note">Your key will be stored locally in your browser only.</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const apiKeyInput = document.getElementById('apiKeyInput');
    const saveBtn = document.getElementById('saveApiKey');
    const cancelBtn = document.getElementById('cancelApiKey');
    
    apiKeyInput.focus();
    
    saveBtn.addEventListener('click', () => {
        const key = apiKeyInput.value.trim();
        if (key) {
            localStorage.setItem('GEMINI_API_KEY', key);
            GEMINI_API_KEY = key;
            modal.remove();
            // Trigger search again
            document.getElementById('searchBtn').click();
        } else {
            apiKeyInput.style.borderColor = '#e74c3c';
        }
    });
    
    cancelBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    apiKeyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveBtn.click();
        }
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Google Gemini API Integration
async function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');
    const searchWrapper = document.querySelector('.search-wrapper-centered');
    
    // Using Netlify serverless function - no API key needed in browser!
    console.log('🚀 Search initialized - powered by secure serverless function');
    
    const performSearch = async () => {
        const query = searchInput.value.trim();
        
        if (!query) {
            searchResults.classList.remove('active');
            return;
        }
        
        // Show loading state
        searchResults.innerHTML = '<div class="loading">🔍 Searching...</div>';
        searchResults.classList.add('active');
        
        try {
            // Check if we have CV content
            if (!cvText && !cvContextText) {
                throw new Error('CV content not loaded. Please ensure EN-CV-Alodwan.pdf is accessible.');
            }
            
            // Call Netlify serverless function (secure - API key is on server)
            const response = await fetch('/.netlify/functions/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                    cvText: cvText,
                    contextText: cvContextText
                })
            });
            
            if (!response.ok) {
                throw new Error(`Search service error: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                throw new Error('Unexpected response format from API');
            }
            
            const answer = data.candidates[0].content.parts[0].text;
            
            // Display with typewriter effect
            searchResults.innerHTML = '<div class="response typing"><p></p></div>';
            const responseElement = searchResults.querySelector('.response p');
            typeWriter(responseElement, answer, false);
        } catch (error) {
            console.error('Search error:', error);
            searchResults.innerHTML = `<div class="error">❌ Error: ${error.message}. Please try again.</div>`;
        }
    };
    
    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Close results when clicking outside
    document.addEventListener('click', (e) => {
        if (searchWrapper && !searchWrapper.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
