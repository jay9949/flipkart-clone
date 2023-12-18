import { Box, useMediaQuery } from "@chakra-ui/react";
import AllRoutes from "./Components/AllRoutes";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/navbar";

function App() {
  const [isLargerThan720] = useMediaQuery("(min-width: 720px)");
  return (
    <Box>
      <Navbar />
      <AllRoutes />
      <Footer />
    </Box>
  );
}

export default App;
