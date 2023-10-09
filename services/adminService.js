import Admin from '../models/admin.js';

class AdminService {
  async createAdmin(username, hash) {
    try {
      return await Admin.create({ username, password: hash });
    } catch (error) {
      return false;
    }
  }

  async findAdmin(username) {
    try {
      return await Admin.findOne({ where: { username } });
    } catch (error) {
      return false;
    }
  }
}

export const adminService = new AdminService();
