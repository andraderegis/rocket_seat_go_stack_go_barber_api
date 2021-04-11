import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import IUpdateController from '@shared/infra/http/controllers/interfaces/express/IUpdateController';

class UserAvatarController implements IUpdateController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename
    });

    return response.json(user);
  }
}

export default UserAvatarController;
