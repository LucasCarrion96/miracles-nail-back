import * as userModels from './user/index.js';
import * as serviceModels from './services/index.js';
import { sequelize } from '../sequelize-config/sequelize-config.js';

// Exportar todos los modelos juntos para usar en app
export const {
    User,
    UserCourse,
    HealthCondition,
    UserHealthCondition,
    UserRol
} = userModels;

export const {
    Turns,
    Service,
    Course,
    Schedule,
    ArtType,
    PaymentStatus
} = serviceModels;

// Asociaciones entre modelos
Object.values({ ...userModels, ...serviceModels }).forEach(model => {
    if (model.associate) {
        model.associate({ ...userModels, ...serviceModels });
    }
});

export { sequelize };