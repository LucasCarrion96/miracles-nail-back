import { UserHealthCondition } from '@models';

export const bulkCreateUserHealthConditions = async (userHealthConditions) => {
    return await UserHealthCondition.bulkCreate(userHealthConditions);
};