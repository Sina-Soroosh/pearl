import { connectToDB } from "@/config/db";
import addressModel from "@/models/address";
import { getMe } from "@/utils/myAccount";
import addressCheck from "@/validators/address";

const address = async (req, res) => {
  await connectToDB();

  try {
    const user = await getMe(req.cookies);

    if (!user) {
      return res.status(401).json({ message: "You are unauthorized" });
    }

    const mainAddress = await addressModel.findOne({ user: user._id });

    switch (req.method) {
      case "GET": {
        return res.json(mainAddress);
      }
      case "PUT": {
        const {
          firstName = mainAddress.firstName,
          lastName = mainAddress.lastName,
          province = mainAddress.province,
          city = mainAddress.city,
          address = mainAddress.address,
          postalCode = mainAddress.postalCode,
          phone = mainAddress.phone,
          email = mainAddress.email,
        } = req.body;

        const addressInfo = {
          firstName,
          lastName,
          province,
          city,
          address,
          postalCode,
          phone,
          email,
        };

        const isValidAddressInfo = addressCheck(addressInfo);

        if (isValidAddressInfo !== true) {
          return res.status(400).json({ message: "Parameters is not valid" });
        }

        await addressModel.findOneAndUpdate(
          { _id: mainAddress._id },
          addressInfo
        );

        return res.json({ message: "Update address successfully :))" });
      }
      default:
        return res.status(405).json({ message: "The method is not valid" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unknown internal server error !!" });
  }
};

export default address;
