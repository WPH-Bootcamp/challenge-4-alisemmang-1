/**
 * Class Student
 * Representasi dari seorang siswa dengan data dan nilai-nilainya
 * 
 * TODO: Implementasikan class Student dengan:
 * - Constructor untuk inisialisasi properti (id, name, class, grades)
 * - Method addGrade(subject, score) untuk menambah nilai mata pelajaran
 * - Method getAverage() untuk menghitung rata-rata nilai
 * - Method getGradeStatus() untuk menentukan status Lulus/Tidak Lulus
 * - Method displayInfo() untuk menampilkan informasi siswa
 * 
 * Kriteria Lulus: rata-rata >= 75
 */

const MIN_LULUS_SCORE = 75;

class Student {
  // TODO: Implementasikan constructor
  // Properti yang dibutuhkan:
  // - id: ID unik siswa
  // - name: Nama siswa
  // - class: Kelas siswa
  // - grades: Object untuk menyimpan nilai {subject: score}
  
  constructor(id, name, studentClass) {
    // Implementasi constructor di sini
    this.id = id;
    this.name = name;
    this.class = studentClass;
    this.grades = {}; // Object untuk menyimpan nilai {subject: score}
  }

  /**
   * Menambah atau update nilai mata pelajaran
   * @param {string} subject - Nama mata pelajaran
   * @param {number} score - Nilai (0-100)
   * TODO: Validasi bahwa score harus antara 0-100
   */
  addGrade(subject, score) {
    // Implementasi method di sini
    if (typeof score === 'number' && score >= 0 && score <= 100) {
        this.grades[subject] = score;
        return true;
    }
    return false;
  }

  /**
   * Menghitung rata-rata nilai dari semua mata pelajaran
   * @returns {number} Rata-rata nilai
   * TODO: Hitung total nilai dibagi jumlah mata pelajaran
   */
  getAverage() {
    // Implementasi method di sini
    const scores = Object.values(this.grades);
   if (scores.length === 0) {
        return 0; 
  }
  // TODO: Hitung total nilai dibagi jumlah mata pelajaran
    const total = scores.reduce((sum, score) => sum + score, 0);
    const average = total / scores.length;
    
    // Membulatkan 2 angka di belakang koma
    return Math.round(average * 100) / 100;
  }

  /**
   * Menentukan status kelulusan siswa
   * @returns {string} "Lulus" atau "Tidak Lulus"
   * TODO: Return "Lulus" jika rata-rata >= 75, selain itu "Tidak Lulus"
   */
  getGradeStatus() {
    // Implementasi method di sini
    const average = this.getAverage();
    return average >= MIN_LULUS_SCORE ? "Lulus" : "Tidak Lulus";
  }

  /**
   * Menampilkan informasi lengkap siswa
   * TODO: Tampilkan ID, Nama, Kelas, semua nilai, rata-rata, dan status
   */
  displayInfo() {
    // Implementasi method di sini
    const avg = this.getAverage();
    const status = this.getGradeStatus();

    console.log(`\n--- Info Siswa: ${this.name} (${this.id}) ---`);
    console.log(`Kelas: ${this.class}`);
    console.log(`Rata-Rata Nilai: ${avg}`);
    console.log(`Status: ${status} (Kriteria Lulus: >= ${MIN_LULUS_SCORE})`);
    console.log("Detail Nilai:");

    const subjects = Object.keys(this.grades);
    if (subjects.length > 0) {
        subjects.forEach(subject => {
            console.log(`  - ${subject}: ${this.grades[subject]}`);
        });
    } else {
        console.log("  - Belum ada nilai.");
    }
    console.log("----------------------------------");
 
  }
}

export default Student;
