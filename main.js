// 1. untuk membaca input dari pengguna secara interaktif dalam lingkungan command-line atau terminal.
const readline = require('readline');

// 2. memberikan fungsional untuk berinteraksi dengan file, seperti membaca dan menulis file.
const fs = require('fs');

// 3. digunakan untuk membaca input dari pengguna melalui terminal atau command-line.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 4. Definisi fungsi loadData
function loadData() {
  try {
    const data = fs.readFileSync('dataEvent.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { events: [], cosplayers: [] };
  }
}

// 5. array kosong. Fungsi dari kode ini adalah untuk menyediakan tempat penyimpanan sementara (wadah) 
// di dalam program untuk menyimpan data terkait acara (events) dan cosplayer.
let events = [];
let cosplayers = [];

// 6. untuk menampilkan menu program registrasi acara Jejepangan ke konsol atau terminal. 
// Fungsi ini menghasilkan output berupa daftar opsi atau pilihan yang tersedia untuk pengguna. 
// Setiap opsi memiliki nomor dan deskripsi singkat yang menjelaskan tindakan yang dapat diambil oleh pengguna.
function displayMenu() {
  console.log("\nProgram Registrasi Event Jejepangan");
  console.log("===================================");
  console.log("1. Tambah Event");
  console.log("2. Cari Event");
  console.log("3. Hapus Event");
  console.log("4. Tambah Cosplayer");
  console.log("5. Cari Cosplayer");
  console.log("6. Hapus Cosplayer");
  console.log("7. Tambah Cosplayer ke Event");
  console.log("8. Cari Cosplayer dalam Event");
  console.log("9. Hapus Cosplayer dalam Event");
  console.log("10. Event yang akan diadakan dalam 7 hari mendatang");
  console.log("11. Keluar");
}

// 7. digunakan untuk menambahkan informasi tentang sebuah acara ke dalam array events
function addEvent() {
  rl.question("Nama Event: ", (eventName) => {
    rl.question("Tanggal Event (YYYY-MM-DD): ", (eventDate) => {
      rl.question("Lokasi Event: ", (eventLocation) => {
        const event = {
          name: eventName,
          date: eventDate,
          location: eventLocation
        };
        events.push(event);
        console.log("Event berhasil ditambahkan!");
        showMenu();
      });
    });
  });
}

// 8. digunakan untuk mencari sebuah acara berdasarkan nama yang dimasukkan oleh pengguna
function findEvent() {
  rl.question("Masukan nama event: ", (eventName) => {
    const event = events.find(e => e.name === eventName);
    if (event) {
      console.log("Event ditemukan!");
      displayEvent(event);
    } else {
      console.log("Event tidak ditemukan.");
    }
    showMenu();
  });
}

// 9. digunakan untuk menghapus sebuah acara dari daftar acara yang telah dimasukkan oleh pengguna
function deleteEvent() {
  displayEvents();
  rl.question("Pilih Event yang akan dihapus [1-" + events.length + "]: ", (index) => {
    index = parseInt(index) - 1;
    if (events[index]) {
      events.splice(index, 1);
      console.log("Event berhasil dihapus!");
    } else {
      console.log("Pilihan event tidak valid.");
    }
    showMenu();
  });
}

// 10. menambahkan seorang cosplayer ke dalam daftar cosplayer
function addCosplayer() {
  rl.question("Nama Cosplayer: ", (cosplayerName) => {
    rl.question("Nama Karakter: ", (characterName) => {
      rl.question("Nama Anime: ", (animeName) => {
        const cosplayer = {
          name: cosplayerName,
          character: characterName,
          anime: animeName
        };
        cosplayers.push(cosplayer);
        console.log("Cosplayer berhasil ditambahkan!");
        showMenu();
      });
    });
  });
}

// 11. untuk mencari informasi tentang seorang cosplayer berdasarkan nama yang dimasukkan oleh pengguna. 
function findCosplayer() {
  rl.question("Masukan nama cosplayer: ", (cosplayerName) => {
    const cosplayer = cosplayers.find(c => c.name === cosplayerName);
    if (cosplayer) {
      console.log("Cosplayer ditemukan!");
      displayCosplayer(cosplayer);
    } else {
      console.log("Cosplayer tidak ditemukan.");
    }
    showMenu();
  });
}

// 12. untuk menghapus informasi seorang cosplayer dari daftar cosplayer 
// berdasarkan pilihan indeks yang dimasukkan oleh pengguna
function deleteCosplayer() {
  displayCosplayers();
  rl.question("Pilih Cosplayer yang akan dihapus [1-" + cosplayers.length + "]: ", (index) => {
    index = parseInt(index) - 1;
    if (cosplayers[index]) {
      cosplayers.splice(index, 1);
      console.log("Cosplayer berhasil dihapus!");
    } else {
      console.log("Pilihan cosplayer tidak valid.");
    }
    showMenu();
  });
}

// 13. untuk menambahkan seorang cosplayer ke dalam daftar cosplayer yang terkait dengan suatu event
function addCosplayerToEvent() {
  displayCosplayers();
  rl.question("Pilih Cosplayer yang akan ditambahkan ke event [1-" + cosplayers.length + "]: ", (cosplayerIndex) => {
    displayEvents();
    rl.question("Pilih Event yang akan ditambahkan cosplayer [1-" + events.length + "]: ", (eventIndex) => {
      cosplayerIndex = parseInt(cosplayerIndex) - 1;
      eventIndex = parseInt(eventIndex) - 1;
      if (cosplayers[cosplayerIndex] && events[eventIndex]) {
        events[eventIndex].cosplayers = events[eventIndex].cosplayers || [];
        events[eventIndex].cosplayers.push(cosplayers[cosplayerIndex]);
        console.log("Cosplayer berhasil ditambahkan ke event!");
      } else {
        console.log("Pilihan cosplayer atau event tidak valid.");
      }
      showMenu();
    });
  });
}

// 14. untuk menampilkan daftar cosplayer yang terkait dengan suatu event 
// berdasarkan pilihan indeks event yang dimasukkan oleh pengguna
function findCosplayerInEvent() {
  displayEvents();
  rl.question("Pilih Event [1-" + events.length + "]: ", (eventIndex) => {
    eventIndex = parseInt(eventIndex) - 1;
    if (events[eventIndex]) {
      displayCosplayersInEvent(events[eventIndex]);
    } else {
      console.log("Pilihan event tidak valid.");
    }
    showMenu();
  });
}

// 15. untuk menghapus seorang cosplayer dari daftar cosplayer yang terkait dengan suatu event
function deleteCosplayerInEvent() {
  displayEvents();
  rl.question("Pilih Event [1-" + events.length + "]: ", (eventIndex) => {
    eventIndex = parseInt(eventIndex) - 1;
    if (events[eventIndex]) {
      displayCosplayersInEvent(events[eventIndex]);
      rl.question("Pilih Cosplayer yang akan dihapus dalam event [1-" + events[eventIndex].cosplayers.length + "]: ", (cosplayerIndex) => {
        cosplayerIndex = parseInt(cosplayerIndex) - 1;
        if (events[eventIndex].cosplayers[cosplayerIndex]) {
          events[eventIndex].cosplayers.splice(cosplayerIndex, 1);
          console.log("Cosplayer berhasil dihapus dalam event!");
        } else {
          console.log("Pilihan cosplayer tidak valid.");
        }
        showMenu();
      });
    } else {
      console.log("Pilihan event tidak valid.");
      showMenu();
    }
  });
}

// 16. untuk menampilkan daftar event yang akan diadakan dalam 7 hari mendatang
function upcomingEvents() {
  const today = new Date();
  const sevenDaysLater = new Date(today);
  sevenDaysLater.setDate(today.getDate() + 7);

  const upcomingEvents = events.filter(event => new Date(event.date) <= sevenDaysLater);
  console.log("Event yang akan diadakan dalam 7 hari mendatang adalah:");
  upcomingEvents.forEach(event => {
    console.log(`${event.name} - ${event.date}`);
  });
  showMenu();
}

// 17. untuk menampilkan informasi sebuah event ke konsol. Parameter event yang diterima adalah 
// objek yang mewakili suatu event, dan fungsi ini mencetak detail nama event, tanggal event, 
// dan lokasi event ke konsol.
function displayEvent(event) {
  console.log(`Nama Event: ${event.name}`);
  console.log(`Tanggal Event: ${event.date}`);
  console.log(`Lokasi Event: ${event.location}`);
}

// 18. untuk menampilkan daftar event ke konsol. Fungsi ini mencetak nomor urut, 
// nama event, dan tanggal event untuk setiap event yang ada dalam array events.
function displayEvents() {
  console.log("Daftar Event:");
  events.forEach((event, index) => {
    console.log(`${index + 1}. ${event.name} - ${event.date}`);
  });
}

// 19. untuk menampilkan informasi tentang seorang cosplayer ke konsol. Fungsi ini mencetak nama cosplayer, 
// karakter yang di-cosplay, dan nama anime dari objek cosplayer yang diberikan ke konsol.
function displayCosplayer(cosplayer) {
  console.log(`Nama Cosplayer: ${cosplayer.name}`);
  console.log(`Nama Karakter: ${cosplayer.character}`);
  console.log(`Nama Anime: ${cosplayer.anime}`);
}

// 20. untuk menampilkan daftar cosplayer ke konsol. Fungsi ini mencetak nama-nama cosplayer 
// beserta nomor urutnya ke konsol. Setiap cosplayer diwakili oleh satu baris, 
// dan nomor urutnya ditambahkan untuk mempermudah penggunaan menu yang melibatkan pemilihan cosplayer.
function displayCosplayers() {
  console.log("Daftar Cosplayer:");
  cosplayers.forEach((cosplayer, index) => {
    console.log(`${index + 1}. ${cosplayer.name}`);
  });
}

// 21. untuk menampilkan daftar cosplayer yang terkait dengan suatu event ke konsol. 
// Fungsi ini mencetak nama-nama cosplayer beserta nomor urutnya ke konsol. 
// Setiap cosplayer diwakili oleh satu baris, dan nomor urutnya ditambahkan untuk 
// mempermudah penggunaan menu yang melibatkan pemilihan cosplayer dalam konteks event tertentu.
function displayCosplayersInEvent(event) {
  console.log(`Cosplayer dalam Event ${event.name}:`);
  event.cosplayers.forEach((cosplayer, index) => {
    console.log(`${index + 1}. ${cosplayer.name}`);
  });
}

// 22. untuk menyimpan data events dan cosplayers ke dalam file JSON. 
function simpanData() {
  const dataJSON = JSON.stringify(eventList, null, 2);
  fs.writeFileSync('data-event.json', dataJSON);
  console.log('Data event berhasil disimpan');
}

// 
function hapusArray() {
    let daftar_event = [];
  
    for (i = 0; i < daftar_event.length; i++) {
      console.log(i, ". ", daftar_event[i]);
    }
  
    let pilihan = prompt("Masukan event yang ingin dihapus: ");
  
    let pilihan_number = parseInt(pilihan);
  
    daftar_event.splice(pilihan_number, 1);
  
    console.log("");
    console.log("Daftar array setelah dihapus");
    for (i = 0; i < daftar_event.length; i++) {
      console.log(i, ". ", daftar_event[i]);
    }
  }

// 23. untuk menampilkan menu program registrasi event Jejepangan, mengambil input pilihan menu dari 
// pengguna, dan menjalankan fungsi yang sesuai dengan pilihan tersebu
function showMenu() {
  displayMenu();
  rl.question("Pilih Menu [1-11]: ", (choice) => {
    switch (choice) {
      case '1':
        addEvent();
        break;
      case '2':
        findEvent();
        break;
      case '3':
        deleteEvent();
        break;
      case '4':
        addCosplayer();
        break;
      case '5':
        findCosplayer();
        break;
      case '6':
        deleteCosplayer();
        break;
      case '7':
        addCosplayerToEvent();
        break;
      case '8':
        findCosplayerInEvent();
        break;
      case '9':
        deleteCosplayerInEvent();
        break;
      case '10':
        upcomingEvents();
        break;
      case '11':
        rl.close();
        break;
      default:
        console.log("Pilihan tidak valid. Silakan pilih menu lagi.");
        showMenu();
    }
  });
}

showMenu();

// 24. untuk menyimpan data events dan cosplayers ke dalam file JSON
function simpanData() {
  const dataJSON = JSON.stringify({ events, cosplayers }, null, 2);
  fs.writeFileSync('dataEvent.json', dataJSON);
  console.log('Data event berhasil disimpan');
}

// 25. Panggil simpanData() saat program akan ditutup
rl.on('close', function () {
  simpanData();
  process.exit(0);
});

// 26.Memuat data yang ada dri file JSON
const { events_cosplayers } = loadData();