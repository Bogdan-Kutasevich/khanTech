import { adminService } from '../services/adminService.js';
import { makeHashPassword } from '../utils/makeHashPassword.js';
import { compareHash } from '../utils/compareHash.js';
import { generateJwt } from '../utils/generateJwt.js';

class AdminController {
  async createAdmin(req, res) {
    try {
      const { username, password } = req.body;
      const hash = makeHashPassword(password);
      const createdAdmin = await adminService.createAdmin(username, hash);
      if (!createdAdmin) {
        res.status(400).json('cannot create admin');
        return;
      }
      res.status(201).json({ status: 'ok', message: 'admin create successfully' });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async logIn(req, res) {
    try {
      const { username, password } = req.body;
      const admin = await adminService.findAdmin(username);
      if (admin === null) {
        res.status(400).json('admin not found');
        return;
      }
      const isPasswordCompare = compareHash(admin.password, password);
      if (!isPasswordCompare) {
        res.status(400).json('invalidPassword');
        return;
      }
      const jwt = generateJwt(admin.id, admin.username);
      res.status(200).json({ status: 'ok', message: 'login successfully', jwt });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async isAuth(req, res) {
    try {
      if (!req.admin.username) {
        res.status(400).json('unauthorized');
        return;
      }
      res.status(200).json({ status: 'ok', message: 'successfully', authorized: true });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getAdminById(req, res) {
    try {
      const adminId = req.params.id;
      const admin = await adminService.findAdminById(adminId);
      res.status(200).json({ status: 'ok', message: 'successfully', adminName: admin.username });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

export const adminController = new AdminController();
