'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          spotId: 1,
          review:
            "You're an inspiration. Despite any struggles you've endured, each day you come to class with a smile on your face and a willingness to learn and improve. These are admirable traits.",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 2,
          review:
            "You're a fantastic listener. It's clear to me that you're very open to learning and hearing methods you can use to improve your studies. You follow directions perfectly, and you're well on your way to improvement.",
          stars: 4,
        },
        {
          userId: 3,
          spotId: 3,
          review:
            "You tackle issues and challenges with a positive, can-do attitude. Because of this, I have no doubt that you can accomplish anything you put your mind to. An attitude like that can change the world.",
          stars: 5,
        },
        {
          userId: 4,
          spotId: 4,
          review:
            "It's clear that you take pride in your work. The confidence you have in your academics is impressive. Self-confidence is a great trait to have.",
          stars: 5,
        },
        {
          userId: 5,
          spotId: 5,
          review:
            "You consistently show respect for both your peers and your teachers. Your disposition and manners always impress me. You're a kind and considerate student, and I'm glad to be your teacher.",
          stars: 5,
        },
        {
          userId: 3,
          spotId: 1,
          review:
            "You're sensitive to the thoughts and opinions of others. This allows them to express their thoughts and feelings. I find this commendable.",
          stars: 4,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
