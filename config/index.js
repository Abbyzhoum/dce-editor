
const ENV = {
   'development': require('./development')
}

module.exports = ENV[process.env.NODE_ENV];