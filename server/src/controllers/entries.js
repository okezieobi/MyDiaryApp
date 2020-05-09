import { Entry, sequelize } from '../models';

export default class EntryController {
  static async createOne(req, res, next) {
    try {
      await sequelize.transaction(async (t) => {
        const {
          id, title, body, createdOn,
        } = await Entry.create({
          title: req.body.title,
          body: req.body.body,
          UserId: res.locals.userId,
        }, { transaction: t });
        res.sendExtended(201, 'application/json', {
          data: {
            id, title, body, createdOn,
          },
        });
      });
    } catch (err) {
      next(err);
    }
  }
}
