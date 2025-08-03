const MobileApps = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Mobile App Development
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Native and cross-platform mobile applications for iOS and Android
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mobile Solutions</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                React Native development
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Flutter applications
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Native iOS and Android apps
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                App Store optimization
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Maintenance and updates
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileApps;
