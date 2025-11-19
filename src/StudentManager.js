/**
 * Class StudentManager
 * Mengelola koleksi siswa dan operasi-operasi terkait
 * 
 * TODO: Implementasikan class StudentManager dengan:
 * - Constructor untuk inisialisasi array students
 * - Method addStudent(student) untuk menambah siswa
 * - Method removeStudent(id) untuk menghapus siswa
 * - Method findStudent(id) untuk mencari siswa
 * - Method updateStudent(id, data) untuk update data siswa
 * - Method getAllStudents() untuk mendapatkan semua siswa
 * - Method getTopStudents(n) untuk mendapatkan top n siswa
 * - Method displayAllStudents() untuk menampilkan semua siswa
 */

class StudentManager {
  // TODO: Implementasikan constructor
  // Properti yang dibutuhkan:
  // - students: Array untuk menyimpan semua siswa
  
  constructor() {
    // Implementasi constructor di sini
    this.students = [];
  }

  /**
   * Menambah siswa baru ke dalam sistem
   * @param {Student} student - Object Student yang akan ditambahkan
   * @returns {boolean} true jika berhasil, false jika ID sudah ada
   * TODO: Validasi bahwa ID belum digunakan
   */
  addStudent(student) {
    // Implementasi method di sini
    if (this.students.some(s => s.id === student.id)) {
      return false; // ID sudah ada
    }
    this.students.push(student);
    return true;
  }

  /**
   * Menghapus siswa berdasarkan ID
   * @param {string} id - ID siswa yang akan dihapus
   * @returns {boolean} true jika berhasil, false jika tidak ditemukan
   * TODO: Cari dan hapus siswa dari array
   */
  removeStudent(id) {
    // Implementasi method di sini
    const initialLength = this.students.length;
  
    // Temukan index siswa
    const index = this.students.findIndex(s => s.id === id);

    if (index !== -1) {
        // Hapus siswa dari array
        this.students.splice(index, 1);
        return true;
    }
    return false;
  }
  

  
  /**
   * Mencari siswa berdasarkan ID
   * @param {string} id - ID siswa yang dicari
   * @returns {Student|null} Object Student jika ditemukan, null jika tidak
   * TODO: Gunakan method array untuk mencari siswa
   */
  findStudent(id) {
    // Implementasi method di sini
    // TODO: Gunakan method array untuk mencari siswa
    const student = this.students.find(s => s.id === id);
    return student || null;
  }

  /**
   * Update data siswa
   * @param {string} id - ID siswa yang akan diupdate
   * @param {object} data - Data baru (name, class, dll)
   * @returns {boolean} true jika berhasil, false jika tidak ditemukan
   * TODO: Cari siswa dan update propertinya
   */
  updateStudent(id, data) {
    // Implementasi method di sini
    const student = this.findStudent(id);

    if (student) {
      // TODO: Cari siswa dan update propertinya
      if (data.name) student.name = data.name;
      if (data.class) student.class = data.class;
      return true;
    }
    return false;
  }

  /**
   * Mendapatkan semua siswa
   * @returns {Array} Array berisi semua siswa
   */
  getAllStudents() {
    // Implementasi method di sini
    return this.students;
  }

  /**
   * Mendapatkan top n siswa berdasarkan rata-rata nilai
   * @param {number} n - Jumlah siswa yang ingin didapatkan
   * @returns {Array} Array berisi top n siswa
   * TODO: Sort siswa berdasarkan rata-rata (descending) dan ambil n teratas
   */
  getTopStudents(n) {
    // Implementasi method di sini
    if (this.students.length === 0) {
        return [];
    }
    
    // TODO: Sort siswa berdasarkan rata-rata (descending) dan ambil n teratas
    // Menggunakan spread operator ([...this.students]) untuk menghindari perubahan pada array asli
    const sortedStudents = [...this.students].sort((a, b) => {
        // Asumsi Class Student memiliki method getAverage()
        return b.getAverage() - a.getAverage(); 
    });

    return sortedStudents.slice(0, n);
  }

  /**
   * Menampilkan informasi semua siswa
   * TODO: Loop semua siswa dan panggil displayInfo() untuk masing-masing
   */
  displayAllStudents() {
    // Implementasi method di sini
    if (this.students.length === 0) {
      console.log("\n[!] Belum ada data siswa.");
      return;
    }
    
    console.log("\n--- DAFTAR SEMUA SISWA ---");
    // Menampilkan header tabel
    console.log("ID   | Nama                  | Kelas | Rata-rata | Status");
    console.log("-----|-----------------------|-------|-----------|--------");
    
    // Loop semua siswa dan tampilkan ringkasan info
    this.students.forEach(s => {
        // Menggunakan padEnd() untuk merapikan tampilan
        console.log(`${s.id.toString().padEnd(4)} | ${s.name.padEnd(21)} | ${s.class.padEnd(5)} | ${s.getAverage().toString().padEnd(9)} | ${s.getGradeStatus()}`);
    });
    console.log("----------------------------------------------------------");
  }

  /**
   * BONUS: Mendapatkan siswa berdasarkan kelas
   * @param {string} className - Nama kelas
   * @returns {Array} Array siswa dalam kelas tersebut
   */
  getStudentsByClass(className) {
    // Implementasi method di sini (BONUS)
    return this.students.filter(s => s.class.toLowerCase() === className.toLowerCase());
  }

  /**
   * BONUS: Mendapatkan statistik kelas
   * @param {string} className - Nama kelas
   * @returns {object} Object berisi statistik (jumlah siswa, rata-rata kelas, dll)
   */
  getClassStatistics(className) {
    // Implementasi method di sini (BONUS)
    const classStudents = this.getStudentsByClass(className);

    if (classStudents.length === 0) {
        return null;
    }

    const totalStudents = classStudents.length;
    const totalAverageScore = classStudents.reduce((sum, s) => sum + s.getAverage(), 0);
    const classAverage = totalAverageScore / totalStudents;

    // Hitung jumlah yang Lulus
    const passedStudents = classStudents.filter(s => s.getGradeStatus() === 'Lulus').length;
    const failedStudents = totalStudents - passedStudents;

    return {
        className: className,
        totalStudents: totalStudents,
        classAverage: Math.round(classAverage * 100) / 100, // Pembulatan 2 desimal
        passedStudents: passedStudents,
        failedStudents: failedStudents,
        passRate: Math.round((passedStudents / totalStudents) * 100)
    };
  }
}

export default StudentManager;
