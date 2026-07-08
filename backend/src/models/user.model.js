import pool from "../config/db.js";

class User {
  constructor(uid, full_name, email, role, password_hash = null) {
    this.uid = uid;
    this.full_name = full_name;
    this.email = email;
    this.role = role;
    this.password_hash = password_hash;
  }

  static async findAll() {
    const result = await pool.query(
      `SELECT uid, full_name, email, role FROM users
       UNION ALL
       SELECT uid, full_name, email, role FROM chefs
       UNION ALL
       SELECT uid, full_name, email, role FROM admin`,
    );
    return result.rows.map(
      (row) => new User(row.uid, row.full_name, row.email, row.role),
    );
  }

  static async findById(uid) {
    const result = await pool.query(
      `SELECT uid, full_name, email, role FROM users WHERE uid = $1
       UNION ALL
       SELECT uid, full_name, email, role FROM chefs WHERE uid = $1
       UNION ALL
       SELECT uid, full_name, email, role FROM admin WHERE uid = $1`,
      [uid],
    );
    if (!result.rows[0]) return null;
    const r = result.rows[0];
    return new User(r.uid, r.full_name, r.email, r.role);
  }

  static async findByEmail(email) {
    const result = await pool.query(
      `SELECT uid, full_name, email, role, password_hash FROM users WHERE email = $1
       UNION ALL
       SELECT uid, full_name, email, role, password_hash FROM chefs WHERE email = $1
       UNION ALL
       SELECT uid, full_name, email, role, password_hash FROM admin WHERE email = $1`,
      [email],
    );
    if (!result.rows[0]) return null;
    const r = result.rows[0];
    return new User(r.uid, r.full_name, r.email, r.role, r.password_hash);
  }

  static async create(full_name, email, password_hash, role) {
    let tableName = "users";
    if (role === "Chef") {
      tableName = "chefs";
    } else if (role === "Admin") {
      tableName = "admin";
    }
    const result = await pool.query(
      `INSERT INTO ${tableName} (uid, full_name, email, password_hash) VALUES (gen_random_uuid(), $1, $2, $3) RETURNING uid, full_name, email, role`,
      [full_name, email, password_hash],
    );
    const r = result.rows[0];
    return new User(r.uid, r.full_name, r.email, r.role);
  }

  static async updateById(uid, full_name, email, role) {
    let result = await pool.query(
      "UPDATE users SET full_name=$1, email=$2 WHERE uid=$3 RETURNING uid, full_name, email, role",
      [full_name, email, uid],
    );
    if (result.rows[0]) {
      const r = result.rows[0];
      return new User(r.uid, r.full_name, r.email, r.role);
    }

    result = await pool.query(
      "UPDATE chefs SET full_name=$1, email=$2 WHERE uid=$3 RETURNING uid, full_name, email, role",
      [full_name, email, uid],
    );
    if (result.rows[0]) {
      const r = result.rows[0];
      return new User(r.uid, r.full_name, r.email, r.role);
    }

    result = await pool.query(
      "UPDATE admin SET full_name=$1, email=$2 WHERE uid=$3 RETURNING uid, full_name, email, role",
      [full_name, email, uid],
    );
    if (result.rows[0]) {
      const r = result.rows[0];
      return new User(r.uid, r.full_name, r.email, r.role);
    }

    return null;
  }

  static async deleteById(uid) {
    let result = await pool.query(
      "DELETE FROM users WHERE uid=$1 RETURNING uid, full_name, email, role",
      [uid],
    );
    if (result.rows[0]) {
      const r = result.rows[0];
      return new User(r.uid, r.full_name, r.email, r.role);
    }

    result = await pool.query(
      "DELETE FROM chefs WHERE uid=$1 RETURNING uid, full_name, email, role",
      [uid],
    );
    if (result.rows[0]) {
      const r = result.rows[0];
      return new User(r.uid, r.full_name, r.email, r.role);
    }

    result = await pool.query(
      "DELETE FROM admin WHERE uid=$1 RETURNING uid, full_name, email, role",
      [uid],
    );
    if (result.rows[0]) {
      const r = result.rows[0];
      return new User(r.uid, r.full_name, r.email, r.role);
    }

    return null;
  }
}

export default User;
