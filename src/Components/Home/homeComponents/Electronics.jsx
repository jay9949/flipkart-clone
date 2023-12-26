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
  Flex,
} from "@chakra-ui/react";
import "./fashion.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";

const Electronics = () => {
  const [electronics, setElectronics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const PreviousBtn = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <h1 style={{ color: "black", fontSize: "45px" }}>
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
        <h1 style={{ fontWeight: "bolder", fontSize: "45px", color: "black" }}>
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
          slidesToShow: 2,
          slidesToScroll: 2,
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
      .then((res) => setElectronics(res))
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
    <div>
      <Box
        mt="20px"
        boxShadow="rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"
        p="1"
        bg="white"
      >
        <Box
          display={"flex"}
          width="100%"
          justifyContent={"space-between"}
          p={"0 20px"}
          textAlign={"center"}
          className="dealsBox"
        >
          <Text
            paddingTop={{ base: "120px", md: "120px", lg: "40px" }}
            fontSize={{ base: "10px", md: "20px", lg: "30px" }}
          >
            {" "}
            Best Of Electronics
          </Text>

          <WrapItem pt="20px">
            <Button
              fontSize={{ base: "6px", md: "9px", lg: "12px" }}
              mt="20%"
              colorScheme="messenger"
            >
              <NavLink to={`/products/electronics`}>VIEW ALL</NavLink>
            </Button>
          </WrapItem>
        </Box>
        <Box
          w={{ base: "80%", md: "75%", lg: "100%" }}
          m="auto"
          className="OffSlider"
        >
          <Slider {...settings}>
            {electronics
              .filter((item) => item.category_name === "electronics")
              .map((item) => (
                <NavLink
                  to={`/products/view/${item.item_id}`}
                  key={Date.now() + item.item_id + Math.random()}
                >
                  <Box m="5px" alignItems="center" textAlign={"center"}>
                    <Img
                      maxWidth="210px"
                      h="210px"
                      m="auto"
                      _hover={{ transform: "scale(1.1)", transition: "400ms" }}
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
                    <Flex
                      textAlign={"center"}
                      justifyContent={"space-around"}
                      w="50%"
                      m="auto"
                    >
                      <Text fontSize={"15px"} fontWeight={"600"}>
                        {" "}
                        ₹ {item.new_price}
                      </Text>
                      <Text fontSize={"12px"}>
                        <del> ₹ {item.old_price}</del>
                      </Text>
                    </Flex>

                    <Text
                      mt="8px"
                      fontSize={{ base: "13px", md: "14px", lg: "15px" }}
                      fontWeight={"medium"}
                      color={"green"}
                      mb="-40px"
                    >
                      {" "}
                      {item.discount} % Off
                    </Text>
                  </Box>
                </NavLink>
              ))}
          </Slider>
        </Box>
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
          <Text fontWeight={"600"} fontSize="19px">
            {" "}
            Best Of Electronics
          </Text>{" "}
          <Button size="sm" colorScheme="messenger">
            View All
          </Button>
        </Box>
        <Box
          className="itemGrid"
          display={{ base: "grid", md: "none", lg: "none" }}
        >
          {electronics
            .filter((item) => item.category_name === "electronics")
            .map((item) => (
              <NavLink
                to={`/products/view/${item.item_id}`}
                key={Date.now() + item.item_id + Math.random()}
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
                    mw="160px"
                    h="160px"
                    m="auto"
                    _hover={{ transform: "scale(1.1)", transition: "400ms" }}
                    p="10px"
                    src={item.image}
                    alt=""
                  />
                  <Text fontWeight="700"> {item.description}</Text>

                  <Text color={"green"}>₹ {item.new_price}</Text>
                  <Text pb="5px"> {item.brand}</Text>
                </Box>
              </NavLink>
            ))}
        </Box>
      </Box>
      {/* mobile version end */}
    </div>
  );
};

export default Electronics;
