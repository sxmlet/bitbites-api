import {Bite} from "../models/Bite.js";
import {createLogger} from "../../../../common/logger.js";
import {UpdateBiteRequest} from "../models/UpdateBiteRequest.js";
import {FindOptions} from "sequelize";
import {InsertBite} from "../models/InsertBite.js";

const logger = createLogger('bite-db-operations');

export async function deleteBiteById(uid: string, id: string): Promise<string> {
  await Bite.destroy({
    where: {
      id,
      uid
    }
  });
  logger.info('deleted bite with id: ' + id);
  return id;
}

export async function createBite(bite: InsertBite): Promise<Bite> {
  return await Bite.create({
    title: bite.title,
    uid: bite.uid,
    url: bite.url,
    content: bite.content,
  });
}

export async function updateBite(uid: string, id: string, data: UpdateBiteRequest): Promise<any> {
  const res = await Bite.update(data, {
    where: {
      id,
      uid,
    }
  });
  const count = res.pop();
  if (count === 0) {
    return null;
  }
  return await getBite(id);
}

export async function getAllBite(uid: string = ''): Promise<Bite[]> {
  const query: FindOptions<any> = {
    order: [
      ['id', 'DESC']
    ],
  }

  if (uid != '') {
    query.where = {
      uid: uid,
    };
  }

  return await Bite.findAll(query);
}

export async function getBite(id: string): Promise<Bite|null> {
  return await Bite.findByPk(id);
}
