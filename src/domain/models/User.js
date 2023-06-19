class User {
  constructor(payload) {
    this.id = payload.id;
    this.name = payload.name;
    this.email = payload.email;
  }
}

module.exports = User;