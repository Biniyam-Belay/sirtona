const Consulting = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Technology Consulting
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Strategic technology guidance for your business growth
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Consulting Services</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Technology strategy planning
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Digital transformation
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                System architecture design
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Performance optimization
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Security assessment
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consulting;
