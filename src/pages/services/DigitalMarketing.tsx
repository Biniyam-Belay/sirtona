const DigitalMarketing = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Digital Marketing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Grow your online presence and reach your target audience
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Marketing Services</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Social media marketing
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Search engine optimization (SEO)
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Pay-per-click (PPC) advertising
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Content marketing
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Email marketing campaigns
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalMarketing;
