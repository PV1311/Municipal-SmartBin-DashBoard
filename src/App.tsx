import { AlertTriangle, BarChart3, MapPin, Menu, X } from "lucide-react";
import React, { useRef, useState } from "react";
import BinDetails from "./components/BinDetails";
import Dashboard from "./components/Dashboard";
import LocationSelector from "./components/LocationSelector";
import Map from "./components/Map";
import WasteReport from "./components/WasteReport";
import { getCityBins } from "./services/mockData";
import { SmartBin } from "./types/bin";

function App() {
  const [selectedBin, setSelectedBin] = useState<SmartBin | null>(null);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [bins, setBins] = useState<SmartBin[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleLocationChange = (state: string, city: string) => {
    setSelectedState(state);
    setSelectedCity(city);
    if (city) {
      const cityBins = getCityBins(city);
      setBins(cityBins);
    } else {
      setBins([]);
    }
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    setMenuOpen(false);
    if (ref === statsRef && bins.length === 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <nav
        className="fixed top-0 left-0 right-0 z-50 shadow-lg flex items-center justify-between px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#16a34a", height: "64px" }}
      >
        {/* Logo and Title Section */}
        <div
          className={`flex items-center gap-3 sm:gap-6 ${
            menuOpen ? "invisible lg:visible" : "visible"
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-green-600"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <path d="M12 3v18" />
              <path d="M3 8h18" />
              <path d="M12 21l9-5" />
              <path d="M12 21l-9-5" />
            </svg>
          </div>
          <span className="font-bold text-xl sm:text-2xl text-white">
            EcoSmart Bins
          </span>
        </div>

        {/* Hamburger Menu */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-8">
          <button
            onClick={() => scrollToSection(mapRef)}
            className="flex items-center gap-2 text-white text-lg hover:text-green-200 transition-colors"
          >
            <MapPin size={20} />
            Active Bins
          </button>
          <button
            onClick={() => scrollToSection(statsRef)}
            className="flex items-center gap-2 text-white text-lg hover:text-green-200 transition-colors"
          >
            <BarChart3 size={20} />
            Statistics
          </button>
          <button
            onClick={() => scrollToSection(reportRef)}
            className="flex items-center gap-2 text-white text-lg hover:text-green-200 transition-colors"
          >
            <AlertTriangle size={20} />
            Report Waste
          </button>
        </div>
      </nav>

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-green-600 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden z-50`}
      >
        <div className="flex justify-between items-center p-4 border-b border-green-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-green-600"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <path d="M12 3v18" />
                <path d="M3 8h18" />
                <path d="M12 21l9-5" />
                <path d="M12 21l-9-5" />
              </svg>
            </div>
            <span className="font-bold text-xl text-white">EcoSmart Bins</span>
          </div>
          <button className="text-white p-2" onClick={() => setMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          <button
            onClick={() => scrollToSection(mapRef)}
            className="flex items-center gap-2 text-white text-lg hover:bg-green-700 transition-colors p-2 rounded-md"
          >
            <MapPin size={20} />
            Active Bins
          </button>
          <button
            onClick={() => scrollToSection(statsRef)}
            className="flex items-center gap-2 text-white text-lg hover:bg-green-700 transition-colors p-2 rounded-md"
          >
            <BarChart3 size={20} />
            Statistics
          </button>
          <button
            onClick={() => scrollToSection(reportRef)}
            className="flex items-center gap-2 text-white text-lg hover:bg-green-700 transition-colors p-2 rounded-md"
          >
            <AlertTriangle size={20} />
            Report Waste
          </button>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      <header
        className="relative h-screen mt-16 overflow-hidden"
        style={{
          height: "100vh",
          clipPath: "polygon(0 0, 100% 0, 100% 75vh, 0 100%)",
          position: "relative",
          zIndex: "0",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://media-hosting.imagekit.io//ae0041647e024eea/main_BG.avif?Expires=1831657900&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=PhKpwxPRXCEAsSVJkS-ODRn~YIuH2xBombUG0VNs4BDRphJtonmqJ~JtMqMJ4C1orCVsErL4VjxxMccxFXVg~-14jwmBDa1YIOPuV89mtenLvKlNjadrFE0b2qimKfpJw9X5ufVlkvQLZdrPvY~~dmWXDakuQ4ON7ncQc-yI7SJsOvZ6VSBvR7hU5frE6qYMgqpX~Y1T27QUm1M~oDs3SU9AMezi5g2np-55MEXI6W3VAbKERghpLtD4SnL7Gie0buswAQflbdFgAV7nkTO29W0VQmami6L5RV9EU7P7bWDnXnC--rS790BBqlEDH2es3E8Fy7TPVel3Z8adxmHrig__")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: "-2",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, #4ade80, #86efac)",
              opacity: 0.85,
            }}
          />
        </div>
        <div
          className="max-w-full mx-auto px-4 relative z-10 h-full flex items-center justify-center"
          style={{ height: "70%" }}
        >
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
              Municipal Smart Bin Dashboard
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-green-100">
              Building a cleaner tomorrow through smart waste management
            </p>
          </div>
        </div>
      </header>

      <main
        className="relative bg-fixed"
        style={{
          marginTop: "-25vh",
          background:
            'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("https://media-hosting.imagekit.io//42db7bb87cef438f/SEC_BG.avif?Expires=1831657900&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=QPOOVtWo0bgIKCGFq2R1qpfGBGY8iRfKDxiTc~Fmow68QPT-zId4a~euRSUMIEoHpPv7wRJ1qwgfwa77WLTagiNE5hrcUyGZvQy8TlSADLt2bMByZ0o5lYXPimkOEOgHMremZ8zd41SpN3dXcwk8XjimBRNovugVLQp-~tZwiBtN7YtjS2suWOMyjsNOq7S-9WOC-CXsmSgZMoBFwIhL2wZkkfXvXHrEOe-EcSm3GymVhYBnd7bgEYd8XnRCI9G06gEXLRG1vSXPzAta1oHaHDSU0Q24lt-4ivnfI35fJJ~Bd9pE-yuGq8cVerkhsXIaADM9KdCVSkleLQstR7YcCQ__") center/cover',
        }}
      >
        <div className="max-w-full mx-auto px-4 py-32 space-y-24">
          <div ref={mapRef} className="scroll-mt-24">
            <div
              className="px-12 py-6 rounded-lg mb-8"
              style={{ backgroundColor: "rgb(255 255 255 / 40%)" }}
            >
              <h2 className="text-4xl font-bold text-center text-green-700">
                Active Bins
              </h2>
            </div>
            <div
              className="bg-white/95 p-8 rounded-lg shadow-lg backdrop-blur-sm"
              style={{ width: "86%", margin: "0 auto" }}
            >
              <LocationSelector onLocationChange={handleLocationChange} />
              <div className="h-[700px] relative mt-6">
                <Map bins={bins} onBinClick={setSelectedBin} />
              </div>
            </div>
          </div>

          {selectedBin && (
            <div className="bg-white/95 p-8 rounded-lg shadow-lg backdrop-blur-sm">
              <BinDetails bin={selectedBin} />
            </div>
          )}
          {bins.length > 0 && (
            <div ref={statsRef} className="scroll-mt-24">
              <div
                className="px-12 py-6 rounded-lg mb-8"
                style={{ backgroundColor: "rgb(255 255 255 / 40%)" }}
              >
                <h2 className="text-4xl font-bold text-center text-green-700">
                  Area Statistics
                </h2>
              </div>
              <Dashboard bins={bins} />
            </div>
          )}

          <div ref={reportRef} className="scroll-mt-24">
            <div
              className="px-12 py-6 rounded-lg mb-8"
              style={{ backgroundColor: "rgb(255 255 255 / 40%)" }}
            >
              <h2 className="text-4xl font-bold text-center text-green-700">
                Report Waste in Your Area
              </h2>
            </div>
            <WasteReport
              selectedState={selectedState}
              selectedCity={selectedCity}
            />
          </div>
        </div>
      </main>

      {/* Alert */}
      {showAlert && (
        <div
          className="fixed top-20 left-1/2 transform -translate-x-1/2 px-8 py-4 rounded-lg shadow-md text-black text-lg"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "2px solid yellow",
          }}
        >
          Please select state and city in Active Bins First
        </div>
      )}
    </div>
  );
}

export default App;
