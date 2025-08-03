const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <p>© {currentYear} Your Company Name. All Rights Reserved.</p>
        <p className="text-gray-400 mt-2">Empowering Ethiopian SMEs</p>
      </div>
    </footer>
  );
};

export default Footer;