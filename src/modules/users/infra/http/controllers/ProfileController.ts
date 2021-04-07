import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

import IUpdateController from '@shared/infra/http/controllers/interfaces/express/IUpdateController';
import IGetController from '@shared/infra/http/controllers/interfaces/express/IGetController';

class ProfileController implements IGetController, IUpdateController {
  public async get(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute({
      user_id
    });

    delete user.password;

    return response.status(200).json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { name, email, old_password, password } = request.body;

    const updateProfileService = container.resolve(UpdateProfileService);

    const user = await updateProfileService.execute({
      user_id,
      name,
      email,
      password,
      old_password
    });

    delete user.password;

    return response.status(200).json(user);
  }
}

export default ProfileController;

// import { inject, injectable } from 'tsyringe';
// import { Request, Response } from 'express';

// import IUserService from '@modules/users/services/interfaces/IUserService';
// import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';
// import IProfileController from './interfaces/IProfileController';

// @injectable()
// class ProfileController implements IProfileController {
//   constructor(
//     @inject(CONTAINER_NAME_DEPENDENCIES.SERVICE.USER.SHOW_PROFILE)
//     private showProfileService: IUserService,

//     @inject(CONTAINER_NAME_DEPENDENCIES.SERVICE.USER.UPDATE_PROFILE)
//     private updateProfileService: IUserService
//   ) {
//     //
//   }

//   public async get(request: Request, response: Response): Promise<Response> {
//     const user_id = request.user.id;

//     const user = await this.showProfileService.execute({
//       user_id
//     });

//     delete user.password;

//     return response.status(200).json(user);
//   }

//   public async update(request: Request, response: Response): Promise<Response> {
//     const user_id = request.user.id;

//     const { name, email, old_password, password } = request.body;

//     const user = await this.updateProfileService.execute({
//       user_id,
//       name,
//       email,
//       password,
//       old_password
//     });

//     delete user.password;

//     return response.status(200).json(user);
//   }
// }

// export default ProfileController;
