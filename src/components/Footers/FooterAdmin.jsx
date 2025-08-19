export default function FooterAdmin() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 z-10 py-2 bg-white bg-opacity-80 backdrop-blur-sm">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-600">
            © {new Date().getFullYear()} MaKarte - Portail Géospatial
          </div>
          <div className="text-xs text-gray-600">
            Département du Mfoundi, Cameroun
          </div>
        </div>
      </div>
    </footer>
  );
}