import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  Radio,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, InfoIcon, UnlockIcon } from "@chakra-ui/icons";
import { useContext, useRef, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { MdSecurity } from "react-icons/md";
import { Link, Navigate } from "react-router-dom";

const PaymentPage = () => {
  const { cartData } = useContext(CartContext);

  let sellingPrice = 0;
  let discount = 0;
  let totalAmount = 0;

  cartData.map((data) => {
    sellingPrice += data.old_price * data.quantity;
    discount += data.discount;
    totalAmount += data.new_price * data.quantity;
  });
  discount = Math.floor(((discount / cartData.length) * sellingPrice) / 100);

  const { globalAddress } = useContext(CartContext);

  const [cardNumber, setCardNumber] = useState(false);

  let countCard = 0;
  const handelCardNumber = (e) => {
    setCardNumber(false);
    countCard++;
    if (countCard == 16) {
      setCardNumber(true);
    }
  };

  const toast = useToast();
  const [openOtpBox, setOpenOtpBox] = useState(false);

  const handelForwardOtp = () => {
    setOpenOtpBox(true);
    if (cardNumber) {
      // return <Navigate to='/otp'/>
    } else {
      toast({
        position: "top",
        render: () => (
          <Box
            color="white"
            rounded={"10"}
            p={3}
            bg="red"
            display={"flex"}
            alignItems="center"
          >
            <InfoIcon />
            <Text ml="2" fontWeight={"bold"} color="white">
              Please Fill All the Details Correctly
            </Text>
          </Box>
        ),
      });
    }
  };

  if (cartData.length === 0) {
    return <Navigate to="/cart" />;
  }

  return (
    <Box w="100%" pt={["5", "20", "20"]} bg="#f1f3f6">
      <HStack
        w={["98%", "82%", "82%"]}
        margin="auto"
        display="flex"
        alignItems="start"
        justifyContent="space-between"
      >
        <Box w={["100%", "69%", "69%"]} bg="#f1f3f6">
          <Box
            w="100%"
            h="10vh"
            bg="white"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            shadow="md"
          >
            <Box ml="6" display="flex" alignItems="center">
              <Box
                bg="#f1f3f6"
                pl="2"
                pr="2"
                color="blue"
                mr="4"
                borderRadius="2"
              >
                {" "}
                1
              </Box>
              <Text fontWeight="500" color="grey">
                LOGIN
              </Text>
              <CheckIcon ml="3" color="blue.600" />
            </Box>
            <Box>
              <Button
                mr="6"
                colorScheme="blue"
                variant="outline"
                borderRadius="0"
                border="1px solid blue"
              >
                CHANGE
              </Button>
            </Box>
          </Box>
          <Box
            w="100%"
            minH={"10vh"}
            bg="white"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            shadow="md"
            mt="4"
          >
            <Box>
              <Box
                ml="6"
                display="flex"
                alignItems="center"
                pt={["6px", "0px", "0px"]}
              >
                <Box
                  bg="#f1f3f6"
                  pl="2"
                  pr="2"
                  color="blue"
                  mr="4"
                  borderRadius="2"
                >
                  {" "}
                  2
                </Box>
                <Text fontWeight="500" color="grey">
                  DELIVERY ADDRESS
                </Text>
                <CheckIcon ml="3" color="blue.600" />
              </Box>
              <Box
                display={["block", "flex", "flex"]}
                ml={["10px", "0px", "0px"]}
              >
                <Text ml={["4px", "66px", "66px"]} fontWeight="500" mr="2">
                  {globalAddress.Name}{" "}
                </Text>
                <Text mr="2"> {globalAddress.Address} </Text>
                <Text mr="2">{globalAddress.City} -</Text>
                <Text>{globalAddress.Pincode}</Text>
              </Box>
            </Box>
            <Box>
              <Button
                mr="6"
                colorScheme="blue"
                variant="outline"
                borderRadius="0"
                border="1px solid blue"
              >
                <Link to="/delivery">CHANGE</Link>
              </Button>
            </Box>
          </Box>

          <Box
            w="100%"
            h="10vh"
            bg="white"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            shadow="md"
            mt="4"
          >
            <Box>
              <Box ml="6" display="flex" alignItems="center">
                <Box
                  bg="#f1f3f6"
                  pl="2"
                  pr="2"
                  color="blue"
                  mr="4"
                  borderRadius="2"
                >
                  {" "}
                  3{" "}
                </Box>
                <Text fontWeight="500" color="grey">
                  ORDER SUMMARY
                </Text>
                <CheckIcon ml="3" color="blue.600" />
              </Box>
              <Box display="flex">
                <Text ml="66px" fontWeight="500" mr="2">
                  {cartData.length} items{" "}
                </Text>
              </Box>
            </Box>
            <Box>
              <Button
                mr="6"
                colorScheme="blue"
                variant="outline"
                borderRadius="0"
                border="1px solid blue"
              >
                <Link to="/cart">CHANGE</Link>
              </Button>
            </Box>
          </Box>
          <Box w="100%" h="7vh" bg="#2874f0" mt="4" display="flex">
            <Box ml="6" display="flex" alignItems="center">
              <Box
                bg="white"
                pl="2"
                pr="2"
                color="blue"
                mr="4"
                borderRadius="2"
              >
                4
              </Box>
              <Text fontWeight="500" color="white">
                PAYMENT OPTIONS
              </Text>
            </Box>
          </Box>

          <Box
            bg="white"
            w="100%"
            display="block"
            borderBottom="1px solid #f2f2f2"
          >
            <Box display="flex" p="5" alignItems="center">
              <Radio value="0"></Radio>
              <Image
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/batman-returns/logos/UPI.gif"
                w="30px"
                h="30px"
                ml="5"
              />
              <Box
                display="grid"
                justifyContent="start"
                textAlign="start"
                alignItems="start"
              >
                <Text ml="6">UPI</Text>
                <Text ml="6" color="green">
                  Offers avaliable on Paytm
                </Text>
              </Box>
            </Box>
          </Box>
          <Box
            bg="white"
            w="100%"
            display="block"
            borderBottom="1px solid #f2f2f2"
          >
            <Box display="flex" p="5" alignItems="center">
              <Radio value="0"></Radio>
              <Image
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/batman-returns/logos/UPI.gif"
                w="30px"
                h="30px"
                ml="5"
              />
              <Box
                display="grid"
                justifyContent="start"
                textAlign="start"
                alignItems="start"
              >
                <Text ml="6">Wallets</Text>
                <Text ml="6" color="green">
                  Offers avaliable on Paytm
                </Text>
              </Box>
            </Box>
          </Box>

          <Box
            bg="#f2fdff"
            w="100%"
            display="block"
            borderBottom="1px solid #f2f2f2"
          >
            <Box display="flex" p="5" alignItems="center">
              <Radio value="1"></Radio>
              <Text ml="6">Credit / Debit / ATM Card</Text>
            </Box>
            <Box
              display="grid"
              justifyContent="start"
              textAlign="start"
              alignItems="start"
            >
              <Input
                ml="16"
                bg="white"
                w="60%"
                borderRadius="0"
                focusBorderColor={cardNumber ? "lime" : "red.300"}
                disabled={cardNumber}
                onKeyUp={handelCardNumber}
                placeholder="Enter Card Number"
              />
              <Box display="flex" w="100%" mt="2">
                <Input
                  ml="16"
                  bg="white"
                  w="40%"
                  type={"month"}
                  placeholder="none"
                  borderRadius="0"
                />
                <Input
                  ml="2"
                  bg="white"
                  w="30%"
                  maxLength={"3"}
                  placeholder="CVV"
                  borderRadius="0"
                />
              </Box>

              <Button
                ml="16"
                color="white"
                mt="4"
                w="40%"
                onClick={handelForwardOtp}
                bg="#fb641b"
                borderRadius="0"
              >
                <Link to={cardNumber ? "/otp" : ""}>PAY ₹{totalAmount}</Link>
              </Button>

              <Text ml="16" color="grey" mt="2" mb="4">
                Add and secure your card as per RBI guidelines
              </Text>
            </Box>
          </Box>
          <Box
            bg="white"
            w="100%"
            display="block"
            borderBottom="1px solid #f2f2f2"
          >
            <Box display="flex" p="5" alignItems="center">
              <Radio value="0"></Radio>
              <Text ml="6">Net Banking</Text>
            </Box>
          </Box>
          <Box
            bg="white"
            w="100%"
            display="block"
            borderBottom="1px solid #f2f2f2"
          >
            <Box display="flex" p="5" alignItems="center">
              <Radio value="0"></Radio>
              <Text ml="6">EMI (Easy Installments)</Text>
            </Box>
          </Box>
          <Box
            bg="white"
            w="100%"
            display="block"
            borderBottom="1px solid #f2f2f2"
          >
            <Box display="flex" p="5" alignItems="center">
              <Radio value="0"></Radio>
              <Text ml="6">Cash on Delivery</Text>
            </Box>
          </Box>
          <Box
            w="100%"
            h="8vh"
            bg="white"
            mt="5"
            mb="20"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            shadow="md"
          >
            <Box ml="6" display="flex" alignItems="center">
              <Box pl="2" pr="2" color="grey" mr="4" borderRadius="2">
                <AddIcon />
              </Box>
              <Text fontWeight="500" color="black">
                Add Gift Card
              </Text>
            </Box>
          </Box>
        </Box>

        <Box
          w="29.5%"
          h="85vh"
          bg="white"
          position="sticky"
          top="0"
          shadow="sm"
          display={["none", "block", "block"]}
        >
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            bg="white"
            w="100%"
            h="12"
          >
            <Text ml="5" fontWeight="500" color="grey">
              PRICE DETAILS
            </Text>
          </Box>
          <hr style={{ color: "black" }} />
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            bg="white"
          >
            <Text ml="5" mt="5" fontWeight="400" fontSize="18px" color="black">
              Price ({cartData.length} items){" "}
            </Text>
            <Spacer />
            <Text mr="5" mt="5" fontWeight="400" fontSize="18px" color="black">
              ₹{totalAmount}
            </Text>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            bg="white"
            borderBottom="1px dashed grey"
          >
            <Text
              ml="5"
              mt="4"
              mb="5"
              fontWeight="400"
              fontSize="18px"
              color="black"
            >
              Delivery Charges{" "}
            </Text>
            <Spacer />
            <Text
              mr="5"
              mt="4"
              mb="5"
              fontWeight="400"
              fontSize="18px"
              color="green"
            >
              FREE
            </Text>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            bg="white"
            borderBottom="1px dashed grey"
          >
            <Text
              ml="5"
              mt="4"
              mb="5"
              fontWeight="500"
              fontSize="19px"
              color="black"
            >
              Total Amount{" "}
            </Text>
            <Spacer />
            <Text
              mr="5"
              mt="4"
              mb="5"
              fontWeight="500"
              fontSize="19px"
              color="black"
            >
              ₹ {totalAmount}
            </Text>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            bg="white"
          >
            <Text
              ml="5"
              mt="4"
              mb="5"
              fontWeight="500"
              fontSize="17px"
              color="green"
            >
              {" "}
              Your Total Savings on this order ₹{discount}
            </Text>
          </Box>

          <Box
            display="flex"
            justifyContent="flex-start"
            borderBottom={"1px solid black"}
            mt="5"
            p={"4"}
            alignItems="center"
            shadow="sm"
            bg="white"
          >
            <Box display={"flex"} alignItems="center">
              <UnlockIcon color="green" />
              <Text color="green" ml="3">
                {" "}
                OFFERS{" "}
              </Text>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-start"
            borderBottom={"1px solid black"}
            p={"4"}
            alignItems="center"
            shadow="sm"
            bg="white"
          >
            <Text
              textAlign="start"
              color="black"
              fontSize="15px"
              fontWeight={"400"}
            >
              Flat ₹25 Instant Cashback on Paytm UPI. Min Order Value ₹250.
              Valid once per Paytm account
            </Text>
          </Box>

          <Box
            mt="5"
            p="5"
            display="grid"
            justifyContent="flex-start"
            alignItems="center"
          >
            <MdSecurity fill="grey" />
            <Text
              mt="-5"
              ml="5"
              w="100%"
              textTransform="full-width"
              fontWeight="500"
            >
              {" "}
              Safe and Secure Payments.Easy returns.{<br />}100% Authentic
              products.
            </Text>
          </Box>
        </Box>
      </HStack>
    </Box>
  );
};

export default PaymentPage;
