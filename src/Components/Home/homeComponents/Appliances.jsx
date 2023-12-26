import React, { useEffect, useState } from "react";
import {
  Box,
  Alert,
  SkeletonCircle,
  SkeletonText,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Img,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import "./fashion.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";

const Appliances = () => {
  const [appliances, setAppliances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const PreviousBtn = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <h1 style={{ color: "black", fontSize: "25px" }}>
          {" "}
          <GrFormPrevious />{" "}
        </h1>
      </div>
    );
  };
  const NextBtn = (props) => {
    const { className, onClick } = props;
    return (
      <Box className={className} onClick={onClick}>
        <h1 style={{ fontWeight: "bolder", fontSize: "25px", color: "black" }}>
          {" "}
          <GrFormNext />{" "}
        </h1>
      </Box>
    );
  };

  var settings = {
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const getFashion = () => {
    setLoading(true);
    fetch("https://flipkart-data-h5tg.onrender.com/all")
      .then((res) => res.json())
      .then((res) => setAppliances(res))
      .catch((err) => setError(true))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getFashion();
  }, []);

  if (loading) {
    return (
      <>
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="100" />
          <SkeletonText mt="4" noOfLines={8} spacing="4" />
        </Box>
      </>
    );
  }
  if (error) {
    return (
      <>
        <Alert status="error" w="70%" m="auto" textAlign={"center"}>
          <AlertIcon />
          <AlertTitle>Opps!</AlertTitle>
          <AlertDescription>Please Refresh and try again.</AlertDescription>
        </Alert>
      </>
    );
  }
  return (
    <Box
      mt="10px"
      boxShadow="rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"
      p="1"
      bg="white"
    >
      <Box
        display={"flex"}
        width="100%"
        padding={"0 20px"}
        justifyContent={"space-between"}
        m="auto"
        textAlign={"center"}
        className="dealsBox"
      >
        <Text
          paddingTop={{ base: "120px", md: "120px", lg: "20px" }}
          fontSize={{ base: "10px", md: "20px", lg: "30px" }}
        >
          {" "}
          Appliances Top Deals
        </Text>

        <WrapItem pt="20px">
          <Button
            fontSize={{ base: "6px", md: "9px", lg: "12px" }}
            mt="25%"
            colorScheme="messenger"
          >
            <NavLink to="./products/appliances">VIEW ALL </NavLink>
          </Button>
        </WrapItem>
      </Box>
      <Box
        w={{ base: "80%", md: "75%", lg: "100%" }}
        m="auto"
        className="OffSlider"
      >
        <Slider {...settings}>
          {appliances
            .filter((item) => item.category_name === "appliances")
            .map((item, index) => (
              <NavLink to={`/products/view/${item.item_id}`} key={index}>
                <Box m="5px" alignItems="center" textAlign={"center"}>
                  <Img
                    maxWidth="190px"
                    h="200px"
                    m="auto"
                    _hover={{ transform: "scale(1.1)", transition: "600ms" }}
                    p="10px"
                    src={item.image}
                    alt=""
                  />
                  <Text
                    fontWeight="500"
                    p="5px"
                    fontSize={{ base: "13px", md: "12px", lg: "14px" }}
                  >
                    {" "}
                    {item.description}
                  </Text>

                  <Text
                    fontWeight={"medium"}
                    mt="8px"
                    fontSize={{ base: "13px", md: "14px", lg: "15px" }}
                    color={"green"}
                  >
                    Under ₹ {item.old_price}
                  </Text>
                </Box>
              </NavLink>
            ))}
        </Slider>
      </Box>
      {/* mobile version */}
      <Box
        display={{ base: "block", md: "none", lg: "none" }}
        bg="orange"
        backgroundImage={
          "https://rukminim1.flixcart.com/fk-p-reco/850/200/images/Reco_BDS_9be2e3.jpg?q=90"
        }
        p="10px"
      >
        <Box
          mb="20px"
          mt="10px"
          alignItems={"center"}
          display="flex"
          justifyContent={"space-between"}
        >
          {" "}
          <Text fontSize={"19px"}> Appliances Top Deals</Text>{" "}
          <Button size="sm" colorScheme="messenger">
            View All
          </Button>
        </Box>
        <Box
          className="itemGrid"
          display={{ base: "grid", md: "none", lg: "none" }}
        >
          {appliances
            .filter((item) => item.category_name === "appliances")
            .map((item, index) => (
              <NavLink
                to={`/products/view/${item.item_id}`}
                key={index + Math.random()}
              >
                <Box
                  m="5px"
                  borderRadius="6px"
                  bg="white"
                  alignItems="center"
                  textAlign={"center"}
                  border="1px solid silver"
                >
                  <Img
                    maxWidth="150px"
                    h="150px"
                    m="auto"
                    _hover={{ transform: "scale(1.1)", transition: "400ms" }}
                    p="10px"
                    src={item.image}
                    alt=""
                  />
                  <Text fontWeight="500" p="5px">
                    {" "}
                    {item.description}
                  </Text>

                  <Text pb="10px" fontWeight={"medium"} color={"green"}>
                    Under ₹ {item.old_price}
                  </Text>
                </Box>
              </NavLink>
            ))}
        </Box>
      </Box>
      {/* mobile version end */}
    </Box>
  );
};

export default Appliances;
