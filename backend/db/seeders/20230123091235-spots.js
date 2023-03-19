'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "123 Disney Lane",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Modern House in SF",
          description:
            "The kitchen has all the counter space you could ever want, and the spacious back patio is perfect for having a cocktail (or three) and watching the sunset after a long day at work.",
          price: 123.45,
        },
        {
          ownerId: 2,
          address: "225 Fire Lane",
          city: "San Jose",
          state: "California",
          country: "United States of America",
          lat: 97.7667258,
          lng: -12.4730327,
          name: "Great House On The Hill",
          description:
            "This cozy bungalow has a wide front porch where you can sit in the evening and greet your neighbors, and inside, the living room features a gorgeous antique fireplace.",
          price: 423.19,
        },
        {
          ownerId: 3,
          address: "1670 East Mississippi Ave",
          city: "Aurora",
          state: "Colorado",
          country: "United States of America",
          lat: 87.7645888,
          lng: -177.0030327,
          name: "Private Place By The Lake",
          description:
            "This cozy bungalow has a wide front porch where you can sit in the evening and greet your neighbors, and inside, the living room features a gorgeous antique fireplace.",
          price: 107.49,
        },
        {
          ownerId: 4,
          address: "1000 Dawnadele Ave",
          city: "Baton Rouge",
          state: "Lousiana",
          country: "United States of America",
          lat: 427.7645358,
          lng: 2.4730327,
          name: "Newly Build 2 Story House",
          description:
            "Picture yourself living on the second fairway of a Tuscany golf course on a premium lot in a gated community. This home is truly made for both entertaining and everyday living, with plenty of space and fabulous views.",
          price: 407.12,
        },
        {
          ownerId: 5,
          address: "555 Brighton Blvd",
          city: "Denver",
          state: "Colorado",
          country: "United States of America",
          lat: 257.7645358,
          lng: -75.4730327,
          name: "House By The River",
          description:
            "This three-bedroom home was built in 1956 by noted local architect Archie Techt, and boasts clean lines and vintage woodwork. Located on the border of Rock Creek Park.",
          price: 131.28,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
