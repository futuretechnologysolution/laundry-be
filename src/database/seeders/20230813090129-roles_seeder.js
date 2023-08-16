import { ROLES_TABLE_NAME } from '../../fixtures/models';
import { forEachAsync } from '../../libs/utils';
import { Role as roleRepository } from '../../models';

const records = [
  {
    id: 1,
    name: 'Super Admin',
    code: 'superadmin',
    root: true,
  },
  {
    id: 2,
    name: 'Admin',
    code: 'admin',
  },
];

const schema = process.env.DB_SCHEMA;

export default {
  up: queryInterface =>
    forEachAsync(records, record => {
      roleRepository.create(record, { include: { all: true } });
    }).then(() => {
      queryInterface.sequelize.query(`ALTER SEQUENCE "${schema}"."roles_id_seq" RESTART WITH ${records.length + 1} `);
    }),
  down: queryInterface => queryInterface.bulkDelete({ tableName: ROLES_TABLE_NAME }),
};
