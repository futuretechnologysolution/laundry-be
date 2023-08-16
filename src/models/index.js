/* eslint-disable import/no-import-module-exports */
/* eslint-disable no-param-reassign */
import fs from 'fs';
import path from 'path';

import { Sequelize } from 'sequelize';

import config from '../config';
import { USER_TABLE_REFERENCE } from '../fixtures/models';
import logger from '../libs/logger';
import { applyFieldsQuery, applySearchQuery, applySortQuery } from '../libs/sequelize';

const { dbName, dbUser, dbPassword, dbHost, dbDialect, dbDebug, dbSchema } = config;

const basename = path.basename(__filename);
// eslint-disable-next-line no-console

const queryLogger = message => {
  logger.query('', message);
};

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
  timezone: '+07:00',
  logging: queryLogger,
  minifyAliases: true,
  DEBUG: dbDebug,
  dialectOptions: {
    connectTimeout: 220000,
  },
  pool: {
    max: 100,
    min: 0,
    acquire: 220000,
    idle: 10000,
  },
  define: {
    schema: dbSchema,
    searchPath: dbSchema,
    timestamps: true,
    paranoid: true,
    underscored: true,
    classMethods: {},
    defaultScope: {},
    hooks: {
      beforeFind(options) {
        // =================================
        // Required for Paginated Request
        // =================================
        applyFieldsQuery(this, options);
        applySortQuery(this, options);
        applySearchQuery(this, options);
        // =================================
        // End for Paginated Request
        // =================================
        return options;
      },
      beforeCreate(instance, options) {
        if (options.user?.id && instance?.createdBy === undefined) {
          instance.createdBy = options.user?.id;
          instance.updatedBy = options.user?.id;
        }
      },
      beforeBulkCreate(instances, options) {
        instances.forEach(instance => {
          if (options.user?.id) {
            if (instance?.createdBy === undefined) {
              instance.createdBy = options.user?.id;
            }

            instance.updatedBy = options.user?.id;
          }
        });
      },
      beforeUpdate(instance, options) {
        instance.updatedBy = options.user?.id;
      },
      beforeUpsert(instance, options) {
        instance.updatedBy = options.user?.id;
      },
      beforeDestroy(instance, options) {
        instance.deletedBy = options.user?.id;
      },
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    logger.info('Database', 'connection to DB has been established successfully.');
  })
  .catch(err => {
    logger.error(err);
  });

sequelize.beforeDefine(attributes => {
  const references = USER_TABLE_REFERENCE;
  attributes.createdAt = { type: Sequelize.DATE };
  attributes.createdBy = { type: Sequelize.INTEGER, references };
  attributes.updatedAt = { type: Sequelize.DATE };
  attributes.updatedBy = { type: Sequelize.INTEGER, references };
  attributes.deletedAt = { type: Sequelize.DATE };
  attributes.deletedBy = { type: Sequelize.INTEGER, references };
});

const db = {};

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const modelDefinitionFunction = require(path.join(__dirname, file)).default;
    if (typeof modelDefinitionFunction === 'function') {
      const model = modelDefinitionFunction(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    } else {
      logger.error(`modelDefinitionFunction in ${file} is not a function`);
    }
    const model = modelDefinitionFunction(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName]?.associate) {
    db[modelName].associate(db);
  }
  if (db[modelName]?.scopes) {
    db[modelName].scopes(db);
  }
});

Sequelize.postgres.DATE.parse = value => value.toLocaleString();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
