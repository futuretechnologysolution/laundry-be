import {
  USERS_MODEL_NAME,
  USERS_TABLE_REFERENCE,
  USER_PROFILES_MODEL_NAME,
  USER_PROFILES_TABLE_NAME,
  USER_PROFILE_BELONGS_TO_USER,
} from '../fixtures/models';

export default (sequelize, DataTypes) => {
  const schemaAttributes = {
    userId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: USERS_TABLE_REFERENCE,
      field: 'user_id',
    },
    firstName: { type: DataTypes.STRING, field: 'first_name' },
    lastName: { type: DataTypes.STRING, field: 'last_name' },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName || ''} ${this.lastName || ''}`.trimEnd();
      },
    },
  };
  const UserProfile = sequelize.define(USER_PROFILES_MODEL_NAME, schemaAttributes, {
    tableName: USER_PROFILES_TABLE_NAME,
  });

  UserProfile.associate = models => {
    UserProfile.belongsTo(models[USERS_MODEL_NAME], USER_PROFILE_BELONGS_TO_USER);
  };
  return UserProfile;
};
