
/**
 * Mock class for a mongoDB session object
 */
class MockSession {
  /**
    * Mock findOne of the {Session} mongo schema
    * @param {*} code
    * @return {*}
    */
  findOne(code) {
    if (code) {
      return {
        save() {
        },
      };
    }
  }
}


export default new MockSession();
