'use strict';
import { usersSeed, userImagesSeed } from '../seed-data/users.seed';
import commentReactionsSeed from '../seed-data/comment-reactions.seed';

const randomIndex = length => Math.floor(Math.random() * length);
const mapLinks = images => images.map(x => `'${x.link}'`).join(',');

export default {
  up: async (queryInterface, Sequelize) => {
    try {
      const options = {
        type: Sequelize.QueryTypes.SELECT
      };


      // const userImagesQuery = `SELECT id FROM "images" WHERE link IN (${mapLinks(userImagesSeed)});`;
      // const userImages = await queryInterface.sequelize.query(userImagesQuery, options);

      // Add users.
      const usersMappedSeed = usersSeed.map((user, i) => ({
        ...user
        // imageId: userImages[i] ? userImages[i].id : null
      }));
      // await queryInterface.bulkInsert('users', usersMappedSeed, {});
      const users = await queryInterface.sequelize.query('SELECT id FROM "users";', options);
      const comments = await queryInterface.sequelize.query('SELECT id FROM "comments"', options);

      //Add comment reactions 
      const commentReactionsMappedSeed = commentReactionsSeed.map(reaction => ({
          ...reaction,
          userId: users[randomIndex(users.length)].id,
          commentId: comments[randomIndex(comments.length)].id
      }));

      await queryInterface.bulkInsert('commentReactions', commentReactionsMappedSeed, {});
    }  
    catch(err) {
      console.log(`Seeding error: ${err}`);
    }
  },

  down: async (queryInterface) => {
    try {
      await queryInterface.bulkDelete('commentReactions', null, {});
    } 
    catch (err) {
      console.log(`Seeding error: ${err}`)
    }
  }
};
