const express = require("express");
const db = require("../backend/connection");
const OracleDB = require("oracledb");
const router = express.Router();


// Rota para obter todos os agendamentos
// router.get("/agendamentos", async (req, res) => {
//   try {
//     const { data } = req.query;
//     const connection = await OracleDB.getConnection(db);
//     const result = await connection.execute(
//       `SELECT DS_SALA,
//     DS_STATUS,
//     HR_INICIO,
//     NR_MINUTO_DURACAO,
//     CD_PESSOA_FISICA,
//     DT_AGENDA
//     FROM V_AGENDA_CIRURGIA
//     WHERE DT_AGENDA = '28/02/2024'`//,[data]
//     );
//     return res.json(result.rows);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "Erro ao consultar dados no banco de dados." });
//   }
// });

router.get("/agendamentos", async (req, res) => {
  try {
    const { data } = req.query;

    const connection = await OracleDB.getConnection(db);
    const result = await connection.execute(
      `SELECT *
      FROM (SELECT DS_SALA, HR_INICIO, CD_PESSOA_FISICA, DT_AGENDA
              FROM V_AGENDA_CIRURGIA A
             WHERE A.DT_AGENDA = :DATA
    )
    PIVOT(COUNT(CD_PESSOA_FISICA)
       FOR DS_SALA IN('HEMO' AS hemo,
                      'SALA 01' AS sala_01,
                      'SALA 02' AS sala_02,
                      'SALA 03' AS sala_03,
                      'SALA 04' AS sala_04,
                      'SALA 05' AS sala_05))
    ORDER BY HR_INICIO`, [data]
    );
    return res.json(result.rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erro ao consultar dados no banco de dados." });
  }
});


module.exports = router;
