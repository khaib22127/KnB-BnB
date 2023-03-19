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
            "Philosophy's history of reflection upon knowledge is a history of theses and theories; but no less of questions, concepts, distinctions, syntheses, and taxonomies. All of these will appear in this article. They generate, colour, and refine these philosophical theses and theories about knowledge. The results are epistemological — philosophical attempts to understand whatever is most fundamentally understandable about the nature and availability of knowledge. We will gain a sense of what philosophers have thought knowledge is and might be, along with why some philosophers have thought knowledge both does not and could not exist.",
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
            "Your knowing a person, it seems, involves direct interaction with him or her. Otherwise, at most, you should claim only that it is almost as if you know him or her: 'I've seen and heard so much about her that I feel like I know her. I wonder whether I'll ever meet her — whether I will ever actually know her.' Without that meeting, you could well know facts about the person (this being a kind of knowledge to be discussed in section 1.b). Nonetheless, could you know facts about a person without ever meeting him or her? If so, there could well be a kind of knowledge which is different to knowing a fact; maybe knowing a thing or entity (such as a person) is distinct from knowing a fact about that thing or entity.",
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
            "Most philosophical discussion of knowledge is directed at knowledge-that — such as knowledge that kangaroos hop, knowledge that koalas sleep most of the time, knowledge that kookaburras cackle, and the like. This is generally called propositional knowledge (a proposition that such-and-such is so is the object of the knowledge), declarative knowledge (the knowledge's object is represented by a declarative sentence: 'Such-and-such is so'), or knowledge-that (the knowledge is represented in the form 'that such-and-such is so').",
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
            "Gilbert Ryle (1971 [1946]; 1949) made apparent to other philosophers the potential importance of distinguishing knowledge-that from knowledge-how. The latter is not (thought Ryle) one's knowing how it is that something is so; this, we noted in section 1.c, is quite likely a form of knowledge-that. What Ryle meant by 'knowing how' was one's knowing how to do something: knowing how to read the time on a clock, knowing how to call a friend, knowing how to cook a particular meal, and so forth. These seem to be skills or at least abilities. Are they not simply another form of knowledge-that?",
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
            "The former idea portrays knowledge as an identifiable and explanatory aspect of what it is for beings relevantly like us to function as a natural component of a natural world. We have beliefs, some of which help us to achieve our aims by telling us how not to 'bump into' the world around us. We can 'fit into' — by 'finding our way within' — the world by using beliefs. Is that because these beliefs are knowledge? Is that part of why humans as a natural kind (if this is what we are) have prospered so markedly?",
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
