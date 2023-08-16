export const USER_PROFILES_TABLE_NAME = 'user_profiles';
export const USER_PROFILES_MODEL_NAME = 'UserProfile';
export const USER_ROLES_TABLE_NAME = 'user_roles';
export const USER_ROLES_MODEL_NAME = 'UserRole';

// RELATIONS

export const USER_PROFILE_BELONGS_TO_USER = { foreignKey: 'userId', as: 'user' };
export const USER_ROLE_BELONGS_TO_USER = { foreignKey: 'userId', as: 'user' };
export const USER_ROLE_BELONGS_TO_ROLE = { foreignKey: 'roleId', as: 'role' };
