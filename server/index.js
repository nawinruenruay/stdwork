const express = require("express");
const cors = require("cors");
// const bcrypt = require("bcrypt");
const multer = require("multer");
const uuid = require("uuid");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const db = require("./db");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "./uploadpdf";
    if (req.body.typework === "PIC") {
      uploadPath = "./uploadpic";
    } else if (req.body.typework === "VDO") {
      uploadPath = "./uploadvideo";
    }

    return cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const uniqueFilename = `${uuid.v4()}${fileExtension}`;
    return cb(null, uniqueFilename);
  },
});
const upload = multer({ storage });

app.post("/workadd", upload.single("file"), (req, res) => {
  const { wtid, wname, stdid, typework } = req.body;
  const file = req.file.filename;

  db.beginTransaction(() => {
    const maxWid = "SELECT MAX(wid) + 1 AS maxwid FROM tbl_work";

    db.query(maxWid, (err, result) => {
      const wid = result[0].maxwid || 1;

      const insertTblWork =
        "INSERT INTO tbl_work (wid, wtid, wname, stdid) VALUES (?,?,?,?)";
      db.query(insertTblWork, [wid, wtid, wname, stdid], () => {
        const insertTblWorks =
          "INSERT INTO tbl_works (wid ,stdid, typework, pathwork) VALUES (?,?,?,?)";
        db.query(insertTblWorks, [wid, stdid, typework, file], () => {
          db.commit((err) => {
            if (err) {
              return db.rollback(() =>
                res.status(500).json({ error: "Server Error" })
              );
            }
            return res.json({ message: "เพิ่มข้อมูลผลงานสำเร็จ" });
          });
        });
      });
    });
  });
});

app.post("/workstd", (req, res) => {
  const stdid = req.body.stdid;
  const typework = req.body.typework;
  const wtid = req.body.wtid;
  let sql =
    "SELECT tbl_work.*, typework, tbl_works.stdid , wname , pathwork, wtid FROM tbl_work" +
    "LEFT JOIN tbl_works on tbl_work.wid = tbl_works.wid where tbl_works.stdid = ? AND tbl_works.typework = ? AND tbl_work.wtid = ?  ";
  // let sql = "SELECT * FROM tbl_works WHERE stdid = ?";
  db.query(sql, [stdid, typework, wtid], (err, result) => {
    return res.json(result);
  });
});

app.post("/workedit", (req, res) => {
  const { wname, stdid, typework, wtid } = req.body;
  const sql =
    "UPDATE tbl_work " +
    "INNER JOIN tbl_works ON tbl_work.wid = tbl_works.wid " +
    "SET tbl_work.wname = ? " +
    "WHERE tbl_work.stdid = ? AND tbl_works.typework = ? AND tbl_work.wtid = ?";
  db.query(sql, [wname, stdid, typework, wtid], (err, result) => {
    if (err) {
      console.error("Error updating work:", err);
      return res.status(500).json({ error: "Server Error" });
    }
    return res.json({ message: "อัปเดตข้อมูลผลงานสำเร็จ" });
  });
});

app.get("/work/:stdid/:typework/:wtid", (req, res) => {
  const stdid = req.params.stdid;
  const typework = req.params.typework;
  const wtid = req.params.wtid;
  let sql =
    "SELECT tbl_work.*, typework, tbl_works.stdid , wname , pathwork, tbl_work.wtid , wtname FROM tbl_work  LEFT JOIN tbl_worktype ON tbl_work.wtid = tbl_worktype.wtid LEFT JOIN tbl_works on tbl_work.wid = tbl_works.wid  where tbl_works.stdid = ? AND tbl_works.typework = ? AND tbl_work.wtid = ?  ";
  db.query(sql, [stdid, typework, wtid], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    return res.json(data);
  });
});

// Login
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ message: "กรุณากรอก ชื่อผู้ใช้ และ รหัสผ่านผู้ใช้" });
//   }
//   db.query(
//     "SELECT * from tbl_admin WHERE username = ?",
//     [username],
//     async (err, result) => {
//       if (err) {
//         return res
//           .status(500)
//           .json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูลจากฐานข้อมูล" });
//       }
//       if (result.length > 0) {
//         const hashedPassword = result[0].password;
//         const passwordMatch = await bcrypt.compare(password, hashedPassword);
//         if (passwordMatch) {
//           res.json({
//             message: "login succes",
//           });
//         } else {
//           return res
//             .status(401)
//             .json({ message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
//         }
//       } else {
//         return res.status(401).json({ message: "ไม่พบผู้ใช้ในระบบ" });
//       }
//     }
//   );
// });

