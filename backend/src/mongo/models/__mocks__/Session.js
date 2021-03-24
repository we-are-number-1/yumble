
/**
 * Mock class for a mongoDB session object
 */
class MockSession {
  /**
    *
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
