const Ecommerce = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            E-commerce Solutions
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Complete online store solutions to grow your business
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">E-commerce Features</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Custom online stores
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Payment gateway integration
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Inventory management
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Order tracking system
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Multi-vendor marketplace
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
