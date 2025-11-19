


/**
 * Main Application - CLI Interface
 * File ini adalah entry point aplikasi
 * 
 * TODO: Implementasikan CLI interface yang interaktif dengan menu:
 * 1. Tambah Siswa Baru
 * 2. Lihat Semua Siswa
 * 3. Cari Siswa (by ID)
 * 4. Update Data Siswa
 * 5. Hapus Siswa
 * 6. Tambah Nilai Siswa
 * 7. Lihat Top 3 Siswa
 * 8. Keluar
 */


import readlineSync from 'readline-sync';
import Student from './src/Student.js';
import StudentManager from './src/StudentManager.js';

// Inisialisasi StudentManager
const manager = new StudentManager();

/**
 * Menampilkan menu utama
 */
function displayMenu() {
  console.log('\n=================================');
  console.log('SISTEM MANAJEMEN NILAI SISWA');
  console.log('=================================');
  console.log('1. Tambah Siswa Baru');
  console.log('2. Lihat Semua Siswa');
  console.log('3. Cari Siswa');
  console.log('4. Update Data Siswa');
  console.log('5. Hapus Siswa');
  console.log('6. Tambah Nilai Siswa');
  console.log('7. Lihat Top 3 Siswa');
  console.log('8. Keluar');
  console.log('=================================');
}

/**
 * Handler untuk menambah siswa baru
 * TODO: Implementasikan function ini
 * - Minta input: ID, Nama, Kelas
 * - Buat object Student baru
 * - Tambahkan ke manager
 * - Tampilkan pesan sukses/gagal
 */
function addNewStudent() {
  // Implementasi di sini
  console.log('\n--- Tambah Siswa Baru ---');
  try {
    const id = readlineSync.question('Masukkan ID Siswa (Contoh: 101): ').trim();
    const name = readlineSync.question('Masukkan Nama Siswa: ').trim();
    const studentClass = readlineSync.question('Masukkan Kelas Siswa (Contoh: 10A): ').trim();

    if (!id || !name || !studentClass) {
      throw new Error("ID, Nama, dan Kelas tidak boleh kosong.");
    }
    
    // Cek duplikasi ID
    if (manager.findStudent(id)) {
        throw new Error(`Gagal: Siswa dengan ID ${id} sudah ada.`);
    }

    const newStudent = new Student(id, name, studentClass);
    if (manager.addStudent(newStudent))
      console.log(`\n[V] Tambah  Siswa Baru ${name} (${id}) Sukses .`);
    // TODO: Lengkapi implementasi
    }
   catch (error) {
    console.log(`[!] ${error.message}`);
  }
}

/**
 * Handler untuk melihat semua siswa
 * TODO: Implementasikan function ini
 * - Panggil method displayAllStudents dari manager
 * - Jika tidak ada siswa, tampilkan pesan
 */
function viewAllStudents() {
  // Implementasi di sini

  console.log('\n--- Daftar Semua Siswa ---');
  manager.displayAllStudents();
  // TODO: Lengkapi implementasi
}

/**
 * Handler untuk mencari siswa berdasarkan ID
 * TODO: Implementasikan function ini
 * - Minta input ID
 * - Cari siswa menggunakan manager
 * - Tampilkan info siswa jika ditemukan
 */
function searchStudent() {
  // Implementasi di sini

  console.log('\n--- Cari Siswa ---');
  const id = readlineSync.question('Masukkan ID Siswa yang dicari: ').trim();

  const student = manager.findStudent(id);
  if (student) {
    student.displayInfo();
  } else {
    console.log(`[!] Siswa dengan ID ${id} tidak ditemukan.`);
  }
  // TODO: Lengkapi implementasi
}

/**
 * Handler untuk update data siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data saat ini
 * - Minta input data baru (nama, kelas)
 * - Update menggunakan manager
 */
function updateStudent() {
  // Implementasi di sini
  console.log('\n--- Update Data Siswa ---');
  // TODO: Lengkapi implementasi

  try {
    const id = readlineSync.question('Masukkan ID Siswa yang akan diupdate: ').trim();
    const student = manager.findStudent(id);

    if (!student) {
      throw new Error(`Siswa dengan ID ${id} tidak ditemukan.`);
    }

    console.log(`\nData saat ini untuk ${student.name} (Kelas: ${student.class}).`);
    const newName = readlineSync.question('Masukkan Nama Baru (kosongkan jika tidak diubah): ').trim();
    const newClass = readlineSync.question('Masukkan Kelas Baru (kosongkan jika tidak diubah): ').trim();

    const updateData = {};
    if (newName) updateData.name = newName;
    if (newClass) updateData.class = newClass;

    if (Object.keys(updateData).length === 0) {
      console.log("[!] Tidak ada data yang diubah.");
      return;
    }

    if (manager.updateStudent(id, updateData)) {
      console.log(`\n[V] Sukses! Data siswa ID ${id} berhasil diperbarui.`);
      student.displayInfo();
    } 
  } catch (error) {
    console.log(`[!] ${error.message}`);
  }
}

/**
 * Handler untuk menghapus siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Konfirmasi penghapusan
 * - Hapus menggunakan manager
 */
