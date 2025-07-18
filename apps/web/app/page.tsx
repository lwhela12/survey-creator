'use client';
import Link from "next/link";
import { Hammer, Palette, BarChart3, Check, Star, Gamepad2, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="warren-hero-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Nesolagus Logo */}
            <div className="mb-8 flex justify-center">
              <img 
                src="/NesolagusLogo.png" 
                alt="Nesolagus Logo" 
                className="w-6 h-6 object-contain transition-all duration-300 hover:scale-105"
              />
            </div>
            
            <h1 className="warren-hero-title text-center mb-6">
              Warren
            </h1>
            
            <p className="text-lg text-center mb-8 max-w-2xl mx-auto text-gray-600">
              Transform traditional surveys into engaging conversational experiences. 
              Powered by Nesolagus, Warren helps educators create meaningful student feedback systems.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link href="/builder" className="warren-btn-primary">
                Get Started
              </Link>
              <Link href="/survey" className="warren-btn-secondary">
                View Demo
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="text-center">
              <p className="warren-secondary-text mb-4">Trusted by educators nationwide</p>
              <div className="flex justify-center items-center gap-8 text-sm">
                <span className="flex items-center gap-2 warren-secondary-text">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  K-12 Schools
                </span>
                <span className="flex items-center gap-2 warren-secondary-text">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Higher Education
                </span>
                <span className="flex items-center gap-2 warren-secondary-text">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Non-Profits
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Feature Cards */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="warren-section-header mb-4">Why Choose Warren?</h2>
            <p className="warren-body-text max-w-2xl mx-auto" style={{ color: 'var(--warren-secondary-text)' }}>
              Built by educators, for educators. Create engaging survey experiences that students actually want to complete.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="warren-card-feature">
              <div className="mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Hammer className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="warren-section-header text-lg mb-3">Easy to Build</h3>
                <p className="warren-body-text text-sm" style={{ color: 'var(--warren-secondary-text)' }}>
                  Upload your survey script and watch Warren transform it into an interactive conversational experience. 
                  No coding required.
                </p>
              </div>
            </div>
            
            <div className="warren-card-feature">
              <div className="mb-6">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="warren-section-header text-lg mb-3">Fully Customizable</h3>
                <p className="warren-body-text text-sm" style={{ color: 'var(--warren-secondary-text)' }}>
                  Personalize your survey's appearance with colors, pacing, and branding that matches your institution.
                </p>
              </div>
            </div>
            
            <div className="warren-card-feature">
              <div className="mb-6">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="warren-section-header text-lg mb-3">Actionable Insights</h3>
                <p className="warren-body-text text-sm" style={{ color: 'var(--warren-secondary-text)' }}>
                  Collect and analyze student responses in your centralized dashboard. 
                  Turn conversations into improvements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How Warren Works */}
        <div className="warren-card-large mb-16">
          <div className="text-center mb-12">
            <h2 className="warren-section-header mb-4">How It Works</h2>
            <p className="warren-body-text max-w-2xl mx-auto" style={{ color: 'var(--warren-secondary-text)' }}>
              Three simple steps to transform your student feedback process
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg mx-auto mb-4 transition-all duration-300 group-hover:scale-105" 
                     style={{ 
                       background: 'var(--warren-gradient-primary)', 
                       color: 'white',
                       boxShadow: 'var(--warren-shadow-sm)'
                     }}>1</div>
              </div>
              <h4 className="warren-body-text font-semibold mb-2">Upload & Build</h4>
              <p className="warren-secondary-text text-sm">Upload your survey script and watch Warren create your conversational experience</p>
            </div>
            
            <div className="text-center group">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg mx-auto mb-4 transition-all duration-300 group-hover:scale-105" 
                     style={{ 
                       background: 'var(--warren-gradient-secondary)', 
                       color: 'white',
                       boxShadow: 'var(--warren-shadow-sm)'
                     }}>2</div>
              </div>
              <h4 className="warren-body-text font-semibold mb-2">Customize & Share</h4>
              <p className="warren-secondary-text text-sm">Personalize your survey's appearance and share with students instantly</p>
            </div>
            
            <div className="text-center group">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg mx-auto mb-4 transition-all duration-300 group-hover:scale-105" 
                     style={{ 
                       background: 'var(--warren-gradient-primary)', 
                       color: 'white',
                       boxShadow: 'var(--warren-shadow-sm)'
                     }}>3</div>
              </div>
              <h4 className="warren-body-text font-semibold mb-2">Analyze & Act</h4>
              <p className="warren-secondary-text text-sm">Review insights and responses in your centralized dashboard</p>
            </div>
          </div>
        </div>

        {/* Features Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Side - Benefits */}
          <div className="warren-card-large">
            <h3 className="warren-section-header mb-6">Why Educators Choose Warren</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="warren-body-text font-semibold mb-1">Higher Response Rates</h4>
                  <p className="warren-secondary-text text-sm">Conversational format increases student engagement by 3x compared to traditional surveys</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="warren-body-text font-semibold mb-1">Deeper Insights</h4>
                  <p className="warren-secondary-text text-sm">Students provide more thoughtful, detailed responses in Warren's friendly environment</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="warren-body-text font-semibold mb-1">Easy Setup</h4>
                  <p className="warren-secondary-text text-sm">From spreadsheet to live survey in minutes. No technical expertise required</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="warren-body-text font-semibold mb-1">Privacy First</h4>
                  <p className="warren-secondary-text text-sm">Student data stays secure with enterprise-grade privacy protection</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Demo Preview */}
          <div className="warren-card-large bg-gradient-to-br from-blue-50 to-green-50">
            <h3 className="warren-section-header mb-6">See Warren in Action</h3>
            
            {/* Mock Chat Interface */}
            <div className="warren-chat-container">
              <div className="warren-chat-header">
                <div className="flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5 text-gray-700" />
                  <span className="font-semibold">Warren</span>
                </div>
              </div>
              
              <div className="warren-chat-messages">
                <div className="warren-message-bot">
                  <p>Hi there! I'm Warren, and I'm excited to learn about your experience this semester. This will only take a few minutes. Ready to start?</p>
                </div>
                
                <div className="warren-message-user">
                  <p>Sure, let's do this!</p>
                </div>
                
                <div className="warren-message-bot">
                  <p>Great! What's been your favorite part of this course so far?</p>
                </div>
                
                <div className="warren-typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              
              <div className="warren-chat-input-area">
                <div className="warren-input" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: 'var(--warren-placeholder-text)',
                  cursor: 'default'
                }}>
                  Type your response here...
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/survey/demo" className="warren-btn-secondary flex items-center justify-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                Try Interactive Demo
              </Link>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="warren-card-large mb-16 text-center">
          <h3 className="warren-section-header mb-8">What Educators Are Saying</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg border border-gray-100">
              <div className="mb-4">
                <div className="flex justify-center mb-2">
                  <div className="flex justify-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
                <p className="warren-body-text text-sm italic mb-4">
                  "Warren transformed how we collect student feedback. Our response rates went from 30% to 85%!"
                </p>
              </div>
              <div className="warren-secondary-text text-xs">
                <strong>Dr. Sarah Johnson</strong><br/>
                Lincoln Middle School
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-lg border border-gray-100">
              <div className="mb-4">
                <div className="flex justify-center mb-2">
                  <div className="flex justify-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
                <p className="warren-body-text text-sm italic mb-4">
                  "Students actually enjoy giving feedback now. The conversational approach feels more personal."
                </p>
              </div>
              <div className="warren-secondary-text text-xs">
                <strong>Prof. Michael Chen</strong><br/>
                State University
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-lg border border-gray-100">
              <div className="mb-4">
                <div className="flex justify-center mb-2">
                  <div className="flex justify-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
                <p className="warren-body-text text-sm italic mb-4">
                  "Setup was incredibly easy. We had our first Warren survey running in under 10 minutes."
                </p>
              </div>
              <div className="warren-secondary-text text-xs">
                <strong>Lisa Rodriguez</strong><br/>
                Sunshine Elementary
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="warren-card-large text-center">
          <h3 className="warren-section-header mb-4">Ready to Get Started?</h3>
          <p className="warren-body-text mb-8 max-w-xl mx-auto" style={{ color: 'var(--warren-secondary-text)' }}>
            Join educators who are creating more engaging student feedback experiences with Warren.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <Link href="/builder" className="warren-btn-primary">
              Start Building
            </Link>
            <Link href="/survey" className="warren-btn-secondary">
              View Demo
            </Link>
          </div>
          
          <div className="warren-secondary-text text-sm">
            <p className="flex items-center justify-center gap-2">
              Free to start • No credit card required • FERPA compliant
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}