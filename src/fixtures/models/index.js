import { Sequelize } from 'sequelize';
import { USER_TABLE_REFERENCE } from './user';

export const FOREIGN_KEY_CONSTRAINT = additionalConstraint => ({
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
  constraints: true,
  ...additionalConstraint,
});

export const FIELDS_DISABLED_ON_UPDATE = ['id', 'createdAt', 'createdBy', 'status'];
export * from './user';

export const ADDITIONAL_FIELDS = {
  createdAt: { type: Sequelize.DATE, field: 'created_at' },
  createdBy: {
    type: Sequelize.INTEGER,
    references: USER_TABLE_REFERENCE,
    field: 'created_by',
  },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at' },
  updatedBy: {
    type: Sequelize.INTEGER,
    references: USER_TABLE_REFERENCE,
    field: 'updated_by',
  },
  deletedAt: { type: Sequelize.DATE, field: 'deleted_at' },
  deletedBy: {
    type: Sequelize.INTEGER,
    references: USER_TABLE_REFERENCE,
    field: 'deleted_by',
  },
};
