import { isLoggedInAtom } from "@/atoms/auth";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import Industry from "../../public/images/6206496741272960533.jpg";
import Industry1 from "../../public/images/pikaso_texttoimage_35mm-film-photography-A-futuristic-green-industry- (1).jpeg";
import Industry2 from "../../public/images/pikaso_texttoimage_view_of_a_hightech_green_industry_landscape_with.jpeg";
import { button } from "react"; // Import the button component from react library

export default function HomePage() {
  const navigate = useNavigate();
  const [isLoggedin] = useAtom(isLoggedInAtom);

  const handleSubmit = () => {
    if (isLoggedin) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#0C1404] to-[#23380A] min-h-screen text-[#bcc7ae] font-sans">
      <header className="flex justify-between items-center p-6">
      <div className="text-2xl text-white font-bold">Wormhole Offset</div>
        <nav className="flex space-x-8">
          <a href="#" className="uppercase">
            About Us
          </a>
          <a href="#" className="hover:text-[#8DBF5D] uppercase">
            Services
          </a>
          <a href="#" className="hover:text-[#8DBF5D] uppercase">
            Our Projects
          </a>
          <a href="#" className="hover:text-[#8DBF5D] uppercase">
            Contacts
          </a>
        </nav>
        <button
          className="px-4 py-2 text-[#8DBF5D] hover:bg-[#8DBF5D] hover:text-white"
          onClick={handleSubmit}
        >
          Login
        </button>
      </header>

      {/* Hero Section */}
      {/* <section className="flex flex-col items-center text-center mt-10 px-4">
        <h1 className="text-7xl mb-6 text-white">
          SMART RENEWABLE <br /> ENERGY SOLUTIONS
        </h1>
      </section> */}

      {/* Image and Statistics Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-[10rem] p-6 mt-16">
  <div className="flex flex-col">
    <h1 className="text-7xl mb-6 text-white mt-[8rem]">
      <span className="font-bold">SOURCE VERIFIED</span>{" "}
      <span className="text-[#64a733] font-bold">CARBON OFFSETTING</span>
    </h1>
    <div className="flex space-x-4 mt-6">
      <button className="px-6 py-3 bg-[rgb(81,162,2)] text-white font-semibold rounded-lg hover:bg-[#64a733] transition duration-300">
        Get Started
      </button>
      <button className="px-6 py-3 border-2 border-[#8DBF5D] text-[#8DBF5D] font-bold rounded-lg hover:bg-[#8DBF5D] hover:text-white transition duration-300">
        Learn More
      </button>
    </div>
  </div>
  <div className="relative">
    <img
      src={Industry}
      alt="Solar project"
      className="w-[90rem] h-[40rem] object-cover rounded-lg"
    />
  </div>
</section>

      {/* About Us Section */}
      <div className="px-4 py-10 mt-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Image on the left */}
          <div className="md:col-span-1">
            <img
              src={Industry2}
              alt="Solar Panels"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Stats in the middle */}
          <div className="md:col-span-1 flex flex-col justify-center items-center space-y-8">
            {/* Text Blocks */}
            <div className="flex flex-row justify-between w-full space-x-8">
              <div className="text-center flex-1">
                <h2 className="text-6xl text-[#8DBF5D]">7</h2>
                <p className="text-lg">Years of experience</p>
              </div>

              <div className="text-center flex-1">
                <h2 className="text-6xl text-[#8DBF5D]">553</h2>
                <p className="text-lg">Hectares total area of power</p>
              </div>

              <div className="text-center flex-1">
                <h2 className="text-6xl text-[#8DBF5D]">14</h2>
                <p className="text-lg">Megawatts capacity</p>
              </div>
            </div>

            {/* Image Block */}
            <div className="w-full">
              <img
                src={Industry1}
                alt="Solar Panels"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Description on the right */}
          <div className="md:col-span-1 flex flex-col justify-center">
            <h3 className="text-3xl text-right mb-40">ABOUT US</h3>
            <p className="text-lg">
              Wormhole Offset leverages the power of Wormhole’s cross-chain technology to create a transparent, efficient, and interoperable carbon offsetting platform. By integrating innovative IoT solutions with multi-chain capabilities, our project ensures reliable tracking, verification, and seamless management of carbon offsets across various blockchain networks. Our mission is to drive sustainability by enabling businesses and individuals to contribute to carbon reduction efforts with ease, paving the way for a greener and more interconnected future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
