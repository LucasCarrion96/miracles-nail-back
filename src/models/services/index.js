import Sequelize from 'sequelize';
import { sequelize } from '../../sequelize-config/sequelize-config.js';

import TurnsDef from './turnsModel.js';
import ServiceDef from './serviceModel.js';
import CourseDef from './coursesModel.js';
import ScheduleDef from './scheduleModel.js';
import ArtTypeDef from './artTypeModel.js';
import PaymentStatusDef from './paymentStatusModel.js';

export const Turns = TurnsDef(sequelize, Sequelize.DataTypes);
export const Service = ServiceDef(sequelize, Sequelize.DataTypes);
export const Course = CourseDef(sequelize, Sequelize.DataTypes);
export const Schedule = ScheduleDef(sequelize, Sequelize.DataTypes);
export const ArtType = ArtTypeDef(sequelize, Sequelize.DataTypes);
export const PaymentStatus = PaymentStatusDef(sequelize, Sequelize.DataTypes);