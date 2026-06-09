require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const ACCESS_PATH = 'C:\\Users\\alffy\\Documents\\onnovation.accdb';
const connStr = `Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${ACCESS_PATH};Persist Security Info=False;`;

async function migrate() {
  console.log('Reading Access DB via PowerShell...');
  const { execSync } = require('child_process');
  const psScript = `
$conn = New-Object System.Data.OleDb.OleDbConnection("${connStr}")
$conn.Open()
$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT * FROM student_data"
$reader = $cmd.ExecuteReader()
$table = New-Object System.Data.DataTable
$table.Load($reader)
$rows = @()
foreach($row in $table.Rows) {
  $rows += [PSCustomObject]@{
    studentId = $row.studentId.ToString()
    firstName = if ($row.firstName -ne $null) { $row.firstName } else { "" }
    middleName = if ($row.middleName -ne $null) { $row.middleName } else { "" }
    lastName = if ($row.lastName -ne $null) { $row.lastName } else { "" }
    otherName = if ($row.otherName -ne $null) { $row.otherName } else { "" }
    class = if ($row.class -ne $null) { $row.class } else { "" }
    stream = if ($row.stream -ne $null) { $row.stream } else { "" }
    termJoined = if ($row.termJoined -ne $null) { $row.termJoined } else { "" }
    innovationClub = if ($row.innovationClub -ne $null) { [bool]$row.innovationClub } else { $false }
    aiClub = if ($row.aiClub -ne $null) { [bool]$row.aiClub } else { $false }
    iscc = if ($row.iscc -ne $null) { [bool]$row.iscc } else { $false }
    dateRegistered = if ($row.dateRegistered -ne $null) { $row.dateRegistered.ToString("yyyy-MM-dd HH:mm:ss") } else { $null }
    gender = if ($row.gender -ne $null) { $row.gender } else { "" }
    section = if ($row.section -ne $null) { $row.section } else { "" }
  }
}
$reader.Close()
$conn.Close()
$rows | ConvertTo-Json
`;

  console.log('Reading Access DB via PowerShell...');
  const output = execSync(psScript, { shell: 'powershell', encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  const records = JSON.parse(output.trim());
  console.log(`Read ${records.length} records from Access DB.`);

  // Drop old table and recreate
  console.log('Recreating students table...');
  await pool.query(`DROP TABLE IF EXISTS students CASCADE`);
  await pool.query(`
    CREATE TABLE students (
      id SERIAL PRIMARY KEY,
      student_id UUID,
      first_name VARCHAR(255) NOT NULL,
      middle_name VARCHAR(255),
      last_name VARCHAR(255) NOT NULL,
      other_name VARCHAR(255),
      class VARCHAR(50),
      stream VARCHAR(50),
      term_joined VARCHAR(50),
      innovation_club BOOLEAN DEFAULT FALSE,
      ai_club BOOLEAN DEFAULT FALSE,
      iscc BOOLEAN DEFAULT FALSE,
      date_registered TIMESTAMP,
      gender VARCHAR(20),
      section VARCHAR(50),
      email VARCHAR(255),
      phone VARCHAR(50),
      school_name VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  // Insert all records
  let inserted = 0;
  for (const r of records) {
    try {
      await pool.query(`
        INSERT INTO students (
          student_id, first_name, middle_name, last_name, other_name,
          class, stream, term_joined, innovation_club, ai_club, iscc,
          date_registered, gender, section
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      `, [
        r.studentId || null,
        r.firstName || '',
        r.middleName || null,
        r.lastName || '',
        r.otherName || null,
        r.class || null,
        r.stream || null,
        r.termJoined || null,
        r.innovationClub === 'True' || r.innovationClub === true,
        r.aiClub === 'True' || r.aiClub === true,
        r.iscc === 'True' || r.iscc === true,
        r.dateRegistered || null,
        r.gender || null,
        r.section || null,
      ]);
      inserted++;
    } catch (err) {
      console.error(`Failed to insert ${r.firstName} ${r.lastName}: ${err.message}`);
    }
  }

  console.log(`Migrated ${inserted}/${records.length} records successfully.`);
  await pool.end();
}

migrate().catch(err => { console.error('Migration failed:', err); process.exit(1); });
