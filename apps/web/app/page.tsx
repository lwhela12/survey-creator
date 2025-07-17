import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: '#F6F4ED' }}>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="warren-hero-title mb-6">
            Warren: <span style={{ color: '#6EAD7C' }}>Your Gateway to Student Voice Insights</span>
          </h1>
          <p className="warren-body-text text-xl mb-8" style={{ color: '#6C757D' }}>
            Dig deeper into student feedback with Warren's intuitive burrow-building tools. 
            Transform your traditional surveys into engaging conversational experiences.
          </p>
          
          <div className="flex justify-center gap-4 mb-16">
            <Link
              href="/builder"
              className="warren-btn-primary"
            >
              Dig New Burrow
            </Link>
            <Link
              href="/survey"
              className="warren-btn-secondary"
            >
              Explore The Den
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="warren-card">
              <div style={{ color: '#6EAD7C' }} className="text-3xl mb-4">🐰</div>
              <h3 className="warren-section-header text-lg mb-2">Build Your Burrow</h3>
              <p className="warren-body-text text-sm">
                Upload your survey script and watch Warren transform it into an interactive conversational burrow.
              </p>
            </div>
            
            <div className="warren-card">
              <div style={{ color: '#6EAD7C' }} className="text-3xl mb-4">🎨</div>
              <h3 className="warren-section-header text-lg mb-2">Customize Your Warren</h3>
              <p className="warren-body-text text-sm">
                Personalize your burrow's appearance with colors, pacing, and branding that matches your institution.
              </p>
            </div>
            
            <div className="warren-card">
              <div style={{ color: '#6EAD7C' }} className="text-3xl mb-4">📊</div>
              <h3 className="warren-section-header text-lg mb-2">Gather in The Den</h3>
              <p className="warren-body-text text-sm">
                Collect and analyze student responses in your centralized den of insights and discoveries.
              </p>
            </div>
          </div>

          <div className="warren-card-large">
            <h2 className="warren-section-header mb-4">How Warren Works</h2>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2" 
                     style={{ 
                       backgroundColor: '#DAEDF0', 
                       color: '#032E46' 
                     }}>1</div>
                <h4 className="warren-body-text font-semibold">Burrow Builder</h4>
                <p className="warren-secondary-text text-sm">Upload your survey script</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2" 
                     style={{ 
                       backgroundColor: '#DAEDF0', 
                       color: '#032E46' 
                     }}>2</div>
                <h4 className="warren-body-text font-semibold">Warren Style</h4>
                <p className="warren-secondary-text text-sm">Customize your burrow's appearance</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2" 
                     style={{ 
                       backgroundColor: '#DAEDF0', 
                       color: '#032E46' 
                     }}>3</div>
                <h4 className="warren-body-text font-semibold">Share Warren</h4>
                <p className="warren-secondary-text text-sm">Get your unique burrow link</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2" 
                     style={{ 
                       backgroundColor: '#DAEDF0', 
                       color: '#032E46' 
                     }}>4</div>
                <h4 className="warren-body-text font-semibold">The Den</h4>
                <p className="warren-secondary-text text-sm">Analyze insights and responses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}