import { Sequelize, DataTypes } from 'sequelize'

export const sequelize = new Sequelize('sqlite::memory:')

export let EmailConfirmation

sequelize
  .authenticate()
  .then((err) => {
    EmailConfirmation = sequelize.define('EmailConfirmation', {
      email: DataTypes.STRING,
      token: DataTypes.UUID,
      confirmed: DataTypes.BOOLEAN
    })
  })
  .catch((err) => {
    console.log("Unable to connect to database: ", err);
  });


export default sequelize