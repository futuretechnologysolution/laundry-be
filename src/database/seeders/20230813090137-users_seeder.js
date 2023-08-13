import { USERS_TABLE_NAME, USER_PROFILES_TABLE_NAME, USER_ROLES_TABLE_NAME } from '../../fixtures/models';
import { forEachAsync } from '../../libs/utils';
import { User as userRepository } from '../../models';

const records = [
  {
    id: 1,
    username: 'superadmin',
    password: 'superadmin',
    profile: { firstName: 'test', lastName: 'ting' },
    userRole: { roleId: 1 },
  },
  {
    id: 2,
    username: 'admin',
    password: 'admin',
    profile: { firstName: 'test', lastName: 'ting' },
    userRole: { roleId: 2 },
  },
];

const schema = process.env.DB_SCHEMA;

export default {
  up: queryInterface =>
    forEachAsync(records, record => userRepository.create(record, { include: { all: true, nested: true } })).then(
      () => {
        queryInterface.sequelize.query(`ALTER SEQUENCE "${schema}"."users_id_seq" RESTART WITH ${records.length + 1}`);
      },
    ),
  down: queryInterface =>
    queryInterface
      .bulkDelete({ tableName: USER_PROFILES_TABLE_NAME, schema })
      .then(() => queryInterface.bulkDelete({ tableName: USER_ROLES_TABLE_NAME, schema }))
      .then(() => queryInterface.bulkDelete({ tableName: USERS_TABLE_NAME, schema })),
};
