import React from 'react';

import icon from '../assets/icon.png';
import { Helmet } from 'react-helmet';

import { MessageSquare, Image, Zap, Shield, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#121212] font-sans text-gray-200">
            <Helmet>
                <meta name="description" content="Welcome to Mindora, your AI-powered assistant for content creation." />
                <meta name="keywords" content="AI, content creation, chatbot, Mindora" />
                <meta name="author" content="Mayank Sahu" />
                <meta property="og:title" content="Mindora - AI Content Creation" />
                <meta property="og:description" content="Welcome to Mindora, your AI-powered assistant for content creation." />
                
                <meta property="og:url" content="https://www.linkedin.com/in/mayank-sahu-mayanksahu/" />
                
            </Helmet>


            <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
                {/* Background SVGs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-1/2 -right-1/2 w-[100rem] h-[100rem] bg-gradient-to-b from-purple-500/10 to-transparent rounded-full blur-3xl" />
                    <div className="absolute -bottom-1/2 -left-1/2 w-[100rem] h-[100rem] bg-gradient-to-t from-blue-500/10 to-transparent rounded-full blur-3xl" />
                    <svg className="absolute top-0 left-0 w-full h-[40rem] opacity-20" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <div className="bg-purple-500/20 p-2 rounded-2xl animate-bounce-slow">
                                <img className="w-10 h-10 text-purple-400" src={icon} alt="" />
                               
                            </div>
                            <span className=" text-gradient text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text  animate-bounce-slow  ">
                                Mindora
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
                            Generate Text & Images with
                            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> AI Magic</span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-8 animate-slide-up-delayed max-w-2xl mx-auto">
                            Transform your ideas into stunning visuals and compelling content with our advanced AI chatbot.
                            Fast, creative, and incredibly accurate.
                        </p>
                        <button 
                            onClick={() => navigate('/chat')}
                        className="group p-6 bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-800 
            hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10
            animate-slide-up-delayed-2 inline-flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-500/20 rounded-2xl flex items-center justify-center
              group-hover:scale-110 transition-transform duration-300">
                                <MessageSquare className="w-5 h-5 text-purple-400" />
                            </div>
                            <span className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                                Start Chatting
                            </span>
                        </button>
                    </div>
                </div>

                {/* Features Section */}
                <div className="relative py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Everything you need in one place
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <FeatureCard
                                icon={<MessageSquare className="w-6 h-6 text-purple-400" />}
                                title="Natural Conversations"
                                description="Chat naturally with our AI to generate exactly what you need. No complex prompts required."
                            />
                            <FeatureCard
                                icon={<Image className="w-6 h-6 text-purple-400" />}
                                title="Image Generation"
                                description="Create stunning visuals from simple text descriptions. Perfect for any creative project."
                            />
                            <FeatureCard
                                icon={<Zap className="w-6 h-6 text-purple-400" />}
                                title="Lightning Fast"
                                description="Get results in seconds. No more waiting around for your creative content."
                            />
                            <FeatureCard
                                icon={<Shield className="w-6 h-6 text-purple-400" />}
                                title="Secure & Private"
                                description="Your data and conversations are always protected with enterprise-grade security."
                            />
                        </div>
                    </div>
                </div>

                {/* Social Proof */}
                <div className="relative py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-8">
                            Trusted by creators worldwide
                        </p>
                        <div className="flex flex-wrap justify-center gap-8 opacity-75">
                            {['Adobe', 'Figma', 'Canva', 'Notion', 'Slack'].map((brand) => (
                                <span key={brand} className="text-xl font-bold text-gray-500 hover:text-gray-400 transition-colors">
                                    {brand}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                </div>
                <p className="text-center font-mono text-sm font-semibold text-purple-400 uppercase tracking-wide p-5">
                    Build by <a href="https://www.linkedin.com/in/mayank-sahu-mayanksahu/" target="_blank" rel="noopener noreferrer" className="underline text-purple-100 hover:text-purple-300 ">Mayank Sahu</a> 🧑‍💻
                </p>
            </div>
                            
        </div>
    );
};

export default LandingPage;

function FeatureCard({ icon, title, description }) {
    return (
        <div className="group p-6 bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-800 
      hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
            <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4 
        group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {title}
            </h3>
            <p className="text-gray-400">
                {description}
            </p>
        </div>
    );
}