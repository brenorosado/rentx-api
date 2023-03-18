import { Account } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import { CustomError } from "../../../errors/CustomError";
import { RequestingUser } from "../../../middlewares/auth";
import { requiredFields } from "../../../utils/requiredFields";
import { ImageRequestDTO } from "../../Image/createImage/CreateImageDTO";

interface UpdateimageRequest extends ImageRequestDTO {
    id?: string;
}

interface UpdateAccount extends Account {
    image?: UpdateimageRequest;
    requestingUser?: RequestingUser;
}

export class UpdateAccountUseCase {
  async handle (payload: UpdateAccount) {
    const { id, image, requestingUser, ...accountData } = payload;
    const { account } = requestingUser;

    requiredFields({ id });

    if (account.id !== id) throw new CustomError(403, "You can only update your own account.");

    if (accountData?.password) delete accountData.password;

    const updatedAccount = await prismaClient.account.update({
      where: {
        id
      },
      data: {
        ...accountData,
        ...(!!image && {
          image: {
            connect: image
          }
        })
      }
    });

    return updatedAccount;
    // if (!image) return updatedAccount;

    // const {
    //   fileName,
    //   fileExtension,
    //   base64
    // } = image;

    // const fileKey = await saveImage({
    //   fileName,
    //   fileExtension,
    //   base64
    // });

    // const userImage = await prismaClient.image.update({
    //   where: {
    //     id: image.id
    //   },
    //   data: {
    //     fileName,
    //     fileExtension,
    //     fileKey,
    //     url: `${process.env.API_URL}/image/file/${fileKey}.${fileExtension}`
    //   }
    // });

    // return { ...updatedAccount, image: userImage };
  }
}
