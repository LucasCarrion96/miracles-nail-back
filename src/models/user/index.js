import Sequelize from 'sequelize';
import { sequelize } from '../../sequelize-config/sequelize-config.js';

import UserDef from './userModel.js';
import UserCourseDef from './userCourseModel.js';
import HealthConditionDef from './healthConditionModel.js';
import UserHealthConditionDef from './userHealthConditionModel.js';
import UserRolDef from './userRolModel.js';

export const User = UserDef(sequelize, Sequelize.DataTypes);
export const UserCourse = UserCourseDef(sequelize, Sequelize.DataTypes);
export const HealthCondition = HealthConditionDef(sequelize, Sequelize.DataTypes);
export const UserHealthCondition = UserHealthConditionDef(sequelize, Sequelize.DataTypes);
export const UserRol = UserRolDef(sequelize, Sequelize.DataTypes);