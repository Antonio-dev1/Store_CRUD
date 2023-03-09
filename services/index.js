const bcrypt = require('bcrypt');
exports.generateCrudMethods = Model => {
    return {
        getAll: () =>  Model.find(),
        getById: (id) =>  Model.findById(id),
        create: record =>  Model.create(record),
        update: (id , record) => Model.findByIdAndUpdate(id , record , {new : true}),
        delete: id => Model.findByIdAndDelete(id),
        createHash: async function (plainTextPassword) {

            // Hashing user's salt and password with 10 iterations,
            const saltRounds = 10;
          
            // First method to generate a salt and then create hash
            const salt = await bcrypt.genSalt(saltRounds);
            return await bcrypt.hash(plainTextPassword, salt);
            // return await bcrypt.hash(plainTextPassword, saltRounds);
          },
          verfiyPassword: function (plainTextPassword, hash) {
            return bcrypt.compare(plainTextPassword, hash);
          },
          getUserbyEmail: async (user_email) => {
            try {
              const user = await Model.findOne({ email: user_email }).exec();
              console.log('Found user:', user);
              return user;
            } catch (err) {
              console.log('Error finding user:', err);
              throw err;
            }
          },
        };
}