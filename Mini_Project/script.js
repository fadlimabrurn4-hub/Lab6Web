// ===== Pemilihan elemen =====
const form = document.getElementById("formWorkshop");
const inputNama = document.getElementById("nama");
const inputEmail = document.getElementById("email");
const pilihSesi = document.getElementById("sesi");
const inputCatatan = document.getElementById("catatan");

const errorNama = document.getElementById("errorNama");
const errorEmail = document.getElementById("errorEmail");
const errorSesi = document.getElementById("errorSesi");

const infoSesi = document.getElementById("infoSesi");
const jumlahKarakter = document.getElementById("jumlahKarakter");
const pesanForm = document.getElementById("pesanForm");

const ringkasNama = document.getElementById("ringkasNama");
const ringkasEmail = document.getElementById("ringkasEmail");
const ringkasSesi = document.getElementById("ringkasSesi");
const ringkasCatatan = document.getElementById("ringkasCatatan");

const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Data sesi workshop
const dataSesi = {
  "web-dasar": { nama: "Dasar Web (HTML & CSS)", jadwal: "09.00 - 11.00" },
  "js-dom": { nama: "JavaScript DOM & Event", jadwal: "13.00 - 15.00" },
  "git": { nama: "Git & GitHub untuk Pemula", jadwal: "15.30 - 17.00" }
};

// ===== Fungsi bantu =====
function tampilkanError(input, elemenError, teks) {
  elemenError.textContent = teks;
  input.classList.add("invalid");
  input.setAttribute("aria-invalid", "true");
}

function hapusError(input, elemenError) {
  elemenError.textContent = "";
  input.classList.remove("invalid");
  input.removeAttribute("aria-invalid");
}

function hapusSemuaError() {
  hapusError(inputNama, errorNama);
  hapusError(inputEmail, errorEmail);
  hapusError(pilihSesi, errorSesi);
}

function tampilkanPesan(teks, jenis) {
  pesanForm.textContent = teks;
  pesanForm.className = "pesan " + jenis;
}

function hapusPesan() {
  pesanForm.textContent = "";
  pesanForm.className = "pesan";
}

// ===== Fungsi 1: Ringkasan input secara langsung =====
function perbaruiRingkasan() {
  ringkasNama.textContent = inputNama.value.trim() || "-";
  ringkasEmail.textContent = inputEmail.value.trim() || "-";
  ringkasCatatan.textContent = inputCatatan.value.trim() || "-";

  const sesi = dataSesi[pilihSesi.value];
  ringkasSesi.textContent = sesi ? sesi.nama + " (" + sesi.jadwal + ")" : "-";
}

// ===== Fungsi 2: Penghitung karakter catatan =====
function perbaruiJumlahKarakter() {
  const panjang = inputCatatan.value.length;
  jumlahKarakter.textContent = panjang;
  jumlahKarakter.parentElement.classList.toggle("batas", panjang >= 150);
}

// ===== Fungsi 3: Tampilkan info sesi yang dipilih (event change) =====
function perbaruiInfoSesi() {
  const sesi = dataSesi[pilihSesi.value];
  infoSesi.textContent = sesi
    ? "Sesi dipilih: " + sesi.nama + ", pukul " + sesi.jadwal + "."
    : "";
}

// ===== Fungsi 4: Validasi form =====
function validasiForm() {
  let valid = true;
  hapusSemuaError();

  const nama = inputNama.value.trim();
  const email = inputEmail.value.trim();

  if (nama === "") {
    tampilkanError(inputNama, errorNama, "Nama wajib diisi.");
    valid = false;
  } else if (nama.length < 3) {
    tampilkanError(inputNama, errorNama, "Nama minimal terdiri dari 3 karakter.");
    valid = false;
  }

  if (email === "") {
    tampilkanError(inputEmail, errorEmail, "Email wajib diisi.");
    valid = false;
  } else if (!polaEmail.test(email)) {
    tampilkanError(inputEmail, errorEmail, "Masukkan email yang valid.");
    valid = false;
  }

  if (pilihSesi.value === "") {
    tampilkanError(pilihSesi, errorSesi, "Pilih salah satu sesi workshop.");
    valid = false;
  }

  return valid;
}

// ===== Event listener =====

// Event input: ringkasan langsung + hapus error saat pengguna memperbaiki isian
inputNama.addEventListener("input", function () {
  hapusError(inputNama, errorNama);
  perbaruiRingkasan();
});

inputEmail.addEventListener("input", function () {
  hapusError(inputEmail, errorEmail);
  perbaruiRingkasan();
});

inputCatatan.addEventListener("input", function () {
  perbaruiJumlahKarakter();
  perbaruiRingkasan();
});

// Event change: pilihan sesi berubah
pilihSesi.addEventListener("change", function () {
  hapusError(pilihSesi, errorSesi);
  perbaruiInfoSesi();
  perbaruiRingkasan();
});

const dropdown = document.getElementById("sesi");
const info = document.getElementById("info");
const pilihan = document.getElementById("pilihan");
dropdown.addEventListener("change", function(){
  info.style.display = 'block';
  pilihan.textContent = dropdown.value;
})

// Event submit: validasi lalu tampilkan pesan sukses / gagal
form.addEventListener("submit", function (event) {
  event.preventDefault();
  hapusPesan();

  if (!validasiForm()) {
    tampilkanPesan("Pendaftaran gagal. Periksa kembali isian yang ditandai.", "gagal");
    return;
  }

  const nama = inputNama.value.trim();
  const sesi = dataSesi[pilihSesi.value];

  tampilkanPesan(
    "Terima kasih, " + nama + "! Pendaftaran untuk sesi \"" +
    sesi.nama + "\" berhasil.",
    "sukses"
  );

  form.reset();
});

// Event click: tombol "Hapus Input" juga membersihkan pesan sukses / gagal
document.getElementById("tombolReset").addEventListener("click", hapusPesan);

// Event reset: bersihkan error, pesan, info sesi, counter, dan ringkasan
form.addEventListener("reset", function () {
  hapusSemuaError();
  // Tunggu sampai browser selesai mengosongkan input, baru perbarui tampilan
  setTimeout(function () {
    perbaruiInfoSesi();
    perbaruiJumlahKarakter();
    perbaruiRingkasan();
  }, 0);
});

// Tampilan awal
perbaruiRingkasan();
perbaruiJumlahKarakter();