function deleteStudent() {
  // Implementasi di sini
  console.log('\n--- Hapus Siswa ---');
  // TODO: Lengkapi implementasi
  try {
    const id = readlineSync.question('Masukkan ID Siswa yang akan dihapus: ').trim();
    const student = manager.findStudent(id);
    
    if (!student) {
      throw new Error(`Siswa dengan ID ${id} tidak ditemukan.`);
    }

    const confirm = readlineSync.question(`Anda yakin ingin menghapus ${student.name} (${student.id})? (ya/tidak): `).toLowerCase().trim();

    if (confirm === 'ya') {
      if (manager.removeStudent(id)) {
        console.log(`\n[V] Sukses! Siswa ${student.name} (${id}) berhasil dihapus.`);
      } else {
        throw new Error("Gagal menghapus siswa.");
      }
    } else {
      console.log("[!] Pembatalan penghapusan.");
    }
  } catch (error) {
    console.log(`[!] ${error.message}`);
  }
}

/**
 * Handler untuk menambah nilai siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data siswa
 * - Minta input mata pelajaran dan nilai
 * - Tambahkan nilai menggunakan method addGrade
 */
function addGradeToStudent() {
  // Implementasi di sini
  console.log('\n--- Tambah Nilai Siswa ---');
  // TODO: Lengkapi implementasi
  try {
    const id = readlineSync.question('Masukkan ID Siswa: ').trim();
    const student = manager.findStudent(id);

    if (!student) {
      throw new Error(`Siswa dengan ID ${id} tidak ditemukan.`);
    }

    const subject = readlineSync.question(`Masukkan Mata Pelajaran untuk ${student.name}: `).trim();
    const scoreInput = readlineSync.question('Masukkan Nilai (0-100): ').trim();
    const score = parseFloat(scoreInput);

    if (!subject) {
        throw new Error("Mata pelajaran tidak boleh kosong.");
    }
    if (isNaN(score) || score < 0 || score > 100) {
      throw new Error("Nilai harus berupa angka antara 0 sampai 100.");
    }

    if (student.addGrade(subject, score)) {
      console.log(`\n[V] Sukses! Nilai ${subject}: ${score} berhasil ditambahkan/diperbarui untuk ${student.name}.`);
      student.displayInfo();
    }
  } catch (error) {
    console.log(`[!] ${error.message}`);
  }
}

/**
 * Handler untuk melihat top students
 * TODO: Implementasikan function ini
 * - Panggil getTopStudents(3) dari manager
 * - Tampilkan informasi siswa
 */
function viewTopStudents() {
  // Implementasi di sini
  console.log('\n--- Top 3 Siswa ---');
  // TODO: Lengkapi implementasi
  if (manager.getAllStudents().length === 0) {
      console.log("[!] Belum ada data siswa.");
      return;
  }

  const topStudents = manager.getTopStudents(3);

  topStudents.forEach((s, index) => {
      console.log(`${index + 1}. ID: ${s.id} | Nama: ${s.name.padEnd(20)} | Rata-rata: ${s.getAverage()} | Status: ${s.getGradeStatus()}`);
  });
  console.log("------------------------------------------------------------------");
}

/**
 * Main program loop
 * TODO: Implementasikan main loop
 * - Tampilkan menu
 * - Baca input pilihan
 * - Panggil handler yang sesuai
 * - Ulangi sampai user pilih keluar
 */
function main() {
  console.log('Selamat datang di Sistem Manajemen Nilai Siswa!');
  
  // TODO: Implementasikan loop utama program
manager.addStudent(new Student("101", "Budi Santoso", "10A"));
  manager.addStudent(new Student("102", "Ani Wijaya", "10A"));
  manager.addStudent(new Student("103", "Citra Dewi", "11B"));
  manager.findStudent("101").addGrade("Matematika", 85);
  manager.findStudent("101").addGrade("Fisika", 92);
  manager.findStudent("102").addGrade("Matematika", 75);
  manager.findStudent("102").addGrade("Kimia", 68);
  manager.findStudent("103").addGrade("Bahasa Inggris", 90);
  manager.findStudent("103").addGrade("Sejarah", 88);

  let running = true;
  
  while (running) {
    // Tampilkan menu
    // Baca pilihan user
    // Jalankan action sesuai pilihan
    // TODO: Lengkapi implementasi
    
    // Hint: gunakan switch-case untuk handle berbagai pilihan
    
    displayMenu();
    const choice = readlineSync.question('Pilih opsi (1-8): ').trim();
    
    switch (choice) {
      case '1':
        addNewStudent();
        break;
      case '2':
        viewAllStudents();
        break;
      case '3':
        searchStudent();
        break;
      case '4':
        updateStudent();
        break;
      case '5':
        deleteStudent();
        break;
      case '6':
        addGradeToStudent();
        break;
      case '7':
        viewTopStudents();
        break;
      case '8':
        running = false;
        break;
      default:
        console.log('\n[!] Opsi tidak valid. Silakan pilih 1 sampai 8.');
    }
    
    if (running) {
      readlineSync.question('Tekan ENTER untuk melanjutkan...');
    }
  }
  
  console.log('\nTerima kasih telah menggunakan aplikasi ini! ');
  

}

// Jalankan aplikasi
main();
