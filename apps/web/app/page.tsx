import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--warren-page-background)' }}>
      {/* Hero Section */}
      <div className="warren-hero-section">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Warren Mascot and Brand */}
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center text-4xl shadow-lg border-4 border-white">
                🐰
              </div>
            </div>
            
            <h1 className="warren-hero-title text-center">
              Warren: <span style={{ color: 'var(--warren-secondary-green)' }}>Your Gateway to Student Voice Insights</span>
            </h1>
            
            <p className="warren-body-text-large text-center mb-8 max-w-3xl mx-auto" style={{ color: 'var(--warren-secondary-text)' }}>
              Transform traditional surveys into engaging conversational experiences. 
              Warren helps educators dig deeper into student feedback with intuitive burrow-building tools that make every voice heard.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Link href="/builder" className="warren-btn-primary">
                <span>🏗️</span>
                Dig New Burrow
              </Link>
              <Link href="/survey" className="warren-btn-secondary">
                <span>🏠</span>
                Explore The Den
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="text-center warren-secondary-text">
              <p className="mb-2">Trusted by educators nationwide</p>
              <div className="flex justify-center items-center gap-6 text-sm">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  K-12 Schools
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Higher Education
                </span>
                <span className="flex items-center gap-1">
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
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="warren-card-feature">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                🐰
              </div>
              <h3 className="warren-section-header text-xl mb-3">Build Your Burrow</h3>
              <p className="warren-body-text">
                Upload your survey script and watch Warren transform it into an interactive conversational experience. 
                No coding required—just educational excellence.
              </p>
            </div>
            <div className="warren-success text-sm">
              <span>✨</span>
              Instant burrow creation
            </div>
          </div>
          
          <div className="warren-card-feature">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                🎨
              </div>
              <h3 className="warren-section-header text-xl mb-3">Customize Your Warren</h3>
              <p className="warren-body-text">
                Personalize your burrow's appearance with colors, pacing, and branding that matches your institution. 
                Make Warren feel like home.
              </p>
            </div>
            <div className="warren-success text-sm">
              <span>🎯</span>
              Brand-aligned design
            </div>
          </div>
          
          <div className="warren-card-feature">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                📊
              </div>
              <h3 className="warren-section-header text-xl mb-3">Gather in The Den</h3>
              <p className="warren-body-text">
                Collect and analyze student responses in your centralized den of insights. 
                Turn conversations into actionable educational improvements.
              </p>
            </div>
            <div className="warren-success text-sm">
              <span>📈</span>
              Real-time analytics
            </div>
          </div>
        </div>

        {/* How Warren Works */}
        <div className="warren-card-large mb-16">
          <div className="text-center mb-12">
            <h2 className="warren-section-header mb-4">How Warren Works</h2>
            <p className="warren-body-text" style={{ color: 'var(--warren-secondary-text)' }}>
              Four simple steps to transform your student feedback process
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-content-center font-bold text-xl mx-auto mb-4 transition-all duration-300 group-hover:scale-110" 
                     style={{ 
                       background: 'var(--warren-gradient-primary)', 
                       color: 'white',
                       boxShadow: 'var(--warren-shadow-md)'
                     }}>1</div>
                <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent"></div>
              </div>
              <h4 className="warren-body-text font-semibold mb-2">📋 Burrow Builder</h4>
              <p className="warren-secondary-text text-sm">Upload your survey script and watch Warren dig your conversational burrow</p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 transition-all duration-300 group-hover:scale-110" 
                     style={{ 
                       background: 'var(--warren-gradient-secondary)', 
                       color: 'white',
                       boxShadow: 'var(--warren-shadow-md)'
                     }}>2</div>
                <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-gradient-to-r from-green-200 to-transparent"></div>
              </div>
              <h4 className="warren-body-text font-semibold mb-2">🎨 Warren Style</h4>
              <p className="warren-secondary-text text-sm">Customize colors, pacing, and branding to match your institution</p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 transition-all duration-300 group-hover:scale-110" 
                     style={{ 
                       background: 'var(--warren-gradient-primary)', 
                       color: 'white',
                       boxShadow: 'var(--warren-shadow-md)'
                     }}>3</div>
                <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent"></div>
              </div>
              <h4 className="warren-body-text font-semibold mb-2">🔗 Share Warren</h4>
              <p className="warren-secondary-text text-sm">Get your unique burrow link and share with students instantly</p>
            </div>
            
            <div className="text-center group">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 transition-all duration-300 group-hover:scale-110" 
                     style={{ 
                       background: 'var(--warren-gradient-secondary)', 
                       color: 'white',
                       boxShadow: 'var(--warren-shadow-md)'
                     }}>4</div>
              </div>
              <h4 className="warren-body-text font-semibold mb-2">🏠 The Den</h4>
              <p className="warren-secondary-text text-sm">Analyze insights and responses in your centralized dashboard</p>
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
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="warren-body-text font-semibold mb-1">Higher Response Rates</h4>
                  <p className="warren-secondary-text text-sm">Conversational format increases student engagement by 3x compared to traditional surveys</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="warren-body-text font-semibold mb-1">Deeper Insights</h4>
                  <p className="warren-secondary-text text-sm">Students provide more thoughtful, detailed responses in Warren's friendly environment</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="warren-body-text font-semibold mb-1">Easy Setup</h4>
                  <p className="warren-secondary-text text-sm">From spreadsheet to live survey in minutes. No technical expertise required</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0 mt-1">
                  ✓
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
                  <span className="text-xl">🐰</span>
                  <span className="font-semibold">Warren</span>
                </div>
              </div>
              
              <div className="warren-chat-messages">
                <div className="warren-message-bot">
                  <p>Hi there! I'm Warren, and I'm excited to learn about your experience this semester. This will only take a few minutes. Ready to start? 🐰</p>
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
              <Link href="/survey/demo" className="warren-btn-secondary">
                <span>🎮</span>
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
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
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
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
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
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
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
        <div className="warren-card-large text-center bg-gradient-to-br from-blue-50 to-green-50">
          <h3 className="warren-section-header mb-4">Ready to Transform Your Student Feedback?</h3>
          <p className="warren-body-text mb-8 max-w-2xl mx-auto" style={{ color: 'var(--warren-secondary-text)' }}>
            Join thousands of educators who are already using Warren to create more engaging, 
            insightful conversations with their students.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <Link href="/builder" className="warren-btn-primary">
              <span>🚀</span>
              Start Building Today
            </Link>
            <Link href="/demo" className="warren-btn-secondary">
              <span>📖</span>
              View Documentation
            </Link>
          </div>
          
          <div className="warren-secondary-text text-sm">
            <p className="flex items-center justify-center gap-2">
              <span>🔒</span>
              Free to start • No credit card required • FERPA compliant
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}