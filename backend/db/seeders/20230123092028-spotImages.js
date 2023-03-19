'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://images.pexels.com/photos/7501130/pexels-photo-7501130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://i0.wp.com/chronos-stores.com/wp-content/uploads/2022/05/how-to-use-statement-pieces-within-your-space-4-scaled.jpg?fit=2560%2C1709&ssl=1",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://media.istockphoto.com/id/1249281377/photo/galley-between-family-room-and-kitchen.jpg?s=612x612&w=0&k=20&c=MaLTbXaYKnDkOWdVZT4MJs9ArMt16NoXK9TnpYK1OAc=",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://www.gannett-cdn.com/presto/2021/11/22/PNDN/8dd683d3-92e5-4330-ae96-446fac710154-4th_Ave_Great_Room_1128.jpg?width=660&height=440&fit=crop&format=pjpg&auto=webp",
          preview: true,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