// Start Student
// ดึงข้อมูลนักศึกษา
app.get("/studentlist", (req, res) => {
  const sql = "SELECT * FROM tbl_student";
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    return res.json(data);
  });
});
// เพิ่มข้อมูลนักศึกษา
app.post("/studentadd", (req, res) => {
  const { stdid, stdname } = req.body;
  const sql = "INSERT INTO tbl_student (stdid, stdname) VALUES (?, ?)";
  db.query(sql, [stdid, stdname], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    return res.json({ message: "เพิ่มข้อมูลนักศึกษาสำเร็จ" });
  });
});
// ดึงตาม stdid
app.get("/student/:stdid", (req, res) => {
  const stdid = req.params.stdid;
  let sql = "SELECT * FROM tbl_student where stdid = ?";
  db.query(sql, [stdid], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    return res.json(data);
  });
});
// อัปเดตข้อมูลนักศึกษา
app.post("/studentedit", (req, res) => {
  const { stdid, stdname } = req.body;
  const sql = "UPDATE tbl_student SET stdname = ? WHERE stdid = ?";
  db.query(sql, [stdname, stdid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    return res.json({ message: "อัปเดตข้อมูลนักศึกษาสำเร็จ" });
  });
});
// ลบข้อมูลนักศึกษา
app.delete("/studentdel/:stdid", (req, res) => {
  const stdid = req.params.stdid;
  const sql = "DELETE FROM tbl_student WHERE stdid = ?";
  db.query(sql, [stdid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    return res.json({ message: "ลบข้อมูลนักศึกษาสำเร็จ" });
  });
});
// End Student

// Start Work
// ดึงข้อมูลผลงาน
app.get("/worklist", (req, res) => {
  const sql =
    "SELECT tbl_work.*, wtname,pathwork,typework,stdname FROM tbl_work LEFT JOIN tbl_worktype ON tbl_work.wtid = tbl_worktype.wtid LEFT JOIN tbl_works on tbl_work.wid = tbl_works.wid LEFT JOIN tbl_student ON tbl_work.stdid = tbl_student.stdid";
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    return res.json(data);
  });
});
// เพิ่มข้อมูลผลงาน

// ลบข้อมูลผลงาน
app.delete("/workdel/:wid", (req, res) => {
  const wid = req.params.wid;
  const sql =
    "DELETE tbl_work, tbl_works FROM tbl_work INNER JOIN tbl_works ON tbl_work.wid = tbl_works.wid WHERE tbl_work.wid = ?";
  db.query(sql, [wid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    return res.json({ message: "ลบข้อมูลผลงานสำเร็จ" });
  });
});

// End Work

// Start Worktype
// ดึงข้อมูลประเภทผลงาน
app.get("/worktypelist", (req, res) => {
  const sql = "SELECT * FROM tbl_worktype";
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    return res.json(data);
  });
});
// เพิ่มข้อมูลประเภทผลงาน
app.post("/worktypeadd", (req, res) => {
  const wtname = req.body.wtname;
  const max = "SELECT MAX(wtid) + 1 AS wts FROM tbl_worktype";
  db.query(max, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    const wtss = result[0].wts || 1;
    const insert = "INSERT INTO tbl_worktype (wtid, wtname) VALUES (?, ?)";
    db.query(insert, [wtss, wtname], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Server Error" });
      }
      return res.json({ message: "เพิ่มข้อมูลประเภทผลงานสำเร็จ" });
    });
  });
});

// ดึงตาม wtid
app.get("/worktype/:wtid", (req, res) => {
  const wtid = req.params.wtid;
  let sql = "SELECT * FROM tbl_worktype where wtid = ?";
  db.query(sql, [wtid], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
});
// อัปเดตข้อมูลประเภทผลงาน
app.post("/worktypeedit", (req, res) => {
  const { wtid, wtname } = req.body;
  const sql = "UPDATE tbl_worktype SET wtname = ? WHERE wtid = ?";
  db.query(sql, [wtname, wtid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    return res.json({ message: "อัปเดตข้อมูลประเภทผลงานสำเร็จ" });
  });
});
// ลบข้อมูลประเภทผลงาน
app.delete("/worktypedel/:wtid", (req, res) => {
  const wtid = req.params.wtid;
  const sql = "DELETE FROM tbl_worktype WHERE wtid = ?";
  db.query(sql, [wtid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    }
    return res.json({ message: "ลบข้อมูลนักศึกษาสำเร็จ" });
  });
});

app.use(express.static("public"));
app.use("/pdf", express.static("uploadpdf"));
app.use("/pic", express.static("uploadpic"));
app.use("/vdo", express.static("uploadvideo"));
// End Worktype

const port = 9999;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
