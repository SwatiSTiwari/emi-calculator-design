export default function Header() {
  return (
    <header className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">α</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Alpha</h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Browse
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Finance
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Support
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
